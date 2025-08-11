// lang.js — StayWorld i18n (EN/KO/FR/TR/JA/DE/ES/IT/ZH/RU)

(function () {
  const LANGS = {
    en:{kicker:"Global stays • Verified hosts • Premium design",
        h1:"Luxury stays.<br><span class='gold'>Global reach.</span>",
        pay:"Cards, bank transfer & crypto (BTC · ETH · USDT).",
        filters:"Filters", search:"Search", popular:"Popular:",
        level:"Level", plus:"StayWorld+ active",
        nav:{home:"Home",deals:"Deals",membership:"Membership",host:"Host",support:"Support"},
        auth:{login:"Log in",signup:"Sign up"},
        deals_title:"Verified stays for you",
        level_hint:"Earn points. 60+ days inactive ➝ auto downgrade (−1 level).",
        placeholder:"Paris, Tokyo, Istanbul…"},
    ko:{kicker:"글로벌 스테이 • 인증된 호스트 • 프리미엄 디자인",
        h1:"럭셔리 스테이.<br><span class='gold'>글로벌 리치.</span>",
        pay:"카드, 계좌이체 & 크립토 (BTC · ETH · USDT).",
        filters:"필터", search:"검색", popular:"인기:",
        level:"레벨", plus:"StayWorld+ 활성",
        nav:{home:"Home",deals:"딜",membership:"멤버십",host:"호스트",support:"지원"},
        auth:{login:"로그인",signup:"가입"},
        deals_title:"추천 인증 숙소",
        level_hint:"포인트 적립. 60일 이상 미접속 시 자동 강등(−1레벨).",
        placeholder:"파리, 도쿄, 이스탄불…"},
    fr:{kicker:"Séjours mondiaux • Hôtes vérifiés • Design premium",
        h1:"Séjours de luxe.<br><span class='gold'>Portée mondiale.</span>",
        pay:"Cartes, virement & crypto (BTC · ETH · USDT).",
        filters:"Filtres", search:"Rechercher", popular:"Populaire :",
        level:"Niveau", plus:"StayWorld+ actif",
        nav:{home:"Accueil",deals:"Offres",membership:"Adhésion",host:"Hôte",support:"Assistance"},
        auth:{login:"Connexion",signup:"S’inscrire"},
        deals_title:"Séjours vérifiés pour vous",
        level_hint:"Gagnez des points. Inactif 60+ jours ➝ rétrogradation (−1 niveau).",
        placeholder:"Paris, Tokyo, Istanbul…"},
    tr:{kicker:"Küresel konaklamalar • Doğrulanmış ev sahipleri • Premium tasarım",
        h1:"Lüks konaklamalar.<br><span class='gold'>Küresel erişim.</span>",
        pay:"Kart, havale & kripto (BTC · ETH · USDT).",
        filters:"Filtreler", search:"Ara", popular:"Popüler:",
        level:"Seviye", plus:"StayWorld+ aktif",
        nav:{home:"Ana sayfa",deals:"Fırsatlar",membership:"Üyelik",host:"Ev Sahibi",support:"Destek"},
        auth:{login:"Giriş",signup:"Kaydol"},
        deals_title:"Sizin için doğrulanmış konaklamalar",
        level_hint:"Puan kazanın. 60+ gün pasif ➝ otomatik düşürme (−1).",
        placeholder:"Paris, Tokyo, İstanbul…"},
    ja:{kicker:"世界の滞在先 • 認証ホスト • プレミアムデザイン",
        h1:"ラグジュアリーな滞在。<br><span class='gold'>グローバルに。</span>",
        pay:"カード・振込・暗号資産 (BTC · ETH · USDT)。",
        filters:"フィルター", search:"検索", popular:"人気:",
        level:"レベル", plus:"StayWorld+ 有効",
        nav:{home:"ホーム",deals:"お得情報",membership:"メンバーシップ",host:"ホスト",support:"サポート"},
        auth:{login:"ログイン",signup:"登録"},
        deals_title:"あなたへの認証済みステイ",
        level_hint:"ポイント獲得。60日以上の非アクティブで自動降格(−1)。",
        placeholder:"パリ、東京、イスタンブール…"},
    de:{kicker:"Weltweite Aufenthalte • Verifizierte Gastgeber • Premium-Design",
        h1:"Luxuriöse Aufenthalte.<br><span class='gold'>Weltweite Reichweite.</span>",
        pay:"Karten, Überweisung & Krypto (BTC · ETH · USDT).",
        filters:"Filter", search:"Suchen", popular:"Beliebt:",
        level:"Level", plus:"StayWorld+ aktiv",
        nav:{home:"Start",deals:"Angebote",membership:"Mitgliedschaft",host:"Gastgeber",support:"Support"},
        auth:{login:"Anmelden",signup:"Registrieren"},
        deals_title:"Verifizierte Unterkünfte für dich",
        level_hint:"Punkte sammeln. 60+ Tage inaktiv ➝ Auto-Downgrade (−1).",
        placeholder:"Paris, Tokio, Istanbul…"},
    es:{kicker:"Estancias globales • Anfitriones verificados • Diseño premium",
        h1:"Estancias de lujo.<br><span class='gold'>Alcance global.</span>",
        pay:"Tarjetas, transferencia y cripto (BTC · ETH · USDT).",
        filters:"Filtros", search:"Buscar", popular:"Popular:",
        level:"Nivel", plus:"StayWorld+ activo",
        nav:{home:"Inicio",deals:"Ofertas",membership:"Membresía",host:"Anfitrión",support:"Soporte"},
        auth:{login:"Entrar",signup:"Registrarse"},
        deals_title:"Estancias verificadas para ti",
        level_hint:"Gana puntos. 60+ días inactivo ➝ degradación automática (−1).",
        placeholder:"París, Tokio, Estambul…"},
    it:{kicker:"Soggiorni globali • Host verificati • Design premium",
        h1:"Soggiorni di lusso.<br><span class='gold'>Portata globale.</span>",
        pay:"Carte, bonifico e crypto (BTC · ETH · USDT).",
        filters:"Filtri", search:"Cerca", popular:"Popolari:",
        level:"Livello", plus:"StayWorld+ attivo",
        nav:{home:"Home",deals:"Offerte",membership:"Abbonamento",host:"Host",support:"Supporto"},
        auth:{login:"Accedi",signup:"Registrati"},
        deals_title:"Soggiorni verificati per te",
        level_hint:"Guadagna punti. 60+ giorni inattivo ➝ retrocessione automatica (−1).",
        placeholder:"Parigi, Tokyo, Istanbul…"},
    zh:{kicker:"全球住宿 • 认证房东 • 高端设计",
        h1:"奢华住宿。<br><span class='gold'>全球触达。</span>",
        pay:"支持银行卡、转账与加密货币 (BTC · ETH · USDT)。",
        filters:"筛选", search:"搜索", popular:"热门：",
        level:"等级", plus:"StayWorld+ 已启用",
        nav:{home:"首页",deals:"优惠",membership:"会员",host:"房东",support:"支持"},
        auth:{login:"登录",signup:"注册"},
        deals_title:"为你精选的认证住宿",
        level_hint:"赚取积分。60+ 天不活跃 ➝ 自动降级（−1）。",
        placeholder:"巴黎、东京、伊斯坦布尔…"},
    ru:{kicker:"Мировые размещения • Проверенные хосты • Премиум-дизайн",
        h1:"Роскошное проживание.<br><span class='gold'>Глобальный охват.</span>",
        pay:"Карты, банковский перевод и крипто (BTC · ETH · USDT).",
        filters:"Фильтры", search:"Поиск", popular:"Популярное:",
        level:"Уровень", plus:"StayWorld+ активен",
        nav:{home:"Главная",deals:"Скидки",membership:"Подписка",host:"Хост",support:"Поддержка"},
        auth:{login:"Войти",signup:"Регистрация"},
        deals_title:"Проверенные предложения для вас",
        level_hint:"Копите баллы. 60+ дней неактивности ➝ понижение (−1).",
        placeholder:"Париж, Токио, Стамбул…"}
  };

  function applyLang(code){
    const t = LANGS[code] || LANGS.en;
    const set = (id, html)=>{ const el=document.getElementById(id); if(el) el.innerHTML = html; };
    set("t_kicker", t.kicker);
    set("t_h1",     t.h1);
    set("t_pay",    t.pay);
    set("t_filters",t.filters);
    set("t_search", t.search);
    set("t_popular",t.popular);
    set("t_level",  t.level);
    set("t_plus",   t.plus);
    set("t_deals_title", t.deals_title);
    set("t_level_hint",  t.level_hint);

    // placeholder & nav/auth
    const si = document.getElementById("searchInput");
    if (si) si.placeholder = t.placeholder;

    const navMap = [["t_nav_home","home"],["t_nav_deals","deals"],["t_nav_membership","membership"],["t_nav_host","host"],["t_nav_support","support"]];
    navMap.forEach(([id,k])=>{ const el=document.getElementById(id); if(el) el.textContent = t.nav[k]; });

    const lb = document.getElementById("loginBtn");  if (lb) lb.textContent  = t.auth.login;
    const sb = document.getElementById("signupBtn"); if (sb) sb.textContent = t.auth.signup;
  }

  // init & persist
  window.StayWorldI18n = { applyLang }; // (옵션) 다른 페이지에서도 쓰기 쉬우라고 export
  document.addEventListener("DOMContentLoaded", () => {
    const sel = document.getElementById("langSelect");
    const saved = localStorage.getItem("sw_lang") || "en";
    if (sel){ sel.value = saved; applyLang(saved);
      sel.addEventListener("change", e => {
        const v = e.target.value;
        localStorage.setItem("sw_lang", v);
        applyLang(v);
      });
    } else {
      applyLang(saved);
    }
  });
})();
