// StayWorld i18n (stable keys only)
(function(){
  const T = {
    en:{
      nav_home:"Home", nav_membership:"Membership", nav_login:"Login", nav_signup:"Sign Up",
      h1:"Luxury stays.<br><span class='gold'>Global reach.</span>",
      pay:"Cards, bank transfer & crypto (BTC · ETH · USDT).",
      filters:"Filters", placeholder:"Paris, Tokyo, Istanbul…", search_btn:"Search",
      support_title:"Support",
      support_ai_title:"AI Concierge", support_ai_desc:"Chat in your language — 24/7.", support_ai_btn:"Open bot",
      support_faq_title:"FAQ", support_faq_desc:"Common questions & answers.", support_faq_btn:"View FAQs",
      support_alerts_title:"Smart alerts", support_alerts_desc:"AI picks, destination tips & level updates.",
      badge_ai:"AI picks", badge_dest:"Top destinations", badge_lvl:"Level-up"
    },
    ko:{
      nav_home:"홈", nav_membership:"멤버십", nav_login:"로그인", nav_signup:"가입",
      h1:"럭셔리 스테이.<br><span class='gold'>글로벌 리치.</span>",
      pay:"카드, 계좌이체 & 크립토 (BTC · ETH · USDT).",
      filters:"필터", placeholder:"파리, 도쿄, 이스탄불…", search_btn:"검색",
      support_title:"지원",
      support_ai_title:"AI 컨시어지", support_ai_desc:"내 언어로 24/7 채팅.", support_ai_btn:"봇 열기",
      support_faq_title:"FAQ", support_faq_desc:"자주 묻는 질문.", support_faq_btn:"FAQ 보기",
      support_alerts_title:"스마트 알림", support_alerts_desc:"AI 추천, 목적지 팁, 레벨 업데이트.",
      badge_ai:"AI 추천", badge_dest:"인기 목적지", badge_lvl:"레벨업"
    },
    fr:{nav_home:"Accueil",nav_membership:"Adhésion",nav_login:"Connexion",nav_signup:"Inscription",
      h1:"Séjours de luxe.<br><span class='gold'>Portée mondiale.</span>", pay:"Cartes, virement & crypto (BTC · ETH · USDT).",
      filters:"Filtres", placeholder:"Paris, Tokyo, Istanbul…", search_btn:"Rechercher",
      support_title:"Assistance", support_ai_title:"Concierge IA", support_ai_desc:"Discutez dans votre langue — 24/7.", support_ai_btn:"Ouvrir le bot",
      support_faq_title:"FAQ", support_faq_desc:"Questions fréquentes.", support_faq_btn:"Voir la FAQ",
      support_alerts_title:"Alertes intelligentes", support_alerts_desc:"Sélections IA, conseils destination & niveaux.",
      badge_ai:"Sélections IA", badge_dest:"Top destinations", badge_lvl:"Changement de niveau"
    },
    tr:{nav_home:"Ana sayfa",nav_membership:"Üyelik",nav_login:"Giriş",nav_signup:"Kaydol",
      h1:"Lüks konaklamalar.<br><span class='gold'>Küresel erişim.</span>", pay:"Kart, havale & kripto (BTC · ETH · USDT).",
      filters:"Filtreler", placeholder:"Paris, Tokyo, İstanbul…", search_btn:"Ara",
      support_title:"Destek", support_ai_title:"YZ Konsiyerj", support_ai_desc:"Kendi dilinizde 24/7 sohbet.", support_ai_btn:"Botu aç",
      support_faq_title:"SSS", support_faq_desc:"Sık sorulan sorular.", support_faq_btn:"SSS’yi görüntüle",
      support_alerts_title:"Akıllı uyarılar", support_alerts_desc:"YZ seçkileri, ipuçları & seviye güncellemeleri.",
      badge_ai:"YZ seçkileri", badge_dest:"Popüler destinasyonlar", badge_lvl:"Seviye atla"
    },
    ja:{nav_home:"ホーム",nav_membership:"メンバー",nav_login:"ログイン",nav_signup:"登録",
      h1:"ラグジュアリーな滞在。<br><span class='gold'>グローバルに。</span>", pay:"カード・振込・暗号資産 (BTC · ETH · USDT)。",
      filters:"フィルター", placeholder:"パリ、東京、イスタンブール…", search_btn:"検索",
      support_title:"サポート", support_ai_title:"AI コンシェルジュ", support_ai_desc:"お好きな言語で 24/7。", support_ai_btn:"ボットを開く",
      support_faq_title:"FAQ", support_faq_desc:"よくある質問。", support_faq_btn:"FAQを見る",
      support_alerts_title:"スマート通知", support_alerts_desc:"AI ピック・目的地ヒント・レベル更新。",
      badge_ai:"AI ピック", badge_dest:"人気の目的地", badge_lvl:"レベルアップ"
    },
    de:{nav_home:"Start",nav_membership:"Mitgliedschaft",nav_login:"Anmelden",nav_signup:"Registrieren",
      h1:"Luxuriöse Aufenthalte.<br><span class='gold'>Weltweite Reichweite.</span>", pay:"Karten, Überweisung & Krypto (BTC · ETH · USDT).",
      filters:"Filter", placeholder:"Paris, Tokio, Istanbul…", search_btn:"Suchen",
      support_title:"Support", support_ai_title:"KI-Concierge", support_ai_desc:"In deiner Sprache 24/7.", support_ai_btn:"Bot öffnen",
      support_faq_title:"FAQ", support_faq_desc:"Häufige Fragen.", support_faq_btn:"FAQ ansehen",
      support_alerts_title:"Intelligente Benachrichtigungen", support_alerts_desc:"KI-Auswahl, Tipps & Level-Updates.",
      badge_ai:"KI-Auswahl", badge_dest:"Top-Ziele", badge_lvl:"Level-Up"
    },
    es:{nav_home:"Inicio",nav_membership:"Membresía",nav_login:"Entrar",nav_signup:"Registrarse",
      h1:"Estancias de lujo.<br><span class='gold'>Alcance global.</span>", pay:"Tarjetas, transferencia y cripto (BTC · ETH · USDT).",
      filters:"Filtros", placeholder:"París, Tokio, Estambul…", search_btn:"Buscar",
      support_title:"Soporte", support_ai_title:"Conserje IA", support_ai_desc:"En tu idioma 24/7.", support_ai_btn:"Abrir bot",
      support_faq_title:"FAQ", support_faq_desc:"Preguntas frecuentes.", support_faq_btn:"Ver FAQ",
      support_alerts_title:"Alertas inteligentes", support_alerts_desc:"Selecciones IA, consejos & nivel.",
      badge_ai:"Selecciones IA", badge_dest:"Destinos top", badge_lvl:"Subida de nivel"
    },
    it:{nav_home:"Home",nav_membership:"Abbonamento",nav_login:"Accedi",nav_signup:"Registrati",
      h1:"Soggiorni di lusso.<br><span class='gold'>Portata globale.</span>", pay:"Carte, bonifico e crypto (BTC · ETH · USDT).",
      filters:"Filtri", placeholder:"Parigi, Tokyo, Istanbul…", search_btn:"Cerca",
      support_title:"Supporto", support_ai_title:"Concierge IA", support_ai_desc:"Nella tua lingua, 24/7.", support_ai_btn:"Apri bot",
      support_faq_title:"FAQ", support_faq_desc:"Domande frequenti.", support_faq_btn:"Vedi FAQ",
      support_alerts_title:"Avvisi intelligenti", support_alerts_desc:"Scelte IA, suggerimenti & livelli.",
      badge_ai:"Scelte IA", badge_dest:"Destinazioni top", badge_lvl:"Level-up"
    },
    zh:{nav_home:"首页",nav_membership:"会员",nav_login:"登录",nav_signup:"注册",
      h1:"奢华住宿。<br><span class='gold'>全球触达。</span>", pay:"银行卡、转账与加密货币 (BTC · ETH · USDT)。",
      filters:"筛选", placeholder:"巴黎、东京、伊斯坦布尔…", search_btn:"搜索",
      support_title:"支持", support_ai_title:"AI 礼宾", support_ai_desc:"用你的语言 24/7 聊天。", support_ai_btn:"打开机器人",
      support_faq_title:"常见问题", support_faq_desc:"常见问题与解答。", support_faq_btn:"查看常见问题",
      support_alerts_title:"智能提醒", support_alerts_desc:"AI 精选、目的地提示与等级更新。",
      badge_ai:"AI 精选", badge_dest:"热门目的地", badge_lvl:"等级提升"
    },
    ru:{nav_home:"Главная",nav_membership:"Членство",nav_login:"Войти",nav_signup:"Регистрация",
      h1:"Роскошное проживание.<br><span class='gold'>Глобальный охват.</span>", pay:"Карты, перевод и крипто (BTC · ETH · USDT).",
      filters:"Фильтры", placeholder:"Париж, Токио, Стамбул…", search_btn:"Поиск",
      support_title:"Поддержка", support_ai_title:"AI-консьерж", support_ai_desc:"На вашем языке 24/7.", support_ai_btn:"Открыть бота",
      support_faq_title:"FAQ", support_faq_desc:"Частые вопросы.", support_faq_btn:"Смотреть FAQ",
      support_alerts_title:"Умные оповещения", support_alerts_desc:"Выборки ИИ, советы и уровни.",
      badge_ai:"Выбор ИИ", badge_dest:"Топ-направления", badge_lvl:"Повышение уровня"
    }
  };

  function setText(id, html, isHTML=false){
    const el = document.getElementById(id); if(!el) return;
    if (isHTML) el.innerHTML = html; else el.textContent = html;
  }

  function applyLang(code){
    const t = T[code] || T.en;
    setText('t_nav_home', t.nav_home);
    setText('t_nav_membership', t.nav_membership);
    setText('t_nav_login', t.nav_login);
    setText('t_nav_signup', t.nav_signup);
    setText('t_h1', t.h1, true);
    setText('t_pay', t.pay);
    setText('t_filters', t.filters);
    const si = document.getElementById('searchInput'); if (si) si.placeholder = t.placeholder;
    // Support
    setText('t_support_title', t.support_title);
    setText('t_support_ai_title', t.support_ai_title);
    setText('t_support_ai_desc', t.support_ai_desc);
    setText('t_support_faq_title', t.support_faq_title);
    setText('t_support_faq_desc', t.support_faq_desc);
    setText('t_support_faq_btn', t.support_faq_btn);
    setText('t_support_alerts_title', t.support_alerts_title);
    setText('t_support_alerts_desc', t.support_alerts_desc);
    setText('t_support_ai_btn', t.support_ai_btn);
    setText('t_support_badge_ai', t.badge_ai);
    setText('t_support_badge_dest', t.badge_dest);
    setText('t_support_badge_lvl', t.badge_lvl);
  }

  window.StayWorldI18n = { applyLang };
  document.addEventListener('DOMContentLoaded', ()=>{
    const saved = localStorage.getItem('sw_lang') || 'en';
    applyLang(saved);
  });
})();
