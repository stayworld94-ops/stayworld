// netlify/functions/sw-chat.js
// OpenAI 챗봇 백엔드 (CORS + 오류처리 포함)

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

exports.handler = async (event) => {
  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 200, headers: CORS_HEADERS, body: "" };
  }

  if (event.httpMethod !== "POST") {
    return { statusCode: 405, headers: CORS_HEADERS, body: "Method Not Allowed" };
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return {
      statusCode: 500,
      headers: CORS_HEADERS,
      body: JSON.stringify({ reply: "Server misconfigured: missing OPENAI_API_KEY" }),
    };
  }

  try {
    const { messages = [], lang = "en" } = JSON.parse(event.body || "{}");

    // 시스템 프롬프트(가벼움)
    const sys = {
      role: "system",
      content:
        `You are STAYWORLD AI Concierge. Reply briefly and helpfully. Language hint: ${lang}.`,
    };

    const payload = {
      model: "gpt-4o-mini",
      messages: [sys, ...messages],
      temperature: 0.5,
      max_tokens: 400,
    };

    const r = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify(payload),
    });

    if (!r.ok) {
      const txt = await r.text();
      return {
        statusCode: 500,
        headers: CORS_HEADERS,
        body: JSON.stringify({ reply: `OpenAI error: ${txt.slice(0, 500)}` }),
      };
    }

    const j = await r.json();
    const reply = j.choices?.[0]?.message?.content?.trim() || "(no response)";
    return { statusCode: 200, headers: CORS_HEADERS, body: JSON.stringify({ reply }) };
  } catch (e) {
    return {
      statusCode: 500,
      headers: CORS_HEADERS,
      body: JSON.stringify({ reply: `Server error: ${String(e).slice(0, 500)}` }),
    };
  }
};
