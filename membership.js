// /membership.js
// Firebase + Stripe + 손해방지 캡 + 월/연 토글 + 등급/멤버십 UI

// ---------- Firebase SDK (ESM CDN) ----------
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-app.js";
import {
  getAuth, onAuthStateChanged, GoogleAuthProvider, signInWithPopup
} from "https://www.gstatic.com/firebasejs/10.12.1/firebase-auth.js";
import {
  getFirestore, doc, getDoc, setDoc, updateDoc, serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.12.1/firebase-firestore.js";

// ---------- CONFIG (필수 수정) ----------
const firebaseConfig = {
  apiKey:        "YOUR_API_KEY",
  authDomain:    "YOUR_PROJECT.firebaseapp.com",
  projectId:     "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "SENDER_ID",
  appId:         "APP_ID"
};

// Stripe Payment Links (4개)
const STRIPE_LINKS = {
  plus_month:  "", // e.g. 'https://buy.stripe.com/xxxxplusM'
  plus_year:   "", // e.g. 'https://buy.stripe.com/xxxxplusY'
  black_month: "", // e.g. 'https://buy.stripe.com/xxxxblackM'
  black_year:  ""  // e.g. 'https://buy.stripe.com/xxxxblackY'
};

// 손해방지 캡
const CAPS = {
  plus:  { boostRate:0.02, boostMaxUSD: 8,  boostSpendUSD: 400, discountPerBooking: 10, bookingsPerMonth: 3 },
  black: { boostRate:0.04, boostMaxUSD:24,  boostSpendUSD: 600, discountPerBooking: 20, bookingsPerMonth: 5 }
};

// 티켓(지연지급) 조건
const TICKETS = {
  plus:  { minMonths:2, minSpend:500,  count:1, valueCap:100,  notes:'Weekdays/off-season, participating stays' },
  black: { minMonths:3, minSpend:1200, count:2, valueCap:120, notes:'Weekdays/off-season, participating stays' }
};

// 가격표 (표시용)
const PRICES = {
  monthly: { plus:'$9.99 / mo',  black:'$24.99 / mo' },
  yearly:  { plus:'$99 / yr',    black:'$249 / yr' }
};

// ---------- App State ----------
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db   = getFirestore(app);

const state = {
  billing: 'monthly', // 'monthly' | 'yearly'
  user:    null,      // { uid, email, level, tickets, monthsActive, lifetimeSpend, plan }
  usage:   null       // { monthKey, discountBookingsUsed, boostUSDGranted }
};

// ---------- Helpers ----------
const $ = (id) => document.getElementById(id);
const setText = (id, text) => { const el=$(id); if(el) el.textContent = text; };
const fmtPct = (n) => `${Math.round(n)}%`;

// ---------- Render: Level Card ----------
function renderLevelCard(){
  const u = state.user || { level:'Bronze', lifetimeSpend:0, tickets:0 };
  setText('levelTitle', `Your Level: ${u.level}`);
  setText('downgradeSticky', 'If no booking for 60 days, demotion by 1 level (auto).');

  // 게이지 (데모: lifetimeSpend를 0~100 스케일로만 표시)
  const spend = Math.max(0, Math.min(100, u.lifetimeSpend || 0));
  const fill  = $('gaugeFill');
  const pctEl = $('progressPct');
  if(fill)  fill.style.width = fmtPct(spend);
  if(pctEl) pctEl.textContent = fmtPct(spend);

  // 레벨별 캐시백 뱃지 텍스트
  const badge = $('tierBadge');
  if(badge){
    const levelRate = { Bronze:'0%', Silver:'3%', Gold:'5%', Platinum:'7%', Diamond:'10%', Elite:'15%' }[u.level] || '0%';
    badge.textContent = `${levelRate} back`;
  }
}

// ---------- Render: Tier Benefits (표시용) ----------
function hydrateTierBenefits(){
  const map = {
    Bronze:   ['—'],
    Silver:   ['3% points back'],
    Gold:     ['5% points back', 'Priority support'],
    Platinum: ['7% points back', 'Priority support', 'Early check-in/late out'],
    Diamond:  ['10% points back', 'Priority support', 'Secret Deals+'],
    Elite:    ['15% points back', 'Priority support', 'Secret Deals+', 'Upgrades when available']
  };
  document.querySelectorAll('.tier-card[data-tier]').forEach(card=>{
    const tier = card.getAttribute('data-tier');
    const container = card.querySelector('.benefits');
    if(container && map[tier]){
      container.innerHTML = '';
      map[tier].forEach(txt=>{
        const row = document.createElement('div');
        row.className = 'benefit';
        row.innerHTML = `<i>•</i><div>${txt}</div>`;
        container.appendChild(row);
      });
    }
  });
}

// ---------- Billing Toggle ----------
function switchBilling(mode){
  state.billing = mode;
  setText('pricePlus',  PRICES[mode].plus);
  setText('priceBlack', PRICES[mode].black);

  const btnM = $('billMonthly');
  const btnY = $('billYearly');
  if(btnM && btnY){
    btnM.style.background = (mode==='monthly') ? '#182033' : 'transparent';
    btnY.style.background = (mode==='yearly')  ? '#182033' : 'transparent';
  }
}

// ---------- Stripe Checkout (Payment Links) ----------
async function ensureLogin(){
  if(auth.currentUser) return auth.currentUser;
  // 구글 로그인(간단)
  const provider = new GoogleAuthProvider();
  const result = await signInWithPopup(auth, provider);
  return result.user;
}

async function startCheckout(plan /* 'plus'|'black' */){
  // 로그인 필수 (이메일 프리필)
  const user = await ensureLogin();
  const key = plan + '_' + (state.billing === 'yearly' ? 'year' : 'month');
  const url = STRIPE_LINKS[key];

  if(!url){
    alert('Stripe link not set for ' + key);
    return;
  }

  // 이메일 프리필 (Payment Links는 prefilled_email 지원)
  const emailParam = user?.email ? `?prefilled_email=${encodeURIComponent(user.email)}` : '';
  window.location.href = url + emailParam;
}

// ---------- Firestore IO ----------
async function loadUserProfile(uid){
  // users/{uid} : { level, tickets, monthsActive, lifetimeSpend, lastBookingAt, ... }
  const ref = doc(db, 'users', uid);
  const snap = await getDoc(ref);
  if(!snap.exists()){
    // 최소 프로필 생성
    const base = {
      level: 'Bronze',
      tickets: 0,
      monthsActive: 0,
      lifetimeSpend: 0,
      createdAt: serverTimestamp()
    };
    await setDoc(ref, base);
    return { uid, ...base };
  }
  return { uid, ...snap.data() };
}

async function loadMembership(uid){
  // memberships/{uid} : { plan: 'plus'|'black'|null, billing, active, startDate, renewDate }
  const ref = doc(db, 'memberships', uid);
  const snap = await getDoc(ref);
  return snap.exists() ? snap.data() : { plan:null, billing:null, active:false };
}

// 이번 달 사용량(부스트/할인) 가져오기 (표시용 — 실제는 서버에서 검증/적용)
async function loadUsage(uid, monthKey){
  const ref = doc(db, 'usage', `${uid}_${monthKey}`);
  const snap = await getDoc(ref);
  if(!snap.exists()){
    const base = { discountBookingsUsed:0, boostUSDGranted:0, monthKey, createdAt:serverTimestamp() };
    await setDoc(ref, base);
    return base;
  }
  return snap.data();
}

// ---------- 표시용 계산 도우미 (실제 적용은 서버에서) ----------
export function calcPointsBoostUSD(plan, monthlySpendUSD){
  const cap = CAPS[plan]; if(!cap) return 0;
  const eligibleSpend = Math.min(monthlySpendUSD, cap.boostSpendUSD);
  return Math.min(eligibleSpend * cap.boostRate, cap.boostMaxUSD);
}
export function calcInstantDiscount(plan, usedCount){
  const cap = CAPS[plan]; if(!cap) return { perBooking:0, remaining:0 };
  const remaining = Math.max(cap.bookingsPerMonth - (usedCount||0), 0);
  return { perBooking: cap.discountPerBooking, remaining };
}
export function eligibleTicketCount(plan, monthsActive, lifetimeSpend){
  const t = TICKETS[plan]; if(!t) return 0;
  return (monthsActive>=t.minMonths && lifetimeSpend>=t.minSpend) ? t.count : 0;
}

// ---------- Boot ----------
document.addEventListener('DOMContentLoaded', async () => {
  // 상단 안내 / 타이틀
  const dwTop = $('dwTop');
  if (dwTop) dwTop.textContent = 'No booking for 60 days → auto demotion by 1 level (notification sent).';
  setText('mb_title', 'Membership + Levels (Stacked Benefits)');
  setText('mb_subtitle', 'Membership gives instant perks; levels reward long-term activity. Use both for maximum value.');

  hydrateTierBenefits();

  // 요금제 토글 버튼
  const btnM = $('billMonthly'), btnY = $('billYearly');
  if(btnM && btnY){
    btnM.addEventListener('click', () => switchBilling('monthly'));
    btnY.addEventListener('click', () => switchBilling('yearly'));
  }
  switchBilling('monthly');

  // 체크아웃 버튼
  const btnPlus  = $('btnPlusCheckout');
  const btnBlack = $('btnBlackCheckout');
  if(btnPlus)  btnPlus.addEventListener('click',  () => startCheckout('plus'));
  if(btnBlack) btnBlack.addEventListener('click', () => startCheckout('black'));

  // 로그인 상태 반영 + 유저 데이터 로딩
  onAuthStateChanged(auth, async (u) => {
    if(!u){
      // 비로그인 상태 UI(데모 값)
      state.user = { level:'Bronze', tickets:0, monthsActive:0, lifetimeSpend:0, plan:null };
      renderLevelCard();
      return;
    }
    // 프로필/멤버십/사용량 로딩
    const profile = await loadUserProfile(u.uid);
    const membership = await loadMembership(u.uid);

    state.user = {
      uid: u.uid,
      email: u.email || null,
      level: profile.level || 'Bronze',
      tickets: profile.tickets || 0,
      monthsActive: profile.monthsActive || 0,
      lifetimeSpend: profile.lifetimeSpend || 0,
      plan: membership.plan || null,
      billing: membership.billing || null,
      active: !!membership.active
    };

    renderLevelCard();

    // 사용량 표시 (서버 검증 전시용)
    const now = new Date();
    const monthKey = `${now.getFullYear()}${String(now.getMonth()+1).padStart(2,'0')}`;
    state.usage = await loadUsage(u.uid, monthKey);

    // 남은 즉시할인/부스트 계산 예시 (UI용)
    if(state.user.plan){
      const d = calcInstantDiscount(state.user.plan, state.usage.discountBookingsUsed);
      const boostLeft = Math.max(
        CAPS[state.user.plan].boostMaxUSD - (state.usage.boostUSDGranted||0), 0
      );
      // 원하면 화면 어딘가에 남은치 표시 추가 가능
      // console.log('Remaining discounts', d, 'Boost USD left', boostLeft);
    }
  });
});
