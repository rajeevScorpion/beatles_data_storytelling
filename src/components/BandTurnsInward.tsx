import React from 'react';
import { motion } from 'motion/react';
import { Play, Disc, ArrowDown, Quote } from 'lucide-react';
import { usePlayer } from '../context/PlayerContext';
import { mediaManifest, allSongs } from '../lib/data';
import { SongRecord } from '../types';

interface BandTurnsInwardProps {
  onSelectSong: (song: SongRecord) => void;
}

export const BandTurnsInward: React.FC<BandTurnsInwardProps> = ({ onSelectSong }) => {
  const { playTrack } = usePlayer();
  const eleanorRigby = mediaManifest.find(m => m.title === 'Eleanor Rigby');
  const eleanorSong = allSongs.find(s => s.title.toLowerCase().includes('eleanor rigby'));

  return (
    <section id="band-turns-inward" className="py-20 px-4 sm:px-8 border-b-2 border-[#151515] bg-[#E8DECB] transition-colors">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="space-y-3"
        >
          <div className="flex items-center gap-3">
            <span className="font-mono-code text-xs uppercase px-2 py-0.5 bg-[#B48639] text-white font-bold">
              ACT II · NARRATIVE INTERLUDE
            </span>
            <span className="font-mono-code text-xs uppercase tracking-widest text-[#766E65]">
              1965–1966 WATERSHED
            </span>
          </div>
          <h2 className="font-display text-4xl sm:text-6xl font-black uppercase tracking-tight text-[#171714]">
            THE BAND TURNS INWARD
          </h2>
          <p className="font-editorial text-base sm:text-xl text-[#444] max-w-2xl leading-relaxed">
            Exhausted by stadiums of screaming fans who drowned out their instruments, The Beatles abandoned the road
            and transformed Abbey Road Studios from a recording room into an artistic sanctuary.
          </p>
        </motion.div>

        {/* Two-Column Editorial Feature */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Historical Press Image */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5"
          >
            <div className="bg-[#DDCFB8] border-2 border-[#171714] print-shadow p-3 space-y-2">
              <div className="relative aspect-4/3 overflow-hidden border border-[#171714] bg-black">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/c/cd/Beatles_press_conference_1965.jpg"
                  alt="The Beatles press conference at Metropolitan Stadium, 21 Aug 1965"
                  className="w-full h-full object-cover grayscale contrast-115 hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="font-mono-code text-[9.5px] sm:text-[10px] text-[#555] flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <span>Metropolitan Stadium, Minnesota · 21 Aug 1965</span>
                <span className="text-[#B48639] font-bold">MINNESOTA HISTORICAL SOCIETY</span>
              </div>
            </div>
          </motion.div>

          {/* Editorial Analysis and Milestone Breakdown */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-7 space-y-6"
          >
            <div className="space-y-3">
              <span className="font-mono-code text-xs uppercase tracking-widest text-[#B48639] font-bold block">
                FROM POP SENSATION TO STUDIO POETS
              </span>
              <h3 className="font-display text-3xl sm:text-4xl font-black uppercase tracking-tight text-[#171714]">
                RUBBER SOUL (1965) → REVOLVER (1966)
              </h3>
              <p className="font-editorial text-base text-[#333] leading-relaxed">
                Between late 1965 and the summer of 1966, the lyrics abandoned simple pronouns (<span className="italic">"She loves you, I want to hold your hand"</span>)
                and plunged into existential loneliness, social alienation, Eastern mysticism, and psychedelic dreamscapes.
              </p>
            </div>

            {/* Three key shifts */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono-code text-xs">
              <div className="p-3 bg-[#DDCFB8] border border-[#C0B5A1]">
                <span className="font-bold text-[#171714] uppercase block text-sm mb-1">01. THE SITAR</span>
                <span className="text-[#555]">
                  George Harrison introduces Indian classical instrumentation on "Norwegian Wood", opening Western pop to world modal music.
                </span>
              </div>
              <div className="p-3 bg-[#DDCFB8] border border-[#C0B5A1]">
                <span className="font-bold text-[#171714] uppercase block text-sm mb-1">02. STRING OCTET</span>
                <span className="text-[#555]">
                  Paul and George Martin record "Eleanor Rigby" without a single rock guitar or drum kit—only eight classical string players.
                </span>
              </div>
              <div className="p-3 bg-[#DDCFB8] border border-[#C0B5A1]">
                <span className="font-bold text-[#171714] uppercase block text-sm mb-1">03. BACKWARD TAPES</span>
                <span className="text-[#555]">
                  Lennon and Emerick invert guitar tracks and tape loops on "Tomorrow Never Knows", producing the first true psychedelic rock manifesto.
                </span>
              </div>
            </div>

            {/* Audio anchor */}
            {eleanorRigby && (
              <div className="p-4 bg-[#F2EBDD] border-2 border-[#171714] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="font-mono-code text-[10px] uppercase font-bold text-[#B48639] block">
                    VERIFIED AUDIO ANCHOR (1966)
                  </span>
                  <div className="font-display text-xl font-bold uppercase text-[#171714]">
                    ELEANOR RIGBY
                  </div>
                  <div className="font-mono-code text-xs text-[#555]">
                    {eleanorRigby.version_note} · Official Artist Channel
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => playTrack(eleanorRigby, eleanorSong)}
                    className="flex items-center gap-2 px-4 py-2.5 bg-[#171714] hover:bg-[#B48639] text-white font-mono-code text-xs uppercase font-bold print-shadow-sm transition-colors"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>LISTEN NOW</span>
                  </button>
                  {eleanorSong && (
                    <button
                      onClick={() => onSelectSong(eleanorSong)}
                      className="px-3 py-2.5 bg-[#DDCFB8] hover:bg-[#C8C0B2] border border-[#171714] font-mono-code text-xs uppercase font-bold text-[#171714]"
                    >
                      VIEW SONG
                    </button>
                  )}
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
