// assets/verification-modal.js
const verificationModalHTML = `
<div class="modal" id="verificationModal">
  <div class="modal-content">
    <span class="modal-close" data-close="verificationModal">&times;</span>
    <div class="modal-header">Host Verification</div>
    <form id="verificationForm">
      <label>Upload ID (Passport/National ID)</label>
      <input type="file" id="idUpload" accept="image/*,.pdf" required>
      <button type="submit" class="btn-primary">Submit Verification</button>
    </form>
  </div>
</div>`;
document.body.insertAdjacentHTML("beforeend", verificationModalHTML);

import { getStorage, ref, uploadBytes } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-storage.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getFirestore, doc, updateDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { app } from "./login-modal.js";

const storage = getStorage(app);
const auth = getAuth(app);
const db = getFirestore(app);

document.getElementById("verificationForm").addEventListener("submit", async (e)=>{
  e.preventDefault();
  const file = idUpload.files[0];
  const user = auth.currentUser;
  if(!user){ alert("Login required"); return; }
  const fileRef = ref(storage, `ids/${user.uid}/${file.name}`);
  await uploadBytes(fileRef,file);
  await updateDoc(doc(db,"hosts",user.uid),{ idUploaded:true });
  alert("Verification submitted");
});
