// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://lighthousementoring.co.uk',

  // Always use trailing slashes for consistent URLs
  trailingSlash: 'always',

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
    sitemap({
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date(),
      serialize(item) {
        // Optimize priorities based on page importance
        if (item.url.endsWith('lighthousementoring.co.uk/')) {
          // Homepage - highest priority
          item.priority = 1.0;
          item.changefreq = 'weekly';
        } else if (item.url.includes('/services/')) {
          // Service pages - high priority
          item.priority = 0.9;
          item.changefreq = 'weekly';
        } else if (item.url === 'https://lighthousementoring.co.uk/about/' ||
                   item.url === 'https://lighthousementoring.co.uk/contact/') {
          // About/Contact - medium-high priority
          item.priority = 0.8;
          item.changefreq = 'monthly';
        } else if (item.url === 'https://lighthousementoring.co.uk/insights/') {
          // Blog hub - medium priority
          item.priority = 0.7;
          item.changefreq = 'weekly';
        } else if (item.url.includes('/insights/') && !item.url.endsWith('/insights/')) {
          // Individual blog posts - medium-low priority
          item.priority = 0.6;
          item.changefreq = 'monthly';
        } else if (item.url.includes('/privacy') ||
                   item.url.includes('/terms') ||
                   item.url.includes('/thank-you')) {
          // Legal/utility pages - low priority
          item.priority = 0.3;
          item.changefreq = 'yearly';
        }
        return item;
      }
    }),
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
    inlineStylesheets: 'always', // Inline critical CSS for faster rendering
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
