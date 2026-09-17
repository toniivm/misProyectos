import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

type Post = {
  slug: string
  title_es: string
  title_en: string
  desc_es: string
  desc_en: string
  body_es: string
  body_en: string
  faq_es: { q: string; a: string }[]
  faq_en: { q: string; a: string }[]
}

const POSTS: Record<string, Post> = {
  'como-dejar-de-roncar-sin-cirugia': {
    slug: 'como-dejar-de-roncar-sin-cirugia',
    title_es: 'Cómo dejar de roncar sin cirugía: guía honesta 2026',
    title_en: 'How to Stop Snoring Without Surgery: Honest Guide 2026',
    desc_es: 'Sin cirugía ni pastillas: higiene, postura, peso y cuándo probar férula tipo Noctip Halo. Con aviso médico.',
    desc_en: 'No surgery or pills: hygiene, posture, weight and when to try a Halo-type mouthpiece. Medical disclaimer included.',
    body_es: `
<h2>1) Por qué roncas</h2>
<p>El aire vibra cuando la vía aérea se estrecha al dormir (boca, lengua, cuello). Alcohol, peso, dormir boca arriba y congestión lo empeoran. <strong>Si sospechas apnea (pausas, asfixia, somnolencia diurna) ve al médico</strong>. Ninguna férula sustituye diagnóstico.</p>

<h2>2) Qué probar primero (gratis)</h2>
<ul>
<li><strong>Duerme de lado:</strong> almohada cuerpo o truco tenis en pijama.</li>
<li><strong>Higiene:</strong> cena ligera 3h antes, sin alcohol 4h antes, nariz despejada (suero, tira nasal).</li>
<li><strong>Peso y cuello:</strong> -5% peso suele bajar ronquido. 15 min/día de corrección postural ayuda a respiración.</li>
</ul>

<h2>3) Herramientas que ayudan</h2>
<ul>
<li><strong>Férula de avance mandibular (MAD)</strong> como <a href="/es/products/halo">Noctip Halo</a>: avanza ~10mm, abre vía aérea. Útil en ronquido primario sin apnea grave. Requiere adaptación 3-7 noches, limpieza diaria, 30 noches de prueba.</li>
<li><strong>Tiras nasales / dilatadores:</strong> alivian congestión leve, no corrigen lengua.</li>
<li><strong>CPAP:</strong> solo si médico lo indica para apnea.</li>
</ul>

<h2>4) Qué NO funciona solo</h2>
<p>Sprays milagro, imanes, apps que “entrenan” sin cambiar postura/peso. Úsalos como apoyo, no solución.</p>

<h2>5) Plan 14 días</h2>
<ol>
<li>Días 1-3: lado + higiene + diario de ronquido (tu pareja anota 0-10).</li>
<li>Días 4-10: añade férula Halo cada noche, ajusta 1mm cada 2 noches hasta silencio sin molestia.</li>
<li>Días 11-14: evalúa. Si baja ≥3 puntos, sigue. Si no o empeora, médico.</li>
</ol>

<p><em>Transparencia:</em> vendemos <a href="/es/products/halo">Noctip Halo</a> y <a href="/es/products/sleep-headband">Noctip Rest</a> (si el ruido te despierta). Envío 5-10 días con seguimiento, 30 noches garantía. No somos producto sanitario.</p>
`,
    body_en: `
<h2>1) Why you snore</h2>
<p>Air vibrates when the airway narrows (mouth, tongue, neck). Alcohol, weight, back-sleeping and congestion worsen it. <strong>Suspected apnea? See a doctor</strong>.</p>
<h2>2) Free fixes first</h2>
<ul><li>Side-sleep, light dinner 3h before, no alcohol 4h before, clear nose.</li><li>Weight -5% often helps. Posture work aids breathing.</li></ul>
<h2>3) Tools</h2>
<ul><li><strong>MAD mouthpiece</strong> like <a href="/en/products/halo">Noctip Halo</a>: ~10mm advancement.</li><li>Nasal strips for mild congestion.</li><li>CPAP only if prescribed.</li></ul>
<h2>4) 14-day plan</h2>
<ol><li>Days 1-3: side + hygiene + diary.</li><li>Days 4-10: add Halo nightly, +1mm every 2 nights.</li><li>Days 11-14: evaluate.</li></ol>
<p><em>Disclosure:</em> we sell <a href="/en/products/halo">Halo</a> and <a href="/en/products/sleep-headband">Rest</a>. Ships 5-10 days, 30-night guarantee. Not a medical device.</p>
`,
    faq_es: [
      { q: '¿La férula duele?', a: 'Al inicio puede molestar mandíbula/baba. Ajusta 1mm cada 2 noches y limpia diario. Si dolor persiste, pausa y consulta.' },
      { q: '¿Sirve si tengo apnea?', a: 'Solo el médico lo decide. Ronquido fuerte + pausas + sueño diurno = estudio de sueño.' },
      { q: '¿Cuánto tarda el envío?', a: 'Procesamos en 24h, entrega 5-10 días laborables con seguimiento. 30 noches de prueba.' },
    ],
    faq_en: [
      { q: 'Does it hurt?', a: 'Jaw/drool at first is common. Adjust 1mm/2 nights, clean daily. Persistent pain → pause and ask a doctor.' },
      { q: 'Apnea?', a: 'Doctor decides. Loud snore + pauses + daytime sleepiness = sleep study.' },
      { q: 'Shipping?', a: 'Ships in 24h, 5-10 business days with tracking. 30-night trial.' },
    ],
  },
  'como-dormir-mejor-sin-pastillas': {
    slug: 'como-dormir-mejor-sin-pastillas',
    title_es: 'Cómo dormir mejor sin pastillas: 7 rutinas que sí ayudan',
    title_en: 'How to Sleep Better Without Pills: 7 Routines That Help',
    desc_es: 'Sin pastillas: luz, ruido y rutina. Cuando el audio ayuda, una banda como Noctip Rest evita presión en orejas.',
    desc_en: 'No pills: light, noise, routine. When audio helps, a Rest-like headband avoids ear pressure.',
    body_es: `
<h2>1) Luz</h2><p>Oscuridad total 30 min antes. Móvil fuera del dormitorio, luz cálida tenue.</p>
<h2>2) Ruido</h2><p>Si el silencio te activa, usa ruido blanco/podcast a volumen bajo. Si odias tapones/auriculares, prueba <a href="/es/products/sleep-headband">Noctip Rest</a>: 45g, altavoces ultrafinos que no presionan de lado, lavable, 10h.</p>
<h2>3) Temperatura</h2><p>18-19°C, ducha templada 60 min antes.</p>
<h2>4) Horario</h2><p>Acuéstate/levántate +-30 min mismo rango. Si no duermes en 20 min, levántate, luz tenue, vuelve.</p>
<h2>5) Cafeína/alcohol</h2><p>Café hasta 14:00, alcohol 4h antes. Cena ligera 3h antes.</p>
<h2>6) Siesta</h2><p>≤20 min antes de 15:00 o nada.</p>
<h2>7) Herramientas</h2><ul><li>Banda Rest para audio sin presión.</li><li>Antifaz si entra luz.</li></ul>
<p>Combina 2-3 cambios 14 días. Diario: hora cama, despertares, energía 0-10.</p>
<p>Tienda: <a href="/es/products/sleep-headband">Noctip Rest</a> y <a href="/es/products/wave">Noctip Back</a> (postura 15 min/día). Envío 5-10 días.</p>
`,
    body_en: `
<h2>1) Light</h2><p>Dark room 30 min before. Phone out, warm dim light.</p>
<h2>2) Noise</h2><p>White noise/podcast low volume. Hate buds? Try <a href="/en/products/sleep-headband">Rest</a>: 45g, ultra-thin, washable, 10h.</p>
<h2>3) Temp</h2><p>18-19°C, warm shower 60 min before.</p>
<h2>4) Schedule</h2><p>Same ±30 min. Awake 20 min → get up, dim light.</p>
<h2>5) Caffeine/alcohol</h2><p>Coffee till 14:00, no alcohol 4h before.</p>
<h2>6) Nap</h2><p>≤20 min before 15:00.</p>
<h2>7) Tools</h2><ul><li>Rest headband.</li><li>Eye mask.</li></ul>
<p>Store: <a href="/en/products/sleep-headband">Rest</a> and <a href="/en/products/wave">Back</a>. Ships 5-10 days.</p>
`,
    faq_es: [
      { q: '¿Ruido blanco engancha?', a: 'No crea dependencia como fármaco. Úsalo como rutina, baja volumen progresiva si quieres.' },
      { q: '¿La banda aprieta?', a: '45g elástica, no presiona. Retira altavoces y lava.' },
      { q: '¿Envío?', a: '24h proceso, 5-10 días entrega. 30 noches garantía.' },
    ],
    faq_en: [
      { q: 'White noise habit?', a: 'No drug dependency. Use as routine, taper volume if you wish.' },
      { q: 'Tight?', a: '45g stretch, no pressure. Remove speakers to wash.' },
      { q: 'Shipping?', a: '24h handling, 5-10 days. 30-night guarantee.' },
    ],
  },
  'corrector-postura-funciona-de-verdad': {
    slug: 'corrector-postura-funciona-de-verdad',
    title_es: 'Corrector de postura: ¿funciona de verdad o es placebo?',
    title_en: 'Posture Corrector: Does It Really Work or Is It Placebo?',
    desc_es: 'Evidencia, postura en Y, 15 min/día y ejercicios. Cuándo ayuda Noctip Back y cuándo no.',
    desc_en: 'Evidence, Y-shape, 15 min/day and exercises. When Noctip Back helps and when it does not.',
    body_es: `
<h2>1) Qué hace un corrector</h2><p>Recuerda a tu cuerpo la posición neutra (hombros atrás, pecho abierto). No “corrige” huesos, reentrena hábito neuromuscular. Útil si te encorvas 6-8h sentado.</p>
<h2>2) Evidencia</h2><p>Soporte externo + pausas activas mejora postura percibida en 2-4 semanas. Sin ejercicios, el efecto se pierde al quitarlo.</p>
<h2>3) Cómo usar Noctip Back</h2><ul><li>15 min/día, sube 5 min cada 3 días. Debajo de camiseta, talla XS-XL. Malla transpirable.</li><li>Combina: retracciones cervicales 10×3/día, estiramiento pecho 30s ×2.</li></ul>
<h2>4) Cuándo NO usar</h2><p>Dolor agudo, hernia sin diagnóstico, embarazo sin consejo médico. Si hormigueo/dolor aumenta, para.</p>
<p><em>Tienda:</em> <a href="/es/products/wave">Noctip Back</a> — 5-10 días, 30 noches. También <a href="/es/products/neck-massager">Cervical</a> para tensión puntual 15 min.</p>
`,
    body_en: `
<h2>1) What it does</h2><p>Reminds your body of neutral posture (shoulders back, chest open). Not bone correction, habit retraining. Useful if you hunch 6-8h.</p>
<h2>2) Evidence</h2><p>Support + active breaks improves perceived posture in 2-4 weeks. Without exercise, effect fades when removed.</p>
<h2>3) How to use Noctip Back</h2><ul><li>15 min/day, +5 min every 3 days. Under tee, XS-XL. Breathable mesh.</li><li>Add: chin tucks 10×3/day, chest stretch 30s ×2.</li></ul>
<h2>4) When not</h2><p>Acute pain, undiagnosed hernia, pregnancy without advice. Numbness ↑ → stop.</p>
<p><em>Store:</em> <a href="/en/products/wave">Noctip Back</a> — ships 5-10 days, 30 nights. Also <a href="/en/products/neck-massager">Cervical</a> 15 min.</p>
`,
    faq_es: [
      { q: '¿Todo el día?', a: 'No. 15-60 min/día. Todo el día crea dependencia muscular.' },
      { q: '¿Se ve bajo ropa?', a: 'Y fino, invisible bajo camiseta holgada.' },
      { q: '¿Envío?', a: '24h proceso, 5-10 días. 30 noches.' },
    ],
    faq_en: [
      { q: 'All day?', a: 'No. 15-60 min/day. All day creates dependence.' },
      { q: 'Visible?', a: 'Thin Y, invisible under loose tee.' },
      { q: 'Shipping?', a: '24h, 5-10 days. 30 nights.' },
    ],
  },
  'masajeador-cervical-beneficios': {
    slug: 'masajeador-cervical-beneficios',
    title_es: 'Masajeador cervical: beneficios, contraindicaciones y uso diario',
    title_en: 'Cervical Massager: Benefits, Contraindications and Daily Use',
    desc_es: '15 min, 3 capas, electrodos curvos. Para quién sí, para quién no, y rutina diaria segura.',
    desc_en: '15 min, 3 layers, curved electrodes. Who benefits, who should avoid, safe daily routine.',
    body_es: `
<h2>1) Para qué sirve</h2><p>Libera tensión de trapecio/ECOM tras móvil/ordenador. Calor + pulsos + presión suave mejoran sensación de descanso.</p>
<h2>2) Cómo usar Noctip Cervical</h2><ul><li>15 min sesión auto, 1/día. Electrodos curvos adaptables, no aprietes. Limpia piel antes.</li><li>Postura: sentado recto, hombros bajos, respira nasal 4-6.</li></ul>
<h2>3) Contraindicaciones</h2><p>Marcapasos, embarazo, piel dañada, fiebre, trombos, cervical operada sin alta. Duda → médico.</p>
<h2>4) Rutina</h2><p>Mañana o noche, tras estirar cuello 30s lado/ lado. Si dolor >3 días o irradia a mano, para y consulta.</p>
<p><em>Tienda:</em> <a href="/es/products/neck-massager">Noctip Cervical</a> — portátil, USB, 5-10 días. Combínalo con <a href="/es/products/wave">Back</a> para postura.</p>
`,
    body_en: `
<h2>1) What for</h2><p>Releases trap/SCM tension after phone/desk. Heat + pulses + gentle pressure.</p>
<h2>2) How to use Cervical</h2><ul><li>15 min auto, 1/day. Curved electrodes, don’t overtighten. Clean skin.</li><li>Posture: upright, shoulders down, nasal 4-6 breathing.</li></ul>
<h2>3) Avoid if</h2><p>Pacemaker, pregnancy, broken skin, fever, clots, operated neck without clearance. Doubt → doctor.</p>
<h2>4) Routine</h2><p>AM or PM after 30s/side stretch. Pain >3 days or radiating → stop.</p>
<p><em>Store:</em> <a href="/en/products/neck-massager">Cervical</a> — portable, USB, 5-10 days. Pair with <a href="/en/products/wave">Back</a>.</p>
`,
    faq_es: [
      { q: '¿Cada día?', a: 'Sí, 15 min/día. No más de 2 sesiones seguidas.' },
      { q: '¿Alergia?', a: 'No alergénico, carcasas ABS/TPR. Limpia electrodos tras uso.' },
      { q: '¿Envío?', a: '24h, 5-10 días. 30 noches.' },
    ],
    faq_en: [
      { q: 'Daily?', a: 'Yes, 15 min/day. No more than 2 back-to-back.' },
      { q: 'Allergy?', a: 'Non-allergenic ABS/TPR. Wipe electrodes after.' },
      { q: 'Shipping?', a: '24h, 5-10 days. 30 nights.' },
    ],
  },
}

