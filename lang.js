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
      membership:{
        title:"Membership Benefits",
        subtitle:"Higher tiers include all perks from lower tiers.",
        levels:{bronze:"Bronze",silver:"Silver",gold:"Gold",platinum:"Platinum",diamond:"Diamond",elite:"Elite"},
        perks:{points_back:"{percent}% points back on each booking"},
        retention_rule:"If there’s no booking for {days} days, you’ll be auto-downgraded by 1 level.",
        progress_title:"Top tier achieved.",
        progress_to_next:"Only {amount} left to reach {level}.",
        status_current_level:"Your level: {level}",
        member_prices:"Member-only prices",
        basic_support:"Standard support",
        secure_pay:"Secure payments (Cards & Crypto)",
        free_cancel:"Free-cancel window",
        priority_email:"Priority email support",
        priority_chat:"Priority live chat",
        late_checkout:"Late checkout (when available)",
        upgrade_when_available:"Room upgrade (when available)",
        b2b_invoice:"B2B invoice support",
        elite_concierge:"Elite concierge access",
        defaults:{days:60}
      }
    },
    ko:{
      nav:{home:"홈", membership:"멤버십", login:"로그인", signup:"가입"},
      h1:"럭셔리 스테이.<br><span class='gold'>글로벌 리치.</span>",
      pay:"카드, 계좌이체 & 크립토 (BTC · ETH · USDT).",
      filters:"필터", search:"검색", placeholder:"파리, 도쿄, 이스탄불…",
      card1:"인증 숙소", card1sub:"가까운 베스트 픽.",
      card2:"StayWorld+ 리워드", card2sub:"매 예약마다 포인트 적립.",
      card3:"안전한 결제", card3sub:"Visa, Mastercard, Amex & 크립토.",
      membership:{
        title:"멤버십 혜택",
        subtitle:"상위 등급은 하위 등급 혜택을 모두 포함합니다.",
        levels:{bronze:"브론즈",silver:"실버",gold:"골드",platinum:"플래티넘",diamond:"다이아몬드",elite:"엘리트"},
        perks:{points_back:"예약 시 {percent}% 포인트 적립"},
        retention_rule:"예약이 {days}일 이상 없으면 자동으로 1단계 강등됩니다.",
        progress_title:"최상위 등급에 도달했습니다.",
        progress_to_next:"{level}까지 {amount} 남았습니다.",
        status_current_level:"현재 레벨: {level}",
        member_prices:"멤버 전용 가격",
        basic_support:"기본 고객 지원",
        secure_pay:"안전한 결제(카드 & 크립토)",
        free_cancel:"무료 취소 기간",
        priority_email:"우선 이메일 지원",
        priority_chat:"우선 실시간 채팅",
        late_checkout:"레이트 체크아웃(가능 시)",
        upgrade_when_available:"객실 업그레이드(가능 시)",
        b2b_invoice:"기업용 계산서 지원",
        elite_concierge:"엘리트 컨시어지",
        defaults:{days:60}
      }
    },
    tr:{
      nav:{home:"Ana Sayfa", membership:"Üyelik", login:"Giriş", signup:"Kayıt Ol"},
      h1:"Lüks konaklamalar.<br><span class='gold'>Küresel erişim.</span>",
      pay:"Kart, havale ve kripto (BTC · ETH · USDT).",
      filters:"Filtreler", search:"Ara", placeholder:"Paris, Tokyo, İstanbul…",
      card1:"Doğrulanmış konaklamalar", card1sub:"Size yakın en iyi seçenekler.",
      card2:"StayWorld+ Ödülleri", card2sub:"Her rezervasyonda puan kazanın.",
      card3:"Güvenli ödemeler", card3sub:"Visa, Mastercard, Amex ve Kripto.",
      membership:{
        title:"Üyelik Avantajları",
        subtitle:"Üst seviyeler alt seviyelerin tüm ayrıcalıklarını içerir.",
        levels:{bronze:"Bronz",silver:"Gümüş",gold:"Altın",platinum:"Platin",diamond:"Elmas",elite:"Elit"},
        perks:{points_back:"Her rezervasyonda %{percent} puan iadesi"},
        retention_rule:"{days} gün boyunca rezervasyon yoksa seviyen otomatik olarak bir kademe düşürülür.",
        progress_title:"En üst seviye ulaşıldı.",
        progress_to_next:"{level} seviyesine ulaşmak için {amount} kaldı.",
        status_current_level:"Seviyen: {level}",
        member_prices:"Üyelere özel fiyatlar",
        basic_support:"Standart destek",
        secure_pay:"Güvenli ödemeler (Kart & Kripto)",
        free_cancel:"Ücretsiz iptal süresi",
        priority_email:"Öncelikli e-posta desteği",
        priority_chat:"Öncelikli sohbet",
        late_checkout:"Geç çıkış (müsaitse)",
        upgrade_when_available:"Oda yükseltme (müsaitse)",
        b2b_invoice:"B2B faturalandırma",
        elite_concierge:"Elit konsiyerj",
        defaults:{days:60}
      }
    },
    fr:{
      nav:{home:"Accueil", membership:"Adhésion", login:"Connexion", signup:"S’inscrire"},
      h1:"Séjours de luxe.<br><span class='gold'>Portée mondiale.</span>",
      pay:"Cartes, virement & crypto (BTC · ETH · USDT).",
      filters:"Filtres", search:"Rechercher", placeholder:"Paris, Tokyo, Istanbul…",
      card1:"Séjours vérifiés", card1sub:"Meilleures options près de chez vous.",
      card2:"Récompenses StayWorld+", card2sub:"Des points à chaque réservation.",
      card3:"Paiements sécurisés", card3sub:"Visa, Mastercard, Amex & Crypto.",
      membership:{
        title:"Avantages du programme",
        subtitle:"Les niveaux supérieurs incluent tous les avantages des niveaux inférieurs.",
        levels:{bronze:"Bronze",silver:"Argent",gold:"Or",platinum:"Platine",diamond:"Diamant",elite:"Élite"},
        perks:{points_back:"{percent}% de points à chaque réservation"},
        retention_rule:"Sans réservation pendant {days} jours, rétrogradation automatique d’un niveau.",
        progress_title:"Niveau maximal atteint.",
        progress_to_next:"Plus que {amount} pour atteindre {level}.",
        status_current_level:"Votre niveau : {level}",
        member_prices:"Tarifs réservés aux membres",
        basic_support:"Assistance standard",
        secure_pay:"Paiements sécurisés (Cartes & Crypto)",
        free_cancel:"Fenêtre d’annulation gratuite",
        priority_email:"Assistance e-mail prioritaire",
        priority_chat:"Chat prioritaire",
        late_checkout:"Départ tardif (si disponible)",
        upgrade_when_available:"Surclassement (si disponible)",
        b2b_invoice:"Facturation B2B",
        elite_concierge:"Conciergerie Élite",
        defaults:{days:60}
      }
    },
    ja:{
      nav:{home:"ホーム", membership:"メンバーシップ", login:"ログイン", signup:"登録"},
      h1:"ラグジュアリーな滞在。<br><span class='gold'>グローバルに。</span>",
      pay:"カード・振込・暗号資産 (BTC · ETH · USDT)。",
      filters:"フィルター", search:"検索", placeholder:"パリ、東京、イスタンブール…",
      card1:"認証済みステイ", card1sub:"近くのおすすめ。",
      card2:"StayWorld+ リワード", card2sub:"予約ごとにポイント獲得。",
      card3:"安全な支払い", card3sub:"Visa・Mastercard・Amex・暗号資産。",
      membership:{
        title:"メンバーシップ特典",
        subtitle:"上位ランクは下位ランクの特典をすべて含みます。",
        levels:{bronze:"ブロンズ",silver:"シルバー",gold:"ゴールド",platinum:"プラチナ",diamond:"ダイヤモンド",elite:"エリート"},
        perks:{points_back:"予約ごとに{percent}%ポイント還元"},
        retention_rule:"{days}日間予約がない場合、自動的に1ランク降格します。",
        progress_title:"最上位ランクに到達しました。",
        progress_to_next:"{level}まであと{amount}。",
        status_current_level:"現在のランク：{level}",
        member_prices:"会員限定価格",
        basic_support:"標準サポート",
        secure_pay:"安全な支払い（カード・暗号資産）",
        free_cancel:"無料キャンセル期間",
        priority_email:"優先メールサポート",
        priority_chat:"優先チャット",
        late_checkout:"レイトチェックアウト（空室時）",
        upgrade_when_available:"お部屋のアップグレード（空室時）",
        b2b_invoice:"B2B 請求書",
        elite_concierge:"エリート・コンシェルジュ",
        defaults:{days:60}
      }
    },
    de:{
      nav:{home:"Start", membership:"Mitgliedschaft", login:"Anmelden", signup:"Registrieren"},
      h1:"Luxuriöse Aufenthalte.<br><span class='gold'>Weltweite Reichweite.</span>",
      pay:"Karten, Überweisung & Krypto (BTC · ETH · USDT).",
      filters:"Filter", search:"Suchen", placeholder:"Paris, Tokio, Istanbul…",
      card1:"Verifizierte Unterkünfte", card1sub:"Top-Empfehlungen in deiner Nähe.",
      card2:"StayWorld+ Prämien", card2sub:"Punkte bei jeder Buchung.",
      card3:"Sichere Zahlungen", card3sub:"Visa, Mastercard, Amex & Krypto.",
      membership:{
        title:"Mitgliedschaftsvorteile",
        subtitle:"Höhere Stufen enthalten alle Vorteile der unteren Stufen.",
        levels:{bronze:"Bronze",silver:"Silber",gold:"Gold",platinum:"Platin",diamond:"Diamant",elite:"Elite"},
        perks:{points_back:"{percent}% Punkte pro Buchung"},
        retention_rule:"Ohne Buchung innerhalb von {days} Tagen automatische Herabstufung um eine Stufe.",
        progress_title:"Höchste Stufe erreicht.",
        progress_to_next:"Nur noch {amount} bis {level}.",
        status_current_level:"Dein Level: {level}",
        member_prices:"Mitgliederpreise",
        basic_support:"Standard-Support",
        secure_pay:"Sichere Zahlungen (Karten & Krypto)",
        free_cancel:"Kostenlose Stornofrist",
        priority_email:"Priorisierter E-Mail-Support",
        priority_chat:"Priorisierter Chat",
        late_checkout:"Später Check-out (wenn verfügbar)",
        upgrade_when_available:"Upgrade (wenn verfügbar)",
        b2b_invoice:"B2B-Rechnungen",
        elite_concierge:"Elite-Concierge",
        defaults:{days:60}
      }
    },
    es:{
      nav:{home:"Inicio", membership:"Membresía", login:"Entrar", signup:"Registrarse"},
      h1:"Estancias de lujo.<br><span class='gold'>Alcance global.</span>",
      pay:"Tarjetas, transferencia y cripto (BTC · ETH · USDT).",
      filters:"Filtros", search:"Buscar", placeholder:"París, Tokio, Estambul…",
      card1:"Alojamientos verificados", card1sub:"Las mejores opciones cerca de ti.",
      card2:"Recompensas StayWorld+", card2sub:"Puntos en cada reserva.",
      card3:"Pagos seguros", card3sub:"Visa, Mastercard, Amex y Cripto.",
      membership:{
        title:"Beneficios de membresía",
        subtitle:"Los niveles superiores incluyen todas las ventajas de los niveles inferiores.",
        levels:{bronze:"Bronce",silver:"Plata",gold:"Oro",platinum:"Platino",diamond:"Diamante",elite:"Élite"},
        perks:{points_back:"{percent}% de puntos por cada reserva"},
        retention_rule:"Si no hay reservas durante {days} días, se te degradará automáticamente un nivel.",
        progress_title:"Nivel máximo alcanzado.",
        progress_to_next:"Faltan {amount} para llegar a {level}.",
        status_current_level:"Tu nivel: {level}",
        member_prices:"Precios para miembros",
        basic_support:"Soporte estándar",
        secure_pay:"Pagos seguros (Tarjetas y Cripto)",
        free_cancel:"Ventana de cancelación gratuita",
        priority_email:"Soporte por correo prioritario",
        priority_chat:"Chat prioritario",
        late_checkout:"Salida tardía (si hay disponibilidad)",
        upgrade_when_available:"Mejora de habitación (si hay disponibilidad)",
        b2b_invoice:"Factura B2B",
        elite_concierge:"Conserje Élite",
        defaults:{days:60}
      }
    },
    it:{
      nav:{home:"Home", membership:"Abbonamento", login:"Accedi", signup:"Registrati"},
      h1:"Soggiorni di lusso.<br><span class='gold'>Portata globale.</span>",
      pay:"Carte, bonifico e crypto (BTC · ETH · USDT).",
      filters:"Filtri", search:"Cerca", placeholder:"Parigi, Tokyo, Istanbul…",
      card1:"Alloggi verificati", card1sub:"Le migliori scelte vicino a te.",
      card2:"Premi StayWorld+", card2sub:"Punti per ogni prenotazione.",
      card3:"Pagamenti sicuri", card3sub:"Visa, Mastercard, Amex e Crypto.",
      membership:{
        title:"Vantaggi dell’abbonamento",
        subtitle:"I livelli superiori includono tutti i vantaggi di quelli inferiori.",
        levels:{bronze:"Bronzo",silver:"Argento",gold:"Oro",platinum:"Platino",diamond:"Diamante",elite:"Élite"},
        perks:{points_back:"{percent}% di punti per ogni prenotazione"},
        retention_rule:"Se non effettui prenotazioni per {days} giorni, verrai retrocesso di 1 livello.",
        progress_title:"Raggiunto il livello massimo.",
        progress_to_next:"Mancano {amount} per raggiungere {level}.",
        status_current_level:"Il tuo livello: {level}",
        member_prices:"Prezzi riservati ai membri",
        basic_support:"Assistenza standard",
        secure_pay:"Pagamenti sicuri (Carte & Crypto)",
        free_cancel:"Finestra di cancellazione gratuita",
        priority_email:"Assistenza email prioritaria",
        priority_chat:"Chat prioritaria",
        late_checkout:"Late check-out (se disponibile)",
        upgrade_when_available:"Upgrade camera (se disponibile)",
        b2b_invoice:"Fatturazione B2B",
        elite_concierge:"Concierge Élite",
        defaults:{days:60}
      }
    },
    zh:{
      nav:{home:"首页", membership:"会员", login:"登录", signup:"注册"},
      h1:"奢华住宿。<br><span class='gold'>全球触达。</span>",
      pay:"支持银行卡、转账与加密货币 (BTC · ETH · USDT)。",
      filters:"筛选", search:"搜索", placeholder:"巴黎、东京、伊斯坦布尔…",
      card1:"认证住宿", card1sub:"你附近的优选。",
      card2:"StayWorld+ 奖励", card2sub:"每次预订都能赚积分。",
      card3:"安全支付", card3sub:"Visa、Mastercard、Amex 与加密货币。",
      membership:{
        title:"会员权益",
        subtitle:"更高级别包含所有低级别的权益。",
        levels:{bronze:"青铜",silver:"白银",gold:"黄金",platinum:"铂金",diamond:"钻石",elite:"精英"},
        perks:{points_back:"每次预订返还 {percent}% 积分"},
        retention_rule:"若 {days} 天内无预订，将自动降级一级。",
        progress_title:"已达到最高等级。",
        progress_to_next:"距离 {level} 还差 {amount}。",
        status_current_level:"你的等级：{level}",
        member_prices:"会员专属价格",
        basic_support:"标准支持",
        secure_pay:"安全支付（银行卡 & 加密货币）",
        free_cancel:"免费取消时段",
        priority_email:"优先邮件支持",
        priority_chat:"优先在线客服",
        late_checkout:"延迟退房（视房态）",
        upgrade_when_available:"客房升级（视房态）",
        b2b_invoice:"B2B 发票",
        elite_concierge:"精英礼宾服务",
        defaults:{days:60}
      }
    },
    ru:{
      nav:{home:"Главная", membership:"Членство", login:"Войти", signup:"Регистрация"},
      h1:"Роскошное проживание.<br><span class='gold'>Глобальный охват.</span>",
      pay:"Карты, банковский перевод и крипто (BTC · ETH · USDT).",
      filters:"Фильтры", search:"Поиск", placeholder:"Париж, Токио, Стамбул…",
      card1:"Проверенные варианты", card1sub:"Лучшие предложения рядом.",
      card2:"Награды StayWorld+", card2sub:"Баллы за каждое бронирование.",
      card3:"Безопасные платежи", card3sub:"Visa, Mastercard, Amex и Крипто.",
      membership:{
        title:"Преимущества членства",
        subtitle:"Более высокий уровень включает все преимущества нижних уровней.",
        levels:{bronze:"Бронза",silver:"Серебро",gold:"Золото",platinum:"Платина",diamond:"Бриллиант",elite:"Элита"},
        perks:{points_back:"{percent}% бонусов за каждое бронирование"},
        retention_rule:"Если нет бронирований в течение {days} дней, произойдет авто-понижение на один уровень.",
        progress_title:"Достигнут максимальный уровень.",
        progress_to_next:"Осталось {amount} до уровня {level}.",
        status_current_level:"Ваш уровень: {level}",
        member_prices:"Цены только для участников",
        basic_support:"Стандартная поддержка",
        secure_pay:"Безопасные платежи (Карты и Крипто)",
        free_cancel:"Период бесплатной отмены",
        priority_email:"Приоритетная поддержка по email",
        priority_chat:"Приоритетный чат",
        late_checkout:"Поздний выезд (при наличии)",
        upgrade_when_available:"Апгрейд номера (при наличии)",
        b2b_invoice:"B2B-счета",
        elite_concierge:"Элит-консьерж",
        defaults:{days:60}
      }
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
    setText("t_filters", t.filters||"Filters"); setText("t_search", t.search||"Search");
    setPH("searchInput", t.placeholder||"Search…");
    setText("t_card1", t.card1); setText("t_card1sub", t.card1sub);
    setText("t_card2", t.card2); setText("t_card2sub", t.card2sub);
    setText("t_card3", t.card3); setText("t_card3sub", t.card3sub);

    // 멤버십은 membership.js가 LANGS[code].membership을 자동 병합
    window.dispatchEvent(new Event("sw:languageChanged"));
  }

  function init(){
    const sel=document.getElementById("langSelect");
    const saved=(localStorage.getItem("sw_lang")||(navigator.language||"en")).slice(0,2).toLowerCase();
    const final=LANGS[saved]?saved:"en";
    if(sel){
      sel.value=final;
      sel.addEventListener("change", e=>{
        const v=(e.target.value||"en").slice(0,2).toLowerCase();
        localStorage.setItem("sw_lang", v);
        applyLang(v);
      });
    }
    applyLang(final);
    window.StayWorldI18n = { applyLang };
  }
  document.addEventListener("DOMContentLoaded", init);

  // 전역 노출 (membership.js에서 사용)
  window.LANGS = LANGS;
})();
