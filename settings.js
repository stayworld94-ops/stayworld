// settings.js
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

const auth = getAuth();
const db   = getFirestore();

const DEFAULTS = {
  language: 'en',
  theme: 'dark',
  notif_booking: true,
  notif_promotions: false,
  notif_level: true,
  currency: 'USD'
};

function loadLocal() {
  try { return JSON.parse(localStorage.getItem('sw:prefs')) || DEFAULTS; }
  catch { return DEFAULTS; }
}
function saveLocal(prefs) {
  localStorage.setItem('sw:prefs', JSON.stringify(prefs));
}

async function loadRemote(uid) {
  const ref = doc(db, 'users', uid, 'meta', 'prefs');
  const snap = await getDoc(ref);
  return snap.exists() ? { ...DEFAULTS, ...snap.data() } : DEFAULTS;
}
async function saveRemote(uid, prefs) {
  const ref = doc(db, 'users', uid, 'meta', 'prefs');
  await setDoc(ref, prefs, { merge: true });
}

async function initSettings(user){
  const form = document.getElementById('settingsForm');
  let prefs = loadLocal();

  try { prefs = { ...prefs, ...(await loadRemote(user.uid)) }; } catch {}
  // 폼 채우기
  Object.entries(prefs).forEach(([k,v])=>{
    const el = form.elements[k];
    if(!el) return;
    if(el.type === 'checkbox') el.checked = !!v;
    else if(el.type === 'radio') [...form.elements[k]].forEach(r=> r.checked=(r.value===v));
    else el.value = v;
  });

  // 저장
  form.addEventListener('submit', async (e)=>{
    e.preventDefault();
    const data = {
      language: form.language.value,
      theme: form.theme.value,
      notif_booking: form.notif_booking.checked,
      notif_promotions: form.notif_promotions.checked,
      notif_level: form.notif_level.checked,
      currency: form.currency.value
    };
    saveLocal(data);
    document.getElementById('saveStatus').textContent = 'Saving…';
    try{
      await saveRemote(user.uid, data);
      document.getElementById('saveStatus').textContent = 'Saved';
      // 즉시 반영
      window.applyLanguage?.(data.language);
      document.documentElement.dataset.theme = data.theme;
    }catch(err){
      console.error(err);
      document.getElementById('saveStatus').textContent = 'Save failed';
    }
  });
}

onAuthStateChanged(auth, u=>{
  if(!u){ location.href = '/login.html?next=/settings'; }
  else { initSettings(u); }
});
