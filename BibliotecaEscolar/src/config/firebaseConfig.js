// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDPpCnOjP4JD571-ACcsCCVtL6CDbL1aak",
  authDomain: "biblioescola-74ff1.firebaseapp.com",
  projectId: "biblioescola-74ff1",
  storageBucket: "biblioescola-74ff1.firebasestorage.app",
  messagingSenderId: "1072239082165",
  appId: "1:1072239082165:web:812fd3a69c237853d4dcfc",
  measurementId: "G-3M8KPM6BL8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Inicializa Auth e Firestore
export const auth = getAuth(app);
export const db = getFirestore(app);