import React, { useState } from 'react';
import { allSongs, storyMetrics, ERA_METADATA } from '../lib/data';
import { SongRecord } from '../types';
import { Calendar, Disc, Music, ArrowRight, Play } from 'lucide-react';
import { usePlayer } from '../context/PlayerContext';

interface EightYearRushProps {
  onSelectSong: (song: SongRecord) => void;
}

const YEAR_DETAILS: Record<string, {
  era: 'Early Beatles' | 'Middle Beatles' | 'Psychedelic Beatles' | 'Late Beatles';
  albums: string[];
  milestone: string;
  sonicTransformation: string;
}> = {
  '1962': {
    era: 'Early Beatles',
    albums: ['Singles / Early Sessions'],
    milestone: 'First Parlophone single "Love Me Do" enters UK Top 20.',
    sonicTransformation: 'Raw live skiffle and R&B energy from the Star-Club in Hamburg and Liverpool’s Cavern Club.'
  },
  '1963': {
    era: 'Early Beatles',
    albums: ['Please Please Me', 'With the Beatles'],
    milestone: 'Debut LP recorded in a grueling single 10-hour session at Abbey Road.',
    sonicTransformation: '40% outside covers; energetic two-part harmonies; fast 4/4 beat music captivates Britain.'
  },
  '1964': {
    era: 'Early Beatles',
    albums: ["A Hard Day's Night", 'Beatles for Sale'],
    milestone: 'The Ed Sullivan Show invasion, world stadium tours, global hysteria.',
    sonicTransformation: 'First 100% Lennon-McCartney original LP (A Hard Day’s Night); ringing Rickenbacker 12-string chimes.'
  },
  '1965': {
    era: 'Middle Beatles',
    albums: ['Help!', 'Rubber Soul'],
    milestone: 'Shea Stadium landmark show; Dylan encounter shifts lyrics inward.',
    sonicTransformation: 'Acoustic introspection; George Martin string quartet on "Yesterday"; George introduces the sitar.'
  },
  '1966': {
    era: 'Middle Beatles',
    albums: ['Revolver', 'Past Masters Singles'],
    milestone: 'Candlestick Park marks the final paid live concert; retreat into the studio.',
    sonicTransformation: '0% covers for the first time; backward guitar tape loops, avant-garde collage ("Tomorrow Never Knows").'
  },
  '1967': {
    era: 'Psychedelic Beatles',
    albums: ["Sgt. Pepper's Lonely Hearts Club Band", 'Magical Mystery Tour'],
    milestone: 'Summer of Love; "All You Need Is Love" broadcast live to 400M viewers on Our World.',
    sonicTransformation: 'The studio becomes the instrument: 4-track tape reduction, orchestral free-form rushes, Mellotrons.'
  },
  '1968': {
    era: 'Late Beatles',
    albums: ['The Beatles (White Album)', 'Past Masters Singles'],
    milestone: 'Rishikesh meditation trip; launch of Apple Corps; tensions yield solo-driven tracks.',
    sonicTransformation: 'Radical breadth: acoustic folk, hard rock proto-metal ("Helter Skelter"), music hall, sound collage.'
  },
  '1969': {
    era: 'Late Beatles',
    albums: ['Abbey Road', 'Past Masters Singles'],
    milestone: 'Apple rooftop concert on 30 January; final unified studio project.',
    sonicTransformation: 'Moog synthesizer, solid-state transistor consoles, iconic side-two seamless symphonic medley.'
  },
  '1970': {
    era: 'Late Beatles',
    albums: ['Let It Be'],
    milestone: 'Paul McCartney announces departure; the eight-year recording journey closes.',
    sonicTransformation: 'Stripped-back "Get Back" concept augmented by Phil Spector wall-of-sound strings.'
  }
};

