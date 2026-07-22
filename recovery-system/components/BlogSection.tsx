'use client'

import { motion } from 'framer-motion'
import { useLocale } from 'next-intl'
import { BookOpen, ArrowRight, Clock } from 'lucide-react'
import Link from 'next/link'

const EASE_OUT = [0.0, 0.0, 0.2, 1] as const

interface BlogPost {
  id: string
  title: string
  excerpt: string
  category: string
  readTime: string
  date: string
  image?: string
  slug: string
}

const POSTS: BlogPost[] = [
  {
    id: 'b-1',
    title: 'How to Stop Snoring: 7 Proven Methods That Actually Work',
    excerpt: 'Snoring affects millions of people every night. Discover the most effective solutions backed by science and real user experiences.',
    category: 'Sleep',
    readTime: '5 min',
    date: '2025-07-15',
    image: '/images/rest/lifestyle/1.png',
    slug: 'how-to-stop-snoring',
  },
  {
    id: 'b-2',
    title: 'The Best Sleep Products for Better Rest in 2025',
    excerpt: 'From anti-snoring devices to sleep audio headbands, discover the top-rated products that are changing how people sleep.',
    category: 'Products',
    readTime: '7 min',
    date: '2025-07-10',
    image: '/images/halo/lifestyle/1.jpg',
    slug: 'best-sleep-products-2025',
  },
  {
    id: 'b-3',
    title: 'Why Posture Matters: The Hidden Cost of Sitting All Day',
    excerpt: 'Poor posture affects more than just your back. Learn how it impacts your sleep, energy, and overall health.',
    category: 'Health',
    readTime: '6 min',
    date: '2025-07-05',
    image: '/images/rest/lifestyle/2.png',
    slug: 'why-posture-matters',
  },
]

export default function BlogSection() {
  const locale = useLocale()
  const isEs = locale === 'es'

  return (
    <section className="py-16 sm:py-24 bg-[#0d1219]">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5, ease: EASE_OUT }}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-8 sm:mb-10">
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#10BFD8]/10 px-3 py-1 text-[10px] sm:text-[11px] font-semibold text-[#10BFD8] uppercase tracking-wide mb-3">
                <BookOpen size={12} />
                {isEs ? 'Blog' : 'Blog'}
              </span>
              <h2 className="font-heading text-[24px] sm:text-[32px] font-bold text-[#f2eee7]">
                {isEs ? 'Consejos y guías' : 'Tips & guides'}
              </h2>
            </div>
            <Link
              href={`/${locale}/blog`}
              className="hidden sm:flex items-center gap-2 text-[13px] font-medium text-[#8791a1] hover:text-[#10BFD8] transition-colors"
            >
              {isEs ? 'Ver todos' : 'View all'}
              <ArrowRight size={14} />
            </Link>
          </div>

          {/* Blog grid */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {POSTS.map((post, idx) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08, duration: 0.5, ease: EASE_OUT }}
                className="group rounded-2xl border border-white/[0.06] bg-[#111720] overflow-hidden transition-all duration-300 hover:border-[#10BFD8]/20 hover:shadow-[0_8px_40px_rgba(0,0,0,0.3)]"
              >
                {/* Image */}
                {post.image && (
                  <div className="aspect-[16/9] bg-[#080c12] overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                )}

                {/* Content */}
                <div className="p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="rounded-full bg-[#10BFD8]/10 px-2.5 py-0.5 text-[10px] font-bold text-[#10BFD8] uppercase">
                      {post.category}
                    </span>
                    <span className="flex items-center gap-1 text-[11px] text-[#6b7785]">
                      <Clock size={10} />
                      {post.readTime}
                    </span>
                  </div>
                  <h3 className="font-heading text-[16px] font-bold text-[#f2eee7] mb-2 line-clamp-2 group-hover:text-[#10BFD8] transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-[13px] leading-[1.6] text-[#8791a1] line-clamp-2">
                    {post.excerpt}
                  </p>
                </div>
              </motion.article>
            ))}
          </div>

          {/* Mobile CTA */}
          <div className="mt-6 text-center sm:hidden">
            <Link
              href={`/${locale}/blog`}
              className="inline-flex items-center gap-2 text-[13px] font-medium text-[#8791a1] hover:text-[#10BFD8] transition-colors"
            >
              {isEs ? 'Ver todos los artículos' : 'View all articles'}
              <ArrowRight size={14} />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
