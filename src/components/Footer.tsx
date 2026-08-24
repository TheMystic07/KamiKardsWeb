import React from 'react';
import Link from 'next/link';
import { StellarLogoSVG } from '@/components/CylinderCardCarousel';

export default function Footer() {
  return (
    <footer className="w-full border-t border-white/10 bg-black/60 backdrop-blur-lg text-white py-12 px-6 sm:px-12 z-20 relative">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-10">
        {/* Brand & Mission */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <StellarLogoSVG className="w-5 h-5 text-white" />
            <span className="font-display font-light text-xl tracking-[0.16em] text-white">
              KAMI
            </span>
            <span className="font-mono text-[10px] tracking-[0.2em] text-zinc-400">
              KARDS
            </span>
          </div>
          <p className="text-zinc-400 text-xs font-mono max-w-sm font-light">
            The non-custodial crypto neobank on Stellar. Spend USDC &amp; XLM globally on Visa.
          </p>
        </div>

        {/* Quick Links */}
        <div className="flex flex-wrap gap-x-8 gap-y-3 font-mono text-xs text-zinc-400">
          <Link href="/cards" className="hover:text-white transition-colors">
            Cards Studio
          </Link>
          <Link href="/stellar" className="hover:text-white transition-colors">
            Stellar Core
          </Link>
          <Link href="/soroban" className="hover:text-white transition-colors">
            Soroban Vaults
          </Link>
          <Link href="/security" className="hover:text-white transition-colors">
            Security &amp; Audits
          </Link>
          <Link href="/contact" className="hover:text-white transition-colors">
            Contact Support
          </Link>
        </div>
      </div>

      {/* Legal & Trademark */}
      <div className="max-w-7xl mx-auto pt-6 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-[11px] font-sans text-zinc-500">
        <p>
          © 2026 Kami Kards Inc. Built on Stellar. Visa® is a registered trademark of Visa International Service Association.
        </p>
        <div className="flex gap-4">
          <Link href="/privacy" className="hover:text-zinc-300 underline underline-offset-2">
            Privacy Notice
          </Link>
          <Link href="/terms" className="hover:text-zinc-300 underline underline-offset-2">
            Service Contract
          </Link>
        </div>
      </div>
    </footer>
  );
}
