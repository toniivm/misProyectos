import type { Metadata } from 'next'
import Link from 'next/link'

const POSTS = [
  {
    slug: 'como-dejar-de-roncar-sin-cirugia',
    title_es: 'Cómo dejar de roncar sin cirugía: guía honesta 2026',
    title_en: 'How to Stop Snoring Without Surgery: Honest Guide 2026',
    excerpt_es: 'Roncas y tu pareja te echa del cuarto. Sin humo: qué funciona, qué no, y cuándo probar una férula como Noctip Halo.',
    excerpt_en: 'You snore and your partner kicks you out. No BS: what works, what does not, and when to try a mouthpiece like Halo.',
    date: '2026-09-17',
  },
  {
    slug: 'como-dormir-mejor-sin-pastillas',
    title_es: 'Cómo dormir mejor sin pastillas: 7 rutinas que sí ayudan',
    title_en: 'How to Sleep Better Without Pills: 7 Routines That Help',
    excerpt_es: 'Luz, ruido, rutina. Antes de pastillas, prueba esto — incluida banda de audio como Noctip Rest si no toleras auriculares.',
    excerpt_en: 'Light, noise, routine. Before pills, try this — including a sleep headband like Rest if you hate earbuds.',
    date: '2026-09-17',
  },
]

export async function generateMetadata({ params }: { params: { locale: string }}): Promise<Metadata> {
  const isEs = params.locale === 'es'
  return {
    title: isEs ? 'Blog Noctip — Consejos de sueño y postura' : 'Noctip Blog — Sleep & Posture Tips',
    description: isEs ? 'Guías honestas para dormir mejor, dejar de roncar y corregir postura. Sin milagros, solo hábitos y herramientas.' : 'Honest guides to sleep better, stop snoring and fix posture.',
    alternates: {
      canonical: `https://noctip.com/${params.locale}/blog`,
      languages: { es: 'https://noctip.com/es/blog', en: 'https://noctip.com/en/blog' },
    },
  }
}

export default function BlogIndex({ params }: { params: { locale: string }}) {
  const isEs = params.locale === 'es'
  return (
    <div className="min-h-screen bg-[#080c12] text-[#f2eee7]">
      <div className="mx-auto max-w-[900px] px-4 sm:px-6 py-12 sm:py-16">
        <h1 className="text-[28px] sm:text-[36px] font-bold tracking-[-0.03em]">{isEs ? 'Blog Noctip' : 'Noctip Blog'}</h1>
        <p className="mt-3 text-[14px] leading-6 text-[#8791a1] max-w-[600px]">
          {isEs ? 'Guías sin humo. Si sospechas apnea o dolor crónico, consulta a tu médico.' : 'No-BS guides. Suspected apnea or chronic pain? See your doctor.'}
        </p>
        <div className="mt-10 grid gap-4">
          {POSTS.map(p => (
            <Link key={p.slug} href={`/${params.locale}/blog/${p.slug}`} className="group rounded-2xl border border-white/[0.06] bg-[#0d1219] p-6 hover:border-white/[0.12] transition-colors">
              <div className="text-[12px] text-[#6b7785]">{p.date}</div>
              <h2 className="mt-1 text-[18px] font-semibold group-hover:text-white">{isEs ? p.title_es : p.title_en}</h2>
              <p className="mt-2 text-[13px] leading-6 text-[#8791a1]">{isEs ? p.excerpt_es : p.excerpt_en}</p>
              <span className="mt-4 inline-flex text-[13px] font-medium text-[#10BFD8]">→ {isEs ? 'Leer' : 'Read'}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
