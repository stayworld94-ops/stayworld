/* ============================
   STAYWORLD Membership Logic (6 tiers)
   - Higher tier inherits lower-tier benefits
   - Level by total spent (KRW)
   - Auto downgrade 1 level if no booking >= 60 days
   - Auto highlight current tier + progress gauge update
   - Downgrade alerts at D-30, D-15, D-7, D-1
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

/** Compute level index from totalSpent and lastBooking date (ISO) */
function computeLevel(totalSpentKRW, lastBookingISO){
  let base = 0;
  for (let i = 0; i < LEVELS.length; i++){
    if (totalSpentKRW >= LEVELS[i].min) base = i;
  }
  if (lastBookingISO){
    const last = new Date(lastBookingISO);
    const diffDays = Math.floor((Date.now() - last.getTime())/86400000);
    if (diffDays >= DOWNGRADE_DAYS) base = Math.max(0, base - 1);
  }
  return base;
}

/** KRW remaining to next level; null if at top */
function remainingToNext(totalSpentKRW, levelIdx){
  if (levelIdx >= LEVELS.length - 1) return null;
  const nextMin = LEVELS[levelIdx+1].min;
  return Math.max(0, nextMin - totalSpentKRW);
}

/** Safe query helpers */
function $(sel, scope){ return (scope||document).querySelector(sel); }
function $all(sel, scope){ return (scope||document).querySelectorAll(sel); }

/** Update top card + gauge + membership grid highlight */
function applyLevelUI(levelIdx, totalSpentKRW){
  const lvl = LEVELS[levelIdx];

  // Top "Your tier" area
  const tierText = $('#levelProgressText');

  // Gauge bar (try strict first, then fallback)
  let gauge = document.querySelector('.card .bg-[var(--gold)].h-2');
  if (!gauge){
    const gaugeContainer = $all('.w-full.bg-white\\/10.rounded-full.h-2')[0];
    if (gaugeContainer) gauge = gaugeContainer.querySelector('.h-2');
  }
  const gaugePctEl = $('.text-right.text-xs.text-white\\/60.mt-1');

  // Progress calc
  let pct = 100;
  const rem = remainingToNext(totalSpentKRW, levelIdx);
  if (rem !== null){
    const currMin = LEVELS[levelIdx].min;
    const nextMin = LEVELS[levelIdx+1].min;
    pct = Math.min(100, Math.max(0, Math.round(((totalSpentKRW - currMin) / (nextMin - currMin)) * 100)));
    if (tierText) tierText.textContent = `다음 등급까지 ₩${rem.toLocaleString()} 남았어요. 60일 예약 없으면 자동 1단계 강등.`;
  } else {
    if (tierText) tierText.textContent = `최상위 등급(Elite). 60일 예약 없으면 자동 1단계 강등.`;
  }
  if (gauge) gauge.style.width = pct + '%';
  if (gaugePctEl) gaugePctEl.textContent = pct + '%';

  // Replace "Your tier" headline (the small right card title)
  const heroTitle = $all('h3.text-xl.font-bold')[0];
  if (heroTitle){ heroTitle.innerHTML = `${lvl.name.toUpperCase()} <span class="text-brand.gold">${lvl.rate}% back</span>`; }

  // Membership card highlight (data-tier)
  $all('#tiersGrid [data-tier]').forEach(card=>{
    card.classList.remove('tier-active','tier-muted');
    const name = card.getAttribute('data-tier');
    const idx = LEVELS.findIndex(x=>x.name===name);
    if (idx === levelIdx) card.classList.add('tier-active');
    if (idx > levelIdx)  card.classList.add('tier-muted');
  });
}

/** Downgrade alerts (30, 15, 7, 1 days left) */
function showDowngradeAlert(daysLeft){
  const map = {
    30: '📢 30일 후 자동 강등 예정입니다. 지금 예약하면 유지됩니다.',
    15: '⚠️ 15일 후 자동 강등 예정입니다. 활동을 유지하세요.',
    7:  '⏳ 7일 후 자동 강등 예정입니다. 서둘러 예약하세요!',
    1:  '🚨 내일 자동 강등됩니다! 오늘 예약을 완료하세요.'
  };
  const msg = map[daysLeft];
  if (!msg) return;

  const alertEl = document.createElement('div');
  alertEl.className = "fixed bottom-5 right-5 bg-red-600 text-white px-4 py-3 rounded-xl shadow-lg z-50";
  alertEl.textContent = msg;
  document.body.appendChild(alertEl);
  setTimeout(()=> alertEl.remove(), 8000);
}

/** Public API: call after login/user fetch */
function setUserContext({ totalSpentKRW, lastBookingISO }){
  const idx = computeLevel(totalSpentKRW, lastBookingISO);
  applyLevelUI(idx, totalSpentKRW);

  if (lastBookingISO){
    const diffDays = Math.floor((Date.now() - new Date(lastBookingISO).getTime())/86400000);
    const daysLeft = DOWNGRADE_DAYS - diffDays;
    if ([30,15,7,1].includes(daysLeft)) showDowngradeAlert(daysLeft);
  }
}

/* ===== Demo hook: remove in production if you inject real user data ===== */
(function(){
  if (window.ENV?.DEMO_MODE){
    setUserContext({
      totalSpentKRW: 3_250_000,                                   // 누적 결제액
      lastBookingISO: new Date(Date.now()-20*86400000).toISOString() // 마지막 예약: 20일 전
    });
  }
})();
