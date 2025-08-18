/* ============================
   StayWorld Membership — FINAL
   Works with lang.js (LANGS + sw:languageChanged)
   - Tier thresholds in KRW
   - Localized currency by language
   - Always-on downgrade note + D-30/15/7/1 toasts
   - Upper tiers inherit benefits of lower tiers
============================ */

/* ---- 1) Tier thresholds & earn rates (base: KRW) ---- */
const LEVELS = [
  { name:'Bronze',   minKRW:       0, rate: 0 },
  { name:'Silver',   minKRW:  500_000, rate: 3 },
  { name:'Gold',     minKRW:2_000_000, rate: 5 },
  { name:'Platinum', minKRW:4_000_000, rate: 7 },
  { name:'Diamond',  minKRW:7_500_000, rate:10 },
  { name:'Elite',    minKRW:15_000_000, rate:15 } // 자동 승격
];

const DOWNGRADE_DAYS = 60;

/* ---- 2) Currency map per language (coarse FX for display only) ---- */
const KRW_PER_USD = 1300;
const FX = {
  USD:{code:'USD', symbol:'$',  perUSD:1,    locale:'en-US', frac:0},
  EUR:{code:'EUR', symbol:'€',  perUSD:0.92, locale:'fr-FR', frac:0},
  KRW:{code:'KRW', symbol:'₩',  perUSD:1300, locale:'ko-KR', frac:0},
  JPY:{code:'JPY', symbol:'¥',  perUSD:155,  locale:'ja-JP', frac:0},
  CNY:{code:'CNY', symbol:'¥',  perUSD:7.2,  locale:'zh-CN', frac:0},
  TRY:{code:'TRY', symbol:'₺',  perUSD:33,   locale:'tr-TR', frac:0},
  RUB:{code:'RUB', symbol:'₽',  perUSD:90,   locale:'ru-RU', frac:0},
  GBP:{code:'GBP', symbol:'£',  perUSD:0.78, locale:'en-GB', frac:0},
  AED:{code:'AED', symbol:'د.إ',perUSD:3.67, locale:'ar-AE', frac:0},
  CAD:{code:'CAD', symbol:'$',  perUSD:1.36, locale:'en-CA', frac:0}
};
const LANG2CUR = { en:'USD', ko:'KRW', ja:'JPY', zh:'CNY', fr:'EUR', es:'EUR', de:'EUR', it:'EUR', tr:'TRY', ru:'RUB' };

/* ---- 3) Helpers ---- */
function getLangCode(){
  const sel=document.getElementById('langSelect');
  const saved=localStorage.getItem('sw_lang')||(navigator.language||'en').slice(0,2).toLowerCase();
  const code=(sel && LANGS[sel.value]) ? sel.value : (LANGS[saved]?saved:'en');
  return code;
}
function getDict(){
  const code=getLangCode();
  return (window.LANGS && LANGS[code] && LANGS[code].membership) ? LANGS[code].membership : LANGS.en.membership;
}
function t(path){ // dot-path getter
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

/* ---- 4) Benefits per tier (upper inherits lower) ---- */
const BENEFITS = {
  member_prices:  (L)=> L?.member_prices || "Member-only prices",
  basic_support:  (L)=> L?.basic_support || "Standard support",
  secure_pay:     (L)=> L?.secure_pay || "Secure payments (Cards & Crypto)",
  points_back:    (L,p)=> tpl(L?.perks?.points_back || "{percent}% back", {percent:p}),
  free_cancel:    (L)=> L?.free_cancel || "Free-cancel window",
  prio_email:     (L)=> L?.priority_email || "Priority email support",
  prio_chat:      (L)=> L?.priority_chat || "Priority live chat",
  late_checkout:  (_
