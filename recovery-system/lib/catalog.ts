export type Category = {
  id: string
  slug: string
  name: string
  icon: string
  description: string
}

export type CatalogProduct = {
  slug: string
  name: string
  name_en?: string
  name_es?: string
  category: string
  price: number
  comparePrice: number
  rating: number
  reviewCount: number
  badge?: 'bestseller' | 'new' | 'deal' | 'trending'
  shortDescription: string
  shortDescription_en?: string
  shortDescription_es?: string
  description: string
  description_en?: string
  description_es?: string
  features: string[]
  specs: Record<string, string>
  images?: string[]
  icon: string
  cartIcon: string
  color: string
}

export const CATEGORIES: Category[] = [
  {
    id: 'sleep-audio',
    slug: 'sleep-audio',
    name: 'Sleep & Audio',
    icon: '🎧',
    description: 'Headbands, sound machines and accessories designed for better sleep audio.',
  },
  {
    id: 'neck-recovery',
    slug: 'neck-recovery',
    name: 'Neck & Recovery',
    icon: '🧘',
    description: 'Cervical decompressors, neck massagers and posture correctors.',
  },
  {
    id: 'muscle-recovery',
    slug: 'muscle-recovery',
    name: 'Muscle Recovery',
    icon: '💆',
    description: 'Percussion guns, vibration tools and heat therapy devices.',
  },
  {
    id: 'sensory',
    slug: 'sensory',
    name: 'Sensory & Relaxation',
    icon: '🌙',
    description: 'Eye masks, breathing trainers and sensory relaxation tools.',
  },
  {
    id: 'travel',
    slug: 'travel',
    name: 'Travel & Comfort',
    icon: '✈️',
    description: 'Portable sleep aids and compact travel comfort accessories.',
  },
]

