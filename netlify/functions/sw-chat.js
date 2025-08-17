// netlify/functions/sw-chat.js
exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, headers: { "Content-Type": "application/json" }, body: JSON.stringify({ error: "Method Not Allowed" }) };
  }

  try {
    const { messages = [], lang = "en" } = JSON.parse(event.body || "{}");

    // 데모 모드(키가 없을 때) — 최소 동작 확인용
    if (!process.env.OPENAI_API_KEY) {
      const last = messages.at?.(-1) || messages[messages.length - 1];
      const userText = last?.content || "";
      return {
        statusCode: 200,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reply: `[DEMO:${lang}] ${userText ? "You said: " + userText : "Hello! Add OPENAI_API_KEY for real chat."}` }),
      };
    }

    const sys = {
      role: "system",
      content:
        "You are a multilingual hotel concierge for STAYWORLD. Be concise and helpful. If the user speaks Korean, reply in Korean; otherwise reply in the user's language.",
    };

    const r = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [sys, ...messages, { role: "user", content: `LANG=${lang}` }],
        temperature: 0.3,
      }),
    });

    if (!r.ok) {
      const detail = await r.text();
      return { statusCode: 500, headers: { "Content-Type": "application/json" }, body: JSON.stringify({ error: "Upstream error", detail }) };
    }

    const data = await r.json();
    const reply = data?.choices?.[0]?.message?.content || "Sorry, I couldn't generate a reply.";
    return { statusCode: 200, headers: { "Content-Type": "application/json" }, body: JSON.stringify({ reply }) };
  } catch (err) {
    return { statusCode: 500, headers: { "Content-Type": "application/json" }, body: JSON.stringify({ error: err?.message || "Unknown error" }) };
  }
};
