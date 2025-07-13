/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './public/index.html',
  ],
  theme: {
    extend: {
      colors: {
        'bbs-bg': 'var(--bbs-bg)',
        'bbs-fg': 'var(--bbs-fg)',
        'bbs-white': 'var(--bbs-white)',
        'bbs-green': 'var(--bbs-green)',
        'bbs-cyan': 'var(--bbs-cyan)',
        'bbs-yellow': 'var(--bbs-yellow)',
        'bbs-magenta': 'var(--bbs-magenta)',
        'bbs-red': 'var(--bbs-red)',
        'bbs-blue': 'var(--bbs-blue)',
      },
      fontSize: {
        'xs': '0.75rem',     // 12px
        'sm': '0.875rem',    // 14px
        'base': '0.75rem',   // 12px
        'lg': '1.125rem',    // 18px
        'xl': '1.25rem',     // 20px
        '2xl': '1.5rem',     // 24px
        '3xl': '1.875rem',   // 30px
        '4xl': '2.25rem',    // 36px
        '5xl': '3rem',       // 48px
        '6xl': '3.75rem',    // 60px
        '7xl': '4.5rem',     // 72px
        '8xl': '6rem',       // 96px
        '9xl': '8rem',       // 128px
      },
      animation: {
        blink: 'blink 1s steps(2, start) infinite',
        scrollbar: 'scrollbar 1.2s linear infinite',
        bounce0: 'bounce0 0.8s 0s infinite',
        bounce1: 'bounce1 0.8s 0.1s infinite',
        bounce2: 'bounce2 0.8s 0.2s infinite',
        bounce3: 'bounce3 0.8s 0.3s infinite',
      },
      keyframes: {
        blink: {
          '0%,100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        scrollbar: {
          '0%': { left: '-30%' },
          '100%': { left: '100%' },
        },
        bounce0: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-1.5rem)' },
        },
        bounce1: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-1.5rem)' },
        },
        bounce2: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-1.5rem)' },
        },
        bounce3: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-1.5rem)' },
        },
      },
    },
  },
  plugins: [],
}; 