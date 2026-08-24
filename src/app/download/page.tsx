'use client';

import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CosmicBackground from '@/components/CosmicBackground';
import { StellarLogoSVG } from '@/components/CylinderCardCarousel';

export default function DownloadPage() {
  return (
    <div className="min-h-screen bg-black text-white relative flex flex-col justify-between">
      <CosmicBackground />
      <Navbar />

      <main className="max-w-7xl mx-auto px-6 sm:px-12 py-12 w-full">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/[0.08] border border-white/15 text-white font-mono text-[10px] tracking-widest uppercase mb-4">
            <StellarLogoSVG className="w-3.5 h-3.5 text-cyan-400" />
            <span>KAMI FOR IOS &amp; ANDROID</span>
          </div>
          <h1 className="font-display font-light text-4xl sm:text-6xl tracking-tight text-white mb-4">
            The Neobank in Your Pocket
          </h1>
          <p className="text-zinc-400 text-sm font-sans font-light leading-relaxed">
            Manage your physical and virtual Visa cards, monitor &lt;3.5s Stellar settlement, and earn 5.2% USDC auto-yield from anywhere.
          </p>
        </div>

        {/* Hero Showcase Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-24">
          {/* Left Column: Phone Mockup Simulation */}
          <div className="lg:col-span-6 flex justify-center">
            <div className="relative w-full max-w-[320px] aspect-[9/18.5] bg-[#050507] border-[6px] border-[#27272a] rounded-[48px] p-5 shadow-[0_0_80px_rgba(0,240,255,0.15)] flex flex-col justify-between overflow-hidden">
              {/* Dynamic Island / Notch */}
              <div className="w-28 h-5 bg-black rounded-full mx-auto mb-3 flex items-center justify-end px-2">
                <div className="w-2.5 h-2.5 rounded-full bg-cyan-400/40" />
              </div>

              {/* Simulated App Screen Header */}
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-1.5">
                  <StellarLogoSVG className="w-4 h-4 text-white" />
                  <span className="font-display text-sm tracking-widest text-white">KAMI</span>
                </div>
                <div className="w-7 h-7 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-[10px] font-mono">
                  AV
                </div>
              </div>

              {/* Simulated Mini Card */}
              <div className="p-4 rounded-xl bg-gradient-to-tr from-zinc-900 via-black to-zinc-950 border border-white/20 shadow-lg flex flex-col justify-between h-36">
                <div className="flex justify-between items-start">
                  <span className="font-display font-light text-xs tracking-widest">KAMI OBSIDIAN</span>
                  <span className="font-sans font-black italic text-xs">VISA</span>
                </div>
                <div className="font-mono text-xs text-zinc-300">
                  $14,892.40 <span className="text-[9px] text-zinc-500 font-normal">USDC</span>
                </div>
                <div className="flex justify-between text-[9px] font-mono text-zinc-400">
                  <span>•••• 4892</span>
                  <span className="text-emerald-400">+5.2% APY</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-3 gap-2 my-4">
                <div className="p-2 rounded-xl bg-white/[0.05] border border-white/10 text-center font-mono text-[9px]">
                  <span className="block text-sm mb-0.5">⚡</span>
                  Top Up
                </div>
                <div className="p-2 rounded-xl bg-white/[0.05] border border-white/10 text-center font-mono text-[9px]">
                  <span className="block text-sm mb-0.5">🔒</span>
                  Freeze
                </div>
                <div className="p-2 rounded-xl bg-white/[0.05] border border-white/10 text-center font-mono text-[9px]">
                  <span className="block text-sm mb-0.5">💸</span>
                  Yield
                </div>
              </div>

              {/* Simulated Recent Spend */}
              <div className="flex flex-col gap-2">
                <span className="font-mono text-[9px] text-zinc-500 uppercase tracking-wider">LATEST TRANSACTIONS</span>
                <div className="flex items-center justify-between p-2 rounded-lg bg-white/[0.03] text-[10px] font-mono">
                  <span>Apple Store Tokyo</span>
                  <span className="text-white font-semibold">-$42.00</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded-lg bg-white/[0.03] text-[10px] font-mono">
                  <span>XLM Cashback Payout</span>
                  <span className="text-emerald-400">+$2.10</span>
                </div>
              </div>

              {/* Bottom Bar Indicator */}
              <div className="w-32 h-1 bg-white/30 rounded-full mx-auto mt-3" />
            </div>
          </div>

          {/* Right Column: Download QR Code & Links */}
          <div className="lg:col-span-6 flex flex-col gap-6 p-8 sm:p-10 rounded-3xl bg-white/[0.03] border border-white/15">
            <h2 className="font-display font-light text-3xl text-white">
              Install the Mobile App
            </h2>
            <p className="text-zinc-400 text-xs font-sans leading-relaxed">
              Available now on iOS via Apple App Store &amp; TestFlight, and on Android via Google Play Store and direct verified APK.
            </p>

            {/* QR Code Section */}
            <div className="flex flex-col sm:flex-row items-center gap-6 p-5 rounded-2xl bg-white/[0.04] border border-white/10">
              <div className="w-32 h-32 bg-white p-2.5 rounded-xl shrink-0 shadow-xl flex items-center justify-center">
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

                  <rect x="40" y="10" width="8" height="8" />
                  <rect x="52" y="10" width="8" height="8" />
                  <rect x="40" y="40" width="20" height="20" rx="2" />
                  <rect x="10" y="40" width="8" height="8" />
                  <rect x="70" y="40" width="8" height="8" />
                  <rect x="40" y="70" width="8" height="8" />
                </svg>
              </div>

              <div>
                <span className="font-mono text-[10px] text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded border border-emerald-500/20 block mb-2 w-max">
                  ● INSTANT MOBILE SCAN
                </span>
                <p className="text-xs text-zinc-300 font-sans leading-relaxed">
                  Open your camera to scan the secure QR link and initiate instant download on your mobile device.
                </p>
              </div>
            </div>

            {/* Direct Store Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mt-2">
              <a
                href="https://apple.com"
                target="_blank"
                rel="noreferrer"
                className="flex-1 flex items-center justify-center gap-2.5 py-3.5 bg-white text-black font-semibold rounded-xl text-xs font-mono hover:bg-zinc-200 transition-all shadow-lg"
              >
                <span>Apple App Store</span>
                <span>→</span>
              </a>

              <a
                href="https://google.com"
                target="_blank"
                rel="noreferrer"
                className="flex-1 flex items-center justify-center gap-2.5 py-3.5 bg-white/[0.08] hover:bg-white/[0.14] text-white border border-white/20 rounded-xl text-xs font-mono transition-all"
              >
                <span>Google Play Store</span>
                <span>→</span>
              </a>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
