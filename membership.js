/* =========================================
   STAYWORLD Membership — 10-language version
   - Higher tier inherits lower-tier benefits
   - Level by total spent (KRW)
   - Auto-downgrade 1 level if no booking >= 60 days
   - Gauge + current tier highlight
   - Alerts at D-30, D-15, D-7, D-1
   - i18n: EN, KO, JA, ZH, FR, ES, DE, TR, AR, RU (fallback EN)
   ========================================= */

const LEVELS = [
  { name:'Bronze',   min:       0, rate: 0  },
  { name:'Silver',   min:  500_000, rate: 3  },
  { name:'Gold',     min:2_000_000, rate: 5  },
  { name:'Platinum', min:4_000_000, rate: 7  },
  { name:'Diamond',  min:7_500_000, rate:10  },
  { name:'Elite',    min:15_000_000, rate:15, manual:true }
];

const DOWNGRADE_DAYS = 60;

/* ------------ i18n texts (UI) ------------ */
const TXT = {
  en:{ yourTier:'Your Tier', inherit:'Upper tiers include all benefits of lower tiers.',
    downgrade:`If there is no booking for ${DOWNGRADE_DAYS} days, your tier will auto-downgrade by 1 level.`,
    top:(r)=>`Top tier (${r}% back).`,
    toNext:(rem)=>`₩${rem.toLocaleString('en-KR')} to next tier. Auto-downgrade after ${DOWNGRADE_DAYS} days of no bookings.`,
    d30:'📢 Auto downgrade in 30 days. Keep your tier by booking.',
    d15:'⚠️ Auto downgrade in 15 days. Stay active.',
    d7:'⏳ Auto downgrade in 7 days. Book soon!',
    d1:'🚨 Auto downgrade tomorrow! Complete a booking today.',
    pct:(n)=>`${n}%`
  },
  ko:{ yourTier:'내 등급', inherit:'상위 등급은 하위 등급의 혜택을 모두 포함합니다.',
    downgrade:`${DOWNGRADE_DAYS}일 동안 예약이 없으면 등급이 자동으로 1단계 강등됩니다.`,
    top:(r)=>`최상위 등급 (${r}% 적립).`,
    toNext:(rem)=>`다음 등급까지 ₩${rem.toLocaleString('ko-KR')} 남았어요. ${DOWNGRADE_DAYS}일 예약 없으면 자동 1단계 강등.`,
    d30:'📢 30일 후 자동 강등 예정입니다. 지금 예약하면 유지됩니다.',
    d15:'⚠️ 15일 후 자동 강등 예정입니다. 활동을 유지하세요.',
    d7:'⏳ 7일 후 자동 강등 예정입니다. 서둘러 예약하세요!',
    d1:'🚨 내일 자동 강등됩니다! 오늘 예약을 완료하세요.',
    pct:(n)=>`${n}%`
  },
  ja:{ yourTier:'あなたのティア', inherit:'上位ティアは下位ティアの特典をすべて含みます。',
    downgrade:`${DOWNGRADE_DAYS}日間予約がない場合、1段階自動で降格します。`,
    top:(r)=>`最上位ティア（${r}%還元）。`,
    toNext:(rem)=>`次のティアまで ₩${rem.toLocaleString('ja-JP')}。${DOWNGRADE_DAYS}日間予約なしで自動降格。`,
    d30:'📢 30日後に自動降格します。予約で維持しましょう。',
    d15:'⚠️ 15日後に自動降格予定。アクティブに！',
    d7:'⏳ 7日後に自動降格。お早めに予約！',
    d1:'🚨 明日自動降格！本日中に予約してください。',
    pct:(n)=>`${n}%`
  },
  zh:{ yourTier:'您的等级', inherit:'高等级包含所有低等级权益。',
    downgrade:`若 ${DOWNGRADE_DAYS} 天无预订，等级将自动下降 1 级。`,
    top:(r)=>`最高等级（返利 ${r}%）。`,
    toNext:(rem)=>`距离下一等级还差 ₩${rem.toLocaleString('zh-CN')}。${DOWNGRADE_DAYS} 天无预订将自动降级。`,
    d30:'📢 30 天后将自动降级，请尽快预订。',
    d15:'⚠️ 15 天后将自动降级，保持活跃。',
    d7:'⏳ 7 天后将自动降级，尽快预订！',
    d1:'🚨 明天将自动降级！请今天完成预订。',
    pct:(n)=>`${n}%`
  },
  fr:{ yourTier:'Votre niveau', inherit:'Les niveaux supérieurs incluent les avantages des niveaux inférieurs.',
    downgrade:`Sans réservation pendant ${DOWNGRADE_DAYS} jours, rétrogradation automatique d’un niveau.`,
    top:(r)=>`Niveau supérieur (${r}% de retour).`,
    toNext:(rem)=>`₩${rem.toLocaleString('fr-FR')} avant le prochain niveau. Rétrogradation automatique après ${DOWNGRADE_DAYS} jours sans réservation.`,
    d30:'📢 Rétrogradation dans 30 jours. Conservez votre niveau en réservant.',
    d15:'⚠️ Rétrogradation dans 15 jours. Restez actif.',
    d7:'⏳ Rétrogradation dans 7 jours. Réservez vite !',
    d1:'🚨 Rétrogradation demain ! Finalisez une réservation aujourd’hui.',
    pct:(n)=>`${n}%`
  },
  es:{ yourTier:'Tu nivel', inherit:'Los niveles superiores incluyen los beneficios de los inferiores.',
    downgrade:`Si no hay reservas durante ${DOWNGRADE_DAYS} días, bajarás 1 nivel automáticamente.`,
    top:(r)=>`Nivel superior (${r}% de devolución).`,
    toNext:(rem)=>`₩${rem.toLocaleString('es-ES')} para el siguiente nivel. Degradación automática tras ${DOWNGRADE_DAYS} días sin reservas.`,
    d30:'📢 Degradación en 30 días. Mantén tu nivel reservando.',
    d15:'⚠️ Degradación en 15 días. Mantente activo.',
    d7:'⏳ Degradación en 7 días. ¡Reserva pronto!',
    d1:'🚨 Mañana se degrada automáticamente. Reserva hoy.',
    pct:(n)=>`${n}%`
  },
  de:{ yourTier:'Dein Level', inherit:'Höhere Stufen beinhalten alle Vorteile der niedrigeren.',
    downgrade:`Ohne Buchung für ${DOWNGRADE_DAYS} Tage erfolgt eine automatische Herabstufung um 1 Stufe.`,
    top:(r)=>`Oberste Stufe (${r}% zurück).`,
    toNext:(rem)=>`₩${rem.toLocaleString('de-DE')} bis zur nächsten Stufe. Automatische Herabstufung nach ${DOWNGRADE_DAYS} Tagen ohne Buchung.`,
    d30:'📢 Herabstufung in 30 Tagen. Halte dein Level mit einer Buchung.',
    d15:'⚠️ Herabstufung in 15 Tagen. Bleib aktiv.',
    d7:'⏳ Herabstufung in 7 Tagen. Bald buchen!',
    d1:'🚨 Morgen automatische Herabstufung! Heute buchen.',
    pct:(n)=>`${n}%`
  },
  tr:{ yourTier:'Seviyeniz', inherit:'Üst seviyeler alt seviyelerin tüm avantajlarını içerir.',
    downgrade:`${DOWNGRADE_DAYS} gün rezervasyon yoksa seviye 1 düşer.`,
    top:(r)=>`En üst seviye (%${r} geri).`,
    toNext:(rem)=>`Sonraki seviye için ₩${rem.toLocaleString('tr-TR')}. ${DOWNGRADE_DAYS} gün rezervasyon olmazsa otomatik düşüş.`,
    d30:'📢 30 gün içinde otomatik düşüş. Rezervasyonla koruyun.',
    d15:'⚠️ 15 gün içinde otomatik düşüş. Aktif kalın.',
    d7:'⏳ 7 gün içinde otomatik düşüş. Yakında rezervasyon yapın!',
    d1:'🚨 Yarın otomatik düşüş! Bugün rezervasyon yapın.',
    pct:(n)=>`%${n}`
  },
  ar:{ yourTier:'مستواك', inherit:'المستويات الأعلى تشمل مزايا المستويات الأدنى.',
    downgrade:`في حال عدم وجود حجز لمدة ${DOWNGRADE_DAYS} يومًا سيتم خفض المستوى تلقائيًا درجة واحدة.`,
    top:(r)=>`أعلى مستوى (استرداد ${r}%).`,
    toNext:(rem)=>`₩${rem.toLocaleString('ar-EG')} للوصول إلى المستوى التالي. خفض تلقائي بعد ${DOWNGRADE_DAYS} يومًا بدون حجز.`,
    d30:'📢 سيتم الخفض خلال 30 يومًا. احجز للحفاظ على المستوى.',
    d15:'⚠️ سيتم الخفض خلال 15 يومًا. كن نشطًا.',
    d7:'⏳ سيتم الخفض خلال 7 أيام. بادر بالحجز!',
    d1:'🚨 سيتم الخفض غدًا! أكمل الحجز اليوم.',
    pct:(n)=>`${n}%`
  },
  ru:{ yourTier:'Ваш уровень', inherit:'Высшие уровни включают все преимущества нижних.',
    downgrade:`Если нет бронирований ${DOWNGRADE_DAYS} дней, происходит авто-понижение на 1 уровень.`,
    top:(r)=>`Высший уровень (кешбэк ${r}%).`,
    toNext:(rem)=>`₩${rem.toLocaleString('ru-RU')} до следующего уровня. Автопонижение после ${DOWNGRADE_DAYS} дней без бронирований.`,
    d30:'📢 Понижение через 30 дней. Сохраните уровень, оформив бронирование.',
    d15:'⚠️ Понижение через 15 дней. Оставайтесь активны.',
    d7:'⏳ Понижение через 7 дней. Забронируйте скоро!',
    d1:'🚨 Понижение завтра! Забронируйте сегодня.',
    pct:(n)=>`${n}%`
  },
};

