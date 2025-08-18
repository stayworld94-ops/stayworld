/* ============================
   StayWorld Membership — Final
   - Tiers (upper inherits lower)
   - Currency shown by selected language
   - Always-on downgrade note + D-30/15/7/1 toasts
   - Elite is auto-promotion (NOT manual)
   ============================ */

/* ---- Levels (thresholds in KRW) ---- */
const LEVELS = [
  { name:'Bronze',   minKRW:       0, rate: 0 },
  { name:'Silver',   minKRW:  500_000, rate: 3 },
  { name:'Gold',     minKRW:2_000_000, rate: 5 },
  { name:'Platinum', minKRW:4_000_000, rate: 7 },
  { name:'Diamond',  minKRW:7_500_000, rate:10 },
  { name:'Elite',    minKRW:15_000_000, rate:15 } // 자동 승격
];
const DOWNGRADE_DAYS = 60;

/* ---- FX: show “KRW amounts” in local currency by language ---- */
const KRW_PER_USD = 1300; // 단순 환산 기준치(정적)
const FX = {
  USD:{code:'USD', symbol:'$',  perUSD:1,    locale:'en-US'},
  EUR:{code:'EUR', symbol:'€',  perUSD:0.92, locale:'fr-FR'},
  KRW:{code:'KRW', symbol:'₩',  perUSD:1300, locale:'ko-KR'},
  JPY:{code:'JPY', symbol:'¥',  perUSD:155,  locale:'ja-JP'},
  CNY:{code:'CNY', symbol:'¥',  perUSD:7.2,  locale:'zh-CN'},
  TRY:{code:'TRY', symbol:'₺',  perUSD:33,   locale:'tr-TR'},
  RUB:{code:'RUB', symbol:'₽',  perUSD:90,   locale:'ru-RU'},
  GBP:{code:'GBP', symbol:'£',  perUSD:0.78, locale:'en-GB'},
  AED:{code:'AED', symbol:'د.إ',perUSD:3.67, locale:'ar-AE'},
  CAD:{code:'CAD', symbol:'$',  perUSD:1.36, locale:'en-CA'}
};
const LANG2CUR = { EN:'USD', KO:'KRW', JA:'JPY', ZH:'CNY', FR:'EUR', ES:'EUR', DE:'EUR', TR:'TRY', AR:'AED', RU:'RUB' };

/* lang helper (re-uses lang.js) */
function currentLang(){
  const sel = document.getElementById('lang') || document.getElementById('langSelect');
  const v = (sel && sel.value) || localStorage.getItem('sw_lang') || (navigator.language||'en').slice(0,2).toUpperCase();
  return v.toUpperCase();
}
/* i18n getter */
function T(key){
  const lang = currentLang();
  const dict = (window.I18N && (I18N[lang]||I18N.EN)) || {};
  return dict[key];
}
/* currency formatter: KRW -> local currency by language */
function fmtKRWtoLocal(krw){
  const lang = currentLang();
  const cur = FX[ LANG2CUR[lang] || 'USD' ] || FX.USD;
  // KRW -> USD -> Local
  const usd = krw / KRW_PER_USD;
  const local = usd * cur.perUSD;
  const nf = new Intl.NumberFormat(cur.locale,{ style:'currency', currency:cur.code, maximumFractionDigits:(cur.code==='JPY'||cur.code==='KRW')?0:0 });
  return nf.format(local);
}

/* compute level index */
function computeLevel(totalKRW, lastBookingISO){
  let base = 0;
  for (let i=0;i<LEVELS.length;i++){
    if (totalKRW >= LEVELS[i].minKRW) base = i;
  }
  if (lastBookingISO){
    const diff = Math.floor((Date.now() - new Date(lastBookingISO).getTime())/86400000);
    if (diff >= DOWNGRADE_DAYS) base = Math.max(0, base-1);
  }
  return base;
}
/* remaining to next (KRW) */
function remainToNext(totalKRW, idx){
  if (idx >= LEVELS.length-1) return null;
  return Math.max(0, LEVELS[idx+1].minKRW - totalKRW);
}

/* render benefits per tier (upper inherits lower) */
const BENEFITS_BY_TIER = {
  Bronze:   ['b_member_prices','b_basic_support','b_secure_pay'],
  Silver:   ['b_member_prices','b_basic_support','b_secure_pay','b_points_3','b_free_cancel_window'],
  Gold:     ['b_member_prices','b_basic_support','b_secure_pay','b_points_5','b_priority_email','b_late_checkout'],
  Platinum: ['b_member_prices','b_basic_support','b_secure_pay','b_points_7','b_priority_email','b_priority_chat','b_upgrade_when_available'],
  Diamond:  ['b_member_prices','b_basic_support','b_secure_pay','b_points_7','b_priority_email','b_priority_chat','b_upgrade_when_available','b_b2b_invoice'],
  Elite:    ['b_member_prices','b_basic_support','b_secure_pay','b_points_7','b_priority_email','b_priority_chat','b_upgrade_when_available','b_b2b_invoice','b_elite_concierge']
};
function renderBenefits(){
  const cards = document.querySelectorAll('#tiersGrid .tier-card');
  cards.forEach(card=>{
    const tier = card.getAttribute('data-tier');
    const list = card.querySelector('.benefits');
    list.innerHTML = '';
    (BENEFITS_BY_TIER[tier]||[]).forEach(k=>{
      const li = document.createElement('div');
      li.className='benefit';
      li.innerHTML = `<i>✔</i><span data-i18n="${k}">${T(k)||k}</span>`;
      list.appendChild(li);
    });
  });
}

