// assets/listing-modal.js
const listingModalHTML = `
<div class="modal" id="listingModal">
  <div class="modal-content">
    <span class="modal-close" data-close="listingModal">&times;</span>
    <div class="modal-header">Register Accommodation</div>
    <form id="listingForm">
      <label>Title</label><input id="listingTitle" required>
      <label>Address</label><input id="listingAddress" required>
      <label>Description</label><textarea id="listingDesc"></textarea>
      <button type="submit" class="btn-primary">Submit Listing</button>
    </form>
  </div>
</div>`;
document.body.insertAdjacentHTML("beforeend", listingModalHTML);

import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { app } from "./login-modal.js";

const db = getFirestore(app);
const auth = getAuth(app);

document.getElementById("listingForm").addEventListener("submit", async (e)=>{
  e.preventDefault();
  const address = listingAddress.value;
  const res = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=YOUR_GOOGLE_MAPS_KEY`);
  const geo = await res.json();
  const coords = geo.results[0]?.geometry?.location;
  const user = auth.currentUser;
  if(!user){ alert("Login required"); return; }
  await addDoc(collection(db,"listings"),{
    host:user.uid,title:listingTitle.value,address,coords,desc:listingDesc.value,status:"pending_review"
  });
  alert("Listing submitted for review");
});
