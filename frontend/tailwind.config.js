/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          500: '#22c55e',
          600: '#14b8a6'
        }
      }
    }
  },
  plugins: []
};
