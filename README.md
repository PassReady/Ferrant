# Ferrant

A portfolio demo site for a fictional live-fire chef's-table restaurant. Built to agency
standard as a sales asset. **Ferrant is not a real business.**

Next.js 16 (App Router, TypeScript), no CSS framework — hand-written CSS with a small token
system. Deploys to Vercel with zero config.

## Run it

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build
```

## The concept

One fire, lit before service. Twelve seats, one seating a night, one tasting menu that
changes every Wednesday. The pass is open and faces the room. The audience is people booking
a special-occasion dinner or a small private event.

## Design language — firelight, not a dark theme

The name *ferrant* is Old French for the farrier, the smith who works iron with fire. That's
the anchor: iron and heat, not a farmhouse.

- **One warm light source per screen**, with real falloff to black at the edges. A fixed,
  barely-there ember glow sits on every page (`body::before`); every photograph passes
  through one shared grade (`components/Frame.tsx`) — darkened, warm-shifted, vignetted.
- **Heat is rare.** The room is warm near-black (`--forge #0C0B0A`, never pure `#000`).
  Ember `#C0402A` and flame `#E8A24A` appear only where something is hot: the hero glow,
  the one primary action per screen, focus rings, the mark on the menu.
- **Type:** Zilla Slab (display — heavy, worked, set large: fire and iron, not wine bar)
  with General Sans (body/UI — quiet). Loaded via `next/font`.

Full palette and scale in `app/globals.css` `:root`.

## Pages

| Route | Notes |
|---|---|
| `/` | Hero is the fire itself. One orchestrated load animation: the fire comes up over ~2s, then a slow breath on the glow only. `prefers-reduced-motion` loads it already lit. |
| `/story` | A centred essay, first person, broken by two full-bleed images. |
| `/events` | The most photographic page — full-bleed image bands. Three private-event options read top to bottom like choosing. |
| `/menu` | This week's menu as one running document: course, then how it was cooked. Set price stated once; wine pairing is an addendum, not a parallel column. |
| `/contact` | Underline-field enquiry form (name, date, party, occasion). No backend — on submit it transitions in place to a confirmation state. |

## Placeholders to swap at build

- **Photography** is stock (Unsplash), chosen dark and graded to a single look. Replace with
  the venue's own shoot; the `Frame` grade will keep it consistent.
- **Copy** — menu, story, event descriptions, the founder (Ada Ferrant), the Fitzroy
  laneway address, phone and email — is written for the concept. All fictional.
- The booking form sends nothing.

## Accessibility

Keyboard focus is a visible amber ring. `prefers-reduced-motion` is respected (no fire
animation, no transitions). Body text is bone on forge at ~14:1. Responsive to 320px.
