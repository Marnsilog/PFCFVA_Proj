/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/**/*.{html,js}"],
  theme: {
    extend: {

      minHeight: {
        'mintest': '35rem',
      },
      height: {
        'mars': '60%', 
        '37':'150px',
        '78':'300px',
      },
      padding: {
        'custom': '650px 700px 70px',
      },
      left:{
        '97':'28rem',
      },
      top:{
        '41':'110.313rem',
      },
      safelist:[
        'bg-black',
        'text-5xl',
        'lg:text-4xl',
      ]
    },
  },
  plugins: [],
}