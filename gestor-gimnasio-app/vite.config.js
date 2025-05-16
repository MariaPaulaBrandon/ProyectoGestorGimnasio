import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig(({ command }) => {
  const isProduction = command === 'build';

  return {
    plugins: [react()],
    resolve: {
      alias: {
        '@environment': isProduction
          ? path.resolve(__dirname, 'src/environments/environment.prod.js')
          : path.resolve(__dirname, 'src/environments/environment.js'),
      },
    },
  };
});
