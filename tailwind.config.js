/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')

export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Montserrat', ...defaultTheme.fontFamily.sans],
        'mono': ['Ubuntu Mono', ...defaultTheme.fontFamily.sans],
      },
      gradientColorStopPositions: {
        '2/11': 'calc(2/11 * 100%)',
        '3/11': 'calc(3/11 * 100%)',
        '9/11': 'calc(9/11 * 100%)',
        '10/11': 'calc(10/11 * 100%)',
        '11/11': 'calc(11/11 * 100%)',
      },
      spacing: {
        '2/11': 'calc(2/11 * 100%)',
        '3/11': 'calc(3/11 * 100%)',
        '9/11': 'calc(9/11 * 100%)',
        '10/11': 'calc(10/11 * 100%)',
        '11/11': 'calc(11/11 * 100%)',
      },
      colors: {
      }
    },
  },
  plugins: [],
}
