import React, { useState, useEffect, useRef } from 'react';
import { ArrowUp, BookOpen, ExternalLink, Disc, Heart, Music } from 'lucide-react';
import { storyMetrics } from '../lib/data';
import { usePlayer } from '../context/PlayerContext';

interface CodaProps {
  onOpenCredits: () => void;
  onScrollToTop: () => void;
}

const START_VISIT_COUNT = 746;
const VISIT_STORAGE_KEY = 'beatles_archive_visit_count';
const START_MUSIC_PLAY_COUNT = 315;

export const Coda: React.FC<CodaProps> = ({ onOpenCredits, onScrollToTop }) => {
  const { musicPlayCount } = usePlayer();

  // Visit counter state (starts at 746, records every visit & repeated visits automatically)
  const [visitCount, setVisitCount] = useState<number>(START_VISIT_COUNT);
  const [displayVisitCount, setDisplayVisitCount] = useState<number>(START_VISIT_COUNT - 6);
  const hasCountedVisitRef = useRef(false);

  // Music played counter state (starts at 315, tracks each track playback)
  const [displayMusicCount, setDisplayMusicCount] = useState<number>(
    () => Math.max(0, (musicPlayCount || START_MUSIC_PLAY_COUNT) - 6)
  );

  // Automatically record visit on every visit, including repeated visits
  useEffect(() => {
    if (hasCountedVisitRef.current) return;
    hasCountedVisitRef.current = true;

    let current = START_VISIT_COUNT;
    try {
      const saved = localStorage.getItem(VISIT_STORAGE_KEY);
      if (saved) {
        const parsed = parseInt(saved, 10);
        if (!isNaN(parsed) && parsed >= START_VISIT_COUNT) {
          // Count repeated visits automatically on every visit
          current = parsed + 1;
        } else {
          current = START_VISIT_COUNT;
        }
      } else {
        current = START_VISIT_COUNT;
      }
      localStorage.setItem(VISIT_STORAGE_KEY, String(current));
    } catch {
      current = START_VISIT_COUNT;
    }

    setVisitCount(current);

    // Mechanical odometer roll-up animation on visit count
    const startNum = Math.max(0, current - 6);
    setDisplayVisitCount(startNum);

    let val = startNum;
    const timer = setInterval(() => {
      val += 1;
      if (val >= current) {
        setDisplayVisitCount(current);
        clearInterval(timer);
      } else {
        setDisplayVisitCount(val);
      }
    }, 80);

    return () => clearInterval(timer);
  }, []);

  // Mechanical odometer roll-up animation on initial load & reactive update for music played counter
  useEffect(() => {
    const target = musicPlayCount || START_MUSIC_PLAY_COUNT;
    const startNum = Math.max(0, target - 6);
    let val = startNum;
    setDisplayMusicCount(startNum);

    const timer = setInterval(() => {
      val += 1;
      if (val >= target) {
        setDisplayMusicCount(target);
        clearInterval(timer);
      } else {
        setDisplayMusicCount(val);
      }
    }, 80);

    return () => clearInterval(timer);
  }, [musicPlayCount]);

  // 5-digit odometer display formats (e.g., "00746" and "00315")
  const formattedVisitDigits = String(displayVisitCount).padStart(5, '0').slice(-5).split('');
  const formattedMusicDigits = String(displayMusicCount).padStart(5, '0').slice(-5).split('');
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

        {/* Studer Tape Console · Archival Telemetry & Counters */}
        <div className="pt-8 border-t border-[#262626] flex flex-col xl:flex-row items-start xl:items-center justify-between gap-6 font-mono-code text-xs text-left w-full">
          <div className="flex flex-col sm:flex-row sm:flex-wrap items-start sm:items-center gap-5 sm:gap-7">
            
            {/* 1. Visit Counter (starts at 746, records automatically on every visit & repeated visits) */}
            <div className="flex items-center gap-2.5">
              <div className="flex items-center gap-1.5">
                <span className="inline-block w-2 h-2 rounded-full bg-[#22C55E] animate-pulse" />
                <span className="text-[#888] uppercase tracking-wider text-[11px] font-bold">
                  VISIT LOG:
                </span>
              </div>
              <div
                role="status"
                className="inline-flex items-center bg-[#0C0C0C] px-1.5 py-1 border border-[#333] rounded-xs shadow-inner select-none"
                aria-label={`Visit counter: ${formattedVisitDigits.join('')}`}
              >
                <div className="flex items-center gap-0.5">
                  {formattedVisitDigits.map((digit, i) => (
                    <div
                      key={i}
                      className="w-5 h-6 bg-[#18181B] border border-[#27272A] text-[#F2EBDD] flex items-center justify-center font-mono-code font-bold text-xs shadow-inner relative overflow-hidden"
                    >
                      {/* Mechanical drum split / shadow effect */}
                      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/50 pointer-events-none" />
                      <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-black/40 pointer-events-none" />
                      <span className="relative z-10 font-bold">{digit}</span>
                    </div>
                  ))}
                </div>
                <span className="ml-1.5 text-[9px] text-[#666] uppercase tracking-widest">
                  VISITS
                </span>
              </div>
            </div>

            {/* Subtle Divider */}
            <span className="hidden sm:inline text-[#333]">|</span>

            {/* 2. Music Played Counter (starts at 315, records each audio track play, 5 digits) */}
            <div className="flex items-center gap-2.5">
              <div className="flex items-center gap-1.5">
                <span className="inline-block w-2 h-2 rounded-full bg-[#C43A2F] animate-pulse" />
                <span className="text-[#888] uppercase tracking-wider text-[11px] font-bold">
                  MUSIC PLAYED:
                </span>
              </div>
              <div
                role="status"
                className="inline-flex items-center bg-[#0C0C0C] px-1.5 py-1 border border-[#333] rounded-xs shadow-inner select-none"
                aria-label={`Music played counter: ${formattedMusicDigits.join('')}`}
              >
                <div className="flex items-center gap-0.5">
                  {formattedMusicDigits.map((digit, i) => (
                    <div
                      key={i}
                      className="w-5 h-6 bg-[#18181B] border border-[#27272A] text-[#F2EBDD] flex items-center justify-center font-mono-code font-bold text-xs shadow-inner relative overflow-hidden"
                    >
                      {/* Mechanical drum split / shadow effect */}
                      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/50 pointer-events-none" />
                      <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-black/40 pointer-events-none" />
                      <span className="relative z-10 font-bold">{digit}</span>
                    </div>
                  ))}
                </div>
                <span className="ml-1.5 text-[9px] text-[#C43A2F] font-bold uppercase tracking-widest">
                  SPINS
                </span>
              </div>
            </div>

          </div>

          <div className="text-[#666] text-[11px] flex items-center gap-2 shrink-0">
            <span>STUDER J37 TELEMETRY</span>
            <span className="text-[#444]">·</span>
            <span className="text-[#888]">ABBEY ROAD ARCHIVES</span>
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
