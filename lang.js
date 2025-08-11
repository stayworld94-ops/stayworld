const LANGS = {
  en: {
    nav_home: "Home",
    nav_deals: "Deals",
    nav_membership: "Membership",
    nav_host: "Host",
    nav_support: "Support",

    membership_title: "StayWorld+ Rewards",
    membership_sub: "Higher levels include all benefits of lower levels.",

    level_bronze: "Bronze",
    bronze_desc: "Basic access granted upon signup.",
    level_silver: "Silver",
    silver_desc: "3% points on first booking.",
    level_gold: "Gold",
    gold_desc: "5% points on every booking + priority support.",
    level_platinum: "Platinum",
    platinum_desc: "7% points + seasonal discounts.",
    level_diamond: "Diamond",
    diamond_desc: "10% points + exclusive coupons + VIP support.",
    level_elite: "Elite",
    elite_desc: "15% points + private deals + urgent priority service."
  },
  ko: {
    nav_home: "홈",
    nav_deals: "프로모션",
    nav_membership: "멤버십",
    nav_host: "호스트",
    nav_support: "고객센터",

    membership_title: "StayWorld+ 리워드",
    membership_sub: "상위 등급은 하위 등급의 모든 혜택을 포함합니다.",

    level_bronze: "브론즈",
    bronze_desc: "회원가입 시 기본 부여.",
    level_silver: "실버",
    silver_desc: "첫 예약 시 3% 포인트 적립.",
    level_gold: "골드",
    gold_desc: "매 예약 시 5% 포인트 적립 + 우선 고객 응대.",
    level_platinum: "플래티넘",
    platinum_desc: "7% 포인트 적립 + 시즌 할인 자동 적용.",
    level_diamond: "다이아몬드",
    diamond_desc: "10% 적립 + 전용 쿠폰 + VIP 고객센터.",
    level_elite: "엘리트",
    elite_desc: "15% 적립 + 프라이빗 딜 + 긴급 지원 우선 처리."
  },
  fr: {
    nav_home: "Accueil",
    nav_deals: "Offres",
    nav_membership: "Adhésion",
    nav_host: "Hôte",
    nav_support: "Assistance",

    membership_title: "Récompenses StayWorld+",
    membership_sub: "Les niveaux supérieurs incluent tous les avantages des niveaux inférieurs.",

    level_bronze: "Bronze",
    bronze_desc: "Accès de base accordé à l'inscription.",
    level_silver: "Argent",
    silver_desc: "3% de points lors de la première réservation.",
    level_gold: "Or",
    gold_desc: "5% de points sur chaque réservation + support prioritaire.",
    level_platinum: "Platine",
    platinum_desc: "7% de points + réductions saisonnières.",
    level_diamond: "Diamant",
    diamond_desc: "10% de points + coupons exclusifs + support VIP.",
    level_elite: "Élite",
    elite_desc: "15% de points + offres privées + service prioritaire urgent."
  },
  tr: {
    nav_home: "Ana Sayfa",
    nav_deals: "Fırsatlar",
    nav_membership: "Üyelik",
    nav_host: "Ev Sahibi",
    nav_support: "Destek",

    membership_title: "StayWorld+ Ödülleri",
    membership_sub: "Üst seviyeler, alt seviyelerin tüm avantajlarını içerir.",

    level_bronze: "Bronz",
    bronze_desc: "Kayıt olduğunuzda temel erişim verilir.",
    level_silver: "Gümüş",
    silver_desc: "İlk rezervasyonda %3 puan.",
    level_gold: "Altın",
    gold_desc: "Her rezervasyonda %5 puan + öncelikli destek.",
    level_platinum: "Platin",
    platinum_desc: "%7 puan + sezon indirimleri.",
    level_diamond: "Elmas",
    diamond_desc: "%10 puan + özel kuponlar + VIP destek.",
    level_elite: "Elit",
    elite_desc: "%15 puan + özel fırsatlar + acil öncelikli hizmet."
  },
  ja: {
    nav_home: "ホーム",
    nav_deals: "お得情報",
    nav_membership: "メンバーシップ",
    nav_host: "ホスト",
    nav_support: "サポート",

    membership_title: "StayWorld+ リワード",
    membership_sub: "上位レベルは下位レベルの全特典を含みます。",

    level_bronze: "ブロンズ",
    bronze_desc: "登録時に基本アクセスが付与されます。",
    level_silver: "シルバー",
    silver_desc: "初回予約で3％ポイント付与。",
    level_gold: "ゴールド",
    gold_desc: "毎回の予約で5％ポイント付与 + 優先サポート。",
    level_platinum: "プラチナ",
    platinum_desc: "7％ポイント付与 + シーズン割引。",
    level_diamond: "ダイヤモンド",
    diamond_desc: "10％ポイント + 限定クーポン + VIPサポート。",
    level_elite: "エリート",
    elite_desc: "15％ポイント + プライベートディール + 緊急優先サービス。"
  },
  de: {
    nav_home: "Startseite",
    nav_deals: "Angebote",
    nav_membership: "Mitgliedschaft",
    nav_host: "Gastgeber",
    nav_support: "Support",

    membership_title: "StayWorld+ Prämien",
    membership_sub: "Höhere Stufen beinhalten alle Vorteile der niedrigeren Stufen.",

    level_bronze: "Bronze",
    bronze_desc: "Grundzugang bei Registrierung gewährt.",
    level_silver: "Silber",
    silver_desc: "3% Punkte bei der ersten Buchung.",
    level_gold: "Gold",
    gold_desc: "5% Punkte pro Buchung + bevorzugter Support.",
    level_platinum: "Platin",
    platinum_desc: "7% Punkte + saisonale Rabatte.",
    level_diamond: "Diamant",
    diamond_desc: "10% Punkte + exklusive Gutscheine + VIP-Support.",
    level_elite: "Elite",
    elite_desc: "15% Punkte + private Angebote + dringender Premium-Service."
  },
  es: {
    nav_home: "Inicio",
    nav_deals: "Ofertas",
    nav_membership: "Membresía",
    nav_host: "Anfitrión",
    nav_support: "Soporte",

    membership_title: "Recompensas StayWorld+",
    membership_sub: "Los niveles superiores incluyen todos los beneficios de los inferiores.",

    level_bronze: "Bronce",
    bronze_desc: "Acceso básico otorgado al registrarse.",
    level_silver: "Plata",
    silver_desc: "3% de puntos en la primera reserva.",
    level_gold: "Oro",
    gold_desc: "5% de puntos en cada reserva + soporte prioritario.",
    level_platinum: "Platino",
    platinum_desc: "7% de puntos + descuentos de temporada.",
    level_diamond: "Diamante",
    diamond_desc: "10% de puntos + cupones exclusivos + soporte VIP.",
    level_elite: "Elite",
    elite_desc: "15% de puntos + ofertas privadas + servicio urgente prioritario."
  },
  it: {
    nav_home: "Home",
    nav_deals: "Offerte",
    nav_membership: "Abbonamento",
    nav_host: "Host",
    nav_support: "Supporto",

    membership_title: "Premi StayWorld+",
    membership_sub: "I livelli superiori includono tutti i vantaggi di quelli inferiori.",

    level_bronze: "Bronzo",
    bronze_desc: "Accesso base con registrazione.",
    level_silver: "Argento",
    silver_desc: "3% punti alla prima prenotazione.",
    level_gold: "Oro",
    gold_desc: "5% punti a ogni prenotazione + supporto prioritario.",
    level_platinum: "Platino",
    platinum_desc: "7% punti + sconti stagionali.",
    level_diamond: "Diamante",
    diamond_desc: "10% punti + coupon esclusivi + supporto VIP.",
    level_elite: "Elite",
    elite_desc: "15% punti + offerte private + servizio urgente prioritario."
  },
  zh: {
    nav_home: "首页",
    nav_deals: "优惠",
    nav_membership: "会员",
    nav_host: "房东",
    nav_support: "支持",

    membership_title: "StayWorld+ 奖励",
    membership_sub: "更高级别包含低级别的所有福利。",

    level_bronze: "青铜",
    bronze_desc: "注册后获得基本访问权限。",
    level_silver: "白银",
    silver_desc: "首次预订可获得3%积分。",
    level_gold: "黄金",
    gold_desc: "每次预订5%积分 + 优先支持。",
    level_platinum: "白金",
    platinum_desc: "7%积分 + 季节性折扣。",
    level_diamond: "钻石",
    diamond_desc: "10%积分 + 独家优惠券 + VIP支持。",
    level_elite: "精英",
    elite_desc: "15%积分 + 私人优惠 + 紧急优先服务。"
  },
  ru: {
    nav_home: "Главная",
    nav_deals: "Акции",
    nav_membership: "Членство",
    nav_host: "Хозяин",
    nav_support: "Поддержка",

    membership_title: "Награды StayWorld+",
    membership_sub: "Более высокий уровень включает все преимущества нижних уровней.",

    level_bronze: "Бронза",
    bronze_desc: "Базовый доступ при регистрации.",
    level_silver: "Серебро",
    silver_desc: "3% баллов при первом бронировании.",
    level_gold: "Золото",
    gold_desc: "5% баллов за каждое бронирование + приоритетная поддержка.",
    level_platinum: "Платина",
    platinum_desc: "7% баллов + сезонные скидки.",
    level_diamond: "Бриллиант",
    diamond_desc: "10% баллов + эксклюзивные купоны + VIP поддержка.",
    level_elite: "Элита",
    elite_desc: "15% баллов + приватные предложения + срочное приоритетное обслуживание."
  }
};

function applyLang(lang) {
  document.querySelectorAll("[id^='t_']").forEach(el => {
    let key = el.id.replace("t_", "");
    if (LANGS[lang] && LANGS[lang][key]) {
      el.innerText = LANGS[lang][key];
    }
  });
}

document.getElementById("langSelect").addEventListener("change", function() {
  const lang = this.value;
  localStorage.setItem("selectedLang", lang);
  applyLang(lang);
});

document.addEventListener("DOMContentLoaded", function() {
  const savedLang = localStorage.getItem("selectedLang") || "en";
  document.getElementById("langSelect").value = savedLang;
  applyLang(savedLang);
});