/* -------- benefits per language (raw, before inheritance) -------- */
const RAW_BENEFITS = {
  en:{
    Bronze:[['🛡️','Basic support'],['💳','Secure card/crypto payments']],
    Silver:[['💰','3% points back on stays'],['⏱️','Priority email support']],
    Gold:[['🕒','Early check-in / Late check-out (if available)'],['💼','Invoice available for business']],
    Platinum:[['⬆️','Complimentary room upgrade (subject to availability)'],['📞','Priority chat/phone support']],
    Diamond:[['🎟️','VIP lounge/event access (selected cities)'],['🚗','Airport shuttle discount']],
    Elite:[['👤','Dedicated concierge manager'],['🎁','Exclusive partner perks & invitations']],
  },
  ko:{
    Bronze:[['🛡️','기본 고객지원'],['💳','카드/크립토 안전 결제']],
    Silver:[['💰','숙박 3% 포인트 적립'],['⏱️','우선 이메일 응대']],
    Gold:[['🕒','얼리 체크인/레이트 체크아웃(가능 시)'],['💼','비즈니스 인보이스 발급']],
    Platinum:[['⬆️','무료 객실 업그레이드(가능 시)'],['📞','우선 채팅/전화 지원']],
    Diamond:[['🎟️','VIP 라운지/행사 이용(일부 도시)'],['🚗','공항 셔틀 할인']],
    Elite:[['👤','전담 컨시어지 매니저'],['🎁','제휴사 한정 특전 & 초대']],
  },
  ja:{
    Bronze:[['🛡️','基本サポート'],['💳','カード/暗号資産の安全決済']],
    Silver:[['💰','宿泊3%ポイント還元'],['⏱️','優先メール対応']],
    Gold:[['🕒','アーリーチェックイン/レイトチェックアウト(空き状況により)'],['💼','ビジネス請求書発行']],
    Platinum:[['⬆️','無料アップグレード(空き状況により)'],['📞','優先チャット/電話サポート']],
    Diamond:[['🎟️','VIPラウンジ/イベント(一部都市)'],['🚗','空港シャトル割引']],
    Elite:[['👤','専任コンシェルジュ'],['🎁','限定パートナー特典・招待']],
  },
  zh:{
    Bronze:[['🛡️','基础客服'],['💳','银行卡/加密货币安全支付']],
    Silver:[['💰','住宿 3% 积分返还'],['⏱️','优先邮件支持']],
    Gold:[['🕒','提前入住/延迟退房（视房态）'],['💼','商务发票可开']],
    Platinum:[['⬆️','免费升房（视房态）'],['📞','优先聊天/电话支持']],
    Diamond:[['🎟️','VIP 休息室/活动（部分城市）'],['🚗','机场接驳优惠']],
    Elite:[['👤','专属礼宾经理'],['🎁','独家合作礼遇与邀约']],
  },
  fr:{
    Bronze:[['🛡️','Assistance basique'],['💳','Paiements sécurisés carte/crypto']],
    Silver:[['💰','3% de points sur les séjours'],['⏱️','Support e-mail prioritaire']],
    Gold:[['🕒','Arrivée anticipée / départ tardif (selon dispo)'],['💼','Facture pour entreprise']],
    Platinum:[['⬆️',' surclassement offert (selon dispo)'],['📞','Support chat/téléphone prioritaire']],
    Diamond:[['🎟️','Accès VIP lounge/événements (villes sélectionnées)'],['🚗','Réduction navette aéroport']],
    Elite:[['👤','Concierge dédié'],['🎁','Avantages exclusifs partenaires & invitations']],
  },
  es:{
    Bronze:[['🛡️','Soporte básico'],['💳','Pagos seguros con tarjeta/cripto']],
    Silver:[['💰','3% de puntos en estancias'],['⏱️','Soporte por correo prioritario']],
    Gold:[['🕒','Early check-in / Late check-out (según disponibilidad)'],['💼','Factura para negocios']],
    Platinum:[['⬆️','Upgrade gratuito (según disponibilidad)'],['📞','Soporte prioritario chat/teléfono']],
    Diamond:[['🎟️','Acceso VIP a lounge/eventos (ciudades seleccionadas)'],['🚗','Descuento en shuttle al aeropuerto']],
    Elite:[['👤','Conserje dedicado'],['🎁','Beneficios e invitaciones exclusivas']],
  },
  de:{
    Bronze:[['🛡️','Basissupport'],['💳','Sichere Karten/Krypto-Zahlungen']],
    Silver:[['💰','3% Punkte auf Aufenthalte'],['⏱️','Priorisierter E-Mail-Support']],
    Gold:[['🕒','Früher Check-in/Später Check-out (wenn möglich)'],['💼','Rechnung für Geschäftskunden']],
    Platinum:[['⬆️','Kostenloses Upgrade (nach Verfügbarkeit)'],['📞','Priorisierter Chat/Telefon-Support']],
    Diamond:[['🎟️','VIP-Lounge/Events (ausgewählte Städte)'],['🚗','Rabatt auf Airport-Shuttle']],
    Elite:[['👤','Persönlicher Concierge'],['🎁','Exklusive Partner-Vorteile & Einladungen']],
  },
  tr:{
    Bronze:[['🛡️','Temel destek'],['💳','Kart/kripto güvenli ödeme']],
    Silver:[['💰','Konaklamalarda %3 puan'],['⏱️','Öncelikli e-posta desteği']],
    Gold:[['🕒','Erken giriş/Geç çıkış (mümkünse)'],['💼','İş faturası mümkün']],
    Platinum:[['⬆️','Ücretsiz oda yükseltme (mümkünse)'],['📞','Öncelikli sohbet/telefon desteği']],
    Diamond:[['🎟️','VIP lounge/etkinlik erişimi (seçili şehirler)'],['🚗','Havaalanı servisi indirimi']],
    Elite:[['👤','Özel konsiyerj yönetici'],['🎁','Özel partner ayrıcalıkları & davetler']],
  },
  ar:{
    Bronze:[['🛡️','دعم أساسي'],['💳','مدفوعات آمنة بالبطاقة/العملات المشفرة']],
    Silver:[['💰','استرجاع نقاط 3% على الإقامات'],['⏱️','دعم بريد إلكتروني ذو أولوية']],
    Gold:[['🕒','تسجيل دخول مبكر/مغادرة متأخرة (حسب التوفر)'],['💼','فاتورة للأعمال']],
    Platinum:[['⬆️','ترقية مجانية للغرفة (حسب التوفر)'],['📞','دعم دردشة/هاتف أولوية']],
    Diamond:[['🎟️','دخول صالة/فعاليات VIP (مدن مختارة)'],['🚗','خصم على مواصلات المطار']],
    Elite:[['👤','مدير كونسيرج مخصص'],['🎁','امتيازات وشراكات حصرية ودعوات']],
  },
  ru:{
    Bronze:[['🛡️','Базовая поддержка'],['💳','Безопасные платежи картой/крипто']],
    Silver:[['💰','3% баллов за проживание'],['⏱️','Приоритетная поддержка по e-mail']],
    Gold:[['🕒','Ранний заезд/поздний выезд (при наличии)'],['💼','Счёт для бизнеса']],
    Platinum:[['⬆️','Бесплатный апгрейд (при наличии)'],['📞','Приоритетная поддержка чат/телефон']],
    Diamond:[['🎟️','Доступ в VIP-лаунж/мероприятия (некоторые города)'],['🚗','Скидка на трансфер из аэропорта']],
    Elite:[['👤','Персональный консьерж-менеджер'],['🎁','Эксклюзивные привилегии и приглашения партнёров']],
  },
};

