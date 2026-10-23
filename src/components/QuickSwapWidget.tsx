import React, { useState } from 'react';
import { ArrowDownUp, Zap, Check, ExternalLink, ShieldAlert, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

interface QuickSwapWidgetProps {
  contractAddress: string;
}

export const QuickSwapWidget: React.FC<QuickSwapWidgetProps> = ({ contractAddress }) => {
  const [solAmount, setSolAmount] = useState('1');
  const [slippage, setSlippage] = useState('0.5%');
  const [isSwapping, setIsSwapping] = useState(false);
  const [swapComplete, setSwapComplete] = useState(false);

  const solPriceInUSD = 184.5;
  const pacoPerSol = 207468; // Simulated exchange rate

  const parsedSol = parseFloat(solAmount) || 0;
  const pacoReceived = Math.round(parsedSol * pacoPerSol);
  const usdValue = (parsedSol * solPriceInUSD).toFixed(2);

  const handleSimulatedSwap = () => {
    setIsSwapping(true);
    setTimeout(() => {
      setIsSwapping(false);
      setSwapComplete(true);
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch {}
      setTimeout(() => setSwapComplete(false), 4000);
    }, 1200);
  };

  return (
    <div className="bg-[#1c120e]/90 backdrop-blur-xl p-5 sm:p-7 rounded-3xl border border-[#8bdbf2]/30 shadow-2xl shadow-black/80 max-w-md w-full mx-auto text-white">
      
      {/* Widget Header */}
      <div className="flex items-center justify-between pb-4 border-b border-white/10">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-[#8bdbf2]/20 border border-[#8bdbf2]/40 p-1 flex items-center justify-center">
            <Zap className="w-4 h-4 text-[#8bdbf2]" />
          </div>
          <div>
            <h3 className="text-base font-extrabold uppercase tracking-wider text-white">
              Instant $PACO Swap
            </h3>
            <span className="text-[11px] font-mono text-[#8bdbf2]">Raydium / Jupiter Routing</span>
          </div>
        </div>

        <div className="flex items-center gap-1 bg-white/5 border border-white/10 px-2 py-1 rounded-lg text-xs font-mono text-white/70">
          <span>Slip: {slippage}</span>
        </div>
      </div>

      {/* From: SOL */}
      <div className="mt-5 space-y-2">
        <div className="flex justify-between text-xs text-white/60 font-medium">
          <span>You Pay</span>
          <span>Balance: 12.45 SOL</span>
        </div>
        <div className="bg-[#130b09] p-3.5 rounded-2xl border border-white/10 flex items-center justify-between focus-within:border-[#8bdbf2] transition-colors">
          <div className="flex-1 mr-3">
            <input
              type="number"
              min="0.01"
              step="0.1"
              value={solAmount}
              onChange={(e) => setSolAmount(e.target.value)}
              className="w-full bg-transparent text-2xl font-bold font-mono text-white focus:outline-none"
              placeholder="0.0"
            />
            <span className="text-xs text-white/40 font-mono">≈ ${usdValue} USD</span>
          </div>
          <div className="flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-xl border border-white/10 shrink-0 font-bold text-sm">
            <span className="w-5 h-5 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 flex items-center justify-center text-[10px]">
              ◎
            </span>
            <span>SOL</span>
          </div>
        </div>
      </div>

      {/* Switch Arrow */}
      <div className="flex justify-center -my-2.5 relative z-10">
        <div className="w-8 h-8 rounded-full bg-[#8bdbf2] text-[#130b09] flex items-center justify-center shadow-md border-2 border-[#1c120e]">
          <ArrowDownUp className="w-4 h-4" />
        </div>
      </div>

      {/* To: $PACO */}
      <div className="space-y-2">
        <div className="flex justify-between text-xs text-white/60 font-medium">
          <span>You Receive (Estimated)</span>
          <span className="text-[#f5ba31] font-mono">1 SOL = 207,468 $PACO</span>
        </div>
        <div className="bg-[#130b09] p-3.5 rounded-2xl border border-white/10 flex items-center justify-between">
          <div className="flex-1 mr-3">
            <div className="text-2xl font-bold font-mono text-[#8bdbf2] truncate">
              {pacoReceived.toLocaleString()}
            </div>
            <span className="text-xs text-emerald-400 font-mono">0% Tax · No Transfer Fee</span>
          </div>
          <div className="flex items-center gap-2 bg-[#8bdbf2]/20 border border-[#8bdbf2]/40 px-3 py-1.5 rounded-xl shrink-0 font-bold text-sm text-[#8bdbf2]">
            <img src="/logo.png" alt="PACO" className="w-5 h-5 object-contain" />
            <span>$PACO</span>
          </div>
        </div>
      </div>

      {/* Slippage & Info */}
      <div className="mt-4 p-3 rounded-xl bg-white/5 border border-white/10 text-[11px] font-mono text-white/70 space-y-1">
        <div className="flex justify-between">
          <span>Network Fee:</span>
          <span className="text-white font-semibold">~0.00005 SOL ($0.01)</span>
        </div>
        <div className="flex justify-between">
          <span>Price Impact:</span>
          <span className="text-emerald-400 font-semibold">&lt; 0.05%</span>
        </div>
        <div className="flex justify-between">
          <span>Liquidity Pool:</span>
          <span className="text-[#f5ba31] font-semibold">100% Raydium Burned</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-5 space-y-2.5">
        <button
          onClick={handleSimulatedSwap}
          disabled={isSwapping || parsedSol <= 0}
          className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-[#f5ba31] via-[#ffaa00] to-[#e67e22] text-[#130b09] font-black text-sm uppercase tracking-wider hover:brightness-110 active:scale-98 transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#f5ba31]/20 disabled:opacity-50"
        >
          {isSwapping ? (
            <span className="inline-flex items-center gap-2">
              <span className="w-4 h-4 border-2 border-[#130b09] border-t-transparent rounded-full animate-spin"></span>
              Broadcasting to Solana...
            </span>
          ) : (
            <span className="inline-flex items-center gap-2">
              <Sparkles className="w-4 h-4 fill-current" />
              Swap for {pacoReceived.toLocaleString()} $PACO
            </span>
          )}
        </button>

        <a
          href="https://t.me/petteryes"
          target="_blank"
          rel="noopener noreferrer"
          className="w-full py-2.5 px-4 rounded-xl bg-white/10 text-white hover:bg-white/15 text-xs font-bold uppercase tracking-wider text-center flex items-center justify-center gap-1.5 transition-colors"
        >
          <span>Open Direct on Raydium Exchange</span>
          <ExternalLink className="w-3.5 h-3.5 text-[#8bdbf2]" />
        </a>
      </div>

      {swapComplete && (
        <div className="mt-4 p-3 bg-emerald-500/20 border border-emerald-500/40 rounded-xl text-center text-xs font-mono text-emerald-300 flex items-center justify-center gap-2 animate-fade-in">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>Success! {pacoReceived.toLocaleString()} $PACO added to herd balance!</span>
        </div>
      )}

    </div>
  );
};
