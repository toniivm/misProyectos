'use client';

// P0-2 HONESTO: este carrusel estaba hardcodeado con 8 reseñas falsas
// (María García, Carlos Ruiz, 4.9 con Math.random(), "Compra verificada" falsa)
// y violaba AGENTS.md NUNCA mostrar datos falsos + riesgo LSSI publicidad engañosa.
// Fix: oculto hasta haber reviews reales en Firestore (reviewStats.total > 0 en ProductDetail).
// Cuando haya reviews reales, conectar a getProductReviews() aquí o eliminar el componente.

interface CustomerReviewsProps {
  slug: string;
}

export default function CustomerReviews({ slug }: CustomerReviewsProps) {
  void slug;
  return null;
}
