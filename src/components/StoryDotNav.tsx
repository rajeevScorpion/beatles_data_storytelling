import React, { useState } from 'react';

interface StoryChapter {
  id: string;
  numeral: string;
  label: string;
  sub: string;
}

const CHAPTERS: StoryChapter[] = [
  { id: 'eight-year-rush', numeral: 'I', label: 'Chronology', sub: '1962–1970 Velocity' },
  { id: 'authorship', numeral: 'II', label: 'Authorship', sub: 'Lennon vs. McCartney' },
  { id: 'theme-islands', numeral: 'III', label: 'Themes & Lyrics', sub: 'Lyrical Evolution' },
  { id: 'studio-1967', numeral: 'IV', label: '1967 Studio', sub: 'Abbey Road Revolution' },
  { id: 'four-voices', numeral: 'V', label: 'Four Voices', sub: 'Vocal Attributions' },
];

interface StoryDotNavProps {
  activeSection: string;
  onNavigate: (id: string) => void;
}

export const StoryDotNav: React.FC<StoryDotNavProps> = ({ activeSection, onNavigate }) => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <nav
      aria-label="Story chapter navigation"
      className="fixed right-2 sm:right-6 top-1/2 -translate-y-1/2 z-30 flex flex-col items-center select-none bg-[#F2EBDD]/85 backdrop-blur-sm px-1.5 py-3 rounded-full border border-[#C8C0B2]/60 shadow-md"
    >
      {/* Background connector line */}
      <div className="absolute top-4 bottom-4 w-px bg-[#151515]/20 -z-10" />

      <div className="flex flex-col gap-4 py-1">
        {CHAPTERS.map(chapter => {
          const isActive = activeSection === chapter.id;
          const isHovered = hoveredId === chapter.id;

          return (
            <div
              key={chapter.id}
              className="relative flex items-center justify-center group"
              onMouseEnter={() => setHoveredId(chapter.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              {/* Tooltip on hover */}
              <div
                className={`absolute right-7 pointer-events-none transition-all duration-200 flex items-center ${
                  isHovered
                    ? 'opacity-100 translate-x-0'
                    : 'opacity-0 translate-x-2'
                }`}
              >
                <div className="bg-[#151515] text-[#F2EBDD] px-3 py-1.5 border border-[#333] shadow-xl flex items-center gap-2 whitespace-nowrap">
                  <span className="font-mono-code text-[11px] font-bold text-[#C43A2F]">
                    {chapter.numeral}.
                  </span>
                  <div className="text-left">
                    <div className="font-mono-code text-xs font-bold uppercase tracking-wider text-white">
                      {chapter.label}
                    </div>
                    <div className="font-mono-code text-[9px] text-[#A8A093] uppercase">
                      {chapter.sub}
                    </div>
                  </div>
                  {/* Arrow pointer */}
                  <div className="w-1.5 h-1.5 bg-[#151515] border-r border-t border-[#333] rotate-45 absolute -right-1 top-1/2 -translate-y-1/2" />
                </div>
              </div>

              {/* Clickable Dot */}
              <button
                type="button"
                onClick={() => onNavigate(chapter.id)}
                aria-label={`Scroll to Chapter ${chapter.numeral}: ${chapter.label}`}
                className="p-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C43A2F]"
              >
                <div
                  className={`transition-all duration-300 rounded-full ${
                    isActive
                      ? 'w-3.5 h-3.5 bg-[#C43A2F] ring-4 ring-[#C43A2F]/25 shadow-sm scale-110'
                      : 'w-2.5 h-2.5 bg-[#151515]/30 hover:bg-[#151515] hover:scale-125 border border-[#151515]/40'
                  }`}
                />
              </button>
            </div>
          );
        })}
      </div>
    </nav>
  );
};
