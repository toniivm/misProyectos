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

export type PasswordResetResult = 'sent' | 'dev-sent';

interface AuthContextValue {
  user: SimpleUser | null;
  loading: boolean;
  showModal: boolean;
  openModal: () => void;
  closeModal: () => void;
  signInWithGoogle: () => Promise<void>;
  signInWithEmail: (email: string, password: string) => Promise<void>;
  signUpWithEmail: (email: string, password: string) => Promise<void>;
  requestPasswordReset: (email: string) => Promise<PasswordResetResult | null>;
  logout: () => Promise<void>;
  error: string | null;
  clearError: () => void;
}

const firebaseEnabled = !!(
  process.env.NEXT_PUBLIC_FIREBASE_API_KEY &&
  process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID
);
// Enable dev/local auth when Firebase is not configured and we're on localhost
const devAuthEnabled = !firebaseEnabled && (
  process.env.NEXT_PUBLIC_ALLOW_DEV_AUTH === 'true' ||
  (typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'))
);

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<SimpleUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!firebaseEnabled) {
      if (devAuthEnabled) {
        try {
          const stored = localStorage.getItem('dev_user');
          if (stored) setUser(JSON.parse(stored));
        } catch {}
        setLoading(false);
        return;
      }
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
    if (!firebaseEnabled && !devAuthEnabled) {
      setError('Auth not configured. Add Firebase environment variables.');
      return;
    }
    if (devAuthEnabled) {
      try {
        const mock = {
          uid: `dev-google-${Date.now()}`,
          email: `dev.user+${Date.now()}@example.com`,
          displayName: 'Dev User',
          photoURL: null,
        } as SimpleUser;
        setUser(mock);
        try { localStorage.setItem('dev_user', JSON.stringify(mock)); } catch {}
        setShowModal(false);
        return;
      } catch (e: any) {
        setError(e?.message ?? 'Google sign-in failed. Please try again.');
        return;
      }
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
    if (!firebaseEnabled && !devAuthEnabled) {
      setError('Auth not configured. Add Firebase environment variables.');
      return;
    }
    if (devAuthEnabled) {
      try {
        const raw = localStorage.getItem('dev_users') || '{}';
        const users = JSON.parse(raw || '{}');
        const record = users[email];
        if (!record || record.password !== password) {
          setError('Invalid credentials');
          return;
        }
        const u = { uid: record.uid, email, displayName: record.displayName ?? null, photoURL: record.photoURL ?? null } as SimpleUser;
        setUser(u);
        try { localStorage.setItem('dev_user', JSON.stringify(u)); } catch {}
        setShowModal(false);
        return;
      } catch (e: any) {
        setError(e?.message ?? 'Sign-in failed. Check your credentials.');
        return;
      }
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
    if (!firebaseEnabled && !devAuthEnabled) {
      setError('Auth not configured. Add Firebase environment variables.');
      return;
    }
    if (devAuthEnabled) {
      try {
        const raw = localStorage.getItem('dev_users') || '{}';
        const users = JSON.parse(raw || '{}');
        if (users[email]) {
          setError('User already exists');
          return;
        }
        const uid = `dev-${Date.now()}`;
        users[email] = { uid, password, displayName: null, photoURL: null };
        try { localStorage.setItem('dev_users', JSON.stringify(users)); } catch {}
        const u = { uid, email, displayName: null, photoURL: null } as SimpleUser;
        setUser(u);
        try { localStorage.setItem('dev_user', JSON.stringify(u)); } catch {}
        setShowModal(false);
        // Send welcome email
        try {
          const apiBase = (process.env.NEXT_PUBLIC_API_URL || '').replace(/\/$/, '');
          if (apiBase) {
            fetch(`${apiBase}/emails/welcome`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ email, locale: navigator.language.startsWith('en') ? 'en' : 'es' }),
            });
          }
        } catch {}
        return;
      } catch (e: any) {
        setError(e?.message ?? 'Sign-up failed. Please try again.');
        return;
      }
    }
    try {
      const auth = await getAuth();
      const { createUserWithEmailAndPassword } = await import('firebase/auth');
      await createUserWithEmailAndPassword(auth, email, password);
      setShowModal(false);
      // Send welcome email
      try {
        const apiBase = (process.env.NEXT_PUBLIC_API_URL || '').replace(/\/$/, '');
        if (apiBase) {
          fetch(`${apiBase}/emails/welcome`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, locale: navigator.language.startsWith('en') ? 'en' : 'es' }),
          });
        }
      } catch {}
    } catch (e: any) {
      setError(e?.message ?? 'Sign-up failed. Please try again.');
    }
  };

  const requestPasswordReset = async (email: string) => {
    setError(null);
    const normalizedEmail = email.trim();

    if (!normalizedEmail) {
      setError('Enter your email first.');
      return null;
    }

    if (!firebaseEnabled && !devAuthEnabled) {
      setError('Auth not configured. Add Firebase environment variables.');
      return null;
    }

    if (devAuthEnabled) {
      return 'dev-sent';
    }

    try {
      const auth = await getAuth();
      const { sendPasswordResetEmail } = await import('firebase/auth');
      await sendPasswordResetEmail(auth, normalizedEmail);
      return 'sent';
    } catch (e: any) {
      setError(e?.message ?? 'Could not send the reset email. Please try again.');
      return null;
    }
  };

  const logout = async () => {
    try {
      if (devAuthEnabled) {
        try { localStorage.removeItem('dev_user'); } catch {}
        setUser(null);
        return;
      }
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
        requestPasswordReset,
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
