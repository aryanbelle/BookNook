/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#e0e0f0',
          100: '#c1c1e1',
          200: '#a3a3d2',
          300: '#8484c3',
          400: '#6565b4',
          500: '#4747a5',
          600: '#282896',
          700: '#191987',
          800: '#0d0d78',
          900: '#070738',
        },
        secondary: {
          50: '#e6f7ff',
          100: '#b3e5ff',
          200: '#80d2ff',
          300: '#4dbfff',
          400: '#1aacff',
          500: '#0099ff',
          600: '#007acc',
          700: '#005c99',
          800: '#003d66',
          900: '#001f33',
        },
        accent: {
          50: '#fff0e6',
          100: '#ffe0cc',
          200: '#ffc199',
          300: '#ffa366',
          400: '#ff8433',
          500: '#ff6500',
          600: '#cc5200',
          700: '#993d00',
          800: '#662900',
          900: '#331400',
        },
        success: {
          500: '#10b981',
          600: '#059669',
        },
        warning: {
          500: '#f59e0b',
          600: '#d97706',
        },
        error: {
          500: '#ef4444',
          600: '#dc2626',
        },
      },
      fontFamily: {
        sans: ['Inter', 'Roboto', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        heading: ['Roboto', 'Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'flat': '0 1px 1px rgba(0, 0, 0, 0.03)',
        'hover': '0 2px 4px rgba(0, 0, 0, 0.08)',
        'card': '0 1px 2px rgba(9, 30, 66, 0.08)',
        'dropdown': '0 2px 6px rgba(9, 30, 66, 0.12)',
      },
      borderRadius: {
        'sm': '2px',
        DEFAULT: '3px',
        'md': '4px',
        'lg': '6px',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}