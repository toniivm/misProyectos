'use client'

import { useState, useMemo, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { useLocale, useTranslations } from 'next-intl'
import { useRouter, usePathname } from 'next/navigation'
import { useAuth } from '../context/AuthContext'
import {
  ShoppingCart,
  Search,
  Star,
  Check,
  ChevronRight,
  Shield,
  Truck,
  RotateCcw,
  Headphones,
  X,
  TrendingUp,
  Zap,
  Package,
  User,
  LogOut,
  PackageCheck,
} from 'lucide-react'
import { useCart } from '../context/CartContext'
import {
  CATALOG,
  CATEGORIES,
  getBestSellers,
  getDeals,
  getLocalizedCategoryName,
  getLocalizedProductName,
  getLocalizedProductShortDescription,
  searchProducts,
  type CatalogProduct,
} from '../lib/catalog'

const SHOP_HOME_COPY = {
  en: {
    searchPlaceholder: 'Search sleep headbands, massage guns, eye masks...',
    addLabel: 'Add',
    addedLabel: 'Added',
    cartLabel: 'Cart',
    cartItemSingular: 'item',
    cartItemPlural: 'items',
    switchLabel: 'ES',
    switchAria: 'Switch to Spanish',
    announcement: [
      'Free shipping on every order',
      '4.9 stars - 6,000+ happy customers',
      '30-day return guarantee, no questions asked',
      'Secure checkout via Stripe',
      'Ships within 24 hours',
    ],
    heroSubtitle:
      'A sleep and recovery store built around what people actually feel every day: poor sleep, neck tension, sore muscles and travel fatigue. Premium hardware, cleaner routines and less guesswork.',
    heroQuickLinks: [
      { emoji: '😴', label: "Can't switch off", slug: 'sleep-audio' },
      { emoji: '🦴', label: 'Desk neck tension', slug: 'neck-recovery' },
      { emoji: '💆', label: 'Heavy legs and sore muscles', slug: 'muscle-recovery' },
      { emoji: '✈️', label: 'Flights and hotel nights', slug: 'travel' },
    ],
    heroPrimary: 'Shop all products',
    heroSecondaryPrefix: 'Explore',
    heroAudience: [
      { value: 'Side sleepers', label: 'sleep-first essentials' },
      { value: 'Desk workers', label: 'neck and posture relief' },
      { value: 'Frequent flyers', label: 'portable recovery gear' },
    ],
    flagshipBadge: 'Flagship product',
    flagshipDescription:
      'The easiest entry point into better sleep: soft audio, no hard earbuds, nightly comfort.',
    lifestyleShots: [
      {
        src: '/images/sleepband-lifestyle-clean.png',
        title: 'Faster wind-down',
        copy: 'Soft audio at night without hard earbuds',
        objectPosition: '50% 78%',
      },
      {
        src: '/images/sleepband-product-clean.png',
        title: 'Clean hardware',
        copy: 'Low-profile comfort built for nightly use',
        objectPosition: '50% 52%',
      },
      {
        src: '/images/sleepband-sport-clean.png',
        title: 'Travel ready',
        copy: 'Portable recovery for flights, hotels and naps',
        objectPosition: '58% 36%',
      },
    ],
    trustItems: [
      { icon: Truck, label: 'Free shipping', sub: 'On all orders' },
      { icon: RotateCcw, label: '30-day returns', sub: 'No questions asked' },
      { icon: Shield, label: 'Secure checkout', sub: 'SSL + Stripe encrypted' },
      { icon: Star, label: '4.9 average', sub: '6,000+ verified reviews' },
    ],
    starterHeading: 'Start with the routine that matches your problem.',
    starterDescription:
      'Instead of browsing randomly, begin with the type of recovery you need most.',
    starterTag: 'Curated start',
    starterCta: 'Shop this routine',
    starterRoutines: [
      {
        title: 'Night reset',
        slug: 'sleep-audio',
        accent: '😴',
        copy: 'For people who cannot switch off, sleep through noise, or wear hard earbuds in bed.',
        picks: ['Noctive Halo', 'Noctive Wave', 'Sleep Headband'],
      },
      {
        title: 'Daily relief',
        slug: 'neck-recovery',
        accent: '🦴',
        copy: 'For stiff necks, screen-heavy routines, and anyone who needs to decompress after a long day.',
        picks: ['Neck Massager', 'Noctive Calm Mask'],
      },
    ],
    problemHeading: 'One store. Every recovery need.',
    problemDescription: 'Find the right product for your specific problem.',
    problemCards: [
      {
        emoji: '😴',
        problem: "Can't sleep?",
        solution: 'Sleep & Audio',
        description:
          'Bluetooth sleep headbands, white noise machines and ambient sound systems. Fall asleep faster, stay asleep longer.',
        slug: 'sleep-audio',
        colorFrom: '#0d1828',
        colorTo: '#0c1520',
        borderColor: '#1e3a5f',
        borderHover: '#2a5080',
      },
      {
        emoji: '🦴',
        problem: 'Neck or back pain?',
        solution: 'Neck & Recovery',
        description:
          'Neck massagers with heat therapy. Undo hours at a desk in minutes.',
        slug: 'neck-recovery',
        colorFrom: '#0d1f1a',
        colorTo: '#0c1520',
        borderColor: '#1a3d2e',
        borderHover: '#246040',
      },
      {
        emoji: '🌙',
        problem: 'Need deeper relaxation?',
        solution: 'Sensory & Relaxation',
        description:
          'Weighted sleep masks and sensory tools for faster, deeper relaxation at home.',
        slug: 'sensory',
        colorFrom: '#1a1020',
        colorTo: '#0c1520',
        borderColor: '#3a1f5f',
        borderHover: '#5a3080',
      },
    ],
    problemCta: 'Shop now',
    stepsHeading: 'How it works',
    steps: [
      {
        step: '01',
        icon: '🎯',
        title: 'Pick your problem',
        text: 'Browse by category: sleep, pain relief, muscle recovery or travel. Every product targets a specific daily issue.',
      },
      {
        step: '02',
        icon: '📦',
        title: 'Order today, ships tomorrow',
        text: 'Every order ships within 24 hours with free tracked delivery across Europe. Typically arrives in 3-5 days.',
      },
      {
        step: '03',
        icon: '✨',
        title: '30-night guarantee',
        text: "Try it for a month. If you don't feel the difference, contact us for a full refund. Zero risk.",
      },
    ],
    recoveryTag: 'Recovery made practical',
    recoveryHeading: 'Premium tools that fit into real routines.',
    recoveryBody:
      'The reference you shared is strong because it explains the product with images, small proof blocks and clear use cases. We are applying that same structure here, but translated into a calmer recovery brand: less playful, more premium, more sleep-focused.',
    recoveryHighlights: [
      {
        title: 'Use it every night',
        copy: 'Audio sleep gear and eye masks designed for repeated, low-friction use instead of one-off gimmicks.',
      },
      {
        title: 'Portable enough to travel',
        copy: 'Compact products for planes, hotels, post-gym recovery and quick resets between long work days.',
      },
      {
        title: 'Built around specific problems',
        copy: 'Each category is organized by what you feel first: poor sleep, stiff neck, sore muscles or travel fatigue.',
      },
    ],
    recoveryCta: 'See flagship routine',
    categoriesHeading: 'Shop by Category',
    productSingular: 'product',
    productPlural: 'products',
    bestSellersHeading: 'Best Sellers',
    dealsHeading: 'Deals & Trending',
    allProductsHeading: 'All Products',
    viewAll: 'View all',
    bundleTag: 'Bundle & Save',
    bundleHeading: 'Build your complete recovery system',
    bundleDescription:
      'Combine massage, neck relief and sleep audio into one routine. Bundle discounts applied automatically at checkout.',
    bundlePrimary: 'Shop all products',
    bundleSecondary: 'Go to checkout',
    socialHeading: 'What customers say',
    verifiedPurchase: 'Verified purchase',
    reviews: [
      {
        text: 'I bought it because of the price and didn\'t expect much, but the headband is comfortable and the sound is clear. I fall asleep much faster now.',
        author: 'Andrea L.',
        role: 'Student',
        stars: 5,
        product: 'Noctive Halo',
      },
      {
        text: 'I get neck tightness from working on the computer all day. After using the Neck Massager 15 min a day, the difference is noticeable. Worth it.',
        author: 'Miguel Á.',
        role: 'IT Specialist',
        stars: 4,
        product: 'Neck Massager',
      },
      {
        text: 'Noctive Halo has been a game changer for my sleep. It\'s comfortable and the sound quality is great. I fall asleep much faster.',
        author: 'Carla F.',
        role: 'Fitness enthusiast',
        stars: 5,
        product: 'Noctive Halo',
      },
      {
        text: 'I was skeptical but the weighted mask helps me relax so much faster. The gentle pressure is really calming. Great value for this price.',
        author: 'Laura P.',
        role: 'New mom',
        stars: 4,
        product: 'Noctive Calm Mask',
      },
      {
        text: 'I travel a lot for work and this pillow is a game changer. Packs down tiny and gives proper neck support on long flights.',
        author: 'David R.',
        role: 'Consultant',
        stars: 5,
        product: 'Noctive Wave',
      },
      {
        text: 'I live on a ground floor and street noise was a problem. This white noise machine masks everything. My sleep has improved dramatically.',
        author: 'Sara M.',
        role: 'Teacher',
        stars: 4,
        product: 'Noctive Wave',
      },
    ],
    galleryAlt: 'Noctas product scene',
    buyerMomentsTag: 'Real-world visuals',
    buyerMomentsHeading: 'A store that shows the routine, not just the product.',
    buyerMomentsBody:
      'This is the core lesson from the references: customers need to see context, lifestyle and use-case clarity. So the store now mixes product blocks with real imagery, trust signals and direct explanations instead of relying only on catalog cards.',
    buyerMomentsMetrics: [
      { value: 'Sleep', label: 'audio and sensory products' },
      { value: 'Relief', label: 'neck and muscle recovery' },
      { value: 'Travel', label: 'portable calm on demand' },
    ],
    buyerMomentsCta: 'Browse the full store',
    faqHeading: 'Frequently asked questions',
    faqs: [
      {
        q: 'How long does shipping take?',
        a: 'Standard orders ship within 24 hours and arrive in 3-5 business days across Europe. Express 1-2 day shipping is available at checkout.',
      },
      {
        q: 'What is your return policy?',
        a: 'Try any product for 30 nights. If it does not work for you, contact us for a free return and full refund with no questions asked.',
      },
      {
        q: 'Are the products compatible with all devices?',
        a: 'Bluetooth products connect via Bluetooth 5.0 to any smartphone, tablet or computer. USB-C products charge with any standard USB-C cable.',
      },
      {
        q: 'Is checkout secure?',
        a: 'Yes. All payments are processed through Stripe with SSL encryption. We never store your card details.',
      },
      {
        q: 'Can I track my order?',
        a: 'Yes. You will receive a tracking email within 24 hours of your order shipping. All shipments include real-time tracking.',
      },
      {
        q: 'Do you offer bundles?',
        a: 'Yes. Add multiple products to your cart and bundle discounts are applied automatically. You can also contact us for custom bundle quotes.',
      },
    ],
    footerTagline: 'Premium sleep and recovery products for daily wellness.',
    footerCategories: 'Categories',
    footerSupport: 'Support',
    footerPolicies: 'Policies',
    supportLinks: ['Contact us', 'Track your order', 'Return a product', 'Warranty info'],
    policyLinks: ['Shipping policy', 'Return policy', 'Privacy policy', 'Terms of service'],
    footerRights: '© 2026 Noctas™. All rights reserved.',
    footerSecurity: 'SSL Secure · Stripe Payments',
    mobileCta: 'Shop now',
    badgeLabels: {
      bestseller: 'Best Seller',
      new: 'New',
      deal: 'Deal',
      trending: 'Trending',
    },
  },
  es: {
    searchPlaceholder: 'Busca bandas de sueño, masajeadores, antifaces...',
    addLabel: 'Añadir',
    addedLabel: 'Añadido',
    cartLabel: 'Carrito',
    cartItemSingular: 'artículo',
    cartItemPlural: 'artículos',
    switchLabel: 'EN',
    switchAria: 'Switch to English',
    announcement: [
      'Envío gratis en todos los pedidos',
      '4,9 estrellas - más de 6.000 clientes satisfechos',
      'Garantía de devolución de 30 días, sin preguntas',
      'Pago seguro con Stripe',
      'Envío en 24 horas',
    ],
    heroSubtitle:
      'Una tienda de sueño y recuperación creada alrededor de lo que la gente siente cada día: mal descanso, tensión cervical, músculos cargados y fatiga de viaje. Herramientas premium, rutinas más limpias y menos improvisación.',
    heroQuickLinks: [
      { emoji: '😴', label: 'No consigues desconectar', slug: 'sleep-audio' },
      { emoji: '🦴', label: 'Tensión de cuello por escritorio', slug: 'neck-recovery' },
      { emoji: '💆', label: 'Piernas pesadas y músculos cargados', slug: 'muscle-recovery' },
      { emoji: '✈️', label: 'Vuelos y noches de hotel', slug: 'travel' },
    ],
    heroPrimary: 'Ver todos los productos',
    heroSecondaryPrefix: 'Explorar',
    heroAudience: [
      { value: 'Quienes duermen de lado', label: 'imprescindibles para descansar mejor' },
      { value: 'Trabajo de escritorio', label: 'alivio cervical y postural' },
      { value: 'Viajeros frecuentes', label: 'recuperación portátil' },
    ],
    flagshipBadge: 'Producto insignia',
    flagshipDescription:
      'La forma más fácil de dormir mejor: audio suave, sin auriculares duros y con comodidad cada noche.',
    lifestyleShots: [
      {
        src: '/images/sleepband-lifestyle-clean.png',
        title: 'Desconecta más rápido',
        copy: 'Audio suave por la noche sin auriculares rígidos',
        objectPosition: '50% 78%',
      },
      {
        src: '/images/sleepband-product-clean.png',
        title: 'Hardware limpio',
        copy: 'Confort discreto pensado para uso diario',
        objectPosition: '50% 52%',
      },
      {
        src: '/images/sleepband-sport-clean.png',
        title: 'Listo para viajar',
        copy: 'Recuperación portátil para vuelos, hoteles y siestas',
        objectPosition: '58% 36%',
      },
    ],
    trustItems: [
      { icon: Truck, label: 'Envío gratis', sub: 'En todos los pedidos' },
      { icon: RotateCcw, label: 'Devoluciones 30 días', sub: 'Sin preguntas' },
      { icon: Shield, label: 'Pago seguro', sub: 'SSL + Stripe cifrado' },
      { icon: Star, label: 'Media de 4,9', sub: 'Más de 6.000 reseñas verificadas' },
    ],
    starterHeading: 'Empieza por la rutina que encaja con tu problema.',
    starterDescription:
      'En vez de navegar al azar, comienza por el tipo de recuperación que más necesitas.',
    starterTag: 'Inicio guiado',
    starterCta: 'Ver esta rutina',
    starterRoutines: [
      {
        title: 'Reset nocturno',
        slug: 'sleep-audio',
        accent: '😴',
        copy: 'Para personas que no logran desconectar, duermen con ruido o no soportan auriculares rígidos en la cama.',
        picks: ['Noctive Halo', 'Noctive Wave', 'Sleep Headband'],
      },
      {
        title: 'Alivio diario',
        slug: 'neck-recovery',
        accent: '🦴',
        copy: 'Para cuellos rígidos, rutinas cargadas de pantalla y quien necesita desconectar después de un día largo.',
        picks: ['Neck Massager', 'Noctive Calm Mask'],
      },
    ],
    problemHeading: 'Una tienda. Cada necesidad de recuperación.',
    problemDescription: 'Encuentra el producto adecuado para tu problema concreto.',
    problemCards: [
      {
        emoji: '😴',
        problem: '¿No puedes dormir?',
        solution: 'Sueño y audio',
        description: 'Bandas Bluetooth para dormir, máquinas de ruido blanco y sistemas de sonido ambiental.',
        slug: 'sleep-audio',
        colorFrom: '#0d1828', colorTo: '#0c1520', borderColor: '#1e3a5f', borderHover: '#2a5080',
      },
      {
        emoji: '🦴',
        problem: '¿Dolor de cuello o espalda?',
        solution: 'Cuello y recuperación',
        description: 'Masajeadores de cuello con calor. Revierte horas de escritorio en minutos.',
        slug: 'neck-recovery',
        colorFrom: '#0d1f1a', colorTo: '#0c1520', borderColor: '#1a3d2e', borderHover: '#246040',
      },
      {
        emoji: '🌙',
        problem: '¿Necesitas relajarte más?',
        solution: 'Sensorial y relajación',
        description: 'Antifaces con peso para una relajación más rápida y profunda en casa.',
        slug: 'sensory',
        colorFrom: '#1a1020', colorTo: '#0c1520', borderColor: '#3a1f5f', borderHover: '#5a3080',
      },
    ],
    problemCta: 'Comprar ahora',
    stepsHeading: 'Cómo funciona',
    steps: [
      { step: '01', icon: '🎯', title: 'Elige tu problema', text: 'Compra por categoría: sueño, alivio o relajación. Cada producto resuelve una necesidad diaria concreta.' },
      { step: '02', icon: '📦', title: 'Pídelo hoy, sale mañana', text: 'Cada pedido sale en 24 horas con envío gratis y seguimiento. Normalmente llega en 3-5 días.' },
      { step: '03', icon: '✨', title: 'Garantía de 30 noches', text: 'Pruébalo durante un mes. Si no notas la diferencia, te devolvemos el dinero. Sin riesgo.' },
    ],
    recoveryTag: 'Recuperación práctica',
    recoveryHeading: 'Herramientas premium que encajan en rutinas reales.',
    recoveryBody: 'Aplicamos la misma estructura de las mejores tiendas: beneficios claros, imágenes reales y confianza para comprar sin dudar.',
    recoveryHighlights: [
      { title: 'Úsalo cada noche', copy: 'Equipos de audio para dormir y antifaces pensados para uso repetido, no para ser un truco puntual.' },
      { title: 'Portátil para viajar', copy: 'Productos compactos para aviones, hoteles, post-entreno y pequeños resets entre jornadas.' },
      { title: 'Organizado por problemas reales', copy: 'Cada categoría empieza por lo que sientes primero: mal sueño, cuello rígido o estrés acumulado.' },
    ],
    recoveryCta: 'Ver rutina principal',
    galleryAlt: 'Escena de producto de Noctas',
    buyerMomentsTag: 'Visuales de uso real',
    buyerMomentsHeading: 'Una tienda que enseña la rutina, no solo el producto.',
    buyerMomentsBody:
      'Esta es la lección central de las referencias: los clientes necesitan ver contexto, estilo de vida y claridad de uso. Por eso la tienda mezcla bloques de producto con imágenes reales, señales de confianza y explicaciones directas en lugar de depender solo de tarjetas de catálogo.',
    buyerMomentsMetrics: [
      { value: 'Sueño', label: 'audio y productos sensoriales' },
      { value: 'Alivio', label: 'recuperación cervical y muscular' },
      { value: 'Viaje', label: 'calma portátil al instante' },
    ],
    buyerMomentsCta: 'Explorar toda la tienda',
    categoriesHeading: 'Comprar por categoría',
    productSingular: 'producto',
    productPlural: 'productos',
    bestSellersHeading: 'Más vendidos',
    dealsHeading: 'Ofertas y tendencia',
    allProductsHeading: 'Todos los productos',
    viewAll: 'Ver todo',
    faqHeading: 'Preguntas frecuentes',
    faqs: [
      {
        q: '¿Cuánto tarda el envío?',
        a: 'Los pedidos estándar salen en 24 horas y llegan en 3-5 días laborables dentro de Europa. En el checkout también puedes elegir envío exprés de 1-2 días.',
      },
      {
        q: '¿Cuál es vuestra política de devoluciones?',
        a: 'Prueba cualquier producto durante 30 noches. Si no te funciona, contáctanos y gestionamos la devolución y el reembolso completo.',
      },
      {
        q: '¿Los productos son compatibles con cualquier dispositivo?',
        a: 'Los productos Bluetooth se conectan por Bluetooth 5.0 a cualquier móvil, tablet u ordenador. Los productos USB-C cargan con cualquier cable USB-C estándar.',
      },
      {
        q: '¿El checkout es seguro?',
        a: 'Sí. Todos los pagos se procesan con Stripe y cifrado SSL. Nunca almacenamos los datos de tu tarjeta.',
      },
      {
        q: '¿Puedo seguir mi pedido?',
        a: 'Sí. Recibirás un correo con seguimiento dentro de las 24 horas posteriores al envío. Todos los pedidos incluyen tracking en tiempo real.',
      },
      {
        q: '¿Ofrecéis packs o bundles?',
        a: 'Sí. Añade varios productos al carrito y los descuentos de bundle se aplican automáticamente. Si quieres una combinación concreta, también puedes escribirnos.',
      },
    ],
    socialHeading: 'Lo que dicen los clientes',
    verifiedPurchase: 'Compra verificada',
    reviews: [
      {
        text: 'Lo compré por el precio y no esperaba mucho, pero la cinta es cómoda y el sonido se escucha bien. Me duermo mucho más rápido.',
        author: 'Andrea L.', role: 'Estudiante', stars: 5, product: 'Noctive Halo',
      },
      {
        text: 'Tengo contracturas en el cuello por el ordenador. Desde que uso el masajeador 15 min al día, he notado mucha mejora. Merece la pena.',
        author: 'Miguel Á.', role: 'Informático', stars: 4, product: 'Masajeador de cuello',
      },
      {
        text: 'Noctive Halo me ha cambiado el sueño. Es cómoda y el sonido se escucha genial. Me duermo mucho más rápido desde que la uso.',
        author: 'Carla F.', role: 'Deportista amateur', stars: 5, product: 'Noctive Halo',
      },
      {
        text: 'Tenía dudas pero el antifaz con peso me ayuda a relajarme mucho más rápido. La presión suave es muy calmante. Por este precio, muy bien.',
        author: 'Laura P.', role: 'Madre primeriza', stars: 4, product: 'Noctive Calm Mask',
      },
      {
        text: 'Viajo mucho por trabajo y la cinta de sueño me permite dormir en cualquier sitio. Muy portátil y cómoda.',
        author: 'David R.', role: 'Consultor', stars: 5, product: 'Sleep Headband',
      },
      {
        text: 'Vivo en un bajo y entra ruido de la calle. La máquina de ruido blanco lo tapa todo. Mi sueño ha mejorado un montón.',
        author: 'Sara M.', role: 'Profesora', stars: 4, product: 'Noctive Wave',
      },
    ],
    bundleTag: 'Bundle',
    bundleHeading: 'Ahorra con packs',
    bundleDescription: 'Construye tu sistema completo de recuperación combinando masaje, alivio cervical y audio para dormir en una sola rutina.',
    bundlePrimary: 'Ver todos los productos',
    bundleSecondary: 'Ir al checkout',
    footerTagline: 'Productos premium de sueño y recuperación para el bienestar diario.',
    footerCategories: 'Categorías',
    footerSupport: 'Ayuda',
    footerPolicies: 'Políticas',
    supportLinks: ['Contáctanos', 'Sigue tu pedido', 'Devolver un producto', 'Información de garantía'],
    policyLinks: ['Política de envíos', 'Política de devoluciones', 'Política de privacidad', 'Términos del servicio'],
    footerRights: '© 2026 Noctas™. Todos los derechos reservados.',
    footerSecurity: 'SSL seguro · Pagos con Stripe',
    mobileCta: 'Comprar ahora',
    badgeLabels: {
      bestseller: 'Más vendido',
      new: 'Nuevo',
      deal: 'Oferta',
      trending: 'Tendencia',
    },
  },
} as const

function getShopHomeCopy(locale: string) {
  return locale === 'es' ? SHOP_HOME_COPY.es : SHOP_HOME_COPY.en
}

function getProductCountLabel(count: number, locale: string) {
  const copy = getShopHomeCopy(locale)
  return `${count} ${count === 1 ? copy.productSingular : copy.productPlural}`
}

function Stars({ rating, size = 12 }: { rating: number; size?: number }) {
  return (
    <span className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          size={size}
          className={i <= Math.round(rating) ? 'fill-amber-400 text-amber-400' : 'fill-transparent text-white/20'}
        />
      ))}
    </span>
  )
}

