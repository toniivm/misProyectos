'use client';

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react';

interface SimpleUser {
  email: string;
  displayName: string | null;
  photoURL: string | null;
  uid: string;
}

interface AuthContextValue {
  user: SimpleUser | null;
  loading: boolean;
  showModal: boolean;
  openModal: () => void;
  closeModal: () => void;
  signInWithGoogle: () => Promise<void>;
  signInWithEmail: (email: string, password: string) => Promise<void>;
  signUpWithEmail: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  error: string | null;
  clearError: () => void;
}

const firebaseEnabled = !!(
  process.env.NEXT_PUBLIC_FIREBASE_API_KEY &&
  process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID
);

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<SimpleUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!firebaseEnabled) {
      setLoading(false);
      return;
    }

    let unsubscribe: (() => void) | undefined;

    async function init() {
      try {
        const { initializeApp, getApps, getApp } = await import('firebase/app');
        const { getAuth, onAuthStateChanged } = await import('firebase/auth');

        const config = {
          apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
          authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
          projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
          storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
          messagingSenderId:
            process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
          appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
        };

        const app = getApps().length ? getApp() : initializeApp(config);
        const auth = getAuth(app);

        unsubscribe = onAuthStateChanged(auth, (u) => {
          if (u) {
            setUser({
              uid: u.uid,
              email: u.email ?? '',
              displayName: u.displayName,
              photoURL: u.photoURL,
            });
          } else {
            setUser(null);
          }
          setLoading(false);
        });
      } catch {
        setLoading(false);
      }
    }

    init();
    return () => unsubscribe?.();
  }, []);

  async function getAuth() {
    const { initializeApp, getApps, getApp } = await import('firebase/app');
    const { getAuth: fbGetAuth } = await import('firebase/auth');
    const config = {
      apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
      authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
      appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    };
    const app = getApps().length ? getApp() : initializeApp(config);
    return fbGetAuth(app);
  }

  const signInWithGoogle = async () => {
    setError(null);
    if (!firebaseEnabled) {
      setError('Auth not configured. Add Firebase environment variables.');
      return;
    }
    try {
      const auth = await getAuth();
      const { GoogleAuthProvider, signInWithPopup } = await import(
        'firebase/auth'
      );
      await signInWithPopup(auth, new GoogleAuthProvider());
      setShowModal(false);
    } catch (e: any) {
      setError(e?.message ?? 'Google sign-in failed. Please try again.');
    }
  };

  const signInWithEmail = async (email: string, password: string) => {
    setError(null);
    if (!firebaseEnabled) {
      setError('Auth not configured. Add Firebase environment variables.');
      return;
    }
    try {
      const auth = await getAuth();
      const { signInWithEmailAndPassword } = await import('firebase/auth');
      await signInWithEmailAndPassword(auth, email, password);
      setShowModal(false);
    } catch (e: any) {
      setError(e?.message ?? 'Sign-in failed. Check your credentials.');
    }
  };

  const signUpWithEmail = async (email: string, password: string) => {
    setError(null);
    if (!firebaseEnabled) {
      setError('Auth not configured. Add Firebase environment variables.');
      return;
    }
    try {
      const auth = await getAuth();
      const { createUserWithEmailAndPassword } = await import('firebase/auth');
      await createUserWithEmailAndPassword(auth, email, password);
      setShowModal(false);
    } catch (e: any) {
      setError(e?.message ?? 'Sign-up failed. Please try again.');
    }
  };

  const logout = async () => {
    try {
      if (firebaseEnabled) {
        const auth = await getAuth();
        const { signOut } = await import('firebase/auth');
        await signOut(auth);
      }
      setUser(null);
    } catch {}
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        showModal,
        openModal: () => setShowModal(true),
        closeModal: () => {
          setShowModal(false);
          setError(null);
        },
        signInWithGoogle,
        signInWithEmail,
        signUpWithEmail,
        logout,
        error,
        clearError: () => setError(null),
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
