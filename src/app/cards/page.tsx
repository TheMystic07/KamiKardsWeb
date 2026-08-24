'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CosmicBackground from '@/components/CosmicBackground';
import { StellarLogoSVG } from '@/components/CylinderCardCarousel';
import DownloadModal from '@/components/DownloadModal';

const TIERS = [
  {
    id: 'obsidian',
    name: 'Obsidian Metal',
    tagline: '18g Heavyweight Matte Black Steel',
    fxFee: '0%',
    cashback: '3.5% XLM',
    yield: '5.2% USDC',
    atmLimit: '$5,000 / day',
    color: 'from-zinc-900 to-black',
    accent: '#ffffff',
    bgTexture: 'bg-gradient-to-tr from-zinc-900 via-black to-zinc-950',
    perks: ['Global Airport Lounge Access', 'Metal Concierge Service', 'Instant Zero-Fee FX', 'Non-Custodial Soroban Vault'],
  },
  {
    id: 'founder',
    name: 'Stellar Founder',
    tagline: '24K Gold Plated Ceramic Composite',
    fxFee: '0%',
    cashback: '5.0% XLM',
    yield: '6.0% USDC',
    atmLimit: '$10,000 / day',
    color: 'from-amber-900 via-amber-700 to-black',
    accent: '#f59e0b',
    bgTexture: 'bg-gradient-to-tr from-amber-950 via-zinc-900 to-black',
    perks: ['Limited Founder Edition NFT', 'VIP On-Chain Staking', '0.00001 XLM Gas Sponsorship', 'Private Banker Support'],
  },
  {
    id: 'cyber',
    name: 'Cyber Titanium',
    tagline: 'Laser-Etched Brushed Cyan Titanium',
    fxFee: '0%',
    cashback: '2.5% XLM',
    yield: '5.2% USDC',
    atmLimit: '$3,000 / day',
    color: 'from-cyan-950 via-slate-900 to-black',
    accent: '#00f0ff',
    bgTexture: 'bg-gradient-to-tr from-cyan-950 via-zinc-950 to-black',
    perks: ['Real-Time POS Push Alerts', 'Virtual Disposable Numbers', 'Apple & Google Pay Instant', 'Zero Annual Fees'],
  },
  {
    id: 'virtual',
    name: 'Instant Virtual',
    tagline: 'Zero-Wait Apple & Google Pay Virtual Card',
    fxFee: '0%',
    cashback: '1.5% XLM',
    yield: '4.8% USDC',
    atmLimit: '$1,500 / day',
    color: 'from-purple-950 via-zinc-900 to-black',
    accent: '#a855f7',
    bgTexture: 'bg-gradient-to-tr from-purple-950 via-black to-zinc-950',
    perks: ['Issued in 3.5 Seconds', 'Unlimited Burner Cards', 'Subscription Geo-Lock', 'Zero Issuance Fee'],
  },
];

