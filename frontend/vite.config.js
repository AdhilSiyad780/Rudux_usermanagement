// frontend/vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/assets/', // ✅ matches Django's STATIC_URL
  plugins: [react()],
  build: {
    outDir: 'dist',
    assetsDir: '', // ✅ no duplicate assets/assets
  },
});
