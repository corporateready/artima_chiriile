import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import { createServer } from "node:net";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { spawn } from "node:child_process";
import { after, before, test } from "node:test";
import { chromium } from "playwright-core";

const projectRoot = dirname(dirname(fileURLToPath(import.meta.url)));
const postHogBundlePath = join(
  projectRoot,
  "node_modules/posthog-js/dist/array.js",
);

let appServer;
let appUrl;
let browser;

async function getFreePort() {
  return new Promise((resolve, reject) => {
    const server = createServer();
    server.once("error", reject);
    server.listen(0, "127.0.0.1", () => {
      const address = server.address();
      server.close(() => resolve(address.port));
    });
  });
}

async function waitForServer(url) {
  const deadline = Date.now() + 30_000;
  while (Date.now() < deadline) {
    if (appServer.exitCode !== null) {
      throw new Error(`Next.js exited before becoming ready (${appServer.exitCode})`);
    }
    try {
      const response = await fetch(url);
      if (response.ok) return;
    } catch {}
    await new Promise((resolve) => setTimeout(resolve, 100));
  }
  throw new Error(`Next.js did not become ready at ${url}`);
}

async function findChromeExecutable() {
  const candidates = [
    process.env.CHROME_PATH,
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    "/usr/bin/google-chrome",
    "/usr/bin/google-chrome-stable",
    "/usr/bin/chromium",
    "/usr/bin/chromium-browser",
  ].filter(Boolean);

  for (const candidate of candidates) {
    try {
      await access(candidate);
      return candidate;
    } catch {}
  }

  throw new Error(
    "Chrome/Chromium not found. Set CHROME_PATH to run the browser regression test.",
  );
}

before(async () => {
  const port = await getFreePort();
  appUrl = `http://127.0.0.1:${port}`;
  appServer = spawn(
    process.execPath,
    [join(projectRoot, "node_modules/next/dist/bin/next"), "start", "-p", String(port)],
    {
      cwd: projectRoot,
      env: { ...process.env, NODE_ENV: "production" },
      stdio: ["ignore", "pipe", "pipe"],
    },
  );
  await waitForServer(appUrl);

  browser = await chromium.launch({
    executablePath: await findChromeExecutable(),
    headless: true,
  });
});

after(async () => {
  await browser?.close();
  if (appServer?.exitCode === null) {
    appServer.kill("SIGTERM");
    await new Promise((resolve) => appServer.once("exit", resolve));
  }
});

test("revoking analytics sends no /flags/ request and disables PostHog persistence", async () => {
  const context = await browser.newContext();
  const page = await context.newPage();
  const postHogBundle = await readFile(postHogBundlePath, "utf8");
  const postHogRequests = [];

  page.on("request", (request) => {
    if (request.url().startsWith("https://posthog.test/")) {
      postHogRequests.push(request.url());
    }
  });

  await page.route("https://www.googletagmanager.com/gtm.js**", async (route) => {
    const bootstrap = `
      window.posthog = {
        _i: [[
          "phc_browser_regression",
          {
            api_host: "https://posthog.test",
            ui_host: "https://posthog.test",
            autocapture: false,
            capture_pageview: false,
            disable_session_recording: true,
            advanced_disable_feature_flags_on_first_load: true,
            request_batching: false
          },
          "posthog"
        ]]
      };
    `;
    await route.fulfill({
      body: `${bootstrap}\n${postHogBundle}`,
      contentType: "application/javascript",
      status: 200,
    });
  });

  await page.route("https://posthog.test/**", async (route) => {
    await route.fulfill({
      body: JSON.stringify({ flags: {}, featureFlags: {} }),
      contentType: "application/json",
      status: 200,
    });
  });

  await page.goto(appUrl, { waitUntil: "domcontentloaded" });
  await page.getByRole("button", { name: "Acceptă toate" }).click();
  await page.waitForFunction(() => window.posthog?.__loaded === true);
  await page.waitForTimeout(100);

  const settingsButton = page.getByRole("button", {
    name: "Preferințe cookie-uri",
  });
  await settingsButton.click();
  const settingsDialog = page.getByRole("dialog", {
    name: "Preferințe cookie-uri",
  });
  await assert.doesNotReject(() => settingsDialog.waitFor({ state: "visible" }));
  assert.equal(
    await settingsDialog
      .getByRole("switch", { name: "Analiză și performanță" })
      .getAttribute("aria-checked"),
    "true",
  );
  await settingsDialog.getByRole("button", { name: "Închide" }).click();
  await assert.doesNotReject(() => settingsButton.waitFor({ state: "visible" }));

  postHogRequests.length = 0;
  await settingsButton.click();
  await page
    .getByRole("dialog")
    .getByRole("button", { name: "Respinge" })
    .click();
  await page.waitForTimeout(100);

  assert.deepEqual(
    postHogRequests.filter((url) => new URL(url).pathname.includes("/flags")),
    [],
    "PostHog must not request /flags/ after consent is revoked",
  );

  const state = await page.evaluate(() => ({
    optedOut: window.posthog.has_opted_out_capturing(),
    optOutPersistenceByDefault:
      window.posthog.config.opt_out_persistence_by_default,
    postHogLocalStorageKeys: Object.keys(window.localStorage).filter((key) =>
      /^ph_.*_posthog$/.test(key),
    ),
    postHogCookies: document.cookie
      .split(";")
      .map((cookie) => cookie.trim().split("=")[0])
      .filter((name) => /^ph_.*_posthog$/.test(name)),
  }));

  assert.equal(state.optedOut, true);
  assert.equal(state.optOutPersistenceByDefault, true);
  assert.deepEqual(state.postHogLocalStorageKeys, []);
  assert.deepEqual(state.postHogCookies, []);

  await context.close();
});
