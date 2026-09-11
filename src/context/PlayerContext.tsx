import React, { createContext, useContext, useState, useCallback } from 'react';
import { MediaManifestItem, SongRecord } from '../types';
import { getMediaForSong } from '../lib/data';

interface PlayerContextType {
  currentTrack: MediaManifestItem | null;
  currentSong: SongRecord | null;
  isPlaying: boolean;
  isDockOpen: boolean;
  playlistQueue: SongRecord[];
  playlistIndex: number;
  playlistName: string | null;
  hasNext: boolean;
  hasPrev: boolean;
  playSong: (song: SongRecord) => void;
  playTrack: (track: MediaManifestItem, song?: SongRecord) => void;
  playPlaylistQueue: (songs: SongRecord[], startIndex?: number, playlistTitle?: string) => void;
  playNext: () => void;
  playPrev: () => void;
  pause: () => void;
  resume: () => void;
  closeDock: () => void;
  openDock: () => void;
  togglePlay: () => void;
}

const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

export const PlayerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentTrack, setCurrentTrack] = useState<MediaManifestItem | null>(null);
  const [currentSong, setCurrentSong] = useState<SongRecord | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isDockOpen, setIsDockOpen] = useState<boolean>(false);
  const [playlistQueue, setPlaylistQueue] = useState<SongRecord[]>([]);
  const [playlistIndex, setPlaylistIndex] = useState<number>(-1);
  const [playlistName, setPlaylistName] = useState<string | null>(null);

  const playSong = useCallback((song: SongRecord) => {
    const media = getMediaForSong(song);
    if (media) {
      setCurrentTrack(media);
      setCurrentSong(song);
      setIsPlaying(true);
      setIsDockOpen(true);
      setPlaylistQueue([song]);
      setPlaylistIndex(0);
      setPlaylistName(null);
    }
  }, []);

  const playTrack = useCallback((track: MediaManifestItem, song?: SongRecord) => {
    setCurrentTrack(track);
    if (song) {
      setCurrentSong(song);
      setPlaylistQueue([song]);
      setPlaylistIndex(0);
    }
    setIsPlaying(true);
    setIsDockOpen(true);
    setPlaylistName(null);
  }, []);

  const playPlaylistQueue = useCallback((songs: SongRecord[], startIndex: number = 0, playlistTitle?: string) => {
    if (!songs.length) return;
    const validIndex = Math.max(0, Math.min(startIndex, songs.length - 1));
    const targetSong = songs[validIndex];
    const media = getMediaForSong(targetSong);
    if (media) {
      setPlaylistQueue(songs);
      setPlaylistIndex(validIndex);
      setPlaylistName(playlistTitle || 'Playlist');
      setCurrentTrack(media);
      setCurrentSong(targetSong);
      setIsPlaying(true);
      setIsDockOpen(true);
    }
  }, []);

  const playNext = useCallback(() => {
    if (playlistIndex >= 0 && playlistIndex < playlistQueue.length - 1) {
      const nextIndex = playlistIndex + 1;
      const nextSong = playlistQueue[nextIndex];
      const media = getMediaForSong(nextSong);
      if (media) {
        setPlaylistIndex(nextIndex);
        setCurrentSong(nextSong);
        setCurrentTrack(media);
        setIsPlaying(true);
      }
    }
  }, [playlistIndex, playlistQueue]);

  const playPrev = useCallback(() => {
    if (playlistIndex > 0) {
      const prevIndex = playlistIndex - 1;
      const prevSong = playlistQueue[prevIndex];
      const media = getMediaForSong(prevSong);
      if (media) {
        setPlaylistIndex(prevIndex);
        setCurrentSong(prevSong);
        setCurrentTrack(media);
        setIsPlaying(true);
      }
    }
  }, [playlistIndex, playlistQueue]);

  const hasNext = playlistIndex >= 0 && playlistIndex < playlistQueue.length - 1;
  const hasPrev = playlistIndex > 0;

  const pause = useCallback(() => {
    setIsPlaying(false);
  }, []);

  const resume = useCallback(() => {
    setIsPlaying(true);
  }, []);

  const togglePlay = useCallback(() => {
    setIsPlaying(prev => !prev);
  }, []);

  const closeDock = useCallback(() => {
    setIsDockOpen(false);
    setIsPlaying(false);
  }, []);

  const openDock = useCallback(() => {
    setIsDockOpen(true);
  }, []);

  return (
    <PlayerContext.Provider
      value={{
        currentTrack,
        currentSong,
        isPlaying,
        isDockOpen,
        playlistQueue,
        playlistIndex,
        playlistName,
        hasNext,
        hasPrev,
        playSong,
        playTrack,
        playPlaylistQueue,
        playNext,
        playPrev,
        pause,
        resume,
        closeDock,
        openDock,
        togglePlay,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
};

export function usePlayer() {
  const context = useContext(PlayerContext);
  if (!context) {
    throw new Error('usePlayer must be used within a PlayerProvider');
  }
  return context;
}
