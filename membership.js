/* ============================
   StayWorld Membership — SELF-CONTAINED FINAL
   - LANGS가 없어도 기본 번역으로 렌더됨 (DEFAULT_I18N 사용)
   - LANGS가 있으면 LANGS[code].membership을 우선 사용
   - tiers/혜택/진행률/통화/강등알람 전부 포함
============================ */

/* ---- 0) 기본 i18n (LANGS가 비정상일 때 fallback) ---- */
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
    // standalone benefit labels (페이지 카드용)
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
  },
  ko: {
    title: "멤버십 혜택",
    subtitle: "상위 등급은 하위 등급 혜택을 모두 포함합니다.",
    levels: { bronze:"브론즈", silver:"실버", gold:"골드", platinum:"플래티넘", diamond:"다이아몬드", elite:"엘리트" },
    perks: { points_back: "예약 시 {percent}% 포인트 적립" },
    retention_rule: "예약이 {days}일 이상 없으면 자동으로 1단계 강등됩니다.",
    progress_title: "최상위 등급에 도달했습니다.",
    progress_to_next: "{level}까지 {amount} 남았습니다.",
    status_current_level: "현재 레벨: {level}",
    member_prices: "멤버 전용 가격",
    basic_support: "기본 고객 지원",
    secure_pay: "안전한 결제(카드 & 크립토)",
    free_cancel: "무료 취소 기간",
    priority_email: "우선 이메일 지원",
    priority_chat: "우선 실시간 채팅",
    late_checkout: "레이트 체크아웃(가능 시)",
    upgrade_when_available: "객실 업그레이드(가능 시)",
    b2b_invoice: "기업용 계산서 지원",
    elite_concierge: "엘리트 컨시어지",
    defaults: { days: 60 }
  }
};

/* ---- 1) Tier thresholds & earn rates (base: KRW) ---- */
const LEVELS = [
  { name:'Bronze',   minKRW:       0, rate: 0 },
  { name:'Silver',   minKRW:  500_000, rate: 3 },
  { name:'Gold',     minKRW:2_000_000, rate: 5 },
  { name:'Platinum', minKRW:4_000_000, rate: 7 },
  { name:'Diamond',  minKRW:7_500_000, rate:10 },
  { name:'Elite',    minKRW:15_000_000, rate:15 }
];
const DOWNGRADE_DAYS = 60;

/* ---- 2) Currency (display-only FX) ---- */
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
  const sel = document.getElementById('langSelect') || document.getElementById('lang');
  const selVal = (sel && sel.value) ? sel.value.toLowerCase() : null;
  const saved = (localStorage.getItem('sw_lang') || (navigator.language||'en')).slice(0,2).toLowerCase();
  const code = selVal || saved;
  return (window.LANGS && LANGS[code]) ? code : (DEFAULT_I18N[code] ? code : 'en');
}
function getDict(){
  const code = getLangCode();
  // LANGS[code].membership 우선, 없으면 DEFAULT
  const fromLangs = (window.LANGS && LANGS[code] && LANGS[code].membership) ? LANGS[code].membership : null;
  const fallback  = DEFAULT_I18N[code] || DEFAULT_I18N.en;
  return fromLangs || fallback;
}
function t(path){
  const d=getDict();
  return path.split('.').reduce((o,k)=> (o&&o[k]!=null)?o[k]:undefined, d);
}
function tpl(str, map){
  return String(str).replace(/\{(\w+)\}/g, (_,k)=> (map && (k in map)) ? map[k] : `{${k}}`);
}
function fmtKRWtoLocal(krw){
  const cur = FX[ LANG2CUR[getLangCode()] || 'USD' ] || FX.USD;
  const usd = krw / KRW_PER_USD;
  const local = usd * cur.perUSD;
  return new Intl.NumberFormat(cur.locale, { style:'currency', currency:cur.code, maximumFractionDigits:cur.frac }).format(local);
}

