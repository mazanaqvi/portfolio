import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Keep font files as separate cacheable assets. Inlining small ones as
    // base64 bloats the render-blocking stylesheet and defeats unicode-range,
    // which lets the browser skip subsets the page never uses.
    assetsInlineLimit: (file) => (/\.(woff2?|ttf|otf)$/i.test(file) ? false : undefined),
  },
})
