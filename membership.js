/* ============================
   StayWorld Membership — ULTRA SELF-CONTAINED
   - 10 languages built-in (EN/KO/FR/JA/DE/ES/IT/TR/ZH/RU)
   - If window.LANGS[code].membership exists, deep-merge & override
   - Handles: perks, thresholds, progress, downgrade toasts, currency by lang
============================ */

/* ---- 0) Built-in i18n for 10 languages ---- */
const I18N_BASE = {
  en:{ title:"Membership Benefits",
      subtitle:"Higher tiers include all perks from lower tiers.",
      levels:{bronze:"Bronze",silver:"Silver",gold:"Gold",platinum:"Platinum",diamond:"Diamond",elite:"Elite"},
      perks:{ points_back:"{percent}% points back on each booking" },
      retention_rule:"If there’s no booking for {days} days, you’ll be auto-downgraded by 1 level.",
      progress_title:"Top tier achieved.",
      progress_to_next:"Only {amount} left to reach {level}.",
      status_current_level:"Your level: {level}",
      member_prices:"Member-only prices",
      basic_support:"Standard support",
      secure_pay:"Secure payments (Cards & Crypto)",
      free_cancel:"Free-cancel window",
      priority_email:"Priority email support",
      priority_chat:"Priority live chat",
      late_checkout:"Late checkout (when available)",
      upgrade_when_available:"Room upgrade (when available)",
      b2b_invoice:"B2B invoice support",
      elite_concierge:"Elite concierge access",
      defaults:{days:60}
  },
  ko:{ title:"멤버십 혜택",
      subtitle:"상위 등급은 하위 등급 혜택을 모두 포함합니다.",
      levels:{bronze:"브론즈",silver:"실버",gold:"골드",pl래티넘:"플래티넘",diamond:"다이아몬드",elite:"엘리트"},
      perks:{ points_back:"예약 시 {percent}% 포인트 적립" },
      retention_rule:"예약이 {days}일 이상 없으면 자동으로 1단계 강등됩니다.",
      progress_title:"최상위 등급에 도달했습니다.",
      progress_to_next:"{level}까지 {amount} 남았습니다.",
      status_current_level:"현재 레벨: {level}",
      member_prices:"멤버 전용 가격",
      basic_support:"기본 고객 지원",
      secure_pay:"안전한 결제(카드 & 크립토)",
      free_cancel:"무료 취소 기간",
      priority_email:"우선 이메일 지원",
      priority_chat:"우선 실시간 채팅",
      late_checkout:"레이트 체크아웃(가능 시)",
      upgrade_when_available:"객실 업그레이드(가능 시)",
      b2b_invoice:"기업용 계산서 지원",
      elite_concierge:"엘리트 컨시어지",
      defaults:{days:60}
  },
  fr:{ title:"Avantages du programme",
      subtitle:"Les niveaux supérieurs incluent tous les avantages des niveaux inférieurs.",
      levels:{bronze:"Bronze",silver:"Argent",gold:"Or",platinum:"Platine",diamond:"Diamant",elite:"Élite"},
      perks:{ points_back:"{percent}% de points à chaque réservation" },
      retention_rule:"Sans réservation pendant {days} jours, rétrogradation automatique d’un niveau.",
      progress_title:"Niveau maximal atteint.",
      progress_to_next:"Plus que {amount} pour atteindre {level}.",
      status_current_level:"Votre niveau : {level}",
      member_prices:"Tarifs réservés aux membres",
      basic_support:"Assistance standard",
      secure_pay:"Paiements sécurisés (Cartes & Crypto)",
      free_cancel:"Fenêtre d’annulation gratuite",
      priority_email:"Assistance e-mail prioritaire",
      priority_chat:"Chat prioritaire",
      late_checkout:"Départ tardif (si disponible)",
      upgrade_when_available:"Surclassement (si disponible)",
      b2b_invoice:"Facturation B2B",
      elite_concierge:"Conciergerie Élite",
      defaults:{days:60}
  },
  ja:{ title:"メンバーシップ特典",
      subtitle:"上位ランクは下位ランクの特典をすべて含みます。",
      levels:{bronze:"ブロンズ",silver:"シルバー",gold:"ゴールド",platinum:"プラチナ",diamond:"ダイヤモンド",elite:"エリート"},
      perks:{ points_back:"予約ごとに{percent}%ポイント還元" },
      retention_rule:"{days}日間予約がない場合、自動的に1ランク降格します。",
      progress_title:"最上位ランクに到達しました。",
      progress_to_next:"{level}まであと{amount}。",
      status_current_level:"現在のランク：{level}",
      member_prices:"会員限定価格",
      basic_support:"標準サポート",
      secure_pay:"安全な支払い（カード・暗号資産）",
      free_cancel:"無料キャンセル期間",
      priority_email:"優先メールサポート",
      priority_chat:"優先チャット",
      late_checkout:"レイトチェックアウト（空室時）",
      upgrade_when_available:"お部屋のアップグレード（空室時）",
      b2b_invoice:"B2B 請求書",
      elite_concierge:"エリート・コンシェルジュ",
      defaults:{days:60}
  },
  de:{ title:"Mitgliedschaftsvorteile",
      subtitle:"Höhere Stufen enthalten alle Vorteile der unteren Stufen.",
      levels:{bronze:"Bronze",silver:"Silber",gold:"Gold",platinum:"Platin",diamond:"Diamant",elite:"Elite"},
      perks:{ points_back:"{percent}% Punkte pro Buchung" },
      retention_rule:"Ohne Buchung innerhalb von {days} Tagen automatische Herabstufung um eine Stufe.",
      progress_title:"Höchste Stufe erreicht.",
      progress_to_next:"Nur noch {amount} bis {level}.",
      status_current_level:"Dein Level: {level}",
      member_prices:"Mitgliederpreise",
      basic_support:"Standard-Support",
      secure_pay:"Sichere Zahlungen (Karten & Krypto)",
      free_cancel:"Kostenlose Stornofrist",
      priority_email:"Priorisierter E-Mail-Support",
      priority_chat:"Priorisierter Chat",
      late_checkout:"Später Check-out (wenn verfügbar)",
      upgrade_when_available:"Upgrade (wenn verfügbar)",
      b2b_invoice:"B2B-Rechnungen",
      elite_concierge:"Elite-Concierge",
      defaults:{days:60}
  },
  es:{ title:"Beneficios de membresía",
      subtitle:"Los niveles superiores incluyen todas las ventajas de los niveles inferiores.",
      levels:{bronze:"Bronce",silver:"Plata",gold:"Oro",platinum:"Platino",diamond:"Diamante",elite:"Élite"},
      perks:{ points_back:"{percent}% de puntos por cada reserva" },
      retention_rule:"Si no hay reservas durante {days} días, se te degradará automáticamente un nivel.",
      progress_title:"Nivel máximo alcanzado.",
      progress_to_next:"Faltan {amount} para llegar a {level}.",
      status_current_level:"Tu nivel: {level}",
      member_prices:"Precios para miembros",
      basic_support:"Soporte estándar",
      secure_pay:"Pagos seguros (Tarjetas y Cripto)",
      free_cancel:"Ventana de cancelación gratuita",
      priority_email:"Soporte por correo prioritario",
      priority_chat:"Chat prioritario",
      late_checkout:"Salida tardía (si hay disponibilidad)",
      upgrade_when_available:"Mejora de habitación (si hay disponibilidad)",
      b2b_invoice:"Factura B2B",
      elite_concierge:"Conserje Élite",
      defaults:{days:60}
  },
  it:{ title:"Vantaggi dell’abbonamento",
      subtitle:"I livelli superiori includono tutti i vantaggi di quelli inferiori.",
      levels:{bronze:"Bronzo",silver:"Argento",gold:"Oro",platinum:"Platino",diamond:"Diamante",elite:"Élite"},
      perks:{ points_back:"{percent}% di punti per ogni prenotazione" },
      retention_rule:"Se non effettui prenotazioni per {days} giorni, verrai retrocesso di 1 livello.",
      progress_title:"Raggiunto il livello massimo.",
      progress_to_next:"Mancano {amount} per raggiungere {level}.",
      status_current_level:"Il tuo livello: {level}",
      member_prices:"Prezzi riservati ai membri",
      basic_support:"Assistenza standard",
      secure_pay:"Pagamenti sicuri (Carte & Crypto)",
      free_cancel:"Finestra di cancellazione gratuita",
      priority_email:"Assistenza email prioritaria",
      priority_chat:"Chat prioritaria",
      late_checkout:"Late check-out (se disponibile)",
      upgrade_when_available:"Upgrade camera (se disponibile)",
      b2b_invoice:"Fatturazione B2B",
      elite_concierge:"Concierge Élite",
      defaults:{days:60}
  },
  tr:{ title:"Üyelik Avantajları",
      subtitle:"Üst seviyeler alt seviyelerin tüm ayrıcalıklarını içerir.",
      levels:{bronze:"Bronz",silver:"Gümüş",gold:"Altın",platinum:"Platin",diamond:"Elmas",elite:"Elit"},
      perks:{ points_back:"Her rezervasyonda %{percent} puan iadesi" },
      retention_rule:"{days} gün boyunca rezervasyon yoksa seviyen otomatik olarak bir kademe düşürülür.",
      progress_title:"En üst seviye ulaşıldı.",
      progress_to_next:"{level} seviyesine ulaşmak için {amount} kaldı.",
      status_current_level:"Seviyen: {level}",
      member_prices:"Üyelere özel fiyatlar",
      basic_support:"Standart destek",
      secure_pay:"Güvenli ödemeler (Kart & Kripto)",
      free_cancel:"Ücretsiz iptal süresi",
      priority_email:"Öncelikli e-posta desteği",
      priority_chat:"Öncelikli sohbet",
      late_checkout:"Geç çıkış (müsaitse)",
      upgrade_when_available:"Oda yükseltme (müsaitse)",
      b2b_invoice:"B2B faturalandırma",
      elite_concierge:"Elit konsiyerj",
      defaults:{days:60}
  },
  zh:{ title:"会员权益",
      subtitle:"更高级别包含所有低级别的权益。",
      levels:{bronze:"青铜",silver:"白银",gold:"黄金",platinum:"铂金",diamond:"钻石",elite:"精英"},
      perks:{ points_back:"每次预订返还 {percent}% 积分" },
      retention_rule:"若 {days} 天内无预订，将自动降级一级。",
      progress_title:"已达到最高等级。",
      progress_to_next:"距离 {level} 还差 {amount}。",
      status_current_level:"你的等级：{level}",
      member_prices:"会员专属价格",
      basic_support:"标准支持",
      secure_pay:"安全支付（银行卡 & 加密货币）",
      free_cancel:"免费取消时段",
      priority_email:"优先邮件支持",
      priority_chat:"优先在线客服",
      late_checkout:"延迟退房（视房态）",
      upgrade_when_available:"客房升级（视房态）",
      b2b_invoice:"B2B 发票",
      elite_concierge:"精英礼宾服务",
      defaults:{days:60}
  },
  ru:{ title:"Преимущества членства",
      subtitle:"Более высокий уровень включает все преимущества нижних уровней.",
      levels:{bronze:"Бронза",silver:"Серебро",gold:"Золото",platinum:"Платина",diamond:"Бриллиант",elite:"Элита"},
      perks:{ points_back:"{percent}% бонусов за каждое бронирование" },
      retention_rule:"Если нет бронирований в течение {days} дней, произойдет авто-понижение на один уровень.",
      progress_title:"Достигнут максимальный уровень.",
      progress_to_next:"Осталось {amount} до уровня {level}.",
      status_current_level:"Ваш уровень: {level}",
      member_prices:"Цены только для участников",
      basic_support:"Стандартная поддержка",
      secure_pay:"Безопасные платежи (Карты и Крипто)",
      free_cancel:"Период бесплатной отмены",
      priority_email:"Приоритетная поддержка по email",
      priority_chat:"Приоритетный чат",
      late_checkout:"Поздний выезд (при наличии)",
      upgrade_when_available:"Апгрейд номера (при наличии)",
      b2b_invoice:"B2B-счета",
      elite_concierge:"Элит-консьерж",
      defaults:{days:60}
  }
};

