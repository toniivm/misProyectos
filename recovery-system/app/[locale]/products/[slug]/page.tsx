import {getProductBySlug, PRODUCTS} from '../../../../lib/products';
import {locales} from '../../../../i18n/routing';
import {notFound} from 'next/navigation';
import ProductDetail from '../../../../components/ProductDetail';
import type {Metadata} from 'next';

type Props = {params: {locale: string; slug: string}};

/** Pre-render every locale × product combination at build time */
export function generateStaticParams() {
  return locales.flatMap((locale) =>
    PRODUCTS.map((p) => ({locale, slug: p.slug})),
  );
}

export async function generateMetadata({params}: Props): Promise<Metadata> {
  const product = getProductBySlug(params.slug);
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

export default function ProductPage({params}: Props) {
  const product = getProductBySlug(params.slug);
  if (!product) notFound();
  return <ProductDetail product={product} />;
}
