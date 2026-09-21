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
          50: '#f2f9f5',
          100: '#d4e9e2', // Mint wash (Starbucks / Botanical craft)
          200: '#a7d9c6',
          300: '#71c2a3',
          400: '#3ba77e',
          500: '#00875a',
          600: '#00754A', // Green Accent (Luminous CTA)
          700: '#006241', // Historic Brand Green
          800: '#1E3932', // House Deep Green
          900: '#132621',
          950: '#0a1613',
        },
        brown: {
          50: '#fcfbf9',
          100: '#f4f2ee',
          200: '#e8e5de',
          300: '#d2cdc3',
          400: '#9b9487',
          500: '#6f685c',
          600: '#524c42',
          700: '#38342d',
          800: '#22201c',
          900: '#161513',
          950: '#0c0c0b',
        },
        cream: '#f8f7f4', // Warm canvas cream
        ceramic: '#edebe9',
        gold: {
          400: '#dfc49d',
          500: '#cba258',
          600: '#b88c42',
        },
      },
      fontFamily: {
        sans: ['Vazirmatn', 'Inter', 'system-ui', 'sans-serif'],
        display: ['Vazirmatn', 'sans-serif'],
      },
      borderRadius: {
        'pill': '50px',
      },
      boxShadow: {
        'card-soft': '0 4px 20px -2px rgba(0, 98, 65, 0.05)',
        'float-cta': '0 8px 24px -4px rgba(0, 117, 74, 0.25)',
      }
    },
  },
  plugins: [],
}
