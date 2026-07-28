import { hasAnalyticsConsent } from "./consent.js";

const GTM_CONTAINER_ID =
  process.env.NEXT_PUBLIC_GTM_ID || "GTM-KG9D2CBQ";
const GTM_SCRIPT_ID = "consent-managed-gtm";
const POSTHOG_GUARD = Symbol.for("artima.posthog.consentGuard");
const POSTHOG_ACTIVE = Symbol.for("artima.posthog.analyticsActive");
const POSTHOG_REVOKED = Symbol.for("artima.posthog.analyticsRevoked");
const PII_PROPERTY_KEYS = new Set([
  "email",
  "e-mail",
  "mail",
  "phone",
  "telephone",
  "tel",
  "name",
  "fullname",
  "full_name",
  "first_name",
  "last_name",
  "form_data",
  "form_content",
  "message",
]);

let gtmLoadPromise = null;
let consentDefaultsSet = false;
let postHogGuardTimer = null;
let postHogWasRevoked = false;

function browserAvailable() {
  return typeof window !== "undefined" && typeof document !== "undefined";
}

function pushConsentCommand(command, allowed) {
  if (!browserAvailable()) return;

  window.dataLayer = window.dataLayer || [];
  function gtag() {
    window.dataLayer.push(arguments);
  }
  gtag(
    "consent",
    command,
    command === "default"
      ? {
          analytics_storage: "denied",
          ad_storage: "denied",
          ad_user_data: "denied",
          ad_personalization: "denied",
          personalization_storage: "denied",
          wait_for_update: 500,
        }
      : {
          analytics_storage: allowed ? "granted" : "denied",
          personalization_storage: allowed ? "granted" : "denied",
        },
  );
}

export function initializeConsentMode() {
  if (consentDefaultsSet || !browserAvailable()) return;
  consentDefaultsSet = true;
  pushConsentCommand("default", false);
}

function updateGTMConsent(allowed) {
  initializeConsentMode();
  pushConsentCommand("update", allowed);
  if (browserAvailable()) {
    window.dataLayer.push({
      event: "analytics_consent_update",
      analytics_consent: allowed ? "granted" : "denied",
    });
  }
}

function sanitizeProperties(properties) {
  if (!properties || typeof properties !== "object") return properties;

  return Object.fromEntries(
    Object.entries(properties).filter(
      ([key]) => !PII_PROPERTY_KEYS.has(key.toLowerCase()),
    ).map(([key, value]) => [
      key,
      value && typeof value === "object"
        ? Array.isArray(value)
          ? value.map((item) => sanitizeProperties(item))
          : sanitizeProperties(value)
        : value,
    ]),
  );
}

function looksLikePII(value) {
  if (typeof value !== "string") return true;
  const normalized = value.trim();
  return (
    !normalized ||
    /@/.test(normalized) ||
    /^\+?[\d\s().-]{7,}$/.test(normalized)
  );
}

function installPostHogGuard() {
  if (!browserAvailable()) return false;
  const posthog = window.posthog;
  if (!posthog || posthog[POSTHOG_GUARD]) return Boolean(posthog);

  const originalCapture = posthog.capture?.bind(posthog);
  const originalIdentify = posthog.identify?.bind(posthog);
  const originalAlias = posthog.alias?.bind(posthog);

  if (originalCapture) {
    posthog.capture = (event, properties, options) => {
      if (!hasAnalyticsConsent()) return undefined;
      return originalCapture(event, sanitizeProperties(properties), options);
    };
  }

  if (originalIdentify) {
    posthog.identify = (distinctId, properties, propertiesSetOnce) => {
      if (!hasAnalyticsConsent() || looksLikePII(distinctId)) return undefined;
      return originalIdentify(
        distinctId,
        sanitizeProperties(properties),
        sanitizeProperties(propertiesSetOnce),
      );
    };
  }

  if (originalAlias) {
    posthog.alias = (...args) => {
      if (!hasAnalyticsConsent()) return undefined;
      return originalAlias(...args);
    };
  }

  Object.defineProperty(posthog, POSTHOG_GUARD, { value: true });
  return true;
}

function watchForPostHog() {
  if (!browserAvailable() || postHogGuardTimer) return;

  let attempts = 0;
  postHogGuardTimer = window.setInterval(() => {
    attempts += 1;
    installPostHogGuard();
    resumePostHogIfReady();
    if (window.posthog?.__loaded || attempts >= 400) {
      window.clearInterval(postHogGuardTimer);
      postHogGuardTimer = null;
    }
  }, 25);
  postHogGuardTimer?.unref?.();
}

