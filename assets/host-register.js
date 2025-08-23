import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { 
  getAuth, createUserWithEmailAndPassword, updateProfile, 
  GoogleAuthProvider, signInWithPopup 
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = { /* 동일 */ };
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

  try {
    const cred = await createUserWithEmailAndPassword(auth, email, pw);
    if (name) await updateProfile(cred.user, { displayName: name });

    await setDoc(doc(db, "hosts", cred.user.uid), {
      uid: cred.user.uid,
      email: cred.user.email,
      displayName: name || cred.user.displayName || "",
      verified: false, // 나중에 신분증 업로드 시 true
      createdAt: new Date().toISOString()
    });

    alert(`호스트 가입 완료! 🎉\n가입 이메일: ${cred.user.email}\n\n이제 신분증을 업로드 해주세요.`);
    window.location.href = "host-id.html";
  } catch (err) {
    alert("호스트 가입 실패: " + err.message);
  }
});

// Google 호스트 가입
document.getElementById("hostGoogleRegister")?.addEventListener("click", async () => {
  try {
    const cred = await signInWithPopup(auth, provider);

    await setDoc(doc(db, "hosts", cred.user.uid), {
      uid: cred.user.uid,
      email: cred.user.email,
      displayName: cred.user.displayName || "",
      verified: false,
      createdAt: new Date().toISOString()
    });

    alert(`Google 호스트 가입 완료! 🎉\n가입 이메일: ${cred.user.email}\n\n이제 신분증을 업로드 해주세요.`);
    window.location.href = "host-id.html";
  } catch (err) {
    alert("Google 가입 오류: " + err.message);
  }
});
