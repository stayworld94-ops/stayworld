/* ==========================================
   STAYWORLD Membership Logic (6 tiers)
   - Tier compute: KRW (unchanged)
   - Display money: auto by selected language's currency
   - i18n: inherit text, toNext, top, downgrade note & alerts
   - Auto downgrade if no booking >= 60 days
   ========================================== */

/* -------- Currency tables -------- */
const CURRENCIES = {
  USD:{code:'USD', locale:'en-US', rate:1300},   // 1 USD = 1300 KRW
  EUR:{code:'EUR', locale:'fr-FR', rate:1400},
  KRW:{code:'KRW', locale:'ko-KR', rate:1},
  JPY:{code:'JPY', locale:'ja-JP', rate:9.0},
  CNY:{code:'CNY', locale:'zh-CN', rate:180},
  TRY:{code:'TRY', locale:'tr-TR', rate:33},
  RUB:{code:'RUB', locale:'ru-RU', rate:90},
  GBP:{code:'GBP', locale:'en-GB', rate:1700},
  AED:{code:'AED', locale:'ar-AE', rate:355},
  CAD:{code:'CAD', locale:'en-CA', rate:970},
};

const LANG_TO_CUR = {
  EN:'USD',    // default
  KO:'KRW',
  JA:'JPY',
  ZH:'CNY',
  FR:'EUR',
  ES:'EUR',
  DE:'EUR',
  IT:'EUR',
  TR:'TRY',
  RU:'RUB',
  AR:'AED',
};

/* Money formatters (KRW source → target currency by lang) */
function getLangCode(){
  const v = (document.getElementById('lang')?.value
          || document.getElementById('langSelect')?.value
          || localStorage.getItem('sw_lang') || 'EN').toUpperCase();
  return v.length>2 ? v.slice(0,2) : v; // normalize to 2 letters
}
function getCurrencyForLang(lang2){
  const cur = CURRENCIES[ LANG_TO_CUR[lang2] || 'USD' ];
  return cur || CURRENCIES.USD;
}
/** KRW → display currency number */
function krwToDisplay(krw, lang2){
  const cur = getCurrencyForLang(lang2);
  return krw / (cur.rate || 1);
}
function fmtMoneyKRWtoDisplay(krw, lang2){
  const cur = getCurrencyForLang(lang2);
  const val = krwToDisplay(krw, lang2);
  // KRW/JPY는 0자리, 그 외도 회원 등급 임계값은 0자리 표기로 통일
  const maxFrac = 0;
  return new Intl.NumberFormat(cur.locale, { style:'currency', currency:cur.code, maximumFractionDigits:maxFrac }).format(val);
}

/* -------- CONFIG -------- */
const LEVELS = [
  { name:'Bronze',   min:       0, rate: 0  },
  { name:'Silver',   min:  500_000, rate: 3  },
  { name:'Gold',     min:2_000_000, rate: 5  },
  { name:'Platinum', min:4_000_000, rate: 7  },
  { name:'Diamond',  min:7_500_000, rate:10  },
  { name:'Elite',    min:15_000_000, rate:15, manual:true }
];
const DOWNGRADE_DAYS = 60;