function Badge({ type, locale }: { type: CatalogProduct['badge']; locale: string }) {
  if (!type) return null
  const copy = getShopHomeCopy(locale)
  const map = {
    bestseller: { label: copy.badgeLabels.bestseller, cls: 'bg-amber-400/15 text-amber-300 border-amber-400/25' },
    new: { label: copy.badgeLabels.new, cls: 'bg-emerald-400/15 text-emerald-300 border-emerald-400/25' },
    deal: { label: copy.badgeLabels.deal, cls: 'bg-rose-400/15 text-rose-300 border-rose-400/25' },
    trending: { label: copy.badgeLabels.trending, cls: 'bg-violet-400/15 text-violet-300 border-violet-400/25' },
  }
  const badge = map[type]
  return (
    <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.1em] ${badge.cls}`}>
      {badge.label}
    </span>
  )
}

function ProductCard({ product, locale }: { product: CatalogProduct; locale: string }) {
  const { add, open: openCart } = useCart()
  const [added, setAdded] = useState(false)
  const copy = getShopHomeCopy(locale)
  const productName = getLocalizedProductName(product, locale)
  const productDescription = getLocalizedProductShortDescription(product, locale)

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault()
    add({ slug: product.slug, name: productName, price: product.price, icon: product.cartIcon })
    setAdded(true)
    openCart()
    setTimeout(() => setAdded(false), 2000)
  }

  const savings = Math.round(((product.comparePrice - product.price) / product.comparePrice) * 100)

  return (
    <Link href={`/${locale}/products/${product.slug}`} className="group block">
      <div className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/[0.07] bg-[#0d1219] transition-all duration-300 hover:border-white/[0.14] hover:shadow-[0_16px_40px_rgba(0,0,0,0.3)]">
        <div className="relative flex h-44 items-center justify-center overflow-hidden" style={{ background: product.color }}>
          {product.images ? (
            <img src={product.images[0]} alt={productName} className="h-full w-full object-cover" style={{ objectPosition: '50% 5%' }} />
          ) : (
            <span className="text-5xl opacity-60 transition-transform duration-300 group-hover:scale-110">{product.icon}</span>
          )}
          {product.badge && (
            <div className="absolute left-3 top-3">
              <Badge type={product.badge} locale={locale} />
            </div>
          )}
          <div className="absolute right-3 top-3 rounded-full border border-white/10 bg-[#0c1016]/60 px-2 py-0.5 text-[11px] font-medium text-white/70 backdrop-blur-sm">
            -{savings}%
          </div>
        </div>

        <div className="flex flex-1 flex-col gap-2 p-4">
          <div className="flex items-center gap-1.5">
            <Stars rating={product.rating} />
            <span className="text-[11px] text-[#8791a1]">
              {product.rating} ({product.reviewCount.toLocaleString(locale === 'es' ? 'es-ES' : 'en-US')})
            </span>
          </div>

          <h3 className="text-[15px] font-semibold leading-snug text-[#f2eee7] group-hover:text-white">{productName}</h3>

          <p className="line-clamp-2 text-[12px] leading-5 text-[#8791a1]">{productDescription}</p>

          <div className="mt-auto flex items-end justify-between gap-2 pt-3">
            <div>
              <span className="text-[18px] font-bold text-[#f2eee7]">€{product.price}</span>
              <span className="ml-2 text-[12px] text-[#4a5568] line-through">€{product.comparePrice}</span>
            </div>

            <button
              onClick={handleAdd}
              className={`flex items-center gap-1.5 rounded-full px-3.5 py-2 text-[12px] font-semibold transition-all duration-200 ${
                added
                  ? 'border border-emerald-500/30 bg-emerald-500/20 text-emerald-300'
                  : 'bg-[#f2eee7] text-[#11161d] hover:bg-white hover:shadow-[0_4px_12px_rgba(242,238,231,0.2)]'
              }`}
            >
              {added ? (
                <>
                  <Check size={12} />
                  {copy.addedLabel}
                </>
              ) : (
                <>
                  <ShoppingCart size={12} />
                  {copy.addLabel}
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </Link>
  )
}

function UserMenu({ locale, t }: { locale: string; t: (key: string) => string }) {
  const auth = useAuth()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const isEs = locale === 'es'

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  if (!auth.user) {
    return (
      <button
        onClick={() => auth.openModal()}
        className="inline-flex items-center gap-2 rounded-md border border-white/[0.04] bg-white/[0.02] px-3 py-2 text-sm text-[#c8d4e2] transition hover:text-white"
      >
        {t('nav.login')}
      </button>
    )
  }

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="inline-flex items-center gap-2 rounded-md border border-white/[0.04] bg-white/[0.02] px-3 py-2 text-sm text-[#c8d4e2] transition hover:text-white"
      >
        <User size={14} />
        <span className="hidden sm:inline max-w-[100px] truncate">
          {auth.user.displayName || auth.user.email?.split('@')[0] || (isEs ? 'Cuenta' : 'Account')}
        </span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.12 }}
            className="absolute right-0 top-full z-50 mt-2 w-52 overflow-hidden rounded-xl border border-white/[0.1] bg-[#0d1219] shadow-[0_16px_48px_rgba(0,0,0,0.5)]"
          >
            <Link
              href={`/${locale}/account/orders`}
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 px-4 py-3 text-sm text-[#c8d4e2] transition hover:bg-white/[0.04] hover:text-white"
            >
              <PackageCheck size={14} className="text-[#8ea7c7]" />
              {t('account.myOrders')}
            </Link>
            <button
              onClick={() => {
                setOpen(false)
                auth.logout()
              }}
              className="flex w-full items-center gap-3 px-4 py-3 text-sm text-[#c8d4e2] transition hover:bg-white/[0.04] hover:text-white border-t border-white/[0.06]"
            >
              <LogOut size={14} className="text-[#6b7785]" />
              {t('nav.logout')}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function SearchBar({ locale }: { locale: string }) {
  const [query, setQuery] = useState('')
  const [focused, setFocused] = useState(false)
  const router = useRouter()
  const inputRef = useRef<HTMLInputElement>(null)
  const wrapRef = useRef<HTMLDivElement>(null)
  const copy = getShopHomeCopy(locale)

  const results = useMemo(() => searchProducts(query), [query])

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setFocused(false)
      }
    }

    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      setFocused(false)
      router.push(`/${locale}/shop/search?q=${encodeURIComponent(query.trim())}`)
    }
  }

  return (
    <div ref={wrapRef} className="relative w-full max-w-2xl">
      <form onSubmit={handleSubmit} className="relative">
        <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6b7785]" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setFocused(true)}
          placeholder={copy.searchPlaceholder}
          className="w-full rounded-full border border-white/[0.1] bg-[#111720] py-3 pl-11 pr-10 text-[14px] text-[#f2eee7] placeholder:text-[#4a5568] outline-none transition-all duration-200 focus:border-white/[0.22] focus:bg-[#141c26] focus:shadow-[0_0_0_3px_rgba(255,255,255,0.04)]"
        />
        {query && (
          <button
            type="button"
            onClick={() => {
              setQuery('')
              inputRef.current?.focus()
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-[#6b7785] hover:text-white"
          >
            <X size={14} />
          </button>
        )}
      </form>

      <AnimatePresence>
        {focused && results.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.15 }}
            className="absolute left-0 right-0 top-full z-50 mt-2 overflow-hidden rounded-2xl border border-white/[0.1] bg-[#0d1219] shadow-[0_16px_48px_rgba(0,0,0,0.5)]"
          >
            {results.map((product) => (
              <Link
                key={product.slug}
                href={`/${locale}/products/${product.slug}`}
                onClick={() => {
                  setFocused(false)
                  setQuery('')
                }}
                className="flex items-center gap-3 px-4 py-3 transition-colors hover:bg-white/[0.04]"
              >
                <span className="text-xl">{product.icon}</span>
                <div className="min-w-0 flex-1">
                  <div className="truncate text-[13px] font-medium text-[#f2eee7]">{getLocalizedProductName(product, locale)}</div>
                  <div className="truncate text-[11px] text-[#8791a1]">{getLocalizedProductShortDescription(product, locale)}</div>
                </div>
                <span className="shrink-0 text-[13px] font-semibold text-[#f2eee7]">€{product.price}</span>
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function ShopHomePage() {
  const locale = useLocale()
  const t = useTranslations()
  const copy = getShopHomeCopy(locale)
  const { totalItems, open: openCart } = useCart()
  const rawPathname = usePathname() || '/'
  const switchHref = (() => {
    let p = rawPathname
    if (!p.startsWith('/')) p = '/' + p
    if (/^\/es(\/|$)/.test(p)) return p.replace(/^\/es/, '/en')
    if (/^\/en(\/|$)/.test(p)) return p.replace(/^\/en/, '/es')
    const other = locale === 'es' ? 'en' : 'es'
    return `/${other}${p === '/' ? '/' : p}`
  })()
  const bestSellers = getBestSellers()
  const deals = getDeals()
  const allProducts = CATALOG
  const flagship = CATALOG.find((product) => product.slug === 'sleepband-pro') ?? bestSellers[0]
  const flagshipName = getLocalizedProductName(flagship, locale)

  return (
    <div className="min-h-screen bg-[#0c1016] text-[#f4f1ea]">
      <div className="overflow-hidden border-b border-white/[0.05] bg-[#0d1520] py-2.5">
        <motion.div
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 28, ease: 'linear', repeat: Infinity }}
          className="flex w-max items-center gap-10"
        >
          {[...copy.announcement, ...copy.announcement].map((msg, index) => (
            <span key={`${msg}-${index}`} className="shrink-0 text-[11px] font-medium uppercase tracking-[0.14em] text-[#8791a1]">
              {msg}
            </span>
          ))}
        </motion.div>
      </div>

      <header className="sticky top-0 z-50 border-b border-white/[0.07] bg-[rgba(12,16,22,0.92)] backdrop-blur-xl">
        <div className="mx-auto max-w-[1280px] px-4 sm:px-6">
          <div className="flex h-16 items-center gap-4">
            <Link href={`/${locale}`} className="flex shrink-0 items-center gap-2.5">
              <div className="grid h-7 w-7 grid-cols-2 gap-[3px] rounded-lg border border-white/10 bg-white/[0.04] p-1">
                <span className="rounded-[3px] bg-[#cfd8e6]" />
                <span className="rounded-[3px] bg-[#8da3c4]" />
                <span className="rounded-[3px] bg-[#7186a4]" />
                <span className="rounded-[3px] bg-[#d8d0c4]" />
              </div>
              <span className="hidden text-[12px] font-bold uppercase tracking-[0.2em] text-[#f2eee7] sm:block">Noctas</span>
            </Link>

            <div className="mx-auto max-w-2xl flex-1">
              <SearchBar locale={locale} />
            </div>

            <div className="flex shrink-0 items-center gap-2">
              <a
                href={switchHref}
                aria-label={copy.switchAria}
                className="inline-flex items-center rounded-md px-2 py-1 text-xs text-[#9aa7b9] hover:text-white"
              >
                {copy.switchLabel}
              </a>

              <UserMenu locale={locale} t={t} />

              <button
                onClick={openCart}
                aria-label={`${copy.cartLabel} - ${totalItems} ${totalItems === 1 ? copy.cartItemSingular : copy.cartItemPlural}`}
                className="relative z-40 flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-[#c8d4e2] transition hover:border-white/20 hover:bg-white/[0.08]"
              >
                <ShoppingCart size={15} />
                {totalItems > 0 && (
                  <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#f2eee7] text-[9px] font-bold text-[#11161d]">
                    {totalItems}
                  </span>
                )}
              </button>
            </div>
          </div>

          <div className="flex items-center gap-1 overflow-x-auto pb-3 scrollbar-none">
            {CATEGORIES.map((category) => (
              <Link
                key={category.id}
                href={`/${locale}/shop/${category.slug}`}
                className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-white/[0.07] bg-white/[0.03] px-3 py-1.5 text-[11px] font-medium text-[#9aa7b9] transition hover:border-white/[0.15] hover:bg-white/[0.07] hover:text-[#f2eee7]"
              >
                <span>{category.icon}</span>
                {getLocalizedCategoryName(category, locale)}
              </Link>
            ))}
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-[1280px] px-4 pb-24 sm:px-6">
        <section className="relative overflow-hidden pb-12 pt-10 sm:pb-16 sm:pt-16">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_15%_50%,rgba(20,48,90,0.16),transparent)]" />

          <div className="relative overflow-hidden rounded-[32px] border border-white/[0.08] bg-[linear-gradient(135deg,rgba(13,18,25,0.98),rgba(10,15,22,0.94))] shadow-[0_24px_80px_rgba(0,0,0,0.35)]">
            <div className="grid gap-8 lg:grid-cols-[minmax(0,0.88fr)_minmax(0,1.12fr)] lg:items-stretch">
              <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="flex flex-col justify-center p-8 sm:p-10 lg:p-12">
                <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/[0.1] bg-white/[0.04] px-3.5 py-1.5">
                  <Headphones size={12} className="text-[#8ea7c7]" />
                  <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#9aa7b9]">{t('hero.kicker')}</span>
                </div>

                <h1 className="text-[clamp(2.35rem,5.4vw,4.35rem)] font-bold leading-[1.02] tracking-[-0.045em] text-[#f6f2eb]">
                  {t('hero.line1')}
                  <br />
                  {t('hero.line2')}
                </h1>

                <p className="mt-5 max-w-xl text-[15px] leading-8 text-[#8791a1]">{copy.heroSubtitle}</p>

                <div className="mt-6 flex flex-wrap gap-2">
                  {copy.heroQuickLinks.map((item) => (
                    <Link key={item.slug} href={`/${locale}/shop/${item.slug}`} className="group inline-flex items-center gap-1.5 rounded-full border border-white/[0.09] bg-white/[0.03] px-3.5 py-2 text-[12px] font-medium text-[#b8c4d0] transition hover:border-white/[0.18] hover:bg-white/[0.07] hover:text-white">
                      <span>{item.emoji}</span>
                      {item.label}
                      <ChevronRight size={12} className="opacity-30 group-hover:opacity-70" />
                    </Link>
                  ))}
                </div>

                <div className="mt-7 flex flex-wrap items-center gap-3">
                  <Link href={`/${locale}/shop/all`} className="inline-flex items-center gap-2 rounded-full bg-[#f2eee7] px-6 py-3.5 text-[14px] font-semibold text-[#11161d] shadow-[0_4px_20px_rgba(242,238,231,0.1)] transition hover:bg-white hover:shadow-[0_4px_20px_rgba(242,238,231,0.25)]">
                    <ShoppingCart size={14} />
                    {copy.heroPrimary} ({CATALOG.length})
                  </Link>
                  <Link href={`/${locale}/products/${flagship.slug}`} className="inline-flex items-center gap-2 rounded-full border border-white/[0.12] px-6 py-3.5 text-[14px] font-medium text-[#c8d4e2] transition hover:border-white/[0.22] hover:text-white">
                    {copy.heroSecondaryPrefix} {flagshipName}
                  </Link>
                </div>

                <div className="mt-8 grid gap-3 sm:grid-cols-3">
                  {copy.heroAudience.map((item) => (
                    <div key={item.label} className="rounded-2xl border border-white/[0.07] bg-white/[0.025] px-4 py-3">
                      <div className="text-[15px] font-bold text-[#f2eee7]">{item.value}</div>
                      <div className="mt-1 text-[11px] uppercase tracking-[0.14em] text-[#5a6678]">{item.label}</div>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.1 }} className="grid gap-3 p-4 sm:p-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
                <Link href={`/${locale}/products/${flagship.slug}`} className="group relative min-h-[340px] overflow-hidden rounded-[28px] border border-white/[0.08] bg-[#10161f] sm:min-h-[420px]">
                  <img src={flagship.images?.[1] ?? flagship.images?.[0]} alt={flagshipName} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]" style={{ objectPosition: '50% 100%' }} />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,12,16,0.1),rgba(8,12,16,0.65))]" />
                  <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                    <div className="mb-2 inline-flex items-center rounded-full border border-white/10 bg-[rgba(10,15,22,0.55)] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#d6dde7] backdrop-blur-sm">{copy.flagshipBadge}</div>
                    <div className="max-w-[18rem] text-[22px] font-bold leading-tight tracking-[-0.03em] text-[#f6f2eb]">{flagshipName}</div>
                    <p className="mt-2 max-w-[19rem] text-[13px] leading-6 text-[#d6dde7]">{copy.flagshipDescription}</p>
                  </div>
                </Link>

                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
                  {copy.lifestyleShots.slice(1).map((shot) => (
                    <div key={shot.title} className="relative min-h-[168px] overflow-hidden rounded-[24px] border border-white/[0.08] bg-[#10161f]">
                      <img src={shot.src} alt={shot.title} className="h-full w-full object-cover" style={{ objectPosition: shot.objectPosition }} />
                      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,12,16,0.02),rgba(8,12,16,0.62))]" />
                      <div className="absolute inset-x-0 bottom-0 p-4">
                        <div className="text-[13px] font-semibold text-[#f2eee7]">{shot.title}</div>
                        <div className="mt-1 text-[11px] leading-5 text-[#c1ccd8]">{shot.copy}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <section className="mb-12 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {copy.trustItems.map((item) => (
            <div key={item.label} className="flex items-center gap-3 rounded-xl border border-white/[0.07] bg-white/[0.025] px-4 py-3">
              <item.icon size={16} className="shrink-0 text-[#8ea7c7]" />
              <div>
                <div className="text-[12px] font-semibold text-[#f2eee7]">{item.label}</div>
                <div className="text-[11px] text-[#6b7785]">{item.sub}</div>
              </div>
            </div>
          ))}
        </section>

        <section className="mb-16">
          <div className="mb-7 flex items-end justify-between gap-4">
            <div>
              <h2 className="text-[clamp(1.5rem,3vw,2.1rem)] font-bold tracking-[-0.04em] text-[#f2eee7]">{copy.starterHeading}</h2>
              <p className="mt-2 text-[14px] text-[#6b7785]">{copy.starterDescription}</p>
            </div>
          </div>

          <div className="grid gap-4 lg:grid-cols-3">
            {copy.starterRoutines.map((routine) => (
              <Link key={routine.slug} href={`/${locale}/shop/${routine.slug}`} className="group block overflow-hidden rounded-[28px] border border-white/[0.07] bg-[linear-gradient(180deg,#101722,#0c1118)] p-6 transition hover:border-white/[0.14] hover:shadow-[0_18px_48px_rgba(0,0,0,0.28)]">
                <div className="mb-5 flex items-center justify-between">
                  <span className="text-3xl">{routine.accent}</span>
                  <span className="rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#8791a1]">{copy.starterTag}</span>
                </div>

                <h3 className="text-[20px] font-bold tracking-[-0.03em] text-[#f2eee7] group-hover:text-white">{routine.title}</h3>
                <p className="mt-3 text-[13px] leading-7 text-[#8791a1]">{routine.copy}</p>

                <div className="mt-6 space-y-2">
                  {routine.picks.map((pick) => (
                    <div key={pick} className="flex items-center gap-2 text-[12px] text-[#c8d0da]">
                      <span className="flex h-5 w-5 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.03] text-[11px]">
                        <Check size={11} className="text-[#8ea7c7]" />
                      </span>
                      {pick}
                    </div>
                  ))}
                </div>

                <div className="mt-6 flex items-center gap-1 text-[13px] font-semibold text-[#8ea7c7] transition-colors group-hover:text-[#c9d8e7]">
                  {copy.starterCta}
                  <ChevronRight size={14} className="transition-transform group-hover:translate-x-0.5" />
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="mb-16">
          <div className="mb-7 flex items-end justify-between">
            <div>
              <h2 className="text-[clamp(1.3rem,3vw,1.7rem)] font-bold tracking-[-0.035em] text-[#f2eee7]">{copy.problemHeading}</h2>
              <p className="mt-1.5 text-[13px] text-[#6b7785]">{copy.problemDescription}</p>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {copy.problemCards.map((item) => (
              <Link key={item.slug} href={`/${locale}/shop/${item.slug}`} className="group block">
                <div
                  className="flex h-full flex-col rounded-2xl border p-6 transition-all duration-300 hover:shadow-[0_8px_32px_rgba(0,0,0,0.3)]"
                  style={{ background: `linear-gradient(160deg, ${item.colorFrom}, ${item.colorTo})`, borderColor: item.borderColor }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = item.borderHover
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = item.borderColor
                  }}
                >
                  <span className="mb-4 text-3xl">{item.emoji}</span>
                  <div className="mb-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#5a6878]">{item.problem}</div>
                  <h3 className="mb-2.5 text-[15px] font-bold text-[#f2eee7] transition-colors group-hover:text-white">{item.solution}</h3>
                  <p className="flex-1 text-[12px] leading-[1.6] text-[#6b7a8a]">{item.description}</p>
                  <div className="mt-5 flex items-center gap-1 text-[12px] font-semibold text-[#7a9ab8] transition-colors group-hover:text-[#a8c0d8]">
                    {copy.problemCta}
                    <ChevronRight size={13} className="transition-transform group-hover:translate-x-0.5" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="mb-16 overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.02] p-8 sm:p-10">
          <h2 className="mb-8 text-center text-[18px] font-bold tracking-[-0.03em] text-[#f2eee7]">{copy.stepsHeading}</h2>
          <div className="grid gap-6 sm:grid-cols-3">
            {copy.steps.map((item) => (
              <div key={item.step} className="flex flex-col items-center text-center sm:items-start sm:text-left">
                <div className="mb-4 flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/[0.1] bg-white/[0.04] text-[18px]">{item.icon}</span>
                  <span className="font-mono text-[11px] font-semibold tracking-[0.2em] text-[#4a5568]">{item.step}</span>
                </div>
                <h3 className="mb-2 text-[15px] font-bold text-[#f2eee7]">{item.title}</h3>
                <p className="text-[13px] leading-6 text-[#6b7785]">{item.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-16 grid gap-5 lg:grid-cols-[minmax(0,0.88fr)_minmax(0,1.12fr)]">
          <div className="rounded-[28px] border border-white/[0.07] bg-[linear-gradient(180deg,#101722,#0c1118)] p-7 sm:p-8">
            <span className="inline-flex items-center rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#8ea7c7]">{copy.recoveryTag}</span>
            <h2 className="mt-4 text-[clamp(1.6rem,3vw,2.35rem)] font-bold leading-tight tracking-[-0.04em] text-[#f6f2eb]">{copy.recoveryHeading}</h2>
            <p className="mt-4 max-w-xl text-[14px] leading-7 text-[#8791a1]">{copy.recoveryBody}</p>

            <div className="mt-8 grid gap-3">
              {copy.recoveryHighlights.map((item) => (
                <div key={item.title} className="rounded-2xl border border-white/[0.06] bg-white/[0.02] px-4 py-4">
                  <div className="text-[14px] font-semibold text-[#f2eee7]">{item.title}</div>
                  <p className="mt-1.5 text-[12px] leading-6 text-[#6f7c8b]">{item.copy}</p>
                </div>
              ))}
            </div>

            <Link href={`/${locale}/products/${flagship.slug}`} className="mt-7 inline-flex items-center gap-2 rounded-full bg-[#f2eee7] px-5 py-3 text-[13px] font-semibold text-[#11161d] transition hover:bg-white">
              {copy.recoveryCta}
              <ChevronRight size={14} />
            </Link>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {copy.lifestyleShots.map((shot, index) => (
              <div key={shot.title} className={`relative overflow-hidden rounded-[28px] border border-white/[0.07] bg-[#10161f] ${index === 0 ? 'min-h-[280px] sm:col-span-2' : 'min-h-[220px]'}`}>
                <img src={shot.src} alt={shot.title} className="h-full w-full object-cover" style={{ objectPosition: shot.objectPosition }} />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,12,16,0.02),rgba(8,12,16,0.6))]" />
                <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
                  <div className="text-[14px] font-semibold text-[#f2eee7]">{shot.title}</div>
                  <div className="mt-1 text-[12px] leading-6 text-[#d6dde7]">{shot.copy}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-16">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-[20px] font-bold tracking-[-0.03em] text-[#f2eee7]">{copy.categoriesHeading}</h2>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {CATEGORIES.map((category) => {
              const count = CATALOG.filter((product) => product.category === category.id).length
              return (
                <Link key={category.id} href={`/${locale}/shop/${category.slug}`} className="group flex flex-col items-center rounded-2xl border border-white/[0.07] bg-white/[0.025] px-4 py-6 text-center transition-all hover:border-white/[0.16] hover:bg-white/[0.05]">
                  <span className="mb-3 text-4xl transition-transform duration-200 group-hover:scale-110">{category.icon}</span>
                  <div className="text-[13px] font-semibold text-[#f2eee7]">{getLocalizedCategoryName(category, locale)}</div>
                  <div className="mt-1 text-[11px] text-[#6b7785]">{getProductCountLabel(count, locale)}</div>
                </Link>
              )
            })}
          </div>
        </section>

        <section className="mb-16">
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TrendingUp size={18} className="text-amber-400" />
              <h2 className="text-[20px] font-bold tracking-[-0.03em] text-[#f2eee7]">{copy.bestSellersHeading}</h2>
            </div>
            <Link href={`/${locale}/shop/all`} className="flex items-center gap-1 text-[13px] text-[#8791a1] transition hover:text-[#f2eee7]">
              {copy.viewAll} <ChevronRight size={14} />
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {bestSellers.map((product) => (
              <ProductCard key={product.slug} product={product} locale={locale} />
            ))}
          </div>
        </section>

        <section className="mb-16">
          <div className="mb-6 flex items-center gap-2">
            <Zap size={18} className="text-rose-400" />
            <h2 className="text-[20px] font-bold tracking-[-0.03em] text-[#f2eee7]">{copy.dealsHeading}</h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {deals.slice(0, 4).map((product) => (
              <ProductCard key={product.slug} product={product} locale={locale} />
            ))}
          </div>
        </section>

        <section className="mb-16">
          <div className="mb-6 flex items-center gap-2">
            <Package size={18} className="text-[#8ea7c7]" />
            <h2 className="text-[20px] font-bold tracking-[-0.03em] text-[#f2eee7]">{copy.allProductsHeading}</h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {allProducts.map((product) => (
              <ProductCard key={product.slug} product={product} locale={locale} />
            ))}
          </div>
        </section>

        <section className="mb-16 overflow-hidden rounded-2xl border border-white/[0.08] bg-[linear-gradient(135deg,#111c2e,#0d1219)] p-8 sm:p-10">
          <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
            <div>
              <span className="inline-flex items-center rounded-full border border-amber-400/25 bg-amber-400/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-amber-300">{copy.bundleTag}</span>
              <h2 className="mt-4 text-[clamp(1.6rem,3vw,2.8rem)] font-bold leading-tight tracking-[-0.04em] text-[#f6f2eb]">{copy.bundleHeading}</h2>
              <p className="mt-3 text-[15px] leading-7 text-[#8791a1]">{copy.bundleDescription}</p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Link href={`/${locale}/shop/all`} className="inline-flex items-center justify-center gap-2 rounded-full bg-[#f2eee7] px-6 py-3 text-[14px] font-semibold text-[#11161d] transition hover:bg-white hover:shadow-[0_4px_16px_rgba(242,238,231,0.2)]">
                  {copy.bundlePrimary}
                  <ChevronRight size={15} />
                </Link>
                <Link href={`/${locale}/checkout`} className="inline-flex items-center justify-center gap-2 rounded-full border border-white/[0.12] bg-white/[0.04] px-6 py-3 text-[14px] font-medium text-[#d0d8e4] transition hover:border-white/[0.2] hover:text-white">
                  {copy.bundleSecondary}
                </Link>
              </div>
            </div>
            <div className="hidden grid-cols-2 gap-3 lg:grid">
              {bestSellers.slice(0, 4).map((product) => (
                <div key={product.slug} className="flex items-center gap-3 rounded-xl border border-white/[0.07] bg-white/[0.03] px-3 py-3">
                  <span className="text-2xl">{product.icon}</span>
                  <div>
                    <div className="text-[12px] font-semibold text-[#f2eee7]">{getLocalizedProductName(product, locale)}</div>
                    <div className="text-[11px] text-[#8791a1]">€{product.price}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="mb-6 text-[20px] font-bold tracking-[-0.03em] text-[#f2eee7]">{copy.socialHeading}</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {copy.reviews.map((review) => (
              <div key={`${review.author}-${review.product}`} className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-5">
                <div className="flex items-center gap-2">
                  <Stars rating={review.stars} />
                  <span className="text-[10px] font-medium uppercase tracking-[0.14em] text-[#5a6678]">{copy.verifiedPurchase}</span>
                </div>
                <p className="mt-3 text-[13px] leading-6 text-[#c8d0da]">&quot;{review.text}&quot;</p>
                <div className="mt-4 flex items-center justify-between gap-3">
                  <div>
                    <div className="text-[12px] font-semibold text-[#f2eee7]">{review.author}</div>
                    <div className="text-[11px] text-[#6b7785]">{review.role}</div>
                  </div>
                  <span className="rounded-full border border-white/[0.07] bg-white/[0.03] px-2.5 py-1 text-[10px] text-[#8791a1]">{review.product}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-16 overflow-hidden rounded-[32px] border border-white/[0.07] bg-[linear-gradient(135deg,#0e1520,#101822)]">
          <div className="grid gap-0 lg:grid-cols-[minmax(0,1.08fr)_minmax(0,0.92fr)]">
            <div className="grid grid-cols-2 gap-3 p-4 sm:p-6">
              {[
                { src: '/images/sleepband-product-clean.png', objectPosition: '50% 52%' },
                { src: '/images/sleepband-lifestyle-clean.png', objectPosition: '50% 78%' },
                { src: '/images/sleepband-sport-clean.png', objectPosition: '58% 36%' },
                { src: '/images/sleepband-detail-clean.png', objectPosition: '50% 42%' },
              ].map((shot, index) => (
                <div key={shot.src} className={`overflow-hidden rounded-[26px] border border-white/[0.08] bg-[#111720] ${index === 0 ? 'col-span-2 min-h-[220px]' : 'min-h-[170px]'}`}>
                  <img src={shot.src} alt={copy.galleryAlt} className="h-full w-full object-cover" style={{ objectPosition: shot.objectPosition }} />
                </div>
              ))}
            </div>

            <div className="flex flex-col justify-center p-8 sm:p-10">
              <span className="inline-flex w-fit items-center rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#8ea7c7]">{copy.buyerMomentsTag}</span>
              <h2 className="mt-4 text-[clamp(1.9rem,4vw,3.2rem)] font-bold leading-[0.98] tracking-[-0.05em] text-[#f6f2eb]">{copy.buyerMomentsHeading}</h2>
              <p className="mt-4 text-[14px] leading-7 text-[#8791a1]">{copy.buyerMomentsBody}</p>

              <div className="mt-7 grid gap-3 sm:grid-cols-3">
                {copy.buyerMomentsMetrics.map((item) => (
                  <div key={item.value} className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-4">
                    <div className="text-[16px] font-bold text-[#f2eee7]">{item.value}</div>
                    <div className="mt-1 text-[11px] uppercase tracking-[0.14em] text-[#5a6678]">{item.label}</div>
                  </div>
                ))}
              </div>

              <Link href={`/${locale}/shop/all`} className="mt-7 inline-flex w-fit items-center gap-2 rounded-full border border-white/[0.12] bg-white/[0.03] px-5 py-3 text-[13px] font-semibold text-[#d6dde7] transition hover:border-white/[0.2] hover:text-white">
                {copy.buyerMomentsCta}
                <ChevronRight size={14} />
              </Link>
            </div>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="mb-6 text-[20px] font-bold tracking-[-0.03em] text-[#f2eee7]">{copy.faqHeading}</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {copy.faqs.map((faq) => (
              <div key={faq.q} className="rounded-xl border border-white/[0.07] bg-white/[0.025] p-5">
                <div className="text-[14px] font-semibold text-[#f2eee7]">{faq.q}</div>
                <p className="mt-2 text-[13px] leading-6 text-[#8791a1]">{faq.a}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="border-t border-white/[0.07] bg-[#080c10]">
        <div className="mx-auto max-w-[1280px] px-4 py-12 sm:px-6">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <div className="mb-4 flex items-center gap-2">
                <div className="grid h-6 w-6 grid-cols-2 gap-[2px] rounded-md border border-white/10 bg-white/[0.03] p-0.5">
                  <span className="rounded-[2px] bg-[#cfd8e6]" />
                  <span className="rounded-[2px] bg-[#8da3c4]" />
                  <span className="rounded-[2px] bg-[#7186a4]" />
                  <span className="rounded-[2px] bg-[#d8d0c4]" />
                </div>
                <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#f2eee7]">Noctas</span>
              </div>
              <p className="text-[12px] leading-6 text-[#5a6678]">{copy.footerTagline}</p>
            </div>
            <div>
              <div className="mb-4 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#5a6678]">{copy.footerCategories}</div>
              <ul className="space-y-2">
                {CATEGORIES.map((category) => (
                  <li key={category.id}>
                    <Link href={`/${locale}/shop/${category.slug}`} className="text-[13px] text-[#6b7785] transition-colors hover:text-[#f2eee7]">
                      {getLocalizedCategoryName(category, locale)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <div className="mb-4 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#5a6678]">{copy.footerSupport}</div>
              <ul className="space-y-2">
                {copy.supportLinks.map((label) => (
                  <li key={label}><span className="text-[13px] text-[#6b7785]">{label}</span></li>
                ))}
              </ul>
            </div>
            <div>
              <div className="mb-4 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#5a6678]">{copy.footerPolicies}</div>
              <ul className="space-y-2">
                {copy.policyLinks.map((label) => (
                  <li key={label}><span className="text-[13px] text-[#6b7785]">{label}</span></li>
                ))}
              </ul>
            </div>
          </div>
          <div className="mt-8 flex flex-col gap-2 border-t border-white/[0.06] pt-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-[11px] text-[#3d4a5c]">{copy.footerRights}</p>
            <div className="flex items-center gap-3">
              <Shield size={12} className="text-[#3d4a5c]" />
              <span className="text-[11px] text-[#3d4a5c]">{copy.footerSecurity}</span>
            </div>
          </div>
        </div>
      </footer>

      <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-white/[0.08] bg-[rgba(8,12,16,0.95)] p-4 backdrop-blur-xl sm:hidden">
        <div className="flex items-center gap-3">
          <button onClick={openCart} className="relative z-40 flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/[0.12] bg-white/[0.05] text-[#c8d4e2]">
            <ShoppingCart size={16} />
            {totalItems > 0 && (
              <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#f2eee7] text-[9px] font-bold text-[#11161d]">
                {totalItems}
              </span>
            )}
          </button>
          <Link href={`/${locale}/shop/sleep-audio`} className="flex flex-1 items-center justify-center gap-2 rounded-full bg-[#f2eee7] py-3 text-[14px] font-semibold text-[#11161d]">
            {copy.mobileCta} <ChevronRight size={15} />
          </Link>
        </div>
      </div>
    </div>
  )
}
