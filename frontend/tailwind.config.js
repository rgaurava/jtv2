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
          50: '#e6f7ff',
          100: '#b3e5ff',
          200: '#80d4ff',
          300: '#4dc2ff',
          400: '#1ab0ff',
          500: '#0693e3',
          600: '#0576b8',
          700: '#04598d',
          800: '#033c62',
          900: '#021f37',
        },
        sail: {
          charcoal: '#262626',
          dark: '#1a1a1a',
          'dark-lighter': '#333333',
          cyan: '#0693e3',
          purple: '#9b51e0',
          green: '#00d084',
          text: '#90979d',
          'text-light': '#b4b9bd',
        },
      },
      fontFamily: {
        sans: ['Arial', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'sans-serif'],
      },
      borderRadius: {
        'full-button': '9999px',
      },
    },
  },
  plugins: [],
}
