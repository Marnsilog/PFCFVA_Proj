// tailwind.config.js

module.exports = {
  content: ["./public/**/*.{html,js}"],
  theme: {
    extend: {
      minHeight: {
        'mintest': '35rem', // Example custom minHeight definition
      },
      height: {
        'mars': '60%', // Example custom height definition using percentage
        '37': '150px', // Example custom height definition in pixels
        '78': '300px', // Another example custom height definition in pixels
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
      },
    },
    safelist: {
      standard: [
        'bg-black', 
        'bg-gray-400',
        'bg-zinc-300',
        'bg-zinc-400',
        'text-5xl', 
        'text-4xl', 
        'lg:text-4xl',
        'bg-opacity-30',
        'text-opacity-10',
        'opacity-40',
        'py-7',
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
