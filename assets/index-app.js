document.addEventListener("DOMContentLoaded", ()=>{

  /* 지도 */
  let map = L.map('map',{scrollWheelZoom:true}).setView([48.8566,2.3522],12);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{attribution:'&copy; OpenStreetMap'}).addTo(map);
  let marker;

  function goTo(lat,lon,label){
    if(marker) marker.remove();
    marker=L.marker([lat,lon]).addTo(map).bindPopup(label||'').openPopup();
    map.setView([lat,lon],13);
  }

  /* 검색 + 미리보기 */
  const input=document.getElementById("searchDestination");
  const sugg=document.getElementById("searchSuggestions");
  input.addEventListener("input", async ()=>{
    const q=input.value.trim();
    sugg.innerHTML="";
    if(!q) return;
    try{
      const url=`https://nominatim.openstreetmap.org/search?format=json&limit=5&q=${encodeURIComponent(q)}`;
      const r=await fetch(url);
      const data=await r.json();
      data.forEach(item=>{
        const div=document.createElement("div");
        div.className="sugg-item";
        div.textContent=item.display_name;
        div.onclick=()=>{
          goTo(+item.lat,+item.lon,item.display_name);
          input.value=item.display_name;
          sugg.innerHTML="";
        };
        sugg.appendChild(div);
      });
    }catch(e){}
  });

  document.getElementById("btnSearch").addEventListener("click", async ()=>{
    const q=input.value.trim();
    if(!q) return;
    const url=`https://nominatim.openstreetmap.org/search?format=json&limit=1&q=${encodeURIComponent(q)}`;
    const r=await fetch(url); const d=await r.json();
    if(d[0]) goTo(+d[0].lat,+d[0].lon,d[0].display_name);
    else alert("검색 결과 없음");
  });

  /* 필터 Drawer */
  document.getElementById("btnFilters").addEventListener("click", ()=>{
    let d=document.getElementById("filterDrawer");
    if(!d){
      d=document.createElement("div"); d.id="filterDrawer";
      d.innerHTML=`<div class="back"></div>
      <div class="panel"><div class="head"><h3>Filters</h3><button id="closeF">X</button></div>
      <div style="padding:20px">필터 옵션들 (Wi-Fi, 가격, 평점...)</div></div>`;
      document.body.appendChild(d);
      d.querySelector(".back").onclick=()=>d.remove();
      d.querySelector("#closeF").onclick=()=>d.remove();
    }
  });

});