export const EightYearRush: React.FC<EightYearRushProps> = ({ onSelectSong }) => {
  const [selectedYear, setSelectedYear] = useState<string>('1966');
  const { playSong } = usePlayer();

  const years = ['1962', '1963', '1964', '1965', '1966', '1967', '1968', '1969', '1970'];
  const activeYearData = YEAR_DETAILS[selectedYear];
  const yearSongs = allSongs.filter(s => s.timeline_year === parseInt(selectedYear, 10));
  const yearMetrics = storyMetrics.cover_by_year[selectedYear] || { songs: yearSongs.length, covers: 0, cover_share_pct: 0 };
  const eraInfo = ERA_METADATA[activeYearData.era];

  return (
    <section id="eight-year-rush" className="py-20 px-4 sm:px-8 border-b-2 border-[#151515] bg-[#EAE1D2]">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <span className="font-mono-code text-xs uppercase px-2 py-0.5 bg-[#151515] text-white font-bold">
              ACT I · CHAPTER 01
            </span>
            <span className="font-mono-code text-xs uppercase tracking-widest text-[#7A7267]">
              VELOCITY OF CHANGE
            </span>
          </div>
          <h2 className="font-display text-4xl sm:text-6xl font-black uppercase tracking-tight text-[#151515]">
            HOW FAST CAN A BAND CHANGE?
          </h2>
          <p className="font-editorial text-base sm:text-xl text-[#444] max-w-2xl leading-relaxed">
            In eight short years, The Beatles didn’t merely release 213 songs; they re-invented pop music,
            recording techniques, and their own identities nine consecutive times.
          </p>
        </div>

        {/* Interactive Year Scrubber Strip */}
        <div className="space-y-3">
          <div className="flex items-center justify-between font-mono-code text-xs text-[#7A7267]">
            <span>SELECT A YEAR TO EXAMINE THE TRANSFORMATION:</span>
            <span className="font-bold text-[#151515]">ACTIVE: {selectedYear}</span>
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-9 gap-2">
            {years.map(yr => {
              const isSelected = yr === selectedYear;
              const yrEra = YEAR_DETAILS[yr].era;
              return (
                <button
                  key={yr}
                  onClick={() => setSelectedYear(yr)}
                  className={`p-3 text-center border-2 transition-all font-mono-code ${
                    isSelected
                      ? 'bg-[#151515] text-white border-[#151515] print-shadow scale-105 z-10'
                      : 'bg-[#F2EBDD] text-[#151515] border-[#C8C0B2] hover:border-[#151515]'
                  }`}
                >
                  <div className="font-display text-2xl sm:text-3xl font-black leading-none">{yr}</div>
                  <div className="text-[9px] uppercase tracking-wider mt-1 truncate">
                    {yrEra.replace(' Beatles', '')}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Year Spotlight Card */}
        <div className="bg-[#F2EBDD] border-2 border-[#151515] print-shadow p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Big Year & Milestone */}
          <div className="lg:col-span-6 space-y-4">
            <div className="flex items-baseline gap-4">
              <span className="font-display text-6xl sm:text-7xl font-black text-[#C43A2F] leading-none">
                {selectedYear}
              </span>
              <div>
                <span className="font-mono-code text-xs uppercase tracking-widest text-[#7A7267] block">
                  {eraInfo.act}
                </span>
                <span className="font-display text-2xl font-bold uppercase text-[#151515]">
                  {activeYearData.era}
                </span>
              </div>
            </div>

            <div className="p-4 bg-[#E2D8C7] border-l-4 border-[#C43A2F]">
              <span className="font-mono-code text-[11px] uppercase font-bold text-[#766E65] block mb-1">
                HISTORICAL MILESTONE
              </span>
              <p className="font-editorial text-sm sm:text-base text-[#151515] leading-snug font-medium">
                {activeYearData.milestone}
              </p>
            </div>

            <div className="space-y-1">
              <span className="font-mono-code text-[11px] uppercase font-bold text-[#766E65] block">
                SONIC EVOLUTION & STUDIO ADVANCEMENT
              </span>
              <p className="font-sans text-sm text-[#444] leading-relaxed">
                {activeYearData.sonicTransformation}
              </p>
            </div>

            {/* Quick Metrics for This Year */}
            <div className="grid grid-cols-3 gap-2 pt-2 font-mono-code text-xs">
              <div className="p-2.5 bg-[#EAE1D2] border border-[#C8C0B2]">
                <span className="block text-[10px] text-[#7A7267] uppercase">Tracks Recorded</span>
                <span className="font-display text-2xl font-bold text-[#151515]">{yearMetrics.songs}</span>
              </div>
              <div className="p-2.5 bg-[#EAE1D2] border border-[#C8C0B2]">
                <span className="block text-[10px] text-[#7A7267] uppercase">Outside Covers</span>
                <span className="font-display text-2xl font-bold text-[#C43A2F]">{yearMetrics.covers}</span>
              </div>
              <div className="p-2.5 bg-[#EAE1D2] border border-[#C8C0B2]">
                <span className="block text-[10px] text-[#7A7267] uppercase">Cover Share</span>
                <span className="font-display text-2xl font-bold text-[#151515]">{yearMetrics.cover_share_pct}%</span>
              </div>
            </div>
          </div>

          {/* Right Column: Key Album Releases & Sample Songs */}
          <div className="lg:col-span-6 space-y-4">
            <div>
              <span className="font-mono-code text-xs uppercase font-bold text-[#766E65] tracking-wider block mb-2">
                CATALOGUE ALBUMS IN {selectedYear}
              </span>
              <div className="flex flex-wrap gap-2">
                {activeYearData.albums.map((alb, i) => (
                  <span
                    key={i}
                    className="px-3 py-1.5 bg-[#151515] text-[#F2EBDD] font-display text-base font-bold uppercase tracking-wide flex items-center gap-2"
                  >
                    <Disc className="w-4 h-4 text-[#C43A2F]" />
                    <span>{alb}</span>
                  </span>
                ))}
              </div>
            </div>

            <div>
              <span className="font-mono-code text-xs uppercase font-bold text-[#766E65] tracking-wider block mb-2">
                NOTABLE TRACKS RECORDED ({yearSongs.length} TOTAL)
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-64 overflow-y-auto pr-1">
                {yearSongs.slice(0, 8).map(song => (
                  <button
                    key={song.id}
                    onClick={() => onSelectSong(song)}
                    className="p-2 bg-[#EAE1D2] hover:bg-[#DDD2C0] border border-[#C8C0B2] text-left transition-colors flex items-center justify-between group"
                  >
                    <div className="truncate pr-2">
                      <div className="font-display font-bold text-sm text-[#151515] group-hover:text-[#C43A2F] uppercase truncate">
                        {song.title}
                      </div>
                      <div className="font-mono-code text-[10px] text-[#7A7267] truncate">
                        {song.songwriters_raw}
                      </div>
                    </div>
                    {song.is_cover ? (
                      <span className="text-[9px] font-mono-code px-1 bg-[#C43A2F] text-white shrink-0 font-bold uppercase">
                        Cover
                      </span>
                    ) : (
                      <ArrowRight className="w-3.5 h-3.5 text-[#999] group-hover:text-[#151515] shrink-0" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
