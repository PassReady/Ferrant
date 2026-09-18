# Ferrant v4: spec sheet

Status: **DRAFT, awaiting Rob's approval (Gate 2).** No markup until approved.
Written 2026-09-18 against `D:/Dev/graphicl-system/DESIGN-BANK.md` (2026-09-18).
No `DECISIONS.md` existed, so nothing was locked; this sheet becomes its first entry.

**Brief (Gate 1, from Rob):** redesign Ferrant to the new design bank. It is the
portfolio's showcase for *moody with animation*: lean heavily on the bank, full
of motion, any element may change. Content, pages and the demo admin stay.
The event-space copy (Chef's Table, Fireside Room) stays verbatim, as before.

Also closes two open repairs from `OPEN-QUESTIONS.md` §4: **(b)** the 74rem
container, **(c)** the background wordmark.

---

## 1. Palette

Warm near-black, neutrals tinted toward fire. One accent family, rationed by
area: never a large surface, only the one action per screen, numerals,
hairlines and the active state.

| Token | Hex | Where |
|---|---|---|
| `--forge` | `#0C0A08` | Page ground. Grained. |
| `--char` | `#15110D` | Alternate dark band, so consecutive dark sections never merge |
| `--char-2` | `#1E1813` | Card tonal step on `--char` (no borders on cards) |
| `--soot` | `#070504` | Scrim colour `D`, a shade deeper than the ground so photos glow |
| `--bone` | `#EDE4D3` | Text on dark (15.7:1). Ground of the one light band |
| `--ink` | `#1A1410` | Text on bone (14.5:1) |
| `--ash` | `#A39482` | Secondary text on dark (6.7:1) |
| `--ash-ink` | `#6B5E50` | Secondary text on bone (5.0:1) |
| `--flame` | `#E8A24A` | **Accent on dark.** Primary pill fill, active tab, eyebrow markers, numerals (9.1:1, passes as text) |
| `--ember` | `#8A3320` | **Accent on light.** Same jobs on the bone band (6.5:1) |
| `--brass` | `#C49A5C` | The logo's gold. Hairlines at 40%, the flame mark, footer wordmark (7.7:1) |
| `--heat` | `#B8432B` | **Glow only**, never text (3.65:1 fails). Hero breath, ember particles |

Grounds: dark throughout, banded `--forge` / `--char`, plus **one bone band** on
the home page (the menu accordion, the most reading-heavy moment). Grain on every
flat dark ground (0.16, soft-light) and on the bone band (0.12, screen).

## 2. Type

Two families, one superfamily. Replaces the current five (Zilla Slab, Special
Elite, Space Grotesk (on the rejected list), Niconne, General Sans). Instrument
Serif sits closest to the classical capitals in the Ferrant logo.

| Level | Face | Size (desktop → mobile) | LH | Tracking |
|---|---|---|---|---|
| Hero display | Instrument Serif 400 | 168px → 64px | 0.96 | -0.03em |
| H2 | Instrument Serif 400 | 80px → 44px | 1.02 | -0.02em |
| H3 | Instrument Serif 400 | 36px → 28px | 1.1 | -0.015em |
| Lead | Instrument Sans 400 | 22px → 19px | 1.5 | -0.01em |
| Body | Instrument Sans 400 | 17px → 16px | 1.62 | 0 |
| Label / eyebrow | Instrument Sans 500, uppercase | 12px | 1.2 | +0.14em |
| Price / numerals | Instrument Sans 500, tabular | 15px | 1 | 0 |

- **Single weight at display** (bank §3.5), hierarchy by size.
- **Serif accent, italic:** one italic word per headline, in `--flame` on dark
  ("Come sit by the *fire*."). Only device; never a second one.
- **Eyebrows** on every section with a `//` section marker in the accent.
- **Wordmark as graphic:** "FERRANT" at ~28vw, 4% bone, behind the home
  statement (repair **c**); solid brass at display scale in the footer.

## 3. Layout tokens

Bank §1 verbatim: fluid container, `--gutter: 50px` (20px mobile),
`--measure: 68ch` on text columns only (repair **b**, replaces `--wrap: 74rem`).
Section rhythm 120 / 96 / 72. Radii: `--r-card 16px`, `--r-small 8px`, pills
for buttons and chips. Full-screen stacked cards 20px (Visionary).

Buttons: **split button** (label pill + arrow circle) site-wide. Primary fill
`--flame` with `--ink` label on dark; `--ember` fill with bone label on light.
One primary per screen.

## 4. Section plans

Sticky-family count per page shown in brackets (bank limit: two).

### Home [2 sticky: expand-to-bleed, depth stack]

| # | Section | Treatment (bank name) | Width | Ground |
|---|---|---|---|---|
| 0 | Intro | **Preloader curtain**: flame mark brightens on `--soot`, lifts at 1.1s. Once per session, 2.5s timeout fallback (AOMI defect) | Full | soot |
| 1 | Hero | **Withheld H1** over `hero-fire.mp4`, **centre vignette** scrim. Eyebrow + one standfirst + scroll cue. **Hero content card** bottom-right in **frosted glass**: "Tonight · 5:30pm till late · bar walk-ins" + split button *Reserve*. Hours in the first screen. Video pause control | Full bleed | video |
| 2 | Statement | **Scroll-scrubbed text**, the withheld H1 lands here: "One wood fire. No gas line. Nothing on the menu is cooked any other way." Behind it the **background wordmark** | Container, measure-capped | forge |
| 3 | The fire | **Expand to full bleed**: `oven-fire.jpg` grows from `inset(30% 27% round 16px)` to full screen; **pull-back (type)** "No flame, no menu." lands on it with a **bottom scrim** | Inset → full | char |
| 4 | Menu | **Hover accordion with image swap**: five rows (Bites → Desserts) as real buttons, one open by default, inactive at 58%, the linked category photo crossfades beside it. Passes flat-ground on state | Asymmetric 5/7 | **bone** |
| 5 | Marquee | **Counter-scrolling marquees**, scroll-linked, Instrument Serif italic ~200px: "wood fire · charred · smoked" / "ember · flame · ash". Edge-fade mask | Full bleed | forge |
| 6 | Event spaces | **Depth stack**: Chef's Table, Fireside Room, Long Table, each a full-screen rounded card, whole card a link, pill chips (seats, "from $"), image pull-back 1.25→1, title rises 200px, line 150px, covered card recedes (blur 6px, 0.94) | Container | char |
| 7 | Close | `cta-sear.mp4` band, **fade to ground** top and bottom, **pull-back (type)** "Come sit by the *fire*." + split button. **Ember particles** rise through it | Full bleed | video |

Nothing repeats: two full-bleed video moments are separated by five different
treatments and sit at opposite ends of the page.

### Story [2 sticky: alternating split, annotated pin]

| # | Section | Treatment | Width | Ground |
|---|---|---|---|---|
| 1 | Hero | `charcoal-fire.jpg` with **pull-back (photo)**, **bottom scrim**, H1 "One fire, no *shortcuts*." + **hero stats** count-up: 1887 / 1 fire / 0 gas lines | Full bleed | photo |
| 2 | Forge, Rule, Ritual | **Alternating split scroll**: photo half holds while the copy half changes three times, then they swap sides for the third beat. Copy verbatim from today | Full bleed split | forge |
| 3 | The room | **Annotated image** on `chefs-table-kitchen.jpg`: four callouts (the hearth, the pass, the bread stones, the coals) whose leader lines draw in on scroll. Mobile: numbered dots, then a list | Container | char |
| 4 | Ada's line | **Scroll-scrubbed text**, italic serif, attributed | Measure | forge |
| 5 | Close | `cta-bread.mp4`, same close band as home (the one repeated treatment site-wide, flagged: it is the booking close on every page) | Full bleed | video |

### Menu [1 sticky: sticky index]

| # | Section | Treatment | Width | Ground |
|---|---|---|---|---|
| 1 | Hero | **Structured hero**: H1 alone on top, hairlines that draw in, lower band with standfirst + *Reserve* + a **hero content card** of the five categories as jump links | Container | `menu-hero.jpg` under **horizontal scrim, hold then fall** |
| 2 | The menu | **Sticky index**: category list pinned left, active item follows scroll; right, each category = its photo carousel (existing, click-through) with **pull-back**, then dishes as **ruled rows** with **hover fill**, price in `--flame` | Container | forge |
| 3 | Notes | **Ruled grid**, three **space-between cells** (Dietaries / Bar walk-ins / Groups over 8), **hover lift with tonal shift** | Container | char |
| 4 | Close | Close band (`cta-grill.mp4`) | Full bleed | video |

### Events [1 sticky: stepped stack]

| # | Section | Treatment | Width | Ground |
|---|---|---|---|---|
| 1 | Hero | `fire-person.jpg`, **centre vignette**, **pull-back (type)** H1 "Take the room for a *night*." + **segmented control** of the three spaces as anchors | Full bleed | photo |
| 2 | The three spaces | **Stepped stack**: three contained panels (`--char-2`) pin 20px lower each; image 7 cols, copy + spec list 5 cols, image side alternates. Copy verbatim | Container | forge |
| 3 | How it works | Three **space-between cards** (Enquire / We hold the date / We cook), solid icon tile, **deal-in** on scroll | Container | char |
| 4 | Close | Close band (`cta-skewer.mp4`) with *Start an event enquiry* | Full bleed | video |

### Reservations [0 sticky]

| # | Section | Treatment | Width | Ground |
|---|---|---|---|---|
| 1 | Booking | **Asymmetric grid**: heading, standfirst and the booking flow left; **contained video** panel (`cta-grill.mp4`, 2:1-ish, 16px) right | Container | forge |
| 2 | Details | **Ruled grid** contact row: address, hours, phone, email at equal weight | Container | char |
| 3 | Map | Existing embed, darkened with a CSS filter to sit in the palette, **edge fade** top | Full bleed | forge |

### Global chrome

- **Nav**: transparent over heroes, then **frosted glass** + hairline once
  scrolled, fixed height (no flicker). **Letter roll** on links. *Reserve* split
  button at every width. Mega menu kept, restyled.
- **Footer**: hours in the top row (bank §8 hospitality); **wordmark footer**
  (brass FERRANT at display scale with "One fire, every dish."); **ruled grid**
  of links; contact row; labelled social chip.
- **Admin**: keeps its light chrome; fonts swapped to the two new families only.

## 5. Motion

One language across the site. Tokens from bank §1, verbatim.

| What | Trigger | Spec |
|---|---|---|
| Hero load | Page load, after curtain | 4 blocks, 200ms apart, rise 40px (80px for the display line), 800ms, `cubic-bezier(.16,1,.3,1)` |
| Section entrance | In view, once | Default variant: 40px, 800ms, 200ms stagger |
| Display headlines | In view | Per-word mask rise 80px, 60ms per word |
| Scroll-linked set | Scroll position | Pull-back (photo 1.2→1, type 2→1), expand to full bleed, scrubbed text (colour dim→lit, never opacity), counter marquees, depth stack, stepped stack, alternating split, deal-in, leader-line draw. `animation-timeline: view()` inside `@supports` |
| Hover | Pointer | 300ms `cubic-bezier(.44,0,.56,1)`: letter roll (nav), hover fill (ruled rows), hover lift + tonal shift (cards), image zoom 1.04 inside frames |
| Ambient | Always | Hero glow breathing 6s, ember particles in close bands, both videos |

**Floor (hard rule 3):** everything off under `prefers-reduced-motion`, falling
back to the finished layout. No copy at `opacity: 0` without JS: reveals are
gated on an `html.js` class. Hero video and ember particles share one visible
**pause motion** control (WCAG 2.2.2). Hover reveals shown by default on touch.
Browsers without scroll-driven animations (Firefox today) get the finished
layout plus the JS entrances; flagged, not polyfilled.

## 6. Assets

All existing, already in `public/`. No gaps.

| Slot | File |
|---|---|
| Logo / preloader / footer | `ferrant-flame-icon.png`, `ferrant-flame-full.png`, `Ferrant Logo.png` |
| Home hero | `video/hero-fire.mp4`, poster `charcoal-fire.jpg` |
| Home expand-to-bleed | `oven-fire.jpg` |
| Home accordion | `menu/bites-marrow2`, `entree-scallop2`, `main-lamb2`, `side-potatoes2`, `dessert-tart2` |
| Home depth stack | `chefs-table-kitchen.jpg`, `dinner-candle.jpg`, `long-table-set.jpg` |
| Close bands | `video/cta-sear`, `cta-bread`, `cta-grill`, `cta-skewer` (posters: existing stills) |
| Story | `charcoal-fire`, `forge-smith`, `oven-fire`, `fire-skewer`, `chefs-table-kitchen` (annotated), `firewood` |
| Menu | `menu-hero.jpg`, the 18 category photos |
| Events | `fire-person`, `chefs-table-kitchen`, `dinner-candle`, `long-table-set` |

Note: `chefs-table-kitchen.jpg` appears three times (home stack, story
annotation, events). Flagged; `bar-moody.jpg` or `room-dim.jpg` can take the
home stack slot if you'd rather not repeat it.

The videos are 24–32MB each (`cta-grill`, `cta-sear`, `cta-skewer`). They get
re-encoded to ~720p, under 5MB each, and load on entering view with
`preload="none"`, per bank §6.
