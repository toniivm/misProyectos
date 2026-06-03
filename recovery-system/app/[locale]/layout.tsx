import {NextIntlClientProvider, hasLocale} from 'next-intl';
import {getMessages, setRequestLocale} from 'next-intl/server';
import {notFound} from 'next/navigation';
import type {Metadata} from 'next';
import {locales} from '../../i18n/routing';
import {CartProvider} from '../../context/CartContext';
import {AuthProvider} from '../../context/AuthContext';
import CartSidebar from '../../components/CartSidebar';
import AuthModal from '../../components/AuthModal';
import LocalePreferenceSync from '../../components/LocalePreferenceSync';

type Props = {
  children: React.ReactNode;
  params: {locale: string};
};

export function generateStaticParams() {
  return locales.map((locale) => ({locale}));
}

export async function generateMetadata({params}: Props): Promise<Metadata> {
  const locale = params.locale;
  const isEs = locale === 'es';

  return {
    title: isEs
      ? 'NOCTAS™ | Recuperacion premium en casa'
      : 'NOCTAS™ | Premium at-home recovery',
    description: isEs
      ? 'Alivio muscular profundo, descanso optimizado y recuperacion de alto rendimiento con una experiencia premium diseñada para tu rutina diaria.'
      : 'Deep muscle relief, better sleep and high-performance recovery in one premium daily ritual.',
    alternates: {
      canonical: `/${locale}`,
      languages: {
        es: '/es',
        en: '/en'
      }
    },
    icons: {
      icon: '/favicon.svg',
      shortcut: '/favicon.svg'
    },
    openGraph: {
      title: isEs
        ? 'NOCTAS™ | Recuperacion premium en casa'
        : 'NOCTAS™ | Premium at-home recovery',
      description: isEs
        ? 'Tu cuerpo no se recupera solo. Crea tu ritual premium de recuperacion.'
        : 'Your body does not recover by itself. Build your premium recovery ritual.',
      type: 'website',
      locale: isEs ? 'es_ES' : 'en_US'
    }
  };
}

export default async function LocaleLayout({children, params}: Props) {
  const {locale} = params;

  if (!hasLocale(locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages} locale={locale}>
      <LocalePreferenceSync />
      <CartProvider>
        <AuthProvider>
          <div id="rs-login-static" data-rs-login-static="true" style={{ display: 'none' }} />
          {children}
          <CartSidebar />
          <AuthModal />
        </AuthProvider>
      </CartProvider>
    </NextIntlClientProvider>
  );
}
