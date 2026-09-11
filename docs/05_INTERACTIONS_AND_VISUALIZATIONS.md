# 05 — Interactions and Visualizations

## Global interaction model
Persistent top or side “explore rail” after the hero:
`ERA · MEMBER · ALBUM · MOOD/THEME · GENRE · LYRICS`

On mobile, collapse to one `EXPLORE` pill opening a bottom sheet.

## Song drawer
Any song node/card/title can open the same reusable drawer.

### Drawer contents
- title
- year / composite year if relevant
- album + album type label
- written by
- lead vocal
- cover/original
- instrumental state
- normalized genres + selected styles
- raw themes
- theme cluster(s)
- mood chips (collapsed initially)
- word count
- full supplied lyrics for this classroom prototype
- `LISTEN` if present in media manifest
- `RELATED SONGS`
- source/credit micro-link where external metadata is shown

### Drawer behavior
Desktop: large right-side editorial drawer, 45–55vw.  
Mobile: full-height bottom sheet.

Do not navigate away.

---

## Theme islands
### Layout
Use D3 force simulation or a deterministic packed layout for the theme labels.

Island size = number of tagged records.  
Do not use random sizing unrelated to data.

### Selection
Click:
- selected island enlarges;
- other islands reduce opacity;
- matching song “satellites” enter;
- show a readable list fallback below the visualization.

### Accessibility
Every island must also be a real button.
Provide a text list alternative for keyboard/screen-reader users.

---

## Authorship strands
Prefer custom SVG paths over a Sankey chart.

Each member receives a typographic label and line.
Song dots appear along years.
Shared credits may appear on more than one strand — this is accurate to the source-presence model.

Do not pretend the source offers fractional authorship percentages.

---

## Cover → original transition
Make the interaction physical:
- cover records begin as visibly “borrowed” sleeves;
- originals use the core page visual identity;
- scroll causes covers to peel/fall/fade;
- numerical annotation stays available for clarity.

Motion must communicate data, not decorate it.

---

## Lyric Lens
### Search state
- query input
- matching records count
- total occurrences
- era/year distribution
- result list

### Visualization
A horizontal 1962–1970 band with one row per matching song is too chart-like.
Prefer:
- year columns with typographic song markers, or
- a single ribbon/tape line that accumulates occurrence ticks.

### Result click
Open song drawer, scroll lyrics to the first match and highlight all query matches.

### Suggested terms
Derive suggestions from actual term frequency but manually exclude stopwords and overly generic tokens.

---

## Genre Universe
Use D3 force only for layout math.
Render React/SVG or React/HTML for interaction.

Controls:
- year slider / era buttons;
- genre-family buttons;
- `show raw genres` toggle;
- selected song details.

No pan/zoom unless needed; keep the composition readable.

---

## Related-song engine
Use the weighted similarity algorithm in `03_DATA_AUDIT_AND_NORMALIZATION.md`.

Present recommendation copy as:
> **If this song is where you are, try these next.**

Avoid claiming algorithmic “meaning” beyond shared metadata.

---

## Micro-interactions
Use motion deliberately:
- magnetic but subtle buttons;
- paper cards lifting 3–8px;
- gentle image scale on hover;
- track-list ticker motion;
- ink/reveal masks;
- filters morphing rather than hard re-rendering;
- record/sleeve rotation limited to 1–3 degrees;
- click feedback within 100–160ms;
- major transitions around 350–700ms.

Avoid:
- endless floating particles;
- constant cursor followers;
- excessive 3D transforms;
- motion on every text line;
- fake film damage that reduces readability.

Respect `prefers-reduced-motion`.

---

## Scroll behavior
Use sticky sections selectively.
Do not make every section a pinned scrollytelling scene.

Recommended pinned scenes:
1. cover disappearance
2. authorship strands
3. theme islands
4. genre expansion

Other sections should breathe naturally.

---

## Empty/error states
### Media unavailable
> This official video can’t be embedded right now.  
> `OPEN ON YOUTUBE ↗`

### No lyric search result
> No match in this 213-song dataset. Try another word or browse themes.

### Missing themes
Show `No theme tags in source dataset` rather than hiding the song.

### Instrumental
Show `INSTRUMENTAL — no lyric text required`.
