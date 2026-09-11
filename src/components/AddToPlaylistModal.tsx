import React, { useState } from 'react';
import { SongRecord } from '../types';
import { usePlaylists } from '../context/PlaylistContext';
import { X, Check, Plus, ListMusic, ExternalLink } from 'lucide-react';

interface AddToPlaylistModalProps {
  song: SongRecord | null;
  isOpen: boolean;
  onClose: () => void;
}

export const AddToPlaylistModal: React.FC<AddToPlaylistModalProps> = ({ song, isOpen, onClose }) => {
  const { playlists, toggleSongInPlaylist, createPlaylist, openPlaylistDrawer } = usePlaylists();
  const [newPlaylistName, setNewPlaylistName] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  if (!isOpen || !song) return null;

  const handleToggle = (playlistId: string, playlistName: string) => {
    const added = toggleSongInPlaylist(playlistId, song.id);
    setNotification(added ? `Added to "${playlistName}"` : `Removed from "${playlistName}"`);
    setTimeout(() => setNotification(null), 2500);
  };

  const handleCreateNew = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPlaylistName.trim()) return;
    const newId = createPlaylist(newPlaylistName.trim(), '', [song.id]);
    setNotification(`Created "${newPlaylistName.trim()}" and added song!`);
    setNewPlaylistName('');
    setIsCreating(false);
    setTimeout(() => setNotification(null), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-md bg-[#F6F1E7] border-2 border-[#151515] print-shadow flex flex-col max-h-[85vh] overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="bg-[#151515] text-[#F4F4F5] px-4 py-3 flex items-center justify-between border-b-2 border-[#151515]">
          <div className="flex items-center gap-2">
            <ListMusic className="w-4 h-4 text-[#C43A2F]" />
            <span className="font-display text-sm tracking-wider uppercase font-bold text-white">
              ADD TO PLAYLIST
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-[#27272A] text-[#A1A1AA] hover:text-white transition-colors"
            title="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Selected Song Preview */}
        <div className="p-4 bg-[#EFE7D8] border-b border-[#D8D0C2]">
          <div className="font-mono-code text-[10px] text-[#766E65] uppercase tracking-wider">
            Selected Track
          </div>
          <div className="font-display text-lg font-black uppercase text-[#151515] truncate">
            {song.title}
          </div>
          <div className="font-mono-code text-xs text-[#555] truncate">
            {song.album} ({song.timeline_year}) · {song.era}
          </div>
        </div>

        {/* Toast Notification */}
        {notification && (
          <div className="bg-[#5B824D] text-white px-4 py-1.5 font-mono-code text-xs font-bold text-center animate-in fade-in duration-150">
            {notification}
          </div>
        )}

        {/* Playlist Selection List */}
        <div className="p-4 overflow-y-auto space-y-2 flex-1 max-h-60">
          <div className="font-mono-code text-[11px] text-[#766E65] uppercase tracking-wider mb-2">
            Choose Destination Playlist
          </div>

          {playlists.length === 0 ? (
            <div className="p-4 text-center font-mono-code text-xs text-[#766E65] bg-[#EAE1D2] border border-[#D8D0C2]">
              No playlists found. Create your first playlist below!
            </div>
          ) : (
            playlists.map(pl => {
              const inPlaylist = pl.songIds.includes(song.id);
              return (
                <button
                  key={pl.id}
                  type="button"
                  onClick={() => handleToggle(pl.id, pl.name)}
                  className={`w-full p-2.5 flex items-center justify-between border text-left transition-all font-mono-code text-xs ${
                    inPlaylist
                      ? 'bg-[#151515] text-white border-[#151515] shadow-xs'
                      : 'bg-[#EAE1D2] hover:bg-[#DDD4C3] text-[#151515] border-[#C8C0B2]'
                  }`}
                >
                  <div className="min-w-0 flex-1 pr-2">
                    <div className="font-bold truncate text-sm">
                      {pl.name}
                    </div>
                    <div className={`text-[10px] truncate ${inPlaylist ? 'text-[#D4D4D8]' : 'text-[#766E65]'}`}>
                      {pl.songIds.length} {pl.songIds.length === 1 ? 'track' : 'tracks'}
                    </div>
                  </div>

                  <div
                    className={`w-5 h-5 flex items-center justify-center rounded-xs border shrink-0 transition-colors ${
                      inPlaylist
                        ? 'bg-[#C43A2F] border-[#C43A2F] text-white'
                        : 'border-[#8E877C] bg-white text-transparent'
                    }`}
                  >
                    <Check className="w-3.5 h-3.5" />
                  </div>
                </button>
              );
            })
          )}
        </div>

        {/* Inline Create New Playlist Section */}
        <div className="p-4 bg-[#EFE7D8] border-t border-[#D8D0C2]">
          {isCreating ? (
            <form onSubmit={handleCreateNew} className="space-y-2">
              <div className="font-mono-code text-[10px] uppercase font-bold text-[#151515]">
                New Playlist Name
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newPlaylistName}
                  onChange={e => setNewPlaylistName(e.target.value)}
                  placeholder="e.g. Abbey Road Sessions..."
                  autoFocus
                  className="flex-1 px-2.5 py-1.5 bg-white border border-[#151515] font-mono-code text-xs text-[#151515] outline-none focus:ring-1 focus:ring-[#C43A2F]"
                />
                <button
                  type="submit"
                  disabled={!newPlaylistName.trim()}
                  className="px-3 py-1.5 bg-[#C43A2F] hover:bg-[#A82D23] disabled:opacity-50 text-white font-mono-code text-xs uppercase font-bold tracking-wider transition-colors"
                >
                  Create & Add
                </button>
                <button
                  type="button"
                  onClick={() => setIsCreating(false)}
                  className="px-2 py-1.5 bg-[#DDD4C3] hover:bg-[#C8C0B2] text-[#151515] font-mono-code text-xs uppercase"
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <button
              type="button"
              onClick={() => setIsCreating(true)}
              className="w-full py-2 px-3 border border-dashed border-[#151515] hover:bg-[#EAE1D2] text-[#151515] font-mono-code text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Create New Playlist</span>
            </button>
          )}

          {/* Quick link to Playlist Manager */}
          <div className="mt-3 pt-2 border-t border-[#D8D0C2] flex items-center justify-between text-[11px] font-mono-code">
            <span className="text-[#766E65]">Curated local collection</span>
            <button
              type="button"
              onClick={() => {
                onClose();
                openPlaylistDrawer();
              }}
              className="text-[#C43A2F] hover:underline font-bold flex items-center gap-1"
            >
              <span>View All Playlists</span>
              <ExternalLink className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
