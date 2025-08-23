import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, updateProfile, GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
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

// ✅ 이메일로 호스트 가입
document.getElementById("hostEmailSignup")?.addEventListener("submit", async (e) => {
  e.preventDefault();
  const name = hostName.value.trim();
  const email = hostEmail.value.trim();
  const pw = hostPw.value.trim();

  try {
    const cred = await createUserWithEmailAndPassword(auth, email, pw);
    if (name) await updateProfile(cred.user, { displayName: name });

    await setDoc(doc(db, "hosts", cred.user.uid), {
      uid: cred.user.uid,
      email: cred.user.email,
      displayName: name || cred.user.displayName || "",
      verified: true,
      createdAt: new Date().toISOString()
    }, { merge: true });

    localStorage.setItem("sw_logged_in", "true");
    localStorage.setItem("sw_user_email", cred.user.email);
    if (window.markLoggedIn) window.markLoggedIn();

    alert(`호스트 가입 완료! 🎉\n환영합니다, ${cred.user.email} 님\n이제 신분증을 업로드해주세요.`);
    location.href = "host-id.html";
  } catch (err) {
    alert("호스트 가입 실패: " + err.message);
  }
});

// ✅ 구글로 호스트 가입
document.getElementById("hostGoogleSignup")?.addEventListener("click", async () => {
  try {
    const cred = await signInWithPopup(auth, provider);

    await setDoc(doc(db, "hosts", cred.user.uid), {
      uid: cred.user.uid,
      email: cred.user.email,
      displayName: cred.user.displayName || "",
      verified: true,
      createdAt: new Date().toISOString()
    }, { merge: true });

    localStorage.setItem("sw_logged_in", "true");
    localStorage.setItem("sw_user_email", cred.user.email);
    if (window.markLoggedIn) window.markLoggedIn();

    alert(`Google 호스트 가입 완료! 🎉\n환영합니다, ${cred.user.email} 님\n이제 신분증을 업로드해주세요.`);
    location.href = "host-id.html";
  } catch (err) {
    alert("Google 호스트 가입 실패: " + err.message);
  }
});
