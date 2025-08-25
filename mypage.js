// mypage.js
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, onSnapshot, setDoc } from "firebase/firestore";

const auth = getAuth();
const db   = getFirestore();

function qs(sel){ return document.querySelector(sel); }

onAuthStateChanged(auth, user=>{
  if(!user){ location.href = '/login.html?next=/mypage.html'; return; }

  // 화면 바인딩 (이름/이메일)
  qs('#signedName')?.append(document.createTextNode(user.displayName || ''));
  qs('#signedEmail')?.append(document.createTextNode(user.email || ''));

  // 등급/포인트 실시간
  onSnapshot(doc(db,'users',user.uid,'loyalty','status'), snap=>{
    const d = snap.data() || { level:'Bronze', points:0 };
    qs('#level') && (qs('#level').textContent = d.level);
    qs('#points') && (qs('#points').textContent = d.points ?? 0);
  });

  // 버튼 이동
  qs('#btnFindStays')?.addEventListener('click', ()=> location.href='/results.html');
  qs('#btnSettings')?.addEventListener('click', ()=> location.href='/settings');

  // === 지오코드 버튼 ===
  qs('#geocodeBtn')?.addEventListener('click', async ()=>{
    const input = qs('#addressInput');
    const q = (input?.value || '').trim();
    if(!q) return;

    try{
      const res = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(q)}&format=json&limit=1`);
      const arr = await res.json();
      const hit = arr[0];
      if(!hit){ alert('No results'); return; }

      // 내 위치 목록에 저장
      await setDoc(doc(db,'users',auth.currentUser.uid,'locations',String(hit.place_id)),{
        label: q,
        lat: Number(hit.lat),
        lon: Number(hit.lon),
        provider: 'nominatim',
        ts: Date.now()
      });

      // 지도에 마커 찍기(옵션) — Leaflet 쓰는 경우만
      if(window.addMarker){
        window.addMarker({lat:Number(hit.lat), lon:Number(hit.lon), label:q});
      }
      // 카운터 갱신(옵션) : locations 개수는 별도 onSnapshot 목록에서 세면 정확
      // 여기서는 단순 안내
      alert('Location saved.');

    }catch(e){
      console.error(e);
      alert('Geocode failed.');
    }
  });
});
