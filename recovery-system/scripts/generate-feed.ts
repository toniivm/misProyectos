#!/usr/bin/env ts-node
/**
 * Generador de feed GMC (Google Merchant Center) para Noctip
 * Uso: npx ts-node scripts/generate-feed.ts  (o npm run feed)
 * Salida: public/feeds/noctip_products.xml
 * 
 * Cumple: título fórmula Marca+tipo+atributo, imagen sin badges, GTIN opcional, shipping, condition, availability
 */
import fs from 'fs'
import path from 'path'

// Import catalog directly (avoid TS path issues)
const CATALOG = [
  {
    slug: 'halo',
    name: 'Noctip Halo',
    category: 'sleep-audio',
    price: 13.99,
    comparePrice: 29.99,
    images: ['/images/mouthpiece-1.jpg','/images/mouthpiece-2.jpg','/images/mouthpiece-3.jpg'],
    shortDescription: 'Elimina los ronquidos desde la primera noche. Tu pareja también dormirá mejor.',
    description: 'Férula de avanzamiento mandibular 10mm, silicona médica hipoalergénica, diseño doble capa, estuche viaje.',
    brand: 'Noctip',
    gtin: '', // pon GTIN si tienes, si no deja vacío y identifier_exists=no
    googleCategory: 'Health & Beauty > Health Care > Sleep & Snoring',
    googleCategoryId: '469',
    condition: 'new',
    availability: 'in stock',
    shippingCountry: 'ES',
  },
  {
    slug: 'sleep-headband',
    name: 'Noctip Rest',
    category: 'sleep-audio',
    price: 19.99,
    comparePrice: 31.99,
    images: ['/images/sleep-headband-1.webp','/images/sleep-headband-2.webp','/images/sleep-headband-3.webp'],
    shortDescription: 'Audio para dormir sin auriculares. 45 gramos que desaparecen al ponértelos.',
    description: 'Banda de sueño Bluetooth 5.0, altavoces ultrafinos, lavable a máquina, 10+ horas batería, talla única elástica.',
    brand: 'Noctip',
    gtin: '',
    googleCategory: 'Electronics > Audio > Headphones > Headbands',
    googleCategoryId: '180',
    condition: 'new',
    availability: 'in stock',
    shippingCountry: 'ES',
  },
  {
    slug: 'wave',
    name: 'Noctip Back',
    category: 'neck-recovery',
    price: 19.99,
    comparePrice: 31.99,
    images: ['/images/posture-corrector-1.webp','/images/posture-corrector-2.webp','/images/posture-corrector-3.webp'],
    shortDescription: 'Corrige tu postura en 2 semanas. Adiós al dolor de espalda del escritorio.',
    description: 'Corrector postural en Y, tallas XS-XL, malla transpirable, invisible bajo ropa, 15 min/día.',
    brand: 'Noctip',
    gtin: '',
    googleCategory: 'Health & Beauty > Health Care > Back & Posture Support',
    googleCategoryId: '465',
    condition: 'new',
    availability: 'in stock',
    shippingCountry: 'ES',
  },
  {
    slug: 'neck-massager',
    name: 'Noctip Cervical',
    category: 'neck-recovery',
    price: 21.99,
    comparePrice: 34.99,
    images: ['/images/cervical-gallery-1.jpg','/images/cervical-gallery-2.jpg','/images/cervical-gallery-3.jpg'],
    shortDescription: 'Alivio cervical profesional en 15 minutos. Tres capas de relajación.',
    description: 'Masajeador cervical electrodos curvos, 3 capas relajación, 15 min auto, portátil, USB.',
    brand: 'Noctip',
    gtin: '',
    googleCategory: 'Health & Beauty > Health Care > Massage & Relaxation',
    googleCategoryId: '468',
    condition: 'new',
    availability: 'in stock',
    shippingCountry: 'ES',
  },
]

const BASE_URL = 'https://noctip.com'
const LOCALES = ['es','en']

function esc(s: string): string {
  return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&apos;')
}

