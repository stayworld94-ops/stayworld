/* =========================================================
   STAYWORLD — Frontend App (Full)
   - Chatbot (Netlify Function: /.netlify/functions/chat)
   - Search & Filters
   - Language (with lang.js)
   - Small helpers (aliases / scroll / storage)
   ========================================================= */

(function () {
  /* ----------------- DOM helpers ----------------- */
  const $ = (sel, scope) => (scope || document).querySelector(sel);
  const $$ = (sel, scope) => (scope || document).querySelectorAll(sel);

  /* ----------------- Elements ----------------- */
  const chatFab   = $('#chatFab') || $('#openBot');            // 플로팅/카드 버튼 어떤 것이든 지원
  const botPanel  = $('#botPanel');
  const botClose  = $('#botClose');
  const botSend   = $('#botSend');
  const botBody   = $('#botBody');
  const botInput  = $('#botInput');

  const searchInput = $('#searchInput') || $('#search');        // 페이지마다 id 다를 수 있어 유연 처리
  const dateFrom    = $('#dateFrom');
  const dateTo      = $('#dateTo');
  const searchBtn   = $('#searchBtn');

  const filterOpen  = $('#filterOpen');
  const filterClose = $('#filterClose');
  const filterDrawer = $('#filterDrawer');
  const applyFiltersBtn = $('#applyFilters');
  const resetFiltersBtn = $('#filterReset');

  const langSelect  = $('#langSelect');

  /* ----------------- Config ----------------- */
  // Netlify 환경이면 이 기본값 사용. 필요 시 <script> 등으로 window.STAY_CHAT_API 지정 가능.
  const CHAT_ENDPOINT = window.STAY_CHAT_API || '/.netlify/functions/chat';

  // 도시 한글/터키어/기타 → 영어 표준화
  const ALIASES = {
    // ko
    '서울': 'Seoul', '인천': 'Incheon', '도쿄': 'Tokyo', '오사카': 'Osaka', '파리': 'Paris', '이스탄불': 'Istanbul',
    // tr
    'istanbul': 'Istanbul', 'ankara': 'Ankara', 'izmir': 'Izmir', 'antalya': 'Antalya',
    // etc
    'roma': 'Rome', 'münih': 'Munich', 'monako': 'Monaco'
  };

  function normalizeQuery(q) {
    if (!q) return '';
    const t = (q + '').trim().toLowerCase();
    // 완전 일치 우선
    for (const [k, v] of Object.entries(ALIASES)) {
      if (t === k.toLowerCase()) return v;
    }
    // 문장 안에 포함된 토큰도 치환
    let out = q;
    for (const [k, v] of Object.entries(ALIASES)) {
      const re = new RegExp(`\\b${escapeReg(k)}\\b`, 'gi');
      out = out.replace(re, v);
    }
    return out;
  }
  function escapeReg(str){ return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); }

  /* ----------------- Language ----------------- */
  function initLang() {
    const saved = localStorage.getItem('sw_lang');
    // langSelect가 있으면 우선순위 부여
    let code = (langSelect?.value || saved || (navigator.language || 'en').slice(0, 2)).toLowerCase();
    // lang.js에 등록된 언어만 허용
    const supported = ['en','ko','fr','tr','ja','de','es','it','zh','ru'];
    if (!supported.includes(code)) code = 'en';

    if (langSelect) {
      langSelect.value = code.toUpperCase();
      langSelect.addEventListener('change', () => {
        const newCode = (langSelect.value || 'EN').toLowerCase();
        localStorage.setItem('sw_lang', newCode);
        window.StayWorldI18n?.applyLang?.(newCode);
        // 챗봇이 열려있다면 봇 언어도 바로 반영되도록 안내 메시지
        if (botPanel && !botPanel.hidden) {
          appendMsg('sys', t('langChanged', newCode));
        }
      });
    }
    window.StayWorldI18n?.applyLang?.(code);
  }

  // 간단한 시스템 텍스트(i18n)
  function t(key, code) {
    const c = (code || langSelect?.value || localStorage.getItem('sw_lang') || 'en').toLowerCase();
    const map = {
      langChanged: {
        en: 'Language updated.',
        ko: '언어가 변경되었습니다.',
        tr: 'Dil güncellendi.',
        ja: '言語が更新されました。',
        fr: 'Langue mise à jour.',
        de: 'Sprache aktualisiert.',
        es: 'Idioma actualizado.',
        it: 'Lingua aggiornata.',
        zh: '语言已更新。',
        ru: 'Язык обновлён.'
      },
      typing: {
        en: 'Typing…',
        ko: '입력 중…',
        tr: 'Yazıyor…',
        ja: '入力中…',
        fr: 'Saisie…',
        de: 'Tippt…',
        es: 'Escribiendo…',
        it: 'Sta scrivendo…',
        zh: '正在输入…',
        ru: 'Печатает…'
      },
      neterr: {
        en: 'Network error. Please try again.',
        ko: '네트워크 오류가 발생했습니다.',
        tr: 'Ağ hatası. Lütfen tekrar deneyin.',
        ja: 'ネットワークエラーが発生しました。',
        fr: 'Erreur réseau.',
        de: 'Netzwerkfehler.',
        es: 'Error de red.',
        it: 'Errore di rete.',
        zh: '网络错误。',
        ru: 'Ошибка сети.'
      }
    };
    return (map[key]?.[c]) || map[key]?.en || key;
  }

  /* ----------------- Filters Drawer ----------------- */
  function openFilters() {
    if (!filterDrawer) return;
    filterDrawer.setAttribute('aria-hidden', 'false');
    filterDrawer.style.display = 'flex';
    // 포커스 트랩 간단 구현
    setTimeout(() => filterDrawer.querySelector('input,button,select')?.focus(), 0);
    document.body.style.overflow = 'hidden';
  }
  function closeFilters() {
    if (!filterDrawer) return;
    filterDrawer.setAttribute('aria-hidden', 'true');
    filterDrawer.style.display = 'none';
    document.body.style.overflow = '';
  }
  function resetFilters() {
    if (!filterDrawer) return;
    $$('input[type=checkbox], input[type=radio]', filterDrawer).forEach(el => {
      if (el.type === 'radio') {
        // name 그룹 중 기본값 찾기
        if (el.value.toLowerCase().includes('any')) el.checked = true;
        else el.checked = false;
      } else {
        el.checked = false;
      }
    });
    $$('input[type=number], input[type=range]', filterDrawer).forEach(el => {
      if (el.hasAttribute('min')) el.value = el.getAttribute('min');
      else el.value = '';
    });
    $('#currencySelect', filterDrawer)?.value = 'USD';
    $('#distance', filterDrawer)?.value = 10;
  }
  function collectFilters() {
    if (!filterDrawer) return {};
    const obj = {
      priceMin: $('#priceMin')?.value || '',
      priceMax: $('#priceMax')?.value || '',
      beds: $('#beds')?.value || '',
      baths: $('#baths')?.value || '',
      pets: $('#pets')?.checked || false,
      selfCheckin: $('#selfCheckin')?.checked || false,
      verifiedOnly: $('#verifiedOnly')?.checked || false,
      longStay: $('#longStay')?.checked || false,
      currency: $('#currencySelect')?.value || 'USD',
      distance: $('#distance')?.value || ''
    };
    // 체크박스 그룹들
    obj.types = [...$$('input[type=checkbox][value]', filterDrawer)]
      .filter(el => ['hotel','motel','hostel','apartment','villa'].includes(el.value) && el.checked)
      .map(el => el.value);
    obj.amenities = [...$$('input[type=checkbox][value]', filterDrawer)]
      .filter(el => ['wifi','kitchen','parking','pool','ac','gym','workspace','washer','dryer'].includes(el.value) && el.checked)
      .map(el => el.value);
    obj.booking = [...$$('input[type=checkbox][value]', filterDrawer)]
      .filter(el => ['instant','request'].includes(el.value) && el.checked)
      .map(el => el.value);
    obj.rating = $$('input[type=radio][name=rating]', filterDrawer)
      ? [...$$('input[type=radio][name=rating]', filterDrawer)].find(el => el.checked)?.value || 'any'
      : 'any';
    // 접근성/비즈니스/경험/안전은 value로 구분
    const groups = {
      accessibility: ['step_free','elevator'],
      business: ['b2b'],
      experiences: ['nature','camping','traditional'],
      trust: ['badge','reviews']
    };
    for (const key of Object.keys(groups)) {
      obj[key] = [...$$('input[type=checkbox][value]', filterDrawer)]
        .filter(el => groups[key].includes(el.value) && el.checked)
        .map(el => el.value);
    }
    return obj;
  }

  /* ----------------- Search ----------------- */
  function doSearch() {
    const q = normalizeQuery(searchInput?.value || '');
    const df = dateFrom?.value || '';
    const dt = dateTo?.value || '';
    const f = collectFilters();
    const params = new URLSearchParams({
      query: q,
      from: df,
      to: dt,
      filters: JSON.stringify(f)
    });
    // results.html로 이동 (이미 구성된 결과 페이지)
    window.location.href = `/results.html?${params.toString()}`;
  }

  /* ----------------- Chatbot ----------------- */
  let chatHistory = restoreChat();
  let isSending = false;

  function restoreChat() {
    try {
      const s = localStorage.getItem('sw_chat_history');
      return s ? JSON.parse(s) : [];
    } catch { return []; }
  }
  function saveChat() {
    try {
      localStorage.setItem('sw_chat_history', JSON.stringify(chatHistory.slice(-30))); // 최근 30개만 유지
    } catch {}
  }
  function appendMsg(role, text) {
    if (!botBody) return;
    const div = document.createElement('div');
    div.className = 'sw-bot-msg' + (role === 'sys' ? ' sys' : '');
    if (role === 'user') div.style.borderColor = 'rgba(212,177,102,.45)';
    div.textContent = text;
    botBody.appendChild(div);
    botBody.scrollTop = botBody.scrollHeight;
  }
  function showTyping(on) {
    if (!botBody) return;
    let el = botBody.querySelector('[data-typing="1"]');
    if (on) {
      if (!el) {
        el = document.createElement('div');
        el.className = 'sw-bot-msg sys';
        el.dataset.typing = '1';
        el.textContent = t('typing');
        botBody.appendChild(el);
      }
    } else if (el) {
      el.remove();
    }
    botBody.scrollTop = botBody.scrollHeight;
  }
  async function botReply(prompt) {
    const lang = (langSelect?.value || localStorage.getItem('sw_lang') || 'en').toLowerCase();
    const payload = { message: prompt, lang, history: chatHistory };
    const res = await fetch(CHAT_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type':'application/json' },
      body: JSON.stringify(payload)
    });
    const data = await res.json().catch(() => ({}));
    return data.reply || '…';
  }
  async function sendMsg() {
    if (isSending) return;
    const text = (botInput?.value || '').trim();
    if (!text) return;
    appendMsg('user', text);
    chatHistory.push({ role: 'user', content: text });
    saveChat();
    botInput.value = '';
    isSending = true;
    showTyping(true);
    try {
      const rep = await botReply(text);
      showTyping(false);
      appendMsg('bot', rep);
      chatHistory.push({ role: 'assistant', content: rep });
      saveChat();
    } catch (e) {
      console.error(e);
      showTyping(false);
      appendMsg('sys', t('neterr'));
    } finally {
      isSending = false;
    }
  }
  function openBot() {
    if (!botPanel) return;
    botPanel.hidden = false;
    // 초기 안내(최초 1회)
    if (!botBody?.dataset.greeted) {
      appendMsg('sys', 'Hello! Ask me anything about stays, routes or deals.');
      botBody.dataset.greeted = '1';
      // 기존 히스토리 복원 표시
      if (chatHistory.length) {
        appendMsg('sys', '(Restored previous chat)');
      }
    }
    botInput?.focus();
  }
  function closeBot() {
    if (!botPanel) return;
    botPanel.hidden = true;
  }

  /* ----------------- Event wiring ----------------- */
  function bindEvents() {
    // Filters
    filterOpen?.addEventListener('click', openFilters);
    filterClose?.addEventListener('click', closeFilters);
    applyFiltersBtn?.addEventListener('click', () => { closeFilters(); doSearch(); });
    resetFiltersBtn?.addEventListener('click', resetFilters);

    // Search
    searchBtn?.addEventListener('click', doSearch);
    searchInput?.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') { e.preventDefault(); doSearch(); }
    });

    // Chat
    chatFab?.addEventListener('click', openBot);
    $('#open-ai')?.addEventListener('click', openBot); // Support 섹션 버튼
    botClose?.addEventListener('click', closeBot);
    botSend?.addEventListener('click', sendMsg);
    botInput?.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMsg(); }
    });

    // ESC로 필터/봇 닫기
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        if (filterDrawer && filterDrawer.style.display === 'flex') closeFilters();
        if (botPanel && !botPanel.hidden) closeBot();
      }
    });
  }

  /* ----------------- Kick off ----------------- */
  document.addEventListener('DOMContentLoaded', () => {
    initLang();
    bindEvents();
  });
})();
