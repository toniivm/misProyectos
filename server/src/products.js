// Server catalog — synced with frontend catalog (recovery-system/lib/catalog.ts)
const PRODUCTS = [
  // ─── Sleep & Audio ───────────────────────────────────────────────
  {
    id: 'sleepband-pro',
    slug: 'sleepband-pro',
    title: 'Noctive Halo',
    description: 'Ultra-thin acoustic headband engineered for pressure-free, immersive sleep audio.',
    price: 17,
    category: 'sleep-audio',
    brand: 'NOCTIVE',
    stock: 20,
  },
  {
    id: 'white-noise-pro',
    slug: 'white-noise-pro',
    title: 'Noctive Wave',
    description: 'Compact ambient sound system with studio-tuned sleep profiles and adaptive soft light.',
    price: 20,
    category: 'sleep-audio',
    brand: 'NOCTIVE',
    stock: 20,
  },
  {
    id: 'sleep-headband',
    slug: 'sleep-headband',
    title: 'Sleep Headband',
    description: 'Comfortable Bluetooth sleep headband with thin speakers.',
    price: 12,
    category: 'sleep-audio',
    stock: 20,
  },

  // ─── Neck & Recovery ─────────────────────────────────────────────
  {
    id: 'neck-massager',
    slug: 'neck-massager',
    title: 'Neck Massager',
    description: 'Portable neck massager with heat and multiple modes.',
    price: 15,
    category: 'neck-recovery',
    stock: 20,
  },

  // ─── Sensory & Relaxation ─────────────────────────────────────────
  {
    id: 'weighted-mask-pro',
    slug: 'weighted-mask-pro',
    title: 'Noctive Calm Mask',
    description: 'Weighted sleep mask that combines gentle pressure and breathable design.',
    price: 11,
    category: 'sensory',
    brand: 'NOCTIVE',
    stock: 20,
  },
];

export default PRODUCTS;
