/* ===========================
   STAYWORLD UI FIX PACK (v2)
   - Click 안먹는 문제(중복 리스너/오버레이) 방지
   - 검색: 지오코딩(Nominatim → Photon 폴백) + 지도 이동
   - 필터: 오버레이/패널 자동 생성 + 열기/닫기/적용
   - 번역: lang / langSelect 둘 다 감지
   - 챗봇: /api/chat → 실패 시 /.netlify/functions/chat → 둘 다 실패면 데모
   =========================== */

/* ---------- small utils ---------- */
const $ = (s, root=document)=>root.querySelector(s);
const $$ = (s, root=document)=>Array.from(root.querySelectorAll(s));
function byIdAny(...ids){ for(const id of ids){ const el = document.getElementById(id); if(el) return el; } return null; }
function swapNode(el){ if(!el||!el.parentNode) return el; const c=el.cloneNode(true); el.parentNode.replaceChild(c,el); return c; }
function setStatus(msg){
  let status = byIdAny('searchStatus');
  if(!status){/* ===========================
   STAYWORLD UI FIX PACK (v3)
   - 클릭 불능(중복 리스너/오버레이) 제거
   - 필터: 20+ 세분화 그룹 자동 패널 + 열기/닫기/적용
   - 검색: 지오코딩(Nominatim→Photon 폴백) + 지도 이동
   - 챗봇: 버튼/패널 자동 생성, 백엔드 있으면 실제 응답
   - 다국어: lang/langSelect 감지 → lang.js 연동
   =========================== */

/* ---------- utils ---------- */
const $ = (s, r=document)=>r.querySelector(s);
const $$ = (s, r=document)=>Array.from(r.querySelectorAll(s));
function byIdAny(...ids){ for(const id of ids){ const el = document.getElementById(id); if(el) return el; } return null; }
function swapNode(el){ if(!el||!el.parentNode) return el; const c=el.cloneNode(true); el.parentNode.replaceChild(c,el); return c; }
function setStatus(msg){
  let status = byIdAny('searchStatus');
  if(!status){
    status = document.createElement('div');
    status.id = 'searchStatus';
    status.className = 'search-status';
    const bar = $('.searchbar, .sw-searchbar, .search-bar') || $('#search')?.parentNode;
    (bar?.parentNode || document.body).appendChild(status);
  }
  status.textContent = msg || '';
  status.style.opacity = msg ? 1 : 0;
  if(msg){
    clearTimeout(status._t);
    status._t = setTimeout(()=>status.style.opacity=0, 3000);
  }
}

/* ---------- language ---------- */
function getLangSelect(){ return byIdAny('lang','langSelect'); }
function getCurrentLang(){ const sel = getLangSelect(); return (sel && sel.value) || (localStorage.getItem('sw_lang')||'en'); }
function initLang(){
  const sel = getLangSelect();
  if(sel){
    const c = swapNode(sel);
    c.addEventListener('change', e=>{
      const v = e.target.value;
      localStorage.setItem('sw_lang', v);
      if (window.StayWorldI18n?.applyLang) window.StayWorldI18n.applyLang(v);
    });
  }
  const init = localStorage.getItem('sw_lang');
  if(init && window.StayWorldI18n?.applyLang) window.StayWorldI18n.applyLang(init);
}

/* ---------- map & geocoding ---------- */
let map, marker;
function initMap(){
  const el = byIdAny('map');
  if(!el || !window.L) return;
  if(map) return;
  try{
    map = L.map('map').setView([41.0082, 28.9784], 5);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{maxZoom:19}).addTo(map);
    marker = L.marker([41.0082, 28.9784]).addTo(map).bindPopup('Istanbul');
  }catch(e){ console.warn('Leaflet init failed', e); }
}
async function geocodeAny(q){
  const providers = [
    q=>`https://nominatim.openstreetmap.org/search?format=json&limit=1&q=${encodeURIComponent(q)}`,
    q=>`https://photon.komoot.io/api/?limit=1&q=${encodeURIComponent(q)}`
  ];
  for(const url of providers){
    try{
      const r = await fetch(url(q), { headers:{'Accept':'application/json'}});
      if(!r.ok) continue;
      const data = await r.json();
      if(Array.isArray(data) && data[0]) return {lat:+data[0].lat, lon:+data[0].lon, label:data[0].display_name};
      if(data?.features?.[0]){
        const f = data.features[0];
        return { lat:f.geometry.coordinates[1], lon:f.geometry.coordinates[0], label:f.properties.name || q };
      }
    }catch(e){}
  }
  throw new Error('no_results');
}
function goTo(lat, lon, label){
  if(map && window.L){
    if(marker) marker.remove();
    marker = L.marker([lat, lon]).addTo(map).bindPopup(label||'').openPopup();
    map.setView([lat, lon], 13, { animate:true });
    byIdAny('map')?.scrollIntoView({behavior:'smooth', block:'start'});
  }
}

/* ---------- search wiring ---------- */
function initSearch(){
  let input = byIdAny('searchInput','searchDestination','search');
  let btn = byIdAny('searchBtn','btnSearch');

  // 없으면 기존 링크를 버튼으로 교체
  if(!btn){
    const linkBtn = $(`.btn.btn-gold[href="/results.html"]`) || $(`a.btn.btn-gold`);
    if(linkBtn){
      btn = document.createElement('button');
      btn.id = 'btnSearch';
      btn.className = linkBtn.className;
      btn.textContent = (linkBtn.textContent||'Search').trim();
      linkBtn.replaceWith(btn);
    }
  }

  if(input) input = swapNode(input);
  if(btn) btn = swapNode(btn);

  async function run(){
    const q = (input?.value || '').trim();
    if(!q){ input?.focus(); setStatus('Enter a city or destination.'); return; }
    btn?.classList.add('loading'); setStatus('Searching…');
    try{
      const {lat, lon, label} = await geocodeAny(q);
      goTo(lat, lon, label);
      setStatus(`Found: ${label}`);
    }catch(e){
      console.error(e); setStatus('No results. Try another place.'); alert('검색 결과가 없습니다. 다른 도시를 입력해보세요.');
    }finally{
      btn?.classList.remove('loading');
    }
  }

  btn?.addEventListener('click', run);
  input?.addEventListener('keydown', e=>{ if(e.key==='Enter'){ e.preventDefault(); run(); } });
}

/* ---------- filter drawer (20+ groups) ---------- */
function ensureFilterOpenButton(){
  let openBtn = byIdAny('filterOpen');
  if(openBtn) return openBtn;

  // 검색바 옆에 동적으로 생성
  const bar = $('.sw-searchbar, .searchbar, .search-bar') || $('#search')?.parentNode;
  if(bar){
    const b = document.createElement('button');
    b.id = 'filterOpen';
    b.className = 'btn'; // 기존 스타일 상속
    b.textContent = 'Filters';
    bar.appendChild(b);
    return b;
  }
  return null;
}

function ensureFilterDrawer(){
  let drawer = byIdAny('filterDrawer');
  if(drawer) return drawer;

  drawer = document.createElement('div');
  drawer.id = 'filterDrawer';
  drawer.setAttribute('aria-hidden', 'true');
  drawer.innerHTML = `
    <div class="drawer-backdrop"></div>
    <div class="drawer-panel">
      <div class="drawer-head">
        <h3>Filters</h3>
        <button id="filterClose" aria-label="Close">✕</button>
      </div>
      <div class="drawer-body">
        <div id="filterGrid" class="filter-grid"></div>
      </div>
      <div class="drawer-foot">
        <button id="filterReset">Reset</button>
        <button id="applyFilters" class="btn btn-gold">Apply</button>
      </div>
    </div>`;
  document.body.appendChild(drawer);

  // 20+ 세분화 그룹
  const groups = [
    { title:'Stay type', name:'type', type:'checkbox', opts:['hotel','motel','hostel','apartment','villa','resort','bnb','guesthouse'] },
    { title:'Price tier', name:'price', type:'checkbox', opts:['$0-50','$50-100','$100-200','$200-400','$400+'] },
    { title:'Review score', name:'rating', type:'radio',   opts:['4.8+','4.5+','4.0+','any'] },
    { title:'Bedrooms',    name:'bedrooms', type:'radio',  opts:['Studio','1+','2+','3+','4+'] },
    { title:'Beds',        name:'beds', type:'radio',      opts:['1+','2+','3+','4+','5+'] },
    { title:'Bathrooms',   name:'baths', type:'radio',     opts:['1+','2+','3+'] },
    { title:'Amenities',   name:'amen', type:'checkbox',   opts:['wifi','kitchen','parking','pool','ac','gym','workspace','washer','dryer','heating'] },
    { title:'Facilities',  name:'fac', type:'checkbox',    opts:['spa','sauna','rooftop','garden','playground'] },
    { title:'Safety',      name:'safety', type:'checkbox', opts:['smoke_detector','co_detector','first_aid','fire_extinguisher','cctv'] },
    { title:'Rules',       name:'rules', type:'checkbox',  opts:['pets_allowed','smoking_allowed','parties_allowed','kids_friendly'] },
    { title:'Booking',     name:'booking', type:'checkbox',opts:['instant','request'] },
    { title:'Verification',name:'verify', type:'checkbox', opts:['verified_only'] },
    { title:'Location',    name:'loc', type:'checkbox',    opts:['city_center','sea_view','near_airport','near_station','near_subway'] },
    { title:'Accessibility', name:'access', type:'checkbox', opts:['step_free','elevator','wide_doors','wheelchair'] },
    { title:'Business',    name:'biz', type:'checkbox',    opts:['b2b','desk','fast_wifi','printer'] },
    { title:'Languages',   name:'lang', type:'checkbox',   opts:['english','turkish','korean','japanese','chinese','french','german','spanish','italian','russian'] },
    { title:'Payment',     name:'pay', type:'checkbox',    opts:['visa','mastercard','amex','btc','eth','usdt'] },
    { title:'Cancellation',name:'cancel', type:'radio',    opts:['free_cancel','partial_refund','non_refundable'] },
    { title:'Property',    name:'prop', type:'checkbox',   opts:['balcony','terrace','fireplace','private_parking'] },
    { title:'Check-in',    name:'checkin', type:'checkbox',opts:['self_checkin','24h_desk'] },
    { title:'Long stay',   name:'long', type:'checkbox',   opts:['long_stay'] },
    { title:'Trust & safety', name:'trust', type:'checkbox', opts:['verified_badge','verified_reviews'] },
  ];

  const GRID = $('#filterGrid', drawer);
  GRID.innerHTML = groups.map(g=>renderGroup(g)).join('');

  function renderGroup(g){
    const inputs = g.opts.map(v=>{
      const id = `flt_${g.name}_${v}`.replace(/[^a-z0-9_+-]/gi,'');
      return `<label style="display:block;margin:6px 0"><input type="${g.type}" name="${g.name}" value="${v}" id="${id}"> ${labelize(v)}</label>`;
    }).join('');
    return `<div class="sw-filter-group"><h4>${g.title}</h4>${inputs}</div>`;
  }
  function labelize(s){ return s.replace(/_/g,' ').toUpperCase().replace(/\b\w/g,m=>m.toUpperCase()); }

  return drawer;
}
function openDrawer(){ const d = ensureFilterDrawer(); d.setAttribute('aria-hidden','false'); document.body.style.overflow='hidden'; }
function closeDrawer(){ const d = ensureFilterDrawer(); d.setAttribute('aria-hidden','true'); document.body.style.overflow=''; }

function initFilters(){
  let openBtn = ensureFilterOpenButton();
  const drawer = ensureFilterDrawer();

  if(openBtn) openBtn = swapNode(openBtn);
  let closeBtn = swapNode(byIdAny('filterClose'));
  let applyBtn = swapNode(byIdAny('applyFilters'));
  let resetBtn = swapNode(byIdAny('filterReset'));

  openBtn?.addEventListener('click', (e)=>{ e.preventDefault(); e.stopPropagation(); openDrawer(); });
  closeBtn?.addEventListener('click', (e)=>{ e.preventDefault(); e.stopPropagation(); closeDrawer(); });

  $('.drawer-backdrop', drawer)?.addEventListener('click', closeDrawer);
  $('.drawer-panel', drawer)?.addEventListener('click', e=>e.stopPropagation());

  applyBtn?.addEventListener('click', ()=>{
    const picked = $$('input[type=checkbox]:checked, input[type=radio]:checked', drawer).map(el=>({name:el.name, value:el.value}));
    console.log('Filters applied:', picked);
    setStatus('Filters applied'); closeDrawer();
  });
  resetBtn?.addEventListener('click', ()=>{
    $$('input[type=checkbox], input[type=radio]', drawer).forEach(el=> el.checked=false);
    setStatus('Filters reset');
  });
}

/* ---------- bot wiring ---------- */
function ensureChatOpenControl(){
  // 이미 있는 버튼 우선
  let open = byIdAny('openBot','open-ai','chatFab');
  if(open) return open;

  // 없으면 FAB 생성
  const fab = document.createElement('button');
  fab.id = 'chatFab';
  fab.title = 'AI Concierge';
  fab.innerHTML = '💬';
  document.body.appendChild(fab);
  return fab;
}
function ensureBotPanel(){
  let panel = byIdAny('botPanel');
  if(panel) return panel;

  panel = document.createElement('div');
  panel.id = 'botPanel';
  panel.hidden = true;
  panel.innerHTML = `
    <div class="sw-bot-head" style="display:flex;align-items:center;justify-content:space-between;padding:10px 12px;border-bottom:1px solid #1b1b20">
      <div class="sw-title">AI Concierge</div>
      <button id="botClose" aria-label="Close">✕</button>
    </div>
    <div class="sw-bot-body" id="botBody" style="padding:12px;max-height:260px;overflow:auto">
      <div class="sw-bot-msg sys">Hello! Ask me anything in your language.</div>
    </div>
    <div class="sw-bot-foot" style="display:flex;gap:8px;padding:10px;border-top:1px solid #1b1b20">
      <input id="botInput" placeholder="Type a message…" style="flex:1"/>
      <button class="sw-btn gold" id="botSend">Send</button>
    </div>`;
  document.body.appendChild(panel);
  return panel;
}

function initBot(){
  let open = ensureChatOpenControl();
  const panel = ensureBotPanel();
  let btnClose = byIdAny('botClose');
  let body = byIdAny('botBody');
  let input = byIdAny('botInput');
  let send = byIdAny('botSend');

  // 충돌 제거
  open = swapNode(open);
  btnClose = swapNode(btnClose);
  send = swapNode(send);

  open?.addEventListener('click', ()=>{ panel.hidden=false; });
  btnClose?.addEventListener('click', ()=>{ panel.hidden=true; });

  function appendMsg(t, isSys=false){
    const div = document.createElement('div');
    div.className = 'sw-bot-msg' + (isSys?' sys':'');
    div.textContent = t;
    body.appendChild(div);
    body.scrollTop = body.scrollHeight;
  }

  send?.addEventListener('click', async ()=>{
    const v = (input?.value||'').trim(); if(!v) return;
    appendMsg(v);
    input.value='';
    try{
      const text = await sendToAI(v, getCurrentLang());
      appendMsg(text, true);
    }catch(e){
      // 백엔드가 아직 없을 때도 "작동 느낌" 유지
      appendMsg('(Demo) Got it! We’ll find you the best stays.', true);
    }
  });
  input?.addEventListener('keydown', e=>{ if(e.key==='Enter'){ e.preventDefault(); send?.click(); } });
}

async function sendToAI(message, locale='en'){
  const payload = { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ message, locale }) };
  // 1) Vercel
  try{
    const r = await fetch('/api/chat', payload);
    if(r.ok){ const d = await r.json(); if(d?.ok) return d.text; }
  }catch(_){}
  // 2) Netlify
  const r2 = await fetch('/.netlify/functions/chat', payload);
  if(!r2.ok) throw new Error('AI endpoint not available');
  const d2 = await r2.json();
  if(!d2.ok) throw new Error('AI error');
  return d2.text;
}

