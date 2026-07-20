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
      ? 'Noctip™ — Sueño y Recuperación que Funciona'
      : 'Noctip™ — Sleep & Recovery that Works',
    description: isEs
      ? 'Noctip diseña productos de sueño y recuperación que funcionan de verdad. Férulas anti-ronquidos, correctores posturales, bandas de audio para dormir y masajeadores cervicales. Envío gratis, garantía de 30 noches.'
      : 'Noctip designs sleep and recovery products that actually work. Anti-snoring mouthpieces, posture correctors, sleep audio headbands, and cervical massagers. Free shipping, 30-night guarantee.',
    keywords: isEs
      ? 'noctip, sueño, recuperación, anti-ronquidos, corrector postural, banda de sueño, masajeador cuello, tecnología sueño, bienestar, envío gratis'
      : 'noctip, sleep, recovery, anti-snoring, posture corrector, sleep headband, neck massager, sleep technology, wellness, free shipping',
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
        ? 'Noctip™ — Sueño y Recuperación que Funciona'
        : 'Noctip™ — Sleep & Recovery that Works',
      description: isEs
        ? 'Duerme más profundo. Recupérate mejor. Vive mejor. Envío gratis y garantía de 30 noches.'
        : 'Sleep deeper. Recover better. Live better. Free shipping and 30-night guarantee.',
      url: 'https://noctip.com',
      siteName: 'Noctip',
      type: 'website',
      locale: isEs ? 'es_ES' : 'en_US',
      images: [
        {
          url: 'https://noctip.com/images/products/sleep-headband.jpg',
          width: 1200,
          height: 630,
          alt: 'Noctip — Sleep & Recovery that Works',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: isEs
        ? 'Noctip™ — Sueño y Recuperación que Funciona'
        : 'Noctip™ — Sleep & Recovery that Works',
      description: isEs
        ? 'Duerme más profundo. Recupérate mejor. Vive mejor. Envío gratis y garantía de 30 noches.'
        : 'Sleep deeper. Recover better. Live better. Free shipping and 30-night guarantee.',
      images: ['https://noctip.com/images/products/sleep-headband.jpg'],
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
    name: 'Noctip',
    url: 'https://noctip.com',
    logo: 'https://noctip.com/favicon.svg',
    description: isEs
      ? 'Noctip diseña productos de sueño y recuperación que funcionan de verdad: férulas anti-ronquidos, correctores posturales, bandas de audio para dormir y masajeadores cervicales.'
      : 'Noctip designs sleep and recovery products that actually work: anti-snoring mouthpieces, posture correctors, sleep audio headbands, and cervical massagers.',
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
    name: 'Noctip',
    url: 'https://noctip.com',
    potentialAction: {
      '@type': 'SearchAction',
      target: `https://noctip.com/${locale}/shop/all?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };

  // OnlineStore structured data
  const storeJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'OnlineStore',
    name: 'Noctip',
    url: 'https://noctip.com',
    description: isEs
      ? 'Tienda online de tecnología premium de sueño y recuperación'
      : 'Online store for premium sleep and recovery technology',
    priceRange: '€11-€20',
    paymentAccepted: 'Credit Card, Stripe, Apple Pay, Google Pay',
    areaServed: [
      { '@type': 'Country', name: 'Spain' },
      { '@type': 'Country', name: 'Portugal' },
      { '@type': 'Country', name: 'France' },
      { '@type': 'Country', name: 'Germany' },
      { '@type': 'Country', name: 'Italy' },
      { '@type': 'Country', name: 'United Kingdom' },
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: isEs ? 'Productos de sueño y recuperación' : 'Sleep & Recovery Products',
      itemListElement: [
        {
          '@type': 'OfferCatalog',
          name: isEs ? 'Sueño y anti-ronquidos' : 'Sleep & Anti-Snoring',
          numberOfItems: 2,
        },
        {
          '@type': 'OfferCatalog',
          name: isEs ? 'Postura y recuperación' : 'Posture & Recovery',
          numberOfItems: 1,
        },
        {
          '@type': 'OfferCatalog',
          name: isEs ? 'Masaje cervical' : 'Cervical Massage',
          numberOfItems: 2,
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
        name: '¿Cuánto tarda el envío de Noctip?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Procesamos y enviamos todos los pedidos en un máximo de 24 horas. La entrega estándar en Europa es de 3 a 5 días laborables. Envío exprés de 1-2 días disponible en el checkout.',
        },
      },
      {
        '@type': 'Question',
        name: '¿Cómo funciona la férula anti-ronquidos Noctip Halo?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'El Noctip Halo usa tecnología de avanzamiento mandibular para mover suavemente la mandíbula hacia adelante, abriendo la vía aérea y reduciendo los ronquidos. Tiene diseño ajustable de doble capa con 10mm de micro-ajustes y se moldea a tus dientes.',
        },
      },
      {
        '@type': 'Question',
        name: '¿Qué hace el corrector postural Noctip Back?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'El Noctip Back es un corrector postural con soporte ergonómico en forma de Y que jala los hombros hacia atrás y alinea la columna. Viene en 5 tallas (XS a XL) con correas ajustables. Se puede usar debajo de la ropa.',
        },
      },
      {
        '@type': 'Question',
        name: '¿Cómo funciona la garantía de 30 noches de Noctip?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Puedes probar cualquier producto Noctip durante 30 noches en tu propio entorno. Si no cumple tus expectativas, contactas con nuestro equipo y gestionamos la recogida y el reembolso completo.',
        },
      },
      {
        '@type': 'Question',
        name: '¿Qué productos vende Noctip?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Noctip vende tecnología de sueño y recuperación: férulas anti-ronquidos (Noctip Halo), correctores posturales (Noctip Back), bandas de audio para dormir (Noctip Rest) y masajeadores cervicales (Noctip Cervical).',
        },
      },
    ] : [
      {
        '@type': 'Question',
        name: 'How long does Noctip shipping take?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'We process and ship all orders within 24 hours. Standard delivery across Europe takes 6-9 business days. Express 1-2 day shipping is available at checkout.',
        },
      },
      {
        '@type': 'Question',
        name: 'How does the Noctip Halo anti-snoring mouthpiece work?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The Noctip Halo uses jaw advancement technology to gently move your lower jaw forward, opening your airway and reducing snoring. The dual-layer design is adjustable with 10mm of micro-settings and molds to your teeth.',
        },
      },
      {
        '@type': 'Question',
        name: 'What does the Noctip Back posture corrector do?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The Noctip Back is a posture corrector with ergonomic Y-shaped support that pulls your shoulders back and aligns your spine. It comes in 5 sizes (XS to XL) with adjustable straps and can be worn under clothing.',
        },
      },
      {
        '@type': 'Question',
        name: 'How does the 30-night guarantee work?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'You can test any Noctip product for 30 nights in your own environment. If it doesn\'t meet your expectations, contact us and we arrange pickup and a full refund.',
        },
      },
      {
        '@type': 'Question',
        name: 'What products does Noctip sell?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Noctip sells sleep and recovery technology: anti-snoring mouthpieces (Noctip Halo), posture correctors (Noctip Back), sleep audio headbands (Noctip Rest), and cervical massagers (Noctip Cervical).',
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
        name: isEs ? 'Tienda' : 'Shop',
        item: `https://noctip.com/${locale}/shop/all`,
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
