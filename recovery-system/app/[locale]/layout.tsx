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
      ? 'Secador de Calzado con Temporizador | Zapatos Secos y sin Olor'
      : 'Footwear Dryer with Timer | Dry, Odour-Free Shoes',
    description: isEs
      ? 'Secador de calzado Nítida Dry: aire caliente a 360°, temporizador de 3, 6 o 9 horas y apagado automático. Seca botas, zapatillas, guantes y calcetines por dentro. 130 W, plegable. Envío gratis, 30 días de prueba y 2 años de garantía.'
      : 'Nítida Dry footwear dryer: 360° warm air, 3, 6 or 9-hour timer and automatic shut-off. Dries boots, trainers, gloves and socks from the inside. 130 W, foldable. Free shipping, 30-day trial and 2-year warranty.',
    keywords: isEs
      ? 'secador de zapatos, secador de calzado, secador de botas, zapatos mojados, olor a humedad, calzado seco, temporizador, plegable, nitida'
      : 'shoe dryer, boot dryer, footwear dryer, wet shoes, damp shoes, odour, timer, foldable, nitida',
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
        ? 'Nítida Dry™ — Zapatos secos y sin olor cada mañana'
        : 'Nítida Dry™ — Dry, odour-free shoes every morning',
      description: isEs
        ? 'Secador de calzado con aire caliente a 360° y temporizador 3/6/9 h. Envío gratis, 30 días de prueba y 2 años de garantía.'
        : 'Footwear dryer with 360° warm air and a 3/6/9 h timer. Free shipping, 30-day trial and 2-year warranty.',
      url: 'https://noctip.com',
      siteName: 'Nítida',
      type: 'website',
      locale: isEs ? 'es_ES' : 'en_US',
      images: [
        {
          url: 'https://noctip.com/images/dry/hero-boots.jpg',
          width: 430,
          height: 800,
          alt: isEs ? 'Nítida Dry secando unas botas' : 'Nítida Dry drying a pair of boots',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: isEs
        ? 'Nítida Dry™ — Zapatos secos y sin olor cada mañana'
        : 'Nítida Dry™ — Dry, odour-free shoes every morning',
      description: isEs
        ? 'Secador de calzado con aire caliente a 360° y temporizador 3/6/9 h. Envío gratis, 30 días de prueba y 2 años de garantía.'
        : 'Footwear dryer with 360° warm air and a 3/6/9 h timer. Free shipping, 30-day trial and 2-year warranty.',
      images: ['https://noctip.com/images/dry/hero-boots.jpg'],
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
      ? 'Nítida diseña secadores de calzado que quitan la humedad y el olor por dentro. Aire caliente a 360°, temporizador y 2 años de garantía.'
      : 'Nítida designs footwear dryers that remove damp and odour from the inside. 360° warm air, timer and a 2-year warranty.',
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
      target: `https://noctip.com/${locale}/products/dry?q={search_term_string}`,
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
      ? 'Tienda online de secadores de calzado para el hogar'
      : 'Online store for home footwear dryers',
    priceRange: '€39.99–€94.99',
    paymentAccepted: 'Credit Card, Bizum, PayPal, Apple Pay, Google Pay, Stripe',
    areaServed: [
      { '@type': 'Country', name: 'Spain' },
      { '@type': 'Country', name: 'Portugal' },
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: isEs ? 'Secadores de calzado' : 'Footwear dryers',
      itemListElement: [
        {
          '@type': 'OfferCatalog',
          name: isEs ? 'Calzado seco' : 'Dry footwear',
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
        name: '¿Cuánto tarda en secar Nítida Dry?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Para unas zapatillas húmedas, 3 horas suelen bastar. Para botas gruesas o muy empapadas, usa 6 o 9 horas. El tiempo depende del material y de la humedad.',
        },
      },
      {
        '@type': 'Question',
        name: '¿Qué seca Nítida Dry?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Calzado mojado por dentro: botas, zapatillas, guantes y calcetines. Dos tubos perforados llevan el aire caliente a la puntera y al talón.',
        },
      },
      {
        '@type': 'Question',
        name: '¿Es seguro dejarlo toda la noche?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Sí. Se apaga solo al terminar el tiempo y funciona a temperatura constante. No deja el calzado ardiendo.',
        },
      },
      {
        '@type': 'Question',
        name: '¿Qué garantía tiene?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '2 años de garantía y 30 días para probarlo. Si no seca como esperabas, lo recogemos y te devolvemos el importe del producto.',
        },
      },
    ] : [
      {
        '@type': 'Question',
        name: 'How long does Nítida Dry take to dry shoes?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'For damp trainers, 3 hours is usually enough. For thick or soaked boots, use 6 or 9 hours. Time depends on the material and the dampness.',
        },
      },
      {
        '@type': 'Question',
        name: 'What does Nítida Dry dry?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Footwear that is wet inside: boots, trainers, gloves and socks. Two perforated tubes carry warm air to the toe and the heel.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is it safe to leave on all night?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. It switches off automatically when the timer ends and runs at a constant temperature. It does not leave footwear burning hot.',
        },
      },
      {
        '@type': 'Question',
        name: 'What warranty does it have?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '2-year warranty and 30 days to try it. If it does not dry as expected, we collect it and refund the product price.',
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
        item: `https://noctip.com/${locale}/products/dry`,
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