/* ---------- boot ---------- */
function boot(){
  initLang();
  initMap();
  initSearch();
  initFilters();
  initBot();
}
if(document.readyState==='loading') document.addEventListener('DOMContentLoaded', boot); else boot();

    status = document.createElement('div');
    status.id = 'searchStatus';
    status.className = 'search-status';
    const bar = $('.searchbar, .sw-searchbar, .search-bar') || $('#search')?.parentNode;
    (bar?.parentNode || document.body).appendChild(status);
  }
  status.textContent = msg || '';
  status.style.opacity = msg ? 1 : 0;
  if(msg){
    clearTimeout(status._t);
    status._t = setTimeout(()=>status.style.opacity=0, 3000);
  }
}

/* ---------- language ---------- */
function getLangSelect(){ return byIdAny('lang','langSelect'); }
function getCurrentLang(){
  const sel = getLangSelect(); return (sel && sel.value) || (localStorage.getItem('sw_lang')||'en');
}
function initLang(){
  const sel = getLangSelect();
  if(sel){
    // remove old listeners by clone
    const c = swapNode(sel);
    c.addEventListener('change', e=>{
      const v = e.target.value;
      localStorage.setItem('sw_lang', v);
      if (window.StayWorldI18n?.applyLang) {
        window.StayWorldI18n.applyLang(v);
      }
    });
  }
  // 초기 적용
  const init = localStorage.getItem('sw_lang');
  if(init && window.StayWorldI18n?.applyLang){ window.StayWorldI18n.applyLang(init); }
}

