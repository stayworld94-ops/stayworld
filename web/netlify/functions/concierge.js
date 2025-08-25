// web/netlify/functions/concierge.js
const fetch = global.fetch;

function cors() {
  return {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
  };
}
function json(obj, status = 200) {
  return {
    statusCode: status,
    headers: { "Content-Type": "application/json", ...cors() },
    body: JSON.stringify(obj),
  };
}
function quickRule(q) {
  const s = (q || "").toLowerCase();
  if (!s) return null;
  if (/(contact|host|chat)/.test(s)) return "Connecting you to your host…";
  if (/(booking|reservation|id)/.test(s))
    return "Please share your booking ID (e.g., SW-2025-1234).";
  if (/(cities|city|recommend)/.test(s))
    return "Top picks: Istanbul · Tokyo · Paris · Bangkok · Barcelona.";
  if (/(support|help)/.test(s)) return "Support is here 24/7. Tell me what happened.";
  return null;
}
exports.handler = async (event) => {
  if (event.httpMethod === "OPTIONS")
    return { statusCode: 204, headers: cors(), body: "" };
  if (event.httpMethod !== "POST")
    return { statusCode: 405, headers: cors(), body: "Method Not Allowed" };

  try {
    const body = JSON.parse(event.body || "{}");
    const q = String(body.q || "").slice(0, 2000);

    const rule = quickRule(q);
    if (rule) return json({ answer: rule });

    const key = process.env.OPENAI_API_KEY;
    if (!key) {
      return json({
        answer:
          "I can help with bookings, hosts, or destinations. What do you need?",
      });
    }

    const r = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${key}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content:
              "You are StayWorld Concierge. Be concise and helpful for travel/booking.",
          },
          { role: "user", content: q },
        ],
        temperature: 0.3,
        max_tokens: 400,
      }),
    });

    if (!r.ok) {
      return json({
        answer:
          "I can help with bookings, hosts, or destinations. What do you need?",
      });
    }
    const data = await r.json();
    const answer =
      data?.choices?.[0]?.message?.content ||
      "I can help with bookings, hosts, or destinations. What do you need?";
    return json({ answer });
  } catch (e) {
    return json({
      answer: "Something went wrong. Please try again.",
      error: String(e?.message || e),
    });
  }
};
