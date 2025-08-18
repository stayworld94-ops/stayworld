<!-- 모든 페이지에서 공통으로 포함 -->
<script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js" crossorigin="anonymous"></script>
<script src="/scripts/firebase-config.js"></script>
<script src="https://www.gstatic.com/firebasejs/10.12.4/firebase-app-compat.js"></script>
<script src="https://www.gstatic.com/firebasejs/10.12.4/firebase-auth-compat.js"></script>
<script src="https://www.gstatic.com/firebasejs/10.12.4/firebase-storage-compat.js"></script>
<script src="/scripts/firebase.js"></script>
<script src="/scripts/auth.js"></script>
<script src="/scripts/map.js"></script>
<script src="/scripts/stripe.js"></script>
<script src="/lang.js"></script>
<script src="/app.js"></script>
/* ================== STAYWORLD — app.js ================== */
(function(){
  const $  = (s,sc)=> (sc||document).querySelector(s);
  const $$ = (s,sc)=> Array.from((sc||document).querySelectorAll(s));
  const on = (el,ev,fn)=> el && el.addEventListener(ev,fn,{passive:false});

  /* -------- 공통 헤더/푸터 렌더 -------- */
  function renderHeader(){
    const el = $('#global-header');
    if(!el) return;

    el.innerHTML = `
    <header class="site-header">
      <div class="container header-row">
        <a href="/index.html" class="brand">
          <img src="/images/stayworld-logo.png" alt="StayWorld" class="brand-logo" />
          <span class="brand-text">STAYWORLD</span>
        </a>
        <nav class="main-nav" aria-label="Primary">
          <a id="t_nav_home" href="/index.html">Home</a>
          <a id="t_nav_membership" href="/membership.html">Membership</a>
          <a id="t_nav_login" href="/login.html">Login</a>
        </nav>
        <div class="header-cta">
          <label class="lang-label">Language</label>
          <select id="langSelect" class="lang-select">
            <option value="en">EN</option><option value="ko">KO</option>
            <option value="ja">JA</option><option value="zh">ZH</option>
            <option value="fr">FR</option><option value="es">ES</option>
            <option value="de">DE</option><option value="tr">TR</option>
            <option value="ar">AR</option><option value="ru">RU</option>
          </select>
          <a id="t_nav_signup" href="/signup.html" class="btn btn-gold">Sign Up</a>
          <button id="btnLogout" class="btn btn-ghost" style="display:none">Logout</button>
        </div>
      </div>
    </header>`;
  }

  function renderFooter(){
    const el = $('#global-footer');
    if(!el) return;
    el.innerHTML = `
      <footer class="site-footer">
        <div class="container"><small>© StayWorld — stayworldbooking.com</small></div>
      </footer>`;
  }

  /* -------- 로그인 상태 반영 -------- */
  function bindAuthHeader(){
    firebaseAuth.onAuthStateChanged(user=>{
      const loginLink = $('#t_nav_login');
      const signupBtn = $('#t_nav_signup');
      const logoutBtn = $('#btnLogout');

      if(user){
        // 로그인 상태
        if(loginLink){ loginLink.textContent = 'My Page'; loginLink.href = '/host-register.html'; }
        if(signupBtn){ signupBtn.style.display = 'none'; }
        if(logoutBtn){ logoutBtn.style.display = 'inline-flex'; logoutBtn.onclick = async()=>{ await firebaseAuth.signOut(); location.href='/index.html'; }; }
      }else{
        // 로그아웃 상태
        if(loginLink){ loginLink.textContent = 'Login'; loginLink.href = '/login.html'; }
        if(signupBtn){ signupBtn.style.display = 'inline-flex'; }
        if(logoutBtn){ logoutBtn.style.display = 'none'; }
      }
    });
  }

  /* -------- 챗봇 -------- */
  function ensureChat(){
    let fab = $('#chatFab'); if(!fab){ fab = document.createElement('button'); fab.id='chatFab'; fab.textContent='💬'; document.body.appendChild(fab); }
    let panel = $('#botPanel');
    if(!panel){
      panel = document.createElement('div'); panel.id='botPanel';
      panel.innerHTML = `
        <div class="hdr"><strong>AI Concierge</strong><button id="botClose" class="btn btn-ghost">✕</button></div>
        <div id="botBody" class="body"><div class="msg ai">Hello! Ask in any language.</div></div>
        <div class="row"><input id="botInput" placeholder="Type a message…" class="input"><button id="botSend" class="btn btn-gold">Send</button></div>`;
      document.body.appendChild(panel);
    }
    const open=()=>{panel.style.display='block';}; const close=()=>{panel.style.display='none';};
    on(fab,'click',e=>{e.stopPropagation();open();});
    on($('#botClose',panel),'click',e=>{e.stopPropagation();close();});
    on(document,'click',e=>{
      if(panel.style.display!=='block')return;
      const r=panel.getBoundingClientRect();
      const inside=e.clientX>=r.left&&e.clientX<=r.right&&e.clientY>=r.top&&e.clientY<=r.bottom;
      if(!inside) close();
    });
    const body=$('#botBody',panel), input=$('#botInput',panel), send=$('#botSend',panel);
    const msgs=[];
    const add=(t,me)=>{const d=document.createElement('div'); d.className=`msg ${me?'me':'ai'}`; d.textContent=t; body.appendChild(d); body.scrollTop=body.scrollHeight;};
    async function askAI(message,lang){
      for(const ep of ['/.netlify/functions/sw-chat']){ // 필요시 '/api/chat' 추가
        try{
          const r=await fetch(ep,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({messages:[...msgs,{role:'user',content:message}],lang})});
          if(r.ok){const d=await r.json(); if(d.reply) return d.reply;}
        }catch(_){}
      }
      return '(Backend not found. Check your function URL.)';
    }
    on(send,'click', async ()=>{
      const v=(input.value||'').trim(); if(!v) return; input.value=''; add(v,true); msgs.push({role:'user',content:v}); add('…',false); const dots=body.lastChild;
      try{ const code = ($('#langSelect')?.value)||'en'; const reply=await askAI(v,code); dots.remove(); add(reply,false); msgs.push({role:'assistant',content:reply}); }
      catch(_){ dots.remove(); add('Assistant is unavailable.',false); }
    });
    on(input,'keydown',e=>{ if(e.key==='Enter') $('#botSend').click(); });
  }

  /* -------- 필터 드로어 -------- */
  function ensureFilters(){
    let d=$('#filterDrawer'); if(d) return;
    d=document.createElement('div'); d.id='filterDrawer'; d.setAttribute('aria-hidden','true');
    d.innerHTML=`
      <div class="back"></div>
      <div class="panel">
        <div class="head">
          <strong id="fTitle">Filters</strong>
          <div style="display:flex;gap:8px;align-items:center">
            <button id="swClose" class="btn btn-ghost">✕</button>
          </div>
        </div>
        <div id="filterGrid"></div>
        <div class="foot">
          <button id="swReset" class="btn btn-ghost">Reset</button>
          <button id="swApply" class="btn btn-gold">Apply</button>
        </div>
      </div>`;
    document.body.appendChild(d);

    const GROUPS=[
      {t:'Price', kind:'price'},
      {t:'Stay type', checks:['Hotel','Motel','Hostel','Apartment','Villa','Ryokan','Guesthouse','B&B']},
      {t:'Review', radios:['4.5+','4.0+','Any']},
      {t:'Beds & Baths', inputs:[['number','beds',{min:1,value:1}],['number','baths',{min:1,value:1}]]},
      {t:'Pets', checks:['Allowed']},{t:'Check-in', checks:['Self check-in']},
      {t:'Amenities', checks:['Wi-Fi','Kitchen','Parking','Pool','Air conditioning','Gym','Workspace','Washer','Dryer','Breakfast']},
      {t:'Booking', checks:['Instant book','Request to book']},
      {t:'Verification', checks:['Verified listings only','Verified reviews']},
      {t:'Long-stay', checks:['Show long-stay deals']},
      {t:'Business', checks:['B2B-ready','Invoice available']},
      {t:'Location', checks:['Near airport','Near station','Near beach','City center']},
      {t:'Accessibility', checks:['Step-free access','Elevator','Wide doorway','Accessible bathroom']},
      {t:'Experiences', checks:['Nature','Camping','Traditional','Ski-in/out','Wine country']},
      {t:'View', checks:['Sea view','City view','Mountain view','Garden']},
      {t:'Safety', checks:['Carbon monoxide alarm','Smoke alarm','First aid kit']},
      {t:'Family', checks:['Crib','High chair','Stroller friendly']},
      {t:'Entertainment', checks:['TV','Netflix','Game console']},
      {t:'Outdoor', checks:['BBQ grill','Patio','Private garden']},
      {t:'Parking', checks:['On-site','Street','Paid garage']},
    ];
    const grid = $('#filterGrid',d);
    GROUPS.forEach((g,gi)=>{
      const box=document.createElement('div'); box.className='box';
      box.innerHTML=`<h4>${g.t}</h4>`; grid.appendChild(box);
      if(g.kind==='price'){
        box.insertAdjacentHTML('beforeend',`
          <div style="display:grid;gap:10px">
            <div style="display:flex;justify-content:space-between;font-size:13px"><span>Price per night</span><span><span id="priceMinVal">100</span> ~ <span id="priceMaxVal">800</span></span></div>
            <label style="font-size:12px;opacity:.8">Min</label><input type="range" id="priceMin" min="0" max="1000" step="10" value="100">
            <label style="font-size:12px;opacity:.8">Max</label><input type="range" id="priceMax" min="0" max="5000" step="50" value="800">
          </div>`);
      }
      (g.inputs||[]).forEach(([type,id,attrs])=>{
        const wrap=document.createElement('div'); wrap.style.margin='6px 0';
        wrap.innerHTML=`<label style="font-size:12px">${id}</label><input class="input" type="${type}" id="${id}" style="width:100%">`;
        Object.entries(attrs||{}).forEach(([k,v])=>wrap.querySelector('input').setAttribute(k,v));
        box.appendChild(wrap);
      });
      (g.radios||[]).forEach((name,ri)=>{
        const id=`rg_${gi}_${ri}`; const lab=document.createElement('label'); lab.style.cssText='display:inline-flex;align-items:center;gap:6px;margin:6px 10px 0 0';
        lab.innerHTML=`<input type="radio" name="rg_${gi}" id="${id}" ${/Any/i.test(name)?'checked':''}> ${name}`; box.appendChild(lab);
      });
      (g.checks||[]).forEach((name,ci)=>{
        const id=`ck_${gi}_${ci}`; const lab=document.createElement('label'); lab.style.cssText='display:inline-flex;align-items:center;gap:6px;margin:6px 10px 0 0';
        lab.innerHTML=`<input type="checkbox" id="${id}"> ${name}`; box.appendChild(lab);
      });
    });

    const close=()=>{d.setAttribute('aria-hidden','true');};
    on($('.back',d),'click',close);
    on($('#swClose',d),'click',close);
    on($('#swReset',d),'click',()=>{
      $$('input[type=checkbox]',d).forEach(i=>i.checked=false);
      $$('input[type=radio]',d).forEach(i=>i.checked=/Any/i.test(i.nextSibling?.textContent||'Any'));
      $('#priceMin').value=100; $('#priceMax').value=800;
      $('#priceMinVal').textContent=100; $('#priceMaxVal').textContent=800;
      setBadge('');
    });
    on($('#swApply',d),'click',()=>{ const n=$$('input[type=checkbox]:checked, input[type=radio]:checked',d).length; setBadge(n?n.toString():''); close(); });
    on($('#priceMin',d),'input',e=> $('#priceMinVal').textContent=e.target.value);
    on($('#priceMax',d),'input',e=> $('#priceMaxVal').textContent=e.target.value);

    function setBadge(text){
      const btn=$('#btnFilters'); if(!btn) return;
      btn.style.position='relative'; let b=btn.querySelector('.sw-badge');
      if(text){ if(!b){b=document.createElement('span'); b.className='sw-badge'; btn.appendChild(b);} b.textContent=text; } else { b?.remove(); }
    }

    const btn = $('#btnFilters');
    if(btn){ on(btn,'click',e=>{ e.stopPropagation(); d.setAttribute('aria-hidden','false'); }); }
  }

  /* -------- 지도 -------- */
  function initMapIfNeeded(){
    const mapEl = $('#map'); if(!mapEl) return;
    const map = L.map('map',{scrollWheelZoom:true}).setView([48.8566,2.3522],12);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{attribution:'&copy; OpenStreetMap'}).addTo(map);
    window.__swMap = map;
  }

  /* -------- 페이지 초기화 -------- */
  function init(){
    renderHeader();
    renderFooter();
    bindAuthHeader();
    ensureChat();
    ensureFilters();
    initMapIfNeeded();
    if(window.StayWorldI18n?.applyLang){
      const saved = localStorage.getItem("sw_lang") || (navigator.language||"en").slice(0,2).toLowerCase();
      const final = ['en','ko','tr','fr','ja','de','es','it','zh','ru'].includes(saved) ? saved : 'en';
      StayWorldI18n.applyLang(final);
    }
  }
  if(document.readyState==='loading'){ document.addEventListener('DOMContentLoaded', init); } else { init(); }
})();