/* ---------- filter drawer (auto create if missing) ---------- */
function ensureFilterDrawer(){
  let drawer = byIdAny('filterDrawer');
  if(drawer) return drawer;

  drawer = document.createElement('div');
  drawer.id = 'filterDrawer';
  drawer.setAttribute('aria-hidden', 'true');
  drawer.innerHTML = `
    <div class="drawer-backdrop"></div>
    <div class="drawer-panel">
      <div class="drawer-head">
        <h3>Filters</h3>
        <button id="filterClose" aria-label="Close">✕</button>
      </div>
      <div class="drawer-body">
        <div id="filterGrid" class="filter-grid"></div>
      </div>
      <div class="drawer-foot">
        <button id="filterReset">Reset</button>
        <button id="applyFilters" class="btn btn-gold">Apply</button>
      </div>
    </div>`;
  document.body.appendChild(drawer);

  // 기본 카테고리 (간단한 더미, 실제 옵션은 필요 시 확장)
  const GRID = $('#filterGrid', drawer);
  if(GRID){
    GRID.style.display='grid';
    GRID.style.gridTemplateColumns='repeat(3, minmax(0,1fr))';
    GRID.style.gap='12px';
    GRID.innerHTML = [
      section('Stay type', ['hotel','motel','hostel','apartment','villa'], 'type'),
      section('Review score', ['4.5+','4.0+','any'], 'rating', 'radio'),
      section('Amenities', ['wifi','kitchen','parking','pool','ac','gym','workspace','washer','dryer'], 'amen'),
      section('Booking', ['instant','request'], 'booking'),
      section('Verification', ['verified_only'], 'verify'),
      section('Long stay', ['long_stay'], 'long'),
      section('Business', ['b2b'], 'biz'),
      section('Accessibility', ['step_free','elevator'], 'access'),
      section('Location', ['near_airport','near_station'], 'near')
    ].join('');
  }
  function section(title, items, name, type='checkbox'){
    const inputs = items.map(v=>{
      const id = `flt_${name}_${v}`;
      return `<label style="display:block;margin:6px 0"><input type="${type}" name="${name}" value="${v}" id="${id}"> ${labelize(v)}</label>`;
    }).join('');
    return `
      <div class="sw-filter-group card" style="padding:10px;border:1px solid #242430;border-radius:12px">
        <h4>${title}</h4>
        ${inputs}
      </div>`;
  }
  function labelize(s){ return s.replace(/_/g,' ').replace(/\b\w/g,m=>m.toUpperCase()); }

  return drawer;
}
function openDrawer(){ const d = ensureFilterDrawer(); d.setAttribute('aria-hidden','false'); document.body.style.overflow='hidden'; }
function closeDrawer(){ const d = ensureFilterDrawer(); d.setAttribute('aria-hidden','true'); document.body.style.overflow=''; }

