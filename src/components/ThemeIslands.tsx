import React, { useState } from 'react';
import { motion } from 'motion/react';
import { allSongs, storyMetrics, getMediaForSong } from '../lib/data';
import { SongRecord } from '../types';
import { Tag, Play, Music, ArrowRight, Sparkles, Filter } from 'lucide-react';
import { usePlayer } from '../context/PlayerContext';

interface ThemeIslandsProps {
  onSelectSong: (song: SongRecord) => void;
}

interface ThemeClusterItem {
  id: string;
  name: string;
  count: number;
  description: string;
  rawTags: string[];
  color: string;
  textColor: string;
}

const THEME_CLUSTERS: ThemeClusterItem[] = [
  {
    id: 'love',
    name: 'IN LOVE & DEVOTION',
    count: 46,
    description: 'Direct romantic infatuation, joyous commitment, and mutual adoration.',
    rawTags: ['In Love', 'Affection/Fondness', 'New Love', 'Romance', 'Passion'],
    color: '#C43A2F',
    textColor: '#FFFFFF',
  },
  {
    id: 'heartache',
    name: 'HEARTACHE & BLUE',
    count: 38,
    description: 'Rejection, painful yearning, romantic estrangement, and melancholy.',
    rawTags: ['Heartache', 'Feeling Blue', 'Yearning', 'Loss/Grief', 'Goodbyes'],
    color: '#315EA8',
    textColor: '#FFFFFF',
  },
  {
    id: 'introspection',
    name: 'INTROSPECTION & MIND',
    count: 27,
    description: 'Looking within, philosophical doubts, spiritual search, and psychological tension.',
    rawTags: ['Introspection', 'Awareness', 'Reflection', 'The Creative Side', 'Affirmation'],
    color: '#67428F',
    textColor: '#FFFFFF',
  },
  {
    id: 'breakup',
    name: 'BREAKUP & FRICTION',
    count: 22,
    description: 'Shattered relationships, jealousy, disillusionment, and walking away.',
    rawTags: ['Breakup', 'Regret', 'Jealousy', 'Friction', 'Conflict'],
    color: '#8C5742',
    textColor: '#FFFFFF',
  },
  {
    id: 'memory',
    name: 'MEMORY & NOSTALGIA',
    count: 19,
    description: 'Looking back to childhood Liverpool, past times, and family lineage.',
    rawTags: ['Reminiscing', 'Biographical', 'Lifecycle', 'Family Gatherings', 'Starting Out'],
    color: '#B48639',
    textColor: '#FFFFFF',
  },
  {
    id: 'play',
    name: 'PLAYFUL & SURREAL',
    count: 16,
    description: 'Nonsense wordplay, nursery rhymes, character sketches, and eccentric comedy.',
    rawTags: ['Playful', 'Mischievous', 'Partying', 'Birthday', 'Cool & Cocky'],
    color: '#334C39',
    textColor: '#FFFFFF',
  },
];

