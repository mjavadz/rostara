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
        border: "hsl(var(--border) / <alpha-value>)",
        input: "hsl(var(--input) / <alpha-value>)",
        ring: "hsl(var(--ring) / <alpha-value>)",
        background: "hsl(var(--background) / <alpha-value>)",
        foreground: "hsl(var(--foreground) / <alpha-value>)",
        brand: {
          DEFAULT: "hsl(var(--brand) / <alpha-value>)",
          foreground: "hsl(var(--brand-foreground) / <alpha-value>)",
        },
        card: {
          DEFAULT: "hsl(var(--card) / <alpha-value>)",
          foreground: "hsl(var(--card-foreground) / <alpha-value>)",
        },
        popover: {
          DEFAULT: "hsl(var(--popover) / <alpha-value>)",
          foreground: "hsl(var(--popover-foreground) / <alpha-value>)",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary) / <alpha-value>)",
          foreground: "hsl(var(--secondary-foreground) / <alpha-value>)",
        },
        muted: {
          DEFAULT: "hsl(var(--muted) / <alpha-value>)",
          foreground: "hsl(var(--muted-foreground) / <alpha-value>)",
        },
        accent: {
          DEFAULT: "hsl(var(--accent) / <alpha-value>)",
          foreground: "hsl(var(--accent-foreground) / <alpha-value>)",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive) / <alpha-value>)",
          foreground: "hsl(var(--destructive-foreground) / <alpha-value>)",
        },
        success: "hsl(var(--success) / <alpha-value>)",
        warning: "hsl(var(--warning) / <alpha-value>)",

        // Seed.com Iconic Clinical Botanical Palette
        seed: {
          forest: '#1c3a13',      // Forest Depths: Primary brand ink & dark sections
          forestDeep: '#10220b',  // Ultra deep forest
          forestDark: '#0a1608',  // Midnight botanical canvas
          lime: '#d3fa99',        // Lime Pulse: Signature scientific punctuation & active badge
          limeHover: '#c4f084',
          sage: '#757c5d',        // Sage Moss: Secondary botanical
          olive: '#9f995b',       // Olive Gold
          eucalyptus: '#698e79',   // Cool botanical blue-green
          snow: '#fcfcf7',        // Snow White: Warm organic off-white canvas
          stone: '#eeeee9',       // Warm Stone: Secondary surface & separators
          pewter: '#666666',      // Clinical secondary text
          charcoal: '#141414',
          glassDark: '#132412',   // Specimen glass surface in dark mode
        },
        primary: {
          50: '#f4f9f2',
          100: '#e5f2e1',
          200: '#d3fa99', // Seed Lime
          300: '#b0e86b',
          400: '#757c5d',
          500: '#2b581d',
          600: '#1c3a13', // Seed Forest Depths
          700: '#152d0e',
          800: '#10220b',
          900: '#0b1807',
          950: '#070f05',
          DEFAULT: "hsl(var(--primary) / <alpha-value>)",
          foreground: "hsl(var(--primary-foreground) / <alpha-value>)",
        },
        surface: {
          light: '#ffffff',
          'light-subtle': '#f6f6f1',
          dark: '#111e10',
          'dark-elevated': '#162815',
        },
        canvas: {
          light: '#fcfcf7', // Seed Snow White
          dark: '#0a1409',  // Seed Forest Dark
        },
        brown: {
          50: '#fcfcf7',
          100: '#f5f5f0',
          200: '#e8e8e2',
          300: '#d1d1ca',
          400: '#8e8e86',
          500: '#666666',
          600: '#4a4a45',
          700: '#333330',
          800: '#1a2419',
          850: '#131d12',
          900: '#0e170d',
          950: '#0a1409',
        },
        cream: '#fcfcf7',
        ceramic: '#eeeee9',
        gold: {
          400: '#e0c89d',
          500: '#cba258',
          600: '#b68940',
        },
      },
      fontFamily: {
        sans: ['Vazirmatn RD', 'Vazirmatn', 'Inter', 'system-ui', 'sans-serif'],
        display: ['Vazirmatn RD', 'Vazirmatn', 'sans-serif'],
        mono: ['SF Mono', 'Menlo', 'Consolas', 'monospace'],
      },
      borderRadius: {
        'pill': '9999px',
        'control': '9999px',
        'seed': '16px',
        'seed-lg': '22px',
      },
      boxShadow: {
        'seed-soft': '0 1px 3px rgba(0,0,0,0.02), 0 1px 2px rgba(0,0,0,0.04)',
        'seed-card': '0 8px 30px rgba(28, 58, 19, 0.04)',
        'seed-glow': '0 0 20px rgba(211, 250, 153, 0.35)',
      }
    },
  },
  plugins: [],
}
