import { Instagram, Twitter, Youtube } from 'lucide-react'
import { useLocale } from 'next-intl'

const links = {
  product: [
    { label: 'PULSE PRO X', href: '#products' },
    { label: 'CERVIFLEX™', href: '#products' },
    { label: 'SLEEPSEAL™', href: '#products' },
    { label: 'Complete Kit', href: '#offer' },
  ],
  company: [
    { label: 'About', href: '#' },
    { label: 'Science', href: '#' },
    { label: 'Athletes', href: '#' },
    { label: 'Blog', href: '#' },
  ],
  support: [
    { label: 'FAQ', href: '#' },
    { label: 'Shipping', href: '#' },
    { label: 'Returns', href: '#' },
    { label: 'Contact', href: '#' },
  ],
}

export default function Footer() {
  const locale = useLocale();
  return (
    <footer className="relative border-t border-white/5 bg-[#040407]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid lg:grid-cols-5 gap-12 lg:gap-8">
          {/* Brand column */}
          <div className="lg:col-span-2 space-y-5">
            <div className="flex items-center gap-3">
              <svg viewBox="0 0 32 32" fill="none" className="w-7 h-7">
                <rect x="4" y="4" width="10" height="10" rx="2" fill="#0ea5e9" />
                <rect x="18" y="4" width="10" height="10" rx="2" fill="#0ea5e9" opacity="0.4" />
                <rect x="4" y="18" width="10" height="10" rx="2" fill="#0ea5e9" opacity="0.4" />
                <rect x="18" y="18" width="10" height="10" rx="2" fill="#0ea5e9" />
              </svg>
              <span className="font-display font-bold text-sm tracking-[0.2em] uppercase text-white">
                Recovery System<span className="text-electric-400">™</span>
              </span>
            </div>

            <p className="text-sm text-slate-500 leading-relaxed max-w-xs">
              Premium wellness technology for athletes, performers, and anyone serious about recovery.
              Deep muscle relief. Better sleep. Faster gains.
            </p>

            {/* Social icons */}
            <div className="flex gap-4 pt-2">
              {[
                { Icon: Instagram, href: '#' },
                { Icon: Twitter, href: '#' },
                { Icon: Youtube, href: '#' },
              ].map(({ Icon, href }, i) => (
                <a
                  key={i}
                  href={href}
                  className="w-9 h-9 rounded-lg glass-card border border-white/5 flex items-center justify-center text-slate-500 hover:text-electric-400 hover:border-electric-500/25 transition-all duration-200"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {([
            { title: 'Products', links: links.product },
            { title: 'Company', links: links.company },
            { title: 'Support', links: links.support },
          ] as const).map((col) => (
            <div key={col.title}>
              <div className="text-[10px] font-bold tracking-[0.2em] text-slate-600 uppercase mb-5">{col.title}</div>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-slate-500 hover:text-white transition-colors duration-200"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
          <div className="mt-16 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-700">
            © {new Date().getFullYear()} Recovery System™. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a href={`/${locale}/legal/privacy`} className="text-xs text-slate-700 hover:text-slate-400 transition-colors">Privacy Policy</a>
            <a href={`/${locale}/legal/terms`} className="text-xs text-slate-700 hover:text-slate-400 transition-colors">Terms of Use</a>
            <a href={`/${locale}/legal/shipping`} className="text-xs text-slate-700 hover:text-slate-400 transition-colors">Shipping</a>
            <a href={`/${locale}/legal/returns`} className="text-xs text-slate-700 hover:text-slate-400 transition-colors">Returns</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