export const CATALOG: CatalogProduct[] = [
  // ─── Sleep & Audio ───────────────────────────────────────────────
  {
    slug: 'sleepband-pro',
    name: 'Noctive Halo',
    name_en: 'Noctive Halo',
    name_es: 'Noctive Halo',
    category: 'sleep-audio',
    price: 69,
    comparePrice: 119,
    rating: 4.9,
    reviewCount: 1578,
    badge: 'bestseller',
    shortDescription: 'Ultra-thin acoustic headband engineered for pressure-free, immersive sleep audio.',
    shortDescription_en: 'Ultra-thin acoustic headband engineered for pressure-free, immersive sleep audio.',
    shortDescription_es: 'Cinta acústica ultrafina diseñada para audio de sueño inmersivo sin presión en los oídos.',
    description:
      'Noctive Halo fuses textile engineering with precision acoustic drivers to deliver rich, immersive sleep audio without the discomfort of in-ear devices. Designed for side sleepers and crafted from breathable, moisture-wicking knit, Halo stays comfortable all night. Removable modules allow safe machine washing and USB‑C fast charging ensures quick top-ups between nights.',
    description_en:
      'Noctive Halo fuses textile engineering with precision acoustic drivers to deliver rich, immersive sleep audio without the discomfort of in-ear devices. Designed for side sleepers and crafted from breathable, moisture-wicking knit, Halo stays comfortable all night. Removable modules allow safe machine washing and USB‑C fast charging ensures quick top-ups between nights.',
    description_es:
      'Noctive Halo combina ingeniería textil con drivers acústicos de precisión para ofrecer audio nocturno inmersivo sin la molestia de los auriculares intrauditivos. Diseñada para quienes duermen de lado, su tejido transpirable y que evacua la humedad permanece cómoda toda la noche. Los módulos son extraíbles para lavado y la carga rápida USB‑C permite recargas rápidas.',
    features: [
      'Precision acoustic film drivers — studio-tuned for sleep',
      'Ergonomic wrap designed for side sleepers',
      'Breathable, moisture-wicking knit — machine washable',
      'Bluetooth Low Energy 5.x — stable + low power',
      'USB‑C fast charge — ~2 hours',
      'Featherlight: ~55g — unobtrusive all-night wear',
    ],
    specs: {
      'Battery life': '10 hours',
      'Charge time': '≈2 hours (USB‑C)',
      'Connectivity': 'Bluetooth LE 5.x',
      'Speaker type': 'Flat acoustic film drivers',
      'Material': 'Breathable microfiber knit',
      'Sizes': 'One size — stretch fit',
      'Weight': '≈55g',
    },
    images: [
      '/images/sleepband-pro-1.jpg',
      '/images/sleepband-pro-2.jpg',
      '/images/sleepband-pro-3.jpg',
    ],
    icon: '🎧',
    cartIcon: '🎧',
    color: '#0b0f14',
  },
  {
    slug: 'sleepseal-plus',
    name: 'SleepSeal+ Pack',
    category: 'sleep-audio',
    price: 39,
    comparePrice: 59,
    rating: 4.6,
    reviewCount: 893,
    badge: 'deal',
    shortDescription: '60-night nasal breathing strips. Reduces snoring and improves oxygen intake during sleep.',
    description:
      'SleepSeal+ helps you breathe through your nose during sleep, naturally reducing snoring and improving oxygen intake. Soft hypoallergenic strips conform to your nose and stay firmly through the night without skin irritation. Each pack contains 60 strips — a full 2-month supply.',
    features: [
      '60 strips per pack — 2-month supply',
      'Hypoallergenic adhesive — no skin irritation',
      'Clinically designed nasal lift shape',
      'Compatible with CPAP users',
      'Latex-free, safe for sensitive skin',
      'Dermatologist tested',
    ],
    specs: {
      'Pack size': '60 strips',
      'Duration per strip': '1 night',
      'Material': 'Hypoallergenic polymer',
      'Dimensions': 'Standard (2.5 × 5 cm)',
      'Adhesive': 'Medical-grade, latex-free',
    },
    icon: '🌙',
    cartIcon: '🌙',
    color: '#0d1828',
  },
  {
    slug: 'white-noise-pro',
    name: 'Noctive Wave',
    category: 'sleep-audio',
    price: 79,
    comparePrice: 129,
    rating: 4.8,
    reviewCount: 812,
    badge: 'new',
    shortDescription: 'Compact ambient sound system with studio‑tuned sleep profiles and adaptive soft light.',
    description:
      'Noctive Wave is a compact ambient sound system engineered to mask disruptive noise and guide the brain into deeper sleep states. Wave includes a library of studio‑tuned profiles (white, brown, ocean, rain, and bespoke blends), adaptive volume sensing and a gentle night light that fades as you fall asleep. Its minimal footprint and premium materials suit modern bedrooms.',
    features: [
      'Studio‑tuned sleep profiles — curated for restorative rest',
      'Adaptive noise-level sensing — adjusts volume subtly',
      'Soft amber night light — 3 brightness modes',
      'USB‑C powered (battery models available)',
      'Compact 360° driver — balanced room fill',
      'Memory recall — last used profile + volume',
    ],
    specs: {
      'Sound options': '20 curated profiles',
      'Timer': '30 / 60 / 90 min or continuous',
      'Power': 'USB‑C',
      'Speaker': '5W full-range driver',
      'Night light': 'Amber LED — 3 levels',
      'Dimensions': '9 × 9 × 8 cm',
      'Weight': '210g',
    },
    images: [
      '/images/white-noise-pro-1.jpg',
      '/images/white-noise-pro-2.jpg',
      '/images/white-noise-pro-3.jpg',
    ],
    icon: '🔊',
    cartIcon: '🔊',
    color: '#131020',
  },

  // ─── Neck & Recovery ─────────────────────────────────────────────
  {
    slug: 'cerviflex',
    name: 'CerviFlex',
    name_en: 'CerviFlex',
    name_es: 'Masajeador Cervical CerviFlex',
    category: 'neck-recovery',
    price: 59,
    comparePrice: 99,
    rating: 4.7,
    reviewCount: 1021,
    badge: 'bestseller',
    shortDescription: 'Cervical massager with 3 modes and optional heat. Reduces neck tension after long desk sessions.',
    shortDescription_en: 'Cervical massager with 3 modes and optional heat. Reduces neck tension after long desk sessions.',
    shortDescription_es: 'Masajeador cervical con 3 modos y calor opcional. Reduce la tensión tras jornadas largas sentado.',
    description:
      'CerviFlex is a soft-touch cervical massager that targets the neck and upper trapezius. Three massage modes with optional 45°C heat therapy help reduce tension built up from screen time, commuting, and poor posture. USB-C rechargeable with a 90-minute battery.',
    description_en:
      'CerviFlex is a soft-touch cervical massager that targets the neck and upper trapezius. Three massage modes with optional 45°C heat therapy help reduce tension built up from screen time, commuting, and poor posture. USB-C rechargeable with a 90-minute battery.',
    description_es:
      'CerviFlex es un masajeador cervical de tacto suave que actúa sobre el cuello y trapecio superior. Sus tres modos de masaje y la opción de calor hasta 45°C ayudan a reducir la tensión acumulada por pantallas, desplazamientos y mala postura. Recargable por USB-C con 90 min de autonomía.',
    features: [
      '3 massage intensity modes',
      'Gentle heat therapy up to 45°C',
      'USB-C rechargeable — 90-min battery',
      'Auto shut-off after 15 min for safety',
      'Lightweight at 320g',
      'Portable with travel pouch included',
    ],
    specs: {
      'Massage modes': '3 intensity levels',
      'Heat': 'Up to 45°C',
      'Battery': '90 minutes (USB-C)',
      'Auto shut-off': '15 minutes',
      'Weight': '320g',
    },
    icon: '🧘',
    cartIcon: '🧘',
    color: '#121a24',
  },
  {
    slug: 'neckpulse-pro',
    name: 'NeckPulse Pro',
    category: 'neck-recovery',
    price: 79,
    comparePrice: 139,
    rating: 4.5,
    reviewCount: 445,
    badge: 'trending',
    shortDescription: 'Cervical traction device. Decompresses vertebral discs. Relieves chronic neck pain at home.',
    description:
      'NeckPulse Pro provides gentle cervical traction to decompress vertebral discs and relieve neck pain and stiffness. Adjustable air pressure fits all neck sizes and the soft foam inner lining prevents discomfort. Clinically inspired for daily home use.',
    features: [
      'Adjustable air pressure — 3 levels',
      'Fits all neck sizes (adjustable width)',
      'Decompresses cervical disc pressure',
      'Soft medical-grade foam inner lining',
      'Recommended 15–20 min per session',
      'Lightweight and portable — 180g',
    ],
    specs: {
      'Pressure levels': '3',
      'Recommended session': '15–20 min',
      'Material': 'Medical-grade foam + nylon',
      'Max neck circumference': '45 cm',
      'Weight': '180g',
    },
    icon: '🦴',
    cartIcon: '🦴',
    color: '#101c28',
  },
  {
    slug: 'posture-band',
    name: 'PostureBand',
    category: 'neck-recovery',
    price: 45,
    comparePrice: 79,
    rating: 4.4,
    reviewCount: 334,
    shortDescription: 'Upper back posture corrector. Discreet under clothing. Realigns shoulders and spine gently.',
    description:
      'PostureBand gently pulls your shoulders back, correcting rounded posture and forward head position over time. Thin enough to wear under a shirt at the office. Recommended for desk workers, students, and anyone with screen-heavy routines.',
    features: [
      'Corrects forward head and rounded shoulders',
      'Discreet enough to wear under clothing',
      'Breathable mesh back panel',
      'Fully adjustable shoulder straps',
      'Wear 1–2 hours daily for gradual correction',
      'Available in S / M / L / XL',
    ],
    specs: {
      'Sizes': 'S / M / L / XL',
      'Material': 'Neoprene + breathable mesh',
      'Recommended use': '1–2 hours per day',
      'Washable': 'Yes (hand wash)',
    },
    icon: '🏋️',
    cartIcon: '🏋️',
    color: '#0e1a20',
  },

  // ─── Muscle Recovery ─────────────────────────────────────────────
  {
    slug: 'pulse-pro-x',
    name: 'Pulse Pro X',
    category: 'muscle-recovery',
    price: 89,
    comparePrice: 149,
    rating: 4.9,
    reviewCount: 2103,
    badge: 'bestseller',
    shortDescription: 'Percussion massage gun. 16mm deep tissue. Under 45dB. 6 speeds. Professional grade at home.',
    description:
      'Pulse Pro X is a professional-grade percussion massage gun engineered for serious recovery. Its brushless motor runs at under 45 dB — quiet enough for any environment. Six calibrated intensity levels cover everything from light warm-up to deep tissue work.',
    features: [
      '16mm deep tissue percussion depth',
      '6 quiet intensity levels',
      'Brushless motor — under 45 dB',
      '4-hour battery life (USB-C fast charge)',
      '6 interchangeable head attachments',
      'LED indicator + professional carry case',
    ],
    specs: {
      'Motor type': 'Brushless, <45 dB',
      'Percussion depth': '16mm',
      'Speed levels': '6',
      'Battery': '4 hours (USB-C)',
      'Attachments': '6 heads',
      'Weight': '870g with grip',
    },
    icon: '💆',
    cartIcon: '💆',
    color: '#111c28',
  },
  {
    slug: 'vibrapulse-mini',
    name: 'VibraPulse Mini',
    category: 'muscle-recovery',
    price: 55,
    comparePrice: 89,
    rating: 4.5,
    reviewCount: 678,
    badge: 'deal',
    shortDescription: 'Compact vibration massager. 4 heads. Quiet motor. Fits in any bag for travel and gym recovery.',
    description:
      'VibraPulse Mini is a compact vibration massager that targets muscle tension with precision. Its quiet motor (< 40 dB) and 4-head set handle everything from calves to shoulders. Fits in a gym bag or backpack for recovery anywhere.',
    features: [
      '4 interchangeable massage heads',
      'Quiet motor — < 40 dB',
      'Lightweight at 320g',
      '3-hour battery (USB-C)',
      'Travel-ready compact design',
      'Carry pouch included',
    ],
    specs: {
      'Weight': '320g',
      'Massage heads': '4',
      'Battery': '3 hours (USB-C)',
      'Noise level': '< 40 dB',
      'Charging': 'USB-C',
    },
    icon: '⚡',
    cartIcon: '⚡',
    color: '#0f1824',
  },
  {
    slug: 'thermapad-pro',
    name: 'ThermaPad Pro',
    category: 'muscle-recovery',
    price: 65,
    comparePrice: 99,
    rating: 4.6,
    reviewCount: 521,
    shortDescription: 'Heating pad with 6 heat levels. Large 30×50cm coverage. Auto shut-off. Back, shoulders, knees.',
    description:
      'ThermaPad Pro delivers therapeutic heat for muscle stiffness and joint discomfort. The large flexible pad covers the full lower back or both shoulders simultaneously. Six temperature levels and a 90-minute auto shut-off ensure safe, effective daily use.',
    features: [
      '6 heat levels from 30°C to 65°C',
      'Large flexible pad — 30 × 50 cm',
      'Auto shut-off after 90 min for safety',
      'Machine washable (remove controller first)',
      'Heats up in 90 seconds',
      'UL-certified heating elements',
    ],
    specs: {
      'Temperature range': '30–65°C',
      'Pad dimensions': '30 × 50 cm',
      'Auto shut-off': '90 minutes',
      'Power': '50W (AC adapter)',
      'Cord length': '180cm',
      'Washable': 'Yes (pad only)',
    },
    icon: '🔥',
    cartIcon: '🔥',
    color: '#1a1010',
  },

  // ─── Sensory & Relaxation ─────────────────────────────────────────
  {
    slug: 'sleepseal',
    name: 'SleepSeal Mask',
    category: 'sensory',
    price: 29,
    comparePrice: 49,
    rating: 4.5,
    reviewCount: 1567,
    badge: 'bestseller',
    shortDescription: '3D contoured sleep mask. 100% blackout. Adjustable strap. Comfortable for side sleepers.',
    description:
      'SleepSeal Mask creates total darkness for deeper, longer sleep. The 3D contoured design holds fabric away from eyelashes, and the padded nose bridge seals out all light. Works for day napping, travel, and shift workers.',
    features: [
      '100% blackout — zero light leakage',
      '3D contour keeps fabric off eyelashes',
      'Padded nose bridge for a full light seal',
      'Adjustable soft elastic strap',
      'Machine washable',
      'Comfortable for side and back sleepers',
    ],
    specs: {
      'Material': 'Memory foam + silk blend cover',
      'Light blocking': '100% blackout',
      'Strap': 'Adjustable 40–60 cm',
      'Washable': 'Yes — 30°C cycle',
    },
    icon: '🌙',
    cartIcon: '🌙',
    color: '#0e1422',
  },
  {
    slug: 'weighted-mask-pro',
    name: 'Noctive Calm Mask',
    category: 'sensory',
    price: 45,
    comparePrice: 69,
    rating: 4.7,
    reviewCount: 512,
    badge: 'new',
    shortDescription: 'Weighted sleep mask that combines gentle pressure and breathable design for faster relaxation.',
    description:
      'Noctive Calm Mask blends discreet weight distribution with breathable fabrics and an optional aromatherapy insert to reduce eye tension and accelerate sleep onset. Carefully balanced weight provides a calming, acupressure‑like sensation while maintaining complete blackout.',
    features: [
      'Evenly distributed 150g gentle weight',
      'Replaceable aromatherapy insert (lavender included)',
      '100% blackout nose bridge seal',
      'Breathable velvet outer and hypoallergenic fill',
      'Machine washable outer shell (remove insert)',
    ],
    specs: {
      'Weight': '150g',
      'Insert': 'Aromatherapy sachet (lavender)',
      'Material': 'Velvet outer + hypoallergenic bead fill',
      'Washable': 'Outer shell — 30°C',
    },
    images: [
      '/images/weighted-mask-pro-1.jpg',
      '/images/weighted-mask-pro-2.jpg',
      '/images/weighted-mask-pro-3.jpg',
    ],
    icon: '😴',
    cartIcon: '😴',
    color: '#12101e',
  },
  {
    slug: 'breathcalm',
    name: 'BreathCalm',
    category: 'sensory',
    price: 35,
    comparePrice: 59,
    rating: 4.3,
    reviewCount: 267,
    shortDescription: 'Breathing trainer. Guides you to 6 breaths/min. No app. No battery. Reduces anxiety in minutes.',
    description:
      'BreathCalm is a soft silicone breathing trainer that guides you to the 6 breaths/min rhythm proven to activate the parasympathetic nervous system. No app, no subscription, no battery required — just breathe.',
    features: [
      'Guides breath to 6/min naturally',
      'No app, no battery, no subscription',
      'Soft medical-grade silicone',
      'Works in 5–10 minutes',
      'Reusable and fully washable',
    ],
    specs: {
      'Material': 'Medical-grade silicone',
      'Target breath rate': '6 breaths/min',
      'Session length': '5–10 min recommended',
      'Battery': 'None required',
      'Washable': 'Yes — dishwasher safe',
    },
    icon: '🌬️',
    cartIcon: '🌬️',
    color: '#0d1820',
  },

  // ─── Travel & Comfort ─────────────────────────────────────────────
  {
    slug: 'travel-pillow-ultra',
    name: 'TravelPillow Ultra',
    category: 'travel',
    price: 39,
    comparePrice: 65,
    rating: 4.7,
    reviewCount: 945,
    badge: 'trending',
    shortDescription: 'Memory foam travel neck pillow. 360° support. Packs into built-in pouch. Airplane approved.',
    description:
      'TravelPillow Ultra provides full 360° neck support for long-haul flights, trains, and car journeys. Premium memory foam adapts to your neck shape. Snaps compactly into its own built-in carry pouch — no separate bag needed.',
    features: [
      '360° ergonomic neck support',
      'Adaptive memory foam fill',
      'Compresses into built-in carry pouch',
      'Removable machine-washable velvet cover',
      'Front-snap closure keeps it in place',
      'Carry-on and overhead-bin approved',
    ],
    specs: {
      'Fill': 'Adaptive memory foam',
      'Cover': 'Velvet — machine washable',
      'Packed size': '14 × 14 cm',
      'Weight': '190g',
      'Available colors': 'Charcoal / Navy / Sand',
    },
    icon: '✈️',
    cartIcon: '✈️',
    color: '#101822',
  },
  {
    slug: 'portable-pulse',
    name: 'PortablePulse',
    category: 'travel',
    price: 55,
    comparePrice: 89,
    rating: 4.5,
    reviewCount: 312,
    shortDescription: 'Pocket-sized percussive massager. 3 heads. USB-C. TSA carry-on approved.',
    description:
      'PortablePulse is an ultra-compact percussion massager that fits in a jacket pocket. Three head attachments target everything from shoulder knots to calf tightness. Charged fully in 90 minutes via USB-C.',
    features: [
      'Pocket-sized: 16 cm, 240g',
      '3 interchangeable massage heads',
      '3 speed settings',
      'USB-C charged in 90 min',
      '2-hour battery life',
      'TSA carry-on approved',
    ],
    specs: {
      'Dimensions': '16 × 5 × 5 cm',
      'Weight': '240g',
      'Battery': '2 hours (USB-C, 90-min charge)',
      'Heads': '3',
      'Noise': '< 45 dB',
    },
    icon: '🎒',
    cartIcon: '🎒',
    color: '#10181e',
  },
  {
    slug: 'napkit-pro',
    name: 'NapKit Pro',
    category: 'travel',
    price: 49,
    comparePrice: 79,
    rating: 4.4,
    reviewCount: 214,
    badge: 'new',
    shortDescription: 'Travel sleep kit: eye mask + ear plugs + neck wrap + carry pouch. Sleep anywhere.',
    description:
      'NapKit Pro bundles the most essential travel sleep accessories into one compact carry pouch. Everything you need to sleep well on flights, trains, or road trips. All components are individually washable.',
    features: [
      'Includes: 3D eye mask, 5 pairs foam ear plugs, neck wrap, carry pouch',
      'All items fit in a 15 × 10 cm pouch',
      'Each component individually washable',
      'Premium materials — no cheap foam padding',
      'Gift-ready box packaging',
    ],
    specs: {
      'Kit contents': '3D eye mask + 5× ear plug pairs + neck wrap + carry pouch',
      'Pouch size': '15 × 10 cm',
      'Total weight': '120g',
      'Gift box': 'Included',
    },
    icon: '🧳',
    cartIcon: '🧳',
    color: '#141020',
  },

  // ─── AliExpress imports (merchant provided) ─────────────────────────
  {
    slug: 'ali-1005006125125031',
    name: 'Sleep Headband (AliExpress)',
    name_en: 'Sleep Headband',
    name_es: 'Cinta para dormir',
    category: 'sleep-audio',
    price: 49,
    comparePrice: 89,
    rating: 4.4,
    reviewCount: 120,
    shortDescription: 'Comfortable Bluetooth sleep headband with thin speakers.',
    shortDescription_en: 'Comfortable Bluetooth sleep headband with thin speakers.',
    shortDescription_es: 'Cinta Bluetooth cómoda para dormir con altavoces ultrafinos.',
    description: 'A lightweight headband with integrated speakers for sleep audio and meditation.',
    description_en: 'A lightweight headband with integrated speakers for sleep audio and meditation.',
    description_es: 'Una cinta ligera con altavoces integrados para audio de sueño y meditación.',
    features: ['Bluetooth connectivity', 'Thin speakers', 'Machine washable fabric'],
    specs: { 'Battery': '8–10 hours', 'Material': 'Polyester blend' },
    images: ['/images/products/aliexpress-item-1005006125125031.jpg'],
    icon: '🎧',
    cartIcon: '🎧',
    color: '#101828',
  },
  {
    slug: 'ali-1005006678112450',
    name: 'Neck Massager (AliExpress)',
    name_en: 'Neck Massager',
    name_es: 'Masajeador de cuello',
    category: 'neck-recovery',
    price: 59,
    comparePrice: 99,
    rating: 4.5,
    reviewCount: 210,
    shortDescription: 'Portable neck massager with heat and multiple modes.',
    shortDescription_en: 'Portable neck massager with heat and multiple modes.',
    shortDescription_es: 'Masajeador de cuello portátil con calor y varios modos.',
    description: 'Ergonomic neck massager to relieve tension and pain with optional heat therapy.',
    description_en: 'Ergonomic neck massager to relieve tension and pain with optional heat therapy.',
    description_es: 'Masajeador ergonómico para cuello que alivia la tensión y el dolor con calor opcional.',
    features: ['3 massage modes', 'Optional heat', 'USB-C rechargeable'],
    specs: { 'Battery': '90 minutes', 'Heat': 'Up to 45°C' },
    images: ['/images/products/aliexpress-item-1005006678112450.jpg'],
    icon: '🧘',
    cartIcon: '🧘',
    color: '#121a24',
  },
]

export function getProductsByCategory(categoryId: string): CatalogProduct[] {
  return CATALOG.filter((p) => p.category === categoryId)
}

export function getCatalogProductBySlug(slug: string): CatalogProduct | undefined {
  return CATALOG.find((p) => p.slug === slug)
}

export function getBestSellers(): CatalogProduct[] {
  return CATALOG.filter((p) => p.badge === 'bestseller')
}

export function getDeals(): CatalogProduct[] {
  return CATALOG.filter((p) => p.badge === 'deal' || p.badge === 'trending')
}

export function getCategoryById(id: string): Category | undefined {
  return CATEGORIES.find((c) => c.id === id)
}

export function searchProducts(query: string): CatalogProduct[] {
  if (!query.trim() || query.length < 2) return []
  const q = query.toLowerCase()
  return CATALOG.filter(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      p.shortDescription.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q),
  ).slice(0, 6)
}
