'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import CosmicBackground from '@/components/CosmicBackground';
import CylinderCardCarousel, { StellarLogoSVG } from '@/components/CylinderCardCarousel';

const slideTitles = [
  'Crypto should behave like money',
  'The off-ramp is the broken step',
  'One balance. One card. Anywhere Visa works.',
  'Stellar makes the payment rail disappear',
  'A crypto neobank people already understand',
  'AI that can act—without taking control',
  'Built for one person. Better with a family.',
  'A focused stack from wallet to checkout',
  'A card business with software margins',
  'Help us put Stellar in everyday wallets',
];

const slideSections = ['VISION', 'PROBLEM', 'SOLUTION', 'WHY STELLAR', 'PRODUCT', 'AGENTIC AI', 'FAMILY', 'ARCHITECTURE', 'BUSINESS', 'THE ASK'];

const slideNotes = [
  'Open on the outcome, not the technology: Kami makes on-chain value usable in ordinary life. The card is the familiar interface; Stellar is the invisible settlement rail.',
  'Today, spending crypto means moving funds to an exchange, selling, waiting for a bank transfer, and then using a bank card. Every handoff adds time, fees, and abandonment.',
  'Kami removes the manual cash-out loop. Users fund with Stellar assets, set a spend balance, and pay through a Visa card issued by a licensed card issuer. The merchant experiences a normal card payment.',
  'Stellar is purpose-built for moving value: fast settlement, low transaction costs, native assets, and programmable controls through Soroban. That combination supports frequent, small, real-world payments.',
  'The product feels like a modern neobank: virtual and physical cards, balances, spending controls, receipts, and support. Crypto complexity stays behind the interface.',
  'Kami AI turns natural-language intent into a structured transaction. It can explain, prepare, and monitor—but user approval and deterministic policies remain the execution boundary.',
  'The card is for everyone. Family features are a high-retention use case: shared funding, allowances, elder support, emergency access, and merchant or time-based controls.',
  'Show the separation of concerns: Stellar custody and settlement, Kami orchestration and policy, the licensed issuer for card issuance and authorization, and Visa acceptance at the merchant.',
  'The model compounds across interchange share, paid plans, and future embedded card programs. Start with globally mobile crypto users, then expand through households and communities.',
  'Ask for a defined pilot: integration support, grant capital, issuer collaboration, and early users. The milestone is simple—prove repeatable Stellar-funded card spend in the real world.',
];

type ParsedCommand = { intent: string; target: string; amount: string; guardrail: string };

const commandExamples: Array<{ command: string; parsed: ParsedCommand }> = [
  { command: 'Move 75 USDC to my weekend card', parsed: { intent: 'FUND_CARD', target: 'Weekend virtual card', amount: '75.00 USDC', guardrail: 'User approval required' } },
  { command: 'Give Maya ₹2,000 for books this week', parsed: { intent: 'CREATE_ALLOWANCE', target: 'Maya · Books category', amount: '₹2,000 spending limit', guardrail: 'Expires Sunday · User approval' } },
  { command: 'Freeze my card and show the last charge', parsed: { intent: 'FREEZE_AND_REVIEW', target: 'Primary Visa card', amount: 'No transfer', guardrail: 'Freeze now · Reveal receipt' } },
];

function Eyebrow({ children }: { children: React.ReactNode }) {
  return <div className="mb-5 flex items-center gap-3 font-mono text-[10px] font-semibold uppercase tracking-[0.26em] text-cyan-300"><span className="h-px w-8 bg-cyan-300/80" />{children}</div>;
}

function SlideTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="max-w-5xl font-display text-4xl font-light leading-[1.05] tracking-[-0.035em] text-white sm:text-5xl lg:text-[3.5rem]">{children}</h2>;
}

