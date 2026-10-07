import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// On Vercel (or when VERCEL env is present), serve from root '/'.
// For GitHub Pages, fallback to process.env.VITE_BASE or '/'
const base = process.env.VERCEL ? '/' : (process.env.VITE_BASE || '/');

export default defineConfig({
  base,
  plugins: [react(), tailwindcss()],
});
