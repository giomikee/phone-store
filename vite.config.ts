/// <reference types="vitest/config" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  base: mode === 'production' ? '/phone-store/' : '/',
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
  }
}));