function buildTitle(p: typeof CATALOG[0], locale: string): string {
  // Fórmula Marca + tipo + atributo clave (≤150c) — GMC pide keyword delante
  const titles: Record<string, Record<string,string>> = {
    halo: { es: 'Noctip Halo — Férula Anti-ronquidos Ajustable 10mm | Silicona Médica + Estuche', en: 'Noctip Halo — Adjustable Anti-Snoring Mouthpiece 10mm | Medical Silicone + Case' },
    'sleep-headband': { es: 'Noctip Rest — Banda Sueño Bluetooth 5.0 Lavable | 45g Altavoces Ultrafinos 10h', en: 'Noctip Rest — Sleep Headband Bluetooth 5.0 Washable | 45g Ultra-thin Speakers 10h' },
    wave: { es: 'Noctip Back — Corrector Postural Y Invisible | XS-XL Malla Transpirable 15min/día', en: 'Noctip Back — Posture Corrector Y Invisible | XS-XL Breathable Mesh 15min/day' },
    'neck-massager': { es: 'Noctip Cervical — Masajeador Cuello Portátil | Electrodos Curvos 3 Capas 15min', en: 'Noctip Cervical — Neck Massager Portable | Curved Electrodes 3 Layers 15min' },
  }
  return titles[p.slug]?.[locale] ?? `${p.name} — ${p.shortDescription}`
}

function buildDescription(p: typeof CATALOG[0]): string {
  return `${p.shortDescription} ${p.description} Envío 5-10 días con seguimiento. 30 noches de prueba o reembolso total. Pago seguro Stripe.`.slice(0, 500)
}

function itemXml(p: typeof CATALOG[0], locale: string): string {
  const id = `${p.slug}_${locale}`
  const link = `${BASE_URL}/${locale}/products/${p.slug}`
  const image = `${BASE_URL}${p.images[0]}`
  const addImages = p.images.slice(1,3).map(img => `    <g:additional_image_link>${BASE_URL}${img}</g:additional_image_link>`).join('\n')
  const title = esc(buildTitle(p, locale))
  const desc = esc(buildDescription(p))
  const price = `${p.price.toFixed(2)} EUR`
  // identifier_exists no si no hay GTIN/MPN (evita suspensión)
  const identifierExists = p.gtin ? 'yes' : 'no'
  return `  <item>
    <g:id>${id}</g:id>
    <g:title>${title}</g:title>
    <g:description>${desc}</g:description>
    <g:link>${link}</g:link>
    <g:image_link>${image}</g:image_link>
${addImages ? addImages + '\n' : ''}    <g:condition>${p.condition}</g:condition>
    <g:availability>${p.availability}</g:availability>
    <g:price>${price}</g:price>
    <g:brand>${esc(p.brand)}</g:brand>
    <g:google_product_category>${esc(p.googleCategory)}</g:google_product_category>
    <g:product_type>${esc(p.category)}</g:product_type>
    <g:identifier_exists>${identifierExists}</g:identifier_exists>
    ${p.gtin ? `<g:gtin>${p.gtin}</g:gtin>` : ''}
    <g:shipping>
      <g:country>${p.shippingCountry}</g:country>
      <g:service>Standard</g:service>
      <g:price>0.00 EUR</g:price>
      <g:min_handling_time>1</g:min_handling_time>
      <g:max_handling_time>1</g:max_handling_time>
      <g:min_transit_time>5</g:min_transit_time>
      <g:max_transit_time>10</g:max_transit_time>
    </g:shipping>
    <g:shipping_label>standard</g:shipping_label>
    <g:adult>no</g:adult>
    <g:custom_label_0>${p.category}</g:custom_label_0>
    <g:custom_label_1>${locale}</g:custom_label_1>
  </item>`
}

function buildFeed(): string {
  const items: string[] = []
  for (const locale of LOCALES) {
    for (const p of CATALOG) {
      items.push(itemXml(p, locale))
    }
  }
  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:g="http://base.google.com/ns/1.0">
<channel>
  <title>Noctip — Product Feed</title>
  <link>${BASE_URL}</link>
  <description>Feed de productos Noctip para Google Merchant Center. Actualizado ${new Date().toISOString().split('T')[0]}</description>
${items.join('\n')}
</channel>
</rss>
`
}

function main() {
  const outDir = path.join(process.cwd(), 'public', 'feeds')
  fs.mkdirSync(outDir, { recursive: true })
  const outPath = path.join(outDir, 'noctip_products.xml')
  const xml = buildFeed()
  fs.writeFileSync(outPath, xml, 'utf8')
  console.log(`✅ Feed generado: ${outPath}`)
  console.log(`   Items: ${CATALOG.length * LOCALES.length} (${CATALOG.length} productos × ${LOCALES.length} locales)`)
  console.log(`   Base URL: ${BASE_URL}`)
  console.log(`   Comprueba imagen sin badge, precio == landing, y sube a GMC: https://merchants.google.com`)
}

main()
