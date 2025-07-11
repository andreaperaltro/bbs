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
    },
  },
  plugins: [],
}; 