/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9f5',
          100: '#d8eee5',
          200: '#b2ddd0',
          300: '#80c4b3',
          400: '#4da693',
          500: '#00875a',
          600: '#00754a', // Luminous botanical accent
          700: '#006241', // Historic heritage green
          800: '#1e3932', // Deep house pine
          900: '#142722',
          950: '#0a1613',
        },
        surface: {
          light: '#ffffff',
          'light-subtle': '#f6f5f1',
          dark: '#101714',
          'dark-elevated': '#16201b',
        },
        canvas: {
          light: '#faf9f5', // Warm artisanal bone
          dark: '#080d0b',  // Botanical obsidian
        },
        brown: {
          50: '#faf9f6',
          100: '#f3f1ec',
          200: '#e5e2d9',
          300: '#cfc9bd',
          400: '#9b9487',
          500: '#6f685c',
          600: '#524c42',
          700: '#38342d',
          750: '#26231e',
          800: '#1c2420',
          850: '#141a17',
          900: '#101613',
          950: '#080d0b',
        },
        cream: '#faf9f5',
        gold: {
          400: '#e0c89d',
          500: '#cba258', // Editorial Reserve Gold
          600: '#b68940',
        },
      },
      fontFamily: {
        sans: ['Vazirmatn', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Vazirmatn', 'sans-serif'],
      },
      boxShadow: {
        'whisper': '0 2px 8px -1px rgba(0, 0, 0, 0.04), 0 1px 2px -1px rgba(0, 0, 0, 0.02)',
        'lift': '0 12px 32px -4px rgba(0, 98, 65, 0.08), 0 4px 12px -2px rgba(0, 0, 0, 0.04)',
        'glow-emerald': '0 0 24px -2px rgba(0, 117, 74, 0.28)',
      },
      borderRadius: {
        'pill': '9999px',
        '2.5xl': '20px',
        '3xl': '24px',
        '4xl': '32px',
      }
    },
  },
  plugins: [],
}
