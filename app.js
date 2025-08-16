/* app.js — front-end */

// -------------------- 1) 다국어 딕셔너리 --------------------
const i18n = {
  en: {
    "lang.label": "Language",
    "nav.home": "Home",
    "nav.membership": "Membership",
    "nav.login": "Login",
    "nav.signup": "Sign Up",

    "hero.luxury": "Luxury stays.",
    "hero.global": "Global reach.",
    "hero.tagline": "Cards, bank transfer & crypto (BTC · ETH · USDT).",

    "search.placeholder": "Paris, Tokyo, Istanbul…",
    "search.cta": "Search",

    "filters.title": "Filters",
    "filters.clear": "Clear",
    "filters.apply": "Apply",

    "feat.verified.title": "Verified stays",
    "feat.verified.desc": "Top picks near you.",
    "feat.rewards.title": "StayWorld+ Rewards",
    "feat.rewards.desc": "Earn points on every booking.",
    "feat.pay.title": "Secure payments",
    "feat.pay.desc": "Visa, Mastercard, Amex & Crypto.",

    "chat.placeholder": "Type a message…",
    "chat.send": "Send",
  },
  ko: {
    "lang.label": "언어",
    "nav.home": "Home",
    "nav.membership": "Membership",
    "nav.login": "Login",
    "nav.signup": "Sign Up",

    "hero.luxury": "럭셔리 숙소.",
    "hero.global": "전 세계 연결.",
    "hero.tagline": "카드, 은행이체 & 암호화폐 (BTC · ETH · USDT).",

    "search.placeholder": "파리, 도쿄, 이스탄불…",
    "search.cta": "검색",

    "filters.title": "필터",
    "filters.clear": "초기화",
    "filters.apply": "적용",

    "feat.verified.title": "검증된 숙소",
    "feat.verified.desc": "가까운 인기 추천.",
    "feat.rewards.title": "StayWorld+ 리워드",
    "feat.rewards.desc": "모든 예약에 포인트 적립.",
    "feat.pay.title": "안전한 결제",
    "feat.pay.desc": "비자, 마스터카드, 아멕스 & 크립토.",

    "chat.placeholder": "메시지를 입력하세요…",
    "chat.send": "전송",
  },
  ja: {
    "lang.label": "言語",
    "nav.home": "Home",
    "nav.membership": "Membership",
    "nav.login": "Login",
    "nav.signup": "Sign Up",

    "hero.luxury": "ラグジュアリーな滞在。",
    "hero.global": "世界中へ。",
    "hero.tagline": "カード、銀行振込、仮想通貨（BTC・ETH・USDT）。",

    "search.placeholder": "パリ、東京、イスタンブール…",
    "search.cta": "検索",

    "filters.title": "フィルター",
    "filters.clear": "クリア",
    "filters.apply": "適用",

    "feat.verified.title": "認証済み宿",
    "feat.verified.desc": "近くのおすすめ。",
    "feat.rewards.title": "StayWorld+ リワード",
    "feat.rewards.desc": "すべての予約でポイント獲得。",
    "feat.pay.title": "安全な決済",
    "feat.pay.desc": "Visa、Mastercard、Amex と暗号資産。",
    "chat.placeholder": "メッセージを入力…",
    "chat.send": "送信",
  },
  zh: {
    "lang.label": "语言",
    "nav.home": "Home","nav.membership":"Membership","nav.login":"Login","nav.signup":"Sign Up",
    "hero.luxury": "奢华住宿。","hero.global":"全球触达。","hero.tagline":"银行卡、银行转账与加密货币（BTC · ETH · USDT）。",
    "search.placeholder":"巴黎、东京、伊斯坦布尔…","search.cta":"搜索",
    "filters.title":"筛选","filters.clear":"清除","filters.apply":"应用",
    "feat.verified.title":"已认证房源","feat.verified.desc":"附近精选推荐。",
    "feat.rewards.title":"StayWorld+ 奖励","feat.rewards.desc":"每笔预订均可获积分。",
    "feat.pay.title":"安全支付","feat.pay.desc":"Visa、Mastercard、Amex 与加密。",
    "chat.placeholder":"输入消息…","chat.send":"发送",
  },
  es: {
    "lang.label":"Idioma",
    "nav.home":"Home","nav.membership":"Membership","nav.login":"Login","nav.signup":"Sign Up",
    "hero.luxury":"Estancias de lujo.","hero.global":"Alcance global.","hero.tagline":"Tarjetas, transferencia bancaria y cripto (BTC · ETH · USDT).",
    "search.placeholder":"París, Tokio, Estambul…","search.cta":"Buscar",
    "filters.title":"Filtros","filters.clear":"Limpiar","filters.apply":"Aplicar",
    "feat.verified.title":"Alojamientos verificados","feat.verified.desc":"Selecciones cerca de ti.",
    "feat.rewards.title":"Recompensas StayWorld+","feat.rewards.desc":"Gana puntos en cada reserva.",
    "feat.pay.title":"Pagos seguros","feat.pay.desc":"Visa, Mastercard, Amex y Cripto.",
    "chat.placeholder":"Escribe un mensaje…","chat.send":"Enviar",
  },
  fr: {
    "lang.label":"Langue",
    "nav.home":"Home","nav.membership":"Membership","nav.login":"Login","nav.signup":"Sign Up",
    "hero.luxury":"Séjours de luxe.","hero.global":"Portée mondiale.","hero.tagline":"Carte, virement & crypto (BTC · ETH · USDT).",
    "search.placeholder":"Paris, Tokyo, Istanbul…","search.cta":"Rechercher",
    "filters.title":"Filtres","filters.clear":"Réinitialiser","filters.apply":"Appliquer",
    "feat.verified.title":"Logements vérifiés","feat.verified.desc":"Meilleurs choix près de chez vous.",
    "feat.rewards.title":"Récompenses StayWorld+","feat.rewards.desc":"Des points à chaque réservation.",
    "feat.pay.title":"Paiements sécurisés","feat.pay.desc":"Visa, Mastercard, Amex & Crypto.",
    "chat.placeholder":"Tapez un message…","chat.send":"Envoyer",
  },
  de: {
    "lang.label":"Sprache",
    "nav.home":"Home","nav.membership":"Membership","nav.login":"Login","nav.signup":"Sign Up",
    "hero.luxury":"Luxuriöse Aufenthalte.","hero.global":"Weltweite Reichweite.","hero.tagline":"Karten, Überweisung & Krypto (BTC · ETH · USDT).",
    "search.placeholder":"Paris, Tokio, Istanbul…","search.cta":"Suchen",
    "filters.title":"Filter","filters.clear":"Zurücksetzen","filters.apply":"Anwenden",
    "feat.verified.title":"Verifizierte Unterkünfte","feat.verified.desc":"Top-Empfehlungen in Ihrer Nähe.",
    "feat.rewards.title":"StayWorld+ Prämien","feat.rewards.desc":"Punkte bei jeder Buchung sammeln.",
    "feat.pay.title":"Sichere Zahlungen","feat.pay.desc":"Visa, Mastercard, Amex & Krypto.",
    "chat.placeholder":"Nachricht eingeben…","chat.send":"Senden",
  },
  tr: {
    "lang.label":"Dil",
    "nav.home":"Home","nav.membership":"Membership","nav.login":"Login","nav.signup":"Sign Up",
    "hero.luxury":"Lüks konaklamalar.","hero.global":"Küresel erişim.","hero.tagline":"Kart, havale ve kripto (BTC · ETH · USDT).",
    "search.placeholder":"Paris, Tokyo, İstanbul…","search.cta":"Ara",
    "filters.title":"Filtreler","filters.clear":"Temizle","filters.apply":"Uygula",
    "feat.verified.title":"Doğrulanmış konaklamalar","feat.verified.desc":"Yakınınızdaki en iyi seçenekler.",
    "feat.rewards.title":"StayWorld+ Ödülleri","feat.rewards.desc":"Her rezervasyondan puan kazanın.",
    "feat.pay.title":"Güvenli ödemeler","feat.pay.desc":"Visa, Mastercard, Amex ve Kripto.",
    "chat.placeholder":"Mesaj yazın…","chat.send":"Gönder",
  },
  ru: {
    "lang.label":"Язык",
    "nav.home":"Home","nav.membership":"Membership","nav.login":"Login","nav.signup":"Sign Up",
    "hero.luxury":"Роскошное размещение.","hero.global":"Мировой охват.","hero.tagline":"Карты, банковский перевод и крипто (BTC · ETH · USDT).",
    "search.placeholder":"Париж, Токио, Стамбул…","search.cta":"Поиск",
    "filters.title":"Фильтры","filters.clear":"Сброс","filters.apply":"Применить",
    "feat.verified.title":"Проверенные варианты","feat.verified.desc":"Лучшие предложения рядом.",
    "feat.rewards.title":"Бонусы StayWorld+","feat.rewards.desc":"Баллы за каждое бронирование.",
    "feat.pay.title":"Безопасные платежи","feat.pay.desc":"Visa, Mastercard, Amex и Крипто.",
    "chat.placeholder":"Введите сообщение…","chat.send":"Отправить",
  },
  ar: {
    "lang.label":"اللغة",
    "nav.home":"Home","nav.membership":"Membership","nav.login":"Login","nav.signup":"Sign Up",
    "hero.luxury":"إقامات فاخرة.","hero.global":"انتشار عالمي.","hero.tagline":"بطاقات، حوالة بنكية وعُملات رقمية (BTC · ETH · USDT).",
    "search.placeholder":"باريس، طوكيو، إسطنبول…","search.cta":"بحث",
    "filters.title":"عوامل التصفية","filters.clear":"مسح","filters.apply":"تطبيق",
    "feat.verified.title":"إقامات موثوقة","feat.verified.desc":"أفضل الخيارات بالقرب منك.",
    "feat.rewards.title":"مكافآت StayWorld+","feat.rewards.desc":"اكسب نقاطًا مع كل حجز.",
    "feat.pay.title":"مدفوعات آمنة","feat.pay.desc":"Visa وMastercard وAmex والعملات الرقمية.",
    "chat.placeholder":"اكتب رسالة…","chat.send":"إرسال",
  },
};

