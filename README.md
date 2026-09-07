# Ferrant

A portfolio demo site for a fictional fire-cooking restaurant. Built to agency standard as a
sales asset. **Ferrant is not a real business.**

Next.js 16 (App Router, TypeScript), no CSS framework — hand-written CSS with a small token
system. Deploys to Vercel with zero config.

## Run it

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build
```

## The concept

A fire-cooking restaurant in Fitzroy, Melbourne — everything on the menu is cooked over one
wood fire. Normal-capacity, nightly service with a full à la carte menu (Bites / Entrées /
Mains / Sides / Desserts), not a single-sitting exclusive format. Dinner nightly from 5:30pm,
Tuesday to Sunday; private events use the room on Monday, the night it's otherwise closed.

## Design language — firelight, not a dark theme

The name *ferrant* is Old French for the farrier, the smith who works iron with fire. That's
the anchor: iron and heat, not a farmhouse.

- **One warm light source per screen**, with real falloff to black at the edges. A fixed,
  barely-there ember glow sits on every page (`body::before`); every photograph passes
  through one shared grade (`components/Frame.tsx`) — darkened, warm-shifted, vignetted.
- **Heat is rare.** The room is warm near-black (`--forge #0C0B0A`, never pure `#000`).
  Ember `#C0402A` and flame `#E8A24A` appear only where something is hot: the hero glow,
  the one primary action per screen, focus rings, the mega-menu icons.
- **Type:** Zilla Slab (display — heavy, worked, set large: fire and iron, not wine bar)
  with General Sans (body/UI — quiet). Loaded via `next/font`.
- **Density:** copy is paired directly beside the image it describes (Story, Events, Home)
  rather than left floating alone on black — no two sections repeat the same structure.

Full palette and scale in `app/globals.css` `:root`.

## Pages

| Route | Notes |
|---|---|
| `/` | Full-screen looping fire video hero, letter-by-letter wordmark, parallax on scroll. Two image-paired sections below (mirrored layouts), then a reserve CTA band. |
| `/story` | Heading + three rows, each pairing a paragraph (staggered word reveal) with a photo, alternating sides. |
| `/events` | Three private-event offerings, three different layouts: full-bleed photo with the copy overlaid (Chef's Table), a sticky spec sidebar beside scrolling prose (Fireside Room), an asymmetric split with an overlaid statement image (Buyout). |
| `/menu` | Category tabs (Bites/Entrées/Mains/Sides/Desserts). Dish list beside a click-through image carousel (dots + arrows) of photography for that category — not scroll-linked. |
| `/reservations` | OpenTable-style booking modal: two-month calendar (Tue–Sun open), arrival slots, party stepper, confirmation screen. No backend. |
| `/admin` | Demo CMS (`demo` / `Ferrant2026`). Edit the menu intro and each dish (name, category, price, description); state lives in `lib/store.ts` (localStorage), shared live with `/menu`. |

Nav uses a mega menu on hover/click for **Menu** and **Event Spaces** (a full panel below the
bar with icon + label + blurb per link) — driven by React state in `components/Nav.tsx`, not
CSS `:hover`/`:focus-within`, so it can't get stuck open after a client-side navigation.

## Placeholders to swap at build

- **Photography** is stock (Unsplash), chosen dark and graded to a single look, plus
  categorically-matched dish photography under `public/img/menu/`. Replace with the venue's
  own shoot; the `Frame` grade will keep it consistent.
- **Copy** — menu, story, event descriptions, the founder (Ada Ferrant), the Fitzroy laneway
  address, phone and email — is written for the concept. All fictional.
- The booking flow and CMS send/save nothing outside the browser.

## Accessibility

Keyboard focus is a visible amber ring. `prefers-reduced-motion` is respected (no fire
animation, no transitions). Body text is bone on forge at ~14:1. Responsive to 320px.
