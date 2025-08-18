/* ============================
   STAYWORLD Membership (6 tiers) — hardened
   - Higher tier inherits lower-tier benefits
   - Level by total spent (KRW)
   - Auto downgrade 1 level if no booking >= 60 days
   - Highlight current tier + progress gauge
   - Alerts at D-30, D-15, D-7, D-1
============================ */

const LEVELS = [
  { name:'Bronze',   min:       0, rate: 0  },
  { name:'Silver',   min:  500_000, rate: 3  },
  { name:'Gold',     min:2_000_000, rate: 5  },
  { name:'Platinum', min:4_000_000, rate: 7  },
  { name:'Diamond',  min:7_500_000, rate:10  },
  { name:'Elite',    min:15_000_000, rate:15, manual:true }
];

const DOWNGRADE_DAYS = 60;

/* ---------- i18n (EN/KR) ---------- */
const MSG = {
  en:{
    inheritNote: 'Upper tiers include all benefits of lower tiers.',
    downgradeNote: 'If there is no booking for 60 days, your tier will auto-downgrade by 1 level.',
    toNext:(rem)=>`₩${rem.toLocaleString('ko-KR')} to next tier. Auto-downgrade after 60 days of no bookings.`,
    top:`Top tier (Elite). Auto-downgrade after 60 days of no bookings.`,
    d30:`📢 Auto downgrade in 30 days. Keep your tier by booking.`,
    d15:`⚠️ Auto downgrade in 15 days. Stay active.`,
    d7:`⏳ Auto downgrade in 7 days. Book soon!`,
    d1:`🚨 Auto downgrade tomorrow! Complete a booking today.`,
    // benefits (base labels)
    b:{
      basicSupport:'Standard customer support',
      memberRates:'Member-only rates',
      lateCheckout:'Late checkout (subject to availability)',
      pointsBack:(r)=>`${r}% points back per stay`,
      priorityCS:'Priority customer support',
      roomUpgrade:'Complimentary room upgrade (when available)',
      lounge:'Lounge / welcome drink (where available)',
      vipLine:'VIP concierge line',
      guarantee:'Best price guarantee + pre-arrival planning',
      eliteServices:'Dedicated travel designer & private offers'
    }
  },
  ko:{
    inheritNote:'상위 등급은 하위 등급의 모든 혜택을 포함합니다.',
    downgradeNote:'60일 동안 예약이 없으면 등급이 자동으로 1단계 하향됩니다.',
    toNext:(rem)=>`다음 등급까지 ₩${rem.toLocaleString('ko-KR')} 남았어요. 60일 예약 없으면 자동 강등.`,
    top:`최상위 등급(Elite). 60일 예약 없으면 자동 강등.`,
    d30:`📢 30일 후 자동 강등 예정입니다. 지금 예약하면 유지됩니다.`,
    d15:`⚠️ 15일 후 자동 강등 예정입니다. 활동을 유지하세요.`,
    d7:`⏳ 7일 후 자동 강등 예정입니다. 서둘러 예약하세요!`,
    d1:`🚨 내일 자동 강등됩니다! 오늘 예약을 완료하세요.`,
    b:{
      basicSupport:'일반 고객 지원',
      memberRates:'회원 전용 요금',
      lateCheckout:'레이트 체크아웃(가능 시)',
      pointsBack:(r)=>`숙박 금액의 ${r}% 포인트 적립`,
      priorityCS:'우선 고객 지원',
      roomUpgrade:'무료 객실 업그레이드(가능 시)',
      lounge:'라운지/웰컴드링크(제공 지점 한정)',
      vipLine:'VIP 컨시어지 라인',
      guarantee:'최저가 보장 + 사전 플래닝',
      eliteServices:'전담 트래블 디자이너 & 프라이빗 오퍼'
    }
  }
};

function currentLang(){
  const sel = document.getElementById('lang') || document.getElementById('langSelect');
  const v = (sel && sel.value) || localStorage.getItem('sw_lang') || (navigator.language||'en').slice(0,2);
  return /^ko/i.test(v) ? 'ko' : 'en';
}

/* ---------- 혜택 정의 (상속 규칙 적용됨) ---------- */
function baseBenefitsForTier(tierName, lang){
  const t = MSG[lang].b;
  const map = {
    Bronze:   [ ['✅', t.basicSupport], ['🏷️', t.memberRates] ],
    Silver:   [ ['⏰', t.lateCheckout], ['💠', t.pointsBack(LEVELS[1].rate)] ],
    Gold:     [ ['🎁', t.roomUpgrade],  ['💠', t.pointsBack(LEVELS[2].rate)] ],
    Platinum: [ ['📞', t.priorityCS],   ['🥂', t.lounge],      ['💠', t.pointsBack(LEVELS[3].rate)] ],
    Diamond:  [ ['📞', t.vipLine],      ['🛡️', t.guarantee],   ['💠', t.pointsBack(LEVELS[4].rate)] ],
    Elite:    [ ['👑', t.eliteServices], ['💠', t.pointsBack(LEVELS[5].rate)] ]
  };
  return map[tierName] || [];
}

function cumulativeBenefits(tierIndex, lang){
  // 하위→상위 누적 + 중복 제거
  const seen = new Set();
  const list = [];
  for (let i=0;i<=tierIndex;i++){
    const tierName = LEVELS[i].name;
    baseBenefitsForTier(tierName, lang).forEach(([icon, text])=>{
      const key = icon+'|'+text;
      if(!seen.has(key)){ seen.add(key); list.push([icon, text]); }
    });
  }
  return list;
}

