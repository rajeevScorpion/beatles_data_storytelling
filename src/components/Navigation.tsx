import React from 'react';
import { Disc3, Search, Info, Music } from 'lucide-react';
import { usePlayer } from '../context/PlayerContext';

interface NavigationProps {
  onOpenCredits: () => void;
  activeSection: string;
}

export const Navigation: React.FC<NavigationProps> = ({ onOpenCredits, activeSection }) => {
  const { currentTrack, isDockOpen, openDock } = usePlayer();

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-[#F2EBDD]/95 backdrop-blur-md border-b border-[#C8C0B2] px-4 sm:px-8 py-3 transition-colors">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Logo / Lockup */}
        <button
          onClick={() => scrollTo('hero')}
          className="text-left group flex items-center gap-2.5"
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

        {/* Narrative Act Shortcuts */}
        <nav className="hidden md:flex items-center gap-1 font-mono-code text-[11px] uppercase tracking-wider">
          <button
            onClick={() => scrollTo('eight-year-rush')}
            className={`px-2.5 py-1 transition-colors ${
              activeSection === 'eight-year-rush' ? 'bg-[#151515] text-white font-bold' : 'text-[#555] hover:text-[#151515]'
            }`}
          >
            I. Chronology
          </button>
          <button
            onClick={() => scrollTo('authorship')}
            className={`px-2.5 py-1 transition-colors ${
              activeSection === 'authorship' ? 'bg-[#151515] text-white font-bold' : 'text-[#555] hover:text-[#151515]'
            }`}
          >
            II. Authorship
          </button>
          <button
            onClick={() => scrollTo('theme-islands')}
            className={`px-2.5 py-1 transition-colors ${
              activeSection === 'theme-islands' ? 'bg-[#151515] text-white font-bold' : 'text-[#555] hover:text-[#151515]'
            }`}
          >
            III. Themes & Lyrics
          </button>
          <button
            onClick={() => scrollTo('studio-1967')}
            className={`px-2.5 py-1 transition-colors ${
              activeSection === 'studio-1967' ? 'bg-[#151515] text-white font-bold' : 'text-[#555] hover:text-[#151515]'
            }`}
          >
            IV. 1967 Studio
          </button>
          <button
            onClick={() => scrollTo('four-voices')}
            className={`px-2.5 py-1 transition-colors ${
              activeSection === 'four-voices' ? 'bg-[#151515] text-white font-bold' : 'text-[#555] hover:text-[#151515]'
            }`}
          >
            V. Four Voices
          </button>
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {/* Explore Button */}
          <button
            onClick={() => scrollTo('explore-library')}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-[#151515] hover:bg-[#C43A2F] text-white font-mono-code text-[11px] uppercase font-bold tracking-wider print-shadow-sm transition-all"
          >
            <Search className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">EXPLORE 213</span>
          </button>

          {/* Listening Dock Launcher */}
          {currentTrack && !isDockOpen && (
            <button
              onClick={openDock}
              className="flex items-center gap-1 px-2.5 py-1.5 bg-[#C43A2F] text-white font-mono-code text-[11px] uppercase font-bold print-shadow-sm hover:bg-[#A82D23] transition-all animate-bounce"
              title="Open Listening Dock"
            >
              <Disc3 className="w-3.5 h-3.5 animate-spin" />
              <span className="hidden sm:inline">NOW PLAYING</span>
            </button>
          )}

          {/* Credits */}
          <button
            onClick={onOpenCredits}
            className="p-1.5 border border-[#C8C0B2] hover:border-[#151515] text-[#555] hover:text-[#151515] transition-colors"
            title="Dossier Credits & Sources"
          >
            <Info className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
