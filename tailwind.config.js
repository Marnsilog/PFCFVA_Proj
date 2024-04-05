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
        'custom': '650px 700px 70px', // Example custom padding definition
      },
      inset: {
        '97': '28rem', // Example custom inset definition using rem units
        '41': '110.313rem', // Another example custom inset definition
      },
    },
  },
  safelist: {
    standard: [
      'bg-black', 
      'bg-gray-400',
      'bg-zinc-300',
      'bg-zinc-400',
      'text-5xl', 
      'text-4xl', // Another example safelisted class for text size
      'lg:text-4xl', // Example safelisted responsive text size class
    ],
    deep: [
      // Additional deep selectors can be added here if needed
    ],
    greedy: [
      // Additional greedy selectors can be added here if needed
    ],
  },
  variants: {
    extend: {
      padding: ['pt'], // Extend padding utility with the pt (padding-top) variant
      height: ['h'], // Extend height utility with the h variant
    },
  },
  plugins: [
    // You can add Tailwind CSS plugins here if needed
    // For example, `require('@tailwindcss/forms')` to enable form styling
  ],
};
