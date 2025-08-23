import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { 
  getAuth, createUserWithEmailAndPassword, updateProfile,
  GoogleAuthProvider, signInWithPopup
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

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
const provider = new GoogleAuthProvider();

// 이메일 호스트 가입
document.getElementById("hostRegisterForm")?.addEventListener("submit", async (e) => {
  e.preventDefault();
  const name = document.getElementById("hostName").value.trim();
  const email = document.getElementById("hostEmail").value.trim();
  const pw = document.getElementById("hostPw").value.trim();

  if (!email || !pw) {
    alert("이메일과 비밀번호를 입력하세요.");
    return;
  }

  try {
    const cred = await createUserWithEmailAndPassword(auth, email, pw);
    if (name) await updateProfile(cred.user, { displayName: name });

    await setDoc(doc(db, "hosts", cred.user.uid), {
      uid: cred.user.uid,
      email: cred.user.email,
      displayName: name || cred.user.displayName || "",
      verified: false,
      createdAt: new Date().toISOString()
    });

    alert(`호스트 가입 완료! 🎉\n가입 이메일: ${cred.user.email}\n\n신분증을 업로드해주세요.`);
    window.location.href = "host-id.html";
  } catch (err) {
    alert("호스트 가입 실패: " + err.message);
  }
});

// 구글 호스트 가입
let isGoogleRegistering = false;
document.getElementById("hostGoogleRegister")?.addEventListener("click", async () => {
  if (isGoogleRegistering) return;
  isGoogleRegistering = true;

  try {
    const cred = await signInWithPopup(auth, provider);

    await setDoc(doc(db, "hosts", cred.user.uid), {
      uid: cred.user.uid,
      email: cred.user.email,
      displayName: cred.user.displayName || "",
      verified: false,
      createdAt: new Date().toISOString()
    });

    alert(`Google 호스트 가입 완료! 🎉\n가입 이메일: ${cred.user.email}\n\n신분증을 업로드해주세요.`);
    window.location.href = "host-id.html";
  } catch (err) {
    alert("Google 가입 오류: " + err.message);
  } finally {
    isGoogleRegistering = false;
  }
});
