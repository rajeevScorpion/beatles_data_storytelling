import React from 'react';
import { ExploreLibrary } from '../components/ExploreLibrary';
import { Coda } from '../components/Coda';
import { SongRecord } from '../types';

interface ExplorePageProps {
  onSelectSong: (song: SongRecord) => void;
  onOpenCredits: () => void;
}

export const ExplorePage: React.FC<ExplorePageProps> = ({
  onSelectSong,
  onOpenCredits,
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#EAE1D2] flex flex-col">
      {/* Editorial Header */}
      <section className="pt-12 pb-6 px-4 sm:px-8 bg-[#F2EBDD] border-b-2 border-[#151515] relative overflow-hidden">
        <div className="absolute inset-0 bg-newsprint-dots opacity-30 pointer-events-none" />
        <div className="max-w-7xl mx-auto space-y-4 relative z-10">
          <div className="flex flex-wrap items-center gap-3 font-mono-code text-xs uppercase tracking-widest text-[#7A7267]">
            <span className="px-2 py-0.5 bg-[#151515] text-white font-bold">
              PAGE III · ARCHIVAL CATALOGUE
            </span>
            <span>213 COMPLETE RECORDINGS · 1962–1970</span>
          </div>

          <div className="space-y-2 max-w-4xl">
            <h1 className="font-display text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight text-[#151515] leading-[0.95]">
              THE 213 RECORD<br />
              <span className="text-[#C43A2F]">CANON LEDGER</span>
            </h1>
            <p className="font-editorial text-lg sm:text-xl text-[#444] leading-relaxed">
              Every master recording released during the eight years of The Beatles, normalized with
              primary songwriting credits, vocal attributions, album sessions, and full audio playback.
            </p>
          </div>
        </div>
      </section>

      {/* Main Explore Component */}
      <div className="flex-1">
        <ExploreLibrary onSelectSong={onSelectSong} />
      </div>

      {/* Global Persistent Footer */}
      <Coda
        onOpenCredits={onOpenCredits}
        onScrollToTop={scrollToTop}
      />
    </div>
  );
};
