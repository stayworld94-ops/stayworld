// assets/signup.js
// Firebase Web SDK v10 (모듈)
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
import {
  getStorage,
  ref as sRef,
  uploadBytes,
  getDownloadURL
} from "https://www.gstatic.com/firebasejs/10.12.4/firebase-storage.js";

/* 🔴 Firebase Console → Project settings → SDK configuration → Config
   ↓↓↓ 여기를 실제 값으로 통째로 교체하세요 ↓↓↓ */
const firebaseConfig = {
  apiKey: "AIzaSyCyb0pn2sFTEPkL0Q1ALwZaV2QILWyP_fk",
  authDomain: "stayworld-2570c.firebaseapp.com",
  projectId: "stayworld-2570c",
  storageBucket: "stayworld-2570c.firebasestorage.app",
  messagingSenderId: "272599681686",
  appId: "1:272599681686:web:33f89b66f7ee6f6f0b50b7",
  measurementId: "G-F8MXM3D7FJ"
};
/* ↑↑↑ 여기까지 교체 ↑↑↑ */

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

// DOM refs
const form = document.getElementById("form-signup");
const nameEl = document.getElementById("name");
const nicknameEl = document.getElementById("nickname");
const genderEl = document.getElementById("gender");
const birthEl = document.getElementById("birth");
const emailEl = document.getElementById("email");
const phoneEl = document.getElementById("phone");
const nationalityEl = document.getElementById("nationality");
const cityEl = document.getElementById("city");
const avatarEl = document.getElementById("avatar");
const avatarPreview = document.getElementById("avatarPreview");
const pwEl = document.getElementById("password");
const googleBtn = document.getElementById("btn-google");
const errEl = document.getElementById("error");
const okEl = document.getElementById("ok");

// helpers
const show = (el, msg) => { if (!el) return; el.textContent = msg || ""; el.style.display = msg ? "block" : "none"; };
const mapErr = (e) => ({
  "auth/email-already-in-use": "이미 가입된 이메일입니다.",
  "auth/invalid-email": "이메일 형식이 올바르지 않습니다.",
  "auth/weak-password": "비밀번호가 너무 약합니다.(6자 이상 권장)",
  "auth/popup-closed-by-user": "창이 닫혔습니다. 다시 시도해 주세요.",
  "auth/cancelled-popup-request": "진행 중인 요청이 있습니다. 잠시 후 다시 시도해 주세요.",
  "auth/popup-blocked": "팝업이 차단되었습니다. 팝업 허용 후 다시 시도해 주세요.",
  "auth/unauthorized-domain": "허용되지 않은 도메인입니다. Authorized domains를 확인하세요."
}[e?.code] || `오류: ${e?.message || "알 수 없는 오류"}`);

function profileFromForm() {
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
function validate(p, forGoogle = false) {
  if (!p.name || !p.gender || !p.birth || !p.phone || !p.nationality || !p.city) {
    return "필수 정보를 모두 입력해 주세요.";
  }
  if (!forGoogle && !p.email) return "이메일을 입력해 주세요.";
  return null;
}

// avatar preview
avatarEl?.addEventListener("change", () => {
  const f = avatarEl.files?.[0];
  if (!f) { if (avatarPreview) avatarPreview.style.display = "none"; return; }
  if (avatarPreview) {
    avatarPreview.src = URL.createObjectURL(f);
    avatarPreview.onload = () => URL.revokeObjectURL(avatarPreview.src);
    avatarPreview.style.display = "block";
  }
});

// optional upload (no file => null)
async function uploadAvatar(uid) {
  const file = avatarEl?.files?.[0];
  if (!file) return null; // 선택사항
  if (!file.type.startsWith("image/")) throw new Error("이미지 파일만 업로드할 수 있습니다.");
  if (file.size > 5 * 1024 * 1024) throw new Error("이미지 크기는 5MB 이하로 업로드해 주세요.");
  const path = `users/${uid}/avatar_${Date.now()}`;
  const ref = sRef(storage, path);
  await uploadBytes(ref, file, { contentType: file.type });
  return await getDownloadURL(ref);
}

async function saveUserDoc(uid, profile, photoURL) {
  const data = {
    ...profile,
    photoURL: photoURL || null,
    profileCompleted: true,
    updatedAt: serverTimestamp(),
    createdAt: serverTimestamp()
  };
  await setDoc(doc(db, "users", uid), data, { merge: true });
}

function done(msg = "회원가입이 완료되었습니다. 환영합니다!") {
  show(okEl, msg);
  setTimeout(() => location.assign("/"), 1000);
}

/* =========================
   이메일/비밀번호로 회원가입
   ========================= */
form?.addEventListener("submit", async (e) => {
  e.preventDefault(); show(errEl, ""); show(okEl, "");
  const p = profileFromForm();
  const v = validate(p, false);
  if (v) return show(errEl, v);

  try {
    const cred = await createUserWithEmailAndPassword(auth, p.email, pwEl.value);
    // displayName 설정
    if (p.name) await updateProfile(cred.user, { displayName: p.name });

    // 선택: 아바타 업로드
    let photoURL = null;
    try { photoURL = await uploadAvatar(cred.user.uid); } catch (e) { show(errEl, e.message); }
    if (photoURL) { try { await updateProfile(cred.user, { photoURL }); } catch {} }

    // Firestore 저장
    await saveUserDoc(cred.user.uid, p, photoURL);

    // 선택: 이메일 인증 메일 보내기 (실패해도 가입엔 영향 없음)
    try { await sendEmailVerification(cred.user); } catch {}

    done(); // 자동 로그인 상태로 홈 이동
  } catch (err) {
    show(errEl, mapErr(err));
  }
});

/* =========================
   Google로 가입/로그인 (추가정보 필수)
   ========================= */
googleBtn?.addEventListener("click", async () => {
  show(errEl, ""); show(okEl, "");
  const p = profileFromForm();
  const v = validate(p, true); // 구글도 추가정보는 필수
  if (v) return show(errEl, v);

  try {
    const provider = new GoogleAuthProvider();
    const cred = await signInWithPopup(auth, provider);
    const isNew = getAdditionalUserInfo(cred)?.isNewUser;

    // Google 계정 이메일로 동기화
    p.email = cred.user.email || p.email;

    // photoURL: 구글 사진 또는 사용자가 새로 올린 파일
    let photoURL = cred.user.photoURL || null;
    if (avatarEl?.files?.length) {
      try { photoURL = await uploadAvatar(cred.user.uid); } catch (e) { show(errEl, e.message); }
    }

    // displayName / photoURL 갱신
    const profileUpdate = {};
    if (p.name && cred.user.displayName !== p.name) profileUpdate.displayName = p.name;
    if (photoURL && cred.user.photoURL !== photoURL) profileUpdate.photoURL = photoURL;
    if (Object.keys(profileUpdate).length) { try { await updateProfile(cred.user, profileUpdate); } catch {} }

    // Firestore 저장/갱신
    await saveUserDoc(cred.user.uid, p, photoURL);

    done(isNew ? "Google 계정으로 회원가입이 완료되었습니다!" : "이미 가입된 Google 계정으로 로그인되었습니다.");
  } catch (err) {
    show(errEl, mapErr(err));
  }
});
