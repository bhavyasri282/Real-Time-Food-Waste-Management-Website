// firebase.js
// Import the functions you need from Firebase SDK
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAui3G4Zirr1KhT-o0gdCaquzUZw2ujVxc",
  authDomain: "foodwastesystem-e2516.firebaseapp.com",
  projectId: "foodwastesystem-e2516",
  storageBucket: "foodwastesystem-e2516.firebasestorage.app",
  messagingSenderId: "232561224230",
  appId: "1:232561224230:web:5e0ed6c1f804565c7a14e7",
  measurementId: "G-8T59V1TZK6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app); // Export Firestore to use in other files