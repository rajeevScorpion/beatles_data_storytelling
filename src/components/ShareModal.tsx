import React, { useState } from 'react';
import { Share2, Copy, Check, X, ExternalLink, MessageCircle, Send, Globe, Sparkles } from 'lucide-react';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PUBLIC_SHARED_URL = 'https://ais-pre-anxiqmpfp7uypy5vnfzzsv-363922778059.asia-southeast1.run.app';

export const ShareModal: React.FC<ShareModalProps> = ({ isOpen, onClose }) => {
  const [isCopied, setIsCopied] = useState(false);

  if (!isOpen) return null;

  // Resolve canonical URL for social crawlers (avoiding localhost or private dev iframe URLs)
  const getCanonicalUrl = (): string => {
    if (typeof window === 'undefined') return PUBLIC_SHARED_URL;
    const href = window.location.href;
    const host = window.location.hostname;
    if (
      host === 'localhost' ||
      host === '127.0.0.1' ||
      host.includes('local') ||
      host.includes('ais-dev-') ||
      host.includes('cloudshell')
    ) {
      return PUBLIC_SHARED_URL;
    }
    return href;
  };

  const shareUrl = getCanonicalUrl();
  const shareTitle = 'The Beatles: Eight Years That Changed the Sound';
  const shareDescription = 'An interactive data investigation into 213 Beatles songs from 1962 to 1970, tracking the sonic evolution from Liverpool club pop to studio orchestration.';
  const shareText = `Explore "${shareTitle}" — ${shareDescription}\n\n${shareUrl}`;

  const handleCopyLink = async () => {
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(shareUrl);
      } else {
        const input = document.createElement('input');
        input.value = shareUrl;
        document.body.appendChild(input);
        input.select();
        document.execCommand('copy');
        document.body.removeChild(input);
      }
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2400);
    } catch (err) {
      console.error('Failed to copy link:', err);
    }
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: shareTitle,
          text: shareDescription,
          url: shareUrl,
        });
      } catch (err) {
        // User cancelled or share failed, fallback gracefully
        if ((err as Error).name !== 'AbortError') {
          console.log('Share dismissed');
        }
      }
    } else {
      handleCopyLink();
    }
  };

  // Pre-formatted direct social sharing links
  const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareTitle)}&url=${encodeURIComponent(shareUrl)}`;
  const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
  const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;

  const supportsNativeShare = typeof navigator !== 'undefined' && !!navigator.share;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="share-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        onClick={e => e.stopPropagation()}
        className="w-full max-w-lg bg-[#F2EBDD] text-[#151515] border-2 border-[#151515] print-shadow-lg max-h-[92vh] overflow-y-auto flex flex-col font-sans"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 border-b-2 border-[#151515] bg-[#EAE1D2]">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-[#C43A2F] text-white flex items-center justify-center font-display font-black text-xs">
              <Share2 className="w-3.5 h-3.5" />
            </div>
            <div>
              <h2 id="share-modal-title" className="font-display text-base sm:text-lg font-black uppercase tracking-tight text-[#151515] leading-none">
                SHARE INVESTIGATION
              </h2>
              <p className="font-mono-code text-[9px] sm:text-[10px] text-[#7A7267] uppercase tracking-wider mt-0.5">
                WHATSAPP · SOCIAL MEDIA · DIRECT LINK
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close share dialog"
            className="p-1 hover:bg-[#D8D0C2] transition-colors border border-transparent hover:border-[#151515] focus:outline-none"
          >
            <X className="w-5 h-5 text-[#151515]" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6 space-y-5">
          {/* Social Media Open Graph Preview Card */}
          <div>
            <div className="flex items-center justify-between text-[10px] font-mono-code uppercase text-[#7A7267] font-bold mb-2">
              <span className="flex items-center gap-1.5 text-[#151515]">
                <Globe className="w-3 h-3 text-[#C43A2F]" />
                SOCIAL MEDIA & WHATSAPP CARD PREVIEW
              </span>
              <span className="text-[#C43A2F] font-bold">1200 × 630 OG IMAGE</span>
            </div>

            {/* Rendered Preview Card imitating WhatsApp / Social card */}
            <div className="border-2 border-[#151515] bg-[#EAE1D2] overflow-hidden print-shadow-sm group">
              <div className="relative aspect-[1.91/1] w-full bg-[#151515] overflow-hidden border-b border-[#151515]">
                <img
                  src="/og-image.jpg"
                  alt="The Beatles: Eight Years That Changed the Sound Open Graph Card"
                  className="w-full h-full object-cover group-hover:scale-[1.01] transition-transform duration-300"
                  referrerPolicy="no-referrer"
                />
                <span className="absolute top-2 left-2 bg-[#151515]/90 text-white font-mono-code text-[9px] uppercase px-1.5 py-0.5 border border-[#3F3F46]">
                  PARLOPHONE · 1962–1970
                </span>
              </div>
              <div className="p-3 bg-[#FAF6EE]">
                <div className="font-mono-code text-[9px] uppercase text-[#7A7267] tracking-wider truncate">
                  THE BEATLES · 213 SONGS DATA STORY
                </div>
                <div className="font-display text-sm sm:text-base font-black uppercase text-[#151515] leading-tight mt-0.5">
                  {shareTitle}
                </div>
                <div className="font-sans text-[11px] text-[#555] line-clamp-2 mt-1 leading-snug">
                  {shareDescription}
                </div>
              </div>
            </div>
            <p className="font-mono-code text-[9.5px] text-[#7A7267] mt-1.5 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-[#C43A2F] shrink-0" />
              <span>When shared on WhatsApp, Twitter/X, or iMessage, this archival card will render automatically.</span>
            </p>
          </div>

          {/* Direct Share Buttons */}
          <div className="space-y-2">
            <span className="font-mono-code text-[10px] uppercase font-bold text-[#7A7267] block">
              SHARE TO SOCIAL CHANNELS
            </span>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {/* WhatsApp */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1.5 py-2.5 px-3 bg-[#25D366] hover:bg-[#20bd5a] text-white font-mono-code text-[11px] font-bold uppercase transition-colors border border-[#151515] print-shadow-sm text-center"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>WhatsApp</span>
              </a>

              {/* X / Twitter */}
              <a
                href={twitterUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1.5 py-2.5 px-3 bg-[#000000] hover:bg-[#222222] text-white font-mono-code text-[11px] font-bold uppercase transition-colors border border-[#151515] print-shadow-sm text-center"
              >
                <span className="font-sans font-black text-sm">𝕏</span>
                <span>Twitter</span>
              </a>

              {/* Facebook */}
              <a
                href={facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1.5 py-2.5 px-3 bg-[#1877F2] hover:bg-[#1565cf] text-white font-mono-code text-[11px] font-bold uppercase transition-colors border border-[#151515] print-shadow-sm text-center"
              >
                <span className="font-sans font-black text-sm">f</span>
                <span>Facebook</span>
              </a>

              {/* LinkedIn */}
              <a
                href={linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1.5 py-2.5 px-3 bg-[#0A66C2] hover:bg-[#095196] text-white font-mono-code text-[11px] font-bold uppercase transition-colors border border-[#151515] print-shadow-sm text-center"
              >
                <span className="font-sans font-black text-sm">in</span>
                <span>LinkedIn</span>
              </a>
            </div>

            {/* Native OS Share Sheet (Mobile / Safari / Chrome Android) */}
            {supportsNativeShare && (
              <button
                type="button"
                onClick={handleNativeShare}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-[#151515] hover:bg-[#C43A2F] text-white font-mono-code text-xs uppercase font-bold tracking-wider transition-colors border-2 border-[#151515] print-shadow-sm mt-2"
              >
                <Send className="w-3.5 h-3.5" />
                <span>SHARE VIA SYSTEM APPS...</span>
              </button>
            )}
          </div>

          {/* Copy Link Input Bar */}
          <div className="space-y-1.5 pt-2 border-t border-[#D8D0C2]">
            <span className="font-mono-code text-[10px] uppercase font-bold text-[#7A7267] block">
              COPY DIRECT URL
            </span>
            <div className="flex items-center gap-1.5">
              <input
                type="text"
                readOnly
                value={shareUrl}
                className="flex-1 bg-white border-2 border-[#151515] px-3 py-2 font-mono-code text-[11px] text-[#151515] truncate focus:outline-none select-all"
              />
              <button
                type="button"
                onClick={handleCopyLink}
                className={`flex items-center gap-1.5 px-4 py-2 font-mono-code text-xs font-bold uppercase tracking-wider transition-all shrink-0 border-2 border-[#151515] print-shadow-sm ${
                  isCopied
                    ? 'bg-[#15803D] text-white'
                    : 'bg-[#151515] hover:bg-[#C43A2F] text-white'
                }`}
              >
                {isCopied ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>COPIED!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>COPY LINK</span>
                  </>
                )}
              </button>
            </div>

            {/* Crawler & WhatsApp Preview Info */}
            <div className="p-2.5 bg-[#EAE1D2] border border-[#C8C0B2] text-[10px] font-mono-code text-[#666] leading-relaxed">
              <span className="font-bold text-[#151515] block mb-0.5">WHATSAPP PREVIEW NOTE:</span>
              WhatsApp's link scraper requires a public URL to fetch the preview card. If testing inside the Google AI Studio development container, make sure to publish via the <strong className="text-[#C43A2F]">Share</strong> button in AI Studio so external crawlers can access the site without Google authentication.
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-4 sm:px-6 py-3 border-t-2 border-[#151515] bg-[#EAE1D2] flex items-center justify-between text-[10px] font-mono-code text-[#7A7267]">
          <span>THE BEATLES DATA JOURNALISM PROJECT</span>
          <button
            onClick={onClose}
            className="text-[#151515] hover:text-[#C43A2F] font-bold uppercase"
          >
            CLOSE [ESC]
          </button>
        </div>
      </div>
    </div>
  );
};
