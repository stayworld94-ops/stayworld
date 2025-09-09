// _chatHelpers.js
const crypto = require("crypto");

function decodeBody(event) {
  // Netlify는 event.body가 base64일 수도 있음
  const raw = event.isBase64Encoded
    ? Buffer.from(event.body || "", "base64").toString("utf8")
    : (event.body || "");
  return raw;
}

function json(status, body) {
  return {
    statusCode: status,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  };
}

function ok(body = { success: true }) { return json(200, body); }
function bad(msg = "Bad Request") { return json(400, { error: msg }); }
function fail(msg = "Internal Server Error") { return json(500, { error: msg }); }

// --- NOWPayments 검증: HMAC-SHA512(rawBody, IPN_SECRET) === header ---
function verifyNowpayments(event, ipnSecret) {
  const sigHeader =
    event.headers["x-nowpayments-sig"] ||
    event.headers["X-Nowpayments-Sig"] ||
    event.headers["x-NowPayments-Sig"];
  if (!sigHeader || !ipnSecret) return false;

  const raw = decodeBody(event);
  const calc = crypto.createHmac("sha512", ipnSecret).update(raw).digest("hex");
  // 시간/대소문자 안전 비교
  return crypto.timingSafeEqual(Buffer.from(calc), Buffer.from(sigHeader.toLowerCase()));
}

// --- PayPal IPN 검증: cmd=_notify-validate 붙여 재전송 → "VERIFIED" ---
async function verifyPaypalIPN(event, { useSandbox = false } = {}) {
  const raw = decodeBody(event);
  // IPN은 x-www-form-urlencoded로 온다 → 그대로 붙여서 검증
  const body = "cmd=_notify-validate&" + raw;
  const url = useSandbox
    ? "https://ipnpb.sandbox.paypal.com/cgi-bin/webscr"
    : "https://ipnpb.paypal.com/cgi-bin/webscr";

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded", "User-Agent": "StayWorld-IPN-Verify" },
    body
  });
  const text = (await res.text()).trim();
  return text === "VERIFIED";
}

module.exports = { ok, bad, fail, decodeBody, verifyNowpayments, verifyPaypalIPN };
