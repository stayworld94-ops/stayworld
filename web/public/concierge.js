<!-- 파일 경로: web/public/concierge.js -->
<script>
// 빈 태그 방지용, 실제 코드는 아래 IIFE 입니다.
</script>
<script>
(function(){
  if(window.StayWorldConcierge) return;
  const css=`:root{--bg:#0f1522;--tx:#e7e9ee;--g:#F5D06F;--g2:#E4C45C}
  .sw{position:fixed;z-index:2147483000}.tg{right:20px;bottom:20px;width:56px;height:56px;border-radius:9999px;display:grid;place-items:center;background:linear-gradient(135deg,var(--g),var(--g2));color:#111;font-size:24px}
  .wn{right:20px;bottom:88px;width:360px;max-width:calc(100vw - 24px);height:520px;max-height:calc(100vh - 120px);border-radius:18px;overflow:hidden;background:var(--bg);color:var(--tx);border:1px solid rgba(255,255,255,.08)}
  .hd{height:56px;display:flex;align-items:center;justify-content:space-between;padding:0 12px;border-bottom:1px solid rgba(255,255,255,.08)}
  .bd{height:calc(100% - 108px);overflow:auto;padding:12px;display:flex;flex-direction:column;gap:10px}
  .ft{height:52px;display:flex;gap:8px;align-items:center;padding:10px;border-top:1px solid rgba(255,255,255,.08)}
  .in{flex:1;height:32px;border-radius:10px;border:1px solid rgba(255,255,255,.12);background:rgba(255,255,255,.06);padding:0 10px;color:var(--tx)}
  .sd{min-width:64px;height:32px;border-radius:10px;border:1px solid rgba(255,255,255,.12);background:rgba(255,255,255,.14)}
  .r{display:flex;gap:8px}.m{max-width:78%;padding:10px 12px;border-radius:14px;border:1px solid rgba(255,255,255,.1);font-size:14px;line-height:1.45}
  .me{align-self:flex-end;background:rgba(255,255,255,.12)}.bot{align-self:flex-start;background:#0a0f18}
  .tm{font-size:11px;color:#aab2c1}.q{display:flex;gap:6px;flex-wrap:wrap}
  .c{padding:6px 10px;border-radius:9999px;border:1px solid rgba(255,255,255,.14);background:rgba(255,255,255,.06);font-size:12px}
  .hide{display:none!important}`; const addCss=()=>{const s=document.createElement('style');s.textContent=css;document.head.appendChild(s)};
  const el=(t,c,h)=>{const d=document.createElement(t); if(c)d.className=c; if(h!=null)d.innerHTML=h; return d};
  const fmt=(ts)=>{const m=Math.floor((Date.now()-ts)/60000); if(m<1)return'now'; if(m<60)return m+'m'; const h=Math.floor(m/60); if(h<24)return h+'h'; return Math.floor(h/24)+'d'};

  function openHostChat(){
    if(window.StayWorldHostChat?.open){ try{window.StayWorldHostChat.open(); return true}catch{} }
    const t=document.querySelector('[data-host-chat-open]')||document.getElementById('host-chat-toggle');
    if(t){ t.click(); return true }
    try{ localStorage.setItem('sw:openHostChat','1') }catch{}
    if(!/\/app|\/messages|\/chat/.test(location.pathname)){ location.href='/messages#hostChat'; return true }
    return false;
  }
  (function(){ try{ if(localStorage.getItem('sw:openHostChat')==='1'){ localStorage.removeItem('sw:openHostChat'); setTimeout(()=>openHostChat(),600) } }catch{} })();

  function ui(opt){
    const brand=opt.brand||'STAYWORLD'; addCss();
    const tg=el('button','sw tg','💬');
    const wn=el('section','sw wn hide');
    const hd=el('div','hd',`<strong>${brand} Concierge</strong><button aria-label="Close">✖</button>`);
    const bd=el('div','bd'); const ft=el('div','ft'); const input=el('input','in'); input.placeholder='Type a message…';
    const send=el('button','sd','Send'); ft.append(input,send); wn.append(hd,bd,ft); document.body.append(tg,wn);

    const push=(role,txt)=>{const r=el('div','r'); const b=el('div','m '+(role==='user'?'me':'bot')); b.textContent=txt; r.append(b,el('div','tm',fmt(Date.now()))); bd.append(r); bd.scrollTop=bd.scrollHeight};
    const quick=()=>{const w=el('div','q'); ['Find my booking','Contact host','Popular cities','Talk to support'].forEach(t=>{const c=el('button','c',t); c.onclick=()=>handle(t); w.append(c)}); bd.append(w)};

    function open(){ wn.classList.remove('hide'); tg.classList.add('hide') }
    function close(){ wn.classList.add('hide'); tg.classList.remove('hide') }
    async function handle(text){
      push('user',text);
      if(/host/i.test(text)){ push('bot','Connecting you to your host…'); setTimeout(openHostChat,150); }
      try{
        if(opt.endpoint){
          const r=await fetch(opt.endpoint,{ method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ q:text, site: location.host })});
          if(r.ok){ const j=await r.json(); push('bot', j.answer||'Okay.'); return }
        }
      }catch{}
    }

    tg.onclick=open; hd.querySelector('button').onclick=close;
    send.onclick=()=>{ const v=input.value.trim(); if(!v)return; input.value=''; handle(v) };
    input.addEventListener('keydown',e=>{ if(e.key==='Enter'){ e.preventDefault(); send.click() } });

    push('bot',`Welcome to ${brand}. How can I help?`); quick();
  }

  // 페이지 로드 시 자동 초기화 + 엔드포인트 연결
  function init(){ ui({ brand:'STAYWORLD', endpoint:'/.netlify/functions/concierge' }) }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
</script>
