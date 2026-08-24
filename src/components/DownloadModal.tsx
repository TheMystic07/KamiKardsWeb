'use client';

import React from 'react';
import { StellarLogoSVG } from '@/components/CylinderCardCarousel';

interface DownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function DownloadModal({ isOpen, onClose }: DownloadModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md bg-[#09090b] border border-white/20 rounded-2xl p-6 sm:p-8 text-white shadow-[0_0_60px_rgba(0,0,0,0.9)] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Subtle background glow */}
        <div className="absolute top-[-50%] right-[-50%] w-full h-full bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-zinc-400 hover:text-white p-2 text-xl font-mono leading-none"
          aria-label="Close modal"
        >
          ✕
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-2 mb-2">
          <StellarLogoSVG className="w-4 h-4 text-cyan-400" />
          <span className="font-mono text-[10px] tracking-widest text-cyan-400 uppercase">
            KAMI MOBILE APP
          </span>
        </div>

        <h3 className="font-display font-light text-2xl tracking-wide text-white mb-2">
          Download Kami for iOS &amp; Android
        </h3>
        <p className="text-zinc-400 text-xs font-light leading-relaxed mb-6 font-sans">
          Manage your virtual &amp; physical Visa cards, monitor Stellar transactions in &lt;3.5s, and fund instant balances with USDC &amp; XLM.
        </p>

        {/* QR Code & Scan Section */}
        <div className="flex flex-col sm:flex-row items-center gap-5 p-4 rounded-xl bg-white/[0.04] border border-white/10 mb-6">
          <div className="w-28 h-28 bg-white p-2 rounded-lg flex items-center justify-center shrink-0 shadow-lg">
            {/* Custom stylized QR code SVG */}
            <svg viewBox="0 0 100 100" className="w-full h-full" fill="#000000">
              <rect x="0" y="0" width="30" height="30" rx="4" />
              <rect x="5" y="5" width="20" height="20" fill="#ffffff" rx="2" />
              <rect x="10" y="10" width="10" height="10" />

              <rect x="70" y="0" width="30" height="30" rx="4" />
              <rect x="75" y="5" width="20" height="20" fill="#ffffff" rx="2" />
              <rect x="80" y="10" width="10" height="10" />

              <rect x="0" y="70" width="30" height="30" rx="4" />
              <rect x="5" y="75" width="20" height="20" fill="#ffffff" rx="2" />
              <rect x="10" y="80" width="10" height="10" />

              {/* Data dots */}
              <rect x="40" y="10" width="8" height="8" />
              <rect x="52" y="10" width="8" height="8" />
              <rect x="40" y="22" width="8" height="8" />
              <rect x="40" y="40" width="20" height="20" rx="2" />
              <rect x="10" y="40" width="8" height="8" />
              <rect x="22" y="40" width="8" height="8" />
              <rect x="70" y="40" width="8" height="8" />
              <rect x="82" y="40" width="8" height="8" />
              <rect x="70" y="52" width="8" height="8" />
              <rect x="40" y="70" width="8" height="8" />
              <rect x="52" y="82" width="8" height="8" />
              <rect x="70" y="70" width="20" height="20" rx="2" />
            </svg>
          </div>
          <div className="text-center sm:text-left">
            <span className="inline-block font-mono text-[9px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 mb-1.5">
              ● SCAN TO INSTALL
            </span>
            <p className="text-xs text-zinc-300 font-sans font-normal leading-snug">
              Point your camera at the QR code to install the Kami Neobank mobile app directly.
            </p>
          </div>
        </div>

        {/* Direct Download Buttons */}
        <div className="flex flex-col gap-2.5">
          <a
            href="https://apple.com"
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-between px-4 py-3 bg-white text-black font-semibold rounded-xl text-xs hover:bg-zinc-200 transition-all font-mono tracking-wider"
          >
            <div className="flex items-center gap-2.5">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.61-.75 1.04-1.8 0.92-2.87-.93.04-2.02.62-2.66 1.37-.56.65-.96 1.7-.82 2.74 1.04.08 2.06-.52 2.56-1.24z" />
              </svg>
              <span>Download on Apple App Store</span>
            </div>
            <span>→</span>
          </a>

          <a
            href="https://google.com"
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-between px-4 py-3 bg-white/[0.08] hover:bg-white/[0.14] text-white border border-white/20 rounded-xl text-xs transition-all font-mono tracking-wider"
          >
            <div className="flex items-center gap-2.5">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3.609 1.814L13.792 12 3.61 22.186c-.198-.225-.31-.527-.31-.886V2.7c0-.359.112-.661.31-.886zM15.207 13.414l2.138 2.139-11.83 6.812 9.692-8.951zm2.138-4.966L15.207 10.586 5.515 1.635l11.83 6.813zm1.488 1.488l3.197 1.84c.767.442.767 1.16 0 1.602l-3.197 1.84-2.001-2.001 2.001-2.001z" />
              </svg>
              <span>Get it on Google Play</span>
            </div>
            <span>→</span>
          </a>
        </div>
      </div>
    </div>
  );
}
