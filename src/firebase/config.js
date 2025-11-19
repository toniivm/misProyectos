import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCwPVVjeFsFOst_VCio5b-BwKoDkIvrH50",
  authDomain: "valtre-73c7b.firebaseapp.com",
  projectId: "valtre-73c7b",
  storageBucket: "valtre-73c7b.firebasestorage.app",
  messagingSenderId: "461850531851",
  appId: "1:461850531851:web:7300c187d7c362fe524f0e",
  measurementId: "G-2XMSEM58VW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// ⭐ EXPORTAR auth y provider
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();