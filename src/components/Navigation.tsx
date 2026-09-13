import React, { useState, useEffect, useRef } from 'react';
import { Disc3, Search, Info, BookOpen, ListMusic, Compass, Menu, X, ArrowRight, Share2 } from 'lucide-react';
import { usePlayer } from '../context/PlayerContext';
import { usePlaylists } from '../context/PlaylistContext';

export type PageRoute = 'story' | 'explore' | 'find-a-word';

interface NavigationProps {
  currentPage: PageRoute;
  onNavigatePage: (page: PageRoute) => void;
  onOpenCredits: () => void;
  onOpenShare: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({
  currentPage,
  onNavigatePage,
  onOpenCredits,
  onOpenShare,
}) => {
  const { currentTrack, isDockOpen, openDock } = usePlayer();
  const { playlists, openPlaylistDrawer } = usePlaylists();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showMobileNav, setShowMobileNav] = useState(true);
  const lastScrollYRef = useRef(0);

  // Mobile scroll direction detection: hide on scroll down, show on scroll towards top
  useEffect(() => {
    lastScrollYRef.current = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const diff = currentScrollY - lastScrollYRef.current;

      // Always show near the very top of the page
      if (currentScrollY <= 45) {
        setShowMobileNav(true);
      } else if (diff > 8) {
        // Scrolling downwards -> hide on mobile if menu is not open
        if (!isMobileMenuOpen) {
          setShowMobileNav(false);
        }
      } else if (diff < -8) {
        // Scrolling towards top -> show on mobile
        setShowMobileNav(true);
      }

      lastScrollYRef.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMobileMenuOpen]);

