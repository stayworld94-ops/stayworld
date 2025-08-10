// js/lang.js
export const LANGS = { /* === 당신이 쓴 10개국어 딕셔너리 그대로 복사 === */ };
// 위에 원문 내용 그대로 붙여 넣으세요 (en, ko, es, it, tr, fr, ja, de, ru, zh)

export function setLang(code) {
  const lang = LANGS[code] ? code : 'en';
  const dict = LANGS[lang];

  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    if (dict[key]) el.textContent = dict[key];
  });

  const placeholders = {
    en:'Paris, Tokyo, Istanbul...',
    ko:'파리, 도쿄, 서울...',
    es:'París, Tokio, Estambul...',
    it:'Parigi, Tokyo, Istanbul...',
    tr:'Paris, Tokyo, İstanbul...',
    fr:'Paris, Tokyo, Istanbul...',
    ja:'パリ、東京、イスタンブール…',
    de:'Paris, Tokio, Istanbul…',
    ru:'Париж, Токио, Стамбул…',
    zh:'巴黎、东京、伊斯坦布尔…'
  };
  const inp = document.getElementById('searchInput');
  if (inp) inp.placeholder = placeholders[lang] || placeholders.en;

  localStorage.setItem('sw_lang', lang);
  document.documentElement.setAttribute('lang', lang);

  const select = document.getElementById('langSelect');
  if (select) select.value = lang;
}

export function bootLanguage() {
  const saved = localStorage.getItem('sw_lang') || 'en';
  const select = document.getElementById('langSelect');
  if (select) {
    select.value = saved;
    select.addEventListener("change", (e) => setLang(e.target.value));
  }
  setLang(saved);
}
