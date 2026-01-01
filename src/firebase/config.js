import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, setPersistence, browserLocalPersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};

const requiredEnv = [
  "REACT_APP_FIREBASE_API_KEY",
  "REACT_APP_FIREBASE_AUTH_DOMAIN",
  "REACT_APP_FIREBASE_PROJECT_ID",
  "REACT_APP_FIREBASE_APP_ID",
];

const missingEnv = requiredEnv.filter((key) => !process.env[key]);

let app = null;
let auth = null;
let db = null;
let provider = null;

if (missingEnv.length === 0) {
  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  // Fuerza persistencia en localStorage para que el redirect no pierda sesión
  setPersistence(auth, browserLocalPersistence).catch((err) => {
    console.error("Firebase persistence error", err);
  });
  provider = new GoogleAuthProvider();
  db = getFirestore(app);
} else {
  // Keep the app running even if Firebase isn't configured.
  console.error(
    `Firebase not configured. Missing env vars: ${missingEnv.join(", ")}. ` +
      "Create a .env file (see .env.example) or configure them in your deployment environment."
  );
}

export { auth, provider, db };