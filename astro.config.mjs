import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';
import partytown from '@astrojs/partytown';
import react from '@astrojs/react';
import compress from 'astro-compress';
import critters from 'astro-critters';

export default defineConfig({
  site: 'https://lighthousementoring.co.uk',
  base: process.env.NODE_ENV === 'production' ? '/' : '/',
  integrations: [
    tailwind(),
    react(),
    sitemap({
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date(),
      entryLimit: 45000,
    }),
    mdx({
      optimize: {
        ignoreElementNames: ['h1', 'h2']
      }
    }),
    partytown({
      config: {
        forward: ["dataLayer.push"],
        debug: false
      }
    }),
    critters({
      fonts: true,
      preload: 'swap'
    }),
    compress({
      HTML: {
        removeAttributeQuotes: false,
        removeComments: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        sortClassName: true,
        useShortDoctype: true,
        minifyCSS: true,
        minifyJS: true
      },
      Image: false // We're already handling images with Astro
    })
  ],
  output: 'static',
  build: {
    inlineStylesheets: 'auto',
    split: true,
    excludeMiddleware: false,
    format: 'directory',
    assets: 'assets'
  },
  compressHTML: true,
  vite: {
    build: {
      cssCodeSplit: true,
      sourcemap: false,
      minify: 'esbuild',
      target: 'es2020',
      rollupOptions: {
        output: {
          assetFileNames: 'assets/[name].[hash][extname]',
          chunkFileNames: 'chunks/[name].[hash].js',
          entryFileNames: 'entry/[name].[hash].js',
          manualChunks: {
            'react-vendor': ['react', 'react-dom'],
            'utils': ['lucide-astro']
          }
        }
      }
    },
    ssr: {
      noExternal: ['@astrojs/*']
    },
    optimizeDeps: {
      include: ['react', 'react-dom']
    }
  },
  image: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.amazonaws.com'
      }
    ],
    service: {
      entrypoint: 'astro/assets/services/sharp',
      config: {
        limitInputPixels: false
      }
    }
  },
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'hover',
    threshold: 0.2
  }
});