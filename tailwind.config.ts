import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'astor-dark': '#0f172a',
        'astor-blue': '#00d9ff',
        'astor-purple': '#a78bfa',
      },
    },
  },
  plugins: [],
}

export default config
