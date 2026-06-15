import {NextIntlClientProvider, hasLocale} from 'next-intl';
import {getMessages, setRequestLocale} from 'next-intl/server';
import {notFound} from 'next/navigation';
import type {Metadata} from 'next';
import {locales} from '../../i18n/routing';
import {CartProvider} from '../../context/CartContext';
import {AuthProvider} from '../../context/AuthContext';
import CartSidebar from '../../components/CartSidebar';
import AuthModal from '../../components/AuthModal';
import Footer from '../../components/Footer';
import LocalePreferenceSync from '../../components/LocalePreferenceSync';
import BackendWarmup from '../../components/BackendWarmup';

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
      ? 'Noctip™ — Tecnología Premium de Sueño y Recuperación'
      : 'Noctip™ — Premium Sleep & Recovery Technology',
    description: isEs
      ? 'Noctip diseña tecnología premium de sueño y recuperación. Cintas acústicas, máquinas de ruido blanco, masajeadores cervicales y antifaces con peso. Envío gratis, garantía de 30 noches.'
      : 'Noctip designs premium sleep and recovery technology. Acoustic headbands, white noise machines, cervical massagers and weighted masks. Free shipping, 30-night guarantee.',
    alternates: {
      canonical: `https://noctip.com/${locale}`,
      languages: {
        es: 'https://noctip.com/es',
        en: 'https://noctip.com/en'
      }
    },
    icons: {
      icon: '/favicon.svg',
      shortcut: '/favicon.svg'
    },
    openGraph: {
      title: isEs
        ? 'Noctip™ — Tecnología Premium de Sueño y Recuperación'
        : 'Noctip™ — Premium Sleep & Recovery Technology',
      description: isEs
        ? 'Duerme más profundo. Recupérate mejor. Vive mejor.'
        : 'Sleep deeper. Recover better. Live better.',
      url: 'https://noctip.com',
      siteName: 'Noctip',
      type: 'website',
      locale: isEs ? 'es_ES' : 'en_US',
      images: [
        {
          url: '/images/sleepband-pro-1.jpg',
          width: 1200,
          height: 630,
          alt: 'Noctip — Premium Sleep & Recovery',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Noctip™ — Premium Sleep & Recovery Technology',
      description: 'Tecnología premium de sueño y recuperación. Envío gratis y garantía de 30 noches.',
      images: ['/images/sleepband-pro-1.jpg'],
    },
  };
}

export default async function LocaleLayout({children, params}: Props) {
  const {locale} = params;

  if (!hasLocale(locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  // Organization structured data for Google
  const organizationJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Noctip',
    url: 'https://noctip.com',
    logo: 'https://noctip.com/favicon.svg',
    description: 'Premium sleep and recovery technology. Acoustic headbands, white noise machines, cervical massagers and weighted masks.',
    sameAs: [],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      availableLanguage: ['Spanish', 'English'],
    },
  };

  // Website structured data for Google
  const websiteJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Noctip',
    url: 'https://noctip.com',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://noctip.com/es/shop/all?q={search_term_string}',
      'query-input': 'required name=search_term_string',
    },
  };

  // LocalBusiness structured data
  const localBusinessJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'OnlineStore',
    name: 'Noctip',
    url: 'https://noctip.com',
    description: 'Premium sleep and recovery technology store',
    priceRange: '$$',
    paymentAccepted: 'Credit Card, Stripe, Apple Pay, Google Pay',
    areaServed: {
      '@type': 'Country',
      name: 'Spain',
    },
  };

  return (
    <NextIntlClientProvider messages={messages} locale={locale}>
      <LocalePreferenceSync />
      <BackendWarmup />
      <CartProvider>
        <AuthProvider>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
          />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
          />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
          />
          <div id="rs-login-static" data-rs-login-static="true" style={{ display: 'none' }} />
          {children}
          <Footer />
          <CartSidebar />
          <AuthModal />
        </AuthProvider>
      </CartProvider>
    </NextIntlClientProvider>
  );
}
