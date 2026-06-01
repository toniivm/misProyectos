'use client';

import {useEffect} from 'react';
import { getPreferredLocale } from '../lib/localePreference';

export default function Home() {
  useEffect(() => {
    const locale = getPreferredLocale() || 'es';
    window.location.replace(`/${locale}/`);
  }, []);

  return null;
}
