/**
 * Auto-loading image system.
 * Scans product folders and returns available images.
 * When you add images to public/images/{slug}/{folder}/,
 * they appear automatically — no code changes needed.
 */

export type ImageCategory = 'gallery' | 'lifestyle' | 'details' | 'package';

export type ProductImage = {
  src: string;
  alt: string;
  category: ImageCategory;
  index: number;
};

// Known image extensions to scan for
const IMAGE_EXTENSIONS = ['jpg', 'jpeg', 'png', 'webp', 'avif'];

// Map of product slugs to their folder names
const SLUG_TO_FOLDER: Record<string, string> = {
  halo: 'halo',
  'sleep-headband': 'rest',
  rest: 'rest',
  wave: 'back',
  back: 'back',
  'neck-massager': 'cervical',
  cervical: 'cervical',
};

// Lifestyle context labels per product (for placeholder alt text)
const LIFESTYLE_CONTEXTS: Record<string, string[]> = {
  halo: ['Durmiendo con la banda', 'Primer plano de la tela', 'Viajando con ella', 'Leyendo en la cama', 'Detalle del altavoz Bluetooth', 'Banda doblada sobre una mesilla', 'Producto dentro de la caja'],
  rest: ['Antes y después de colocarlo', 'Alguien durmiendo de lado', 'Primer plano del material', 'Desde distintos ángulos', 'Mostrando el tamaño real', 'Encima de una cama', 'Junto a otros objetos'],
  cervical: ['Masajeándose el cuello', 'Utilizándolo en el sofá', 'Utilizándolo en una oficina', 'Detalle del tejido', 'Vista trasera', 'Vista lateral', 'Fotografía de la caja', 'Detalle de los botones'],
  back: ['Corrigiendo postura en el trabajo', 'De espalda con el corrector', 'Ajustando las correas', 'Debajo de la ropa', 'En el gimnasio', 'Por detrás', 'Detalle de la malla', 'Plegado para viajar'],
};

// Package contents per product
const PACKAGE_ITEMS: Record<string, string[]> = {
  halo: ['Producto', 'Estuche de viaje', 'Manual de instrucciones'],
  rest: ['Banda de sueño', 'Cable de carga', 'Manual de instrucciones', 'Bolsa de almacenaje'],
  cervical: ['Masajeador cervical', 'Cable USB', 'Manual de usuario'],
  back: ['Corrector postural', 'Manual de instrucciones', 'Guía de tallas'],
};

/**
 * Generate all possible image paths for a product.
 * Returns an object with arrays of paths per category.
 * These are "virtual" paths — the component checks which ones actually exist.
 */
export function getProductImagePaths(slug: string): Record<ImageCategory, string[]> {
  const folder = SLUG_TO_FOLDER[slug] ?? slug;

  return {
    gallery: Array.from({ length: 15 }, (_, i) => `/images/${folder}/gallery/${i + 1}.jpg`)
      .concat(Array.from({ length: 15 }, (_, i) => `/images/${folder}/gallery/${i + 1}.webp`))
      .concat(Array.from({ length: 15 }, (_, i) => `/images/${folder}/gallery/${i + 1}.png`)),
    lifestyle: Array.from({ length: 10 }, (_, i) => `/images/${folder}/lifestyle/${i + 1}.jpg`)
      .concat(Array.from({ length: 10 }, (_, i) => `/images/${folder}/lifestyle/${i + 1}.webp`))
      .concat(Array.from({ length: 10 }, (_, i) => `/images/${folder}/lifestyle/${i + 1}.png`)),
    details: Array.from({ length: 10 }, (_, i) => `/images/${folder}/details/${i + 1}.jpg`)
      .concat(Array.from({ length: 10 }, (_, i) => `/images/${folder}/details/${i + 1}.webp`))
      .concat(Array.from({ length: 10 }, (_, i) => `/images/${folder}/details/${i + 1}.png`)),
    package: Array.from({ length: 8 }, (_, i) => `/images/${folder}/package/${i + 1}.jpg`)
      .concat(Array.from({ length: 8 }, (_, i) => `/images/${folder}/package/${i + 1}.webp`))
      .concat(Array.from({ length: 8 }, (_, i) => `/images/${folder}/package/${i + 1}.png`)),
  };
}

/**
 * Get lifestyle context labels for a product.
 */
export function getLifestyleContexts(slug: string): string[] {
  return LIFESTYLE_CONTEXTS[slug] ?? LIFESTYLE_CONTEXTS.halo;
}

/**
 * Get package item labels for a product.
 */
export function getPackageItems(slug: string): string[] {
  return PACKAGE_ITEMS[slug] ?? PACKAGE_ITEMS.halo;
}

/**
 * Get the folder name for a product slug.
 */
export function getSlugFolder(slug: string): string {
  return SLUG_TO_FOLDER[slug] ?? slug;
}

/**
 * Legacy image paths from catalog (for backward compatibility).
 * Returns images from the old flat structure.
 */
export function getLegacyImages(slug: string): string[] {
  const legacyMap: Record<string, string[]> = {
    halo: [
      '/images/mouthpiece-1.jpg',
      '/images/mouthpiece-2.jpg',
      '/images/mouthpiece-3.jpg',
      '/images/mouthpiece-4.jpg',
      '/images/mouthpiece-5.jpg',
      '/images/mouthpiece-6.jpg',
    ],
    wave: [
      '/images/posture-corrector-1.webp',
      '/images/posture-corrector-2.webp',
      '/images/posture-corrector-3.webp',
      '/images/posture-corrector-4.webp',
      '/images/posture-corrector-5.webp',
      '/images/posture-corrector-6.webp',
    ],
    'sleep-headband': [
      '/images/sleep-headband-1.webp',
      '/images/sleep-headband-2.webp',
      '/images/sleep-headband-3.webp',
      '/images/sleep-headband-4.webp',
      '/images/sleep-headband-5.webp',
      '/images/sleep-headband-6.webp',
    ],
    'neck-massager': [
      '/images/pomelli_creative_image_9_16_0626Masaje2.png',
      '/images/productos-reales/neck-massager.jpg',
      '/images/masajeadorbuenoo1.png',
      '/images/masajeadordeatial2.png',
    ],
  };
  return legacyMap[slug] ?? [];
}