/* ---------- map & geocoding ---------- */
let map, marker;
function initMap(){
  const el = byIdAny('map');
  if(!el || !window.L) return; // Leaflet 미포함이면 패스
  if(map) return;
  try{
    map = L.map('map').setView([41.0082, 28.9784], 5);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{maxZoom:19}).addTo(map);
    marker = L.marker([41.0082, 28.9784]).addTo(map).bindPopup('Istanbul');
  }catch(e){ console.warn('Leaflet init failed', e); }
}
async function geocodeAny(q){
  const providers = [
    q=>`https://nominatim.openstreetmap.org/search?format=json&limit=1&q=${encodeURIComponent(q)}`,
    q=>`https://photon.komoot.io/api/?limit=1&q=${encodeURIComponent(q)}`
  ];
  for(const url of providers){
    try{
      const r = await fetch(url(q), { headers:{'Accept':'application/json'}});
      if(!r.ok) continue;
      const data = await r.json();
      if(Array.isArray(data) && data[0]) return {lat:+data[0].lat, lon:+data[0].lon, label:data[0].display_name};
      if(data?.features?.[0]){
        const f = data.features[0];
        return { lat:f.geometry.coordinates[1], lon:f.geometry.coordinates[0], label:f.properties.name || q };
      }
    }catch(e){}
  }
  throw new Error('no_results');
}
function goTo(lat, lon, label){
  if(map && window.L){
    if(marker) marker.remove();
    marker = L.marker([lat, lon]).addTo(map).bindPopup(label||'').openPopup();
    map.setView([lat, lon], 13, { animate:true });
    byIdAny('map')?.scrollIntoView({behavior:'smooth', block:'start'});
  }
}

