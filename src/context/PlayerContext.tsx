import React, { createContext, useContext, useState, useCallback } from 'react';
import { MediaManifestItem, SongRecord } from '../types';
import { getMediaForSong } from '../lib/data';

interface PlayerContextType {
  currentTrack: MediaManifestItem | null;
  currentSong: SongRecord | null;
  isPlaying: boolean;
  isDockOpen: boolean;
  playSong: (song: SongRecord) => void;
  playTrack: (track: MediaManifestItem, song?: SongRecord) => void;
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

  const playSong = useCallback((song: SongRecord) => {
    const media = getMediaForSong(song);
    if (media) {
      setCurrentTrack(media);
      setCurrentSong(song);
      setIsPlaying(true);
      setIsDockOpen(true);
    }
  }, []);

  const playTrack = useCallback((track: MediaManifestItem, song?: SongRecord) => {
    setCurrentTrack(track);
    if (song) setCurrentSong(song);
    setIsPlaying(true);
    setIsDockOpen(true);
  }, []);

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
        playSong,
        playTrack,
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