// -------------------- 2) 번역 적용 --------------------
const $ = (sel, root=document) => root.querySelector(sel);
const $$ = (sel, root=document) => Array.from(root.querySelectorAll(sel));

const getLang = () => localStorage.getItem("lang") || "en";
const setLang = (lang) => localStorage.setItem("lang", lang);

function applyI18n(lang){
  const dict = i18n[lang] || i18n.en;
  // data-i18n (텍스트)
  $$("[data-i18n]").forEach(el=>{
    const key = el.getAttribute("data-i18n");
    if(dict[key]) el.textContent = dict[key];
  });
  // data-i18n-ph (placeholder)
  $$("[data-i18n-ph]").forEach(el=>{
    const key = el.getAttribute("data-i18n-ph");
    if(dict[key]) el.setAttribute("placeholder", dict[key]);
  });
}

const langSelect = $("#langSelect");
langSelect.value = getLang();
applyI18n(langSelect.value);
langSelect.addEventListener("change", ()=>{
  setLang(langSelect.value);
  applyI18n(langSelect.value);
});

// -------------------- 3) 필터 (20개+) --------------------
const FILTERS = [
  "Free Wi-Fi","Breakfast","Parking","Pet-friendly","Kitchen","Washer","Dryer",
  "Air conditioning","Heating","Elevator","Wheelchair accessible","Ocean view","City view",
  "Mountain view","Balcony","Smoking allowed","Family rooms","Crib","Fitness center",
  "Spa","Sauna","Hot tub","Airport shuttle","Late checkout","Early check-in",
  "Self check-in","Free cancellation","Non-refundable","Business center","Workspace"
];

