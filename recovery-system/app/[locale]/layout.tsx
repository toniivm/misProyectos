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
import CookieConsent from '../../components/CookieConsent';
import LocalePreferenceSync from '../../components/LocalePreferenceSync';
import BackendWarmup from '../../components/BackendWarmup';
import NewsletterPopup from '../../components/NewsletterPopup'
import ErrorBoundary from '../../components/ErrorBoundary';

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
      ? 'Limpiador de Vapor a Presión | 12 Accesorios y 3 Bar'
      : 'Pressurised Steam Cleaner | 12 Accessories, 3 Bar',
    description: isEs
      ? 'Limpiador de vapor a presión con 12 accesorios: 1.050 W, 3 bar y hasta 115 °C. Despega grasa y cal de cocina, baño y tapicería solo con agua. Envío 24-72 h, 30 días para probarlo y 2 años de garantía.'
      : 'Pressurised steam cleaner with 12 accessories: 1,050 W, 3 bar and up to 115 °C. Lifts grease and limescale from kitchen, bathroom and upholstery with water only. 24-72 h shipping, 30-day trial and 2-year warranty.',
    keywords: isEs
      ? 'limpiador de vapor, limpiadora a vapor, vapor a presión, limpieza sin frotar, quitar grasa, quitar cal, limpieza cocina, limpieza baño, 12 accesorios, nitida'
      : 'steam cleaner, pressurised steam, clean without scrubbing, remove grease, remove limescale, kitchen cleaning, bathroom cleaning, 12 accessories, nitida',
    alternates: {
      canonical: `https://noctip.com/${locale}`,
      languages: {
        es: 'https://noctip.com/es',
        en: 'https://noctip.com/en',
        'x-default': 'https://noctip.com/es',
      }
    },
    icons: {
      icon: '/favicon.svg',
      shortcut: '/favicon.svg'
    },
    openGraph: {
      title: isEs
        ? 'Nítida Vapor™ — La grasa y la cal se derriten. Tú no.'
        : 'Nítida Vapor™ — Grease and limescale melt away. You don’t.',
      description: isEs
        ? 'Limpiador de vapor a presión con 12 accesorios. Solo agua. Envío 24-72 h y 30 días para probarlo.'
        : 'Pressurised steam cleaner with 12 accessories. Water only. 24-72 h shipping and 30-day trial.',
      url: 'https://noctip.com',
      siteName: 'Nítida',
      type: 'website',
      locale: isEs ? 'es_ES' : 'en_US',
      images: [
        {
          url: 'https://noctip.com/images/logo/logo.png',
          width: 1200,
          height: 630,
          alt: 'Nítida Vapor — limpiador de vapor a presión',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: isEs
        ? 'Nítida Vapor™ — La grasa y la cal se derriten. Tú no.'
        : 'Nítida Vapor™ — Grease and limescale melt away. You don’t.',
      description: isEs
        ? 'Limpiador de vapor a presión con 12 accesorios. Solo agua. Envío 24-72 h y 30 días para probarlo.'
        : 'Pressurised steam cleaner with 12 accessories. Water only. 24-72 h shipping and 30-day trial.',
      images: ['https://noctip.com/images/logo/logo.png'],
    },
    other: {
      'apple-mobile-web-app-capable': 'yes',
      'apple-mobile-web-app-status-bar-style': 'black-translucent',
      'mobile-web-app-capable': 'yes',
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

  const isEs = locale === 'es';

  // Organization structured data
  const organizationJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Nítida',
    url: 'https://noctip.com',
    logo: 'https://noctip.com/favicon.svg',
    description: isEs
      ? 'Nítida diseña limpiadores de vapor que despegan la grasa y la cal sin frotar. Solo agua, 12 accesorios y 2 años de garantía.'
      : 'Nítida designs steam cleaners that lift grease and limescale without scrubbing. Water only, 12 accessories and a 2-year warranty.',
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      availableLanguage: ['Spanish', 'English'],
    },
  };

  // Website structured data with search
  const websiteJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Nítida',
    url: 'https://noctip.com',
    potentialAction: {
      '@type': 'SearchAction',
      target: `https://noctip.com/${locale}/products/vapor?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };

  // OnlineStore structured data
  const storeJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'OnlineStore',
    name: 'Nítida',
    url: 'https://noctip.com',
    description: isEs
      ? 'Tienda online de limpiadores de vapor para el hogar'
      : 'Online store for home steam cleaners',
    priceRange: '€39.99',
    paymentAccepted: 'Credit Card, Stripe, Apple Pay, Google Pay',
    areaServed: [
      { '@type': 'Country', name: 'Spain' },
      { '@type': 'Country', name: 'Portugal' },
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: isEs ? 'Limpiadores de vapor' : 'Steam cleaners',
      itemListElement: [
        {
          '@type': 'OfferCatalog',
          name: isEs ? 'Limpieza sin frotar' : 'Clean without scrubbing',
          numberOfItems: 1,
        },
      ],
    },
  };

  // FAQ structured data for rich snippets
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: isEs ? [
      {
        '@type': 'Question',
        name: '¿Cuánto tarda el envío de Nítida Vapor?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Enviamos en 24-72 horas laborables con seguimiento. Recibes el número de seguimiento por email en cuanto sale el pedido.',
        },
      },
      {
        '@type': 'Question',
        name: '¿Qué limpia Nítida Vapor?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Grasa de vitrocerámica y horno, cal de grifos y mamparas, juntas del baño, azulejos, cristales y tapicería. Incluye 12 accesorios para cada zona.',
        },
      },
      {
        '@type': 'Question',
        name: '¿Necesito detergente?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'No. El depósito es solo agua del grifo. El vapor a 3 bar y hasta 115 °C ablanda la grasa y la cal sin productos químicos.',
        },
      },
      {
        '@type': 'Question',
        name: '¿Qué garantía tiene?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '2 años de garantía y 30 días para probarlo. Si no limpia como esperabas, lo recogemos y te devolvemos el importe del producto.',
        },
      },
    ] : [
      {
        '@type': 'Question',
        name: 'How long does Nítida Vapor shipping take?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'We ship in 24-72 working hours with tracking. You receive the tracking number by email as soon as the order leaves.',
        },
      },
      {
        '@type': 'Question',
        name: 'What does Nítida Vapor clean?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Grease on induction hobs and ovens, limescale on taps and shower screens, bathroom grout, tiles, glass and upholstery. It includes 12 accessories for each area.',
        },
      },
      {
        '@type': 'Question',
        name: 'Do I need detergent?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'No. The tank is tap water only. Steam at 3 bar and up to 115 °C softens grease and limescale without chemicals.',
        },
      },
      {
        '@type': 'Question',
        name: 'What warranty does it have?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '2-year warranty and 30 days to try it. If it does not clean as expected, we collect it and refund the product price.',
        },
      },
    ],
  };

  // BreadcrumbList structured data
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: isEs ? 'Inicio' : 'Home',
        item: 'https://noctip.com',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: isEs ? 'Producto' : 'Product',
        item: `https://noctip.com/${locale}/products/vapor`,
      },
    ],
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
            dangerouslySetInnerHTML={{ __html: JSON.stringify(storeJsonLd) }}
          />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
          />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
          />
          <div id="rs-login-static" data-rs-login-static="true" style={{ display: 'none' }} />
          <ErrorBoundary>
            {children}
          </ErrorBoundary>
          <Footer />
          <CartSidebar />
          <AuthModal />
          <CookieConsent />
          <NewsletterPopup />
        </AuthProvider>
      </CartProvider>
    </NextIntlClientProvider>
  );
}
