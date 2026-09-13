import React, { useState, useRef, useEffect } from 'react';
import { usePlayer } from '../context/PlayerContext';
import { usePlaylists } from '../context/PlaylistContext';
import { AddToPlaylistModal } from './AddToPlaylistModal';
import {
  X,
  ExternalLink,
  Disc3,
  ChevronDown,
  ChevronUp,
  GripHorizontal,
  Volume2,
  SkipBack,
  SkipForward,
  Plus,
  ListMusic,
} from 'lucide-react';

export const ListeningDock: React.FC = () => {
  const {
    currentTrack,
    currentSong,
    isDockOpen,
    closeDock,
    playlistQueue,
    playlistIndex,
    playlistName,
    hasNext,
    hasPrev,
    playNext,
    playPrev,
  } = usePlayer();
  const { openPlaylistDrawer } = usePlaylists();

  // Detect mobile viewport (< 640px)
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth < 640;
    }
    return false;
  });

  // On mobile the youtube player starts in collapsed mode
  const [isMinimized, setIsMinimized] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth < 640;
    }
    return false;
  });
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Position state for dragging (desktop only)
  const [position, setPosition] = useState<{ x: number; y: number } | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const dockRef = useRef<HTMLDivElement>(null);
  const dragOffsetRef = useRef<{ offsetX: number; offsetY: number }>({ offsetX: 0, offsetY: 0 });

  // Whenever a track starts/changes on mobile, start in collapsed mode
  useEffect(() => {
    if (typeof window !== 'undefined' && window.innerWidth < 640) {
      setIsMinimized(true);
    }
  }, [currentTrack?.video_id]);

  // Keep track of mobile viewport resize & clear custom drag coordinates when switching to mobile
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 640;
      setIsMobile(mobile);
      if (mobile) {
        setPosition(null);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Handle Drag Pointer Down on Header / Grip (Desktop only)
  const handlePointerDown = (e: React.PointerEvent) => {
    // On mobile, stick strictly to bottom-center (no free dragging)
    if (isMobile) return;

    // Don't drag if user clicked a button or anchor
    if ((e.target as HTMLElement).closest('button') || (e.target as HTMLElement).closest('a')) {
      return;
    }

    const dock = dockRef.current;
    if (!dock) return;

    const rect = dock.getBoundingClientRect();
    dragOffsetRef.current = {
      offsetX: e.clientX - rect.left,
      offsetY: e.clientY - rect.top,
    };

    if (!position) {
      setPosition({ x: rect.left, y: rect.top });
    }

    setIsDragging(true);
  };

  // Window pointer listeners while dragging (Desktop only)
  useEffect(() => {
    if (!isDragging || isMobile) return;

    const handlePointerMove = (e: PointerEvent) => {
      const dock = dockRef.current;
      const dockWidth = dock?.offsetWidth || 340;
      const dockHeight = dock?.offsetHeight || 240;

      const margin = 8;
      const maxX = Math.max(margin, window.innerWidth - dockWidth - margin);
      const maxY = Math.max(margin, window.innerHeight - dockHeight - margin);

      const rawX = e.clientX - dragOffsetRef.current.offsetX;
      const rawY = e.clientY - dragOffsetRef.current.offsetY;

      const clampedX = Math.max(margin, Math.min(maxX, rawX));
      const clampedY = Math.max(margin, Math.min(maxY, rawY));

      setPosition({ x: clampedX, y: clampedY });
    };

    const handlePointerUp = () => {
      setIsDragging(false);
    };

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);
    window.addEventListener('pointercancel', handlePointerUp);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
      window.removeEventListener('pointercancel', handlePointerUp);
    };
  }, [isDragging, isMobile]);

  // Keep inside viewport on window resize (Desktop only)
  useEffect(() => {
    const handleResize = () => {
      if (isMobile) return;
      setPosition(prev => {
        if (!prev || !dockRef.current) return prev;
        const dockWidth = dockRef.current.offsetWidth;
        const dockHeight = dockRef.current.offsetHeight;
        const margin = 8;
        const maxX = Math.max(margin, window.innerWidth - dockWidth - margin);
        const maxY = Math.max(margin, window.innerHeight - dockHeight - margin);
        return {
          x: Math.max(margin, Math.min(maxX, prev.x)),
          y: Math.max(margin, Math.min(maxY, prev.y)),
        };
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMobile]);

  if (!isDockOpen || !currentTrack) return null;

  return (
    <>
      {/* Invisible global backdrop while actively dragging so iframes don't swallow pointer events */}
      {isDragging && !isMobile && (
        <div className="fixed inset-0 z-50 cursor-grabbing select-none" />
      )}

      <div
        ref={dockRef}
        style={
          !isMobile && position
            ? {
                left: `${position.x}px`,
                top: `${position.y}px`,
                right: 'auto',
                bottom: 'auto',
              }
            : undefined
        }
        className={`fixed z-50 transition-all duration-200 select-none ${
          !isMobile && position
            ? 'w-full max-w-[340px] sm:max-w-sm'
            : 'bottom-2 sm:bottom-4 left-1/2 sm:left-auto -translate-x-1/2 sm:translate-x-0 sm:right-4 w-[calc(100%-1.25rem)] max-w-sm sm:w-full'
        } ${isDragging ? 'opacity-95 shadow-2xl scale-[1.01]' : ''}`}
      >
        <div className="bg-[#18181B] text-[#F4F4F5] border-2 border-[#151515] print-shadow p-3 font-mono-code text-xs max-h-[90vh] overflow-y-auto">
          {/* Draggable Header bar (drag disabled on mobile to stay bottom-center) */}
          <div
            onPointerDown={handlePointerDown}
            className={`flex items-center justify-between pb-2 border-b border-[#3F3F46] select-none ${
              isMobile ? 'cursor-default' : 'cursor-grab active:cursor-grabbing group'
            }`}
            title={isMobile ? 'Listening Dock Player' : 'Drag to reposition player anywhere on screen'}
          >
            <div className="flex items-center gap-2 min-w-0">
              {!isMobile && (
                <GripHorizontal className="w-3.5 h-3.5 text-[#71717A] group-hover:text-[#A1A1AA] transition-colors shrink-0" />
              )}
              <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#C43A2F] animate-pulse shrink-0" />
              <span className="font-display text-xs sm:text-sm tracking-wider uppercase font-bold text-[#F4F4F5] truncate">
                LISTENING DOCK
              </span>
              {isMinimized && (
                <span className="inline-flex items-center gap-1 text-[9px] text-[#A1A1AA] bg-[#27272A] px-1.5 py-0.2 border border-[#3F3F46] shrink-0">
                  <Volume2 className="w-2.5 h-2.5 text-[#C43A2F]" />
                  PLAYING
                </span>
              )}
            </div>

            <div className="flex items-center gap-1">
              {currentSong && (
                <button
                  type="button"
                  onClick={e => {
                    e.stopPropagation();
                    setIsAddModalOpen(true);
                  }}
                  className="p-1 hover:bg-[#27272A] text-[#A1A1AA] hover:text-[#C43A2F] transition-colors"
                  title="Add this track to a playlist"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              )}
              {playlistName && (
                <button
                  type="button"
                  onClick={e => {
                    e.stopPropagation();
                    openPlaylistDrawer();
                  }}
                  className="p-1 hover:bg-[#27272A] text-[#A1A1AA] hover:text-white transition-colors"
                  title="Open Curated Playlists"
                >
                  <ListMusic className="w-3.5 h-3.5" />
                </button>
              )}
              <button
                type="button"
                onClick={e => {
                  e.stopPropagation();
                  setIsMinimized(prev => !prev);
                }}
                className="p-1 hover:bg-[#27272A] text-[#A1A1AA] hover:text-white transition-colors"
                title={isMinimized ? 'Expand player' : 'Minimize player (audio keeps playing)'}
              >
                {isMinimized ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
              </button>
              <button
                type="button"
                onClick={e => {
                  e.stopPropagation();
                  closeDock();
                }}
                className="p-1 hover:bg-[#27272A] text-[#A1A1AA] hover:text-[#C43A2F] transition-colors"
                title="Close player"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Playlist Queue Banner if playing from a queue */}
          {playlistName && playlistQueue.length > 1 && (
            <div className="bg-[#27272A] px-2 py-1 my-1.5 border border-[#3F3F46] flex items-center justify-between text-[10px]">
              <span className="truncate text-[#D4D4D8] font-bold">
                QUEUE: {playlistName} ({playlistIndex + 1}/{playlistQueue.length})
              </span>
              <div className="flex items-center gap-1 shrink-0 ml-2">
                <button
                  type="button"
                  disabled={!hasPrev}
                  onClick={playPrev}
                  className="p-0.5 hover:text-white disabled:opacity-30 transition-opacity"
                  title="Previous track in playlist"
                >
                  <SkipBack className="w-3 h-3" />
                </button>
                <button
                  type="button"
                  disabled={!hasNext}
                  onClick={playNext}
                  className="p-0.5 hover:text-white disabled:opacity-30 transition-opacity"
                  title="Next track in playlist"
                >
                  <SkipForward className="w-3 h-3" />
                </button>
              </div>
            </div>
          )}

          {/* Track Title and Context Header */}
          <div className="py-2">
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0 flex-1">
                <div className="font-editorial text-sm font-bold text-white tracking-wide truncate">
                  {currentTrack.title}
                </div>
                <div className="text-[10px] text-[#A1A1AA] mt-0.5 flex items-center gap-1.5">
                  <span className="px-1.5 py-0.2 bg-[#27272A] text-[#E4E4E7] font-mono-code text-[9px] uppercase border border-[#3F3F46] shrink-0">
                    {currentTrack.era}
                  </span>
                  {currentTrack.version_note && (
                    <span className="truncate">{currentTrack.version_note}</span>
                  )}
                </div>
              </div>
              <Disc3 className="w-5 h-5 text-[#C43A2F] shrink-0 animate-spin" style={{ animationDuration: '4s' }} />
            </div>

            {!isMinimized && currentTrack.story_reason && (
              <p className="text-[10px] text-[#D4D4D8] mt-1.5 italic font-sans leading-tight">
                "{currentTrack.story_reason}"
              </p>
            )}
          </div>

          {/* Embedded YouTube IFrame Player Container
              CRITICAL: When minimized, the iframe is kept mounted in the DOM with 0-size and opacity-0
              so audio playback continues uninterrupted without being restarted! */}
          <div
            className={
              isMinimized
                ? 'w-0 h-0 opacity-0 overflow-hidden absolute pointer-events-none -z-10'
                : 'mt-2 relative rounded overflow-hidden bg-black border border-[#27272A] aspect-video'
            }
          >
            <iframe
              id="youtube-dock-player"
              src={`https://www.youtube-nocookie.com/embed/${currentTrack.video_id}?autoplay=1&enablejsapi=1&rel=0&modestbranding=1`}
              title={`The Beatles - ${currentTrack.title}`}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>

          {/* Footer info & YouTube official link (hidden when minimized to keep footprint tiny) */}
          {!isMinimized && (
            <div className="mt-2 pt-1.5 border-t border-[#27272A] flex items-center justify-between text-[10px] text-[#71717A]">
              <span className="truncate max-w-[170px]">
                {currentTrack.source_channel}
              </span>
              <a
                href={currentTrack.watch_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-[#C43A2F] hover:text-[#E25C51] font-bold uppercase transition-colors shrink-0"
                title="Open official video on YouTube in a new tab"
              >
                <span>OPEN ON YOUTUBE ↗</span>
              </a>
            </div>
          )}

          {/* Minimized Quick Hint */}
          {isMinimized && (
            <div className="pt-1.5 border-t border-[#27272A] flex items-center justify-between text-[9.5px] text-[#71717A]">
              <span className="truncate">
                {isMobile ? 'Audio playing · Tap to watch' : 'Drag to move anywhere'}
              </span>
              <button
                type="button"
                onClick={() => setIsMinimized(false)}
                className="text-[#C43A2F] hover:underline font-bold uppercase shrink-0 flex items-center gap-1 ml-2"
              >
                <span>Expand Video</span>
                <ChevronUp className="w-3 h-3" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Quick Add To Playlist Modal */}
      {currentSong && (
        <AddToPlaylistModal
          song={currentSong}
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
        />
      )}
    </>
  );
};
