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
  { slug: 'sleepband-pro', name: 'SleepBand Pro', tag: 'Bluetooth sleep headband', price: 69, comparePrice: 119, icon: '🎧', bg: '#101828' },
  { slug: 'sleepseal-plus', name: 'SleepSeal+ Pack', tag: '60-night nasal breathing strips', price: 39, comparePrice: 59, icon: '🌙', bg: '#0d1828' },
  { slug: 'white-noise-pro', name: 'White Noise Pro', tag: 'Portable sleep sound machine', price: 79, comparePrice: 129, icon: '🔊', bg: '#131020' },
  { slug: 'cerviflex', name: 'CerviFlex', tag: 'Cervical relief massager', price: 59, comparePrice: 99, icon: '🧘', bg: '#121a24' },
  { slug: 'neckpulse-pro', name: 'NeckPulse Pro', tag: 'Cervical traction device', price: 79, comparePrice: 139, icon: '🦴', bg: '#101c28' },
  { slug: 'posture-band', name: 'PostureBand', tag: 'Upper back posture corrector', price: 45, comparePrice: 79, icon: '🏋️', bg: '#0e1a20' },
  { slug: 'pulse-pro-x', name: 'Pulse Pro X', tag: 'Percussion massage gun', price: 89, comparePrice: 149, icon: '💆', bg: '#111c28' },
  { slug: 'vibrapulse-mini', name: 'VibraPulse Mini', tag: 'Compact vibration massager', price: 55, comparePrice: 89, icon: '⚡', bg: '#0f1824' },
  { slug: 'thermapad-pro', name: 'ThermaPad Pro', tag: 'Therapeutic heating pad', price: 65, comparePrice: 99, icon: '🔥', bg: '#1a1010' },
  { slug: 'sleepseal', name: 'SleepSeal Mask', tag: '3D contoured sleep eye mask', price: 29, comparePrice: 49, icon: '🌙', bg: '#0e1422' },
  { slug: 'weighted-mask-pro', name: 'WeightedMask Pro', tag: 'Weighted sleep mask', price: 45, comparePrice: 69, icon: '😴', bg: '#12101e' },
  { slug: 'breathcalm', name: 'BreathCalm', tag: 'Breathing trainer device', price: 35, comparePrice: 59, icon: '🌬️', bg: '#0d1820' },
  { slug: 'travel-pillow-ultra', name: 'TravelPillow Ultra', tag: 'Memory foam travel pillow', price: 39, comparePrice: 65, icon: '✈️', bg: '#101822' },
  { slug: 'portable-pulse', name: 'PortablePulse', tag: 'Pocket percussion massager', price: 55, comparePrice: 89, icon: '🎒', bg: '#10181e' },
  { slug: 'napkit-pro', name: 'NapKit Pro', tag: 'Complete travel sleep kit', price: 49, comparePrice: 79, icon: '🧳', bg: '#141020' },
  // legacy slugs kept for backward compatibility
  { slug: 'sleep-induction-module', name: 'Sleep Induction Module', tag: 'Neural audio entrainment', price: 89, comparePrice: 149, icon: 'SIM', bg: '#111111' },
  { slug: 'cervical-downshift-module', name: 'Cervical Downshift Module', tag: 'Physical stress release', price: 59, comparePrice: 99, icon: 'CDM', bg: '#111111' },
  { slug: 'sensory-stillness-module', name: 'Sensory Stillness Module', tag: 'Perceptual isolation', price: 29, comparePrice: 49, icon: 'SSM', bg: '#111111' },
];

export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function getProductIndex(slug: string): number {
  return PRODUCTS.findIndex((p) => p.slug === slug);
}
