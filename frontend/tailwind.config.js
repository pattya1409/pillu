/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        netflix: {
          red: '#E50914',
          black: '#141414',
          dark: '#181818',
          gray: '#808080',
          'gray-light': '#b3b3b3',
        },
      },
      fontFamily: {
        sans: ['Netflix Sans', 'Helvetica', 'Arial', 'sans-serif'],
      },
      backgroundImage: {
        'hero-gradient':
          'linear-gradient(to top, rgba(20,20,20,1) 0%, rgba(20,20,20,0) 50%)',
      },
    },
  },
  plugins: [],
};
