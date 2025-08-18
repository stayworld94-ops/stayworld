/* ============================
   StayWorld Membership — FINAL
   (for the provided membership.html)
   - Tier thresholds in KRW
   - Localized currency by language
   - Always-on downgrade note + D-30/15/7/1 toasts
   - Upper tiers inherit benefits of lower tiers
   - No dependency on data-i18n; uses specific IDs from your HTML
============================ */

/* ---- 1) Tier thresholds & earn rates (base: KRW) ---- */
const LEVELS = [
  { name:'Bronze',   minKRW:       0, rate: 0 },
  { name:'Silver',   minKRW:  500_000, rate: 3 },
  { name:'Gold',     minKRW:2_000_000, rate: 5 },
  { name:'Platinum', minKRW:4_000_000, rate: 7 },
  { name:'Diamond',  minKRW:7_500_000, rate:10 },
  { name:'Elite',    minKRW:15_000_000, rate:15 } // auto promotion
];

const DOWNGRADE_DAYS = 60;

/* ---- 2) Currency map per language (coarse FX for display only) ---- */
const KRW_PER_USD = 1300;
const FX = {
  USD:{code:'USD', symbol:'$',  perUSD:1,    locale:'en-US', frac:0},
  EUR:{code:'EUR', symbol:'€',  perUSD:0.92, locale:'fr-FR', frac:0},
  KRW:{code:'KRW', symbol:'₩',  perUSD:1300, locale:'ko-KR', frac:0},
  JPY:{code:'JPY', symbol:'¥',  perUSD:155,  locale:'ja-JP', frac:0},
  CNY:{code:'CNY', symbol:'¥',  perUSD:7.2,  locale:'zh-CN', frac:0},
  TRY:{code:'TRY', symbol:'₺',  perUSD:33,   locale:'tr-TR', frac:0},
  RUB:{code:'RUB', symbol:'₽',  perUSD:90,   locale:'ru-RU', frac:0},
  GBP:{code:'GBP', symbol:'£',  perUSD:0.78, locale:'en-GB', frac:0},
  AED:{code:'AED', symbol:'د.إ',perUSD:3.67, locale:'ar-AE', frac:0},
  CAD:{code:'CAD', symbol:'$',  perUSD:1.36, locale:'en-CA', frac:0}
};
const LANG2CUR = { en:'USD', ko:'KRW', ja:'JPY', zh:'CNY', fr:'EUR', es:'EUR', de:'EUR', it:'EUR', tr:'TRY', ru:'RUB' };

