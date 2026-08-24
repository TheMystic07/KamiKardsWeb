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

  // Slide 3 & 4: Core Interaction & Parser Simulator
  const [activeStep, setActiveStep] = useState<number>(0);
  const [samplePrompt, setSamplePrompt] = useState('Give Maya ₹2,000 until Sunday');
  const [parserState, setParserState] = useState<{
    intent: string;
    recipient: string;
    amount: string;
    expiry: string;
    factsHash: string;
    status: 'preview' | 'approved' | 'executed';
  }>({
    intent: 'ALLOWANCE_TRANSFER',
    recipient: 'Maya (Daughter)',
    amount: '₹2,000 (~24.10 USDC)',
    expiry: 'Sunday 11:59 PM',
    factsHash: '0x7f8a9b2c...d4e1',
    status: 'preview',
  });

  // Slide 5: 4 Core Tabs Experience
  const [activeProductTab, setActiveProductTab] = useState<'Ask' | 'Cards' | 'Family' | 'Activity'>('Ask');

  // Slide 6: Seeded Sharma Household
  const [householdMembers, setHouseholdMembers] = useState([
    {
      name: 'Aarav Sharma',
      role: 'Family Admin',
      avatar: '👨‍💼',
      balance: '₹85,000 ($1,020)',
      cardStatus: 'Active',
      rules: 'Unrestricted Family Master Card',
      type: 'Obsidian Founder',
    },
    {
      name: 'Maya Sharma',
      role: 'Daughter (Teen)',
      avatar: '👧',
      balance: '₹2,000 ($24.10)',
      cardStatus: 'Active',
      rules: '₹2,000 / week • Books & Groceries only',
      type: 'Junior Pocket Card',
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

  const totalSlides = 12;

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
    'Welcome judges. Kami is an AI-native family crypto neobank. Product promise: "Money that understands your family." Crypto stays underneath as infrastructure on Stellar.',
    'Product positioning: Kami sits at the intersection of 5 massive categories: Premium Neobank, Crypto Infrastructure, Family Banking, Programmable Cards, and AI Commerce.',
    'Core Interaction Loop: Ask -> Understand -> Preview -> Approve -> Execute -> Receipt. Critical rule: AI has READ and PREPARE authority, but NEVER moves money directly.',
    'Demonstrate the live natural language parser handling colloquial amounts like "15k" and "1.5 lakh", binding cryptographically with a Facts Hash before execution.',
    'The 4 core product tabs: Ask (Chat-first AI home), Cards (programmable rules & freeze), Family (household roles & allowances), and Activity (auditable receipts).',
    'Live Seeded Sharma Household demo: Real-world family management with Aarav (Admin), Maya (Teen Card - ₹2k/week), and Rohan (College Card - ₹15k/mo).',
    'Deep engineering architecture: ~25,000 LOC across 136 files in Expo 57 React Native + Fastify 5 Bun backend (6,300 LOC) + SpacetimeDB 2.8 with 20 tables and 28 reducers.',
    'The 7 Pillars of Trust & Security: Single Writer Gateway, Facts Hashing, Idempotency, AI Isolation, Untrusted Inputs, Provider-First execution, and Immutable Audit Trail.',
    'Stellar crypto infrastructure: Fast 3.2s settlement, sub-cent fees, and non-custodial MPC auth via Privy — completely abstracted away for everyday family members.',
    'Testing and verification: 45 Vitest integration tests covering financial safety invariants, KYC queues, card ordering, and AI boundary guardrails.',
    'Visual direction & "Quiet Money" design philosophy: Warm Sunlit Cream surfaces, terracotta accents, espresso amounts, and human calm typography.',
    'Final conclusion and open invitation for judges to run live technical queries and test the seeded Sharma household.',
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
        className={`flex items-center justify-between px-6 sm:px-10 py-3.5 border-b z-30 transition-colors duration-300 ${
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
                AI-NATIVE FAMILY NEOBANK
              </span>
            </div>
            <span className={`font-mono text-[8px] tracking-wider ${isSunlit ? 'text-[#7C6E65]' : 'text-zinc-400'}`}>
              MONEY THAT UNDERSTANDS YOUR FAMILY
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
      <main className="flex-1 flex flex-col justify-center max-w-6xl w-full mx-auto px-4 sm:px-8 lg:px-12 py-6 z-10 overflow-visible">
        {/* SLIDE 1: Title & The Big Idea */}
        {currentSlide === 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center animate-in fade-in zoom-in-95 duration-200">
            <div className="lg:col-span-7 flex flex-col items-start text-left">
              <div
                className={`inline-flex items-center gap-2 px-3.5 py-1 rounded-full font-mono text-[10px] tracking-widest uppercase mb-4 border ${
                  isSunlit
                    ? 'bg-[#D95338]/10 border-[#D95338]/30 text-[#D95338]'
                    : 'bg-cyan-500/10 border-cyan-500/30 text-cyan-400'
                }`}
              >
                <StellarLogoSVG className="w-3.5 h-3.5" />
                <span>STELLAR HACKATHON 2026 • AI-NATIVE NEOBANK</span>
              </div>

              <h1 className="font-display font-light text-4xl sm:text-6xl tracking-tight leading-[1.05] mb-4">
                Money That Understands Your Family.
              </h1>

              <p className={`font-mono text-xs sm:text-sm max-w-xl font-light leading-relaxed mb-6 ${isSunlit ? 'text-[#5C4D44]' : 'text-zinc-300'}`}>
                Traditional fintech makes users understand the product. Kami makes the product understand the user. A chat-first AI mobile neobank where families manage balances, allowances, approvals, and programmable cards through natural language.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 w-full max-w-lg font-mono text-xs">
                <div className={`p-3 rounded-xl border ${isSunlit ? 'bg-[#F2ECE1] border-[#E0D5C3]' : 'bg-white/[0.04] border-white/10'}`}>
                  <span className={`text-[9px] block uppercase ${isSunlit ? 'text-[#8A796E]' : 'text-zinc-500'}`}>CORE INTERACTION</span>
                  <span className={`font-bold text-xs mt-0.5 block ${isSunlit ? 'text-[#D95338]' : 'text-cyan-400'}`}>Natural Language OS</span>
                </div>
                <div className={`p-3 rounded-xl border ${isSunlit ? 'bg-[#F2ECE1] border-[#E0D5C3]' : 'bg-white/[0.04] border-white/10'}`}>
                  <span className={`text-[9px] block uppercase ${isSunlit ? 'text-[#8A796E]' : 'text-zinc-500'}`}>SYSTEM OF RECORD</span>
                  <span className="text-emerald-500 font-bold text-xs mt-0.5 block">SpacetimeDB 2.8</span>
                </div>
                <div className={`p-3 rounded-xl border col-span-2 sm:col-span-1 ${isSunlit ? 'bg-[#F2ECE1] border-[#E0D5C3]' : 'bg-white/[0.04] border-white/10'}`}>
                  <span className={`text-[9px] block uppercase ${isSunlit ? 'text-[#8A796E]' : 'text-zinc-500'}`}>CRYPTO RAILS</span>
                  <span className={`font-bold text-xs mt-0.5 block ${isSunlit ? 'text-[#5C4D44]' : 'text-purple-400'}`}>Stellar / Horizon</span>
                </div>
              </div>
            </div>

            {/* Embedded Live 3D Cylinder Card Carousel */}
            <div className="lg:col-span-5 h-[420px] sm:h-[480px] w-full relative flex items-center justify-center overflow-visible">
              <CylinderCardCarousel scale={0.88} />
              <div className={`absolute bottom-1 font-mono text-[8px] uppercase tracking-widest pointer-events-none ${isSunlit ? 'text-[#8A796E]' : 'text-zinc-500'}`}>
                ● Live 3D Programmable Cards • Powered by KripiCard &amp; Stellar
              </div>
            </div>
          </div>
        )}

        {/* SLIDE 2: Product Positioning (5 Categories) */}
        {currentSlide === 1 && (
          <div className="flex flex-col gap-4 animate-in fade-in zoom-in-95 duration-200">
            <div>
              <span className={`font-mono text-xs uppercase tracking-widest block mb-1 ${isSunlit ? 'text-[#D95338]' : 'text-cyan-400'}`}>
                02 / PRODUCT POSITIONING
              </span>
              <h2 className="font-display font-light text-3xl sm:text-4xl">
                The Intersection of 5 Massive Financial Layers
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 my-2 font-mono text-xs">
              <div className={`p-5 rounded-2xl border flex flex-col justify-between ${isSunlit ? 'bg-[#F2ECE1] border-[#E0D5C3]' : 'bg-white/[0.03] border-white/10'}`}>
                <div>
                  <span className="text-2xl block mb-2">🏦</span>
                  <h3 className="font-display text-base mb-1 font-semibold">1. Premium Neobank</h3>
                  <p className={`text-[11px] font-sans leading-relaxed ${isSunlit ? 'text-[#5C4D44]' : 'text-zinc-300'}`}>
                    High-yield balances, multi-currency support, instantaneous peer-to-peer transfers, and live activity streams.
                  </p>
                </div>
                <span className={`text-[9px] pt-3 border-t ${isSunlit ? 'border-[#E0D5C3] text-[#8A796E]' : 'border-white/10 text-zinc-500'}`}>FASTIFY 5 GATEWAY</span>
              </div>

              <div className={`p-5 rounded-2xl border flex flex-col justify-between ${isSunlit ? 'bg-[#F2ECE1] border-[#E0D5C3]' : 'bg-white/[0.03] border-white/10'}`}>
                <div>
                  <span className="text-2xl block mb-2">⚡</span>
                  <h3 className="font-display text-base mb-1 font-semibold">2. Crypto Infrastructure</h3>
                  <p className={`text-[11px] font-sans leading-relaxed ${isSunlit ? 'text-[#5C4D44]' : 'text-zinc-300'}`}>
                    Stellar Horizon underneath. Non-custodial crypto pooling (USDC / XLM) with sub-3.5s settlement hidden from mainstream users.
                  </p>
                </div>
                <span className={`text-[9px] pt-3 border-t ${isSunlit ? 'border-[#E0D5C3] text-[#D95338]' : 'border-white/10 text-cyan-400'}`}>STELLAR CONSENSUS</span>
              </div>

              <div className={`p-5 rounded-2xl border flex flex-col justify-between ${isSunlit ? 'bg-[#F2ECE1] border-[#E0D5C3]' : 'bg-white/[0.03] border-white/10'}`}>
                <div>
                  <span className="text-2xl block mb-2">👨‍👩‍👧‍👦</span>
                  <h3 className="font-display text-base mb-1 font-semibold">3. Family Banking</h3>
                  <p className={`text-[11px] font-sans leading-relaxed ${isSunlit ? 'text-[#5C4D44]' : 'text-zinc-300'}`}>
                    Multi-user household accounts, parental approvals, automated allowances, and category budgets.
                  </p>
                </div>
                <span className={`text-[9px] pt-3 border-t ${isSunlit ? 'border-[#E0D5C3] text-emerald-600' : 'border-white/10 text-emerald-400'}`}>SPACETIMEDB HOUSEHOLDS</span>
              </div>

              <div className={`p-5 rounded-2xl border flex flex-col justify-between ${isSunlit ? 'bg-[#F2ECE1] border-[#E0D5C3]' : 'bg-white/[0.03] border-white/10'}`}>
                <div>
                  <span className="text-2xl block mb-2">💳</span>
                  <h3 className="font-display text-base mb-1 font-semibold">4. Programmable Cards</h3>
                  <p className={`text-[11px] font-sans leading-relaxed ${isSunlit ? 'text-[#5C4D44]' : 'text-zinc-300'}`}>
                    Purpose-locked, temporary, subscription, and protected physical/virtual Visa cards via KripiCard API.
                  </p>
                </div>
                <span className={`text-[9px] pt-3 border-t ${isSunlit ? 'border-[#E0D5C3] text-purple-600' : 'border-white/10 text-purple-400'}`}>KRIPICARD RAILS</span>
              </div>

              <div className={`p-5 rounded-2xl border flex flex-col justify-between col-span-1 sm:col-span-2 lg:col-span-2 ${isSunlit ? 'bg-[#F2ECE1] border-[#E0D5C3]' : 'bg-white/[0.03] border-white/10'}`}>
                <div>
                  <span className="text-2xl block mb-2">🛍️</span>
                  <h3 className="font-display text-base mb-1 font-semibold">5. AI Commerce &amp; Assistance</h3>
                  <p className={`text-[11px] font-sans leading-relaxed ${isSunlit ? 'text-[#5C4D44]' : 'text-zinc-300'}`}>
                    Conversational product comparison, intelligent payment preparation, single-use tokenization, and protected checkouts.
                  </p>
                </div>
                <span className={`text-[9px] pt-3 border-t ${isSunlit ? 'border-[#E0D5C3] text-[#D95338]' : 'border-white/10 text-cyan-400'}`}>QWEN FINANCIAL LLM</span>
              </div>
            </div>
          </div>
        )}

        {/* SLIDE 3: Core Interaction (The 6-Step Loop) */}
        {currentSlide === 2 && (
          <div className="flex flex-col gap-4 animate-in fade-in zoom-in-95 duration-200">
            <div>
              <span className={`font-mono text-xs uppercase tracking-widest block mb-1 ${isSunlit ? 'text-[#D95338]' : 'text-cyan-400'}`}>
                03 / INTERACTION MODEL
              </span>
              <h2 className="font-display font-light text-3xl sm:text-4xl">
                Ask → Understand → Preview → Approve → Execute → Receipt
              </h2>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 my-2 font-mono text-xs">
              {[
                { step: '01 / ASK', title: 'Ask', desc: 'AI is the primary home screen and universal command layer.', icon: '💬', auth: 'User Voice/Text' },
                { step: '02 / UNDERSTAND', title: 'Understand', desc: 'AI reads authorized data & parses intents ("15k", "1.5L").', icon: '🧠', auth: 'READ ONLY' },
                { step: '03 / PREVIEW', title: 'Preview', desc: 'Stages a structured financial action. AI NEVER executes.', icon: '📋', auth: 'PREPARE ONLY' },
                { step: '04 / APPROVE', title: 'Approve', desc: 'Explicit parental confirmation + biometric authorization.', icon: '👆', auth: 'PRIVY MPC AUTH' },
                { step: '05 / EXECUTE', title: 'Execute', desc: 'Deterministic backend gateway verifies Facts Hash & mutates.', icon: '⚡', auth: 'BACKEND GATEWAY' },
                { step: '06 / RECEIPT', title: 'Receipt', desc: 'Creates immutable, auditable receipt in family activity stream.', icon: '🧾', auth: 'SPACETIMEDB REDUCER' },
              ].map((item, idx) => (
                <div
                  key={idx}
                  onClick={() => setActiveStep(idx)}
                  className={`p-4 rounded-xl border text-left cursor-pointer transition-all flex flex-col justify-between ${
                    activeStep === idx
                      ? isSunlit
                        ? 'bg-[#EFE4D6] border-[#D95338] shadow-md'
                        : 'bg-cyan-950/40 border-cyan-400 shadow-[0_0_15px_rgba(0,240,255,0.2)]'
                      : isSunlit
                      ? 'bg-[#F2ECE1] border-[#E0D5C3]'
                      : 'bg-white/[0.03] border-white/10'
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
                  <span className={`text-[8px] font-bold block pt-2 mt-2 border-t uppercase ${isSunlit ? 'border-[#E0D5C3] text-[#8A796E]' : 'border-white/10 text-emerald-400'}`}>
                    {item.auth}
                  </span>
                </div>
              ))}
            </div>

            <div className={`p-4 rounded-2xl border font-mono text-xs flex items-center justify-between ${isSunlit ? 'bg-[#FAF5ED] border-[#D95338]/30' : 'bg-white/[0.02] border-white/10'}`}>
              <div className="flex items-center gap-3">
                <span className="text-xl">🛡️</span>
                <span className="font-sans text-xs">
                  <strong>AI Authority Boundary</strong>: AI has <code>READ</code> and <code>PREPARE</code> permissions. AI is <strong>never</strong> the source of truth for money and can never execute financial mutations directly.
                </span>
              </div>
              <span className={`px-2.5 py-1 rounded text-[10px] font-bold uppercase ${isSunlit ? 'bg-[#D95338]/10 text-[#D95338]' : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'}`}>
                100% Deterministic Safety
              </span>
            </div>
          </div>
        )}

        {/* SLIDE 4: Interactive Natural Language Command Simulator */}
        {currentSlide === 3 && (
          <div className="flex flex-col gap-4 animate-in fade-in zoom-in-95 duration-200">
            <div>
              <span className={`font-mono text-xs uppercase tracking-widest block mb-1 ${isSunlit ? 'text-[#D95338]' : 'text-cyan-400'}`}>
                04 / LIVE COMMAND SIMULATOR
              </span>
              <h2 className="font-display font-light text-3xl sm:text-4xl">
                Colloquial Parsing &amp; Facts Hash Validation
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 my-2 items-center">
              {/* Prompts selection */}
              <div className="lg:col-span-5 flex flex-col gap-3 font-mono text-xs">
                <span className={`text-[10px] uppercase ${isSunlit ? 'text-[#8A796E]' : 'text-zinc-400'}`}>
                  SELECT HOUSEHOLD NATURAL COMMAND:
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
                    : 'Approve & Execute via Gateway →'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* SLIDE 5: 4 Core Tabs Product Experience */}
        {currentSlide === 4 && (
          <div className="flex flex-col gap-4 animate-in fade-in zoom-in-95 duration-200">
            <div>
              <span className={`font-mono text-xs uppercase tracking-widest block mb-1 ${isSunlit ? 'text-[#D95338]' : 'text-cyan-400'}`}>
                05 / PRODUCT EXPERIENCE
              </span>
              <h2 className="font-display font-light text-3xl sm:text-4xl">
                4 Core Tabs: Ask · Cards · Family · Activity
              </h2>
            </div>

            {/* Tab navigation */}
            <div className="flex gap-2 font-mono text-xs">
              {(['Ask', 'Cards', 'Family', 'Activity'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveProductTab(tab)}
                  className={`px-4 py-2 rounded-xl border transition-all ${
                    activeProductTab === tab
                      ? isSunlit
                        ? 'bg-[#D95338] text-white border-[#D95338]'
                        : 'bg-white text-black font-bold border-white'
                      : isSunlit
                      ? 'bg-[#F2ECE1] border-[#E0D5C3] text-[#5C4D44]'
                      : 'bg-white/[0.03] border-white/10 text-zinc-400'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Tab Content Display */}
            <div className={`p-6 rounded-2xl border font-mono text-xs min-h-[220px] flex flex-col justify-between ${isSunlit ? 'bg-[#F2ECE1] border-[#E0D5C3]' : 'bg-white/[0.03] border-white/10'}`}>
              {activeProductTab === 'Ask' && (
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">💬</span>
                    <h3 className="font-display text-xl font-semibold">Ask — Chat-First Universal Command Layer</h3>
                  </div>
                  <p className={`font-sans text-xs sm:text-sm leading-relaxed max-w-3xl ${isSunlit ? 'text-[#5C4D44]' : 'text-zinc-300'}`}>
                    Natural language is the primary way families interact with money. Users ask questions, allocate allowances, compare purchases, or freeze cards in plain English or conversational Indian denominations.
                  </p>
                  <div className="grid grid-cols-3 gap-3 font-mono text-[11px] pt-2">
                    <div className="p-2.5 rounded-lg bg-black/5 border border-black/10 dark:bg-white/5 dark:border-white/10">
                      ✓ Persistent Thread Context
                    </div>
                    <div className="p-2.5 rounded-lg bg-black/5 border border-black/10 dark:bg-white/5 dark:border-white/10">
                      ✓ Safe Information Reading
                    </div>
                    <div className="p-2.5 rounded-lg bg-black/5 border border-black/10 dark:bg-white/5 dark:border-white/10">
                      ✓ Zero Direct Money Movement
                    </div>
                  </div>
                </div>
              )}

              {activeProductTab === 'Cards' && (
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">💳</span>
                    <h3 className="font-display text-xl font-semibold">Cards — Programmable Spending Rules</h3>
                  </div>
                  <p className={`font-sans text-xs sm:text-sm leading-relaxed max-w-3xl ${isSunlit ? 'text-[#5C4D44]' : 'text-zinc-300'}`}>
                    Personal, family, purpose, temporary, and subscription cards. Programmable rules enforce category locks (e.g. books only), merchant filters, time bounds, and instant 1-tap card freezing.
                  </p>
                  <div className="grid grid-cols-3 gap-3 font-mono text-[11px] pt-2">
                    <div className="p-2.5 rounded-lg bg-black/5 border border-black/10 dark:bg-white/5 dark:border-white/10">
                      ✓ Instant Freeze / Unfreeze
                    </div>
                    <div className="p-2.5 rounded-lg bg-black/5 border border-black/10 dark:bg-white/5 dark:border-white/10">
                      ✓ KripiCard Visa POS Rails
                    </div>
                    <div className="p-2.5 rounded-lg bg-black/5 border border-black/10 dark:bg-white/5 dark:border-white/10">
                      ✓ 0% Foreign Exchange Fees
                    </div>
                  </div>
                </div>
              )}

              {activeProductTab === 'Family' && (
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">👨‍👩‍👧‍👦</span>
                    <h3 className="font-display text-xl font-semibold">Family — Households, Roles &amp; Approvals</h3>
                  </div>
                  <p className={`font-sans text-xs sm:text-sm leading-relaxed max-w-3xl ${isSunlit ? 'text-[#5C4D44]' : 'text-zinc-300'}`}>
                    Hierarchical household management with Admins, Members, and Children. Real-time multi-device sync ensures approval requests pop up instantly on parents&apos; phones with zero lag.
                  </p>
                  <div className="grid grid-cols-3 gap-3 font-mono text-[11px] pt-2">
                    <div className="p-2.5 rounded-lg bg-black/5 border border-black/10 dark:bg-white/5 dark:border-white/10">
                      ✓ Instant Approval Webhooks
                    </div>
                    <div className="p-2.5 rounded-lg bg-black/5 border border-black/10 dark:bg-white/5 dark:border-white/10">
                      ✓ Granular Role Permissions
                    </div>
                    <div className="p-2.5 rounded-lg bg-black/5 border border-black/10 dark:bg-white/5 dark:border-white/10">
                      ✓ Shared Liquidity Vaults
                    </div>
                  </div>
                </div>
              )}

              {activeProductTab === 'Activity' && (
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">🧾</span>
                    <h3 className="font-display text-xl font-semibold">Activity — Auditable Financial Receipts</h3>
                  </div>
                  <p className={`font-sans text-xs sm:text-sm leading-relaxed max-w-3xl ${isSunlit ? 'text-[#5C4D44]' : 'text-zinc-300'}`}>
                    Transparent financial history with visible cryptographic receipts. Every state mutation in SpacetimeDB is stamped with an immutable facts hash and audit trail.
                  </p>
                  <div className="grid grid-cols-3 gap-3 font-mono text-[11px] pt-2">
                    <div className="p-2.5 rounded-lg bg-black/5 border border-black/10 dark:bg-white/5 dark:border-white/10">
                      ✓ Cryptographic Receipts
                    </div>
                    <div className="p-2.5 rounded-lg bg-black/5 border border-black/10 dark:bg-white/5 dark:border-white/10">
                      ✓ Immutable Audit Events
                    </div>
                    <div className="p-2.5 rounded-lg bg-black/5 border border-black/10 dark:bg-white/5 dark:border-white/10">
                      ✓ Provider Verification
                    </div>
                  </div>
                </div>
              )}

              <div className={`pt-3 border-t flex justify-between items-center text-[10px] ${isSunlit ? 'border-[#E0D5C3] text-[#8A796E]' : 'border-white/10 text-zinc-500'}`}>
                <span>NAVIGATION PARADIGM: 4 UNIFIED HUBS</span>
                <span className="text-emerald-500 font-bold">25,000 LOC EXPO 57 REACT NATIVE CLIENT</span>
              </div>
            </div>
          </div>
        )}

        {/* SLIDE 6: Seeded Sharma Household Demo */}
        {currentSlide === 5 && (
          <div className="flex flex-col gap-4 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex justify-between items-end">
              <div>
                <span className={`font-mono text-xs uppercase tracking-widest block mb-1 ${isSunlit ? 'text-[#D95338]' : 'text-cyan-400'}`}>
                  06 / LIVE HOUSEHOLD DEMO
                </span>
                <h2 className="font-display font-light text-3xl sm:text-4xl">
                  Seeded Sharma Household Demo
                </h2>
              </div>
              <span className="font-mono text-xs text-emerald-500 font-bold bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
                ● SEEDED &amp; READY TO DEMO
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
                      {member.cardStatus === 'Active' ? '🔒 Freeze Card' : 'Unfreeze'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SLIDE 7: Deep Architecture & Engineering Numbers */}
        {currentSlide === 6 && (
          <div className="flex flex-col gap-4 animate-in fade-in zoom-in-95 duration-200">
            <div>
              <span className={`font-mono text-xs uppercase tracking-widest block mb-1 ${isSunlit ? 'text-[#D95338]' : 'text-cyan-400'}`}>
                07 / ARCHITECTURE &amp; LOC METRICS
              </span>
              <h2 className="font-display font-light text-3xl sm:text-4xl">
                Real Working Codebase (~31,300+ LOC)
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 my-2 font-mono text-xs">
              {/* Mobile App */}
              <div className={`p-6 rounded-2xl border flex flex-col justify-between ${isSunlit ? 'bg-[#F2ECE1] border-[#E0D5C3]' : 'bg-white/[0.03] border-white/10'}`}>
                <div>
                  <span className={`text-[10px] font-bold block mb-1 uppercase ${isSunlit ? 'text-[#D95338]' : 'text-cyan-400'}`}>
                    MOBILE CLIENT
                  </span>
                  <h3 className="font-display text-2xl font-bold mb-2">~25,000 LOC</h3>
                  <span className="text-[11px] text-zinc-500 block mb-3">136 TypeScript Files</span>
                  <p className={`font-sans text-xs leading-relaxed ${isSunlit ? 'text-[#5C4D44]' : 'text-zinc-300'}`}>
                    Expo 57 + React Native 0.86 + React 19. Powered by Expo Router, Zustand state, Reanimated 4 physics, and React Native Skia shaders.
                  </p>
                </div>
                <span className="text-[9px] pt-3 border-t border-black/10 dark:border-white/10 font-bold text-emerald-500">
                  BUN RUNTIME READY
                </span>
              </div>

              {/* Gateway */}
              <div className={`p-6 rounded-2xl border flex flex-col justify-between ${isSunlit ? 'bg-[#F2ECE1] border-[#E0D5C3]' : 'bg-white/[0.03] border-white/10'}`}>
                <div>
                  <span className={`text-[10px] font-bold block mb-1 uppercase ${isSunlit ? 'text-[#D95338]' : 'text-cyan-400'}`}>
                    GATEWAY BACKEND
                  </span>
                  <h3 className="font-display text-2xl font-bold mb-2">~6,300 LOC</h3>
                  <span className="text-[11px] text-zinc-500 block mb-3">Fastify 5 Microservices</span>
                  <p className={`font-sans text-xs leading-relaxed ${isSunlit ? 'text-[#5C4D44]' : 'text-zinc-300'}`}>
                    Single writer &amp; database owner. Handles validation, Facts Hashing, idempotency deduplication, AI tools, and transaction safety.
                  </p>
                </div>
                <span className="text-[9px] pt-3 border-t border-black/10 dark:border-white/10 font-bold text-purple-400">
                  SINGLE WRITER ARCHITECTURE
                </span>
              </div>

              {/* SpacetimeDB */}
              <div className={`p-6 rounded-2xl border flex flex-col justify-between ${isSunlit ? 'bg-[#F2ECE1] border-[#E0D5C3]' : 'bg-white/[0.03] border-white/10'}`}>
                <div>
                  <span className={`text-[10px] font-bold block mb-1 uppercase ${isSunlit ? 'text-[#D95338]' : 'text-cyan-400'}`}>
                    DATABASE &amp; REDUCERS
                  </span>
                  <h3 className="font-display text-2xl font-bold mb-2">SpacetimeDB 2.8</h3>
                  <span className="text-[11px] text-zinc-500 block mb-3">20 Tables • 28 Reducers</span>
                  <p className={`font-sans text-xs leading-relaxed ${isSunlit ? 'text-[#5C4D44]' : 'text-zinc-300'}`}>
                    Real-time relational engine in Rust. Tracks users, households, members, cards, balances, approvals, and audit events with 0 polling.
                  </p>
                </div>
                <span className="text-[9px] pt-3 border-t border-black/10 dark:border-white/10 font-bold text-cyan-400">
                  RUST WASM REDUCERS
                </span>
              </div>
            </div>
          </div>
        )}

        {/* SLIDE 8: The 7 Pillars of Trust & Security */}
        {currentSlide === 7 && (
          <div className="flex flex-col gap-4 animate-in fade-in zoom-in-95 duration-200">
            <div>
              <span className={`font-mono text-xs uppercase tracking-widest block mb-1 ${isSunlit ? 'text-[#D95338]' : 'text-cyan-400'}`}>
                08 / TRUST &amp; SECURITY
              </span>
              <h2 className="font-display font-light text-3xl sm:text-4xl">
                The 7 Pillars of Financial Safety
              </h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 my-2 font-mono text-xs">
              <div className={`p-4 rounded-xl border ${isSunlit ? 'bg-[#F2ECE1] border-[#E0D5C3]' : 'bg-white/[0.03] border-white/10'}`}>
                <span className="text-emerald-500 font-bold text-xs block mb-1">01 / SINGLE WRITER</span>
                <p className="text-[11px] font-sans text-zinc-400 leading-tight">
                  Gateway is the sole writer to SpacetimeDB reducers. No direct client mutations.
                </p>
              </div>

              <div className={`p-4 rounded-xl border ${isSunlit ? 'bg-[#F2ECE1] border-[#E0D5C3]' : 'bg-white/[0.03] border-white/10'}`}>
                <span className="text-cyan-400 font-bold text-xs block mb-1">02 / FACTS HASH</span>
                <p className="text-[11px] font-sans text-zinc-400 leading-tight">
                  Confirmation is cryptographically bound to the exact staged transaction execution payload.
                </p>
              </div>

              <div className={`p-4 rounded-xl border ${isSunlit ? 'bg-[#F2ECE1] border-[#E0D5C3]' : 'bg-white/[0.03] border-white/10'}`}>
                <span className="text-purple-400 font-bold text-xs block mb-1">03 / IDEMPOTENCY</span>
                <p className="text-[11px] font-sans text-zinc-400 leading-tight">
                  Network retries and rapid double taps cannot duplicate financial side effects.
                </p>
              </div>

              <div className={`p-4 rounded-xl border ${isSunlit ? 'bg-[#F2ECE1] border-[#E0D5C3]' : 'bg-white/[0.03] border-white/10'}`}>
                <span className="text-amber-400 font-bold text-xs block mb-1">04 / AI ISOLATION</span>
                <p className="text-[11px] font-sans text-zinc-400 leading-tight">
                  AI reads and prepares, but is isolated from private keys and monetary execution.
                </p>
              </div>

              <div className={`p-4 rounded-xl border ${isSunlit ? 'bg-[#F2ECE1] border-[#E0D5C3]' : 'bg-white/[0.03] border-white/10'}`}>
                <span className="text-red-400 font-bold text-xs block mb-1">05 / UNTRUSTED INPUTS</span>
                <p className="text-[11px] font-sans text-zinc-400 leading-tight">
                  LLM output and external merchant content are treated as strictly untrusted.
                </p>
              </div>

              <div className={`p-4 rounded-xl border ${isSunlit ? 'bg-[#F2ECE1] border-[#E0D5C3]' : 'bg-white/[0.03] border-white/10'}`}>
                <span className="text-emerald-500 font-bold text-xs block mb-1">06 / PROVIDER FIRST</span>
                <p className="text-[11px] font-sans text-zinc-400 leading-tight">
                  <code>202 Pending ≠ Success</code>. State is updated only upon verifiable settlement.
                </p>
              </div>

              <div className={`p-4 rounded-xl border col-span-2 ${isSunlit ? 'bg-[#F2ECE1] border-[#E0D5C3]' : 'bg-white/[0.03] border-white/10'}`}>
                <span className="text-cyan-400 font-bold text-xs block mb-1">07 / IMMUTABLE AUDITABILITY</span>
                <p className="text-[11px] font-sans text-zinc-400 leading-tight">
                  Every financial mutation produces a cryptographically sealed receipt and verifiable audit event.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* SLIDE 9: Crypto Infrastructure: Stellar / Horizon + Privy */}
        {currentSlide === 8 && (
          <div className="flex flex-col gap-4 animate-in fade-in zoom-in-95 duration-200">
            <div>
              <span className={`font-mono text-xs uppercase tracking-widest block mb-1 ${isSunlit ? 'text-[#D95338]' : 'text-cyan-400'}`}>
                09 / CRYPTO INFRASTRUCTURE
              </span>
              <h2 className="font-display font-light text-3xl sm:text-4xl">
                Stellar Rails &amp; Non-Custodial Privy MPC
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-2 font-mono text-xs">
              <div className={`p-6 rounded-2xl border flex flex-col justify-between ${isSunlit ? 'bg-[#F2ECE1] border-[#E0D5C3]' : 'bg-white/[0.03] border-white/10'}`}>
                <div>
                  <span className="text-3xl block mb-2">⚡</span>
                  <h3 className="font-display text-xl font-bold mb-2">Stellar / Horizon</h3>
                  <p className={`font-sans text-xs leading-relaxed ${isSunlit ? 'text-[#5C4D44]' : 'text-zinc-300'}`}>
                    3.2s deterministic finality prevents retail point-of-sale timeouts. Sub-cent fees ($0.00001) make $2 micro-allowances economically viable.
                  </p>
                </div>
                <span className="text-[10px] text-cyan-400 font-bold pt-3 border-t border-black/10 dark:border-white/10">
                  SCP DETERMINISTIC CONSENSUS
                </span>
              </div>

              <div className={`p-6 rounded-2xl border flex flex-col justify-between ${isSunlit ? 'bg-[#F2ECE1] border-[#E0D5C3]' : 'bg-white/[0.03] border-white/10'}`}>
                <div>
                  <span className="text-3xl block mb-2">🔐</span>
                  <h3 className="font-display text-xl font-bold mb-2">Privy MPC Auth</h3>
                  <p className={`font-sans text-xs leading-relaxed ${isSunlit ? 'text-[#5C4D44]' : 'text-zinc-300'}`}>
                    Embedded non-custodial MPC key sharding. Users log in with biometric FaceID / TouchID — zero seed phrase anxiety for parents and kids.
                  </p>
                </div>
                <span className="text-[10px] text-emerald-500 font-bold pt-3 border-t border-black/10 dark:border-white/10">
                  SHARDED KEY VAULTS
                </span>
              </div>

              <div className={`p-6 rounded-2xl border flex flex-col justify-between ${isSunlit ? 'bg-[#F2ECE1] border-[#E0D5C3]' : 'bg-white/[0.03] border-white/10'}`}>
                <div>
                  <span className="text-3xl block mb-2">💳</span>
                  <h3 className="font-display text-xl font-bold mb-2">KripiCard Bridge</h3>
                  <p className={`font-sans text-xs leading-relaxed ${isSunlit ? 'text-[#5C4D44]' : 'text-zinc-300'}`}>
                    Direct conversion of pooled USDC / XLM into programmable physical and virtual Visa cards spendable worldwide.
                  </p>
                </div>
                <span className="text-[10px] text-purple-400 font-bold pt-3 border-t border-black/10 dark:border-white/10">
                  GLOBAL VISA SETTLEMENT
                </span>
              </div>
            </div>
          </div>
        )}

        {/* SLIDE 10: 45 Vitest Integration Tests */}
        {currentSlide === 9 && (
          <div className="flex flex-col gap-4 animate-in fade-in zoom-in-95 duration-200">
            <div>
              <span className={`font-mono text-xs uppercase tracking-widest block mb-1 ${isSunlit ? 'text-[#D95338]' : 'text-cyan-400'}`}>
                10 / VERIFICATION &amp; QA
              </span>
              <h2 className="font-display font-light text-3xl sm:text-4xl">
                45 Vitest Integration Tests Passing
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-2 font-mono text-xs">
              <div className={`p-6 rounded-2xl border ${isSunlit ? 'bg-[#F2ECE1] border-[#E0D5C3]' : 'bg-white/[0.03] border-white/10'}`}>
                <div className="flex justify-between items-center mb-3">
                  <span className="font-bold text-emerald-500">FINANCIAL SAFETY &amp; AUTH SUITE</span>
                  <span className="bg-emerald-500/10 text-emerald-500 px-2 py-0.5 rounded text-[10px] font-bold">
                    ✓ 45/45 PASSED
                  </span>
                </div>
                <ul className="space-y-2 text-zinc-400">
                  <li className="flex items-center gap-2">
                    <span className="text-emerald-500">✓</span> Single writer Gateway reducer isolation tests
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-emerald-500">✓</span> Facts Hash cryptographic tampering rejection
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-emerald-500">✓</span> Idempotency deduplication across double taps
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-emerald-500">✓</span> Card order queue &amp; KYC verification workflows
                  </li>
                </ul>
              </div>

              <div className={`p-6 rounded-2xl border ${isSunlit ? 'bg-[#F2ECE1] border-[#E0D5C3]' : 'bg-white/[0.03] border-white/10'}`}>
                <div className="flex justify-between items-center mb-3">
                  <span className={`font-bold ${isSunlit ? 'text-[#D95338]' : 'text-cyan-400'}`}>
                    AI BOUNDARIES &amp; PARSER TESTS
                  </span>
                  <span className="bg-cyan-500/10 text-cyan-400 px-2 py-0.5 rounded text-[10px] font-bold">
                    ✓ 100% COVERAGE
                  </span>
                </div>
                <ul className="space-y-2 text-zinc-400">
                  <li className="flex items-center gap-2">
                    <span className="text-emerald-500">✓</span> Colloquial parsing (&ldquo;15k&rdquo;, &ldquo;1.5 lakh&rdquo;, &ldquo;till Sunday&rdquo;)
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-emerald-500">✓</span> Zero-hallucination execution halt assertions
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-emerald-500">✓</span> Realtime multi-device sync in SpacetimeDB
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-emerald-500">✓</span> Admin console role escalation restrictions
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* SLIDE 11: Visual Direction: "Quiet Money" */}
        {currentSlide === 10 && (
          <div className="flex flex-col gap-4 animate-in fade-in zoom-in-95 duration-200">
            <div>
              <span className={`font-mono text-xs uppercase tracking-widest block mb-1 ${isSunlit ? 'text-[#D95338]' : 'text-cyan-400'}`}>
                11 / VISUAL DIRECTION
              </span>
              <h2 className="font-display font-light text-3xl sm:text-4xl">
                Design Philosophy: &ldquo;Quiet Money&rdquo;
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-2 font-mono text-xs">
              {/* Sunlit Theme */}
              <div className="p-6 rounded-2xl bg-[#FBF8F3] border border-[#E8DFC8] text-[#2C2018] shadow-md flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-bold text-[#D95338]">☀️ SUNLIT THEME (DEFAULT)</span>
                    <span className="text-[10px] bg-[#D95338]/10 text-[#D95338] px-2 py-0.5 rounded font-bold">
                      WARM &amp; HUMAN
                    </span>
                  </div>
                  <h3 className="font-display text-xl mb-2 font-semibold">Paper Surfaces &amp; Terracotta</h3>
                  <p className="font-sans text-xs text-[#5C4D44] leading-relaxed mb-3">
                    Warm cream surfaces, terracotta accents, espresso amounts, Fraunces + Plus Jakarta Sans typography. Calm, trustworthy, human.
                  </p>
                </div>
                <div className="flex gap-2 text-[10px] pt-3 border-t border-[#E8DFC8]">
                  <span className="px-2 py-1 bg-[#F2ECE1] rounded border border-[#E0D5C3]">#FBF8F3 Cream</span>
                  <span className="px-2 py-1 bg-[#D95338] text-white rounded">#D95338 Terracotta</span>
                  <span className="px-2 py-1 bg-[#2C2018] text-white rounded">#2C2018 Espresso</span>
                </div>
              </div>

              {/* Night Theme */}
              <div className="p-6 rounded-2xl bg-zinc-950 border border-white/20 text-white shadow-md flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-bold text-cyan-400">🌙 NIGHT THEME</span>
                    <span className="text-[10px] bg-cyan-500/10 text-cyan-400 px-2 py-0.5 rounded font-bold">
                      DARK ESPRESSO
                    </span>
                  </div>
                  <h3 className="font-display text-xl mb-2 font-semibold">Dark Espresso Interpretation</h3>
                  <p className="font-sans text-xs text-zinc-300 leading-relaxed mb-3">
                    Deep cosmic blacks, cyan highlights, metallic card reflections, and subtle neon glows for late-night family budgeting.
                  </p>
                </div>
                <div className="flex gap-2 text-[10px] pt-3 border-t border-white/10 font-mono">
                  <span className="px-2 py-1 bg-black rounded border border-white/20">#000000 Void</span>
                  <span className="px-2 py-1 bg-cyan-500/20 text-cyan-300 rounded border border-cyan-500/30">#00F0FF Cyan</span>
                  <span className="px-2 py-1 bg-white/10 rounded">#FFFFFF Pure</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SLIDE 12: Conclusion & Q&A */}
        {currentSlide === 11 && (
          <div className="flex flex-col items-center justify-center text-center py-6 animate-in fade-in zoom-in-95 duration-200">
            <div className={`w-16 h-16 rounded-2xl border flex items-center justify-center mb-4 ${isSunlit ? 'bg-[#D95338]/10 border-[#D95338]/30' : 'bg-white/[0.08] border-white/20'}`}>
              <StellarLogoSVG className={`w-8 h-8 ${isSunlit ? 'text-[#D95338]' : 'text-cyan-400'}`} />
            </div>

            <h2 className="font-display font-light text-4xl sm:text-6xl mb-2">
              KAMI
            </h2>
            <p className={`font-mono text-base font-semibold mb-4 ${isSunlit ? 'text-[#D95338]' : 'text-cyan-400'}`}>
              &ldquo;Money that understands your family.&rdquo;
            </p>
            <p className={`font-mono text-xs max-w-xl mb-6 ${isSunlit ? 'text-[#5C4D44]' : 'text-zinc-400'}`}>
              Financial infrastructure underneath. Natural language on top. Trust at every step.
            </p>

            <div className={`p-6 rounded-2xl border max-w-md w-full font-mono text-xs space-y-2 text-left mb-6 ${isSunlit ? 'bg-[#F2ECE1] border-[#E0D5C3]' : 'bg-white/[0.03] border-white/15'}`}>
              <div className="flex justify-between">
                <span className="text-zinc-500">Live Website:</span>
                <a href="https://kami.mystic.cat" target="_blank" className={`underline underline-offset-2 ${isSunlit ? 'text-[#D95338]' : 'text-cyan-400'}`}>
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
            </div>

            <span className={`font-mono text-xs animate-pulse font-semibold ${isSunlit ? 'text-[#D95338]' : 'text-cyan-400'}`}>
              ● OPEN FOR JUDGES TECHNICAL Q&amp;A
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
              <h3 className="font-display text-2xl text-white">All Slides Overview ({totalSlides} Slides)</h3>
              <button className="font-mono text-sm text-zinc-400 hover:text-white">✕ Close</button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {[
                '01. Money That Understands Your Family',
                '02. Intersection of 5 Financial Layers',
                '03. Core Interaction: Ask to Receipt',
                '04. Live Command Parser & Facts Hash',
                '05. 4 Core Tabs: Ask/Cards/Family/Activity',
                '06. Seeded Sharma Household Demo',
                '07. Architecture & ~31,300+ LOC Metrics',
                '08. The 7 Pillars of Financial Safety',
                '09. Stellar Rails & Non-Custodial MPC',
                '10. 45 Vitest Integration Tests Passing',
                '11. Visual Direction: "Quiet Money"',
                '12. Conclusion & Live Judge Q&A',
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
        className={`flex items-center justify-between px-6 sm:px-10 py-3.5 border-t z-30 transition-colors duration-300 ${
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
            KAMI — STELLAR HACKATHON 2026
          </span>
        </div>
      </footer>
    </div>
  );
}
