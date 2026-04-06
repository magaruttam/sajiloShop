/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
    "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    extend: {
      colors: {
        brand: '#3b82f6',
      }
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}
