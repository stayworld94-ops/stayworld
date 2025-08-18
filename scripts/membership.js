/* ============================
   STAYWORLD Membership Logic (Final)
   - 6 tiers, upper includes lower
   - Elite = auto promotion
   - Auto downgrade after 60 days since last booking
   - Always-on banner with D-day
   - i18n + currency by language (display only)
   ============================ */

/* ---------- Currency map (display only; base: USD) ---------- */
const SW_CURRENCIES = {
  USD:{symbol:'$',  rate:1,      locale:'en-US', name:'USD'},
  EUR:{symbol:'€',  rate:0.92,   locale:'fr-FR', name:'EUR'},
  KRW:{symbol:'₩',  rate:1300,   locale:'ko-KR', name:'KRW'},
  JPY:{symbol:'¥',  rate:155,    locale:'ja-JP', name:'JPY'},
  CNY:{symbol:'¥',  rate:7.2,    locale:'zh-CN', name:'CNY'},
  TRY:{symbol:'₺',  rate:33,     locale:'tr-TR', name:'TRY'},
  RUB:{symbol:'₽',  rate:90,     locale:'ru-RU', name:'RUB'},
  GBP:{symbol:'£',  rate:0.78,   locale:'en-GB', name:'GBP'},
  AED:{symbol:'د.إ',rate:3.67,   locale:'ar-AE', name:'AED'},
  CAD:{symbol:'$',  rate:1.36,   locale:'en-CA', name:'CAD'}
};
const SW_LANG_TO_CUR = { en:'USD', ko:'KRW', ja:'JPY', zh:'CNY', fr:'EUR', es:'EUR', de:'EUR', tr:'TRY', ar:'AED', ru:'RUB' };

/* ---------- Levels (thresholds in USD) ---------- */
const SW_LEVELS = [
  { name:'Bronze',   minUSD:      0, rate: 0  },
  { name:'Silver',   minUSD:    400, rate: 3  },
  { name:'Gold',     minUSD:   1500, rate: 5  },
  { name:'Platinum', minUSD:   3000, rate: 7  },
  { name:'Diamond',  minUSD:   5500, rate:10  },
  { name:'Elite',    minUSD:  10000, rate:15 } // 자동 승격
];
const SW_DOWNGRADE_DAYS = 60;

/* ---------- Benefits (upper includes lower) ---------- */
const SW_BENEFITS = {
  Bronze: [
    'b_member_prices',      // 멤버 전용 가격
    'b_basic_support'       // 기본 고객지원
  ],
  Silver: [
    'b_points_3',           // 3% 적립
    'b_free_cancel_window'  // 무료취소(윈도우)
  ],
  Gold: [
    'b_points_5',
    'b_priority_cs'         // 우선 고객지원
  ],
  Platinum: [
    'b_points_7',
    'b_late_checkout'       // 레이트 체크아웃(가능 시)
  ],
  Diamond: [
    'b_points_10',
    'b_room_upgrade'        // 객실 업그레이드(가능 시)
  ],
  Elite: [
    'b_points_15',
    'b_private_deals'       // 프라이빗 딜/컨시어지
  ]
};

/* ---------- i18n helpers ---------- */
function swLangCode(){
  const sel = document.getElementById('lang') || document.getElementById('langSelect');
  const saved = (sel?.value || localStorage.getItem('sw_lang') || 'en').toLowerCase();
  return ['en','ko','tr','fr','ja','de','es','it','zh','ru'].includes(saved) ? saved : 'en';
}
function t(key){
  // lang.js 안의 LANGS에 membership 키를 추가해 두면 여기서 사용됩니다.
  const lc = swLangCode();
  const pack = (window.LANGS && window.LANGS[lc] && window.LANGS[lc].membership) || (window.LANGS && window.LANGS.en && window.LANGS.en.membership) || {};
  return pack[key] || key;
}
function tBenefit(key){
  const lc = swLangCode();
  const pack = (window.LANGS && window.LANGS[lc] && window.LANGS[lc].membership && window.LANGS[lc].membership.benefits) ||
               (window.LANGS && window.LANGS.en  && window.LANGS.en.membership  && window.LANGS.en.membership.benefits) || {};
  return pack[key] || key;
}

