'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CosmicBackground from '@/components/CosmicBackground';
import { StellarLogoSVG } from '@/components/CylinderCardCarousel';
import DownloadModal from '@/components/DownloadModal';

export default function SorobanPage() {
  const [depositAmount, setDepositAmount] = useState(2500);
  const [selectedAsset, setSelectedAsset] = useState<'USDC' | 'XLM'>('USDC');
  const [autoYield, setAutoYield] = useState(true);
  const [geoLock, setGeoLock] = useState(true);
  const [simulatedBalance, setSimulatedBalance] = useState(5000);
  const [depositSuccess, setDepositSuccess] = useState(false);
  const [downloadModalOpen, setDownloadModalOpen] = useState(false);

  const apyRate = selectedAsset === 'USDC' ? 0.052 : 0.038;
  const annualEarnings = (depositAmount * apyRate).toFixed(2);
  const monthlyEarnings = (depositAmount * (apyRate / 12)).toFixed(2);

  const handleDeposit = (e: React.FormEvent) => {
    e.preventDefault();
    setSimulatedBalance((prev) => prev + Number(depositAmount));
    setDepositSuccess(true);
    setTimeout(() => setDepositSuccess(false), 4000);
  };

  return (
    <div className="min-h-screen bg-black text-white relative flex flex-col justify-between">
      <CosmicBackground />
      <Navbar />

      <main className="max-w-7xl mx-auto px-6 sm:px-12 py-12 w-full">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/[0.08] border border-white/15 text-white font-mono text-[10px] tracking-widest uppercase mb-4">
            <StellarLogoSVG className="w-3.5 h-3.5 text-cyan-400" />
            <span>NON-CUSTODIAL VAULTS</span>
          </div>
          <h1 className="font-display font-light text-4xl sm:text-6xl tracking-tight text-white mb-4">
            Soroban Smart Vaults
          </h1>
          <p className="text-zinc-400 text-sm font-sans font-light leading-relaxed">
            Your funds remain in non-custodial smart contracts on Stellar. Earn 5.2% APY on idle USDC while maintaining instant liquidity for worldwide Visa spending.
          </p>
        </div>

        {/* Interactive Smart Vault Deposit Simulator */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-24">
          {/* Left Column: Interactive Vault Terminal */}
          <div className="lg:col-span-6 p-8 rounded-2xl bg-white/[0.03] border border-white/15 flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs text-cyan-400">SOROBAN VAULT TERMINAL</span>
              <span className="font-mono text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                AUDITED CONTRACT
              </span>
            </div>

            {/* Live Vault Balance */}
            <div className="p-5 rounded-xl bg-white/[0.04] border border-white/10 flex justify-between items-center">
              <div>
                <span className="font-mono text-[10px] text-zinc-400 block">YOUR VAULT BALANCE</span>
                <span className="font-mono text-3xl font-bold text-white mt-0.5 block">
                  ${simulatedBalance.toLocaleString()} <span className="text-xs text-zinc-400 font-normal">USDC</span>
                </span>
              </div>
              <div className="text-right font-mono text-xs">
                <span className="text-emerald-400 font-semibold block">+5.2% APY</span>
                <span className="text-zinc-500 text-[10px]">Auto-Compounding</span>
              </div>
            </div>

            {/* Deposit Simulator Form */}
            <form onSubmit={handleDeposit} className="flex flex-col gap-4">
              <div>
                <div className="flex justify-between font-mono text-[11px] text-zinc-400 mb-1.5">
                  <span>DEPOSIT ASSET</span>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setSelectedAsset('USDC')}
                      className={`px-2 py-0.5 rounded ${
                        selectedAsset === 'USDC' ? 'bg-white text-black font-semibold' : 'bg-white/10 text-zinc-400'
                      }`}
                    >
                      USDC (5.2%)
                    </button>
                    <button
                      type="button"
                      onClick={() => setSelectedAsset('XLM')}
                      className={`px-2 py-0.5 rounded ${
                        selectedAsset === 'XLM' ? 'bg-white text-black font-semibold' : 'bg-white/10 text-zinc-400'
                      }`}
                    >
                      XLM (3.8%)
                    </button>
                  </div>
                </div>

                <div className="relative">
                  <input
                    type="number"
                    min="100"
                    max="50000"
                    value={depositAmount}
                    onChange={(e) => setDepositAmount(Number(e.target.value))}
                    className="w-full bg-white/[0.05] border border-white/15 rounded-xl px-4 py-3 font-mono text-lg text-white outline-none focus:border-cyan-400"
                  />
                  <span className="absolute right-4 top-3.5 font-mono text-sm text-zinc-400">
                    {selectedAsset}
                  </span>
                </div>
              </div>

              {/* Earnings Projection */}
              <div className="grid grid-cols-2 gap-3 p-4 rounded-xl bg-white/[0.02] border border-white/10 font-mono text-xs">
                <div>
                  <span className="text-zinc-400 text-[10px] block">MONTHLY EARNINGS</span>
                  <span className="text-emerald-400 font-semibold mt-0.5 block">+${monthlyEarnings} {selectedAsset}</span>
                </div>
                <div>
                  <span className="text-zinc-400 text-[10px] block">ANNUAL ESTIMATE</span>
                  <span className="text-white font-semibold mt-0.5 block">+${annualEarnings} {selectedAsset}</span>
                </div>
              </div>

              {depositSuccess && (
                <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-xs font-mono text-emerald-300 text-center">
                  ✓ On-Chain Deposit Simulated! Balance Updated.
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3 bg-white text-black font-semibold rounded-xl text-xs font-mono hover:bg-zinc-200 transition-all shadow-lg"
              >
                Simulate Vault Deposit →
              </button>
            </form>
          </div>

          {/* Right Column: Smart Security Rules Engine */}
          <div className="lg:col-span-6 flex flex-col gap-6">
            <div className="p-8 rounded-2xl bg-white/[0.03] border border-white/15">
              <span className="font-mono text-xs text-cyan-400 block mb-2">SMART RULES ENGINE</span>
              <h3 className="font-display font-light text-2xl text-white mb-3">
                Autonomous Security Policies
              </h3>
              <p className="text-zinc-400 text-xs font-sans leading-relaxed mb-6">
                Configure programmable on-chain security rules directly on your Soroban smart vault without giving up your private keys.
              </p>

              <div className="flex flex-col gap-4">
                {/* Rule 1: Auto-Yield */}
                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10 flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="font-mono text-xs text-white font-medium">Auto-Compounding Liquidity</span>
                    <span className="text-[11px] text-zinc-400 font-sans">
                      Automatically route unspent card balance into audited Stellar yield pools.
                    </span>
                  </div>
                  <button
                    onClick={() => setAutoYield(!autoYield)}
                    className={`w-12 h-6 rounded-full transition-colors relative ${
                      autoYield ? 'bg-cyan-500' : 'bg-zinc-700'
                    }`}
                  >
                    <span
                      className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${
                        autoYield ? 'left-7' : 'left-1'
                      }`}
                    />
                  </button>
                </div>

                {/* Rule 2: Geo-Lock */}
                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10 flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="font-mono text-xs text-white font-medium">Smart Geo-Fencing</span>
                    <span className="text-[11px] text-zinc-400 font-sans">
                      Automatically decline physical POS transactions occurring outside your phone GPS radius.
                    </span>
                  </div>
                  <button
                    onClick={() => setGeoLock(!geoLock)}
                    className={`w-12 h-6 rounded-full transition-colors relative ${
                      geoLock ? 'bg-cyan-500' : 'bg-zinc-700'
                    }`}
                  >
                    <span
                      className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${
                        geoLock ? 'left-7' : 'left-1'
                      }`}
                    />
                  </button>
                </div>

                {/* Rule 3: Instant Liquidity Card Link */}
                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10 flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="font-mono text-xs text-white font-medium">Sub-second POS Unlocking</span>
                    <span className="text-[11px] text-zinc-400 font-sans">
                      Funds instantly unlock at merchant swipe via Stellar atomic path payment.
                    </span>
                  </div>
                  <span className="font-mono text-[10px] text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded border border-emerald-500/20">
                    ALWAYS ACTIVE
                  </span>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-white/10 flex justify-between items-center">
                <span className="font-mono text-xs text-zinc-400">Want full mobile control?</span>
                <button
                  onClick={() => setDownloadModalOpen(true)}
                  className="px-4 py-2 bg-white text-black font-semibold rounded-xl text-xs font-mono hover:bg-zinc-200 transition-all"
                >
                  Download App →
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <DownloadModal isOpen={downloadModalOpen} onClose={() => setDownloadModalOpen(false)} />
    </div>
  );
}
