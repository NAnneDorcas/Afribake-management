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
        afri: {
          brown: {
            50: '#fdf8f3',
            100: '#f9ede0',
            200: '#f2d9bf',
            300: '#e9bf96',
            400: '#de9e6c',
            500: '#d6854d',
            600: '#c56d3a',
            700: '#a3542f',
            800: '#834529',
          },
          cream: {
            50: '#fefdfb',
            100: '#fcf8f0',
            200: '#f8f0e1',
            300: '#f3e5ce',
            400: '#edd9b8',
            500: '#e8cfab',
          },
          terracotta: {
            50: '#fef6f4',
            100: '#feeaeb',
            200: '#fdd7d5',
            300: '#f9bcb5',
            400: '#f29487',
            500: '#e57063',
            600: '#d45142',
            700: '#b13d31',
            800: '#8f342b',
          },
          gold: {
            50: '#fffbeb',
            100: '#fef3c7',
            200: '#fde68a',
            300: '#fcd34d',
            400: '#fbbf24',
            500: '#f59e0b',
            600: '#d97706',
            700: '#b45309',
          },
          earth: {
            50: '#faf8f6',
            100: '#f3f0ec',
            200: '#e8e2dc',
            300: '#d4ccc2',
            400: '#b8aa9b',
            500: '#9c8a78',
            600: '#7d6b59',
            700: '#5a4b3c',
            800: '#332b22',
          }
        }
      },
      fontFamily: {
        display: ['Playfair Display', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
