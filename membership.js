/* =========================================================
   STAYWORLD Membership (6 tiers) — robust + i18n + currency
   - Current-tier badge only (no border highlight)
   - Language-based currency (by selected lang)
   - Rich benefits per tier (inherit lower tiers)
   - {RATE} token -> each tier's % back
   - Downgrade 1 level if no booking in 60 days (alerts)
   ========================================================= */

/* ---------- Currency map (rough static rates) ---------- */
const FX = {
  USD:{symbol:'$',  rate:1,      code:'USD', locale:'en-US'},
  EUR:{symbol:'€',  rate:0.92,   code:'EUR', locale:'fr-FR'},
  KRW:{symbol:'₩',  rate:1300,   code:'KRW', locale:'ko-KR'},
  JPY:{symbol:'¥',  rate:155,    code:'JPY', locale:'ja-JP'},
  CNY:{symbol:'¥',  rate:7.2,    code:'CNY', locale:'zh-CN'},
  TRY:{symbol:'₺',  rate:33,     code:'TRY', locale:'tr-TR'},
  RUB:{symbol:'₽',  rate:90,     code:'RUB', locale:'ru-RU'},
  GBP:{symbol:'£',  rate:0.78,   code:'GBP', locale:'en-GB'},
  AED:{symbol:'د.إ',rate:3.67,   code:'AED', locale:'ar-AE'},
  CAD:{symbol:'$',  rate:1.36,   code:'CAD', locale:'en-CA'},
};
const LANG_TO_CUR = { EN:'USD', KO:'KRW', JA:'JPY', ZH:'CNY', FR:'EUR', ES:'EUR', DE:'EUR', TR:'TRY', AR:'AED', RU:'RUB' };

/* ---------- i18n (EN, KO) — Full benefits with {RATE} ---------- */
const I18N = {
  EN:{
    title:'🌟 StayWorld Membership',
    inherit:'Upper tiers include all benefits of lower tiers.',
    your_tier:'Your Tier',
    current:'Current',
    toNext:(money)=>`${money} to next tier. Auto-downgrade after 60 days of no bookings.`,
    top:'Top tier (Elite). Auto-downgrade after 60 days of no bookings.',
    gauge:(pct)=>`${pct}%`,
    downgrade:'If there is no booking for 60 days, your tier will auto-downgrade by 1 level.',
    tiers:['Bronze','Silver','Gold','Platinum','Diamond','Elite'],
    benefits:{
      Bronze:[
        'Basic support',
        'Secure card/crypto payments',
        'Verified listings & reviews',
        'Free cancellation where available',
        '24h check-in where available'
      ],
      Silver:[
        'Points back {RATE}% per stay',
        'Priority email support (24h)',
        'Invoice available · B2B-ready'
      ],
      Gold:[
        'Late checkout when available',
        'Priority chat support',
        'Best-rate check on request (free)'
      ],
      Platinum:[
        'Room upgrade when available',
        'Dedicated support line',
        'Self check-in assistance'
      ],
      Diamond:[
        'Welcome gift at select properties',
        'Partner lounge access (where available)',
        '24/7 VIP phone support'
      ],
      Elite:[
        '24/7 concierge desk',
        'Invitation-only events',
        'Complimentary airport transfer (where available)'
      ]
    }
  },
  KO:{
    title:'🌟 스테이월드 멤버십',
    inherit:'상위 등급은 하위 등급의 모든 혜택을 포함합니다.',
    your_tier:'내 등급',
    current:'현재 등급',
    toNext:(money)=>`${money} 남았어요. 60일 예약 없으면 자동 1단계 강등.`,
    top:'최상위 등급(Elite). 60일 예약 없으면 자동 1단계 강등.',
    gauge:(pct)=>`${pct}%`,
    downgrade:'60일 동안 예약이 없으면 등급이 자동으로 1단계 강등됩니다.',
    tiers:['브론즈','실버','골드','플래티넘','다이아몬드','엘리트'],
    benefits:{
      Bronze:[
        '기본 고객지원',
        '안전한 카드/암호화폐 결제',
        '검증된 매물 · 리뷰',
        '가능 지역 무료 취소',
        '가능 시 24시간 체크인'
      ],
      Silver:[
        '숙박 결제 {RATE}% 포인트 적립',
        '우선 이메일 응대(24시간)',
        '세금계산서 발행 · B2B 지원'
      ],
      Gold:[
        '가능 시 레이트 체크아웃 무료',
        '우선 채팅 지원',
        '요청 시 최저가 확인(무료)'
      ],
      Platinum:[
        '가능 시 객실 업그레이드',
        '전담 지원 라인',
        '셀프 체크인 지원'
      ],
      Diamond:[
        '일부 호텔 웰컴 기프트',
        '가능 지역 파트너 라운지 이용',
        '24/7 VIP 전화 지원'
      ],
      Elite:[
        '24/7 컨시어지',
        '초대 전용 이벤트',
        '가능 지역 공항 픽업 무료'
      ]
    }
  }
};

