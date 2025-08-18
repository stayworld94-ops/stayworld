/* ============================
   StayWorld Membership — FINAL PATCHED
   - 10 languages 적용 (LANGS[code].membership 불러옴)
   - 페이지 진입 시 강제로 번역 refresh
   - 혜택, 진행률, 강등 알람, 통화 변환 포함
============================ */

/* ---- 0) 기본 i18n fallback ---- */
const DEFAULT_I18N = {
  en: {
    title: "Membership Benefits",
    subtitle: "Higher tiers include all perks from lower tiers.",
    levels: { bronze:"Bronze", silver:"Silver", gold:"Gold", platinum:"Platinum", diamond:"Diamond", elite:"Elite" },
    perks: { points_back: "{percent}% points back on each booking" },
    retention_rule: "If there’s no booking for {days} days, you’ll be auto-downgraded by 1 level.",
    progress_title: "Top tier achieved.",
    progress_to_next: "Only {amount} left to reach {level}.",
    status_current_level: "Your level: {level}",
    member_prices: "Member-only prices",
    basic_support: "Standard support",
    secure_pay: "Secure payments (Cards & Crypto)",
    free_cancel: "Free-cancel window",
    priority_email: "Priority email support",
    priority_chat: "Priority live chat",
    late_checkout: "Late checkout (when available)",
    upgrade_when_available: "Room upgrade (when available)",
    b2b_invoice: "B2B invoice support",
    elite_concierge: "Elite concierge access",
    defaults: { days: 60 }
  }
};

/* ---- 1) Level thresholds ---- */
const LEVELS = [
  { name:'Bronze',   minKRW:       0, rate: 0 },
  { name:'Silver',   minKRW:  500_000, rate: 3 },
  { name:'Gold',     minKRW:2_000_000, rate: 5 },
  { name:'Platinum', minKRW:4_000_000, rate: 7 },
  { name:'Diamond',  minKRW:7_500_000, rate:10 },
  { name:'Elite',    minKRW:15_000_000, rate:15 }
];
const DOWNGRADE_DAYS = 60;

/* ---- 2) Currency FX ---- */
const KRW_PER_USD = 1300;
const FX = {
  USD:{code:'USD', symbol:'$',  perUSD:1,    locale:'en-US', frac:0},
  EUR:{code:'EUR', symbol:'€',  perUSD:0.92, locale:'fr-FR', frac:0},
  KRW:{code:'KRW', symbol:'₩',  perUSD:1300, locale:'ko-KR', frac:0},
  JPY:{code:'JPY', symbol:'¥',  perUSD:155,  locale:'ja-JP', frac:0},
  CNY:{code:'CNY', symbol:'¥',  perUSD:7.2,  locale:'zh-CN', frac:0},
  TRY:{code:'TRY', symbol:'₺',  perUSD:33,   locale:'tr-TR', frac:0},
  RUB:{code:'RUB', symbol:'₽',  perUSD:90,   locale:'ru-RU', frac:0}
};
const LANG2CUR = { en:'USD', ko:'KRW', ja:'JPY', zh:'CNY', fr:'EUR', es:'EUR', de:'EUR', it:'EUR', tr:'TRY', ru:'RUB' };

/* ---- 3) Helpers ---- */
function getLangCode(){
  const saved = (localStorage.getItem('sw_lang') || (navigator.language||'en')).slice(0,2).toLowerCase();
  return (window.LANGS && LANGS[saved]) ? saved : 'en';
}
function getDict(){
  const code = getLangCode();
  if (window.LANGS && LANGS[code] && LANGS[code].membership) {
    return LANGS[code].membership;
  }
  return DEFAULT_I18N[code] || DEFAULT_I18N.en;
}
function tpl(str, map){
  return String(str).replace(/\{(\w+)\}/g, (_,k)=> map[k] ?? `{${k}}`);
}
function fmtKRWtoLocal(krw){
  const cur = FX[ LANG2CUR[getLangCode()] || 'USD' ] || FX.USD;
  const usd = krw / KRW_PER_USD;
  const local = usd * cur.perUSD;
  return new Intl.NumberFormat(cur.locale, { style:'currency', currency:cur.code }).format(local);
}