/* ---------- search wiring (dual-ID support) ---------- */
function initSearch(){
  // 다양한 템플릿 호환
  let input = byIdAny('searchInput','searchDestination','search'); // index_inline / index
  let btn = byIdAny('searchBtn','btnSearch');                       // index_inline
  // index.html에선 a.btn으로 되어 있을 수 있음 → 대체 버튼 생성
  if(!btn){
    const linkBtn = $(`.btn.btn-gold[href="/results.html"]`) || $(`a.btn.btn-gold`);
    if(linkBtn){
      btn = document.createElement('button');
      btn.id = 'btnSearch';
      btn.className = linkBtn.className;
      btn.textContent = (linkBtn.textContent||'Search').trim();
      linkBtn.replaceWith(btn);
    }
  }
  if(input) input = swapNode(input);
  if(btn) btn = swapNode(btn);

  async function run(){
    const q = (input?.value || '').trim();
    if(!q){ input?.focus(); setStatus('Enter a city or destination.'); return; }
    btn?.classList.add('loading'); setStatus('Searching…');
    try{
      const {lat, lon, label} = await geocodeAny(q);
      goTo(lat, lon, label);
      setStatus(`Found: ${label}`);
    }catch(e){
      console.error(e); setStatus('No results. Try another place.'); alert('검색 결과가 없습니다. 다른 도시를 입력해보세요.');
    }finally{
      btn?.classList.remove('loading');
    }
  }

  btn?.addEventListener('click', run);
  input?.addEventListener('keydown', e=>{ if(e.key==='Enter'){ e.preventDefault(); run(); } });
}