/* ---- 4) Benefits ---- */
const BENEFITS_TEXT = {
  member_prices:      (L)=> L?.member_prices || DEFAULT_I18N.en.member_prices,
  basic_support:      (L)=> L?.basic_support || DEFAULT_I18N.en.basic_support,
  secure_pay:         (L)=> L?.secure_pay || DEFAULT_I18N.en.secure_pay,
  points_back:        (L,p)=> tpl(L?.perks?.points_back || DEFAULT_I18N.en.perks.points_back, {percent:p}),
  free_cancel:        (L)=> L?.free_cancel || DEFAULT_I18N.en.free_cancel,
  priority_email:     (L)=> L?.priority_email || DEFAULT_I18N.en.priority_email,
  priority_chat:      (L)=> L?.priority_chat || DEFAULT_I18N.en.priority_chat,
  late_checkout:      (L)=> L?.late_checkout || DEFAULT_I18N.en.late_checkout,
  upgrade_when_available:(L)=> L?.upgrade_when_available || DEFAULT_I18N.en.upgrade_when_available,
  b2b_invoice:        (L)=> L?.b2b_invoice || DEFAULT_I18N.en.b2b_invoice,
  elite_concierge:    (L)=> L?.elite_concierge || DEFAULT_I18N.en.elite_concierge
};
const BENEFITS_BY_TIER = {
  Bronze:   ['member_prices','basic_support','secure_pay'],
  Silver:   ['member_prices','basic_support','secure_pay',['points_back',3],'free_cancel'],
  Gold:     ['member_prices','basic_support','secure_pay',['points_back',5],'priority_email','late_checkout'],
  Platinum: ['member_prices','basic_support','secure_pay',['points_back',7],'priority_email','priority_chat','upgrade_when_available'],
  Diamond:  ['member_prices','basic_support','secure_pay',['points_back',7],'priority_email','priority_chat','upgrade_when_available','b2b_invoice'],
  Elite:    ['member_prices','basic_support','secure_pay',['points_back',7],'priority_email','priority_chat','upgrade_when_available','b2b_invoice','elite_concierge']
};

