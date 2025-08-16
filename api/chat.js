// /api/chat.js
export default async function handler(req, res) {
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    return res.status(204).end();
  }

  try {
    const { messages = [], lang = 'en' } = req.body || {};
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) return res.status(500).json({ error: 'Missing OPENAI_API_KEY' });

    const r = await fetch('https://api.openai.com/v1/responses', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'gpt-4.1',
        input: [{ role: 'system', content: `You are StayWorld concierge. Reply in ${lang}.` }, ...messages]
      })
    });

    if (!r.ok) return res.status(r.status).send(await r.text());
    const data = await r.json();
    res.setHeader('Access-Control-Allow-Origin', '*');
    return res.status(200).json({ reply: extractReply(data) });
  } catch (e) {
    return res.status(500).json({ error: e.message || 'Server error' });
  }
}

function extractReply(data){
  const c = data?.output_text || data?.choices?.[0]?.message?.content || data?.choices?.[0]?.message?.trim?.() || '';
  return Array.isArray(c) ? c.map(p=>p.text||'').join('') : String(c);
}
