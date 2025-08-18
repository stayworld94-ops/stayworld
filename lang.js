// StayWorld i18n — 10 languages (EN/KO/TR/FR/JA/DE/ES/IT/ZH/RU)
(function(){
  const LANGS = {
    en:{ 
      nav:{home:"Home", membership:"Membership", login:"Login", signup:"Sign Up"},
      h1:"Luxury stays.<br><span class='gold'>Global reach.</span>",
      pay:"Cards, bank transfer & crypto (BTC · ETH · USDT).",
      filters:"Filters", search:"Search", placeholder:"Paris, Tokyo, Istanbul…",
      card1:"Verified stays", card1sub:"Top picks near you.",
      card2:"StayWorld+ Rewards", card2sub:"Earn points on every booking.",
      card3:"Secure payments", card3sub:"Visa, Mastercard, Amex & Crypto.",
      membership:{} // 밑에서 병합됨
    },
    ko:{ 
      nav:{home:"홈", membership:"멤버십", login:"로그인", signup:"가입"},
      h1:"럭셔리 스테이.<br><span class='gold'>글로벌 리치.</span>",
      pay:"카드, 계좌이체 & 크립토 (BTC · ETH · USDT).",
      filters:"필터", search:"검색", placeholder:"파리, 도쿄, 이스탄불…",
      card1:"인증 숙소", card1sub:"가까운 베스트 픽.",
      card2:"StayWorld+ 리워드", card2sub:"매 예약마다 포인트 적립.",
      card3:"안전한 결제", card3sub:"Visa, Mastercard, Amex & 크립토.",
      membership:{} 
    },
    tr:{ 
      nav:{home:"Ana Sayfa", membership:"Üyelik", login:"Giriş", signup:"Kayıt Ol"},
      h1:"Lüks konaklamalar.<br><span class='gold'>Küresel erişim.</span>",
      pay:"Kart, havale ve kripto (BTC · ETH · USDT).",
      filters:"Filtreler", search:"Ara", placeholder:"Paris, Tokyo, İstanbul…",
      card1:"Doğrulanmış konaklamalar", card1sub:"Size yakın en iyi seçenekler.",
      card2:"StayWorld+ Ödülleri", card2sub:"Her rezervasyonda puan kazanın.",
      card3:"Güvenli ödemeler", card3sub:"Visa, Mastercard, Amex ve Kripto.",
      membership:{} 
    },
    fr:{ 
      nav:{home:"Accueil", membership:"Adhésion", login:"Connexion", signup:"S’inscrire"},
      h1:"Séjours de luxe.<br><span class='gold'>Portée mondiale.</span>",
      pay:"Cartes, virement & crypto (BTC · ETH · USDT).",
      filters:"Filtres", search:"Rechercher", placeholder:"Paris, Tokyo, Istanbul…",
      card1:"Séjours vérifiés", card1sub:"Meilleures options près de chez vous.",
      card2:"Récompenses StayWorld+", card2sub:"Des points à chaque réservation.",
      card3:"Paiements sécurisés", card3sub:"Visa, Mastercard, Amex & Crypto.",
      membership:{} 
    },
    ja:{ 
      nav:{home:"ホーム", membership:"メンバーシップ", login:"ログイン", signup:"登録"},
      h1:"ラグジュアリーな滞在。<br><span class='gold'>グローバルに。</span>",
      pay:"カード・振込・暗号資産 (BTC · ETH · USDT)。",
      filters:"フィルター", search:"検索", placeholder:"パリ、東京、イスタンブール…",
      card1:"認証済みステイ", card1sub:"近くのおすすめ。",
      card2:"StayWorld+ リワード", card2sub:"予約ごとにポイント獲得。",
      card3:"安全な支払い", card3sub:"Visa・Mastercard・Amex・暗号資産。",
      membership:{} 
    },
    de:{ 
      nav:{home:"Start", membership:"Mitgliedschaft", login:"Anmelden", signup:"Registrieren"},
      h1:"Luxuriöse Aufenthalte.<br><span class='gold'>Weltweite Reichweite.</span>",
      pay:"Karten, Überweisung & Krypto (BTC · ETH · USDT).",
      filters:"Filter", search:"Suchen", placeholder:"Paris, Tokio, Istanbul…",
      card1:"Verifizierte Unterkünfte", card1sub:"Top-Empfehlungen in deiner Nähe.",
      card2:"StayWorld+ Prämien", card2sub:"Punkte bei jeder Buchung.",
      card3:"Sichere Zahlungen", card3sub:"Visa, Mastercard, Amex & Krypto.",
      membership:{} 
    },
    es:{ 
      nav:{home:"Inicio", membership:"Membresía", login:"Entrar", signup:"Registrarse"},
      h1:"Estancias de lujo.<br><span class='gold'>Alcance global.</span>",
      pay:"Tarjetas, transferencia y cripto (BTC · ETH · USDT).",
      filters:"Filtros", search:"Buscar", placeholder:"París, Tokio, Estambul…",
      card1:"Alojamientos verificados", card1sub:"Las mejores opciones cerca de ti.",
      card2:"Recompensas StayWorld+", card2sub:"Puntos en cada reserva.",
      card3:"Pagos seguros", card3sub:"Visa, Mastercard, Amex y Cripto.",
      membership:{} 
    },
    it:{ 
      nav:{home:"Home", membership:"Abbonamento", login:"Accedi", signup:"Registrati"},
      h1:"Soggiorni di lusso.<br><span class='gold'>Portata globale.</span>",
      pay:"Carte, bonifico e crypto (BTC · ETH · USDT).",
      filters:"Filtri", search:"Cerca", placeholder:"Parigi, Tokyo, Istanbul…",
      card1:"Alloggi verificati", card1sub:"Le migliori scelte vicino a te.",
      card2:"Premi StayWorld+", card2sub:"Punti per ogni prenotazione.",
      card3:"Pagamenti sicuri", card3sub:"Visa, Mastercard, Amex e Crypto.",
      membership:{} 
    },
    zh:{ 
      nav:{home:"首页", membership:"会员", login:"登录", signup:"注册"},
      h1:"奢华住宿。<br><span class='gold'>全球触达。</span>",
      pay:"支持银行卡、转账与加密货币 (BTC · ETH · USDT)。",
      filters:"筛选", search:"搜索", placeholder:"巴黎、东京、伊斯坦布尔…",
      card1:"认证住宿", card1sub:"你附近的优选。",
      card2:"StayWorld+ 奖励", card2sub:"每次预订都能赚积分。",
      card3:"安全支付", card3sub:"Visa、Mastercard、Amex 与加密货币。",
      membership:{} 
    },
    ru:{ 
      nav:{home:"Главная", membership:"Членство", login:"Войти", signup:"Регистрация"},
      h1:"Роскошное проживание.<br><span class='gold'>Глобальный охват.</span>",
      pay:"Карты, банковский перевод и крипто (BTC · ETH · USDT).",
      filters:"Фильтры", search:"Поиск", placeholder:"Париж, Токио, Стамбул…",
      card1:"Проверенные варианты", card1sub:"Лучшие предложения рядом.",
      card2:"Награды StayWorld+", card2sub:"Баллы за каждое бронирование.",
      card3:"Безопасные платежи", card3sub:"Visa, Mastercard, Amex и Крипто.",
      membership:{} 
    }
  };

  function setHTML(id, html){ const el=document.getElementById(id); if(el) el.innerHTML=html; }
  function setText(id, txt){ const el=document.getElementById(id); if(el) el.textContent=txt; }
  function setPH(id, ph){ const el=document.getElementById(id); if(el && 'placeholder' in el) el.placeholder=ph; }

  function applyLang(code){
    const t = LANGS[code] || LANGS.en;
    setText("t_nav_home", t.nav.home); setText("t_nav_membership", t.nav.membership);
    setText("t_nav_login", t.nav.login); setText("t_nav_signup", t.nav.signup);
    setHTML("t_h1", t.h1); setText("t_pay", t.pay);
    setText("t_filters", t.filters); setText("t_search", t.search);
    setPH("searchInput", t.placeholder);
    setText("t_card1", t.card1); setText("t_card1sub", t.card1sub);
    setText("t_card2", t.card2); setText("t_card2sub", t.card2sub);
    setText("t_card3", t.card3); setText("t_card3sub", t.card3sub);

    // 멤버십 텍스트도 membership.js에서 LANGS[code].membership을 참조함
    window.dispatchEvent(new Event("sw:languageChanged"));
  }

  function init(){
    const sel=document.getElementById("langSelect");
    const saved=localStorage.getItem("sw_lang")||(navigator.language||"en").slice(0,2).toLowerCase();
    const final=LANGS[saved]?saved:"en";
    if(sel){ sel.value=final; sel.addEventListener("change", e=>{ const v=e.target.value; localStorage.setItem("sw_lang", v); applyLang(v); }); }
    applyLang(final);
    window.StayWorldI18n = { applyLang };
  }
  document.addEventListener("DOMContentLoaded", init);

  // === 멤버십 번역 병합 ===
  (function addMembershipI18N(){
    if(!window.LANGS) window.LANGS = LANGS;
    // 여기서 아까 드린 membership 블록을 각 언어에 병합
    // (영문 base, ko/fr/ja/de/es/it/zh/ru 번역 포함)
    // 코드가 길어서 이미 membership.js와 함께 제공된 블록 그대로 붙여넣으면 됩니다.
    // === membership 블록은 위 답변 "4) lang.js 추가할 번역 키" 그대로 넣으시면 됩니다. ===
  })();

  window.LANGS = LANGS;
})();
