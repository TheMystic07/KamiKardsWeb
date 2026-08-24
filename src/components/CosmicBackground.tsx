'use client';

import React, { useEffect, useRef } from 'react';

export default function CosmicBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Generate Stellar Network Validator Nodes
    const nodeCount = Math.min(65, Math.floor((width * height) / 22000));
    const nodes: {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      alpha: number;
      pulseSpeed: number;
      color: string;
    }[] = [];

    const colors = [
      'rgba(0, 240, 255, ',   // Cyan
      'rgba(59, 130, 246, ',  // Blue
      'rgba(255, 255, 255, ', // White
      'rgba(147, 51, 234, ',  // Violet
    ];

    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        radius: Math.random() * 1.6 + 0.8,
        alpha: Math.random() * 0.6 + 0.2,
        pulseSpeed: Math.random() * 0.02 + 0.008,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    let time = 0;

    const render = () => {
      time += 0.01;
      ctx.clearRect(0, 0, width, height);

      // Draw constellation connections between nearby nodes
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 130) {
            const alpha = (1 - dist / 130) * 0.12;
            ctx.strokeStyle = `rgba(0, 240, 255, ${alpha})`;
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }

      // Update and draw nodes
      for (const node of nodes) {
        node.x += node.vx;
        node.y += node.vy;

        if (node.x < 0) node.x = width;
        if (node.x > width) node.x = 0;
        if (node.y < 0) node.y = height;
        if (node.y > height) node.y = 0;

        const dynamicAlpha = Math.abs(Math.sin(time * node.pulseSpeed * 10)) * 0.4 + 0.2;

        // Outer glow
        ctx.fillStyle = `${node.color}${dynamicAlpha * 0.3})`;
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius * 2.8, 0, Math.PI * 2);
        ctx.fill();

        // Core star point
        ctx.fillStyle = `${node.color}${dynamicAlpha})`;
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none z-[-1] overflow-hidden bg-[#000000]">
      {/* 1. Deep Space Ambient Nebula Glows */}
      <div className="absolute top-[-20%] left-[-10%] w-[65vw] h-[65vw] max-w-[900px] max-h-[900px] rounded-full bg-[radial-gradient(circle_at_center,rgba(0,240,255,0.09)_0%,rgba(43,127,255,0.04)_45%,transparent_70%)] blur-[90px]" />
      <div className="absolute bottom-[-15%] right-[5%] w-[55vw] h-[55vw] max-w-[750px] max-h-[750px] rounded-full bg-[radial-gradient(circle_at_center,rgba(157,78,221,0.07)_0%,rgba(0,240,255,0.03)_50%,transparent_70%)] blur-[100px]" />
      <div className="absolute top-[40%] left-[25%] w-[40vw] h-[40vw] max-w-[600px] max-h-[600px] rounded-full bg-[radial-gradient(circle_at_center,rgba(37,99,235,0.06)_0%,transparent_70%)] blur-[120px]" />

      {/* 2. Micro Dot Grid Infrastructure Matrix */}
      <div
        className="absolute inset-0 opacity-[0.14]"
        style={{
          backgroundImage:
            'radial-gradient(rgba(255, 255, 255, 0.4) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />

      {/* 3. Subtle Cyber Horizon Lines */}
      <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />

      {/* 4. Canvas Stellar Validator Constellation Nodes */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      {/* 5. Vignette & Edge Shadows */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,rgba(0,0,0,0.85)_100%)]" />
    </div>
  );
}
