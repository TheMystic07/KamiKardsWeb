'use client';

import React, { useState, useEffect, useRef } from 'react';

const CARD_VIDEOS = [
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260506_030111_a9e15665-d379-4a7f-8116-695bbe452ad1.mp4',
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260429_171347_f640c30d-ec21-426a-98bc-77e07c2c60cb.mp4',
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260503_104800_bc43ae09-f494-43e3-97d7-2f8c1692cfd7.mp4',
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260423_161253_c72b1869-400f-45ed-ac0c-52f68c2ed5bd.mp4',
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260418_115655_b4d9cd77-feed-43cd-a198-af78ebdf1f7a.mp4',
];

const CARD_DETAILS = [
  { tier: 'OBSIDIAN PRIME', number: '4232 •••• •••• 4892', name: 'ZACHARY MERCER', cvv: '382', currency: 'USDC / XLM' },
  { tier: 'STELLAR FOUNDER', number: '4154 •••• •••• 5124', name: 'SOPHIA MARTINEZ', cvv: '109', currency: 'USDC FUNDED' },
  { tier: 'CYBER TITANIUM', number: '5457 •••• •••• 9035', name: 'BENJAMIN CARTER', cvv: '764', currency: 'SOROBAN VAULT' },
  { tier: 'STELLAR OBSIDIAN', number: '4441 •••• •••• 2468', name: 'EMILY MORRISON', cvv: '491', currency: 'USDC / XLM' },
  { tier: 'STELLAR PLATINUM', number: '5375 •••• •••• 7713', name: 'JACKSON REID', cvv: '255', currency: 'AUTO-YIELD 5.2%' },
];

// Official Exact Stellar Development Foundation (XLM) Logo Vector
export function StellarLogoSVG({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 32 32" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M23.13 8.292l-2.4 1.224-11.598 5.907A6.909 6.909 0 0119.35 8.498l1.374-.7.205-.105a8.439 8.439 0 00-13.371 7.472 1.535 1.535 0 01-.834 1.484l-.725.37v1.724l2.134-1.088.691-.353.681-.347 12.226-6.23 1.374-.699 2.84-1.447V6.856L23.13 8.292zm2.816 2.012L10.201 18.32l-1.374.7L6 20.463v1.723l2.808-1.43 2.401-1.224 11.61-5.916a6.909 6.909 0 01-10.229 6.93l-.085.045-1.49.76a8.439 8.439 0 0013.372-7.475 1.536 1.536 0 01.833-1.483l.726-.37v-1.718z" />
    </svg>
  );
}

