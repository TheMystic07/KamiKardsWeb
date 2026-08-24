'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { StellarLogoSVG } from '@/components/CylinderCardCarousel';
import DownloadModal from '@/components/DownloadModal';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [downloadModalOpen, setDownloadModalOpen] = useState(false);
  const pathname = usePathname();

  const closeMenu = useCallback(() => {
    setMenuOpen(false);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && menuOpen) {
        closeMenu();
      }
    };

    const handleResize = () => {
      if (window.innerWidth >= 901 && menuOpen) {
        closeMenu();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('resize', handleResize);
    };
  }, [menuOpen, closeMenu]);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [menuOpen]);

  const navLinks = [
    { name: 'Cards', href: '/cards' },
    { name: 'Stellar Core', href: '/stellar' },
    { name: 'Soroban Vaults', href: '/soroban' },
    { name: 'Security', href: '/security' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <>
      <header className="navbar">
        <Link href="/" className="nav__logo flex items-center gap-2.5 group" aria-label="KAMI Home">
          <StellarLogoSVG className="w-5 h-5 text-white group-hover:scale-110 transition-transform" />
          <span className="font-display font-light text-2xl tracking-[0.16em] text-white">
            KAMI
          </span>
          <span className="font-mono text-[10px] tracking-[0.24em] text-zinc-400 font-normal">
            KARDS
          </span>
        </Link>

        <div className="nav__cluster">
          <nav className="nav__links" aria-label="Primary">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`nav__link transition-colors ${
                    isActive ? 'text-white border-b border-cyan-400 pb-0.5' : 'text-zinc-300 hover:text-white'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          <button
            type="button"
            onClick={() => setDownloadModalOpen(true)}
            className="nav__cta flex items-center gap-2"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            <span>Download App</span>
          </button>

          <button
            type="button"
            className={`burger ${menuOpen ? 'is-active' : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-expanded={menuOpen}
            aria-controls="mobileMenu"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          >
            <span className="burger__bar" />
            <span className="burger__bar" />
            <span className="burger__bar" />
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <nav
        id="mobileMenu"
        className={`mobile-menu ${menuOpen ? 'is-open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
        aria-hidden={!menuOpen}
        onClick={(e) => {
          if (e.target === e.currentTarget) closeMenu();
        }}
      >
        <ul className="mobile-menu__list">
          <li className="mobile-menu__item" style={{ '--i': 0 } as React.CSSProperties}>
            <Link href="/" className="mobile-menu__link" onClick={closeMenu}>
              Home
            </Link>
          </li>
          {navLinks.map((item, i) => (
            <li
              key={item.name}
              className="mobile-menu__item"
              style={{ '--i': i + 1 } as React.CSSProperties}
            >
              <Link href={item.href} className="mobile-menu__link" onClick={closeMenu}>
                {item.name}
              </Link>
            </li>
          ))}
          <li
            className="mobile-menu__item"
            style={{ '--i': navLinks.length + 1 } as React.CSSProperties}
          >
            <button
              onClick={() => {
                closeMenu();
                setDownloadModalOpen(true);
              }}
              className="mobile-menu__cta flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              <span>Download Mobile App</span>
            </button>
          </li>
        </ul>
      </nav>

      {/* Download Modal */}
      <DownloadModal isOpen={downloadModalOpen} onClose={() => setDownloadModalOpen(false)} />
    </>
  );
}
