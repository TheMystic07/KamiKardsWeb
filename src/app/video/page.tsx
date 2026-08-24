'use client';

import React from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CosmicBackground from '@/components/CosmicBackground';
import { StellarLogoSVG } from '@/components/CylinderCardCarousel';

export default function VideoPage() {
  return (
    <div className="min-h-screen bg-black text-white relative flex flex-col justify-between select-none">
      <CosmicBackground />
      <Navbar />

      <main className="max-w-5xl mx-auto px-4 sm:px-8 lg:px-12 py-12 w-full flex-1 flex flex-col items-center justify-center text-center z-10">
        {/* Status Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-mono text-xs tracking-widest uppercase mb-4 shadow-[0_0_20px_rgba(0,240,255,0.2)]">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          <span>OFFICIAL DEMO VIDEO</span>
        </div>

        <h1 className="font-display font-light text-4xl sm:text-6xl text-white tracking-tight mb-3">
          Kami in Action
        </h1>

        <p className="font-mono text-xs sm:text-sm text-zinc-300 max-w-2xl font-light leading-relaxed mb-8">
          Watch our end-to-end walkthrough: natural language family budgeting, real-time multi-device sync on SpacetimeDB, and instant non-custodial crypto card spending on Stellar.
        </p>

        {/* Cinematic Video Player Container */}
        <div className="relative w-full max-w-4xl aspect-video rounded-2xl sm:rounded-3xl bg-zinc-950 border border-white/20 p-2 sm:p-3.5 shadow-[0_0_80px_rgba(0,240,255,0.15)] overflow-hidden group">
          {/* Ambient Glow Refraction */}
          <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/10 via-transparent to-purple-500/10 pointer-events-none" />

          {/* HTML5 Native Responsive Video Player */}
          <div className="w-full h-full rounded-xl sm:rounded-2xl overflow-hidden bg-black relative flex items-center justify-center">
            <video
              src="/Stellar.mp4"
              controls
              playsInline
              preload="auto"
              className="w-full h-full object-contain rounded-xl sm:rounded-2xl"
            >
              Your browser does not support the video tag.
            </video>
          </div>
        </div>

        {/* Video Key Highlights / Chapters Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full max-w-4xl mt-8 font-mono text-xs text-left">
          <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10">
            <span className="text-cyan-400 font-bold block text-[10px]">01 / PARSER</span>
            <span className="text-white text-xs block font-medium mt-0.5">Qwen Financial AI</span>
            <span className="text-[10px] text-zinc-400 block mt-0.5">Colloquial intent extraction</span>
          </div>

          <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10">
            <span className="text-emerald-400 font-bold block text-[10px]">02 / REALTIME</span>
            <span className="text-white text-xs block font-medium mt-0.5">SpacetimeDB 2.8</span>
            <span className="text-[10px] text-zinc-400 block mt-0.5">Zero-polling multi-device sync</span>
          </div>

          <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10">
            <span className="text-purple-400 font-bold block text-[10px]">03 / SETTLEMENT</span>
            <span className="text-white text-xs block font-medium mt-0.5">Stellar / Horizon</span>
            <span className="text-[10px] text-zinc-400 block mt-0.5">&lt;3.5s deterministic finality</span>
          </div>

          <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10">
            <span className="text-amber-400 font-bold block text-[10px]">04 / RAILS</span>
            <span className="text-white text-xs block font-medium mt-0.5">KripiCard API</span>
            <span className="text-[10px] text-zinc-400 block mt-0.5">Programmable Visa cards</span>
          </div>
        </div>

        {/* Quick Nav Actions */}
        <div className="flex flex-wrap items-center justify-center gap-4 mt-8 font-mono text-xs">
          <Link
            href="/"
            className="px-6 py-3 rounded-xl bg-white text-black font-semibold hover:bg-zinc-200 transition-all shadow-lg"
          >
            ← Back to Homepage
          </Link>
          <Link
            href="/ppt"
            className="px-6 py-3 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/40 transition-all"
          >
            Open Interactive Pitch Deck →
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
