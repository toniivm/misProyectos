export interface Product {
  slug: string;
  name: string;
  tag: string;
  price: number;
  comparePrice: number;
  icon: string;
  bg: string;
}

export const PRODUCTS: Product[] = [
  {
    slug: 'pulse-pro-x',
    name: 'Pulse Pro X',
    tag: 'Massage Gun',
    price: 89,
    comparePrice: 149,
    icon: '💆',
    bg: '#f0f9ff',
  },
  {
    slug: 'cerviflex',
    name: 'CerviFlex',
    tag: 'Neck Massager',
    price: 59,
    comparePrice: 99,
    icon: '🧘',
    bg: '#f0fdf4',
  },
  {
    slug: 'sleepseal',
    name: 'SleepSeal',
    tag: 'Sleep Tape',
    price: 29,
    comparePrice: 49,
    icon: '🌙',
    bg: '#faf5ff',
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function getProductIndex(slug: string): number {
  return PRODUCTS.findIndex((p) => p.slug === slug);
}
