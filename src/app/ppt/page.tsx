'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import CosmicBackground from '@/components/CosmicBackground';
import CylinderCardCarousel, { StellarLogoSVG } from '@/components/CylinderCardCarousel';

export default function PitchDeckPage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showNotes, setShowNotes] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showOverview, setShowOverview] = useState(false);
  const [themeMode, setThemeMode] = useState<'sunlit' | 'espresso'>('espresso');

  // Pitch timer
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(true);

  // Slide 4: Interactive Natural Language Command Simulator
  const [samplePrompt, setSamplePrompt] = useState('Give Maya ₹2,000 until Sunday');
  const [parserState, setParserState] = useState<{
    intent: string;
    recipient: string;
    amount: string;
    expiry: string;
    factsHash: string;
    status: 'preview' | 'approved' | 'executed';
  }>({
    intent: 'ALLOWANCE_DISPATCH',
    recipient: 'Maya (Daughter)',
    amount: '₹2,000 (~24.10 USDC)',
    expiry: 'Sunday 11:59 PM',
    factsHash: '0x8b3a1f94...e7c2',
    status: 'preview',
  });

  // Slide 5: Seeded Sharma Household
  const [householdMembers, setHouseholdMembers] = useState([
    {
      name: 'Aarav Sharma',
      role: 'Family Admin',
      avatar: '👨‍💼',
      balance: '₹85,000 ($1,020)',
      cardStatus: 'Active',
      rules: 'Unrestricted Family Master Card',
      type: 'Obsidian Metal',
    },
    {
      name: 'Maya Sharma',
      role: 'Daughter (Teen)',
      avatar: '👧',
      balance: '₹2,000 ($24.10)',
      cardStatus: 'Active',
      rules: '₹2,000 / week • Books & Groceries only',
      type: 'Pocket Visa',
    },
    {
      name: 'Rohan Sharma',
      role: 'Son (College)',
      avatar: '🎓',
      balance: '₹15,000 ($180.50)',
      cardStatus: 'Active',
      rules: '₹15,000 / mo • Tuition & Campus dining',
      type: 'Campus Debit',
    },
  ]);

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

  const handlePromptSelect = (prompt: string) => {
    setSamplePrompt(prompt);
    if (prompt.includes('Maya')) {
      setParserState({
        intent: 'ALLOWANCE_DISPATCH',
        recipient: 'Maya (Daughter)',
        amount: '₹2,000 (~24.10 USDC)',
        expiry: 'Sunday 11:59 PM',
        factsHash: '0x8b3a1f94...e7c2',
        status: 'preview',
      });
    } else if (prompt.includes('15k') || prompt.includes('Rohan')) {
      setParserState({
        intent: 'TUITION_TRANSFER',
        recipient: 'Rohan (College)',
        amount: '₹15,000 (~180.50 USDC)',
        expiry: 'End of Month',
        factsHash: '0x3c9d2e11...f8b0',
        status: 'preview',
      });
    } else if (prompt.includes('1.5 lakh') || prompt.includes('Emergency')) {
      setParserState({
        intent: 'HOUSEHOLD_VAULT_DEPOSIT',
        recipient: 'Family Emergency Vault',
        amount: '₹1,50,000 (~1,805.00 USDC)',
        expiry: 'Instant Crypto Staking',
        factsHash: '0x99e4b1a7...a3f6',
        status: 'preview',
      });
    } else {
      setParserState({
        intent: 'MERCHANT_CHECKOUT',
        recipient: 'Bookstore POS',
        amount: '₹750 (~9.00 USDC)',
        expiry: 'Single-Use OTP Token',
        factsHash: '0x12d5e9b8...c7a1',
        status: 'preview',
      });
    }
  };

  const toggleCardFreeze = (index: number) => {
    setHouseholdMembers((prev) =>
      prev.map((m, i) => (i === index ? { ...m, cardStatus: m.cardStatus === 'Active' ? 'Frozen' : 'Active' } : m))
    );
  };

  const totalSlides = 10;

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

  // Keyboard, Wheel, and Touch gesture listeners
  const isScrollingRef = useRef(false);
  const touchStartY = useRef(0);
  const touchStartX = useRef(0);

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
      } else if (e.key === 't' || e.key === 'T') {
        setThemeMode((prev) => (prev === 'espresso' ? 'sunlit' : 'espresso'));
      } else if (e.key === 'Home') {
        setCurrentSlide(0);
      } else if (e.key === 'End') {
        setCurrentSlide(totalSlides - 1);
      }
    };

    const handleWheel = (e: WheelEvent) => {
      if (showOverview) return;
      if (Math.abs(e.deltaY) > 28) {
        if (isScrollingRef.current) return;
        isScrollingRef.current = true;

        if (e.deltaY > 0) {
          nextSlide();
        } else {
          prevSlide();
        }

        setTimeout(() => {
          isScrollingRef.current = false;
        }, 450);
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY;
      touchStartX.current = e.touches[0].clientX;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (showOverview) return;
      const deltaY = e.changedTouches[0].clientY - touchStartY.current;
      const deltaX = e.changedTouches[0].clientX - touchStartX.current;

      if (Math.abs(deltaX) > 40 || Math.abs(deltaY) > 40) {
        if (Math.abs(deltaX) > Math.abs(deltaY)) {
          if (deltaX < 0) nextSlide();
          else prevSlide();
        } else {
          if (deltaY < 0) nextSlide();
          else prevSlide();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('wheel', handleWheel, { passive: true });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [nextSlide, prevSlide, totalSlides, showOverview]);

  const progressPercent = ((currentSlide + 1) / totalSlides) * 100;

  const slideNotes = [
    'Slide 1: Hook judges immediately. Kami is an AI-native family crypto neobank. Product promise: "Money that understands your family." Fully working codebase on Stellar.',
    'Slide 2: The Problem. Family fintech is broken. 7+ clunky screens to set an allowance, while EVM crypto cards timeout at the checkout counter.',
    'Slide 3: The Breakthrough. 6-step loop: Ask -> Understand -> Preview -> Approve -> Execute -> Receipt. Strict security invariant: AI reads & prepares, but only the deterministic gateway executes.',
    'Slide 4: Interactive Command Parser. Real-time demonstration of colloquial Indian/global number parsing ("15k", "1.5 lakh") bound to a cryptographic Facts Hash.',
    'Slide 5: Live Sharma Household Demo. Seeded real-world household testing with Aarav (Admin), Maya (Teen allowance), and Rohan (College tuition).',
    'Slide 6: Technical Moat. Why Stellar + SpacetimeDB? 3.2s finality eliminates POS timeouts, $0.00001 fees enable micro-allowances, and SpacetimeDB syncs all family devices with zero polling.',
    'Slide 7: Proof of Execution. Over 31,300 LOC across Expo 57 React Native, Fastify 5 Bun gateway, and SpacetimeDB Rust reducers, backed by 45 passing Vitest tests.',
    'Slide 8: Business Model & Unit Economics. 1.2-1.8% interchange fees, 0% FX cross-border arbitrage, and premium Obsidian metal card subscriptions in a $120B+ market.',
    'Slide 9: Grant Roadmap & SCF Alignment. Clear 3-phase execution roadmap from Testnet audit to Visa Fast Track pilot and mainnet scaling.',
    'Slide 10: The Ask & Conclusion. Recap core vision, highlight live website and video demo links, and open for judges technical Q&A.',
  ];

  const isSunlit = themeMode === 'sunlit';

  return (
    <div
      className={`min-h-screen flex flex-col justify-between select-none relative font-sans transition-colors duration-500 ${
        isSunlit ? 'bg-[#FBF8F3] text-[#2C2018]' : 'bg-[#000000] text-white'
      }`}
    >
      {!isSunlit && <CosmicBackground />}

      {/* Top Deck HUD Header */}
      <header
        className={`flex items-center justify-between px-6 sm:px-10 py-3 border-b z-30 transition-colors duration-300 ${
          isSunlit ? 'bg-[#F6F0E7]/90 border-[#E8DFC8]/60 backdrop-blur-xl' : 'bg-black/70 border-white/10 backdrop-blur-xl'
        }`}
      >
        <div className="flex items-center gap-3">
          <div
            className={`w-8 h-8 rounded-lg flex items-center justify-center border ${
              isSunlit ? 'bg-[#D95338]/10 border-[#D95338]/30' : 'bg-cyan-500/10 border-cyan-500/30'
            }`}
          >
            <StellarLogoSVG className={`w-4 h-4 ${isSunlit ? 'text-[#D95338]' : 'text-cyan-400'}`} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-display font-light text-base tracking-[0.16em]">KAMI</span>
              <span
                className={`font-mono text-[9px] px-1.5 py-0.5 rounded font-semibold tracking-wider ${
                  isSunlit ? 'bg-[#D95338]/15 text-[#D95338]' : 'bg-cyan-500/20 text-cyan-300'
                }`}
              >
                HACKATHON &amp; GRANT DECK
              </span>
            </div>
            <span className={`font-mono text-[8px] tracking-wider ${isSunlit ? 'text-[#7C6E65]' : 'text-zinc-400'}`}>
              STELLAR CONSENSUS PROTOCOL • AI FINANCIAL OS
            </span>
          </div>
        </div>

        {/* Presenter Controls & Timer HUD */}
        <div className="flex items-center gap-2.5 font-mono text-xs">
          {/* Theme Switcher */}
          <button
            onClick={() => setThemeMode((prev) => (prev === 'espresso' ? 'sunlit' : 'espresso'))}
            className={`px-2.5 py-1 rounded-lg border text-xs transition-all ${
              isSunlit
                ? 'bg-[#EFE6DA] border-[#D9CEBA] text-[#4A3B32] hover:bg-[#E5DBCB]'
                : 'bg-white/[0.05] border-white/10 text-zinc-300 hover:text-white'
            }`}
            title="Press 'T' to toggle Sunlit / Night theme"
          >
            {isSunlit ? '☀️ Sunlit' : '🌙 Night'}
          </button>

          {/* Pitch Timer */}
          <div
            onClick={() => setIsTimerRunning(!isTimerRunning)}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-lg border cursor-pointer ${
              isSunlit ? 'bg-[#EFE6DA] border-[#D9CEBA] text-[#4A3B32]' : 'bg-white/[0.05] border-white/10 text-zinc-300'
            }`}
            title="Click to pause/resume timer"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>⏱ {formatTimer(timerSeconds)}</span>
          </div>

          <div
            className={`px-3 py-1 rounded-lg border ${
              isSunlit ? 'bg-[#EFE6DA] border-[#D9CEBA] text-[#4A3B32]' : 'bg-white/[0.05] border-white/10 text-zinc-400'
            }`}
          >
            <span className="font-bold">{currentSlide + 1}</span> / {totalSlides}
          </div>

          <button
            onClick={() => setShowOverview(!showOverview)}
            className={`px-3 py-1 rounded-lg border text-xs transition-all ${
              showOverview
                ? isSunlit
                  ? 'bg-[#D95338] text-white font-semibold'
                  : 'bg-white text-black font-semibold'
                : isSunlit
                ? 'bg-[#EFE6DA] border-[#D9CEBA] text-[#4A3B32]'
                : 'bg-white/[0.05] border-white/10 text-zinc-300'
            }`}
            title="Press 'O' for overview grid"
          >
            Grid (O)
          </button>

          <button
            onClick={() => setShowNotes(!showNotes)}
            className={`px-3 py-1 rounded-lg border text-xs transition-all ${
              showNotes
                ? isSunlit
                  ? 'bg-[#D95338]/20 border-[#D95338] text-[#D95338]'
                  : 'bg-cyan-500/20 border-cyan-400 text-cyan-300'
                : isSunlit
                ? 'bg-[#EFE6DA] border-[#D9CEBA] text-[#4A3B32]'
                : 'bg-white/[0.05] border-white/10 text-zinc-300'
            }`}
            title="Press 'N' for speaker notes"
          >
            Notes (N)
          </button>

          <button
            onClick={toggleFullscreen}
            className={`p-1.5 px-2.5 rounded-lg border text-xs ${
              isSunlit ? 'bg-[#EFE6DA] border-[#D9CEBA] text-[#4A3B32]' : 'bg-white/[0.05] border-white/10 text-zinc-300'
            }`}
            title="Press 'F' for fullscreen"
          >
            {isFullscreen ? 'Exit' : '⛶ Fullscreen'}
          </button>
        </div>
      </header>

      {/* Slide Progress Line */}
      <div className={`w-full h-1 relative z-30 ${isSunlit ? 'bg-[#E8DFC8]' : 'bg-white/10'}`}>
        <div
          className={`h-full transition-all duration-300 ease-out shadow-sm ${
            isSunlit
              ? 'bg-gradient-to-r from-[#D95338] via-[#E27D60] to-[#C38D9E]'
              : 'bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 shadow-[0_0_12px_rgba(0,240,255,0.8)]'
          }`}
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Dynamic Slide Stage */}
      <main className="flex-1 flex flex-col justify-center max-w-6xl w-full mx-auto px-4 sm:px-8 lg:px-12 py-5 z-10 overflow-visible">
        {/* SLIDE 1: Title & The Hook */}
        {currentSlide === 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center animate-in fade-in zoom-in-95 duration-200">
            <div className="lg:col-span-7 flex flex-col items-start text-left">
              <div
                className={`inline-flex items-center gap-2 px-3.5 py-1 rounded-full font-mono text-[10px] tracking-widest uppercase mb-3 border ${
                  isSunlit
                    ? 'bg-[#D95338]/10 border-[#D95338]/30 text-[#D95338]'
                    : 'bg-cyan-500/10 border-cyan-500/30 text-cyan-400'
                }`}
              >
                <StellarLogoSVG className="w-3.5 h-3.5" />
                <span>STELLAR HACKATHON 2026 • AI-NATIVE FAMILY NEOBANK</span>
              </div>

              <h1 className="font-display font-light text-4xl sm:text-6xl tracking-tight leading-[1.05] mb-3">
                Money That Understands Your Family.
              </h1>

              <p className={`font-mono text-xs sm:text-sm max-w-xl font-light leading-relaxed mb-6 ${isSunlit ? 'text-[#5C4D44]' : 'text-zinc-300'}`}>
                <strong>Traditional fintech makes users understand the product. Kami makes the product understand the user.</strong> A conversational AI financial OS with programmable Visa cards on Stellar.
              </p>

              <div className="grid grid-cols-3 gap-3 w-full max-w-lg font-mono text-xs">
                <div className={`p-3 rounded-xl border ${isSunlit ? 'bg-[#F2ECE1] border-[#E0D5C3]' : 'bg-white/[0.04] border-white/10'}`}>
                  <span className={`text-[9px] block uppercase ${isSunlit ? 'text-[#8A796E]' : 'text-zinc-500'}`}>SETTLEMENT</span>
                  <span className={`font-bold text-xs mt-0.5 block ${isSunlit ? 'text-[#D95338]' : 'text-cyan-400'}`}>3.2s Finality</span>
                </div>
                <div className={`p-3 rounded-xl border ${isSunlit ? 'bg-[#F2ECE1] border-[#E0D5C3]' : 'bg-white/[0.04] border-white/10'}`}>
                  <span className={`text-[9px] block uppercase ${isSunlit ? 'text-[#8A796E]' : 'text-zinc-500'}`}>CODEBASE</span>
                  <span className="text-emerald-500 font-bold text-xs mt-0.5 block">~31,300 LOC</span>
                </div>
                <div className={`p-3 rounded-xl border ${isSunlit ? 'bg-[#F2ECE1] border-[#E0D5C3]' : 'bg-white/[0.04] border-white/10'}`}>
                  <span className={`text-[9px] block uppercase ${isSunlit ? 'text-[#8A796E]' : 'text-zinc-500'}`}>DEMO STATUS</span>
                  <span className={`font-bold text-xs mt-0.5 block ${isSunlit ? 'text-[#5C4D44]' : 'text-purple-400'}`}>Live Prototype</span>
                </div>
              </div>
            </div>

            {/* Embedded Live 3D Cylinder Card Carousel */}
            <div className="lg:col-span-5 h-[400px] sm:h-[460px] w-full relative flex items-center justify-center overflow-visible">
              <CylinderCardCarousel scale={0.88} />
              <div className={`absolute bottom-1 font-mono text-[8px] uppercase tracking-widest pointer-events-none ${isSunlit ? 'text-[#8A796E]' : 'text-zinc-500'}`}>
                ● Live 3D Programmable Cards • Powered by KripiCard &amp; Stellar
              </div>
            </div>
          </div>
        )}

        {/* SLIDE 2: The Problem: Broken Family Fintech */}
        {currentSlide === 1 && (
          <div className="flex flex-col gap-4 animate-in fade-in zoom-in-95 duration-200">
            <div>
              <span className={`font-mono text-xs uppercase tracking-widest block mb-1 ${isSunlit ? 'text-[#D95338]' : 'text-cyan-400'}`}>
                02 / THE PROBLEM
              </span>
              <h2 className="font-display font-light text-3xl sm:text-4xl">
                Family Fintech is Trapped in Friction &amp; Legacy Complexity
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 my-2 font-mono text-xs">
              <div className="p-6 rounded-2xl bg-red-950/20 border border-red-500/30 flex flex-col justify-between">
                <div>
                  <span className="text-2xl block mb-2">📋</span>
                  <h3 className="font-display text-lg text-white font-bold mb-2">7+ Form Navigation Hell</h3>
                  <p className="text-xs text-zinc-300 font-sans leading-relaxed">
                    Giving an allowance or changing a spending limit requires navigating through 7+ deeply nested screens and rigid dropdowns.
                  </p>
                </div>
                <span className="text-[10px] text-red-400 font-bold pt-3 border-t border-red-500/20">
                  HIGH ABANDONMENT RATE
                </span>
              </div>

              <div className="p-6 rounded-2xl bg-red-950/20 border border-red-500/30 flex flex-col justify-between">
                <div>
                  <span className="text-2xl block mb-2">⏳</span>
                  <h3 className="font-display text-lg text-white font-bold mb-2">Checkout POS Timeouts</h3>
                  <p className="text-xs text-zinc-300 font-sans leading-relaxed">
                    EVM chains take 15s to 2 mins for confirmation, exceeding Visa&apos;s 4.5s point-of-sale timeout, causing declined retail transactions.
                  </p>
                </div>
                <span className="text-[10px] text-red-400 font-bold pt-3 border-t border-red-500/20">
                  4.5s VISA TIMEOUT LIMIT
                </span>
              </div>

              <div className="p-6 rounded-2xl bg-red-950/20 border border-red-500/30 flex flex-col justify-between">
                <div>
                  <span className="text-2xl block mb-2">💸</span>
                  <h3 className="font-display text-lg text-white font-bold mb-2">3.5% FX &amp; $4 Gas Fees</h3>
                  <p className="text-xs text-zinc-300 font-sans leading-relaxed">
                    Traditional banks charge 3.5% foreign exchange markups, while Ethereum gas costs make $5 daily pocket money unviable.
                  </p>
                </div>
                <span className="text-[10px] text-red-400 font-bold pt-3 border-t border-red-500/20">
                  $120B+ REMITTANCE FRICTION
                </span>
              </div>
            </div>
          </div>
        )}

        {/* SLIDE 3: The Breakthrough: 6-Step Interaction Loop */}
        {currentSlide === 2 && (
          <div className="flex flex-col gap-4 animate-in fade-in zoom-in-95 duration-200">
            <div>
              <span className={`font-mono text-xs uppercase tracking-widest block mb-1 ${isSunlit ? 'text-[#D95338]' : 'text-cyan-400'}`}>
                03 / THE BREAKTHROUGH
              </span>
              <h2 className="font-display font-light text-3xl sm:text-4xl">
                The Deterministic 6-Step Safety Architecture
              </h2>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 my-2 font-mono text-xs">
              {[
                { step: '01 / ASK', title: 'Ask', desc: 'AI is primary home screen command layer.', icon: '💬', badge: 'Natural Lang' },
                { step: '02 / PARSE', title: 'Understand', desc: 'Qwen AI parses intents & colloquial numbers.', icon: '🧠', badge: 'READ ONLY' },
                { step: '03 / PREVIEW', title: 'Preview', desc: 'Stages action & computes Facts Hash. AI never moves money.', icon: '📋', badge: 'PREPARE ONLY' },
                { step: '04 / APPROVE', title: 'Approve', desc: 'Parental biometric confirmation via Privy MPC.', icon: '👆', badge: 'FACE ID AUTH' },
                { step: '05 / EXECUTE', title: 'Execute', desc: 'Deterministic Fastify 5 Gateway triggers Stellar & KripiCard.', icon: '⚡', badge: 'GATEWAY REDUCER' },
                { step: '06 / RECEIPT', title: 'Receipt', desc: 'Creates immutable auditable receipt in SpacetimeDB.', icon: '🧾', badge: 'SEALED AUDIT' },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className={`p-4 rounded-xl border text-left flex flex-col justify-between ${
                    isSunlit ? 'bg-[#F2ECE1] border-[#E0D5C3]' : 'bg-white/[0.03] border-white/10'
                  }`}
                >
                  <div>
                    <span className="text-xl block mb-1">{item.icon}</span>
                    <span className={`text-[9px] block font-bold uppercase mb-1 ${isSunlit ? 'text-[#D95338]' : 'text-cyan-400'}`}>
                      {item.step}
                    </span>
                    <h4 className="font-display font-semibold text-sm mb-1">{item.title}</h4>
                    <p className={`text-[10px] font-sans leading-tight ${isSunlit ? 'text-[#5C4D44]' : 'text-zinc-300'}`}>
                      {item.desc}
                    </p>
                  </div>
                  <span className={`text-[8px] font-bold block pt-2 mt-2 border-t uppercase ${isSunlit ? 'border-[#E0D5C3] text-emerald-700' : 'border-white/10 text-emerald-400'}`}>
                    {item.badge}
                  </span>
                </div>
              ))}
            </div>

            <div className={`p-4 rounded-2xl border font-mono text-xs flex items-center justify-between ${isSunlit ? 'bg-[#FAF5ED] border-[#D95338]/30' : 'bg-white/[0.02] border-white/10'}`}>
              <div className="flex items-center gap-3">
                <span className="text-xl">🛡️</span>
                <span className="font-sans text-xs">
                  <strong>Zero-Hallucination Invariant</strong>: AI has <code>READ</code> and <code>PREPARE</code> permissions only. AI cannot execute mutations. The single-writer Gateway guarantees cryptographic execution.
                </span>
              </div>
              <span className={`px-2.5 py-1 rounded text-[10px] font-bold uppercase ${isSunlit ? 'bg-[#D95338]/10 text-[#D95338]' : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'}`}>
                100% Deterministic Safety
              </span>
            </div>
          </div>
        )}

        {/* SLIDE 4: Interactive Command Parser Demo */}
        {currentSlide === 3 && (
          <div className="flex flex-col gap-4 animate-in fade-in zoom-in-95 duration-200">
            <div>
              <span className={`font-mono text-xs uppercase tracking-widest block mb-1 ${isSunlit ? 'text-[#D95338]' : 'text-cyan-400'}`}>
                04 / INTERACTIVE DEMO
              </span>
              <h2 className="font-display font-light text-3xl sm:text-4xl">
                Colloquial Intent Parsing &amp; Facts Hash Validation
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 my-2 items-center">
              {/* Prompts selection */}
              <div className="lg:col-span-5 flex flex-col gap-3 font-mono text-xs">
                <span className={`text-[10px] uppercase ${isSunlit ? 'text-[#8A796E]' : 'text-zinc-400'}`}>
                  TEST NATURAL LANGUAGE QUERIES:
                </span>

                {[
                  { text: 'Give Maya ₹2,000 until Sunday', tag: 'Colloquial Allowance' },
                  { text: 'Send 15k to Rohan for college tuition', tag: 'Short-Form (15k)' },
                  { text: 'Deposit 1.5 lakh into Family Emergency Pool', tag: 'Indian Denomination (Lakh)' },
                ].map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => handlePromptSelect(item.text)}
                    className={`p-3.5 rounded-xl border text-left transition-all ${
                      samplePrompt === item.text
                        ? isSunlit
                          ? 'bg-[#EFE4D6] border-[#D95338] text-[#2C2018] shadow-sm'
                          : 'bg-cyan-950/40 border-cyan-400 text-cyan-300 shadow-[0_0_15px_rgba(0,240,255,0.2)]'
                        : isSunlit
                        ? 'bg-[#F2ECE1] border-[#E0D5C3] text-[#5C4D44]'
                        : 'bg-white/[0.03] border-white/10 text-zinc-300'
                    }`}
                  >
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-[9px] uppercase font-bold text-zinc-500">{item.tag}</span>
                      <span className={`text-[9px] ${isSunlit ? 'text-[#D95338]' : 'text-cyan-400'}`}>Run Parser →</span>
                    </div>
                    <div className="font-medium text-xs">&ldquo;{item.text}&rdquo;</div>
                  </button>
                ))}
              </div>

              {/* Execution card */}
              <div className={`lg:col-span-7 p-6 rounded-2xl border font-mono text-xs flex flex-col gap-3 ${isSunlit ? 'bg-[#F2ECE1] border-[#E0D5C3]' : 'bg-white/[0.03] border-white/15'}`}>
                <div className={`flex items-center justify-between pb-2 border-b ${isSunlit ? 'border-[#E0D5C3]' : 'border-white/10'}`}>
                  <span className={`font-bold ${isSunlit ? 'text-[#D95338]' : 'text-cyan-400'}`}>
                    PREPARED ACTION PAYLOAD (FACTS HASH BOUND)
                  </span>
                  <span className="text-[10px] text-emerald-500 font-bold bg-emerald-500/10 px-2 py-0.5 rounded">
                    PARSED IN 160ms
                  </span>
                </div>

                <div className="space-y-2 py-1">
                  <div className="flex justify-between">
                    <span className="text-zinc-500">Staged Intent:</span>
                    <span className="font-bold">{parserState.intent}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-500">Target Member:</span>
                    <span>{parserState.recipient}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-500">Parsed Amount:</span>
                    <span className="text-emerald-500 font-bold">{parserState.amount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-500">Active Expiry:</span>
                    <span>{parserState.expiry}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-500">Cryptographic Facts Hash:</span>
                    <span className="font-mono text-[10px] text-purple-400">{parserState.factsHash}</span>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setParserState((prev) => ({ ...prev, status: 'executed' }));
                    setTimeout(() => setParserState((prev) => ({ ...prev, status: 'preview' })), 3000);
                  }}
                  className={`w-full py-3 rounded-xl font-mono text-xs font-semibold transition-all mt-1 shadow-lg ${
                    parserState.status === 'executed'
                      ? 'bg-emerald-500 text-white'
                      : isSunlit
                      ? 'bg-[#D95338] text-white hover:bg-[#C2432A]'
                      : 'bg-white text-black hover:bg-zinc-200'
                  }`}
                >
                  {parserState.status === 'executed'
                    ? '✓ MUTATED VIA GATEWAY REDUCER (RECEIPT #7492 CREATED)'
                    : '1-Tap Parental Biometric Approval →'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* SLIDE 5: Live Seeded Sharma Household */}
        {currentSlide === 4 && (
          <div className="flex flex-col gap-4 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex justify-between items-end">
              <div>
                <span className={`font-mono text-xs uppercase tracking-widest block mb-1 ${isSunlit ? 'text-[#D95338]' : 'text-cyan-400'}`}>
                  05 / SEEDED HOUSEHOLD DEMO
                </span>
                <h2 className="font-display font-light text-3xl sm:text-4xl">
                  Seeded Sharma Household Demo
                </h2>
              </div>
              <span className="font-mono text-xs text-emerald-500 font-bold bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
                ● LIVE SEEDED PROTOTYPE
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-2 font-mono text-xs">
              {householdMembers.map((member, idx) => (
                <div
                  key={idx}
                  className={`p-6 rounded-2xl border transition-all flex flex-col justify-between ${
                    member.cardStatus === 'Active'
                      ? isSunlit
                        ? 'bg-[#F2ECE1] border-[#E0D5C3]'
                        : 'bg-white/[0.03] border-white/15'
                      : 'bg-red-950/20 border-red-500/30'
                  }`}
                >
                  <div>
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-xl">{member.avatar}</span>
                        <span className={`text-[10px] uppercase font-bold ${isSunlit ? 'text-[#D95338]' : 'text-cyan-400'}`}>
                          {member.role}
                        </span>
                      </div>
                      <span
                        className={`text-[9px] px-2 py-0.5 rounded font-bold ${
                          member.cardStatus === 'Active'
                            ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20'
                            : 'bg-red-500/10 text-red-400 border border-red-500/20'
                        }`}
                      >
                        {member.cardStatus === 'Active' ? '● ACTIVE' : '❄ FROZEN'}
                      </span>
                    </div>

                    <h3 className="font-display text-xl mb-0.5 font-semibold">{member.name}</h3>
                    <div className="text-sm font-bold mb-3 text-emerald-500">{member.balance}</div>

                    <div className={`p-3 rounded-xl border text-[11px] space-y-1.5 ${isSunlit ? 'bg-[#EAE2D5] border-[#D9CEBA]' : 'bg-white/[0.02] border-white/5'}`}>
                      <div className="text-zinc-500">Tier: <span className="font-semibold text-zinc-700 dark:text-zinc-200">{member.type}</span></div>
                      <div className="text-zinc-500">Rules: <span className="text-cyan-600 dark:text-cyan-300">{member.rules}</span></div>
                    </div>
                  </div>

                  <div className={`mt-4 pt-3 border-t flex gap-2 ${isSunlit ? 'border-[#E0D5C3]' : 'border-white/10'}`}>
                    <button
                      onClick={() => toggleCardFreeze(idx)}
                      className={`flex-1 py-2 rounded-xl text-xs font-mono font-semibold transition-all ${
                        member.cardStatus === 'Active'
                          ? 'bg-red-500/10 hover:bg-red-500/20 text-red-500 border border-red-500/20'
                          : 'bg-emerald-500 text-white'
                      }`}
                    >
                      {member.cardStatus === 'Active' ? '🔒 Freeze Card' : 'Unfreeze Card'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SLIDE 6: Why Stellar + SpacetimeDB? Technical Moat Benchmark */}
        {currentSlide === 5 && (
          <div className="flex flex-col gap-4 animate-in fade-in zoom-in-95 duration-200">
            <div>
              <span className={`font-mono text-xs uppercase tracking-widest block mb-1 ${isSunlit ? 'text-[#D95338]' : 'text-cyan-400'}`}>
                06 / TECHNICAL MOAT
              </span>
              <h2 className="font-display font-light text-3xl sm:text-4xl">
                Why Stellar &amp; SpacetimeDB Win in the Real World
              </h2>
            </div>

            <div className="overflow-x-auto my-2">
              <table className={`w-full text-left font-mono text-xs border-collapse rounded-2xl overflow-hidden ${isSunlit ? 'bg-[#F2ECE1]' : 'bg-white/[0.03]'}`}>
                <thead>
                  <tr className={`border-b ${isSunlit ? 'border-[#E0D5C3] bg-[#E8DFC8]' : 'border-white/10 bg-white/[0.05]'}`}>
                    <th className="p-3.5">METRIC / CAPABILITY</th>
                    <th className={`p-3.5 ${isSunlit ? 'text-[#D95338]' : 'text-cyan-400'} font-bold`}>KAMI (STELLAR + SPACETIMEDB)</th>
                    <th className="p-3.5 text-zinc-400">ETHEREUM L2s</th>
                    <th className="p-3.5 text-zinc-400">TRADITIONAL BANKS</th>
                  </tr>
                </thead>
                <tbody className={`divide-y ${isSunlit ? 'divide-[#E0D5C3]' : 'divide-white/5'}`}>
                  <tr>
                    <td className="p-3.5 font-semibold">Deterministic Finality</td>
                    <td className="p-3.5 text-emerald-500 font-bold">3.2s (SCP Consensus)</td>
                    <td className="p-3.5 text-red-400">12s – 15 mins (Reorg risk)</td>
                    <td className="p-3.5 text-zinc-400">2 – 3 Business Days (ACH)</td>
                  </tr>
                  <tr>
                    <td className="p-3.5 font-semibold">Average Transaction Fee</td>
                    <td className="p-3.5 text-emerald-500 font-bold">$0.00001 (0.00001 XLM)</td>
                    <td className="p-3.5 text-red-400">$0.25 – $4.00</td>
                    <td className="p-3.5 text-zinc-400">$15 – $35 Wire Fees</td>
                  </tr>
                  <tr>
                    <td className="p-3.5 font-semibold">Multi-Device Live Sync</td>
                    <td className="p-3.5 text-emerald-500 font-bold">Instant (SpacetimeDB Rust Wasm)</td>
                    <td className="p-3.5 text-amber-400">WebSocket / Polling Lag</td>
                    <td className="p-3.5 text-red-400">Batch Processed</td>
                  </tr>
                  <tr>
                    <td className="p-3.5 font-semibold">Foreign Exchange Markup</td>
                    <td className="p-3.5 text-emerald-500 font-bold">0% (Stellar Native Path Payment)</td>
                    <td className="p-3.5 text-amber-400">0.3% – 1% DEX Slippage</td>
                    <td className="p-3.5 text-red-400">3.5% + $5 International Fee</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* SLIDE 7: System Architecture & Proof of Execution */}
        {currentSlide === 6 && (
          <div className="flex flex-col gap-4 animate-in fade-in zoom-in-95 duration-200">
            <div>
              <span className={`font-mono text-xs uppercase tracking-widest block mb-1 ${isSunlit ? 'text-[#D95338]' : 'text-cyan-400'}`}>
                07 / CODEBASE &amp; ARCHITECTURE
              </span>
              <h2 className="font-display font-light text-3xl sm:text-4xl">
                ~31,300 LOC Production Architecture
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 my-2 font-mono text-xs">
              <div className={`p-6 rounded-2xl border flex flex-col justify-between ${isSunlit ? 'bg-[#F2ECE1] border-[#E0D5C3]' : 'bg-white/[0.03] border-white/10'}`}>
                <div>
                  <span className={`text-[10px] font-bold block mb-1 uppercase ${isSunlit ? 'text-[#D95338]' : 'text-cyan-400'}`}>
                    MOBILE CLIENT
                  </span>
                  <h3 className="font-display text-2xl font-bold mb-1">~25,000 LOC</h3>
                  <span className="text-[11px] text-zinc-500 block mb-3">136 TypeScript Files</span>
                  <p className={`font-sans text-xs leading-relaxed ${isSunlit ? 'text-[#5C4D44]' : 'text-zinc-300'}`}>
                    Expo 57 + React Native 0.86 + React 19. Expo Router, Zustand state, Reanimated 4, Skia shaders, and Gesture Handler.
                  </p>
                </div>
                <span className="text-[9px] pt-3 border-t border-black/10 dark:border-white/10 font-bold text-emerald-500">
                  BUN RUNTIME ACCELERATED
                </span>
              </div>

              <div className={`p-6 rounded-2xl border flex flex-col justify-between ${isSunlit ? 'bg-[#F2ECE1] border-[#E0D5C3]' : 'bg-white/[0.03] border-white/10'}`}>
                <div>
                  <span className={`text-[10px] font-bold block mb-1 uppercase ${isSunlit ? 'text-[#D95338]' : 'text-cyan-400'}`}>
                    GATEWAY BACKEND
                  </span>
                  <h3 className="font-display text-2xl font-bold mb-1">~6,300 LOC</h3>
                  <span className="text-[11px] text-zinc-500 block mb-3">Fastify 5 Microservices</span>
                  <p className={`font-sans text-xs leading-relaxed ${isSunlit ? 'text-[#5C4D44]' : 'text-zinc-300'}`}>
                    Sole writer to SpacetimeDB. Manages PREPARE / EXECUTE, Facts Hashing, idempotency, AI tool bridges, and transaction safety.
                  </p>
                </div>
                <span className="text-[9px] pt-3 border-t border-black/10 dark:border-white/10 font-bold text-purple-400">
                  SINGLE WRITER GATEWAY
                </span>
              </div>

              <div className={`p-6 rounded-2xl border flex flex-col justify-between ${isSunlit ? 'bg-[#F2ECE1] border-[#E0D5C3]' : 'bg-white/[0.03] border-white/10'}`}>
                <div>
                  <span className={`text-[10px] font-bold block mb-1 uppercase ${isSunlit ? 'text-[#D95338]' : 'text-cyan-400'}`}>
                    DATABASE &amp; REDUCERS
                  </span>
                  <h3 className="font-display text-2xl font-bold mb-1">SpacetimeDB 2.8</h3>
                  <span className="text-[11px] text-zinc-500 block mb-3">20 Tables • 28 Reducers</span>
                  <p className={`font-sans text-xs leading-relaxed ${isSunlit ? 'text-[#5C4D44]' : 'text-zinc-300'}`}>
                    Real-time relational engine in Rust. Tracks users, households, members, cards, balances, and audit events with 0 polling.
                  </p>
                </div>
                <span className="text-[9px] pt-3 border-t border-black/10 dark:border-white/10 font-bold text-cyan-400">
                  45/45 VITEST TESTS PASSING
                </span>
              </div>
            </div>
          </div>
        )}

        {/* SLIDE 8: Business Model & Unit Economics */}
        {currentSlide === 7 && (
          <div className="flex flex-col gap-4 animate-in fade-in zoom-in-95 duration-200">
            <div>
              <span className={`font-mono text-xs uppercase tracking-widest block mb-1 ${isSunlit ? 'text-[#D95338]' : 'text-cyan-400'}`}>
                08 / BUSINESS MODEL &amp; REVENUE
              </span>
              <h2 className="font-display font-light text-3xl sm:text-4xl">
                Diversified Revenue Streams &amp; Unit Economics
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 my-2 font-mono text-xs">
              <div className={`p-6 rounded-2xl border flex flex-col justify-between ${isSunlit ? 'bg-[#F2ECE1] border-[#E0D5C3]' : 'bg-white/[0.03] border-white/10'}`}>
                <div>
                  <span className="text-3xl block mb-2">💳</span>
                  <h3 className="font-display text-lg font-bold mb-2">Interchange Fee Split</h3>
                  <p className={`font-sans text-xs leading-relaxed ${isSunlit ? 'text-[#5C4D44]' : 'text-zinc-300'}`}>
                    Earn 1.2% – 1.8% interchange yield on all domestic and international card transactions routed via KripiCard &amp; Visa.
                  </p>
                </div>
                <span className="text-[10px] text-emerald-500 font-bold pt-3 border-t border-black/10 dark:border-white/10">
                  RECURRING TRANSACTION VOLUME
                </span>
              </div>

              <div className={`p-6 rounded-2xl border flex flex-col justify-between ${isSunlit ? 'bg-[#F2ECE1] border-[#E0D5C3]' : 'bg-white/[0.03] border-white/10'}`}>
                <div>
                  <span className="text-3xl block mb-2">💱</span>
                  <h3 className="font-display text-lg font-bold mb-2">0% FX Arbitrage Margin</h3>
                  <p className={`font-sans text-xs leading-relaxed ${isSunlit ? 'text-[#5C4D44]' : 'text-zinc-300'}`}>
                    Capture a 0.25% spread on automated cross-border currency conversions while saving families 3.25% vs traditional banks.
                  </p>
                </div>
                <span className="text-[10px] text-cyan-400 font-bold pt-3 border-t border-black/10 dark:border-white/10">
                  STELLAR NATIVE PATH PAYMENTS
                </span>
              </div>

              <div className={`p-6 rounded-2xl border flex flex-col justify-between ${isSunlit ? 'bg-[#F2ECE1] border-[#E0D5C3]' : 'bg-white/[0.03] border-white/10'}`}>
                <div>
                  <span className="text-3xl block mb-2">💎</span>
                  <h3 className="font-display text-lg font-bold mb-2">Premium Obsidian Tiers</h3>
                  <p className={`font-sans text-xs leading-relaxed ${isSunlit ? 'text-[#5C4D44]' : 'text-zinc-300'}`}>
                    $9.99/mo family subscription unlocking physical Obsidian metal cards, unlimited sub-accounts, and priority concierge AI support.
                  </p>
                </div>
                <span className="text-[10px] text-purple-400 font-bold pt-3 border-t border-black/10 dark:border-white/10">
                  HIGH-LTV SUBSCRIPTION REVENUE
                </span>
              </div>
            </div>
          </div>
        )}

        {/* SLIDE 9: Grant Roadmap & Milestones */}
        {currentSlide === 8 && (
          <div className="flex flex-col gap-4 animate-in fade-in zoom-in-95 duration-200">
            <div>
              <span className={`font-mono text-xs uppercase tracking-widest block mb-1 ${isSunlit ? 'text-[#D95338]' : 'text-cyan-400'}`}>
                09 / GRANT MILESTONES &amp; ROADMAP
              </span>
              <h2 className="font-display font-light text-3xl sm:text-4xl">
                Stellar Community Fund (SCF) Grant Execution Plan
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 my-2 font-mono text-xs">
              <div className={`p-6 rounded-2xl border flex flex-col justify-between ${isSunlit ? 'bg-[#F2ECE1] border-[#E0D5C3]' : 'bg-white/[0.03] border-white/10'}`}>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-emerald-500 font-bold text-xs">PHASE 1 (CURRENT)</span>
                    <span className="bg-emerald-500/10 text-emerald-500 px-2 py-0.5 rounded text-[9px] font-bold">COMPLETED</span>
                  </div>
                  <h3 className="font-display text-lg font-bold mb-2">Testnet Prototype &amp; AI Engine</h3>
                  <ul className="space-y-1.5 text-[11px] text-zinc-400 font-sans">
                    <li>✓ Complete React Native Expo 57 app (~25k LOC)</li>
                    <li>✓ SpacetimeDB 2.8 real-time sync engine</li>
                    <li>✓ Qwen financial intent parser with Facts Hashing</li>
                    <li>✓ 45 Vitest safety &amp; auth integration tests</li>
                  </ul>
                </div>
                <span className="text-[9px] text-zinc-500 pt-3 border-t border-black/10 dark:border-white/10">
                  DELIVERABLE: WORKING DEMO
                </span>
              </div>

              <div className={`p-6 rounded-2xl border flex flex-col justify-between ${isSunlit ? 'bg-[#FAF5ED] border-[#D95338]/40' : 'bg-cyan-950/20 border-cyan-500/40'}`}>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className={`font-bold text-xs ${isSunlit ? 'text-[#D95338]' : 'text-cyan-400'}`}>PHASE 2 (GRANT GOAL)</span>
                    <span className="bg-cyan-500/10 text-cyan-400 px-2 py-0.5 rounded text-[9px] font-bold">NEXT 90 DAYS</span>
                  </div>
                  <h3 className="font-display text-lg font-bold mb-2">Audits &amp; Visa Issuer Pilot</h3>
                  <ul className="space-y-1.5 text-[11px] text-zinc-400 font-sans">
                    <li>• Formal smart contract &amp; gateway security audit</li>
                    <li>• Production KripiCard Visa card issuance batch</li>
                    <li>• Closed beta rollout to 500 family households</li>
                    <li>• Automated INR &amp; USD on/off-ramp bridge</li>
                  </ul>
                </div>
                <span className="text-[9px] text-cyan-400 pt-3 border-t border-cyan-500/20">
                  SCF GRANT TARGET: $50,000
                </span>
              </div>

              <div className={`p-6 rounded-2xl border flex flex-col justify-between ${isSunlit ? 'bg-[#F2ECE1] border-[#E0D5C3]' : 'bg-white/[0.03] border-white/10'}`}>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-purple-400 font-bold text-xs">PHASE 3 (SCALE)</span>
                    <span className="bg-purple-500/10 text-purple-400 px-2 py-0.5 rounded text-[9px] font-bold">Q4 2026</span>
                  </div>
                  <h3 className="font-display text-lg font-bold mb-2">Mainnet Public Launch</h3>
                  <ul className="space-y-1.5 text-[11px] text-zinc-400 font-sans">
                    <li>• iOS App Store &amp; Google Play Store global release</li>
                    <li>• Physical Obsidian Metal card delivery</li>
                    <li>• AI autonomous yield optimizer across Stellar DeFi</li>
                    <li>• Multi-household collaborative family trusts</li>
                  </ul>
                </div>
                <span className="text-[9px] text-zinc-500 pt-3 border-t border-black/10 dark:border-white/10">
                  TARGET: 25,000 ACTIVE CARDS
                </span>
              </div>
            </div>
          </div>
        )}

        {/* SLIDE 10: The Ask & Judge Q&A */}
        {currentSlide === 9 && (
          <div className="flex flex-col items-center justify-center text-center py-5 animate-in fade-in zoom-in-95 duration-200">
            <div className={`w-16 h-16 rounded-2xl border flex items-center justify-center mb-3 ${isSunlit ? 'bg-[#D95338]/10 border-[#D95338]/30' : 'bg-white/[0.08] border-white/20'}`}>
              <StellarLogoSVG className={`w-8 h-8 ${isSunlit ? 'text-[#D95338]' : 'text-cyan-400'}`} />
            </div>

            <h2 className="font-display font-light text-4xl sm:text-6xl mb-1">
              KAMI
            </h2>
            <p className={`font-mono text-base font-semibold mb-2 ${isSunlit ? 'text-[#D95338]' : 'text-cyan-400'}`}>
              &ldquo;Money that understands your family.&rdquo;
            </p>
            <p className={`font-mono text-xs max-w-xl mb-5 ${isSunlit ? 'text-[#5C4D44]' : 'text-zinc-400'}`}>
              Financial infrastructure underneath. Natural language on top. Trust at every step.
            </p>

            <div className={`p-5 rounded-2xl border max-w-md w-full font-mono text-xs space-y-2 text-left mb-5 ${isSunlit ? 'bg-[#F2ECE1] border-[#E0D5C3]' : 'bg-white/[0.03] border-white/15'}`}>
              <div className="flex justify-between">
                <span className="text-zinc-500">Live Website:</span>
                <a href="https://kami.mystic.cat" target="_blank" className={`underline underline-offset-2 font-semibold ${isSunlit ? 'text-[#D95338]' : 'text-cyan-400'}`}>
                  https://kami.mystic.cat
                </a>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500">Demo Video:</span>
                <a href="https://kami.mystic.cat/video" target="_blank" className="underline underline-offset-2">
                  https://kami.mystic.cat/video
                </a>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500">GitHub Codebase:</span>
                <a href="https://github.com/TheMystic07/KamiKardsWeb" target="_blank" className="underline underline-offset-2">
                  github.com/TheMystic07/KamiKardsWeb
                </a>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500">Grant Alignment:</span>
                <span className="text-emerald-500 font-bold">Stellar Community Fund (SCF)</span>
              </div>
            </div>

            <span className={`font-mono text-xs animate-pulse font-semibold ${isSunlit ? 'text-[#D95338]' : 'text-cyan-400'}`}>
              ● READY FOR LIVE JUDGE DEMO &amp; TECHNICAL Q&amp;A
            </span>
          </div>
        )}
      </main>

      {/* Speaker Notes Drawer */}
      {showNotes && (
        <div
          className={`fixed bottom-16 inset-x-0 z-40 max-w-4xl mx-auto p-4 rounded-2xl border backdrop-blur-xl shadow-2xl animate-in slide-in-from-bottom-4 ${
            isSunlit ? 'bg-[#FAF6EE]/95 border-[#D95338]/40 text-[#2C2018]' : 'bg-zinc-950/95 border-cyan-500/30 text-white'
          }`}
        >
          <div className="flex justify-between items-center mb-1">
            <span className={`font-mono text-[10px] uppercase tracking-widest font-bold ${isSunlit ? 'text-[#D95338]' : 'text-cyan-400'}`}>
              SPEAKER NOTES (SLIDE {currentSlide + 1} OF {totalSlides})
            </span>
            <button onClick={() => setShowNotes(false)} className="text-xs font-mono text-zinc-500 hover:text-zinc-900 dark:hover:text-white">
              ✕
            </button>
          </div>
          <p className={`text-xs font-sans leading-relaxed ${isSunlit ? 'text-[#4A3B32]' : 'text-zinc-300'}`}>
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
              <h3 className="font-display text-2xl text-white">Pitch Deck Overview ({totalSlides} Slides)</h3>
              <button className="font-mono text-sm text-zinc-400 hover:text-white">✕ Close</button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
              {[
                '01. Money That Understands Your Family',
                '02. The Problem: Broken Family Fintech',
                '03. The Deterministic 6-Step Safety Loop',
                '04. Live Intent Parser & Facts Hash',
                '05. Seeded Sharma Household Demo',
                '06. Why Stellar & SpacetimeDB Win',
                '07. Architecture & ~31,300 LOC Metrics',
                '08. Business Model & Unit Economics',
                '09. Grant Roadmap & SCF Alignment',
                '10. The Ask & Judge Q&A',
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
                  <h4 className="font-display text-xs text-white line-clamp-2">{title}</h4>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Bottom Deck Navigation Controller */}
      <footer
        className={`flex items-center justify-between px-6 sm:px-10 py-3 border-t z-30 transition-colors duration-300 ${
          isSunlit ? 'bg-[#F6F0E7]/90 border-[#E8DFC8]/60 backdrop-blur-xl' : 'bg-black/70 border-white/10 backdrop-blur-xl'
        }`}
      >
        <div className="flex items-center gap-2">
          <button
            onClick={prevSlide}
            disabled={currentSlide === 0}
            className={`px-4 py-2 rounded-xl border text-xs font-mono disabled:opacity-30 transition-all ${
              isSunlit ? 'bg-[#EFE6DA] border-[#D9CEBA] text-[#4A3B32]' : 'bg-white/[0.05] border-white/10 text-white hover:bg-white/10'
            }`}
          >
            ← Previous
          </button>

          <button
            onClick={nextSlide}
            disabled={currentSlide === totalSlides - 1}
            className={`px-5 py-2 rounded-xl font-semibold text-xs font-mono disabled:opacity-30 transition-all shadow-lg ${
              isSunlit ? 'bg-[#D95338] text-white hover:bg-[#C2432A]' : 'bg-white text-black hover:bg-zinc-200'
            }`}
          >
            Next Slide →
          </button>
        </div>

        <div className={`flex items-center gap-4 font-mono text-[11px] ${isSunlit ? 'text-[#7C6E65]' : 'text-zinc-400'}`}>
          <span className="hidden sm:inline">Use Scroll / ← → Arrow Keys</span>
          <span>•</span>
          <span className={`font-semibold ${isSunlit ? 'text-[#D95338]' : 'text-cyan-400'}`}>
            KAMI — STELLAR HACKATHON &amp; GRANT DECK
          </span>
        </div>
      </footer>
    </div>
  );
}