const filterBtn   = $("#filterBtn");
const filterPanel = $("#filterPanel");
const filterOverlay = $("#filterOverlay");
const filterList = $("#filterList");
const filterClose = $("#filterClose");
const filterApply = $("#filterApply");
const filterClear = $("#filterClear");

let selectedFilters = new Set();

function renderFilters(){
  filterList.innerHTML = "";
  FILTERS.forEach((name, idx)=>{
    const id = `f-${idx}`;
    const wrap = document.createElement("label");
    wrap.className = "filter-chip";
    wrap.innerHTML = `
      <input type="checkbox" id="${id}" data-name="${name}" ${selectedFilters.has(name)?"checked":""}/>
      <span>${name}</span>
    `;
    filterList.appendChild(wrap);
  });
}
renderFilters();

function updateFilterBtn(){
  const n = selectedFilters.size;
  const key = "filters.title";
  const base = i18n[getLang()]?.[key] || "Filters";
  filterBtn.textContent = n>0 ? `${base} (${n})` : base;
}

function openFilters(){
  renderFilters();
  filterPanel.setAttribute("aria-hidden","false");
  filterOverlay.hidden = false;
  filterBtn.setAttribute("aria-expanded","true");
}
function closeFilters(){
  filterPanel.setAttribute("aria-hidden","true");
  filterOverlay.hidden = true;
  filterBtn.setAttribute("aria-expanded","false");
}
filterBtn.addEventListener("click", (e)=>{ e.stopPropagation(); openFilters(); });
filterClose.addEventListener("click", (e)=>{ e.stopPropagation(); closeFilters(); });
filterOverlay.addEventListener("click", ()=> closeFilters());
// 패널 내부 클릭은 외부로 전파되지 않도록
filterPanel.addEventListener("click", (e)=> e.stopPropagation());

