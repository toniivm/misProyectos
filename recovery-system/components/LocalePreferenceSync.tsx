'use client';

import { useEffect } from 'react';
import { useLocale } from 'next-intl';
import { persistPreferredLocale } from '../lib/localePreference';

export default function LocalePreferenceSync() {
  const locale = useLocale();

  useEffect(() => {
    persistPreferredLocale(locale);
  }, [locale]);

  return null;
}