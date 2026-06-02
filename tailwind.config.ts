import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Primary palette
        carbon:   '#07080A',
        ink:      '#0D1014',
        bone:     '#F4EFE6',
        porcelain:'#FFF9F0',
        // Gold
        'antique-gold': '#D4AF37',
        'aged-gold':    '#B9922A',
        // Signature night hue
        'midnight-plum': '#1E0C2C',
        // Utility neutrals
        smoke: '#2A2F36',
        ash:   '#A9A39A',
        fog:   '#7F7A73',
      },
      fontFamily: {
        serif: ['var(--font-cormorant)', 'Georgia', 'serif'],
        sans:  ['var(--font-dm-sans)',   'system-ui', 'sans-serif'],
      },
      fontSize: {
        // Editorial scale — restrained, never oversized
        'display': ['clamp(2.5rem, 6vw, 5rem)', { lineHeight: '1.05', letterSpacing: '-0.02em', fontWeight: '300' }],
        'headline': ['clamp(1.75rem, 3.5vw, 3rem)', { lineHeight: '1.1', letterSpacing: '-0.015em', fontWeight: '300' }],
        'title':    ['clamp(1.25rem, 2vw, 1.75rem)', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
        'body-lg':  ['1.125rem', { lineHeight: '1.7' }],
        'body':     ['1rem',     { lineHeight: '1.65' }],
        'body-sm':  ['0.875rem', { lineHeight: '1.6' }],
        'caption':  ['0.75rem',  { lineHeight: '1.5', letterSpacing: '0.06em' }],
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '30': '7.5rem',
        '34': '8.5rem',
      },
      borderColor: {
        DEFAULT: 'rgba(212, 175, 55, 0.2)', // hairline gold default
      },
      ringColor: {
        DEFAULT: '#D4AF37',
      },
      animation: {
        'grain': 'grain 0.5s steps(1) infinite',
        'glint': 'glint 0.25s ease-out forwards',
        'curtain-rise': 'curtain-rise 0.8s cubic-bezier(0.76, 0, 0.24, 1) forwards',
      },
      keyframes: {
        grain: {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '10%': { transform: 'translate(-2%, -3%)' },
          '20%': { transform: 'translate(3%, 2%)' },
          '30%': { transform: 'translate(-1%, 4%)' },
          '40%': { transform: 'translate(4%, -1%)' },
          '50%': { transform: 'translate(-3%, 3%)' },
          '60%': { transform: 'translate(2%, -4%)' },
          '70%': { transform: 'translate(-4%, 1%)' },
          '80%': { transform: 'translate(1%, -2%)' },
          '90%': { transform: 'translate(-2%, 4%)' },
        },
        glint: {
          '0%':   { opacity: '0', transform: 'translateX(-100%)' },
          '50%':  { opacity: '1' },
          '100%': { opacity: '0', transform: 'translateX(100%)' },
        },
        'curtain-rise': {
          '0%':   { transform: 'translateY(100%)' },
          '100%': { transform: 'translateY(0%)' },
        },
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #D4AF37 0%, #B9922A 50%, #D4AF37 100%)',
        'plum-gradient': 'linear-gradient(180deg, #2A1636 0%, #07080A 100%)',
      },
      boxShadow: {
        'gold-glow': '0 0 24px rgba(212, 175, 55, 0.15)',
        'inner-dark': 'inset 0 1px 0 rgba(255,255,255,0.04)',
      },
    },
  },
  plugins: [],
}

export default config
