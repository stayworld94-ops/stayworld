// assets/index-app.js

document.addEventListener("DOMContentLoaded", () => {
  /* ---------------- Filters Drawer ---------------- */
  const drawer = document.getElementById("filterDrawer");
  const btnFilters = document.getElementById("btnFilters");

  btnFilters?.addEventListener("click", () => {
    drawer.setAttribute("aria-hidden", "false");
  });
  document.querySelector("#filterDrawer .drawer-backdrop")
    ?.addEventListener("click", () => drawer.setAttribute("aria-hidden","true"));
  document.getElementById("closeFilter")
    ?.addEventListener("click", () => drawer.setAttribute("aria-hidden","true"));
  document.getElementById("resetFilter")
    ?.addEventListener("click", () => {
      drawer.querySelectorAll("input").forEach(i => i.checked = false);
    });
  document.getElementById("applyFilter")
    ?.addEventListener("click", () => {
      alert("필터 적용됨 ✅");
      drawer.setAttribute("aria-hidden","true");
    });

  /* ---------------- Search + AutoComplete ---------------- */
  const searchInput = document.getElementById("searchDestination");
  const statusEl = document.getElementById("searchStatus");
  let map = L.map("map").setView([48.8566, 2.3522], 12);
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:'&copy; OpenStreetMap'
  }).addTo(map);
  let marker;

  async function geocode(q) {
    const url = `https://nominatim.openstreetmap.org/search?format=json&limit=5&q=${encodeURIComponent(q)}`;
    const r = await fetch(url);
    const data = await r.json();
    return data.map(d => ({
      label:d.display_name,
      lat:+d.lat,
      lon:+d.lon
    }));
  }

  async function runSearch() {
    const q = searchInput.value.trim();
    if (!q) return;
    statusEl.textContent = "Searching…"; statusEl.style.opacity=1;
    try {
      const results = await geocode(q);
      if(results[0]){
        if(marker) marker.remove();
        marker = L.marker([results[0].lat, results[0].lon]).addTo(map)
          .bindPopup(results[0].label).openPopup();
        map.setView([results[0].lat, results[0].lon], 13);
        statusEl.textContent = `Found: ${results[0].label}`;
      } else {
        statusEl.textContent = "No results";
      }
    } catch(e){ statusEl.textContent = "Error"; }
    setTimeout(()=>statusEl.style.opacity=0,3000);
  }
  document.getElementById("btnSearch")?.addEventListener("click", runSearch);

  // AutoComplete preview
  const acBox = document.createElement("div");
  acBox.style.position="absolute"; acBox.style.background="#101018"; acBox.style.color="#fff";
  acBox.style.zIndex="2000"; acBox.style.width="100%"; acBox.style.maxHeight="200px";
  acBox.style.overflowY="auto"; acBox.style.border="1px solid rgba(255,255,255,.1)";
  acBox.style.display="none";
  searchInput.parentNode.style.position="relative";
  searchInput.parentNode.appendChild(acBox);

  searchInput.addEventListener("input", async (e)=>{
    const q=e.target.value.trim();
    if(q.length<2){ acBox.style.display="none"; return;}
    const results = await geocode(q);
    acBox.innerHTML="";
    results.forEach(r=>{
      const item=document.createElement("div");
      item.textContent=r.label;
      item.style.padding="6px 10px";
      item.style.cursor="pointer";
      item.addEventListener("click",()=>{
        searchInput.value=r.label;
        runSearch();
        acBox.style.display="none";
      });
      acBox.appendChild(item);
    });
    acBox.style.display=results.length?"block":"none";
  });

  /* ---------------- Chatbot ---------------- */
  const fab=document.getElementById("chatFab");
  const panel=document.getElementById("botPanel");
  const input=document.getElementById("botInput");
  const send=document.getElementById("botSend");
  const body=document.getElementById("botBody");
  const msgs=[];

  const add=(txt,me)=>{
    const d=document.createElement("div");
    d.className=`sw-bot-msg ${me?"me":"ai"}`;
    d.textContent=txt; body.appendChild(d); body.scrollTop=body.scrollHeight;
  };

  async function askAI(message,lang){
    try{
      const r=await fetch("/.netlify/functions/sw-chat",{
        method:"POST",headers:{"Content-Type":"application/json"},
        body:JSON.stringify({messages:[...msgs,{role:"user",content:message}],lang})
      });
      const d=await r.json();
      return d.reply||"(no reply)";
    }catch(_){return "(server error)";}
  }

  async function sendIt(){
    const v=input.value.trim(); if(!v) return;
    add(v,true); msgs.push({role:"user",content:v}); input.value="";
    add("…",false); const dots=body.lastChild;
    const reply=await askAI(v,(document.getElementById("lang").value||"EN").toLowerCase());
    dots.remove(); add(reply,false); msgs.push({role:"assistant",content:reply});
  }

  send?.addEventListener("click",sendIt);
  input?.addEventListener("keydown",e=>{if(e.key==="Enter") sendIt();});
  fab?.addEventListener("click",()=>{panel.hidden=!panel.hidden;});
});
