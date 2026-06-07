# Portfolio design system

Source of truth is `:root` in `styles.css`. Keep this file in sync if tokens change.

## Color tokens

| Token | Value | Use |
|---|---|---|
| `--bg` | `#080a09` | page background (near-black, faint green/amber radial glows on `body`) |
| `--panel` | `#101412` | card / panel fill |
| `--panel-raised` | `#161a18` | raised panel |
| `--panel-soft` | `rgba(255,255,255,.045)` | subtle fill (ghost buttons, hovers) |
| `--text` | `#f3f0e8` | primary text / headings (`#fffaf0` for the brightest headings) |
| `--muted` | `#aaa99f` | body copy |
| `--subtle` | `#74766e` | eyebrows, fine print, "Used:" labels |
| `--line` | `rgba(243,240,232,.12)` | hairline borders / dividers |
| `--jade` | `#66d6a5` | **primary accent** — links, highlights, primary button, `<h1>/<h2> span` |
| `--jade-soft` / `--jade-dim` | jade @16% / @8% | accent fills, hover shadows |
| `--amber` | `#e7b85f` | **secondary accent** — project taglines, "currently building" pill |
| `--amber-soft` | amber @12% | amber fills |

Emphasis gradient: `linear-gradient(90deg, var(--jade), var(--amber))` (used by the
scroll-progress bar and the favicon). Don't introduce accent colors outside jade/amber.

## Typography

Loaded from Google Fonts in `index.html` `<head>`. Three roles, each in its lane:

- **Space Grotesk** — `h1, h2, h3`, brand, project titles, focus-area headings.
  Weights available: 500/600/700. **No 800** — cap heading weight at 700.
- **Inter** — body text, buttons, `<h2>` (the section sub-headline uses Inter at 750).
  Weights: 400/500/650/750/850.
- **JetBrains Mono** — `.eyebrow`, `.tag-list li`, `.project-index`, dates, metrics,
  `.availability-pill`, footer meta. Usually uppercase with `letter-spacing: .1em`.

Heading sizes use `clamp()` for fluid scaling (e.g. `h1: clamp(2.2rem, 4.5vw, 4.2rem)`).
Body `line-height: 1.65`.

## Shape, spacing, motion

- Radius: `--radius 6px` (cards, buttons, tags), `--radius-lg 12px` (larger panels).
- Spacing scale: `--space-sm 16` · `--space-md 32` · `--space-lg 64` · `--space-xl 96`.
  Sections use `padding-block: var(--space-lg|xl)`; horizontal `padding-inline: clamp(24px, 6vw, 112px)`.
- Entrance easing: `cubic-bezier(0.16, 1, 0.3, 1)`. Hover bounce: `cubic-bezier(0.34, 1.56, 0.64, 1)`.
- Hover pattern: `translateY(-2px|-3px)` + `border-color` jade @30–35% + soft jade box-shadow.

## Component recipes (reuse these classes / patterns)

- **Section intro:** `.section-heading` with `<p class="eyebrow">NN · Name</p>` then
  `<h2>Plain text <span>accent phrase</span>.</h2>`. The `<span>` renders jade.
- **Card:** `border: 1px solid var(--line); border-radius: var(--radius); background: var(--panel); padding: 16px 18px;`
  plus the shared hover lift. See `.stack-groups article`.
- **Chip / tag:** `.tag-list li` — small mono text in a bordered pill, flex-wrapped with `gap: 10px`.
- **Buttons:** `.button.primary` (solid jade, dark text), `.button.ghost` (soft fill),
  `.icon-link` (44×44 square icon button). All have `min-height: 44px` (tap target).
- **Pills:** `.availability-pill` (amber outline), `.project-status` ("Currently building").
- **Reveal hooks:** add `section-reveal` to a `<section>` and `data-reveal` to children
  for the rise-and-fade entrance; `data-reveal-stagger` on a container staggers its
  direct children. `script.js` wires these via IntersectionObserver.

## Layout

- Single `<main>` of stacked `<section>`s. Current order: Hero (with focus strip) →
  Projects → Experience → Stack → About → Contact → footer.
- Section width: full-bleed background, content constrained by `padding-inline` (no max-width; `--max: none`).
- `.split-section` is a two-column grid (sticky heading left, content right) — used by About.
- Sticky header is `78px`; `html { scroll-padding-top: 90px }` keeps anchor jumps clear of it.

## Responsive

Breakpoints: `@media (max-width: 980px)` (tablet — grids collapse) and
`@media (max-width: 700px)` (mobile — single column, tighter spacing). Always
re-check layout changes at 390px width.