/* ---- 1) Levels & downgrade ---- */
const LEVELS = [
  { name:'Bronze',   minKRW:       0, rate: 0 },
  { name:'Silver',   minKRW:  500_000, rate: 3 },
  { name:'Gold',     minKRW:2_000_000, rate: 5 },
  { name:'Platinum', minKRW:4_000_000, rate: 7 },
  { name:'Diamond',  minKRW:7_500_000, rate:10 },
  { name:'Elite',    minKRW:15_000_000, rate:15 }
];
const DOWNGRADE_DAYS = 60;

/* ---- 2) Currency map by language ---- */
const KRW_PER_USD = 1300;
const FX = {
  USD:{code:'USD', symbol:'$',  perUSD:1,    locale:'en-US', frac:0},
  EUR:{code:'EUR', symbol:'€',  perUSD:0.92, locale:'fr-FR', frac:0},
  KRW:{code:'KRW', symbol:'₩',  perUSD:1300, locale:'ko-KR', frac:0},
  JPY:{code:'JPY', symbol:'¥',  perUSD:155,  locale:'ja-JP', frac:0},
  CNY:{code:'CNY', symbol:'¥',  perUSD:7.2,  locale:'zh-CN', frac:0},
  TRY:{code:'TRY', symbol:'₺',  perUSD:33,   locale:'tr-TR', frac:0},
  RUB:{code:'RUB', symbol:'₽',  perUSD:90,   locale:'ru-RU', frac:0}
};
const LANG2CUR = { en:'USD', ko:'KRW', ja:'JPY', zh:'CNY', fr:'EUR', es:'EUR', de:'EUR', it:'EUR', tr:'TRY', ru:'RUB' };

