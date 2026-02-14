import { defineConfig, fontProviders } from 'astro/config';
import preact from '@astrojs/preact';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  output: 'static',
  build: {
    inlineStylesheets: 'always'
  },
  experimental: {
    clientPrerender: true,
    fonts: [
      {
        provider: fontProviders.google({
          experimental: { variableAxis: { Inter: { opsz: ['14..32'] } } }
        }),
        name: 'Inter',
        cssVariable: '--astro-font-inter',
        weights: ['300 900'],
        styles: ['normal'],
        subsets: ['latin']
      }
    ]
  },
  image: {
    remotePatterns: [
      {
        protocol: 'https'
      },
      {
        protocol: 'http'
      }
    ]
  },
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'viewport'
  },
  site: 'https://pod.c457.org',
  trailingSlash: 'never',
  integrations: [
    preact(),
    sitemap({
      filter: (page) => {
        const pathname = new URL(page).pathname;
        return !/^\/\d+\/?$/.test(pathname);
      }
    })
  ],
  vite: {
    plugins: [tailwindcss()]
  }
});
