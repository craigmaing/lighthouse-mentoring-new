// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://lighthousementoring.co.uk',

  // Prefetch for near-instant page navigation
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'viewport' // Prefetch links as they enter viewport
  },

  // Experimental client prerender for even faster navigation
  experimental: {
    clientPrerender: true
  },

  integrations: [
    tailwind({
      applyBaseStyles: true,
    }),
    sitemap(),
  ],

  image: {
    domains: ['lighthousementoring.co.uk'],
    experimentalResponsiveImages: true,
    service: {
      entrypoint: 'astro/assets/services/sharp',
      config: {
        limitInputPixels: false,
      },
    },
  },

  build: {
    inlineStylesheets: 'auto',
  },

  compressHTML: true,

  // Vite build optimizations
  vite: {
    build: {
      cssMinify: 'lightningcss', // Faster CSS minification
      rollupOptions: {
        output: {
          manualChunks: (id) => {
            // Split vendor code for better caching
            if (id.includes('node_modules')) {
              if (id.includes('astro')) {
                return 'vendor-astro';
              }
              return 'vendor';
            }
          },
        },
      },
    },
  },
});
