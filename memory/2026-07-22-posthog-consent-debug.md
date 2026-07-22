# PostHog consent debug report — 2026-07-22

- **Symptom:** Playwright reported that accepting consent did not load analytics, saved consent was not restored after reload, and revocation did not stop or clear PostHog. The server also warned that `hasAnalyticsConsent` was not exported.
- **Root cause:** `ConsentManager` had been switched to a small `syncPostHog` helper while `lib/analytics.js` still depended on the previous consent API. This bypassed the GTM loader and full PostHog lifecycle, and removed the mount-time restore path.
- **Fix:** Restored the validated, SSR-safe consent API and subscriber notifications; routed initial and changed consent through `applyAnalyticsConsent`; kept marketing consent granular instead of granting ad storage from analytics consent.
- **Evidence:** `npm test` 8/8; targeted ESLint passed; `npx tsc --noEmit` passed; `npm run build` passed; temporary Playwright suite 8/8 on `/` and `/ru`.
- **Regression tests:** `tests/consent.test.mjs`, `tests/analytics.test.mjs`, plus the temporary Playwright suite at `/private/tmp/artima-playwright/consent.e2e.cjs`.
- **Related:** Existing unrelated project-wide React key, hook dependency, and image warnings remain in the production build.
- **Status:** DONE
