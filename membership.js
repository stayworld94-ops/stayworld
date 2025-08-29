// membership.js — FINAL4 (Live FX 통합)
// - lang-change 실시간 반영
// - 통화 선택 드롭다운(10개) 즉시 반영
// - 실시간 환율: ExchangeRate-API 키 08df811def76a1ffa0c97f4a
// - 연간 소폭 할인(손해방지 올림)
// - 상위 레벨 = 하위 혜택 누적 (포인트 %는 최고치만 표시)
// - ✅ t(), bt() 함수 수정 → state.lang만 참조 (번역 즉시 반영)

// ===== CONFIG =====
const SAFETY_MARGIN = 1.07;          // 표시가에 7% 마진
const YEARLY_DISCOUNT_RATE = 0.92;   // 연간 약 8% 할인
const ROUND_UP_TO_0_01 = v => Math.ceil(v * 100) / 100;

const PLAN_CAPS = {
  plus:  { boostRate:0.02, boostMaxUSD:  8, discountPerBookingUSD:10, bookingsPerMonth:3 },
  black: { boostRate:0.04, boostMaxUSD: 24, discountPerBookingUSD:20, bookingsPerMonth:5 }
};

const LEVELS = [
  { name:'Bronze',   minUSD:0 },
  { name:'Silver',   minUSD:300 },
  { name:'Gold',     minUSD:800 },
  { name:'Platinum', minUSD:1500 },
  { name:'Diamond',  minUSD:3000 },
  { name:'Elite',    minUSD:6000 },
];

// 월 정가(USD)
const MONTHLY_PRICES_USD = { plus: 9.99, black: 24.99 };

// ===== I18N (UI 라벨) =====
const I18N = {
  en:{monthLeft:'This month remaining',boostLeft:'Points boost left',instLeft:'Instant discount',perBooking:'per booking',bookings:'bookings',tickets:'Tickets',eligible:'Eligible now',notYet:'Not yet',nextLevel:'Next level',inherit:'Higher tiers include all lower-level benefits.',toGo:'{next} — {amount} left',maxLevel:'Top level reached'},
  ko:{monthLeft:'이번 달 남은 혜택',boostLeft:'포인트 부스트 잔여',instLeft:'즉시할인 잔여',perBooking:'예약당',bookings:'회',tickets:'티켓',eligible:'지급 가능',notYet:'아직 조건 미달',nextLevel:'다음 레벨',inherit:'상위 레벨은 하위 레벨 혜택을 모두 포함합니다.',toGo:'{next} — {amount} 남음',maxLevel:'최상위 레벨입니다'},
  ja:{monthLeft:'今月の残り特典',boostLeft:'ポイントブースト残高',instLeft:'即時割引残高',perBooking:'予約ごと',bookings:'回',tickets:'チケット',eligible:'受取可能',notYet:'まだ条件未達',nextLevel:'次のレベル',inherit:'上位レベルは下位の特典をすべて含みます。',toGo:'{next} — 残り {amount}',maxLevel:'最上位レベルです'},
  es:{monthLeft:'Beneficios restantes este mes',boostLeft:'Impulso de puntos restante',instLeft:'Descuento instantáneo',perBooking:'por reserva',bookings:'reservas',tickets:'Tickets',eligible:'Elegible ahora',notYet:'Aún no',nextLevel:'Siguiente nivel',inherit:'Los niveles superiores incluyen los beneficios de los inferiores.',toGo:'{next} — faltan {amount}',maxLevel:'Nivel máximo alcanzado'},
  fr:{monthLeft:'Avantages restants ce mois-ci',boostLeft:'Bonus de points restant',instLeft:'Remise immédiate',perBooking:'par réservation',bookings:'réservations',tickets:'Tickets',eligible:'Éligible',notYet:'Pas encore',nextLevel:'Niveau suivant',inherit:'Les niveaux supérieurs incluent les avantages des niveaux inférieurs.',toGo:'{next} — reste {amount}',maxLevel:'Niveau maximal atteint'},
  de:{monthLeft:'Verbleibende Vorteile diesen Monat',boostLeft:'Punkte-Boost verbleibend',instLeft:'Sofortrabatt',perBooking:'pro Buchung',bookings:'Buchungen',tickets:'Tickets',eligible:'Jetzt verfügbar',notYet:'Noch nicht',nextLevel:'Nächstes Level',inherit:'Höhere Stufen enthalten alle Vorteile der unteren.',toGo:'{next} — noch {amount}',maxLevel:'Höchste Stufe erreicht'},
  pt:{monthLeft:'Benefícios restantes neste mês',boostLeft:'Bônus de pontos restante',instLeft:'Desconto instantâneo',perBooking:'por reserva',bookings:'reservas',tickets:'Tickets',eligible:'Elegível agora',notYet:'Ainda não',nextLevel:'Próximo nível',inherit:'Níveis superiores incluem os benefícios dos inferiores.',toGo:'{next} — faltam {amount}',maxLevel:'Nível máximo atingido'},
  zh:{monthLeft:'本月剩余权益',boostLeft:'积分加成剩余',instLeft:'即时折扣',perBooking:'每次预订',bookings:'次',tickets:'票券',eligible:'可领取',notYet:'暂不可',nextLevel:'下一级',inherit:'高等级包含所有低等级权益。',toGo:'{next} — 还差 {amount}',maxLevel:'已达最高等级'},
  ru:{monthLeft:'Оставшиеся привилегии в этом месяце',boostLeft:'Остаток бонусных баллов',instLeft:'Мгновенная скидка',perBooking:'за бронирование',bookings:'раз',tickets:'Тикеты',eligible:'Доступно',notYet:'Пока нет',nextLevel:'Следующий уровень',inherit:'Высшие уровни включают все привилегии нижних.',toGo:'{next} — осталось {amount}',maxLevel:'Достигнут максимальный уровень'},
  ar:{monthLeft:'المتبقي هذا الشهر',boostLeft:'رصيد تعزيز النقاط',instLeft:'خصم فوري',perBooking:'لكل حجز',bookings:'حجوزات',tickets:'تذاكر',eligible:'متاح الآن',notYet:'ليس بعد',nextLevel:'المستوى التالي',inherit:'المستويات الأعلى تتضمن مزايا المستويات الأدنى.',toGo:'{next} — متبقٍ {amount}',maxLevel:'أعلى مستوى'}
};

