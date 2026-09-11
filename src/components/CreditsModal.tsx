import React from 'react';
import { X, ExternalLink, ShieldCheck, BookOpen, Music, Image as ImageIcon } from 'lucide-react';
import { sourceManifest, imageManifest, storyMetrics } from '../lib/data';

interface CreditsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CreditsModal: React.FC<CreditsModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="relative w-full max-w-2xl bg-[#F6F1E7] border-2 border-[#151515] print-shadow p-6 sm:p-8 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b-2 border-[#151515]">
          <div>
            <span className="font-mono-code text-xs uppercase tracking-widest text-[#C43A2F] font-bold">
              DOSSIER SOURCES & CREDITS
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-black uppercase tracking-tight text-[#151515]">
              RESEARCH & PROVENANCE
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 border border-[#151515] hover:bg-[#DDD4C3] transition-colors"
            title="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Educational Notice */}
        <div className="p-4 bg-[#EFE7D8] border border-[#D8D0C2] space-y-2">
          <div className="flex items-center gap-2 font-display text-sm uppercase font-bold text-[#151515]">
            <BookOpen className="w-4 h-4 text-[#C43A2F]" />
            <span>Classroom Demonstration & Educational Context</span>
          </div>
          <p className="font-editorial text-xs leading-relaxed text-[#444]">
            This project is designed as an interactive data-storytelling and musicology teaching tool examining the 
            creative transformation of The Beatles from 1962 to 1970. All audio clips are streamed strictly via the official
            YouTube IFrame Player API from verified official artist channels without commercial resale or monetization.
          </p>
        </div>

        {/* Dataset Provenance */}
        <div className="space-y-2">
          <h3 className="font-display text-lg uppercase font-bold text-[#151515] flex items-center gap-2">
            <Music className="w-4 h-4 text-[#C43A2F]" />
            <span>The 213-Song Dataset</span>
          </h3>
          <p className="font-sans text-xs text-[#555] leading-normal">
            Derived from the original Beatles discography dataset normalized with standard era divisions, verified 
            composer member attributions, genre family clusters, and lyric search tokens across {storyMetrics.dataset.songs} songs.
            The German-language tracks (<span className="italic">Komm, gib mir deine Hand</span> and <span className="italic">Sie liebt dich</span>)
            were patched using official Past Masters and MusicBrainz discography records.
          </p>
        </div>

        {/* External References & Sources */}
        <div className="space-y-3">
          <h3 className="font-display text-lg uppercase font-bold text-[#151515] flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#C43A2F]" />
            <span>Primary Research Manifest</span>
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-48 overflow-y-auto pr-1">
            {sourceManifest.map((src, i) => (
              <a
                key={i}
                href={src.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 bg-[#EFE7D8] hover:bg-[#E2D8C7] border border-[#DDD4C3] flex items-start justify-between gap-2 group transition-colors"
              >
                <div>
                  <div className="font-mono-code font-bold text-xs text-[#151515] group-hover:text-[#C43A2F]">
                    {src.name}
                  </div>
                  <div className="text-[10px] text-[#777] mt-0.5 line-clamp-1">
                    {src.use}
                  </div>
                </div>
                <ExternalLink className="w-3 h-3 text-[#999] group-hover:text-[#151515] shrink-0 mt-0.5" />
              </a>
            ))}
          </div>
        </div>

        {/* Image Attributions */}
        <div className="space-y-2">
          <h3 className="font-display text-lg uppercase font-bold text-[#151515] flex items-center gap-2">
            <ImageIcon className="w-4 h-4 text-[#C43A2F]" />
            <span>Visual Material & Photography Attributions</span>
          </h3>
          <ul className="space-y-1.5 font-mono-code text-[11px] text-[#555]">
            {imageManifest.map((img, i) => (
              <li key={i} className="border-l-2 border-[#C43A2F] pl-2 py-0.5">
                <span className="font-bold text-[#151515]">{img.era}:</span> {img.credit} ({img.license_note})
              </li>
            ))}
          </ul>
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-[#D8D0C2] flex items-center justify-between">
          <span className="font-mono-code text-[10px] text-[#8E877C]">
            Beatles Data Storytelling Archive · 1962–1970
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-[#151515] hover:bg-[#333] text-white font-mono-code text-xs uppercase font-bold"
          >
            CLOSE
          </button>
        </div>
      </div>
    </div>
  );
};
