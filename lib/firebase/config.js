// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {auth}
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyArO4ZY52-0FEXmtmQGrEXCF6gVRj69xsw",
//   authDomain: "ecommerce-d65b7.firebaseapp.com",
//   projectId: "ecommerce-d65b7",
//   storageBucket: "ecommerce-d65b7.firebasestorage.app",
//   messagingSenderId: "617444594671",
//   appId: "1:617444594671:web:02d6d6c738f7192b8e9c1a",
//   measurementId: "G-NKQKVML2MH",
// };

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default firebaseApp;
