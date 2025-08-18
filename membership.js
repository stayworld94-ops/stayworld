/* =========================================================
   STAYWORLD — Membership Logic (hardened, i18n + currency)
   - 6 tiers, upper-tier inherits lower-tier benefits
   - Level thresholds kept in USD; 화면 표시는 사용 언어의 통화로 변환
   - Auto downgrade 1 level if no booking for >= 60 days
   - Progress gauge + “to next” 문구 현지화
   - Benefits 텍스트 다국어, 등급 카드 자동 채움
   ========================================================= */

/* ---------- Currency tables (vs USD) ---------- */
const CUR = {
  USD: { rate: 1,    locale: 'en-US', name:'USD' },
  EUR: { rate: 0.92, locale: 'fr-FR', name:'EUR' },
  KRW: { rate: 1300, locale: 'ko-KR', name:'KRW' },
  JPY: { rate: 155,  locale: 'ja-JP', name:'JPY' },
  CNY: { rate: 7.2,  locale: 'zh-CN', name:'CNY' },
  TRY: { rate: 33,   locale: 'tr-TR', name:'TRY' },
  RUB: { rate: 90,   locale: 'ru-RU', name:'RUB' },
  GBP: { rate: 0.78, locale: 'en-GB', name:'GBP' },
  AED: { rate: 3.67, locale: 'ar-AE', name:'AED' },
  CAD: { rate: 1.36, locale: 'en-CA', name:'CAD' },
};

const LANG2CUR = { EN:'USD', KO:'KRW', JA:'JPY', ZH:'CNY', FR:'EUR', ES:'EUR', DE:'EUR', TR:'TRY', AR:'AED', RU:'RUB' };

function currentLang(){
  const sel = document.getElementById('lang') || document.getElementById('langSelect');
  const saved = (sel && sel.value) || (localStorage.getItem('sw_lang') || 'EN');
  return (saved || 'EN').toUpperCase();
}
function currentCurrencyCode(){
  return LANG2CUR[currentLang()] || 'USD';
}
function fmtMoneyFromUSD(usd){
  const code = currentCurrencyCode();
  const c = CUR[code] || CUR.USD;
  const val = usd * c.rate;
  return new Intl.NumberFormat(c.locale, { style:'currency', currency:c.name, maximumFractionDigits: (c.name==='JPY'||c.name==='KRW')?0:0 }).format(val);
}

/* ---------- i18n strings ---------- */
const I18N = {
  EN: {
    title: "🌟 StayWorld Membership",
    inherit: "Upper tiers include all benefits of lower tiers.",
    your_tier: "Your Tier",
    to_next: (amt)=> `${fmtMoneyFromUSD(amt)} to next tier. Auto-downgrade after 60 days of no bookings.`,
    top: "Top tier (Elite). Auto-downgrade after 60 days of no bookings.",
    gauge: (p)=> `${p}%`,
    note: "If there is no booking for 60 days, your tier will auto-downgrade by 1 level.",
    benefits: {
      Bronze: [
        "Basic support",
        "Secure card/crypto payments"
      ],
      Silver: [
        "5% point back on stays",
        "Priority email support (24h)"
      ],
      Gold: [
        "7% point back on stays",
        "Free late checkout (when available)",
        "Priority support (chat)"
      ],
      Platinum: [
        "10% point back on stays",
        "Room upgrade on arrival (when available)",
        "Dedicated concierge"
      ],
      Diamond: [
        "12% point back on stays",
        "Complimentary airport lounge (1 visit / trip)",
        "48h best-rate match"
      ],
      Elite: [
        "15% point back on stays",
        "VIP welcome & amenities",
        "Private deals & invitation-only events"
      ],
    }
  },
  KO: {
    title: "🌟 스테이월드 멤버십",
    inherit: "상위 등급은 하위 등급의 모든 혜택을 포함합니다.",
    your_tier: "나의 등급",
    to_next: (amt)=> `다음 등급까지 ${fmtMoneyFromUSD(amt)} 남았습니다. 60일 예약 없으면 자동 1단계 강등됩니다.`,
    top: "최상위 등급(Elite). 60일 예약 없으면 자동 1단계 강등됩니다.",
    gauge: (p)=> `${p}%`,
    note: "60일 동안 예약이 없으면 등급이 자동으로 1단계 강등됩니다.",
    benefits: {
      Bronze: [
        "기본 고객지원",
        "안전한 카드/암호화폐 결제"
      ],
      Silver: [
        "숙박 5% 포인트 적립",
        "우선 이메일 응대(24시간)"
      ],
      Gold: [
        "숙박 7% 포인트 적립",
        "가능 시 레이트 체크아웃 무료",
        "우선 채팅 지원"
      ],
      Platinum: [
        "숙박 10% 포인트 적립",
        "가능 시 객실 업그레이드",
        "전담 콘시어지"
      ],
      Diamond: [
        "숙박 12% 포인트 적립",
        "공항 라운지 1회/여정 제공",
        "48시간 최저가 보장"
      ],
      Elite: [
        "숙박 15% 포인트 적립",
        "VIP 웰컴 & 어메니티",
        "프라이빗 특가/초대형 이벤트"
      ],
    }
  },
  // 필요 시 FR/JA/… 추가 가능
};

