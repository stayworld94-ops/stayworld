(function(){
  const $ = s => document.querySelector(s);
  const $$ = s => Array.from(document.querySelectorAll(s));
  const POPULAR = ["Istanbul","Paris","Tokyo","Seoul","New York","Rome","Antalya","Dubai","Incheon"];
  const ALIAS = {"이스탄불":"Istanbul","도쿄":"Tokyo","서울":"Seoul","뉴욕":"New York","로마":"Rome","안탈리아":"Antalya","두바이":"Dubai","인천":"Incheon","파리":"Paris"};

  const quick = $("#quickTags");
  if (quick) POPULAR.forEach(city=>{
    const b = document.createElement("span");
    b.className="sw-badge"; b.textContent=city;
    b.addEventListener("click", ()=>{ $("#searchInput").value = city; runSearch(); });
    quick.appendChild(b);
  });

  const auto = $("#autocomplete");
  $("#searchInput")?.addEventListener("input", e=>{
    const raw = e.target.value.trim();
    const v = (ALIAS[raw] || raw).toLowerCase();
    if(!v){ auto.style.display="none"; return; }
    const items = POPULAR.filter(c=>c.toLowerCase().includes(v));
    auto.innerHTML = items.map(i=>'<div data-city="'+i+'">'+i+'</div>').join("");
    auto.style.display = items.length ? "block" : "none";
  });
  auto?.addEventListener("click", e=>{
    const d = e.target.closest("div[data-city]"); if(!d) return;
    $("#searchInput").value = d.dataset.city; auto.style.display="none"; runSearch();
  });

  const map = L.map('map').setView([41.015137, 28.979530], 3);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {maxZoom:18, attribution:'&copy; OpenStreetMap'}).addTo(map);

  const STAYS = [
    {id:1, city:"Istanbul", title:"Bosporus Elite Suite", price:220, rating:4.8, verified:true,  type:"apartment", coords:[41.0082, 28.9784]},
    {id:2, city:"Paris",    title:"Louvre Gold Residence", price:310, rating:4.7, verified:true,  type:"hotel",     coords:[48.8606,  2.3376]},
    {id:3, city:"Tokyo",    title:"Shibuya Luxe Tower",    price:180, rating:4.6, verified:false, type:"apartment", coords:[35.6595,139.7005]},
    {id:4, city:"Seoul",    title:"Gangnam Prime Loft",    price:150, rating:4.5, verified:true,  type:"apartment", coords:[37.4979,127.0276]},
    {id:5, city:"Incheon",  title:"Songdo Sky Harbor",     price:140, rating:4.4, verified:true,  type:"hotel",     coords:[37.456,126.705]},
    {id:6, city:"New York", title:"Central Park Signature",price:420, rating:4.9, verified:true,  type:"hotel",     coords:[40.7812,-73.9665]},
    {id:7, city:"Rome",     title:"Colosseo Regal Flat",   price:200, rating:4.4, verified:false, type:"apartment", coords:[41.8902, 12.4922]}
  ];
  STAYS.forEach(s=>{ L.marker(s.coords).addTo(map).bindPopup(s.title+' — '+s.city); });

  const grid = $("#cardGrid");
  function card(s){
    return '<div class="sw-card">'
      + '<div class="sw-thumb" style="height:140px;border-radius:12px;background:#0b0b10;display:flex;align-items:center;justify-content:center">IMG</div>'
      + '<div class="sw-title" style="font-weight:800;margin-top:8px">'+s.title+'</div>'
      + '<div class="sw-muted">'+s.city+'</div>'
      + '<div style="margin-top:8px;font-weight:800">$'+s.price+'/night</div>'
      + '</div>';
  }
  function render(list){ if(grid) grid.innerHTML = list.map(card).join(''); }
  render(STAYS);

  function runSearch(){
    const raw = $("#searchInput").value.trim();
    const q = (ALIAS[raw] || raw).toLowerCase();
    const filtered = STAYS.filter(s=>!q || s.city.toLowerCase().includes(q));
    if(filtered[0]) map.setView(filtered[0].coords, 10);
    render(filtered);
  }
  $("#searchBtn")?.addEventListener("click", runSearch);

  $("#filterOpen")?.addEventListener("click", ()=>$("#filterDrawer")?.setAttribute("aria-hidden","false"));
  $("#filterClose")?.addEventListener("click", ()=>$("#filterDrawer")?.setAttribute("aria-hidden","true"));
  $("#filterReset")?.addEventListener("click", ()=>{ $("#searchInput").value=''; render(STAYS); });

  const go = file=>()=>{ location.href=file; };
  $("#loginBtn")?.addEventListener("click", go('login.html'));
  $("#signupBtn")?.addEventListener("click", go('signup.html'));

  const botPanel = $("#botPanel"), chatFab=$("#chatFab"), openBot=$("#openBot");
  $("#botClose")?.addEventListener("click", ()=> botPanel.hidden=true);
  chatFab?.addEventListener("click", ()=>{ botPanel.hidden=false; });
  openBot?.addEventListener("click", ()=>{ botPanel.hidden=false; });
  $("#botSend")?.addEventListener("click", ()=>{
    const input = $("#botInput"); if(!input.value.trim()) return;
    const me = document.createElement("div"); me.className="sw-bot-msg"; me.textContent=input.value; $("#botBody").appendChild(me);
    const ai = document.createElement("div"); ai.className="sw-bot-msg"; ai.textContent='(Demo) Thanks! We will suggest top stays.'; $("#botBody").appendChild(ai);
    input.value=''; $("#botBody").scrollTop = $("#botBody").scrollHeight;
  });
})();