/* ---------- language helpers ---------- */
function currentLang(){
  const sel = document.getElementById('lang') || document.getElementById('langSelect');
  let c = (sel && sel.value) || localStorage.getItem('sw_lang') || 'EN';
  c = String(c).toLowerCase();
  if (c.startsWith('en')) return 'en';
  if (c.startsWith('ko')) return 'ko';
  if (c.startsWith('ja')) return 'ja';
  if (c.startsWith('zh')) return 'zh';
  if (c.startsWith('fr')) return 'fr';
  if (c.startsWith('es')) return 'es';
  if (c.startsWith('de')) return 'de';
  if (c.startsWith('tr')) return 'tr';
  if (c.startsWith('ar')) return 'ar';
  if (c.startsWith('ru')) return 'ru';
  return 'en';
}
const $ = (s,sc)=> (sc||document).querySelector(s);
const $$ = (s,sc)=> Array.from((sc||document).querySelectorAll(s));

/* ---------- level math ---------- */
function computeLevel(totalSpentKRW, lastBookingISO){
  let base = 0;
  for (let i=0;i<LEVELS.length;i++) if (totalSpentKRW >= LEVELS[i].min) base = i;
  if (lastBookingISO){
    const d = Math.floor((Date.now() - new Date(lastBookingISO).getTime())/86400000);
    if (d >= DOWNGRADE_DAYS) base = Math.max(0, base-1);
  }
  return base;
}
function remainingToNext(totalSpentKRW, idx){
  if (idx >= LEVELS.length-1) return null;
  const nextMin = LEVELS[idx+1].min;
  return Math.max(0, nextMin - totalSpentKRW);
}