/* ---------- Config (tiers) ---------- */
/* Thresholds in USD (base currency). % back per tier in `rate`. */
const LEVELS = [
  { name:'Bronze',   minUSD:   0,       rate: 0 },
  { name:'Silver',   minUSD:  400,      rate: 3 },
  { name:'Gold',     minUSD: 1500,      rate: 5 },
  { name:'Platinum', minUSD: 3000,      rate: 7 },
  { name:'Diamond',  minUSD: 6000,      rate:10 },
  { name:'Elite',    minUSD:12000,      rate:15, manual:true },
];
const DOWNGRADE_DAYS = 60;

/* ---------- Helpers ---------- */
const $  = (s,sc)=> (sc||document).querySelector(s);
const $$ = (s,sc)=> Array.from((sc||document).querySelectorAll(s));

function currentLangCode(){
  const sel = document.getElementById('lang') || document.getElementById('langSelect');
  const saved = localStorage.getItem('sw_lang');
  return (sel?.value || saved || 'EN').toUpperCase();
}
function L(){ return I18N[currentLangCode()] || I18N.EN; }

function currencyForLang(){
  const code = LANG_TO_CUR[currentLangCode()] || 'USD';
  return FX[code] || FX.USD;
}
function fmtMoneyFromUSD(usd){
  const cur = currencyForLang();
  const val = usd * cur.rate;
  return new Intl.NumberFormat(cur.locale, {
    style:'currency', currency:cur.code,
    maximumFractionDigits:(cur.code==='JPY'||cur.code==='KRW')?0:0
  }).format(val);
}

function normalizeTotalUSD({totalSpentUSD, totalSpentKRW}){
  if (Number.isFinite(totalSpentUSD)) return totalSpentUSD;
  if (Number.isFinite(totalSpentKRW)) return totalSpentKRW / (FX.KRW.rate||1300);
  return 0;
}

function computeLevelIdx(totalUSD, lastBookingISO){
  let base = 0;
  for (let i=0;i<LEVELS.length;i++){
    if (totalUSD >= LEVELS[i].minUSD) base = i;
  }
  if (lastBookingISO){
    const diffDays = Math.floor((Date.now() - new Date(lastBookingISO).getTime())/86400000);
    if (diffDays >= DOWNGRADE_DAYS) base = Math.max(0, base-1);
  }
  return base;
}

/* ----- Render benefits with inheritance + {RATE} token ----- */
function renderBenefits(){
  const lang = L();
  const order = ['Bronze','Silver','Gold','Platinum','Diamond','Elite'];

  // Build inherited arrays once
  const inherited = order.map((tierName, idx)=>{
    const arr = [];
    for (let k=0;k<=idx;k++){
      const key = order[k];
      const raw = (lang.benefits[key] || []);
      raw.forEach(line=> arr.push(line));
    }
    return arr;
  });

  order.forEach((name,idx)=>{
    const card = document.querySelector(`[data-tier="${name}"]`);
    if(!card) return;

    // title translation
    const titleSpan = card.querySelector('h3 .t_tier');
    if(titleSpan){ titleSpan.textContent = (lang.tiers[idx] || name); }

    // render list (replace {RATE} with that tier's %)
    const box = card.querySelector('.benefits');
    box.innerHTML = '';
    const rate = LEVELS[idx].rate;

    inherited[idx].forEach(line=>{
      const txt = line.replace(/\{RATE\}/g, String(rate));
      const row = document.createElement('div');
      row.className='benefit';
      row.innerHTML = `<i>✅</i><span>${txt}</span>`;
      box.appendChild(row);
    });
  });
}