/* ---- 3) Utils ---- */
function deepMerge(base, ext){
  const out = Array.isArray(base) ? base.slice() : {...base};
  if (!ext) return out;
  Object.keys(ext).forEach(k=>{
    if (ext[k] && typeof ext[k]==='object' && !Array.isArray(ext[k])) {
      out[k] = deepMerge(base?.[k]||{}, ext[k]);
    } else {
      out[k] = ext[k];
    }
  });
  return out;
}
function getLangCode(){
  const sel = document.getElementById('langSelect') || document.getElementById('lang');
  const selVal = (sel && sel.value) ? sel.value.toLowerCase() : null;
  const saved  = (localStorage.getItem('sw_lang') || (navigator.language||'en')).slice(0,2).toLowerCase();
  const code   = selVal || saved;
  return I18N_BASE[code] ? code : 'en';
}
function getDict(){
  const code = getLangCode();
  const base = I18N_BASE[code] || I18N_BASE.en;
  const fromLangs = (window.LANGS && LANGS[code] && LANGS[code].membership) ? LANGS[code].membership : null;
  return deepMerge(base, fromLangs||{});
}
function t(path){
  const d=getDict();
  return path.split('.').reduce((o,k)=> (o&&o[k]!=null)?o[k]:undefined, d);
}
function tpl(str, map){
  return String(str).replace(/\{(\w+)\}/g, (_,k)=> (map && (k in map)) ? map[k] : `{${k}}`);
}
function fmtKRWtoLocal(krw){
  const cur = FX[ LANG2CUR[getLangCode()] || 'USD' ] || FX.USD;
  const usd = krw / KRW_PER_USD;
  const local = usd * cur.perUSD;
  return new Intl.NumberFormat(cur.locale, { style:'currency', currency:cur.code, maximumFractionDigits:cur.frac }).format(local);
}
function localizeLevelName(name){
  const lv = t('levels') || I18N_BASE.en.levels;
  const key = String(name).toLowerCase();
  return lv?.[key] || name;
}

