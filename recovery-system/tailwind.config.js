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
        electric: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        },
        surface: {
          50: 'rgba(255,255,255,0.05)',
          100: 'rgba(255,255,255,0.08)',
          200: 'rgba(255,255,255,0.10)',
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'glow-blue': 'radial-gradient(ellipse at center, rgba(14,165,233,0.15) 0%, transparent 70%)',
        'glow-blue-strong': 'radial-gradient(ellipse at center, rgba(14,165,233,0.25) 0%, transparent 60%)',
        'noise': "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E\")",
      },
      animation: {
        'float': 'float 4s ease-in-out infinite',
        'float-slow': 'float 6s ease-in-out infinite',
        'float-delayed': 'float 4s ease-in-out 1.5s infinite',
        'glow-pulse': 'glow-pulse 2.5s ease-in-out infinite',
        'gradient-x': 'gradient-x 6s ease infinite',
        'slide-up': 'slide-up 0.6s ease-out',
        'spin-slow': 'spin 12s linear infinite',
        'ping-slow': 'ping 3s cubic-bezier(0, 0, 0.2, 1) infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-18px)' },
        },
        'glow-pulse': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(14,165,233,0.2), 0 0 40px rgba(14,165,233,0.1)' },
          '50%': { boxShadow: '0 0 40px rgba(14,165,233,0.5), 0 0 80px rgba(14,165,233,0.2)' },
        },
        'gradient-x': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        'slide-up': {
          '0%': { transform: 'translateY(30px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
      boxShadow: {
        'glow-sm': '0 0 15px rgba(14,165,233,0.3)',
        'glow': '0 0 30px rgba(14,165,233,0.3)',
        'glow-lg': '0 0 60px rgba(14,165,233,0.3)',
        'glow-xl': '0 0 100px rgba(14,165,233,0.4)',
        'card': '0 1px 0 rgba(255,255,255,0.05), 0 8px 32px rgba(0,0,0,0.4)',
        'card-hover': '0 1px 0 rgba(255,255,255,0.08), 0 16px 48px rgba(0,0,0,0.6), 0 0 40px rgba(14,165,233,0.15)',
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}
