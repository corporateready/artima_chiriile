// First-touch marketing attribution.
//
// Why this exists: form submissions carried NO attribution at all. The Meta
// Pixel Lead event and the PostHog `form_submitted` event both went out with
// only pixel/session ids, so a submission could never be tied back to the
// campaign that produced it. Measured over 30 form_submitted events on
// artima.md, zero carried a utm_* value, a $initial_utm_* value, or even a
// $initial_referrer.
//
// Why PostHog's own initial-touch properties can't be relied on: posthog-js is
// loaded through GTM and gated on analytics consent, and on consent restore
// `analytics.js` calls posthog.reset(true) to mint a fresh anonymous identity.
// That discards $initial_utm_* / $initial_referrer, which is why they are
// always empty in the warehouse. First touch has to be captured ourselves.
//
// Consent: capture happens in memory unconditionally so a submit within the
// same page load is attributed, but it is only written to sessionStorage when
// analytics consent is granted. Transmission is already consent-gated — the
// `analytics` wrapper drops captures without consent — so nothing leaves the
// browser before the visitor agrees.

import { hasAnalyticsConsent } from "./consent.js";

const STORAGE_KEY = "artima_first_touch";

// utm_* plus every click id `_inbound_activity` in the CRM has a column for,
// so a value captured here has somewhere to land downstream.
const UTM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
];

const CLICK_ID_KEYS = [
  "fbclid",
  "gclid",
  "ttclid",
  "msclkid",
  "li_fat_id",
  "igshid",
  "dclid",
  "twclid",
  "rdt_cid",
  "gbraid",
  "wbraid",
  "epik",
];

const PAID_CLICK_IDS = CLICK_ID_KEYS;

// In-memory cache. Survives client-side navigation within one page load, which
// matters because the forms call router.replace("/") after a submit and that
// strips the query string off the URL.
let cached = null;

function browserAvailable() {
  return typeof window !== "undefined" && typeof document !== "undefined";
}

function readFromUrl() {
  if (!browserAvailable()) return null;

  let params;
  try {
    params = new URLSearchParams(window.location.search);
  } catch {
    return null;
  }

  const found = {};
  for (const key of [...UTM_KEYS, ...CLICK_ID_KEYS]) {
    const value = params.get(key);
    if (value) found[key] = value;
  }

  if (!Object.keys(found).length) return null;

  found.landing_page = window.location.href;
  found.referrer = document.referrer || null;
  return found;
}

function readFromStorage() {
  if (!browserAvailable()) return null;
  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    // Private mode / storage disabled — the in-memory cache still works.
    return null;
  }
}

function writeToStorage(value) {
  // Only persist once the visitor has accepted analytics. Without consent the
  // in-memory cache is the whole story, which still attributes a submit made
  // during the same page load.
  if (!browserAvailable() || !hasAnalyticsConsent()) return;
  try {
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(value));
  } catch {
    /* storage full or blocked — non-fatal */
  }
}

/**
 * Record first touch if the current URL carries any attribution.
 *
 * First-touch semantics: an existing value is never overwritten, so a visitor
 * who arrives on an ad and then wanders through the site keeps the campaign
 * that actually brought them in.
 *
 * Call once per page load, as early as possible.
 */
export function captureFirstTouch() {
  const existing = cached || readFromStorage();
  if (existing) {
    // Already know first touch. Re-persist in case consent arrived after the
    // initial visit, so it survives the next navigation.
    cached = existing;
    writeToStorage(existing);
    return existing;
  }

  const fromUrl = readFromUrl();
  if (!fromUrl) return null;

  cached = fromUrl;
  writeToStorage(fromUrl);
  return fromUrl;
}

/**
 * Best-known attribution: in-memory, then sessionStorage, then the current URL
 * as a last resort (covers a submit on a fresh load where captureFirstTouch
 * has not run yet).
 */
export function getAttribution() {
  const value = cached || readFromStorage() || readFromUrl();
  if (value && !cached) cached = value;
  return value || {};
}

/**
 * Attribution flattened for an analytics payload, with a derived traffic_type.
 *
 * traffic_type is derived here rather than downstream because the browser is
 * the only place that sees the landing URL. The CRM was classifying
 * fbclid-bearing submissions as REFERRAL, which is how paid website leads went
 * uncounted.
 */
export function getAttributionProperties() {
  const attribution = getAttribution();
  const hasPaidClickId = PAID_CLICK_IDS.some((key) => attribution[key]);
  const hasUtm = UTM_KEYS.some((key) => attribution[key]);

  let trafficType = null;
  if (hasPaidClickId) {
    trafficType = "PAID";
  } else if (hasUtm) {
    // utm_medium is the conventional carrier of paid-ness when no click id is
    // present (e.g. utm_medium=paid_social_leads_ad on the Meta lead forms).
    const medium = (attribution.utm_medium || "").toLowerCase();
    trafficType = /cpc|ppc|paid/.test(medium) ? "PAID" : "CAMPAIGN";
  }

  return {
    ...attribution,
    traffic_type: trafficType,
    // Explicit null rather than undefined so the property is present in the
    // event and downstream mapping can distinguish "not set" from "absent".
    ...Object.fromEntries(
      [...UTM_KEYS, ...CLICK_ID_KEYS]
        .filter((key) => !(key in attribution))
        .map((key) => [key, null]),
    ),
  };
}

export const ATTRIBUTION_KEYS = [...UTM_KEYS, ...CLICK_ID_KEYS];
export const FIRST_TOUCH_STORAGE_KEY = STORAGE_KEY;
