import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: './', // Ensure relative paths
  build: {
    outDir: 'dist',
    assetsDir: 'assets', // This is where the assets (JS, CSS) will be stored
  },
  server: {
    proxy: {
      '/api': {
        target: 'https://reeview.de/wp-json/v1/reviews',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
        secure: false,
      },
    },
  },
  plugins: [react()],
});
