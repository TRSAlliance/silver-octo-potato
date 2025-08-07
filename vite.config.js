import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: './',        // relative paths for assets
  plugins: [react()],
  build: {
    outDir: 'dist',  // Vercel expects this by your vercel.json
  },
});
