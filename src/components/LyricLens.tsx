import React, { useState, useMemo } from 'react';
import { searchSongsByLyrics } from '../lib/data';
import { SongRecord } from '../types';
import { Search, Sparkles, ChevronRight, BookOpen } from 'lucide-react';

interface LyricLensProps {
  onSelectSongWithQuery: (song: SongRecord, query: string) => void;
}

const STARTER_CHIPS = ['love', 'you', 'sun', 'dream', 'home', 'time', 'cry', 'friend', 'girl', 'know', 'see'];

export const LyricLens: React.FC<LyricLensProps> = ({ onSelectSongWithQuery }) => {
  const [searchTerm, setSearchTerm] = useState<string>('love');

  // Compute search matches across corpus
  const searchResults = useMemo(() => {
    return searchSongsByLyrics(searchTerm);
  }, [searchTerm]);

  const totalOccurrences = searchResults.reduce((sum, item) => sum + item.count, 0);

  // Era breakdown of matches
  const eraDistribution = useMemo(() => {
    const counts: Record<string, number> = {
      'Early Beatles': 0,
      'Middle Beatles': 0,
      'Psychedelic Beatles': 0,
      'Late Beatles': 0,
    };
    searchResults.forEach(item => {
      if (counts[item.song.era] !== undefined) {
        counts[item.song.era] += item.count;
      }
    });
    return counts;
  }, [searchResults]);

  return (
    <section id="lyric-lens" className="py-20 px-4 sm:px-8 border-b-2 border-[#151515] bg-[#EAE1D2]">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header */}
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <span className="font-mono-code text-xs uppercase px-2 py-0.5 bg-[#151515] text-white font-bold">
              ACT II · CHAPTER 06
            </span>
            <span className="font-mono-code text-xs uppercase tracking-widest text-[#7A7267]">
              LINGUISTIC INVESTIGATION
            </span>
          </div>
          <h2 className="font-display text-4xl sm:text-6xl font-black uppercase tracking-tight text-[#151515]">
            FIND A WORD. FOLLOW IT THROUGH EIGHT YEARS.
          </h2>
          <p className="font-editorial text-base sm:text-xl text-[#444] max-w-2xl leading-relaxed">
            Search any term across all 213 songs to reveal how vocabulary, preoccupations, and poetic imagery
            shifted as Liverpool youth gave way to studio mysticism and maturity.
          </p>
        </div>

        {/* Large Search Console */}
        <div className="bg-[#F2EBDD] border-2 border-[#151515] print-shadow p-6 sm:p-8 space-y-6">
          <div className="space-y-2">
            <label
              htmlFor="lyric-search-input"
              className="font-mono-code text-xs uppercase font-bold text-[#7A7267] block"
            >
              QUERY THE 213-SONG LYRICAL CORPUS
            </label>
            <div className="relative">
              <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-[#7A7267]" />
              <input
                id="lyric-search-input"
                type="text"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                placeholder="Type a word (e.g., love, sun, dream, home, time)..."
                className="w-full pl-12 pr-4 py-3.5 bg-[#F6F1E7] border-2 border-[#151515] font-mono-code text-base sm:text-lg text-[#151515] placeholder:text-[#A8A093] focus:outline-none focus:border-[#C43A2F]"
              />
            </div>
          </div>

          {/* Quick Starter Chips */}
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <span className="font-mono-code text-xs text-[#7A7267] uppercase mr-1">
              SUGGESTED EXPLORATIONS:
            </span>
            {STARTER_CHIPS.map(chip => (
              <button
                key={chip}
                onClick={() => setSearchTerm(chip)}
                className={`px-3 py-1 font-mono-code text-xs uppercase transition-colors ${
                  searchTerm.toLowerCase() === chip
                    ? 'bg-[#C43A2F] text-white font-bold'
                    : 'bg-[#EAE1D2] hover:bg-[#DDD2C0] text-[#151515] border border-[#C8C0B2]'
                }`}
              >
                "{chip}"
              </button>
            ))}
          </div>

          {/* Aggregate Results Bar */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-4 border-t border-[#D8D0C2] font-mono-code text-xs">
            <div className="p-3 bg-[#EAE1D2] border border-[#C8C0B2]">
              <span className="block text-[10px] text-[#7A7267] uppercase">Occurrences</span>
              <span className="font-display text-3xl font-black text-[#C43A2F]">
                {totalOccurrences} TIMES
              </span>
            </div>

            <div className="p-3 bg-[#EAE1D2] border border-[#C8C0B2]">
              <span className="block text-[10px] text-[#7A7267] uppercase">Songs Containing Term</span>
              <span className="font-display text-3xl font-black text-[#151515]">
                {searchResults.length} SONGS
              </span>
            </div>

            <div className="md:col-span-2 p-3 bg-[#EAE1D2] border border-[#C8C0B2] space-y-1.5">
              <span className="block text-[10px] text-[#7A7267] uppercase">Era Distribution</span>
              <div className="grid grid-cols-4 gap-1 text-[10px]">
                {Object.entries(eraDistribution).map(([era, count]) => (
                  <div key={era} className="text-center p-1 bg-[#F2EBDD] border border-[#D8D0C2]">
                    <div className="font-bold text-xs text-[#151515]">{count}</div>
                    <div className="truncate text-[#7A7267]">{era.replace(' Beatles', '')}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Matching Songs List */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between font-mono-code text-xs text-[#7A7267]">
              <span>MATCHING TRACKS ({searchResults.length}):</span>
              <span>TAP TRACK TO VIEW FULL HIGHLIGHTED LYRICS</span>
            </div>

            {searchResults.length === 0 ? (
              <div className="p-8 text-center bg-[#EAE1D2] border border-[#C8C0B2] font-mono-code text-sm text-[#7A7267]">
                No lyrics containing "{searchTerm}" found in the 213 songs corpus. Try another search term.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-96 overflow-y-auto pr-1">
                {searchResults.map(({ song, count, snippet }) => (
                  <button
                    key={song.id}
                    onClick={() => onSelectSongWithQuery(song, searchTerm)}
                    className="p-3.5 bg-[#F6F1E7] hover:bg-[#EFE7D8] border border-[#C8C0B2] text-left transition-colors group flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <span className="font-display text-lg font-bold text-[#151515] group-hover:text-[#C43A2F] uppercase truncate">
                          {song.title}
                        </span>
                        <span className="shrink-0 px-2 py-0.5 bg-[#151515] text-white font-mono-code text-[10px] font-bold">
                          {count} {count === 1 ? 'match' : 'matches'}
                        </span>
                      </div>

                      <div className="font-mono-code text-[11px] text-[#7A7267] mt-0.5">
                        {song.album} ({song.timeline_year}) · {song.era.replace(' Beatles', '')}
                      </div>

                      <p className="font-editorial text-xs text-[#444] mt-2 italic line-clamp-2 leading-relaxed">
                        "{snippet}"
                      </p>
                    </div>

                    <div className="mt-3 pt-2 border-t border-[#D8D0C2] flex items-center justify-end text-[10px] font-mono-code text-[#C43A2F] font-bold">
                      <span>OPEN FULL LYRIC DOSSIER</span>
                      <ChevronRight className="w-3 h-3 ml-0.5" />
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