/* -------- i18n (10개 언어) -------- */
const T = {
  EN:{
    inherit:'Upper tiers include all benefits of lower tiers.',
    your:'Your Tier',
    toNext:(rem,lang)=>`${fmtMoneyKRWtoDisplay(rem,lang)} to next tier. Auto-downgrade after 60 days of no bookings.`,
    top:'Top tier (Elite). Auto-downgrade by 1 level after 60 days of no bookings.',
    note:(days)=>`If there is no booking for ${days} days, your tier will auto-downgrade by 1 level.`,
    d30:'📢 Auto downgrade in 30 days. Keep your tier by booking.',
    d15:'⚠️ Auto downgrade in 15 days. Stay active.',
    d7 :'⏳ Auto downgrade in 7 days. Book soon!',
    d1 :'🚨 Auto downgrade tomorrow! Complete a booking today.'
  },
  KO:{
    inherit:'상위 등급은 하위 등급의 모든 혜택을 포함합니다.',
    your:'내 등급',
    toNext:(rem,lang)=>`다음 등급까지 ${fmtMoneyKRWtoDisplay(rem,lang)} 남았어요. 60일 예약 없으면 자동 1단계 강등.`,
    top:'최상위 등급(Elite). 60일 예약 없으면 자동 1단계 강등.',
    note:(days)=>`예약이 ${days}일 동안 없으면 등급이 1단계 자동 강등됩니다.`,
    d30:'📢 30일 후 자동 강등 예정입니다. 지금 예약하면 유지됩니다.',
    d15:'⚠️ 15일 후 자동 강등 예정입니다. 활동을 유지하세요.',
    d7 :'⏳ 7일 후 자동 강등 예정입니다. 서둘러 예약하세요!',
    d1 :'🚨 내일 자동 강등됩니다! 오늘 예약을 완료하세요.'
  },
  JA:{
    inherit:'上位ティアには下位ティアの特典がすべて含まれます。',
    your:'あなたのティア',
    toNext:(rem,lang)=>`次のティアまで ${fmtMoneyKRWtoDisplay(rem,lang)}。60日予約がない場合は自動で1段階降格。`,
    top:'最上位（Elite）。60日予約がない場合は自動で1段階降格。',
    note:(d)=>`${d}日間予約がない場合、ティアは1段階自動降格します。`,
    d30:'📢 30日後に自動降格します。予約で維持しましょう。',
    d15:'⚠️ 15日後に自動降格します。アクティブに！',
    d7 :'⏳ 7日後に自動降格します。お早めに予約を！',
    d1 :'🚨 明日自動降格！本日中に予約を完了してください。'
  },
  ZH:{
    inherit:'高等级包含所有低等级的权益。',
    your:'您的等级',
    toNext:(rem,lang)=>`距离下一等级还差 ${fmtMoneyKRWtoDisplay(rem,lang)}。若连续60天未预订将自动降一级。`,
    top:'最高等级（Elite）。若连续60天未预订将自动降一级。',
    note:(d)=>`若${d}天内没有预订，您的等级将自动降低一级。`,
    d30:'📢 30天后将自动降级。尽快预订以保持等级。',
    d15:'⚠️ 15天后将自动降级。请保持活跃。',
    d7 :'⏳ 7天后将自动降级。尽快预订！',
    d1 :'🚨 明天将自动降级！请今天完成预订。'
  },
  FR:{
    inherit:'Les niveaux supérieurs incluent tous les avantages des niveaux inférieurs.',
    your:'Votre niveau',
    toNext:(rem,lang)=>`${fmtMoneyKRWtoDisplay(rem,lang)} pour atteindre le prochain niveau. Rétrogradation automatique après 60 jours sans réservation.`,
    top:'Niveau maximal (Elite). Rétrogradation d’un niveau après 60 jours sans réservation.',
    note:(d)=>`S’il n’y a aucune réservation pendant ${d} jours, votre niveau sera rétrogradé d’un cran.`,
    d30:'📢 Rétrogradation dans 30 jours. Conservez votre niveau en réservant.',
    d15:'⚠️ Rétrogradation dans 15 jours. Restez actif.',
    d7 :'⏳ Rétrogradation dans 7 jours. Réservez vite !',
    d1 :'🚨 Rétrogradation demain ! Finalisez une réservation dès aujourd’hui.'
  },
  ES:{
    inherit:'Los niveles superiores incluyen todos los beneficios de los inferiores.',
    your:'Tu nivel',
    toNext:(rem,lang)=>`${fmtMoneyKRWtoDisplay(rem,lang)} para el siguiente nivel. Degradación automática tras 60 días sin reservas.`,
    top:'Nivel más alto (Elite). Degradación automática de 1 nivel tras 60 días sin reservas.',
    note:(d)=>`Si no hay reservas durante ${d} días, tu nivel bajará 1 nivel automáticamente.`,
    d30:'📢 Degradación en 30 días. Mantén tu nivel reservando.',
    d15:'⚠️ Degradación en 15 días. Mantente activo.',
    d7 :'⏳ Degradación en 7 días. ¡Reserva pronto!',
    d1 :'🚨 ¡Mañana se degrada! Completa una reserva hoy.'
  },
  DE:{
    inherit:'Höhere Stufen beinhalten alle Vorteile der niedrigeren.',
    your:'Deine Stufe',
    toNext:(rem,lang)=>`${fmtMoneyKRWtoDisplay(rem,lang)} bis zur nächsten Stufe. Automatische Herabstufung nach 60 Tagen ohne Buchung.`,
    top:'Höchste Stufe (Elite). Herabstufung um 1 Stufe nach 60 Tagen ohne Buchung.',
    note:(d)=>`Ohne Buchung innerhalb von ${d} Tagen wird deine Stufe automatisch um 1 herabgestuft.`,
    d30:'📢 Herabstufung in 30 Tagen. Stufe durch Buchung sichern.',
    d15:'⚠️ Herabstufung in 15 Tagen. Aktiv bleiben.',
    d7 :'⏳ Herabstufung in 7 Tagen. Bald buchen!',
    d1 :'🚨 Morgen Herabstufung! Heute buchen.'
  },
  IT:{
    inherit:'I livelli superiori includono tutti i vantaggi dei livelli inferiori.',
    your:'Il tuo livello',
    toNext:(rem,lang)=>`${fmtMoneyKRWtoDisplay(rem,lang)} al prossimo livello. Retrocessione automatica dopo 60 giorni senza prenotazioni.`,
    top:'Livello massimo (Elite). Retrocessione di 1 livello dopo 60 giorni senza prenotazioni.',
    note:(d)=>`Se non ci sono prenotazioni per ${d} giorni, il livello verrà retrocesso di 1.`,
    d30:'📢 Retrocessione tra 30 giorni. Mantieni il livello prenotando.',
    d15:'⚠️ Retrocessione tra 15 giorni. Rimani attivo.',
    d7 :'⏳ Retrocessione tra 7 giorni. Prenota presto!',
    d1 :'🚨 Retrocessione domani! Completa una prenotazione oggi.'
  },
  TR:{
    inherit:'Üst seviyeler, alt seviyelerin tüm avantajlarını içerir.',
    your:'Seviyen',
    toNext:(rem,lang)=>`Sonraki seviyeye ${fmtMoneyKRWtoDisplay(rem,lang)} kaldı. 60 gün rezervasyon yoksa otomatik 1 seviye düşer.`,
    top:'En üst seviye (Elite). 60 gün rezervasyon yoksa 1 seviye düşürülür.',
    note:(d)=>`${d} gün rezervasyon olmazsa, seviyen otomatik olarak 1 düşer.`,
    d30:'📢 30 gün içinde seviye düşürülecek. Rezervasyonla koru.',
    d15:'⚠️ 15 gün içinde seviye düşürülecek. Aktif kal.',
    d7 :'⏳ 7 gün içinde seviye düşürülecek. Yakında rezervasyon yap!',
    d1 :'🚨 Yarın seviye düşürülecek! Bugün rezervasyonu tamamla.'
  },
  RU:{
    inherit:'Высшие уровни включают все преимущества нижних.',
    your:'Ваш уровень',
    toNext:(rem,lang)=>`${fmtMoneyKRWtoDisplay(rem,lang)} до следующего уровня. Автопонижение через 60 дней без бронирований.`,
    top:'Максимальный уровень (Elite). Понижение на 1 уровень через 60 дней без бронирований.',
    note:(d)=>`Если нет бронирований ${d} дней, ваш уровень автоматически снизится на 1.`,
    d30:'📢 Понижение через 30 дней. Сохраните уровень, оформив бронь.',
    d15:'⚠️ Понижение через 15 дней. Оставайтесь активными.',
    d7 :'⏳ Понижение через 7 дней. Забронируйте скоро!',
    d1 :'🚨 Понижение завтра! Завершите бронь сегодня.'
  },
  AR:{
    inherit:'تشمل المستويات الأعلى جميع مزايا المستويات الأدنى.',
    your:'مستواك',
    toNext:(rem,lang)=>`${fmtMoneyKRWtoDisplay(rem,lang)} للوصول إلى المستوى التالي. سيتم خفض المستوى تلقائيًا بعد 60 يومًا دون حجز.`,
    top:'أعلى مستوى (Elite). يتم الخفض بمستوى واحد بعد 60 يومًا دون حجز.',
    note:(d)=>`إذا لم يتم إجراء حجز لمدة ${d} يومًا، سيتم خفض مستواك تلقائيًا مستوى واحدًا.`,
    d30:'📢 سيتم الخفض خلال 30 يومًا. احفظ مستواك بالحجز.',
    d15:'⚠️ سيتم الخفض خلال 15 يومًا. ابقَ نشطًا.',
    d7 :'⏳ سيتم الخفض خلال 7 أيام. سارع بالحجز!',
    d1 :'🚨 سيتم الخفض غدًا! أكمِل حجزك اليوم.'
  },
};

