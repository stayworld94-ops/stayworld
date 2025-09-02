/* assets/js/lang.js — StayWorld i18n (10 languages)
   EN / KO / FR / TR / JA / DE / ES / IT / ZH-CN / RU
   - data-i18n="key" 로 표시되는 모든 엘리먼트 자동 번역
   - window.STAY_I18N.{setLang, t, applyI18n, current} 제공
*/
(function () {
  /* ---------- Dictionaries ---------- */
  const LANGS = {
    /* ===== English ===== */
    en: {
      /* common nav (optional) */
      nav_home: "Home",
      nav_membership: "Membership",
      nav_login: "Login",
      nav_signup: "Sign Up",

      /* UI */
      ui_membership: "Membership",
      ui_login: "Login",
      ui_title: "Membership + Levels",
      ui_subtitle: "Choose a plan. Perks and level progress update automatically.",
      ui_plans: "Membership Plans",
      ui_monthly: "Monthly",
      ui_yearly: "Yearly",
      ui_plus_desc: "Instant perks + monthly boosts",
      ui_black_desc: "More boosts + priority + extras",
      ui_start_plus: "Start Plus",
      ui_start_black: "Start Black",
      ui_your_membership: "Your Membership",
      ui_this_month: "This month remaining",
      ui_points_boost: "Points boost",
      ui_instant_discount: "Instant discount",
      ui_per_booking: "per booking",
      ui_tickets: "Tickets",
      ui_your_level: "Your Level",
      ui_next_level: "Next level",
      ui_overall_progress: "Overall progress",
      ui_levels: "Levels",
      ui_inherit_note: "Higher tiers include all lower-level benefits.",
      ui_checkout: "Checkout",
      ui_pay_crypto: "Pay with Crypto",
      ui_paypal: "Pay with PayPal",
      ui_top_level: "Top level reached",

      /* % back labels */
      back_0: "0% back",
      back_3: "3% back",
      back_5: "5% back",
      back_7: "7% back",
      back_10: "10% back",
      back_15: "15% back",

      /* Benefits */
      benefit_basic: "Basic usage (auto-assigned on sign-up)",
      benefit_silver_3: "3% points on first booking",
      benefit_gold_5: "5% points on every booking",
      benefit_priority: "Priority customer support",
      benefit_platinum_7: "7% points back",
      benefit_platinum_season: "Seasonal discount applied",
      benefit_diamond_10: "10% points back",
      benefit_diamond_coupon: "Exclusive coupons",
      benefit_diamond_support: "Priority support center",
      benefit_elite_private: "Private deals access",
      benefit_elite_emergency: "Emergency priority support",
    },

    /* ===== Korean ===== */
    ko: {
      nav_home: "홈",
      nav_membership: "Membership",
      nav_login: "Login",
      nav_signup: "가입",

      ui_membership: "Membership",
      ui_login: "Login",
      ui_title: "Membership + Levels",
      ui_subtitle: "플랜을 선택하세요. 혜택과 레벨 진행률이 자동으로 반영됩니다.",
      ui_plans: "멤버십 플랜",
      ui_monthly: "월간",
      ui_yearly: "연간",
      ui_plus_desc: "즉시 혜택 + 월간 부스트",
      ui_black_desc: "더 많은 부스트 + 우선 응대 + 추가 혜택",
      ui_start_plus: "플러스 시작",
      ui_start_black: "블랙 시작",
      ui_your_membership: "내 멤버십",
      ui_this_month: "이 달 남은 혜택",
      ui_points_boost: "포인트 부스트",
      ui_instant_discount: "즉시 할인",
      ui_per_booking: "예약당",
      ui_tickets: "티켓",
      ui_your_level: "현재 레벨",
      ui_next_level: "다음 레벨",
      ui_overall_progress: "전체 진행률",
      ui_levels: "레벨",
      ui_inherit_note: "상위 레벨은 하위 레벨의 모든 혜택을 포함합니다.",
      ui_checkout: "결제",
      ui_pay_crypto: "크립토로 결제",
      ui_paypal: "페이팔로 결제",
      ui_top_level: "최고 레벨입니다",

      back_0: "0% 적립",
      back_3: "3% 적립",
      back_5: "5% 적립",
      back_7: "7% 적립",
      back_10: "10% 적립",
      back_15: "15% 적립",

      benefit_basic: "기본 이용 가능 (회원가입 시 자동 부여)",
      benefit_silver_3: "첫 예약 시 3% 포인트 적립",
      benefit_gold_5: "매 예약 시 5% 포인트 적립",
      benefit_priority: "우선 고객 응대",
      benefit_platinum_7: "7% 포인트 적립",
      benefit_platinum_season: "시즌 할인 자동 적용",
      benefit_diamond_10: "10% 포인트 적립",
      benefit_diamond_coupon: "전용 쿠폰",
      benefit_diamond_support: "고객센터 우선권",
      benefit_elite_private: "프라이빗 딜 접근",
      benefit_elite_emergency: "긴급 지원 우선 처리",
    },

    /* ===== French ===== */
    fr: {
      nav_home: "Accueil",
      nav_membership: "Adhésion",
      nav_login: "Connexion",
      nav_signup: "S’inscrire",

      ui_membership: "Adhésion",
      ui_login: "Connexion",
      ui_title: "Adhésion + Niveaux",
      ui_subtitle: "Choisissez un plan. Les avantages et la progression se mettent à jour automatiquement.",
      ui_plans: "Formules d’adhésion",
      ui_monthly: "Mensuel",
      ui_yearly: "Annuel",
      ui_plus_desc: "Avantages instantanés + boosts mensuels",
      ui_black_desc: "Plus de boosts + support prioritaire + extras",
      ui_start_plus: "Commencer Plus",
      ui_start_black: "Commencer Black",
      ui_your_membership: "Votre adhésion",
      ui_this_month: "Reste ce mois-ci",
      ui_points_boost: "Boost de points",
      ui_instant_discount: "Remise immédiate",
      ui_per_booking: "par réservation",
      ui_tickets: "Tickets",
      ui_your_level: "Votre niveau",
      ui_next_level: "Niveau suivant",
      ui_overall_progress: "Progression globale",
      ui_levels: "Niveaux",
      ui_inherit_note: "Les niveaux supérieurs incluent tous les avantages des niveaux inférieurs.",
      ui_checkout: "Paiement",
      ui_pay_crypto: "Payer en crypto",
      ui_paypal: "Payer avec PayPal",
      ui_top_level: "Niveau maximal atteint",

      back_0: "0% de retour",
      back_3: "3% de retour",
      back_5: "5% de retour",
      back_7: "7% de retour",
      back_10: "10% de retour",
      back_15: "15% de retour",

      benefit_basic: "Utilisation de base (attribuée automatiquement à l’inscription)",
      benefit_silver_3: "3% de points sur la première réservation",
      benefit_gold_5: "5% de points sur chaque réservation",
      benefit_priority: "Support client prioritaire",
      benefit_platinum_7: "7% de points",
      benefit_platinum_season: "Remises saisonnières appliquées",
      benefit_diamond_10: "10% de points",
      benefit_diamond_coupon: "Coupons exclusifs",
      benefit_diamond_support: "Accès prioritaire au support",
      benefit_elite_private: "Accès aux offres privées",
      benefit_elite_emergency: "Support d’urgence prioritaire",
    },

    /* ===== Turkish ===== */
    tr: {
      nav_home: "Ana sayfa",
      nav_membership: "Üyelik",
      nav_login: "Giriş",
      nav_signup: "Kaydol",

      ui_membership: "Üyelik",
      ui_login: "Giriş",
      ui_title: "Üyelik + Seviyeler",
      ui_subtitle: "Bir plan seçin. İmkanlar ve seviye ilerlemesi otomatik güncellenir.",
      ui_plans: "Üyelik Planları",
      ui_monthly: "Aylık",
      ui_yearly: "Yıllık",
      ui_plus_desc: "Anında ayrıcalıklar + aylık güçlendirmeler",
      ui_black_desc: "Daha fazla güçlendirme + öncelikli destek + ekstralar",
      ui_start_plus: "Plus’a Başla",
      ui_start_black: "Black’e Başla",
      ui_your_membership: "Üyeliğiniz",
      ui_this_month: "Bu ay kalan",
      ui_points_boost: "Puan arttırma",
      ui_instant_discount: "Anında indirim",
      ui_per_booking: "rezervasyon başına",
      ui_tickets: "Biletler",
      ui_your_level: "Seviyeniz",
      ui_next_level: "Sonraki seviye",
      ui_overall_progress: "Genel ilerleme",
      ui_levels: "Seviyeler",
      ui_inherit_note: "Üst seviyeler, alt seviyelerin tüm ayrıcalıklarını içerir.",
      ui_checkout: "Ödeme",
      ui_pay_crypto: "Kripto ile öde",
      ui_paypal: "PayPal ile öde",
      ui_top_level: "En üst seviye",

      back_0: "%0 iade",
      back_3: "%3 iade",
      back_5: "%5 iade",
      back_7: "%7 iade",
      back_10: "%10 iade",
      back_15: "%15 iade",

      benefit_basic: "Temel kullanım (kayıtta otomatik atanır)",
      benefit_silver_3: "İlk rezervasyonda %3 puan",
      benefit_gold_5: "Her rezervasyonda %5 puan",
      benefit_priority: "Öncelikli müşteri desteği",
      benefit_platinum_7: "%7 puan iadesi",
      benefit_platinum_season: "Sezon indirimi otomatik uygulanır",
      benefit_diamond_10: "%10 puan iadesi",
      benefit_diamond_coupon: "Özel kuponlar",
      benefit_diamond_support: "Öncelikli destek merkezi",
      benefit_elite_private: "Özel fırsatlara erişim",
      benefit_elite_emergency: "Acil öncelikli destek",
    },

    /* ===== Japanese ===== */
    ja: {
      nav_home: "ホーム",
      nav_membership: "メンバーシップ",
      nav_login: "ログイン",
      nav_signup: "登録",

      ui_membership: "メンバーシップ",
      ui_login: "ログイン",
      ui_title: "メンバーシップ + レベル",
      ui_subtitle: "プランを選択すると、特典とレベル進捗が自動更新されます。",
      ui_plans: "メンバーシッププラン",
      ui_monthly: "月額",
      ui_yearly: "年額",
      ui_plus_desc: "即時特典 + 月次ブースト",
      ui_black_desc: "さらなるブースト + 優先サポート + 特典",
      ui_start_plus: "Plus を開始",
      ui_start_black: "Black を開始",
      ui_your_membership: "あなたのメンバーシップ",
      ui_this_month: "今月の残り",
      ui_points_boost: "ポイントブースト",
      ui_instant_discount: "即時割引",
      ui_per_booking: "予約ごと",
      ui_tickets: "チケット",
      ui_your_level: "現在のレベル",
      ui_next_level: "次のレベル",
      ui_overall_progress: "全体の進捗",
      ui_levels: "レベル",
      ui_inherit_note: "上位レベルは下位レベルの特典をすべて含みます。",
      ui_checkout: "チェックアウト",
      ui_pay_crypto: "暗号資産で支払う",
      ui_paypal: "PayPal で支払う",
      ui_top_level: "最上位です",

      back_0: "還元 0%",
      back_3: "還元 3%",
      back_5: "還元 5%",
      back_7: "還元 7%",
      back_10: "還元 10%",
      back_15: "還元 15%",

      benefit_basic: "基本利用（登録時に自動付与）",
      benefit_silver_3: "初回予約で 3% ポイント",
      benefit_gold_5: "毎回の予約で 5% ポイント",
      benefit_priority: "優先カスタマーサポート",
      benefit_platinum_7: "7% ポイント還元",
      benefit_platinum_season: "シーズン割引自動適用",
      benefit_diamond_10: "10% ポイント還元",
      benefit_diamond_coupon: "限定クーポン",
      benefit_diamond_support: "サポート優先権",
      benefit_elite_private: "プライベートディールへのアクセス",
      benefit_elite_emergency: "緊急時の優先サポート",
    },

    /* ===== German ===== */
    de: {
      nav_home: "Start",
      nav_membership: "Mitgliedschaft",
      nav_login: "Anmelden",
      nav_signup: "Registrieren",

      ui_membership: "Mitgliedschaft",
      ui_login: "Anmelden",
      ui_title: "Mitgliedschaft + Stufen",
      ui_subtitle: "Wähle einen Plan. Vorteile und Fortschritt aktualisieren sich automatisch.",
      ui_plans: "Mitgliedschaftspläne",
      ui_monthly: "Monatlich",
      ui_yearly: "Jährlich",
      ui_plus_desc: "Sofortige Vorteile + monatliche Boosts",
      ui_black_desc: "Mehr Boosts + priorisierter Support + Extras",
      ui_start_plus: "Plus starten",
      ui_start_black: "Black starten",
      ui_your_membership: "Deine Mitgliedschaft",
      ui_this_month: "Diesen Monat verbleibend",
      ui_points_boost: "Punkte-Boost",
      ui_instant_discount: "Sofortrabatt",
      ui_per_booking: "pro Buchung",
      ui_tickets: "Tickets",
      ui_your_level: "Dein Level",
      ui_next_level: "Nächstes Level",
      ui_overall_progress: "Gesamtfortschritt",
      ui_levels: "Level",
      ui_inherit_note: "Höhere Level beinhalten alle Vorteile niedrigerer Level.",
      ui_checkout: "Bezahlen",
      ui_pay_crypto: "Mit Krypto zahlen",
      ui_paypal: "Mit PayPal zahlen",
      ui_top_level: "Höchstes Level erreicht",

      back_0: "0% zurück",
      back_3: "3% zurück",
      back_5: "5% zurück",
      back_7: "7% zurück",
      back_10: "10% zurück",
      back_15: "15% zurück",

      benefit_basic: "Grundnutzung (bei Registrierung automatisch)",
      benefit_silver_3: "3% Punkte bei der ersten Buchung",
      benefit_gold_5: "5% Punkte bei jeder Buchung",
      benefit_priority: "Priorisierter Kundensupport",
      benefit_platinum_7: "7% Punkte",
      benefit_platinum_season: "Saisonrabatt automatisch",
      benefit_diamond_10: "10% Punkte",
      benefit_diamond_coupon: "Exklusive Gutscheine",
      benefit_diamond_support: "Support mit Priorität",
      benefit_elite_private: "Zugang zu privaten Angeboten",
      benefit_elite_emergency: "Priorisierter Notfallsupport",
    },

    /* ===== Spanish ===== */
    es: {
      nav_home: "Inicio",
      nav_membership: "Membresía",
      nav_login: "Iniciar sesión",
      nav_signup: "Registrarse",

      ui_membership: "Membresía",
      ui_login: "Iniciar sesión",
      ui_title: "Membresía + Niveles",
      ui_subtitle: "Elige un plan. Los beneficios y el progreso se actualizan automáticamente.",
      ui_plans: "Planes de membresía",
      ui_monthly: "Mensual",
      ui_yearly: "Anual",
      ui_plus_desc: "Beneficios instantáneos + impulsos mensuales",
      ui_black_desc: "Más impulsos + prioridad + extras",
      ui_start_plus: "Empezar Plus",
      ui_start_black: "Empezar Black",
      ui_your_membership: "Tu membresía",
      ui_this_month: "Restante este mes",
      ui_points_boost: "Impulso de puntos",
      ui_instant_discount: "Descuento inmediato",
      ui_per_booking: "por reserva",
      ui_tickets: "Tickets",
      ui_your_level: "Tu nivel",
      ui_next_level: "Siguiente nivel",
      ui_overall_progress: "Progreso total",
      ui_levels: "Niveles",
      ui_inherit_note: "Los niveles superiores incluyen todos los beneficios de los inferiores.",
      ui_checkout: "Pago",
      ui_pay_crypto: "Pagar con cripto",
      ui_paypal: "Pagar con PayPal",
      ui_top_level: "Nivel máximo alcanzado",

      back_0: "0% de retorno",
      back_3: "3% de retorno",
      back_5: "5% de retorno",
      back_7: "7% de retorno",
      back_10: "10% de retorno",
      back_15: "15% de retorno",

      benefit_basic: "Uso básico (asignado automáticamente al registrarse)",
      benefit_silver_3: "3% de puntos en la primera reserva",
      benefit_gold_5: "5% de puntos en cada reserva",
      benefit_priority: "Soporte prioritario",
      benefit_platinum_7: "7% de puntos",
      benefit_platinum_season: "Descuento de temporada aplicado",
      benefit_diamond_10: "10% de puntos",
      benefit_diamond_coupon: "Cupones exclusivos",
      benefit_diamond_support: "Soporte con prioridad",
      benefit_elite_private: "Acceso a ofertas privadas",
      benefit_elite_emergency: "Soporte de emergencia prioritario",
    },

    /* ===== Italian ===== */
    it: {
      nav_home: "Home",
      nav_membership: "Abbonamento",
      nav_login: "Accedi",
      nav_signup: "Registrati",

      ui_membership: "Abbonamento",
      ui_login: "Accedi",
      ui_title: "Abbonamento + Livelli",
      ui_subtitle: "Scegli un piano. Vantaggi e progresso si aggiornano automaticamente.",
      ui_plans: "Piani di abbonamento",
      ui_monthly: "Mensile",
      ui_yearly: "Annuale",
      ui_plus_desc: "Vantaggi immediati + boost mensili",
      ui_black_desc: "Più boost + supporto prioritario + extra",
      ui_start_plus: "Avvia Plus",
      ui_start_black: "Avvia Black",
      ui_your_membership: "Il tuo abbonamento",
      ui_this_month: "Rimanente questo mese",
      ui_points_boost: "Boost punti",
      ui_instant_discount: "Sconto immediato",
      ui_per_booking: "per prenotazione",
      ui_tickets: "Ticket",
      ui_your_level: "Il tuo livello",
      ui_next_level: "Livello successivo",
      ui_overall_progress: "Progresso complessivo",
      ui_levels: "Livelli",
      ui_inherit_note: "I livelli superiori includono tutti i vantaggi dei livelli inferiori.",
      ui_checkout: "Pagamento",
      ui_pay_crypto: "Paga in cripto",
      ui_paypal: "Paga con PayPal",
      ui_top_level: "Livello massimo raggiunto",

      back_0: "0% di ritorno",
      back_3: "3% di ritorno",
      back_5: "5% di ritorno",
      back_7: "7% di ritorno",
      back_10: "10% di ritorno",
      back_15: "15% di ritorno",

      benefit_basic: "Uso di base (assegnato automaticamente alla registrazione)",
      benefit_silver_3: "3% di punti alla prima prenotazione",
      benefit_gold_5: "5% di punti a ogni prenotazione",
      benefit_priority: "Supporto clienti prioritario",
      benefit_platinum_7: "7% di punti",
      benefit_platinum_season: "Sconto stagionale applicato",
      benefit_diamond_10: "10% di punti",
      benefit_diamond_coupon: "Coupon esclusivi",
      benefit_diamond_support: "Supporto prioritario",
      benefit_elite_private: "Accesso a offerte private",
      benefit_elite_emergency: "Supporto di emergenza prioritario",
    },

    /* ===== Chinese (Simplified) ===== */
    "zh-CN": {
      nav_home: "首页",
      nav_membership: "会员",
      nav_login: "登录",
      nav_signup: "注册",

      ui_membership: "会员",
      ui_login: "登录",
      ui_title: "会员 + 等级",
      ui_subtitle: "选择一个方案。权益和等级进度将自动更新。",
      ui_plans: "会员方案",
      ui_monthly: "月付",
      ui_yearly: "年付",
      ui_plus_desc: "即时权益 + 每月加成",
      ui_black_desc: "更多加成 + 优先客服 + 额外福利",
      ui_start_plus: "开通 Plus",
      ui_start_black: "开通 Black",
      ui_your_membership: "你的会员",
      ui_this_month: "本月剩余",
      ui_points_boost: "积分加成",
      ui_instant_discount: "立减优惠",
      ui_per_booking: "每次预订",
      ui_tickets: "票券",
      ui_your_level: "你的等级",
      ui_next_level: "下一级",
      ui_overall_progress: "总体进度",
      ui_levels: "等级",
      ui_inherit_note: "高等级包含所有低等级权益。",
      ui_checkout: "结算",
      ui_pay_crypto: "加密货币支付",
      ui_paypal: "PayPal 支付",
      ui_top_level: "已达最高等级",

      back_0: "返利 0%",
      back_3: "返利 3%",
      back_5: "返利 5%",
      back_7: "返利 7%",
      back_10: "返利 10%",
      back_15: "返利 15%",

      benefit_basic: "基础使用（注册自动获得）",
      benefit_silver_3: "首单积分 3%",
      benefit_gold_5: "每单积分 5%",
      benefit_priority: "优先客服",
      benefit_platinum_7: "积分返利 7%",
      benefit_platinum_season: "自动应用季节性折扣",
      benefit_diamond_10: "积分返利 10%",
      benefit_diamond_coupon: "专属优惠券",
      benefit_diamond_support: "客服优先权",
      benefit_elite_private: "私享优惠通道",
      benefit_elite_emergency: "紧急优先支持",
    },

    /* ===== Russian ===== */
    ru: {
      nav_home: "Главная",
      nav_membership: "Подписка",
      nav_login: "Войти",
      nav_signup: "Регистрация",

      ui_membership: "Подписка",
      ui_login: "Войти",
      ui_title: "Подписка + Уровни",
      ui_subtitle: "Выберите план. Привилегии и прогресс уровня обновляются автоматически.",
      ui_plans: "Планы подписки",
      ui_monthly: "Ежемесячно",
      ui_yearly: "Ежегодно",
      ui_plus_desc: "Мгновенные привилегии + ежемесячные бусты",
      ui_black_desc: "Больше бустов + приоритетная поддержка + бонусы",
      ui_start_plus: "Начать Plus",
      ui_start_black: "Начать Black",
      ui_your_membership: "Ваша подписка",
      ui_this_month: "Остаток в этом месяце",
      ui_points_boost: "Буст баллов",
      ui_instant_discount: "Мгновенная скидка",
      ui_per_booking: "за бронирование",
      ui_tickets: "Тикеты",
      ui_your_level: "Ваш уровень",
      ui_next_level: "Следующий уровень",
      ui_overall_progress: "Общий прогресс",
      ui_levels: "Уровни",
      ui_inherit_note: "Старшие уровни включают привилегии младших.",
      ui_checkout: "Оплата",
      ui_pay_crypto: "Оплатить криптой",
      ui_paypal: "Оплатить через PayPal",
      ui_top_level: "Достигнут максимальный уровень",

      back_0: "0% возврат",
      back_3: "3% возврат",
      back_5: "5% возврат",
      back_7: "7% возврат",
      back_10: "10% возврат",
      back_15: "15% возврат",

      benefit_basic: "Базовое использование (автоматически при регистрации)",
      benefit_silver_3: "3% баллов за первое бронирование",
      benefit_gold_5: "5% баллов за каждое бронирование",
      benefit_priority: "Приоритетная поддержка",
      benefit_platinum_7: "7% возврат баллов",
      benefit_platinum_season: "Сезонная скидка применяется автоматически",
      benefit_diamond_10: "10% возврат баллов",
      benefit_diamond_coupon: "Эксклюзивные купоны",
      benefit_diamond_support: "Приоритет в поддержке",
      benefit_elite_private: "Доступ к приватным предложениям",
      benefit_elite_emergency: "Приоритетная экстренная поддержка",
    },
  };

  /* ---------- Helpers / Engine ---------- */
  function canonical(lang) {
    if (!lang) return "en";
    const lower = lang.toString().trim();
    if (LANGS[lower]) return lower;
    const base = lower.split("-")[0];
    return LANGS[base] ? base : "en";
  }

  const DEFAULT = canonical(localStorage.getItem("sw_lang") || navigator.language || "en");
  let current = DEFAULT;

  function applyI18n(lang) {
    const code = canonical(lang);
    current = code;
    localStorage.setItem("sw_lang", code);
    const dict = LANGS[code] || LANGS.en;

    // textContent for data-i18n
    document.querySelectorAll("[data-i18n]").forEach(el => {
      const key = el.getAttribute("data-i18n");
      const val = dict[key];
      if (typeof val === "string") el.textContent = val;
    });

    // placeholder translation: data-i18n-ph="key"
    document.querySelectorAll("[data-i18n-ph]").forEach(el => {
      const key = el.getAttribute("data-i18n-ph");
      const val = dict[key];
      if (typeof val === "string") el.setAttribute("placeholder", val);
    });

    // title attribute: data-i18n-title="key"
    document.querySelectorAll("[data-i18n-title]").forEach(el => {
      const key = el.getAttribute("data-i18n-title");
      const val = dict[key];
      if (typeof val === "string") el.setAttribute("title", val);
    });
  }

  function t(key) {
    const dict = LANGS[current] || LANGS.en;
    return dict[key] || (LANGS.en[key] || key);
  }
  function setLang(lang) { applyI18n(lang); }
  function getCurrent() { return current; }

  // expose to global
  window.STAY_I18N = {
    LANGS,
    setLang,
    applyI18n,
    t,
    current: getCurrent,
  };

  document.addEventListener("DOMContentLoaded", () => applyI18n(current));
})();
