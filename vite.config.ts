import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  base: '/ethereum-blockchain-explorer/',
  plugins: [react()],
});
