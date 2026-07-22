import assert from "node:assert/strict";
import { afterEach, beforeEach, test } from "node:test";
import {
  CONSENT_COOKIE_NAME,
  clearConsent,
  hasAnalyticsConsent,
  loadConsent,
  saveConsent,
  subscribeToConsent,
} from "../lib/consent.js";

function createCookieDocument() {
  const cookies = new Map();
  let lastAssignment = "";

  return {
    get cookie() {
      return [...cookies.entries()]
        .map(([name, value]) => `${name}=${value}`)
        .join("; ");
    },
    set cookie(assignment) {
      lastAssignment = assignment;
      const [pair, ...attributes] = assignment.split(";").map((part) => part.trim());
      const separator = pair.indexOf("=");
      const name = pair.slice(0, separator);
      const value = pair.slice(separator + 1);
      const maxAge = attributes.find((attribute) =>
        attribute.toLowerCase().startsWith("max-age="),
      );

      if (maxAge === "Max-Age=0") cookies.delete(name);
      else cookies.set(name, value);
    },
    get lastAssignment() {
      return lastAssignment;
    },
    setRawCookie(name, value) {
      cookies.set(name, value);
    },
  };
}

beforeEach(() => {
  globalThis.document = createCookieDocument();
  globalThis.window = { location: { protocol: "https:" } };
});

afterEach(() => {
  delete globalThis.document;
  delete globalThis.window;
});

test("SSR and an absent cookie default analytics consent to false", () => {
  delete globalThis.document;
  delete globalThis.window;

  assert.equal(loadConsent(), null);
  assert.equal(hasAnalyticsConsent(), false);
  assert.equal(saveConsent({ analytics: true }), null);
});

test("accept and reject are persisted in the versioned essential cookie", () => {
  const accepted = saveConsent({ analytics: true });

  assert.equal(accepted.analytics, true);
  assert.deepEqual(loadConsent(), accepted);
  assert.equal(hasAnalyticsConsent(), true);
  assert.match(document.lastAssignment, new RegExp(`^${CONSENT_COOKIE_NAME}=`));
  assert.match(document.lastAssignment, /Max-Age=31536000/);
  assert.match(document.lastAssignment, /Path=\//);
  assert.match(document.lastAssignment, /SameSite=Lax/);
  assert.match(document.lastAssignment, /Secure/);

  const rejected = saveConsent({ analytics: false });
  assert.equal(rejected.analytics, false);
  assert.equal(hasAnalyticsConsent(), false);
});

test("subscribers are notified and consent can be cleared", () => {
  const updates = [];
  const unsubscribe = subscribeToConsent((consent) => updates.push(consent));

  const saved = saveConsent({ analytics: true });
  clearConsent();
  assert.equal(loadConsent(), null);
  unsubscribe();
  saveConsent({ analytics: false });

  assert.deepEqual(updates, [saved, null]);
});

test("corrupt, incomplete, or unknown-version cookies are treated as absent", () => {
  const invalidValues = [
    "%not-json",
    encodeURIComponent(JSON.stringify({ version: 2, analytics: true, updatedAt: new Date().toISOString() })),
    encodeURIComponent(JSON.stringify({ version: 1, analytics: true })),
    encodeURIComponent(JSON.stringify({ version: 1, analytics: "yes", updatedAt: new Date().toISOString() })),
  ];

  for (const value of invalidValues) {
    document.setRawCookie(CONSENT_COOKIE_NAME, value);
    assert.equal(loadConsent(), null);
    assert.equal(hasAnalyticsConsent(), false);
  }
});
