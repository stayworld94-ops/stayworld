<!-- 모든 페이지 공통으로 포함 -->
<script type="module">
// ✅ Firebase SDK (모듈)
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, onAuthStateChanged, GoogleAuthProvider, signInWithPopup, signOut }
  from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// 🔧 너 계정으로 바꿔 넣기
const firebaseConfig = {
  apiKey: "AIzaSyCyb0pn2sFTEPkL0Q1ALwZaV2QILWyP_fk",
  authDomain: "stayworld-2570c.firebaseapp.com",
  projectId: "stayworld-2570c",
  storageBucket: "stayworld-2570c.firebasestorage.app",
  messagingSenderId: "272599681686",
  appId: "1:272599681686:web:33f89b66f7ee6f6f0b50b7",
  measurementId: "G-F8MXM3D7FJ"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db   = getFirestore(app);

// (선택) 간단 구글 로그인 헬퍼
export const googleLogin = async () => {
  const provider = new GoogleAuthProvider();
  await signInWithPopup(auth, provider);
};
export const logout = async () => signOut(auth);

// 로그인 상태 표시 (옵션)
onAuthStateChanged(auth, (user) => {
  const el = document.querySelector("[data-auth-state]");
  if (!el) return;
  el.textContent = user ? `로그인: ${user.email}` : "로그인 필요";
});
</script>
