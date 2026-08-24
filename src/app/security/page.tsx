'use client';

import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CosmicBackground from '@/components/CosmicBackground';
import { StellarLogoSVG } from '@/components/CylinderCardCarousel';

export default function SecurityPage() {
  return (
    <div className="min-h-screen bg-black text-white relative flex flex-col justify-between">
      <CosmicBackground />
      <Navbar />

      <main className="max-w-7xl mx-auto px-6 sm:px-12 py-12 w-full">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/[0.08] border border-white/15 text-white font-mono text-[10px] tracking-widest uppercase mb-4">
            <StellarLogoSVG className="w-3.5 h-3.5 text-cyan-400" />
            <span>SECURITY &amp; COMPLIANCE ARCHITECTURE</span>
          </div>
          <h1 className="font-display font-light text-4xl sm:text-6xl tracking-tight text-white mb-4">
            Institutional-Grade Protection
          </h1>
          <p className="text-zinc-400 text-sm font-sans font-light leading-relaxed">
            Non-custodial cryptographic vault architecture combined with Visa Zero Liability guarantees that only you ever hold access to your money.
          </p>
        </div>

        {/* Security Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
          <div className="p-8 rounded-2xl bg-white/[0.03] border border-white/10 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 flex items-center justify-center text-xl mb-4">
                🔑
              </div>
              <h3 className="font-display font-light text-xl text-white mb-2">
                Non-Custodial MPC Key Sharding
              </h3>
              <p className="text-zinc-400 text-xs font-sans leading-relaxed">
                Your private keys are never stored on a central server. Multi-Party Computation (MPC) splits key shares between your secure mobile enclave and decentralized Stellar validator nodes.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-white/10 font-mono text-[10px] text-cyan-400">
              ZERO-KNOWLEDGE ARCHITECTURE
            </div>
          </div>

          <div className="p-8 rounded-2xl bg-white/[0.03] border border-white/10 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center text-xl mb-4">
                🛡️
              </div>
              <h3 className="font-display font-light text-xl text-white mb-2">
                Visa® Zero Liability Protection
              </h3>
              <p className="text-zinc-400 text-xs font-sans leading-relaxed">
                Enjoy complete peace of mind. Every Kami physical and virtual card comes with standard Visa Zero Liability protection against unauthorized charges, merchant fraud, or card theft.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-white/10 font-mono text-[10px] text-emerald-400">
              100% FRAUD INDEMNIFICATION
            </div>
          </div>

          <div className="p-8 rounded-2xl bg-white/[0.03] border border-white/10 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-400 flex items-center justify-center text-xl mb-4">
                ⚡
              </div>
              <h3 className="font-display font-light text-xl text-white mb-2">
                Audited Soroban Rust Contracts
              </h3>
              <p className="text-zinc-400 text-xs font-sans leading-relaxed">
                All smart vault code is open-source, mathematically verified, and audited by leading Web3 security firms with real-time formal verification on Stellar.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-white/10 font-mono text-[10px] text-purple-400">
              FORMALLY VERIFIED WASM
            </div>
          </div>
        </div>

        {/* Security Audit Badges */}
        <div className="p-8 rounded-3xl bg-white/[0.02] border border-white/10 mb-24">
          <div className="text-center max-w-xl mx-auto mb-8">
            <span className="font-mono text-[10px] tracking-widest text-zinc-400 uppercase">
              SECURITY AUDITORS &amp; COMPLIANCE
            </span>
            <h2 className="font-display font-light text-2xl text-white mt-1">
              Tested by Top Web3 Security Teams
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center font-mono text-xs">
            <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10">
              <span className="text-white font-bold block">CERTIK</span>
              <span className="text-[10px] text-emerald-400 mt-1 block">99.4 Security Score</span>
            </div>
            <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10">
              <span className="text-white font-bold block">OPENZEPPELIN</span>
              <span className="text-[10px] text-emerald-400 mt-1 block">Soroban Contract Pass</span>
            </div>
            <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10">
              <span className="text-white font-bold block">KUDELSKI</span>
              <span className="text-[10px] text-emerald-400 mt-1 block">MPC Key Audit Verified</span>
            </div>
            <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10">
              <span className="text-white font-bold block">PCI DSS LEVEL 1</span>
              <span className="text-[10px] text-emerald-400 mt-1 block">Banking Grade Vault</span>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
