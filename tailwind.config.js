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
    },
  },
  plugins: [],
}; 