// @ts-check
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import tailwind from "tailwindcss";
import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  site: "https://v2.papaniap.com",
  integrations: [mdx(), react()],
  compressHTML: true,
  vite: { css: { postcss: { plugins: [tailwind()] } } },
  output: "static",
});
