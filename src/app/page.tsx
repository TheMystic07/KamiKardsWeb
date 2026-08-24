'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import CylinderCardCarousel, { StellarLogoSVG } from '@/components/CylinderCardCarousel';
import CosmicBackground from '@/components/CosmicBackground';
import DownloadModal from '@/components/DownloadModal';

export default function HomePage() {
  const [email, setEmail] = useState('');
  const [asset, setAsset] = useState<'USDC' | 'XLM' | 'EURC'>('USDC');
  const [cardType, setCardType] = useState<'Virtual' | 'Obsidian'>('Obsidian');
  const [submitted, setSubmitted] = useState(false);
  const [downloadModalOpen, setDownloadModalOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
    }
  };

  return (
    <main className="hero">
      {/* Dynamic Cosmic Constellation Background */}
      <CosmicBackground />

      {/* Row 1: Navbar */}
      <Navbar />

      {/* Row 2: Hero Body */}
      <div className="hero__body">
        {/* Left / Center: Interactive 3D Cylinder Card Carousel over Cosmic Canvas */}
        <div className="hero__carousel-wrapper relative">
          <CylinderCardCarousel />

          {/* Subtle Interaction Guide */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 font-mono text-[9px] tracking-[0.2em] text-white/40 uppercase pointer-events-none hidden sm:flex items-center gap-2">
            <span>● 3D Interactive Deck</span>
            <span>•</span>
            <span>Move cursor to tilt</span>
          </div>
        </div>

        {/* Right: Modernized High-End Stellar Neobank Panel */}
        <div className="panel">
          {/* Live Stellar Status Chip */}
          <div className="flex items-center gap-2.5">
            <div className="flex items-center gap-2 px-3 py-1 bg-white/[0.08] border border-white/15 text-white font-mono text-[10px] tracking-widest">
              <StellarLogoSVG className="w-3.5 h-3.5 text-white" />
              <span>STELLAR NEOBANK</span>
            </div>
            <div className="flex items-center gap-1.5 px-2.5 py-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-mono text-[10px] tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>MAINNET LIVE</span>
            </div>
          </div>

          <h1 className="hero__h1">KAMI</h1>

          <p className="hero__tagline">
            Fund with USDC &amp; XLM. Spend real money worldwide with Visa.
          </p>

          {/* Card Configurator Pills */}
          <div className="w-full mt-6 pt-4 border-t border-white/10 flex flex-col gap-3">
            <div className="flex items-center justify-between text-[10px] font-mono text-zinc-400">
              <span>FUNDING ASSET</span>
              <div className="flex gap-1">
                {(['USDC', 'XLM', 'EURC'] as const).map((token) => (
                  <button
                    key={token}
                    type="button"
                    onClick={() => setAsset(token)}
                    className={`px-2.5 py-1 text-[10px] font-mono transition-all ${
                      asset === token
                        ? 'bg-white text-black font-semibold'
                        : 'bg-white/[0.05] text-zinc-400 hover:text-white border border-white/10'
                    }`}
                  >
                    {token}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between text-[10px] font-mono text-zinc-400">
              <span>CARD FORM</span>
              <div className="flex gap-1">
                {(['Obsidian', 'Virtual'] as const).map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setCardType(type)}
                    className={`px-2.5 py-1 text-[10px] font-mono transition-all ${
                      cardType === type
                        ? 'bg-white text-black font-semibold'
                        : 'bg-white/[0.05] text-zinc-400 hover:text-white border border-white/10'
                    }`}
                  >
                    {type === 'Obsidian' ? 'Obsidian Metal' : 'Instant Virtual'}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Form & Actions */}
          <form className="form !mt-5" noValidate onSubmit={handleSubmit}>
            <label htmlFor="emailInput" className="sr-only">
              Email
            </label>
            <input
              id="emailInput"
              type="email"
              placeholder="Enter your email for card allocation"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input__email"
              autoComplete="email"
            />

            {submitted ? (
              <div className="p-3.5 bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-mono text-center tracking-wider">
                ✓ ALLOCATION CONFIRMED. YOUR {cardType.toUpperCase()} VISA CARD IS RESERVED.
              </div>
            ) : (
              <>
                <button
                  type="submit"
                  className="btn--ghost !text-white !bg-white/[0.08] hover:!bg-white/[0.16] border border-white/20 transition-all shadow-[0_4px_20px_rgba(0,0,0,0.4)]"
                >
                  Order {cardType === 'Obsidian' ? 'Obsidian Metal' : 'Virtual'} Card →
                </button>

                {/* Download Mobile App Button */}
                <button
                  type="button"
                  onClick={() => setDownloadModalOpen(true)}
                  className="btn--solid !bg-white !text-black hover:!bg-zinc-200 font-semibold transition-all shadow-[0_0_25px_rgba(255,255,255,0.15)] flex items-center justify-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                    />
                  </svg>
                  <span>Download Mobile App</span>
                </button>
              </>
            )}
          </form>

          {/* Quick Page Links & Badges */}
          <div className="w-full flex items-center justify-between mt-5 pt-4 border-t border-white/10 font-mono text-[11px] text-zinc-400">
            <Link href="/cards" className="hover:text-cyan-400 transition-colors flex items-center gap-1">
              <span>Explore 3D Studio</span>
              <span>→</span>
            </Link>
            <Link href="/stellar" className="hover:text-cyan-400 transition-colors flex items-center gap-1">
              <span>Stellar Explorer</span>
              <span>→</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Row 3: Legal Footer */}
      <footer className="footer">
        <p className="footer__text">
          Opening a Kami account signals that you accept our{' '}
          <Link href="/privacy" className="footer__link">
            Privacy Notice
          </Link>{' '}
          and{' '}
          <Link href="/terms" className="footer__link">
            Service Contract
          </Link>
          . Powered by Stellar &amp; Soroban smart contracts. Visa® is a registered trademark.
        </p>
      </footer>

      {/* Download App Modal */}
      <DownloadModal isOpen={downloadModalOpen} onClose={() => setDownloadModalOpen(false)} />
    </main>
  );
}
