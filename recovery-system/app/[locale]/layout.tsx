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
    keywords: isEs
      ? 'noctip, sueño, recuperación, banda de sueño, ruido blanco, masajeador cuello, antifaz con peso, tecnología sueño, bienestar, envío gratis'
      : 'noctip, sleep, recovery, sleep headband, white noise, neck massager, weighted mask, sleep technology, wellness, free shipping',
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
        ? 'Duerme más profundo. Recupérate mejor. Vive mejor. Envío gratis y garantía de 30 noches.'
        : 'Sleep deeper. Recover better. Live better. Free shipping and 30-night guarantee.',
      url: 'https://noctip.com',
      siteName: 'Noctip',
      type: 'website',
      locale: isEs ? 'es_ES' : 'en_US',
      images: [
        {
          url: '/images/sleepband-pro-1.jpg',
          width: 1200,
          height: 630,
          alt: 'Noctip — Premium Sleep & Recovery Technology',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Noctip™ — Premium Sleep & Recovery Technology',
      description: 'Tecnología premium de sueño y recuperación. Envío gratis y garantía de 30 noches.',
      images: ['/images/sleepband-pro-1.jpg'],
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
      ? 'Noctip diseña tecnología premium de sueño y recuperación. Cintas acústicas, máquinas de ruido blanco, masajeadores cervicales y antifaces con peso.'
      : 'Noctip designs premium sleep and recovery technology. Acoustic headbands, white noise machines, cervical massagers and weighted masks.',
    sameAs: [],
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
      target: 'https://noctip.com/{locale}/shop/all?q={search_term_string}',
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
          name: isEs ? 'Sueño y audio' : 'Sleep & Audio',
          numberOfItems: 3,
        },
        {
          '@type': 'OfferCatalog',
          name: isEs ? 'Cuello y recuperación' : 'Neck & Recovery',
          numberOfItems: 1,
        },
        {
          '@type': 'OfferCatalog',
          name: isEs ? 'Sensorial y relajación' : 'Sensory & Relaxation',
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
        name: '¿Cuánto tarda el envío de Noctip?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Procesamos y enviamos todos los pedidos en un máximo de 24 horas. La entrega estándar en Europa es de 3 a 5 días laborables. Envío exprés de 1-2 días disponible en el checkout.',
        },
      },
      {
        '@type': 'Question',
        name: '¿Qué es el Noctip Halo?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'El Noctip Halo es una cinta acústica ultrafina con drivers de precisión que ofrece audio de sueño inmersivo sin presión en los oídos. Diseñada para quienes duermen de lado, con tejido transpirable y carga USB-C.',
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
        name: '¿El pago en Noctip es seguro?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Sí. Todos los pagos se procesan a través de Stripe con cifrado SSL de 256 bits. Nunca almacenamos datos de tarjeta. Aceptamos Visa, Mastercard, Amex, Apple Pay y Google Pay.',
        },
      },
      {
        '@type': 'Question',
        name: '¿Qué productos vende Noctip?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Noctip vende tecnología premium de sueño y recuperación: cintas acústicas (Noctip Halo, Noctip Rest), máquinas de ruido blanco (Noctip Wave), masajeadores cervicales (Noctip Relief) y antifaces con peso (Noctip Calm).',
        },
      },
    ] : [
      {
        '@type': 'Question',
        name: 'How long does Noctip shipping take?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'We process and ship all orders within 24 hours. Standard delivery across Europe takes 3-5 business days. Express 1-2 day shipping is available at checkout.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the Noctip Halo?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The Noctip Halo is an ultra-thin acoustic headband with precision drivers that delivers immersive sleep audio without ear pressure. Designed for side sleepers, with breathable fabric and USB-C charging.',
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
        name: 'Is Noctip checkout secure?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. All payments are processed through Stripe with 256-bit SSL encryption. We never store card data. We accept Visa, Mastercard, Amex, Apple Pay, and Google Pay.',
        },
      },
      {
        '@type': 'Question',
        name: 'What products does Noctip sell?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Noctip sells premium sleep and recovery technology: acoustic headbands (Noctip Halo, Noctip Rest), white noise machines (Noctip Wave), cervical massagers (Noctip Relief), and weighted masks (Noctip Calm).',
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
        item: 'https://noctip.com/shop/all',
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
          {children}
          <Footer />
          <CartSidebar />
          <AuthModal />
        </AuthProvider>
      </CartProvider>
    </NextIntlClientProvider>
  );
}
