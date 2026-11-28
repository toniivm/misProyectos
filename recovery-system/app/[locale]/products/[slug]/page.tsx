import { getCatalogProductBySlug, CATALOG, type CatalogProduct } from '../../../../lib/catalog';
import { locales } from '../../../../i18n/routing';
import { notFound } from 'next/navigation';
import DryProductDetail from '../../../../components/DryProductDetail';
import type { Metadata } from 'next';

type Props = { params: { locale: string; slug: string } };

export function generateStaticParams() {
  return locales.flatMap((locale) => CATALOG.filter((c) => !c.hidden).map((c) => ({ locale, slug: c.slug })));
}

const SEO_TITLES: Record<string, { es: string; en: string }> = {
  dry: {
    es: 'Nítida Dry — Secador de Calzado 130W con Temporizador 3/6/9 h | Plegable',
    en: 'Nítida Dry — 130W Footwear Dryer with 3/6/9 h Timer | Foldable',
  },
}

const SEO_DESCS: Record<string, { es: string; en: string }> = {
  dry: {
    es: 'Secador de calzado Nítida Dry: aire caliente a 360°, temporizador de 3, 6 o 9 horas y apagado automático. Seca botas, zapatillas, guantes y calcetines por dentro. 130 W, plegable. Envío gratis, 30 días de prueba y 2 años de garantía.',
    en: 'Nítida Dry footwear dryer: 360° warm air, 3, 6 or 9-hour timer and automatic shut-off. Dries boots, trainers, gloves and socks from the inside. 130 W, foldable. Free shipping, 30-day trial and 2-year warranty.',
  },
}

function catalogToProduct(cp: CatalogProduct) {
  return {
    slug: cp.slug,
    name: cp.name,
    tag: cp.shortDescription,
    price: cp.price,
    comparePrice: cp.comparePrice,
    icon: cp.icon,
    bg: cp.color,
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const cp = getCatalogProductBySlug(params.slug);
  if (!cp) return {};
  const isEs = params.locale === 'es';
  const seoTitle = SEO_TITLES[cp.slug]?.[isEs ? 'es' : 'en'] ?? `${cp.name} — Nítida™`
  const seoDesc = SEO_DESCS[cp.slug]?.[isEs ? 'es' : 'en'] ?? (isEs ? (cp.shortDescription_es ?? cp.shortDescription) : (cp.shortDescription_en ?? cp.shortDescription))

  return {
    title: seoTitle,
    description: seoDesc,
    keywords: isEs
      ? 'secador de zapatos, secador de calzado, secador de botas, zapatos mojados, olor a humedad, calzado seco, temporizador, plegable, nitida'
      : 'shoe dryer, boot dryer, footwear dryer, wet shoes, damp shoes, odour, timer, foldable, nitida',
    alternates: {
      canonical: `https://noctip.com/${params.locale}/products/${params.slug}`,
      languages: {
        es: `https://noctip.com/es/products/${params.slug}`,
        en: `https://noctip.com/en/products/${params.slug}`,
        'x-default': `https://noctip.com/es/products/${params.slug}`,
      },
    },
    openGraph: {
      title: seoTitle,
      description: seoDesc,
      url: `https://noctip.com/${params.locale}/products/${params.slug}`,
      siteName: 'Nítida',
      type: 'website',
      images: [],
    },
    twitter: {
      card: 'summary_large_image',
      title: seoTitle,
      description: seoDesc,
      images: [],
    },
  };
}

export default function ProductPage({ params }: Props) {
  const cp = getCatalogProductBySlug(params.slug);
  if (!cp) notFound();

  const isEs = params.locale === 'es';
  const product = catalogToProduct(cp);

  const productJsonLd: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: isEs
      ? (cp.description_es ?? cp.description)
      : (cp.description_en ?? cp.description),
    brand: {
      '@type': 'Brand',
      name: 'Nítida',
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
        name: 'Nítida',
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
      <DryProductDetail />
    </>
  );
}
