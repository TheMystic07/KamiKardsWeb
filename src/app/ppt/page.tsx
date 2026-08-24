'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import CosmicBackground from '@/components/CosmicBackground';
import CylinderCardCarousel, { StellarLogoSVG } from '@/components/CylinderCardCarousel';

export default function PitchDeckPage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showNotes, setShowNotes] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showOverview, setShowOverview] = useState(false);

  // Pitch timer
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(true);

  // Slide 3: Interactive Architecture step
  const [activeStep, setActiveStep] = useState(0);

  // Slide 4: Contract tab selector
  const [contractTab, setContractTab] = useState<'vault' | 'settle' | 'cashback'>('vault');

  // Slide 6: 3D Card Tier preview
  const [previewTier, setPreviewTier] = useState<'obsidian' | 'founder' | 'cyber' | 'virtual'>('obsidian');

  // Slide 7: Live POS Simulator state
  const [simAmount, setSimAmount] = useState('45.00');
  const [simStatus, setSimStatus] = useState<'idle' | 'authorizing' | 'settled'>('idle');
  const [simTx, setSimTx] = useState<{ hash: string; latency: string; cashback: string } | null>(null);

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTimerRunning) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning]);

  const formatTimer = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleSimulateSwipe = () => {
    setSimStatus('authorizing');
    setSimTx(null);
    setTimeout(() => {
      setSimStatus('settled');
      const hash = Math.random().toString(16).substring(2, 8) + '...' + Math.random().toString(16).substring(2, 6);
      const latency = (Math.random() * 0.6 + 2.8).toFixed(1);
      const cashback = (parseFloat(simAmount) * 0.035).toFixed(2);
      setSimTx({ hash, latency, cashback });
    }, 2800);
  };

  const totalSlides = 9;

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev < totalSlides - 1 ? prev + 1 : prev));
  }, [totalSlides]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev > 0 ? prev - 1 : prev));
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'Space') {
        e.preventDefault();
        nextSlide();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        prevSlide();
      } else if (e.key === 'f' || e.key === 'F') {
        toggleFullscreen();
      } else if (e.key === 'o' || e.key === 'O') {
        setShowOverview((prev) => !prev);
      } else if (e.key === 'n' || e.key === 'N') {
        setShowNotes((prev) => !prev);
      } else if (e.key === 'Home') {
        setCurrentSlide(0);
      } else if (e.key === 'End') {
        setCurrentSlide(totalSlides - 1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide, totalSlides]);

  const progressPercent = ((currentSlide + 1) / totalSlides) * 100;

  // Speaker notes per slide
  const slideNotes = [
    'Welcome judges. Kami Kards solves the last-mile problem of crypto: spending non-custodial stablecoins on physical and virtual Visa cards in <3.5s with zero FX spread.',
    'Highlight the point-of-sale friction: EVM chains cause terminal timeouts, and centralized crypto cards take custody of user keys.',
    'Walk through the 5-step transaction lifecycle from card tap to Soroban atomic path payment execution.',
    'Present the actual Soroban Rust contract code. Explain non-custodial authorization checks and deterministic ledger event emission.',
    'Benchmark comparison: Show why Stellar SCP consensus and native Circle USDC beat Ethereum and Solana for consumer payment rails.',
    'Showcase the hardware & software suite: 18g solid steel physical cards, instant virtual cards, and sovereign mobile enclave app.',
    'Demonstrate the live interactive POS swipe simulator right on the slide. Show judges the instant <3.5s settlement and XLM cashback.',
    'Post-hackathon trajectory: Testnet audit, SCF grant alignment, and Visa Fintech Fast Track issuer pilot.',
    'Wrap up the pitch, recap key breakthroughs, and invite judges for technical Q&A.',
  ];

  return (
    <div className="min-h-screen bg-[#000000] text-white flex flex-col justify-between overflow-y-auto select-none relative font-sans">
      <CosmicBackground />

      {/* Top Deck HUD Header */}
      <header className="flex items-center justify-between px-6 sm:px-10 py-3.5 border-b border-white/10 bg-black/70 backdrop-blur-xl z-30">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center">
            <StellarLogoSVG className="w-4 h-4 text-cyan-400" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-display font-light text-base tracking-[0.16em] text-white">KAMI</span>
              <span className="font-mono text-[9px] px-1.5 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-semibold tracking-wider">
                HACKATHON DECK
              </span>
            </div>
            <span className="font-mono text-[8px] text-zinc-400 tracking-wider">STELLAR &amp; SOROBAN ECOSYSTEM</span>
          </div>
        </div>

        {/* Pitch Timer & Interactive Controls */}
        <div className="flex items-center gap-3 font-mono text-xs">
          {/* Pitch Timer */}
          <div
            onClick={() => setIsTimerRunning(!isTimerRunning)}
            className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/[0.05] border border-white/10 text-zinc-300 cursor-pointer hover:text-white"
            title="Click to pause/resume pitch timer"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>⏱ {formatTimer(timerSeconds)}</span>
          </div>

          <div className="px-3 py-1 rounded-lg bg-white/[0.05] border border-white/10 text-zinc-400">
            <span className="text-white font-bold">{currentSlide + 1}</span> / {totalSlides}
          </div>

          <button
            onClick={() => setShowOverview(!showOverview)}
            className={`px-3 py-1 rounded-lg border text-xs transition-all ${
              showOverview ? 'bg-white text-black font-semibold' : 'bg-white/[0.05] border-white/10 text-zinc-300 hover:text-white'
            }`}
            title="Press 'O' for slide grid overview"
          >
            Grid (O)
          </button>

          <button
            onClick={() => setShowNotes(!showNotes)}
            className={`px-3 py-1 rounded-lg border text-xs transition-all ${
              showNotes ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300' : 'bg-white/[0.05] border-white/10 text-zinc-300 hover:text-white'
            }`}
            title="Press 'N' for speaker notes"
          >
            Notes (N)
          </button>

          <button
            onClick={toggleFullscreen}
            className="p-1.5 px-2.5 rounded-lg bg-white/[0.05] border border-white/10 text-zinc-300 hover:text-white text-xs"
            title="Press 'F' for fullscreen"
          >
            {isFullscreen ? 'Exit Fullscreen' : '⛶ Fullscreen (F)'}
          </button>
        </div>
      </header>

      {/* Slide Progress Line */}
      <div className="w-full h-1 bg-white/10 relative z-30">
        <div
          className="h-full bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 transition-all duration-300 ease-out shadow-[0_0_12px_rgba(0,240,255,0.8)]"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Dynamic Slide Stage */}
      <main className="flex-1 flex flex-col justify-center max-w-6xl w-full mx-auto px-4 sm:px-8 lg:px-12 py-6 z-10 overflow-visible">
        {/* SLIDE 1: Title Slide with Live 3D Cylinder Card Carousel */}
        {currentSlide === 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center animate-in fade-in zoom-in-95 duration-200">
            <div className="lg:col-span-7 flex flex-col items-start text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-mono text-[10px] tracking-widest uppercase mb-4">
                <StellarLogoSVG className="w-3.5 h-3.5 text-cyan-400" />
                <span>STELLAR HACKATHON 2026 • DEMO STAGE</span>
              </div>

              <h1 className="font-display font-light text-4xl sm:text-6xl tracking-tight text-white leading-[1.05] mb-4">
                Non-Custodial Visa Debit on Stellar.
              </h1>

              <p className="font-mono text-xs sm:text-sm text-zinc-300 max-w-xl font-light leading-relaxed mb-6">
                Direct point-of-sale spending for native USDC &amp; XLM. Powered by Soroban smart vaults with sub-3.5s deterministic settlement and 0% FX fees.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 w-full max-w-lg font-mono text-xs">
                <div className="p-3 rounded-xl bg-white/[0.04] border border-white/10">
                  <span className="text-zinc-500 text-[9px] block uppercase">SETTLEMENT</span>
                  <span className="text-cyan-400 font-bold text-sm mt-0.5 block">&lt; 3.5s Finality</span>
                </div>
                <div className="p-3 rounded-xl bg-white/[0.04] border border-white/10">
                  <span className="text-zinc-500 text-[9px] block uppercase">SMART CONTRACTS</span>
                  <span className="text-emerald-400 font-bold text-sm mt-0.5 block">Soroban (Rust)</span>
                </div>
                <div className="p-3 rounded-xl bg-white/[0.04] border border-white/10 col-span-2 sm:col-span-1">
                  <span className="text-zinc-500 text-[9px] block uppercase">NETWORK COST</span>
                  <span className="text-white font-bold text-sm mt-0.5 block">0.00001 XLM</span>
                </div>
              </div>
            </div>

            {/* Embedded Live 3D Cylinder Carousel directly on the slide with ample breathing room */}
            <div className="lg:col-span-5 h-[420px] sm:h-[480px] w-full relative flex items-center justify-center overflow-visible">
              <CylinderCardCarousel scale={0.88} />
              <div className="absolute bottom-1 font-mono text-[8px] text-zinc-500 uppercase tracking-widest pointer-events-none">
                ● Live 3D WebGL Cylinder Deck • Cursor Tilt
              </div>
            </div>
          </div>
        )}

        {/* SLIDE 2: The Real Technical Friction in Crypto Cards */}
        {currentSlide === 1 && (
          <div className="flex flex-col gap-4 animate-in fade-in zoom-in-95 duration-200">
            <div>
              <span className="font-mono text-xs text-cyan-400 uppercase tracking-widest block mb-1">
                02 / THE CORE FRICTION
              </span>
              <h2 className="font-display font-light text-3xl sm:text-4xl text-white">
                Why Crypto Cards Break in the Real World
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-4">
              <div className="p-6 rounded-2xl bg-red-950/20 border border-red-500/30 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-2xl">⏳</span>
                    <span className="font-mono text-[10px] text-red-400 bg-red-500/10 px-2 py-0.5 rounded border border-red-500/20">
                      POS TIMEOUT
                    </span>
                  </div>
                  <h3 className="font-display text-xl text-white mb-2">EVM Latency Fails Swipes</h3>
                  <p className="text-xs text-zinc-300 font-sans leading-relaxed">
                    Visa card readers timeout after <strong>4.5 seconds</strong>. Ethereum and rollups take 12 to 60 seconds for deterministic finality, resulting in constant terminal declines at registers.
                  </p>
                </div>
                <span className="font-mono text-[10px] text-red-400 pt-4 border-t border-white/5">
                  12s - 60s BLOCK TIME
                </span>
              </div>

              <div className="p-6 rounded-2xl bg-red-950/20 border border-red-500/30 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-2xl">🔓</span>
                    <span className="font-mono text-[10px] text-red-400 bg-red-500/10 px-2 py-0.5 rounded border border-red-500/20">
                      CUSTODIAL RISK
                    </span>
                  </div>
                  <h3 className="font-display text-xl text-white mb-2">Centralized Exchange Cards</h3>
                  <p className="text-xs text-zinc-300 font-sans leading-relaxed">
                    Existing crypto cards (Coinbase, Crypto.com) are 100% custodial. Users forfeit private keys. When platforms halt withdrawals, cardholder balances are wiped out.
                  </p>
                </div>
                <span className="font-mono text-[10px] text-red-400 pt-4 border-t border-white/5">
                  NOT YOUR KEYS, NOT YOUR MONEY
                </span>
              </div>

              <div className="p-6 rounded-2xl bg-red-950/20 border border-red-500/30 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-2xl">💸</span>
                    <span className="font-mono text-[10px] text-red-400 bg-red-500/10 px-2 py-0.5 rounded border border-red-500/20">
                      UNVIABLE OVERHEAD
                    </span>
                  </div>
                  <h3 className="font-display text-xl text-white mb-2">$4 Gas on $3.50 Coffee + 3% FX</h3>
                  <p className="text-xs text-zinc-300 font-sans leading-relaxed">
                    Unpredictable gas spikes make everyday retail micropayments economically unfeasible. In addition, traditional neobanks charge a quiet 3% hidden foreign exchange markup.
                  </p>
                </div>
                <span className="font-mono text-[10px] text-red-400 pt-4 border-t border-white/5">
                  ECONOMICALLY UNFEASIBLE
                </span>
              </div>
            </div>
          </div>
        )}

        {/* SLIDE 3: Interactive On-Chain System Architecture */}
        {currentSlide === 2 && (
          <div className="flex flex-col gap-4 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex justify-between items-end">
              <div>
                <span className="font-mono text-xs text-cyan-400 uppercase tracking-widest block mb-1">
                  03 / SYSTEM ARCHITECTURE
                </span>
                <h2 className="font-display font-light text-3xl sm:text-4xl text-white">
                  Sub-3.5s Transaction Lifecycle
                </h2>
              </div>
              <span className="font-mono text-xs text-zinc-400 hidden sm:block">
                Click any step to inspect technical execution
              </span>
            </div>

            {/* Interactive Step Navigator */}
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 my-3">
              {[
                { title: '1. Deposit', desc: 'Non-custodial USDC vault deposit on Stellar', badge: 'SOROBAN' },
                { title: '2. Swipe', desc: 'Card tapped at any Visa POS terminal worldwide', badge: 'VISA POS' },
                { title: '3. Auth Relay', desc: 'Cryptographic allowance & limit verification', badge: 'MPC RELAY' },
                { title: '4. Atomic Settle', desc: 'Stellar SCP closes ledger in <3.5s with 0% FX', badge: 'SCP LEDGER' },
                { title: '5. Cashback', desc: 'Instant XLM rewards credited to card vault', badge: 'REWARDS' },
              ].map((step, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveStep(idx)}
                  className={`p-4 rounded-xl border text-left transition-all ${
                    activeStep === idx
                      ? 'bg-cyan-950/40 border-cyan-400 text-white shadow-[0_0_20px_rgba(0,240,255,0.2)]'
                      : 'bg-white/[0.03] border-white/10 hover:border-white/20 text-zinc-400'
                  }`}
                >
                  <span className="font-mono text-[9px] text-cyan-400 block mb-1">{step.badge}</span>
                  <div className="font-display font-semibold text-xs text-white mb-1">{step.title}</div>
                  <p className="text-[10px] text-zinc-400 font-sans line-clamp-2">{step.desc}</p>
                </button>
              ))}
            </div>

            {/* Dynamic Step Detail Inspector */}
            <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/15 font-mono text-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <span className="text-cyan-400 font-bold text-sm block mb-1">
                  {activeStep === 0 && 'STEP 01: Non-Custodial Vault Provisioning on Soroban'}
                  {activeStep === 1 && 'STEP 02: Visa Authorization Webhook Initiation'}
                  {activeStep === 2 && 'STEP 03: Multi-Party Computation (MPC) Proof Validation'}
                  {activeStep === 3 && 'STEP 04: Stellar Consensus SCP Deterministic Settlement'}
                  {activeStep === 4 && 'STEP 05: On-Chain XLM Cashback Payout Protocol'}
                </span>
                <p className="text-xs text-zinc-300 font-sans leading-relaxed">
                  {activeStep === 0 &&
                    'User deposits native Circle USDC directly into their audited Soroban smart contract. The contract enforces daily spend limits, geo-fencing rules, and auto-yield compounding while maintaining sovereign user ownership.'}
                  {activeStep === 1 &&
                    'When a physical or Apple Pay card swipe occurs at any merchant in 180+ countries, Visa routes an ISO 8583 authorization payload to the certified Kami issuing relayer.'}
                  {activeStep === 2 &&
                    'The Kami relayer verifies that the transaction conforms to the user pre-authorized smart vault policy and cryptographic spending allowance without holding private keys.'}
                  {activeStep === 3 &&
                    'Soroban contract executes an atomic path payment on the Stellar native DEX, converting USDC to the merchant local currency in 3.2 seconds at spot interbank rates with 0% markup.'}
                  {activeStep === 4 &&
                    'Upon successful ledger close, the contract automatically mints/distributes 3.5% - 5.0% XLM cashback straight into the cardholder non-custodial smart vault.'}
                </p>
              </div>

              <div className="px-4 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-mono text-xs shrink-0">
                ● 3.2s LATENCY VERIFIED
              </div>
            </div>
          </div>
        )}

        {/* SLIDE 4: Real Soroban Smart Contract Code (Rust) */}
        {currentSlide === 3 && (
          <div className="flex flex-col gap-3 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex justify-between items-end">
              <div>
                <span className="font-mono text-xs text-cyan-400 uppercase tracking-widest block mb-1">
                  04 / CONTRACT IMPLEMENTATION
                </span>
                <h2 className="font-display font-light text-3xl text-white">
                  Soroban Smart Contract (Rust SDK v21)
                </h2>
              </div>

              {/* Code Tab Switcher */}
              <div className="flex gap-1 bg-white/[0.05] p-1 rounded-lg border border-white/10 font-mono text-xs">
                <button
                  onClick={() => setContractTab('vault')}
                  className={`px-3 py-1 rounded ${
                    contractTab === 'vault' ? 'bg-cyan-500 text-black font-semibold' : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  vault.rs
                </button>
                <button
                  onClick={() => setContractTab('settle')}
                  className={`px-3 py-1 rounded ${
                    contractTab === 'settle' ? 'bg-cyan-500 text-black font-semibold' : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  settlement.rs
                </button>
                <button
                  onClick={() => setContractTab('cashback')}
                  className={`px-3 py-1 rounded ${
                    contractTab === 'cashback' ? 'bg-cyan-500 text-black font-semibold' : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  cashback.rs
                </button>
              </div>
            </div>

            <div className="rounded-2xl bg-[#08090d] border border-white/20 p-5 font-mono text-[11px] sm:text-xs overflow-x-auto shadow-2xl">
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/10 text-zinc-500 text-[10px]">
                <span>contracts/src/{contractTab}.rs</span>
                <span className="text-emerald-400">● COMPILES TO WASM (0 ERRORS)</span>
              </div>

              <pre className="text-zinc-300 font-mono leading-relaxed">
                <code>
                  {contractTab === 'vault' &&
                    `#[contract]
pub struct KamiVaultContract;

#[contractimpl]
impl KamiVaultContract {
    /// Authorize and settle an instant Visa POS point-of-sale card transaction
    pub fn authorize_pos_spend(
        env: Env,
        cardholder: Address,
        spend_amount: i128,
        merchant_currency: Symbol,
        nonce: u64,
    ) -> Result<bool, Error> {
        cardholder.require_auth(); // Sovereign non-custodial authorization check
        
        let mut vault = Self::get_vault(&env, &cardholder)?;
        require!(vault.is_active && !vault.is_frozen, Error::VaultFrozen);
        require!(spend_amount <= vault.daily_limit_remaining, Error::ExceedsDailyLimit);
        
        // Execute atomic balance debit on Soroban
        vault.balance = vault.balance.checked_sub(spend_amount).ok_or(Error::InsufficientFunds)?;
        vault.daily_limit_remaining -= spend_amount;
        Self::save_vault(&env, &cardholder, &vault);
        
        // Emit deterministic telemetry event to Stellar ledger
        env.events().publish((symbol_short!("pos_spend"), cardholder), (spend_amount, merchant_currency, nonce));
        Ok(true)
    }
}`}

                  {contractTab === 'settle' &&
                    `#[contractimpl]
impl KamiSettlementAdapter {
    /// Atomic path payment converting USDC -> Merchant local fiat currency
    pub fn execute_path_payment(
        env: Env,
        source_asset: Address,
        dest_asset: Address,
        max_source_amount: i128,
        dest_amount: i128,
    ) -> Result<i128, Error> {
        // Calls Stellar native liquidity pool router for 0% slippage execution
        let actual_spent = env.invoke_contract::<i128>(
            &DEX_ROUTER_ADDRESS,
            &Symbol::new(&env, "swap_exact_dest"),
            vec![&env, source_asset.into_val(&env), dest_asset.into_val(&env), max_source_amount.into_val(&env), dest_amount.into_val(&env)]
        );
        Ok(actual_spent)
    }
}`}

                  {contractTab === 'cashback' &&
                    `#[contractimpl]
impl KamiCashbackProtocol {
    /// Disburse instant XLM rewards on verified transaction receipt
    pub fn credit_cashback(
        env: Env,
        cardholder: Address,
        settled_usd_amount: i128,
        tier_cashback_bps: u32, // e.g. 350 bps = 3.5%
    ) -> Result<i128, Error> {
        let reward_xlm = (settled_usd_amount * (tier_cashback_bps as i128)) / 10_000;
        let pool = Self::get_reward_pool(&env)?;
        pool.transfer_to(&cardholder, reward_xlm)?;
        env.events().publish((symbol_short!("cashback"), cardholder), reward_xlm);
        Ok(reward_xlm)
    }
}`}
                </code>
              </pre>
            </div>
          </div>
        )}

        {/* SLIDE 5: Benchmark Comparison (Why Stellar Wins) */}
        {currentSlide === 4 && (
          <div className="flex flex-col gap-4 animate-in fade-in zoom-in-95 duration-200">
            <div>
              <span className="font-mono text-xs text-cyan-400 uppercase tracking-widest block mb-1">
                05 / BENCHMARK COMPARISON
              </span>
              <h2 className="font-display font-light text-3xl sm:text-4xl text-white">
                Technical Benchmarks Across Chains
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 my-2">
              <div className="p-5 rounded-2xl bg-cyan-950/30 border border-cyan-400/50 flex flex-col justify-between">
                <div>
                  <span className="font-mono text-xs text-cyan-300 font-bold block mb-1">★ KAMI ON STELLAR</span>
                  <div className="text-3xl font-display text-white font-light mt-2">3.2s</div>
                  <span className="text-[10px] font-mono text-emerald-400 block mb-3">Deterministic Finality</span>
                  <div className="text-xl font-mono text-cyan-300 font-semibold">$0.00001</div>
                  <span className="text-[10px] text-zinc-400">Gas fee per swipe</span>
                </div>
                <div className="mt-4 pt-2 border-t border-cyan-500/30 text-[10px] font-mono text-emerald-300">
                  ✓ 100% Non-Custodial
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 flex flex-col justify-between">
                <div>
                  <span className="font-mono text-xs text-zinc-400 block mb-1">ETHEREUM / L2s</span>
                  <div className="text-3xl font-display text-zinc-300 font-light mt-2">15s - 60s</div>
                  <span className="text-[10px] font-mono text-red-400 block mb-3">Frequent POS Timeouts</span>
                  <div className="text-xl font-mono text-red-400 font-semibold">$2.50 - $25.00</div>
                  <span className="text-[10px] text-zinc-400">Gas spikes on volume</span>
                </div>
                <div className="mt-4 pt-2 border-t border-white/10 text-[10px] font-mono text-zinc-500">
                  Hybrid / Rollup Bridge
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 flex flex-col justify-between">
                <div>
                  <span className="font-mono text-xs text-zinc-400 block mb-1">SOLANA</span>
                  <div className="text-3xl font-display text-zinc-300 font-light mt-2">0.4s - 3.0s</div>
                  <span className="text-[10px] font-mono text-yellow-400 block mb-3">Reorg &amp; Drop Risk</span>
                  <div className="text-xl font-mono text-zinc-300 font-semibold">$0.002</div>
                  <span className="text-[10px] text-zinc-400">Priority fee required</span>
                </div>
                <div className="mt-4 pt-2 border-t border-white/10 text-[10px] font-mono text-zinc-500">
                  Custodial CEX Wrappers
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 flex flex-col justify-between">
                <div>
                  <span className="font-mono text-xs text-zinc-400 block mb-1">TRADITIONAL BANKS</span>
                  <div className="text-3xl font-display text-zinc-300 font-light mt-2">2 - 3 Days</div>
                  <span className="text-[10px] font-mono text-zinc-400 block mb-3">Batch Settlement</span>
                  <div className="text-xl font-mono text-red-400 font-semibold">3.0% FX</div>
                  <span className="text-[10px] text-zinc-400">Hidden currency spread</span>
                </div>
                <div className="mt-4 pt-2 border-t border-white/10 text-[10px] font-mono text-red-400">
                  100% Custodial / Account Freeze
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SLIDE 6: Product Lineup & 3D Cards */}
        {currentSlide === 5 && (
          <div className="flex flex-col gap-4 animate-in fade-in zoom-in-95 duration-200">
            <div>
              <span className="font-mono text-xs text-cyan-400 uppercase tracking-widest block mb-1">
                06 / HARDWARE &amp; APP SUITE
              </span>
              <h2 className="font-display font-light text-3xl sm:text-4xl text-white">
                Physical Metal &amp; Instant Virtual Cards
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 my-2 items-center">
              {/* Left Column: Interactive Tier Selector */}
              <div className="md:col-span-6 flex flex-col gap-3">
                {[
                  {
                    id: 'obsidian',
                    name: 'Obsidian Metal (18g Solid Steel)',
                    desc: 'Heavyweight matte black steel with EMV contact chip, NFC, and 3.5% XLM cashback.',
                    highlight: 'Flagship Edition',
                  },
                  {
                    id: 'founder',
                    name: 'Stellar Founder (24K Gold Plated)',
                    desc: 'Limited Ceramic composite with VIP staking and 5.0% XLM cashback payout.',
                    highlight: '5.0% XLM Cashback',
                  },
                  {
                    id: 'cyber',
                    name: 'Cyber Titanium',
                    desc: 'Laser-etched cyan brushed titanium with instant disposable card numbers.',
                    highlight: 'Laser Etched',
                  },
                  {
                    id: 'virtual',
                    name: 'Instant Virtual Card',
                    desc: 'Issued in <3.5s on Stellar. Instantly provisions to Apple Pay & Google Wallet.',
                    highlight: 'Zero-Wait Issuance',
                  },
                ].map((tier) => (
                  <button
                    key={tier.id}
                    onClick={() => setPreviewTier(tier.id as any)}
                    className={`p-3.5 rounded-xl border text-left transition-all ${
                      previewTier === tier.id
                        ? 'bg-white/10 border-white text-white shadow-lg'
                        : 'bg-white/[0.02] border-white/10 text-zinc-400 hover:text-white'
                    }`}
                  >
                    <div className="flex justify-between items-center mb-0.5">
                      <span className="font-mono text-xs font-semibold text-white">{tier.name}</span>
                      <span className="font-mono text-[9px] text-cyan-400">{tier.highlight}</span>
                    </div>
                    <p className="text-[11px] text-zinc-400 font-sans">{tier.desc}</p>
                  </button>
                ))}
              </div>

              {/* Right Column: Live Interactive Card Canvas */}
              <div className="md:col-span-6 flex justify-center">
                <div
                  className={`w-full max-w-[360px] aspect-[1.59/1] rounded-2xl border border-white/20 p-6 flex flex-col justify-between shadow-2xl transition-all ${
                    previewTier === 'obsidian'
                      ? 'bg-gradient-to-tr from-zinc-900 via-black to-zinc-950'
                      : previewTier === 'founder'
                      ? 'bg-gradient-to-tr from-amber-950 via-zinc-900 to-black border-amber-500/40'
                      : previewTier === 'cyber'
                      ? 'bg-gradient-to-tr from-cyan-950 via-zinc-950 to-black border-cyan-500/40'
                      : 'bg-gradient-to-tr from-purple-950 via-black to-zinc-950 border-purple-500/40'
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-display text-base tracking-widest text-white">KAMI</span>
                        <span className="font-mono text-[8px] px-1 py-0.5 rounded bg-white/10 border border-white/20">
                          CARD
                        </span>
                      </div>
                      <span className="font-mono text-[8px] text-zinc-400 uppercase tracking-widest">
                        {previewTier.toUpperCase()}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/60 border border-white/20">
                      <StellarLogoSVG className="w-3 h-3 text-white" />
                      <span className="font-mono text-[8px] tracking-wider text-white">STELLAR</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 my-auto">
                    <div className="w-9 h-7 rounded bg-gradient-to-tr from-slate-400 to-slate-200 p-[1px]">
                      <div className="w-full h-full bg-[#cbd5e1] rounded flex items-center justify-center">
                        <div className="w-2.5 h-2.5 rounded-full border border-slate-500" />
                      </div>
                    </div>
                    <span className="font-mono text-[10px] text-zinc-400">●))) Contactless</span>
                  </div>

                  <div className="flex justify-between items-end">
                    <div className="font-mono text-[10px] text-white">
                      <div>STELLAR HACKATHON DEMO</div>
                      <div className="text-zinc-500 text-[8px]">4232 •••• •••• 8892</div>
                    </div>
                    <div className="text-right font-sans font-black italic text-xl text-white">VISA</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SLIDE 7: Live POS Point-of-Sale Simulator on the Slide */}
        {currentSlide === 6 && (
          <div className="flex flex-col gap-4 animate-in fade-in zoom-in-95 duration-200">
            <div>
              <span className="font-mono text-xs text-cyan-400 uppercase tracking-widest block mb-1">
                07 / INTERACTIVE DEMO STAGE
              </span>
              <h2 className="font-display font-light text-3xl sm:text-4xl text-white">
                Live Point-of-Sale Swipe Simulator
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 my-2 items-center">
              {/* Left: Interactive POS swipe trigger */}
              <div className="md:col-span-6 p-6 rounded-2xl bg-white/[0.03] border border-white/15 flex flex-col gap-4">
                <span className="font-mono text-xs text-cyan-400 font-semibold">SIMULATED VISA CARD TERMINAL</span>

                <div>
                  <label className="font-mono text-[10px] text-zinc-400 block mb-1">ENTER PURCHASE AMOUNT ($ USD)</label>
                  <input
                    type="number"
                    value={simAmount}
                    onChange={(e) => setSimAmount(e.target.value)}
                    disabled={simStatus === 'authorizing'}
                    className="w-full bg-white/[0.05] border border-white/20 rounded-xl px-4 py-3 font-mono text-xl text-white outline-none focus:border-cyan-400"
                  />
                </div>

                <div className="p-3 bg-white/[0.02] border border-white/10 rounded-xl flex justify-between font-mono text-xs">
                  <span className="text-zinc-400">MERCHANT:</span>
                  <span className="text-white font-semibold">Apple Store Tokyo (0% FX)</span>
                </div>

                <button
                  onClick={handleSimulateSwipe}
                  disabled={simStatus === 'authorizing'}
                  className={`w-full py-3.5 rounded-xl font-mono text-xs font-semibold transition-all shadow-lg flex items-center justify-center gap-2 ${
                    simStatus === 'authorizing'
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400 animate-pulse'
                      : 'bg-white text-black hover:bg-zinc-200'
                  }`}
                >
                  {simStatus === 'authorizing' ? (
                    <>
                      <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                      <span>Executing Soroban Settlement on Stellar...</span>
                    </>
                  ) : (
                    <>
                      <span>Tap Visa Card to Pay ${simAmount} USDC →</span>
                    </>
                  )}
                </button>
              </div>

              {/* Right: Real-time on-chain telemetry result */}
              <div className="md:col-span-6 p-6 rounded-2xl bg-white/[0.03] border border-white/15 flex flex-col gap-3 font-mono text-xs">
                <span className="text-zinc-400 text-[10px] uppercase tracking-wider">STELLAR LEDGER SETTLEMENT RECEIPT</span>

                {simStatus === 'idle' && (
                  <div className="h-44 flex flex-col items-center justify-center text-center text-zinc-500 font-sans">
                    <span className="text-3xl mb-2">📡</span>
                    <span>Ready for swipe trigger. Click "Tap Visa Card" on the left to execute.</span>
                  </div>
                )}

                {simStatus === 'authorizing' && (
                  <div className="h-44 flex flex-col items-center justify-center text-center text-cyan-400">
                    <div className="w-8 h-8 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin mb-3" />
                    <span className="font-mono text-xs">Soroban Contract Verifying MPC Proof...</span>
                    <span className="text-[10px] text-zinc-500 mt-1">Closing Stellar Ledger via SCP consensus</span>
                  </div>
                )}

                {simStatus === 'settled' && simTx && (
                  <div className="space-y-2.5 animate-in fade-in">
                    <div className="p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 flex items-center justify-between">
                      <span className="font-bold">✓ VISA TRANSACTION APPROVED</span>
                      <span className="text-[10px]">LEDGER CLOSED</span>
                    </div>

                    <div className="flex justify-between border-b border-white/5 pb-1.5">
                      <span className="text-zinc-400">TX HASH:</span>
                      <span className="text-cyan-400">{simTx.hash}</span>
                    </div>
                    <div className="flex justify-between border-b border-white/5 pb-1.5">
                      <span className="text-zinc-400">CONSENSUS LATENCY:</span>
                      <span className="text-white font-bold">{simTx.latency} seconds</span>
                    </div>
                    <div className="flex justify-between border-b border-white/5 pb-1.5">
                      <span className="text-zinc-400">DEBITED AMOUNT:</span>
                      <span className="text-white font-bold">${simAmount} USDC</span>
                    </div>
                    <div className="flex justify-between border-b border-white/5 pb-1.5">
                      <span className="text-zinc-400">XLM CASHBACK PAID:</span>
                      <span className="text-emerald-400 font-bold">+${simTx.cashback} XLM (3.5%)</span>
                    </div>
                    <div className="flex justify-between text-zinc-500 text-[10px]">
                      <span>NETWORK GAS FEE:</span>
                      <span>0.00001 XLM ($0.000001)</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* SLIDE 8: Post-Hackathon Strategic Roadmap */}
        {currentSlide === 7 && (
          <div className="flex flex-col gap-4 animate-in fade-in zoom-in-95 duration-200">
            <div>
              <span className="font-mono text-xs text-cyan-400 uppercase tracking-widest block mb-1">
                08 / POST-HACKATHON ROADMAP
              </span>
              <h2 className="font-display font-light text-3xl sm:text-4xl text-white">
                From Hackathon Prototype to Global Scale
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 my-2">
              <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 flex flex-col justify-between">
                <div>
                  <span className="font-mono text-xs text-cyan-400 block mb-1 font-semibold">STAGE 1 (NEXT 30 DAYS)</span>
                  <h4 className="font-display text-lg text-white mb-2">Testnet &amp; Formal Verification</h4>
                  <ul className="text-xs font-sans text-zinc-300 space-y-2">
                    <li>• Soroban Futurenet deployment</li>
                    <li>• Formal contract audit with OpenZeppelin / Kudelski</li>
                    <li>• Developer SDK release for Stellar dApps</li>
                  </ul>
                </div>
                <span className="font-mono text-[9px] text-cyan-400 mt-4 block">OPEN TESTNET</span>
              </div>

              <div className="p-6 rounded-2xl bg-cyan-950/20 border border-cyan-500/30 flex flex-col justify-between">
                <div>
                  <span className="font-mono text-xs text-emerald-400 block mb-1 font-semibold">STAGE 2 (Q2 2026)</span>
                  <h4 className="font-display text-lg text-white mb-2">Mainnet Virtual Cards</h4>
                  <ul className="text-xs font-sans text-zinc-300 space-y-2">
                    <li>• Stellar Mainnet contract deployment</li>
                    <li>• Apple Pay &amp; Google Wallet virtual issuance</li>
                    <li>• Stellar Community Fund (SCF) grant deployment</li>
                  </ul>
                </div>
                <span className="font-mono text-[9px] text-emerald-400 mt-4 block">COMMUNITY ROLLOUT</span>
              </div>

              <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 flex flex-col justify-between">
                <div>
                  <span className="font-mono text-xs text-purple-400 block mb-1 font-semibold">STAGE 3 (Q3 2026)</span>
                  <h4 className="font-display text-lg text-white mb-2">Physical Metal Hardware</h4>
                  <ul className="text-xs font-sans text-zinc-300 space-y-2">
                    <li>• 18g Obsidian Metal card production</li>
                    <li>• Worldwide DHL shipping to 180+ countries</li>
                    <li>• B2B Web3 DAO payroll card API</li>
                  </ul>
                </div>
                <span className="font-mono text-[9px] text-purple-400 mt-4 block">HARDWARE MANUFACTURING</span>
              </div>
            </div>
          </div>
        )}

        {/* SLIDE 9: Conclusion & Live Q&A */}
        {currentSlide === 8 && (
          <div className="flex flex-col items-center justify-center text-center py-6 animate-in fade-in zoom-in-95 duration-200">
            <div className="w-16 h-16 rounded-2xl bg-white/[0.08] border border-white/20 flex items-center justify-center mb-4">
              <StellarLogoSVG className="w-8 h-8 text-cyan-400" />
            </div>

            <h2 className="font-display font-light text-4xl sm:text-6xl text-white mb-3">
              Thank You, Judges!
            </h2>
            <p className="font-mono text-sm text-zinc-400 max-w-xl mb-6">
              Kami Kards: Real non-custodial crypto payments. Built natively for Soroban &amp; Stellar.
            </p>

            <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/15 max-w-md w-full font-mono text-xs space-y-2.5 text-left mb-6">
              <div className="flex justify-between">
                <span className="text-zinc-400">Track:</span>
                <span className="text-white font-semibold">Real-World Assets &amp; Payments</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">Smart Contracts:</span>
                <span className="text-cyan-400">Soroban Rust v21 WASM</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">Consensus Speed:</span>
                <span className="text-emerald-400">&lt;3.5s Deterministic Finality</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">Full App Demo:</span>
                <a href="/" target="_blank" className="text-white underline underline-offset-2 hover:text-cyan-300">
                  http://localhost:3000
                </a>
              </div>
            </div>

            <span className="font-mono text-xs text-cyan-400 animate-pulse">
              ● READY FOR LIVE JUDGE Q&amp;A
            </span>
          </div>
        )}
      </main>

      {/* Speaker Notes Drawer */}
      {showNotes && (
        <div className="fixed bottom-16 inset-x-0 z-40 max-w-4xl mx-auto p-4 bg-zinc-950/95 border border-cyan-500/30 rounded-2xl backdrop-blur-xl shadow-2xl animate-in slide-in-from-bottom-4">
          <div className="flex justify-between items-center mb-1">
            <span className="font-mono text-[10px] text-cyan-400 uppercase tracking-widest">
              SPEAKER NOTES (SLIDE {currentSlide + 1})
            </span>
            <button onClick={() => setShowNotes(false)} className="text-xs font-mono text-zinc-500 hover:text-white">
              ✕
            </button>
          </div>
          <p className="text-xs text-zinc-300 font-sans leading-relaxed">
            {slideNotes[currentSlide]}
          </p>
        </div>
      )}

      {/* Slide Overview Grid Modal */}
      {showOverview && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl p-8 overflow-y-auto flex flex-col"
          onClick={() => setShowOverview(false)}
        >
          <div className="max-w-6xl mx-auto w-full">
            <div className="flex justify-between items-center mb-8">
              <h3 className="font-display text-2xl text-white">All Slides Overview</h3>
              <button className="font-mono text-sm text-zinc-400 hover:text-white">✕ Close</button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {[
                '01. Title & 3D Carousel Stage',
                '02. The Core POS Friction',
                '03. Sub-3.5s Architecture Flow',
                '04. Soroban Smart Contract (Rust)',
                '05. Benchmark Comparison',
                '06. Hardware & App Suite',
                '07. Live Swipe POS Simulator',
                '08. Post-Hackathon Roadmap',
                '09. Conclusion & Judge Q&A',
              ].map((title, idx) => (
                <div
                  key={idx}
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentSlide(idx);
                    setShowOverview(false);
                  }}
                  className={`p-4 rounded-xl border text-left cursor-pointer transition-all ${
                    currentSlide === idx
                      ? 'bg-cyan-950/40 border-cyan-400 text-white shadow-[0_0_20px_rgba(0,240,255,0.2)]'
                      : 'bg-white/[0.03] border-white/10 hover:border-white/30 text-zinc-400'
                  }`}
                >
                  <span className="font-mono text-[10px] text-cyan-400 block mb-1">SLIDE {idx + 1}</span>
                  <h4 className="font-display text-xs text-white">{title}</h4>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Bottom Deck Navigation Controller */}
      <footer className="flex items-center justify-between px-6 sm:px-10 py-3.5 border-t border-white/10 bg-black/70 backdrop-blur-xl z-30">
        <div className="flex items-center gap-2">
          <button
            onClick={prevSlide}
            disabled={currentSlide === 0}
            className="px-4 py-2 rounded-xl bg-white/[0.05] border border-white/10 text-xs font-mono disabled:opacity-30 hover:bg-white/10 transition-all"
          >
            ← Previous
          </button>

          <button
            onClick={nextSlide}
            disabled={currentSlide === totalSlides - 1}
            className="px-5 py-2 rounded-xl bg-white text-black font-semibold text-xs font-mono disabled:opacity-30 hover:bg-zinc-200 transition-all shadow-lg"
          >
            Next Slide →
          </button>
        </div>

        <div className="flex items-center gap-4 font-mono text-[11px] text-zinc-400">
          <span className="hidden sm:inline">Use ← → Arrow Keys / Space</span>
          <span>•</span>
          <span className="text-cyan-400 font-semibold">STELLAR HACKATHON 2026</span>
        </div>
      </footer>
    </div>
  );
}
