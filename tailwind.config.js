/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-dark': '#1a202c', // Similar to dark gray/charcoal
        'brand-green': '#19332d', // MRC Dark Green
        'brand-gold': '#b8860b', // MRC Gold
      }
    },
  },
  plugins: [],
}
