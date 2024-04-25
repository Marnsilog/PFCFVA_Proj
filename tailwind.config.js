// tailwind.config.js

module.exports = {
  content: ["./public/**/*.{html,js}"],
  theme: {
    extend: {
      minHeight: {
        'mintest': '35rem', 
      },
      height: {
        'mars': '60%', 
        '37': '150px', 
        '78': '300px',
      },
      padding: {
        'custom': '650px 700px 70px',
      },
      inset: {
        '97': '28rem',
        '41': '110.313rem',
      },
      fontFamily: {
        Istok: ['Istok Web', 'sans-serif'], 
        Inter: ['Inter','sans-serif'],
        AdventPro:['Advent Pro','sans-serif'],
        JockeyOne:['Jockey One','sans-serif'],
        kadwa:['Kadwa','sans-serif'],
        Inika:['Inika','sans-serif'],
      },
      colors: {
        'rosered': '#C11414',
        'rosered2':'#930D0D',
        'mjgrey':'#EAEAEA',
      },
    },
    safelist: {
      standard: [
        'w-96',
      ],
    },
  },
  variants: {
    extend: {
      padding: ['pt'],
      height: ['h'],
    },
  },
  plugins: [],
};
