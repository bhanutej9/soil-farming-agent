// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCec_d4EBRbeejVlvxZegGAB0VQHNkcBh0",
  authDomain: "soil-farming-agent-fc11c.firebaseapp.com",
  projectId: "soil-farming-agent-fc11c",
  storageBucket: "soil-farming-agent-fc11c.appspot.com",  // Fixed: added ".appspot.com"
  messagingSenderId: "1052434110376",
  appId: "1:1052434110376:web:6cb563bdc288a59be66f9d",
  measurementId: "G-KKLZEGXZT1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and Firestore
export const auth = getAuth(app);
export const db = getFirestore(app);
