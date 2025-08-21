<!-- 모든 페이지에서 type="module"로 import해서 쓰는 브라우저 전용 초기화 -->
<script type="module">
// ===== /assets/firebase.js =====
// ↓ 실제 콘솔의 클라이언트 구성으로 교체 (apiKey 등은 공개되어도 괜찮은 값입니다)
const firebaseConfig = {
  apiKey: "AIzaSyCyb0pn2sFTEPkL0Q1ALwZaV2QILWyP_fk",
  authDomain: "stayworld-2570c.firebaseapp.com",
  projectId: "stayworld-2570c",
  storageBucket: "stayworld-2570c.firebasestorage.app",
  messagingSenderId: "272599681686",
  appId: "1:272599681686:web:33f89b66f7ee6f6f0b50b7",
  measurementId: "G-F8MXM3D7FJ"
};
import { initializeApp, getApps, getApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-storage.js";

// 이미 초기화 되어 있으면 재사용(중복 init 방지)
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const googleProvider = new GoogleAuthProvider();

// 전역(디버깅 편의)
window.__sw = { app, auth, db, storage };
</script>
