import React from 'react';
import { Play, Sparkles, Disc, Radio, Sliders, Volume2, ArrowRight } from 'lucide-react';
import { usePlayer } from '../context/PlayerContext';
import { mediaManifest, allSongs } from '../lib/data';
import { SongRecord } from '../types';

interface Studio1967Props {
  onSelectSong: (song: SongRecord) => void;
}

export const Studio1967: React.FC<Studio1967Props> = ({ onSelectSong }) => {
  const { playTrack } = usePlayer();

  const strawberryFieldsMedia = mediaManifest.find(m => m.title === 'Strawberry Fields Forever');
  const dayInTheLifeMedia = mediaManifest.find(m => m.title === 'A Day in the Life');

  const strawberrySong = allSongs.find(s => s.title.toLowerCase().includes('strawberry fields'));
  const dayInTheLifeSong = allSongs.find(s => s.title.toLowerCase().includes('day in the life'));

  return (
    <section id="studio-1967" className="py-24 px-4 sm:px-8 bg-[#151329] text-[#F5F3ED] border-b-2 border-[#151515] relative overflow-hidden">
      {/* Subtle Psychedelic Visual Rings and Gradients */}
      <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-[#C63D85]/15 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 rounded-full bg-[#356AC3]/15 blur-3xl pointer-events-none" />
      <div className="absolute inset-0 bg-newsprint-dots-light opacity-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-16 relative z-10">
        {/* Section Header */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="font-mono-code text-xs uppercase px-2 py-0.5 bg-[#F4E747] text-[#151329] font-black">
              ACT III · CHAPTER 09
            </span>
            <span className="font-mono-code text-xs uppercase tracking-widest text-[#F4E747]/80">
              1967 THE PEAK TRANSFORMATION
            </span>
          </div>
          <h2 className="font-display text-5xl sm:text-7xl md:text-8xl font-black uppercase tracking-tight text-white leading-none">
            THE STUDIO BECOMES<br />
            <span className="text-[#F4E747]">THE INSTRUMENT</span>
          </h2>
          <p className="font-editorial text-lg sm:text-2xl text-[#D8D4E5] max-w-3xl leading-relaxed">
            Unburdened by the need to recreate songs in live concert halls, Abbey Road Studio 2 became a canvas of 
            tape manipulations, pitch-varied overdubs, Mellotrons, and orchestral cataclysms.
          </p>
        </div>

        {/* Dual Playable Landmark Anchors */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Strawberry Fields Forever */}
          {strawberryFieldsMedia && (
            <div className="bg-[#231F42] border-2 border-[#3B3363] p-6 sm:p-8 flex flex-col justify-between space-y-6 print-shadow group hover:border-[#F4E747] transition-all">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-mono-code text-[11px] uppercase tracking-wider text-[#F4E747] font-bold">
                    MAGNUM OPUS 01 · 1967
                  </span>
                  <span className="font-mono-code text-[10px] bg-[#3B3363] text-white px-2 py-0.5">
                    VERIFIED OFFICIAL 2015 MIX
                  </span>
                </div>
                <h3 className="font-display text-3xl sm:text-4xl font-black uppercase text-white">
                  STRAWBERRY FIELDS FOREVER
                </h3>
                <p className="font-editorial text-sm text-[#C4BFD6] leading-relaxed">
                  Recorded in two distinct tempos and keys (A major and C major), George Martin magically matched
                  their speeds with Abbey Road's tape variable-speed oscillator, creating an iconic dreamlike sonic collage.
                </p>
              </div>

              <div className="pt-4 border-t border-[#3B3363] flex items-center justify-between">
                <button
                  onClick={() => playTrack(strawberryFieldsMedia, strawberrySong)}
                  className="flex items-center gap-2 px-5 py-3 bg-[#F4E747] hover:bg-[#FFE066] text-[#151329] font-mono-code text-xs uppercase font-black tracking-wider transition-all"
                >
                  <Play className="w-4 h-4 fill-current" />
                  <span>PLAY NOW</span>
                </button>

                {strawberrySong && (
                  <button
                    onClick={() => onSelectSong(strawberrySong)}
                    className="font-mono-code text-xs text-[#D8D4E5] hover:text-[#F4E747] flex items-center gap-1 font-bold"
                  >
                    <span>SONG DOSSIER</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          )}

          {/* A Day in the Life */}
          {dayInTheLifeMedia && (
            <div className="bg-[#231F42] border-2 border-[#3B3363] p-6 sm:p-8 flex flex-col justify-between space-y-6 print-shadow group hover:border-[#C63D85] transition-all">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-mono-code text-[11px] uppercase tracking-wider text-[#C63D85] font-bold">
                    MAGNUM OPUS 02 · 1967
                  </span>
                  <span className="font-mono-code text-[10px] bg-[#3B3363] text-white px-2 py-0.5">
                    SGT. PEPPER FINALE
                  </span>
                </div>
                <h3 className="font-display text-3xl sm:text-4xl font-black uppercase text-white">
                  A DAY IN THE LIFE
                </h3>
                <p className="font-editorial text-sm text-[#C4BFD6] leading-relaxed">
                  Combining John’s mournful newspaper reading and Paul’s jaunty morning commute via a 40-piece orchestra
                  instructed to ascend from lowest to highest note out of sync, concluding on an unforgettable 40-second E-major piano chord.
                </p>
              </div>

              <div className="pt-4 border-t border-[#3B3363] flex items-center justify-between">
                <button
                  onClick={() => playTrack(dayInTheLifeMedia, dayInTheLifeSong)}
                  className="flex items-center gap-2 px-5 py-3 bg-[#C63D85] hover:bg-[#D44D94] text-white font-mono-code text-xs uppercase font-bold tracking-wider transition-all"
                >
                  <Play className="w-4 h-4 fill-current" />
                  <span>PLAY NOW</span>
                </button>

                {dayInTheLifeSong && (
                  <button
                    onClick={() => onSelectSong(dayInTheLifeSong)}
                    className="font-mono-code text-xs text-[#D8D4E5] hover:text-[#C63D85] flex items-center gap-1 font-bold"
                  >
                    <span>SONG DOSSIER</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          )}
        </div>

        {/* 4 Multi-Track Studio Innovations */}
        <div className="space-y-4">
          <span className="font-mono-code text-xs uppercase font-bold text-[#F4E747] tracking-wider block">
            HOW GEOFF EMERICK & GEORGE MARTIN EXPANDED 4-TRACK TAPE:
          </span>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 font-mono-code text-xs">
            <div className="p-4 bg-[#1E1B38] border border-[#3B3363] space-y-2">
              <span className="font-bold text-[#F4E747] text-sm block">01. TAPE REDUCTION</span>
              <p className="text-[#C4BFD6] text-[11px] leading-relaxed">
                "Bouncing" four recorded tracks down into a single composite track on a second machine to open up three fresh tracks for overdubbing.
              </p>
            </div>
            <div className="p-4 bg-[#1E1B38] border border-[#3B3363] space-y-2">
              <span className="font-bold text-[#C63D85] text-sm block">02. MELLOTRON</span>
              <p className="text-[#C4BFD6] text-[11px] leading-relaxed">
                An electro-mechanical keyboard triggering real physical tape loops of flutes, strings, and brass—immortalized in the opening of "Strawberry Fields".
              </p>
            </div>
            <div className="p-4 bg-[#1E1B38] border border-[#3B3363] space-y-2">
              <span className="font-bold text-[#356AC3] text-sm block">03. CLOSE MIC’ING</span>
              <p className="text-[#C4BFD6] text-[11px] leading-relaxed">
                Geoff Emerick defied strict EMI rulebooks by placing microphones millimeters from drums, acoustic guitars, and cellos for punchy immediacy.
              </p>
            </div>
            <div className="p-4 bg-[#1E1B38] border border-[#3B3363] space-y-2">
              <span className="font-bold text-[#A898D0] text-sm block">04. ADT (DOUBLE TRACKING)</span>
              <p className="text-[#C4BFD6] text-[11px] leading-relaxed">
                Ken Townsend invented Artificial Double Tracking at Abbey Road specifically to save John Lennon from repeatedly re-recording vocal doubles.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
