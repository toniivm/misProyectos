'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { useLocale } from 'next-intl';
import type { CatalogProduct } from '../lib/catalog';

interface BundleSelectorProps {
  product: CatalogProduct;
  onAdd: (tier: BundleTier, variants: string[]) => void;
  added: boolean;
}

export interface BundleTier {
  id: string;
  labelEs: string;
  labelEn: string;
  subtitleEs: string;
  subtitleEn: string;
  paid: number;
  total: number;
  badgeEs: string | null;
  badgeEn: string | null;
}

const TIERS: BundleTier[] = [
  {
    id: '1',
    labelEs: 'Compra 1',
    labelEn: 'Buy 1',
    subtitleEs: 'Precio estándar',
    subtitleEn: 'Standard price',
    paid: 1,
    total: 1,
    badgeEs: null,
    badgeEn: null,
  },
  {
    id: '2',
    labelEs: 'Compra 2, ¡Llévate 1 Gratis!',
    labelEn: 'Buy 2, Get 1 Free!',
    subtitleEs: '+ Envío Gratis',
    subtitleEn: '+ Free Shipping',
    paid: 2,
    total: 3,
    badgeEs: 'Más Popular',
    badgeEn: 'Most Popular',
  },
  {
    id: '3',
    labelEs: 'Compra 3, ¡Llévate 2 Gratis!',
    labelEn: 'Buy 3, Get 2 Free!',
    subtitleEs: '+ Envío Gratis',
    subtitleEn: '+ Free Shipping',
    paid: 3,
    total: 5,
    badgeEs: 'Mejor Valor',
    badgeEn: 'Best Value',
  },
];

