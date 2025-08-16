/* ============================================================
   STAYWORLD — app.js (FIX PACK v4)
   - 필터 드로어 & 챗봇 클릭 불가 이슈 종결
   - 요소가 없어도 자동 생성, 중복 리스너 제거, z-index/overlay 가드
   - 20개+ 필터 그룹 예시 렌더 + 배지 카운트
   - AI 봇: Netlify/Vercel 함수 호출 → 없으면 데모 응답
   ============================================================ */

(function(){
  // ---------- Utils ----------
  const $  = (s,sc)=> (sc||document).querySelector(s);
  const $$ = (s,sc)=> Array.from((sc||document).querySelectorAll(s));
  const fresh = (el)=>{ if(!el) return el; const c = el.cloneNode(true); el.replaceWith(c); return c; };
  const on = (el,ev,fn)=> el && el.addEventListener(ev,fn,{passive:false});

  // 전역 overlay/레거시 modal이 클릭을 막지 않게 처리
  function overlayGuard(){
    // 레거시 .modal: open 아닐 때는 반드시 비활성
    $$('.modal').forEach(m=>{
      if(!m.classList.contains('open')){
        m.style.display = 'none';
        m.style.pointerEvents = 'none';
      }
    });
    // data-overlay가 붙었는데 열려있지 않으면 비활성
    $$('[data-overlay]').forEach(o=>{
      if(!o.classList.contains('open')){
        o.style.pointerEvents = 'none';
      }
    });
  }

  // ---------- Ensure core elements ----------
  function ensureFilterDrawer(){
    let drawer = $('#filterDrawer');
    if(!drawer){
      drawer = document.createElement('div');
      drawer.id = 'filterDrawer';
      drawer.setAttribute('aria-hidden','true');
      drawer.innerHTML = `
        <div class="drawer-backdrop"></div>
        <div class="drawer-panel">
          <div class="drawer-head">
            <h3>Filters</h3>
            <button id="filterClose" aria-label="Close" class="btn btn-ghost">✕</button>
          </div>
          <div class="drawer-body">
            <div id="filterGrid" class="filter-grid"></div>
          </div>
          <div class="drawer-foot">
            <button id="filterReset" class="btn btn-ghost">Reset</button>
            <button id="applyFilters" class="btn btn-gold">Apply</button>
          </div>
        </div>`;
      document.body.appendChild(drawer);
    }
    return drawer;
  }

  function ensureFilterButton(){
    // 기존 버튼 후보들 중 하나라도 있으면 사용
    let btn = $('#filterOpen') || $('#btnFilters') || $('[data-action="filters-open"]');
    if(!btn){
      const bar = $('.sw-searchbar, .search-bar, .searchbar');
      if(bar){
        btn = document.createElement('button');
        btn.id = 'filterOpen';
        btn.className = 'btn btn-chip';
        btn.textContent = 'Filters';
        bar.appendChild(btn);
      }
    }
    // 배지 카운트 표시용 속성
    if(btn && !btn.classList.contains('badge')) btn.classList.add('badge');
    btn?.setAttribute('data-badge', '');
    return btn;
  }

  function ensureChat(){
    let fab = $('#chatFab') || $('#open-ai') || $('#openBot');
    if(!$('#chatFab')){
      // id를 chatFab로 통일
      if(fab){ fab.id = 'chatFab'; }
    }
    if(!fab){
      fab = document.createElement('button');
      fab.id = 'chatFab';
      fab.title = 'AI Concierge';
      fab.textContent = '💬';
      document.body.appendChild(fab);
    }
    let panel = $('#botPanel');
    if(!panel){
      panel = document.createElement('div');
      panel.id = 'botPanel';
      panel.hidden = true;
      panel.innerHTML = `
        <div class="sw-bot-head">
          <div class="sw-title">AI Concierge</div>
          <button id="botClose" class="btn btn-ghost" aria-label="Close">✕</button>
        </div>
        <div class="sw-bot-body" id="botBody">
          <div class="sw-bot-msg sys">Hello! Ask me anything in your language.</div>
        </div>
        <div class="sw-bot-foot">
          <input id="botInput" placeholder="Type a message…"/>
          <button class="btn btn-gold" id="botSend">Send</button>
        </div>`;
      document.body.appendChild(panel);
    }
    // 최상위로 올려서 지도/다른 레이어에 가려지지 않게
    panel.style.zIndex = '1300';
    fab.style.zIndex = '1300';
    return { fab, panel };
  }

  // ---------- Filters: schema + render ----------
  const FILTER_GROUPS = [
    { title:'Price per night', inputs:[
      {type:'range', id:'priceMin', attrs:{min:0,max:1000,step:10}},
      {type:'range', id:'priceMax', attrs:{min:0,max:5000,step:50}},
    ]},
    { title:'Stay type', options:['Hotel','Motel','Hostel','Apartment','Villa','Ryokan','Guesthouse','B&B'] },
    { title:'Review score', radios:['4.5+','4.0+','Any'] },
    { title:'Beds & Baths', inputs:[
      {type:'number', id:'beds',  attrs:{min:1,value:1}},
      {type:'number', id:'baths', attrs:{min:1,value:1}},
    ]},
    { title:'Pets', checks:['Allowed'] },
    { title:'Check-in', checks:['Self check-in'] },
    { title:'Amenities', checks:['Wi-Fi','Kitchen','Parking','Pool','Air conditioning','Gym','Workspace','Washer','Dryer','Breakfast'] },
    { title:'Booking', checks:['Instant book','Request to book'] },
    { title:'Verification', checks:['Verified listings only','Verified reviews'] },
    { title:'Long-stay', checks:['Show long-stay deals'] },
    { title:'Business', checks:['B2B-ready','Invoice available'] },
    { title:'Location', checks:['Near airport','Near station','Near beach','City center'] },
    { title:'Accessibility', checks:['Step-free access','Elevator','Wide doorway','Accessible bathroom'] },
    { title:'Experiences', checks:['Nature','Camping','Traditional','Ski-in/out','Wine country'] },
    { title:'View', checks:['Sea view','City view','Mountain view'] },
    { title:'Safety', checks:['Carbon monoxide alarm','Smoke alarm','First aid kit'] },
    { title:'Family', checks:['Crib','High chair','Stroller friendly'] },
    { title:'Entertainment', checks:['TV','Netflix','Game console'] },
    { title:'Outdoor', checks:['BBQ grill','Patio','Private garden'] },
    { title:'Parking', checks:['On-site','Street','Paid garage'] },
    // 20개 이상 채움
  ];

  function renderFilters(grid){
    if(!grid) return;
    grid.innerHTML = '';
    FILTER_GROUPS.forEach((g, idx)=>{
      const wrap = document.createElement('div');
      wrap.className = 'sw-filter-group';
      const h = document.createElement('h4');
      h.textContent = g.title;
      wrap.appendChild(h);

      // inputs
      (g.inputs||[]).forEach(inp=>{
        const el = document.createElement('input');
        el.type = inp.type; el.id = inp.id;
        Object.entries(inp.attrs||{}).forEach(([k,v])=> el.setAttribute(k,v));
        const lab = document.createElement('label');
        lab.htmlFor = inp.id;
        lab.textContent = inp.id;
        wrap.appendChild(lab);
        wrap.appendChild(el);
      });

      // radios
      if(g.radios){
        g.radios.forEach((name,i)=>{
          const id = `rg_${idx}_${i}`;
          const lab = document.createElement('label');
          lab.innerHTML = `<input type="radio" name="rg_${idx}" id="${id}" ${/Any/i.test(name)?'checked':''}> ${name}`;
          wrap.appendChild(lab);
        });
      }

      // checks
      (g.checks||g.options||[]).forEach((name,i)=>{
        const id = `ck_${idx}_${i}`;
        const lab = document.createElement('label');
        lab.innerHTML = `<input type="checkbox" id="${id}"> ${name}`;
        wrap.appendChild(lab);
      });

      grid.appendChild(wrap);
    });
  }

  function selectedCount(drawer){
    let n = 0;
    $$('input[type=checkbox]', drawer).forEach(i=>{ if(i.checked) n++; });
    $$('input[type=radio]', drawer).forEach((i,ix,arr)=>{
      if(i.checked) n += 1; // 라디오도 선택 1개로 카운트
    });
    return n;
  }

  // ---------- Bindings ----------
  function bindFilters(){
    const drawer = ensureFilterDrawer();
    const openBtn = ensureFilterButton();

    function open(){ drawer.setAttribute('aria-hidden','false'); document.body.classList.add('modal-open'); }
    function close(){ drawer.setAttribute('aria-hidden','true'); document.body.classList.remove('modal-open'); }

    // 중복 제거 후 바인딩
    const freshOpen = fresh(openBtn);
    const freshClose= fresh($('#filterClose'));
    const freshApply= fresh($('#applyFilters'));
    const freshReset= fresh($('#filterReset'));

    on(freshOpen, 'click', (e)=>{ e.preventDefault(); e.stopPropagation(); open(); });
    on(freshClose,'click', (e)=>{ e.preventDefault(); e.stopPropagation(); close(); });
    on($('.drawer-backdrop', drawer),'click', close);
    on($('.drawer-panel', drawer),'click', (e)=> e.stopPropagation());

    on(freshApply,'click', ()=>{
      const count = selectedCount(drawer);
      freshOpen.setAttribute('data-badge', count ? String(count) : '');
      close();
      console.log('[Filters] applied, count=', count);
    });

    on(freshReset,'click', ()=>{
      $$('input[type=checkbox], input[type=radio]', drawer).forEach(i=>{
        if(i.type==='checkbox') i.checked=false;
        if(i.type==='radio') i.checked = /Any/i.test(i.nextSibling?.textContent||'Any');
      });
      freshOpen.setAttribute('data-badge','');
    });

    // 최초 렌더 (없으면 생성)
    const grid = $('#filterGrid') || $('.filter-grid', drawer);
    renderFilters(grid);
  }

  // ---------- Chatbot ----------
  async function askAI(message, lang){
    // 1) Netlify function
    try{
      const r = await fetch('/.netlify/functions/sw-chat',{ method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ messages:[{role:'user',content:message}], lang }) });
      if(r.ok){
        const d = await r.json();
        if(d?.reply) return d.reply;
      }
    }catch(e){}
    // 2) Vercel /api/chat
    try{
      const r = await fetch('/api/chat',{ method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ messages:[{role:'user',content:message}], lang }) });
      if(r.ok){
        const d = await r.json();
        if(d?.reply) return d.reply;
      }
    }catch(e){}
    // 3) Fallback demo
    return '(Demo) Got it! We’ll find you the best stays.';
  }

  function bindChat(){
    const { fab, panel } = ensureChat();

    const freshFab   = fresh(fab);
    const freshClose = fresh($('#botClose'));
    const sendBtn    = fresh($('#botSend'));
    const botBody    = $('#botBody');
    const botInput   = $('#botInput');

    const open  = ()=>{ panel.hidden = false; panel.style.pointerEvents='auto'; };
    const close = ()=>{ panel.hidden = true; };

    on(freshFab, 'click', (e)=>{ e.preventDefault(); e.stopPropagation(); open(); });
    on(freshClose, 'click', (e)=>{ e.preventDefault(); e.stopPropagation(); close(); });
    on(panel, 'click', (e)=> e.stopPropagation()); // 패널 내부 클릭 버블 차단
    on(document, 'click', (e)=>{ // 바깥 클릭시 닫기 (필요 시)
      if(!panel.hidden){
        const r = panel.getBoundingClientRect();
        const inBox = e.clientX>=r.left && e.clientX<=r.right && e.clientY>=r.top && e.clientY<=r.bottom;
        if(!inBox) close();
      }
    });

    function appendMsg(text, sys=false){
      const d = document.createElement('div');
      d.className = 'sw-bot-msg' + (sys?' sys':'');
      d.textContent = text;
      botBody.appendChild(d);
      botBody.scrollTop = botBody.scrollHeight;
    }

    on(sendBtn, 'click', async ()=>{
      const v = (botInput?.value||'').trim(); if(!v) return;
      appendMsg(v);
      botInput.value = '';
      const lang = ($('#langSelect')?.value)||'en';
      appendMsg('…', true);
      const dots = botBody.lastElementChild;
      try{
        const reply = await askAI(v, lang);
        dots.remove();
        appendMsg(reply, true);
      }catch(e){
        dots.remove();
        appendMsg('(Error) Please try again.', true);
      }
    });

    // 엔터 전송
    on(botInput,'keydown',(e)=>{
      if(e.key==='Enter' && !e.shiftKey){
        e.preventDefault();
        sendBtn.click();
      }
    });
  }

  // ---------- Init ----------
  function init(){
    try{
      overlayGuard();
      bindFilters();
      bindChat();

      // Leaflet 레이어가 버튼 덮지 않게 최종 보정
      $$('.leaflet-container,.leaflet-pane,.leaflet-top,.leaflet-bottom').forEach(n=> n.style.zIndex='0');
      $('#chatFab')?.style.setProperty('z-index','1300');
      $('#botPanel')?.style.setProperty('z-index','1300');

      console.log('%c[SW] UI ready','color:#f4d78c');
    }catch(e){
      console.error('[SW] init error', e);
    }
  }

  // DOM ready + 동적 교체 방지(옵저버)
  if(document.readyState==='loading'){
    document.addEventListener('DOMContentLoaded', init);
  }else{
    init();
  }
  const mo = new MutationObserver((m)=>{
    // 핵심 노드가 치환되면 즉시 재결선
    const needRebind =
      !$('#filterDrawer .drawer-panel') ||
      !$('#chatFab') || !$('#botPanel');
    if(needRebind){ init(); }
  });
  mo.observe(document.documentElement, {childList:true,subtree:true});

})();
