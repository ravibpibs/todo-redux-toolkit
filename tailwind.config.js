/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'xxs': '540px',
        // => @media (min-width: 540px) { ... }
      },   
    },

  },
  plugins: [],
}
