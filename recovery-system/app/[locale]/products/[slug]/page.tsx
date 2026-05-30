import { getProductBySlug, PRODUCTS, type Product } from '../../../../lib/products';
import { getCatalogProductBySlug, CATALOG, type CatalogProduct } from '../../../../lib/catalog';
import { locales } from '../../../../i18n/routing';
import { notFound } from 'next/navigation';
import ProductDetail from '../../../../components/ProductDetail';
import type { Metadata } from 'next';

type Props = { params: { locale: string; slug: string } };

/** Pre-render every locale × product combination at build time (include catalog slugs) */
export function generateStaticParams() {
  const slugs = new Set<string>([
    ...PRODUCTS.map((p) => p.slug),
    ...CATALOG.map((c) => c.slug),
  ]);

  return locales.flatMap((locale) => Array.from(slugs).map((slug) => ({ locale, slug })));
}

function catalogToLegacyProduct(cp: CatalogProduct): Product {
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
  let product = getProductBySlug(params.slug);
  if (!product) {
    const cp = getCatalogProductBySlug(params.slug);
    if (cp) product = catalogToLegacyProduct(cp);
  }
  if (!product) return {};
  return {
    title: `${product.name} — RECOVERY SYSTEM™`,
    description: product.tag,
    openGraph: {
      title: `${product.name} — RECOVERY SYSTEM™`,
      description: product.tag,
      type: 'website',
    },
  };
}

export default function ProductPage({ params }: Props) {
  let product = getProductBySlug(params.slug);
  if (!product) {
    const cp = getCatalogProductBySlug(params.slug);
    if (cp) product = catalogToLegacyProduct(cp);
  }
  if (!product) notFound();
  return <ProductDetail product={product} />;
}