// 혜택 문구 I18N
const BENEFIT_I18N = {
  en:{dash:'—',member_offers:'Member-only offers',points3:'3% points back',points5:'5% points back',points7:'7% points back',points10:'10% points back',points15:'15% points back',priority_support:'Priority support',waitlist_priority:'Waitlist priority',early_late:'Early check-in / Late check-out (host-provided)',flexible_24h:'Flexible cancellation (24h, where allowed)',upgrade_avail:'Room upgrade when available',secret_deals:'Secret Deals+ (host-funded)',birthday_2x:'Birthday month ×2 points',lounge_partner:'Airport lounge (partners)',pickup_partner:'Airport pickup (partners)',overbooking_protect:'Overbooking protection',concierge_vip:'VIP concierge (AI+staff, 3 sessions/mo)',dedicated_channel:'Dedicated support channel',status_match:'Status match (invite-only)',secret_deals_plus:'Invite-only Secret Deals++'},
  ko:{dash:'—',member_offers:'멤버 전용 오퍼',points3:'3% 포인트 백',points5:'5% 포인트 백',points7:'7% 포인트 백',points10:'10% 포인트 백',points15:'15% 포인트 백',priority_support:'우선 상담',waitlist_priority:'대기자 우선',early_late:'얼리 체크인 / 레이트 체크아웃 (호스트 제공)',flexible_24h:'유연 취소 (24시간, 정책 허용 시)',upgrade_avail:'객실 업그레이드 (가능 시)',secret_deals:'시크릿 딜+ (호스트 부담)',birthday_2x:'생일 달 포인트 2배',lounge_partner:'공항 라운지 (제휴)',pickup_partner:'공항 픽업 (제휴)',overbooking_protect:'오버부킹 보호',concierge_vip:'VIP 컨시어지 (AI+스태프, 월 3회)',dedicated_channel:'전용 지원 채널',status_match:'상태 매칭 (초대 한정)',secret_deals_plus:'인바이트 전용 시크릿 딜++'}
};

// ===== UTIL =====
const $ = id => document.getElementById(id);
const setText = (id,txt)=>{ const el=$(id); if(el) el.textContent=txt; };
const setGauge = (id,pct)=>{ const el=$(id); if(el) el.style.width=`${Math.max(0,Math.min(100,pct))}%`; };

