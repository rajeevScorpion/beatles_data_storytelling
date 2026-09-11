import songsRaw from '../../data/beatles_normalized.json';
import metricsRaw from '../../data/story_metrics.json';
import mediaRaw from '../../media/media_manifest.json';
import imageManifestRaw from '../../media/image_source_manifest.json';
import sourceManifestRaw from '../../media/source_manifest.json';

import { SongRecord, StoryMetrics, MediaManifestItem, ImageManifestItem, SourceItem, BeatlesEra } from '../types';

export const allSongs: SongRecord[] = songsRaw as SongRecord[];
export const storyMetrics: StoryMetrics = metricsRaw as StoryMetrics;
export const mediaManifest: MediaManifestItem[] = mediaRaw as MediaManifestItem[];
export const imageManifest: ImageManifestItem[] = imageManifestRaw as ImageManifestItem[];
export const sourceManifest: SourceItem[] = sourceManifestRaw as SourceItem[];

// Map of song title (case-insensitive) to YouTube Media item
const mediaMap = new Map<string, MediaManifestItem>();
mediaManifest.forEach(item => {
  mediaMap.set(item.title.toLowerCase().trim(), item);
});

export function getMediaForSong(song: SongRecord): MediaManifestItem | undefined {
  const normTitle = song.title.toLowerCase().trim();
  if (mediaMap.has(normTitle)) {
    return mediaMap.get(normTitle);
  }
  // Try partial or slug match
  for (const [title, item] of mediaMap.entries()) {
    if (normTitle.includes(title) || title.includes(normTitle)) {
      return item;
    }
  }
  return undefined;
}

export function getSongById(id: string): SongRecord | undefined {
  return allSongs.find(s => s.id === id);
}

export function getSongBySlug(slug: string): SongRecord | undefined {
  return allSongs.find(s => s.slug === slug);
}

export function getRelatedSongs(currentSong: SongRecord, limit = 4): SongRecord[] {
  return allSongs
    .filter(s => s.id !== currentSong.id)
    .map(song => {
      let score = 0;
      // Same album
      if (song.album === currentSong.album) score += 4;
      // Same era
      if (song.era === currentSong.era) score += 2;
      // Shared songwriters
      const sharedWriters = song.writer_members.filter(w => currentSong.writer_members.includes(w));
      score += sharedWriters.length * 2;
      // Shared genres
      const sharedGenres = song.genres.filter(g => currentSong.genres.includes(g));
      score += sharedGenres.length;
      // Shared themes
      const sharedThemes = song.themes.filter(t => currentSong.themes.includes(t));
      score += sharedThemes.length * 2;
      return { song, score };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(item => item.song);
}

export function searchSongsByLyrics(term: string): { song: SongRecord; count: number; snippet: string }[] {
  const cleanTerm = term.trim().toLowerCase();
  if (!cleanTerm || cleanTerm.length < 2) return [];

  const results: { song: SongRecord; count: number; snippet: string }[] = [];

  for (const song of allSongs) {
    if (!song.lyrics) continue;
    const text = song.lyrics.toLowerCase();

    // Word boundary regex for exact word or clean occurrence
    const regex = new RegExp(`\\b${cleanTerm.replace(/[.*+?^${}()|[\\]\\]/g, '\\$&')}\\b`, 'gi');
    const matches = text.match(regex);
    const count = matches ? matches.length : 0;

    if (count > 0) {
      // Extract snippet around first match
      const firstIdx = text.indexOf(cleanTerm);
      const start = Math.max(0, firstIdx - 40);
      const end = Math.min(song.lyrics.length, firstIdx + cleanTerm.length + 50);
      let snippet = song.lyrics.substring(start, end).replace(/\s+/g, ' ').trim();
      if (start > 0) snippet = '...' + snippet;
      if (end < song.lyrics.length) snippet = snippet + '...';

      results.push({ song, count, snippet });
    }
  }

  return results.sort((a, b) => b.count - a.count);
}

export const ERA_METADATA: Record<BeatlesEra, {
  name: string;
  act: string;
  years: string;
  tagline: string;
  bgClass: string;
  accentColor: string;
  textColor: string;
  borderColor: string;
  cardBg: string;
  description: string;
}> = {
  'Early Beatles': {
    name: 'Early Beatles',
    act: 'Act I — The Explosion',
    years: '1962–1964',
    tagline: 'Beatlemania & The Touring Rush',
    bgClass: 'bg-[#F2EBDD]',
    accentColor: '#C43A2F',
    textColor: '#151515',
    borderColor: '#C8C0B2',
    cardBg: '#EAE1D2',
    description: 'Crisp monochrome press, live screams, tight pop songs, Hamburg grit, and heavy reliance on American R&B and rock & roll covers.'
  },
  'Middle Beatles': {
    name: 'Middle Beatles',
    act: 'Act II — The Band Turns Inward',
    years: '1965–1966',
    tagline: 'Folk, Introspection & Studio Horizons',
    bgClass: 'bg-[#E8DECB]',
    accentColor: '#B48639',
    textColor: '#171714',
    borderColor: '#C0B5A1',
    cardBg: '#DDCFB8',
    description: 'Acoustic guitars, Dylan influence, string quartets, deeper lyrical honesty, and the historic cessation of live touring after August 1966.'
  },
  'Psychedelic Beatles': {
    name: 'Psychedelic Beatles',
    act: 'Act III — The Studio Becomes the Instrument',
    years: '1967',
    tagline: 'Studio as Sonic Canvas',
    bgClass: 'bg-[#151329]',
    accentColor: '#F4E747',
    textColor: '#F5F3ED',
    borderColor: '#3B3363',
    cardBg: '#231F42',
    description: 'Sgt. Pepper, backward tape loops, Mellotrons, orchestral swells, Indian instrumentation, and vivid color-drenched audio tapestries.'
  },
  'Late Beatles': {
    name: 'Late Beatles',
    act: 'Act IV — Four Voices, One Band',
    years: '1968–1970',
    tagline: 'Maturity, Individual Geniuses & The Rooftop Farewell',
    bgClass: 'bg-[#F5F3EC]',
    accentColor: '#5B824D',
    textColor: '#1F201F',
    borderColor: '#D4CFC4',
    cardBg: '#EAE6DC',
    description: 'Stripping back the studio trickery for raw honesty, George Harrison reaching songwriting parity, the White Album sprawl, and Abbey Road masterpiece.'
  }
};
