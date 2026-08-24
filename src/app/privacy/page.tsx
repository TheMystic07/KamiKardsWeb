'use client';

import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CosmicBackground from '@/components/CosmicBackground';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-black text-white relative flex flex-col justify-between">
      <CosmicBackground />
      <Navbar />

      <main className="max-w-4xl mx-auto px-6 sm:px-12 py-16 w-full">
        <h1 className="font-display font-light text-4xl text-white mb-6">Privacy Notice</h1>
        <p className="text-xs font-mono text-cyan-400 mb-8">LAST UPDATED: FEBRUARY 2026</p>

        <div className="flex flex-col gap-6 text-xs text-zinc-300 font-sans leading-relaxed">
          <p>
            Kami Kards operates as a decentralized, non-custodial fintech platform built natively on the Stellar blockchain network. We believe that privacy is a foundational human right.
          </p>
          <h3 className="font-mono text-sm text-white font-semibold">1. Non-Custodial Architecture</h3>
          <p>
            Your cryptographic keys and wallet seed phrases are never accessible to Kami Kards. Transactions execute directly via Soroban smart contracts on Stellar.
          </p>
          <h3 className="font-mono text-sm text-white font-semibold">2. Zero-Knowledge Identity Verification</h3>
          <p>
            Compliance verifications for Visa card issuance utilize decentralized, zero-knowledge proofs to ensure regulatory standards without storing unencrypted personal identifiers.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
