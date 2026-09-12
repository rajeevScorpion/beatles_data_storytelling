import React, { useState } from 'react';
import { motion } from 'motion/react';
import { allSongs, storyMetrics } from '../lib/data';
import { SongRecord, BeatlesMember } from '../types';
import { Users, PenTool, Mic, ChevronRight, Sparkles, Play } from 'lucide-react';
import { usePlayer } from '../context/PlayerContext';

interface AuthorshipStrandsProps {
  onSelectSong: (song: SongRecord) => void;
}

const MEMBERS: { name: BeatlesMember; role: string; bio: string; color: string; accent: string }[] = [
  {
    name: 'John Lennon',
    role: 'Rhythm Guitar, Harmonica, Vocals',
    bio: 'The acerbic, cynical, avant-garde poet behind raw confessionals and psychedelic mind-bends.',
    color: '#151515',
    accent: '#C43A2F',
  },
  {
    name: 'Paul McCartney',
    role: 'Bass, Piano, Guitar, Vocals',
    bio: 'The melodic architect, multi-instrumentalist virtuoso, and craftsman of narrative story-songs.',
    color: '#263238',
    accent: '#315EA8',
  },
  {
    name: 'George Harrison',
    role: 'Lead Guitar, Sitar, Vocals',
    bio: 'The Quiet Beatle whose Indian raga explorations and late masterpieces reached compositional parity.',
    color: '#334C39',
    accent: '#B48639',
  },
  {
    name: 'Ringo Starr',
    role: 'Drums, Percussion, Vocals',
    bio: 'The rhythmic anchor of the band, lending distinctive feel, idiosyncratic humor, and warm everyman lead vocals.',
    color: '#4A3B32',
    accent: '#8C5742',
  },
];

