/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
  },
  daisyui : {
    themes: ["forest"],
  },
  // eslint-disable-next-line no-undef
  plugins: [require("daisyui"), require('tailwind-scrollbar')],

}