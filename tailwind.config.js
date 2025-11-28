/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  mode: 'jit',
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './public/index.html',
  ],
  theme: {
    extend: {
      colors: {
        gmeshMain: '#2bcdc0',
        gmeshBlue: '#010d45',
      },
    },
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        sm: "2rem",
        lg: "4rem",
        xl: "5rem",
        '2xl': "6rem",
      },
    },
  },
  variants: {
    extend: {
      scrollbar: ['dark'],
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
});
