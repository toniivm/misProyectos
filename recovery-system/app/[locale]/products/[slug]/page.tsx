import { getCatalogProductBySlug, CATALOG, type CatalogProduct } from '../../../../lib/catalog';
import { locales } from '../../../../i18n/routing';
import { notFound } from 'next/navigation';
import ProductDetail, { type Product } from '../../../../components/ProductDetail';
import type { Metadata } from 'next';

type Props = { params: { locale: string; slug: string } };

export function generateStaticParams() {
  const slugs = [...new Set(CATALOG.map((c) => c.slug))];
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
  return {
      title: `${product.name} — Noctip™`,
    description: product.tag,
    openGraph: {
    title: `${product.name} — Noctip™`,
      description: product.tag,
      type: 'website',
    },
  };
}

export default function ProductPage({ params }: Props) {
  const cp = getCatalogProductBySlug(params.slug);
  if (!cp) notFound();
  return <ProductDetail product={catalogToProduct(cp)} />;
}
