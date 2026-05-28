'use client';

import { useEffect } from 'react';

export default function UtmCapture() {
  useEffect(() => {
    try {
      if (typeof window === 'undefined') return;

      // Don't overwrite if already captured
      const existing = localStorage.getItem('utm_params');
      if (existing) return;

      const params = new URLSearchParams(window.location.search);
      const utm = {
        source: params.get('utm_source'),
        medium: params.get('utm_medium'),
        campaign: params.get('utm_campaign'),
        term: params.get('utm_term'),
        content: params.get('utm_content'),
        gclid: params.get('gclid'),
        referrer: document.referrer || null,
        ts: Date.now(),
      } as Record<string, string | number | null>;

      const hasAny = Object.values(utm).some((v) => v !== null && v !== undefined);
      if (hasAny) {
        try {
          localStorage.setItem('utm_params', JSON.stringify(utm));
        } catch (e) {
          // ignore storage errors
        }
      }
    } catch (e) {
      // swallow
    }
  }, []);

  return null;
}
