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
        third: '#00749b',
        lightGray: '#E0F2F1',
        dark: '#5d5d5d',
        borderColor: '#ececed',
        primaryText: '#00749b',
      },

      keyframes: {
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(10%)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
      },
      animation: {
        'slide-in-right': 'slideInRight 0.5s ease-in-out forwards',
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        '.object-unset': {
          'object-fit': 'unset',
        },
      });
    },
  ],
};
