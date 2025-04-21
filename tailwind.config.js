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
      },
      backgroundImage: {
        'img-card': "url('/imgs/back.svg')"
      },
      animation: {
        glowLvl34: 'glow34 7s ease-in-out infinite',
        glowLvl56: 'glow56 5s ease-in-out infinite',
        glowLvl7: 'glow7 2s ease-in-out infinite'

      },
      keyframes: {
        glow34: {
          '0%, 100%': {
            boxShadow: '0 0 0px rgba(233, 180, 21, 0.4)',
          },
          '50%': {
            boxShadow: '0 0 20px rgba(233, 180, 21, 0.6)',
          },
        },

        glow56: {
          '0%, 100%': {
            boxShadow: '0 0 10px rgba(233, 180, 21, 0.4)',
          },
          '50%': {
            boxShadow: '0 0 20px rgba(233, 180, 21, 0.8)',
          },
        },

        glow7: {
          '0%, 100%': {
            boxShadow: '0 0 20px rgba(233, 180, 21, 1)',
          },
          '50%': {
            boxShadow: '0 0 20px rgba(233, 180, 21, 1)',
          },
        },

      },
    },
  },
  plugins: [],
});