export default function BundleSelector({ product, onAdd, added }: BundleSelectorProps) {
  const locale = useLocale();
  const isEs = locale === 'es';
  const [selected, setSelected] = useState<string>('2'); // default Most Popular like Oliver West
  const [variants, setVariants] = useState<string[]>(() => Array(5).fill(''));
  const hasSizes = !!product.specs?.['Tallas'];
  const sizes = hasSizes ? product.specs['Tallas'].split(' / ') : [];

  const getTierPrice = (tier: BundleTier) => tier.paid * product.price;
  const getTierCompare = (tier: BundleTier) => tier.total * product.comparePrice;
  const getSave = (tier: BundleTier) => {
    const compare = getTierCompare(tier);
    const price = getTierPrice(tier);
    if (compare <= 0) return 0;
    return Math.round(((compare - price) / compare) * 100);
  };

  const selectedTier = TIERS.find((t) => t.id === selected)!;
  const needsVariants = selectedTier.total;
  const canAdd = !hasSizes || variants.slice(0, needsVariants).every((v) => !!v);

  const handleAdd = () => {
    if (!canAdd) return;
    onAdd(selectedTier, variants.slice(0, needsVariants));
  };

  return (
    <div className="space-y-3">
      {/* Divider like Oliver West SPECIAL OFFER */}
      <div className="flex items-center gap-3 py-1">
        <div className="h-px flex-1 bg-white/10" />
        <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#6b7785]">
          {isEs ? 'Oferta Especial' : 'Special Offer'}
        </span>
        <div className="h-px flex-1 bg-white/10" />
      </div>

      {TIERS.map((tier) => {
        const isSelected = selected === tier.id;
        const price = getTierPrice(tier);
        const compare = getTierCompare(tier);
        const save = getSave(tier);
        const badge = isEs ? tier.badgeEs : tier.badgeEn;
        return (
          <motion.div
            key={tier.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className={`relative rounded-xl border-2 bg-[#0d1219] transition-all ${
              isSelected ? 'border-[#10BFD8] bg-[#0d1219]' : 'border-white/[0.08] hover:border-white/[0.14]'
            }`}
          >
            {badge && (
              <div className="absolute -top-2.5 right-4 z-10 rounded-full bg-[#10BFD8] px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white shadow-[0_2px_8px_rgba(16,191,216,0.4)]">
                {badge}
              </div>
            )}
            <button
              type="button"
              onClick={() => setSelected(tier.id)}
              className="flex w-full items-center gap-3 p-3.5 sm:p-4 text-left"
            >
              {/* Radio */}
              <span
                className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-all ${
                  isSelected ? 'border-[#10BFD8] bg-[#10BFD8]' : 'border-white/20'
                }`}
              >
                {isSelected && <span className="h-2 w-2 rounded-full bg-white" />}
              </span>

              {/* Label */}
              <div className="flex-1 min-w-0">
                <div className="text-[14px] font-bold text-[#f2eee7] leading-tight">{isEs ? tier.labelEs : tier.labelEn}</div>
                <div className="text-[11px] text-[#8791a1]">{isEs ? tier.subtitleEs : tier.subtitleEn}</div>
              </div>

              {/* Price */}
              <div className="text-right shrink-0">
                <div className="text-[16px] font-bold text-[#f2eee7]">€{price.toFixed(2)}</div>
                <div className="text-[11px] text-[#6b7785] line-through">€{compare.toFixed(2)}</div>
                {save > 0 && (
                  <div className="inline-flex rounded-full bg-[#10BFD8]/15 px-1.5 py-0.5 text-[10px] font-bold text-[#10BFD8] mt-0.5">
                    -{save}%
                  </div>
                )}
              </div>
            </button>

            {/* Expand variant selectors like Oliver West */}
            {isSelected && hasSizes && (
              <div className="border-t border-white/[0.06] bg-white/[0.02] p-3 sm:p-4 space-y-2 rounded-b-xl">
                <div className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#8791a1]">
                  {isEs ? `Elige talla para cada unidad (${tier.total})` : `Choose size for each unit (${tier.total})`}
                </div>
                {Array.from({ length: tier.total }).map((_, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <span className="text-[11px] font-medium text-[#6b7785] w-6">
                      #{idx + 1}
                    </span>
                    <select
                      value={variants[idx] || ''}
                      onChange={(e) => {
                        const next = [...variants];
                        next[idx] = e.target.value;
                        setVariants(next);
                      }}
                      className="flex-1 rounded-lg border border-white/10 bg-[#111720] px-3 py-2.5 text-[13px] text-[#f2eee7] focus:border-[#10BFD8] focus:outline-none min-h-[42px]"
                    >
                      <option value="">{isEs ? 'Talla' : 'Size'}</option>
                      {sizes.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </div>
                ))}
                {!canAdd && (
                  <p className="text-[11px] text-amber-300">
                    {isEs ? 'Selecciona todas las tallas para continuar' : 'Select all sizes to continue'}
                  </p>
                )}
              </div>
            )}

            {/* For products without sizes, show quantity hint */}
            {isSelected && !hasSizes && tier.total > 1 && (
              <div className="border-t border-white/[0.06] bg-white/[0.02] px-3 py-2.5 rounded-b-xl text-center">
                <span className="text-[11px] text-[#8791a1]">
                  {isEs
                    ? `Recibes ${tier.total} unidades · Pagas ${tier.paid} · Ahorras ${save}%`
                    : `Get ${tier.total} units · Pay for ${tier.paid} · Save ${save}%`}
                </span>
              </div>
            )}
          </motion.div>
        );
      })}

      {/* CTA */}
      <button
        onClick={handleAdd}
        disabled={!canAdd || added}
        className={`flex w-full items-center justify-center gap-2 rounded-full py-4 text-[15px] font-bold transition-all min-h-[52px] ${
          added
            ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
            : canAdd
              ? 'bg-white text-[#080c12] hover:shadow-[0_8px_32px_rgba(255,255,255,0.15)] active:scale-[0.98]'
              : 'bg-white/40 text-[#080c12]/50 cursor-not-allowed'
        }`}
      >
        {added ? (
          <>
            <Check size={16} />
            {isEs ? '¡Añadido!' : 'Added!'}
          </>
        ) : (
          <>
            {isEs ? 'Añadir al carrito' : 'Add to cart'} — €{getTierPrice(selectedTier).toFixed(2)}
          </>
        )}
      </button>
      <p className="text-center text-[11px] text-[#6b7785]">
        {isEs ? 'Envío gratis · 30 noches garantía · Pago seguro Stripe' : 'Free shipping · 30-night guarantee · Secure Stripe'}
      </p>
    </div>
  );
}
