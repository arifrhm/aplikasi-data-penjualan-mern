import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import postcss from 'postcss';
import nested from 'postcss-nested'; // Import statement

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    postcss({
      plugins: [
        nested, // Use imported variable instead of require
      ],
    }),
  ]
})
