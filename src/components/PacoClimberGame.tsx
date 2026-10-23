import React, { useState } from 'react';
import { Mountain, Trophy, Sparkles, Flame, Shield, ArrowUp, RefreshCw } from 'lucide-react';
import confetti from 'canvas-confetti';

interface PacoClimberGameProps {
  soundEnabled: boolean;
}

export const PacoClimberGame: React.FC<PacoClimberGameProps> = ({ soundEnabled }) => {
  const [altitude, setAltitude] = useState(2400); // Starting altitude in meters (Cusco)
  const [clicks, setClicks] = useState(0);
  const [coins, setCoins] = useState(0);
  const [spitEnergy, setSpitEnergy] = useState(100);
  const [floatingTexts, setFloatingTexts] = useState<{ id: number; text: string; x: number; y: number }[]>([]);

  // Rank thresholds
  const ranks = [
    { title: "Valley Novice", minAlt: 2400, color: "#8bdbf2" },
    { title: "Cliff Stalker", minAlt: 3500, color: "#f5ba31" },
    { title: "Andean Sherpa", minAlt: 5000, color: "#ff8c00" },
    { title: "Cloud Walker", minAlt: 7500, color: "#e74c3c" },
    { title: "Mount Moon Sovereign", minAlt: 10000, color: "#a855f7" },
  ];

  const currentRank = [...ranks].reverse().find(r => altitude >= r.minAlt) || ranks[0];

  const handleClimb = (e: React.MouseEvent<HTMLDivElement>) => {
    const gain = Math.floor(Math.random() * 80) + 50;
    const coinGain = Math.floor(Math.random() * 5) + 1;
    const newAlt = altitude + gain;

    setAltitude(newAlt);
    setClicks(prev => prev + 1);
    setCoins(prev => prev + coinGain);

    // Floating gain text
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = Date.now() + Math.random();

    setFloatingTexts(prev => [...prev.slice(-6), { id, text: `+${gain}m`, x, y }]);
    setTimeout(() => {
      setFloatingTexts(prev => prev.filter(t => t.id !== id));
    }, 800);

    // Confetti on milestone
    if (newAlt >= 10000 && altitude < 10000) {
      try {
        confetti({ particleCount: 100, spread: 80, origin: { y: 0.5 } });
      } catch {}
    }
  };

  const handleReset = () => {
    setAltitude(2400);
    setClicks(0);
    setCoins(0);
  };

  return (
    <section id="climber" className="py-20 bg-gradient-to-b from-[#130b09] via-[#1a0f0d] to-[#130b09] border-y border-white/10 relative overflow-hidden text-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Title */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#f5ba31]/10 border border-[#f5ba31]/30 text-xs font-mono text-[#f5ba31] uppercase tracking-wider mb-2">
            <Mountain className="w-3.5 h-3.5" />
            <span>Interactive Mini-Game</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white">
            Paco’s Mountain Climb
          </h2>
          <p className="text-sm sm:text-base text-white/70 mt-2 font-mono">
            "The alpaca who kept climbing." Tap Paco to scale the peaks, gain altitude, collect diamonds, and achieve Mount Moon status!
          </p>
        </div>

        {/* Game Box */}
        <div className="bg-[#1c120e]/80 backdrop-blur-2xl p-6 sm:p-10 rounded-3xl border border-white/10 shadow-2xl relative overflow-hidden">
          
          {/* Stats Header Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-white/5 p-4 rounded-2xl border border-white/10 text-xs font-mono mb-8">
            <div>
              <span className="text-white/40 block text-[10px] uppercase">Current Altitude</span>
              <span className="text-xl sm:text-2xl font-bold text-[#8bdbf2]">
                {altitude.toLocaleString()} m
              </span>
            </div>
            <div>
              <span className="text-white/40 block text-[10px] uppercase">Herd Rank</span>
              <span className="text-sm sm:text-base font-bold truncate block" style={{ color: currentRank.color }}>
                {currentRank.title}
              </span>
            </div>
            <div>
              <span className="text-white/40 block text-[10px] uppercase">Highland Diamonds</span>
              <span className="text-xl sm:text-2xl font-bold text-[#f5ba31] flex items-center gap-1">
                💎 {coins}
              </span>
            </div>
            <div>
              <span className="text-white/40 block text-[10px] uppercase">Steps Taken</span>
              <span className="text-xl sm:text-2xl font-bold text-emerald-400">
                {clicks}
              </span>
            </div>
          </div>

          {/* Progress Bar to 10,000m */}
          <div className="mb-8">
            <div className="flex justify-between text-xs font-mono text-white/60 mb-1.5">
              <span>Andes Valley Base (2,400m)</span>
              <span>Summit of Mount Moon (10,000m)</span>
            </div>
            <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden p-0.5 border border-white/10">
              <div 
                className="h-full bg-gradient-to-r from-[#8bdbf2] via-[#f5ba31] to-[#e74c3c] rounded-full transition-all duration-300"
                style={{ width: `${Math.min(100, Math.max(5, ((altitude - 2400) / 7600) * 100))}%` }}
              />
            </div>
          </div>

          {/* Interactive Tap Stage */}
          <div 
            onClick={handleClimb}
            className="relative aspect-16/9 sm:aspect-21/9 max-w-xl mx-auto rounded-3xl bg-radial from-[#8bdbf2]/10 via-[#130b09] to-[#130b09] border-2 border-dashed border-[#8bdbf2]/30 flex flex-col items-center justify-center cursor-pointer select-none group active:scale-98 transition-transform overflow-hidden shadow-inner"
          >
            {/* Background Mountain Silhouette */}
            <div className="absolute bottom-0 inset-x-0 h-28 bg-[url('/img/dark/1Row.png')] bg-bottom bg-repeat-x opacity-40 pointer-events-none" />

            {/* Clickable Paco Character with Spring Bounce */}
            <div className="relative z-10 flex flex-col items-center">
              <div className="w-28 h-28 sm:w-36 sm:h-36 group-hover:scale-110 active:scale-90 transition-transform duration-150 filter drop-shadow-[0_15px_15px_rgba(139,219,242,0.3)]">
                <img src="/logo.png" alt="Tap Paco" className="w-full h-full object-contain" />
              </div>

              <div className="mt-3 px-4 py-1.5 rounded-full bg-[#f5ba31] text-[#130b09] font-black text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-lg group-hover:bg-[#ffc107]">
                <ArrowUp className="w-4 h-4 stroke-[3]" />
                <span>TAP TO CLIMB HIGHER</span>
              </div>
            </div>

            {/* Floating Popups */}
            {floatingTexts.map(item => (
              <div
                key={item.id}
                style={{ left: item.x, top: item.y }}
                className="absolute pointer-events-none text-[#8bdbf2] font-black font-mono text-base animate-float-fade"
              >
                {item.text}
              </div>
            ))}
          </div>

          {/* Footer Reset */}
          <div className="mt-6 flex justify-between items-center text-xs font-mono text-white/50">
            <span>Keep clicking to lead the herd above the clouds!</span>
            <button
              onClick={handleReset}
              className="flex items-center gap-1 hover:text-white transition-colors"
            >
              <RefreshCw className="w-3 h-3" />
              Reset Climb
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};