/* ---------- filters wiring ---------- */
function initFilters(){
  // 열기 트리거: 여러 ID 허용
  let openBtn = byIdAny('filterOpen'); // index_inline
  if(!openBtn){
    // 대체: "Filters" 라벨 찾기
    openBtn = $('#t_filters') || $$('button, a').find(x=>/filters/i.test(x.textContent||''));
  }
  let closeBtn, applyBtn, resetBtn;

  // 안전하게 기존 리스너 제거
  if(openBtn) openBtn = swapNode(openBtn);

  const drawer = ensureFilterDrawer();
  closeBtn = swapNode(byIdAny('filterClose'));
  applyBtn = swapNode(byIdAny('applyFilters'));
  resetBtn = swapNode(byIdAny('filterReset'));

  openBtn?.addEventListener('click', (e)=>{ e.preventDefault(); e.stopPropagation(); openDrawer(); });
  closeBtn?.addEventListener('click', (e)=>{ e.preventDefault(); e.stopPropagation(); closeDrawer(); });

  // backdrop 클릭 시 닫기
  $('.drawer-backdrop', drawer)?.addEventListener('click', closeDrawer);

  // 내부 클릭은 전파 차단 (바깥 요소 클릭 불능 방지)
  $('.drawer-panel', drawer)?.addEventListener('click', e=>e.stopPropagation());

  applyBtn?.addEventListener('click', ()=>{
    // 선택값 수집 (데모)
    const checked = $$('input[type=checkbox]:checked, input[type=radio]:checked', drawer).map(el=>({name:el.name, value:el.value}));
    console.log('Filters applied:', checked);
    closeDrawer();
    setStatus('Filters applied');
  });
  resetBtn?.addEventListener('click', ()=>{
    $$('input[type=checkbox], input[type=radio]', drawer).forEach(el=>{ el.checked = false; });
    setStatus('Filters reset');
  });
}

