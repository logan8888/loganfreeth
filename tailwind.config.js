/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: '#F9F7F4',
        'bg-alt': '#F1EDE8',
        charcoal: '#1C1C1A',
        dark: '#2A2A28',
        muted: '#6E6B67',
        faint: '#9E9A95',
        border: '#E5E0D9',
        accent: '#B8956A',
        'accent-light': '#F0E8DC',
      },
      fontFamily: {
        display: ['var(--font-cormorant)', 'Georgia', 'serif'],
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        tight: '-0.03em',
        tighter: '-0.04em',
        wide: '0.08em',
        wider: '0.12em',
      },
      maxWidth: {
        content: '1200px',
      },
      aspectRatio: {
        portrait: '3 / 4',
        landscape: '4 / 3',
        square: '1 / 1',
      },
    },
  },
  plugins: [],
}

export default config
