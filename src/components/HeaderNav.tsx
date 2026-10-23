import React, { useState } from 'react';
import { Volume2, VolumeX, Copy, Check, ExternalLink, Menu, X, Flame } from 'lucide-react';
import confetti from 'canvas-confetti';

interface HeaderNavProps {
  soundEnabled: boolean;
  onToggleSound: () => void;
  contractAddress: string;
}

export const HeaderNav: React.FC<HeaderNavProps> = ({
  soundEnabled,
  onToggleSound,
  contractAddress
}) => {
  const [copied, setCopied] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(contractAddress);
    setCopied(true);
    try {
      confetti({ particleCount: 30, spread: 50, origin: { y: 0.2 } });
    } catch {}
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <header className="fixed top-0 inset-x-0 z-50 transition-all duration-300">
      {/* Top Ticker Ribbon */}
      <div className="bg-[#130b09]/90 backdrop-blur-md border-b border-[#8bdbf2]/20 text-[#8bdbf2] text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3 overflow-hidden text-[11px] sm:text-xs">
            <span className="flex items-center gap-1 text-[#f5ba31] font-bold">
              <Flame className="w-3.5 h-3.5 fill-current animate-pulse" />
              <span>$PACO LIVE</span>
            </span>
            <span className="text-[#8bdbf2] font-mono font-bold">$0.00482 SOL</span>
            <span className="text-emerald-400 font-mono font-bold">+24.8% (24H)</span>
            <span className="hidden md:inline text-white/50">·</span>
            <span className="hidden md:inline text-white/80">Solana Network · 100% Fair Launch · 0% Tax</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="hidden sm:flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-white/10 hover:bg-white/20 text-white text-[11px] font-mono transition-colors border border-white/10"
              title="Copy Contract Address"
            >
              {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3 text-[#8bdbf2]" />}
              <span>CA: {contractAddress.slice(0, 4)}...{contractAddress.slice(-4)}</span>
              {copied && <span className="text-emerald-400 font-bold ml-1">Copied!</span>}
            </button>
          </div>
        </div>
      </div>

      {/* Main Glass Navbar */}
      <nav className="bg-[#130b09]/80 backdrop-blur-xl border-b border-white/10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between h-16 sm:h-20">
          
          {/* Logo */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-br from-[#8bdbf2]/30 to-[#f5ba31]/20 border border-[#8bdbf2]/40 p-1 flex items-center justify-center group-hover:scale-105 transition-transform shadow-lg shadow-[#8bdbf2]/10">
              <img src="/logo.png" alt="PACO" className="w-full h-full object-contain drop-shadow" />
            </div>
            <div>
              <span className="font-extrabold tracking-wider text-xl sm:text-2xl text-white block leading-none font-sans group-hover:text-[#8bdbf2] transition-colors">
                PACO
              </span>
              <span className="text-[10px] sm:text-[11px] tracking-widest uppercase font-mono text-[#f5ba31] block mt-0.5">
                The Climber
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-7 text-sm font-bold uppercase tracking-wider text-white/80">
            <a href="#about" className="hover:text-[#8bdbf2] transition-colors">The Valley</a>
            <a href="#story" className="hover:text-[#8bdbf2] transition-colors">The Legend</a>
            <a href="#how" className="hover:text-[#8bdbf2] transition-colors">How to Buy</a>
            <a href="#tokenomics" className="hover:text-[#8bdbf2] transition-colors">Pacoverse</a>
            <a href="#gallery" className="hover:text-[#8bdbf2] transition-colors">Meme Vault</a>
            <a href="#climber" className="hover:text-[#f5ba31] transition-colors flex items-center gap-1 text-[#f5ba31]">
              <span>🎮 Climb Game</span>
            </a>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            {/* Audio Toggle */}
            <button
              onClick={onToggleSound}
              className="p-2 sm:p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-[#8bdbf2] border border-white/10 transition-colors"
              title={soundEnabled ? 'Mute Sounds' : 'Enable Sounds'}
              aria-label="Sound Toggle"
            >
              {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4 opacity-50" />}
            </button>

            {/* Buy $PACO Button */}
            <a
              href="https://t.me/petteryes"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#f5ba31] via-[#ffaa00] to-[#e67e22] text-[#130b09] font-black text-xs sm:text-sm uppercase tracking-wider hover:brightness-110 active:scale-95 transition-all shadow-lg shadow-[#f5ba31]/20 border border-white/20"
            >
              <span>Buy $PACO</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-white hover:text-[#8bdbf2]"
              aria-label="Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </nav>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#130b09]/95 backdrop-blur-2xl border-b border-white/10 p-6 space-y-4">
          <div className="flex flex-col gap-3 font-bold text-base uppercase text-white/90">
            <a href="#about" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#8bdbf2]">The Valley</a>
            <a href="#story" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#8bdbf2]">The Legend</a>
            <a href="#how" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#8bdbf2]">How to Buy</a>
            <a href="#tokenomics" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#8bdbf2]">Pacoverse & Tokenomics</a>
            <a href="#gallery" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#8bdbf2]">Meme Vault</a>
            <a href="#climber" onClick={() => setMobileMenuOpen(false)} className="text-[#f5ba31]">🎮 Paco Climber Mini-Game</a>
          </div>

          <div className="pt-4 border-t border-white/10 flex flex-col gap-3">
            <button
              onClick={handleCopy}
              className="w-full py-2.5 px-3 rounded-xl bg-white/10 text-white text-xs font-mono flex items-center justify-center gap-2 border border-white/10"
            >
              <Copy className="w-4 h-4 text-[#8bdbf2]" />
              <span>CA: {contractAddress}</span>
              {copied && <span className="text-emerald-400 font-bold ml-1">(Copied!)</span>}
            </button>

            <a
              href="https://t.me/petteryes"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-[#f5ba31] to-[#e67e22] text-[#130b09] font-black text-center text-sm uppercase tracking-wider"
            >
              Buy $PACO on Raydium
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
