// netlify/functions/sw-chat.js
export async function handler(event) {
  if (event.httpMethod === 'OPTIONS') return { statusCode: 204, headers: cors() };

  try {
    const { messages = [], lang = 'en' } = JSON.parse(event.body || '{}');
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) return json(500, { error: 'Missing OPENAI_API_KEY' });

    const r = await fetch('https://api.openai.com/v1/responses', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'gpt-4.1',
        input: [{ role: 'system', content: `You are StayWorld concierge. Reply in ${lang}.` }, ...messages]
      })
    });

    if (!r.ok) return json(r.status, { error: await r.text() });
    const data = await r.json();
    return json(200, { reply: extractReply(data) });
  } catch (e) {
    return json(500, { error: e.message || 'Server error' });
  }
}

const cors = () => ({
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST,OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
});
const json = (code, obj) => ({ statusCode: code, headers: cors(), body: JSON.stringify(obj) });

function extractReply(data){
  const c = data?.output_text || data?.choices?.[0]?.message?.content || data?.choices?.[0]?.message?.trim?.() || '';
  return Array.isArray(c) ? c.map(p=>p.text||'').join('') : String(c);
}
