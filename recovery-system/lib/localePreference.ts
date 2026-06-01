const STORAGE_KEY = 'rs_preferred_locale';
const COOKIE_KEY = 'rs_preferred_locale';

function normalizeLocale(value: string | null | undefined) {
  return value === 'es' || value === 'en' ? value : null;
}

export function getPreferredLocale() {
  if (typeof window === 'undefined') return null;

  const storedLocale = normalizeLocale(window.localStorage.getItem(STORAGE_KEY));
  if (storedLocale) return storedLocale;

  const cookieLocale = normalizeLocale(
    document.cookie
      .split('; ')
      .find((part) => part.startsWith(`${COOKIE_KEY}=`))
      ?.split('=')[1] ?? null,
  );

  return cookieLocale;
}

export function persistPreferredLocale(locale: string) {
  const normalizedLocale = normalizeLocale(locale);
  if (!normalizedLocale || typeof window === 'undefined') return;

  try {
    window.localStorage.setItem(STORAGE_KEY, normalizedLocale);
  } catch {}

  document.cookie = `${COOKIE_KEY}=${normalizedLocale}; path=/; max-age=31536000; SameSite=Lax`;
}