import React from 'react';
import { storyMetrics } from '../lib/data';
import { TrendingDown, Zap, HelpCircle } from 'lucide-react';

export const WordCountParadox: React.FC = () => {
  const eraWordCounts = [
    { era: 'Early Beatles', years: '1962–1964', words: 166.9, act: 'Act I' },
    { era: 'Middle Beatles', years: '1965–1966', words: 185.1, act: 'Act II' },
    { era: 'Psychedelic Beatles', years: '1967', words: 186.6, act: 'Act III' },
    { era: 'Late Beatles', years: '1968–1970', words: 142.7, act: 'Act IV' },
  ];

  return (
    <section id="word-count-paradox" className="py-20 px-4 sm:px-8 border-b-2 border-[#151515] bg-[#F2EBDD]">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header */}
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <span className="font-mono-code text-xs uppercase px-2 py-0.5 bg-[#C43A2F] text-white font-bold">
              ACT II · CHAPTER 07
            </span>
            <span className="font-mono-code text-xs uppercase tracking-widest text-[#7A7267]">
              QUANTITATIVE SURPRISE
            </span>
          </div>
          <h2 className="font-display text-4xl sm:text-6xl font-black uppercase tracking-tight text-[#151515]">
            MORE COMPLEX MUSIC, FEWER WORDS?
          </h2>
          <p className="font-editorial text-base sm:text-xl text-[#444] max-w-2xl leading-relaxed">
            As The Beatles’ musical arrangements grew astronomically in ambition, their lyrical density peaked in 1967—and then plummeted sharply.
          </p>
        </div>

        {/* 4 Large Era Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {eraWordCounts.map((item, idx) => {
            const isLate = item.era === 'Late Beatles';
            const isPeak = item.era === 'Psychedelic Beatles';

            return (
              <div
                key={item.era}
                className={`p-6 border-2 transition-all flex flex-col justify-between ${
                  isLate
                    ? 'bg-[#151515] text-white border-[#151515] print-shadow'
                    : 'bg-[#EAE1D2] text-[#151515] border-[#C8C0B2]'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between font-mono-code text-[11px] mb-2">
                    <span className={isLate ? 'text-[#C43A2F]' : 'text-[#7A7267]'}>{item.act}</span>
                    <span>{item.years}</span>
                  </div>
                  <div className="font-display text-2xl font-bold uppercase tracking-tight">
                    {item.era}
                  </div>
                </div>

                <div className="my-6">
                  <div className="font-display text-5xl sm:text-6xl font-black leading-none">
                    {item.words}
                  </div>
                  <span className="font-mono-code text-xs uppercase tracking-wider block mt-1 opacity-75">
                    AVERAGE WORDS PER TRACK
                  </span>
                </div>

                <div className="pt-3 border-t border-current/20 font-mono-code text-[11px]">
                  {isPeak && (
                    <span className="text-[#C43A2F] font-bold">Lyrical Complexity Peak</span>
                  )}
                  {isLate && (
                    <span className="text-[#5B824D] font-bold">Drop of -43.9 words / track</span>
                  )}
                  {!isPeak && !isLate && (
                    <span className="opacity-75">Steady narrative climb</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Why this happened editorial note */}
        <div className="bg-[#EAE1D2] border-2 border-[#151515] p-6 sm:p-8 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          <div className="md:col-span-8 space-y-3">
            <span className="font-mono-code text-xs uppercase font-bold text-[#C43A2F] block">
              THE EXPLANATION BEHIND THE PARADOX
            </span>
            <h3 className="font-display text-2xl sm:text-3xl font-black uppercase text-[#151515]">
              MUSICAL MASTERY REPLACED VERBOSE EXPOSITION
            </h3>
            <p className="font-editorial text-sm sm:text-base text-[#444] leading-relaxed">
              In their late era (1968–1970), The Beatles favored instrumental spaciousness, heavy guitar riffs, 
              and hypnotic repetition over narrative storytelling. Tracks like John’s <span className="italic font-bold">"I Want You (She's So Heavy)"</span> featured
              nearly five minutes of wordless, crushing blues arpeggios, while Paul’s <span className="italic font-bold">"The End"</span> gave each member
              a legendary extended solo showcase.
            </p>
          </div>

          <div className="md:col-span-4 p-4 bg-[#F2EBDD] border border-[#C8C0B2] font-mono-code text-xs space-y-2">
            <span className="font-bold text-[#151515] uppercase block text-sm">
              KEY CASE STUDY:
            </span>
            <div className="font-display text-lg uppercase font-bold text-[#C43A2F]">
              I WANT YOU (SHE’S SO HEAVY)
            </div>
            <p className="text-[#666] text-[11px]">
              Running 7 minutes and 47 seconds, the track contains just 14 distinct words—yet represents one of the heaviest sonic achievements in rock history.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