/* ---------- Tiers (thresholds in USD) ---------- */
const LEVELS = [
  { name:'Bronze',   minUSD:      0, rate: 0  },
  { name:'Silver',   minUSD:   400, rate: 3  },   // ≈ KRW 500,000
  { name:'Gold',     minUSD:  1600, rate: 5  },   // ≈ KRW 2,000,000
  { name:'Platinum', minUSD:  3200, rate: 7  },   // ≈ KRW 4,000,000
  { name:'Diamond',  minUSD:  6000, rate:10  },   // ≈ KRW 7,500,000
  { name:'Elite',    minUSD: 12000, rate:15, manual:true }
];
const DOWNGRADE_DAYS = 60;

/* ---------- Utils ---------- */
const $  = (s,sc)=> (sc||document).querySelector(s);
const $$ = (s,sc)=> Array.from((sc||document).querySelectorAll(s));

function pickLangPack(){ return I18N[currentLang()] || I18N.EN; }

function computeLevelIdx(totalUSD, lastBookingISO){
  let base = 0;
  for (let i=0;i<LEVELS.length;i++){
    if (totalUSD >= LEVELS[i].minUSD) base = i;
  }
  if (lastBookingISO){
    const last = new Date(lastBookingISO).getTime();
    const diff = Math.floor((Date.now()-last)/86400000);
    if (diff >= DOWNGRADE_DAYS) base = Math.max(0, base-1);
  }
  return base;
}
function remainingUSDToNext(totalUSD, idx){
  if (idx >= LEVELS.length-1) return null;
  return Math.max(0, LEVELS[idx+1].minUSD - totalUSD);
}

/* ---------- Benefits render with inheritance ---------- */
function renderBenefits(){
  const L = pickLangPack();
  // 누락 방지: 영어 베이스에 병합
  const B = Object.assign({}, I18N.EN.benefits, L.benefits||{});

  // 누적 상속
  let acc = [];
  LEVELS.forEach(lvl=>{
    acc = acc.concat(B[lvl.name] || []);
    const card = $(`#tiersGrid [data-tier="${lvl.name}"]`);
    if(!card) return;
    const wrap = $('.benefits', card); if(!wrap) return;
    wrap.innerHTML = acc.map(txt => `
      <div class="benefit">
        <span>✅</span><i>${txt}</i>
      </div>
    `).join('');
  });
}

/* ---------- Top card (title + gauge + note) ---------- */
function applyTopCard(totalUSD, lastISO){
  const L = pickLangPack();
  $('#t_title')        && ($('#t_title').textContent = L.title);
  $('#t_inherit')      && ($('#t_inherit').textContent = L.inherit);
  $('#t_your_tier')    && ($('#t_your_tier').textContent = L.your_tier);
  $('#t_downgrade_note') && ($('#t_downgrade_note').textContent = L.note);

  const idx = computeLevelIdx(totalUSD, lastISO);
  const lvl = LEVELS[idx];

  // 진행률 계산
  let pct = 100;
  const remUSD = remainingUSDToNext(totalUSD, idx);
  if (remUSD != null){
    const curr = lvl.minUSD;
    const next = LEVELS[idx+1].minUSD;
    pct = Math.round( Math.min(100, Math.max(0, ( (totalUSD - curr) / (next - curr) )*100 )) );
    $('#levelProgressText') && ($('#levelProgressText').textContent = L.to_next(remUSD));
  }else{
    $('#levelProgressText') && ($('#levelProgressText').textContent = L.top);
  }
  $('#tierGauge') && ($('#tierGauge').style.width = pct + '%');
  $('#tierPct')   && ($('#tierPct').textContent   = L.gauge(pct));

  // 카드 강조
  $$('#tiersGrid [data-tier]').forEach(c=>{
    c.classList.remove('tier-active','tier-muted');
    const name = c.getAttribute('data-tier');
    const i = LEVELS.findIndex(x=>x.name===name);
    if(i===idx) c.classList.add('tier-active');
    if(i>idx)   c.classList.add('tier-muted');
  });
}

