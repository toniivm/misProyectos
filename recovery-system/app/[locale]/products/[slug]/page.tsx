import { getCatalogProductBySlug, CATALOG, type CatalogProduct } from '../../../../lib/catalog';
import { locales } from '../../../../i18n/routing';
import { notFound } from 'next/navigation';
import ProductDetail, { type Product } from '../../../../components/ProductDetail';
import type { Metadata } from 'next';

type Props = { params: { locale: string; slug: string } };

const OLD_SLUGS = ['sleepband-pro', 'white-noise-pro', 'weighted-mask-pro', 'weighted-mask', 'calm', 'sleepband', 'rest', 'back', 'cervical']

export function generateStaticParams() {
  const slugs = [...new Set([...CATALOG.map((c) => c.slug), ...OLD_SLUGS])];
  return locales.flatMap((locale) => slugs.map((slug) => ({ locale, slug })));
}

function catalogToProduct(cp: CatalogProduct): Product {
  return {
    slug: cp.slug,
    name: cp.name ?? cp.name_en ?? cp.name_es ?? cp.slug,
    tag: cp.shortDescription ?? cp.shortDescription_en ?? cp.shortDescription_es ?? '',
    price: cp.price,
    comparePrice: cp.comparePrice ?? cp.price,
    icon: cp.icon ?? '📦',
    bg: cp.color ?? '#111111',
  };
}

const SEO_TITLES: Record<string, { es: string; en: string }> = {
  halo: { es: 'Noctip Halo — Férula Anti-ronquidos Ajustable 10mm | Elimina Ronquidos Noche 1', en: 'Noctip Halo — Adjustable Anti-Snoring Mouthpiece 10mm | Stop Snoring Night 1' },
  wave: { es: 'Noctip Back — Corrector Postural Invisible Y | Resultados en 14 Días', en: 'Noctip Back — Invisible Y Posture Corrector | Results in 14 Days' },
  'sleep-headband': { es: 'Noctip Rest — Banda de Sueño Bluetooth 5.0 | 45g Lavable 10h Batería', en: 'Noctip Rest — Bluetooth Sleep Headband 5.0 | 45g Washable 10h Battery' },
  'neck-massager': { es: 'Noctip Cervical — Masajeador Cuello Portátil | Alivio 15 Min 3 Capas', en: 'Noctip Cervical — Portable Neck Massager | 15-Min Relief 3 Layers' },
}

const SEO_DESCS: Record<string, { es: string; en: string }> = {
  halo: { es: 'Férula anti-ronquidos Noctip Halo: avanza suavemente la mandíbula 10mm, silicona médica hipoalergénica, doble capa + estuche. 30 noches de prueba.', en: 'Noctip Halo anti-snoring mouthpiece: 10mm jaw advancement, medical silicone, dual-layer + case. 30-night trial.' },
  wave: { es: 'Corrector postural Noctip Back en Y: XS-XL, invisible bajo ropa, malla transpirable, 15 min/día. Envío 5-10 días.', en: 'Noctip Back Y posture corrector: XS-XL, invisible under clothes, breathable mesh, 15 min/day. Ships 5-10 days.' },
  'sleep-headband': { es: 'Banda de sueño Noctip Rest: Bluetooth 5.0, altavoces ultrafinos, 45g, lavable, 10h batería. Duerme sin auriculares.', en: 'Noctip Rest sleep headband: Bluetooth 5.0, ultra-thin speakers, 45g, washable, 10h battery. Sleep without earbuds.' },
  'neck-massager': { es: 'Masajeador cervical Noctip Cervical: electrodos curvos, 3 capas, 15 min auto, portátil USB. Alivio real.', en: 'Noctip Cervical neck massager: curved electrodes, 3 layers, 15 min auto, portable USB. Real relief.' },
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const cp = getCatalogProductBySlug(params.slug);
  if (!cp) return {};
  const product = catalogToProduct(cp);
  const isEs = params.locale === 'es';
  const seoTitle = SEO_TITLES[cp.slug]?.[isEs ? 'es' : 'en'] ?? `${product.name} — Noctip™`
  const seoDesc = SEO_DESCS[cp.slug]?.[isEs ? 'es' : 'en'] ?? (isEs ? (cp.shortDescription_es ?? cp.shortDescription ?? product.tag) : (cp.shortDescription_en ?? cp.shortDescription ?? product.tag))

  return {
    title: seoTitle,
    description: seoDesc,
    keywords: isEs
      ? `${cp.name}, ${cp.slug === 'halo' ? 'férula anti ronquidos, dejar de roncar' : cp.slug === 'sleep-headband' ? 'banda sueño bluetooth, auriculares dormir' : cp.slug === 'wave' ? 'corrector postural, dolor espalda' : 'masajeador cervical, dolor cuello'}, noctip, envío gratis`
      : `${cp.name}, sleep, recovery, noctip, free shipping`,
    alternates: {
      canonical: `https://noctip.com/${params.locale}/products/${params.slug}`,
      languages: {
        es: `https://noctip.com/es/products/${params.slug}`,
        en: `https://noctip.com/en/products/${params.slug}`,
      },
    },
    openGraph: {
      title: seoTitle,
      description: seoDesc,
      url: `https://noctip.com/${params.locale}/products/${params.slug}`,
      siteName: 'Noctip',
      type: 'website',
      images: cp.images?.[0] ? [{ url: `https://noctip.com${cp.images[0]}`, width: 1200, height: 630, alt: `${cp.name} — ${seoDesc.slice(0,80)}` }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: seoTitle,
      description: seoDesc,
      images: cp.images?.[0] ? [`https://noctip.com${cp.images[0]}`] : [],
    },
  };
}

export default function ProductPage({ params }: Props) {
  const cp = getCatalogProductBySlug(params.slug);
  if (!cp) notFound();

  const isEs = params.locale === 'es';
  const product = catalogToProduct(cp);

  // Product structured data for Google rich snippets
  const productJsonLd: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: isEs
      ? (cp.description_es ?? cp.description)
      : (cp.description_en ?? cp.description),
    image: cp.images?.map(img => `https://noctip.com${img}`),
    brand: {
      '@type': 'Brand',
      name: 'Noctip',
    },
    offers: {
      '@type': 'Offer',
      url: `https://noctip.com/${params.locale}/products/${params.slug}`,
      priceCurrency: 'EUR',
      price: cp.price,
      priceValidUntil: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      itemCondition: 'https://schema.org/NewCondition',
      availability: 'https://schema.org/InStock',
      seller: {
        '@type': 'Organization',
        name: 'Noctip',
      },
    },
  };

  if (cp.rating > 0 && cp.reviewCount > 0) {
    productJsonLd.aggregateRating = {
      '@type': 'AggregateRating',
      ratingValue: cp.rating,
      reviewCount: cp.reviewCount,
      bestRating: 5,
      worstRating: 1,
    }
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <ProductDetail product={catalogToProduct(cp)} />
    </>
  );
}
