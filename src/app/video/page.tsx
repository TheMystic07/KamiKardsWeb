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

      <main className="max-w-4xl mx-auto px-6 sm:px-12 py-16 w-full flex-1 flex flex-col items-center justify-center text-center z-10">
        {/* Production Status Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-mono text-xs tracking-widest uppercase mb-6 shadow-[0_0_20px_rgba(0,240,255,0.2)]">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
          <span>PRODUCTION IN PROGRESS</span>
        </div>

        <h1 className="font-display font-light text-4xl sm:text-6xl text-white tracking-tight mb-4">
          Demo Video Coming Soon
        </h1>

        <p className="font-mono text-sm sm:text-base text-zinc-300 max-w-xl font-light leading-relaxed mb-10">
          The video is not uploaded yet. Our team is currently working on making the best video ever.
        </p>

        {/* Cinematic Video Placeholder Frame */}
        <div className="relative w-full max-w-2xl aspect-video rounded-3xl bg-gradient-to-tr from-zinc-950 via-[#0a0c14] to-zinc-900 border border-white/20 p-8 flex flex-col items-center justify-center shadow-[0_0_80px_rgba(0,240,255,0.1)] overflow-hidden group">
          {/* Ambient Glow Refraction */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,240,255,0.08)_0%,transparent_70%)] pointer-events-none" />

          {/* Animated Glowing Film Reel / Aperture Icon */}
          <div className="relative w-20 h-20 rounded-full bg-white/[0.06] border border-cyan-500/30 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 shadow-[0_0_30px_rgba(0,240,255,0.2)]">
            <svg
              className="w-8 h-8 text-cyan-400 ml-1"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
            <div className="absolute -inset-1 rounded-full border border-cyan-400/40 animate-pulse pointer-events-none" />
          </div>

          <span className="font-mono text-xs text-white font-semibold tracking-widest uppercase mb-1">
            KAMI KARDS • OFFICIAL PRODUCT DEMO
          </span>
          <span className="font-mono text-[10px] text-zinc-500">
            4K UHD • NARRATED WALKTHROUGH • LIVE SOROBAN SWIPE
          </span>

          {/* Live Progress Bar Simulation */}
          <div className="w-48 h-1 bg-white/10 rounded-full mt-6 overflow-hidden">
            <div className="w-3/4 h-full bg-gradient-to-r from-cyan-400 to-purple-500 animate-pulse" />
          </div>
        </div>

        {/* Quick Nav Actions */}
        <div className="flex flex-wrap items-center justify-center gap-4 mt-10 font-mono text-xs">
          <Link
            href="/"
            className="px-6 py-3 rounded-xl bg-white text-black font-semibold hover:bg-zinc-200 transition-all shadow-lg"
          >
            ← Back to Homepage
          </Link>
          <Link
            href="/cards"
            className="px-6 py-3 rounded-xl bg-white/[0.08] hover:bg-white/[0.14] text-white border border-white/20 transition-all"
          >
            Explore 3D Cards Studio
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
