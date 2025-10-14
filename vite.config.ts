import { defineConfig } from 'vite';
import path from 'path';
import react from '@vitejs/plugin-react';
import { cpSync, existsSync } from 'fs';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(),
    {
      name: 'debug-resolve-alias',
      resolveId(source, importer) {
        if (source.startsWith('@components')) {
          console.log(`Resolving '${source}' from '${importer}'`)
        }
        return null // dejá que Vite siga resolviendo normalmente
      }
    },
    {
      name: 'copy-database',
      writeBundle() {
        // Copiar la carpeta database al directorio de build
        const databaseSrc = path.resolve(__dirname, 'database');
        const databaseDest = path.resolve(__dirname, 'dist-react/database');
        
        if (existsSync(databaseSrc)) {
          cpSync(databaseSrc, databaseDest, { recursive: true });
          console.log('✓ Database folder copied to dist-react');
        } else {
          console.warn('⚠ Database folder not found, skipping copy');
        }
      }
    }
  ],
  base: './',
  publicDir: false, // Deshabilitamos el directorio público por defecto
  build: {
    outDir: 'dist-react',
    rollupOptions: {
      external: [],
      output: {
        assetFileNames: (assetInfo) => {
          // Mantener la estructura de carpetas para archivos de database
          if (assetInfo.name?.startsWith('database/')) {
            return assetInfo.name;
          }
          return 'assets/[name]-[hash][extname]';
        }
      }
    },
    copyPublicDir: false, // Deshabilitamos copia automática del directorio público
  },
  server: {
    port: 5123,
    strictPort: true,
  },
  resolve: {
    alias: {
      '@common': path.resolve(__dirname, 'src/common'), 
      "@components": path.resolve(__dirname, 'src/ui/components'),
      "@hooks": path.resolve(__dirname, 'src/ui/hooks'),
      "@views": path.resolve(__dirname, 'src/ui/views'),
      "@stores": path.resolve(__dirname, 'src/ui/stores'),
      "@ipc": path.resolve(__dirname, 'src/ui/ipc'),
      "@contexts": path.resolve(__dirname, 'src/ui/contexts'),
    },
  },
});