/* ---- 4) Benefits text & map ---- */
const BENEFITS_TEXT = {
  member_prices:      (L)=> L.member_prices,
  basic_support:      (L)=> L.basic_support,
  secure_pay:         (L)=> L.secure_pay,
  points_back:        (L,p)=> tpl(L.perks.points_back, {percent:p}),
  free_cancel:        (L)=> L.free_cancel,
  priority_email:     (L)=> L.priority_email,
  priority_chat:      (L)=> L.priority_chat,
  late_checkout:      (L)=> L.late_checkout,
  upgrade_when_available:(L)=> L.upgrade_when_available,
  b2b_invoice:        (L)=> L.b2b_invoice,
  elite_concierge:    (L)=> L.elite_concierge
};
const BENEFITS_BY_TIER = {
  Bronze:   ['member_prices','basic_support','secure_pay'],
  Silver:   ['member_prices','basic_support','secure_pay',['points_back',3],'free_cancel'],
  Gold:     ['member_prices','basic_support','secure_pay',['points_back',5],'priority_email','late_checkout'],
  Platinum: ['member_prices','basic_support','secure_pay',['points_back',7],'priority_email','priority_chat','upgrade_when_available'],
  Diamond:  ['member_prices','basic_support','secure_pay',['points_back',10],'priority_email','priority_chat','upgrade_when_available','b2b_invoice'],
  Elite:    ['member_prices','basic_support','secure_pay',['points_back',15],'priority_email','priority_chat','upgrade_when_available','b2b_invoice','elite_concierge']
};