/* ---------- 레벨 계산/게이지 ---------- */
function computeLevel(totalSpentKRW, lastBookingISO){
  let base = 0;
  for (let i=0;i<LEVELS.length;i++){
    if (totalSpentKRW >= LEVELS[i].min) base = i;
  }
  if (lastBookingISO){
    const diff = Math.floor((Date.now() - new Date(lastBookingISO).getTime())/86400000);
    if (diff >= DOWNGRADE_DAYS) base = Math.max(0, base-1);
  }
  return base;
}
function remainingToNext(totalSpentKRW, levelIdx){
  if (levelIdx >= LEVELS.length-1) return null;
  const nextMin = LEVELS[levelIdx+1].min;
  return Math.max(0, nextMin - totalSpentKRW);
}

/* ---------- DOM helpers ---------- */
const $ = (s,sc)=> (sc||document).querySelector(s);
const $$= (s,sc)=> Array.from((sc||document).querySelectorAll(s));

/* ---------- UI 반영 ---------- */
function renderBenefitsGrid(levelIdx){
  const lang = currentLang();
  $('#inheritNote') && ($('#inheritNote').textContent = MSG[lang].inheritNote);
  $('#downgradeNote') && ($('#downgradeNote').textContent = MSG[lang].downgradeNote);

  $$('#tiersGrid .tier-card').forEach((card,i)=>{
    const box = $('.benefits', card);
    const items = cumulativeBenefits(i, lang);
    card.classList.remove('tier-active','tier-muted');
    if (i===levelIdx) card.classList.add('tier-active');
    if (i>levelIdx)  card.classList.add('tier-muted');

    if (box){
      box.innerHTML = items.map(([icon,txt]) =>
        `<div class="benefit"><i>${icon}</i><span>${txt}</span></div>`).join('');
    }
  });
}

function applyLevelUI(levelIdx, totalSpentKRW){
  const lang = currentLang();
  const t = MSG[lang];

  const lvl = LEVELS[levelIdx];
  const tierText = $('#levelProgressText');

  // 게이지
  let gauge = document.querySelector('.card .bg-[var(--gold)].h-2')
          || ($('.w-full.bg-white\\/10.rounded-full.h-2')?.querySelector('.h-2'));
  const gaugePctEl = $('.text-right.text-xs.text-white\\/60.mt-1');

  let pct = 100;
  const rem = remainingToNext(totalSpentKRW, levelIdx);
  if (rem !== null){
    const currMin = LEVELS[levelIdx].min;
    const nextMin = LEVELS[levelIdx+1].min;
    pct = Math.min(100, Math.max(0, Math.round(((totalSpentKRW - currMin) / (nextMin - currMin)) * 100)));
    if (tierText) tierText.textContent = t.toNext(rem);
  } else {
    if (tierText) tierText.textContent = t.top;
  }
  if (gauge) gauge.style.width = pct + '%';
  if (gaugePctEl) gaugePctEl.textContent = pct + '%';

  const heroTitle = $('#levelTitle') || $$('.card h3')[0];
  if (heroTitle){ heroTitle.innerHTML = `${lvl.name.toUpperCase()} <span class="text-brand.gold">${lvl.rate}% back</span>`; }

  // 혜택 그리드
  renderBenefitsGrid(levelIdx);
}

/* ---------- 알림 ---------- */
function showDowngradeAlert(daysLeft){
  const lang = currentLang();
  const t = MSG[lang];
  const map = {30:t.d30,15:t.d15,7:t.d7,1:t.d1};
  const msg = map[daysLeft]; if(!msg) return;

  const el = document.createElement('div');
  el.className = "fixed bottom-5 right-5 bg-red-600 text-white px-4 py-3 rounded-xl shadow-lg z-50";
  el.textContent = msg;
  document.body.appendChild(el);
  setTimeout(()=> el.remove(), 8000);
}

/* ---------- 공개 API ---------- */
function setUserContext({ totalSpentKRW, lastBookingISO }){
  const idx = computeLevel(totalSpentKRW, lastBookingISO);
  applyLevelUI(idx, totalSpentKRW);

  if (lastBookingISO){
    const diff = Math.floor((Date.now() - new Date(lastBookingISO).getTime())/86400000);
    const daysLeft = DOWNGRADE_DAYS - diff;
    if ([30,15,7,1].includes(daysLeft)) showDowngradeAlert(daysLeft);
  }

  // 언어 변경 시 즉시 재렌더 (헤더의 셀렉트 감지)
  const langSel = document.getElementById('lang') || document.getElementById('langSelect');
  if (langSel && !langSel._swBound){
    langSel._swBound = true;
    langSel.addEventListener('change', ()=> applyLevelUI(idx, totalSpentKRW));
  }
}
window.setUserContext = setUserContext;
// --- 안전망: setUserContext가 호출되지 않은 경우 자동 초기화 ---
(function(){
  if (!window._swMembershipAutoInit) {
    window._swMembershipAutoInit = true;
    window.addEventListener('DOMContentLoaded', () => {
      // 이미 어딘가에서 setUserContext가 불렸다면 넘어감
      if (!window._swMembershipInitialized) {
        try {
          let u = {};
          try { u = JSON.parse(localStorage.getItem('sw_user') || '{}'); } catch(_) {}
          setUserContext({
            totalSpentKRW: Number.isFinite(u.totalSpentKRW) ? u.totalSpentKRW : 0,
            lastBookingISO: u.lastBookingISO || null
          });
        } catch (_) {
          // 최후의 수단
          setUserContext({ totalSpentKRW: 0, lastBookingISO: null });
        }
      }
    });
  }
})();
