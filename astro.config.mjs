// @ts-check
import { defineConfig } from 'astro/config';
import rehypeExternalLinks from 'rehype-external-links';
import solidJs from '@astrojs/solid-js';
// import fuse from 'astro-fuse'

import tailwindcss from '@tailwindcss/vite';
// import tailwind from '@astrojs/tailwind'

import mdx from '@astrojs/mdx';
import { remarkReadingTime } from './src/plugins/remark-reading-time.mjs';
import { remarkTestArgs } from './src/plugins/remark-register-definitions.mjs';

// https://astro.build/config
export default defineConfig({
  site: 'https://toolkit.ownthehou.org',
  base: '/own-the-hou--journey--demo/',
  integrations: [
    // tailwind({
    //   applyBaseStyles: false
    // }),
    solidJs(),
    // fuse(['content',
    //   // 'frontmatter.chapter',
    //   // 'frontmatter.section',
    //   'frontmatter.module'
    // ], {
    //   basedOn: 'output',
    //   extractContentFromHTML: $ => $('.book--content--body'),
    //   extractFrontmatterFromHTML: $ => {
    //     const el = $('[name="active-titles"][data-has~="chapter"][data-has~="module"], [name="active-titles"][data-has~="chapter"]:not([data-has~="section"])')
    //     if (el.length) {
    //       return JSON.parse(el.first().val())
    //     }
    //     return {}
    //   }
    // }),
    mdx({
      rehypePlugins: [
        [rehypeExternalLinks, { target: '_blank', rel: ['noopener'] }]
      ]
    })],
  markdown: {
    rehypePlugins: [
      [
        rehypeExternalLinks,
        { 
          target: '_blank', 
          rel: ['noopener', 'noreferrer'] 
        }
      ],
    ],
    remarkPlugins: [
      remarkReadingTime, 
      remarkTestArgs
    ],
  },
  vite: {
    plugins: [tailwindcss()]
  }
});