/* 클릭 문제 해결 + 필터/검색/챗봇 동작 */
(function(){
  // 안전 클릭 바인딩 도우미
  const on = (id, ev, fn) => { const el = document.getElementById(id); if(el) el.addEventListener(ev, fn, {passive:true}); };

  // Filters 모달
  const modal = document.getElementById('filterModal');
  function openModal(){ modal?.classList.add('active'); modal?.setAttribute('aria-hidden','false'); }
  function closeModal(){ modal?.classList.remove('active'); modal?.setAttribute('aria-hidden','true'); }

  on('t_filters','click', openModal);
  modal?.querySelectorAll('[data-close]').forEach(b=> b.addEventListener('click', closeModal));
  on('applyFilters','click', () => {
    const filters = {
      guests: +document.getElementById('fGuests').value || 2,
      rooms: +document.getElementById('fRooms').value || 1,
      min: +document.getElementById('fMin').value || 0,
      max: +document.getElementById('fMax').value || 0
    };
    localStorage.setItem('sw_filters', JSON.stringify(filters));
    closeModal();
    alert('Filters applied ✅');
  });

  // Search 버튼 (데모 라우팅)
  on('t_search','click', () => {
    const q = (document.getElementById('searchInput').value || '').trim();
    const from = document.getElementById('dateFrom').value || '';
    const to = document.getElementById('dateTo').value || '';
    const url = `/results.html?q=${encodeURIComponent(q)}&from=${from}&to=${to}`;
    window.location.href = url;
  });

  // ==== Chatbot ====
  const chatPanel = document.getElementById('chatPanel');
  const chatOpen = document.getElementById('chatOpen');
  const chatBody = document.getElementById('chatBody');
  const chatInput = document.getElementById('chatInput');
  const chatSend = document.getElementById('chatSend');

  function toggleChat(){
    if(!chatPanel) return;
    const v = getComputedStyle(chatPanel).display === 'none';
    chatPanel.style.display = v ? 'flex' : 'none';
    if(v) chatInput?.focus();
  }
  chatOpen?.addEventListener('click', toggleChat);

  function appendMsg(role, text){
    const el = document.createElement('div');
    el.className = 'chat-msg ' + (role === 'user' ? 'user' : 'bot');
    el.innerText = text;
    chatBody.appendChild(el);
    chatBody.scrollTop = chatBody.scrollHeight;
  }

  async function botReply(prompt){
    // 1) 백엔드가 있으면 사용
    if (window.STAY_CHAT_API) {
      try {
        const res = await fetch(window.STAY_CHAT_API, {
          method:'POST', headers:{'Content-Type':'application/json'},
          body: JSON.stringify({message: prompt})
        });
        const data = await res.json();
        return data.reply || 'Sorry, I could not get a response.';
      } catch(e){
        console.error(e);
        return 'Network error. Please try again.';
      }
    }
    // 2) 없으면 프론트 내장 규칙형 답변 (즉시 동작)
    prompt = prompt.toLowerCase();
    if(/hello|hi|안녕|merhaba|hola/.test(prompt)) return 'Hi! Need help finding stays or using crypto payments?';
    if(/price|가격|fiyat/.test(prompt)) return 'You can set min/max price in Filters. I can also suggest budget vs. luxury options.';
    if(/pay|결제|ödeme|crypto|btc|eth/.test(prompt)) return 'We accept Visa, Mastercard, Amex, bank transfer, and crypto (BTC • ETH • USDT).';
    if(/help|도움|yardım/.test(prompt)) return 'Tell me your city and dates. I’ll prepare a quick search for you.';
    return 'Got it. I will pass this to our concierge shortly.';
  }

  async function sendMsg(){
    const text = (chatInput.value || '').trim();
    if(!text) return;
    appendMsg('user', text);
    chatInput.value = '';
    const reply = await botReply(text);
    appendMsg('bot', reply);
  }

  chatSend?.addEventListener('click', sendMsg);
  chatInput?.addEventListener('keydown', e=> { if(e.key==='Enter'){ e.preventDefault(); sendMsg(); } });

  // 언어 변경 시 챗봇 간단한 인사 재적용 (lang.js가 먼저 로드됨)
  const sel = document.getElementById('langSelect');
  sel?.addEventListener('change', ()=>{
    // 필요시 다른 언어 문구도 여기서 조정 가능
    // 현재는 본문 텍스트만 lang.js에서 처리
  });
})();
