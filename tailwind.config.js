/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{ts,tsx,jsx,js}"],
  theme: {
    extend: {},
    colors: {
      primary: {
        50: '#E9EFFD',
        100: '#A4D5F5',
        200: '#8BC2F3',
        300: '#72ADF0',
        400: '#5894ED',
        500: '#3F79EB',
        600: '#265AE8',
        700: '#1D32BB',
        800: '#15158D',
        900: '#180D5F',
      },
      grey: {
        900: '#0B121F',
        800: '#282F3E',
        700: '#404653',
        600: '#585D69',
        500: '#70747E',
        400: '#888C94',
        300: '#9FA3A9',
        200: '#B7BABF',
        100: '#CFD1D4',
      },
      red: {
        800: '#7A271A',
        700: '#912018',
        600: '#B32318',
        500: '#D92D20',
        400: '#F04438',
        300: '#F97066',
        200: '#FDA29B',
        100: '#FECDCA',
        50: '#FEE4E2',
      }, white: '#FFFFFF',
    }
  },
  plugins: [],
}
