/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        body: ['Lexend', 'sans-serif'],
      },
      colors: {
        primary: '#4DB6AC',
        second: '#C8E6C9',
        lightGray: '#E0F2F1',
        dark: '#5d5d5d',
        borderColor: '#ececed',
      },
    },
  },
  plugins: [],
};