/* ---------- benefits render (with inheritance) ---------- */
function renderBenefits(){
  const lang = currentLang();
  const dict = RAW_BENEFITS[lang] || RAW_BENEFITS.en;

  // build inherited list per level
  const inherited = {};
  LEVELS.forEach((lvl, i)=>{
    const lower = i===0 ? [] : inherited[LEVELS[i-1].name].slice();
    const mine = (dict[lvl.name]||[]).map(([icon,text])=>({icon,text}));
    inherited[lvl.name] = [...lower, ...mine];
  });

  $$('#tiersGrid [data-tier]').forEach(card=>{
    const name = card.getAttribute('data-tier');
    const bin = card.querySelector('.benefits');
    const items = inherited[name] || [];
    bin.innerHTML = items.map(b=>`<div class="benefit"><i>${b.icon}</i><span>${b.text}</span></div>`).join('');
  });
}

/* ---------- UI apply ---------- */
function applyLevelUI(levelIdx, totalSpentKRW){
  const lang = currentLang();
  const t = TXT[lang] || TXT.en;
  const lvl = LEVELS[levelIdx];

  const h = $('#levelTitle'); if (h) h.textContent = t.yourTier;

  const rem = remainingToNext(totalSpentKRW, levelIdx);
  const textEl = $('#levelProgressText');

  let pct = 100;
  if (rem !== null){
    const currMin = LEVELS[levelIdx].min, nextMin = LEVELS[levelIdx+1].min;
    pct = Math.min(100, Math.max(0, Math.round(((totalSpentKRW - currMin)/(nextMin - currMin))*100)));
    if (textEl) textEl.textContent = t.toNext(rem);
  } else {
    if (textEl) textEl.textContent = t.top(lvl.rate);
  }

  let gauge = document.querySelector('.card .bg-[var(--gold)].h-2');
  if (!gauge){
    const cont = $('.w-full.bg-white\\/10.rounded-full.h-2');
    if (cont) gauge = cont.querySelector('.h-2');
  }
  if (gauge) gauge.style.width = pct+'%';

  const pctEl = $('.text-right.text-xs.text-white\\/60.mt-1');
  if (pctEl) pctEl.textContent = t.pct(pct);

  // highlight cards
  $$('#tiersGrid [data-tier]').forEach(card=>{
    card.classList.remove('tier-active','tier-muted');
    const name = card.getAttribute('data-tier');
    const idx = LEVELS.findIndex(x=>x.name===name);
    if (idx === levelIdx) card.classList.add('tier-active');
    if (idx > levelIdx)  card.classList.add('tier-muted');
    // add rate label once
    const h3 = card.querySelector('h3');
    if (h3 && !/%\s*back|%.*적립|%.*還元|返利/.test(h3.textContent)){
      const rate = LEVELS[idx].rate;
      const add = (lang==='ko') ? ` · ${rate}% 적립`
                : (lang==='ja') ? ` · ${rate}% 還元`
                : (lang==='zh') ? ` · 返利 ${rate}%`
                : ` · ${rate}% back`;
      h3.innerHTML = h3.innerHTML + `<span style="opacity:.75;font-weight:600">${add}</span>`;
    }
  });

  const inheritNote = $('#inheritNote'); if (inheritNote) inheritNote.textContent = t.inherit;
  const downNote = $('#downgradeNote'); if (downNote) downNote.textContent = t.downgrade;
}

