import React from 'react';
import { ArrowDown, Disc, Sparkles, Layers, History, Play } from 'lucide-react';
import { storyMetrics } from '../lib/data';
import { usePlayer } from '../context/PlayerContext';
import { mediaManifest } from '../lib/data';

interface HeroProps {
  onStartStory: () => void;
  onExplore: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onStartStory, onExplore }) => {
  const { playTrack } = usePlayer();
  const firstTrack = mediaManifest[0]; // I Want to Hold Your Hand

  return (
    <section id="hero" className="relative min-h-[90vh] flex flex-col justify-between pt-12 pb-16 px-4 sm:px-8 border-b-2 border-[#151515] overflow-hidden bg-[#F2EBDD]">
      {/* Background Subtle Halftone Grid and Record Ring */}
      <div className="absolute inset-0 bg-newsprint-dots opacity-40 pointer-events-none" />
      <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full border border-[#D8D0C2] pointer-events-none" />
      <div className="absolute -top-24 -right-24 w-80 h-80 rounded-full border border-[#D8D0C2] pointer-events-none" />
      <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full border border-[#D8D0C2] pointer-events-none" />

      {/* Top Meta Bar */}
      <div className="max-w-7xl mx-auto w-full flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 font-mono-code text-xs uppercase tracking-widest text-[#7A7267] border-b border-[#D8D0C2] pb-4">
        <div className="flex items-center gap-3">
          <span className="inline-block px-2 py-0.5 bg-[#C43A2F] text-white font-bold text-[10px]">
            ARCHIVAL RESEARCH DOSSIER
          </span>
          <span>PARLOPHONE · APPLE CORPS · 1962–1970</span>
        </div>
        <div className="flex items-center gap-4 text-[11px]">
          <span>RECORD COUNT: {storyMetrics.dataset.songs}</span>
          <span>CORE CATALOGUE: {storyMetrics.dataset.core_timeline_records_1962_1970}</span>
        </div>
      </div>

      {/* Main Hero Typography & Editorial Layout */}
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center py-10 z-10">
        <div className="lg:col-span-7 space-y-6">
          <div className="space-y-2">
            <span className="font-mono-code text-xs sm:text-sm uppercase tracking-widest text-[#C43A2F] font-bold block">
              AN INTERACTIVE DATA INVESTIGATION
            </span>
            <h1 className="font-display text-5xl sm:text-7xl md:text-8xl font-black uppercase tracking-tight text-[#151515] leading-[0.88]">
              EIGHT YEARS<br />
              <span className="text-[#C43A2F]">THAT CHANGED</span><br />
              THE SOUND
            </h1>
          </div>

          <div className="space-y-3">
            <p className="font-display text-2xl sm:text-3xl font-bold uppercase tracking-wide text-[#333]">
              THE BEATLES, 1962–1970 · A DATA STORY IN 213 SONGS
            </p>
            <p className="font-editorial text-base sm:text-lg text-[#444] max-w-xl leading-relaxed">
              Start with four young musicians making concise pop songs and covers in the Liverpool club scene;
              end with four increasingly distinct creative voices using the recording studio itself as part of the composition.
            </p>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              onClick={onStartStory}
              className="flex items-center gap-2 px-6 py-3.5 bg-[#151515] hover:bg-[#C43A2F] text-white font-mono-code text-xs uppercase font-bold tracking-wider print-shadow transition-all group"
            >
              <span>BEGIN THE STORY</span>
              <ArrowDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
            </button>

            <button
              onClick={onExplore}
              className="flex items-center gap-2 px-6 py-3.5 bg-transparent hover:bg-[#EAE1D2] text-[#151515] border-2 border-[#151515] font-mono-code text-xs uppercase font-bold tracking-wider transition-all"
            >
              <span>EXPLORE 213 SONGS</span>
            </button>

            {firstTrack && (
              <button
                onClick={() => playTrack(firstTrack)}
                className="flex items-center gap-2 px-4 py-3 bg-[#EAE1D2] hover:bg-[#DDD2C0] text-[#151515] border border-[#C8C0B2] font-mono-code text-xs uppercase font-bold transition-all"
                title="Play 1964 Breakthrough: I Want to Hold Your Hand"
              >
                <Play className="w-3.5 h-3.5 text-[#C43A2F] fill-current" />
                <span>SAMPLE 1964 SOUND</span>
              </button>
            )}
          </div>
        </div>

        {/* Hero Archival Visual & Sleeve Frame */}
        <div className="lg:col-span-5 flex flex-col items-center">
          <div className="relative w-full max-w-md bg-[#EAE1D2] border-2 border-[#151515] print-shadow p-3 pb-5 transform sm:rotate-1 hover:rotate-0 transition-transform duration-300">
            {/* Record Sleeve Spine Notch */}
            <div className="absolute -top-3 left-6 px-2 py-0.5 bg-[#151515] text-[#F2EBDD] font-mono-code text-[9px] uppercase font-bold">
              PARLOPHONE PMC 1202
            </div>

            {/* Archival Photo from Wikimedia (Dezo Hoffmann 1963) */}
            <div className="relative aspect-4/3 bg-[#151515] overflow-hidden border border-[#151515]">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/4/42/The_Beatles_1963_Dezo_Hoffman_Capitol_Records_press_photo_2.jpg"
                alt="The Beatles 1963 press photograph by Dezo Hoffmann"
                className="w-full h-full object-cover grayscale contrast-125 hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
              <span className="absolute bottom-2 left-2 font-mono-code text-[10px] text-white/90 bg-black/60 px-1.5 py-0.5">
                Liverpool to Abbey Road · 1963
              </span>
            </div>

            {/* Sleeve caption */}
            <div className="mt-3 flex items-center justify-between font-mono-code text-[11px] text-[#555]">
              <span>SIDE A: 1962–1966</span>
              <span className="text-[#C43A2F] font-bold">SIDE B: 1967–1970</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Timeline Ribbon: 1962 -> 1970 */}
      <div className="max-w-7xl mx-auto w-full pt-6 border-t border-[#D8D0C2]">
        <div className="flex items-center justify-between text-xs font-mono-code text-[#7A7267] mb-2">
          <span>1962: "LOVE ME DO"</span>
          <span className="font-bold text-[#151515]">EIGHT-YEAR TIMELINE PROGRESSION</span>
          <span>1970: "LET IT BE"</span>
        </div>
        <div className="grid grid-cols-9 gap-1 h-3 bg-[#E0D7C7] p-0.5 border border-[#C8C0B2]">
          {['1962', '1963', '1964', '1965', '1966', '1967', '1968', '1969', '1970'].map((yr, idx) => (
            <div
              key={yr}
              className={`h-full flex items-center justify-center text-[8px] font-mono-code font-bold transition-colors ${
                idx <= 2
                  ? 'bg-[#151515] text-white'
                  : idx <= 4
                  ? 'bg-[#B48639] text-white'
                  : idx === 5
                  ? 'bg-[#C43A2F] text-white'
                  : 'bg-[#5B824D] text-white'
              }`}
              title={`Year ${yr}`}
            >
              <span className="hidden sm:inline">{yr}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
