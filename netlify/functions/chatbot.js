// 파일 위치: netlify/functions/chatbot.js

import fetch from "node-fetch";

export async function handler(event, context) {
  try {
    if (event.httpMethod !== "POST") {
      return {
        statusCode: 405,
        body: JSON.stringify({ error: "Method Not Allowed" })
      };
    }

    const { message, lang } = JSON.parse(event.body);

    if (!message) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "No message provided" })
      };
    }

    // OpenAI API 호출
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}` // Netlify 환경변수에 설정 필요
      },
      body: JSON.stringify({
        model: "gpt-4o-mini", // 비용 효율적인 모델
        messages: [
          {
            role: "system",
            content: `You are an AI assistant for StayWorld. Always answer in ${lang || "English"}.`
          },
          { role: "user", content: message }
        ],
        max_tokens: 300
      })
    });

    const data = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify({
        reply: data.choices?.[0]?.message?.content || "Sorry, I could not generate a response."
      })
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
}
