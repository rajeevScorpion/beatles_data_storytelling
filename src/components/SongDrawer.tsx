import React, { useEffect, useState } from 'react';
import { SongRecord } from '../types';
import { getMediaForSong, getRelatedSongs, ERA_METADATA } from '../lib/data';
import { usePlayer } from '../context/PlayerContext';
import { usePlaylists } from '../context/PlaylistContext';
import { AddToPlaylistModal } from './AddToPlaylistModal';
import { X, Play, Music, Mic, PenTool, Disc, Sparkles, Tag, ExternalLink, Plus, ListMusic, Check } from 'lucide-react';

interface SongDrawerProps {
  song: SongRecord | null;
  onClose: () => void;
  onSelectSong: (song: SongRecord) => void;
  highlightQuery?: string;
}

export const SongDrawer: React.FC<SongDrawerProps> = ({
  song,
  onClose,
  onSelectSong,
  highlightQuery = '',
}) => {
  const { playSong, playTrack } = usePlayer();
  const { playlists, openPlaylistDrawer } = usePlaylists();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!song) return null;

  const media = getMediaForSong(song);
  const relatedSongs = getRelatedSongs(song, 3);
  const eraInfo = ERA_METADATA[song.era];
  const containingPlaylists = playlists.filter(p => p.songIds.includes(song.id));

  // Helper to highlight terms in lyric text
  const renderLyrics = (text: string) => {
    if (song.is_instrumental) {
      return (
        <div className="p-4 bg-[#E2D8C7] border border-[#C8C0B2] text-center space-y-1">
          <span className="font-mono-code text-xs uppercase font-bold text-[#5B824D] block">
            INSTRUMENTAL COMPOSITION
          </span>
          <p className="font-editorial text-sm text-[#444] italic">
            No vocal lyric text recorded for this track. Composed as a collective studio instrumental and credited to Lennon, McCartney, Harrison, and Starkey.
          </p>
        </div>
      );
    }

    if (!text) {
      return (
        <p className="italic text-[#8E877C] font-mono-code text-sm">
          No lyrical text recorded for this track in the research dataset.
        </p>
      );
    }

    if (!highlightQuery || highlightQuery.trim().length < 2) {
      return (
        <div className="space-y-3 font-editorial text-sm leading-relaxed text-[#262626]">
          {text.split('\n\n').map((stanza, idx) => (
            <p key={idx} className="whitespace-pre-line">
              {stanza}
            </p>
          ))}
        </div>
      );
    }

    const cleanQuery = highlightQuery.trim();
    const regex = new RegExp(`(${cleanQuery.replace(/[.*+?^${}()|[\\]\\]/g, '\\$&')})`, 'gi');
    const parts = text.split(regex);

    return (
      <div className="space-y-3 font-editorial text-sm leading-relaxed text-[#262626]">
        {parts.map((part, i) =>
          regex.test(part) ? (
            <mark key={i} className="bg-[#FFE066] text-[#151515] px-1 py-0.5 font-bold rounded-xs">
              {part}
            </mark>
          ) : (
            <span key={i}>{part}</span>
          )
        )}
      </div>
    );
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/50 backdrop-blur-xs flex justify-end">
      {/* Backdrop overlay */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Drawer panel */}
      <div className="relative w-full max-w-xl bg-[#F6F1E7] h-full shadow-2xl overflow-y-auto flex flex-col border-l-2 border-[#151515] animate-in slide-in-from-right duration-300">
        {/* Drawer Header */}
        <div className="sticky top-0 z-10 bg-[#EFE7D8] px-6 py-4 border-b border-[#D8D0C2] flex items-center justify-between">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-mono-code text-[11px] uppercase tracking-wider text-[#766E65] border border-[#C8C0B2] px-2 py-0.5 bg-[#F6F1E7]">
              {song.era}
            </span>
            <span className="font-mono-code text-[11px] text-[#766E65]">
              {song.timeline_year}
            </span>
            {song.is_cover && (
              <span className="font-mono-code text-[10px] bg-[#C43A2F] text-white px-1.5 py-0.5 font-bold uppercase">
                Cover
              </span>
            )}
            {song.is_instrumental && (
              <span className="font-mono-code text-[10px] bg-[#5B824D] text-white px-1.5 py-0.5 font-bold uppercase">
                Instrumental
              </span>
            )}
            {song.metadata_patch && (
              <span className="font-mono-code text-[10px] bg-[#B48639] text-white px-1.5 py-0.5 font-bold uppercase">
                Archival Patch
              </span>
            )}
          </div>

          <button
            onClick={onClose}
            className="p-1.5 hover:bg-[#DDD4C3] border border-[#C8C0B2] text-[#151515] transition-colors"
            title="Close drawer (Esc)"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6 flex-1">
          {/* Title and Play action */}
          <div>
            <div className="flex items-start justify-between gap-4">
              <h2 className="font-display text-4xl sm:text-5xl font-black uppercase tracking-tight text-[#151515] leading-none">
                {song.title}
              </h2>
              <div className="flex items-center gap-2 shrink-0">
                {media && (
                  <button
                    onClick={() => playSong(song)}
                    className="flex items-center gap-1.5 px-3 py-2 bg-[#C43A2F] hover:bg-[#A82D23] text-white font-mono-code text-xs uppercase font-bold print-shadow-sm transition-all"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>PLAY</span>
                  </button>
                )}
                <button
                  onClick={() => setIsAddModalOpen(true)}
                  className="flex items-center gap-1.5 px-3 py-2 bg-[#151515] hover:bg-[#333] text-white font-mono-code text-xs uppercase font-bold print-shadow-sm transition-all"
                  title="Add to a playlist"
                >
                  <Plus className="w-3.5 h-3.5 text-[#C43A2F]" />
                  <span>PLAYLIST</span>
                </button>
              </div>
            </div>

            <p className="font-editorial text-lg text-[#555] italic mt-1.5">
              from <span className="font-bold text-[#151515] not-italic">{song.album}</span> ({song.year_raw})
            </p>

            {containingPlaylists.length > 0 && (
              <div className="mt-2.5 flex flex-wrap items-center gap-1.5 font-mono-code text-[10px]">
                <span className="text-[#766E65] uppercase">In Playlists:</span>
                {containingPlaylists.map(pl => (
                  <button
                    key={pl.id}
                    onClick={() => {
                      onClose();
                      openPlaylistDrawer(pl.id);
                    }}
                    className="px-2 py-0.5 bg-[#E2D8C7] hover:bg-[#DDD4C3] border border-[#C8C0B2] text-[#151515] font-bold transition-colors flex items-center gap-1"
                    title={`View "${pl.name}" playlist`}
                  >
                    <Check className="w-2.5 h-2.5 text-[#5B824D]" />
                    <span>{pl.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Quick Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 pb-3 border-y border-[#D8D0C2] font-mono-code text-xs">
            <div className="p-2 bg-[#EFE7D8] border border-[#DDD4C3]">
              <span className="block text-[10px] text-[#8E877C] uppercase">Word Count</span>
              <span className="font-bold text-base text-[#151515]">{song.word_count || '—'}</span>
            </div>
            <div className="p-2 bg-[#EFE7D8] border border-[#DDD4C3]">
              <span className="block text-[10px] text-[#8E877C] uppercase">Songwriters</span>
              <span className="font-semibold text-xs text-[#151515] truncate block" title={song.songwriters_raw}>
                {song.songwriters_raw}
              </span>
            </div>
            <div className="p-2 bg-[#EFE7D8] border border-[#DDD4C3]">
              <span className="block text-[10px] text-[#8E877C] uppercase">Lead Vocal</span>
              <span className="font-semibold text-xs text-[#151515] truncate block" title={song.lead_vocals_raw}>
                {song.lead_vocals_raw}
              </span>
            </div>
            <div className="p-2 bg-[#EFE7D8] border border-[#DDD4C3]">
              <span className="block text-[10px] text-[#8E877C] uppercase">Audio Status</span>
              <span className="font-bold text-xs text-[#C43A2F]">
                {media ? 'Verified Embed' : 'Data Reference'}
              </span>
            </div>
          </div>

          {/* Archival Normalization Callout for Patched Records */}
          {song.metadata_patch && (
            <div className="p-3 bg-[#FBF4E2] border-l-4 border-[#B48639] text-xs font-mono-code text-[#6B5115] space-y-1">
              <span className="font-bold uppercase tracking-wide block text-[10px]">
                ARCHIVAL NORMALIZATION NOTE
              </span>
              <p className="font-editorial text-xs leading-relaxed text-[#554117]">
                Recorded at Pathé Marconi Studios, Paris, on 29 January 1964. German-language adaptation recorded for Odeon/Electrola; normalized into the 1964 timeline and Early Beatles narrative.
              </p>
            </div>
          )}

          {/* Themes & Genres */}
          <div className="space-y-3">
            {song.themes && song.themes.length > 0 && (
              <div>
                <span className="block font-mono-code text-[11px] uppercase tracking-wider text-[#8E877C] mb-1.5 flex items-center gap-1">
                  <Tag className="w-3 h-3" /> Thematic Tags ({song.themes.length})
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {song.themes.map((theme, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 bg-[#E2D8C7] text-[#333] border border-[#CCC2B0] font-mono-code text-xs"
                    >
                      {theme}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {song.genres && song.genres.length > 0 && (
              <div>
                <span className="block font-mono-code text-[11px] uppercase tracking-wider text-[#8E877C] mb-1.5 flex items-center gap-1">
                  <Music className="w-3 h-3" /> Genres & Stylistic Coordinates
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {song.genres.map((genre, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 bg-[#151515] text-[#F4F2EC] font-mono-code text-[11px] tracking-wide uppercase"
                    >
                      {genre}
                    </span>
                  ))}
                  {song.styles && song.styles.map((style, i) => (
                    <span
                      key={`st-${i}`}
                      className="px-2 py-0.5 bg-transparent border border-[#766E65] text-[#444] font-mono-code text-[10px]"
                    >
                      {style}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Educational Lyrics Section */}
          <div className="pt-4 border-t border-[#D8D0C2]">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-display text-xl uppercase tracking-wider font-bold text-[#151515] flex items-center gap-2">
                <span>EDUCATIONAL LYRICS ARCHIVE</span>
              </h3>
              {highlightQuery && (
                <span className="font-mono-code text-[10px] bg-[#FFE066] text-[#151515] px-1.5 py-0.5 font-bold">
                  Highlighting "{highlightQuery}"
                </span>
              )}
            </div>

            <div className="p-4 bg-[#EDE5D5] border border-[#DDD3C0] max-h-96 overflow-y-auto">
              {renderLyrics(song.lyrics)}
            </div>
            <p className="text-[10px] font-mono-code text-[#8E877C] mt-1.5">
              Preserved verbatim from the supplied corpus for linguistic analysis and research.
            </p>
          </div>

          {/* Related Songs */}
          {relatedSongs.length > 0 && (
            <div className="pt-4 border-t border-[#D8D0C2]">
              <span className="block font-mono-code text-[11px] uppercase tracking-wider text-[#8E877C] mb-2 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-[#C43A2F]" /> Related Explorations
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {relatedSongs.map(relSong => (
                  <button
                    key={relSong.id}
                    onClick={() => onSelectSong(relSong)}
                    className="p-2.5 bg-[#EFE7D8] hover:bg-[#E5DBC7] border border-[#DDD4C3] text-left transition-colors group"
                  >
                    <div className="font-display font-bold text-sm text-[#151515] group-hover:text-[#C43A2F] uppercase truncate">
                      {relSong.title}
                    </div>
                    <div className="font-mono-code text-[10px] text-[#766E65]">
                      {relSong.timeline_year} · {relSong.album}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Add To Playlist Modal */}
      <AddToPlaylistModal
        song={song}
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />
    </div>
  );
};
