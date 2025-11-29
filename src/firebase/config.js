import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY || "AIzaSyCwPVVjeFsFOst_VCio5b-BwKoDkIvrH50",
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN || "valtre-73c7b.firebaseapp.com",
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID || "valtre-73c7b",
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET || "valtre-73c7b.firebasestorage.app",
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID || "461850531851",
  appId: process.env.REACT_APP_FIREBASE_APP_ID || "1:461850531851:web:7300c187d7c362fe524f0e",
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID || "G-2XMSEM58VW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app); // Firestore for order storage