/* ---------- bot wiring ---------- */
function initBot(){
  // 다양한 트리거 & 요소 지원
  let open = byIdAny('openBot','open-ai','chatFab');
  let panel = byIdAny('botPanel');
  let btnClose = byIdAny('botClose');
  let body = byIdAny('botBody');
  let input = byIdAny('botInput');
  let send = byIdAny('botSend');

  // 없으면 최소 UI 자동 생성
  if(!panel){
    panel = document.createElement('div');
    panel.id = 'botPanel';
    panel.hidden = true;
    panel.innerHTML = `
      <div class="sw-bot-head" style="display:flex;align-items:center;justify-content:space-between;padding:10px 12px;border-bottom:1px solid #1b1b20">
        <div class="sw-title">AI Concierge</div>
        <button id="botClose" aria-label="Close">✕</button>
      </div>
      <div class="sw-bot-body" id="botBody" style="padding:12px;max-height:260px;overflow:auto">
        <div class="sw-bot-msg sys">Hello! Ask me anything in your language.</div>
      </div>
      <div class="sw-bot-foot" style="display:flex;gap:8px;padding:10px;border-top:1px solid #1b1b20">
        <input id="botInput" placeholder="Type a message…" style="flex:1"/>
        <button class="sw-btn gold" id="botSend">Send</button>
      </div>`;
    document.body.appendChild(panel);
    // 재쿼리
    btnClose = byIdAny('botClose'); body = byIdAny('botBody'); input = byIdAny('botInput'); send = byIdAny('botSend');
  }

  // 안전하게 리스너 초기화
  if(open) open = swapNode(open);
  btnClose = swapNode(btnClose);
  send = swapNode(send);

  open?.addEventListener('click', ()=>{ panel.hidden=false; });
  btnClose?.addEventListener('click', ()=>{ panel.hidden=true; });
  send?.addEventListener('click', async ()=>{
    const v = (input?.value||'').trim(); if(!v) return;
    appendMsg(v);
    input.value='';
    try{
      const text = await sendToAI(v, getCurrentLang());
      appendMsg(text, true);
    }catch(e){
      appendMsg('(Demo) Got it! We’ll find you the best stays.', true);
    }
  });
  input?.addEventListener('keydown', e=>{ if(e.key==='Enter'){ e.preventDefault(); send?.click(); } });

  function appendMsg(t, isSys=false){
    const div = document.createElement('div');
    div.className = 'sw-bot-msg' + (isSys?' sys':'');
    div.textContent = t;
    body.appendChild(div);
    body.scrollTop = body.scrollHeight;
  }
}

async function sendToAI(message, locale='en'){
  const payload = { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ message, locale }) };
  // 1) Vercel 우선
  try{
    const r = await fetch('/api/chat', payload);
    if(r.ok){ const d = await r.json(); if(d?.ok) return d.text; }
  }catch(_){}
  // 2) Netlify 폴백
  const r2 = await fetch('/.netlify/functions/chat', payload);
  if(!r2.ok) throw new Error('AI endpoint not available');
  const d2 = await r2.json();
  if(!d2.ok) throw new Error('AI error');
  return d2.text;
}

/* ---------- boot ---------- */
function boot(){
  initLang();
  initMap();
  initSearch();
  initFilters();
  initBot();
}
if(document.readyState==='loading') document.addEventListener('DOMContentLoaded', boot); else boot();