/* ----- UI update ----- */
function applyLevelUI(levelIdx, totalUSD, lastBookingISO){
  const lang = L();

  // top texts
  $('#t_title').textContent      = lang.title;
  $('#t_inherit').textContent    = lang.inherit;
  $('#t_your_tier').textContent  = lang.your_tier;
  $('#t_downgrade').textContent  = lang.downgrade;

  // gauge
  const gauge = $('#tierGauge');
  const pctEl = $('#tierGaugePct');
  let pct = 100;
  let progressText;

  if (levelIdx < LEVELS.length-1){
    const currMin = LEVELS[levelIdx].minUSD;
    const nextMin = LEVELS[levelIdx+1].minUSD;
    pct = Math.min(100, Math.max(0, Math.round(((totalUSD - currMin) / (nextMin - currMin)) * 100)));
    const remUSD = Math.max(0, nextMin - totalUSD);
    progressText = lang.toNext(fmtMoneyFromUSD(remUSD));
  } else {
    progressText = lang.top;
  }

  if (gauge) gauge.style.width = pct + '%';
  if (pctEl) pctEl.textContent = lang.gauge(pct);
  $('#levelProgressText').textContent = progressText;

  // cards: current badge + dim higher tiers
  $$('#tiersGrid [data-tier]').forEach(card=>{
    card.classList.remove('tier-muted');
    card.querySelector('.badge-current')?.remove();
    const name = card.getAttribute('data-tier');
    const idx = LEVELS.findIndex(x=>x.name===name);
    if (idx > levelIdx) card.classList.add('tier-muted');
    if (idx === levelIdx){
      const b = document.createElement('span');
      b.className='badge-current';
      b.textContent = lang.current;
      card.appendChild(b);
    }
  });

  // downgrade alerts
  if (lastBookingISO){
    const diffDays = Math.floor((Date.now() - new Date(lastBookingISO).getTime())/86400000);
    const left = DOWNGRADE_DAYS - diffDays;
    if ([30,15,7,1].includes(left)){
      const wrap = document.createElement('div');
      wrap.className='fixed bottom-5 right-5 bg-red-600 text-white px-4 py-3 rounded-xl shadow-lg';
      wrap.style.zIndex = 9999;
      wrap.textContent = (currentLangCode()==='KO')
        ? `${left}일 후 자동 강등 예정입니다. 지금 예약하면 유지됩니다.`
        : `Auto-downgrade in ${left} day(s). Keep your tier by booking.`;
      document.body.appendChild(wrap);
      setTimeout(()=>wrap.remove(),8000);
    }
  }
}

/* ----- react to language change ----- */
function bindLangWatcher(){
  const sel = document.getElementById('lang') || document.getElementById('langSelect');
  if(!sel) return;
  sel.addEventListener('change', ()=>{
    if(window.__SW_LAST_CTX){
      const ctx = window.__SW_LAST_CTX;
      const totalUSD = normalizeTotalUSD(ctx);
      const idx = computeLevelIdx(totalUSD, ctx.lastBookingISO);
      renderBenefits();
      applyLevelUI(idx, totalUSD, ctx.lastBookingISO);
    }else{
      renderBenefits();
      applyLevelUI(0,0,null);
    }
  });
}

/* ----- public ----- */
function setUserContext(ctx){
  window.__SW_LAST_CTX = ctx;
  const totalUSD = normalizeTotalUSD(ctx);
  const idx = computeLevelIdx(totalUSD, ctx.lastBookingISO);
  renderBenefits();
  applyLevelUI(idx, totalUSD, ctx.lastBookingISO);
}

/* init */
document.addEventListener('DOMContentLoaded', ()=>{
  renderBenefits();
  applyLevelUI(0,0,null);
  bindLangWatcher();
});

window.setUserContext = setUserContext;
