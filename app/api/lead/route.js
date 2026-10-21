import { NextResponse } from "next/server";

// Forwards a website lead to ENSO's intake (n8n). The secret lives only in the
// server environment: ENSO_INTAKE_URL and ENSO_INTAKE_SECRET.

const FORWARDED_FIELDS = [
  "submission_id",
  "name",
  "email",
  "phone",
  "placement",
  "host",
  "url",
  "timestamp",
  "referrer",
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
  "fbp",
  "fbc",
  "roistat_visit",
  "distinct_id",
  "areaSelect",
];

// Best effort only: serverless instances don't share memory, so this slows a
// single noisy client down rather than enforcing a hard limit.
const RATE_LIMIT = 5;
const RATE_WINDOW_MS = 10 * 60 * 1000;
const recentRequests = new Map();

function isRateLimited(ip) {
  const now = Date.now();
  const timestamps = (recentRequests.get(ip) || []).filter(
    (time) => now - time < RATE_WINDOW_MS,
  );
  timestamps.push(now);
  recentRequests.set(ip, timestamps);
  return timestamps.length > RATE_LIMIT;
}

function clientIp(request) {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) return forwardedFor.split(",")[0].trim();
  return (
    request.headers.get("x-nf-client-connection-ip") ||
    request.headers.get("x-real-ip") ||
    null
  );
}

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  // Honeypot: people never see this field, bots fill it. Pretend success.
  if (body.website) return NextResponse.json({ ok: true });

  const name = String(body.name || "").trim();
  const email = String(body.email || "").trim();
  const phone = String(body.phone || "").trim();
  if (!body.submission_id || name.length < 2 || (!email && !phone)) {
    return NextResponse.json({ error: "invalid_lead" }, { status: 400 });
  }

  const ip = clientIp(request);
  if (ip && isRateLimited(ip)) {
    return NextResponse.json({ error: "too_many_requests" }, { status: 429 });
  }

  const intakeUrl = process.env.ENSO_INTAKE_URL;
  const intakeSecret = process.env.ENSO_INTAKE_SECRET;
  if (!intakeUrl || !intakeSecret) {
    console.error("[lead] ENSO_INTAKE_URL or ENSO_INTAKE_SECRET is not set");
    return NextResponse.json({ error: "not_configured" }, { status: 500 });
  }

  const payload = {};
  for (const field of FORWARDED_FIELDS) {
    if (body[field] !== undefined && body[field] !== null && body[field] !== "") {
      payload[field] = body[field];
    }
  }
  payload.name = name;
  if (ip) payload.ip = ip;
  const userAgent = request.headers.get("user-agent");
  if (userAgent) payload.user_agent = userAgent;

  // One retry on a network error or 5xx. ENSO deduplicates by submission_id,
  // so a retry never creates a second lead.
  for (let attempt = 0; attempt < 2; attempt += 1) {
    try {
      const response = await fetch(intakeUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-intake-secret": intakeSecret,
        },
        body: JSON.stringify(payload),
        signal: AbortSignal.timeout(10000),
      });
      if (response.ok) return NextResponse.json({ ok: true });
      console.error(`[lead] intake answered ${response.status}`);
      if (response.status < 500) break;
    } catch (error) {
      console.error("[lead] intake request failed", error);
    }
  }

  return NextResponse.json({ error: "delivery_failed" }, { status: 502 });
}
