/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.tsx'],
  theme: {
    extend: {
      fontFamily: {
        sans: 'Roboto, sans-serif',
      },

      backgroundImage: {
        app: 'url(/BG-effects.png)',
      },

      colors: {
        gray: {
          100: '#e1e1e1',
          300: '#8d8d99',
          600: '#323238',
          800: '#202024',
          900: '#121214',
        },

        green: {
          500: '#129E57',
        },

        yellow: {
          500: '#f7dd43',
        },
      },
    },
  },
  plugins: [],
}
