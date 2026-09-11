# 07 — Media Playback and Asset Strategy

## Decision: YouTube IFrame Player is primary
For this classroom prototype, use the **YouTube IFrame Player API** with official Beatles-channel videos.

Why:
- YouTube’s own developer policy states the IFrame Player does **not require user authorization**.
- JavaScript can load videos, play/pause/stop, read state and switch the current video.
- it avoids requiring the visitor to connect Spotify.
- official Beatles-channel videos provide a much more defensible source than random reuploads.

MusicBrainz is **metadata infrastructure**, not an audio-streaming service. Use it for enrichment/IDs/relationships, not playback.

Spotify may remain an optional fallback/link, but do not make the experience depend on Spotify OAuth or account state.

## Important YouTube UI constraint
Do not hide a YouTube video in an invisible element and pretend it is an audio-only player.

The YouTube player must remain visible and compliant with its player requirements. Build a **Listening Dock**:
- desktop: approx. 360–420px wide with a visible player region at least 200px in both dimensions;
- mobile: bottom sheet with visible video;
- never overlay custom controls on top of YouTube’s player controls;
- use surrounding UI for title, era, close/minimize and “open on YouTube.”

If minimized, keep a compliant visible player or pause/close it.

## Single-player architecture
Create exactly one `YouTubePlayerProvider`.

When a playable song is selected:
1. open/reveal Listening Dock;
2. call `loadVideoById` or `cueVideoById`;
3. update surrounding song metadata;
4. let the user initiate playback;
5. listen for errors/state changes;
6. on error, display an official watch-link fallback.

Do not instantiate 14 iframes.

## Verified starter set
These pages were verified during dossier research as coming from **The Beatles — Official Artist Channel**. Ownership/embed permissions can change, so runtime fallback remains mandatory.

| # | Track | Era | YouTube ID | Narrative use |
|---:|---|---|---|---|
| 1 | I Want to Hold Your Hand | Early Beatles | `jenWdylTtzs` | 1964 breakthrough / Beatlemania |
| 2 | Help! | Middle Beatles | `2Q_ZzBGPdqE` | Transition from touring-pop identity toward introspection |
| 3 | Yesterday | Middle Beatles | `wXTJBr9tt8Q` | Arrangement and songwriting shift |
| 4 | Eleanor Rigby | Middle Beatles | `HuS5NuXRb5Y` | Narrative songwriting + string arrangement |
| 5 | Paperback Writer | Middle Beatles | `yYvkICbTZIQ` | Studio/bass sound and pre-Revolver transition |
| 6 | Tomorrow Never Knows | Middle Beatles | `m4BuziKGMy4` | Experimental turning point |
| 7 | Strawberry Fields Forever | Psychedelic Beatles | `HtUH9z_Oey8` | 1967 visual/sonic threshold |
| 8 | A Day in the Life | Psychedelic Beatles | `usNsCeOV4GM` | Psychedelic/studio culmination |
| 9 | Hey Jude | Late Beatles | `A_MjCqQoLLA` | Late-period communal anthem |
| 10 | While My Guitar Gently Weeps | Late Beatles | `zOKGcEfSwnY` | Harrison’s growing compositional presence |
| 11 | Come Together | Late Beatles | `45cYwDMibGo` | Abbey Road opening / late-period identity |
| 12 | Octopus's Garden | Late Beatles | `De1LCQvbqV4` | Ringo songwriting representation |
| 13 | Here Comes the Sun | Late Beatles | `KQetemT1sWc` | Harrison mature songwriting / Abbey Road |
| 14 | Let It Be | Late Beatles | `CGj85pVzRJs` | Narrative closing point |

Full machine-readable manifest:
`../media/media_manifest.json`

## Optional later additions
After the first build works, add more official-channel videos in the same manifest. Do not hardcode IDs into React components.

## Image strategy
Use three tiers.

### Tier 1 — clearly documented Commons assets
Two researched starter assets are included in `image_source_manifest.json`:
- 1963 Dezo Hoffmann/Capitol publicity photograph — Wikimedia page marks U.S. public-domain status but also warns that rights may differ by country.
- 1965 Minnesota Historical Society press-conference photo — CC BY-SA 2.0.

For the CC image, preserve attribution and indicate if visually modified.

### Tier 2 — official Beatles-site visual references
Official pages for *Revolver*, *Sgt. Pepper* and *Abbey Road* are included as visual/reference sources. These pages are **not treated as open-license image banks**.

For a classroom-only local demonstration, if the instructor chooses to use an official image, keep a compact source backlink. Do not represent it as CC/public-domain.

### Tier 3 — original design textures
Prefer building large backgrounds from:
- CSS/SVG halftone,
- paper grain,
- geometric forms,
- era colors,
- record grooves,
- typography.

This reduces dependency on external photographic rights and improves visual consistency.

## Album art
MusicBrainz’s Cover Art Archive can locate art associated with a MusicBrainz release/release-group, but its own documentation explicitly cautions users to respect rights. Treat it as a source/lookup service, not proof that artwork is copyright-free.

## Attribution UX
Song drawer:
`SOURCE ↗` only when contextual metadata or image needs a source.

Global:
`CREDITS / DATA / SOURCES ↗`

Credits modal row schema:
- asset/content
- creator/provider
- license/status
- source link
- modifications, if any

## Educational-use note
Keep this in credits:
> Built as a non-commercial classroom demonstration for data-storytelling education. Lyrics originate from the supplied educational dataset. Third-party media remains hosted by its provider and is embedded/linked with source acknowledgement.
