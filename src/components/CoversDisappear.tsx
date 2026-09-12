import React, { useState } from 'react';
import { motion } from 'motion/react';
import { allSongs, storyMetrics } from '../lib/data';
import { SongRecord } from '../types';
import { Disc, Layers, ShieldCheck, ChevronRight, X, Music } from 'lucide-react';

interface CoversDisappearProps {
  onSelectSong: (song: SongRecord) => void;
}

export const CoversDisappear: React.FC<CoversDisappearProps> = ({ onSelectSong }) => {
  const [filterMode, setFilterMode] = useState<'all' | 'originals' | 'covers'>('all');
  const [showCoversModal, setShowCoversModal] = useState(false);

  const coverYears = [
    { year: '1962', total: 4, covers: 0, pct: 0 },
    { year: '1963', total: 30, covers: 12, pct: 40.0 },
    { year: '1964', total: 35, covers: 9, pct: 25.7 },
    { year: '1965', total: 33, covers: 3, pct: 9.1 },
    { year: '1966', total: 19, covers: 0, pct: 0 },
    { year: '1967', total: 25, covers: 0, pct: 0 },
    { year: '1968', total: 34, covers: 0, pct: 0 },
    { year: '1969', total: 30, covers: 1, pct: 3.3 }, // Maggie Mae
    { year: '1970', total: 1, covers: 0, pct: 0 },
  ];

  const allCovers = allSongs.filter(s => s.is_cover);

  return (
    <section id="covers-disappear" className="py-20 px-4 sm:px-8 border-b-2 border-[#151515] bg-[#F2EBDD]">
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
            <span className="font-mono-code text-xs uppercase px-2 py-0.5 bg-[#C43A2F] text-white font-bold">
              ACT I · CHAPTER 02
            </span>
            <span className="font-mono-code text-xs uppercase tracking-widest text-[#7A7267]">
              ORIGINALITY THRESHOLD
            </span>
          </div>
          <h2 className="font-display text-4xl sm:text-6xl font-black uppercase tracking-tight text-[#151515]">
            WHAT HAPPENS WHEN THE COVERS DISAPPEAR?
          </h2>
          <p className="font-editorial text-base sm:text-xl text-[#444] max-w-2xl leading-relaxed">
            In 1963, 40% of their recorded songs were written by American rock & roll and Motown idols.
            By 1966, outside material had completely vanished.
          </p>
        </motion.div>

        {/* Narrative Stats Bar & Interactive Toggle */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 bg-[#EAE1D2] border-2 border-[#151515]"
        >
          <div className="flex items-center gap-6 font-mono-code text-xs">
            <div>
              <span className="text-[#7A7267] block uppercase text-[10px]">TOTAL COVERS</span>
              <span className="font-display text-2xl font-bold text-[#C43A2F]">25 TRACKS</span>
            </div>
            <div className="border-l border-[#C8C0B2] pl-6">
              <span className="text-[#7A7267] block uppercase text-[10px]">ORIGINALS</span>
              <span className="font-display text-2xl font-bold text-[#151515]">188 TRACKS</span>
            </div>
            <div className="border-l border-[#C8C0B2] pl-6">
              <span className="text-[#7A7267] block uppercase text-[10px]">ZERO-COVER YEAR</span>
              <span className="font-display text-2xl font-bold text-[#151515]">1966 (REVOLVER)</span>
            </div>
          </div>

          <button
            onClick={() => setShowCoversModal(true)}
            className="px-4 py-2 bg-[#151515] hover:bg-[#C43A2F] text-white font-mono-code text-xs uppercase font-bold tracking-wider print-shadow-sm transition-colors flex items-center gap-1.5"
          >
            <span>INSPECT ALL 25 COVERS</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </motion.div>

        {/* The Covers Drop-off Chart */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="bg-[#F6F1E7] border-2 border-[#151515] print-shadow p-6 sm:p-8 space-y-8"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="font-display text-2xl font-bold uppercase text-[#151515]">
                COVER SHARE BY YEAR (1962–1970)
              </h3>
              <p className="font-mono-code text-xs text-[#7A7267] mt-0.5">
                Percentage of recorded songs composed by external songwriters
              </p>
            </div>

            {/* View Mode Buttons */}
            <div className="flex items-center gap-1 bg-[#EAE1D2] p-1 border border-[#C8C0B2] font-mono-code text-xs">
              <button
                onClick={() => setFilterMode('all')}
                className={`px-3 py-1 uppercase font-bold transition-colors ${
                  filterMode === 'all' ? 'bg-[#151515] text-white' : 'text-[#555] hover:text-[#151515]'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setFilterMode('originals')}
                className={`px-3 py-1 uppercase font-bold transition-colors ${
                  filterMode === 'originals' ? 'bg-[#151515] text-white' : 'text-[#555] hover:text-[#151515]'
                }`}
              >
                Originals Only
              </button>
              <button
                onClick={() => setFilterMode('covers')}
                className={`px-3 py-1 uppercase font-bold transition-colors ${
                  filterMode === 'covers' ? 'bg-[#C43A2F] text-white' : 'text-[#555] hover:text-[#151515]'
                }`}
              >
                Covers Only
              </button>
            </div>
          </div>

          {/* Bar Visualization */}
          <div className="grid grid-cols-9 gap-1 sm:gap-2 md:gap-4 items-end h-64 pt-6 pb-2 border-b border-[#D8D0C2]">
            {coverYears.map((item, index) => {
              const heightPct = item.pct; // 0 to 40%
              const normalizedHeight = (item.pct / 40) * 100;

              return (
                <div key={item.year} className="h-full flex flex-col justify-end items-center group relative">
                  {/* Tooltip on hover */}
                  <div className="absolute -top-12 opacity-0 group-hover:opacity-100 transition-opacity bg-[#151515] text-white font-mono-code text-[10px] py-1 px-2 pointer-events-none whitespace-nowrap z-20 print-shadow-sm">
                    {item.year}: {item.covers} covers / {item.total} songs ({item.pct}%)
                  </div>

                  {/* Percentage label */}
                  <span className="font-mono-code text-[8.5px] sm:text-[11px] font-bold text-[#151515] mb-1">
                    {item.pct > 0 ? `${item.pct}%` : '0%'}
                  </span>

                  {/* Visual Bar Stack */}
                  <div className="w-full max-w-[48px] h-48 bg-[#EAE1D2] border border-[#C8C0B2] flex flex-col justify-end overflow-hidden">
                    {/* Covers portion with museum rising animation */}
                    <motion.div
                      initial={{ scaleY: 0 }}
                      whileInView={{ scaleY: 1 }}
                      viewport={{ once: true, amount: 0.2 }}
                      transition={{
                        duration: 0.7,
                        delay: 0.2 + index * 0.05,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      style={{
                        transformOrigin: 'bottom',
                        height: `${normalizedHeight}%`,
                      }}
                      className={`w-full transition-colors duration-500 ${
                        filterMode === 'originals'
                          ? 'bg-[#EAE1D2]'
                          : item.covers > 0
                          ? 'bg-[#C43A2F]'
                          : 'bg-transparent'
                      }`}
                    />
                  </div>

                  {/* Year label */}
                  <span className="font-mono-code text-xs font-bold text-[#151515] mt-2">
                    {item.year}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Key Insight Callout */}
          <div className="p-4 bg-[#EAE1D2] border-l-4 border-[#151515] flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-mono-code text-xs">
            <div>
              <span className="font-bold text-[#151515] uppercase block text-sm">
                1966: The Watershed Milestone
              </span>
              <span className="text-[#555]">
                With Revolver, The Beatles ceased touring and ceased recording outside songs completely.
                Every track was now written from within the inner circle.
              </span>
            </div>
            <div className="shrink-0 font-bold text-[#C43A2F]">
              40% → 0% IN 36 MONTHS
            </div>
          </div>
        </motion.div>

        {/* Modal / Overlay of all 25 Covers */}
        {showCoversModal && (
          <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="relative w-full max-w-3xl bg-[#F6F1E7] border-2 border-[#151515] print-shadow p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between pb-4 border-b-2 border-[#151515]">
                <div>
                  <span className="font-mono-code text-xs uppercase tracking-wider text-[#C43A2F] font-bold">
                    THE COMPLETE ROSTER
                  </span>
                  <h3 className="font-display text-3xl font-black uppercase text-[#151515]">
                    ALL 25 RECORDED OUTSIDE COVERS
                  </h3>
                </div>
                <button
                  onClick={() => setShowCoversModal(false)}
                  className="p-1.5 border border-[#151515] hover:bg-[#DDD4C3] transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <p className="font-editorial text-sm text-[#555]">
                These 25 tracks formed the rock & roll spine of the early Hamburg and Cavern Club repertoire before John Lennon and Paul McCartney’s prolific songwriting eclipsed outside material.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {allCovers.map(song => (
                  <button
                    key={song.id}
                    onClick={() => {
                      setShowCoversModal(false);
                      onSelectSong(song);
                    }}
                    className="p-3 bg-[#EFE7D8] hover:bg-[#E5DBC7] border border-[#D8D0C2] text-left transition-colors group flex items-start justify-between"
                  >
                    <div>
                      <div className="font-display text-base font-bold text-[#151515] group-hover:text-[#C43A2F] uppercase">
                        {song.title}
                      </div>
                      <div className="font-mono-code text-[11px] text-[#666] mt-0.5">
                        {song.album} ({song.year_raw})
                      </div>
                      <div className="font-mono-code text-[10px] text-[#888] mt-0.5">
                        Original Writer: {song.songwriters_raw}
                      </div>
                    </div>
                    <span className="font-mono-code text-[9px] px-1.5 py-0.5 bg-[#C43A2F] text-white uppercase font-bold shrink-0">
                      Cover
                    </span>
                  </button>
                ))}
              </div>

              <div className="pt-4 border-t border-[#D8D0C2] flex justify-end">
                <button
                  onClick={() => setShowCoversModal(false)}
                  className="px-4 py-2 bg-[#151515] hover:bg-[#333] text-white font-mono-code text-xs uppercase font-bold"
                >
                  CLOSE
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