/* ---- 5) Level helpers ---- */
function computeLevel(totalKRW, lastBookingISO){
  let idx = 0;
  for (let i=0;i<LEVELS.length;i++){ if (totalKRW >= LEVELS[i].minKRW) idx = i; }
  if (lastBookingISO){
    const diff = Math.floor((Date.now()-new Date(lastBookingISO).getTime())/86400000);
    if (diff >= (t('defaults.days') ?? 60)) idx = Math.max(0, idx-1);
  }
  return idx;
}
function remainToNext(totalKRW, idx){
  if (idx >= LEVELS.length-1) return null;
  return Math.max(0, LEVELS[idx+1].minKRW - totalKRW);
}

/* ---- 6) Rendering ---- */
function renderLabels(){
  const L = getDict();
  const set = (id, v)=>{ const el=document.getElementById(id); if(el && v!=null) el.textContent = v; };

  set('mb_title',    L.title);
  set('mb_subtitle', L.subtitle);

  const days = L.defaults?.days ?? 60;
  set('dwTop', tpl(L.retention_rule, {days}));

  const lv = L.levels;
  set('lbl_bronze',   lv.bronze);
  set('lbl_silver',   lv.silver);
  set('lbl_gold',     lv.gold);
  set('lbl_platinum', lv.platinum);
  set('lbl_diamond',  lv.diamond);
  set('lbl_elite',    lv.elite);
}
function renderBenefits(){
  const L = getDict();
  document.querySelectorAll('#tiersGrid .tier-card').forEach(card=>{
    const tier = card.getAttribute('data-tier');
    const list = card.querySelector('.benefits'); if (!list) return;
    list.innerHTML='';
    (BENEFITS_BY_TIER[tier]||[]).forEach(item=>{
      let key=item, p=null;
      if (Array.isArray(item)){ key=item[0]; p=item[1]; }
      const text = BENEFITS_TEXT[key](L, p);
      const div=document.createElement('div');
      div.className='benefit';
      div.innerHTML=`<i>✔</i><span>${text}</span>`;
      list.appendChild(div);
    });
  });
}
function renderUser(totalSpentKRW, lastBookingISO){
  const L = getDict();
  const idx = computeLevel(totalSpentKRW||0, lastBookingISO||null);
  const lvl = LEVELS[idx];

  const yourTier = tpl(L.status_current_level, {level: localizeLevelName(lvl.name)});
  const lt = document.getElementById('levelTitle'); if (lt) lt.textContent = yourTier;

  const badge = document.getElementById('tierBadge'); if (badge) badge.textContent = `${lvl.rate}% back`;

  let pct = 100, remain = remainToNext(totalSpentKRW||0, idx);
  if (remain!==null){
    const currMin=LEVELS[idx].minKRW, nextMin=LEVELS[idx+1].minKRW;
    pct = Math.min(100, Math.max(0, Math.round(((totalSpentKRW - currMin)/(nextMin - currMin))*100)));
  }
  const gf=document.getElementById('gaugeFill'); if (gf) gf.style.width = pct + '%';
  const pv=document.getElementById('progressPct'); if (pv) pv.textContent = pct + '%';

  const msg=document.getElementById('levelProgressText');
  if (msg){
    if (remain===null){
      msg.textContent = L.progress_title;
    }else{
      const nextLabel = localizeLevelName(LEVELS[Math.min(idx+1, LEVELS.length-1)].name);
      msg.textContent = tpl(L.progress_to_next, { amount: fmtKRWtoLocal(remain), level: nextLabel });
    }
  }

  // 강조/흐림
  document.querySelectorAll('#tiersGrid [data-tier]').forEach(card=>{
    const name=card.getAttribute('data-tier');
    const i=LEVELS.findIndex(x=>x.name===name);
    card.classList.remove('tier-active','tier-muted');
    if (i===idx) card.classList.add('tier-active');
    if (i>idx)   card.classList.add('tier-muted');
  });

  // 스티키 안내
  const sticky=document.getElementById('downgradeSticky');
  if (sticky){
    const days = L.defaults?.days ?? 60;
    sticky.textContent = tpl(L.retention_rule, {days});
  }

  // 토스트 (D-30/15/7/1)
  if (lastBookingISO){
    const diff = Math.floor((Date.now() - new Date(lastBookingISO).getTime())/86400000);
    const left = (L.defaults?.days ?? 60) - diff;
    if ([30,15,7,1].includes(left)) showToast(left);
  }
}

