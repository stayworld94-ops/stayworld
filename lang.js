// StayWorld i18n — 10 languages (EN/KO/TR/FR/JA/DE/ES/IT/ZH/RU)
(function () {
  const LANGS = {
    en: {
      nav: { home: "Home", membership: "Membership", login: "Login", signup: "Sign Up" },
      h1: "Luxury stays.<br><span class='gold'>Global reach.</span>",
      pay: "Cards, bank transfer & crypto (BTC · ETH · USDT).",
      filters: "Filters", search: "Search", placeholder: "Paris, Tokyo, Istanbul…",
      card1: "Verified stays", card1sub: "Top picks near you.",
      card2: "StayWorld+ Rewards", card2sub: "Earn points on every booking.",
      card3: "Secure payments", card3sub: "Visa, Mastercard, Amex & Crypto.",
      membership: {} // (상세 membership 번역은 membership.js에서 기본내장 + 병합)
    },
    ko: {
      nav: { home: "홈", membership: "멤버십", login: "로그인", signup: "가입" },
      h1: "럭셔리 스테이.<br><span class='gold'>글로벌 리치.</span>",
      pay: "카드, 계좌이체 & 크립토 (BTC · ETH · USDT).",
      filters: "필터", search: "검색", placeholder: "파리, 도쿄, 이스탄불…",
      card1: "인증 숙소", card1sub: "가까운 베스트 픽.",
      card2: "StayWorld+ 리워드", card2sub: "매 예약마다 포인트 적립.",
      card3: "안전한 결제", card3sub: "Visa, Mastercard, Amex & 크립토.",
      membership: {}
    },
    fr: {
      nav: { home: "Accueil", membership: "Adhésion", login: "Connexion", signup: "S’inscrire" },
      h1: "Séjours de luxe.<br><span class='gold'>Portée mondiale.</span>",
      pay: "Cartes, virement & crypto (BTC · ETH · USDT).",
      filters: "Filtres", search: "Rechercher", placeholder: "Paris, Tokyo, Istanbul…",
      card1: "Séjours vérifiés", card1sub: "Meilleures options près de chez vous.",
      card2: "Récompenses StayWorld+", card2sub: "Des points à chaque réservation.",
      card3: "Paiements sécurisés", card3sub: "Visa, Mastercard, Amex & Crypto.",
      membership: {}
    },
    ja: {
      nav: { home: "ホーム", membership: "メンバーシップ", login: "ログイン", signup: "登録" },
      h1: "ラグジュアリーな滞在。<br><span class='gold'>グローバルに。</span>",
      pay: "カード・振込・暗号資産 (BTC · ETH · USDT)。",
      filters: "フィルター", search: "検索", placeholder: "パリ、東京、イスタンブール…",
      card1: "認証済みステイ", card1sub: "近くのおすすめ。",
      card2: "StayWorld+ リワード", card2sub: "予約ごとにポイント獲得。",
      card3: "安全な支払い", card3sub: "Visa・Mastercard・Amex・暗号資産。",
      membership: {}
    },
    de: {
      nav: { home: "Start", membership: "Mitgliedschaft", login: "Anmelden", signup: "Registrieren" },
      h1: "Luxuriöse Aufenthalte.<br><span class='gold'>Weltweite Reichweite.</span>",
      pay: "Karten, Überweisung & Krypto (BTC · ETH · USDT).",
      filters: "Filter", search: "Suchen", placeholder: "Paris, Tokio, Istanbul…",
      card1: "Verifizierte Unterkünfte", card1sub: "Top-Empfehlungen in deiner Nähe.",
      card2: "StayWorld+ Prämien", card2sub: "Punkte bei jeder Buchung.",
      card3: "Sichere Zahlungen", card3sub: "Visa, Mastercard, Amex & Krypto.",
      membership: {}
    },
    es: {
      nav: { home: "Inicio", membership: "Membresía", login: "Entrar", signup: "Registrarse" },
      h1: "Estancias de lujo.<br><span class='gold'>Alcance global.</span>",
      pay: "Tarjetas, transferencia y cripto (BTC · ETH · USDT).",
      filters: "Filtros", search: "Buscar", placeholder: "París, Tokio, Estambul…",
      card1: "Alojamientos verificados", card1sub: "Las mejores opciones cerca de ti.",
      card2: "Recompensas StayWorld+", card2sub: "Puntos en cada reserva.",
      card3: "Pagos seguros", card3sub: "Visa, Mastercard, Amex y Cripto.",
      membership: {}
    },
    it: {
      nav: { home: "Home", membership: "Abbonamento", login: "Accedi", signup: "Registrati" },
      h1: "Soggiorni di lusso.<br><span class='gold'>Portata globale.</span>",
      pay: "Carte, bonifico e crypto (BTC · ETH · USDT).",
      filters: "Filtri", search: "Cerca", placeholder: "Parigi, Tokyo, Istanbul…",
      card1: "Alloggi verificati", card1sub: "Le migliori scelte vicino a te.",
      card2: "Premi StayWorld+", card2sub: "Punti per ogni prenotazione.",
      card3: "Pagamenti sicuri", card3sub: "Visa, Mastercard, Amex e Crypto.",
      membership: {}
    },
    tr: {
      nav: { home: "Ana Sayfa", membership: "Üyelik", login: "Giriş", signup: "Kayıt Ol" },
      h1: "Lüks konaklamalar.<br><span class='gold'>Küresel erişim.</span>",
      pay: "Kart, havale ve kripto (BTC · ETH · USDT).",
      filters: "Filtreler", search: "Ara", placeholder: "Paris, Tokyo, İstanbul…",
      card1: "Doğrulanmış konaklamalar", card1sub: "Size yakın en iyi seçenekler.",
      card2: "StayWorld+ Ödülleri", card2sub: "Her rezervasyonda puan kazanın.",
      card3: "Güvenli ödemeler", card3sub: "Visa, Mastercard, Amex ve Kripto.",
      membership: {}
    },
    zh: {
      nav: { home: "首页", membership: "会员", login: "登录", signup: "注册" },
      h1: "奢华住宿。<br><span class='gold'>全球触达。</span>",
      pay: "支持银行卡、转账与加密货币 (BTC · ETH · USDT)。",
      filters: "筛选", search: "搜索", placeholder: "巴黎、东京、伊斯坦布尔…",
      card1: "认证住宿", card1sub: "你附近的优选。",
      card2: "StayWorld+ 奖励", card2sub: "每次预订都能赚积分。",
      card3: "安全支付", card3sub: "Visa、Mastercard、Amex 与加密货币。",
      membership: {}
    },
    ru: {
      nav: { home: "Главная", membership: "Членство", login: "Войти", signup: "Регистрация" },
      h1: "Роскошное проживание.<br><span class='gold'>Глобальный охват.</span>",
      pay: "Карты, банковский перевод и крипто (BTC · ETH · USDT).",
      filters: "Фильтры", search: "Поиск", placeholder: "Париж, Токио, Стамбул…",
      card1: "Проверенные варианты", card1sub: "Лучшие предложения рядом.",
      card2: "Награды StayWorld+", card2sub: "Баллы за каждое бронирование.",
      card3: "Безопасные платежи", card3sub: "Visa, Mastercard, Amex и Крипто.",
      membership: {}
    }
  };

  function setHTML(id, html){ const el=document.getElementById(id); if(el) el.innerHTML = html; }
  function setText(id, txt){ const el=document.getElementById(id); if(el) el.textContent = txt; }
  function setPH(id, ph){ const el=document.getElementById(id); if(el && 'placeholder' in el) el.placeholder = ph; }

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

    // 멤버십 화면은 LANGS[code].membership을 membership.js에서 참조
    window.dispatchEvent(new Event("sw:languageChanged"));
  }

  function init(){
    const sel = document.getElementById("langSelect");
    const saved = (localStorage.getItem("sw_lang") || (navigator.language||"en")).slice(0,2).toLowerCase();
    const final = LANGS[saved] ? saved : "en";
    if (sel){
      sel.value = final;
      sel.addEventListener("change", (e)=>{
        const v = e.target.value;
        localStorage.setItem("sw_lang", v);
        applyLang(v);
      });
    }
    applyLang(final);
    window.LANGS = LANGS;
    window.StayWorldI18n = { applyLang };
  }

  document.addEventListener("DOMContentLoaded", init);
})();
/* ===== StayWorld Membership i18n – merge block (append to bottom of /lang.js) ===== */
window.I18N = window.I18N || {};

