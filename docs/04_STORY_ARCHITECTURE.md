# 04 — Single-Page Story Architecture

## Overall pacing
The page should work in two simultaneous modes:

**GUIDED STORY** — scroll through a designed argument.  
**EXPLORE** — use persistent controls to branch into the dataset at any time.

The visitor should never feel trapped in either.

---

## 0. Hero — “Eight Years That Changed the Sound”
**Purpose:** emotional invitation, not explanation.

Hero lockup:
> EIGHT YEARS  
> THAT CHANGED  
> THE SOUND  
> **THE BEATLES, 1962–1970**

Secondary line:
> **A data story in 213 songs.**

Optional tiny line:
> Scroll through the transformation — or pick a way in.

Actions:
- `BEGIN THE STORY`
- `EXPLORE 213 SONGS`

Visual:
- large archival monochrome image;
- typesetting like an editorial record sleeve;
- subtle waveform/vinyl-groove motion;
- a thin timeline 1962 → 1970 that becomes the page’s progress language.

Do not autoplay music on entry.

---

## 1. The Eight-Year Rush
Question:
> **HOW FAST CAN A BAND CHANGE?**

Introduce four acts with a continuous timeline and a small number of key records.

Use the official album chronology as context, but keep the dataset as the quantitative backbone.

Interaction:
- hover/tap a year to preview songs/albums;
- scroll moves an oversized year counter;
- visual system starts tightly monochrome.

Transition into the first data claim.

---

## 2. When Did The Beatles Become The Beatles?
Question:
> **WHAT HAPPENS WHEN THE COVERS DISAPPEAR?**

Data:
cover share by year.

Experience:
- records/cards representing outside material visually drop out;
- originals remain and take visual ownership of the field;
- a short annotation marks 1966 as the first year in the dataset with zero cover-flagged songs.

CTA:
`SEE THE EARLY COVERS` opens an in-page overlay, not a route.

---

## 3. Who Was Writing The Beatles?
Question:
> **WHO IS WRITING THE SOUND?**

Four horizontal strands or ribbons:
JOHN / PAUL / GEORGE / RINGO

Interactions:
- tap a member → isolate their strand and song nodes;
- switch `WRITTEN BY` / `SUNG BY`;
- year scrubber;
- select song → detail drawer;
- offer one playable landmark when available.

Narrative moment:
George’s late-era strand becomes visibly more substantial.

Avoid reducing Lennon–McCartney partnership credits to a misleading winner/loser chart.

---

## 4. The Band Turns Inward
Use 1965–66 as a visual bridge.

Not a standalone dashboard section. This is a narrative interlude:
- fewer crowd images;
- more studio/acoustic/collage imagery;
- lyrics/theme cards start moving from romantic/social tags toward reflection and conflict;
- the palette starts widening.

Use *Rubber Soul* → *Revolver* as contextual milestones.

---

## 5. What Were The Beatles Singing About?
Question:
> **WHAT DID 213 SONGS FEEL LIKE?**

Main object:
large, animated typographic theme islands.

Examples:
LOVE  
HEARTACHE  
INTROSPECTION  
BREAKUP  
REFLECTION  
PLAY  
MEMORY

Flow:
1. user selects an island;
2. related raw theme tags appear;
3. matching songs flow toward it;
4. playable results show a `LISTEN` action;
5. non-playable results still open the full song drawer.

This is a key “lean in” moment. It must invite choice rather than ask the user to read a chart.

---

## 6. Lyric Lens
Question:
> **FIND A WORD. FOLLOW IT THROUGH EIGHT YEARS.**

Large search input.
Suggested starter chips:
`love`, `you`, `sun`, `dream`, `home`, `time`

Output:
- result count;
- chronological dot/ribbon field;
- album/era distribution;
- song titles with occurrence counts;
- click → lyric drawer with matches highlighted.

Keep full lyrics out of the main flow.

---

## 7. More Complex Music, Fewer Words?
A compact surprise/interlude.

Show four large era numbers for average word count.
Animate the line upward then down.

Message:
> Artistic complexity did not simply mean more lyrical text.

This section should take 1–2 viewport heights maximum.

---

## 8. The Sound Expands
Question:
> **HOW MANY WORLDS CAN A POP BAND ENTER?**

Genre Universe:
- song nodes;
- broad genre-family gravity zones;
- year/era scrubber;
- selected raw genre tags appear as labels.

As 1967 approaches, layout can become more spatial and psychedelic.

No giant legend. Reveal labels contextually.

---

## 9. 1967 — The Studio Becomes the Instrument
A full-bleed transformation section.

This is more editorial than quantitative.
Use official historical context around *Revolver* / *Sgt. Pepper* and the end of touring.

Feature playable anchors:
- Strawberry Fields Forever
- A Day in the Life

The interface itself should briefly become less rigid: layered forms, radial typography, floating fragments.

Maintain accessibility and legibility; “psychedelic” must not mean unreadable.

---

## 10. Four Voices, One Band
Late era.

Bring the writing/vocal strands back, now more separated.
Feature:
- Harrison growth;
- Ringo representation;
- White Album breadth;
- Abbey Road as late-recording culmination.

Playable anchors can include:
- While My Guitar Gently Weeps
- Come Together
- Octopus’s Garden
- Here Comes the Sun
- Let It Be

Visual system becomes calmer and more spacious after the psychedelic section.

---

## 11. Explore the 213
A powerful ending that converts the narrative into free exploration.

Controls:
- year
- era
- album
- writer
- lead vocal
- raw theme
- theme cluster
- genre
- cover/original
- instrumental
- playable only
- free-text title/lyrics search

Results can be a dense but elegant “record library” grid/list.

Still do not look like an enterprise data table.

---

## 12. Afterword
For the composite-year Anthology records.

Headline:
> **THE STORY WASN’T QUITE FINISHED.**

Keep separate from the eight-year quantitative story.

Do not silently add 2023’s *Now And Then* to the dataset. It may be mentioned as optional future scope with an external-source label.

---

## 13. Credits & Sources
A compact footer button/modal:
`CREDITS / DATA / SOURCES ↗`

Include:
- educational context;
- original dataset note;
- source backlinks;
- image attributions;
- media-provider acknowledgement;
- external metadata sources.

Credits should be easy to find but visually quiet.
