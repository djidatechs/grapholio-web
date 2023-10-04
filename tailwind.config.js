/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend:{
      screens:{
        'tall': { 'raw': '(min-height: 700px)' },
        'tillLg': {'max': '1023px'},
      },
      keyframes: {
        slideIn: {
          '0%': { transform: 'translateY(-500%)' , opacity : '0' },
          '100%': { transform: 'translateY(-50%)',opacity : '1' },
        }
      },
      animation: {
        slideIn: 'slideIn 0.5s ease-in-out',
      }
    }
  },
  daisyui : {
    themes: ["forest"],
  },
  // eslint-disable-next-line no-undef
  plugins: [require("daisyui"), require('tailwind-scrollbar')],

}