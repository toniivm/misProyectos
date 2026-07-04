// Server catalog — synced with frontend catalog (recovery-system/lib/catalog.ts)
const PRODUCTS = [
  // ─── Sleep & Anti-Snoring ──────────────────────────────────────────
  {
    id: 'halo',
    slug: 'halo',
    title: 'Noctip Halo',
    description: 'Anti-snoring mouthpiece with precision jaw advancement to open airway and stop snoring.',
    price: 17.99,
    category: 'sleep-audio',
    brand: 'Noctip',
    stock: 20,
  },
  {
    id: 'sleep-headband',
    slug: 'sleep-headband',
    title: 'Noctip Rest',
    description: 'Comfortable Bluetooth sleep audio headband with thin speakers and 10-hour battery.',
    price: 11.99,
    category: 'sleep-audio',
    brand: 'Noctip',
    stock: 20,
  },

  // ─── Posture & Recovery ────────────────────────────────────────────
  {
    id: 'wave',
    slug: 'wave',
    title: 'Noctip Back',
    description: 'Posture corrector brace with ergonomic Y-shaped support for spine realignment.',
    price: 19.99,
    category: 'neck-recovery',
    brand: 'Noctip',
    stock: 20,
  },

  // ─── Cervical Massage ──────────────────────────────────────────────
  {
    id: 'neck-massager',
    slug: 'neck-massager',
    title: 'Noctip Cervical',
    description: 'Cervical massager with floating electrodes, 3 massage modes, heat therapy up to 45°C.',
    price: 14.99,
    category: 'neck-recovery',
    brand: 'Noctip',
    stock: 20,
  },
];

export default PRODUCTS;