export function generateStaticParams() {
  return ['es','en'].flatMap(locale => Object.keys(POSTS).map(slug => ({ locale, slug })))
}

export async function generateMetadata({ params }: { params: { locale: string; slug: string }}): Promise<Metadata> {
  const p = POSTS[params.slug]
  if (!p) return {}
  const isEs = params.locale === 'es'
  const title = isEs ? p.title_es : p.title_en
  const desc = isEs ? p.desc_es : p.desc_en
  return {
    title: `${title} — Noctip`,
    description: desc,
    alternates: { canonical: `https://noctip.com/${params.locale}/blog/${params.slug}`, languages: { es: `https://noctip.com/es/blog/${params.slug}`, en: `https://noctip.com/en/blog/${params.slug}` } },
    openGraph: { title: `${title} — Noctip`, description: desc, url: `https://noctip.com/${params.locale}/blog/${params.slug}`, type: 'article' },
  }
}

export default function BlogPost({ params }: { params: { locale: string; slug: string }}) {
  const p = POSTS[params.slug]
  if (!p) notFound()
  const isEs = params.locale === 'es'
  const title = isEs ? p.title_es : p.title_en
  const body = isEs ? p.body_es : p.body_en
  const faqs = isEs ? p.faq_es : p.faq_en

  const faqJson = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
  }
  const articleJson = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    author: { '@type': 'Organization', name: 'Noctip' },
    datePublished: '2026-09-17',
    dateModified: '2026-09-17',
  }

  return (
    <div className="min-h-screen bg-[#080c12] text-[#f2eee7]">
      <div className="mx-auto max-w-[720px] px-4 sm:px-6 py-10 sm:py-14">
        <nav className="text-[13px] text-[#6b7785] mb-6"><Link href={`/${params.locale}/blog`} className="hover:text-[#f2eee7]">← Blog</Link></nav>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJson) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJson) }} />
        <h1 className="text-[26px] sm:text-[34px] font-bold leading-tight tracking-[-0.02em]">{title}</h1>
        <p className="mt-3 text-[13px] text-[#6b7785]">Noctip · 17 sep 2026 · 5 min</p>
        <div className="mt-8 rounded-2xl border border-amber-500/20 bg-amber-500/10 px-4 py-3 text-[12px] leading-5 text-amber-200">
          {isEs ? 'No somos dispositivo médico. Si sospechas apnea o dolor crónico, consulta a tu médico.' : 'Not a medical device. Suspected apnea or chronic pain? See your doctor.'}
        </div>
        <article className="prose prose-invert mt-8 max-w-none prose-p:text-[#c8d0da] prose-p:leading-7 prose-a:text-[#10BFD8] prose-strong:text-[#f2eee7] prose-h2:text-[#f2eee7] prose-h2:mt-10 prose-li:text-[#c8d0da]" dangerouslySetInnerHTML={{ __html: body }} />
        <section className="mt-12 rounded-2xl border border-white/[0.06] bg-[#0d1219] p-6">
          <h2 className="text-[16px] font-semibold">{isEs ? 'Preguntas frecuentes' : 'FAQ'}</h2>
          <div className="mt-4 space-y-4">
            {faqs.map(f => (
              <div key={f.q} className="border-t border-white/[0.06] pt-4 first:border-0 first:pt-0">
                <div className="text-[14px] font-semibold">{f.q}</div>
                <div className="text-[13px] leading-6 text-[#8791a1] mt-1">{f.a}</div>
              </div>
            ))}
          </div>
        </section>
        <div className="mt-10 flex flex-wrap gap-3">
          <Link href={`/${params.locale}/products/sleep-headband`} className="rounded-full bg-white px-6 py-3 text-[14px] font-semibold text-[#080c12]">Noctip Rest</Link>
          <Link href={`/${params.locale}/products/halo`} className="rounded-full border border-white/10 px-6 py-3 text-[14px] font-medium text-[#c8d0da]">Noctip Halo</Link>
        </div>
      </div>
    </div>
  )
}
