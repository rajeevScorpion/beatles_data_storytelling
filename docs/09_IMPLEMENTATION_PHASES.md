# 09 — Implementation Phases

## Phase 0 — Read and validate
Before UI generation:
- read every markdown file in `/docs`;
- inspect `beatles_normalized.json`;
- inspect `story_metrics.json`;
- inspect both media manifests;
- confirm 213 records load;
- confirm `Flying` is handled as instrumental;
- confirm German tracks contain patched metadata;
- confirm compilation/archival album types are separate.

## Phase 1 — Skeleton + visual tokens
Build:
- single-page section structure;
- Tailwind/global tokens;
- responsive editorial grid;
- hero;
- progress/timeline shell;
- drawer shell;
- credits modal;
- reduced-motion baseline.

Do not build all data viz at once.

## Phase 2 — Core story
Build:
1. eight-year introduction;
2. covers-disappear scene;
3. authorship strands;
4. late-era authorship callback.

Verify data labels before motion polish.

## Phase 3 — Emotional/lyric exploration
Build:
1. theme islands;
2. theme → songs flow;
3. song drawer;
4. Lyric Lens;
5. related-song ranking.

This is the highest-value interaction phase.

## Phase 4 — Genre Universe
Add normalized genre/family exploration.
Keep it visually narrative, not dashboard-like.

## Phase 5 — Playback
Add one YouTube IFrame provider and Listening Dock.
Wire all manifest tracks.
Test graceful failures.

## Phase 6 — Free exploration
Build `Explore the 213` with filters and search.
Keep it on the same page / overlay.

## Phase 7 — visual choreography
Only after the interactions are correct:
- era transitions;
- print texture;
- parallax;
- card elevation;
- morphs;
- responsive polish;
- performance pass.

## Phase 8 — QA
Run the checklist in `11_QA_ACCEPTANCE_CHECKLIST.md`.

## Commit philosophy
If working in a repository, commit by meaningful milestone:
- `feat: establish editorial shell and era tokens`
- `feat: add covers and authorship story`
- `feat: add theme islands and lyric lens`
- `feat: add youtube listening dock`
- `feat: add explore mode`
- `fix: accessibility responsive and reduced motion`

Avoid meaningless “update” commits.
