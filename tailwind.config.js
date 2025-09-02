/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      animation: {
        'pulse-slow': 'pulse 1.5s ease-in-out infinite'
      }
    }
  },
  plugins: []
}
