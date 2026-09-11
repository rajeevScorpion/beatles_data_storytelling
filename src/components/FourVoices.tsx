import React from 'react';
import { Play, Sparkles, Disc, ArrowRight } from 'lucide-react';
import { usePlayer } from '../context/PlayerContext';
import { mediaManifest, allSongs } from '../lib/data';
import { SongRecord } from '../types';

interface FourVoicesProps {
  onSelectSong: (song: SongRecord) => void;
}

export const FourVoices: React.FC<FourVoicesProps> = ({ onSelectSong }) => {
  const { playTrack } = usePlayer();

  const lateTracks = [
    {
      title: 'While My Guitar Gently Weeps',
      member: 'George Harrison',
      highlight: 'Harrison masterwork featuring Eric Clapton on lead guitar.',
      media: mediaManifest.find(m => m.title === 'While My Guitar Gently Weeps'),
      song: allSongs.find(s => s.title.toLowerCase().includes('while my guitar')),
    },
    {
      title: 'Come Together',
      member: 'John Lennon',
      highlight: 'Abbey Road funk-rock opener with iconic swampy bassline.',
      media: mediaManifest.find(m => m.title === 'Come Together'),
      song: allSongs.find(s => s.title.toLowerCase().includes('come together')),
    },
    {
      title: 'Here Comes the Sun',
      member: 'George Harrison',
      highlight: 'Written in Eric Clapton’s garden; today the band’s most-streamed song worldwide.',
      media: mediaManifest.find(m => m.title === 'Here Comes the Sun'),
      song: allSongs.find(s => s.title.toLowerCase().includes('here comes the sun')),
    },
    {
      title: "Octopus's Garden",
      member: 'Ringo Starr',
      highlight: 'Starr’s joyous aquatic anthem recorded with bubbling straw sound effects.',
      media: mediaManifest.find(m => m.title === "Octopus's Garden"),
      song: allSongs.find(s => s.title.toLowerCase().includes('octopus')),
    },
    {
      title: 'Let It Be',
      member: 'Paul McCartney',
      highlight: 'Gospel-inspired hymn born from a dream of McCartney’s late mother Mary.',
      media: mediaManifest.find(m => m.title === 'Let It Be'),
      song: allSongs.find(s => s.title.toLowerCase().includes('let it be')),
    },
  ];

  return (
    <section id="four-voices" className="py-20 px-4 sm:px-8 border-b-2 border-[#151515] bg-[#F5F3EC]">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header */}
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <span className="font-mono-code text-xs uppercase px-2 py-0.5 bg-[#5B824D] text-white font-bold">
              ACT IV · CHAPTER 10 & 11
            </span>
            <span className="font-mono-code text-xs uppercase tracking-widest text-[#7A7267]">
              1968–1970 MATURE CULMINATION
            </span>
          </div>
          <h2 className="font-display text-4xl sm:text-6xl font-black uppercase tracking-tight text-[#1F201F]">
            FOUR VOICES, ONE BAND
          </h2>
          <p className="font-editorial text-base sm:text-xl text-[#444] max-w-2xl leading-relaxed">
            By 1968, The Beatles were no longer a single unified pop unit; they were four distinct creative titans
            capable of composing masterpieces in isolation, yet elevating each other when gathered at Abbey Road.
          </p>
        </div>

        {/* George Harrison Growth Callout Banner */}
        <div className="bg-[#EAE6DC] border-2 border-[#151515] print-shadow p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#B48639]" />
              <span className="font-mono-code text-xs uppercase font-bold text-[#B48639]">
                THE COMPOSITIONAL BREAKTHROUGH
              </span>
            </div>
            <h3 className="font-display text-3xl font-black uppercase text-[#1F201F]">
              GEORGE HARRISON REACHES PARITY
            </h3>
            <p className="font-editorial text-sm text-[#555] max-w-2xl leading-relaxed">
              Long relegated to one or two songs per album behind Lennon and McCartney, Harrison contributed 15 songs in the Late era,
              culminating in Frank Sinatra famously declaring "Something" the greatest love song of the past fifty years.
            </p>
          </div>

          <div className="shrink-0 p-4 bg-[#F5F3EC] border border-[#D4CFC4] text-center font-mono-code">
            <span className="block text-[10px] text-[#7A7267] uppercase">LATE ERA COMPOSITIONS</span>
            <span className="font-display text-4xl font-black text-[#5B824D]">15 TRACKS</span>
            <span className="block text-[10px] text-[#7A7267] mt-0.5">FROM 1 IN 1963</span>
          </div>
        </div>

        {/* Landmark Late-Era Tracks Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {lateTracks.map((item, idx) => (
            <div
              key={idx}
              className="p-5 bg-[#EAE6DC] border-2 border-[#151515] print-shadow flex flex-col justify-between space-y-4 hover:border-[#5B824D] transition-colors"
            >
              <div>
                <div className="flex items-center justify-between font-mono-code text-[11px] text-[#7A7267] mb-1">
                  <span>{item.member.toUpperCase()}</span>
                  <span className="px-1.5 py-0.5 bg-[#F5F3EC] border border-[#D4CFC4] text-[#1F201F] text-[10px] font-bold">
                    LATE PERIOD
                  </span>
                </div>
                <h4 className="font-display text-2xl font-black uppercase text-[#1F201F]">
                  {item.title}
                </h4>
                <p className="font-editorial text-xs text-[#555] mt-2 leading-relaxed">
                  {item.highlight}
                </p>
              </div>

              <div className="pt-3 border-t border-[#D4CFC4] flex items-center justify-between">
                {item.media && (
                  <button
                    onClick={() => playTrack(item.media!, item.song)}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-[#1F201F] hover:bg-[#5B824D] text-white font-mono-code text-xs uppercase font-bold print-shadow-sm transition-colors"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>PLAY</span>
                  </button>
                )}

                {item.song && (
                  <button
                    onClick={() => onSelectSong(item.song!)}
                    className="font-mono-code text-xs text-[#1F201F] hover:text-[#5B824D] font-bold flex items-center gap-1"
                  >
                    <span>DETAILS</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
