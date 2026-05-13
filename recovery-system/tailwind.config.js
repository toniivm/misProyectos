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
        base: '#080808',
        surface: '#111111',
        elevated: '#1A1A1A',
        primary: '#E8E4DF',
        secondary: '#8A8580',
        muted: '#4A4744',
        accent: '#C8B89A',
        'accent-dim': '#7A6E60',
      },
      transitionDuration: {
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
      },
      animation: {
        breathe: 'breathe 4s ease-in-out infinite',
        'breathe-ring': 'breathe-ring 3s cubic-bezier(0.215,0.61,0.355,1) infinite',
        'fade-up': 'fade-up 0.7s ease-out forwards',
      },
    },
  },
  plugins: [],
}
