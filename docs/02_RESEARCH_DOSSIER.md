# 02 — Research Dossier

## Research thesis
The dataset is strongest when used to tell a transformation story rather than to describe a catalogue.

> **Start with four young musicians working inside the vocabulary of early-1960s pop and stage repertoire; end with four increasingly distinct writers and performers whose studio work expands the vocabulary of popular recording.**

This is consistent with the supplied data and with the official Beatles chronology. The official album catalogue runs from *Please Please Me* (22 March 1963) through *Let It Be* (8 May 1970), with *Abbey Road* released in September 1969 and identified by the official site as the final Beatles album recorded.

## Dataset scale
Computed directly from the supplied CSV:
- **213 unique song records**
- **16 original fields**
- **212 records with lyrics**
- **139 records with supplied theme labels** (65.3% theme coverage)
- **25 cover-flagged records**
- four supplied eras, plus two archival/Anthology composite-year records
- full-text lyrics, genre/style metadata, themes, moods, authorship, lead-vocal data and text-length metrics

## Four acts already present in the data
| Dataset era | Records | Avg lyric words |
|---|---:|---:|
| Early Beatles | 69 | 166.9 |
| Middle Beatles | 52 | 185.1 |
| Psychedelic Beatles | 25 | 186.6 |
| Late Beatles | 67 | 142.7 |

Recommended narrative translation:
1. **Act I — The Explosion** — 1962–1964
2. **Act II — The Band Turns Inward** — 1965–1966
3. **Act III — The Studio Becomes the Instrument** — 1967
4. **Act IV — Four Voices, One Band** — 1968–1970
5. **Afterword — The Story Wasn’t Quite Finished** — Anthology-era composite records

---

## Finding 1 — the covers disappear
This is the cleanest quantitative story in the data.

| Year | Records | Covers | Cover share |
|---|---:|---:|---:|
| 1962 | 4 | 0 | 0.0% |
| 1963 | 30 | 12 | 40.0% |
| 1964 | 35 | 9 | 25.7% |
| 1965 | 33 | 3 | 9.1% |
| 1966 | 19 | 0 | 0.0% |
| 1967 | 25 | 0 | 0.0% |
| 1968 | 34 | 0 | 0.0% |
| 1969 | 30 | 1 | 3.3% |
| 1970 | 1 | 0 | 0.0% |

The most useful narrative is not “there were X covers.” It is the visible transition from an early repertoire that includes substantial outside material toward a catalogue dominated by original Beatles writing. The 1969 cover flag is “Maggie Mae,” a traditional song arranged by the group.

### Interaction idea
Represent every song as a record/tile on a chronological field. Covers carry a second visual layer, label or sleeve treatment. As the timeline advances, the borrowed repertoire physically disappears.

Headline:
> **WHEN DID THE BEATLES BECOME THE BEATLES?**

Subhead:
> Watch outside material fall away as the band’s own songwriting takes control.

---

## Finding 2 — authorship becomes a character story
Member-name presence in the songwriter field:

| Era | Lennon | McCartney | Harrison | Starkey |
|---|---:|---:|---:|---:|
| Early | 40 | 30 | 1 | 0 |
| Middle | 27 | 30 | 7 | 1 |
| Psychedelic | 14 | 18 | 5 | 1 |
| Late | 32 | 31 | 15 | 6 |

Important: these are **presence counts**, not mutually exclusive credits. Shared Lennon/McCartney credits can count toward both.

The strongest visual consequence is George Harrison’s growth: the data contains Harrison in only 1 Early-era songwriting attribution, 7 Middle-era, 5 Psychedelic-era and 15 Late-era records.

### Interaction idea
A four-strand author line runs through the timeline. Clicking a member isolates that strand and reveals the songs.

For George, the interface should make his later emergence immediately legible. Use songs such as **Taxman**, **Within You Without You**, **While My Guitar Gently Weeps**, **Something** and **Here Comes the Sun** as landmarks when present in the dataset.

A toggle can switch:
**WRITTEN BY ↔ SUNG BY**

---

## Finding 3 — lyrics should become data, not a text appendix
Top supplied theme tags:

| Theme | Tagged records |
|---|---:|
| In Love | 46 |
| Heartache | 28 |
| Feeling Blue | 26 |
| Introspection | 20 |
| Affection/Fondness | 17 |
| Relationships | 16 |
| Reflection | 15 |
| New Love | 13 |
| Breakup | 13 |
| Reminiscing | 13 |
| Regret | 12 |
| Awareness | 11 |
| Jealousy | 11 |
| Playful | 10 |
| Partying | 10 |

The thematic metadata can create a human-facing emotional map:
- **Love & Connection**
- **Heartbreak & Conflict**
- **Inner Life & Reflection**
- **Joy & Social Life**
- **Nature / Spiritual / Comfort**
- **Night / Atmosphere**

These are UI clusters added in the normalized dataset; the original theme tags remain intact.