/* ---- 4) Benefits ---- */
const BENEFITS_TEXT = {
  member_prices: (L)=> L.member_prices,
  basic_support: (L)=> L.basic_support,
  secure_pay: (L)=> L.secure_pay,
  points_back: (L,p)=> tpl(L.perks.points_back, {percent:p}),
  free_cancel: (L)=> L.free_cancel,
  priority_email: (L)=> L.priority_email,
  priority_chat: (L)=> L.priority_chat,
  late_checkout: (L)=> L.late_checkout,
  upgrade_when_available:(L)=> L.upgrade_when_available,
  b2b_invoice: (L)=> L.b2b_invoice,
  elite_concierge: (L)=> L.elite_concierge
};
const BENEFITS_BY_TIER = {
  Bronze:   ['member_prices','basic_support','secure_pay'],
  Silver:   ['member_prices','basic_support','secure_pay',['points_back',3],'free_cancel'],
  Gold:     ['member_prices','basic_support','secure_pay',['points_back',5],'priority_email','late_checkout'],
  Platinum: ['member_prices','basic_support','secure_pay',['points_back',7],'priority_email','priority_chat','upgrade_when_available'],
  Diamond:  ['member_prices','basic_support','secure_pay',['points_back',10],'priority_email','priority_chat','upgrade_when_available','b2b_invoice'],
  Elite:    ['member_prices','basic_support','secure_pay',['points_back',15],'priority_email','priority_chat','upgrade_when_available','b2b_invoice','elite_concierge']
};

/* ---- 5) Logic ---- */
function computeLevel(totalKRW, lastBookingISO){
  let idx = 0;
  for (let i=0;i<LEVELS.length;i++){ if (totalKRW >= LEVELS[i].minKRW) idx = i; }
  if (lastBookingISO){
    const diff = Math.floor((Date.now()-new Date(lastBookingISO).getTime())/86400000);
    if (diff >= DOWNGRADE_DAYS) idx = Math.max(0, idx-1);
  }
  return idx;
}
function remainToNext(totalKRW, idx){
  if (idx >= LEVELS.length-1) return null;
  return Math.max(0, LEVELS[idx+1].minKRW - totalKRW);
}

/* ---- 6) Rendering ---- */
function renderLabels(){
  const L = getDict();
  document.getElementById('mb_title').textContent = L.title;
  document.getElementById('mb_subtitle').textContent = L.subtitle;
  document.getElementById('dwTop').textContent = tpl(L.retention_rule, {days:L.defaults?.days??DOWNGRADE_DAYS});
  document.getElementById('lbl_bronze').textContent = L.levels.bronze;
  document.getElementById('lbl_silver').textContent = L.levels.silver;
  document.getElementById('lbl_gold').textContent = L.levels.gold;
  document.getElementById('lbl_platinum').textContent = L.levels.platinum;
  document.getElementById('lbl_diamond').textContent = L.levels.diamond;
  document.getElementById('lbl_elite').textContent = L.levels.elite;
}
function renderBenefits(){
  const L = getDict();
  document.querySelectorAll('#tiersGrid .tier-card').forEach(card=>{
    const tier = card.dataset.tier;
    const list = card.querySelector('.benefits'); if (!list) return;
    list.innerHTML='';
    (BENEFITS_BY_TIER[tier]||[]).forEach(item=>{
      let key=item, p=null; if(Array.isArray(item)){ key=item[0]; p=item[1]; }
      const text = BENEFITS_TEXT[key](L,p);
      const div=document.createElement('div');
      div.className='benefit';
      div.innerHTML=`<i>✔</i><span>${text}</span>`;
      list.appendChild(div);
    });
  });
}
function renderUser(totalSpentKRW, lastBookingISO){
  const L = getDict();
  const idx = computeLevel(totalSpentKRW, lastBookingISO);
  const lvl = LEVELS[idx];
  document.getElementById('levelTitle').textContent = tpl(L.status_current_level, {level:lvl.name});
  document.getElementById('tierBadge').textContent = `${lvl.rate}% back`;
  let remain = remainToNext(totalSpentKRW, idx);
  const msg=document.getElementById('levelProgressText');
  if(remain===null){ msg.textContent=L.progress_title; }
  else{
    msg.textContent = tpl(L.progress_to_next,{amount:fmtKRWtoLocal(remain),level:LEVELS[idx+1].name});
  }
}

/* ---- 7) API ---- */
function setUserContext({totalSpentKRW,lastBookingISO}){
  renderLabels(); renderBenefits(); renderUser(totalSpentKRW,lastBookingISO);
}

/* ---- 8) Init ---- */
document.addEventListener('DOMContentLoaded', ()=>{
  let u={}; try{ u=JSON.parse(localStorage.getItem('sw_user')||'{}'); }catch(_){}
  setUserContext({ totalSpentKRW:u.totalSpentKRW||0, lastBookingISO:u.lastBookingISO||null });

  window.addEventListener('sw:languageChanged', ()=>{
    let cur={}; try{ cur=JSON.parse(localStorage.getItem('sw_user')||'{}'); }catch(_){}
    setUserContext({ totalSpentKRW:cur.totalSpentKRW||0, lastBookingISO:cur.lastBookingISO||null });
  });

  // 🚩 강제 refresh (언어 적용 보장)
  setTimeout(()=>{ window.dispatchEvent(new Event('sw:languageChanged')); },200);
});

window.setUserContext = setUserContext;
