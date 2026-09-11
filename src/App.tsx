import React, { useState, useEffect } from 'react';
import { PlayerProvider } from './context/PlayerContext';
import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { EightYearRush } from './components/EightYearRush';
import { CoversDisappear } from './components/CoversDisappear';
import { AuthorshipStrands } from './components/AuthorshipStrands';
import { BandTurnsInward } from './components/BandTurnsInward';
import { ThemeIslands } from './components/ThemeIslands';
import { LyricLens } from './components/LyricLens';
import { WordCountParadox } from './components/WordCountParadox';
import { GenreUniverse } from './components/GenreUniverse';
import { Studio1967 } from './components/Studio1967';
import { FourVoices } from './components/FourVoices';
import { ExploreLibrary } from './components/ExploreLibrary';
import { Coda } from './components/Coda';
import { SongDrawer } from './components/SongDrawer';
import { CreditsModal } from './components/CreditsModal';
import { ListeningDock } from './components/ListeningDock';
import { SongRecord } from './types';

export const App: React.FC = () => {
  const [selectedSong, setSelectedSong] = useState<SongRecord | null>(null);
  const [highlightQuery, setHighlightQuery] = useState<string>('');
  const [isCreditsOpen, setIsCreditsOpen] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<string>('hero');

  const handleSelectSong = (song: SongRecord) => {
    setHighlightQuery('');
    setSelectedSong(song);
  };

  const handleSelectSongWithQuery = (song: SongRecord, query: string) => {
    setHighlightQuery(query);
    setSelectedSong(song);
  };

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Section Observer to highlight active navigation item
  useEffect(() => {
    const sectionIds = [
      'hero',
      'eight-year-rush',
      'covers-disappear',
      'authorship',
      'band-turns-inward',
      'theme-islands',
      'lyric-lens',
      'word-count-paradox',
      'genre-universe',
      'studio-1967',
      'four-voices',
      'explore-library',
      'coda',
    ];

    const handleScroll = () => {
      const scrollPos = window.scrollY + 200;
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i]);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(sectionIds[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <PlayerProvider>
      <div className="min-h-screen bg-[#F2EBDD] text-[#151515] flex flex-col font-sans selection:bg-[#C43A2F] selection:text-white relative">
        {/* Persistent Sticky Navigation */}
        <Navigation
          onOpenCredits={() => setIsCreditsOpen(true)}
          activeSection={activeSection}
        />

        {/* Narrative Flow */}
        <main className="flex-1">
          <Hero
            onStartStory={() => scrollTo('eight-year-rush')}
            onExplore={() => scrollTo('explore-library')}
          />
          <EightYearRush onSelectSong={handleSelectSong} />
          <CoversDisappear onSelectSong={handleSelectSong} />
          <AuthorshipStrands onSelectSong={handleSelectSong} />
          <BandTurnsInward onSelectSong={handleSelectSong} />
          <ThemeIslands onSelectSong={handleSelectSong} />
          <LyricLens onSelectSongWithQuery={handleSelectSongWithQuery} />
          <WordCountParadox />
          <GenreUniverse onSelectSong={handleSelectSong} />
          <Studio1967 onSelectSong={handleSelectSong} />
          <FourVoices onSelectSong={handleSelectSong} />
          <ExploreLibrary onSelectSong={handleSelectSong} />
          <Coda
            onOpenCredits={() => setIsCreditsOpen(true)}
            onScrollToTop={() => scrollTo('hero')}
          />
        </main>

        {/* Global Drawers, Modals, and Player Dock */}
        <SongDrawer
          song={selectedSong}
          onClose={() => setSelectedSong(null)}
          onSelectSong={handleSelectSong}
          highlightQuery={highlightQuery}
        />

        <CreditsModal
          isOpen={isCreditsOpen}
          onClose={() => setIsCreditsOpen(false)}
        />

        <ListeningDock />
      </div>
    </PlayerProvider>
  );
};

export default App;
