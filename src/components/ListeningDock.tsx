import React, { useState } from 'react';
import { usePlayer } from '../context/PlayerContext';
import { X, ExternalLink, Disc3, ChevronDown, ChevronUp, Music2 } from 'lucide-react';

export const ListeningDock: React.FC = () => {
  const { currentTrack, currentSong, isDockOpen, closeDock } = usePlayer();
  const [isMinimized, setIsMinimized] = useState(false);

  if (!isDockOpen || !currentTrack) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 max-w-sm w-full transition-all duration-300">
      <div className="bg-[#18181B] text-[#F4F4F5] border-2 border-[#151515] rounded-none print-shadow p-3 font-mono-code text-xs">
        {/* Header bar */}
        <div className="flex items-center justify-between pb-2 border-b border-[#3F3F46]">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#C43A2F] animate-pulse" />
            <span className="font-display text-sm tracking-wider uppercase font-bold text-[#F4F4F5]">
              LISTENING DOCK
            </span>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => setIsMinimized(prev => !prev)}
              className="p-1 hover:bg-[#27272A] text-[#A1A1AA] hover:text-white transition-colors"
              title={isMinimized ? "Expand player" : "Minimize player"}
            >
              {isMinimized ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>
            <button
              onClick={closeDock}
              className="p-1 hover:bg-[#27272A] text-[#A1A1AA] hover:text-[#C43A2F] transition-colors"
              title="Close player"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Track Title and Context */}
        <div className="py-2">
          <div className="flex items-start justify-between gap-2">
            <div>
              <div className="font-editorial text-sm font-bold text-white tracking-wide">
                {currentTrack.title}
              </div>
              <div className="text-[10px] text-[#A1A1AA] mt-0.5 flex items-center gap-1.5">
                <span className="px-1.5 py-0.2 bg-[#27272A] text-[#E4E4E7] font-mono-code text-[9px] uppercase border border-[#3F3F46]">
                  {currentTrack.era}
                </span>
                {currentTrack.version_note && (
                  <span className="truncate max-w-[170px]">{currentTrack.version_note}</span>
                )}
              </div>
            </div>
            <Disc3 className="w-5 h-5 text-[#C43A2F] shrink-0 animate-spin" style={{ animationDuration: '4s' }} />
          </div>

          {currentTrack.story_reason && (
            <p className="text-[10px] text-[#D4D4D8] mt-1.5 italic font-sans leading-tight">
              "{currentTrack.story_reason}"
            </p>
          )}
        </div>

        {/* Embedded YouTube IFrame Player */}
        {!isMinimized && (
          <div className="mt-2 relative rounded overflow-hidden bg-black border border-[#27272A] aspect-video">
            <iframe
              id="youtube-dock-player"
              src={`https://www.youtube-nocookie.com/embed/${currentTrack.video_id}?autoplay=1&enablejsapi=1&rel=0&modestbranding=1`}
              title={`The Beatles - ${currentTrack.title}`}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        )}

        {/* Footer info & YouTube official link */}
        <div className="mt-2 pt-1.5 border-t border-[#27272A] flex items-center justify-between text-[10px] text-[#71717A]">
          <span className="truncate max-w-[190px]">
            {currentTrack.source_channel}
          </span>
          <a
            href={currentTrack.watch_url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-[#C43A2F] hover:text-[#E25C51] font-bold uppercase transition-colors"
            title="Open official video on YouTube in a new tab"
          >
            <span>OPEN ON YOUTUBE ↗</span>
          </a>
        </div>
      </div>
    </div>
  );
};
