import { defineConfig } from 'vite'
import { fileURLToPath } from 'url'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig(({ command }) => {
  const isProduction = command === 'build';
  const __dirname = path.dirname(fileURLToPath(import.meta.url))

  return {
    plugins: [react()],
    resolve: {
      alias: {
        '@environment': isProduction
          ? path.resolve(__dirname, 'src/environments/Environment.prod.js')
          : path.resolve(__dirname, 'src/environments/Environment.js'),
      },
    },
  };
});
