document.getElementById('chatFab')?.addEventListener('click', () => {
  document.getElementById('botPanel').hidden = false;
});
document.getElementById('botClose')?.addEventListener('click', () => {
  document.getElementById('botPanel').hidden = true;
});
document.getElementById('botSend')?.addEventListener('click', () => {
  const v = botInput.value.trim(); if(!v) return;
  botBody.insertAdjacentHTML('beforeend', `<div class="sw-bot-msg">${v}</div>`);
  botBody.insertAdjacentHTML('beforeend', `<div class="sw-bot-msg sys">(Demo) Got it! We’ll find you the best stays.</div>`);
  botInput.value = ''; botBody.scrollTop = botBody.scrollHeight;
});
const ALIASES = {"인천":"Incheon","이스탄불":"Istanbul","서울":"Seoul"};
function normalizeQuery(q){
  const t = q.trim().toLowerCase();
  for (const [k,v] of Object.entries(ALIASES)){
    if (t === k.toLowerCase()) return v;
  }
  return q;
}