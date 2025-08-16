// api/chat.js  (Vercel Serverless Function)
export default async function handler(req, res) {
  // CORS/프리플라이트 허용
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    return res.status(200).end();
  }
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method Not Allowed' });

  try {
    const { messages = [], lang = 'en' } = req.body || {};
    const key = process.env.OPENAI_API_KEY;
    if (!key) return res.status(500).json({ error: 'Missing OPENAI_API_KEY' });

    // OpenAI Responses API (gpt-4.1)
    const r = await fetch('https://api.openai.com/v1/responses', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${key}` },
      body: JSON.stringify({
        model: 'gpt-4.1',        // 요청했던 4.1
        input: messages,         // [{role:'user', content:'...'}] 형식 그대로 전달
        metadata: { lang }
      })
    });
    const data = await r.json();

    // 응답 텍스트 꺼내기 (Responses API는 output_text가 편함)
    const reply =
      data.output_text ||
      data?.choices?.[0]?.message?.content ||
      '(no content)';

    res.setHeader('Access-Control-Allow-Origin', '*');
    return res.status(200).json({ reply: String(reply) });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: 'OpenAI error' });
  }
}
