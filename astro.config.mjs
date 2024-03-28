import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
import vercel from "@astrojs/vercel/serverless";
import db from "@astrojs/db";

import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: 'https://melina-batalla-git-performance-santiagoavilez.vercel.app',
  output: 'server',
  integrations: [tailwind({
    applyBaseStyles: false
  }), react(), db(), sitemap()],
  adapter: vercel({
    imageService: false
  })
});