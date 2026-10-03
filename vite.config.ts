// vite.config.ts

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Buradaki base: './' ayarınız doğru.
export default defineConfig({
  base: './', // Capacitor için gerekli
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id) return undefined;
          const p = id.replace(/\\/g, '/');
          if (p.includes('/node_modules/')) {
            if (p.includes('/react/')) return 'vendor_react';
            if (p.includes('/react-dom/')) return 'vendor_react_dom';
            if (p.includes('/jspdf/')) return 'vendor_jspdf';
            if (p.includes('/html2canvas/')) return 'vendor_html2canvas';
            if (p.includes('/purify.es/')) return 'vendor_purify';
            if (p.includes('/lodash-es/')) return 'vendor_lodash';
            return 'vendor';
          }
          if (p.includes('/src/i18n/')) return 'i18n_tr';
        }
      }
    }
  }
})
