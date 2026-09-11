# Paolo's portfolio — September 2026 draft

The first implementation of the approved Compact design. The new homepage and `/cv/` use Astro, local Archiv/Virgil fonts and plain CSS. Existing case studies and other legacy routes remain available with their previous layouts.

## Run locally

Use Node 24 (`nvm use`), then:

```sh
npm ci
npm run dev
```

Create the static production output with `npm run build`; inspect it with `npm run preview`.

## Edit the draft

- `src/pages/index.astro`: portfolio copy and work entries.
- `src/pages/cv.astro`: CV content and document structure. Career details remain a draft to verify before using for applications.
- `src/styles/tokens.css`: shared light/dark colours.
- `src/styles/portfolio.css` and `src/styles/cv.css`: the two page layouts.
- `src/components/portfolio/`: theme toggle, image preview and inline emoji interaction.
- `design.md`: visual specification and implementation notes.

The theme starts dark and remembers an explicit choice on this device. The emoji picker is a small native implementation inspired by the requested interaction: keyboard/touch support, a short burst, and a static selection with reduced motion. No reaction counts or tracking are sent anywhere.

The CV's Print / Save PDF button opens the browser print dialog, which uses the plain A4 stylesheet. Confirm the browser's paper size and header/footer settings when exporting.

## Build and publication

Astro and its integrations are upgraded together. Tailwind 3 is retained through PostCSS for legacy pages because the old Astro Tailwind integration does not support Astro 7. The new pages do not use Tailwind or hydrate React.

The draft branch runs a build check. The existing FTP publication workflow still targets `feature/astro-migration`; pushing this draft does not publish it to the personal domain.
