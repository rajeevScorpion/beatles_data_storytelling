# START HERE — Beatles Data Storytelling Build Dossier

## Project
**EIGHT YEARS THAT CHANGED THE SOUND — THE BEATLES, 1962–1970**  
Supporting line: **A data story in 213 songs.**

This folder is the complete research-and-build handoff for a classroom demonstration website built with **Next.js + TypeScript + Tailwind CSS** in Google AI Studio.

## Read in this order
1. `01_PROJECT_BRIEF.md`
2. `02_RESEARCH_DOSSIER.md`
3. `03_DATA_AUDIT_AND_NORMALIZATION.md`
4. `04_STORY_ARCHITECTURE.md`
5. `05_INTERACTIONS_AND_VISUALIZATIONS.md`
6. `06_VISUAL_DIRECTION_AND_DESIGN_SYSTEM.md`
7. `07_MEDIA_PLAYBACK_AND_ASSETS.md`
8. `08_TECHNICAL_IMPLEMENTATION.md`
9. `09_IMPLEMENTATION_PHASES.md`
10. `10_AI_STUDIO_MASTER_PROMPT.md`
11. `11_QA_ACCEPTANCE_CHECKLIST.md`
12. `12_SOURCES_AND_CREDITS.md`

## Data and manifests
- `../data/beatles_dataset_original.csv` — untouched user-supplied source
- `../data/beatles_normalized.csv` — cleaned, web-friendly data
- `../data/beatles_normalized.json` — preferred runtime data
- `../data/story_metrics.json` — derived aggregate findings
- `../media/media_manifest.json` — 14 verified official YouTube-channel starter tracks
- `../media/image_source_manifest.json` — researched visual sources + attribution notes
- `../media/source_manifest.json` — research sources

## Non-negotiable product principle
**DO NOT BUILD A DASHBOARD.**

The page is a guided story with optional exploration. Every visualization must answer a human question, and every section should provide a reason to continue scrolling.

## Primary audience
1. Beatles fans who will enjoy recognition, detail, nostalgia and discovery.
2. Music lovers who know some songs but not the discography deeply.
3. Newcomers who should understand *why the transformation matters* without prior Beatles knowledge.
4. Design/data-storytelling students studying how a dataset can become an experience.

## Core product promise
Start with four young musicians making concise pop songs and covers; end with four increasingly distinct creative voices using the recording studio itself as part of the composition.

## Before coding
Use `10_AI_STUDIO_MASTER_PROMPT.md` as the initial Google AI Studio prompt and instruct the coder to read this entire folder before generating UI.
