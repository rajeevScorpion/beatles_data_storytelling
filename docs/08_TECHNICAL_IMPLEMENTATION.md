# 08 — Technical Implementation

## Stack
- Next.js App Router
- TypeScript
- Tailwind CSS
- React
- `motion/react` (or the current Motion package available in the environment) for UI/scroll animation
- D3 modules only where custom layout math is genuinely useful (`d3-force`, scales, shapes)
- no general-purpose chart-dashboard library
- YouTube IFrame Player API
- local static JSON data

Prefer the current stable versions supported by Google AI Studio. Do not pin outdated versions just because a prompt names them.

## App architecture
Suggested:
```text
app/
  page.tsx
  globals.css
components/
  hero/
  timeline/
  covers/
  authorship/
  themes/
  lyric-lens/
  genre-universe/
  explore/
  song-drawer/
  player/
  credits/
lib/
  data.ts
  filters.ts
  lyrics.ts
  relatedSongs.ts
  youtube.ts
  types.ts
data/
public/
```

## Data loading
Prefer importing the normalized JSON at build time or reading it as a server-side static asset and passing needed data into client components.

No database is required.

No runtime MusicBrainz request is required for V1.

## State
Use React context or a small store only if needed.

Global state candidates:
- selected song
- selected filters
- active story era
- selected theme
- lyric query
- player track
- drawer open state

Do not introduce Redux.

## Performance
213 records is small.
Priorities:
- lazy-load heavy visualization sections;
- load YouTube IFrame API only when the user first invokes playback;
- do not mount all lyric text simultaneously in the DOM;
- use responsive images;
- animate transforms/opacity rather than layout-heavy properties;
- throttle/simplify D3 force simulation after settling;
- pause offscreen decorative animation.

## Next Image
For remote assets, configure only the required domains.
Prefer downloading clearly licensed classroom assets into `/public` and retaining source metadata separately rather than depending on hotlinks.

## Scroll
Use CSS sticky + IntersectionObserver + Motion scroll hooks.
Avoid making GSAP a requirement unless the existing implementation truly needs it.

## Tailwind
Define semantic CSS variables:
- `--paper`
- `--ink`
- `--accent`
- `--muted`
- `--surface`
- `--border`

Era sections can switch variables at a parent container level.

Use custom utilities/classes for:
- halftone masks
- paper grain
- hard print shadow
- editorial rules
- registration marks

## Player
Load the YouTube script once.
Use a provider/hook:
- `cue(videoId)`
- `play(videoId)`
- `pause()`
- `close()`
- `state`
- `error`

Always set `origin` correctly for deployed host.
Do not suppress `Referer` in a way that violates YouTube player requirements.

## Lyrics
Because lyrics are in the user-supplied JSON:
- keep them out of initial visible DOM;
- only insert selected song lyrics in the drawer;
- search against `lyrics_search_text`;
- preserve original lyric text for display.

## URL state
Optional:
encode explore filters and selected song in query/hash:
`?song=here-comes-the-sun&theme=Nature`

This makes classroom demonstrations shareable without requiring multiple routes.

## Responsive behavior
Mobile is not a shrunk desktop:
- theme islands can become vertically packed buttons;
- authorship paths can simplify;
- player becomes bottom sheet;
- explore filters become sheet;
- drawer becomes full-screen;
- keep all insights accessible.

## Accessibility
- semantic buttons
- focus trapping in modal/drawer
- escape closes overlays
- keyboard-accessible song nodes
- `aria-live` for lyric result count
- screen-reader labels for visualization controls
- textual summaries below complex visualizations
- `prefers-reduced-motion`

## Analytics
Not required for classroom demo.
Do not add tracking by default.

## Error resilience
The app must remain useful if:
- all media embeds fail;
- external images fail;
- JavaScript animation is reduced;
- a song has no themes;
- a song has no lyrics.

The data story must not depend on third-party APIs being live.