/* -------- Benefits (inherit) -------- */
const BENEFITS = {
  EN:{
    Bronze:[['🛡️','Basic support'],['💳','Secure card/crypto payments']],
    Silver:[['🎁','Welcome coupon'],['📞','Priority email support (business hours)']],
    Gold:[['💸','5% rewards back'],['⏰','Late checkout when available']],
    Platinum:[['🚗','Airport shuttle partner discounts'],['🧾','Business invoice support (B2B)']],
    Diamond:[['💼','Dedicated concierge (chat)'],['⬆️','Complimentary upgrade when available']],
    Elite:[['👑','Invite-only experiences & VIP support']]
  },
  KO:{
    Bronze:[['🛡️','기본 고객지원'],['💳','안전한 카드/크립토 결제']],
    Silver:[['🎁','웰컴 쿠폰'],['📞','우선 이메일 응대(영업시간)']],
    Gold:[['💸','리워즈 5% 적립'],['⏰','가능 시 레이트 체크아웃']],
    Platinum:[['🚗','공항 셔틀 제휴 할인'],['🧾','B2B 세금계산서 지원']],
    Diamond:[['💼','전담 컨시어지(채팅)'],['⬆️','가능 시 무료 업그레이드']],
    Elite:[['👑','초청형 경험 & VIP 지원']]
  }
};
function benefitList(lang2, tier){
  const lang = BENEFITS[lang2] ? lang2 : 'EN';
  const order = ['Bronze','Silver','Gold','Platinum','Diamond','Elite'];
  const idx = order.indexOf(tier);
  const acc = [];
  for(let i=0;i<=idx;i++){
    (BENEFITS[lang][order[i]] || []).forEach(b=> acc.push(b));
  }
  return acc;
}

