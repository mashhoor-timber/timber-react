import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: [
      '@tanstack/react-query',
      'sonner',
      'framer-motion',
      '@heroui/system',
      '@heroui/theme'
    ]
  },
  build: {
    rollupOptions: {
      external: () => false, // Don't externalize any dependencies
    }
  }
});