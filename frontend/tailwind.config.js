module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}',
  'node_modules/flowbite-react/lib/esm/**/*.js',
  "./node_modules/tailwind-datepicker-react/dist/**/*.js",
  "./node_modules/react-tailwindcss-datepicker/dist/index.esm.js",
 // <--- Add this line

],
  plugins: [require('daisyui')],
};
