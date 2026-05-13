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
    slug: 'sleep-induction-module',
    name: 'Sleep Induction Module',
    tag: 'Neural audio entrainment',
    price: 89,
    comparePrice: 149,
    icon: 'SIM',
    bg: '#111111',
  },
  {
    slug: 'cervical-downshift-module',
    name: 'Cervical Downshift Module',
    tag: 'Physical stress release',
    price: 59,
    comparePrice: 99,
    icon: 'CDM',
    bg: '#111111',
  },
  {
    slug: 'sensory-stillness-module',
    name: 'Sensory Stillness Module',
    tag: 'Perceptual isolation',
    price: 29,
    comparePrice: 49,
    icon: 'SSM',
    bg: '#111111',
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function getProductIndex(slug: string): number {
  return PRODUCTS.findIndex((p) => p.slug === slug);
}