/* -------- Helpers -------- */
function $(s,sc){return (sc||document).querySelector(s);}
function $all(s,sc){return (sc||document).querySelectorAll(s);}

/* -------- Level compute (KRW) -------- */
function computeLevel(totalSpentKRW, lastBookingISO){
  let base = 0;
  for (let i=0;i<LEVELS.length;i++){
    if (totalSpentKRW >= LEVELS[i].min) base = i;
  }
  if (lastBookingISO){
    const diffDays = Math.floor((Date.now()-new Date(lastBookingISO).getTime())/86400000);
    if (diffDays >= DOWNGRADE_DAYS) base = Math.max(0, base-1);
  }
  return base;
}
function remainingToNext(totalSpentKRW, levelIdx){
  if (levelIdx >= LEVELS.length-1) return null;
  return Math.max(0, LEVELS[levelIdx+1].min - totalSpentKRW);
}

/* -------- UI -------- */
function applyLevelUI(levelIdx, totalSpentKRW){
  const lang2 = getLangCode();
  const L = T[lang2] || T.EN;

  $('#inheritNote')?.textContent = L.inherit;
  $('#levelTitle')?.textContent  = L.your;

  const rem = remainingToNext(totalSpentKRW, levelIdx);
  const txt = $('#levelProgressText');
  let pct = 100;
  if (rem !== null){
    const curr = LEVELS[levelIdx].min;
    const next = LEVELS[levelIdx+1].min;
    pct = Math.min(100, Math.max(0, Math.round(((totalSpentKRW-curr)/(next-curr))*100)));
    if (txt) txt.textContent = L.toNext(rem, lang2);
  } else {
    if (txt) txt.textContent = L.top;
  }
  const gauge = document.querySelector('.card .bg-[var(--gold)].h-2')
             || $all('.w-full.bg-white\\/10.rounded-full.h-2')[0]?.querySelector('.h-2');
  const pctEl = $('.text-right.text-xs.text-white\\/60.mt-1');
  if (gauge) gauge.style.width = pct+'%';
  if (pctEl) pctEl.textContent = pct+'%';

  const order = ['Bronze','Silver','Gold','Platinum','Diamond','Elite'];
  $all('#tiersGrid [data-tier]').forEach(card=>{
    const name = card.getAttribute('data-tier');
    const idx  = order.indexOf(name);
    card.classList.toggle('tier-active', idx===levelIdx);
    card.classList.toggle('tier-muted',  idx>levelIdx);

    const wrap = card.querySelector('.benefits');
    if (wrap){
      wrap.innerHTML = '';
      benefitList(lang2, name).forEach(([icon, text])=>{
        const el = document.createElement('div');
        el.className = 'benefit';
        el.innerHTML = `<i>${icon}</i><span>${text}</span>`;
        wrap.appendChild(el);
      });
      // 승급 기준(언어별 통화로 표시)
      const guide = document.createElement('div');
      guide.className = 'note'; guide.style.marginTop='6px';
      const msg = lang2==='KO' ? `승급 기준: ${fmtMoneyKRWtoDisplay(LEVELS[idx].min, lang2)} 이상 누적 결제`
                               : `Upgrade threshold: ${fmtMoneyKRWtoDisplay(LEVELS[idx].min, lang2)} total spent`;
      guide.textContent = msg;
      wrap.appendChild(guide);
    }
  });

  $('#downgradeNote')?.textContent = (T[lang2]||T.EN).note(DOWNGRADE_DAYS);
}

