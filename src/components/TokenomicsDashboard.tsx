import React, { useState } from 'react';
import { Shield, Flame, Lock, CheckCircle2, Copy, Check, Sparkles, ExternalLink } from 'lucide-react';
import confetti from 'canvas-confetti';

interface TokenomicsDashboardProps {
  contractAddress: string;
}

export const TokenomicsDashboard: React.FC<TokenomicsDashboardProps> = ({ contractAddress }) => {
  const [characterInteracted, setCharacterInteracted] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(contractAddress);
    setCopied(true);
    try {
      confetti({ particleCount: 35, spread: 60, origin: { y: 0.6 } });
    } catch {}
    setTimeout(() => setCopied(false), 2000);
  };

  const handleInteract = () => {
    setCharacterInteracted(!characterInteracted);
    try {
      confetti({
        particleCount: 80,
        spread: 90,
        origin: { y: 0.55 },
        colors: ['#8bdbf2', '#f5ba31', '#ff5722']
      });
    } catch {}
  };

  const metrics = [
    { label: "Total Supply", val: "1,000,000,000", sub: "Fixed $PACO Cap", icon: Sparkles, color: "#8bdbf2" },
    { label: "Transaction Tax", val: "0% / 0%", sub: "Zero Buy & Sell Taxes", icon: Shield, color: "#2ecc71" },
    { label: "Liquidity Pool", val: "100% Burned", sub: "Permanent Raydium Lock", icon: Flame, color: "#e74c3c" },
    { label: "Contract Authority", val: "Revoked", sub: "100% Immutable Code", icon: Lock, color: "#f5ba31" },
  ];

  return (
    <section id="tokenomics" className="page__tokenomics tokenomics relative">
      <div className="tokenomics__top-rocks">
        <img src="/img/tokenomics/Rocks.png" alt="Rocks" />
      </div>

      <div className="tokenomics__parallax-box tokenomics-parallax-box">
        <div className="tokenomics-parallax-box__item tokenomics-parallax-box__item--1">
          <img src="/img/tokenomics/BGRocks.png" alt="BGRocks" />
        </div>
        <div className="tokenomics-parallax-box__item tokenomics-parallax-box__item--2">
          <img src="/img/tokenomics/Back.png" alt="Back" />
        </div>
        <div className="tokenomics-parallax-box__item tokenomics-parallax-box__item--3">
          <img src="/img/tokenomics/GrassBlock.png" alt="GrassBlock" />
        </div>
        <div className="tokenomics-parallax-box__item tokenomics-parallax-box__item--4">
          <img src="/img/tokenomics/GlowBack1.png" alt="GlowBack1" />
        </div>
        <div className="tokenomics-parallax-box__item tokenomics-parallax-box__item--5">
          <img src="/img/tokenomics/GlowBack2.png" alt="GlowBack2" />
        </div>

        <div className="tokenomics-parallax-box__item tokenomics-parallax-box__item--6">
          <div className="tokenomics-parallax-box__main">
            
            {/* Title Image */}
            <h2 className="tokenomics-parallax-box__title">
              <img src="/img/tokenomics/Title.png" alt="PACOVERSE" />
            </h2>

            {/* Character Interactive Stage with Spring physics */}
            <div className="tokenomics-parallax-box__character">
              <div 
                className="tokenomics-parallax-box__character-pig"
                style={{ 
                  transform: characterInteracted ? 'scale(1.1) translateY(-10px)' : 'scale(1)', 
                  transition: 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)' 
                }}
              >
                <img src="/img/tokenomics/Pig1.png" alt="PACO" />
              </div>
              <div 
                className="tokenomics-parallax-box__character-light"
                style={{ 
                  opacity: characterInteracted ? 1 : 0.6, 
                  transform: characterInteracted ? 'scale(1.15)' : 'scale(1)',
                  transition: 'all 0.3s' 
                }}
              >
                <img src="/img/tokenomics/Pig2.png" alt="PACO Light" />
              </div>
              <div 
                className="tokenomics-parallax-box__character-diamond"
                style={{ 
                  transform: characterInteracted ? 'rotate(25deg) scale(1.25)' : 'rotate(0deg)', 
                  transition: 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)' 
                }}
              >
                <img src="/img/tokenomics/Pig3.png" alt="PACO Diamond" />
              </div>

              <button 
                type="button" 
                className="tokenomics-parallax-box__character-button"
                onClick={handleInteract}
                aria-label="Click to Interact"
              >
                <img src="/img/tokenomics/b1.svg" alt="Click to Interact" />
                <img src="/img/tokenomics/b2.svg" alt="Click to Interact" />
              </button>
            </div>

            {/* Editorial Content */}
            <div className="tokenomics-parallax-box__content">
              <h3 className="tokenomics-parallax-box__content-title">
                THE HERD GROWS
              </h3>
              <p className="tokenomics-parallax-box__content-text">
                A legend doesn't live through one alpaca alone. It grows with every story shared, every meme created, every laugh, every victory, and every new member who joins the herd. Paco's world is shaped by the people who believe in it, turning a simple story into a legend that keeps growing with every chapter.
              </p>

              {/* Elevated Modern Token Metrics Grid */}
              <div className="mt-8 grid grid-cols-2 lg:grid-cols-4 gap-3 text-left">
                {metrics.map((m, i) => {
                  const Icon = m.icon;
                  return (
                    <div 
                      key={i} 
                      className="bg-[#130b09]/90 backdrop-blur-md p-4 rounded-2xl border border-white/10 hover:border-[#8bdbf2]/50 transition-all shadow-lg"
                    >
                      <div className="flex items-center gap-1.5 text-xs font-mono text-white/50 mb-1">
                        <Icon className="w-3.5 h-3.5" style={{ color: m.color }} />
                        <span>{m.label}</span>
                      </div>
                      <div className="text-xl sm:text-2xl font-black text-white font-mono" style={{ color: m.color }}>
                        {m.val}
                      </div>
                      <span className="text-[11px] font-mono text-white/60 block mt-0.5">
                        {m.sub}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Verified Contract Address Box */}
              <div className="mt-5 bg-[#130b09]/90 backdrop-blur-md p-4 rounded-2xl border border-[#8bdbf2]/30 flex flex-col sm:flex-row items-center justify-between gap-3 text-left">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-mono uppercase text-white/50 block">Official Solana Mint</span>
                    <span className="text-xs sm:text-sm font-mono font-bold text-white break-all">
                      {contractAddress}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={handleCopy}
                    className="px-4 py-2 rounded-xl bg-[#8bdbf2] text-[#130b09] font-black text-xs uppercase tracking-wider flex items-center gap-1.5 hover:brightness-110 active:scale-95 transition-all shadow-md"
                  >
                    {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? 'Copied!' : 'Copy CA'}</span>
                  </button>
                  <a
                    href="https://dexscreener.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors"
                    title="View on DexScreener"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>

            </div>

          </div>
        </div>
      </div>
    </section>
  );
};
