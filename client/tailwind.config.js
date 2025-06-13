/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}", // This line ensures all JS/JSX/TS/TSX files in src are scanned
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'], // Define Inter as the default sans-serif font
      },
    },
  },
  plugins: [],
}