import React from 'react';
import { Disc3, Search, Info, BookOpen, ListMusic, Compass } from 'lucide-react';
import { usePlayer } from '../context/PlayerContext';
import { usePlaylists } from '../context/PlaylistContext';

export type PageRoute = 'story' | 'explore' | 'find-a-word';

interface NavigationProps {
  currentPage: PageRoute;
  onNavigatePage: (page: PageRoute) => void;
  onOpenCredits: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({
  currentPage,
  onNavigatePage,
  onOpenCredits,
}) => {
  const { currentTrack, isDockOpen, openDock } = usePlayer();
  const { playlists, openPlaylistDrawer } = usePlaylists();

  const handleLogoClick = () => {
    if (currentPage !== 'story') {
      onNavigatePage('story');
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-[#F2EBDD]/95 backdrop-blur-md border-b border-[#C8C0B2] px-3 sm:px-6 lg:px-8 py-2.5 transition-colors">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3 sm:gap-4">
        {/* Logo / Lockup */}
        <button
          onClick={handleLogoClick}
          className="text-left group flex items-center gap-2.5 shrink-0 focus:outline-none"
        >
          <div className="w-7 h-7 bg-[#151515] text-[#F2EBDD] flex items-center justify-center font-display font-black text-sm tracking-tight group-hover:bg-[#C43A2F] transition-colors">
            8Y
          </div>
          <div>
            <div className="font-display text-base sm:text-lg font-black uppercase tracking-tight text-[#151515] leading-none">
              THE BEATLES
            </div>
            <div className="font-mono-code text-[9px] text-[#8E877C] uppercase tracking-wider">
              1962–1970 · 213 SONGS
            </div>
          </div>
        </button>

        {/* Primary Page Navigation Bar: Story | Explore 213 | Find a Word */}
        <nav
          aria-label="Primary navigation"
          className="flex items-center gap-1 sm:gap-1.5 font-mono-code text-[11px] uppercase font-bold tracking-wider"
        >
          {/* The Story */}
          <button
            type="button"
            onClick={() => onNavigatePage('story')}
            className={`px-2 sm:px-3 py-1.5 transition-all flex items-center gap-1.5 border text-left ${
              currentPage === 'story'
                ? 'bg-[#151515] text-white border-[#151515] print-shadow-sm'
                : 'bg-transparent text-[#555] hover:text-[#151515] border-transparent hover:border-[#C8C0B2] hover:bg-[#EAE1D2]'
            }`}
          >
            <Compass className={`w-3.5 h-3.5 ${currentPage === 'story' ? 'text-[#C43A2F]' : 'text-[#777]'}`} />
            <span className="hidden xs:inline">STORY</span>
          </button>

          {/* Explore 213 */}
          <button
            type="button"
            onClick={() => onNavigatePage('explore')}
            className={`px-2 sm:px-3 py-1.5 transition-all flex items-center gap-1.5 border text-left ${
              currentPage === 'explore'
                ? 'bg-[#151515] text-white border-[#151515] print-shadow-sm'
                : 'bg-transparent text-[#555] hover:text-[#151515] border-transparent hover:border-[#C8C0B2] hover:bg-[#EAE1D2]'
            }`}
          >
            <Search className={`w-3.5 h-3.5 ${currentPage === 'explore' ? 'text-[#C43A2F]' : 'text-[#777]'}`} />
            <span>EXPLORE 213</span>
          </button>

          {/* Find a Word */}
          <button
            type="button"
            onClick={() => onNavigatePage('find-a-word')}
            className={`px-2 sm:px-3 py-1.5 transition-all flex items-center gap-1.5 border text-left ${
              currentPage === 'find-a-word'
                ? 'bg-[#151515] text-white border-[#151515] print-shadow-sm'
                : 'bg-transparent text-[#555] hover:text-[#151515] border-transparent hover:border-[#C8C0B2] hover:bg-[#EAE1D2]'
            }`}
          >
            <BookOpen className={`w-3.5 h-3.5 ${currentPage === 'find-a-word' ? 'text-[#C43A2F]' : 'text-[#777]'}`} />
            <span>FIND A WORD</span>
          </button>
        </nav>

        {/* Right Utilities: Playlists, Listening Dock & Credits */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          {/* Playlists Button */}
          <button
            onClick={() => openPlaylistDrawer()}
            className="flex items-center gap-1.5 px-2 sm:px-2.5 py-1.5 bg-[#EAE1D2] hover:bg-[#151515] text-[#151515] hover:text-white border border-[#151515] font-mono-code text-[11px] uppercase font-bold tracking-wider print-shadow-sm transition-all group"
            title="Curated Playlists & Mixtapes"
          >
            <ListMusic className="w-3.5 h-3.5 text-[#C43A2F]" />
            <span className="hidden lg:inline">PLAYLISTS</span>
            <span className="bg-[#151515] group-hover:bg-[#C43A2F] text-white text-[10px] px-1.5 py-0.2 rounded-xs font-bold transition-colors">
              {playlists.length}
            </span>
          </button>

          {/* Listening Dock Launcher */}
          {currentTrack && !isDockOpen && (
            <button
              onClick={openDock}
              className="flex items-center gap-1 px-2 sm:px-2.5 py-1.5 bg-[#C43A2F] text-white font-mono-code text-[11px] uppercase font-bold print-shadow-sm hover:bg-[#A82D23] transition-all animate-bounce"
              title="Open Listening Dock"
            >
              <Disc3 className="w-3.5 h-3.5 animate-spin" />
              <span className="hidden sm:inline">PLAYING</span>
            </button>
          )}

          {/* Credits */}
          <button
            onClick={onOpenCredits}
            className="p-1.5 border border-[#C8C0B2] hover:border-[#151515] text-[#555] hover:text-[#151515] transition-colors"
            title="Dossier Credits & Sources"
            aria-label="Dossier Credits & Sources"
          >
            <Info className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
