import React from 'react';
import { LyricLens } from '../components/LyricLens';
import { WordCountParadox } from '../components/WordCountParadox';
import { Coda } from '../components/Coda';
import { SongRecord } from '../types';
import { BookOpen, Sparkles, Search } from 'lucide-react';
import { storyMetrics } from '../lib/data';

interface FindAWordPageProps {
  onSelectSongWithQuery: (song: SongRecord, query: string) => void;
  onOpenCredits: () => void;
}

export const FindAWordPage: React.FC<FindAWordPageProps> = ({
  onSelectSongWithQuery,
  onOpenCredits,
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#F2EBDD] flex flex-col">
      {/* Page Header */}
      <section className="pt-12 pb-10 px-4 sm:px-8 border-b-2 border-[#151515] bg-[#F2EBDD] relative overflow-hidden">
        <div className="absolute inset-0 bg-newsprint-dots opacity-30 pointer-events-none" />
        <div className="max-w-7xl mx-auto space-y-6 relative z-10">
          <div className="flex flex-wrap items-center gap-3 font-mono-code text-xs uppercase tracking-widest text-[#7A7267]">
            <span className="px-2 py-0.5 bg-[#C43A2F] text-white font-bold">
              PAGE II · LEXICAL ANALYSIS
            </span>
            <span>213 RECORDINGS · 47,820 WORDS</span>
          </div>

          <div className="space-y-3 max-w-4xl">
            <h1 className="font-display text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight text-[#151515] leading-[0.95]">
              FIND A WORD<br />
              <span className="text-[#C43A2F]">IN THE 213 CANON</span>
            </h1>
            <p className="font-editorial text-lg sm:text-xl text-[#444] leading-relaxed">
              Explore how language, pronoun density, and thematic motifs evolved from the direct,
              interpersonal declarations of 1963 (<em>"me"</em>, <em>"you"</em>, <em>"love"</em>) to the surrealist imagery of 1967 and the reflective candor of 1969.
            </p>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 font-mono-code text-xs">
            <div className="p-3 bg-[#EAE1D2] border border-[#C8C0B2]">
              <div className="text-[10px] uppercase text-[#7A7267] font-bold">Total Lyrics Indexed</div>
              <div className="text-xl font-display font-black text-[#151515] mt-1">213 Songs</div>
            </div>
            <div className="p-3 bg-[#EAE1D2] border border-[#C8C0B2]">
              <div className="text-[10px] uppercase text-[#7A7267] font-bold">Peak Word Density</div>
              <div className="text-xl font-display font-black text-[#151515] mt-1">1967 (Sgt. Pepper)</div>
            </div>
            <div className="p-3 bg-[#EAE1D2] border border-[#C8C0B2]">
              <div className="text-[10px] uppercase text-[#7A7267] font-bold">Top Keyword</div>
              <div className="text-xl font-display font-black text-[#C43A2F] mt-1">"LOVE" (613x)</div>
            </div>
            <div className="p-3 bg-[#EAE1D2] border border-[#C8C0B2]">
              <div className="text-[10px] uppercase text-[#7A7267] font-bold">Fastest Track</div>
              <div className="text-xl font-display font-black text-[#151515] mt-1">"Help!" (248 wpm)</div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Interactive Lyric Concordance */}
      <div className="flex-1">
        <LyricLens onSelectSongWithQuery={onSelectSongWithQuery} />
        <WordCountParadox />
      </div>

      {/* Global Persistent Footer */}
      <Coda
        onOpenCredits={onOpenCredits}
        onScrollToTop={scrollToTop}
      />
    </div>
  );
};
