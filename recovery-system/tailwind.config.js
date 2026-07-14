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
        base: {
          DEFAULT: '#080c12',
          light: '#0c1016',
          surface: '#0f1724',
          elevated: '#162035',
        },
        text: {
          primary: '#EAF1FF',
          secondary: '#9AA8C2',
          muted: '#4E5E7A',
        },
        accent: {
          DEFAULT: '#10BFD8',
          hover: '#0EA5C9',
          dim: '#0B8FA3',
        },
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
          900: '#080c12',
          800: '#0f1724',
          700: '#162035',
        },
        glass: {
          white: 'rgba(255,255,255,0.04)',
          border: 'rgba(255,255,255,0.1)',
          hover: 'rgba(255,255,255,0.08)',
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
          from: { opacity: '0', transform: 'translateY(24px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        'float-slow': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-16px)' },
        },
        'glow-pulse': {
          '0%, 100%': { opacity: '0.5', transform: 'scale(1)' },
          '50%': { opacity: '0.85', transform: 'scale(1.06)' },
        },
        'slide-in-right': {
          from: { opacity: '0', transform: 'translateX(20px)' },
          to: { opacity: '1', transform: 'translateX(0)' },
        },
        'scale-in': {
          from: { opacity: '0', transform: 'scale(0.96)' },
          to: { opacity: '1', transform: 'scale(1)' },
        },
      },
      animation: {
        breathe: 'breathe 4s ease-in-out infinite',
        'breathe-ring': 'breathe-ring 3s cubic-bezier(0.215,0.61,0.355,1) infinite',
        'fade-up': 'fade-up 0.7s cubic-bezier(0.22,1,0.36,1) forwards',
        'fade-in': 'fade-in 0.5s ease-out forwards',
        shimmer: 'shimmer 2.5s linear infinite',
        'float-slow': 'float-slow 8s ease-in-out infinite',
        'glow-pulse': 'glow-pulse 3s ease-in-out infinite',
        'slide-in-right': 'slide-in-right 0.6s cubic-bezier(0.22,1,0.36,1) forwards',
        'scale-in': 'scale-in 0.3s cubic-bezier(0.22,1,0.36,1) forwards',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      boxShadow: {
        'glow-sm': '0 0 16px rgba(16,191,216,0.3)',
        'glow': '0 0 28px rgba(16,191,216,0.4)',
        'glow-lg': '0 0 48px rgba(16,191,216,0.35)',
        'card': '0 20px 50px rgba(4,9,20,0.35)',
        'card-hover': '0 28px 64px rgba(4,9,20,0.45), 0 0 0 1px rgba(16,191,216,0.15)',
        'premium': '0 4px 24px rgba(0,0,0,0.3), 0 1px 0 rgba(255,255,255,0.06) inset',
        'premium-hover': '0 12px 48px rgba(0,0,0,0.4), 0 1px 0 rgba(255,255,255,0.1) inset',
        'modal': '0 32px 80px rgba(0,0,0,0.6)',
      },
    },
  },
  plugins: [],
}
