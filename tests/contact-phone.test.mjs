import assert from "node:assert/strict";
import { test } from "node:test";

import {
  FALLBACK_PHONE_DISPLAY,
  FALLBACK_PHONE_HREF,
  FALLBACK_PHONE_NUMBER,
  formatContactPhone,
  normalizeContactPhone,
} from "../lib/contact-phone.js";

test("Artima fallback phone is callable and consistently formatted", () => {
  assert.equal(FALLBACK_PHONE_NUMBER, "+37376040824");
  assert.equal(FALLBACK_PHONE_HREF, "tel:+37376040824");
  assert.equal(FALLBACK_PHONE_DISPLAY, "+373 76 040 824");
});

test("Moldovan local phone formats are normalized", () => {
  assert.equal(normalizeContactPhone("076 040 824"), "+37376040824");
  assert.equal(normalizeContactPhone("76 040 824"), "+37376040824");
  assert.equal(formatContactPhone("+37376040824"), "+373 76 040 824");
});