/* ---- 5) Logic ---- */
function computeLevel(totalKRW, lastBookingISO){
  let idx = 0;
  for (let i=0;i<LEVELS.length;i++){
    if (totalKRW >= LEVELS[i].minKRW) idx = i;
  }
  if (lastBookingISO){
    const diff = Math.floor((Date.now() - new Date(lastBookingISO).getTime())/86400000);
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
  const set = (id, val)=>{ const el=document.getElementById(id); if(el) el.textContent = val; };

  set('mb_title', t('title') || DEFAULT_I18N.en.title);
  set('mb_subtitle', t('subtitle') || DEFAULT_I18N.en.subtitle);

  const days = (L.defaults?.days ?? DOWNGRADE_DAYS);
  const dwText = t('retention_rule') ? tpl(t('retention_rule'), {days}) : tpl(DEFAULT_I18N.en.retention_rule, {days:DOWNGRADE_DAYS});
  const dwTop = document.getElementById('dwTop'); if (dwTop) dwTop.textContent = dwText;

  const lv = t('levels')||DEFAULT_I18N.en.levels;
  set('lbl_bronze',   lv.bronze);
  set('lbl_silver',   lv.silver);
  set('lbl_gold',     lv.gold);
  set('lbl_platinum', lv.platinum);
  set('lbl_diamond',  lv.diamond);
  set('lbl_elite',    lv.elite);
}

function renderBenefits(){
  const L = getDict();
  document.querySelectorAll('#tiersGrid .tier-card').forEach(card=>{
    const tier = card.getAttribute('data-tier');
    const list = card.querySelector('.benefits');
    if (!list) return;
    list.innerHTML='';
    (BENEFITS_BY_TIER[tier]||[]).forEach(item=>{
      let key=item, p=null;
      if (Array.isArray(item)){ key=item[0]; p=item[1]; }
      const div=document.createElement('div');
      div.className='benefit';
      const text = (BENEFITS_TEXT[key] ? BENEFITS_TEXT[key](L, p) : key);
      div.innerHTML = `<i>✔</i><span>${text}</span>`;
      list.appendChild(div);
    });
  });
}

function renderUser(totalSpentKRW, lastBookingISO){
  const L = getDict();
  const idx = computeLevel(totalSpentKRW||0, lastBookingISO||null);
  const lvl = LEVELS[idx];

  const yourTier = t('status_current_level')
    ? tpl(t('status_current_level'), {level:lvl.name})
    : tpl(DEFAULT_I18N.en.status_current_level, {level:lvl.name});
  const lt = document.getElementById('levelTitle'); if (lt) lt.textContent = yourTier;

  const badge = document.getElementById('tierBadge'); if (badge) badge.textContent = `${lvl.rate}% back`;

  let pct = 100, remain = remainToNext(totalSpentKRW, idx);
  if (remain!==null){
    const currMin=LEVELS[idx].minKRW, nextMin=LEVELS[idx+1].minKRW;
    pct = Math.min(100, Math.max(0, Math.round(((totalSpentKRW - currMin)/(nextMin - currMin))*100)));
  }
  const gf=document.getElementById('gaugeFill'); if (gf) gf.style.width = pct + '%';
  const pv=document.getElementById('progressPct'); if (pv) pv.textContent = pct + '%';

  const msg=document.getElementById('levelProgressText');
  if (msg){
    if (remain===null){
      msg.textContent = t('progress_title') || DEFAULT_I18N.en.progress_title;
    }else{
      const nextLabel = LEVELS[Math.min(idx+1, LEVELS.length-1)].name;
      const txt = t('progress_to_next')
        ? tpl(t('progress_to_next'), { amount: fmtKRWtoLocal(remain), level: nextLabel })
        : tpl(DEFAULT_I18N.en.progress_to_next, { amount: fmtKRWtoLocal(remain), level: nextLabel });
      msg.textContent = txt;
    }
  }

  document.querySelectorAll('#tiersGrid [data-tier]').forEach(card=>{
    const name=card.getAttribute('data-tier');
    const i=LEVELS.findIndex(x=>x.name===name);
    card.classList.remove('tier-active','tier-muted');
    if (i===idx) card.classList.add('tier-active');
    if (i>idx)   card.classList.add('tier-muted');
  });

  const sticky=document.getElementById('downgradeSticky');
  if (sticky){
    const days = (L.defaults?.days ?? DOWNGRADE_DAYS);
    const txt = t('retention_rule')
      ? tpl(t('retention_rule'), {days})
      : tpl(DEFAULT_I18N.en.retention_rule, {days:DOWNGRADE_DAYS});
    sticky.textContent = txt;
  }

  if (lastBookingISO){
    const diff = Math.floor((Date.now() - new Date(lastBookingISO).getTime())/86400000);
    const left = DOWNGRADE_DAYS - diff;
    if ([30,15,7,1].includes(left)) showToast(left);
  }
}

/* ---- 7) Toast ---- */
function showToast(daysLeft){
  const code=getLangCode();
  const ko = (daysLeft===30?'📢 30일 후 자동 강등 예정입니다. 지금 예약하면 유지됩니다.'
    : daysLeft===15?'⚠️ 15일 후 자동 강등 예정입니다. 활동을 유지하세요.'
    : daysLeft===7 ?'⏳ 7일 후 자동 강등 예정입니다. 서둘러 예약하세요!'
    :'🚨 내일 자동 강등됩니다! 오늘 예약을 완료하세요.');
  const en = (daysLeft===30?'📢 Auto downgrade in 30 days. Keep your tier by booking.'
    : daysLeft===15?'⚠️ Auto downgrade in 15 days. Stay active.'
    : daysLeft===7 ?'⏳ Auto downgrade in 7 days. Book soon!'
    :'🚨 Auto downgrade tomorrow! Complete a booking today.');

  const msg = (code==='ko') ? ko : en;
  const el=document.createElement('div');
  el.style.cssText='position:fixed;right:16px;bottom:16px;z-index:9999;background:#1e2a35;color:#fff;border:1px solid #2f3b47;padding:12px 14px;border-radius:12px;box-shadow:0 10px 24px rgba(0,0,0,.35)';
  el.textContent=msg;
  document.body.appendChild(el);
  setTimeout(()=> el.remove(), 8000);
}

/* ---- 8) Public API ---- */
function setUserContext({ totalSpentKRW, lastBookingISO }){
  renderLabels();
  renderBenefits();
  renderUser(totalSpentKRW||0, lastBookingISO||null);
}

/* ---- 9) Init ---- */
document.addEventListener('DOMContentLoaded', ()=>{
  // 기본 유저(없으면 0원)
  let u={};
  try{ u = JSON.parse(localStorage.getItem('sw_user')||'{}'); }catch(_){}
  setUserContext({
    totalSpentKRW: Number.isFinite(u.totalSpentKRW)?u.totalSpentKRW:0,
    lastBookingISO: u.lastBookingISO || null
  });

  // 언어 변경 이벤트 연동 (lang.js에서 dispatch)
  window.addEventListener('sw:languageChanged', ()=>{
    let cur={};
    try{ cur = JSON.parse(localStorage.getItem('sw_user')||'{}'); }catch(_){}
    setUserContext({
      totalSpentKRW: Number.isFinite(cur.totalSpentKRW)?cur.totalSpentKRW:0,
      lastBookingISO: cur.lastBookingISO || null
    });
  });
});

// export
window.setUserContext = setUserContext;

// 디버그 힌트(필요 시 주석 해제)
// console.log('[Membership] LANGS exists?', !!window.LANGS);
