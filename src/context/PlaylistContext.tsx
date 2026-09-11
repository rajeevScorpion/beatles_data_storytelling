import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { UserPlaylist, SongRecord } from '../types';
import { allSongs } from '../lib/data';

interface PlaylistContextType {
  playlists: UserPlaylist[];
  activePlaylistId: string | null;
  activePlaylist: UserPlaylist | null;
  isPlaylistDrawerOpen: boolean;
  createPlaylist: (name: string, description?: string, initialSongIds?: string[]) => string;
  deletePlaylist: (id: string) => void;
  updatePlaylist: (id: string, name: string, description?: string) => void;
  addSongToPlaylist: (playlistId: string, songId: string) => void;
  removeSongFromPlaylist: (playlistId: string, songId: string) => void;
  toggleSongInPlaylist: (playlistId: string, songId: string) => boolean;
  isSongInPlaylist: (playlistId: string, songId: string) => boolean;
  getPlaylistsContainingSong: (songId: string) => string[];
  openPlaylistDrawer: (playlistId?: string) => void;
  closePlaylistDrawer: () => void;
  setActivePlaylistId: (id: string | null) => void;
  getSongsForPlaylist: (playlist: UserPlaylist) => SongRecord[];
}

const STORAGE_KEY = 'beatles_editorial_playlists_v1';

const INITIAL_PLAYLISTS: UserPlaylist[] = [
  {
    id: 'playlist-essentials',
    name: 'Studio Masterworks (1965–1969)',
    description: 'Pivotal milestone tracks capturing the shift from live touring idols to avant-garde studio innovators.',
    createdAt: 1700000000000,
    songIds: [
      'beatles-204', // Yesterday
      'beatles-045', // Eleanor Rigby
      'beatles-186', // Tomorrow Never Knows
      'beatles-166', // Strawberry Fields Forever
      'beatles-001', // A Day In The Life
      'beatles-195', // While My Guitar Gently Weeps
      'beatles-165', // Something
    ],
  },
  {
    id: 'playlist-george',
    name: 'Harrison Renaissance',
    description: 'George Harrison compositions tracing his rise as a premier songwriter in the quartet.',
    createdAt: 1700000001000,
    songIds: [
      'beatles-187', // Taxman
      'beatles-195', // While My Guitar Gently Weeps
      'beatles-165', // Something
      'beatles-069', // Here Comes The Sun
    ],
  },
];

const PlaylistContext = createContext<PlaylistContextType | undefined>(undefined);

export const PlaylistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [playlists, setPlaylists] = useState<UserPlaylist[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.warn('Could not read playlists from localStorage:', e);
    }
    return INITIAL_PLAYLISTS;
  });

  const [activePlaylistId, setActivePlaylistId] = useState<string | null>(playlists[0]?.id || null);
  const [isPlaylistDrawerOpen, setIsPlaylistDrawerOpen] = useState<boolean>(false);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(playlists));
    } catch (e) {
      console.warn('Failed to persist playlists to localStorage:', e);
    }
  }, [playlists]);

  const activePlaylist = playlists.find(p => p.id === activePlaylistId) || playlists[0] || null;

  const createPlaylist = useCallback((name: string, description: string = '', initialSongIds: string[] = []): string => {
    const trimmed = name.trim() || 'Untitled Playlist';
    const newId = `playlist-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
    const newPlaylist: UserPlaylist = {
      id: newId,
      name: trimmed,
      description: description.trim(),
      createdAt: Date.now(),
      songIds: [...initialSongIds],
    };
    setPlaylists(prev => [newPlaylist, ...prev]);
    setActivePlaylistId(newId);
    return newId;
  }, []);

  const deletePlaylist = useCallback((id: string) => {
    setPlaylists(prev => {
      const filtered = prev.filter(p => p.id !== id);
      if (activePlaylistId === id) {
        setActivePlaylistId(filtered[0]?.id || null);
      }
      return filtered;
    });
  }, [activePlaylistId]);

  const updatePlaylist = useCallback((id: string, name: string, description?: string) => {
    setPlaylists(prev =>
      prev.map(p => {
        if (p.id !== id) return p;
        return {
          ...p,
          name: name.trim() || p.name,
          description: description !== undefined ? description.trim() : p.description,
        };
      })
    );
  }, []);

  const addSongToPlaylist = useCallback((playlistId: string, songId: string) => {
    setPlaylists(prev =>
      prev.map(p => {
        if (p.id !== playlistId) return p;
        if (p.songIds.includes(songId)) return p;
        return {
          ...p,
          songIds: [...p.songIds, songId],
        };
      })
    );
  }, []);

  const removeSongFromPlaylist = useCallback((playlistId: string, songId: string) => {
    setPlaylists(prev =>
      prev.map(p => {
        if (p.id !== playlistId) return p;
        return {
          ...p,
          songIds: p.songIds.filter(id => id !== songId),
        };
      })
    );
  }, []);

  const toggleSongInPlaylist = useCallback((playlistId: string, songId: string): boolean => {
    let nowAdded = false;
    setPlaylists(prev =>
      prev.map(p => {
        if (p.id !== playlistId) return p;
        const exists = p.songIds.includes(songId);
        nowAdded = !exists;
        return {
          ...p,
          songIds: exists ? p.songIds.filter(id => id !== songId) : [...p.songIds, songId],
        };
      })
    );
    return nowAdded;
  }, []);

  const isSongInPlaylist = useCallback(
    (playlistId: string, songId: string): boolean => {
      const pl = playlists.find(p => p.id === playlistId);
      return !!pl?.songIds.includes(songId);
    },
    [playlists]
  );

  const getPlaylistsContainingSong = useCallback(
    (songId: string): string[] => {
      return playlists.filter(p => p.songIds.includes(songId)).map(p => p.id);
    },
    [playlists]
  );

  const openPlaylistDrawer = useCallback((playlistId?: string) => {
    if (playlistId) {
      setActivePlaylistId(playlistId);
    }
    setIsPlaylistDrawerOpen(true);
  }, []);

  const closePlaylistDrawer = useCallback(() => {
    setIsPlaylistDrawerOpen(false);
  }, []);

  const getSongsForPlaylist = useCallback((playlist: UserPlaylist): SongRecord[] => {
    const songMap = new Map(allSongs.map(s => [s.id, s]));
    return playlist.songIds
      .map(id => songMap.get(id))
      .filter((s): s is SongRecord => Boolean(s));
  }, []);

  return (
    <PlaylistContext.Provider
      value={{
        playlists,
        activePlaylistId,
        activePlaylist,
        isPlaylistDrawerOpen,
        createPlaylist,
        deletePlaylist,
        updatePlaylist,
        addSongToPlaylist,
        removeSongFromPlaylist,
        toggleSongInPlaylist,
        isSongInPlaylist,
        getPlaylistsContainingSong,
        openPlaylistDrawer,
        closePlaylistDrawer,
        setActivePlaylistId,
        getSongsForPlaylist,
      }}
    >
      {children}
    </PlaylistContext.Provider>
  );
};

export function usePlaylists() {
  const context = useContext(PlaylistContext);
  if (!context) {
    throw new Error('usePlaylists must be used within a PlaylistProvider');
  }
  return context;
}
