document.getElementById("chat-toggle").addEventListener("click", () => {
  const win = document.getElementById("chat-window");
  win.style.display = win.style.display === "flex" ? "none" : "flex";
});

document.getElementById("send-btn").addEventListener("click", async () => {
  const input = document.getElementById("chat-input");
  const msg = input.value.trim();
  if (!msg) return;

  appendMessage("user", msg);
  input.value = "";

  const res = await fetch("/.netlify/functions/chatbot", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: msg, lang: currentLang })
  });
// ====== Search ======
document.getElementById('searchBtn')?.addEventListener('click', (e)=>{
  e.preventDefault();
  const q = (document.getElementById('searchInput')?.value || '').trim();
  const df = document.getElementById('dateFrom')?.value || '';
  const dt = document.getElementById('dateTo')?.value || '';
  const url = new URL('/results.html', location.origin);
  if (q) url.searchParams.set('query', q);
  if (df) url.searchParams.set('from', df);
  if (dt) url.searchParams.set('to', dt);
  location.href = url.toString();
});

// ====== Language (persist + 적용) ======
(function(){
  const sel = document.getElementById('langSelect');
  const saved = localStorage.getItem('sw_lang') || 'en';
  if (sel){ sel.value = saved; sel.addEventListener('change', e=>{
    const v = e.target.value; localStorage.setItem('sw_lang', v);
    if (window.StayWorldI18n?.applyLang) window.StayWorldI18n.applyLang(v);
  });}
  // load now
  if (window.StayWorldI18n?.applyLang) window.StayWorldI18n.applyLang(saved);
})();

// ====== Chatbot (Netlify Function via POST) ======
const chatFab  = document.getElementById('chatFab');
const botPanel = document.getElementById('botPanel');
const botBody  = document.getElementById('botBody');
const botInput = document.getElementById('botInput');

document.getElementById('openBot')?.addEventListener('click', ()=> botPanel.hidden = false);
chatFab?.addEventListener('click', ()=> botPanel.hidden = false);
document.getElementById('botClose')?.addEventListener('click', ()=> botPanel.hidden = true);

document.getElementById('botSend')?.addEventListener('click', async ()=>{
  const msg = (botInput.value||'').trim();
  if (!msg) return;
  appendMsg('you', msg);
  botInput.value = '';

  try{
    const lang = localStorage.getItem('sw_lang') || 'en';
    const r = await fetch('/.netlify/functions/chatbot', {
      method:'POST',
      headers:{ 'Content-Type':'application/json' },
      body: JSON.stringify({ message: msg, lang })
    });
    const data = await r.json();
    appendMsg('bot', data.reply || '(No reply)');
  }catch(err){
    appendMsg('bot', 'Error: ' + (err.message||err));
  }
});

function appendMsg(who, text){
  const div = document.createElement('div');
  div.className = 'sw-bot-msg' + (who==='bot' ? ' sys':'');
  div.style.cssText = 'background:#171723;border:1px solid #23232b;border-radius:16px;padding:10px 12px;margin:8px 0';
  div.textContent = text;
  botBody.appendChild(div);
  botBody.scrollTop = botBody.scrollHeight;
}

  const data = await res.json();
  appendMessage("bot", data.reply);
});

function appendMessage(sender, text) {
  const chat = document.getElementById("chat-messages");
  const div = document.createElement("div");
  div.className = sender;
  div.textContent = text;
  chat.appendChild(div);
  chat.scrollTop = chat.scrollHeight;
}