// ===== CURRENCY (10종) =====
const SUPPORTED_CUR = new Set(['USD','EUR','GBP','JPY','KRW','CNY','MXN','BRL','RUB','AUD']);
const ZERO_DEC = new Set(['JPY','KRW']);

// 실시간 환율 (USD 기준). 초기값은 USD=1만 두고 API로 채움
let FX = { USD:1 };

async function fetchLiveRates(base='USD'){
  try{
    const r = await fetch(`https://v6.exchangerate-api.com/v6/08df811def76a1ffa0c97f4a/latest/${base}`);
    const data = await r.json();
    if(data.result === 'success' && data.conversion_rates){
      // 필요한 10종만 뽑아 저장
      const cr = data.conversion_rates;
      const next = {};
      SUPPORTED_CUR.forEach(cc => { if(cr[cc] != null) next[cc] = cr[cc]; });
      next.USD = 1; // 보정
      FX = next;
      // 환율 반영
      renderPrices();
      renderUsageLeft();
      console.log('[membership] FX updated', FX);
    }else{
      console.warn('[membership] FX API error', data);
    }
  }catch(e){
    console.error('[membership] FX fetch failed', e);
  }
}

function regionCurrency10(region){
  switch(region){
    case 'US': return 'USD'; case 'GB': return 'GBP'; case 'AU': return 'AUD';
    case 'JP': return 'JPY'; case 'KR': return 'KRW'; case 'CN': return 'CNY';
    case 'MX': return 'MXN'; case 'BR': return 'BRL'; case 'RU': return 'RUB';
    case 'FR': case 'DE': case 'ES': case 'IT': case 'NL': case 'BE': case 'AT':
    case 'IE': case 'PT': case 'FI': case 'GR': case 'SK': case 'SI': case 'HR': return 'EUR';
    default: return null;
  }
}
function langCurrency10(lang){
  switch(lang){
    case 'ko': return 'KRW'; case 'ja': return 'JPY'; case 'zh': return 'CNY';
    case 'es': return 'MXN'; case 'fr': case 'de': return 'EUR';
    case 'pt': return 'BRL'; case 'ru': return 'RUB'; case 'en': return 'USD';
    case 'ar': return 'USD'; default: return 'USD';
  }
}
function detectRegionTag(){
  const tag = document.documentElement.getAttribute('lang') || navigator.language || 'en-US';
  const parts = tag.split('-'); for (let i=parts.length-1;i>=0;i--){ const s=parts[i]; if (s.length===2) return s.toUpperCase(); }
  return 'US';
}

// ===== STATE =====
const params = new URLSearchParams(location.search);
const OVERRIDE_LANG = params.get('lang');
const OVERRIDE_CURR = params.get('currency');
const state = {
  lang:(OVERRIDE_LANG || (document.documentElement.getAttribute('lang')||navigator.language||'en')).split('-')[0],
  currency:'USD',
  billing:'monthly',
  profile:null,   // { monthsActive, lifetimeUSD } 등 외부 주입 가능
  membership:null,// { plan:'plus'|'black' }
  usage:null      // { boostUSDGranted, discountBookingsUsed }
};

function pickCurrency10(){
  if (OVERRIDE_CURR && SUPPORTED_CUR.has(OVERRIDE_CURR.toUpperCase())) return OVERRIDE_CURR.toUpperCase();
  const region = regionCurrency10(detectRegionTag()); if (region && SUPPORTED_CUR.has(region)) return region;
  const byLang = langCurrency10(state.lang); if (SUPPORTED_CUR.has(byLang)) return byLang;
  return 'USD';
}
state.currency = pickCurrency10();

// ===== I18N helpers =====
function t(key){
  const pack = I18N[state.lang] || I18N.en;
  return pack[key] ?? I18N.en[key] ?? key;
}
function bt(key){
  const lang = (state.lang || 'en').toLowerCase();
  const pack = BENEFIT_I18N[lang] || BENEFIT_I18N.en;
  return pack[key] || BENEFIT_I18N.en[key] || key;
}

