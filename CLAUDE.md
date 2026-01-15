# Claude Code Project Guidelines

## Package Manager

**Use `bun` for all package management operations.**

```bash
# Install dependencies
bun install

# Add a package
bun add <package-name>

# Add a dev dependency
bun add -d <package-name>

# Run scripts
bun run dev
bun run build
bun run check
```

## Documentation & Research

**Always use context7 MCP or web search to get the most recent documentation** before implementing features or installing packages. Framework APIs change frequently.

### Priority Sources:
1. **Svelte 5**: https://svelte.dev/docs/svelte
2. **SvelteKit**: https://svelte.dev/docs/kit
3. **Svelte Transitions/Animations**: https://svelte.dev/docs/svelte/transition

### When to Research:
- Before installing new packages (check latest version)
- When implementing Svelte 5 features (runes, snippets, etc.)
- For animation/transition APIs
- When unsure about SvelteKit routing or SSR

## Project Overview

This is Paolo Papania's portfolio website rebuilt with SvelteKit. It showcases different design styles through three interactive pages:

1. **Style 1: Bento Grid** (`/style-1`) - Interactive grid layout with hover effects
2. **Style 2: Free Canvas** (`/style-2`) - Draggable elements on a canvas
3. **Style 3: Minimal Flow** (`/style-3`) - Clean, scroll-based editorial layout

## Tech Stack

- **Framework**: SvelteKit with TypeScript
- **Runtime**: Bun
- **Styling**: Plain CSS with CSS custom properties
- **Animations**: Svelte built-in transitions (`svelte/transition`, `svelte/animate`, `svelte/motion`)

## Color Palette

Colors are defined as CSS custom properties in `src/app.css`. Key colors:

- Background: Warm cream (`--color-background`)
- Brand Primary: Blue (`--color-brand-primary`)
- Brand Accent: Soft peach (`--color-brand-accent`)
- Accent colors: Amber, Emerald, Purple

## Fonts

- **Display/Headings**: Archiv Grotesk (in `/static/fonts/`)
- **Body**: IBM Plex Sans (Google Fonts - to be added)
- **Handwritten/Logo**: Virgil (in `/static/fonts/`)

## File Structure

```
src/
├── routes/
│   ├── +layout.svelte    # Global nav and layout
│   ├── +page.svelte      # Home page with style selector
│   ├── style-1/          # Bento grid style
│   ├── style-2/          # Draggable canvas style
│   └── style-3/          # Minimal flow style
├── lib/                  # Shared components and utilities
├── app.css               # Global styles and CSS variables
├── app.html              # HTML template
└── app.d.ts              # TypeScript declarations
```

## Development Commands

```bash
bun run dev      # Start dev server
bun run build    # Build for production
bun run preview  # Preview production build
bun run check    # Type check
```

## Code Style

- Use TypeScript for all `.svelte` files (`<script lang="ts">`)
- Prefer Svelte's built-in features over external libraries
- Keep components focused and composable
- Use CSS custom properties for theming
- Animations should be smooth and purposeful

## Goals

- Minimal, creative, technical, fun
- Lots of visuals and micro-interactions
- Showcase UX/UI and frontend skills through the site itself
- The site IS the portfolio piece