/* ---------- Public API ---------- */
/** 
 * setUserContext({ totalSpent, currency, lastBookingISO, totalSpentKRW })
 * - totalSpent + currency 조합 권장(USD, KRW 등)
 * - 과거 데이터 호환: totalSpentKRW 있으면 자동 변환
 */
function setUserContext({ totalSpent, currency, lastBookingISO, totalSpentKRW } = {}){
  // 1) 입력 정규화 → USD
  let totalUSD = 0;
  if (Number.isFinite(totalSpent) && currency && CUR[currency]){
    totalUSD = totalSpent / CUR[currency].rate;
  }else if (Number.isFinite(totalSpentKRW)){
    totalUSD = totalSpentKRW / CUR.KRW.rate;
  }else{
    totalUSD = 0;
  }

  // 렌더
  renderBenefits();
  applyTopCard(totalUSD, lastBookingISO);
}

/* ---------- Auto init ---------- */
function initMembership(){
  // 헤더가 먼저 붙고 언어가 정해진 뒤에 렌더 수행
  renderBenefits();

  // 저장된 사용자 합계 읽기(있으면)
  let u={};
  try{ u = JSON.parse(localStorage.getItem('sw_user')||'{}'); }catch(_){}
  setUserContext({
    totalSpent: Number.isFinite(u.totalSpent)?u.totalSpent:undefined,
    currency: u.currency || undefined,
    totalSpentKRW: Number.isFinite(u.totalSpentKRW)?u.totalSpentKRW:undefined,
    lastBookingISO: u.lastBookingISO || null
  });

  // 언어 바뀌면 즉시 재렌더
  const langSel = document.getElementById('lang') || document.getElementById('langSelect');
  langSel && langSel.addEventListener('change', ()=> {
    // 최근 user 그대로 재적용(통화는 언어에 맞춰 자동 포맷)
    setUserContext({
      totalSpent: Number.isFinite(u.totalSpent)?u.totalSpent:undefined,
      currency: u.currency || undefined,
      totalSpentKRW: Number.isFinite(u.totalSpentKRW)?u.totalSpentKRW:undefined,
      lastBookingISO: u.lastBookingISO || null
    });
  });
}

if (document.readyState === 'loading'){
  document.addEventListener('DOMContentLoaded', initMembership);
} else {
  initMembership();
}

/* ---------- Optional: Downgrade alerts (D-30/15/7/1) ---------- */
(function(){
  let u={};
  try{ u = JSON.parse(localStorage.getItem('sw_user')||'{}'); }catch(_){}
  if(!u.lastBookingISO) return;

  const diff = Math.floor((Date.now()-new Date(u.lastBookingISO).getTime())/86400000);
  const left = DOWNGRADE_DAYS - diff;
  const L = pickLangPack();
  const mapEN = {30:"Auto downgrade in 30 days. Keep your tier by booking.",
                 15:"Auto downgrade in 15 days. Stay active.",
                  7:"Auto downgrade in 7 days. Book soon!",
                  1:"Auto downgrade tomorrow! Complete a booking today."};
  const mapKO = {30:"30일 후 자동 강등 예정입니다. 지금 예약하면 유지됩니다.",
                 15:"15일 후 자동 강등 예정입니다. 활동을 유지하세요.",
                  7:"7일 후 자동 강등 예정입니다. 서둘러 예약하세요!",
                  1:"내일 자동 강등됩니다! 오늘 예약을 완료하세요."};
  const msg = (currentLang()==='KO'?mapKO:mapEN)[left];
  if(!msg) return;
  const el = document.createElement('div');
  el.className = "fixed bottom-5 right-5 bg-red-600 text-white px-4 py-3 rounded-xl shadow-lg";
  el.style.zIndex = 9999;
  el.textContent = msg;
  document.body.appendChild(el);
  setTimeout(()=> el.remove(), 8000);
})();