// 보조: 언어 객체 보장
function ensureLang(langCode){
  if(!I18N[langCode]) I18N[langCode] = {};
  return I18N[langCode];
}

/* EN 기본(디폴트) – 다른 언어에서 누락되면 이 값으로 fallback */
const MB_EN = {
  // headings / labels
  title: "StayWorld Membership",
  inherit_note: "Upper tiers include all benefits of lower tiers.",
  your_tier: "Your Tier",
  to_next_msg: (amt) => `${amt} to next tier. Auto-downgrade after 60 days of no bookings.`,
  to_next_badge: "to next badge",
  dw_always: "If there is no booking for 60 days, your tier will auto-downgrade by 1 level.",
  // tiers
  bronze: "Bronze", silver: "Silver", gold: "Gold", platinum: "Platinum", diamond: "Diamond", elite: "Elite",
  // benefits
  b_member_prices: "Member prices",
  b_basic_support: "Basic support",
  b_secure_pay: "Secure card/crypto payments",
  b_points_3: "Earn 3% points",
  b_points_5: "Earn 5% points",
  b_points_7: "Earn 7% points",
  b_free_cancel_window: "Free cancellation window when available",
  b_priority_email: "Priority email (24h)",
  b_priority_chat: "Priority chat support",
  b_late_checkout: "Late checkout when available",
  b_upgrade_when_available: "Room upgrade when available",
  b_b2b_invoice: "B2B invoice available",
  b_elite_concierge: "Elite concierge & perks"
};

