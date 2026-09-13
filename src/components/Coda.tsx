import React from 'react';
import { ArrowUp, BookOpen, ExternalLink, Disc, Heart } from 'lucide-react';
import { storyMetrics } from '../lib/data';

interface CodaProps {
  onOpenCredits: () => void;
  onScrollToTop: () => void;
}

export const Coda: React.FC<CodaProps> = ({ onOpenCredits, onScrollToTop }) => {
  return (
    <footer id="coda" className="py-24 px-4 sm:px-8 bg-[#151515] text-[#F2EBDD] relative overflow-hidden">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* The Coda Narrative */}
        <div className="space-y-6 max-w-4xl">
          <div className="flex items-center gap-3">
            <span className="font-mono-code text-xs uppercase px-2 py-0.5 bg-[#C43A2F] text-white font-bold">
              THE CODA
            </span>
            <span className="font-mono-code text-xs uppercase tracking-widest text-[#B8B1A6]">
              30 JANUARY 1969 — 10 APRIL 1970
            </span>
          </div>

          <h2 className="font-display text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight text-white leading-none">
            "I WOULD LIKE TO SAY THANK YOU ON BEHALF OF THE GROUP AND OURSELVES, AND I HOPE WE’VE PASSED THE AUDITION."
          </h2>

          <p className="font-editorial text-lg sm:text-xl text-[#B8B1A6] leading-relaxed">
            Spoken with deadpan wit by John Lennon on the cold windswept roof of 3 Savile Row, those closing words
            marked the final public performance of the four musicians together. In eight whirlwind years, they had
            expanded the vocabulary of the studio, elevated popular songwriting to fine literature, and left 213
            recordings that redefined how humanity experiences recorded music.
          </p>
        </div>

        {/* Research Colophon & Methodology Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-10 border-t border-[#333] font-mono-code text-xs">
          <div className="space-y-2">
            <span className="font-bold text-[#C43A2F] uppercase block text-sm">
              DATASET INTEGRITY
            </span>
            <p className="text-[#A8A093] leading-relaxed text-[11px]">
              213 core catalogue recordings spanning Parlophone and Apple releases from "Love Me Do" (1962) to "Let It Be" (1970).
              Normalized from archival recording session ledgers with strict attribution integrity.
            </p>
          </div>

          <div className="space-y-2">
            <span className="font-bold text-[#C43A2F] uppercase block text-sm">
              METHODOLOGICAL AUDIT
            </span>
            <p className="text-[#A8A093] leading-relaxed text-[11px]">
              Thematic presence audited across 139 explicitly tagged songs. Authorship and lead vocal credits parsed into distinct
              member associations while preserving historical Lennon–McCartney copyright entities.
            </p>
          </div>

          <div className="space-y-2">
            <span className="font-bold text-[#C43A2F] uppercase block text-sm">
              RESEARCH & CREDITS
            </span>
            <p className="text-[#A8A093] leading-relaxed text-[11px]">
              Synthesized from Mark Lewisohn’s <span className="italic">The Complete Beatles Chronicle</span>, Ian MacDonald’s <span className="italic">Revolution in the Head</span>,
              and Abbey Road studio session documents.
            </p>
            <div className="pt-2">
              <button
                onClick={onOpenCredits}
                className="text-white hover:text-[#C43A2F] underline font-bold flex items-center gap-1"
              >
                <span>OPEN COMPLETE RESEARCH DOSSIER</span>
                <ExternalLink className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[#262626] flex flex-col md:flex-row items-start md:items-center justify-between gap-4 font-mono-code text-xs text-[#777] text-left w-full">
          <div className="flex flex-col sm:flex-row sm:flex-wrap items-start sm:items-center gap-2 sm:gap-3 text-left">
            <span className="text-left">EIGHT YEARS THAT CHANGED THE SOUND · THE BEATLES DATA STORY (1962–1970)</span>
            <span className="hidden sm:inline text-[#444]">·</span>
            <div className="flex items-center gap-1.5 text-[#AAA] text-left">
              <span>Created by <strong className="text-white font-medium">Rajeev Kumar</strong></span>
              <span className="text-[#444]">|</span>
              <a
                href="https://www.linkedin.com/in/rajeevkumarux/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-85 transition-opacity inline-flex items-center"
                title="Rajeev Kumar on LinkedIn"
                aria-label="Rajeev Kumar LinkedIn Profile"
              >
                <span className="inline-flex items-center justify-center w-4 h-4 bg-white text-[#151515] font-sans font-bold text-[10px] leading-none rounded-xs tracking-tighter hover:bg-[#C43A2F] hover:text-white transition-colors">
                  in
                </span>
              </a>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-start gap-4 shrink-0 text-left">
            <button
              onClick={onOpenCredits}
              className="text-[#BBB] hover:text-white transition-colors text-left"
            >
              SOURCES & CITATIONS
            </button>

            <button
              onClick={onScrollToTop}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-[#262626] hover:bg-[#333] text-white transition-colors font-bold"
            >
              <span>TOP OF PAGE</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
