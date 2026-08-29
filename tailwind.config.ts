import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        walima: {
          velvet: '#0f021e',
          neon: '#00ff66',
          gold: '#ffd700',
          glass: 'rgba(255,255,255,0.08)',
        },
      },
      fontFamily: {
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
        display: ['Georgia', 'Cambria', 'serif'],
      },
      boxShadow: {
        neon: '0 0 24px rgba(0,255,102,0.32)',
        gold: '0 0 24px rgba(255,215,0,0.28)',
      },
      backgroundImage: {
        'walima-grid': 'linear-gradient(rgba(0,255,102,.08) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,102,.08) 1px, transparent 1px)',
      },
    },
  },
  plugins: [],
}

export default config