/* 언어별 덮어쓰기 */
const MB_OVERRIDES = {
  KO: {
    title:"StayWorld 멤버십",
    inherit_note:"상위 등급은 하위 등급의 혜택을 모두 포함합니다.",
    your_tier:"현재 등급",
    to_next_msg:(amt)=>`다음 등급까지 ${amt} 남았습니다. 60일 예약이 없으면 자동으로 1단계 강등됩니다.`,
    to_next_badge:"다음 배지까지",
    dw_always:"60일 이상 예약이 없으면 등급이 자동으로 1단계 강등됩니다.",
    b_member_prices:"멤버 전용 요금",
    b_basic_support:"기본 고객지원",
    b_secure_pay:"안전한 카드/암호화폐 결제",
    b_points_3:"숙박 3% 포인트 적립",
    b_points_5:"숙박 5% 포인트 적립",
    b_points_7:"숙박 7% 포인트 적립",
    b_free_cancel_window:"가능 시 무료 취소 기간",
    b_priority_email:"우선 이메일 응대(24시간)",
    b_priority_chat:"우선 채팅 지원",
    b_late_checkout:"가능 시 레이트 체크아웃 무료",
    b_upgrade_when_available:"가능 시 객실 업그레이드",
    b_b2b_invoice:"B2B 세금계산서 발행",
    b_elite_concierge:"엘리트 컨시어지 & 특전"
  },
  JA: {
    title:"StayWorld メンバーシップ",
    inherit_note:"上位ティアは下位ティアの特典をすべて含みます。",
    your_tier:"現在のティア",
    to_next_msg:(amt)=>`次のティアまで ${amt}。60日予約がない場合は自動で1段階降格します。`,
    to_next_badge:"次のバッジまで",
    dw_always:"60日以上予約がない場合、ティアは自動的に1段階降格されます。",
    b_member_prices:"会員価格",
    b_basic_support:"基本サポート",
    b_secure_pay:"安全なカード/暗号資産決済",
    b_points_3:"3%ポイント還元",
    b_points_5:"5%ポイント還元",
    b_points_7:"7%ポイント還元",
    b_free_cancel_window:"可能な場合の無料キャンセル期間",
    b_priority_email:"優先メール対応(24h)",
    b_priority_chat:"優先チャットサポート",
    b_late_checkout:"可能な場合のレイトチェックアウト無料",
    b_upgrade_when_available:"可能な場合の客室アップグレード",
    b_b2b_invoice:"B2B 請求書発行",
    b_elite_concierge:"エリート・コンシェルジュ特典"
  },
  ZH: {
    title:"StayWorld 会员",
    inherit_note:"高等级包含低等级的所有权益。",
    your_tier:"当前等级",
    to_next_msg:(amt)=>`距离下一级还差 ${amt}。若60天无预订，将自动降级1级。`,
    to_next_badge:"距离下一个徽章",
    dw_always:"如60天无预订，等级将自动降1级。",
    b_member_prices:"会员专享价",
    b_basic_support:"基础客服",
    b_secure_pay:"安全的银行卡/加密货币支付",
    b_points_3:"3%积分", b_points_5:"5%积分", b_points_7:"7%积分",
    b_free_cancel_window:"可用时免费取消期",
    b_priority_email:"优先邮件(24h)",
    b_priority_chat:"优先聊天支持",
    b_late_checkout:"可用时延迟退房免费",
    b_upgrade_when_available:"可用时房型升级",
    b_b2b_invoice:"可开具B2B发票",
    b_elite_concierge:"精英礼宾服务"
  },
  FR: {
    title:"Adhésion StayWorld",
    inherit_note:"Les niveaux supérieurs incluent tous les avantages des niveaux inférieurs.",
    your_tier:"Votre niveau",
    to_next_msg:(amt)=>`${amt} avant le prochain niveau. Rétrogradation auto après 60 jours sans réservation.`,
    to_next_badge:"avant le prochain badge",
    dw_always:"Si aucune réservation pendant 60 jours, rétrogradation d’un niveau.",
    b_member_prices:"Tarifs membres",
    b_basic_support:"Support de base",
    b_secure_pay:"Paiements carte/crypto sécurisés",
    b_points_3:"3% de points", b_points_5:"5% de points", b_points_7:"7% de points",
    b_free_cancel_window:"Fenêtre d’annulation gratuite si dispo",
    b_priority_email:"Email prioritaire (24h)",
    b_priority_chat:"Support chat prioritaire",
    b_late_checkout:"Late checkout si dispo",
    b_upgrade_when_available:"Surclassement si dispo",
    b_b2b_invoice:"Facture B2B",
    b_elite_concierge:"Concierge Élite"
  },
  DE: {
    title:"StayWorld Mitgliedschaft",
    inherit_note:"Höhere Stufen enthalten alle Vorteile der niedrigeren.",
    your_tier:"Ihre Stufe",
    to_next_msg:(amt)=>`${amt} bis zur nächsten Stufe. Automatische Herabstufung nach 60 Tagen ohne Buchung.`,
    to_next_badge:"bis zum nächsten Abzeichen",
    dw_always:"Ohne Buchung für 60 Tage erfolgt eine Herabstufung um 1 Stufe.",
    b_member_prices:"Mitgliederpreise",
    b_basic_support:"Basissupport",
    b_secure_pay:"Sichere Karten-/Krypto-Zahlungen",
    b_points_3:"3% Punkte", b_points_5:"5% Punkte", b_points_7:"7% Punkte",
    b_free_cancel_window:"Kostenlose Stornofrist falls verfügbar",
    b_priority_email:"Priorisierte E-Mail (24h)",
    b_priority_chat:"Priorisierter Chat",
    b_late_checkout:"Später Checkout falls verfügbar",
    b_upgrade_when_available:"Upgrade falls verfügbar",
    b_b2b_invoice:"B2B-Rechnung",
    b_elite_concierge:"Elite-Concierge"
  },
  ES: {
    title:"Membresía StayWorld",
    inherit_note:"Los niveles superiores incluyen los beneficios de los inferiores.",
    your_tier:"Tu nivel",
    to_next_msg:(amt)=>`${amt} para el siguiente nivel. Degradación automática tras 60 días sin reservas.`,
    to_next_badge:"para la siguiente insignia",
    dw_always:"Si no hay reservas durante 60 días, bajarás un nivel automáticamente.",
    b_member_prices:"Precios para miembros",
    b_basic_support:"Soporte básico",
    b_secure_pay:"Pagos seguros con tarjeta/cripto",
    b_points_3:"3% de puntos", b_points_5:"5% de puntos", b_points_7:"7% de puntos",
    b_free_cancel_window:"Ventana de cancelación gratis si hay",
    b_priority_email:"Email prioritario (24h)",
    b_priority_chat:"Soporte de chat prioritario",
    b_late_checkout:"Salida tardía si hay",
    b_upgrade_when_available:"Upgrade si hay",
    b_b2b_invoice:"Factura B2B",
    b_elite_concierge:"Conserje Elite"
  },
  IT: {
    title:"Abbonamento StayWorld",
    inherit_note:"I livelli superiori includono tutti i vantaggi di quelli inferiori.",
    your_tier:"Il tuo livello",
    to_next_msg:(amt)=>`${amt} al prossimo livello. Retrocessione automatica dopo 60 giorni senza prenotazioni.`,
    to_next_badge:"al prossimo badge",
    dw_always:"Senza prenotazioni per 60 giorni, retrocedi di 1 livello.",
    b_member_prices:"Prezzi membri",
    b_basic_support:"Supporto base",
    b_secure_pay:"Pagamenti sicuri carta/crypto",
    b_points_3:"3% punti", b_points_5:"5% punti", b_points_7:"7% punti",
    b_free_cancel_window:"Finestra di cancellazione gratuita se disponibile",
    b_priority_email:"Email prioritaria (24h)",
    b_priority_chat:"Chat prioritaria",
    b_late_checkout:"Late checkout se disponibile",
    b_upgrade_when_available:"Upgrade se disponibile",
    b_b2b_invoice:"Fattura B2B",
    b_elite_concierge:"Concierge Élite"
  },
  TR: {
    title:"StayWorld Üyelik",
    inherit_note:"Üst seviyeler alt seviyelerin tüm avantajlarını içerir.",
    your_tier:"Seviyen",
    to_next_msg:(amt)=>`Sonraki seviyeye ${amt}. 60 gün rezervasyon yoksa otomatik 1 seviye düşüş.`,
    to_next_badge:"sonraki rozet",
    dw_always:"60 gün rezervasyon olmazsa 1 seviye otomatik düşer.",
    b_member_prices:"Üye fiyatları",
    b_basic_support:"Temel destek",
    b_secure_pay:"Güvenli kart/kripto ödemeleri",
    b_points_3:"%3 puan", b_points_5:"%5 puan", b_points_7:"%7 puan",
    b_free_cancel_window:"Mümkünse ücretsiz iptal süresi",
    b_priority_email:"Öncelikli e-posta (24s)",
    b_priority_chat:"Öncelikli sohbet desteği",
    b_late_checkout:"Mümkünse geç çıkış",
    b_upgrade_when_available:"Mümkünse oda yükseltme",
    b_b2b_invoice:"B2B fatura",
    b_elite_concierge:"Elit konsiyerj"
  },
  RU: {
    title:"Подписка StayWorld",
    inherit_note:"Верхние уровни включают все преимущества нижних.",
    your_tier:"Ваш уровень",
    to_next_msg:(amt)=>`${amt} до следующего уровня. Автопонижение через 60 дней без бронирований.`,
    to_next_badge:"до следующего бейджа",
    dw_always:"Если нет бронирований 60 дней, уровень снизится на 1.",
    b_member_prices:"Цены для участников",
    b_basic_support:"Базовая поддержка",
    b_secure_pay:"Безопасные платежи картой/крипто",
    b_points_3:"3% баллов", b_points_5:"5% баллов", b_points_7:"7% баллов",
    b_free_cancel_window:"Бесплатная отмена при наличии",
    b_priority_email:"Приоритетная почта (24ч)",
    b_priority_chat:"Приоритетный чат",
    b_late_checkout:"Поздний выезд при наличии",
    b_upgrade_when_available:"Апгрейд номера при наличии",
    b_b2b_invoice:"B2B счет",
    b_elite_concierge:"Элит-консьерж"
  }
};

// 병합 실행: 존재하는 언어에 덮어쓰기, 없으면 생성 후 채움
const ALL_LANGS = ['EN','KO','JA','ZH','FR','DE','ES','IT','TR','RU'];
ALL_LANGS.forEach(code=>{
  const base = ensureLang(code);
  // 기본 EN 값을 먼저 채우고
  Object.keys(MB_EN).forEach(k=>{
    if (base[k] === undefined) base[k] = MB_EN[k];
  });
  // 언어별 override 적용
  if (MB_OVERRIDES[code]) Object.assign(base, MB_OVERRIDES[code]);
});

/* ===== end of membership i18n merge block ===== */
