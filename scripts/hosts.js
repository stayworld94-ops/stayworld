/* hosts.js — Host listing creation (Firestore or RealtimeDB fallback) */

// ===== Currency Table (앱의 RATES와 동일값 유지) =====
const SW_RATES = { USD:1, KRW:1350, TRY:33, EUR:0.92, JPY:156, RUB:90, CNY:7.2 };

// ===== Firebase Bridges =====
const swAuth = (typeof firebaseAuth !== 'undefined') ? firebaseAuth : (firebase.auth ? firebase.auth() : null);
const swStorage = (firebase.storage ? firebase.storage() : null);

// 우선순위: window.firebaseDB(너의 firebase.js) → Firestore → Realtime DB
let swDB = (typeof firebaseDB !== 'undefined') ? firebaseDB : null;
let useFirestore = !!(swDB && swDB.collection);

if (!swDB) {
  if (firebase.firestore) { swDB = firebase.firestore(); useFirestore = true; }
  else if (firebase.database) { swDB = firebase.database(); useFirestore = false; }
}

function toUSD(amount, currency){
  const rate = SW_RATES[currency] || 1;
  // currency 금액을 USD로 환산
  return currency === 'USD' ? amount : (amount / rate);
}

function previewThumbs(files){
  const cont = document.getElementById('thumbs');
  cont.innerHTML = '';
  [...files].slice(0,5).forEach(file=>{
    const img = document.createElement('img');
    img.src = URL.createObjectURL(file);
    cont.appendChild(img);
  });
}

async function uploadPhotosAndGetURLs(listingId, files){
  if(!swStorage) return [];
  const bucket = swStorage.ref();
  const urlList = [];
  const max = Math.min(files.length, 5);
  for(let i=0;i<max;i++){
    const file = files[i];
    const ref = bucket.child(`listings/${listingId}/${Date.now()}_${file.name}`);
    await ref.put(file);
    const url = await ref.getDownloadURL();
    urlList.push(url);
  }
  return urlList;
}

async function saveListingDoc(doc){
  if(useFirestore){
    // Firestore
    const ref = swDB.collection('listings').doc(doc.id);
    await ref.set(doc, { merge: true });
  } else {
    // Realtime DB
    const ref = swDB.ref('listings/' + doc.id);
    await ref.update(doc);
  }
}

function newListingId(uid){
  return `${uid || 'guest'}_${Date.now()}`;
}

function setMsg(t){ const el = document.getElementById('msg'); if(el) el.textContent = t || ''; }

document.addEventListener('DOMContentLoaded', ()=>{
  const form = document.getElementById('hostForm');
  const photosInput = document.getElementById('photos');

  photosInput?.addEventListener('change', e=> previewThumbs(e.target.files||[]));

  form?.addEventListener('submit', async (e)=>{
    e.preventDefault();
    setMsg('Publishing…');

    const user = swAuth?.currentUser || null;
    if(!user){
      setMsg('Please log in first.');
      alert('Please log in first.');
      return;
    }

    const title = document.getElementById('title').value.trim();
    const city = document.getElementById('city').value.trim();
    const country = document.getElementById('country').value.trim();
    const stayType = document.getElementById('stayType').value;
    const price = parseFloat(document.getElementById('price').value || '0');
    const currency = document.getElementById('currency').value;
    const distance = parseFloat(document.getElementById('distance').value || '0');
    const rating = parseFloat(document.getElementById('rating').value || '0');
    const freeCancel = document.getElementById('freeCancel').value === 'true';
    const lat = parseFloat(document.getElementById('lat').value || 'NaN');
    const lng = parseFloat(document.getElementById('lng').value || 'NaN');
    const desc = document.getElementById('desc').value.trim();
    const files = photosInput?.files || [];

    if(!title || !city || !country || !price){
      setMsg('Please fill required fields.');
      return;
    }

    const price_usd = Number(toUSD(price, currency).toFixed(2));
    const id = newListingId(user.uid);

    try{
      // 사진 업로드
      const images = await uploadPhotosAndGetURLs(id, files);

      const doc = {
        id,
        host_uid: user.uid,
        title, city, country, stayType,
        price: price, currency, price_usd,  // 표시는 currency, 내부 필터는 USD
        distance_km: distance || null,
        rating: rating || null,
        free_cancel: !!freeCancel,
        lat: isNaN(lat) ? null : lat,
        lng: isNaN(lng) ? null : lng,
        desc,
        images,
        status: 'published',
        createdAt: Date.now()
      };

      await saveListingDoc(doc);
      setMsg('Listing published! It will appear on the Hotels page.');
      alert('Published! Check Hotels page.');

      // 폼 초기화
      form.reset();
      document.getElementById('thumbs').innerHTML = '';
    }catch(err){
      console.error(err);
      setMsg('Failed to publish. Check console.');
      alert('Failed to publish. Check console.');
    }
  });

  const btnDraft = document.getElementById('btnDraft');
  btnDraft?.addEventListener('click', async ()=>{
    const user = swAuth?.currentUser || null;
    if(!user){ alert('Please log in first.'); return; }

    const title = document.getElementById('title').value.trim();
    if(!title){ alert('Enter title at least.'); return; }

    const id = newListingId(user.uid);
    const doc = {
      id, host_uid: user.uid,
      title, status: 'draft', createdAt: Date.now()
    };
    try{
      await saveListingDoc(doc);
      alert('Draft saved.');
    }catch(err){
      console.error(err);
      alert('Draft failed. See console.');
    }
  });
});
