import { createContext, useContext, useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase/config';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe usarse dentro de AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Suscribe al estado de Firebase Auth para soportar redirect y mantener sesión
    const unsub = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        const normalized = {
          name: currentUser.displayName || currentUser.email?.split('@')[0] || '',
          email: currentUser.email,
          photo: currentUser.photoURL,
          uid: currentUser.uid,
        };
        localStorage.setItem('user', JSON.stringify(normalized));
        setUser(normalized);
      } else {
        localStorage.removeItem('user');
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsub();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};