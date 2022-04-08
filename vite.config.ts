/// <reference types="vitest/config" />

import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

/**
 * Config for global end-to-end tests
 * placed in project root tests folder
 * @type {import('vite').UserConfig}
 * @see https://vitest.dev/config/
 */
export default defineConfig({
  mode: process.env.MODE,
  plugins: [react()],
  base: '/',
  test: {
    environment: 'happy-dom',
  },
});
