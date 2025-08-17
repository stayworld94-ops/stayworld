// netlify/functions/sw-chat.js
// Node 18+ 런타임 가정. OPENAI_API_KEY 없으면 데모 답변으로 동작합니다.

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ error: "Method Not Allowed" }),
    };
  }

  try {
    const { messages = [], lang = "en" } = JSON.parse(event.body || "{}");

    // 1) 데모/백업 모드: API 키가 없으면 에코형 간단 답변
    if (!process.env.OPENAI_API_KEY) {
      const last = messages.findLast?.(m => m.role === "user") || messages[messages.length - 1];
      const userText = last?.content || "";
      const reply = `[DEMO:${lang}] ${userText ? "You said: " + userText : "Hello! Add OPENAI_API_KEY for real chat."}`;
      return {
        statusCode: 200,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reply }),
      };
    }

    // 2) 실제 모델 연동(일반 프록시). 필요시 시스템 프롬프트/언어 힌트.
    const sys = {
      role: "system",
      content:
        "You are a multilingual hotel concierge for STAYWORLD. Be concise and helpful. If the user speaks Korean, reply in Korean; otherwise reply in the user's language.",
    };

    // OpenAI Chat Completions API (Node 18+ fetch)
    const r = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4o-mini", // 사용 중인 모델로 교체 가능
        messages: [sys, ...messages, { role: "user", content: `LANG=${lang}` }],
        temperature: 0.3,
      }),
    });

    if (!r.ok) {
      const bad = await r.text();
      return {
        statusCode: 500,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ error: "Upstream error", detail: bad }),
      };
    }

    const data = await r.json();
    const reply = data?.choices?.[0]?.message?.content || "Sorry, I couldn't generate a reply.";
    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ reply }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ error: err?.message || "Unknown error" }),
    };
  }
};
