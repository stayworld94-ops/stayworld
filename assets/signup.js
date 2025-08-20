// assets/signup.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  updateProfile 
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

// ✅ Firebase 설정 (firebaseConfig는 그대로 유지)
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

// ✅ 회원가입 폼 submit 이벤트
document.getElementById("signup-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const username = document.getElementById("username").value;

  try {
    // 🔑 Firebase 계정 생성
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // 🔑 사용자 이름 프로필 업데이트
    if (username) {
      await updateProfile(user, { displayName: username });
    }

    // 🔑 로그인 상태 저장 (localStorage)
    localStorage.setItem("stayworldUser", JSON.stringify({
      uid: user.uid,
      email: user.email,
      displayName: username || ""
    }));

    alert("🎉 회원가입 성공! 자동으로 로그인 되었습니다.");
    window.location.href = "index.html"; // 메인으로 리다이렉트
  } catch (error) {
    console.error("회원가입 오류:", error);
    alert("❌ 회원가입 실패: " + error.message);
  }
});
