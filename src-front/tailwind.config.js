/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      white: {
        '100': '#FFFFFF',
        '200': '#FAF8F2',
        '300': '#F5F5F5',
        '400': '#FCE181',
      },
      grey: {
        '100': '#8C8775',
        '800': '#272727',
      },
      black: '#000000',
      yellow:'#FCE181',
    },

    extend: {},
  },
  plugins: [require("daisyui")],
}
