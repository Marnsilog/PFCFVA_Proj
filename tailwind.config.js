/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/**/*.{html,js}"],
  theme: {
    extend: {
      maxHeight: {
        'maxtest': '250px',
      },
      minHeight: {
        'mintest': '35rem',
      },
      height: {
        'mars': '60%', // You can also use fixed values like pixels
      },
      padding: {
        'custom': '650px 700px 70px', // Custom padding value
      },
    },
  },
  plugins: [],
}