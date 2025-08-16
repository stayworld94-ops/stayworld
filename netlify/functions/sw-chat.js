// netlify/functions/sw-chat.js
function corsHeaders() {
  return {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };
}

exports.handler = async (event) => {
  // CORS 프리플라이트
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers: corsHeaders(), body: '' };
  }
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, headers: corsHeaders(), body: 'Method Not Allowed' };
  }

  try {
    const { messages = [], lang = 'en' } = JSON.parse(event.body || '{}');
    const key = process.env.OPENAI_API_KEY;
    if (!key) {
      return {
        statusCode: 500,
        headers: corsHeaders(),
        body: JSON.stringify({ error: 'Missing OPENAI_API_KEY' }),
      };
    }

    // 챗 UI의 messages 포맷에 가장 잘 맞는 엔드포인트
    const resp = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${key}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini', // 빠르고 저렴한 모델
        messages: [
          { role: 'system', content: `You are the StayWorld concierge. Answer in ${lang}.` },
          ...messages
        ],
        temperature: 0.7,
      }),
    });

    const data = await resp.json();
    if (!resp.ok) {
      // OpenAI 에러 그대로 전달(디버깅 용이)
      return {
        statusCode: resp.status,
        headers: corsHeaders(),
        body: JSON.stringify({ error: data }),
      };
    }

    const reply = data?.choices?.[0]?.message?.content ?? '(no content)';
    return {
      statusCode: 200,
      headers: { ...corsHeaders(), 'Content-Type': 'application/json' },
      body: JSON.stringify({ reply }),
    };
  } catch (e) {
    return {
      statusCode: 500,
      headers: corsHeaders(),
      body: JSON.stringify({ error: e.message || 'OpenAI error' }),
    };
  }
};
