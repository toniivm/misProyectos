import {getProductBySlug} from '../../../../lib/products';
import {notFound} from 'next/navigation';
import ProductDetail from '../../../../components/ProductDetail';

export default function ProductPage({params}: {params: {slug: string}}) {
  const product = getProductBySlug(params.slug);
  if (!product) notFound();
  return <ProductDetail product={product} />;
}
