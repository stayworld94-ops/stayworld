<!-- firebase-config.js -->
<script type="module">
  // CDN 모듈 버전 사용 (빌드 불필요)
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js";
  import {
    getAuth,
    GoogleAuthProvider,
    signInWithPopup,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    updateProfile
  } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js";
  // (필요하면) import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-analytics.js";

  // 👉 여기 당신이 받은 구성 그대로 붙이기
  const firebaseConfig = {
    apiKey: "AIzaSyCyb0pn2sFTEPkL0Q1ALwZaV2QILWyP_fk",
    authDomain: "stayworld-2570c.firebaseapp.com",
    projectId: "stayworld-2570c",
    storageBucket: "stayworld-2570c.firebasestorage.app",
    messagingSenderId: "272599681686",
    appId: "1:272599681686:web:33f89b66f7ee6f6f0b50b7",
    measurementId: "G-F8MXM3D7FJ"
  };

  // Firebase 초기화
  const app  = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  // const analytics = getAnalytics(app); // 선택사항

  // 전역에서 쓸 수 있도록 window에 내보내기
  window._swAuth = { auth, GoogleAuthProvider, signInWithPopup,
                     signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile };
</script>
