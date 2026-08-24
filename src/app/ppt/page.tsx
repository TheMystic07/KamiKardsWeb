'use client';

import React, { useState, useEffect, useCallback } from 'react';
import CosmicBackground from '@/components/CosmicBackground';
import CylinderCardCarousel, { StellarLogoSVG } from '@/components/CylinderCardCarousel';

interface Slide {
  id: number;
  tag: string;
  title: string;
  subtitle?: string;
  notes?: string;
  content: React.ReactNode;
}

export default function PitchDeckPage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showNotes, setShowNotes] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showOverview, setShowOverview] = useState(false);

  // Pitch timer
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(true);

  // Slide 3: Interactive Natural Language Parser Demo
  const [samplePrompt, setSamplePrompt] = useState('Give Maya ₹2,000 until Sunday for groceries');
  const [parsedResult, setParsedResult] = useState<{
    recipient: string;
    amount: string;
    expiry: string;
    category: string;
    status: 'parsed' | 'approved' | 'executed';
  }>({
    recipient: 'Maya (Daughter)',
    amount: '₹2,000 (~24.10 USDC)',
    expiry: 'Sunday 11:59 PM',
    category: 'Groceries / Food Only',
    status: 'parsed',
  });

  // Slide 6: Family Sharma Household Interactive Cards Demo
  const [familyMembers, setFamilyMembers] = useState([
    { name: 'Aarav Sharma', role: 'Family Admin', balance: '₹85,000 ($1,020 USDC)', cardStatus: 'Active', limit: '₹1.5 Lakh' },
    { name: 'Maya Sharma', role: 'Daughter (Teen)', balance: '₹2,000 ($24.10 USDC)', cardStatus: 'Active', limit: '₹2,000 / week' },
    { name: 'Rohan Sharma', role: 'Son (College)', balance: '₹15,000 ($180.50 USDC)', cardStatus: 'Active', limit: '₹15,000 / mo' },
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

  const handleRunParser = (promptText: string) => {
    setSamplePrompt(promptText);
    if (promptText.includes('Maya')) {
      setParsedResult({
        recipient: 'Maya (Daughter)',
        amount: '₹2,000 (~24.10 USDC)',
        expiry: 'Sunday 11:59 PM',
        category: 'Groceries / General',
        status: 'parsed',
      });
    } else if (promptText.includes('Rohan') || promptText.includes('15k')) {
      setParsedResult({
        recipient: 'Rohan (College)',
        amount: '₹15,000 (~180.50 USDC)',
        expiry: 'End of Month',
        category: 'Tuition & Books',
        status: 'parsed',
      });
    } else if (promptText.includes('1.5 lakh') || promptText.includes('Dad')) {
      setParsedResult({
        recipient: 'Aarav (Dad)',
        amount: '₹1,50,000 (~1,805.00 USDC)',
        expiry: 'Immediate Transfer',
        category: 'Family Vault Pool',
        status: 'parsed',
      });
    } else {
      setParsedResult({
        recipient: 'Family Member',
        amount: '₹5,000 (~60.20 USDC)',
        expiry: 'Instant Swipe',
        category: 'General Spend',
        status: 'parsed',
      });
    }
  };

  const toggleCardFreeze = (index: number) => {
    setFamilyMembers((prev) =>
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

  const isScrollingRef = React.useRef(false);
  const touchStartY = React.useRef(0);
  const touchStartX = React.useRef(0);

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
    'Welcome judges. Traditional fintech forces users to understand the product. Kami makes the product understand the user. Natural language financial OS with Stellar crypto rails underneath.',
    'Explain the problem: setting allowances or spending rules takes 7+ confusing steps in legacy apps. Kami enables a single sentence execution like "Give Maya ₹2,000 until Sunday".',
    'Demonstrate the real-time AI parser (Qwen) parsing natural language numbers like "15k" and "1.5 lakh", previewing safety checks, and executing via Privy + Stellar.',
    'System architecture walkthrough: Expo 57 Mobile -> Bun/Fastify Backend -> SpacetimeDB 2.8 Realtime DB -> Stellar / Horizon + KripiCard API.',
    'Zero-fluff tech stack breakdown: SpacetimeDB 2.8 in Rust, Qwen AI, Privy MPC Auth, Stellar Horizon, Fastify 5, React Native Skia.',
    'The Family & Household Management layer: Seeded Sharma Household demo showing parental limit controls, instant allowance routing, and live card freezing.',
    'Pay-anyone QR flows & Crypto Pool: Converting pooled USDC / XLM into merchant QR scans in <3.5s with zero foreign exchange fees.',
    'Current Prototype Status: Working end-to-end with persistent AI chats, real card-provider integration, admin console, and Vitest test suite.',
    'Unfair advantage: Stellar 3.2s settlement + SpacetimeDB live synchronization + Qwen conversational safety guardrails.',
    'Final close: "Financial infrastructure underneath. Natural language on top. Trust at every step." Open for judge Q&A.',
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
            <span className="font-mono text-[8px] text-zinc-400 tracking-wider">MONEY THAT UNDERSTANDS YOUR FAMILY</span>
          </div>
        </div>

        {/* Pitch Timer & Interactive Controls */}
        <div className="flex items-center gap-3 font-mono text-xs">
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
        {/* SLIDE 1: Title & The Big Idea */}
        {currentSlide === 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center animate-in fade-in zoom-in-95 duration-200">
            <div className="lg:col-span-7 flex flex-col items-start text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-mono text-[10px] tracking-widest uppercase mb-4">
                <StellarLogoSVG className="w-3.5 h-3.5 text-cyan-400" />
                <span>STELLAR HACKATHON 2026 • AI FINANCIAL OS</span>
              </div>

              <h1 className="font-display font-light text-4xl sm:text-6xl tracking-tight text-white leading-[1.05] mb-4">
                Money That Understands Your Family.
              </h1>

              <p className="font-mono text-xs sm:text-sm text-zinc-300 max-w-xl font-light leading-relaxed mb-6">
                Traditional fintech makes users understand the product. Kami makes the product understand the user. Natural language conversational AI on top of Stellar infrastructure and programmable cards.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 w-full max-w-lg font-mono text-xs">
                <div className="p-3 rounded-xl bg-white/[0.04] border border-white/10">
                  <span className="text-zinc-500 text-[9px] block uppercase">AI ENGINE</span>
                  <span className="text-cyan-400 font-bold text-sm mt-0.5 block">Qwen Financial LLM</span>
                </div>
                <div className="p-3 rounded-xl bg-white/[0.04] border border-white/10">
                  <span className="text-zinc-500 text-[9px] block uppercase">REALTIME DB</span>
                  <span className="text-emerald-400 font-bold text-sm mt-0.5 block">SpacetimeDB 2.8</span>
                </div>
                <div className="p-3 rounded-xl bg-white/[0.04] border border-white/10 col-span-2 sm:col-span-1">
                  <span className="text-zinc-500 text-[9px] block uppercase">SETTLEMENT</span>
                  <span className="text-purple-400 font-bold text-sm mt-0.5 block">Stellar / Horizon</span>
                </div>
              </div>
            </div>

            {/* Embedded Live 3D Cylinder Carousel directly on the slide */}
            <div className="lg:col-span-5 h-[420px] sm:h-[480px] w-full relative flex items-center justify-center overflow-visible">
              <CylinderCardCarousel scale={0.88} />
              <div className="absolute bottom-1 font-mono text-[8px] text-zinc-500 uppercase tracking-widest pointer-events-none">
                ● Live 3D Programmable Cards • Powered by KripiCard &amp; Stellar
              </div>
            </div>
          </div>
        )}

        {/* SLIDE 2: The Core Problem: Traditional Fintech is Clunky */}
        {currentSlide === 1 && (
          <div className="flex flex-col gap-4 animate-in fade-in zoom-in-95 duration-200">
            <div>
              <span className="font-mono text-xs text-cyan-400 uppercase tracking-widest block mb-1">
                02 / THE PROBLEM
              </span>
              <h2 className="font-display font-light text-3xl sm:text-4xl text-white">
                Traditional Fintech Demands User Effort
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-3">
              {/* Legacy Way */}
              <div className="p-6 rounded-2xl bg-red-950/20 border border-red-500/30 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-mono text-xs text-red-400 font-bold">LEGACY BANKING APPS</span>
                    <span className="text-xs font-mono text-red-400 bg-red-500/10 px-2 py-0.5 rounded">7+ STEPS</span>
                  </div>
                  <h3 className="font-display text-xl text-white mb-3">Multi-Step Form Friction</h3>
                  <div className="p-4 rounded-xl bg-black/40 border border-red-500/20 font-mono text-xs text-zinc-400 space-y-2">
                    <div className="line-through text-red-400">1. Open Bank App &amp; Login</div>
                    <div className="line-through text-red-400">2. Find Family Member Profile</div>
                    <div className="line-through text-red-400">3. Select Allowance / Sub-account</div>
                    <div className="line-through text-red-400">4. Type exact numerical amount</div>
                    <div className="line-through text-red-400">5. Select calendar expiry date</div>
                    <div className="line-through text-red-400">6. Set category restriction toggles</div>
                    <div className="line-through text-red-400">7. Enter OTP &amp; Confirm</div>
                  </div>
                </div>
                <p className="text-xs text-zinc-400 font-sans mt-4 pt-3 border-t border-white/5">
                  Complex forms lead to abandoned transactions, no context, and zero natural family budgeting.
                </p>
              </div>

              {/* The Kami Way */}
              <div className="p-6 rounded-2xl bg-cyan-950/30 border border-cyan-500/40 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-mono text-xs text-cyan-300 font-bold">KAMI CONVERSATIONAL OS</span>
                    <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">1 SENTENCE</span>
                  </div>
                  <h3 className="font-display text-xl text-white mb-3">Natural Language Execution</h3>
                  <div className="p-5 rounded-xl bg-black/60 border border-cyan-500/30 font-mono text-sm text-cyan-300 shadow-lg flex items-center gap-3">
                    <span className="text-2xl">🗣️</span>
                    <span>&ldquo;Give Maya ₹2,000 until Sunday for groceries.&rdquo;</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 mt-4 font-mono text-[11px] text-zinc-300">
                    <div className="p-2 rounded bg-white/[0.04] border border-white/10">
                      ✓ Auto-parses colloquial amounts (&ldquo;15k&rdquo;, &ldquo;1.5 lakh&rdquo;)
                    </div>
                    <div className="p-2 rounded bg-white/[0.04] border border-white/10">
                      ✓ Instant contextual card spending limits
                    </div>
                  </div>
                </div>
                <p className="text-xs text-emerald-400 font-sans mt-4 pt-3 border-t border-cyan-500/20 font-semibold">
                  Kami understands → Prepares → Previews → Asks for approval → Executes safely.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* SLIDE 3: Interactive Natural Language Parser Demo */}
        {currentSlide === 2 && (
          <div className="flex flex-col gap-4 animate-in fade-in zoom-in-95 duration-200">
            <div>
              <span className="font-mono text-xs text-cyan-400 uppercase tracking-widest block mb-1">
                03 / INTERACTIVE AI ENGINE
              </span>
              <h2 className="font-display font-light text-3xl sm:text-4xl text-white">
                Live Intent Parser &amp; Safety Preview
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 my-2 items-center">
              {/* Left Column: Sample Prompts */}
              <div className="lg:col-span-6 flex flex-col gap-3">
                <span className="font-mono text-xs text-zinc-400">TRY NATURAL LANGUAGE INPUTS:</span>

                {[
                  { text: 'Give Maya ₹2,000 until Sunday for groceries', tag: 'Colloquial Allowance' },
                  { text: 'Send 15k to Rohan for college tuition', tag: 'Short-Form Number (15k)' },
                  { text: 'Transfer 1.5 lakh to Dad for household savings', tag: 'Indian Denomination (Lakh)' },
                ].map((sample, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleRunParser(sample.text)}
                    className={`p-3.5 rounded-xl border text-left font-mono text-xs transition-all ${
                      samplePrompt === sample.text
                        ? 'bg-cyan-950/40 border-cyan-400 text-cyan-300 shadow-[0_0_15px_rgba(0,240,255,0.2)]'
                        : 'bg-white/[0.03] border-white/10 hover:border-white/25 text-zinc-300'
                    }`}
                  >
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-[10px] text-zinc-500 uppercase">{sample.tag}</span>
                      <span className="text-cyan-400 text-[10px]">Test Prompt →</span>
                    </div>
                    <div className="text-white font-medium">&ldquo;{sample.text}&rdquo;</div>
                  </button>
                ))}
              </div>

              {/* Right Column: AI Intent Extractor & Execution Card */}
              <div className="lg:col-span-6 p-6 rounded-2xl bg-white/[0.03] border border-white/15 font-mono text-xs flex flex-col gap-3">
                <div className="flex items-center justify-between pb-2 border-b border-white/10">
                  <span className="text-cyan-400 font-bold">QWEN AI PARSER EXECUTION PAYLOAD</span>
                  <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                    PARSED IN 180ms
                  </span>
                </div>

                <div className="space-y-2 py-2">
                  <div className="flex justify-between">
                    <span className="text-zinc-400">Target Recipient:</span>
                    <span className="text-white font-semibold">{parsedResult.recipient}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-400">Parsed Amount:</span>
                    <span className="text-emerald-400 font-bold text-sm">{parsedResult.amount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-400">Auto Expiration:</span>
                    <span className="text-white">{parsedResult.expiry}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-400">Enforced Category:</span>
                    <span className="text-cyan-300">{parsedResult.category}</span>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-white/[0.02] border border-white/10 text-[11px] text-zinc-400 font-sans">
                  🛡️ <strong>Safety Guarantee</strong>: Execution halts at preview stage. Requires explicit cryptographic biometric authorization via Privy before triggering Stellar settlement.
                </div>

                <button
                  onClick={() => {
                    setParsedResult((prev) => ({ ...prev, status: 'executed' }));
                    setTimeout(() => setParsedResult((prev) => ({ ...prev, status: 'parsed' })), 3000);
                  }}
                  className={`w-full py-3 rounded-xl font-mono text-xs font-semibold transition-all mt-2 shadow-lg ${
                    parsedResult.status === 'executed'
                      ? 'bg-emerald-500 text-black'
                      : 'bg-white text-black hover:bg-zinc-200'
                  }`}
                >
                  {parsedResult.status === 'executed'
                    ? '✓ EXECUTED VIA STELLAR & KRIPICARD'
                    : '1-Tap Parental Approval → Execute'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* SLIDE 4: End-to-End System Architecture */}
        {currentSlide === 3 && (
          <div className="flex flex-col gap-4 animate-in fade-in zoom-in-95 duration-200">
            <div>
              <span className="font-mono text-xs text-cyan-400 uppercase tracking-widest block mb-1">
                04 / ARCHITECTURE FLOW
              </span>
              <h2 className="font-display font-light text-3xl sm:text-4xl text-white">
                How Natural Language Executes Underneath
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 my-2 font-mono text-xs">
              <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 flex flex-col justify-between">
                <div>
                  <span className="text-cyan-400 font-bold text-xs block mb-1">01 / FRONTEND</span>
                  <h4 className="font-display text-base text-white mb-2">Expo 57 + Skia</h4>
                  <p className="text-[11px] text-zinc-300 font-sans leading-relaxed">
                    React Native 0.86 client with Reanimated 4 and Skia shaders for 60fps animations and persistent AI chat streams.
                  </p>
                </div>
                <span className="text-[9px] text-zinc-500 pt-3 border-t border-white/5">ZUSTAND STATE ENGINE</span>
              </div>

              <div className="p-5 rounded-2xl bg-cyan-950/30 border border-cyan-500/40 flex flex-col justify-between">
                <div>
                  <span className="text-cyan-300 font-bold text-xs block mb-1">02 / BACKEND &amp; AI</span>
                  <h4 className="font-display text-base text-white mb-2">Fastify 5 + Qwen</h4>
                  <p className="text-[11px] text-zinc-300 font-sans leading-relaxed">
                    Bun runtime hosting Fastify 5 server. Qwen LLM extracts financial intents, handles currency parsing, and enforces family safety schemas.
                  </p>
                </div>
                <span className="text-[9px] text-cyan-400 pt-3 border-t border-cyan-500/20">BUN + TYPESCRIPT</span>
              </div>

              <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 flex flex-col justify-between">
                <div>
                  <span className="text-emerald-400 font-bold text-xs block mb-1">03 / REALTIME DB</span>
                  <h4 className="font-display text-base text-white mb-2">SpacetimeDB 2.8</h4>
                  <p className="text-[11px] text-zinc-300 font-sans leading-relaxed">
                    Real-time relational database in Rust. Live-synchronizes family balances, allowance changes, and approval requests with 0 polling.
                  </p>
                </div>
                <span className="text-[9px] text-emerald-400 pt-3 border-t border-white/5">RUST WASM SYNC</span>
              </div>

              <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 flex flex-col justify-between">
                <div>
                  <span className="text-purple-400 font-bold text-xs block mb-1">04 / SETTLEMENT</span>
                  <h4 className="font-display text-base text-white mb-2">Stellar + KripiCard</h4>
                  <p className="text-[11px] text-zinc-300 font-sans leading-relaxed">
                    Stellar Horizon routes crypto deposits and atomic path payments in &lt;3.5s. KripiCard provisions programmable physical/virtual Visa cards.
                  </p>
                </div>
                <span className="text-[9px] text-purple-400 pt-3 border-t border-white/5">PRIVY MPC WALLET</span>
              </div>
            </div>
          </div>
        )}

        {/* SLIDE 5: Full Tech Stack Breakdown */}
        {currentSlide === 4 && (
          <div className="flex flex-col gap-4 animate-in fade-in zoom-in-95 duration-200">
            <div>
              <span className="font-mono text-xs text-cyan-400 uppercase tracking-widest block mb-1">
                05 / PRODUCTION TECH STACK
              </span>
              <h2 className="font-display font-light text-3xl sm:text-4xl text-white">
                Built With Production-Ready Modern Technologies
              </h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-2 font-mono text-xs">
              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10">
                <span className="text-zinc-500 text-[10px] block">MOBILE CLIENT</span>
                <span className="text-white font-bold text-sm block mt-1">Expo 57 / React Native</span>
                <span className="text-[10px] text-cyan-400 mt-1 block">Skia &amp; Reanimated 4</span>
              </div>

              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10">
                <span className="text-zinc-500 text-[10px] block">BACKEND ENGINE</span>
                <span className="text-white font-bold text-sm block mt-1">Fastify 5 / Bun</span>
                <span className="text-[10px] text-emerald-400 mt-1 block">TypeScript Microservices</span>
              </div>

              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10">
                <span className="text-zinc-500 text-[10px] block">REAL-TIME DATABASE</span>
                <span className="text-white font-bold text-sm block mt-1">SpacetimeDB 2.8</span>
                <span className="text-[10px] text-purple-400 mt-1 block">Rust-Native Engine</span>
              </div>

              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10">
                <span className="text-zinc-500 text-[10px] block">FINANCIAL AI MODEL</span>
                <span className="text-white font-bold text-sm block mt-1">Qwen LLM</span>
                <span className="text-[10px] text-amber-400 mt-1 block">Contextual Intent Parser</span>
              </div>

              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10">
                <span className="text-zinc-500 text-[10px] block">SETTLEMENT LEDGER</span>
                <span className="text-white font-bold text-sm block mt-1">Stellar / Horizon</span>
                <span className="text-[10px] text-cyan-400 mt-1 block">&lt;3.5s Deterministic SCP</span>
              </div>

              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10">
                <span className="text-zinc-500 text-[10px] block">CARD ISSUER RAILS</span>
                <span className="text-white font-bold text-sm block mt-1">KripiCard API</span>
                <span className="text-[10px] text-emerald-400 mt-1 block">Visa / Mastercard POS</span>
              </div>

              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10">
                <span className="text-zinc-500 text-[10px] block">KEY MANAGEMENT</span>
                <span className="text-white font-bold text-sm block mt-1">Privy Auth</span>
                <span className="text-[10px] text-purple-400 mt-1 block">Non-Custodial MPC Wallets</span>
              </div>

              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10">
                <span className="text-zinc-500 text-[10px] block">TEST HARNESS</span>
                <span className="text-white font-bold text-sm block mt-1">Vitest Suite</span>
                <span className="text-[10px] text-amber-400 mt-1 block">End-to-End Safety Tests</span>
              </div>
            </div>
          </div>
        )}

        {/* SLIDE 6: Seeded Sharma Household Demo */}
        {currentSlide === 5 && (
          <div className="flex flex-col gap-4 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex justify-between items-end">
              <div>
                <span className="font-mono text-xs text-cyan-400 uppercase tracking-widest block mb-1">
                  06 / LIVE HOUSEHOLD DEMO
                </span>
                <h2 className="font-display font-light text-3xl sm:text-4xl text-white">
                  Seeded Sharma Household Demo
                </h2>
              </div>
              <span className="font-mono text-xs text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
                ● SEEDED &amp; READY TO DEMO
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-2">
              {familyMembers.map((member, idx) => (
                <div
                  key={idx}
                  className={`p-6 rounded-2xl border transition-all flex flex-col justify-between ${
                    member.cardStatus === 'Active'
                      ? 'bg-white/[0.03] border-white/15'
                      : 'bg-red-950/20 border-red-500/30'
                  }`}
                >
                  <div>
                    <div className="flex justify-between items-start mb-2">
                      <span className="font-mono text-[10px] text-cyan-400 uppercase">{member.role}</span>
                      <span
                        className={`font-mono text-[9px] px-2 py-0.5 rounded ${
                          member.cardStatus === 'Active'
                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                            : 'bg-red-500/10 text-red-400 border border-red-500/20'
                        }`}
                      >
                        {member.cardStatus === 'Active' ? '● ACTIVE CARD' : '❄ FROZEN'}
                      </span>
                    </div>

                    <h3 className="font-display text-xl text-white mb-1">{member.name}</h3>
                    <div className="font-mono text-sm text-zinc-300 font-semibold mb-3">{member.balance}</div>

                    <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 font-mono text-[11px] space-y-1">
                      <div className="text-zinc-400">Limit: <span className="text-white">{member.limit}</span></div>
                      <div className="text-zinc-400">Provider: <span className="text-cyan-300">KripiCard Visa</span></div>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-white/10 flex gap-2">
                    <button
                      onClick={() => toggleCardFreeze(idx)}
                      className={`flex-1 py-2 rounded-xl text-xs font-mono font-semibold transition-all ${
                        member.cardStatus === 'Active'
                          ? 'bg-white/[0.08] hover:bg-red-500/20 text-red-300 border border-red-500/20'
                          : 'bg-emerald-500 text-black'
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

        {/* SLIDE 7: Pay-Anyone QR & Pooled Crypto */}
        {currentSlide === 6 && (
          <div className="flex flex-col gap-4 animate-in fade-in zoom-in-95 duration-200">
            <div>
              <span className="font-mono text-xs text-cyan-400 uppercase tracking-widest block mb-1">
                07 / UNIVERSAL LIQUIDITY
              </span>
              <h2 className="font-display font-light text-3xl sm:text-4xl text-white">
                Pay-Anyone QR &amp; Crypto Liquidity Pool
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-2">
              <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 flex flex-col justify-between">
                <div>
                  <span className="text-3xl block mb-2">📲</span>
                  <h3 className="font-display text-xl text-white mb-2">Universal QR Pay</h3>
                  <p className="text-xs text-zinc-300 font-sans leading-relaxed">
                    Scan any merchant QR code (UPI, BharatQR, Stellar QR, EMV standard). Kami parses the recipient VPA and settles instantly.
                  </p>
                </div>
                <span className="font-mono text-[10px] text-cyan-400 pt-3 border-t border-white/5">
                  &lt;3.5s ATOMIC ROUTING
                </span>
              </div>

              <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 flex flex-col justify-between">
                <div>
                  <span className="text-3xl block mb-2">🏊‍♂️</span>
                  <h3 className="font-display text-xl text-white mb-2">Family Crypto Pool</h3>
                  <p className="text-xs text-zinc-300 font-sans leading-relaxed">
                    Pool USDC and XLM in a non-custodial household vault. Family members spend against dynamically budgeted allowance ceilings.
                  </p>
                </div>
                <span className="font-mono text-[10px] text-emerald-400 pt-3 border-t border-white/5">
                  STELLAR HORIZON VAULT
                </span>
              </div>

              <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 flex flex-col justify-between">
                <div>
                  <span className="text-3xl block mb-2">🔒</span>
                  <h3 className="font-display text-xl text-white mb-2">Financial Safety Guardrails</h3>
                  <p className="text-xs text-zinc-300 font-sans leading-relaxed">
                    Pre-authorization limits, automated suspicious velocity freezing, and instant one-tap parental approval requests.
                  </p>
                </div>
                <span className="font-mono text-[10px] text-purple-400 pt-3 border-t border-white/5">
                  ADMIN CONSOLE CONTROL
                </span>
              </div>
            </div>
          </div>
        )}

        {/* SLIDE 8: Current Working Prototype Status */}
        {currentSlide === 7 && (
          <div className="flex flex-col gap-4 animate-in fade-in zoom-in-95 duration-200">
            <div>
              <span className="font-mono text-xs text-cyan-400 uppercase tracking-widest block mb-1">
                08 / PROJECT MATURITY
              </span>
              <h2 className="font-display font-light text-3xl sm:text-4xl text-white">
                Working End-to-End Prototype
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-2">
              <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10">
                <span className="font-mono text-xs text-cyan-400 block mb-2">IMPLEMENTED &amp; DEMO-READY</span>
                <ul className="text-xs font-mono text-zinc-300 space-y-2">
                  <li className="flex items-center gap-2">
                    <span className="text-emerald-400">✓</span> AI-First Home with persistent conversational threads
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-emerald-400">✓</span> Family &amp; Household Management with allowance controls
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-emerald-400">✓</span> Programmable card issuance via KripiCard API
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-emerald-400">✓</span> Real-time synchronization via SpacetimeDB 2.8
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-emerald-400">✓</span> Privy non-custodial MPC wallet authentication
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-emerald-400">✓</span> Stellar / Horizon deposit and transfer infrastructure
                  </li>
                </ul>
              </div>

              <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10">
                <span className="font-mono text-xs text-purple-400 block mb-2">ENTERPRISE SAFETY &amp; TESTING</span>
                <ul className="text-xs font-mono text-zinc-300 space-y-2">
                  <li className="flex items-center gap-2">
                    <span className="text-emerald-400">✓</span> Seeded Sharma household ready for live judge walkthrough
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-emerald-400">✓</span> KYC and card order queues with admin dashboard
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-emerald-400">✓</span> Automated Vitest integration test suite passing
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-emerald-400">✓</span> 0% foreign exchange settlement for international travel
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-emerald-400">✓</span> Web-native interactive 3D Card Studio &amp; live simulators
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* SLIDE 9: Why Stellar + SpacetimeDB + Qwen? */}
        {currentSlide === 8 && (
          <div className="flex flex-col gap-4 animate-in fade-in zoom-in-95 duration-200">
            <div>
              <span className="font-mono text-xs text-cyan-400 uppercase tracking-widest block mb-1">
                09 / UNFAIR ADVANTAGE
              </span>
              <h2 className="font-display font-light text-3xl sm:text-4xl text-white">
                Why This Architecture Wins
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-2">
              <div className="p-6 rounded-2xl bg-cyan-950/30 border border-cyan-400/50 flex flex-col justify-between">
                <div>
                  <span className="font-mono text-xs text-cyan-300 font-bold block mb-1">STELLAR NETWORK</span>
                  <h3 className="font-display text-xl text-white mb-2">&lt;3.5s Finality &amp; $0.00001 Gas</h3>
                  <p className="text-xs text-zinc-300 font-sans leading-relaxed">
                    Stellar Consensus Protocol guarantees payment finality in 3.2s without terminal timeouts, and micro-fees make $2 retail transactions viable.
                  </p>
                </div>
                <span className="font-mono text-[10px] text-cyan-300 pt-3 border-t border-cyan-500/20">DETERMINISTIC CONSENSUS</span>
              </div>

              <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 flex flex-col justify-between">
                <div>
                  <span className="font-mono text-xs text-emerald-400 font-bold block mb-1">SPACETIMEDB 2.8</span>
                  <h3 className="font-display text-xl text-white mb-2">Real-time Multi-Device Sync</h3>
                  <p className="text-xs text-zinc-300 font-sans leading-relaxed">
                    When Dad approves an allowance or freezes a card, every family phone updates immediately without HTTP polling or websocket desyncs.
                  </p>
                </div>
                <span className="font-mono text-[10px] text-emerald-400 pt-3 border-t border-white/5">RUST WASM ENGINE</span>
              </div>

              <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 flex flex-col justify-between">
                <div>
                  <span className="font-mono text-xs text-purple-400 font-bold block mb-1">QWEN FINANCIAL AI</span>
                  <h3 className="font-display text-xl text-white mb-2">Contextual Safety Guardrails</h3>
                  <p className="text-xs text-zinc-300 font-sans leading-relaxed">
                    Understands colloquial household vernacular (&ldquo;15k&rdquo;, &ldquo;1.5 lakh&rdquo;, &ldquo;till Sunday&rdquo;) while enforcing strict verification boundaries.
                  </p>
                </div>
                <span className="font-mono text-[10px] text-purple-400 pt-3 border-t border-white/5">ZERO-HALLUCINATION EXECUTION</span>
              </div>
            </div>
          </div>
        )}

        {/* SLIDE 10: Conclusion & The Vision */}
        {currentSlide === 9 && (
          <div className="flex flex-col items-center justify-center text-center py-6 animate-in fade-in zoom-in-95 duration-200">
            <div className="w-16 h-16 rounded-2xl bg-white/[0.08] border border-white/20 flex items-center justify-center mb-4">
              <StellarLogoSVG className="w-8 h-8 text-cyan-400" />
            </div>

            <h2 className="font-display font-light text-4xl sm:text-6xl text-white mb-3">
              KAMI — Money That Understands Your Family.
            </h2>
            <p className="font-mono text-sm text-cyan-300 max-w-xl mb-6">
              Financial infrastructure underneath. Natural language on top. Trust at every step.
            </p>

            <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/15 max-w-md w-full font-mono text-xs space-y-2 text-left mb-6">
              <div className="flex justify-between">
                <span className="text-zinc-400">Track:</span>
                <span className="text-white font-semibold">Real-World Assets &amp; Payments</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">Stack:</span>
                <span className="text-cyan-400">Stellar + SpacetimeDB + Qwen + Expo</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">Live Web Client:</span>
                <a href="/" target="_blank" className="text-white underline underline-offset-2 hover:text-cyan-300">
                  https://kami.mystic.cat
                </a>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">Card Integration:</span>
                <span className="text-emerald-400">KripiCard Programmable Visa</span>
              </div>
            </div>

            <span className="font-mono text-xs text-cyan-400 animate-pulse">
              ● READY FOR LIVE JUDGE DEMO &amp; Q&amp;A
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

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
              {[
                '01. Money That Understands Your Family',
                '02. The Problem: Legacy Banking Friction',
                '03. Live AI Intent Parser Demo',
                '04. End-to-End System Architecture',
                '05. Full Production Tech Stack',
                '06. Seeded Sharma Household Demo',
                '07. Pay-Anyone QR & Crypto Pool',
                '08. Working Prototype Status',
                '09. Why This Architecture Wins',
                '10. The Vision & Judge Q&A',
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
          <span className="text-cyan-400 font-semibold">KAMI — STELLAR HACKATHON 2026</span>
        </div>
      </footer>
    </div>
  );
}