/* -------- Alerts -------- */
function showDowngradeAlert(daysLeft){
  const lang2=getLangCode(), L=T[lang2]||T.EN;
  const map={30:L.d30,15:L.d15,7:L.d7,1:L.d1};
  const msg=map[daysLeft]; if(!msg) return;
  const el=document.createElement('div');
  el.className="fixed bottom-5 right-5 bg-red-600 text-white px-4 py-3 rounded-xl shadow-lg z-50";
  el.textContent=msg; document.body.appendChild(el);
  setTimeout(()=>el.remove(),8000);
}

/* -------- Public API -------- */
function setUserContext({ totalSpentKRW, lastBookingISO }){
  const idx = computeLevel(totalSpentKRW, lastBookingISO);
  applyLevelUI(idx, totalSpentKRW);
  if (lastBookingISO){
    const d = Math.floor((Date.now()-new Date(lastBookingISO).getTime())/86400000);
    const left = DOWNGRADE_DAYS - d;
    if ([30,15,7,1].includes(left)) showDowngradeAlert(left);
  }
}
window.setUserContext = setUserContext;

/* Re-apply when language changes on this page */
document.addEventListener('change', (e)=>{
  if (e.target && (e.target.id==='lang' || e.target.id==='langSelect')){
    // 유지: 최근 저장된 사용자 값으로 다시 그리기
    let u = {};
    try{ u = JSON.parse(localStorage.getItem('sw_user')||'{}'); }catch(_){}
    setUserContext({
      totalSpentKRW: Number.isFinite(u.totalSpentKRW)?u.totalSpentKRW:0,
      lastBookingISO: u.lastBookingISO||null
    });
  }
});
