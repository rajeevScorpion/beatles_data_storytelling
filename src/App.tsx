import React, { useState, useEffect } from 'react';
import { PlayerProvider } from './context/PlayerContext';
import { PlaylistProvider } from './context/PlaylistContext';
import { Navigation, PageRoute } from './components/Navigation';
import { StoryPage } from './pages/StoryPage';
import { ExplorePage } from './pages/ExplorePage';
import { FindAWordPage } from './pages/FindAWordPage';
import { SongDrawer } from './components/SongDrawer';
import { PlaylistDrawer } from './components/PlaylistDrawer';
import { CreditsModal } from './components/CreditsModal';
import { ListeningDock } from './components/ListeningDock';
import { SongRecord } from './types';

const getInitialPage = (): PageRoute => {
  const hash = window.location.hash.toLowerCase();
  if (hash.includes('explore')) return 'explore';
  if (hash.includes('word') || hash.includes('find')) return 'find-a-word';
  return 'story';
};

export const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<PageRoute>(getInitialPage);
  const [selectedSong, setSelectedSong] = useState<SongRecord | null>(null);
  const [highlightQuery, setHighlightQuery] = useState<string>('');
  const [isCreditsOpen, setIsCreditsOpen] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<string>('eight-year-rush');

  // Handle URL hash changes (back/forward navigation)
  useEffect(() => {
    const handleHashChange = () => {
      setCurrentPage(getInitialPage());
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleNavigatePage = (page: PageRoute) => {
    setCurrentPage(page);
    window.location.hash = page === 'story' ? '' : page;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectSong = (song: SongRecord) => {
    setHighlightQuery('');
    setSelectedSong(song);
  };

  const handleSelectSongWithQuery = (song: SongRecord, query: string) => {
    setHighlightQuery(query);
    setSelectedSong(song);
  };

  const scrollTo = (id: string) => {
    if (currentPage !== 'story') {
      setCurrentPage('story');
      window.location.hash = '';
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  // Section Observer for Story Dot Navigation
  useEffect(() => {
    if (currentPage !== 'story') return;

    const sectionIds = [
      'hero',
      'eight-year-rush',
      'authorship',
      'theme-islands',
      'studio-1967',
      'four-voices',
      'coda',
    ];

    const handleScroll = () => {
      const scrollPos = window.scrollY + 260;
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i]);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(sectionIds[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentPage]);

  return (
    <PlayerProvider>
      <PlaylistProvider>
        <div className="min-h-screen bg-[#F2EBDD] text-[#151515] flex flex-col font-sans selection:bg-[#C43A2F] selection:text-white relative w-full max-w-full overflow-x-clip">
          {/* Persistent Sticky Navigation */}
          <Navigation
            currentPage={currentPage}
            onNavigatePage={handleNavigatePage}
            onOpenCredits={() => setIsCreditsOpen(true)}
          />

          {/* Main Pages */}
          <main className="flex-1 w-full max-w-full overflow-x-clip">
            {currentPage === 'story' && (
              <StoryPage
                activeSection={activeSection}
                onSelectSong={handleSelectSong}
                onNavigatePage={handleNavigatePage}
                onOpenCredits={() => setIsCreditsOpen(true)}
                onScrollToSection={scrollTo}
              />
            )}

            {currentPage === 'explore' && (
              <ExplorePage
                onSelectSong={handleSelectSong}
                onOpenCredits={() => setIsCreditsOpen(true)}
              />
            )}

            {currentPage === 'find-a-word' && (
              <FindAWordPage
                onSelectSongWithQuery={handleSelectSongWithQuery}
                onOpenCredits={() => setIsCreditsOpen(true)}
              />
            )}
          </main>

          {/* Global Drawers, Modals, and Player Dock */}
          <SongDrawer
            song={selectedSong}
            onClose={() => setSelectedSong(null)}
            onSelectSong={handleSelectSong}
            highlightQuery={highlightQuery}
          />

          <PlaylistDrawer
            onSelectSong={handleSelectSong}
          />

          <CreditsModal
            isOpen={isCreditsOpen}
            onClose={() => setIsCreditsOpen(false)}
          />

          <ListeningDock />
        </div>
      </PlaylistProvider>
    </PlayerProvider>
  );
};

export default App;