export const AuthorshipStrands: React.FC<AuthorshipStrandsProps> = ({ onSelectSong }) => {
  const [activeMode, setActiveMode] = useState<'written' | 'vocals'>('written');
  const [selectedMember, setSelectedMember] = useState<BeatlesMember>('George Harrison');
  const { playSong } = usePlayer();

  const activeMemberData = MEMBERS.find(m => m.name === selectedMember)!;

  // Filter songs for the selected member
  const memberSongs = allSongs.filter(s =>
    activeMode === 'written'
      ? s.writer_members.includes(selectedMember)
      : s.lead_vocal_members.includes(selectedMember)
  );

  const eras = ['Early Beatles', 'Middle Beatles', 'Psychedelic Beatles', 'Late Beatles'];

  return (
    <section id="authorship" className="py-20 px-4 sm:px-8 border-b-2 border-[#151515] bg-[#EAE1D2]">
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
              ACT I & II · CHAPTER 03
            </span>
            <span className="font-mono-code text-xs uppercase tracking-widest text-[#7A7267]">
              CREATIVE ARCHITECTURE
            </span>
          </div>
          <h2 className="font-display text-4xl sm:text-6xl font-black uppercase tracking-tight text-[#151515]">
            WHO WAS WRITING THE SOUND?
          </h2>
          <p className="font-editorial text-base sm:text-xl text-[#444] max-w-2xl leading-relaxed">
            The Lennon–McCartney partnership began as a collaborative juggernaut, but as the years progressed,
            individual voices emerged—culminating in George Harrison’s stunning late-period songwriting breakthrough.
          </p>
        </motion.div>

        {/* Mode Switcher: Written vs Sung */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 bg-[#F2EBDD] border-2 border-[#151515]"
        >
          <span className="font-mono-code text-xs uppercase font-bold text-[#151515]">
            ANALYZE PERSPECTIVE:
          </span>
          <div className="flex items-center gap-2 font-mono-code text-xs">
            <button
              onClick={() => setActiveMode('written')}
              className={`flex items-center gap-1.5 px-4 py-2 uppercase font-bold transition-all ${
                activeMode === 'written'
                  ? 'bg-[#151515] text-white print-shadow-sm'
                  : 'bg-[#EAE1D2] text-[#555] hover:text-[#151515]'
              }`}
            >
              <PenTool className="w-3.5 h-3.5" />
              <span>WRITTEN BY ({memberSongs.length} Songs)</span>
            </button>
            <button
              onClick={() => setActiveMode('vocals')}
              className={`flex items-center gap-1.5 px-4 py-2 uppercase font-bold transition-all ${
                activeMode === 'vocals'
                  ? 'bg-[#C43A2F] text-white print-shadow-sm'
                  : 'bg-[#EAE1D2] text-[#555] hover:text-[#151515]'
              }`}
            >
              <Mic className="w-3.5 h-3.5" />
              <span>LEAD VOCALS BY</span>
            </button>
          </div>
        </motion.div>

        {/* Four Member Strands Interactive Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {MEMBERS.map((member, index) => {
            const isSelected = member.name === selectedMember;
            const presenceMap =
              activeMode === 'written'
                ? storyMetrics.member_authorship_presence_by_era
                : storyMetrics.lead_vocal_presence_by_era;

            const totalCount = eras.reduce((sum, era) => sum + (presenceMap[era]?.[member.name] || 0), 0);

            return (
              <motion.button
                key={member.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.6,
                  delay: 0.12 + index * 0.07,
                  ease: [0.22, 1, 0.36, 1],
                }}
                onClick={() => setSelectedMember(member.name)}
                className={`p-5 text-left border-2 transition-all flex flex-col justify-between ${
                  isSelected
                    ? 'bg-[#151515] text-white border-[#151515] print-shadow scale-102 z-10'
                    : 'bg-[#F2EBDD] text-[#151515] border-[#C8C0B2] hover:border-[#151515]'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span
                      className={`font-mono-code text-[10px] uppercase font-bold px-1.5 py-0.5 ${
                        isSelected ? 'bg-[#C43A2F] text-white' : 'bg-[#EAE1D2] text-[#555]'
                      }`}
                    >
                      {activeMode === 'written' ? 'COMPOSER' : 'LEAD VOCAL'}
                    </span>
                    <span className="font-display text-2xl font-bold">
                      {totalCount} TRACKS
                    </span>
                  </div>

                  <div className="font-display text-3xl font-black uppercase tracking-tight">
                    {member.name}
                  </div>
                  <p className={`font-mono-code text-[11px] mt-1 ${isSelected ? 'text-[#B8B1A6]' : 'text-[#7A7267]'}`}>
                    {member.role}
                  </p>
                </div>

                {/* Mini Era distribution bars */}
                <div className="mt-6 pt-3 border-t border-current/20 space-y-1 font-mono-code text-[10px]">
                  {eras.map(era => {
                    const count = presenceMap[era]?.[member.name] || 0;
                    return (
                      <div key={era} className="flex items-center justify-between">
                        <span className="opacity-75">{era.replace(' Beatles', '')}:</span>
                        <span className="font-bold">{count}</span>
                      </div>
                    );
                  })}
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* Selected Member Detail & Songs Field */}
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
                <span className="font-mono-code text-xs uppercase text-[#C43A2F] font-bold">
                  {activeMode === 'written' ? 'COMPOSITIONAL DOSSIER' : 'VOCAL DOSSIER'}
                </span>
                {selectedMember === 'George Harrison' && (
                  <span className="px-2 py-0.5 bg-[#B48639] text-white font-mono-code text-[10px] uppercase font-bold flex items-center gap-1">
                    <Sparkles className="w-3 h-3" /> Historic Growth
                  </span>
                )}
              </div>
              <h3 className="font-display text-4xl font-black uppercase text-[#151515] mt-1">
                {selectedMember}: {memberSongs.length} {activeMode === 'written' ? 'WRITING CREDITS' : 'LEAD VOCAL PERFORMANCES'}
              </h3>
              <p className="font-editorial text-sm text-[#555] max-w-2xl mt-1">
                {activeMemberData.bio}
              </p>
            </div>
          </div>

          {/* Song list by era for this member */}
          <div className="space-y-6">
            {eras.map(era => {
              const songsInEra = memberSongs.filter(s => s.era === era);
              if (songsInEra.length === 0) return null;

              return (
                <div key={era} className="space-y-2">
                  <div className="flex items-center justify-between font-mono-code text-xs uppercase font-bold text-[#766E65] border-b border-[#D8D0C2] pb-1">
                    <span>{era} ({songsInEra.length} songs)</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                    {songsInEra.map(song => (
                      <button
                        key={song.id}
                        onClick={() => onSelectSong(song)}
                        className="p-2.5 bg-[#EAE1D2] hover:bg-[#DDD2C0] border border-[#C8C0B2] text-left transition-colors flex items-center justify-between group"
                      >
                        <div className="truncate pr-2">
                          <div className="font-display font-bold text-sm text-[#151515] group-hover:text-[#C43A2F] uppercase truncate">
                            {song.title}
                          </div>
                          <div className="font-mono-code text-[10px] text-[#766E65] truncate">
                            {song.album} ({song.year_raw})
                          </div>
                        </div>
                        <ChevronRight className="w-3.5 h-3.5 text-[#999] group-hover:text-[#151515] shrink-0" />
                      </button>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