export const ThemeIslands: React.FC<ThemeIslandsProps> = ({ onSelectSong }) => {
  const [selectedClusterId, setSelectedClusterId] = useState<string>('introspection');
  const { playSong } = usePlayer();

  const activeCluster = THEME_CLUSTERS.find(c => c.id === selectedClusterId)!;

  // Filter songs that match any of the rawTags
  const matchingSongs = allSongs.filter(song =>
    song.themes.some(theme => activeCluster.rawTags.includes(theme))
  );

  return (
    <section id="theme-islands" className="py-20 px-4 sm:px-8 border-b-2 border-[#151515] bg-[#F2EBDD]">
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
              ACT II · CHAPTER 05
            </span>
            <span className="font-mono-code text-xs uppercase tracking-widest text-[#7A7267]">
              THEMATIC LANDSCAPE
            </span>
          </div>
          <h2 className="font-display text-4xl sm:text-6xl font-black uppercase tracking-tight text-[#151515]">
            WHAT WERE THE BEATLES SINGING ABOUT?
          </h2>
          <p className="font-editorial text-base sm:text-xl text-[#444] max-w-2xl leading-relaxed">
            The themes mapped across 213 songs reveal an extraordinary journey from teenage crush anthems
            toward deep introspection, surreal narratives, and philosophical reflection.
          </p>
        </motion.div>

        {/* Typographic Theme Islands Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {THEME_CLUSTERS.map((cluster, index) => {
            const isSelected = cluster.id === selectedClusterId;
            return (
              <motion.button
                key={cluster.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.55,
                  delay: 0.1 + index * 0.05,
                  ease: [0.22, 1, 0.36, 1],
                }}
                onClick={() => setSelectedClusterId(cluster.id)}
                className={`p-4 text-left border-2 transition-all flex flex-col justify-between min-h-[140px] ${
                  isSelected
                    ? 'bg-[#151515] text-white border-[#151515] print-shadow scale-102 z-10'
                    : 'bg-[#EAE1D2] text-[#151515] border-[#C8C0B2] hover:border-[#151515]'
                }`}
              >
                <div>
                  <span
                    className="inline-block w-2.5 h-2.5 rounded-full mb-2"
                    style={{ backgroundColor: cluster.color }}
                  />
                  <div className="font-display text-xl sm:text-2xl font-black uppercase leading-tight">
                    {cluster.name}
                  </div>
                </div>

                <div className="mt-4 pt-2 border-t border-current/20 flex items-center justify-between font-mono-code text-[11px]">
                  <span className="opacity-75">SURFACE</span>
                  <span className="font-bold">{cluster.count} SONGS</span>
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* Island Details & Flowing Songs Container */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="bg-[#F6F1E7] border-2 border-[#151515] print-shadow p-6 sm:p-8 space-y-6"
        >
          {/* Active Island Meta Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#D8D0C2]">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: activeCluster.color }}
                />
                <span className="font-mono-code text-xs uppercase font-bold text-[#766E65]">
                  THEMATIC CLUSTER ISLAND
                </span>
              </div>
              <h3 className="font-display text-3xl sm:text-4xl font-black uppercase text-[#151515]">
                {activeCluster.name} ({matchingSongs.length} MATCHING TRACKS)
              </h3>
              <p className="font-editorial text-sm text-[#555] max-w-2xl">
                {activeCluster.description}
              </p>
            </div>

            {/* Related Raw Thematic Tags */}
            <div className="flex flex-wrap gap-1.5 max-w-sm">
              <span className="w-full font-mono-code text-[10px] uppercase tracking-wider text-[#8E877C] mb-1">
                COMPRISING RAW DATA TAGS:
              </span>
              {activeCluster.rawTags.map((tag, i) => (
                <span
                  key={i}
                  className="px-2 py-0.5 bg-[#EAE1D2] border border-[#C8C0B2] font-mono-code text-xs text-[#151515]"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          {/* Songs flowing toward this island */}
          <div>
            <div className="flex items-center justify-between font-mono-code text-xs text-[#766E65] mb-3">
              <span>EXPLORE SONGS CONVERGING ON THIS THEME:</span>
              <span className="font-bold text-[#C43A2F]">TAP ANY SONG TO OPEN LYRIC DOSSIER</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 max-h-96 overflow-y-auto pr-1">
              {matchingSongs.map(song => {
                const media = getMediaForSong(song);
                return (
                  <div
                    key={song.id}
                    className="p-3 bg-[#EAE1D2] hover:bg-[#DDD2C0] border border-[#C8C0B2] flex flex-col justify-between transition-colors group"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <button
                          onClick={() => onSelectSong(song)}
                          className="font-display font-bold text-base text-[#151515] group-hover:text-[#C43A2F] uppercase text-left truncate"
                        >
                          {song.title}
                        </button>
                        {media && (
                          <button
                            onClick={() => playSong(song)}
                            className="p-1 bg-[#151515] hover:bg-[#C43A2F] text-white shrink-0 transition-colors"
                            title="Play verified track"
                          >
                            <Play className="w-3 h-3 fill-current" />
                          </button>
                        )}
                      </div>

                      <div className="font-mono-code text-[10px] text-[#7A7267] mt-1">
                        {song.album} ({song.timeline_year}) · {song.era.replace(' Beatles', '')}
                      </div>
                    </div>

                    <div className="mt-3 pt-2 border-t border-[#C8C0B2]/50 flex items-center justify-between text-[10px] font-mono-code text-[#555]">
                      <span className="truncate max-w-[150px]">
                        {song.themes.join(', ')}
                      </span>
                      <button
                        onClick={() => onSelectSong(song)}
                        className="text-[#151515] hover:text-[#C43A2F] font-bold flex items-center"
                      >
                        LYRICS <ArrowRight className="w-2.5 h-2.5 ml-0.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="p-3 bg-[#EAE1D2] border border-[#C8C0B2] text-[11px] font-mono-code text-[#7A7267] flex items-center justify-between">
            <span>
              Note: 139 of 213 songs (65.3%) carry explicit theme tags in the source dataset. Absence of a tag reflects source boundaries, not lack of poetic meaning.
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
