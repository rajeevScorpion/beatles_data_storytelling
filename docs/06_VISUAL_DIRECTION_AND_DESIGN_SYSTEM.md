# 06 — Visual Direction and Design System

## Direction in one paragraph
The visual language is **1960s print culture rebuilt as a contemporary digital interface**: the opening should feel like discovering a beautifully preserved record sleeve or music magazine—warm off-white paper, deep ink black, restrained red accents, oversized condensed editorial type, halftone archival photography, registration marks, imperfect print textures and subtle vinyl/paper grain—but the visual system should gradually mutate with the music itself. Early Beatlemania stays predominantly monochrome and tightly gridded; Rubber Soul/Revolver begins introducing ochres, forest greens, collage and hand-drawn forms; 1967 expands into saturated psychedelic colour, warped geometry and layered typography; and the White Album/Abbey Road period pulls everything back toward spacious, mature modernism. The retro quality should come from material, typography and composition rather than fake nostalgia, while the **behaviour remains unmistakably modern**: exceptionally smooth scroll choreography, elements assembling and dispersing as data changes, album/song cards with depth, magnetic hover states, animated filters, morphing data forms, layered parallax, responsive drawers and a restrained listening dock. The goal is to feel as though a gifted late-1960s graphic designer had been handed today’s browser, motion and interaction technology.

## Design principle
**Retro material + modern behavior.**

Do not make a sepia “vintage template.”
Do not make a neon tech dashboard with Beatles photos pasted into it.

---

## Era palettes

### Act I — The Explosion
- Paper: `#F2EBDD`
- Ink: `#151515`
- Press Red: `#C43A2F`
- Newsprint Gray: `#B8B1A6`

Mood: monochrome press, flash photography, touring, headlines.

### Act II — The Band Turns Inward
- Parchment: `#E8DECB`
- Forest: `#334C39`
- Ochre: `#B48639`
- Ink: `#171714`

Mood: folk, collage, inwardness, studio craft.

### Act III — The Studio Becomes the Instrument
- Acid Yellow: `#E7D735`
- Magenta: `#B43B78`
- Cobalt: `#315EA8`
- Violet: `#67428F`
- Deep Ink: `#151329`

Mood: psychedelic poster printing without sacrificing legibility.

### Act IV — Four Voices, One Band
- White: `#F4F2EC`
- Charcoal: `#20201E`
- Apple Green accent: `#668657`
- Brick/Brown accent: `#8C5742`

Mood: quieter, mature, editorial, individual.

These are starting tokens, not a requirement that every component be brightly colored.

---

## Typography
Use freely available web fonts; do not require proprietary Beatles typography.

Recommended pairing:
- Display condensed: `Roboto Condensed`, `Archivo Narrow`, or `Barlow Condensed`
- Editorial serif: `Libre Baskerville`, `Source Serif 4`, or `Newsreader`
- Utility/data: `IBM Plex Mono` or `Space Mono`

Hero:
uppercase, very large, tightly tracked condensed sans.

Song titles:
serif or strong grotesk depending on era.

Data labels:
mono in small uppercase.

Psychedelic section:
distort layout/forms rather than relying on an unreadable novelty font.

---

## Surfaces / texture
CSS or lightweight local SVG textures:
- subtle paper noise
- halftone dot masks
- photocopy grain
- registration cross marks
- thin record grooves
- slightly imperfect borders

Texture opacity should normally remain under 8–12%.

---

## Grid
Desktop:
12-column editorial grid, max content width around 1440px with full-bleed scenes allowed.

Tablet:
8 columns.

Mobile:
4 columns.

Let large type intentionally break the grid in hero/transitional moments, but keep controls aligned.

---

## Elevation
Avoid glossy app-card shadows.
Use:
- 1px ink outlines
- printed-paper offset shadows
- 2–6px physical offsets
- occasional hard shadow mimicking print registration

Drawers/player can use more conventional modern elevation for usability.

---

## Images
Treat photography editorially:
- crop dramatically;
- monochrome/duotone for Early/Middle eras;
- halftone overlay on transitions;
- avoid stretching low-resolution archival images full-screen;
- give every externally sourced image a data/source credit in the Credits modal.

---

## Motion language by era
Early:
snappy cuts, horizontal ticker energy.

Middle:
slower dissolves, collage layers.

1967:
radial expansion, layered parallax, morphing shapes.

Late:
calmer easing, larger whitespace, slower settling.

This creates narrative motion without turning every interaction into a gimmick.

---

## Accessibility visual floor
- body text contrast ≥ WCAG AA
- minimum 16px body copy
- no critical information encoded only by color
- focus states visible even against textured backgrounds
- animation never required to understand a chart
- reduced-motion mode must preserve all data and controls
