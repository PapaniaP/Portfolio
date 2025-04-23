/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}",
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--color-background) / <alpha-value>)",
        surface: "hsl(var(--color-surface) / <alpha-value>)",
        "surface-accent":
          "hsl(var(--color-surface-accent) / <alpha-value>)",
        "surface-transparent":
          "hsl(var(--color-surface-transparent) / <alpha-value>)",
        "text-primary":
          "hsl(var(--color-text-primary) / <alpha-value>)",
        "text-secondary":
          "hsl(var(--color-text-secondary) / <alpha-value>)",
        "text-accent":
          "hsl(var(--color-text-accent) / <alpha-value>)",
        "text-muted": "hsl(var(--color-text-muted) / <alpha-value>)",
        "text-inverted":
          "hsl(var(--color-text-inverted) / <alpha-value>)",
        "border-primary":
          "hsl(var(--color-border-primary) / <alpha-value>)",
        "border-secondary":
          "hsl(var(--color-border-secondary) / <alpha-value>)",
        "border-accent":
          "hsl(var(--color-border-accent) / <alpha-value>)",
        "brand-primary":
          "hsl(var(--color-brand-primary) / <alpha-value>)",
        "brand-primary-light":
          "hsl(var(--color-brand-primary-light) / <alpha-value>)",
        "brand-primary-dark":
          "hsl(var(--color-brand-primary-dark) / <alpha-value>)",
        "brand-accent":
          "hsl(var(--color-brand-accent) / <alpha-value>)",
        "brand-accent-hover":
          "hsl(var(--color-brand-accent-hover) / <alpha-value>)",
        "accent-amber":
          "hsl(var(--color-accent-amber) / <alpha-value>)",
        "accent-emerald":
          "hsl(var(--color-accent-emerald) / <alpha-value>)",
        "accent-purple":
          "hsl(var(--color-accent-purple) / <alpha-value>)",
      },
      fontFamily: {
        heading: ['"Archiv Grotesk"', "sans-serif"],
        display: ['"Archiv Grotesk"', "sans-serif"],
        sans: ['"IBM Plex Sans"', "sans-serif"],
        virgil: ['"Virgil"', "cursive"],
      },
      spacing: {
        "8xl": "96rem",
        "9xl": "128rem",
      },
      borderRadius: {
        "4xl": "2rem",
      },
      boxShadow: {
        "glow-sm": "0 0 15px hsl(var(--color-brand-primary) / 0.15)",
        "glow-md": "0 0 25px hsl(var(--color-brand-primary) / 0.2)",
        "glow-lg": "0 0 40px hsl(var(--color-brand-primary) / 0.25)",
        "card-light":
          "0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.04)",
      },
      backgroundImage: {
        "gradient-primary":
          "linear-gradient(to right, hsl(var(--color-brand-primary)), hsl(var(--color-brand-primary-light)))",
        "gradient-divider":
          "linear-gradient(to right, transparent, hsl(var(--color-border-accent)), transparent)",
        "gradient-overlay":
          "linear-gradient(to top, hsl(var(--color-brand-primary) / 0.2), transparent)",
      },
    },
  },
  plugins: [],
};
