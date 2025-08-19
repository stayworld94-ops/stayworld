// assets/signup.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  sendEmailVerification,
  GoogleAuthProvider,
  signInWithPopup,
  getAdditionalUserInfo
} from "https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js";
import {
  getFirestore,
  doc,
  setDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.12.4/firebase-firestore.js";

/* 🔴 Firebase Console → Project settings → SDK config에서 실제 값으로 교체 */
const firebaseConfig = {
  apiKey: "AIzaSyCyb0pn2sFTEPkL0Q1ALwZaV2QILWyP_fk",
  authDomain: "stayworld-2570c.firebaseapp.com",
  projectId: "stayworld-2570c",
  storageBucket: "stayworld-2570c.firebasestorage.app",
  messagingSenderId: "272599681686",
  appId: "1:272599681686:web:33f89b66f7ee6f6f0b50b7",
  measurementId: "G-F8MXM3D7FJ"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// DOM
const form = document.getElementById("form-signup");
const nameEl = document.getElementById("name");
const nicknameEl = document.getElementById("nickname");
const genderEl = document.getElementById("gender");
const birthEl = document.getElementById("birth");
const emailEl = document.getElementById("email");
const phoneEl = document.getElementById("phone");
const nationalityEl = document.getElementById("nationality");
const cityEl = document.getElementById("city");
const pwEl = document.getElementById("password");
const googleBtn = document.getElementById("btn-google");
const errEl = document.getElementById("error");
const okEl = document.getElementById("ok");

// helpers
const show = (el,msg)=>{ if(!el) return; el.textContent = msg || ""; el.style.display = msg ? "block" : "none"; };
const mapErr = (e)=>({
  "auth/email-already-in-use":"이미 가입된 이메일입니다.",
  "auth/invalid-email":"이메일 형식이 올바르지 않습니다.",
  "auth/weak-password":"비밀번호가 너무 약합니다.(6자 이상 권장)",
  "auth/popup-closed-by-user":"창이 닫혔습니다. 다시 시도해 주세요.",
  "auth/cancelled-popup-request":"진행 중인 요청이 있습니다. 잠시 후 다시 시도해 주세요.",
  "auth/popup-blocked":"팝업이 차단되었습니다. 허용 후 다시 시도해 주세요.",
  "auth/unauthorized-domain":"허용되지 않은 도메인입니다. Authorized domains를 확인하세요."
}[e?.code] || `오류: ${e?.message || "알 수 없는 오류"}`);

function profileFromForm(){
  return {
    name: nameEl?.value?.trim() || "",
    nickname: nicknameEl?.value?.trim() || "",
    gender: genderEl?.value || "",
    birth: birthEl?.value || "",           // YYYY-MM-DD
    email: emailEl?.value?.trim() || "",
    phone: phoneEl?.value?.trim() || "",
    nationality: nationalityEl?.value?.trim() || "",
    city: cityEl?.value?.trim() || ""
  };
}
function validate(p, forGoogle=false){
  if (!p.name || !p.gender || !p.birth || !p.phone || !p.nationality || !p.city)
    return "필수 정보를 모두 입력해 주세요.";
  if (!forGoogle && !p.email) return "이메일을 입력해 주세요.";
  return null;
}

async function saveUserDoc(uid, profile){
  const data = {
    ...profile,
    profileCompleted: true,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  };
  await setDoc(doc(db, "users", uid), data, { merge: true });
}

function done(msg="회원가입이 완료되었습니다. 환영합니다!"){
  show(okEl, msg);
  setTimeout(()=>location.assign("/"), 1000);
}

/* 이메일/비밀번호 가입 */
form?.addEventListener("submit", async (e)=>{
  e.preventDefault(); show(errEl,""); show(okEl,"");
  const p = profileFromForm();
  const v = validate(p, false);
  if (v) return show(errEl, v);

  try{
    const cred = await createUserWithEmailAndPassword(auth, p.email, pwEl.value);
    if (p.name) { try{ await updateProfile(cred.user, { displayName: p.name }); } catch {} }
    await saveUserDoc(cred.user.uid, p);
    try{ await sendEmailVerification(cred.user); } catch {}
    done();
  }catch(err){
    show(errEl, mapErr(err));
  }
});

/* Google로 가입/로그인 (추가정보는 폼에서 필수) */
googleBtn?.addEventListener("click", async ()=>{
  show(errEl,""); show(okEl,"");
  const p = profileFromForm();
  const v = validate(p, true);
  if (v) return show(errEl, v);

  try{
    const provider = new GoogleAuthProvider();
    const cred = await signInWithPopup(auth, provider);
    const isNew = getAdditionalUserInfo(cred)?.isNewUser;

    // 구글 이메일로 동기화
    p.email = cred.user.email || p.email;

    if (p.name && cred.user.displayName !== p.name) {
      try{ await updateProfile(cred.user, { displayName: p.name }); } catch {}
    }

    await saveUserDoc(cred.user.uid, p);
    done(isNew ? "Google 계정으로 회원가입이 완료되었습니다!" : "이미 가입된 Google 계정으로 로그인되었습니다.");
  }catch(err){
    show(errEl, mapErr(err));
  }
});