/* ---------- alerts ---------- */
function showDowngradeAlert(daysLeft){
  const t = (TXT[currentLang()] || TXT.en);
  const map = {30:t.d30,15:t.d15,7:t.d7,1:t.d1};
  const msg = map[daysLeft]; if(!msg) return;
  const el = document.createElement('div');
  el.style.position='fixed'; el.style.right='20px'; el.style.bottom='20px';
  el.style.zIndex='2147483647'; el.style.background='#dc2626';
  el.style.color='#fff'; el.style.padding='10px 14px';
  el.style.borderRadius='12px'; el.style.boxShadow='0 10px 30px rgba(0,0,0,.4)';
  el.textContent = msg; document.body.appendChild(el);
  setTimeout(()=> el.remove(), 8000);
}

/* ---------- public API ---------- */
function setUserContext({ totalSpentKRW, lastBookingISO }){
  renderBenefits();
  const idx = computeLevel(totalSpentKRW, lastBookingISO);
  applyLevelUI(idx, totalSpentKRW);

  if (lastBookingISO){
    const diff = Math.floor((Date.now() - new Date(lastBookingISO).getTime())/86400000);
    const left = DOWNGRADE_DAYS - diff;
    if ([30,15,7,1].includes(left)) showDowngradeAlert(left);
  }
}
window.setUserContext = setUserContext;

/* ---------- init & language change re-apply ---------- */
(function(){
  renderBenefits();
  applyLevelUI(0,0);
  const sel = document.getElementById('lang') || document.getElementById('langSelect');
  if (sel){
    sel.addEventListener('change', ()=>{
      let u={}; try{u=JSON.parse(localStorage.getItem('sw_user')||'{}')}catch(_){}
      renderBenefits();
      const spent = Number.isFinite(u.totalSpentKRW)?u.totalSpentKRW:0;
      const last  = u.lastBookingISO || null;
      const idx   = computeLevel(spent,last);
      applyLevelUI(idx, spent);
    });
  }
})();
