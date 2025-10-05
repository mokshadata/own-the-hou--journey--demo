// @ts-check
import { defineConfig } from 'astro/config';

import solidJs from '@astrojs/solid-js';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: '/own-the-hou--journey--demo/',
  integrations: [solidJs()],

  vite: {
    plugins: [tailwindcss()]
  }
});