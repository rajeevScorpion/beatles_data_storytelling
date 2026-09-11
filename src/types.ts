export type BeatlesEra = 
  | 'Early Beatles' 
  | 'Middle Beatles' 
  | 'Psychedelic Beatles' 
  | 'Late Beatles';

export interface SongRecord {
  id: string;
  source_row: number;
  title: string;
  slug: string;
  year_raw: string;
  timeline_year: number;
  secondary_year: number | null;
  album: string;
  album_type: string;
  songwriters_raw: string;
  writer_members: string[];
  lead_vocals_raw: string;
  lead_vocal_members: string[];
  is_cover: boolean;
  is_instrumental: boolean;
  genres: string[];
  genre_families: string[];
  styles: string[];
  themes: string[];
  theme_clusters: string[];
  moods: string[];
  word_count: number;
  char_count: number;
  lyrics: string;
  lyrics_search_text: string;
  decade: number;
  era: BeatlesEra;
  story_act: string;
  metadata_patch: boolean;
}

export interface MediaManifestItem {
  title: string;
  era: string;
  provider: 'youtube';
  video_id: string;
  watch_url: string;
  embed_url: string;
  source_channel: string;
  version_note: string;
  story_reason: string;
  research_status: string;
}

export interface StoryMetrics {
  dataset: {
    songs: number;
    original_fields: number;
    lyrics_present: number;
    themes_present: number;
    covers: number;
    original_or_traditional_noncover_flag: number;
    core_timeline_records_1962_1970: number;
    patched_records: string[];
  };
  era_counts: Record<string, number>;
  cover_by_year: Record<string, {
    songs: number;
    covers: number;
    cover_share_pct: number;
  }>;
  member_authorship_presence_by_era: Record<string, Record<string, number>>;
  lead_vocal_presence_by_era: Record<string, Record<string, number>>;
  average_lyric_word_count_by_era: Record<string, number>;
  top_themes: Record<string, number>;
  top_themes_by_era: Record<string, Record<string, number>>;
  normalized_genre_tokens: Record<string, number>;
  genre_family_presence_by_era: Record<string, Record<string, number>>;
  album_counts: Record<string, number>;
  data_quality: {
    theme_coverage_pct: number;
    lyrics_missing: string[];
    composite_year_records: { title: string; year_raw: string }[];
    notes: string[];
  };
}

export interface ImageManifestItem {
  id: string;
  era: string;
  description: string;
  source_page: string;
  direct_image: string | null;
  license_note: string;
  credit: string;
}

export interface SourceItem {
  name: string;
  url: string;
  use: string;
}

export type BeatlesMember = 'John Lennon' | 'Paul McCartney' | 'George Harrison' | 'Ringo Starr';