/* apply level UI */
function applyLevelUI(idx, totalKRW, lastBookingISO){
  const lvl = LEVELS[idx];
  // 제목/배지
  const levelTitle = document.getElementById('levelTitle');
  if (levelTitle) levelTitle.textContent = `${T('your_tier')||'Your Tier'}: ${lvl.name}`;

  const badge = document.getElementById('tierBadge');
  if (badge) badge.textContent = `${lvl.rate}% back`;

  // 진행도/남은 금액
  let pct = 100, remKRW = remainToNext(totalKRW, idx);
  if (remKRW !== null){
    const currMin = LEVELS[idx].minKRW;
    const nextMin = LEVELS[idx+1].minKRW;
    pct = Math.min(100, Math.max(0, Math.round(((totalKRW - currMin) / (nextMin - currMin))*100)));
  }
  const gf = document.getElementById('gaugeFill'); if (gf) gf.style.width = pct + '%';
  const pp = document.getElementById('progressPct'); if (pp) pp.textContent = pct + '%';

  const msgEl = document.getElementById('levelProgressText');
  if (msgEl){
    if (remKRW===null){
      msgEl.textContent = (T('to_next_msg') && T('to_next_msg')('')) || `Top tier. Auto-downgrade after ${DOWNGRADE_DAYS} days of no bookings.`;
    }else{
      const amt = fmtKRWtoLocal(remKRW);
      // to_next_msg는 함수(string builder)
      const k = T('to_next_msg');
      msgEl.textContent = (typeof k==='function') ? k(amt) : `${amt} to next tier.`;
    }
  }

  // 카드 강조(현재만 강조, 상위는 흐리게)
  document.querySelectorAll('#tiersGrid [data-tier]').forEach(card=>{
    const name = card.getAttribute('data-tier');
    const i = LEVELS.findIndex(x=>x.name===name);
    card.classList.remove('tier-active','tier-muted');
    if (i === idx) card.classList.add('tier-active');
    if (i > idx) card.classList.add('tier-muted');
  });

  // 항상 노출되는 고정 문구(번역)
  const topNote = document.getElementById('dwTop');
  if (topNote){ topNote.textContent = T('dw_always') || `If there is no booking for ${DOWNGRADE_DAYS} days, your tier will auto-downgrade by 1 level.`; }

  // D-30/15/7/1 경고 토스트
  if (lastBookingISO){
    const diff = Math.floor((Date.now() - new Date(lastBookingISO).getTime())/86400000);
    const left = DOWNGRADE_DAYS - diff;
    if ([30,15,7,1].includes(left)) showToast(left);
  }
}

/* toast */
function showToast(daysLeft){
  const map = {
    30: '📢 30일 후 자동 강등 예정입니다. 지금 예약하면 유지됩니다.',
    15: '⚠️ 15일 후 자동 강등 예정입니다. 활동을 유지하세요.',
    7:  '⏳ 7일 후 자동 강등 예정입니다. 서둘러 예약하세요!',
    1:  '🚨 내일 자동 강등됩니다! 오늘 예약을 완료하세요.'
  };
  const msg = (currentLang()==='KO') ? map[daysLeft]
    : (daysLeft===30?'📢 Auto downgrade in 30 days. Keep your tier by booking.'
    : daysLeft===15?'⚠️ Auto downgrade in 15 days. Stay active.'
    : daysLeft===7?'⏳ Auto downgrade in 7 days. Book soon!'
    : '🚨 Auto downgrade tomorrow! Complete a booking today.');
  const el = document.createElement('div');
  el.style.cssText='position:fixed;right:16px;bottom:16px;z-index:9999;background:#1e2a35;color:#fff;border:1px solid #2f3b47;padding:12px 14px;border-radius:12px;box-shadow:0 10px 24px rgba(0,0,0,.35)';
  el.textContent = msg;
  document.body.appendChild(el);
  setTimeout(()=> el.remove(), 8000);
}

/* re-apply i18n text placeholders in DOM when language changes */
function applyStaticI18N(){
  const lang = currentLang();
  const dict = (I18N && (I18N[lang]||I18N.EN)) || {};
  document.querySelectorAll('[data-i18n]').forEach(el=>{
    const k = el.getAttribute('data-i18n');
    const v = dict[k];
    if (typeof v === 'function'){ /* 동적 함수는 여기서 건너뜀 */ }
    else if (typeof v === 'string'){ el.textContent = v; }
  });
}

/* public API; call after login/user fetch */
function setUserContext({ totalSpentKRW, lastBookingISO }){
  applyStaticI18N();
  renderBenefits();
  const idx = computeLevel(totalSpentKRW||0, lastBookingISO||null);
  applyLevelUI(idx, totalSpentKRW||0, lastBookingISO||null);
}

/* init with localStorage sw_user if exists */
document.addEventListener('DOMContentLoaded', ()=>{
  applyStaticI18N();
  renderBenefits();

  let u={};
  try{ u = JSON.parse(localStorage.getItem('sw_user')||'{}'); }catch(_){}
  setUserContext({
    totalSpentKRW: Number.isFinite(u.totalSpentKRW)?u.totalSpentKRW:0,
    lastBookingISO: u.lastBookingISO || null
  });

  // 언어 변경 시 즉시 갱신
  const sel = document.getElementById('lang') || document.getElementById('langSelect');
  if (sel){
    sel.addEventListener('change', ()=>{
      const curr = JSON.parse(localStorage.getItem('sw_user')||'{}');
      setUserContext({
        totalSpentKRW: Number.isFinite(curr.totalSpentKRW)?curr.totalSpentKRW:0,
        lastBookingISO: curr.lastBookingISO || null
      });
    });
  }
});

/* expose (optional) */
window.setUserContext = setUserContext;