### Important limitation
Theme labels exist for only about 65.3% of records. Therefore:
- show “tagged songs” rather than implying a complete scientific classification;
- never interpret absence of a theme tag as proof that the song lacks that theme;
- allow raw theme labels to remain inspectable in the song drawer.

### Interaction concept — “What were The Beatles singing about?”
Use typographic thematic islands rather than a word cloud.

Selecting **BREAKUP** or **HEARTACHE**:
1. the island expands;
2. matching songs orbit/flow into the foreground;
3. the interface offers a short “listen from this mood” row;
4. selecting a song opens its drawer and player.

This creates the requested mood → song → lyric → listen chain.

---

## Finding 4 — Lyric Lens can be the signature exploration tool
Create a global lyric-search interaction.

A visitor types `love`, `sun`, `you`, `dream`, etc.

Return:
- matching song count;
- a year/era distribution;
- album distribution;
- clickable song results;
- occurrence count per song;
- highlighted short local context around matches inside the drawer.

Do not render a giant raw concordance on the main page.

### Implementation note
The corpus is small enough (213 records) to search locally in the browser. `beatles_normalized.json` contains `lyrics_search_text` for case/diacritic-insensitive matching. No external search service is needed.

---

## Finding 5 — lyric length does not simply grow with artistic complexity
Average supplied word counts:
- Early: **166.9**
- Middle: **185.1**
- Psychedelic: **186.6**
- Late: **142.7**

The late-era average is lower than the Middle/Psychedelic eras. This is a useful counter-story: musical or production complexity is not equivalent to more words.

Possible headline:
> **MORE COMPLEX MUSIC. NOT NECESSARILY MORE WORDS.**

Use this as a compact interlude, not an entire section.

---

## Finding 6 — genre expansion is visually rich, but raw genre data needs normalization
The original CSV includes inconsistent variants such as:
- `Rock and Roll` / `Rock & Roll`
- `Psychedelic Folk` / `Psychedelic folk`
- `Psychedelic Pop` / `Psychedelic pop`
- `Folk Blues` / `Folk blues`
- `Stage&Screen`
- `Heavy Metal[`

The normalized JSON repairs these variants and assigns optional broad families:
- Beat / Rock & Roll
- Pop / Songcraft
- Folk / Country
- Psychedelic / Experimental
- Heavy / Blues Rock
- Jazz / Other

Do **not** replace the original genre vocabulary in the UI completely. Use families for large-scale motion/layout and raw normalized genre tokens for labels/tooltips.

### Interaction concept — Genre Universe
Songs are nodes pulled toward genre-family fields. As the year scrubber advances, the visual field diversifies.

Avoid a generic stacked bar chart unless used only as a small supporting annotation.

---

## Finding 7 — album chronology and compilation status must be separated
The CSV mixes original-era albums with later collections:
- Past Masters
- Anthology 1 / 2
- Rock ’n’ Roll Music

The official Beatles album page supplies an authoritative release chronology and lists the original catalogue separately from later compilations/remixes.

The normalized dataset uses `album_type`:
- `core_catalogue`
- `singles_ep_collection`
- `archival`
- `later_compilation`
- `other`

This prevents the AI coder from presenting a later compilation as though it were a 1960s studio album.

---

## Finding 8 — the two German-language records were genuinely incomplete
`Komm, gib mir deine Hand` and `Sie liebt dich` had lyrics and word counts but no year, album, writer, vocalist, genre, decade or era in the supplied CSV.

They were patched using:
- The Beatles official *Past Masters* track listing;
- official/structured recording context from MusicBrainz.

Normalized values place them in 1964 / Early Beatles / Past Masters.

No themes or moods were invented.

---

## Finding 9 — archival songs need an afterword
The dataset includes:
- `Free as a bird` — `1977/1994`
- `Real love` — `1980/1995`

Do not force these onto the 1962–70 chronological axis. Place them after the ending in a compact **Afterword**.

The 2023 official Beatles announcement also establishes *Now And Then* as a later “last Beatles song.” It is useful contextual research but is **not added to the normalized dataset**, because it is absent from the user-supplied CSV. It may be a future optional extension.

---

## Historical anchors from official sources
Use these sparingly as narrative context:
- *Please Please Me* was recorded with extraordinary speed and retained material from the band’s live repertoire.
- *Revolver* followed a longer period in the studio; the official site explicitly links that time to increased creativity and experimentation.
- the official *Revolver* page notes George Harrison had three compositions on a Beatles album for the first time.
- the official Sgt. Pepper material describes a much larger studio-time investment after touring ended.
- the official *Abbey Road* page identifies it as the final Beatles album recorded, although *Let It Be* was released later.

The exact sources are in `12_SOURCES_AND_CREDITS.md`.

## Editorial rule
Every data section must answer a question:
- Where did they begin?
- When did outside repertoire disappear?
- Who was writing?
- Who was singing?
- What were the songs emotionally about?
- How did the musical vocabulary expand?
- How did the members become more individually legible?
- Where did the eight-year arc end?

If a visualization cannot answer one of these questions, remove it.
