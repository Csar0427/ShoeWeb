// firebase.js
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
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js"; // Import database functions

const firebaseConfig = {
  apiKey: "AIzaSyC5C4F0QeOTx88XxBYRKNdqAS3TaUIEJKg",

  authDomain: "justkick-a1e17.firebaseapp.com",

  projectId: "justkick-a1e17",

  storageBucket: "justkick-a1e17.firebasestorage.app",

  messagingSenderId: "958410816861",

  appId: "1:958410816861:web:2a9fd16973bd1652383cb4",

  measurementId: "G-2KRH67SKR9",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app); // Initialize the database

export {
  auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  getDatabase, // Export database functions
  ref,
  set,
};
