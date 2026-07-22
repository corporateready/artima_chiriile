export const CONSENT_COOKIE_NAME = "enso_consent";

const CONSENT_COOKIE_VERSION = 1;
const CONSENT_MAX_AGE_SECONDS = 60 * 60 * 24 * 365;
const consentListeners = new Set();

function canUseCookies() {
  return typeof document !== "undefined";
}

function cookieAttributes() {
  const attributes = [
    `Max-Age=${CONSENT_MAX_AGE_SECONDS}`,
    "Path=/",
    "SameSite=Lax",
  ];

  if (
    typeof window !== "undefined" &&
    window.location?.protocol === "https:"
  ) {
    attributes.push("Secure");
  }

  return attributes.join("; ");
}

function parseConsent(rawValue) {
  try {
    const data = JSON.parse(decodeURIComponent(rawValue));
    const updatedAtIsValid =
      typeof data.updatedAt === "string" &&
      !Number.isNaN(Date.parse(data.updatedAt));

    if (
      data.version !== CONSENT_COOKIE_VERSION ||
      typeof data.analytics !== "boolean" ||
      (data.marketing !== undefined && typeof data.marketing !== "boolean") ||
      !updatedAtIsValid
    ) {
      return null;
    }

    return {
      version: CONSENT_COOKIE_VERSION,
      analytics: data.analytics,
      marketing: data.marketing === true,
      updatedAt: data.updatedAt,
    };
  } catch {
    return null;
  }
}

function notifyConsentListeners(consent) {
  for (const listener of consentListeners) listener(consent);
}

export function loadConsent() {
  if (!canUseCookies()) return null;

  const prefix = `${CONSENT_COOKIE_NAME}=`;
  const cookie = document.cookie
    .split(";")
    .map((part) => part.trim())
    .find((part) => part.startsWith(prefix));

  return cookie ? parseConsent(cookie.slice(prefix.length)) : null;
}

export function saveConsent({ analytics = false, marketing = false } = {}) {
  if (!canUseCookies()) return null;

  const consent = {
    version: CONSENT_COOKIE_VERSION,
    analytics: Boolean(analytics),
    marketing: Boolean(marketing),
    updatedAt: new Date().toISOString(),
  };

  document.cookie = `${CONSENT_COOKIE_NAME}=${encodeURIComponent(
    JSON.stringify(consent),
  )}; ${cookieAttributes()}`;
  notifyConsentListeners(consent);
  return consent;
}

export function clearConsent() {
  if (!canUseCookies()) return;

  document.cookie = `${CONSENT_COOKIE_NAME}=; Max-Age=0; Path=/; SameSite=Lax${
    typeof window !== "undefined" && window.location?.protocol === "https:"
      ? "; Secure"
      : ""
  }`;
  notifyConsentListeners(null);
}

export function hasAnalyticsConsent() {
  return loadConsent()?.analytics === true;
}

export function subscribeToConsent(callback) {
  consentListeners.add(callback);
  return () => consentListeners.delete(callback);
}

export function updateGTMConsent({ analytics, marketing }) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];

  const grant = (value) => (value ? "granted" : "denied");
  const preferences = {
    analytics_storage: grant(analytics),
    ad_storage: grant(marketing),
    ad_user_data: grant(marketing),
    ad_personalization: grant(marketing),
    personalization_storage: grant(analytics),
  };

  const gtag =
    typeof window.gtag === "function"
      ? window.gtag
      : function gtag() {
          window.dataLayer.push(arguments);
        };
  gtag("consent", "update", preferences);

  window.dataLayer.push({
    event: "consent_update",
    consent_analytics: grant(analytics),
    consent_marketing: grant(marketing),
  });
}

export function pushConsentEvent(eventName, { analytics, marketing }) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  const grant = (value) => (value ? "granted" : "denied");
  window.dataLayer.push({
    event: eventName,
    consent_analytics: grant(analytics),
    consent_marketing: grant(marketing),
  });
}
