import { loadConsent } from "./consent";

const URL_PARAMS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
  "fbclid",
  "gclid",
  "gbraid",
  "wbraid",
  "ttclid",
  "msclkid",
];

function readCookie(name) {
  const prefix = `${name}=`;
  const part = document.cookie
    .split(";")
    .map((item) => item.trim())
    .find((item) => item.startsWith(prefix));
  return part ? decodeURIComponent(part.slice(prefix.length)) : null;
}

// Sends the lead to ENSO through our own server route (/api/lead). This is not
// gated by cookie consent: the visitor asked to be contacted. Only the
// cookie-based identifiers below depend on consent. Resolves to true once ENSO
// has the lead, false otherwise.
export async function submitLead({
  submissionId,
  name,
  email,
  phone,
  placement,
  honeypot,
}) {
  const params = new URLSearchParams(window.location.search);
  const payload = {
    submission_id: submissionId,
    name,
    email,
    phone,
    placement,
    host: window.location.hostname,
    url: window.location.href,
    timestamp: new Date().toISOString(),
  };

  if (document.referrer) payload.referrer = document.referrer;
  for (const key of URL_PARAMS) {
    const value = params.get(key);
    if (value) payload[key] = value;
  }

  const consent = loadConsent();
  if (consent?.marketing === true) {
    const fbp = readCookie("_fbp");
    const fbc = readCookie("_fbc");
    const roistatVisit = readCookie("roistat_visit");
    if (fbp) payload.fbp = fbp;
    if (fbc) payload.fbc = fbc;
    if (roistatVisit) payload.roistat_visit = roistatVisit;
  }
  if (consent?.analytics === true && window.posthog?.get_distinct_id) {
    payload.distinct_id = window.posthog.get_distinct_id();
  }
  if (honeypot) payload.website = honeypot;

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 15000);
  try {
    const response = await fetch("/api/lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });
    return response.ok;
  } catch {
    return false;
  } finally {
    clearTimeout(timer);
  }
}
