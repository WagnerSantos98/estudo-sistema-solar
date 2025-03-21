import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Aumentar o limite de tamanho do chunk para 2MB (ou o valor que você achar adequado)
    chunkSizeWarningLimit: 2000, // 2000 KB (2MB)

    // Manual chunking
    rollupOptions: {
      output: {
        // Dividir dependências de bibliotecas populares em um arquivo separado
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'], // Exemplo de dependências que podem ser separadas
        },
      },
    },
  },
});