/* ---- 7) Toast ---- */
function showToast(daysLeft){
  const code=getLangCode();
  const ko = (daysLeft===30?'📢 30일 후 자동 강등 예정입니다. 지금 예약하면 유지됩니다.'
    : daysLeft===15?'⚠️ 15일 후 자동 강등 예정입니다. 활동을 유지하세요.'
    : daysLeft===7 ?'⏳ 7일 후 자동 강등 예정입니다. 서둘러 예약하세요!'
    :'🚨 내일 자동 강등됩니다! 오늘 예약을 완료하세요.');
  const en = (daysLeft===30?'📢 Auto downgrade in 30 days. Keep your tier by booking.'
    : daysLeft===15?'⚠️ Auto downgrade in 15 days. Stay active.'
    : daysLeft===7 ?'⏳ Auto downgrade in 7 days. Book soon!'
    :'🚨 Auto downgrade tomorrow! Complete a booking today.');

  const msg = (code==='ko') ? ko : en;
  const el=document.createElement('div');
  el.style.cssText='position:fixed;right:16px;bottom:16px;z-index:9999;background:#1e2a35;color:#fff;border:1px solid #2f3b47;padding:12px 14px;border-radius:12px;box-shadow:0 10px 24px rgba(0,0,0,.35)';
  el.textContent=msg;
  document.body.appendChild(el);
  setTimeout(()=> el.remove(), 8000);
}

/* ---- 8) Public API ---- */
function setUserContext({ totalSpentKRW, lastBookingISO }){
  renderLabels();
  renderBenefits();
  renderUser(totalSpentKRW||0, lastBookingISO||null);
}
window.setUserContext = setUserContext;

/* ---- 9) Init ---- */
document.addEventListener('DOMContentLoaded', ()=>{
  // 1) 저장된 언어 적용(헤더 select와 상관없이)
  const savedLang = (localStorage.getItem('sw_lang') || (navigator.language||'en')).slice(0,2).toLowerCase();
  // lang.js가 있으면 헤더도 동기화
  if (window.StayWorldI18n && typeof window.StayWorldI18n.applyLang === 'function') {
    window.StayWorldI18n.applyLang(savedLang);
  }

  // 2) 유저 컨텍스트
  let u={}; try{ u=JSON.parse(localStorage.getItem('sw_user')||'{}'); }catch(_){}
  setUserContext({ totalSpentKRW: Number.isFinite(u.totalSpentKRW)?u.totalSpentKRW:0, lastBookingISO: u.lastBookingISO || null });

  // 3) 언어 변경 이벤트 → 즉시 갱신
  window.addEventListener('sw:languageChanged', ()=>{
    let cur={}; try{ cur=JSON.parse(localStorage.getItem('sw_user')||'{}'); }catch(_){}
    setUserContext({ totalSpentKRW: Number.isFinite(cur.totalSpentKRW)?cur.totalSpentKRW:0, lastBookingISO: cur.lastBookingISO || null });
  });

  // 4) 강제 1회 리프레시 (초기 진입 시 번역 보장)
  setTimeout(()=> window.dispatchEvent(new Event('sw:languageChanged')), 200);
});