filterApply.addEventListener("click", ()=>{
  selectedFilters = new Set(
    $$("#filterList input[type=checkbox]:checked").map(i=>i.dataset.name)
  );
  updateFilterBtn();
  closeFilters();
});
filterClear.addEventListener("click", ()=>{
  selectedFilters.clear();
  updateFilterBtn();
  renderFilters();
});
updateFilterBtn();

// -------------------- 4) 검색 버튼 (데모) --------------------
$("#searchBtn").addEventListener("click", ()=>{
  console.log("Search with:", {
    dest: $("#dest").value,
    checkin: $("#checkin").value,
    checkout: $("#checkout").value,
    filters: Array.from(selectedFilters)
  });
  alert("Search triggered ✔");
});

// -------------------- 5) 챗봇 위젯 --------------------
const aiToggle = $("#ai-toggle");
const aiWidget = $("#ai-widget");
const aiClose  = $("#ai-close");
const aiForm   = $("#ai-form");
const aiInput  = $("#ai-input");
const aiLog    = $("#ai-log");

function openChat(){
  aiWidget.setAttribute("aria-hidden","false");
  aiToggle.setAttribute("aria-expanded","true");
  aiInput.focus();
}
function closeChat(){
  aiWidget.setAttribute("aria-hidden","true");
  aiToggle.setAttribute("aria-expanded","false");
}
aiToggle.addEventListener("click",(e)=>{ e.stopPropagation(); openChat(); });
aiClose.addEventListener("click",(e)=>{ e.stopPropagation(); closeChat(); });
// 위젯 안에서의 클릭은 전파 금지 → 배경 레이어에 가로채이지 않음
aiWidget.addEventListener("click",(e)=> e.stopPropagation());
document.addEventListener("click", (e)=>{
  // 다른곳 클릭 시 패널/챗봇 닫기 (버튼 오작동 방지 위해 조건)
  if(!aiWidget.contains(e.target) && e.target!==aiToggle) closeChat();
  if(!filterPanel.contains(e.target) && e.target!==filterBtn) closeFilters();
});

function pushMsg(text, mine=false){
  const div=document.createElement("div");
  div.className = "msg"+(mine?" msg--me":"");
  div.textContent=text;
  aiLog.appendChild(div);
  aiLog.scrollTop = aiLog.scrollHeight;
}

aiForm.addEventListener("submit", async (e)=>{
  e.preventDefault();
  const text = aiInput.value.trim();
  if(!text) return;
  pushMsg(text,true);
  aiInput.value="";

  try{
    const res = await fetch("/.netlify/functions/chat",{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body: JSON.stringify({
        message: text,
        locale: getLang()
      })
    });
    if(!res.ok) throw new Error(await res.text());
    const data = await res.json();
    pushMsg(data.reply);
  }catch(err){
    console.error(err);
    pushMsg("Sorry, the assistant is temporarily unavailable.");
  }
});
