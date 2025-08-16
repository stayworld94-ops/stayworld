// netlify/functions/chat.js
import OpenAI from "openai";

export async function handler(event) {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  try {
    const { message, locale = "en" } = JSON.parse(event.body || "{}");
    if (!message) {
      return { statusCode: 400, body: "Missing message" };
    }

    const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

    const sys = `You are StayWorld's travel concierge. 
- Answer as a helpful, concise hotel booking assistant.
- Detect and respond in the user's locale (${locale}). If the user asks in one language, answer in that language.
- Keep responses short and polite unless the user asks for details.`;

    const completion = await client.chat.completions.create({
      model: "gpt-4.1", // 요청하신 4.1
      messages: [
        { role: "system", content: sys },
        { role: "user", content: message }
      ],
      temperature: 0.3,
    });

    const reply = completion.choices?.[0]?.message?.content?.trim() || "…";

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ reply })
    };
  } catch (err) {
    console.error(err);
    return { statusCode: 500, body: "Server error" };
  }
}
