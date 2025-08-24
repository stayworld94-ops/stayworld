// 파일 경로: netlify/functions/concierge.ts
export default async (req: Request): Promise<Response> => {
  try {
    if (req.method === 'OPTIONS') return new Response('', { status: 204, headers: cors() });
    if (req.method !== 'POST') return new Response('Method Not Allowed', { status: 405, headers: cors() });

    const body = await req.json().catch(() => ({}));
    const q = (body?.q || '').toString().slice(0, 2000);
    if (!q) return json({ error: 'missing q' }, 400);

    // 1) 빠른 규칙 답변
    const quick = rule(q);
    if (quick) return json({ answer: quick });

    // 2) LLM 호출 (키 없으면 기본 답변)
    const key = process.env.OPENAI_API_KEY;
    if (!key) return json({ answer: fallback() });

    const r = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${key}` },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: 'You are StayWorld Concierge. Be concise and helpful for travel/booking.' },
          { role: 'user', content: q }
        ],
        temperature: 0.3, max_tokens: 400
      })
    });
    if (!r.ok) return json({ answer: fallback() });
    const data = await r.json();
    const answer = data?.choices?.[0]?.message?.content || fallback();
    return json({ answer });
  } catch {
    return json({ answer: fallback() });
  }
}
function rule(q:string){ const s=q.toLowerCase();
  if(/(contact|host|chat)/.test(s)) return 'Connecting you to your host…';
  if(/(booking|reservation|id)/.test(s)) return 'Please share your booking ID (e.g., SW-2025-1234).';
  if(/(cities|city|recommend)/.test(s)) return 'Top picks: Istanbul · Tokyo · Paris · Bangkok · Barcelona.';
  if(/(support|help)/.test(s)) return 'Support is here 24/7. Tell me what happened.'; return null }
function fallback(){ return 'I can help with bookings, hosts, or destinations. What do you need?' }
function cors(){ return { 'Access-Control-Allow-Origin':'*', 'Access-Control-Allow-Headers':'Content-Type, Authorization' } }
function json(obj:any, status=200){ return new Response(JSON.stringify(obj), { status, headers:{ 'Content-Type':'application/json', ...cors() } }) }
export const config = { path: '/concierge' } // Netlify에서 /concierge 경로로 접근 가능
