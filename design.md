# Portfolio design reference

Status: approved visual direction — **05 / Compact**  
Recorded: 10 September 2026  
Target branch: `portfolio-sept-2026`

## Source of truth

- [Approved prototype](https://paolo-portfolio-directions.papaniap11.chatgpt.site/?direction=compact)
- Current prototype revision: `f6d6224af3a5df444f7c63c236d656f4bbd31ac1` (palette and CV refinement).
- Source styles: `dist/compact.css`, with inherited base styles from `dist/style.css`.
- Inspiration: [Daniel White](https://www.danielwhite.uk/), particularly the compact reading column, restrained headings and small inline details.

This document records the latest approved colours, tighter tracking, reduced line-height and occasional Virgil accents. It describes the intended Astro rebuild; adding this file does not migrate the existing Astro styles.

Semantic token names below are the documented implementation vocabulary. Most prototype measurements are currently literals; these names do not imply that corresponding CSS variables already exist in the application. Values reproduce the approved reference unless explicitly marked as supporting prototype UI or an unresolved implementation choice.

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

Dark is the reference's initial mode. The base direction is approved; the blue/orange refinements below are the current preview requested on 10 September 2026. The background remains unchanged from the selected Compact version.

| Semantic token | Prototype alias | Dark | Light | Usage |
| --- | --- | --- | --- | --- |
| `--color-background` | `--paper` | `#373633` | `#FBF1D3` | Page background |
| `--color-text-primary` | `--ink` | `#F2E5C4` | `#3C3836` | Name, headings, stronger words |
| `--color-text-secondary` | `--muted` | `#D0C3A6` | `#665C54` | Body copy and metadata |
| `--color-border` | `--line` | `#55534C` | `#D5C4A1` | Rules, work rail, inline badges |
| `--color-accent-primary` | `--blue` | `#8B9BFF` | `#1536d8` | Blue links, emphasis, focus, icons |
| `--color-accent-secondary` | `--rust` | `#FF791F` | `#C14300` | Orange accents and underlines |
| `--color-accent-tertiary` | `--olive` | `#C8D65B` | `#626F07` | Occasional olive icons |
| `--color-surface` | `--panel` | `#42433C` | `#EBDFBB` | Inline badge background, image preview surface |
| `--color-surface-soft` | `--soft` | `#41423B` | `#F0E7C8` | Secondary supporting surface |

The primary accent now returns to a Klein-inspired blue direction. The original Astro stylesheet uses `hsl(223 84% 50%)` (its nearby hex comment is inconsistent); the new light-mode blue is deeper. Dark-mode text uses a brighter blue for contrast, while saturated fills use `--blue-solid: #2440ED` (light: `#1536D8`). The Studiz badge uses this fill with white text. Small blue glyphs on the dark badge surface use `#A3B0FF`.

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

Reference contrast checks for accents against the page background: dark blue 4.74:1, orange 4.61:1, olive 7.61:1; light blue 7.30:1, orange 4.58:1, olive 4.91:1. These are colour-pair checks, not a full accessibility audit.

### Copyable theme values

```css
:root,
[data-theme="dark"] {
  color-scheme: dark;
  --color-background: #373633;
  --color-text-primary: #f2e5c4;
  --color-text-secondary: #d0c3a6;
  --color-border: #55534c;
  --color-accent-primary: #8b9bff;
  --color-accent-secondary: #ff791f;
  --color-accent-tertiary: #c8d65b;
  --color-surface: #42433c;
  --color-surface-soft: #41423b;
}

[data-theme="light"] {
  color-scheme: light;
  --color-background: #fbf1d3;
  --color-text-primary: #3c3836;
  --color-text-secondary: #665c54;
  --color-border: #d5c4a1;
  --color-accent-primary: #1536d8;
  --color-accent-secondary: #c14300;
  --color-accent-tertiary: #626f07;
  --color-surface: #ebdfbb;
  --color-surface-soft: #f0e7c8;
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
- Keep the approved saturated accents and lighter charcoal. Do not revert to earlier Studio or Prose colours.
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
