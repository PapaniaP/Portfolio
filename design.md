# Portfolio design reference

Status: approved visual direction — **Compact · teal + orange**
Updated: 12 September 2026
Target branch: `portfolio-sept-2026`

## Source of truth

- [Current draft](https://paolo-portfolio-directions.papaniap11.chatgpt.site/)
- Implementation: `src/styles/tokens.css`, `src/styles/base.css`, `src/styles/portfolio.css` and `src/styles/cv.css`.
- The earlier Compact prototype is preserved under `/reference/`; the current Astro implementation and tokens below take precedence.
- Inspiration: [Daniel White](https://www.danielwhite.uk/), particularly the compact reading column, restrained headings and small inline details.

This document records the approved teal/orange palette, compact typography and occasional Virgil accents. The dated sections at the end record earlier decisions; the current token tables take precedence over historical experiments.

## Design principles

- Lead with frontend engineering, supported by UX/UI development, product development and product design.
- Use a centred, narrow reading column with comfortable side margins.
- Keep the main content at 14px. Section headings stay at reading size; only the name is larger.
- No eyebrow text: do not place small introductory labels, uppercase kickers, numbered overlines or decorative category labels above headings. Start sections directly with their heading or body copy. Ordinary section headings and useful metadata (such as work dates) remain distinct from eyebrow text.
- Let concise writing carry the page. Work entries expand to explain a contribution; strong screenshots are optional.
- Add personality to selected words through weight, handwriting, small icons, restrained tilts and brief motion.
- Use Virgil for the name and occasional short accents, not whole paragraphs.
- Keep surfaces flat, borders quiet and accent colours saturated. The main portfolio has no card shadows or decorative gradients.
- Preserve normal scrolling, keyboard operation and reduced-motion behaviour.

## Colour tokens

Dark is the initial mode, with a remembered light/dark preference. Teal and orange were selected on 12 September 2026. Keep the warm backgrounds from the Compact version.

| Semantic token | Prototype alias | Dark | Light | Usage |
| --- | --- | --- | --- | --- |
| `--color-background` | `--paper` | `#373633` | `#FBF1D3` | Page background |
| `--color-text-primary` | `--ink` | `#F2E5C4` | `#3C3836` | Name, headings, stronger words |
| `--color-text-secondary` | `--muted` | `#D0C3A6` | `#665C54` | Body copy and metadata |
| `--color-border` | `--line` | `#55534C` | `#D5C4A1` | Rules, work rail, inline badges |
| `--color-accent-primary` | `--blue` | `#27D6C5` | `#006B70` | Teal links, emphasis, focus, icons |
| `--color-accent-secondary` | `--rust` | `#FF791F` | `#C14300` | Orange accents and underlines |
| `--color-accent-tertiary` | `--olive` | `#27D6C5` | `#006B70` | Existing tertiary slots reuse teal |
| `--color-accent-fill` | `--blue-solid` | `#006D70` | `#006D70` | Filled badge with white text |
| `--color-surface` | `--panel` | `#42433C` | `#EBDFBB` | Inline badge background, image preview surface |
| `--color-surface-soft` | `--soft` | `#41423B` | `#F0E7C8` | Secondary supporting surface |

Teal is the main accent, with saturated orange for occasional underlines and supporting icons. Deep teal `#006D70` fills keep white badge labels readable in both themes, including hover and focus. The legacy aliases `--blue`, `--blue-solid` and `--olive` now resolve to teal; their names do not specify the displayed colour.

Derived states:

| Token / state | Value |
| --- | --- |
| Link default | Primary accent |
| Contact link hover | Secondary accent |
| Work summary hover | Primary accent |
| Open work indicator | Primary accent |
| Closed work indicator | Secondary text |
| Selection background | Primary accent |
| Selection text | Page background |
| Badge text | Primary text |
| Strong text | Primary text |
| Logo punctuation | Primary accent |

Accent contrast against the page: dark teal 6.62:1 and orange 4.61:1; light teal 5.58:1 and orange 4.58:1. Teal also passes on panels (5.48:1 dark, 4.74:1 light). White on the filled badge is 6.14:1. Orange text is for the page background only. These are colour-pair checks, not a full accessibility audit.

### Copyable theme values

```css
:root,
:root[data-theme=dark] {
  color-scheme: dark;
  --color-background: #373633;
  --color-text-primary: #f2e5c4;
  --color-text-secondary: #d0c3a6;
  --color-border: #55534c;
  --color-accent-primary: #27d6c5;
  --color-accent-secondary: #ff791f;
  --color-accent-tertiary: #27d6c5;
  --color-accent-fill: #006d70;
  --color-surface: #42433c;
  --color-surface-soft: #41423b;
}
:root[data-theme=light] {
  color-scheme: light;
  --color-background: #fbf1d3;
  --color-text-primary: #3c3836;
  --color-text-secondary: #665c54;
  --color-border: #d5c4a1;
  --color-accent-primary: #006b70;
  --color-accent-secondary: #c14300;
  --color-accent-tertiary: #006b70;
  --color-accent-fill: #006d70;
  --color-surface: #ebdfbb;
  --color-surface-soft: #f0e7c8;
}
:root {
  --paper: var(--color-background);
  --ink: var(--color-text-primary);
  --muted: var(--color-text-secondary);
  --line: var(--color-border);
  --blue: var(--color-accent-primary);
  --rust: var(--color-accent-secondary);
  --olive: var(--color-accent-tertiary);
  --blue-solid: var(--color-accent-fill);
  --panel: var(--color-surface);
  --soft: var(--color-surface-soft);
}
```

## Typography tokens

### Families and assets

| Token | Family / stack | Repository asset |
| --- | --- | --- |
| `--font-body` | `Archiv, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif` | `public/fonts/ArchivGrotesk-Regular.otf` |
| Body bold | Same family, weight 700 | `public/fonts/ArchivGrotesk-Bold.otf` |
| `--font-handwritten` | `Virgil, cursive` | `public/fonts/Virgil font.ttf` |
| `--font-serif-accent` | `Georgia, serif` | System font |
| `--font-code` | `monospace` | System font |

Use local font files with `font-display: swap`. Declare Archiv regular as 400 and bold as 700. Declare Virgil as normal style, weight 400. The Virgil file's internal family name is “Virgil 3 YOFF”; the CSS family alias is “Virgil”.

The other Archiv weights in the repository are available assets, not part of this approved type specification.

### Type recipes

Sizes below are CSS pixels in the reference. Rem equivalents assume the standard 16px root; do not change the root font size to 14px.

| Role / token | Size | Weight | Line-height | Letter-spacing | Family |
| --- | --- | --- | --- | --- | --- |
| Body / `--text-body` | 14px / 0.875rem | 400 | 1.6 (22.4px) | -0.012em | Body |
| Section heading | 14px / 0.875rem | 400 | 1.5 (21px) | -0.012em | Body |
| Work summary | 14px / 0.875rem | 400 | 1.5 | -0.012em | Body |
| Expanded work copy | 14px / 0.875rem | 400 | 1.6 | -0.012em | Body |
| Metadata / `--text-meta` | 12px / 0.75rem | 400 | 1.6 inherited | -0.012em inherited | Body |
| Inline badge / `--text-badge` | 13px / 0.8125rem | 400 | 1.65 | -0.012em inherited | Body |
| Name / `--text-name` | 22px / 1.375rem | 400 | 1.4 | -0.025em | Handwritten |
| Name on mobile | 21px / 1.3125rem | 400 | 1.4 | -0.025em | Handwritten |
| “feel.” accent | 16px / 1rem | 400 | 1.6 inherited | -0.015em | Handwritten |
| “what if?” accent | 15px / 0.9375rem | 400 | 1.6 inherited | -0.015em | Handwritten |
| “the big picture” accent | 15px / 0.9375rem | 400 italic | 1.6 inherited | +0.025em | Serif |
| Strong / completed phrase | 14px / 0.875rem | 700 | 1.6 inherited | -0.012em inherited | Body |
| Code glyph | 12px / 0.75rem | 700 | 1.65 inherited | Inherited | Code |
| Technology metadata | 12px / 0.75rem | 400 | 1.6 inherited | Inherited | Code |

Enable `font-kerning: normal`. The requested tighter spacing is implemented with tracking (`letter-spacing`), not custom per-pair kerning.

Use the actual regular serif italic for the “thin” accent; the prototype does not use a 100/200-weight font there.

## Layout and spacing tokens

The content breakpoint is **700px inclusive**: mobile rules apply at `max-width: 700px`. Wider screens use desktop values. A large screen does not widen the reading column.

| Semantic token | Desktop | Mobile ≤700px |
| --- | --- | --- |
| `--content-max-width` | 560px / 35rem | 560px / 35rem |
| `--page-gutter` | 24px each side | 24px each side |
| Page width | `min(560px, calc(100% - 48px))` | Same |
| `--page-top-space` | 76px | 42px |
| `--page-bottom-space` | 48px | 48px |
| Header horizontal gap | 20px | 12px; allow wrapping |
| Header bottom space | 31px | 27px |
| Paragraph-to-paragraph space | 17px | 17px |
| `--section-gap` | 39px | 32px |
| Section-heading bottom space | 14px | 14px |
| Work-heading / hint gap | 16px horizontal | Stack; heading bottom 4px, hint bottom 12px |
| Work year-column width | 54px | 42px |
| Work group column gap | 12px | 8px |
| Work group outer margin | 10px top, 17px bottom | Same |
| Year label top padding | 10px | 10px |
| Work rail inner padding | 15px left | 10px left |
| Summary gap | 8px | 6px horizontal; wrap |
| Summary padding | 9px top/bottom | Same |
| Expanded body padding | 7px top, 0 right, 19px bottom, 25px left | Left becomes 0 |
| Technology line top space | 15px | 15px |
| Preview-link top space | 9px | 9px |
| Preview-link vertical padding | 10px | 10px |
| Badge inner gap | 5px | 5px |
| Badge padding | 0 vertical, 5px horizontal | Same |
| Studiz badge outer margin | 0 vertical, 2px horizontal | Same |
| Footer top margin | 44px | 44px |
| Footer top padding | 21px | 21px |
| Footer gap | 16px horizontal | 5px vertical; stack |

Retain these exact reference values initially; do not silently round the 17px, 31px or 39px measurements onto a new spacing scale.

The page-top measurements are taken below the prototype comparison toolbar. The production site will not have that toolbar; use these as page-top space, not as an instruction to reproduce its height.

## Borders, radii, sizing and focus

| Token | Value | Usage |
| --- | --- | --- |
| `--border-width` | 1px solid | Badge, work rail, footer rule |
| `--radius-inline` | 4px | Inline badges |
| `--radius-focus-summary` | 3px | Focused work summary |
| `--control-min-height` | 44px | Work summary, preview button |
| `--focus-width` | 3px | Inherited link/button focus outline |
| `--focus-offset` | 5px | Inherited link/button focus |
| Summary focus width | 2px | Native summary |
| Summary focus offset | 4px | Native summary |
| Focus colour | Primary accent | All focus outlines |
| Work icon font size | 16px | Work entry icon |
| Work icon slot width | 17px | Fixed, non-shrinking |
| Expand indicator font size | 16px | Plus, line-height 1 |
| Keyboard glyph size | 16px | Inline badge |
| Rugby emoji size | 15px | Inline accent |
| Studiz mark size / weight | 13px / 700 | Inline badge |
| Main-page shadow | None | Flat surfaces |
| Main-page gradient | None | Solid colours |

Inline badges use `inline-flex`, centre alignment, baseline vertical alignment and `white-space: nowrap`. Keep their text short. Ordinary inline text links remain in the text flow; 44px is the standalone-control reference, not the height of every inline word.

## Text decoration and motion tokens

| Treatment | Rest | Hover / focus / open | Timing |
| --- | --- | --- | --- |
| “feel.” | Rotate -7° | Hover +5° | 250ms, ease |
| Studiz badge | Rotate -3° | Hover or keyboard focus 0° | 200ms, ease |
| Keyboard badge | Rotate +2° | Hover -2° | 200ms, ease |
| Rugby emoji | Rotate -15° | Hover +15° | 250ms, ease |
| Work expand indicator | Rotate 0°, secondary text | Rotate 45°, primary accent | 200ms, ease |
| “that works.” entrance | Translate Y 4px, opacity 0.4 | Translate Y 0, opacity 1 | 650ms, ease-out, once, fill both |

- `--motion-fast: 200ms`
- `--motion-detail: 250ms`
- `--motion-enter: 650ms`
- `--ease-detail: ease` (the CSS default in the reference)
- `--ease-enter: ease-out`
- No looping text animation.
- `prefers-reduced-motion: reduce`: disable animations and transitions; render the final readable state. Use automatic rather than smooth scrolling.
- Inline movement is decorative; content and actions remain usable on touch without hover.
- The expanding entry itself uses native `details`; no animated height is specified.

Decoration:

| Role | Style | Colour | Thickness | Offset |
| --- | --- | --- | --- | --- |
| Product-design phrase | Wavy underline | Primary accent | 1px | 4px |
| “make sense” phrase | Solid underline | Secondary accent; primary text | 1px | 4px |
| Contact links | Solid underline | Primary accent; secondary on hover | Browser auto | 4px |
| Project-preview button | Solid underline | Primary accent | Browser auto | 4px |

## Component behaviour

### Work entries

Use native `details` and `summary`. Entries start closed and expand independently. Hide the browser's default marker and show a plus that rotates into a cross when open. Preserve keyboard activation and visible focus.

At the mobile breakpoint, allow the summary to wrap, hide the supplementary category tag, and remove the expanded body’s left indent. Essential project names remain visible.

The Studiz inline link opens its matching entry and navigates to it. Project-preview links can open the supporting image dialog. Screenshots are supplemental; the entry’s text must stand on its own.

### Content structure

The selected reference contains name/location, introduction, current role, work entries, things I care about, off-screen interests, contact and a small footer. These are content examples, not a requirement to invent projects, results, testimonials or metrics.

### Theme behaviour

The prototype initially opens Compact in dark mode. A manual toggle switches modes; the chosen override survives switching prototype variants within the page, but is not persisted across reloads.

Production theme persistence, operating-system preference handling and toggle placement remain implementation decisions. They are not implied by the approved palette.

## Supporting project-preview dialog

This dialog is inherited from the comparison prototype, rather than separately approved as the final case-study design. Record its current values for fidelity without applying its larger headings to the main portfolio.

| Property | Desktop | Mobile ≤700px |
| --- | --- | --- |
| Width | `min(900px, calc(100% - 32px))` | Same |
| Maximum height | 90dvh | Same |
| Padding | 32px | 20px |
| Border / radius | 1px colour-border / 8px | Same |
| Background / text | Page background / primary text | Same |
| Backdrop | `#141414BB`; blur 4px | Same |
| Title | 36px, line-height 1.15, tracking -0.04em, bold | 30px |
| Description | 16px, line-height 1.7, max-width 700px | 15px |
| Description margin | 20px vertical | Same |
| Top-row bottom space | 24px | Same |
| Close button | 14px, padding 10px 12px, min-height 44px, radius 4px | Same |
| Close icon left space | 12px | Same |
| Close surface | Soft surface | Same |
| Image | Width 100%, max-height 55vh, object-fit contain | Same |
| Footnote | 13px | 15px inherited mobile paragraph override |

Use the native dialog's Escape and focus behaviour. The reference closes on its Close button or a click outside its bounds. The native top layer supplies stacking; no modal z-index token is required.

## Prototype-only comparison controls

The variant selector and palette notes exist to review options. They are not part of the chosen portfolio layout.

Retained support colours:

| Token | Dark | Light |
| --- | --- | --- |
| `--toolbar` | `#32322F` | `#F4E9C9` |
| `--toolbar-ink` | `#F2E5C4` | `#3C3836` |
| `--toolbar-line` | `#55534C` | `#D5C4A1` |

Toolbar z-index 20; skip-link z-index 100. The reference's 120/145/155px anchor scroll offsets accommodate its sticky comparison toolbar. They are not production portfolio spacing tokens.

## Implementation boundaries

- Keep the 560px column, 14px body size, 1.6 line-height and -0.012em tracking together.
- Keep the approved teal/orange accents and lighter charcoal. Do not revert to earlier Studio, Prose or blue palette experiments.
- Reuse the supplied Archiv and Virgil assets.
- Use semantic HTML and preserve visible focus, native controls and readable content when motion is disabled.
- Do not add a large hero, image-heavy card grid or oversized section typography from the earlier variants.
- Choose responsive units that preserve the reference at normal settings and remain usable with increased text size.
- The copy, final project selection, exact icons, production theme controls and case-study presentation can evolve separately from these tokens.

## Planned interaction: inline emoji reactions

Added 10 September 2026 following Paolo's reference to [Rare UI — Emoji reaction](https://www.rareui.com/components/emojireaction).

Status: desired interaction direction, not yet implemented in the prototype. Exact phrase, emoji set and animation values remain open. This section extends the design reference without changing the approved base tokens.

### Reference behaviour

Rare UI describes a tapback-style picker: click a trigger to open an emoji bar, choose an emoji to send copies floating upward, and show the last selection on the trigger. Its implementation also supports press-and-drag selection, repeated emission while held, keyboard navigation, Escape/outside-click dismissal and repositioning when space is limited.

The `asChild` option allows a custom trigger, making an inline word or short phrase possible. Its documented dependencies are React, Motion, react-apple-emojis, lucide-react and Radix Slot. These are reference implementation dependencies, not a decision to add them all to the portfolio.

### Proposed portfolio treatment

- Start with one playful trigger inside a sentence, for example “the little details” in the introduction or beside a personal interest. These are candidate placements, not final copy.
- Match the surrounding 14px text and approved inline styling. A small emoji or subtle accent should signal that the phrase is interactive.
- Use a semantic button with an accessible name and visible keyboard focus. Do not intercept a phrase that already navigates somewhere.
- Reuse the surface, border, text and accent tokens for the picker. Keep it within the viewport on mobile and layer it above the text without changing paragraph layout.
- Prefer a brief user-triggered burst. Hold-to-repeat is optional; do not treat every feature of the reference as required.
- Keep the selection local to the interaction initially. No public counts, analytics event or stored visitor reaction is specified.
- Support touch and keyboard activation, dismissal with Escape and outside click, and appropriate focus handling.
- Under reduced motion, show a static selected emoji instead of floating, shrinking or blurring particles.

### Implementation decisions to resolve

Use the original React component as an Astro island, or implement a small equivalent with browser-native code after reviewing the source. Decide during implementation based on fidelity and dependencies already required by the site.

Do not invent particle timing, count, trajectory, z-index or picker dimensions as approved tokens yet; derive and review them with a working example. If reusing Rare UI code, review its current usage terms and retain relevant attribution.

## Digital CV layout — current preview

The `/cv/` route uses a traditional document layout, distinct from the compact portfolio. Career wording is still a draft.

- Screen sheet: maximum 820px including a 1px border; 44px top, 48px side/bottom padding. At widths up to 600px remove the sheet border/padding and keep 24px page gutters.
- Centre the full name, professional focus and contact details. Name: Archiv bold, 30px, line-height 1.25, tracking -0.025em (27px on mobile). Virgil remains on the portfolio; the CV name uses conventional typography.
- Header bottom rule: 2px primary accent; section rules: 1px border colour. No eyebrow text.
- Sections: 24px top gap; 14px bold primary-text headings, 1.5 line-height, 6px bottom padding, 13px bottom margin.
- Experience and education: full-width entries; organisation/qualification left, 12px dates right on the first row. Roles use italic body text; bullets span the available width. Entry gap: 20px. Mobile places dates beneath the heading, before the role.
- Keep body type at 14px / 1.6 with -0.012em tracking. Contact details, dates and stack metadata use 12px.
- Print: A4, 15mm vertical and 17mm horizontal margins; white background, dark text, no sheet border, navigation, controls or draft note. Body: 10pt / 1.4; name: 22pt; metadata: 9pt. Keep individual entries together where possible and keep section headings with following content.
- Theme switching and native Print / Save PDF remain available. Do not add animations or decorative badges inside the CV document.

## First Astro implementation — 11 September 2026

The approved design is now implemented on `portfolio-sept-2026` in the homepage and `/cv/` route. Shared semantic colours live in `src/styles/tokens.css`, with base typography in `src/styles/base.css` and separate portfolio/CV stylesheets. The earlier comparison prototype remains a visual reference.

Implementation choices resolved for this draft:

- Astro 7.3.2 with compatible official React and MDX integrations. Existing npm lockfile is regenerated for the major upgrade; Node 24 is used for local development and CI.
- Dark initial theme, with an explicit light/dark choice remembered in local storage. Read the preference before rendering; storage failure leaves the toggle functional.
- Inline emoji reactions are implemented on “the little details” using native buttons and a short Web Animations burst, without copying Rare UI code or adding React to the homepage. Picker: 44px choices, 5px padding, 2px gap, 6px radius, page background and border token. Five particles, 700ms ease-out, 35ms stagger; reduced motion only changes the selected emoji. Supports keyboard arrows, Escape, outside dismissal and focus return.
- Native image dialog for the two existing project previews, with links to their full case studies. No eyebrow label inside the dialog.
- The CV retains its content review note on screen and omits it in print. Formal role titles and education dates remain to confirm.
- Existing case studies and legacy routes retain their previous layouts in this first draft. Their Tailwind 3 support uses PostCSS because the old Astro integration does not support Astro 7.
- The draft branch gets a build-only GitHub workflow. The existing FTP workflow continues to target only `feature/astro-migration`.

Accessibility correction: using the same deep blue for text on charcoal was unreadable. The dark foreground token is now distinct from the brand fill; its contrast on the dark panel is 4.86:1. Keep all normal text colour pairs at least 4.5:1.

## Colour combinations under review — 12 September 2026

These are experiments, not a replacement for the approved base tokens. Emerald and coral have been rejected. `src/styles/palette-variants.css` applies three combinations across the homepage and digital CV, preserving the warm backgrounds, typography and layout.

| Variant | Light primary text | Dark primary text | Light secondary | Dark secondary | Filled badge, both themes |
| --- | --- | --- | --- | --- | --- |
| Teal + orange | `#006b70` | `#27d6c5` | `#c14300` | `#ff791f` | `#006d70` |
| Blue + orange | `#0048ff` | `#8aafff` | `#c14300` | `#ff791f` | `#0048ff` |
| Violet + gold | `#743ac8` | `#bfa1ff` | `#946000` | `#ffd24a` | `#743ac8` |

- Primary colours apply to links, inline emphasis, focus outlines and work icons. Secondary colours apply to occasional inline words, underlines and supporting icons. Map the previous tertiary accent to the primary in these two-colour combinations.
- Use the deeper fill colour with white badge text in both themes. Blue keeps `#0048ff` in dark-mode fills, while small text uses a lighter blue to remain readable.
- Primary text passes 4.5:1 on the page, surface and soft surface for every variant. Secondary text is approved on the page background only. White badge labels and selection colours also pass 4.5:1. Run `node scripts/check-contrast.mjs` to verify the actual CSS values.
- A temporary switcher appears above the portfolio and outside the CV sheet: 12px labels, minimum 44px controls, 5px radius, 8px gaps. A visible check and `aria-pressed` identify the choice independently of colour. No eyebrow label.
- First visit defaults to teal; explicit choices persist locally. `?palette=teal`, `?palette=blue` and `?palette=violet` override the stored preference. Portfolio/CV links preserve the current variant. Theme choice stays independent.
- Printing hides the switcher and preserves the existing monochrome CV. Earlier colour samplers remain reference material and are not affected by the switcher.

## Selected draft refinement — 12 September 2026

Teal + orange is now the selected palette in the shared base tokens, on both the portfolio and CV. The comparison controls and footer swatches are removed. Old palette query parameters and stored experiment preferences no longer affect either page. The comparison components and variant stylesheet remain unimported reference code.

The introduction leads with frontend engineering, then places UX/UI and product design in support. Work entries name concrete contributions: Studiz lending, QR scanning and onboarding; the Recharge booking prototype; and Harmony UI foundations and components. These descriptions do not claim measured business results.

Keep Virgil for the name and one short phrase, with the existing emoji reaction as the main playful interaction. Remove the code badge, wavy product-design emphasis, animated bold phrase, serif contrast and extra decorative tilts. The Studiz link remains a compact filled badge, without rotation; the keyboard keeps one small inline icon. Retain 14px body type, 1.6 line-height, -0.012em tracking and the 560px reading column. Earlier inline-effect recipes below/above are historical references, not a requirement to reintroduce every treatment.
