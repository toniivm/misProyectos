'use client';

import {AnimatePresence, motion} from 'framer-motion';
import {ArrowLeft, Check, ShieldCheck, ShoppingBag, Star, Truck} from 'lucide-react';
import {useLocale, useTranslations} from 'next-intl';
import Link from 'next/link';
import {useState} from 'react';
import {useCart} from '../context/CartContext';
import {getProductIndex, PRODUCTS, type Product} from '../lib/products';

const PRODUCT_BG = ['#f0f9ff', '#f0fdf4', '#faf5ff'];
const PRODUCT_ICON = ['💆', '🧘', '🌙'];

export default function ProductDetail({product}: {product: Product}) {
  const t = useTranslations();
  const locale = useLocale();
  const {add} = useCart();
  const [added, setAdded] = useState(false);
  const [qty, setQty] = useState(1);

  const i = getProductIndex(product.slug);
  const systemProducts = t.raw('system.products') as Array<{
    name: string;
    tag: string;
    focus: string;
    features: string[];
  }>;
  const productData = systemProducts[i];

  const handleAdd = () => {
    for (let q = 0; q < qty; q++) {
      add({slug: product.slug, name: product.name, price: product.price, icon: PRODUCT_ICON[i]});
    }
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const otherProducts = PRODUCTS.filter((p) => p.slug !== product.slug);

  return (
    <div className="min-h-screen bg-white">
      {/* Minimal header */}
      <header className="sticky top-0 z-30 border-b border-gray-100 bg-white/95 backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-6xl items-center px-5">
          <Link href={`/${locale}`} className="font-display text-sm font-extrabold tracking-widest text-gray-900">
            RECOVER™
          </Link>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-5 py-10">
        {/* Breadcrumb */}
        <Link
          href={`/${locale}`}
          className="mb-8 inline-flex items-center gap-1.5 text-sm text-gray-400 transition hover:text-gray-700"
        >
          <ArrowLeft size={14} />
          Back to shop
        </Link>

        {/* Product grid */}
        <div className="grid gap-12 lg:grid-cols-2">
          {/* Image */}
          <motion.div
            initial={{opacity: 0, x: -20}}
            animate={{opacity: 1, x: 0}}
            transition={{duration: 0.5}}
          >
            <div
              className="flex h-80 w-full items-center justify-center rounded-3xl text-8xl sm:h-[420px]"
              style={{background: PRODUCT_BG[i], border: '1px solid #e5e7eb'}}
            >
              {PRODUCT_ICON[i]}
            </div>

            {/* Thumbnails */}
            <div className="mt-4 grid grid-cols-3 gap-3">
              {[0, 1, 2].map((j) => (
                <div
                  key={j}
                  className="flex h-20 items-center justify-center rounded-xl text-3xl"
                  style={{background: PRODUCT_BG[i], border: '1px solid #e5e7eb'}}
                >
                  {PRODUCT_ICON[i]}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Info */}
          <motion.div
            initial={{opacity: 0, x: 20}}
            animate={{opacity: 1, x: 0}}
            transition={{duration: 0.5, delay: 0.1}}
            className="flex flex-col"
          >
            <span className="text-xs font-bold uppercase tracking-widest text-[#1a56db]">
              {productData?.tag ?? product.tag}
            </span>

            <h1 className="mt-2 font-display text-4xl font-black tracking-tight text-gray-900 sm:text-5xl">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="mt-3 flex items-center gap-2">
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, k) => (
                  <Star key={k} size={14} fill="currentColor" />
                ))}
              </div>
              <span className="text-sm text-gray-500">4.9 · 1,240 reviews</span>
            </div>

            {/* Price */}
            <div className="mt-5 flex items-baseline gap-3">
              <span className="font-display text-4xl font-black text-gray-900">
                €{product.price}
              </span>
              <span className="text-lg text-gray-400 line-through">€{product.comparePrice}</span>
              <span className="rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-semibold text-green-700">
                Save ${product.comparePrice - product.price}
              </span>
            </div>

            <p className="mt-5 text-base leading-relaxed text-gray-500">
              {productData?.focus}
            </p>

            {/* Features */}
            {productData?.features && (
              <ul className="mt-5 space-y-2">
                {productData.features.map((f) => (
                  <li key={f} className="flex items-center gap-2.5 text-sm text-gray-700">
                    <Check size={14} className="flex-shrink-0 text-[#1a56db]" />
                    {f}
                  </li>
                ))}
              </ul>
            )}

            {/* Qty + Add */}
            <div className="mt-8 flex items-center gap-3">
              <div className="flex items-center rounded-xl border border-gray-200 bg-gray-50">
                <button
                  onClick={() => setQty((v) => Math.max(1, v - 1))}
                  className="px-4 py-3 text-gray-600 transition hover:text-gray-900"
                >
                  −
                </button>
                <span className="w-8 text-center text-sm font-semibold">{qty}</span>
                <button
                  onClick={() => setQty((v) => v + 1)}
                  className="px-4 py-3 text-gray-600 transition hover:text-gray-900"
                >
                  +
                </button>
              </div>

              <button
                onClick={handleAdd}
                className={`flex flex-1 items-center justify-center gap-2 rounded-xl py-3.5 text-sm font-semibold transition ${
                  added
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-900 text-white hover:bg-gray-800 active:scale-[0.98]'
                }`}
              >
                <ShoppingBag size={16} />
                {added ? '✓ Added to cart' : 'Add to cart'}
              </button>
            </div>

            <Link
              href={`/${locale}/checkout`}
              className="btn-accent mt-3 flex w-full items-center justify-center py-3.5 text-sm"
            >
              Buy now — ${product.price * qty}
            </Link>

            {/* Trust badges */}
            <div className="mt-6 grid grid-cols-3 gap-3 rounded-2xl border border-gray-100 bg-gray-50 p-4">
              <div className="flex flex-col items-center gap-1 text-center">
                <ShieldCheck size={18} className="text-gray-500" />
                <span className="text-xs font-medium text-gray-600">30-day guarantee</span>
              </div>
              <div className="flex flex-col items-center gap-1 text-center">
                <Truck size={18} className="text-gray-500" />
                <span className="text-xs font-medium text-gray-600">Free shipping</span>
              </div>
              <div className="flex flex-col items-center gap-1 text-center">
                <ShoppingBag size={18} className="text-gray-500" />
                <span className="text-xs font-medium text-gray-600">Secure checkout</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* You may also like */}
        <div className="mt-20">
          <h2 className="mb-8 font-display text-2xl font-bold text-gray-900">You may also like</h2>
          <div className="grid gap-6 sm:grid-cols-2">
            {otherProducts.map((p, j) => {
              const pIndex = getProductIndex(p.slug);
              const pData = systemProducts[pIndex];
              return (
                <Link
                  key={p.slug}
                  href={`/${locale}/products/${p.slug}`}
                  className="flex items-center gap-5 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                >
                  <div
                    className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-xl text-2xl"
                    style={{background: PRODUCT_BG[pIndex]}}
                  >
                    {PRODUCT_ICON[pIndex]}
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-[#1a56db]">{p.tag}</p>
                    <p className="font-semibold text-gray-900">{p.name}</p>
                    <p className="text-sm text-gray-500">{pData?.focus?.slice(0, 60)}…</p>
                  </div>
                  <span className="ml-auto font-bold text-gray-900">${p.price}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