function resumePostHogIfReady() {
  if (!browserAvailable() || !hasAnalyticsConsent()) return false;
  const posthog = window.posthog;
  if (!posthog?.__loaded || posthog[POSTHOG_ACTIVE]) return false;

  const wasRevoked =
    postHogWasRevoked || posthog[POSTHOG_REVOKED] === true;
  if (wasRevoked) {
    // Create a fresh anonymous identity only after consent has been restored.
    // reset() also schedules a flags reload, which is allowed at this point.
    posthog.reset?.(true);
  }

  posthog.set_config?.({
    advanced_disable_flags: false,
    capture_pageview: "history_change",
    mask_personal_data_properties: true,
    opt_out_persistence_by_default: true,
    persistence: "localStorage+cookie",
    session_recording: {
      ...(posthog.config?.session_recording || {}),
      maskAllInputs: true,
    },
  });
  posthog.featureFlags?.setReloadingPaused?.(false);
  posthog.opt_in_capturing?.({ captureEventName: false });
  if (wasRevoked) posthog.reloadFeatureFlags?.();
  posthog.startSessionRecording?.();
  Object.defineProperty(posthog, POSTHOG_ACTIVE, {
    configurable: true,
    value: true,
    writable: true,
  });
  Object.defineProperty(posthog, POSTHOG_REVOKED, {
    configurable: true,
    value: false,
    writable: true,
  });
  postHogWasRevoked = false;
  return true;
}

function loadGTM() {
  if (!browserAvailable()) return Promise.resolve(false);
  if (gtmLoadPromise) return gtmLoadPromise;

  const existingScript = document.getElementById(GTM_SCRIPT_ID);
  if (existingScript) return Promise.resolve(true);

  watchForPostHog();
  gtmLoadPromise = new Promise((resolve) => {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      "gtm.start": Date.now(),
      event: "gtm.js",
    });

    const script = document.createElement("script");
    script.id = GTM_SCRIPT_ID;
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtm.js?id=${encodeURIComponent(
      GTM_CONTAINER_ID,
    )}`;
    script.onload = () => resolve(true);
    script.onerror = () => {
      gtmLoadPromise = null;
      resolve(false);
    };
    document.head.appendChild(script);
  });

  return gtmLoadPromise;
}

export async function initializePostHogIfAllowed() {
  if (!hasAnalyticsConsent() || !browserAvailable()) return false;

  updateGTMConsent(true);
  installPostHogGuard();
  const loaded = await loadGTM();
  installPostHogGuard();
  resumePostHogIfReady();
  return loaded;
}

function clearPostHogState(posthog) {
  posthog[POSTHOG_ACTIVE] = false;

  // reset(true) must not run during revocation: posthog-js treats it as a
  // logout, creates a new anonymous identity, and schedules a /flags/ request.
  // Clear any pending flags reload and pause future reloads before opting out.
  posthog.featureFlags?.reset?.();
  posthog.featureFlags?.setReloadingPaused?.(true);
  posthog.set_config?.({
    advanced_disable_flags: true,
    capture_pageview: false,
    opt_out_persistence_by_default: true,
  });
  posthog.opt_out_capturing?.();
  posthog.stopSessionRecording?.();

  // opt_out_persistence_by_default removes browser storage. clear() also
  // removes the in-memory identity and any state retained by this page.
  posthog.persistence?.clear?.();
  posthog.sessionPersistence?.clear?.();
  if (Array.isArray(posthog.__request_queue)) {
    posthog.__request_queue.length = 0;
  }

  // posthog-js does not expose a public pending-queue clear API. These arrays
  // are cleared defensively for the installed SDK while opt_out_capturing is
  // the supported mechanism that prevents all subsequent transmission.
  if (Array.isArray(posthog._requestQueue?._queue)) {
    posthog._requestQueue._queue.length = 0;
  }
  if (Array.isArray(posthog._retryQueue?._queue)) {
    posthog._retryQueue._queue.length = 0;
  }
  Object.defineProperty(posthog, POSTHOG_REVOKED, {
    configurable: true,
    value: true,
    writable: true,
  });
  postHogWasRevoked = true;
}

export async function applyAnalyticsConsent(allowed) {
  if (!browserAvailable()) return false;

  if (allowed && hasAnalyticsConsent()) {
    return initializePostHogIfAllowed();
  }

  updateGTMConsent(false);
  if (window.posthog) clearPostHogState(window.posthog);
  return false;
}

function readyPostHog() {
  if (!browserAvailable() || !hasAnalyticsConsent()) return null;
  installPostHogGuard();
  return window.posthog?.__loaded ? window.posthog : null;
}

export const analytics = {
  capture(event, properties) {
    return readyPostHog()?.capture?.(event, sanitizeProperties(properties));
  },

  identify(distinctId, properties) {
    if (looksLikePII(distinctId)) return undefined;
    return readyPostHog()?.identify?.(
      distinctId,
      sanitizeProperties(properties),
    );
  },

  reset() {
    return readyPostHog()?.reset?.();
  },
};

export const capture = analytics.capture;
export const identify = analytics.identify;
export const reset = analytics.reset;
