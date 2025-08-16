// netlify/functions/chatbot.js
import fetch from "node-fetch";

export const handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }
  try{
    const { message, lang = 'en' } = JSON.parse(event.body || '{}');
    if (!message) return { statusCode: 400, body: JSON.stringify({ error: 'message required' }) };

    const prompt = [
      { role: "system", content: `You are StayWorld concierge. Reply in ${lang}. Keep answers short and helpful.` },
      { role: "user", content: message }
    ];

    const r = await fetch('https://api.openai.com/v1/chat/completions', {
      method:'POST',
      headers:{
        'Content-Type':'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4.1",
        messages: prompt,
        temperature: 0.4
      })
    });
    const data = await r.json();
    const reply = data?.choices?.[0]?.message?.content || '(no reply)';
    return { statusCode: 200, body: JSON.stringify({ reply }) };
  }catch(err){
    return { statusCode: 500, body: JSON.stringify({ error: String(err) }) };
  }
};