export default function CardsPage() {
  const [selectedTier, setSelectedTier] = useState(TIERS[0]);
  const [cardHolder, setCardHolder] = useState('ALEXANDER VANCE');
  const [isFrozen, setIsFrozen] = useState(false);
  const [spendLimit, setSpendLimit] = useState(2500);
  const [monthlySpend, setMonthlySpend] = useState(3000);
  const [orderModalOpen, setOrderModalOpen] = useState(false);
  const [downloadModalOpen, setDownloadModalOpen] = useState(false);
  const [ordered, setOrdered] = useState(false);

  // Financial savings math
  const traditionalFxLoss = Math.round(monthlySpend * 0.03 * 12);
  const kamiCashbackYearly = Math.round(monthlySpend * (parseFloat(selectedTier.cashback) / 100) * 12);
  const kamiYieldYearly = Math.round(5000 * 0.052);
  const totalKamiAdvantage = traditionalFxLoss + kamiCashbackYearly + kamiYieldYearly;

  return (
    <div className="min-h-screen bg-black text-white relative flex flex-col justify-between">
      <CosmicBackground />
      <Navbar />

      <main className="max-w-7xl mx-auto px-6 sm:px-12 py-12 w-full">
        {/* Page Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/[0.08] border border-white/15 text-white font-mono text-[10px] tracking-widest uppercase mb-4">
            <StellarLogoSVG className="w-3.5 h-3.5" />
            <span>3D CARD STUDIO &amp; TIERS</span>
          </div>
          <h1 className="font-display font-light text-4xl sm:text-6xl tracking-tight text-white mb-4">
            Engineered for Stellar. Spent on Visa.
          </h1>
          <p className="text-zinc-400 text-sm font-sans font-light leading-relaxed">
            Customize your non-custodial Kami Visa card. Spend your USDC &amp; XLM at over 40 million merchants worldwide with 0% foreign transaction fees.
          </p>
        </div>

        {/* Interactive 3D Card Studio & Customizer Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-24">
          {/* Left Column: Interactive 3D Live Card Mockup */}
          <div className="lg:col-span-7 flex flex-col items-center justify-center">
            <div
              className={`relative w-full max-w-[440px] aspect-[1.59/1] rounded-2xl border border-white/20 p-7 flex flex-col justify-between shadow-[0_25px_60px_rgba(0,0,0,0.9)] transition-all duration-500 ${
                isFrozen ? 'brightness-50 grayscale' : ''
              } ${selectedTier.bgTexture}`}
            >
              {/* Card Foil Sheen */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.08] to-transparent pointer-events-none rounded-2xl" />

              {/* Frozen Overlay */}
              {isFrozen && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/60 rounded-2xl z-30 font-mono text-cyan-400 text-sm tracking-widest border-2 border-cyan-400/40">
                  ❄ CARD FROZEN
                </div>
              )}

              {/* Top Row: Brand & Stellar Mark */}
              <div className="flex items-start justify-between z-10">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-display font-light text-xl tracking-[0.16em] text-white">
                      KAMI
                    </span>
                    <span className="font-mono text-[9px] tracking-widest px-1.5 py-0.5 rounded bg-white/10 border border-white/20">
                      CARD
                    </span>
                  </div>
                  <span className="font-mono text-[9px] text-zinc-400 tracking-wider">
                    {selectedTier.name.toUpperCase()}
                  </span>
                </div>

                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/50 border border-white/20 backdrop-blur-md">
                  <StellarLogoSVG className="w-3.5 h-3.5 text-white" />
                  <span className="font-mono text-[9px] tracking-widest text-white">STELLAR</span>
                </div>
              </div>

              {/* Middle Row: EMV Chip & Contactless */}
              <div className="flex items-center gap-4 my-auto z-10">
                <div className="w-11 h-8 rounded-md bg-gradient-to-tr from-slate-400 via-slate-200 to-slate-400 p-[1px] shadow-md">
                  <div className="w-full h-full rounded-[5px] bg-[#cbd5e1] border border-slate-400 flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-x-0 top-1/2 h-[1px] bg-slate-500" />
                    <div className="absolute inset-y-0 left-1/3 w-[1px] bg-slate-500" />
                    <div className="absolute inset-y-0 right-1/3 w-[1px] bg-slate-500" />
                    <div className="w-3 h-3 rounded-full border border-slate-500" />
                  </div>
                </div>

                <svg className="w-5 h-5 text-white/70" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M8.5 16.5a5 5 0 0 1 0-9" />
                  <path d="M12 19a8.5 8.5 0 0 0 0-14" />
                  <path d="M15.5 21.5a12 12 0 0 0 0-19" />
                </svg>
              </div>

              {/* Bottom Row: Cardholder Name, Number & Visa Mark */}
              <div className="flex items-end justify-between z-10">
                <div className="flex flex-col gap-1">
                  <span className="font-mono text-xs tracking-[0.16em] text-white font-medium">
                    {cardHolder || 'YOUR NAME'}
                  </span>
                  <span className="font-mono text-[10px] text-zinc-400 tracking-widest">
                    4232 •••• •••• 8892
                  </span>
                </div>

                <div className="flex flex-col items-end">
                  <span className="font-sans font-black italic text-2xl tracking-tighter text-white">
                    VISA
                  </span>
                  <span className="font-mono text-[8px] tracking-[0.2em] text-zinc-400 -mt-1 uppercase">
                    DEBIT
                  </span>
                </div>
              </div>
            </div>

            {/* Live Card Controls */}
            <div className="flex gap-4 mt-6">
              <button
                onClick={() => setIsFrozen(!isFrozen)}
                className={`px-4 py-2 rounded-xl border text-xs font-mono transition-all ${
                  isFrozen
                    ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300'
                    : 'bg-white/[0.05] border-white/15 text-zinc-300 hover:text-white'
                }`}
              >
                {isFrozen ? '❄ Unfreeze Card' : '🔒 Freeze Card'}
              </button>

              <button
                onClick={() => setOrderModalOpen(true)}
                className="px-6 py-2 bg-white text-black font-semibold rounded-xl text-xs font-mono hover:bg-zinc-200 transition-all shadow-lg"
              >
                Order {selectedTier.name} →
              </button>
            </div>
          </div>

          {/* Right Column: Customizer Controls & Tier Selector */}
          <div className="lg:col-span-5 flex flex-col gap-6 p-8 rounded-2xl bg-white/[0.03] border border-white/10">
            <h3 className="font-display font-light text-xl text-white">Card Configuration</h3>

            {/* Tier Radio selector */}
            <div className="flex flex-col gap-2.5">
              <span className="font-mono text-[11px] text-zinc-400">SELECT EDITION</span>
              <div className="grid grid-cols-2 gap-2">
                {TIERS.map((tier) => (
                  <button
                    key={tier.id}
                    onClick={() => setSelectedTier(tier)}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      selectedTier.id === tier.id
                        ? 'bg-white/10 border-white text-white shadow-lg'
                        : 'bg-white/[0.02] border-white/10 text-zinc-400 hover:text-white'
                    }`}
                  >
                    <div className="font-mono text-xs font-semibold">{tier.name}</div>
                    <div className="font-mono text-[10px] text-cyan-400 mt-0.5">{tier.cashback}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Cardholder Name Input */}
            <div className="flex flex-col gap-2">
              <label htmlFor="nameInput" className="font-mono text-[11px] text-zinc-400">
                EMBOSSED CARDHOLDER NAME
              </label>
              <input
                id="nameInput"
                type="text"
                maxLength={24}
                value={cardHolder}
                onChange={(e) => setCardHolder(e.target.value.toUpperCase())}
                className="w-full bg-white/[0.05] border border-white/15 rounded-xl px-4 py-2.5 font-mono text-sm text-white focus:border-cyan-400 outline-none"
              />
            </div>

            {/* Daily Limit Slider */}
            <div className="flex flex-col gap-2">
              <div className="flex justify-between font-mono text-[11px]">
                <span className="text-zinc-400">DAILY SPEND LIMIT</span>
                <span className="text-white">${spendLimit.toLocaleString()} USD</span>
              </div>
              <input
                type="range"
                min="500"
                max="10000"
                step="250"
                value={spendLimit}
                onChange={(e) => setSpendLimit(Number(e.target.value))}
                className="w-full accent-cyan-400"
              />
            </div>

            {/* Tier Benefits List */}
            <div className="pt-4 border-t border-white/10">
              <span className="font-mono text-[11px] text-zinc-400 block mb-2.5">INCLUDED PRIVILEGES</span>
              <ul className="flex flex-col gap-2">
                {selectedTier.perks.map((perk, i) => (
                  <li key={i} className="flex items-center gap-2 text-xs text-zinc-300 font-sans">
                    <span className="text-cyan-400 font-mono">✓</span>
                    <span>{perk}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Cashback & FX Savings Calculator */}
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-white/[0.05] via-white/[0.02] to-transparent border border-white/15 mb-24">
          <div className="max-w-xl mb-8">
            <span className="font-mono text-[10px] tracking-widest text-cyan-400 uppercase">
              ROI &amp; SAVINGS CALCULATOR
            </span>
            <h2 className="font-display font-light text-3xl sm:text-4xl text-white mt-1 mb-2">
              See how much you save on Stellar
            </h2>
            <p className="text-zinc-400 text-xs font-sans">
              Traditional credit cards charge a 3% hidden foreign transaction fee. Kami Kards gives you 0% FX fees plus instant XLM cashback and 5.2% USDC yield.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-6 flex flex-col gap-4">
              <div className="flex justify-between font-mono text-sm">
                <span className="text-zinc-400">MONTHLY CARD SPEND</span>
                <span className="text-white font-bold">${monthlySpend.toLocaleString()} USD</span>
              </div>
              <input
                type="range"
                min="500"
                max="15000"
                step="500"
                value={monthlySpend}
                onChange={(e) => setMonthlySpend(Number(e.target.value))}
                className="w-full accent-cyan-400 h-2 bg-white/10 rounded-lg"
              />
              <div className="flex justify-between font-mono text-[10px] text-zinc-500">
                <span>$500/mo</span>
                <span>$7,500/mo</span>
                <span>$15,000/mo</span>
              </div>
            </div>

            <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-white/[0.04] border border-white/10">
                <span className="font-mono text-[10px] text-zinc-400 block">0% FX SAVED</span>
                <span className="font-display text-2xl text-emerald-400 font-light mt-1 block">
                  +${traditionalFxLoss}
                </span>
                <span className="text-[9px] font-mono text-zinc-500">vs 3% bank FX fees/yr</span>
              </div>

              <div className="p-4 rounded-xl bg-white/[0.04] border border-white/10">
                <span className="font-mono text-[10px] text-zinc-400 block">XLM CASHBACK</span>
                <span className="font-display text-2xl text-cyan-400 font-light mt-1 block">
                  +${kamiCashbackYearly}
                </span>
                <span className="text-[9px] font-mono text-zinc-500">{selectedTier.cashback} annual payout</span>
              </div>

              <div className="p-4 rounded-xl bg-white/[0.08] border border-cyan-500/30">
                <span className="font-mono text-[10px] text-cyan-300 block">TOTAL GAIN</span>
                <span className="font-display text-2xl text-white font-semibold mt-1 block">
                  +${totalKamiAdvantage}
                </span>
                <span className="text-[9px] font-mono text-emerald-400">Saved &amp; earned / yr</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tiers Comparison Table */}
        <div className="mb-24">
          <h2 className="font-display font-light text-3xl text-white mb-8 text-center">
            Complete Tier Specifications
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs font-mono">
              <thead>
                <tr className="border-b border-white/15 text-zinc-400">
                  <th className="py-4 px-4">FEATURE</th>
                  <th className="py-4 px-4 text-white">OBSIDIAN METAL</th>
                  <th className="py-4 px-4 text-amber-400">STELLAR FOUNDER</th>
                  <th className="py-4 px-4 text-cyan-400">CYBER TITANIUM</th>
                  <th className="py-4 px-4 text-purple-400">INSTANT VIRTUAL</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10 text-zinc-300 font-sans">
                <tr>
                  <td className="py-4 px-4 font-mono font-semibold text-zinc-400">Card Material</td>
                  <td className="py-4 px-4">18g Solid Steel</td>
                  <td className="py-4 px-4">24K Gold Plated Ceramic</td>
                  <td className="py-4 px-4">Brushed Cyan Titanium</td>
                  <td className="py-4 px-4">Apple / Google Wallet</td>
                </tr>
                <tr>
                  <td className="py-4 px-4 font-mono font-semibold text-zinc-400">Foreign Exchange (FX)</td>
                  <td className="py-4 px-4 text-emerald-400 font-mono">0.0%</td>
                  <td className="py-4 px-4 text-emerald-400 font-mono">0.0%</td>
                  <td className="py-4 px-4 text-emerald-400 font-mono">0.0%</td>
                  <td className="py-4 px-4 text-emerald-400 font-mono">0.0%</td>
                </tr>
                <tr>
                  <td className="py-4 px-4 font-mono font-semibold text-zinc-400">Crypto Cashback</td>
                  <td className="py-4 px-4 font-mono">3.5% XLM</td>
                  <td className="py-4 px-4 font-mono">5.0% XLM</td>
                  <td className="py-4 px-4 font-mono">2.5% XLM</td>
                  <td className="py-4 px-4 font-mono">1.5% XLM</td>
                </tr>
                <tr>
                  <td className="py-4 px-4 font-mono font-semibold text-zinc-400">USDC Vault Yield</td>
                  <td className="py-4 px-4 font-mono text-cyan-400">5.2% APY</td>
                  <td className="py-4 px-4 font-mono text-cyan-400">6.0% APY</td>
                  <td className="py-4 px-4 font-mono text-cyan-400">5.2% APY</td>
                  <td className="py-4 px-4 font-mono text-cyan-400">4.8% APY</td>
                </tr>
                <tr>
                  <td className="py-4 px-4 font-mono font-semibold text-zinc-400">Daily ATM Withdrawal</td>
                  <td className="py-4 px-4 font-mono">$5,000</td>
                  <td className="py-4 px-4 font-mono">$10,000</td>
                  <td className="py-4 px-4 font-mono">$3,000</td>
                  <td className="py-4 px-4 font-mono">$1,500</td>
                </tr>
                <tr>
                  <td className="py-4 px-4 font-mono font-semibold text-zinc-400">Issuance Time</td>
                  <td className="py-4 px-4">2-3 Business Days</td>
                  <td className="py-4 px-4">Priority Overnight</td>
                  <td className="py-4 px-4">2-3 Business Days</td>
                  <td className="py-4 px-4 text-emerald-400 font-mono">&lt; 3.5 Seconds</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </main>

      <Footer />

      {/* Order Card Interactive Modal */}
      {orderModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl animate-in fade-in"
          onClick={() => setOrderModalOpen(false)}
        >
          <div
            className="relative w-full max-w-md bg-[#0d0e12] border border-white/20 rounded-2xl p-6 sm:p-8 text-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setOrderModalOpen(false)}
              className="absolute top-4 right-4 text-zinc-400 hover:text-white p-2 font-mono"
            >
              ✕
            </button>

            <div className="flex items-center gap-2 mb-2">
              <StellarLogoSVG className="w-4 h-4 text-cyan-400" />
              <span className="font-mono text-[10px] tracking-widest text-cyan-400">
                SOROBAN VAULT ISSUANCE
              </span>
            </div>

            <h3 className="font-display font-light text-2xl text-white mb-2">
              Reserve {selectedTier.name}
            </h3>

            {ordered ? (
              <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-center my-6">
                <span className="text-2xl block mb-2">✓</span>
                <h4 className="font-mono text-sm font-semibold text-emerald-300 mb-1">
                  Card Reserved Successfully
                </h4>
                <p className="text-xs text-zinc-300 font-sans">
                  Your smart vault allocation on Stellar has been registered. Download the mobile app to complete zero-knowledge verification.
                </p>
                <button
                  onClick={() => {
                    setOrderModalOpen(false);
                    setDownloadModalOpen(true);
                  }}
                  className="mt-4 px-6 py-2.5 bg-white text-black font-semibold rounded-xl text-xs font-mono"
                >
                  Download Mobile App →
                </button>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setOrdered(true);
                }}
                className="flex flex-col gap-4 mt-6"
              >
                <div>
                  <label className="font-mono text-[10px] text-zinc-400 block mb-1">EMAIL ADDRESS</label>
                  <input
                    type="email"
                    required
                    placeholder="Enter your email"
                    className="w-full bg-white/[0.05] border border-white/15 rounded-xl px-4 py-2.5 font-mono text-xs text-white outline-none focus:border-cyan-400"
                  />
                </div>

                <div>
                  <label className="font-mono text-[10px] text-zinc-400 block mb-1">SHIPPING COUNTRY</label>
                  <select className="w-full bg-[#15161c] border border-white/15 rounded-xl px-4 py-2.5 font-mono text-xs text-white outline-none">
                    <option>United States (Domestic)</option>
                    <option>United Kingdom &amp; EU</option>
                    <option>Canada &amp; LATAM</option>
                    <option>Singapore &amp; Asia-Pacific</option>
                    <option>Other Global (180+ countries)</option>
                  </select>
                </div>

                <div className="p-3 bg-white/[0.03] border border-white/10 rounded-xl flex items-center justify-between text-xs font-mono">
                  <span className="text-zinc-400">ISSUANCE COST</span>
                  <span className="text-emerald-400 font-semibold">$0.00 (FREE FOR TEST LAUNCH)</span>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-white text-black font-semibold rounded-xl text-xs font-mono hover:bg-zinc-200 transition-all shadow-lg"
                >
                  Confirm Card Reservation →
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Download App Modal */}
      <DownloadModal isOpen={downloadModalOpen} onClose={() => setDownloadModalOpen(false)} />
    </div>
  );
}
