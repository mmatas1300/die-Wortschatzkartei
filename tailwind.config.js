/** @type {import('tailwindcss').Config} */

const withMT = require("@material-tailwind/react/utils/withMT");
 
module.exports = withMT({
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      rotate: {
        '10': '-10deg',
        '5': '-5deg',
        '20': '-20deg',
      },
      colors: {
        'green-card': '#4CAB2A',
        'red-card': '#B72B4F',
        'blue-card': '#0078A3',
        'black-card': '#1E1E1E',
        'yellow-card': '#E89E00',
        'orange-card': '#FE7413',
        'purple-card': '#CC348D',
        'white-card': '#F8F9FA',
      }
    },
  },
  plugins: [],
});