  const handleLogoClick = () => {
    setIsMobileMenuOpen(false);
    if (currentPage !== 'story') {
      onNavigatePage('story');
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSelectPage = (page: PageRoute) => {
    setIsMobileMenuOpen(false);
    onNavigatePage(page);
  };

  const handleOpenPlaylists = () => {
    setIsMobileMenuOpen(false);
    openPlaylistDrawer();
  };

  const handleOpenCredits = () => {
    setIsMobileMenuOpen(false);
    onOpenCredits();
  };

  const handleOpenShare = () => {
    setIsMobileMenuOpen(false);
    onOpenShare();
  };

  return (
    <header
      className={`sticky top-0 z-40 bg-[#F2EBDD]/95 backdrop-blur-md border-b border-[#C8C0B2] w-full max-w-full transition-transform duration-300 ease-in-out ${
        !showMobileNav && !isMobileMenuOpen
          ? '-translate-y-full md:translate-y-0'
          : 'translate-y-0'
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 px-3 sm:px-6 lg:px-8 py-2.5">
        {/* Logo / Lockup */}
        <button
          onClick={handleLogoClick}
          className="text-left group flex items-center gap-2 sm:gap-2.5 shrink-0 focus:outline-none"
        >
          <div className="w-7 h-7 bg-[#151515] text-[#F2EBDD] flex items-center justify-center font-display font-black text-sm tracking-tight group-hover:bg-[#C43A2F] transition-colors">
            8Y
          </div>
          <div>
            <div className="font-display text-sm sm:text-base font-black uppercase tracking-tight text-[#151515] leading-none whitespace-nowrap">
              THE BEATLES
            </div>
            <div className="font-mono-code text-[8.5px] sm:text-[9px] text-[#8E877C] uppercase tracking-wider whitespace-nowrap">
              1962–1970 · 213 SONGS
            </div>
          </div>
        </button>

        {/* Desktop Primary Page Navigation Bar (≥ md: 768px) */}
        <nav
          aria-label="Primary navigation"
          className="hidden md:flex items-center gap-1.5 font-mono-code text-[11px] uppercase font-bold tracking-wider shrink-0"
        >
          {/* The Story */}
          <button
            type="button"
            onClick={() => handleSelectPage('story')}
            className={`px-3 py-1.5 transition-all flex items-center gap-1.5 border text-left whitespace-nowrap ${
              currentPage === 'story'
                ? 'bg-[#151515] text-white border-[#151515] print-shadow-sm'
                : 'bg-transparent text-[#555] hover:text-[#151515] border-transparent hover:border-[#C8C0B2] hover:bg-[#EAE1D2]'
            }`}
          >
            <Compass className={`w-3.5 h-3.5 ${currentPage === 'story' ? 'text-[#C43A2F]' : 'text-[#777]'}`} />
            <span>STORY</span>
          </button>

          {/* Explore 213 */}
          <button
            type="button"
            onClick={() => handleSelectPage('explore')}
            className={`px-3 py-1.5 transition-all flex items-center gap-1.5 border text-left whitespace-nowrap ${
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
            onClick={() => handleSelectPage('find-a-word')}
            className={`px-3 py-1.5 transition-all flex items-center gap-1.5 border text-left whitespace-nowrap ${
              currentPage === 'find-a-word'
                ? 'bg-[#151515] text-white border-[#151515] print-shadow-sm'
                : 'bg-transparent text-[#555] hover:text-[#151515] border-transparent hover:border-[#C8C0B2] hover:bg-[#EAE1D2]'
            }`}
          >
            <BookOpen className={`w-3.5 h-3.5 ${currentPage === 'find-a-word' ? 'text-[#C43A2F]' : 'text-[#777]'}`} />
            <span>FIND A WORD</span>
          </button>
        </nav>

        {/* Right Utilities (Desktop and Mobile) */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          {/* Listening Dock Launcher (if track playing) */}
          {currentTrack && !isDockOpen && (
            <button
              onClick={openDock}
              className="flex items-center gap-1 px-2 sm:px-2.5 py-1.5 bg-[#C43A2F] text-white font-mono-code text-[10px] sm:text-[11px] uppercase font-bold print-shadow-sm hover:bg-[#A82D23] transition-all animate-bounce"
              title="Open Listening Dock"
            >
              <Disc3 className="w-3.5 h-3.5 animate-spin" />
              <span className="hidden sm:inline">PLAYING</span>
            </button>
          )}

          {/* Playlists Button */}
          <button
            onClick={handleOpenPlaylists}
            className="flex items-center gap-1.5 px-2 sm:px-2.5 py-1.5 bg-[#EAE1D2] hover:bg-[#151515] text-[#151515] hover:text-white border border-[#151515] font-mono-code text-[10px] sm:text-[11px] uppercase font-bold tracking-wider print-shadow-sm transition-all group"
            title="Curated Playlists & Mixtapes"
          >
            <ListMusic className="w-3.5 h-3.5 text-[#C43A2F]" />
            <span className="hidden lg:inline">PLAYLISTS</span>
            <span className="bg-[#151515] group-hover:bg-[#C43A2F] text-white text-[9px] sm:text-[10px] px-1.5 py-0.2 rounded-xs font-bold transition-colors">
              {playlists.length}
            </span>
          </button>

          {/* Credits Button (Desktop) */}
          <button
            onClick={handleOpenCredits}
            className="hidden sm:block p-1.5 border border-[#C8C0B2] hover:border-[#151515] text-[#555] hover:text-[#151515] transition-colors"
            title="Dossier Credits & Sources"
            aria-label="Dossier Credits & Sources"
          >
            <Info className="w-4 h-4" />
          </button>

          {/* Share Button (Desktop & Mobile) */}
          <button
            onClick={handleOpenShare}
            className="flex items-center gap-1.5 px-2 sm:px-2.5 py-1.5 bg-[#EAE1D2] hover:bg-[#C43A2F] text-[#151515] hover:text-white border border-[#151515] font-mono-code text-[10px] sm:text-[11px] uppercase font-bold tracking-wider print-shadow-sm transition-all group"
            title="Share investigation (WhatsApp, Twitter, Link)"
          >
            <Share2 className="w-3.5 h-3.5 text-[#C43A2F] group-hover:text-white transition-colors" />
            <span className="hidden sm:inline">SHARE</span>
          </button>

          {/* Mobile Menu Toggle Button (< md) */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`md:hidden flex items-center gap-1.5 px-2.5 py-1.5 border font-mono-code text-[11px] uppercase font-bold tracking-wider transition-all ${
              isMobileMenuOpen
                ? 'bg-[#151515] text-white border-[#151515] print-shadow-sm'
                : 'bg-[#EAE1D2] text-[#151515] border-[#151515] hover:bg-[#151515] hover:text-white'
            }`}
            aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? (
              <>
                <X className="w-4 h-4 text-[#C43A2F]" />
                <span>CLOSE</span>
              </>
            ) : (
              <>
                <Menu className="w-4 h-4 text-[#C43A2F]" />
                <span>MENU</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Expandable Mobile Navigation Panel */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-[#C8C0B2] bg-[#F6F1E7] animate-in slide-in-from-top-2 duration-200 shadow-xl">
          <div className="p-4 space-y-2 max-w-md mx-auto">
            <div className="font-mono-code text-[10px] uppercase tracking-widest text-[#7A7267] px-1 pb-1">
              ARCHIVE SECTIONS
            </div>

            {/* Story Link */}
            <button
              type="button"
              onClick={() => handleSelectPage('story')}
              className={`w-full p-3 flex items-center justify-between border text-left transition-all ${
                currentPage === 'story'
                  ? 'bg-[#151515] text-white border-[#151515] print-shadow-sm'
                  : 'bg-[#EAE1D2] text-[#151515] border-[#C8C0B2] hover:bg-[#E0D5C3]'
              }`}
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className={`p-2 ${currentPage === 'story' ? 'bg-[#C43A2F] text-white' : 'bg-[#151515] text-white'}`}>
                  <Compass className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-display font-black text-base uppercase tracking-tight leading-none">
                    THE STORY
                  </div>
                  <div className={`font-mono-code text-[10px] mt-0.5 ${currentPage === 'story' ? 'text-[#D8D0C2]' : 'text-[#7A7267]'}`}>
                    8-Year Chronological Evolution (1962–1970)
                  </div>
                </div>
              </div>
              <ArrowRight className={`w-4 h-4 shrink-0 ${currentPage === 'story' ? 'text-[#C43A2F]' : 'text-[#777]'}`} />
            </button>

            {/* Explore 213 Link */}
            <button
              type="button"
              onClick={() => handleSelectPage('explore')}
              className={`w-full p-3 flex items-center justify-between border text-left transition-all ${
                currentPage === 'explore'
                  ? 'bg-[#151515] text-white border-[#151515] print-shadow-sm'
                  : 'bg-[#EAE1D2] text-[#151515] border-[#C8C0B2] hover:bg-[#E0D5C3]'
              }`}
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className={`p-2 ${currentPage === 'explore' ? 'bg-[#C43A2F] text-white' : 'bg-[#151515] text-white'}`}>
                  <Search className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-display font-black text-base uppercase tracking-tight leading-none flex items-center gap-2">
                    <span>EXPLORE 213</span>
                    <span className="font-mono-code text-[9px] px-1.5 py-0.2 bg-[#C43A2F] text-white rounded-xs">
                      CANON
                    </span>
                  </div>
                  <div className={`font-mono-code text-[10px] mt-0.5 ${currentPage === 'explore' ? 'text-[#D8D0C2]' : 'text-[#7A7267]'}`}>
                    Complete 213 Songs Database & Audio Vault
                  </div>
                </div>
              </div>
              <ArrowRight className={`w-4 h-4 shrink-0 ${currentPage === 'explore' ? 'text-[#C43A2F]' : 'text-[#777]'}`} />
            </button>

            {/* Find a Word Link */}
            <button
              type="button"
              onClick={() => handleSelectPage('find-a-word')}
              className={`w-full p-3 flex items-center justify-between border text-left transition-all ${
                currentPage === 'find-a-word'
                  ? 'bg-[#151515] text-white border-[#151515] print-shadow-sm'
                  : 'bg-[#EAE1D2] text-[#151515] border-[#C8C0B2] hover:bg-[#E0D5C3]'
              }`}
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className={`p-2 ${currentPage === 'find-a-word' ? 'bg-[#C43A2F] text-white' : 'bg-[#151515] text-white'}`}>
                  <BookOpen className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-display font-black text-base uppercase tracking-tight leading-none flex items-center gap-2">
                    <span>FIND A WORD</span>
                    <span className="font-mono-code text-[9px] px-1.5 py-0.2 bg-[#151515] text-[#F2EBDD] rounded-xs">
                      47K
                    </span>
                  </div>
                  <div className={`font-mono-code text-[10px] mt-0.5 ${currentPage === 'find-a-word' ? 'text-[#D8D0C2]' : 'text-[#7A7267]'}`}>
                    Concordance & Vocabulary Search Across 213 Songs
                  </div>
                </div>
              </div>
              <ArrowRight className={`w-4 h-4 shrink-0 ${currentPage === 'find-a-word' ? 'text-[#C43A2F]' : 'text-[#777]'}`} />
            </button>

            {/* Mobile Auxiliary Actions */}
            <div className="pt-2 border-t border-[#D8D0C2] space-y-2">
              <button
                type="button"
                onClick={handleOpenShare}
                className="w-full p-2.5 bg-[#C43A2F] hover:bg-[#A82D23] text-white border-2 border-[#151515] flex items-center justify-center gap-2 font-mono-code text-[11px] font-bold uppercase tracking-wider print-shadow-sm transition-all"
              >
                <Share2 className="w-4 h-4" />
                <span>SHARE (WHATSAPP & SOCIAL MEDIA)</span>
              </button>

              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={handleOpenPlaylists}
                  className="p-2.5 bg-[#EAE1D2] border border-[#151515] text-[#151515] flex items-center justify-center gap-2 font-mono-code text-[11px] font-bold uppercase tracking-wider"
                >
                  <ListMusic className="w-3.5 h-3.5 text-[#C43A2F]" />
                  <span>PLAYLISTS ({playlists.length})</span>
                </button>

                <button
                  type="button"
                  onClick={handleOpenCredits}
                  className="p-2.5 bg-[#EAE1D2] border border-[#C8C0B2] text-[#555] hover:text-[#151515] flex items-center justify-center gap-2 font-mono-code text-[11px] font-bold uppercase tracking-wider"
                >
                  <Info className="w-3.5 h-3.5" />
                  <span>CREDITS</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

