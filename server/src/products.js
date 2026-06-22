// Server catalog — synced with frontend catalog (recovery-system/lib/catalog.ts)
const PRODUCTS = [
  // ─── Sleep & Anti-Snoring ──────────────────────────────────────────
  {
    id: 'sleepband-pro',
    slug: 'sleepband-pro',
    title: 'Noctip Halo',
    description: 'Anti-snoring mouthpiece with precision jaw advancement to open airway and stop snoring.',
    price: 17,
    category: 'sleep-audio',
    brand: 'Noctip',
    stock: 20,
  },
  {
    id: 'sleep-headband',
    slug: 'sleep-headband',
    title: 'Noctip Rest',
    description: 'Comfortable Bluetooth sleep audio headband with thin speakers and 10-hour battery.',
    price: 12,
    category: 'sleep-audio',
    brand: 'Noctip',
    stock: 20,
  },

  // ─── Posture & Recovery ────────────────────────────────────────────
  {
    id: 'white-noise-pro',
    slug: 'white-noise-pro',
    title: 'Noctip Wave',
    description: 'Posture corrector brace with ergonomic Y-shaped support for spine realignment.',
    price: 20,
    category: 'neck-recovery',
    brand: 'Noctip',
    stock: 20,
  },

  // ─── Cervical Massage ──────────────────────────────────────────────
  {
    id: 'neck-massager',
    slug: 'neck-massager',
    title: 'Noctip Relief',
    description: 'Neck massager with electrodes, 3 massage modes, heat therapy up to 45°C.',
    price: 15,
    category: 'neck-recovery',
    brand: 'Noctip',
    stock: 20,
  },
  {
    id: 'weighted-mask-pro',
    slug: 'weighted-mask-pro',
    title: 'Noctip Calm',
    description: 'Cervical pulse massager with floating electrode plates that adapt to neck curves.',
    price: 11,
    category: 'neck-recovery',
    brand: 'Noctip',
    stock: 20,
  },
];

export default PRODUCTS;
