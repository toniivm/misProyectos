'use client';

import { AnimatePresence, motion } from 'framer-motion';
import {
  X,
  ShoppingBag,
  Plus,
  Minus,
  Trash2,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';
import Link from 'next/link';
import { useLocale } from 'next-intl';
import { useCart } from '../context/CartContext';

export default function CartSidebar() {
  const { isOpen, close, items, remove, updateQty, subtotal, totalItems } =
    useCart();
  const locale = useLocale();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={close}
            className="fixed inset-0 z-40 bg-black/25 backdrop-blur-[2px]"
          />

          <motion.aside
            key="drawer"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 320 }}
            className="fixed right-0 top-0 z-50 flex h-full w-full max-w-sm flex-col bg-white shadow-2xl sm:max-w-md"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
              <div className="flex items-center gap-2 text-gray-900">
                <ShoppingBag size={18} />
                <span className="font-semibold">
                  Your cart
                  {totalItems > 0 && (
                    <span className="ml-1.5 rounded-full bg-gray-900 px-2 py-0.5 text-xs text-white">
                      {totalItems}
                    </span>
                  )}
                </span>
              </div>
              <button
                onClick={close}
                className="rounded-lg p-2 text-gray-400 transition hover:bg-gray-100 hover:text-gray-700"
                aria-label="Close cart"
              >
                <X size={18} />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-5">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gray-100">
                    <ShoppingBag size={28} className="text-gray-300" />
                  </div>
                  <p className="font-semibold text-gray-700">
                    Your cart is empty
                  </p>
                  <p className="mt-1 text-sm text-gray-400">
                    Add recovery tools to get started
                  </p>
                  <button onClick={close} className="btn-primary mt-6 text-sm">
                    Continue shopping
                  </button>
                </div>
              ) : (
                <ul className="space-y-3">
                  {items.map((item) => (
                    <li
                      key={item.slug}
                      className="flex gap-4 rounded-2xl border border-gray-100 bg-gray-50 p-4"
                    >
                      <div
                        className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-xl text-2xl"
                        style={{
                          background:
                            item.icon === '💆'
                              ? '#f0f9ff'
                              : item.icon === '🧘'
                                ? '#f0fdf4'
                                : '#faf5ff',
                        }}
                      >
                        {item.icon}
                      </div>

                      <div className="flex flex-1 flex-col gap-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <p className="text-sm font-semibold text-gray-900 leading-tight">
                            {item.name}
                          </p>
                          <button
                            onClick={() => remove(item.slug)}
                            className="flex-shrink-0 text-gray-300 transition hover:text-red-400"
                            aria-label="Remove item"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>

                        <p className="text-sm font-bold text-gray-900">
                          ${item.price}
                        </p>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() =>
                              updateQty(item.slug, item.quantity - 1)
                            }
                            className="flex h-7 w-7 items-center justify-center rounded-lg border border-gray-200 text-gray-600 transition hover:border-gray-400 hover:bg-white"
                          >
                            <Minus size={12} />
                          </button>
                          <span className="w-6 text-center text-sm font-semibold">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQty(item.slug, item.quantity + 1)
                            }
                            className="flex h-7 w-7 items-center justify-center rounded-lg border border-gray-200 text-gray-600 transition hover:border-gray-400 hover:bg-white"
                          >
                            <Plus size={12} />
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-gray-100 p-5 space-y-3">
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>Subtotal</span>
                  <span className="font-semibold text-gray-900">
                    ${subtotal}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>Shipping</span>
                  <span className="font-semibold text-green-600">Free</span>
                </div>
                <div className="flex items-center justify-between border-t border-gray-100 pt-3">
                  <span className="font-bold text-gray-900">Total</span>
                  <span className="text-lg font-black text-gray-900">
                    ${subtotal}
                  </span>
                </div>

                <Link
                  href={`/${locale}/checkout`}
                  onClick={close}
                  className="btn-primary flex w-full items-center justify-center gap-2 py-3.5"
                >
                  Proceed to checkout
                  <ArrowRight size={16} />
                </Link>

                <div className="flex items-center justify-center gap-1.5 text-xs text-gray-400">
                  <ShieldCheck size={12} />
                  Secure checkout · 30-day guarantee
                </div>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
