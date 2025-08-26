/* listings.js — Read listings and render cards to #hotel-list */

const swDB2 = (typeof firebaseDB !== 'undefined') ? firebaseDB
              : (firebase.firestore ? firebase.firestore()
              : (firebase.database ? firebase.database() : null));
const useFirestore2 = !!(swDB2 && swDB2.collection);

function qSelect(sel,root){ return (root||document).querySelector(sel); }
function qAll(sel,root){ return Array.from((root||document).querySelectorAll(sel)); }

function cardHTML(item){
  const img = (item.images && item.images[0]) ? item.images[0] : '/images/placeholder.jpg';
  const rating = item.rating ? Number(item.rating).toFixed(1) : '—';
  const dist = (typeof item.distance_km === 'number') ? `${item.distance_km} km` : '—';
  const free = item.free_cancel ? 'Free cancellation' : 'Cancellation policy';
  // price_usd를 data-*로 두 군데 넣음: 전체 카드, 그리고 표시용 <span>
  return `
    <div class="hotel-card"
         data-price-usd="${item.price_usd || 0}"
         data-rating="${item.rating || 0}"
         data-distance="${item.distance_km || 0}"
         data-free-cancel="${!!item.free_cancel}">
      <img src="${img}" alt="${item.title}" class="hotel-img" />
      <div class="hotel-info">
        <h3 class="hotel-title">${item.title}</h3>
        <p class="hotel-location">${item.city}, ${item.country}</p>
        <div class="hotel-price"><span class="price" data-price-usd="${item.price_usd || 0}"></span> / night</div>
        <div class="hotel-meta">
          ⭐ <span class="rating">${rating}</span> · <span class="distance">${dist}</span> from center
        </div>
        <div class="hotel-tags">
          <span class="tag ${item.free_cancel?'free-cancel':'paid-cancel'}">${free}</span>
        </div>
        <button class="fav-btn" data-id="${item.id}" title="Add to favorites">☆</button>
      </div>
    </div>
  `;
}

async function fetchListings(){
  if(!swDB2) return [];
  try{
    if(useFirestore2){
      // 최신 순 50개
      const snap = await swDB2.collection('listings')
        .where('status','==','published')
        .orderBy('createdAt','desc').limit(50).get();
      return snap.docs.map(d=>d.data());
    }else{
      const snap = await swDB2.ref('listings').limitToLast(50).get();
      const val = snap.val() || {};
      return Object.values(val).filter(v=>v.status==='published')
                  .sort((a,b)=>(b.createdAt||0)-(a.createdAt||0));
    }
  }catch(err){
    console.error(err);
    return [];
  }
}

async function renderListings(){
  const list = await fetchListings();
  const mount = qSelect('#hotel-list');
  if(!mount){ console.warn('#hotel-list not found'); return; }

  if(!list.length){
    mount.innerHTML = `<div class="muted">No listings yet.</div>`;
    return;
  }
  mount.innerHTML = list.map(cardHTML).join('');

  // 찜 버튼 바인딩 & 아이콘 동기화
  window.SW_bindFavButtons?.(mount);
  window.SW_syncFavIcons?.(mount);

  // 가격 표시(언어/통화 포맷)
  if(typeof refreshAllPrices === 'function') refreshAllPrices();
}

document.addEventListener('DOMContentLoaded', renderListings);
