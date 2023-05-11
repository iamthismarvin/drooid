/** @type {import('tailwindcss').Config} */

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        eerie: '#1A1C1E',
        ghost: '#F9FAFE',
        aureolin: '#F8F32B',
        night: '#141414',
      },
    },
  },
  plugins: [],
}
