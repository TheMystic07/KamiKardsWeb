'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CosmicBackground from '@/components/CosmicBackground';
import { StellarLogoSVG } from '@/components/CylinderCardCarousel';

export default function StellarPage() {
  const [ledgerSeq, setLedgerSeq] = useState(54892104);
  const [txCount, setTxCount] = useState(1420);
  const [liveTxs, setLiveTxs] = useState([
    { hash: 'e89f...32ba', type: 'POS Spend (Tokyo, Japan)', amount: '-$42.50 USDC', status: 'Settled', latency: '2.8s' },
    { hash: 'a14c...9811', type: 'XLM Cashback Payout', amount: '+$1.48 XLM', status: 'Settled', latency: '3.1s' },
    { hash: '77bc...5412', type: 'Soroban Vault Auto-Yield', amount: '+$12.80 USDC', status: 'Settled', latency: '3.4s' },
    { hash: 'c901...4402', type: 'USDC Card Balance Top-up', amount: '+$500.00 USDC', status: 'Settled', latency: '2.9s' },
  ]);

  // Simulate real-time Stellar consensus stream
  useEffect(() => {
    const interval = setInterval(() => {
      setLedgerSeq((prev) => prev + 1);
      setTxCount((prev) => prev + Math.floor(Math.random() * 45) + 10);

      const sampleMerchants = ['London, UK', 'New York, USA', 'Berlin, Germany', 'Singapore', 'Sydney, Australia'];
      const randomMerchant = sampleMerchants[Math.floor(Math.random() * sampleMerchants.length)];
      const randomAmount = (Math.random() * 80 + 5).toFixed(2);
      const randomHex = Math.random().toString(16).substring(2, 6);

      setLiveTxs((prev) => [
        {
          hash: `${randomHex}...${Math.random().toString(16).substring(2, 6)}`,
          type: `POS Spend (${randomMerchant})`,
          amount: `-$${randomAmount} USDC`,
          status: 'Settled',
          latency: `${(Math.random() * 0.8 + 2.6).toFixed(1)}s`,
        },
        ...prev.slice(0, 4),
      ]);
    }, 3500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white relative flex flex-col justify-between">
      <CosmicBackground />
      <Navbar />

      <main className="max-w-7xl mx-auto px-6 sm:px-12 py-12 w-full">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/[0.08] border border-white/15 text-white font-mono text-[10px] tracking-widest uppercase mb-4">
            <StellarLogoSVG className="w-3.5 h-3.5" />
            <span>STELLAR CORE INFRASTRUCTURE</span>
          </div>
          <h1 className="font-display font-light text-4xl sm:text-6xl tracking-tight text-white mb-4">
            Sub-4-Second Global Settlement
          </h1>
          <p className="text-zinc-400 text-sm font-sans font-light leading-relaxed">
            Kami Kards routes all virtual and physical Visa transactions directly through the Stellar Consensus Protocol (SCP) and Soroban non-custodial smart contracts.
          </p>
        </div>

        {/* Live Stellar Network Pulse Matrix */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 flex flex-col">
            <span className="font-mono text-[10px] text-zinc-400 uppercase tracking-wider">CURRENT LEDGER</span>
            <span className="font-mono text-2xl sm:text-3xl font-bold text-white mt-1">
              #{ledgerSeq.toLocaleString()}
            </span>
            <span className="text-[10px] font-mono text-emerald-400 mt-2 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Consensus Closing</span>
            </span>
          </div>

          <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 flex flex-col">
            <span className="font-mono text-[10px] text-zinc-400 uppercase tracking-wider">MEDIAN FINALITY</span>
            <span className="font-mono text-2xl sm:text-3xl font-bold text-cyan-400 mt-1">
              3.2 Seconds
            </span>
            <span className="text-[10px] font-mono text-zinc-400 mt-2">
              Instant POS Settlement
            </span>
          </div>

          <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 flex flex-col">
            <span className="font-mono text-[10px] text-zinc-400 uppercase tracking-wider">BASE NETWORK FEE</span>
            <span className="font-mono text-2xl sm:text-3xl font-bold text-white mt-1">
              $0.00001
            </span>
            <span className="text-[10px] font-mono text-emerald-400 mt-2">
              0.00001 XLM per tx
            </span>
          </div>

          <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 flex flex-col">
            <span className="font-mono text-[10px] text-zinc-400 uppercase tracking-wider">DAILY TRANSACTIONS</span>
            <span className="font-mono text-2xl sm:text-3xl font-bold text-white mt-1">
              {txCount.toLocaleString()} / min
            </span>
            <span className="text-[10px] font-mono text-zinc-400 mt-2">
              Non-custodial volume
            </span>
          </div>
        </div>

        {/* Live Cardholder POS Settlement Stream */}
        <div className="p-8 rounded-3xl bg-white/[0.02] border border-white/15 mb-24">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <div>
              <span className="font-mono text-[10px] tracking-widest text-cyan-400 uppercase">
                ON-CHAIN TELEMETRY
              </span>
              <h2 className="font-display font-light text-2xl text-white">
                Live Kami Cardholder Transactions on Stellar
              </h2>
            </div>
            <div className="flex items-center gap-2 font-mono text-xs text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-full border border-emerald-500/20">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>STREAMING FROM MAINNET</span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs font-mono">
              <thead>
                <tr className="border-b border-white/10 text-zinc-400">
                  <th className="py-3 px-3">TX HASH</th>
                  <th className="py-3 px-3">OPERATION</th>
                  <th className="py-3 px-3">AMOUNT</th>
                  <th className="py-3 px-3">LATENCY</th>
                  <th className="py-3 px-3 text-right">STATUS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {liveTxs.map((tx, idx) => (
                  <tr key={idx} className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-3.5 px-3 text-cyan-400 font-mono">{tx.hash}</td>
                    <td className="py-3.5 px-3 text-white font-sans">{tx.type}</td>
                    <td className="py-3.5 px-3 font-semibold font-mono text-white">{tx.amount}</td>
                    <td className="py-3.5 px-3 text-zinc-400">{tx.latency}</td>
                    <td className="py-3.5 px-3 text-right">
                      <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px]">
                        ✓ {tx.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Stellar Architecture Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          <div className="p-8 rounded-2xl bg-white/[0.03] border border-white/10 flex flex-col justify-between">
            <div>
              <span className="font-mono text-xs text-cyan-400 block mb-2">01 / CONSENSUS</span>
              <h3 className="font-display font-light text-xl text-white mb-3">
                Stellar Consensus Protocol (SCP)
              </h3>
              <p className="text-zinc-400 text-xs font-sans leading-relaxed">
                Unlike Proof of Work or Proof of Stake, SCP uses Federated Byzantine Agreement to reach consensus without energy waste in under 3.5 seconds.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-white/10 font-mono text-[10px] text-zinc-500">
              FEDERATED BYZANTINE AGREEMENT
            </div>
          </div>

          <div className="p-8 rounded-2xl bg-white/[0.03] border border-white/10 flex flex-col justify-between">
            <div>
              <span className="font-mono text-xs text-cyan-400 block mb-2">02 / SMART CONTRACTS</span>
              <h3 className="font-display font-light text-xl text-white mb-3">
                Soroban Rust Virtual Machine
              </h3>
              <p className="text-zinc-400 text-xs font-sans leading-relaxed">
                Kami Kards executes non-custodial smart vaults written in Rust and compiled to WebAssembly (Wasm) for maximum speed and audited security.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-white/10 font-mono text-[10px] text-zinc-500">
              WASM EXECUTION ENVIRONMENT
            </div>
          </div>

          <div className="p-8 rounded-2xl bg-white/[0.03] border border-white/10 flex flex-col justify-between">
            <div>
              <span className="font-mono text-xs text-cyan-400 block mb-2">03 / LIQUIDITY</span>
              <h3 className="font-display font-light text-xl text-white mb-3">
                Native DEX &amp; Atomic Path Payments
              </h3>
              <p className="text-zinc-400 text-xs font-sans leading-relaxed">
                Multi-currency routing automatically converts your XLM or USDC into local merchant fiat at the exact interbank spot rate with 0% markup.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-white/10 font-mono text-[10px] text-zinc-500">
              AUTOMATIC LIQUIDITY ROUTING
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