/* ---------- Currency helpers ---------- */
function currentCurrency(){
  const lc = swLangCode();
  const code = SW_LANG_TO_CUR[lc] || 'USD';
  return SW_CURRENCIES[code] || SW_CURRENCIES.USD;
}
function fmtUSD(usd){
  const cur = currentCurrency();
  const val = usd * cur.rate;
  return new Intl.NumberFormat(cur.locale, { style:'currency', currency:cur.name, maximumFractionDigits: (cur.name==='JPY'||cur.name==='KRW') ? 0 : 0 }).format(val);
}

/* ---------- Compute level by totalSpent (USD base) ---------- */
function computeLevelIndex(totalSpentUSD){
  let idx = 0;
  for (let i=0;i<SW_LEVELS.length;i++){
    if (totalSpentUSD >= SW_LEVELS[i].minUSD) idx = i;
  }
  return idx;
}
function daysSince(iso){
  if(!iso) return null;
  const last = new Date(iso).getTime();
  if (isNaN(last)) return null;
  const diff = Math.floor((Date.now() - last)/86400000);
  return Math.max(0, diff);
}

/* ---------- UI Populate ---------- */
function buildTierBenefitsHTML(tierIdx){
  // 누적(상위 = 하위 포함)
  const order = SW_LEVELS.map(l=>l.name);
  const keys = new Set();
  for(let i=0;i<=tierIdx;i++){
    const name = order[i];
    (SW_BENEFITS[name]||[]).forEach(k=> keys.add(k));
  }
  // 아이콘 매핑(간단)
  const iconFor = {
    b_member_prices:'💠', b_basic_support:'🛎️',
    b_points_3:'🎯', b_points_5:'🎯', b_points_7:'🎯', b_points_10:'🎯', b_points_15:'🎯',
    b_free_cancel_window:'↩️', b_priority_cs:'⚡', b_late_checkout:'🕒',
    b_room_upgrade:'⬆️', b_private_deals:'🔒'
  };
  return Array.from(keys).map(k=>{
    return `<li><i>${iconFor[k]||'•'}</i><span>${tBenefit(k)}</span></li>`;
  }).join('');
}

function paintGrid(levelIdx){
  const cards = document.querySelectorAll('#tiersGrid .tier-card');
  cards.forEach((card, i)=>{
    card.classList.toggle('tier-active', i===levelIdx);
    const name = card.getAttribute('data-tier');
    const idx = SW_LEVELS.findIndex(x=>x.name===name);
    const ul = card.querySelector('.benefits');
    if(ul) ul.innerHTML = buildTierBenefitsHTML(idx);
  });
}

function updateBanner(lastISO){
  const label = document.getElementById('dwLabel');
  const cd = document.getElementById('dwCountdown');
  const baseLine = t('dw_always'); // 항상 문구
  if(!lastISO){
    label.textContent = baseLine;
    cd.textContent = t('dw_no_history');
    return;
  }
  const d = daysSince(lastISO);
  const left = Math.max(0, SW_DOWNGRADE_DAYS - (d??0));
  label.textContent = baseLine;
  cd.textContent = t('dw_days_left').replace('{days}', String(left));
}