// ===== MONEY =====
function moneyUSDtoLocal(usd){
  const code = state.currency, rate = FX[code] || 1;
  const v = usd * rate * SAFETY_MARGIN;
  const localeGuess =
    (state.lang==='ko')?'ko-KR':(state.lang==='ja')?'ja-JP':(state.lang==='es')?'es-ES':
    (state.lang==='fr')?'fr-FR':(state.lang==='de')?'de-DE':(state.lang==='pt')?'pt-PT':
    (state.lang==='zh')?'zh-CN':(state.lang==='ru')?'ru-RU':(state.lang==='ar')?'ar-SA':'en-US';
  return new Intl.NumberFormat(localeGuess, { style:'currency', currency:code, maximumFractionDigits: ZERO_DEC.has(code)?0:2 }).format(v);
}

// ===== Levels =====
function levelFromSpend(usd12m){ let idx=0; for(let i=0;i<LEVELS.length;i++){ if(usd12m>=LEVELS[i].minUSD) idx=i; } return {index:idx,name:LEVELS[idx].name}; }
function nextLevelProgress(usd12m){
  const cur=levelFromSpend(usd12m), curMin=LEVELS[cur.index].minUSD, next=LEVELS[cur.index+1];
  if(!next) return {next:null,pct:100,leftUSD:0};
  const span=next.minUSD-curMin, done=Math.max(0,usd12m-curMin);
  return {next:next.name,pct:Math.max(0,Math.min(100,(done/span)*100)),leftUSD:Math.max(0,next.minUSD-usd12m)};
}

// ===== Stacked Benefits (상위=하위 포함, 포인트는 최고 %만) =====
function getMergedBenefits(){
  const LEVEL_BENEFIT_KEYS={
    Bronze:['dash','member_offers'],
    Silver:['points3','priority_support','waitlist_priority'],
    Gold:['points5','priority_support','early_late','flexible_24h'],
    Platinum:['points7','upgrade_avail','secret_deals','dedicated_channel','birthday_2x'],
    Diamond:['points10','upgrade_avail','secret_deals','lounge_partner','pickup_partner','overbooking_protect'],
    Elite:['points15','concierge_vip','status_match','secret_deals_plus']
  };
  const order=['Bronze','Silver','Gold','Platinum','Diamond','Elite'];
  const merged={}, acc=[]; let bestPointsKey=null;
  const rank=k=>{const m=/^points(\d+)$/.exec(k); return m?parseInt(m[1],10):-1;};

  for(const name of order){
    for(const k of LEVEL_BENEFIT_KEYS[name]){
      if(k.startsWith('points')){
        if(!bestPointsKey || rank(k)>rank(bestPointsKey)){
          if(bestPointsKey){
            const idx=acc.findIndex(x=>x===bt(bestPointsKey)); if(idx>=0) acc.splice(idx,1);
          }
          bestPointsKey=k; acc.push(bt(k));
        }
      }else{
        const label=bt(k); if(!acc.includes(label)) acc.push(label);
      }
    }
    merged[name]=acc.slice();
  }
  return merged;
}
function renderBenefits(){
  const merged=getMergedBenefits();
  document.querySelectorAll('.tier-card[data-tier]').forEach(card=>{
    const tier=card.getAttribute('data-tier'); const box=card.querySelector('.benefits');
    if(!box||!merged[tier]) return;
    box.innerHTML = merged[tier].map(v=>`<div class="benefit"><i>•</i><div>${v}</div></div>`).join('');
  });
  setText('inheritNote', t('inherit'));
}
function guardBenefits(){
  const target=$('tiersGrid'); if(!target) return; let timer=null;
  const mo=new MutationObserver(()=>{clearTimeout(timer); timer=setTimeout(renderBenefits,40);});
  mo.observe(target,{subtree:true,childList:true,characterData:true}); renderBenefits();
}

// ===== Pricing =====
function yearlyUSD(monthlyUSD){ return ROUND_UP_TO_0_01(monthlyUSD * 12 * YEARLY_DISCOUNT_RATE); }
function renderPrices(){
  const billing = state.billing;
  const p = (billing==='yearly')
    ? { plus: yearlyUSD(MONTHLY_PRICES_USD.plus), black: yearlyUSD(MONTHLY_PRICES_USD.black) }
    : { plus: MONTHLY_PRICES_USD.plus,            black: MONTHLY_PRICES_USD.black };

  setText('pricePlus',  moneyUSDtoLocal(p.plus)  + (billing==='yearly'?' / yr':' / mo'));
  setText('priceBlack', moneyUSDtoLocal(p.black) + (billing==='yearly'?' / yr':' / mo'));

  const m=$('billMonthly'), y=$('billYearly');
  if(m) m.textContent='Monthly';
  if(y) y.textContent=`Yearly (save ${Math.round((1-YEARLY_DISCOUNT_RATE)*100)}%)`;
}

