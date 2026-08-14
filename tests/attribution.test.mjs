import assert from "node:assert/strict";
import test, { beforeEach } from "node:test";

import { CONSENT_COOKIE_NAME } from "../lib/consent.js";

// lib/attribution.js keeps a module-level first-touch cache, so each case
// re-imports it with a cache-busting query to get a clean module instance.
let moduleCounter = 0;
async function freshAttribution() {
  moduleCounter += 1;
  return import(`../lib/attribution.js?case=${moduleCounter}`);
}

function installBrowser({ search = "", consent = true, referrer = "" } = {}) {
  const store = new Map();
  globalThis.window = {
    location: { search, href: `https://artima.md/${search}` },
    sessionStorage: {
      getItem: (k) => (store.has(k) ? store.get(k) : null),
      setItem: (k, v) => store.set(k, String(v)),
      removeItem: (k) => store.delete(k),
    },
  };
  // parseConsent() in lib/consent.js validates version + a parseable
  // updatedAt, so a partial cookie is (correctly) treated as no consent.
  globalThis.document = {
    referrer,
    cookie: consent
      ? `${CONSENT_COOKIE_NAME}=${encodeURIComponent(
          JSON.stringify({
            version: 1,
            analytics: true,
            marketing: true,
            updatedAt: "2026-08-14T00:00:00.000Z",
          }),
        )}`
      : "",
  };
  return store;
}

beforeEach(() => {
  delete globalThis.window;
  delete globalThis.document;
});

test("captures utm params from the landing URL", async () => {
  installBrowser({ search: "?utm_source=facebook&utm_campaign=artima_parking" });
  const { captureFirstTouch, getAttribution } = await freshAttribution();

  captureFirstTouch();
  const a = getAttribution();

  assert.equal(a.utm_source, "facebook");
  assert.equal(a.utm_campaign, "artima_parking");
  assert.equal(a.landing_page, "https://artima.md/?utm_source=facebook&utm_campaign=artima_parking");
});

test("first touch survives the query string being stripped", async () => {
  // The forms call router.replace("/") after submit, which drops the params.
  installBrowser({ search: "?utm_campaign=artima_parking" });
  const { captureFirstTouch, getAttribution } = await freshAttribution();

  captureFirstTouch();
  globalThis.window.location.search = "";
  globalThis.window.location.href = "https://artima.md/";

  assert.equal(getAttribution().utm_campaign, "artima_parking");
});

test("first touch is not overwritten by a later param-less load", async () => {
  installBrowser({ search: "?utm_campaign=first_campaign" });
  const { captureFirstTouch, getAttribution } = await freshAttribution();

  captureFirstTouch();
  globalThis.window.location.search = "?utm_campaign=second_campaign";
  captureFirstTouch();

  assert.equal(getAttribution().utm_campaign, "first_campaign");
});

test("an fbclid alone marks the visit PAID", async () => {
  // This is the case the CRM was recording as REFERRAL, which is how paid
  // website leads went uncounted.
  installBrowser({ search: "?fbclid=abc123" });
  const { captureFirstTouch, getAttributionProperties } = await freshAttribution();

  captureFirstTouch();
  const props = getAttributionProperties();

  assert.equal(props.fbclid, "abc123");
  assert.equal(props.traffic_type, "PAID");
});

test("paid utm_medium marks the visit PAID without a click id", async () => {
  installBrowser({ search: "?utm_source=facebook&utm_medium=paid_social_leads_ad" });
  const { captureFirstTouch, getAttributionProperties } = await freshAttribution();

  captureFirstTouch();
  assert.equal(getAttributionProperties().traffic_type, "PAID");
});

test("organic utm is CAMPAIGN, not PAID", async () => {
  installBrowser({ search: "?utm_source=ig&utm_medium=social&utm_content=link_in_bio" });
  const { captureFirstTouch, getAttributionProperties } = await freshAttribution();

  captureFirstTouch();
  assert.equal(getAttributionProperties().traffic_type, "CAMPAIGN");
});

test("no params yields no traffic_type and null-filled keys", async () => {
  installBrowser({ search: "" });
  const { captureFirstTouch, getAttributionProperties } = await freshAttribution();

  captureFirstTouch();
  const props = getAttributionProperties();

  assert.equal(props.traffic_type, null);
  // Keys are present-but-null so downstream mapping sees "not set", not absent.
  assert.equal(props.utm_campaign, null);
  assert.equal(props.fbclid, null);
});

test("without analytics consent nothing is written to sessionStorage", async () => {
  const store = installBrowser({
    search: "?utm_campaign=artima_parking",
    consent: false,
  });
  const { captureFirstTouch, getAttribution } = await freshAttribution();

  captureFirstTouch();

  assert.equal(store.size, 0, "must not persist before consent");
  // The in-memory cache still attributes a submit in this same page load,
  // and transmission is separately consent-gated by lib/analytics.js.
  assert.equal(getAttribution().utm_campaign, "artima_parking");
});

test("with consent the value is persisted for later navigation", async () => {
  const store = installBrowser({ search: "?utm_campaign=artima_parking" });
  const { captureFirstTouch, FIRST_TOUCH_STORAGE_KEY } = await freshAttribution();

  captureFirstTouch();

  const persisted = JSON.parse(store.get(FIRST_TOUCH_STORAGE_KEY));
  assert.equal(persisted.utm_campaign, "artima_parking");
});

test("reads persisted first touch on a fresh module instance", async () => {
  const store = installBrowser({ search: "?utm_campaign=artima_parking" });
  const first = await freshAttribution();
  first.captureFirstTouch();

  // Simulate a new page load: same storage, no params on the URL.
  globalThis.window.location.search = "";
  globalThis.window.location.href = "https://artima.md/";
  assert.ok(store.size > 0);

  const second = await freshAttribution();
  assert.equal(second.getAttribution().utm_campaign, "artima_parking");
});

test("is inert during server-side rendering", async () => {
  const { captureFirstTouch, getAttribution, getAttributionProperties } =
    await freshAttribution();

  assert.equal(captureFirstTouch(), null);
  assert.deepEqual(getAttribution(), {});
  assert.equal(getAttributionProperties().traffic_type, null);
});
