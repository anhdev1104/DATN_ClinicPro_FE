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
        primaryAdmin: '#116aef',
        second: '#C8E6C9',
        third: '#00749b',
        lightGray: '#E0F2F1',
        dark: '#5d5d5d',
        borderColor: '#ececed',
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
      spacing: {
        '65p': '65%',
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        '.object-unset': {
          'object-fit': 'unset',
        },
        '.clip-path-border': {
          'clip-path': 'polygon(0 0, 100% 0, 100% 90%, 0 90%)',
        },
      });
    },
  ],
};
