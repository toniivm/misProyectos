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
import { useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

export default function CartSidebar() {
  const { isOpen, close, items, remove, updateQty, subtotal, totalItems } =
    useCart();
  const locale = useLocale();
  const { user, openModal } = useAuth();

  // Lock body scroll while the cart drawer is open to avoid double scrolling on mobile
  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev || '';
    };
  }, [isOpen]);

  // Close on Escape key for accessibility
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, close]);

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
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-[3px]"
          />

          <motion.aside
            key="drawer"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 320 }}
            className="fixed right-0 top-0 z-60 flex h-full w-full max-w-sm flex-col border-l border-white/[0.07] bg-[#0c1016] shadow-[-20px_0_60px_rgba(0,0,0,0.5)] sm:max-w-md"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-white/[0.07] px-5 py-4">
              <div className="flex items-center gap-2.5 text-[#f2eee7]">
                <ShoppingBag size={17} />
                <span className="text-[15px] font-semibold">
                  Your cart
                  {totalItems > 0 && (
                    <span className="ml-2 rounded-full bg-[#f2eee7] px-2 py-0.5 text-[10px] font-bold text-[#11161d]">
                      {totalItems}
                    </span>
                  )}
                </span>
              </div>
              <button
                onClick={close}
                className="flex h-11 w-11 items-center justify-center rounded-lg text-[#8791a1] transition hover:bg-white/[0.06] hover:text-[#f2eee7]"
                aria-label="Close cart"
              >
                <X size={17} />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-5">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 text-center">
                  <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl border border-white/[0.08] bg-white/[0.03]">
                    <ShoppingBag size={26} className="text-[#3d4a5c]" />
                  </div>
                  <p className="text-[15px] font-semibold text-[#f2eee7]">Your cart is empty</p>
                  <p className="mt-1.5 text-[13px] text-[#8791a1]">Add recovery tools to begin your ritual.</p>
                  <button
                    onClick={close}
                    className="mt-7 inline-flex items-center justify-center rounded-full border border-white/10 bg-white/[0.04] px-5 py-2.5 text-[13px] font-medium text-[#d1d8e2] transition hover:border-white/20 hover:bg-white/[0.07]"
                  >
                    Continue shopping
                  </button>
                </div>
              ) : (
                <ul className="space-y-3">
                  {items.map((item) => (
                    <li
                      key={item.slug}
                      className="flex gap-4 rounded-2xl border border-white/[0.08] bg-white/[0.03] p-4"
                    >
                      <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-xl border border-white/[0.08] bg-[#111720] text-2xl">
                        {item.icon}
                      </div>

                      <div className="flex flex-1 flex-col gap-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <p className="text-[14px] font-semibold text-[#f2eee7] leading-snug">
                            {item.name}
                          </p>
                          <button
                            onClick={() => remove(item.slug)}
                            className="mt-0.5 flex-shrink-0 text-[#3d4a5c] transition hover:text-[#e05a5a] p-2.5 rounded-md"
                            aria-label={`Remove ${item.name}`}
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>

                        <p className="text-[14px] font-bold text-[#f2eee7]">
                          EUR{(item.price * item.quantity).toFixed(0)}
                        </p>

                        <div className="mt-1 flex items-center gap-2">
                          <button
                            onClick={() => updateQty(item.slug, item.quantity - 1)}
                            className="flex h-11 w-11 items-center justify-center rounded-lg border border-white/[0.1] text-[#8791a1] transition hover:border-white/20 hover:bg-white/[0.05] hover:text-[#f2eee7]"
                            aria-label="Decrease quantity"
                          >
                            <Minus size={11} />
                          </button>
                          <span className="w-6 text-center text-[13px] font-semibold text-[#f2eee7]">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQty(item.slug, item.quantity + 1)}
                            className="flex h-11 w-11 items-center justify-center rounded-lg border border-white/[0.1] text-[#8791a1] transition hover:border-white/20 hover:bg-white/[0.05] hover:text-[#f2eee7]"
                            aria-label="Increase quantity"
                          >
                            <Plus size={11} />
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
              <div className="border-t border-white/[0.07] p-5 space-y-3">
                <div className="flex items-center justify-between text-[13px] text-[#8791a1]">
                  <span>Subtotal ({totalItems} {totalItems === 1 ? 'item' : 'items'})</span>
                  <span className="font-semibold text-[#f2eee7]">EUR{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between text-[13px] text-[#8791a1]">
                  <span>Shipping</span>
                  <span className="font-semibold text-[#5fb07c]">Free</span>
                </div>
                <div className="flex items-center justify-between border-t border-white/[0.07] pt-3">
                  <span className="text-[15px] font-semibold text-[#f2eee7]">Total</span>
                  <span className="text-[18px] font-bold text-[#f2eee7]">EUR{subtotal.toFixed(2)}</span>
                </div>

                <Link
                  href={`/${locale}/checkout`}
                  onClick={(e) => {
                    if (!user) {
                      e.preventDefault();
                      // close cart first to avoid stacked backdrops/modal ordering
                      close();
                      openModal();
                      return;
                    }
                    close();
                  }}
                  className="flex w-full items-center justify-center gap-2 rounded-full bg-[#f2eee7] px-5 py-3.5 text-[14px] font-semibold text-[#11161d] transition-transform duration-300 hover:-translate-y-[1px]"
                >
                  Proceed to checkout
                  <ArrowRight size={15} />
                </Link>

                <div className="flex items-center justify-center gap-1.5 text-[11px] text-[#6b7280]">
                  <ShieldCheck size={11} />
                  Secure checkout - 30-night guarantee
                </div>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
