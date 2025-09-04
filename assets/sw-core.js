/* STAYWORLD core: i18n(10 lang) + currency sync + auth UI + notif + map toggle */
(function () {
  // ---------- I18N ----------
  const I18N = {
    EN:{nav_home:"Home",nav_membership:"Membership",nav_host:"Host",nav_login:"Log in",nav_logout:"Log out",language:"Language",
        placeholder_city:"Paris, Tokyo, Istanbul…",filters:"Filter",search:"Search",welcome:"Welcome"},
    KO:{nav_home:"홈",nav_membership:"멤버십",nav_host:"호스트",nav_login:"로그인",nav_logout:"로그아웃",language:"언어",
        placeholder_city:"파리, 도쿄, 이스탄불…",filters:"필터",search:"검색",welcome:"환영합니다"},
    JA:{nav_home:"Home",nav_membership:"Membership",nav_host:"ホスト",nav_login:"ログイン",nav_logout:"ログアウト",language:"言語",
        placeholder_city:"パリ、東京、イスタンブール…",filters:"フィルター",search:"検索",welcome:"ようこそ"},
    ZH:{nav_home:"首页",nav_membership:"会员",nav_host:"房东",nav_login:"登录",nav_logout:"退出登录",language:"语言",
        placeholder_city:"巴黎、东京、伊斯坦布尔…",filters:"筛选",search:"搜索",welcome:"欢迎"},
    FR:{nav_home:"Accueil",nav_membership:"Adhésion",nav_host:"Hôte",nav_login:"Connexion",nav_logout:"Déconnexion",language:"Langue",
        placeholder_city:"Paris, Tokyo, Istanbul…",filters:"Filtres",search:"Rechercher",welcome:"Bienvenue"},
    ES:{nav_home:"Inicio",nav_membership:"Membresía",nav_host:"Anfitrión",nav_login:"Ingresar",nav_logout:"Cerrar sesión",language:"Idioma",
        placeholder_city:"París, Tokio, Estambul…",filters:"Filtros",search:"Buscar",welcome:"Bienvenido"},
    DE:{nav_home:"Start",nav_membership:"Mitgliedschaft",nav_host:"Gastgeber",nav_login:"Login",nav_logout:"Abmelden",language:"Sprache",
        placeholder_city:"Paris, Tokio, Istanbul…",filters:"Filter",search:"Suchen",welcome:"Willkommen"},
    IT:{nav_home:"Home",nav_membership:"Abbonamento",nav_host:"Host",nav_login:"Accedi",nav_logout:"Esci",language:"Lingua",
        placeholder_city:"Parigi, Tokyo, Istanbul…",filters:"Filtri",search:"Cerca",welcome:"Benvenuto"},
    TR:{nav_home:"Ana Sayfa",nav_membership:"Üyelik",nav_host:"Ev Sahibi",nav_login:"Giriş",nav_logout:"Çıkış",language:"Dil",
        placeholder_city:"Paris, Tokyo, İstanbul…",filters:"Filtreler",search:"Ara",welcome:"Hoş geldiniz"},
    RU:{nav_home:"Главная",nav_membership:"Подписка",nav_host:"Хост",nav_login:"Войти",nav_logout:"Выйти",language:"Язык",
        placeholder_city:"Париж, Токио, Стамбул…",filters:"Фильтры",search:"Поиск",welcome:"Добро пожаловать"},
  };

  // ---------- Lang & Currency ----------
  const LANG_TO_CUR = { EN:'USD', KO:'KRW', JA:'JPY', ZH:'CNY', FR:'EUR', ES:'EUR', DE:'EUR', IT:'EUR', TR:'TRY', RU:'RUB' };
  const CUR_CODES   = ["USD","EUR","KRW","JPY","CNY","TRY","GBP","AED","CAD","RUB"];

  const getLangSel = () => document.getElementById('langSelect') || document.getElementById('lang') ||
                          document.querySelector('.lang-select select');
  const getLang = () => {
    const sel = getLangSel();
    return (sel && sel.value) || localStorage.getItem('sw_lang') || 'EN';
  };
  const setLang = (code) => {
    const sel = getLangSel();
    if (sel && [...sel.options].some(o=>o.value===code)) sel.value = code;
    localStorage.setItem('sw_lang', code);
  };
  const t = (k) => (I18N[getLang()]||I18N.EN)[k] || (I18N.EN||{})[k] || k;

  function findCurrencySelect(){
    // hotels.html처럼 통화 select가 있는 경우 자동 탐지
    const all = [...document.querySelectorAll('select')];
    for (const s of all) {
      const texts = [...s.options].map(o=>o.value || o.textContent.trim());
      const hit = CUR_CODES.filter(c=>texts.includes(c)).length;
      if (hit >= 3) return s;
    }
    return document.getElementById('currencySelect') || null;
  }
  function syncCurrencyToLang(){
    const curSel = findCurrencySelect();
    if (!curSel) return;
    const code = LANG_TO_CUR[getLang()] || 'USD';
    if ([...curSel.options].some(o=>o.value===code)) {
      curSel.value = code;
      curSel.dispatchEvent(new Event('change'));
    }
  }

  // ---------- I18N 적용 ----------
  function applyI18N(){
    // data-i18n
    document.querySelectorAll('[data-i18n]').forEach(el=>{
      const k = el.getAttribute('data-i18n');
      el.textContent = t(k);
    });
    // placeholder
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el=>{
      const k = el.getAttribute('data-i18n-placeholder');
      el.setAttribute('placeholder', t(k));
    });
    // 잔여 토큰(nav_login 등) 치환
    document.querySelectorAll('a,button,span,div').forEach(el=>{
      const raw = (el.textContent||'').trim();
      if (/^nav_(home|membership|host|login|logout)$/.test(raw) || raw==='language' || raw==='placeholder_city'){
        el.textContent = t(raw);
      }
    });
    // 검색창 플레이스홀더 보정
    const dest = document.getElementById('searchDestination') || document.querySelector('input[placeholder*="placeholder_city"]');
    if (dest) dest.setAttribute('placeholder', t('placeholder_city'));
    syncCurrencyToLang();
  }

  // ---------- Auth UI (게스트/유저/호스트) ----------
  function getUser(){
    try { return JSON.parse(localStorage.getItem('sw_user')||'null'); } catch { return null; }
  }
  function setUser(u){ localStorage.setItem('sw_user', JSON.stringify(u)); }
  function clearUser(){ localStorage.removeItem('sw_user'); localStorage.removeItem('sw_logged_in'); }

  function toggleAuthUI(){
    const u = getUser();
    const show = (sel)=> document.querySelectorAll(sel).forEach(el=>el.style.display='');
    const hide = (sel)=> document.querySelectorAll(sel).forEach(el=>el.style.display='none');

    if (u){ // 로그인 상태
      hide('[data-auth="guest"]'); show('[data-auth="user"]');
      const nameEl = document.getElementById('swUserName');
      if (nameEl) nameEl.textContent = u.name || 'Member';
      const welcome = document.getElementById('welcomeBanner') || document.getElementById('swWelcome');
      if (welcome){
        const nameSlot = welcome.querySelector('[data-welcome-name]');
        if (nameSlot) nameSlot.textContent = u.name || 'Member';
        else welcome.textContent = `${t('welcome')}, ${u.name||'Member'} 🎉`;
        welcome.classList.remove('hidden');
      }
    }else{ // 게스트
      show('[data-auth="guest"]'); hide('[data-auth="user"]');
    }
  }

  function wireAuthButtons(){
    document.getElementById('btnLogout')?.addEventListener('click', (e)=>{
      e.preventDefault();
      clearUser();
      toggleAuthUI();
      location.href = '/';
    });
    // 예시: 테스트용 전환 (필요 없으면 삭제)
    // window.__mockLogin = (name="GIJUN YOON", role="user") => { setUser({name, role}); toggleAuthUI(); };
  }

  // ---------- Notifications ----------
  async function fetchNotifications(){
    try{
      const r = await fetch('/api/notifications', {credentials:'include'});
      if (!r.ok) throw 0;
      return await r.json();
    }catch{
      // fallback demo
      return [
        {id:1,title:'Booking confirmed',desc:'Istanbul • 2–5 Sep',time:'2m',read:false},
        {id:2,title:'Promo',desc:'Autumn deal unlocked',time:'1h',read:true},
      ];
    }
  }
  async function initNotif(){
    const btn   = document.getElementById('swNotifBtn');
    const panel = document.getElementById('swNotifPanel');
    const badge = document.getElementById('swNotifBadge');
    const list  = document.getElementById('swNotifList');
    if (!btn || !panel || !badge || !list) return;

    function render(items){
      const unread = items.filter(x=>!x.read).length;
      if (unread>0){ badge.textContent = unread>99?'99+':String(unread); badge.hidden=false; }
      else badge.hidden=true;
      list.innerHTML = items.map(it=>`
        <li class="sw-notif-item" data-id="${it.id}">
          <span class="dot" style="opacity:${it.read?'.25':'1'}"></span>
          <div class="content">
            <b>${escapeHTML(it.title||'')}</b>
            <div class="desc">${escapeHTML(it.desc||'')}
