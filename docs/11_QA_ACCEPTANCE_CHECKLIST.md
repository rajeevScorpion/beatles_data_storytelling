# 11 — QA and Acceptance Checklist

## Data
- [ ] Exactly 213 normalized records load.
- [ ] Original CSV remains untouched.
- [ ] `Flying` displays as instrumental, not broken/missing.
- [ ] `Komm, gib mir deine Hand` and `Sie liebt dich` appear in 1964 / Early Beatles with a patch/source note available.
- [ ] Composite-year Anthology records are excluded from the 1962–70 quantitative axis.
- [ ] Past Masters/Anthology/compilation entries are not styled as core studio albums.
- [ ] theme-null records remain accessible.
- [ ] no theme or writer is fabricated.

## Story
- [ ] Hero communicates “Eight Years That Changed the Sound.”
- [ ] Visitor can understand the page without prior Beatles knowledge.
- [ ] Covers-disappear section makes the data claim obvious.
- [ ] Authorship section allows member isolation.
- [ ] Written By / Sung By toggle works.
- [ ] Harrison’s late-era growth is visible without misleading fractional claims.
- [ ] theme section leads to songs and listening.
- [ ] Lyric Lens is prominent and usable.
- [ ] genre section communicates expansion rather than simply listing genres.
- [ ] ending transitions into free exploration and afterword.

## Playback
- [ ] Only one YouTube player instance is mounted.
- [ ] Player remains visibly compliant.
- [ ] no autoplay on initial page load.
- [ ] all manifest IDs can be selected.
- [ ] embed errors show an official YouTube link.
- [ ] playback selection persists when song drawer closes, if the Listening Dock remains open.
- [ ] closing dock stops playback.

## Song drawer
- [ ] title/year/album
- [ ] writers
- [ ] lead vocal
- [ ] cover/original
- [ ] instrumental status
- [ ] genres
- [ ] themes
- [ ] moods
- [ ] word count
- [ ] lyrics
- [ ] playable action if available
- [ ] related songs

## Lyric Lens
- [ ] search is case-insensitive.
- [ ] punctuation does not block simple matches.
- [ ] total song count is correct.
- [ ] occurrence count is correct enough for classroom use.
- [ ] selecting result scrolls/highlights relevant lyric matches.
- [ ] no-result state is useful.

## Responsive
- [ ] 1440px desktop
- [ ] 1024px tablet
- [ ] 768px tablet/phone boundary
- [ ] 390px mobile
- [ ] 320px narrow mobile
- [ ] theme islands have mobile fallback
- [ ] authorship scene remains readable on mobile
- [ ] Listening Dock becomes a usable bottom sheet
- [ ] Explore controls remain accessible

## Accessibility
- [ ] keyboard navigation
- [ ] visible focus states
- [ ] semantic buttons
- [ ] modal focus trap
- [ ] Escape closes modal/drawer
- [ ] visualization has textual fallback/summary
- [ ] `prefers-reduced-motion`
- [ ] color is not the only data encoding
- [ ] reasonable AA contrast

## Performance
- [ ] YouTube API lazy-loaded
- [ ] no 213 full lyrics mounted at once
- [ ] heavy viz lazily mounted/settled
- [ ] no continuous force simulation after layout stabilizes
- [ ] images use appropriate sizes
- [ ] scroll remains smooth on mid-range laptops/phones

## Credits
- [ ] educational-use context shown
- [ ] dataset acknowledged
- [ ] Commons assets credited
- [ ] external image source links present
- [ ] media provider/source links present
- [ ] no asset is labeled “public domain” unless its source actually says so