/* ---- 3) Helpers ---- */
function getLangCode(){
  // lang.js가 관리하는 선택값 우선
  const sel = document.getElementById('langSelect') || document.getElementById('lang');
  const selVal = (sel && sel.value) ? sel.value.toLowerCase() : null;
  const saved = (localStorage.getItem('sw_lang') || (navigator.language||'en')).slice(0,2).toLowerCase();
  const code = selVal || saved;
  return (window.LANGS && LANGS[code]) ? code : 'en';
}
function getDict(){
  const code=getLangCode();
  const fallback = (LANGS?.en?.membership)||{};
  return (LANGS?.[code]?.membership) || fallback;
}
function t(path){ // dot-path getter
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

/* ---- 4) Benefits per tier (upper inherits lower) ---- */
const BENEFITS_TEXT = {
  // 텍스트는 LANGS[code].membership에 있으면 그걸 우선 사용
  member_prices:      (L)=> L?.member_prices || "Member-only prices",
  basic_support:      (L)=> L?.basic_support || "Standard support",
  secure_pay:         (L)=> L?.secure_pay || "Secure payments (Cards & Crypto)",
  points_back:        (L,p)=> tpl(L?.perks?.points_back || "{percent}% back on each booking", {percent:p}),
  free_cancel:        (L)=> L?.free_cancel || "Free-cancel window",
  priority_email:     (L)=> L?.priority_email || "Priority email support",
  priority_chat:      (L)=> L?.priority_chat || "Priority live chat",
  late_checkout:      (L)=> L?.late_checkout || "Late checkout (when available)",
  upgrade_when_avail: (L)=> L?.upgrade_when_available || "Room upgrade (when available)",
  b2b_invoice:        (L)=> L?.b2b_invoice || "B2B invoice support",
  elite_concierge:    (L)=> L?.elite_concierge || "Elite concierge access",
};
const BENEFITS_BY_TIER = {
  Bronze:   ['member_prices','basic_support','secure_pay'],
  Silver:   ['member_prices','basic_support','secure_pay',['points_back',3],'free_cancel'],
  Gold:     ['member_prices','basic_support','secure_pay',['points_back',5],'priority_email','late_checkout'],
  Platinum: ['member_prices','basic_support','secure_pay',['points_back',7],'priority_email','priority_chat','upgrade_when_avail'],
  Diamond:  ['member_prices','basic_support','secure_pay',['points_back',7],'priority_email','priority_chat','upgrade_when_avail','b2b_invoice'],
  Elite:    ['member_prices','basic_support','secure_pay',['points_back',7],'priority_email','priority_chat','upgrade_when_avail','b2b_invoice','elite_concierge']
};

/* ---- 5) Core logic ---- */
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

  // 제목/설명
  set('mb_title', t('title') || 'Membership Benefits');
  set('mb_subtitle', t('subtitle') || t('inherit_note') || '');

  // 항상 보이는 강등 안내
  const days = (L.defaults?.days ?? DOWNGRADE_DAYS);
  const dwText = t('retention_rule') ? tpl(t('retention_rule'), {days}) :
                 `If there’s no booking for ${DOWNGRADE_DAYS} days, you’ll be auto-downgraded by 1 level.`;
  const dwTop = document.getElementById('dwTop'); if (dwTop) dwTop.textContent = dwText;

  // 레벨 라벨
  const lv = t('levels')||{};
  set('lbl_bronze',   lv.bronze   || 'Bronze');
  set('lbl_silver',   lv.silver   || 'Silver');
  set('lbl_gold',     lv.gold     || 'Gold');
  set('lbl_platinum', lv.platinum || 'Platinum');
  set('lbl_diamond',  lv.diamond  || 'Diamond');
  set('lbl_elite',    lv.elite    || 'Elite');
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

  // 상단 현재 등급 & 배지
  const yourTier = t('status_current_level') ? tpl(t('status_current_level'), {level:lvl.name}) : `Your level: ${lvl.name}`;
  const lt = document.getElementById('levelTitle'); if (lt) lt.textContent = yourTier;
  const badge = document.getElementById('tierBadge'); if (badge) badge.textContent = `${lvl.rate}% back`;

  // 진행률 & 다음 레벨까지
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
      msg.textContent = t('progress_title') || 'Top tier achieved.';
    }else{
      const nextLabel = LEVELS[Math.min(idx+1, LEVELS.length-1)].name;
      const txt = t('progress_to_next')
        ? tpl(t('progress_to_next'), { amount: fmtKRWtoLocal(remain), level: nextLabel })
        : `${fmtKRWtoLocal(remain)} to reach ${nextLabel}.`;
      msg.textContent = txt;
    }
  }

  // 카드 강조
  document.querySelectorAll('#tiersGrid [data-tier]').forEach(card=>{
    const name=card.getAttribute('data-tier');
    const i=LEVELS.findIndex(x=>x.name===name);
    card.classList.remove('tier-active','tier-muted');
    if (i===idx) card.classList.add('tier-active');
    if (i>idx)   card.classList.add('tier-muted');
  });

  // 하단 고정 안내
  const sticky=document.getElementById('downgradeSticky');
  if (sticky){
    const days = (L.defaults?.days ?? DOWNGRADE_DAYS);
    const txt = t('retention_rule') ? tpl(t('retention_rule'), {days}) :
               `If there’s no booking for ${DOWNGRADE_DAYS} days, you’ll be auto-downgraded by 1 level.`;
    sticky.textContent = txt;
  }

  // 강등 알림 토스트
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

// 외부에서 직접 호출할 수도 있게 export
window.setUserContext = setUserContext;
