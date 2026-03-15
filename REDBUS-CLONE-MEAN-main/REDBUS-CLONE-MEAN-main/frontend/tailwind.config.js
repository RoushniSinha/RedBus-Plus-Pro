/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // OLED-optimized true black for dark mode backgrounds
        'oled-black': '#000000',
      }
    },
  },
  plugins: [],
}