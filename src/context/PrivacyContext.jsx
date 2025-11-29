import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

const PrivacyContext = createContext({
  privacyMode: false,
  setPrivacyMode: () => {},
  togglePrivacyMode: () => {},
});

export function PrivacyProvider({ children }) {
  const [privacyMode, setPrivacyMode] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('privacyMode');
      if (saved != null) setPrivacyMode(saved === 'true');
    } catch {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('privacyMode', String(privacyMode));
    } catch {}
  }, [privacyMode]);

  const value = useMemo(() => ({
    privacyMode,
    setPrivacyMode,
    togglePrivacyMode: () => setPrivacyMode((v) => !v),
  }), [privacyMode]);

  return (
    <PrivacyContext.Provider value={value}>
      {children}
    </PrivacyContext.Provider>
  );
}

export function usePrivacy() {
  return useContext(PrivacyContext);
}
