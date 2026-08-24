'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CosmicBackground from '@/components/CosmicBackground';
import { StellarLogoSVG } from '@/components/CylinderCardCarousel';

const FAQS = [
  {
    q: 'How do I fund my Kami Visa card?',
    a: 'You can fund your card instantly by transferring USDC or XLM directly from any Stellar wallet (such as Lobstr, Freighter, or any exchange) into your non-custodial Kami vault address. Settlements complete in under 3.5 seconds with virtually zero network fee.',
  },
  {
    q: 'Where can I spend my Kami card?',
    a: 'Anywhere Visa is accepted worldwide — across more than 40 million merchants in 180+ countries. Your card automatically handles currency conversion at point of sale with 0% foreign exchange fees.',
  },
  {
    q: 'Are my funds custodial or non-custodial?',
    a: 'Kami Kards is 100% non-custodial. Your funds reside directly inside Soroban smart contracts on the Stellar blockchain. Only your cryptographically signed authorizations can release funds for card settlements.',
  },
  {
    q: 'How does the 5.2% USDC yield work?',
    a: 'Idle USDC in your smart vault is automatically routed through audited Stellar on-chain yield strategies. Earnings compound continuously every 3.5 seconds and remain 100% liquid for immediate card spending.',
  },
  {
    q: 'How long does physical card delivery take?',
    a: 'Virtual cards are issued instantly in less than 3.5 seconds and can be added directly to Apple Pay or Google Wallet. Physical metal cards ship via expedited DHL/FedEx within 2-3 business days worldwide.',
  },
];

