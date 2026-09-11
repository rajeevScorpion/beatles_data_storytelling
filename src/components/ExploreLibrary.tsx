import React, { useState, useMemo } from 'react';
import { allSongs, getMediaForSong } from '../lib/data';
import { SongRecord, BeatlesEra, BeatlesMember } from '../types';
import { Search, Filter, Disc, Play, LayoutGrid, List, RotateCcw, ChevronRight } from 'lucide-react';
import { usePlayer } from '../context/PlayerContext';

interface ExploreLibraryProps {
  onSelectSong: (song: SongRecord) => void;
}

export const ExploreLibrary: React.FC<ExploreLibraryProps> = ({ onSelectSong }) => {
  const { playSong } = usePlayer();

  // Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEra, setSelectedEra] = useState<string>('all');
  const [selectedMember, setSelectedMember] = useState<string>('all');
  const [memberRole, setMemberRole] = useState<'writer' | 'vocal'>('writer');
  const [typeFilter, setTypeFilter] = useState<'all' | 'original' | 'cover'>('all');
  const [selectedAlbum, setSelectedAlbum] = useState<string>('all');
  const [onlyPlayable, setOnlyPlayable] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<'year-asc' | 'year-desc' | 'title' | 'words'>('year-asc');
  const [viewMode, setViewMode] = useState<'grid' | 'ledger'>('grid');

  // Distinct albums for dropdown
  const albums = useMemo(() => {
    const list = Array.from(new Set(allSongs.map(s => s.album))).filter(Boolean).sort();
    return list;
  }, []);

  // Filter and Sort Logic
  const filteredSongs = useMemo(() => {
    return allSongs
      .filter(song => {
        // Search text
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase().trim();
          const matchTitle = song.title.toLowerCase().includes(q);
          const matchAlbum = song.album.toLowerCase().includes(q);
          const matchWriters = song.songwriters_raw.toLowerCase().includes(q);
          const matchLyrics = song.lyrics_search_text.includes(q);
          if (!matchTitle && !matchAlbum && !matchWriters && !matchLyrics) {
            return false;
          }
        }

        // Era
        if (selectedEra !== 'all' && song.era !== selectedEra) {
          return false;
        }

        // Member
        if (selectedMember !== 'all') {
          if (memberRole === 'writer') {
            if (!song.writer_members.includes(selectedMember)) return false;
          } else {
            if (!song.lead_vocal_members.includes(selectedMember)) return false;
          }
        }

        // Type: Original vs Cover
        if (typeFilter === 'original' && song.is_cover) return false;
        if (typeFilter === 'cover' && !song.is_cover) return false;

        // Album
        if (selectedAlbum !== 'all' && song.album !== selectedAlbum) {
          return false;
        }

        // Playable only
        if (onlyPlayable) {
          const media = getMediaForSong(song);
          if (!media) return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'year-asc') return a.timeline_year - b.timeline_year || a.title.localeCompare(b.title);
        if (sortBy === 'year-desc') return b.timeline_year - a.timeline_year || a.title.localeCompare(b.title);
        if (sortBy === 'title') return a.title.localeCompare(b.title);
        if (sortBy === 'words') return (b.word_count || 0) - (a.word_count || 0);
        return 0;
      });
  }, [searchQuery, selectedEra, selectedMember, memberRole, typeFilter, selectedAlbum, onlyPlayable, sortBy]);

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedEra('all');
    setSelectedMember('all');
    setTypeFilter('all');
    setSelectedAlbum('all');
    setOnlyPlayable(false);
    setSortBy('year-asc');
  };

  return (
    <section id="explore-library" className="py-20 px-4 sm:px-8 border-b-2 border-[#151515] bg-[#EAE1D2]">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <span className="font-mono-code text-xs uppercase px-2 py-0.5 bg-[#151515] text-white font-bold">
              THE COMPLETE REPOSITORY
            </span>
            <span className="font-mono-code text-xs uppercase tracking-widest text-[#7A7267]">
              EXPLORE THE 213
            </span>
          </div>
          <h2 className="font-display text-4xl sm:text-6xl font-black uppercase tracking-tight text-[#151515]">
            THE COMPLETE RECORD ARCHIVE
          </h2>
          <p className="font-editorial text-base sm:text-xl text-[#444] max-w-2xl leading-relaxed">
            Search, filter, inspect lyrics, and play verified audio across all 213 songs recorded by The Beatles
            between 1962 and 1970.
          </p>
        </div>

        {/* Filter Control Board */}
        <div className="bg-[#F2EBDD] border-2 border-[#151515] print-shadow p-6 space-y-5">
          {/* Top Row: Search + View toggle */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#7A7267]" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search title, album, songwriter, or lyrics..."
                className="w-full pl-10 pr-4 py-2.5 bg-[#F6F1E7] border border-[#C8C0B2] font-mono-code text-sm text-[#151515] focus:outline-none focus:border-[#151515]"
              />
            </div>

            <div className="flex items-center gap-2">
              {/* Reset button */}
              <button
                onClick={resetFilters}
                className="px-3 py-2 bg-[#EAE1D2] hover:bg-[#DDD2C0] border border-[#C8C0B2] text-[#151515] font-mono-code text-xs uppercase font-bold flex items-center gap-1"
                title="Reset all filters"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">RESET</span>
              </button>

              {/* View mode toggle */}
              <div className="flex items-center border border-[#C8C0B2] bg-[#EAE1D2] p-0.5">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-1.5 transition-colors ${
                    viewMode === 'grid' ? 'bg-[#151515] text-white' : 'text-[#555] hover:text-[#151515]'
                  }`}
                  title="Grid view"
                >
                  <LayoutGrid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('ledger')}
                  className={`p-1.5 transition-colors ${
                    viewMode === 'ledger' ? 'bg-[#151515] text-white' : 'text-[#555] hover:text-[#151515]'
                  }`}
                  title="Editorial ledger view"
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Filter Pills and Dropdowns */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 font-mono-code text-xs">
            {/* Era Filter */}
            <div>
              <label className="block text-[10px] uppercase font-bold text-[#7A7267] mb-1">
                HISTORICAL ERA
              </label>
              <select
                value={selectedEra}
                onChange={e => setSelectedEra(e.target.value)}
                className="w-full p-2 bg-[#F6F1E7] border border-[#C8C0B2] text-[#151515] focus:outline-none"
              >
                <option value="all">All Eras (1962–1970)</option>
                <option value="Early Beatles">Early Beatles (1962–64)</option>
                <option value="Middle Beatles">Middle Beatles (1965–66)</option>
                <option value="Psychedelic Beatles">Psychedelic Beatles (1967)</option>
                <option value="Late Beatles">Late Beatles (1968–70)</option>
              </select>
            </div>

            {/* Member Filter */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-[10px] uppercase font-bold text-[#7A7267]">
                  MEMBER
                </label>
                <button
                  onClick={() => setMemberRole(prev => (prev === 'writer' ? 'vocal' : 'writer'))}
                  className="text-[9px] uppercase font-bold text-[#C43A2F] underline"
                >
                  {memberRole === 'writer' ? 'as writer' : 'as lead vocal'}
                </button>
              </div>
              <select
                value={selectedMember}
                onChange={e => setSelectedMember(e.target.value)}
                className="w-full p-2 bg-[#F6F1E7] border border-[#C8C0B2] text-[#151515] focus:outline-none"
              >
                <option value="all">All Four Members</option>
                <option value="John Lennon">John Lennon</option>
                <option value="Paul McCartney">Paul McCartney</option>
                <option value="George Harrison">George Harrison</option>
                <option value="Ringo Starr">Ringo Starr</option>
              </select>
            </div>

            {/* Album Filter */}
            <div>
              <label className="block text-[10px] uppercase font-bold text-[#7A7267] mb-1">
                ALBUM / RELEASE
              </label>
              <select
                value={selectedAlbum}
                onChange={e => setSelectedAlbum(e.target.value)}
                className="w-full p-2 bg-[#F6F1E7] border border-[#C8C0B2] text-[#151515] focus:outline-none truncate"
              >
                <option value="all">All Albums & Collections</option>
                {albums.map(alb => (
                  <option key={alb} value={alb}>
                    {alb}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort Options */}
            <div>
              <label className="block text-[10px] uppercase font-bold text-[#7A7267] mb-1">
                SORT ORDER
              </label>
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value as any)}
                className="w-full p-2 bg-[#F6F1E7] border border-[#C8C0B2] text-[#151515] focus:outline-none"
              >
                <option value="year-asc">Chronological (1962 → 1970)</option>
                <option value="year-desc">Reverse Chronological</option>
                <option value="title">Title (A → Z)</option>
                <option value="words">Lyrical Word Count (High → Low)</option>
              </select>
            </div>
          </div>

          {/* Quick Filter Toggles */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-[#D8D0C2] font-mono-code text-xs">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[#7A7267] text-[10px] uppercase font-bold mr-1">TYPE:</span>
              <button
                onClick={() => setTypeFilter('all')}
                className={`px-2.5 py-1 text-[11px] uppercase ${
                  typeFilter === 'all' ? 'bg-[#151515] text-white font-bold' : 'bg-[#EAE1D2] text-[#555]'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setTypeFilter('original')}
                className={`px-2.5 py-1 text-[11px] uppercase ${
                  typeFilter === 'original' ? 'bg-[#151515] text-white font-bold' : 'bg-[#EAE1D2] text-[#555]'
                }`}
              >
                Originals Only
              </button>
              <button
                onClick={() => setTypeFilter('cover')}
                className={`px-2.5 py-1 text-[11px] uppercase ${
                  typeFilter === 'cover' ? 'bg-[#C43A2F] text-white font-bold' : 'bg-[#EAE1D2] text-[#555]'
                }`}
              >
                Covers Only
              </button>

              <label className="flex items-center gap-1.5 ml-3 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={onlyPlayable}
                  onChange={e => setOnlyPlayable(e.target.checked)}
                  className="accent-[#C43A2F]"
                />
                <span className="text-[11px] text-[#151515] font-bold">
                  Playable Only (14 verified embeds)
                </span>
              </label>
            </div>

            <div className="text-[11px] text-[#7A7267] font-bold">
              SHOWING {filteredSongs.length} OF {allSongs.length} SONGS
            </div>
          </div>
        </div>

        {/* Results Container */}
        {filteredSongs.length === 0 ? (
          <div className="p-12 text-center bg-[#F2EBDD] border-2 border-[#151515] font-mono-code text-sm text-[#7A7267]">
            No songs found matching your combination of filters. Try resetting filters.
          </div>
        ) : viewMode === 'grid' ? (
          /* Card Grid View */
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {filteredSongs.map(song => {
              const media = getMediaForSong(song);
              return (
                <div
                  key={song.id}
                  className="p-4 bg-[#F2EBDD] hover:bg-[#F6F1E7] border-2 border-[#151515] print-shadow-sm flex flex-col justify-between transition-all group"
                >
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <button
                        onClick={() => onSelectSong(song)}
                        className="font-display text-lg font-black uppercase text-[#151515] group-hover:text-[#C43A2F] text-left truncate leading-tight"
                      >
                        {song.title}
                      </button>
                      {media && (
                        <button
                          onClick={() => playSong(song)}
                          className="p-1 bg-[#151515] hover:bg-[#C43A2F] text-white shrink-0 transition-colors"
                          title="Play verified audio"
                        >
                          <Play className="w-3 h-3 fill-current" />
                        </button>
                      )}
                    </div>

                    <div className="font-mono-code text-[10px] text-[#7A7267] mt-1 truncate">
                      {song.album} ({song.timeline_year})
                    </div>

                    <div className="font-mono-code text-[10px] text-[#555] mt-2 line-clamp-1">
                      <span className="font-bold">By:</span> {song.songwriters_raw}
                    </div>
                  </div>

                  <div className="mt-4 pt-2 border-t border-[#D8D0C2] flex items-center justify-between font-mono-code text-[10px]">
                    <span className="text-[#7A7267]">{song.word_count || 0} words</span>
                    <button
                      onClick={() => onSelectSong(song)}
                      className="text-[#151515] group-hover:text-[#C43A2F] font-bold flex items-center"
                    >
                      DOSSIER <ChevronRight className="w-3 h-3 ml-0.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* Editorial Ledger View */
          <div className="bg-[#F2EBDD] border-2 border-[#151515] print-shadow overflow-x-auto">
            <table className="w-full text-left font-mono-code text-xs border-collapse">
              <thead>
                <tr className="bg-[#151515] text-white text-[11px] uppercase">
                  <th className="p-3">Year</th>
                  <th className="p-3">Title</th>
                  <th className="p-3">Album</th>
                  <th className="p-3">Songwriters</th>
                  <th className="p-3">Lead Vocals</th>
                  <th className="p-3">Words</th>
                  <th className="p-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#D8D0C2]">
                {filteredSongs.map(song => {
                  const media = getMediaForSong(song);
                  return (
                    <tr
                      key={song.id}
                      className="hover:bg-[#EAE1D2] transition-colors"
                    >
                      <td className="p-3 font-bold text-[#151515]">{song.timeline_year}</td>
                      <td className="p-3">
                        <button
                          onClick={() => onSelectSong(song)}
                          className="font-display text-base font-bold text-[#151515] hover:text-[#C43A2F] uppercase text-left truncate max-w-xs block"
                        >
                          {song.title}
                        </button>
                      </td>
                      <td className="p-3 text-[#555] truncate max-w-[180px]">{song.album}</td>
                      <td className="p-3 text-[#555] truncate max-w-[150px]">{song.songwriters_raw}</td>
                      <td className="p-3 text-[#555] truncate max-w-[130px]">{song.lead_vocals_raw}</td>
                      <td className="p-3 text-[#7A7267]">{song.word_count || '—'}</td>
                      <td className="p-3 text-right">
                        <div className="flex items-center justify-end gap-2">
                          {media && (
                            <button
                              onClick={() => playSong(song)}
                              className="px-2 py-1 bg-[#C43A2F] text-white text-[10px] uppercase font-bold flex items-center gap-1"
                            >
                              <Play className="w-2.5 h-2.5 fill-current" />
                              <span>Play</span>
                            </button>
                          )}
                          <button
                            onClick={() => onSelectSong(song)}
                            className="px-2 py-1 bg-[#151515] text-white text-[10px] uppercase font-bold"
                          >
                            Dossier
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
};
