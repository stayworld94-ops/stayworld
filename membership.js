// membership.js — i18n + 통화 + 누적(상위=하위혜택 포함) + 이번달 잔여혜택 + 다음레벨 진행도
// 순수 프런트 JS (ESM). Firebase 연동은 하단 주석 참고.

// ====== 설정 (손해 방지 캡/요금/레벨 기준) ======
const PLAN_CAPS = {
  plus:  { boostRate: 0.02, boostMaxUSD:  8, discountPerBookingUSD: 10, bookingsPerMonth: 3 },
  black: { boostRate: 0.04, boostMaxUSD: 24, discountPerBookingUSD: 20, bookingsPerMonth: 5 }
};

// 최근 12개월 사용금액(USD) 기준 레벨 임계값
const LEVELS = [
  { name: 'Bronze',   minUSD:    0 },
  { name: 'Silver',   minUSD:  300 },
  { name: 'Gold',     minUSD:  800 },
  { name: 'Platinum', minUSD: 1500 },
  { name: 'Diamond',  minUSD: 3000 },
  { name: 'Elite',    minUSD: 6000 }
];

// 보수적 환율 (USD ->표시통화). 손해 방지 목적. 서버에서 주입 가능.
const FX = { USD:1, KRW:1350, JPY:155, EUR:0.92, GBP:0.78, MXN:18, CLP:940, BRL:5.3 };

// 표시용 멤버십 가격(USD 기준)
const PRICES_USD = {
  monthly: { plus: 9.99,  black: 24.99 },
  yearly:  { plus: 99.00, black: 249.00 }
};

// 간단 i18n
const I18N = {
  en: {
    monthLeft: 'This month remaining',
    boostLeft: 'Points boost left',
    instLeft: 'Instant discount',
    perBooking: 'per booking',
    bookings: 'bookings',
    tickets: 'Tickets',
    eligible: 'Eligible now',
    notYet: 'Not yet',
    nextLevel: 'Next level',
    inherit: 'Higher tiers include all lower-level benefits.',
    toGo: '{next} — {amount} left',
    maxLevel: 'Top level reached'
  },
  ko: {
    monthLeft: '이번 달 남은 혜택',
    boostLeft: '포인트 부스트 잔여',
    instLeft: '즉시할인 잔여',
    perBooking: '예약당',
    bookings: '회',
    tickets: '티켓',
    eligible: '지급 가능',
    notYet: '아직 조건 미달',
    nextLevel: '다음 레벨',
    inherit: '상위 레벨은 하위 레벨 혜택을 모두 포함합니다.',
    toGo: '{next} — {amount} 남음',
    maxLevel: '최상위 레벨입니다'
  },
  es: {
    monthLeft: 'Beneficios restantes este mes',
    boostLeft: 'Impulso de puntos restante',
    instLeft: 'Descuento instantáneo',
    perBooking: 'por reserva',
    bookings: 'reservas',
    tickets: 'Tickets',
    eligible: 'Elegible ahora',
    notYet: 'Aún no',
    nextLevel: 'Siguiente nivel',
    inherit: 'Los niveles superiores incluyen los beneficios de los inferiores.',
    toGo: '{next} — faltan {amount}',
    maxLevel: 'Nivel máximo alcanzado'
  }
};

// ====== 상태/로캘 ======
const state = {
  locale: (navigator.language || 'en-US'),
  lang: (navigator.language || 'en').split('-')[0],
  currency: 'USD',
  billing: 'monthly', // 'monthly' | 'yearly'
  profile: null,      // { spend12mUSD, lifetimeSpend, monthsActive }
  membership: null,   // { plan:'plus'|'black'|null, billing, active }
  usage: null         // { boostUSDGranted, discountBookingsUsed }
};

function pickCurrency(loc){
  const lc = (loc || '').toLowerCase();
  if (lc.startsWith('ko')) return 'KRW';
  if (lc.startsWith('ja')) return 'JPY';
  if (lc.startsWith('en-gb')) return 'GBP';
  if (lc.startsWith('es-mx')) return 'MXN';
  if (lc.startsWith('es-cl')) return 'CLP';
  if (lc.startsWith('pt-br')) return 'BRL';
  if (lc.startsWith('de') || lc.startsWith('fr') || lc.startsWith('it') || lc.startsWith('es')) return 'EUR';
  return 'USD';
}
state.currency = pickCurrency(state.locale);

