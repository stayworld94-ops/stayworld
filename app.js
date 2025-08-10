// Basic app logic: language switch, map, autocomplete, cards, filters, bot, weather.
(function(){
  const $ = s=>document.querySelector(s);
  const $$ = s=>Array.from(document.querySelectorAll(s));

  // Language
  const langSelect = $("#langSelect");
  function setLang(lang){
    localStorage.setItem("sw_lang", lang);
    applyI18N(lang);
  }
  langSelect.addEventListener("change", e=>setLang(e.target.value));
  setLang(localStorage.getItem("sw_lang") || "en");

  // Quick tags
  const POPULAR = ["Istanbul","Paris","Tokyo","Seoul","New York","Rome","Antalya","Dubai"];
  const quick = $("#quickTags");
  POPULAR.forEach(city=>{
    const b = document.createElement("span");
    b.className="sw-badge";
    b.textContent = city;
    b.addEventListener("click", ()=>{ $("#searchInput").value = city; runSearch(); });
    quick.appendChild(b);
  });

  // Autocomplete
  const auto = $("#autocomplete");
  $("#searchInput").addEventListener("input", e=>{
    const v = e.target.value.toLowerCase();
    if(!v){ auto.style.display="none"; return; }
    const items = POPULAR.filter(c=>c.toLowerCase().includes(v));
    auto.innerHTML = items.map(i=>`<div data-city="${i}">${i}</div>`).join("");
    auto.style.display = items.length ? "block" : "none";
  });
  auto.addEventListener("click", e=>{
    const d = e.target.closest("div[data-city]");
    if(!d) return;
    $("#searchInput").value = d.dataset.city;
    auto.style.display="none";
    runSearch();
  });

  // Map (Leaflet)
  const map = L.map('map').setView([41.015137, 28.979530], 3);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 18,
    attribution: '&copy; OpenStreetMap'
  }).addTo(map);

  // Fake stays
  const STAYS = [
    {id:1, city:"Istanbul", title:"Bosporus Elite Suite", price:220, rating:4.8, verified:true, type:"apartment", coords:[41.0082, 28.9784]},
    {id:2, city:"Paris", title:"Louvre Gold Residence", price:310, rating:4.7, verified:true, type:"hotel", coords:[48.8606, 2.3376]},
    {id:3, city:"Tokyo", title:"Shibuya Luxe Tower", price:180, rating:4.6, verified:false, type:"apartment", coords:[35.6595, 139.7005]},
    {id:4, city:"Seoul", title:"Gangnam Prime Loft", price:150, rating:4.5, verified:true, type:"apartment", coords:[37.4979, 127.0276]},
    {id:5, city:"New York", title:"Central Park Signature", price:420, rating:4.9, verified:true, type:"hotel", coords:[40.7812, -73.9665]},
    {id:6, city:"Rome", title:"Colosseo Regal Flat", price:200, rating:4.4, verified:false, type:"apartment", coords:[41.8902, 12.4922]}
  ];

  // Add markers
  STAYS.forEach(s=>{
    const m = L.marker(s.coords).addTo(map).bindPopup(`${s.title} — ${s.city}`);
    s.marker = m;
  });

  // Cards grid
  const grid = $("#cardGrid");
  function starRow(rating){
    const solidCount = Math.round(rating);
    return `<div class="sw-stars">` + Array.from({length:5}, (_,i)=>`<i class="lucide lucide-star${i<solidCount?'':'-half'}"></i>`).join("") + `</div>`;
  }
  function cardHtml(s){
    return `<div class="sw-card">
      <div class="sw-thumb">IMG</div>
      <div class="sw-title">${s.title}</div>
      <div class="sw-muted">${s.city}</div>
      <div style="display:flex;align-items:center;justify-content:space-between;margin-top:6px">
        <div>${starRow(s.rating)}</div>
        <div class="sw-badge ${s.verified?'sw-verify':''}">${s.verified?'Verified':''}</div>
      </div>
      <div style="margin-top:8px;font-weight:700">$${s.price}/night</div>
    </div>`;
  }
  function renderCards(list){ grid.innerHTML = list.map(cardHtml).join(""); }
  renderCards(STAYS);

  // Filters drawer
  const drawer = $("#filterDrawer");
  $("#filterOpen").addEventListener("click", ()=>drawer.setAttribute("aria-hidden","false"));
  $("#filterClose").addEventListener("click", ()=>drawer.setAttribute("aria-hidden","true"));
  $("#filterReset").addEventListener("click", ()=>{ $$("input[type=checkbox]").forEach(c=>c.checked=false); $("#verifiedOnly").checked=false; renderCards(STAYS); });
  $("#applyFilters").addEventListener("click", ()=>{
    let result = [...STAYS];
    if($("#verifiedOnly").checked) result = result.filter(s=>s.verified);
    const rating = $$("input[name=rating]").find(r=>r.checked).value;
    if(rating!=="any"){
      const min = parseFloat(rating);
      result = result.filter(s=>s.rating>=min);
    }
    const types = $$(".sw-filter-group input[type=checkbox][value]").filter(c=>c.checked).map(c=>c.value);
    if(types.length) result = result.filter(s=>types.includes(s.type));
    renderCards(result);
    drawer.setAttribute("aria-hidden","true");
  });

  // Search
  function runSearch(){
    const q = $("#searchInput").value.trim().toLowerCase();
    const filtered = STAYS.filter(s=>!q || s.city.toLowerCase().includes(q));
    if(filtered[0]) map.setView(filtered[0].coords, 10);
    renderCards(filtered);
  }
  $("#searchBtn").addEventListener("click", runSearch);

  // Level badge demo
  const spent = 2200000; // demo value; integrate with real bookings later
  let level = LEVELS[0].name;
  for(const l of LEVELS) if(spent >= l.threshold) level = l.name;
  $("#userLevel").textContent = level;

  // Membership benefits list
  const benefitList = $("#benefitList");
  const lvIndex = LEVELS.findIndex(l=>l.name===level);
  const aggregated = LEVELS.slice(0, lvIndex+1).flatMap(l=>l.benefits);
  aggregated.forEach(b=>{
    const li = document.createElement("li"); li.textContent = "• " + b; benefitList.appendChild(li);
  });

  // Bot
  $("#openBot").addEventListener("click", ()=>$("#botPanel").hidden=false);
  $("#botClose").addEventListener("click", ()=>$("#botPanel").hidden=true);
  $("#botSend").addEventListener("click", ()=>{
    const v = $("#botInput").value.trim(); if(!v) return;
    const me = document.createElement("div"); me.className="sw-bot-msg"; me.textContent = v; $("#botBody").appendChild(me);
    const ai = document.createElement("div"); ai.className="sw-bot-msg"; ai.textContent = "Thanks! (Demo)"; $("#botBody").appendChild(ai);
    $("#botInput").value="";
    $("#botBody").scrollTop = $("#botBody").scrollHeight;
  });

  // Weather (requires user API key)
  $("#weatherBtn").addEventListener("click", async()=>{
    const city = $("#weatherCity").value||"Istanbul";
    const key = $("#weatherKey").value.trim();
    if(!key){ $("#weatherOut").textContent = "Enter OpenWeather API key to fetch."; return; }
    $("#weatherOut").textContent = "Loading…";
    try{
      const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${key}&units=metric`);
      const j = await res.json();
      $("#weatherOut").textContent = `${j.name}: ${Math.round(j.main.temp)}°C, ${j.weather?.[0]?.description||""}`;
    }catch(e){
      $("#weatherOut").textContent = "Weather fetch failed.";
    }
  });

  // Login/Signup (placeholder navigation)
  $("#loginBtn").addEventListener("click", ()=>alert("Login page to be integrated with Google OAuth & Firebase."));
  $("#signupBtn").addEventListener("click", ()=>alert("Signup page to be integrated."));
})();