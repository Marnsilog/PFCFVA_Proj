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
    },
  },
  safelist: {
    standard: [
      'bg-black',
      'text-5xl',
      'lg:text-4xl',
    ],
    deep: [
      // Additional deep selectors can go here if needed
    ],
    greedy: [
      // Additional greedy selectors can go here if needed
    ],
  },
  variants: {
    extend: {
      padding: ['pt'], // This extends the padding utility with the pt variant
    },
  },
  plugins: [],
};
