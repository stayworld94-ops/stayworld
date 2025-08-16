// Node 18+ (Netlify)에서 native fetch 사용 가능
export async function handler(event) {
  // CORS / Preflight
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      },
      body: "",
    };
  }

  try {
    const key = process.env.OPENAI_API_KEY;
    if (!key) {
      return { statusCode: 500, body: "Missing OPENAI_API_KEY" };
    }

    const { messages = [], lang = "en" } = JSON.parse(event.body || "{}");

    // 프롬프트를 /v1/responses 형식에 맞게 하나의 input으로 합침
    const history = messages
      .map((m) => `${m.role.toUpperCase()}: ${m.content}`)
      .join("\n");

    const system = `
You are StayWorld's AI Concierge.
- Reply in the user's language hint: ${lang}.
- Be concise, helpful, and polite.
- If the user asks about prices or currencies, explain clearly but do not invent real prices.
`;

    const input = `${system}\n\n${history}\n\nASSISTANT:`;

    const r = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${key}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4.1",           // 요청하신 4.1 모델
        input,
        max_output_tokens: 400,     // 필요한 만큼 조정
      }),
    });

    if (!r.ok) {
      const txt = await r.text();
      return {
        statusCode: 502,
        headers: { "Access-Control-Allow-Origin": "*" },
        body: `OpenAI error: ${txt}`,
      };
    }

    const data = await r.json();
    const reply = (data.output_text || "").toString().trim() || "(no content)";

    return {
      statusCode: 200,
      headers: { "Access-Control-Allow-Origin": "*", "Content-Type": "application/json" },
      body: JSON.stringify({ reply }),
    };
  } catch (e) {
    return {
      statusCode: 500,
      headers: { "Access-Control-Allow-Origin": "*" },
      body: `Server error: ${e.message}`,
    };
  }
}