function CardMockup() {
  return (
    <div className="relative mx-auto w-full max-w-[420px]">
      <div className="absolute -inset-10 rounded-full bg-cyan-400/10 blur-3xl" />
      <div className="relative aspect-[1.586/1] overflow-hidden rounded-[28px] border border-white/20 bg-[radial-gradient(circle_at_82%_12%,rgba(34,211,238,.24),transparent_28%),linear-gradient(145deg,#15171d,#050608_70%)] p-7 shadow-[0_30px_90px_rgba(0,0,0,.55)]">
        <div className="absolute inset-0 opacity-30 [background-image:linear-gradient(110deg,transparent_35%,rgba(255,255,255,.08)_50%,transparent_65%)]" />
        <div className="relative flex h-full flex-col justify-between">
          <div className="flex items-start justify-between">
            <div><div className="font-display text-xl font-light tracking-[0.22em]">KAMI</div><div className="mt-1 font-mono text-[8px] tracking-[0.2em] text-zinc-400">STELLAR SPEND ACCOUNT</div></div>
            <div className="flex items-center gap-2 text-cyan-300"><StellarLogoSVG className="h-5 w-5" /><span className="font-mono text-[8px] tracking-[0.18em]">STELLAR</span></div>
          </div>
          <div>
            <div className="mb-4 h-7 w-9 rounded-md bg-gradient-to-br from-amber-100 via-amber-300 to-amber-600 opacity-80" />
            <div className="font-mono text-sm tracking-[0.22em] text-zinc-200">••••  ••••  ••••  2048</div>
            <div className="mt-5 flex items-end justify-between">
              <div><div className="font-mono text-[7px] tracking-[0.2em] text-zinc-500">CARDHOLDER</div><div className="mt-1 font-mono text-[10px] tracking-[0.15em]">YOUR NAME</div></div>
              <div className="font-sans text-2xl font-black italic tracking-[-0.08em]">VISA</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function AnimatedCardStage() {
  return (
    <div className="relative mx-auto h-[470px] w-full max-w-[560px] overflow-hidden rounded-[34px] border border-white/10 bg-[radial-gradient(circle_at_50%_45%,rgba(34,211,238,.12),transparent_40%),linear-gradient(145deg,rgba(255,255,255,.035),rgba(255,255,255,.01))] shadow-[0_40px_120px_rgba(0,0,0,.6)]">
      <div className="pointer-events-none absolute inset-x-10 top-7 z-20 flex items-center justify-between font-mono text-[8px] uppercase tracking-[0.2em] text-zinc-500">
        <span>Live card collection</span>
        <span className="flex items-center gap-2 text-emerald-300"><span className="h-1.5 w-1.5 rounded-full bg-emerald-300 shadow-[0_0_12px_rgba(110,231,183,.9)]" /> Interactive</span>
      </div>
      <div className="pointer-events-none absolute left-8 top-1/2 z-20 -translate-y-1/2 -rotate-90 font-mono text-[7px] uppercase tracking-[0.28em] text-white/20">Stellar-funded Visa cards</div>
      <CylinderCardCarousel
        scale={0.76}
        className="absolute inset-0 flex items-center justify-center overflow-hidden select-none pointer-events-auto"
      />
      <div className="pointer-events-none absolute inset-x-7 bottom-6 z-20 flex items-center justify-between">
        <div className="rounded-full border border-white/10 bg-black/55 px-3 py-1.5 font-mono text-[8px] uppercase tracking-[0.16em] text-zinc-400 backdrop-blur-md">Move cursor to tilt</div>
        <div className="flex gap-1.5"><span className="h-1 w-5 rounded-full bg-cyan-300" /><span className="h-1 w-1 rounded-full bg-white/20" /><span className="h-1 w-1 rounded-full bg-white/20" /></div>
      </div>
      <span className="pointer-events-none absolute left-4 top-4 h-8 w-8 border-l border-t border-cyan-300/35" />
      <span className="pointer-events-none absolute bottom-4 right-4 h-8 w-8 border-b border-r border-cyan-300/35" />
    </div>
  );
}

function FlowArrow() {
  return <div className="hidden h-px flex-1 bg-gradient-to-r from-cyan-300/10 via-cyan-300/70 to-cyan-300/10 lg:block" />;
}

export default function PitchDeckPage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showNotes, setShowNotes] = useState(false);
  const [showOverview, setShowOverview] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(true);
  const [commandIndex, setCommandIndex] = useState(0);
  const totalSlides = slideTitles.length;

  useEffect(() => {
    if (!isTimerRunning) return;
    const timer = window.setInterval(() => setTimerSeconds((value) => value + 1), 1000);
    return () => window.clearInterval(timer);
  }, [isTimerRunning]);

  const nextSlide = useCallback(() => setCurrentSlide((slide) => Math.min(slide + 1, totalSlides - 1)), [totalSlides]);
  const prevSlide = useCallback(() => setCurrentSlide((slide) => Math.max(slide - 1, 0)), []);
  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => undefined);
      return;
    }
    document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => undefined);
  }, []);

  const wheelLocked = useRef(false);
  const touchStart = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowRight' || event.key === ' ') { event.preventDefault(); nextSlide(); }
      if (event.key === 'ArrowLeft') prevSlide();
      if (event.key.toLowerCase() === 'f') toggleFullscreen();
      if (event.key.toLowerCase() === 'n') setShowNotes((value) => !value);
      if (event.key.toLowerCase() === 'o') setShowOverview((value) => !value);
      if (event.key === 'Home') setCurrentSlide(0);
      if (event.key === 'End') setCurrentSlide(totalSlides - 1);
    };
    const onWheel = (event: WheelEvent) => {
      if (showOverview || wheelLocked.current || Math.abs(event.deltaY) < 30) return;
      wheelLocked.current = true;
      if (event.deltaY > 0) nextSlide(); else prevSlide();
      window.setTimeout(() => { wheelLocked.current = false; }, 500);
    };
    const onTouchStart = (event: TouchEvent) => { touchStart.current = { x: event.touches[0].clientX, y: event.touches[0].clientY }; };
    const onTouchEnd = (event: TouchEvent) => {
      const x = event.changedTouches[0].clientX - touchStart.current.x;
      const y = event.changedTouches[0].clientY - touchStart.current.y;
      if (Math.max(Math.abs(x), Math.abs(y)) < 45) return;
      if ((Math.abs(x) > Math.abs(y) ? x : y) < 0) nextSlide(); else prevSlide();
    };
    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('wheel', onWheel, { passive: true });
    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchend', onTouchEnd, { passive: true });
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchend', onTouchEnd);
    };
  }, [nextSlide, prevSlide, showOverview, toggleFullscreen, totalSlides]);

  const time = `${String(Math.floor(timerSeconds / 60)).padStart(2, '0')}:${String(timerSeconds % 60).padStart(2, '0')}`;
  const progress = ((currentSlide + 1) / totalSlides) * 100;
  const selectedCommand = commandExamples[commandIndex];

  return (
    <div className="relative flex h-screen min-h-[680px] select-none flex-col overflow-hidden bg-[#030405] text-white">
      <CosmicBackground />
      <div className="pointer-events-none absolute inset-0 z-[1] bg-[linear-gradient(rgba(255,255,255,.018)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.018)_1px,transparent_1px),radial-gradient(circle_at_50%_20%,rgba(8,145,178,.09),transparent_34%),linear-gradient(to_bottom,transparent_70%,rgba(0,0,0,.8))] [background-size:72px_72px,72px_72px,auto,auto]" />

      <header className="relative z-30 flex h-[62px] shrink-0 items-center justify-between border-b border-white/10 bg-black/55 px-4 backdrop-blur-xl sm:px-8">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full border border-cyan-300/30 bg-cyan-300/10 text-cyan-300"><StellarLogoSVG className="h-4 w-4" /></div>
          <div><div className="flex items-center gap-2 font-display text-sm font-light tracking-[0.24em]"><span>KAMI</span><span className="text-zinc-700">/</span><span className="text-zinc-400">DECK</span></div><div className="hidden font-mono text-[8px] uppercase tracking-[0.18em] text-zinc-500 sm:block">Crypto neobank · Built on Stellar</div></div>
        </div>
        <div className="flex items-center gap-2 font-mono text-[10px] text-zinc-400">
          <button type="button" onClick={() => setIsTimerRunning((value) => !value)} className="hidden rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 transition hover:border-white/20 hover:text-white sm:block">{isTimerRunning ? '●' : 'Ⅱ'} {time}</button>
          <button type="button" onClick={() => setShowOverview(true)} className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 transition hover:text-white">Overview</button>
          <button type="button" onClick={() => setShowNotes((value) => !value)} className={`hidden rounded-full border px-3 py-1.5 transition sm:block ${showNotes ? 'border-cyan-300/50 bg-cyan-300/10 text-cyan-200' : 'border-white/10 bg-white/[0.04] hover:text-white'}`}>Notes</button>
          <button type="button" onClick={toggleFullscreen} className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 transition hover:text-white">{isFullscreen ? 'Exit' : 'Fullscreen'}</button>
          <div className="ml-1 hidden rounded-full border border-cyan-300/20 bg-cyan-300/[0.06] px-3 py-1.5 text-cyan-200 md:block">{slideSections[currentSlide]}</div>
          <div className="ml-1 tabular-nums text-white"><span className="text-cyan-300">{String(currentSlide + 1).padStart(2, '0')}</span> / {String(totalSlides).padStart(2, '0')}</div>
        </div>
      </header>

      <div className="relative z-30 h-[2px] shrink-0 bg-white/5"><div className="h-full bg-gradient-to-r from-cyan-300 via-sky-400 to-lime-300 transition-all duration-500" style={{ width: `${progress}%` }} /></div>

      <main className="relative z-10 mx-auto flex w-full max-w-[1320px] flex-1 items-center overflow-hidden px-5 py-5 sm:px-10 lg:px-14">
        <section key={currentSlide} className="slide-enter w-full">
          {currentSlide === 0 && (
            <div className="grid items-center gap-10 lg:grid-cols-[1.08fr_.92fr]">
              <div>
                <Eyebrow>Stellar-powered everyday spending</Eyebrow>
                <h1 className="max-w-3xl font-display text-5xl font-light leading-[0.95] tracking-[-0.055em] sm:text-6xl lg:text-[5.25rem]">Crypto should<br /><span className="text-cyan-300">behave like money.</span></h1>
                <p className="mt-7 max-w-xl text-lg leading-relaxed text-zinc-300 sm:text-xl">Kami is the crypto neobank that lets people fund with Stellar assets and spend through a Visa card in everyday life.</p>
                <div className="mt-8 flex flex-wrap items-center gap-5 font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500"><span>Fund on Stellar</span><span className="text-cyan-400">→</span><span>Spend globally</span><span className="text-cyan-400">→</span><span>Stay in control</span></div>
              </div>
              <AnimatedCardStage />
            </div>
          )}

          {currentSlide === 1 && (
            <div>
              <Eyebrow>The problem</Eyebrow><SlideTitle>The off-ramp is the broken step between crypto and real life.</SlideTitle>
              <div className="mt-12 grid items-stretch gap-4 lg:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr]">
                {[
                  ['01', 'Move', 'Send assets from a wallet to an exchange'],
                  ['02', 'Sell', 'Convert crypto and absorb price or platform friction'],
                  ['03', 'Wait', 'Withdraw to a bank account before funds are usable'],
                  ['04', 'Spend', 'Finally pay with a completely separate card'],
                ].map(([number, title, body], index) => <React.Fragment key={title}><div className={`relative min-h-52 border-t p-6 ${index === 3 ? 'border-rose-400/70 bg-rose-400/[0.06]' : 'border-white/15 bg-white/[0.025]'}`}><div className={`font-mono text-xs ${index === 3 ? 'text-rose-300' : 'text-cyan-300'}`}>{number}</div><h3 className="mt-8 font-display text-3xl font-light">{title}</h3><p className="mt-4 text-sm leading-relaxed text-zinc-400">{body}</p></div>{index < 3 && <div className="hidden items-center text-zinc-700 lg:flex">→</div>}</React.Fragment>)}
              </div>
              <p className="mt-8 max-w-4xl font-display text-2xl font-light text-zinc-300">People do not need another exchange flow. They need their on-chain balance to work at checkout.</p>
            </div>
          )}

          {currentSlide === 2 && (
            <div>
              <Eyebrow>The solution</Eyebrow><SlideTitle>One balance. One card. Anywhere Visa works.</SlideTitle>
              <div className="mt-12 grid gap-4 lg:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr] lg:items-center">
                {[
                  ['STELLAR WALLET', 'USDC · XLM', 'Fund in seconds'],
                  ['KAMI', 'Spend balance', 'Policies + orchestration'],
                  ['CARD ISSUER', 'Visa card', 'Licensed issuance'],
                  ['MERCHANT', 'Local currency', 'A normal card payment'],
                ].map(([label, title, detail], index) => <React.Fragment key={label}><div className={`min-h-48 rounded-[26px] border p-6 ${index === 1 ? 'border-cyan-300/45 bg-cyan-300/[0.08] shadow-[0_0_60px_rgba(34,211,238,.08)]' : 'border-white/10 bg-white/[0.035]'}`}><div className="font-mono text-[9px] tracking-[0.2em] text-zinc-500">{label}</div><h3 className="mt-9 font-display text-3xl font-light text-white">{title}</h3><p className="mt-3 text-sm text-zinc-400">{detail}</p></div>{index < 3 && <FlowArrow />}</React.Fragment>)}
              </div>
              <div className="mt-9 flex items-start gap-4 border-l-2 border-lime-300 pl-5"><span className="font-mono text-[10px] uppercase tracking-[0.2em] text-lime-300">The unlock</span><p className="max-w-3xl text-base leading-relaxed text-zinc-300">No manual sell-withdraw-wait loop. Kami coordinates the payment while the merchant receives a familiar Visa transaction.</p></div>
            </div>
          )}

          {currentSlide === 3 && (
            <div className="grid gap-12 lg:grid-cols-[.92fr_1.08fr] lg:items-end">
              <div><Eyebrow>Why Stellar</Eyebrow><SlideTitle>Stellar makes the payment rail disappear.</SlideTitle><p className="mt-7 max-w-lg text-lg leading-relaxed text-zinc-400">Everyday payments demand speed, low cost, predictable assets, and programmable controls—not speculative blockspace.</p></div>
              <div className="space-y-1">{[
                ['01', 'Fast settlement', 'Value moves in seconds, keeping the experience aligned with checkout.'],
                ['02', 'Tiny network costs', 'Frequent card funding and small transfers remain economically viable.'],
                ['03', 'Native asset rails', 'USDC and XLM can move through one purpose-built value network.'],
                ['04', 'Soroban controls', 'Smart contracts can enforce limits, approvals, vault rules, and recovery logic.'],
              ].map(([number, title, body]) => <div key={number} className="grid grid-cols-[44px_1fr] gap-4 border-b border-white/10 py-5 last:border-0"><div className="font-mono text-xs text-cyan-300">{number}</div><div className="grid gap-2 sm:grid-cols-[190px_1fr]"><h3 className="font-display text-xl font-light text-white">{title}</h3><p className="text-sm leading-relaxed text-zinc-400">{body}</p></div></div>)}</div>
            </div>
          )}

          {currentSlide === 4 && (
            <div>
              <Eyebrow>The product</Eyebrow><SlideTitle>A crypto neobank people already understand.</SlideTitle>
              <div className="mt-11 grid gap-8 lg:grid-cols-[.9fr_1.1fr] lg:items-center"><CardMockup /><div className="grid gap-x-8 gap-y-9 sm:grid-cols-2">{[
                ['Fund', 'Add USDC or XLM from a Stellar wallet.'], ['Spend', 'Use virtual or physical Visa cards for daily purchases.'], ['Control', 'Set limits, freeze cards, and create purpose-bound balances.'], ['Understand', 'See clear receipts, asset movement, and real spending context.'], ['Automate', 'Let Kami AI prepare transfers, budgets, and card actions.'], ['Recover', 'Build safer account recovery and shared approval paths.'],
              ].map(([title, body], index) => <div key={title} className="border-l border-white/15 pl-5"><div className="font-mono text-[9px] text-cyan-300">0{index + 1}</div><h3 className="mt-2 font-display text-2xl font-light">{title}</h3><p className="mt-2 text-sm leading-relaxed text-zinc-400">{body}</p></div>)}</div></div>
            </div>
          )}

          {currentSlide === 5 && (
            <div>
              <Eyebrow>Agentic finance, bounded by design</Eyebrow><SlideTitle>AI that can act—without taking control.</SlideTitle>
              <div className="mt-9 grid gap-6 lg:grid-cols-[.92fr_1.08fr]">
                <div><div className="mb-3 font-mono text-[9px] uppercase tracking-[0.18em] text-zinc-500">Try a command</div><div className="space-y-2">{commandExamples.map((example, index) => <button type="button" key={example.command} onClick={() => setCommandIndex(index)} className={`w-full rounded-2xl border px-5 py-4 text-left text-sm transition ${commandIndex === index ? 'border-cyan-300/50 bg-cyan-300/10 text-white' : 'border-white/10 bg-white/[0.025] text-zinc-400 hover:border-white/20 hover:text-white'}`}>“{example.command}”</button>)}</div><p className="mt-5 border-l-2 border-lime-300 pl-4 text-sm leading-relaxed text-zinc-400">The AI interprets intent. Deterministic policy and explicit approval control execution.</p></div>
                <div className="rounded-[28px] border border-white/10 bg-[#080a0d]/90 p-6 shadow-2xl"><div className="flex items-center justify-between border-b border-white/10 pb-4"><span className="font-mono text-[9px] uppercase tracking-[0.2em] text-zinc-500">Structured action preview</span><span className="rounded-full bg-lime-300/10 px-3 py-1 font-mono text-[9px] text-lime-300">NOT EXECUTED</span></div><div className="mt-5 space-y-4">{Object.entries(selectedCommand.parsed).map(([key, value]) => <div key={key} className="grid grid-cols-[110px_1fr] gap-4 border-b border-white/[0.07] pb-3 last:border-0"><span className="font-mono text-[9px] uppercase tracking-[0.16em] text-zinc-600">{key}</span><span className="font-mono text-sm text-zinc-200">{value}</span></div>)}</div><div className="mt-5 grid grid-cols-2 gap-3"><div className="rounded-xl border border-white/10 px-4 py-3 text-center font-mono text-[10px] text-zinc-500">CANCEL</div><div className="rounded-xl bg-white px-4 py-3 text-center font-mono text-[10px] font-bold text-black">APPROVE ACTION</div></div></div>
              </div>
            </div>
          )}

          {currentSlide === 6 && (
            <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-center">
              <div><Eyebrow>High-retention wedge</Eyebrow><SlideTitle>Built for one person. Better with a family.</SlideTitle><p className="mt-7 max-w-xl text-lg leading-relaxed text-zinc-400">Kami is a universal card product. Family controls add a powerful reason to keep more financial life in one trusted account.</p><div className="mt-8 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.035] px-5 py-3 font-mono text-[10px] uppercase tracking-[0.16em] text-zinc-400">Individual first <span className="text-cyan-300">→</span> Household expansion</div></div>
              <div className="space-y-3">{[
                ['Everyday card', 'Personal balance, global spend, simple controls', 'YOU'], ['Shared funding', 'Top up a partner, child, parent, or caregiver', 'FAMILY'], ['Purpose-bound money', 'Set merchant, amount, time, and category rules', 'POLICY'], ['Emergency access', 'Create transparent backup funds with approvals', 'TRUST'],
              ].map(([title, body, label], index) => <div key={title} className={`grid grid-cols-[62px_1fr] gap-5 rounded-2xl border p-5 ${index === 0 ? 'border-cyan-300/35 bg-cyan-300/[0.07]' : 'border-white/10 bg-white/[0.025]'}`}><div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 font-mono text-[8px] text-cyan-300">{label}</div><div><h3 className="font-display text-xl font-light">{title}</h3><p className="mt-1 text-sm text-zinc-400">{body}</p></div></div>)}</div>
            </div>
          )}

          {currentSlide === 7 && (
            <div>
              <Eyebrow>How it works</Eyebrow><SlideTitle>A focused stack from wallet to checkout.</SlideTitle>
              <div className="relative mt-12 grid gap-4 lg:grid-cols-4"><div className="pointer-events-none absolute left-[12%] right-[12%] top-10 hidden h-px bg-gradient-to-r from-cyan-300/20 via-cyan-300/70 to-cyan-300/20 lg:block" />{[
                ['01', 'Stellar + Soroban', 'Assets, vault rules, approvals, and settlement state live on purpose-built payment rails.'], ['02', 'Kami orchestration', 'Balances, policy checks, card controls, receipts, and agentic workflows form the product layer.'], ['03', 'Licensed card issuer', 'The issuing partner handles regulated card issuance and card-network authorization.'], ['04', 'Visa acceptance', 'The merchant receives a standard Visa payment in the expected settlement flow.'],
              ].map(([number, title, body]) => <div key={number} className="relative pt-1"><div className="relative z-10 flex h-20 w-20 items-center justify-center rounded-full border border-cyan-300/40 bg-[#071014] font-display text-2xl font-light text-cyan-300 shadow-[0_0_35px_rgba(34,211,238,.12)]">{number}</div><h3 className="mt-7 font-display text-2xl font-light">{title}</h3><p className="mt-3 max-w-[260px] text-sm leading-relaxed text-zinc-400">{body}</p></div>)}</div>
              <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3 border-t border-white/10 pt-5 font-mono text-[9px] uppercase tracking-[0.16em] text-zinc-500"><span>Non-custodial design target</span><span>Explicit user approvals</span><span>Issuer-led compliance</span><span>Observable transaction state</span></div>
            </div>
          )}

          {currentSlide === 8 && (
            <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-end">
              <div><Eyebrow>Business model</Eyebrow><SlideTitle>A card business with software margins.</SlideTitle><p className="mt-7 max-w-xl text-lg leading-relaxed text-zinc-400">The same platform that powers one cardholder can support households, premium users, and future embedded card programs.</p></div>
              <div>{[
                ['01', 'Interchange share', 'Revenue participation on eligible card spend through the issuing program.'], ['02', 'Kami Plus', 'Premium controls, additional cards, advanced AI, and priority support.'], ['03', 'Embedded programs', 'Future APIs for communities, wallets, and fintechs that want Stellar-funded cards.'],
              ].map(([number, title, body]) => <div key={number} className="grid grid-cols-[42px_1fr] gap-5 border-t border-white/10 py-6"><div className="font-mono text-xs text-cyan-300">{number}</div><div><h3 className="font-display text-2xl font-light">{title}</h3><p className="mt-2 text-sm leading-relaxed text-zinc-400">{body}</p></div></div>)}</div>
              <div className="grid gap-4 border-t border-white/10 pt-7 sm:grid-cols-3 lg:col-span-2">{[['START', 'Crypto-native professionals'], ['EXPAND', 'Households + global earners'], ['PLATFORM', 'Wallets + fintech partners']].map(([label, value]) => <div key={label}><div className="font-mono text-[9px] tracking-[0.18em] text-zinc-600">{label}</div><div className="mt-2 text-sm text-zinc-300">{value}</div></div>)}</div>
            </div>
          )}

          {currentSlide === 9 && (
            <div className="grid gap-12 lg:grid-cols-[1.05fr_.95fr] lg:items-center">
              <div><Eyebrow>The ask</Eyebrow><h2 className="max-w-3xl font-display text-5xl font-light leading-[0.98] tracking-[-0.045em] sm:text-6xl lg:text-[4.7rem]">Help us put Stellar in <span className="text-cyan-300">everyday wallets.</span></h2><p className="mt-7 max-w-2xl text-lg leading-relaxed text-zinc-300">We are seeking grant support, issuer collaboration, and pilot users to prove repeatable Stellar-funded Visa spending in the real world.</p><div className="mt-9 flex flex-wrap gap-3">{['Stellar integration', 'Issuer pilot', 'Security review', 'Launch cohort'].map((item) => <span key={item} className="rounded-full border border-white/10 bg-white/[0.035] px-4 py-2 font-mono text-[9px] uppercase tracking-[0.15em] text-zinc-300">{item}</span>)}</div></div>
              <div className="rounded-[30px] border border-cyan-300/25 bg-cyan-300/[0.055] p-8"><div className="font-mono text-[9px] uppercase tracking-[0.2em] text-cyan-300">90-day pilot outcome</div><div className="mt-8 space-y-6">{[['01', 'Complete issuer + Stellar sandbox flow'], ['02', 'Ship controlled virtual-card beta'], ['03', 'Measure activation, spend, and repeat usage'], ['04', 'Publish a path to compliant scale']].map(([number, goal]) => <div key={number} className="flex gap-4 border-b border-white/10 pb-5 last:border-0 last:pb-0"><span className="font-mono text-xs text-cyan-300">{number}</span><span className="text-sm text-zinc-200">{goal}</span></div>)}</div></div>
            </div>
          )}
        </section>
      </main>

      <footer className="relative z-30 flex h-[64px] shrink-0 items-center justify-between border-t border-white/10 bg-black/45 px-4 backdrop-blur-xl sm:px-8">
        <button type="button" onClick={prevSlide} disabled={currentSlide === 0} className="rounded-full border border-white/10 px-5 py-2 font-mono text-[10px] text-zinc-400 transition hover:text-white disabled:cursor-not-allowed disabled:opacity-25">← Previous</button>
        <div className="hidden items-center gap-2 md:flex" aria-label="Slide navigation">
          {slideTitles.map((title, index) => (
            <button
              type="button"
              key={title}
              onClick={() => setCurrentSlide(index)}
              aria-label={`Go to slide ${index + 1}: ${title}`}
              className={`h-1.5 rounded-full transition-all duration-300 ${index === currentSlide ? 'w-8 bg-cyan-300 shadow-[0_0_10px_rgba(103,232,249,.65)]' : index < currentSlide ? 'w-3 bg-white/35 hover:bg-white/60' : 'w-3 bg-white/10 hover:bg-white/30'}`}
            />
          ))}
        </div>
        <button type="button" onClick={nextSlide} disabled={currentSlide === totalSlides - 1} className="rounded-full bg-white px-5 py-2 font-mono text-[10px] font-semibold text-black transition hover:bg-cyan-200 disabled:cursor-not-allowed disabled:opacity-25">Next →</button>
      </footer>

      {showNotes && <aside className="fixed bottom-[78px] left-1/2 z-40 w-[min(760px,calc(100%-32px))] -translate-x-1/2 rounded-2xl border border-cyan-300/25 bg-[#080b0e]/95 p-5 shadow-2xl backdrop-blur-xl"><div className="mb-2 font-mono text-[9px] uppercase tracking-[0.2em] text-cyan-300">Speaker notes · Slide {currentSlide + 1}</div><p className="text-sm leading-relaxed text-zinc-300">{slideNotes[currentSlide]}</p></aside>}

      {showOverview && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/90 p-6 backdrop-blur-xl sm:p-10"><div className="mx-auto max-w-6xl"><div className="mb-8 flex items-center justify-between"><div><div className="font-display text-3xl font-light">Deck overview</div><div className="mt-1 font-mono text-[9px] uppercase tracking-[0.18em] text-zinc-500">Choose a slide to present</div></div><button type="button" onClick={() => setShowOverview(false)} className="rounded-full border border-white/10 px-4 py-2 font-mono text-[10px] text-zinc-300">Close</button></div><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{slideTitles.map((title, index) => <button type="button" key={title} onClick={() => { setCurrentSlide(index); setShowOverview(false); }} className={`min-h-40 rounded-2xl border p-5 text-left transition ${currentSlide === index ? 'border-cyan-300/50 bg-cyan-300/10' : 'border-white/10 bg-white/[0.025] hover:border-white/25'}`}><div className="font-mono text-[9px] text-cyan-300">{String(index + 1).padStart(2, '0')}</div><div className="mt-8 font-display text-2xl font-light leading-tight">{title}</div></button>)}</div></div></div>
      )}

      <style jsx global>{`
        @keyframes slide-enter { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
        .slide-enter { animation: slide-enter 420ms cubic-bezier(.2,.8,.2,1) both; }
        @media (prefers-reduced-motion: reduce) { .slide-enter { animation: none; } }
      `}</style>
    </div>
  );
}
