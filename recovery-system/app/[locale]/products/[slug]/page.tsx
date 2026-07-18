import { getCatalogProductBySlug, CATALOG, type CatalogProduct } from '../../../../lib/catalog';
import { locales } from '../../../../i18n/routing';
import { notFound } from 'next/navigation';
import ProductDetail, { type Product } from '../../../../components/ProductDetail';
import type { Metadata } from 'next';

type Props = { params: { locale: string; slug: string } };

const OLD_SLUGS = ['sleepband-pro', 'white-noise-pro', 'weighted-mask-pro']

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

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const cp = getCatalogProductBySlug(params.slug);
  if (!cp) return {};
  const product = catalogToProduct(cp);
  const isEs = params.locale === 'es';

  return {
    title: `${product.name}`,
    description: isEs
      ? (cp.shortDescription_es ?? cp.shortDescription ?? product.tag)
      : (cp.shortDescription_en ?? cp.shortDescription ?? product.tag),
    alternates: {
      canonical: `https://noctip.com/${params.locale}/products/${params.slug}`,
      languages: {
        es: `https://noctip.com/es/products/${params.slug}`,
        en: `https://noctip.com/en/products/${params.slug}`,
      },
    },
    openGraph: {
      title: `${product.name} — Noctip™`,
      description: isEs
        ? (cp.shortDescription_es ?? cp.shortDescription ?? product.tag)
        : (cp.shortDescription_en ?? cp.shortDescription ?? product.tag),
      url: `https://noctip.com/${params.locale}/products/${params.slug}`,
      siteName: 'Noctip',
      type: 'website',
      images: cp.images?.[0] ? [{ url: `https://noctip.com${cp.images[0]}`, width: 1200, height: 630, alt: product.name }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${product.name} — Noctip™`,
      description: isEs
        ? (cp.shortDescription_es ?? cp.shortDescription ?? product.tag)
        : (cp.shortDescription_en ?? cp.shortDescription ?? product.tag),
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
