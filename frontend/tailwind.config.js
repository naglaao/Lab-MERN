/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'poppins': ['Poppins'],
     },
      colors: {
        "background-color": "var(--background-color)",
        "primary-color": "var(--primary-color)",
        "secondary-color": "var(--secondary-color)",

      },
    },
  },
  plugins: [],
}