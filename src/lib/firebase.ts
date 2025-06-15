// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBfhXej-KJTT-K7zbx448Lp4yY9dwv97f4",
  authDomain: "crbc-d0e3f.firebaseapp.com",
  projectId: "crbc-d0e3f",
  storageBucket: "crbc-d0e3f.firebasestorage.app",
  messagingSenderId: "155360549746",
  appId: "1:155360549746:web:9443c183a92e1fa370dbeb",
  measurementId: "G-8LGJPNCX07"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
// const analytics = getAnalytics(app);
export const storage = getStorage(app)
export const db      = getFirestore(app)