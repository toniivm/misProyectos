/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        display: ['var(--font-syne)', 'system-ui', 'sans-serif'],
      },
      colors: {
        base: '#080c16',
        surface: '#0f1724',
        elevated: '#162035',
        primary: '#EAF1FF',
        secondary: '#9AA8C2',
        muted: '#4E5E7A',
        accent: '#10BFD8',
        'accent-dim': '#0B8FA3',
        electric: {
          300: '#7FD9FF',
          400: '#38C8E8',
          500: '#10BFD8',
          600: '#0B99AF',
        },
        mint: '#9DE8D7',
        slate: {
          300: '#CBD5E1',
          400: '#94A3B8',
          500: '#64748B',
          600: '#475569',
          700: '#334155',
          800: '#1E293B',
          900: '#0F172A',
        },
        violet: {
          300: '#C4B5FD',
          400: '#A78BFA',
          500: '#9E92FF',
          600: '#7C6FF7',
        },
        navy: {
          900: '#080c16',
          800: '#0f1724',
          700: '#162035',
        },
      },
      transitionDuration: {
        '400': '400ms',
        '600': '600ms',
        '800': '800ms',
        '900': '900ms',
      },
      keyframes: {
        breathe: {
          '0%, 100%': { transform: 'scale(1)', opacity: '0.45' },
          '50%': { transform: 'scale(1.14)', opacity: '0.8' },
        },
        'breathe-ring': {
          '0%': { transform: 'scale(0.9)', opacity: '0.5' },
          '70%': { transform: 'scale(1.5)', opacity: '0' },
          '100%': { transform: 'scale(1.5)', opacity: '0' },
        },
        'fade-up': {
          from: { opacity: '0', transform: 'translateY(16px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
      },
      animation: {
        breathe: 'breathe 4s ease-in-out infinite',
        'breathe-ring': 'breathe-ring 3s cubic-bezier(0.215,0.61,0.355,1) infinite',
        'fade-up': 'fade-up 0.7s ease-out forwards',
        shimmer: 'shimmer 2.5s linear infinite',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      boxShadow: {
        'glow-sm': '0 0 16px rgba(16,191,216,0.3)',
        'glow': '0 0 28px rgba(16,191,216,0.4)',
        'glow-lg': '0 0 48px rgba(16,191,216,0.35)',
        'card': '0 20px 50px rgba(4,9,20,0.35)',
        'card-hover': '0 28px 64px rgba(4,9,20,0.45)',
      },
    },
  },
  plugins: [],
}
