import React, { useState, useEffect, useMemo } from 'react';
import { usePlaylists } from '../context/PlaylistContext';
import { usePlayer } from '../context/PlayerContext';
import { allSongs, getMediaForSong } from '../lib/data';
import { SongRecord, UserPlaylist } from '../types';
import {
  X,
  Plus,
  Play,
  Shuffle,
  Trash2,
  Edit2,
  Check,
  Music,
  Disc3,
  Search,
  Calendar,
  Layers,
  ArrowRight,
} from 'lucide-react';

interface PlaylistDrawerProps {
  onSelectSong: (song: SongRecord) => void;
}

export const PlaylistDrawer: React.FC<PlaylistDrawerProps> = ({ onSelectSong }) => {
  const {
    playlists,
    activePlaylistId,
    activePlaylist,
    isPlaylistDrawerOpen,
    closePlaylistDrawer,
    setActivePlaylistId,
    createPlaylist,
    deletePlaylist,
    updatePlaylist,
    removeSongFromPlaylist,
    addSongToPlaylist,
    getSongsForPlaylist,
  } = usePlaylists();

  const { playPlaylistQueue, playSong } = usePlayer();

  // Create playlist form state
  const [isCreatingNew, setIsCreatingNew] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');

  // Editing playlist info state
  const [isEditingActive, setIsEditingActive] = useState(false);
  const [editTitle, setEditTitle] = useState('');
  const [editDesc, setEditDesc] = useState('');

  // Quick search to add songs
  const [songSearchQuery, setSongSearchQuery] = useState('');

  // Update edit state when active playlist changes
  useEffect(() => {
    if (activePlaylist) {
      setEditTitle(activePlaylist.name);
      setEditDesc(activePlaylist.description || '');
      setIsEditingActive(false);
    }
  }, [activePlaylist?.id]);

  // Close on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isPlaylistDrawerOpen) {
        closePlaylistDrawer();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isPlaylistDrawerOpen, closePlaylistDrawer]);

  // Songs in active playlist
  const currentSongs = useMemo(() => {
    if (!activePlaylist) return [];
    return getSongsForPlaylist(activePlaylist);
  }, [activePlaylist, getSongsForPlaylist]);

  // Search results for adding songs
  const searchResults = useMemo(() => {
    if (!songSearchQuery.trim()) return [];
    const q = songSearchQuery.toLowerCase().trim();
    return allSongs
      .filter(s => s.title.toLowerCase().includes(q) || s.album.toLowerCase().includes(q))
      .slice(0, 8);
  }, [songSearchQuery]);

  // Metrics for active playlist
  const playlistMetrics = useMemo(() => {
    if (!currentSongs.length) return null;
    const totalWords = currentSongs.reduce((acc, s) => acc + (s.word_count || 0), 0);
    const years = currentSongs.map(s => s.timeline_year).sort((a, b) => a - b);
    const minYear = years[0];
    const maxYear = years[years.length - 1];
    const eras = Array.from(new Set(currentSongs.map(s => s.era)));
    return {
      totalWords,
      minYear,
      maxYear,
      yearSpan: minYear === maxYear ? `${minYear}` : `${minYear}–${maxYear}`,
      eras,
    };
  }, [currentSongs]);

  if (!isPlaylistDrawerOpen) return null;

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    createPlaylist(newTitle.trim(), newDesc.trim());
    setNewTitle('');
    setNewDesc('');
    setIsCreatingNew(false);
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activePlaylist || !editTitle.trim()) return;
    updatePlaylist(activePlaylist.id, editTitle.trim(), editDesc.trim());
    setIsEditingActive(false);
  };

  const handlePlayAll = () => {
    if (!currentSongs.length || !activePlaylist) return;
    playPlaylistQueue(currentSongs, 0, activePlaylist.name);
  };

  const handleShufflePlay = () => {
    if (!currentSongs.length || !activePlaylist) return;
    const shuffled = [...currentSongs].sort(() => Math.random() - 0.5);
    playPlaylistQueue(shuffled, 0, `${activePlaylist.name} (Shuffled)`);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs flex justify-end">
      {/* Backdrop */}
      <div className="absolute inset-0" onClick={closePlaylistDrawer} />

      {/* Drawer Container */}
      <div className="relative w-full max-w-full sm:max-w-2xl bg-[#F6F1E7] h-full shadow-2xl flex flex-col border-l-2 border-[#151515] animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="sticky top-0 z-20 bg-[#151515] text-[#F4F4F5] px-4 sm:px-6 py-3 sm:py-4 border-b-2 border-[#151515] flex items-center justify-between gap-2">
          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
            <div className="w-7 h-7 sm:w-8 sm:h-8 bg-[#C43A2F] text-white flex items-center justify-center font-black shrink-0">
              <Disc3 className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div className="min-w-0">
              <h2 className="font-display text-sm sm:text-base md:text-lg uppercase tracking-wider font-black text-white leading-tight truncate">
                CURATED PLAYLISTS & MIXTAPES
              </h2>
              <p className="font-mono-code text-[9px] sm:text-[10px] text-[#A1A1AA] uppercase tracking-wider">
                {playlists.length} {playlists.length === 1 ? 'COLLECTION' : 'COLLECTIONS'} · SAVED LOCALLY
              </p>
            </div>
          </div>

          <button
            onClick={closePlaylistDrawer}
            className="p-1.5 hover:bg-[#27272A] text-[#A1A1AA] hover:text-white transition-colors border border-[#3F3F46] shrink-0"
            title="Close drawer (Esc)"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Playlists Tabs Bar */}
        <div className="bg-[#EFE7D8] border-b border-[#D8D0C2] px-3 sm:px-6 py-2 flex items-center justify-between gap-2 overflow-x-auto">
          <div className="flex items-center gap-1.5 overflow-x-auto py-1">
            {playlists.map(pl => {
              const isSelected = pl.id === activePlaylist?.id;
              return (
                <button
                  key={pl.id}
                  onClick={() => {
                    setActivePlaylistId(pl.id);
                    setIsCreatingNew(false);
                    setIsEditingActive(false);
                  }}
                  className={`px-3 py-1.5 text-xs font-mono-code font-bold uppercase whitespace-nowrap transition-all border ${
                    isSelected
                      ? 'bg-[#151515] text-white border-[#151515] shadow-xs'
                      : 'bg-[#F6F1E7] text-[#555] hover:text-[#151515] border-[#C8C0B2] hover:bg-white'
                  }`}
                >
                  <span>{pl.name}</span>
                  <span className={`ml-1.5 text-[10px] ${isSelected ? 'text-[#C43A2F]' : 'text-[#8E877C]'}`}>
                    ({pl.songIds.length})
                  </span>
                </button>
              );
            })}
          </div>

          <button
            onClick={() => setIsCreatingNew(prev => !prev)}
            className="shrink-0 flex items-center gap-1 px-2.5 py-1.5 bg-[#C43A2F] hover:bg-[#A82D23] text-white font-mono-code text-xs uppercase font-bold tracking-wider transition-colors shadow-xs"
            title="Create new playlist"
          >
            <Plus className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">NEW PLAYLIST</span>
          </button>
        </div>

        {/* Inline Create Form */}
        {isCreatingNew && (
          <form
            onSubmit={handleCreateSubmit}
            className="p-4 bg-[#E2D8C7] border-b-2 border-[#151515] space-y-3 animate-in fade-in duration-150"
          >
            <div className="flex items-center justify-between font-mono-code text-xs font-bold uppercase text-[#151515]">
              <span>Create New Playlist</span>
              <button
                type="button"
                onClick={() => setIsCreatingNew(false)}
                className="text-[#766E65] hover:text-[#151515]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-2">
              <input
                type="text"
                value={newTitle}
                onChange={e => setNewTitle(e.target.value)}
                placeholder="Playlist Title (e.g., McCartney Ballads, 1967 Psychedelia...)"
                autoFocus
                className="w-full px-3 py-2 bg-white border border-[#151515] font-mono-code text-xs text-[#151515] outline-none focus:ring-1 focus:ring-[#C43A2F]"
              />
              <input
                type="text"
                value={newDesc}
                onChange={e => setNewDesc(e.target.value)}
                placeholder="Optional description / curation notes..."
                className="w-full px-3 py-1.5 bg-white border border-[#C8C0B2] font-mono-code text-xs text-[#151515] outline-none focus:ring-1 focus:ring-[#C43A2F]"
              />
            </div>
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setIsCreatingNew(false)}
                className="px-3 py-1.5 bg-[#DDD4C3] hover:bg-[#C8C0B2] text-[#151515] font-mono-code text-xs uppercase"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={!newTitle.trim()}
                className="px-4 py-1.5 bg-[#151515] hover:bg-[#C43A2F] text-white disabled:opacity-50 font-mono-code text-xs uppercase font-bold transition-colors"
              >
                Save Playlist
              </button>
            </div>
          </form>
        )}

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {activePlaylist ? (
            <>
              {/* Active Playlist Detail Card */}
              <div className="p-5 bg-[#EFE7D8] border-2 border-[#151515] print-shadow-sm space-y-4">
                {isEditingActive ? (
                  <form onSubmit={handleSaveEdit} className="space-y-3">
                    <input
                      type="text"
                      value={editTitle}
                      onChange={e => setEditTitle(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-[#151515] font-display text-xl font-bold uppercase text-[#151515] outline-none"
                    />
                    <textarea
                      value={editDesc}
                      onChange={e => setEditDesc(e.target.value)}
                      rows={2}
                      className="w-full px-3 py-1.5 bg-white border border-[#C8C0B2] font-editorial text-sm text-[#444] outline-none"
                      placeholder="Add curation notes..."
                    />
                    <div className="flex justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => setIsEditingActive(false)}
                        className="px-3 py-1 bg-[#DDD4C3] text-xs font-mono-code uppercase"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-3 py-1 bg-[#151515] text-white text-xs font-mono-code uppercase font-bold"
                      >
                        Update
                      </button>
                    </div>
                  </form>
                ) : (
                  <div>
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className="font-display text-2xl sm:text-3xl font-black uppercase text-[#151515] leading-tight">
                          {activePlaylist.name}
                        </h3>
                        {activePlaylist.description && (
                          <p className="font-editorial text-sm text-[#555] italic mt-1 leading-relaxed">
                            {activePlaylist.description}
                          </p>
                        )}
                      </div>

                      <div className="flex items-center gap-1 shrink-0">
                        <button
                          onClick={() => setIsEditingActive(true)}
                          className="p-1.5 hover:bg-[#DDD4C3] border border-[#C8C0B2] text-[#555] hover:text-[#151515] transition-colors"
                          title="Edit playlist title and notes"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => {
                            if (window.confirm(`Delete playlist "${activePlaylist.name}"?`)) {
                              deletePlaylist(activePlaylist.id);
                            }
                          }}
                          className="p-1.5 hover:bg-[#FEE2E2] border border-[#C8C0B2] text-[#555] hover:text-[#C43A2F] transition-colors"
                          title="Delete this playlist"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    {/* Metadata chips */}
                    {playlistMetrics && (
                      <div className="flex flex-wrap items-center gap-2 mt-3 pt-3 border-t border-[#D8D0C2] font-mono-code text-[11px] text-[#766E65]">
                        <span className="flex items-center gap-1 bg-[#F6F1E7] px-2 py-0.5 border border-[#C8C0B2]">
                          <Calendar className="w-3 h-3 text-[#C43A2F]" />
                          <span>Era: {playlistMetrics.yearSpan}</span>
                        </span>
                        <span className="flex items-center gap-1 bg-[#F6F1E7] px-2 py-0.5 border border-[#C8C0B2]">
                          <Layers className="w-3 h-3 text-[#C43A2F]" />
                          <span>{currentSongs.length} Tracks</span>
                        </span>
                        <span className="bg-[#F6F1E7] px-2 py-0.5 border border-[#C8C0B2]">
                          {playlistMetrics.totalWords.toLocaleString()} Total Words
                        </span>
                      </div>
                    )}
                  </div>
                )}

                {/* Playlist Action Bar */}
                {currentSongs.length > 0 && (
                  <div className="flex flex-wrap items-center gap-2 pt-2">
                    <button
                      onClick={handlePlayAll}
                      className="flex items-center gap-1.5 px-4 py-2 bg-[#C43A2F] hover:bg-[#A82D23] text-white font-mono-code text-xs uppercase font-bold tracking-wider print-shadow-sm transition-all"
                    >
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>PLAY ALL ({currentSongs.length})</span>
                    </button>
                    <button
                      onClick={handleShufflePlay}
                      className="flex items-center gap-1.5 px-3 py-2 bg-[#151515] hover:bg-[#333] text-white font-mono-code text-xs uppercase font-bold tracking-wider print-shadow-sm transition-all"
                    >
                      <Shuffle className="w-3.5 h-3.5" />
                      <span>SHUFFLE</span>
                    </button>
                  </div>
                )}
              </div>

              {/* Tracklist Ledger */}
              <div className="space-y-3">
                <div className="flex items-center justify-between font-mono-code text-xs uppercase font-bold text-[#151515] border-b-2 border-[#151515] pb-1">
                  <span>Tracklist ({currentSongs.length})</span>
                  <span className="text-[10px] text-[#766E65] font-normal">Click play to launch dock</span>
                </div>

                {currentSongs.length === 0 ? (
                  <div className="p-8 text-center bg-[#EFE7D8] border-2 border-dashed border-[#C8C0B2] font-mono-code text-xs text-[#766E65] space-y-2">
                    <p>This playlist currently has no songs.</p>
                    <p className="text-[11px] text-[#8E877C]">
                      Use the quick-search below, or browse the 213 songs in the Explore ledger to add tracks.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-1.5">
                    {currentSongs.map((song, idx) => {
                      const media = getMediaForSong(song);
                      return (
                        <div
                          key={song.id}
                          className="flex items-center justify-between p-2.5 bg-[#F2EBDD] hover:bg-white border border-[#D8D0C2] hover:border-[#151515] transition-all group font-mono-code text-xs"
                        >
                          <div className="flex items-center gap-3 min-w-0 flex-1">
                            <span className="w-5 text-center text-[#8E877C] font-bold text-[11px]">
                              {String(idx + 1).padStart(2, '0')}
                            </span>
                            <div className="min-w-0 flex-1">
                              <button
                                onClick={() => onSelectSong(song)}
                                className="font-display text-sm font-bold uppercase text-[#151515] group-hover:text-[#C43A2F] text-left truncate block leading-tight"
                              >
                                {song.title}
                              </button>
                              <div className="text-[10px] text-[#766E65] truncate">
                                {song.album} ({song.timeline_year}) · {song.songwriters_raw}
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 shrink-0 ml-2">
                            {media && (
                              <button
                                onClick={() => {
                                  // Play starting from this index in the playlist
                                  playPlaylistQueue(currentSongs, idx, activePlaylist.name);
                                }}
                                className="p-1.5 bg-[#151515] hover:bg-[#C43A2F] text-white transition-colors"
                                title="Play this song in playlist queue"
                              >
                                <Play className="w-3 h-3 fill-current" />
                              </button>
                            )}
                            <button
                              onClick={() => removeSongFromPlaylist(activePlaylist.id, song.id)}
                              className="p-1.5 hover:bg-[#FEE2E2] text-[#8E877C] hover:text-[#C43A2F] transition-colors"
                              title="Remove from this playlist"
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Quick Song Search to Add Tracks */}
              <div className="pt-4 border-t-2 border-[#151515] space-y-3">
                <div className="font-mono-code text-xs uppercase font-bold text-[#151515] flex items-center justify-between">
                  <span>Quick Add from 213 Songs</span>
                  <span className="text-[10px] text-[#766E65] font-normal">Instant Search</span>
                </div>

                <div className="relative">
                  <Search className="absolute left-3 top-2.5 w-4 h-4 text-[#8E877C]" />
                  <input
                    type="text"
                    value={songSearchQuery}
                    onChange={e => setSongSearchQuery(e.target.value)}
                    placeholder="Search song title or album to add (e.g. Penny Lane, Help!)..."
                    className="w-full pl-9 pr-3 py-2 bg-white border border-[#151515] font-mono-code text-xs text-[#151515] outline-none focus:ring-1 focus:ring-[#C43A2F]"
                  />
                  {songSearchQuery && (
                    <button
                      onClick={() => setSongSearchQuery('')}
                      className="absolute right-3 top-2.5 text-[#8E877C] hover:text-[#151515]"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>

                {/* Search Results Preview */}
                {searchResults.length > 0 && (
                  <div className="space-y-1 bg-[#EFE7D8] p-2 border border-[#D8D0C2] max-h-56 overflow-y-auto">
                    {searchResults.map(song => {
                      const alreadyIn = activePlaylist.songIds.includes(song.id);
                      return (
                        <div
                          key={song.id}
                          className="flex items-center justify-between p-2 bg-[#F6F1E7] hover:bg-white border border-[#C8C0B2] text-xs font-mono-code transition-colors"
                        >
                          <div className="min-w-0 flex-1 pr-2">
                            <span className="font-bold text-[#151515] truncate block">
                              {song.title}
                            </span>
                            <span className="text-[10px] text-[#766E65] truncate block">
                              {song.album} ({song.timeline_year})
                            </span>
                          </div>

                          <button
                            type="button"
                            onClick={() => {
                              if (alreadyIn) {
                                removeSongFromPlaylist(activePlaylist.id, song.id);
                              } else {
                                addSongToPlaylist(activePlaylist.id, song.id);
                              }
                            }}
                            className={`px-2.5 py-1 text-[10px] uppercase font-bold flex items-center gap-1 transition-colors ${
                              alreadyIn
                                ? 'bg-[#5B824D] text-white'
                                : 'bg-[#151515] hover:bg-[#C43A2F] text-white'
                            }`}
                          >
                            {alreadyIn ? (
                              <>
                                <Check className="w-3 h-3" />
                                <span>Added</span>
                              </>
                            ) : (
                              <>
                                <Plus className="w-3 h-3" />
                                <span>Add</span>
                              </>
                            )}
                          </button>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="p-12 text-center bg-[#EFE7D8] border-2 border-[#151515] font-mono-code text-xs text-[#766E65] space-y-3">
              <p>No playlist selected or created yet.</p>
              <button
                onClick={() => setIsCreatingNew(true)}
                className="px-4 py-2 bg-[#151515] hover:bg-[#C43A2F] text-white font-bold uppercase transition-colors"
              >
                Create Your First Playlist
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
