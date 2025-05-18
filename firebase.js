import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import {
  getDatabase,
  ref,
  set,
  onValue,
  push,
  serverTimestamp,
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";
import {
  getStorage,
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-storage.js";

const firebaseConfig = {
  apiKey: "AIzaSyC5C4F0QeOTx88XxBYRKNdqAS3TaUIEJKg",
  authDomain: "justkick-a1e17.firebaseapp.com",
  projectId: "justkick-a1e17",
  storageBucket: "justkick-a1e17.appspot.com",
  messagingSenderId: "958410816861",
  appId: "1:958410816861:web:2a9fd16973bd1652383cb4",
  measurementId: "G-2KRH67SKR9",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);
const storage = getStorage(app);

export {
  auth,
  database, // ✅ Exported database instead of getDatabase
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  ref,
  set,
  onValue,
  push,
  serverTimestamp,
  storage,
  storageRef,
  uploadBytes,
  getDownloadURL,
};
