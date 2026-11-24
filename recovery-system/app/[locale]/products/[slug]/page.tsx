import { getCatalogProductBySlug, CATALOG, type CatalogProduct } from '../../../../lib/catalog';
import { locales } from '../../../../i18n/routing';
import { notFound } from 'next/navigation';
import VaporProductDetail from '../../../../components/VaporProductDetail';
import type { Metadata } from 'next';

type Props = { params: { locale: string; slug: string } };

export function generateStaticParams() {
  return locales.flatMap((locale) => CATALOG.filter((c) => !c.hidden).map((c) => ({ locale, slug: c.slug })));
}

const SEO_TITLES: Record<string, { es: string; en: string }> = {
  vapor: {
    es: 'Nítida Vapor — Limpiador de Vapor a Presión 1.050W | 12 Accesorios y 3 Bar',
    en: 'Nítida Vapor — 1,050W Pressurised Steam Cleaner | 12 Accessories, 3 Bar',
  },
}

const SEO_DESCS: Record<string, { es: string; en: string }> = {
  vapor: {
    es: 'Limpiador de vapor a presión Nítida Vapor: 1.050 W, 3 bar, hasta 115 °C y 12 accesorios. Despega grasa y cal de cocina, baño y tapicería solo con agua. Envío 24-72 h y 30 días para probarlo.',
    en: 'Nítida Vapor pressurised steam cleaner: 1,050 W, 3 bar, up to 115 °C and 12 accessories. Lifts grease and limescale from kitchen, bathroom and upholstery with water only. 24-72 h shipping and 30-day trial.',
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
      ? 'limpiador de vapor, limpiadora a vapor, vapor a presión, limpieza sin frotar, grasa, cal, cocina, baño, 12 accesorios, nitida'
      : 'steam cleaner, pressurised steam, clean without scrubbing, grease, limescale, kitchen, bathroom, 12 accessories, nitida',
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
      <VaporProductDetail />
    </>
  );
}
