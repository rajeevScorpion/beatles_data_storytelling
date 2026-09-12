import React, { useState } from 'react';
import { motion } from 'motion/react';
import { allSongs, storyMetrics } from '../lib/data';
import { SongRecord } from '../types';
import { Disc, Radio, Sparkles, Filter, Music } from 'lucide-react';

interface GenreUniverseProps {
  onSelectSong: (song: SongRecord) => void;
}

const GENRE_FAMILIES = [
  {
    name: 'Pop / Songcraft',
    count: 209,
    description: 'Immaculate melodic architecture, vocal harmonies, and irresistible hooks spanning every year.',
    color: '#C43A2F',
    tags: ['Pop/Rock', 'Baroque Pop', 'Power Pop', 'Sunshine Pop'],
  },
  {
    name: 'Heavy / Blues Rock',
    count: 57,
    description: 'Raw distortion, blues riffs, and proto-metal power exploding especially between 1968 and 1969.',
    color: '#151515',
    tags: ['Hard Rock', 'Blues Rock', 'Proto-Punk', 'Heavy Metal', 'Acid Rock'],
  },
  {
    name: 'Psychedelic / Experimental',
    count: 48,
    description: 'Tape loops, Indian ragas, backward masking, sound collages, and mind-expanding sonic textures.',
    color: '#67428F',
    tags: ['Psychedelic Rock', 'Raga Rock', 'Avant-Garde', 'Experimental Rock', 'Space Rock'],
  },
  {
    name: 'Beat / Rock & Roll',
    count: 48,
    description: 'High-octane 1950s rockabilly, Hamburg skiffle, and infectious British invasion Merseybeat.',
    color: '#B48639',
    tags: ['Rock and Roll', 'Merseybeat', 'Rockabilly', 'Skiffle'],
  },
  {
    name: 'Folk / Country',
    count: 35,
    description: 'Acoustic fingerpicking, Dylan-influenced ballads, Nashville twang, and pastoral melodies.',
    color: '#334C39',
    tags: ['Folk Rock', 'Country', 'Country Rock', 'Psychedelic Folk'],
  },
  {
    name: 'Jazz / Music Hall / Other',
    count: 16,
    description: 'British Vaudeville nostalgia, brass jazz-fusion, children’s lullabies, and chamber orchestration.',
    color: '#315EA8',
    tags: ['Music Hall', 'Jazz', 'Vaudeville Rock', 'Orchestral Pop', 'Lullaby'],
  },
];

export const GenreUniverse: React.FC<GenreUniverseProps> = ({ onSelectSong }) => {
  const [selectedFamilyName, setSelectedFamilyName] = useState<string>('Psychedelic / Experimental');
  const activeFamily = GENRE_FAMILIES.find(f => f.name === selectedFamilyName)!;

  // Filter songs by this genre family
  const familySongs = allSongs.filter(s => s.genre_families.includes(selectedFamilyName));

  return (
    <section id="genre-universe" className="py-20 px-4 sm:px-8 border-b-2 border-[#151515] bg-[#EAE1D2]">
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
            <span className="font-mono-code text-xs uppercase px-2 py-0.5 bg-[#151515] text-white font-bold">
              ACT III · CHAPTER 08
            </span>
            <span className="font-mono-code text-xs uppercase tracking-widest text-[#7A7267]">
              SONIC EXPLOSION
            </span>
          </div>
          <h2 className="font-display text-4xl sm:text-6xl font-black uppercase tracking-tight text-[#151515]">
            HOW MANY WORLDS CAN A POP BAND ENTER?
          </h2>
          <p className="font-editorial text-base sm:text-xl text-[#444] max-w-2xl leading-relaxed">
            Starting from straightforward Merseybeat pop, The Beatles dismantled the boundaries of popular music,
            eventually branching into over 70 distinct stylistic genres.
          </p>
        </motion.div>

        {/* Six Genre Family Orbit Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {GENRE_FAMILIES.map((family, index) => {
            const isSelected = family.name === selectedFamilyName;
            return (
              <motion.button
                key={family.name}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.55,
                  delay: 0.1 + index * 0.06,
                  ease: [0.22, 1, 0.36, 1],
                }}
                onClick={() => setSelectedFamilyName(family.name)}
                className={`p-5 text-left border-2 transition-all flex flex-col justify-between ${
                  isSelected
                    ? 'bg-[#151515] text-white border-[#151515] print-shadow scale-102 z-10'
                    : 'bg-[#F2EBDD] text-[#151515] border-[#C8C0B2] hover:border-[#151515]'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: family.color }}
                    />
                    <span className="font-mono-code text-xs font-bold">
                      {family.count} SONGS
                    </span>
                  </div>
                  <div className="font-display text-2xl font-black uppercase tracking-tight">
                    {family.name}
                  </div>
                  <p className={`font-editorial text-xs mt-1.5 leading-relaxed ${isSelected ? 'text-[#D4D4D8]' : 'text-[#666]'}`}>
                    {family.description}
                  </p>
                </div>

                <div className="mt-4 pt-2 border-t border-current/20 flex flex-wrap gap-1">
                  {family.tags.slice(0, 3).map((tag, idx) => (
                    <span
                      key={idx}
                      className={`text-[9px] font-mono-code px-1.5 py-0.5 border ${
                        isSelected ? 'border-[#3F3F46] text-[#A1A1AA]' : 'border-[#C8C0B2] text-[#7A7267]'
                      }`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* Selected Genre Detail Card */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="bg-[#F2EBDD] border-2 border-[#151515] print-shadow p-6 sm:p-8 space-y-6"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#D8D0C2]">
            <div>
              <div className="flex items-center gap-2">
                <span
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: activeFamily.color }}
                />
                <span className="font-mono-code text-xs uppercase font-bold text-[#7A7267]">
                  GENRE GRAVITY FIELD
                </span>
              </div>
              <h3 className="font-display text-3xl sm:text-4xl font-black uppercase text-[#151515] mt-1">
                {activeFamily.name} ({familySongs.length} SONGS)
              </h3>
            </div>
          </div>

          {/* Songs in this Genre Family */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 max-h-96 overflow-y-auto pr-1">
            {familySongs.map(song => (
              <button
                key={song.id}
                onClick={() => onSelectSong(song)}
                className="p-3 bg-[#EAE1D2] hover:bg-[#DDD2C0] border border-[#C8C0B2] text-left transition-colors flex flex-col justify-between group"
              >
                <div>
                  <div className="font-display font-bold text-sm text-[#151515] group-hover:text-[#C43A2F] uppercase truncate">
                    {song.title}
                  </div>
                  <div className="font-mono-code text-[10px] text-[#7A7267] mt-0.5">
                    {song.album} ({song.timeline_year})
                  </div>
                </div>

                <div className="mt-2 pt-1 border-t border-[#C8C0B2]/60 font-mono-code text-[9px] text-[#555] truncate">
                  {song.genres.slice(0, 2).join(', ')}
                </div>
              </button>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
