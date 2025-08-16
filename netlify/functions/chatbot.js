// netlify/functions/chat.js
import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// 허용 도메인(원하면 '*' 로 두세요)
const ALLOW_ORIGIN = process.env.CORS_ORIGIN || "https://stayworldbooking.com";

export async function handler(event) {
  // CORS 프리플라이트
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 204,
      headers: {
        "Access-Control-Allow-Origin": ALLOW_ORIGIN,
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      },
      body: "",
    };
  }

  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  try {
    const { message, lang = "en", history = [] } = JSON.parse(event.body || "{}");

    if (!message || typeof message !== "string") {
      return { statusCode: 400, body: JSON.stringify({ error: "message required" }) };
    }

    // 언어 코드 매핑 (10개국어)
    const code = (lang || "en").toLowerCase();
    const langNameMap = {
      en: "English", ko: "Korean", tr: "Turkish", fr: "French", ja: "Japanese",
      de: "German", es: "Spanish", it: "Italian", zh: "Chinese", ru: "Russian"
    };
    const langName = langNameMap[code] || "English";

    const system = [
      "You are StayWorld's AI Concierge.",
      "Be concise, helpful, and friendly.",
      "You can help users search for destinations, dates, prices, payment options (Cards, bank transfer, BTC/ETH/USDT), membership, and account issues.",
      `Always reply in ${langName}.`,
      "If user asks for payments, mention: Visa, Mastercard, Amex, bank transfer, and crypto (BTC • ETH • USDT).",
      "If user asks you to search, ask for city and dates (check-in, check-out) and guests.",
    ].join(" ");

    // 대화 컨텍스트 구성 (선택적 history)
    const messages = [
      { role: "system", content: system },
      ...history.slice(-8),           // 최근 8개만
      { role: "user", content: message }
    ];

    const completion = await openai.chat.completions.create({
      model: "gpt-4.1",
      messages,
      temperature: 0.4,
      max_tokens: 400,
    });

    const reply =
      completion?.choices?.[0]?.message?.content?.trim() ||
      (code === "ko" ? "죄송해요. 잠시 후 다시 시도해 주세요." : "Sorry, please try again.");

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": ALLOW_ORIGIN,
      },
      body: JSON.stringify({ reply }),
    };
  } catch (err) {
    console.error(err);
    return {
      statusCode: 500,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": ALLOW_ORIGIN,
      },
      body: JSON.stringify({ error: "server_error" }),
    };
  }
}
