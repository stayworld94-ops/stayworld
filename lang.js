// StayWorld i18n — 10 languages (EN, KO, JA, FR, TR, DE, ES, IT, ZH, RU)
(function(){
  const T = {
    en:{ nav:{home:"Home", membership:"Membership", login:"Login", signup:"Sign Up"},
      h1:"Luxury stays.<br><span class='gold'>Global reach.</span>",
      pay:"Cards, bank transfer & crypto (BTC · ETH · USDT).",
      placeholder:"Paris, Tokyo, Istanbul…" },
    ko:{ nav:{home:"홈", membership:"멤버십", login:"로그인", signup:"가입"},
      h1:"럭셔리 스테이.<br><span class='gold'>글로벌 리치.</span>",
      pay:"카드 · 계좌이체 · 암호화폐 (BTC · ETH · USDT).",
      placeholder:"파리, 도쿄, 이스탄불…" },
    ja:{ nav:{home:"ホーム", membership:"メンバーシップ", login:"ログイン", signup:"登録"},
      h1:"ラグジュアリーな滞在。<br><span class='gold'>グローバルに。</span>",
      pay:"カード・振込・暗号資産 (BTC · ETH · USDT)。",
      placeholder:"パリ、東京、イスタンブール…" },
    fr:{ nav:{home:"Accueil", membership:"Abonnement", login:"Connexion", signup:"Inscription"},
      h1:"Séjours de luxe.<br><span class='gold'>Portée mondiale.</span>",
      pay:"Cartes, virement bancaire et crypto (BTC · ETH · USDT).",
      placeholder:"Paris, Tokyo, Istanbul…" },
    tr:{ nav:{home:"Ana Sayfa", membership:"Üyelik", login:"Giriş", signup:"Kayıt Ol"},
      h1:"Lüks konaklamalar.<br><span class='gold'>Küresel erişim.</span>",
      pay:"Kart, havale ve kripto (BTC · ETH · USDT).",
      placeholder:"Paris, Tokyo, İstanbul…" },
    de:{ nav:{home:"Startseite", membership:"Mitgliedschaft", login:"Anmelden", signup:"Registrieren"},
      h1:"Luxuriöse Aufenthalte.<br><span class='gold'>Weltweite Reichweite.</span>",
      pay:"Karten, Überweisung & Krypto (BTC · ETH · USDT).",
      placeholder:"Paris, Tokio, Istanbul…" },
    es:{ nav:{home:"Inicio", membership:"Membresía", login:"Iniciar sesión", signup:"Registrarse"},
      h1:"Estancias de lujo.<br><span class='gold'>Alcance global.</span>",
      pay:"Tarjetas, transferencia bancaria y cripto (BTC · ETH · USDT).",
      placeholder:"París, Tokio, Estambul…" },
    it:{ nav:{home:"Home", membership:"Abbonamento", login:"Accedi", signup:"Registrati"},
      h1:"Soggiorni di lusso.<br><span class='gold'>Portata globale.</span>",
      pay:"Carte, bonifico e crypto (BTC · ETH · USDT).",
      placeholder:"Parigi, Tokyo, Istanbul…" },
    zh:{ nav:{home:"首页", membership:"会员", login:"登录", signup:"注册"},
      h1:"奢华住宿。<br><span class='gold'>全球触达。</span>",
      pay:"支持信用卡、转账与加密货币（BTC · ETH · USDT）。",
      placeholder:"巴黎、东京、伊斯坦布尔…" },
    ru:{ nav:{home:"Главная", membership:"Членство", login:"Войти", signup:"Регистрация"},
      h1:"Роскошные размещения.<br><span class='gold'>Глобальный охват.</span>",
      pay:"Карты, банковский перевод и крипто (BTC · ETH · USDT).",
      placeholder:"Париж, Токио, Стамбул…" }
  };

  function setHTML(id, html){ const el=document.getElementById(id); if(el) el.innerHTML = html; }
  function setText(id, txt){ const el=document.getElementById(id); if(el) el.textContent = txt; }

  function normalize(code){
    if(!code) return 'en';
    const lower = code.toLowerCase();
    // zh-CN/zh-TW -> zh, pt-BR 등 다른 코드는 앞 2자 우선
    if(lower.startsWith('zh')) return 'zh';
    const two = lower.slice(0,2);
    return T[two] ? two : 'en';
  }

  function applyLang(code){
    const c = normalize(code);
    const t = T[c] || T.en;
    setHTML("t_h1", t.h1);
    setHTML("t_pay", t.pay);
    const si = document.getElementById("searchInput"); if (si) si.placeholder = t.placeholder;
    setText("t_nav_home", t.nav.home);
    setText("t_nav_membership", t.nav.membership);
    setText("t_nav_login", t.nav.login);
    setText("t_nav_signup", t.nav.signup);
  }

  function init(){
    const sel = document.getElementById("langSelect");
    const saved = localStorage.getItem("sw_lang") || normalize(navigator.language||"en");
    const final = normalize(saved);
    if(sel){
      sel.value = final;
      sel.addEventListener("change", e=>{
        const v = normalize(e.target.value);
        localStorage.setItem("sw_lang", v);
        applyLang(v);
      });
    }
    applyLang(final);
  }

  window.SW_I18N = { applyLang };
  document.addEventListener("DOMContentLoaded", init);
})();
