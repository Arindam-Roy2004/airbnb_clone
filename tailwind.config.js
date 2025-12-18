/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./views/**/*.{html,ejs}"],
  theme: {
    extend: {
      colors: {
        airbnb: '#ff385c',
        'airbnb-dark': '#d50027',
      }
    },
  },
  plugins: [],
}

