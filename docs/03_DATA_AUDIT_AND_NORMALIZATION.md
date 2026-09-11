# 03 — Data Audit and Normalization

## Source contract
Never overwrite the original source file. It is included as:
`data/beatles_dataset_original.csv`

Use:
`data/beatles_normalized.json`
for the application.

## Original fields
`title, year, album, songwriters, lead_vocals, is_cover, is_instrumental, genre, styles, themes, moods, word_count, char_count, lyrics, decade, era`

## Added normalized/runtime fields
- `id`
- `source_row`
- `slug`
- `year_raw`
- `timeline_year`
- `secondary_year`
- `album_type`
- `writer_members`
- `lead_vocal_members`
- `genres`
- `genre_families`
- `styles`
- `themes`
- `theme_clusters`
- `moods`
- `lyrics_search_text`
- `story_act`
- `metadata_patch`

## Corrections made
### 1. German-language tracks
Externally verified metadata was filled for:
- `Komm, gib mir deine Hand`
- `Sie liebt dich`

They are assigned to 1964 / Early Beatles and to the Past Masters collection. Their lyrics and original counts remain those supplied by the user.

### 2. Genre token cleanup
Only obvious textual normalization was performed:
- Rock & Roll → Rock and Roll
- Psychedelic folk → Psychedelic Folk
- Psychedelic pop → Psychedelic Pop
- Folk blues → Folk Blues
- Stage&Screen → Stage & Screen
- Heavy Metal[ → Heavy Metal

No attempt was made to “correct” subjective genre classifications with external opinion.

### 3. Broad genre families
These are **UI-derived groupings**, not claims about canonical musicology. A song can belong to multiple families.

### 4. Theme clusters
The supplied theme tags are retained. Broader emotional clusters are derived only to make the experience navigable.

## Missingness / caveats
- 1 lyric field is missing: **Flying**, which is flagged instrumental.
- theme tags are absent for roughly one third of records.
- 2 composite year values describe archival/Anthology material.
- `songwriters` contains shared/qualified credits such as “Lennon, with McCartney”; do not collapse everything to a single “primary writer” unless the product explicitly labels that transformation as an approximation.
- `lead_vocals` can list more than one member.
- `moods` is a dense tag list and is best used for search/related-song ranking, not as a primary chart.

## Related-song scoring recommendation
For a selected song, score every other song:
- +4 same `theme_cluster`
- +3 overlapping raw `themes`
- +3 overlapping normalized `genres`
- +2 same writer member
- +2 same lead-vocal member
- +2 same album
- +1 same era
- +1 mood overlap per shared mood, capped at +3

Exclude the current song, then take the top 5–8. Add deterministic tie-breaking by year then title.

## Mood/theme playlist recommendation
For a selected raw theme such as “Breakup”:
1. filter matching songs;
2. prefer songs with a verified `media_manifest.json` entry;
3. then sort by number of supporting theme/mood overlaps;
4. show 3–6 recommended playable songs first;
5. keep “view all matching songs” available.

## Lyric Lens implementation
For exact term search:
1. normalize query to lowercase ASCII;
2. search `lyrics_search_text`;
3. compute whole-word occurrences with escaped regex where appropriate;
4. provide substring fallback for partial terms;
5. return counts + years + albums + songs;
6. highlight only short snippets in the UI, not every full lyric at once.

## Data integrity guardrails
- Never invent a theme for an untagged song.
- Never infer a writer from lead vocals.
- Never treat `album_type = archival` as part of the eight-year core timeline.
- Preserve `year_raw` in the detail drawer for composite-year records.
- Show “Instrumental” for Flying rather than “lyrics unavailable.”