function updateCurrentCard(levelIdx, totalSpentUSD){
  const lvl = SW_LEVELS[levelIdx];
  const currentTierName = document.getElementById('currentTierName');
  const currentTierRate = document.getElementById('currentTierRate');
  const levelProgressText = document.getElementById('levelProgressText');
  const gaugeFill = document.getElementById('gaugeFill');
  const progressPct = document.getElementById('progressPct');
  const toNextLabel = document.getElementById('toNextLabel');

  currentTierName.textContent = t('your_tier') + ': ' + lvl.name;
  currentTierRate.textContent = `${lvl.rate}% ${t('back')}`;

  // 다음 등급까지
  let pct = 100;
  const atTop = (levelIdx === SW_LEVELS.length-1);
  if(atTop){
    levelProgressText.textContent = t('top_tier');
    toNextLabel.textContent = '';
    pct = 100;
  }else{
    const currMin = SW_LEVELS[levelIdx].minUSD;
    const nextMin = SW_LEVELS[levelIdx+1].minUSD;
    const remainUSD = Math.max(0, nextMin - totalSpentUSD);
    pct = Math.min(100, Math.max(0, Math.round(((totalSpentUSD - currMin)/(nextMin - currMin))*100 )));
    levelProgressText.textContent = t('to_next_msg')
      .replace('{amount}', fmtUSD(remainUSD))
      .replace('{next}', SW_LEVELS[levelIdx+1].name);
    toNextLabel.textContent = t('to_next_badge')
      .replace('{next}', SW_LEVELS[levelIdx+1].name)
      .replace('{amount}', fmtUSD(remainUSD));
  }
  gaugeFill.style.width = pct + '%';
  progressPct.textContent = pct + '%';
}

/* ---------- Top texts ---------- */
function paintTexts(){
  document.getElementById('mbTitle').textContent = t('title');
  document.getElementById('inheritNote').textContent = t('inherit_note');
  document.getElementById('dwNote').textContent = t('dw_note');
}

/* ---------- State (user) ---------- */
function readUser(){
  // sw_user는 다음 중 하나를 포함할 수 있음:
  // { totalSpentUSD } 또는 { totalSpentKRW } 등 + lastBookingISO
  try{
    const u = JSON.parse(localStorage.getItem('sw_user') || '{}');
    let usd = 0;
    if (Number.isFinite(u.totalSpentUSD)) usd = u.totalSpentUSD;
    else if (Number.isFinite(u.totalSpentKRW)) usd = u.totalSpentKRW / SW_CURRENCIES.KRW.rate;
    else if (Number.isFinite(u.totalSpentJPY)) usd = u.totalSpentJPY / SW_CURRENCIES.JPY.rate;
    else if (Number.isFinite(u.totalSpentCNY)) usd = u.totalSpentCNY / SW_CURRENCIES.CNY.rate;
    else if (Number.isFinite(u.totalSpentEUR)) usd = u.totalSpentEUR / SW_CURRENCIES.EUR.rate;
    else if (Number.isFinite(u.totalSpentGBP)) usd = u.totalSpentGBP / SW_CURRENCIES.GBP.rate;
    else if (Number.isFinite(u.totalSpentTRY)) usd = u.totalSpentTRY / SW_CURRENCIES.TRY.rate;
    else if (Number.isFinite(u.totalSpentRUB)) usd = u.totalSpentRUB / SW_CURRENCIES.RUB.rate;
    else if (Number.isFinite(u.totalSpentAED)) usd = u.totalSpentAED / SW_CURRENCIES.AED.rate;
    else if (Number.isFinite(u.totalSpentCAD)) usd = u.totalSpentCAD / SW_CURRENCIES.CAD.rate;
    // DEMO fallback
    if (!usd || !Number.isFinite(usd)) usd = 2500; // 데모: $2,500 사용한 상태
    return { totalSpentUSD: usd, lastBookingISO: u.lastBookingISO || null };
  }catch(_){
    return { totalSpentUSD: 2500, lastBookingISO: null };
  }
}

/* ---------- Main render ---------- */
function renderMembership(){
  paintTexts();

  const { totalSpentUSD, lastBookingISO } = readUser();
  const levelIdx = computeLevelIndex(totalSpentUSD);

  updateBanner(lastBookingISO);
  updateCurrentCard(levelIdx, totalSpentUSD);
  paintGrid(levelIdx);
}

/* ---------- Language change hooks ---------- */
function bindLangChange(){
  const langSel = document.getElementById('lang') || document.getElementById('langSelect');
  if(langSel){
    langSel.addEventListener('change', renderMembership);
  }
  // 혹시 header.js가 커스텀 이벤트를 방출한다면 대응
  window.addEventListener('sw:languageChanged', renderMembership);
}

/* ---------- Init ---------- */
(function(){
  if (document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', ()=>{ bindLangChange(); renderMembership(); });
  }else{
    bindLangChange(); renderMembership();
  }
})();
