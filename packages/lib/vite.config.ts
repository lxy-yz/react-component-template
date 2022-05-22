/// <reference types="vitest" />
/// <reference types="vite/client" />
import * as path from 'path'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test-setup.ts',
  },

  plugins: [
    react(),
    dts({
      insertTypesEntry: true,
    }),
  ],

  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      // name: 'MyLib',
      formats: ['es', 'cjs'], // consider umd??
      fileName: format => `my-lib.${format}.js`,
    },
    rollupOptions: {
      external: ['react', 'react-dom'],
      output: {
        globals: {
          'react': 'React',
          'react-dom': 'ReactDOM',
        },
      },
    },
  },
})
