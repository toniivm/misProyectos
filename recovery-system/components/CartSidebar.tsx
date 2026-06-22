'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { X, ShoppingBag, Plus, Minus, Trash2, ArrowRight, ShieldCheck, Truck, RotateCcw } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

export default function CartSidebar() {
  const { isOpen, close, items, remove, updateQty, subtotal, totalItems, activeBundle, bundleDiscount, totalWithDiscount } = useCart();
  const locale = useLocale();
  const t = useTranslations('cart');
  const { user, openModal } = useAuth();

  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prev || ''; };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') close(); };
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
            className="fixed inset-0 z-30 bg-black/60 backdrop-blur-sm"
          />

          <motion.aside
            key="drawer"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 320 }}
            className="fixed right-0 top-0 z-[60] flex h-full w-full max-w-sm flex-col border-l border-white/[0.07] bg-[#0c1016] shadow-[-20px_0_60px_rgba(0,0,0,0.5)] sm:max-w-md"
            role="dialog"
            aria-modal="true"
            aria-label="Shopping cart"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-white/[0.07] px-5 py-4">
              <div className="flex items-center gap-2.5 text-[#f2eee7]">
                <ShoppingBag size={17} />
                <span className="text-[15px] font-semibold">
                  {t('title')}
                  {totalItems > 0 && (
                    <span className="ml-2 rounded-full bg-[#f2eee7] px-2 py-0.5 text-[10px] font-bold text-[#11161d]">
                      {totalItems > 99 ? '99+' : totalItems}
                    </span>
                  )}
                </span>
              </div>
              <button onClick={close}
                className="flex h-10 w-10 items-center justify-center rounded-lg text-[#8791a1] transition hover:bg-white/[0.06] hover:text-[#f2eee7]"
                aria-label="Close cart">
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
                  <p className="text-[15px] font-semibold text-[#f2eee7]">{t('empty')}</p>
                  <p className="mt-1.5 text-[13px] text-[#8791a1]">{t('emptyHint')}</p>
                  <button onClick={close}
                    className="mt-7 btn-dark !rounded-full">
                    {t('continueShopping')}
                  </button>
                </div>
              ) : (
                <ul className="space-y-3">
                  {items.map((item) => (
                    <li key={item.slug}
                      className="flex gap-4 rounded-2xl border border-white/[0.08] bg-white/[0.03] p-4 transition-all hover:border-white/[0.12]">
                      <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-xl border border-white/[0.08] bg-[#111720] text-2xl">
                        {item.icon}
                      </div>
                      <div className="flex flex-1 flex-col gap-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <p className="text-[14px] font-semibold text-[#f2eee7] leading-snug line-clamp-2">{item.name}</p>
                          <button onClick={() => remove(item.slug)}
                            className="mt-0.5 flex-shrink-0 rounded-md p-2 text-[#3d4a5c] transition hover:bg-white/[0.06] hover:text-[#e05a5a]"
                            aria-label={`Remove ${item.name}`}>
                            <Trash2 size={14} />
                          </button>
                        </div>
                        <p className="text-[14px] font-bold text-[#f2eee7]">
                          €{(item.price * item.quantity).toFixed(2)}
                        </p>
                        <div className="mt-1 flex items-center gap-2">
                          <button onClick={() => updateQty(item.slug, item.quantity - 1)}
                            className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/[0.1] text-[#8791a1] transition hover:border-white/20 hover:bg-white/[0.05] hover:text-[#f2eee7]"
                            aria-label="Decrease quantity">
                            <Minus size={11} />
                          </button>
                          <span className="w-6 text-center text-[13px] font-semibold text-[#f2eee7]">{item.quantity}</span>
                          <button onClick={() => updateQty(item.slug, item.quantity + 1)}
                            className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/[0.1] text-[#8791a1] transition hover:border-white/20 hover:bg-white/[0.05] hover:text-[#f2eee7]"
                            aria-label="Increase quantity">
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
                  <span>{t('subtotal')} ({totalItems} {totalItems === 1 ? t('item') : t('items')})</span>
                  <span className="font-semibold text-[#f2eee7]">€{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between text-[13px] text-[#8791a1]">
                  <span className="flex items-center gap-1.5"><Truck size={12} />{t('shipping')}</span>
                  <span className="font-semibold text-[#5fb07c]">{t('free')}</span>
                </div>

                {activeBundle && bundleDiscount > 0 && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="rounded-xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-3"
                  >
                    <div className="flex items-center justify-between text-[13px]">
                      <span className="font-semibold text-emerald-300">
                        🎉 Bundle: {activeBundle.name_en || activeBundle.name} (-{activeBundle.discountPercent}%)
                      </span>
                      <span className="font-bold text-emerald-300">-€{bundleDiscount.toFixed(2)}</span>
                    </div>
                  </motion.div>
                )}

                {/* Trust badges */}
                <div className="flex items-center justify-center gap-4 text-[11px] text-[#5a6678] pt-1">
                  <span className="flex items-center gap-1"><RotateCcw size={11} />30-day returns</span>
                  <span className="flex items-center gap-1"><ShieldCheck size={11} />Secure</span>
                  <span className="flex items-center gap-1"><Truck size={11} />Free shipping</span>
                </div>

                <div className="flex items-center justify-between border-t border-white/[0.07] pt-3">
                  <span className="text-[15px] font-semibold text-[#f2eee7]">{t('total')}</span>
                  <div className="text-right">
                    {bundleDiscount > 0 && (
                      <span className="block text-[12px] text-[#4a5568] line-through">€{subtotal.toFixed(2)}</span>
                    )}
                    <span className="text-[20px] font-bold text-[#f2eee7]">€{totalWithDiscount.toFixed(2)}</span>
                  </div>
                </div>

                <button
                  onClick={() => {
                    if (!user) {
                      close();
                      openModal();
                      return;
                    }
                    close();
                    window.location.href = `/${locale}/checkout`;
                  }}
                  className="flex w-full items-center justify-center gap-2 rounded-full bg-[#f2eee7] px-5 py-3.5 text-[14px] font-semibold text-[#11161d] transition-all duration-200 hover:bg-white hover:-translate-y-[1px]"
                >
                  {t('checkout')}
                  <ArrowRight size={15} />
                </button>

                <div className="flex items-center justify-center gap-1.5 text-[11px] text-[#6b7280]">
                  <ShieldCheck size={11} />
                  {t('secureCheckout')}
                </div>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
