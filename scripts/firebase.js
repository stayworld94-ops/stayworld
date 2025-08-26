// /scripts/firebase.js
// Firebase v10 CDN + ESM. 모든 페이지에서 import.
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getAuth,
  onAuthStateChanged,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import {
  getFirestore,
  doc, setDoc, getDoc, addDoc, updateDoc, deleteDoc,
  onSnapshot, getDocs, query, where, collection,
  serverTimestamp, orderBy, limit
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import {
  getStorage,
  ref, uploadBytes, getDownloadURL
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-storage.js";

// 🔒 실제 콘솔 값으로 교체
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

// singletons
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// convenient re-exports
export {
  // auth
  onAuthStateChanged, signOut, GoogleAuthProvider, signInWithPopup,
  signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile,
  // firestore
  doc, setDoc, getDoc, addDoc, updateDoc, deleteDoc,
  onSnapshot, getDocs, query, where, collection, serverTimestamp, orderBy, limit,
  // storage
  ref, uploadBytes, getDownloadURL
};