function t(key){
  const pack = I18N[state.lang] || I18N.en;
  return pack[key] || I18N.en[key] || key;
}
function moneyUSDtoLocal(usd){
  const code = state.currency;
  const rate = FX[code] || 1;
  const v = usd * rate;
  const noCents = (code==='JPY'||code==='KRW'||code==='CLP');
  return new Intl.NumberFormat(state.locale, {
    style:'currency', currency:code,
    maximumFractionDigits: noCents ? 0 : 2
  }).format(v);
}

// ====== 유틸 ======
const $ = (id) => document.getElementById(id);
const setText = (id, text) => { const el=$(id); if(el) el.textContent = text; };
const setGauge = (id, pct) => { const el=$(id); if(el) el.style.width = `${Math.max(0,Math.min(100,pct))}%`; };

// ====== 레벨 계산 ======
function levelFromSpend(usd12m){
  let idx = 0;
  for (let i=0;i<LEVELS.length;i++){
    if (usd12m >= LEVELS[i].minUSD) idx = i;
  }
  return { index: idx, name: LEVELS[idx].name };
}
function nextLevelProgress(usd12m){
  const cur = levelFromSpend(usd12m);
  const curMin = LEVELS[cur.index].minUSD;
  const next = LEVELS[cur.index+1];
  if (!next) return { next:null, pct:100, leftUSD:0 };
  const span = next.minUSD - curMin;
  const done = Math.max(0, usd12m - curMin);
  const pct = Math.max(0, Math.min(100, (done/span)*100 ));
  const leftUSD = Math.max(0, next.minUSD - usd12m);
  return { next: next.name, pct, leftUSD };
}

// ====== 혜택(상위=하위 포함) 렌더 ======
function stackedBenefits(){
  const base = {
    Bronze:   ['—'],
    Silver:   ['3% points back'],
    Gold:     ['5% points back','Priority support'],
    Platinum: ['7% points back','Priority support','Early check-in/late out'],
    Diamond:  ['10% points back','Priority support','Secret Deals+'],
    Elite:    ['15% points back','Priority support','Secret Deals+','Upgrades when available']
  };
  const order = ['Bronze','Silver','Gold','Platinum','Diamond','Elite'];
  const merged = {};
  let acc = [];
  for (const name of order){
    acc = acc.concat(base[name]);
    merged[name] = Array.from(new Set(acc)); // 중복 제거
  }
  document.querySelectorAll('.tier-card[data-tier]').forEach(card=>{
    const tier = card.getAttribute('data-tier');
    const box = card.querySelector('.benefits');
    if (!box || !merged[tier]) return;
    box.innerHTML = merged[tier].map(txt=>`<div class="benefit"><i>•</i><div>${txt}</div></div>`).join('');
  });
  setText('inheritNote', t('inherit'));
}

// ====== 가격 표시 ======
function renderPrices(){
  const p = PRICES_USD[state.billing];
  if ($('pricePlus'))  setText('pricePlus',  moneyUSDtoLocal(p.plus)  + (state.billing==='yearly'?' / yr':' / mo'));
  if ($('priceBlack')) setText('priceBlack', moneyUSDtoLocal(p.black) + (state.billing==='yearly'?' / yr':' / mo'));
}

// ====== 이번 달 잔여 혜택 ======
function renderUsageLeft(){
  const m = state.membership;
  if (!m || !m.plan || !PLAN_CAPS[m.plan]) { return; }
  const caps = PLAN_CAPS[m.plan];
  const u = state.usage || { boostUSDGranted:0, discountBookingsUsed:0 };
  const boostLeftUSD = Math.max(0, caps.boostMaxUSD - (u.boostUSDGranted||0));
  const bookingsLeft = Math.max(0, (caps.bookingsPerMonth||0) - (u.discountBookingsUsed||0));

  setText('lbl_perksLeft', t('monthLeft'));
  setText('lbl_boostLeft', t('boostLeft') + ':');
  setText('lbl_discountLeft', t('instLeft') + ':');
  setText('lbl_bookings', t('bookings'));
  setText('uiBoostLeft', moneyUSDtoLocal(boostLeftUSD));
  setText('uiDiscountPerBooking', moneyUSDtoLocal(caps.discountPerBookingUSD));
  setText('uiDiscountRemaining', `${bookingsLeft}`);

  // (간이) 티켓 지급 가능성 — 실제 발급은 서버에서 판단
  const eligible =
    (m.plan==='black' && (state.profile?.monthsActive||0) >= 3 && (state.profile?.lifetimeSpend||0) >= 1200) ||
    (m.plan==='plus'  && (state.profile?.monthsActive||0) >= 2 && (state.profile?.lifetimeSpend||0) >= 500);
  setText('lbl_ticketsEligible', t('tickets') + ':');
  setText('uiTicketsEligible', eligible ? t('eligible') : t('notYet'));
}

