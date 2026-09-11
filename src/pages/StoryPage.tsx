import React from 'react';
import { Hero } from '../components/Hero';
import { EightYearRush } from '../components/EightYearRush';
import { CoversDisappear } from '../components/CoversDisappear';
import { AuthorshipStrands } from '../components/AuthorshipStrands';
import { BandTurnsInward } from '../components/BandTurnsInward';
import { ThemeIslands } from '../components/ThemeIslands';
import { GenreUniverse } from '../components/GenreUniverse';
import { Studio1967 } from '../components/Studio1967';
import { FourVoices } from '../components/FourVoices';
import { Coda } from '../components/Coda';
import { StoryDotNav } from '../components/StoryDotNav';
import { SongRecord } from '../types';
import { PageRoute } from '../components/Navigation';
import { Search, BookOpen, ArrowRight } from 'lucide-react';

interface StoryPageProps {
  activeSection: string;
  onSelectSong: (song: SongRecord) => void;
  onNavigatePage: (page: PageRoute) => void;
  onOpenCredits: () => void;
  onScrollToSection: (id: string) => void;
}

export const StoryPage: React.FC<StoryPageProps> = ({
  activeSection,
  onSelectSong,
  onNavigatePage,
  onOpenCredits,
  onScrollToSection,
}) => {
  return (
    <div className="relative">
      {/* Side Dot Navigation Rail with hover labels */}
      <StoryDotNav
        activeSection={activeSection}
        onNavigate={onScrollToSection}
      />

      {/* Hero Section */}
      <Hero
        onStartStory={() => onScrollToSection('eight-year-rush')}
        onExplore={() => onNavigatePage('explore')}
        onFindAWord={() => onNavigatePage('find-a-word')}
      />

      {/* Narrative Acts */}
      <EightYearRush onSelectSong={onSelectSong} />
      <CoversDisappear onSelectSong={onSelectSong} />
      <AuthorshipStrands onSelectSong={onSelectSong} />
      <BandTurnsInward onSelectSong={onSelectSong} />
      <ThemeIslands onSelectSong={onSelectSong} />
      <GenreUniverse onSelectSong={onSelectSong} />
      <Studio1967 onSelectSong={onSelectSong} />
      <FourVoices onSelectSong={onSelectSong} />

      {/* Deep-Dive Portal Bridge to the Two Dedicated Pages */}
      <section className="py-20 px-4 sm:px-8 bg-[#EAE1D2] border-b-2 border-[#151515]">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <span className="font-mono-code text-xs uppercase px-2 py-0.5 bg-[#151515] text-white font-bold">
                CONTINUE EXPLORING
              </span>
              <span className="font-mono-code text-xs uppercase tracking-widest text-[#7A7267]">
                DEDICATED ARCHIVES
              </span>
            </div>
            <h2 className="font-display text-3xl sm:text-5xl font-black uppercase tracking-tight text-[#151515]">
              GO BEYOND THE NARRATIVE
            </h2>
            <p className="font-editorial text-base sm:text-lg text-[#555] max-w-2xl leading-relaxed">
              The story covers eight years of transformation. Delve directly into the raw records or search every single word spoken and sung.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Card 1: Explore 213 */}
            <div className="bg-[#F2EBDD] border-2 border-[#151515] p-6 sm:p-8 print-shadow space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-10 h-10 bg-[#151515] text-white flex items-center justify-center">
                  <Search className="w-5 h-5 text-[#C43A2F]" />
                </div>
                <h3 className="font-display text-2xl sm:text-3xl font-black uppercase text-[#151515]">
                  THE 213 CANON LEDGER
                </h3>
                <p className="font-editorial text-sm sm:text-base text-[#555]">
                  Access the complete database of all 213 core Beatles recordings. Filter by composition era, primary songwriter, lead vocal credit, album release, and curate custom playlists with audio queues.
                </p>
              </div>
              <button
                type="button"
                onClick={() => onNavigatePage('explore')}
                className="self-start flex items-center gap-2 px-4 py-2.5 bg-[#151515] hover:bg-[#C43A2F] text-white font-mono-code text-xs uppercase font-bold tracking-wider print-shadow-sm transition-all"
              >
                <span>OPEN EXPLORE 213</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Card 2: Find a Word */}
            <div className="bg-[#F2EBDD] border-2 border-[#151515] p-6 sm:p-8 print-shadow space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-10 h-10 bg-[#151515] text-white flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-[#C43A2F]" />
                </div>
                <h3 className="font-display text-2xl sm:text-3xl font-black uppercase text-[#151515]">
                  FIND A WORD IN 213 SONGS
                </h3>
                <p className="font-editorial text-sm sm:text-base text-[#555]">
                  Search across 47,820 words in the Beatles lyrical canon. Inspect keyword frequency across the four musical eras, view full stanza concordances, and examine vocabulary density metrics.
                </p>
              </div>
              <button
                type="button"
                onClick={() => onNavigatePage('find-a-word')}
                className="self-start flex items-center gap-2 px-4 py-2.5 bg-[#151515] hover:bg-[#C43A2F] text-white font-mono-code text-xs uppercase font-bold tracking-wider print-shadow-sm transition-all"
              >
                <span>OPEN FIND A WORD</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Global Persistent Footer */}
      <Coda
        onOpenCredits={onOpenCredits}
        onScrollToTop={() => onScrollToSection('hero')}
      />
    </div>
  );
};
