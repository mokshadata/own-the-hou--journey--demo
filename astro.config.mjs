// @ts-check
import { defineConfig } from 'astro/config';

import solidJs from '@astrojs/solid-js';

import tailwindcss from '@tailwindcss/vite';

import mdx from '@astrojs/mdx';
import { remarkReadingTime } from './src/plugins/remark-reading-time.mjs';
import { remarkTestArgs } from './src/plugins/remark-register-definitions.mjs';

// https://astro.build/config
export default defineConfig({
  base: '/own-the-hou--journey--demo/',
  integrations: [solidJs(), mdx()],
  markdown: {
    remarkPlugins: [
      remarkReadingTime, 
      // remarkTestArgs
    ],
  },
  vite: {
    plugins: [tailwindcss()]
  }
});