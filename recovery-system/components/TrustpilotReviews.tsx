'use client';

// P0-2 HONESTO: componente no usado en ningún page (grep 0 imports) pero
// mostraba fake "4.8/5 · 12,847 reseñas · 98% recomendarían" y 3 reviews
// inventadas María/Carlos/Laura con "Compra verificada" falsa.
// Fix: deshabilitado hasta conectar Trustpilot API real o Firestore aggregateRating.
// Para mostrar prueba social real, usar reviewStats de reviews-firestore.ts cuando total > 0.

export default function TrustpilotReviews() {
  return null;
}
