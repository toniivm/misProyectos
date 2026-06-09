'use client';

import { useEffect } from 'react';

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, '') ||
  'https://misproyectos-neyj.onrender.com';

export default function BackendWarmup() {
  useEffect(() => {
    // Wake up Render backend immediately when any page loads
    fetch(`${API_BASE_URL}/health`, { method: 'GET', mode: 'no-cors' }).catch(() => {});

    // Keep alive every 4 minutes while user is on the site
    const interval = setInterval(() => {
      fetch(`${API_BASE_URL}/health`, { method: 'GET', mode: 'no-cors' }).catch(() => {});
    }, 4 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  return null;
}