export default function ContactPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setFormSubmitted(true);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white relative flex flex-col justify-between">
      <CosmicBackground />
      <Navbar />

      <main className="max-w-7xl mx-auto px-6 sm:px-12 py-12 w-full">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/[0.08] border border-white/15 text-white font-mono text-[10px] tracking-widest uppercase mb-4">
            <StellarLogoSVG className="w-3.5 h-3.5 text-cyan-400" />
            <span>24/7 SUPPORT &amp; CONCIERGE</span>
          </div>
          <h1 className="font-display font-light text-4xl sm:text-6xl tracking-tight text-white mb-4">
            We are here to help.
          </h1>
          <p className="text-zinc-400 text-sm font-sans font-light leading-relaxed">
            Have questions about your card allocation, Stellar smart vaults, or VIP concierge service? Connect with our dedicated engineering and support team.
          </p>
        </div>

        {/* Contact Form & Channels Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-24">
          {/* Left Column: Direct Message Form */}
          <div className="lg:col-span-6 p-8 rounded-2xl bg-white/[0.03] border border-white/15">
            <h3 className="font-display font-light text-2xl text-white mb-2">
              Send an Inquiry
            </h3>
            <p className="text-zinc-400 text-xs font-sans mb-6">
              Our support team typically responds within 15 minutes.
            </p>

            {formSubmitted ? (
              <div className="p-6 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-center my-8">
                <span className="text-3xl block mb-2">✓</span>
                <h4 className="font-mono text-sm font-semibold text-emerald-300 mb-1">
                  Message Dispatched to Kami Support
                </h4>
                <p className="text-xs text-zinc-300 font-sans">
                  We received your message and will reply to {email} shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div>
                  <label className="font-mono text-[10px] text-zinc-400 block mb-1">YOUR NAME</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Satoshi Nakamoto"
                    className="w-full bg-white/[0.05] border border-white/15 rounded-xl px-4 py-2.5 font-mono text-xs text-white outline-none focus:border-cyan-400"
                  />
                </div>

                <div>
                  <label className="font-mono text-[10px] text-zinc-400 block mb-1">EMAIL ADDRESS</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@stellar.org"
                    className="w-full bg-white/[0.05] border border-white/15 rounded-xl px-4 py-2.5 font-mono text-xs text-white outline-none focus:border-cyan-400"
                  />
                </div>

                <div>
                  <label className="font-mono text-[10px] text-zinc-400 block mb-1">MESSAGE OR INQUIRY</label>
                  <textarea
                    rows={4}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="How can we assist you with Kami Kards?"
                    className="w-full bg-white/[0.05] border border-white/15 rounded-xl px-4 py-2.5 font-mono text-xs text-white outline-none focus:border-cyan-400 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-white text-black font-semibold rounded-xl text-xs font-mono hover:bg-zinc-200 transition-all shadow-lg mt-2"
                >
                  Transmit Message →
                </button>
              </form>
            )}
          </div>

          {/* Right Column: Global Channels & Concierge */}
          <div className="lg:col-span-6 flex flex-col gap-6">
            <div className="p-8 rounded-2xl bg-white/[0.03] border border-white/10">
              <span className="font-mono text-xs text-cyan-400 block mb-2">DIRECT COMMUNITY</span>
              <h3 className="font-display font-light text-xl text-white mb-4">
                Official Channels
              </h3>

              <div className="flex flex-col gap-3">
                <a
                  href="https://discord.com"
                  target="_blank"
                  rel="noreferrer"
                  className="p-4 rounded-xl bg-white/[0.02] border border-white/10 hover:bg-white/[0.06] transition-all flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xl">💬</span>
                    <div>
                      <span className="font-mono text-xs text-white block">Discord Developer Community</span>
                      <span className="text-[11px] text-zinc-400">Join 24,000+ Stellar &amp; Kami cardholders</span>
                    </div>
                  </div>
                  <span className="font-mono text-xs text-zinc-400">Join →</span>
                </a>

                <a
                  href="https://x.com"
                  target="_blank"
                  rel="noreferrer"
                  className="p-4 rounded-xl bg-white/[0.02] border border-white/10 hover:bg-white/[0.06] transition-all flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xl">𝕏</span>
                    <div>
                      <span className="font-mono text-xs text-white block">X / Twitter (@KamiKards)</span>
                      <span className="text-[11px] text-zinc-400">Product updates, releases &amp; giveaways</span>
                    </div>
                  </div>
                  <span className="font-mono text-xs text-zinc-400">Follow →</span>
                </a>

                <a
                  href="https://t.me"
                  target="_blank"
                  rel="noreferrer"
                  className="p-4 rounded-xl bg-white/[0.02] border border-white/10 hover:bg-white/[0.06] transition-all flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xl">✈️</span>
                    <div>
                      <span className="font-mono text-xs text-white block">Telegram Announcements</span>
                      <span className="text-[11px] text-zinc-400">Instant broadcast for new Soroban vault pools</span>
                    </div>
                  </div>
                  <span className="font-mono text-xs text-zinc-400">Join →</span>
                </a>
              </div>
            </div>

            <div className="p-8 rounded-2xl bg-gradient-to-tr from-cyan-950/40 via-zinc-900/60 to-black border border-cyan-500/20">
              <span className="font-mono text-xs text-cyan-300 block mb-1">VIP METAL CARD CONCIERGE</span>
              <h4 className="font-display font-light text-lg text-white mb-2">
                Dedicated 24/7 WhatsApp &amp; Telegram Line
              </h4>
              <p className="text-xs text-zinc-400 font-sans leading-relaxed">
                Obsidian Metal and Stellar Founder cardholders receive direct access to our private banking desk for custom credit limits and urgent international card replacement.
              </p>
            </div>
          </div>
        </div>

        {/* FAQ Accordion Section */}
        <div className="max-w-3xl mx-auto mb-24">
          <div className="text-center mb-8">
            <span className="font-mono text-[10px] tracking-widest text-cyan-400 uppercase">
              FREQUENTLY ASKED QUESTIONS
            </span>
            <h2 className="font-display font-light text-3xl text-white mt-1">
              Everything you need to know
            </h2>
          </div>

          <div className="flex flex-col gap-3">
            {FAQS.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="rounded-xl bg-white/[0.03] border border-white/10 overflow-hidden transition-all"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 font-mono text-xs font-semibold text-white hover:text-cyan-300"
                  >
                    <span>{faq.q}</span>
                    <span className="text-zinc-400 text-base">{isOpen ? '−' : '+'}</span>
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 text-xs text-zinc-300 font-sans font-light leading-relaxed border-t border-white/5 pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
