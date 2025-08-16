/** netlify/functions/sw-chat.js */
import OpenAI from "openai";

export async function handler(event) {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }
  try {
    const { messages = [], model = "gpt-4.1" } = JSON.parse(event.body || "{}");
    const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    const r = await client.chat.completions.create({
      model,
      messages: messages.map(m => ({ role: m.role, content: String(m.content || "") })),
      temperature: 0.2,
    });
    const reply = r.choices?.[0]?.message?.content || "";
    return { statusCode: 200, body: JSON.stringify({ reply }) };
  } catch (e) {
    return { statusCode: 500, body: JSON.stringify({ error: String(e) }) };
  }
}
