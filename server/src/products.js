// Server catalog kept in sync with the Recovery System frontend.
// Removed entries that referenced missing image assets to avoid 404s.
const PRODUCTS = [
  {
    id: 'sleepband-pro',
    slug: 'sleepband-pro',
    title: 'Noctive Halo',
    description: 'Noctive Halo — an ultra-thin sleep headband with precision acoustic drivers for immersive, pressure-free sleep audio.',
    price: 69,
    images: ['/img/products/sleepband-pro-1.jpg'],
    category: 'sleep',
    brand: 'NOCTIVE',
    stock: 20,
  },
  {
    id: 'white-noise-pro',
    slug: 'white-noise-pro',
    title: 'Noctive Wave',
    description: 'Noctive Wave — compact ambient sound system with studio-tuned sleep profiles and soft adaptive night light for deeper rest.',
    price: 79,
    images: ['/img/products/white-noise-pro-1.jpg'],
    category: 'sleep',
    brand: 'NOCTIVE',
    stock: 20,
  },
  {
    id: 'weighted-mask-pro',
    slug: 'weighted-mask-pro',
    title: 'Noctive Calm Mask',
    description: 'Noctive Calm Mask — a thoughtfully weighted sleep mask combining gentle pressure and breathable materials to accelerate sleep onset.',
    price: 45,
    images: ['/img/products/weighted-mask-pro-1.jpg'],
    category: 'sleep',
    brand: 'NOCTIVE',
    stock: 20,
  },
];

export default PRODUCTS;
