---
name: portfolio-ui-design
description: >-
  Design, restyle, and iterate on the UI of this portfolio site (index.html /
  styles.css / script.js). Use this skill WHENEVER the user wants to change how
  the site looks or feels — adding or redesigning a section, restyling a
  component (cards, chips, buttons, the hero, the nav), adjusting layout,
  spacing, color, typography, animation, or responsiveness, or asking for "a
  better UI / make this look nicer / suggest a design." It carries the site's
  design system (colors, fonts, spacing, component patterns) so changes stay
  consistent, and a reliable headless-screenshot workflow so you can SEE the
  result in the real theme before/after every change. Trigger it even when the
  user doesn't say "design" — e.g. "this section feels cluttered", "fix the
  stack section", "the font looks off", "add an icon".
---

# Portfolio UI Design

This is a single-page, hand-written static site — no framework, no build step.
Three files do everything:

- `index.html` — all markup, one `<main>` of stacked `<section>`s
- `styles.css` — all styles, driven by CSS custom properties in `:root`
- `script.js` — vanilla JS: scroll-reveal observer, active-nav, cursor glow, flow-field canvas

Because there's no build step, you edit the files directly and refresh the browser.
The hard part of design work here isn't writing CSS — it's **seeing the result**,
because the page hides most sections until you scroll (see Gotchas). This skill's
main job is to make that loop fast and consistent.

## The design system (use these — don't invent new values)

The full token list and component recipes live in `references/design-system.md`.
Read it before any non-trivial styling so new work matches what's there. The
essentials:

- **Surface:** near-black `--bg #080a09`; panels `--panel #101412`; hairline borders `--line` (≈12% warm white).
- **Text:** `--text #f3f0e8` (primary), `--muted #aaa99f` (body), `--subtle #74766e` (labels).
- **Accents:** `--jade #66d6a5` is the primary (links, highlights, primary button). `--amber #e7b85f` is the secondary (taglines, "currently building"). Use jade→amber gradients for emphasis. Don't add new accent hues.
- **Type:** headings = **Space Grotesk** (≤700 weight — it has no 800); body = **Inter**; labels/eyebrows/tags/dates = **JetBrains Mono** (uppercase, letter-spaced). These three roles are the whole system — keep each in its lane.
- **Shape & space:** radius `--radius 6px` (cards/buttons), `--radius-lg 12px`. Spacing scale `--space-sm/md/lg/xl` = 16/32/64/96. Section padding uses `--space-lg`/`--space-xl`.
- **Motion:** entrances ease with `cubic-bezier(0.16, 1, 0.3, 1)`; hover lifts use `translateY(-2px/-3px)` with a soft jade shadow.

Match the existing idiom: chips/tags follow `.tag-list li`, cards follow
`.stack-groups article`, section intros use the `eyebrow` + `<h2>` pattern with a
two-digit number (`01 · Projects`). Reuse these instead of one-off styling.

## Workflow for any visual change

1. **Make sure a local server is running.** `python3 -m http.server 8080` from the
   repo root (or reuse one already up). The screenshot tool needs a URL, not a `file://` path.
2. **Capture a "before" shot** of the area you're touching (see below). This is
   cheap insurance and lets you show real before/after.
3. **Edit the files.** Keep changes scoped; reuse tokens and existing component
   classes. Prefer extending `styles.css` over inline styles.
4. **Bump the cache version.** `index.html` links assets as `styles.css?v=N` and
   `script.js?v=N`. After editing CSS/JS, increment **both** to the next number so
   the browser (and the user's open tab) loads the new files instead of a cached
   copy. This is the #1 cause of "I don't see any change."
5. **Capture an "after" shot** and actually look at it. Check the change in
   context — alignment, wrapping, spacing rhythm, contrast — not just that it
   "rendered." Look at mobile width too (390px) for anything layout-related.
6. **Show the user** the screenshot(s) and describe what changed. For anything
   subjective ("a better UI"), prefer building 1–2 real options and screenshotting
   them so they choose from images, not prose.

## Screenshotting (the part that's easy to get wrong)

Use the bundled script — it handles the gotchas:

```bash
node .claude/skills/portfolio-ui-design/scripts/screenshot.mjs \
  --url http://localhost:8080/ --width 1440 --out /tmp/pf
```

It writes `/tmp/pf1.png`, `/tmp/pf2.png`, … — one image per viewport-height slice
of the full page — then prints the count. Read the relevant slices to review.
Flags: `--width` (1440 desktop / 390 mobile), `--out` (path prefix), `--port`
(CDP port, default 9400; change if it collides). Requires Google Chrome installed
and a running server.

### Why not a normal screenshot

- **Scroll-reveal hides content.** `script.js` sets sections to `opacity:0` until
  they scroll into view, so a plain capture shows blank panels. The script forces
  `prefers-reduced-motion: reduce` via the DevTools protocol, which makes
  `script.js` reveal everything immediately — so the whole page renders.
- **The hero is `100vh`.** If you set the capture viewport to the full page
  height, the hero stretches to fill it and everything looks broken. The script
  keeps a realistic viewport height and uses `captureBeyondViewport` to get the
  rest, then slices the result — so each slice reads like a real screen.

If you ever screenshot by hand, replicate both: emulate reduced-motion, and keep
a normal viewport height.

## Gotchas specific to this repo

- **Cache version bump is mandatory** after CSS/JS edits (step 4). Forgetting it
  makes changes invisible.
- **`sed -i ''` on macOS doesn't support `\b`** — match literal strings when
  scripting edits to the CSS.
- **Don't reach for scroll-snap.** It was tried and removed: with sections taller
  than the viewport (Projects, Experience) it yanks the user back up. The "page"
  feel comes from full-height sections + the reveal animations, not snapping.
- **Reduced-motion is respected for real users** — keep the
  `@media (prefers-reduced-motion: reduce)` block working (it disables transforms/
  transitions). Don't add motion that breaks if that block strips transforms.
- **Breakpoints:** `980px` (tablet) and `700px` (mobile). Test changes at both.
- **Remove dead CSS** when you remove markup (e.g., deleting a section), so the
  stylesheet doesn't accumulate orphaned rules.

## Picking and presenting design options

When the user asks for "a better X" or a redesign, don't just describe choices —
**build them and show them.** Mock up the leading option (and optionally a second)
as real edits, screenshot, and let the user choose from images. If they reject it,
revert: it's one section in one file, cheap to undo. Keep options within the design
system above so every choice already looks like it belongs.