export default function CylinderCardCarousel({
  scale = 1.0,
  className = "absolute inset-0 flex items-center justify-center overflow-visible select-none pointer-events-auto",
}: {
  scale?: number;
  className?: string;
}) {
  const cardCount = 5;
  const containerRef = useRef<HTMLDivElement | null>(null);
  const cardsRefs = useRef<(HTMLDivElement | null)[]>([]);
  const frameId = useRef<number>(0);
  const isHovered = useRef<boolean>(false);

  // Continuous scroll progress
  const progress = useRef<number>(0);

  // Track mouse coordinates for interactive 3D parallax tilt with inertia damping
  const mouse = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  // Responsive state containing card dimensions
  const [metrics, setMetrics] = useState({
    cardW: 320,
    cardH: 201,
  });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const rx = (e.clientX - window.innerWidth / 2) / (window.innerWidth / 2);
      const ry = (e.clientY - window.innerHeight / 2) / (window.innerHeight / 2);
      mouse.current.targetX = Math.max(-1, Math.min(1, rx));
      mouse.current.targetY = Math.max(-1, Math.min(1, ry));
    };

    const handleMouseLeave = () => {
      mouse.current.targetX = 0;
      mouse.current.targetY = 0;
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;

      let cardW = Math.round(w * 0.16 + 110);
      const heightFactor = Math.min(1.0, Math.max(0.65, h / 900));
      cardW = Math.round(cardW * heightFactor);
      cardW = Math.min(340, Math.max(190, cardW));
      const cardH = Math.round(cardW / 1.5925);

      setMetrics({ cardW, cardH });
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Compute positions, rotations, and visual rules at 60fps
  const renderLoop = () => {
    progress.current += isHovered.current ? 0.0006 : 0.0016;

    mouse.current.x += (mouse.current.targetX - mouse.current.x) * 0.08;
    mouse.current.y += (mouse.current.targetY - mouse.current.y) * 0.08;

    const cards = cardsRefs.current;
    const h = window.innerHeight;
    const { cardH } = metrics;

    const continuousProgress = progress.current;
    const roundedIndex = Math.round(continuousProgress);
    const diffFromRound = continuousProgress - roundedIndex;

    const easedDiff =
      (Math.sign(diffFromRound) * Math.pow(Math.abs(diffFromRound) * 2, 4.2)) / 2;
    const virtualActiveIndex = roundedIndex + easedDiff;

    for (let i = 0; i < cardCount; i++) {
      const card = cards[i];
      if (!card) continue;

      let offset = i - virtualActiveIndex;
      const halfCount = cardCount / 2;
      while (offset > halfCount) offset -= cardCount;
      while (offset < -halfCount) offset += cardCount;

      const absOffset = Math.abs(offset);
      const sign = Math.sign(offset);

      if (absOffset > 3.0) {
        card.style.visibility = 'hidden';
        continue;
      } else {
        card.style.visibility = 'visible';
      }

      const gap = 38;
      const peekAmount = -55;
      const D = 1350;

      let y = 0;
      let z = 0;
      let rot = 0;

      if (absOffset <= 1) {
        const t = absOffset;
        const easedT = t * t * (3 - 2 * t);
        const targetY = cardH + gap;
        y = -sign * (easedT * targetY);
        z = 400 + easedT * (220 - 400);
        rot = easedT * 132;
      } else if (absOffset <= 2) {
        const t = absOffset - 1;
        const easedT = t * t * (3 - 2 * t);
        const yStart = cardH + gap;
        const zStart = 220;
        const rotStart = 132;
        const zEnd = -60;
        const rotEnd = 175;

        const sEnd = D / (D - zEnd);
        const yEnd = (h / 2 - peekAmount) / sEnd - cardH / 2;

        const currentY = yStart + easedT * (yEnd - yStart);
        y = -sign * currentY;
        z = zStart + easedT * (zEnd - zStart);
        rot = rotStart + easedT * (rotEnd - rotStart);
      } else {
        const t = Math.min(absOffset - 2, 1);
        const easedT = t * t * (3 - 2 * t);
        const zStart = -60;
        const rotStart = 175;
        const zEnd3 = -250;
        const rotEnd3 = 195;

        const sEnd2 = D / (D - zStart);
        const yEnd2 = (h / 2 - peekAmount) / sEnd2 - cardH / 2;
        const sEnd3 = D / (D - zEnd3);
        const yEnd3 = (h / 2 + 100) / sEnd3 + cardH / 2;

        const currentY = yEnd2 + easedT * (yEnd3 - yEnd2);
        y = -sign * currentY;
        z = zStart + easedT * (zEnd3 - zStart);
        rot = rotStart + easedT * (rotEnd3 - rotStart);
      }

      const localCardRotation = -sign * rot;
      const centerFactor = Math.max(0, 1 - absOffset);

      const maxTiltY = 16;
      const maxTiltX = 12;

      const activeTiltX = -mouse.current.y * maxTiltX * centerFactor;
      const activeTiltY = mouse.current.x * maxTiltY * centerFactor;

      const totalRotX = localCardRotation + activeTiltX;
      const totalRotY = activeTiltY;

      card.style.zIndex = Math.round(z).toString();
      card.style.opacity = '1';
      card.style.transform = `translateY(${y.toFixed(2)}px) translateZ(${z.toFixed(2)}px) rotateX(${totalRotX.toFixed(2)}deg) rotateY(${totalRotY.toFixed(2)}deg) rotateZ(-3deg)`;
    }
  };

  useEffect(() => {
    const tick = () => {
      renderLoop();
      frameId.current = requestAnimationFrame(tick);
    };

    frameId.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId.current);
  }, [metrics]);

  const thicknessLayers = [-1.47, -0.73, 0, 0.73, 1.47];

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => {
        isHovered.current = true;
      }}
      onMouseLeave={() => {
        isHovered.current = false;
      }}
      className={className}
    >
      {/* 3D perspective camera space */}
      <div
        className="relative w-full h-full flex items-center justify-center overflow-visible"
        style={{
          perspective: '1350px',
          transform: scale !== 1.0 ? `scale(${scale})` : undefined,
          transformOrigin: 'center center',
        }}
      >
        {/* Dynamic 3D coordinate viewport */}
        <div
          className="absolute cursor-pointer"
          onClick={() => {
            progress.current += 1.0;
          }}
          style={{
            width: `${metrics.cardW}px`,
            height: `${metrics.cardH}px`,
            transformStyle: 'preserve-3d',
          }}
        >
          {Array.from({ length: cardCount }).map((_, i) => {
            const details = CARD_DETAILS[i % CARD_DETAILS.length];
            const videoSrc = CARD_VIDEOS[i % CARD_VIDEOS.length];

            return (
              <div
                key={i}
                ref={(el) => {
                  cardsRefs.current[i] = el;
                }}
                className="absolute inset-0 transition-shadow duration-300"
                style={{
                  width: `${metrics.cardW}px`,
                  height: `${metrics.cardH}px`,
                  transformStyle: 'preserve-3d',
                  backfaceVisibility: 'visible',
                }}
              >
                {/* Build physical 3D volumetric thickness by dense parallel layering */}
                {thicknessLayers.map((zOffset, layerIdx) => {
                  const isFrontFace = layerIdx === thicknessLayers.length - 1;
                  const isBackFace = layerIdx === 0;
                  const baseBgColor = '#09090b';

                  // Middle structural slice
                  if (!isFrontFace && !isBackFace) {
                    return (
                      <div
                        key={layerIdx}
                        className="absolute inset-0 rounded-[18px] border border-[#52525b] pointer-events-none overflow-hidden"
                        style={{
                          backgroundColor: '#27272a',
                          transform: `translateZ(${zOffset}px)`,
                        }}
                      />
                    );
                  }

                  // FRONT FACE SLICE
                  if (isFrontFace) {
                    return (
                      <div
                        key={layerIdx}
                        className="absolute inset-0 rounded-[18px] border border-white/20 pointer-events-none overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.8)]"
                        style={{
                          backgroundColor: baseBgColor,
                          transform: `translateZ(${zOffset}px)`,
                          backfaceVisibility: 'hidden',
                          boxShadow:
                            'inset 0 1px 2px rgba(255,255,255,0.35), 0 25px 50px -12px rgba(0,0,0,0.9)',
                        }}
                      >
                        {/* Autoplaying High-Resolution Video Texture */}
                        <video
                          src={videoSrc}
                          autoPlay
                          loop
                          muted
                          playsInline
                          className="absolute inset-0 w-full h-full object-cover rounded-[18px] brightness-[0.92] contrast-[1.08]"
                        />

                        {/* Iridescent Light Refraction Glass Gradient */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-black/40 via-transparent to-white/[0.12] mix-blend-overlay pointer-events-none" />

                        {/* Ultra-Premium Card Surface UI */}
                        <div className="absolute inset-0 p-5 sm:p-6 text-white h-full w-full flex flex-col justify-between z-10">
                          {/* TOP BAR: KAMI CARD & EXACT OFFICIAL STELLAR LOGO */}
                          <div className="flex items-start justify-between">
                            {/* Top Left: KAMI CARD Brand Mark */}
                            <div className="flex flex-col">
                              <div className="flex items-center gap-2">
                                <span className="font-display font-light text-base sm:text-lg tracking-[0.16em] text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                                  KAMI
                                </span>
                                <span className="font-mono text-[9px] tracking-[0.25em] px-1.5 py-0.5 rounded bg-white/10 border border-white/20 text-white/90">
                                  CARD
                                </span>
                              </div>
                              <span className="font-mono text-[8px] sm:text-[9px] tracking-[0.18em] text-white/60 mt-0.5">
                                {details.tier}
                              </span>
                            </div>

                            {/* Top Right: EXACT OFFICIAL STELLAR LOGO & TEXT */}
                            <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20 shadow-lg">
                              <StellarLogoSVG className="w-4 h-4 text-white" />
                              <span className="font-mono font-semibold text-[9px] sm:text-[10px] tracking-[0.18em] text-white">
                                STELLAR
                              </span>
                            </div>
                          </div>

                          {/* MIDDLE BAR: CHIP & CONTACTLESS WAVES */}
                          <div className="flex items-center gap-3.5 my-auto pl-0.5">
                            {/* Realistic Silver/Gold EMV Contact Chip */}
                            <div className="relative w-9 h-7 sm:w-11 sm:h-8 rounded-md bg-gradient-to-tr from-[#94a3b8] via-[#cbd5e1] to-[#e2e8f0] p-[1px] shadow-[0_2px_8px_rgba(0,0,0,0.4)]">
                              <div className="w-full h-full rounded-[5px] bg-[#cbd5e1] border border-slate-400/50 flex items-center justify-center relative overflow-hidden">
                                <div className="absolute inset-x-0 top-1/2 h-[1px] bg-slate-500/60" />
                                <div className="absolute inset-y-0 left-1/3 w-[1px] bg-slate-500/60" />
                                <div className="absolute inset-y-0 right-1/3 w-[1px] bg-slate-500/60" />
                                <div className="w-3 h-3 rounded-full border border-slate-500/60" />
                              </div>
                            </div>

                            {/* Contactless NFC Waves */}
                            <svg
                              className="w-4 h-4 sm:w-5 sm:h-5 text-white/70"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                            >
                              <path d="M8.5 16.5a5 5 0 0 1 0-9" />
                              <path d="M12 19a8.5 8.5 0 0 0 0-14" />
                              <path d="M15.5 21.5a12 12 0 0 0 0-19" />
                            </svg>
                          </div>

                          {/* BOTTOM BAR: CARDHOLDER NAME & VISA LOGO */}
                          <div className="flex items-end justify-between">
                            {/* Card Details */}
                            <div className="flex flex-col gap-0.5">
                              <span className="font-mono text-[9px] sm:text-[11px] font-medium tracking-[0.16em] text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)] uppercase">
                                {details.name}
                              </span>
                              <div className="flex items-center gap-2">
                                <span className="font-mono text-[8px] sm:text-[9px] tracking-wider text-cyan-300/90 font-light">
                                  {details.currency}
                                </span>
                              </div>
                            </div>

                            {/* Official VISA Metallic Badge */}
                            <div className="flex flex-col items-end">
                              <div className="text-right">
                                <span className="font-sans font-black italic text-lg sm:text-2xl tracking-tighter text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.8)]">
                                  VISA
                                </span>
                              </div>
                              <span className="font-mono text-[7px] tracking-[0.2em] text-white/60 -mt-1 uppercase">
                                DEBIT
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  }

                  // BACK FACE SLICE
                  if (isBackFace) {
                    return (
                      <div
                        key={layerIdx}
                        className="absolute inset-0 rounded-[18px] border border-white/20 pointer-events-none overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.8)]"
                        style={{
                          backgroundColor: baseBgColor,
                          transform: `translateZ(${zOffset}px) rotateX(180deg)`,
                          backfaceVisibility: 'hidden',
                          boxShadow: 'inset 0 1px 2px rgba(255,255,255,0.25)',
                        }}
                      >
                        {/* 16px Blurred Video Background */}
                        <div
                          className="absolute inset-0 pointer-events-none"
                          style={{ filter: 'blur(16px)', transform: 'scale(1.15)' }}
                        >
                          <video
                            src={videoSrc}
                            autoPlay
                            loop
                            muted
                            playsInline
                            className="absolute inset-0 w-full h-full object-cover brightness-[0.7]"
                          />
                        </div>

                        {/* Magnetic Stripe */}
                        <div className="absolute left-0 right-0 top-4 sm:top-5 h-8 sm:h-10 bg-black/90 backdrop-blur-md z-10 border-y border-white/10" />

                        {/* Back Face Information */}
                        <div className="absolute inset-x-5 sm:inset-x-6 bottom-4 sm:bottom-5 z-20 flex flex-col gap-2">
                          {/* Signature & CVV strip */}
                          <div className="flex items-center justify-between bg-white/90 rounded px-3 py-1.5 text-black">
                            <span className="font-mono text-[8px] text-zinc-500 italic">
                              AUTHORIZED SIGNATURE • NOT VALID UNLESS SIGNED
                            </span>
                            <div className="bg-black/10 px-2 py-0.5 rounded font-mono text-[10px] font-bold tracking-widest text-zinc-900">
                              CVV {details.cvv}
                            </div>
                          </div>

                          {/* Card Number & Network Disclaimer */}
                          <div className="flex items-center justify-between text-left">
                            <div>
                              <div className="font-mono text-[10px] sm:text-[11px] font-semibold tracking-[0.16em] text-white">
                                {details.number}
                              </div>
                              <div className="font-mono text-[7px] text-white/60 tracking-wider mt-0.5">
                                POWERED BY STELLAR SOROBAN SMART CONTRACTS
                              </div>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <StellarLogoSVG className="w-3.5 h-3.5 text-white/80" />
                              <span className="font-display font-light text-sm tracking-widest text-white/90">
                                KAMI
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  }

                  return null;
                })}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