// ===== Usage left / Eligibility =====
function renderUsageLeft(){
  const m=state.membership; if(!m||!m.plan||!PLAN_CAPS[m.plan]) return;
  const caps=PLAN_CAPS[m.plan]; const u=state.usage||{boostUSDGranted:0,discountBookingsUsed:0};
  const boostLeftUSD=Math.max(0, caps.boostMaxUSD - (u.boostUSDGranted||0));
  const bookingsLeft=Math.max(0, (caps.bookingsPerMonth||0) - (u.discountBookingsUsed||0));

  setText('lbl_perksLeft',t('monthLeft'));
  setText('lbl_boostLeft',t('boostLeft')+':'); setText('lbl_discountLeft',t('instLeft')+':'); setText('lbl_bookings',t('bookings'));
  setText('uiBoostLeft', moneyUSDtoLocal(boostLeftUSD));
  setText('uiDiscountPerBooking', moneyUSDtoLocal(caps.discountPerBookingUSD));
  setText('uiDiscountRemaining', `${bookingsLeft}`);

  // 간단한 자격 예시 로직 (필요시 교체)
  const monthsActive = state.profile?.monthsActive ?? 0;
  const lifetimeUSD  = state.profile?.lifetimeUSD  ?? 0;
  const eligible = (m.plan==='black' && monthsActive>=3 && lifetimeUSD>=300);
  setText('uiEligible', eligible ? t('eligible') : t('notYet'));
}

// ===== Level progress =====
function renderProgress(){
  const spentUSD = state.profile?.spent12mUSD ?? 0;
  const cur = levelFromSpend(spentUSD);
  const prog = nextLevelProgress(spentUSD);
  setText('curLevel', cur.name);
  if(prog.next){
    setText('nextLevel', t('nextLevel'));
    const leftStr = moneyUSDtoLocal(prog.leftUSD);
    setText('nextLevelHint', t('toGo').replace('{next}', prog.next).replace('{amount}', leftStr));
  }else{
    setText('nextLevel', t('maxLevel'));
    setText('nextLevelHint','');
  }
  setGauge('levelGauge', prog.pct);
}

// ===== Wiring (언어/통화/빌링 토글) =====
function wireControls(){
  const langSel = $('langSelect');
  if(langSel){
    langSel.value = state.lang;
    langSel.addEventListener('change', ()=>{
      state.lang = langSel.value.split('-')[0];
      // 언어 바뀌면 통화도 합리적으로 재선택
      state.currency = pickCurrency10();
      renderBenefits(); renderPrices(); renderUsageLeft(); renderProgress();
    });
  }

  const curSel = $('currencySelect');
  if(curSel){
    // 10개 통화 옵션 채우기(이미 있으면 유지)
    if(curSel.options.length < 10){
      const codes = Array.from(SUPPORTED_CUR);
      curSel.innerHTML = codes.map(c=>`<option value="${c}">${c}</option>`).join('');
    }
    curSel.value = state.currency;
    curSel.addEventListener('change', ()=>{
      state.currency = curSel.value;
      renderPrices(); renderUsageLeft(); renderProgress();
    });
  }

  const billMonthly = $('billMonthlyBtn'), billYearly = $('billYearlyBtn');
  billMonthly?.addEventListener('click', ()=>{ state.billing='monthly'; renderPrices(); });
  billYearly?.addEventListener('click',  ()=>{ state.billing='yearly';  renderPrices(); });
}

// ===== Init =====
function initMembership(){
  guardBenefits();
  wireControls();
  renderBenefits();
  renderPrices();
  renderUsageLeft();
  renderProgress();
  // 실시간 환율 로드
  fetchLiveRates('USD');
}

if(document.readyState==='loading'){
  document.addEventListener('DOMContentLoaded', initMembership);
}else{
  initMembership();
}
