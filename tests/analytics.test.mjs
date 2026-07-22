import assert from "node:assert/strict";
import { after, test } from "node:test";
import { saveConsent } from "../lib/consent.js";
import {
  analytics,
  applyAnalyticsConsent,
  initializeConsentMode,
  initializePostHogIfAllowed,
} from "../lib/analytics.js";

function createBrowser() {
  const cookies = new Map();
  const scripts = new Map();
  const appendedScripts = [];

  const posthogCalls = {
    capture: [],
    identify: [],
    optIn: 0,
    optOut: 0,
    reset: 0,
    setConfig: [],
    startRecording: 0,
    stopRecording: 0,
    persistenceClear: 0,
    sessionPersistenceClear: 0,
  };

  const document = {
    head: {
      appendChild(script) {
        scripts.set(script.id, script);
        appendedScripts.push(script);
        window.posthog = {
          __loaded: true,
          __request_queue: [{ event: "queued" }],
          _requestQueue: { _queue: [{ event: "pending" }] },
          _retryQueue: { _queue: [{ event: "retry" }] },
          capture(...args) {
            posthogCalls.capture.push(args);
          },
          identify(...args) {
            posthogCalls.identify.push(args);
          },
          alias() {},
          config: { session_recording: { recordCrossOriginIframes: false } },
          set_config(config) {
            posthogCalls.setConfig.push(config);
          },
          opt_in_capturing(options) {
            posthogCalls.optIn += 1;
            posthogCalls.optInOptions = options;
          },
          startSessionRecording() {
            posthogCalls.startRecording += 1;
          },
          stopSessionRecording() {
            posthogCalls.stopRecording += 1;
          },
          opt_out_capturing() {
            posthogCalls.optOut += 1;
          },
          reset() {
            posthogCalls.reset += 1;
          },
          persistence: {
            clear() {
              posthogCalls.persistenceClear += 1;
            },
          },
          sessionPersistence: {
            clear() {
              posthogCalls.sessionPersistenceClear += 1;
            },
          },
        };
        queueMicrotask(() => script.onload?.());
      },
    },
    createElement() {
      return {};
    },
    getElementById(id) {
      return scripts.get(id) || null;
    },
    get cookie() {
      return [...cookies.entries()]
        .map(([name, value]) => `${name}=${value}`)
        .join("; ");
    },
    set cookie(assignment) {
      const [pair] = assignment.split(";");
      const separator = pair.indexOf("=");
      const name = pair.slice(0, separator);
      const value = pair.slice(separator + 1);
      if (assignment.includes("Max-Age=0")) cookies.delete(name);
      else cookies.set(name, value);
    },
  };

  const window = {
    dataLayer: [],
    location: { protocol: "https:" },
    setInterval,
    clearInterval,
  };

  return { appendedScripts, document, posthogCalls, window };
}

const browser = createBrowser();
globalThis.document = browser.document;
globalThis.window = browser.window;

after(() => {
  delete globalThis.document;
  delete globalThis.window;
});

test("first visit and reject do not load GTM or PostHog", async () => {
  initializeConsentMode();
  await applyAnalyticsConsent(false);
  await initializePostHogIfAllowed();

  assert.equal(browser.appendedScripts.length, 0);
  assert.equal(window.posthog, undefined);
  assert.equal(
    window.dataLayer.some(
      (entry) => entry[0] === "consent" && entry[2].analytics_storage === "denied",
    ),
    true,
  );
});

test("accept loads GTM once and enables consent-aware capture", async () => {
  saveConsent({ analytics: true });
  const [first, second] = await Promise.all([
    initializePostHogIfAllowed(),
    initializePostHogIfAllowed(),
  ]);

  assert.equal(first, true);
  assert.equal(second, true);
  assert.equal(browser.appendedScripts.length, 1);
  assert.equal(browser.posthogCalls.optIn, 1);
  assert.equal(browser.posthogCalls.startRecording, 1);
  assert.deepEqual(browser.posthogCalls.optInOptions, {
    captureEventName: false,
  });
  assert.deepEqual(browser.posthogCalls.setConfig, [
    {
      capture_pageview: "history_change",
      mask_personal_data_properties: true,
      persistence: "localStorage+cookie",
      session_recording: {
        maskAllInputs: true,
        recordCrossOriginIframes: false,
      },
    },
  ]);
  assert.match(browser.appendedScripts[0].src, /googletagmanager\.com\/gtm\.js/);

  analytics.capture("form_submitted", {
    source: "hero",
    email: "private@example.com",
    phone: "+37300000000",
    name: "Private Name",
  });
  assert.deepEqual(browser.posthogCalls.capture, [
    ["form_submitted", { source: "hero" }, undefined],
  ]);

  analytics.identify("private@example.com", { plan: "lead" });
  assert.equal(browser.posthogCalls.identify.length, 0);
  analytics.identify("internal-123", { plan: "lead", email: "private@example.com" });
  assert.deepEqual(browser.posthogCalls.identify, [
    ["internal-123", { plan: "lead" }, undefined],
  ]);
});

test("revocation stops replay, opts out, clears PostHog state, and blocks capture", async () => {
  saveConsent({ analytics: false });
  await applyAnalyticsConsent(false);

  assert.equal(browser.posthogCalls.stopRecording, 1);
  assert.equal(browser.posthogCalls.optOut, 2);
  assert.equal(browser.posthogCalls.reset, 1);
  assert.equal(browser.posthogCalls.persistenceClear, 1);
  assert.equal(browser.posthogCalls.sessionPersistenceClear, 1);
  assert.equal(window.posthog.__request_queue.length, 0);
  assert.equal(window.posthog._requestQueue._queue.length, 0);
  assert.equal(window.posthog._retryQueue._queue.length, 0);

  analytics.capture("after_revoke", { source: "test" });
  analytics.identify("internal-456", { plan: "lead" });
  assert.equal(browser.posthogCalls.capture.length, 1);
  assert.equal(browser.posthogCalls.identify.length, 1);
});

test("accepting again resumes the existing SDK without loading GTM twice", async () => {
  saveConsent({ analytics: true });
  await applyAnalyticsConsent(true);

  assert.equal(browser.appendedScripts.length, 1);
  assert.equal(browser.posthogCalls.optIn, 2);
  assert.equal(browser.posthogCalls.startRecording, 2);
});
