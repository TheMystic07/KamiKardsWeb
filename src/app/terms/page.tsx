'use client';

import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CosmicBackground from '@/components/CosmicBackground';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-black text-white relative flex flex-col justify-between">
      <CosmicBackground />
      <Navbar />

      <main className="max-w-4xl mx-auto px-6 sm:px-12 py-16 w-full">
        <h1 className="font-display font-light text-4xl text-white mb-6">Service Contract</h1>
        <p className="text-xs font-mono text-cyan-400 mb-8">LAST UPDATED: FEBRUARY 2026</p>

        <div className="flex flex-col gap-6 text-xs text-zinc-300 font-sans leading-relaxed">
          <p>
            By using Kami Kards and connecting your Stellar smart vault, you agree to these service terms.
          </p>
          <h3 className="font-mono text-sm text-white font-semibold">1. Visa Network Operations</h3>
          <p>
            Visa debit cards are issued under licensed banking partners. Card settlements convert on-chain USDC/XLM at point of sale at spot rates with 0% foreign exchange fees.
          </p>
          <h3 className="font-mono text-sm text-white font-semibold">2. Smart Contract Execution</h3>
          <p>
            You retain 100% control over on-chain vault operations. Smart contract executions are immutable and recorded permanently on the Stellar public ledger.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
