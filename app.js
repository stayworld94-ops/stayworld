/* ============================================================
   STAYWORLD — app.js (v5 HOTFIX)
   - Filters 버튼 텍스트 기반 자동 인식 + 위임 클릭
   - Drawer/Backdrop/Panel 인라인 스타일로 즉시 표시 가능
   - Chat FAB/Panel 생성 + 인라인 스타일(바로 보임)
   - 지도/오버레이 z-index 충돌 우회
   ============================================================ */

(function(){
  const $  = (s,sc)=> (sc||document).querySelector(s);
  const $$ = (s,sc)=> Array.from((sc||document).querySelectorAll(s));
  const fresh = (el)=>{ if(!el) return el; const c = el.cloneNode(true); el.replaceWith(c); return c; };
  const on = (el,ev,fn)=> el && el.addEventListener(ev,fn,{passive:false});

  /* ---------- 공통: 오버레이 가드 ---------- */
  function overlayGuard(){
    // 닫힌 modal/overlay는 반드시 클릭 막지 않도록
    $$('.modal').forEach(m=>{
      if(!m.classList.contains('open')){
        m.style.display = 'none';
        m.style.pointerEvents = 'none';
      }
    });
    $$('[data-overlay]').forEach(o=>{
      if(!o.classList.contains('open')){
        o.style.pointerEvents = 'none';
      }
    });
  }

  /* ---------- Filters Drawer 생성/스타일 ---------- */
  function ensureFilterDrawer(){
    let drawer = $('#filterDrawer');
    if(!drawer){
      drawer = document.createElement('div');
      drawer.id = 'filterDrawer';
      drawer.setAttribute('aria-hidden','true');
      document.body.appendChild(drawer);
    }

    // 인라인 스타일(외부 CSS가 없어도 동작)
    Object.assign(drawer.style, {
      position:'fixed', inset:'0', display:'none', zIndex:'1400',
      alignItems:'stretch', justifyContent:'flex-end'
    });

    if(!$('.drawer-backdrop',drawer)){
      const backdrop = document.createElement('div');
      backdrop.className = 'drawer-backdrop';
      Object.assign(backdrop.style, {
        position:'absolute', inset:'0', background:'rgba(0,0,0,.45)'
      });
      drawer.appendChild(backdrop);
    }
    if(!$('.drawer-panel',drawer)){
      const panel = document.createElement('div');
      panel.className = 'drawer-panel';
      Object.assign(panel.style, {
        position:'relative', marginLeft:'auto', width:'min(780px,92vw)',
        maxHeight:'92vh', overflow:'auto', background:'#101018',
        borderLeft:'1px solid rgba(255,255,255,.08)',
        borderTopLeftRadius:'16px', borderBottomLeftRadius:'16px',
        display:'flex', flexDirection:'column'
      });
      panel.innerHTML = `
        <div class="drawer-head" style="display:flex;align-items:center;justify-content:space-between;padding:12px 14px;border-bottom:1px solid rgba(255,255,255,.08)">
          <h3 style="margin:0">Filters</h3>
          <button id="filterClose" class="btn btn-ghost" aria-label="Close">✕</button>
        </div>
        <div class="drawer-body" style="padding:14px;flex:1;overflow:auto">
          <div id="filterGrid" style="display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:14px"></div>
        </div>
        <div class="drawer-foot" style="display:flex;align-items:center;justify-content:space-between;padding:12px 14px;border-top:1px solid rgba(255,255,255,.08)">
          <button id="filterReset" class="btn btn-ghost">Reset</button>
          <button id="applyFilters" class="btn btn-gold">Apply</button>
        </div>`;
      drawer.appendChild(panel);
    }
    return drawer;
  }

  // 필터 스키마(20+)
  const FILTER_GROUPS = [
    { title:'Price per night', inputs:[
      {type:'range', id:'priceMin', attrs:{min:0,max:1000,step:10}},
      {type:'range', id:'priceMax', attrs:{min:0,max:5000,step:50}},
    ]},
    { title:'Stay type', checks:['Hotel','Motel','Hostel','Apartment','Villa','Ryokan','Guesthouse','B&B'] },
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
  ];

  function renderFilters(grid){
    grid.innerHTML = '';
    FILTER_GROUPS.forEach((g,gi)=>{
      const box = document.createElement('div');
      box.style.cssText = 'background:#0f1420;border:1px solid rgba(255,255,255,.08);border-radius:12px;padding:12px';
      const h = document.createElement('h4');
      h.textContent = g.title; h.style.margin='0 0 8px'; h.style.fontSize='14px';
      box.appendChild(h);

      (g.inputs||[]).forEach(inp=>{
        const wrap = document.createElement('div'); wrap.style.margin='6px 0';
        const lab = document.createElement('label'); lab.textContent = inp.id; lab.style.fontSize='12px';
        const el = document.createElement('input'); el.type = inp.type; el.id = inp.id;
        Object.entries(inp.attrs||{}).forEach(([k,v])=> el.setAttribute(k,v));
        el.style.width='100%';
        wrap.append(lab, el);
        box.appendChild(wrap);
      });

      (g.radios||[]).forEach((name,ri)=>{
        const id=`rg_${gi}_${ri}`;
        const lab = document.createElement('label');
        lab.style.display='inline-flex'; lab.style.alignItems='center'; lab.style.gap='6px'; lab.style.margin='6px 10px 0 0';
        lab.innerHTML = `<input type="radio" name="rg_${gi}" id="${id}" ${/Any/i.test(name)?'checked':''}> ${name}`;
        box.appendChild(lab);
      });

      (g.checks||[]).forEach((name,ci)=>{
        const id=`ck_${gi}_${ci}`;
        const lab = document.createElement('label');
        lab.style.display='inline-flex'; lab.style.alignItems='center'; lab.style.gap='6px'; lab.style.margin='6px 10px 0 0';
        lab.innerHTML = `<input type="checkbox" id="${id}"> ${name}`;
        box.appendChild(lab);
      });

      grid.appendChild(box);
    });
  }

  function selectedCount(root){
    let n=0;
    $$('input[type=checkbox]',root).forEach(i=>{ if(i.checked) n++; });
    $$('input[type=radio]',root).forEach(i=>{ if(i.checked) n++; });
    return n;
  }

  /* ---------- Filters 바인딩 ---------- */
  function bindFilters(){
    const drawer = ensureFilterDrawer();
    const grid   = $('#filterGrid', drawer);
    renderFilters(grid);

    const panel    = $('.drawer-panel', drawer);
    const backdrop = $('.drawer-backdrop', drawer);
    const btnClose = fresh($('#filterClose', drawer));
    const btnReset = fresh($('#filterReset', drawer));
    const btnApply = fresh($('#applyFilters', drawer));

    const open = ()=>{ drawer.style.display='flex'; document.body.style.overscrollBehavior='contain'; };
    const close= ()=>{ drawer.style.display='none'; document.body.style.overscrollBehavior='auto'; };

    on(backdrop,'click', close);
    on(panel,'click', e=> e.stopPropagation());
    on(btnClose,'click', e=>{ e.preventDefault(); e.stopPropagation(); close(); });

    on(btnReset,'click', ()=>{
      $$('input[type=checkbox]',drawer).forEach(i=> i.checked=false);
      $$('input[type=radio]',drawer).forEach(i=> i.checked = /Any/i.test(i.nextSibling?.textContent||'Any'));
      setBadge('');
    });

    function setBadge(text){
      const target = findFilterButton();
      if(!target) return;
      target.dataset.badge = text;
      target.setAttribute('data-badge', text);
      // 뱃지 스타일 없을 수 있으니 최소 표시
      target.style.position = 'relative';
      if(text){
        if(!target.querySelector('.sw-badge')){
          const b = document.createElement('span');
          b.className='sw-badge';
          Object.assign(b.style,{
            position:'absolute', top:'-8px', right:'-8px',
            background:'#ffd36e', color:'#1a1205',
            borderRadius:'999px', fontSize:'11px', padding:'2px 6px'
          });
          b.textContent = text; target.appendChild(b);
        }else{ target.querySelector('.sw-badge').textContent = text; }
      }else{
        target.querySelector('.sw-badge')?.remove();
      }
    }

    on(btnApply,'click', ()=>{
      const c = selectedCount(drawer);
      setBadge(c ? String(c) : '');
      close();
    });

    // ① 눈에 보이는 Filters 버튼 찾기 (id/텍스트/role 모두 허용)
    function findFilterButton(){
      const list = $$('button,a,[role="button"]')
        .filter(el=>{
          const txt = (el.textContent||'').trim();
          const id  = el.id||'';
          const ds  = (el.dataset && (el.dataset.action||'')) || '';
          const rect= el.getBoundingClientRect();
          const visible = rect.width>0 && rect.height>0 && getComputedStyle(el).visibility!=='hidden';
          return visible && (/filter/i.test(txt) || /filter/i.test(id) || /filter/i.test(ds));
        });
      // 화면 우측(검색 바 끝)쪽에 있는 걸 우선
      return list.sort((a,b)=> b.getBoundingClientRect().left - a.getBoundingClientRect().left)[0] || null;
    }

    // ② 해당 버튼에 직접 바인딩 + 문서 위임(어떤 버튼이든 동작)
    const btn = fresh(findFilterButton());
    if(btn){
      btn.style.pointerEvents='auto';
      on(btn,'click',(e)=>{ e.preventDefault(); e.stopPropagation(); open(); });
    }
    on(document,'click',(e)=>{
      const t = e.target.closest('button,a,[role="button"]');
      if(!t) return;
      const txt=(t.textContent||'').trim();
      const id = t.id||'';
      const ds = (t.dataset && (t.dataset.action||'')) || '';
      if(/filter/i.test(txt) || /filter/i.test(id) || /filter/i.test(ds)){
        e.preventDefault(); e.stopPropagation(); open();
      }
    });
  }

  /* ---------- Chatbot 생성/바인딩 (인라인 스타일 포함) ---------- */
  async function askAI(message, lang){
    // Netlify 함수 → 실패 시 Vercel → 실패 시 데모
    try{
      const r = await fetch('/.netlify/functions/sw-chat',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({messages:[{role:'user',content:message}],lang})});
      if(r.ok){ const d=await r.json(); if(d?.reply) return d.reply; }
    }catch(_){}
    try{
      const r = await fetch('/api/chat',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({messages:[{role:'user',content:message}],lang})});
      if(r.ok){ const d=await r.json(); if(d?.reply) return d.reply; }
    }catch(_){}
    return '(Demo) I received your message and will assist you.';
  }

  function ensureChat(){
    let fab = $('#chatFab');
    if(!fab){
      fab = document.createElement('button');
      fab.id = 'chatFab';
      fab.textContent = '💬';
      Object.assign(fab.style,{
        position:'fixed', right:'20px', bottom:'20px',
        width:'56px', height:'56px', borderRadius:'50%',
        border:'0', cursor:'pointer', zIndex:'1500',
        background:'linear-gradient(180deg,#f4d78c,#c9a35b)',
        boxShadow:'0 14px 30px rgba(201,163,91,.35)', fontSize:'22px'
      });
      document.body.appendChild(fab);
    }
    let panel = $('#botPanel');
    if(!panel){
      panel = document.createElement('div');
      panel.id = 'botPanel';
      Object.assign(panel.style,{
        position:'fixed', right:'20px', bottom:'86px',
        width:'min(360px,88vw)', height:'480px',
        background:'#101018', border:'1px solid #23232b',
        borderRadius:'16px', zIndex:'1500', display:'none',
        boxShadow:'0 20px 60px rgba(0,0,0,.5)', color:'#e7e9ee'
      });
      panel.innerHTML = `
        <div style="display:flex;align-items:center;justify-content:space-between;padding:10px 12px;border-bottom:1px solid rgba(255,255,255,.08)">
          <strong>AI Concierge</strong>
          <button id="botClose" class="btn btn-ghost" style="background:transparent;border:0;color:#e7e9ee;cursor:pointer">✕</button>
        </div>
        <div id="botBody" style="height:360px;overflow:auto;padding:10px;display:flex;flex-direction:column;gap:8px">
          <div style="align-self:flex-start;background:#121820;padding:10px 12px;border-radius:12px;max-width:80%">Hello! Ask in any language.</div>
        </div>
        <div style="display:flex;gap:8px;padding:10px;border-top:1px solid rgba(255,255,255,.08)">
          <input id="botInput" placeholder="Type a message…" style="flex:1;background:#0f1621;border:1px solid rgba(255,255,255,.08);color:#e7e9ee;border-radius:12px;padding:10px 12px"/>
          <button id="botSend" class="btn btn-gold" style="border:0;border-radius:12px;padding:10px 14px;background:linear-gradient(180deg,#f4d78c,#c9a35b);color:#1a1205;font-weight:700">Send</button>
        </div>`;
      document.body.appendChild(panel);
    }
    return { fab, panel };
  }

  function bindChat(){
    const { fab, panel } = ensureChat();
    const btnClose = $('#botClose', panel);
    const botBody  = $('#botBody', panel);
    const botInput = $('#botInput', panel);
    const btnSend  = $('#botSend', panel);

    const open  = ()=> panel.style.display = 'block';
    const close = ()=> panel.style.display = 'none';

    on(fab,'click',(e)=>{ e.preventDefault(); e.stopPropagation(); open(); });
    on(btnClose,'click',(e)=>{ e.preventDefault(); e.stopPropagation(); close(); });
    on(panel,'click',(e)=> e.stopPropagation());
    on(document,'click',(e)=>{
      if(panel.style.display==='block'){
        const r = panel.getBoundingClientRect();
        const inBox = e.clientX>=r.left && e.clientX<=r.right && e.clientY>=r.top && e.clientY<=r.bottom;
        if(!inBox) close();
      }
    });

    function add(text, me=false){
      const d = document.createElement('div');
      d.style.cssText = `align-self:${me?'flex-end':'flex-start'};background:${me?'#132132':'#121820'};padding:10px 12px;border-radius:12px;max-width:80%`;
      d.textContent = text; botBody.appendChild(d); botBody.scrollTop = botBody.scrollHeight;
    }

    on(btnSend,'click', async ()=>{
      const v = (botInput.value||'').trim(); if(!v) return;
      add(v,true); botInput.value='';
      add('…'); const dots = botBody.lastElementChild;
      try{
        const lang = ($('#langSelect')?.value)||'en';
        const reply = await askAI(v, lang);
        dots.remove(); add(reply,false);
      }catch(_){ dots.remove(); add('(Error) Please retry.',false); }
    });
    on(botInput,'keydown',(e)=>{ if(e.key==='Enter' && !e.shiftKey){ e.preventDefault(); btnSend.click(); }});
  }

  /* ---------- Init ---------- */
  function init(){
    try{
      overlayGuard();
      bindFilters();
      bindChat();

      // 지도 레이어가 버튼을 덮지 않도록
      $$('.leaflet-container,.leaflet-pane,.leaflet-top,.leaflet-bottom').forEach(n=> n.style.zIndex='10');
    }catch(e){
      console.error('[SW] init error', e);
    }
  }
  if(document.readyState==='loading'){ document.addEventListener('DOMContentLoaded', init); } else { init(); }

  // 핵심 노드가 교체되면 재바인딩
  const mo = new MutationObserver(()=> init());
  mo.observe(document.documentElement,{childList:true,subtree:true});
})();