// ====== 다음 레벨 진행 ======
function renderNextLevel(){
  const spend12m = state.profile?.spend12mUSD ?? state.profile?.lifetimeSpend ?? 0;
  const cur = levelFromSpend(spend12m);
  const nx = nextLevelProgress(spend12m);

  setText('levelTitle', `Your Level: ${cur.name}`);
  // 상단 게이지도 다음 레벨 기준 진행률로 표시
  setGauge('gaugeFill', nx.pct);
  setText('progressPct', `${Math.round(nx.pct)}%`);

  // 레벨별 포인트 백 뱃지
  const badgeMap = { Bronze:'0%', Silver:'3%', Gold:'5%', Platinum:'7%', Diamond:'10%', Elite:'15%' };
  const badge = $('tierBadge'); if (badge) badge.textContent = `${badgeMap[cur.name]||'0%'} back`;

  setText('lbl_nextLevel', t('nextLevel'));
  if (nx.next){
    setText('nextLevelLine', t('toGo').replace('{next}', nx.next).replace('{amount}', moneyUSDtoLocal(nx.leftUSD)));
    setGauge('nextLevelGaugeFill', nx.pct);
    setText('nextLevelPct', `${Math.round(nx.pct)}%`);
  } else {
    setText('nextLevelLine', t('maxLevel'));
    setGauge('nextLevelGaugeFill', 100);
    setText('nextLevelPct', '100%');
  }
}

// ====== 빌링 토글 ======
function wireBilling(){
  const m = $('billMonthly'), y = $('billYearly');
  if (m) m.addEventListener('click', ()=>{ state.billing='monthly'; renderPrices(); });
  if (y) y.addEventListener('click', ()=>{ state.billing='yearly';  renderPrices(); });
}

// ====== 초기 데이터 (데모 값; Firebase 연결 시 교체) ======
async function fetchProfileAndUsage(){
  // ----- 실제 서비스에서는 아래를 Firebase로 대체 -----
  // import { getAuth } from 'https://www.gstatic.com/firebasejs/10.12.1/firebase-auth.js';
  // import { getFirestore, doc, getDoc } from 'https://www.gstatic.com/firebasejs/10.12.1/firebase-firestore.js';
  // const uid = getAuth().currentUser?.uid;
  // const db = getFirestore();
  // state.profile    = (await getDoc(doc(db, 'users', uid))).data();
  // state.usage      = (await getDoc(doc(db, 'usage', `${uid}_${YYYYMM}`))).data();
  // state.membership = (await getDoc(doc(db, 'memberships', uid))).data();

  // ----- 데모 기본값 (빈 화면 방지) -----
  state.profile = {
    spend12mUSD: 920,      // 최근 12개월 사용
    lifetimeSpend: 1800,
    monthsActive: 4
  };
  state.membership = { plan:'plus', billing: state.billing, active:true };
  state.usage = { boostUSDGranted: 3.5, discountBookingsUsed: 1 };
}

// ====== 시작 ======
async function start(){
  // 고정 안내문 (미번역 기본)
  setText('dwTop', 'No booking for 60 days → auto demotion by 1 level (notification sent).');
  setText('mb_title', 'Membership + Levels (Stacked Benefits)');
  setText('mb_subtitle', 'Membership gives instant perks; levels reward long-term activity. Use both for maximum value.');
  setText('inheritNote', t('inherit'));

  await fetchProfileAndUsage();
  stackedBenefits();   // 상위=하위 포함 표시
  renderPrices();      // 가격 로컬 통화
  renderUsageLeft();   // 이번 달 잔여혜택
  renderNextLevel();   // 다음 레벨 진행
  wireBilling();       // 토글 바인딩
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', start);
} else {
  start();
}
