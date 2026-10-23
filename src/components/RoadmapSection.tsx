import React from 'react';
import { Flag, CheckCircle, Compass, Mountain, Sparkles } from 'lucide-react';

export const RoadmapSection: React.FC = () => {
  const phases = [
    {
      phase: "BASECAMP 1",
      title: "THE VALLEY EXPEDITION",
      status: "COMPLETED",
      items: [
        "Stealth Fair Launch on Solana",
        "100% Raydium LP Permanently Burned",
        "Mint Authority Revoked",
        "First 2,500 Dedicated Herd Members",
        "Initial Viral Alpaca Meme Blitz"
      ]
    },
    {
      phase: "BASECAMP 2",
      title: "ANDEAN RIDGE CLIMB",
      status: "IN PROGRESS",
      items: [
        "CoinGecko & CoinMarketCap Fast-Track",
        "DEXTools & DexScreener Community Trending",
        "Paco Meme Forge & Community Contests",
        "Partnerships with Top Solana Ecosystem Projects",
        "Reach 10,000 Mountain Climbers"
      ]
    },
    {
      phase: "BASECAMP 3",
      title: "THE CLOUDLINE SUMMIT",
      status: "UPCOMING",
      items: [
        "Tier 2 & Tier 1 Centralized Exchange Listings",
        "Official Paco Plushie & Merch Drop",
        "Animated YouTube & TikTok Lore Series",
        "Charity Donation to Andean Alpaca Preserves",
        "25,000+ Strong Global Herd"
      ]
    },
    {
      phase: "THE SUMMIT",
      title: "MOUNT MOON ASCENSION",
      status: "UPCOMING",
      items: [
        "Major Global Brand Collaborations",
        "Paco World Tour IRL Meetups",
        "Solana Meme Top 10 Dominance",
        "Fluffiest Culture Movement in Web3"
      ]
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-[#130b09] via-[#180e0c] to-[#130b09] border-b border-white/10 text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#f5ba31]/10 border border-[#f5ba31]/30 text-xs font-mono text-[#f5ba31] uppercase tracking-wider mb-2">
            <Mountain className="w-3.5 h-3.5" />
            <span>The Ascent Path</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white">
            Ascent Roadmap
          </h2>
          <p className="text-sm sm:text-base text-white/70 mt-2 font-mono">
            Every mountain has its stages. We never stop climbing until we reach the summit of Mount Moon.
          </p>
        </div>

        {/* Timeline Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {phases.map((p, idx) => (
            <div
              key={idx}
              className={`p-6 rounded-3xl border transition-all relative overflow-hidden flex flex-col justify-between ${
                p.status === 'COMPLETED'
                  ? 'bg-[#1c120e] border-emerald-500/40 shadow-lg shadow-emerald-500/5'
                  : p.status === 'IN PROGRESS'
                  ? 'bg-[#1c120e] border-[#f5ba31] shadow-xl shadow-[#f5ba31]/10 ring-1 ring-[#f5ba31]/30'
                  : 'bg-[#160d0b] border-white/10 opacity-80'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-mono font-bold tracking-widest text-[#8bdbf2]">
                    {p.phase}
                  </span>
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full font-bold ${
                    p.status === 'COMPLETED'
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                      : p.status === 'IN PROGRESS'
                      ? 'bg-[#f5ba31]/20 text-[#f5ba31] border border-[#f5ba31]/40 animate-pulse'
                      : 'bg-white/10 text-white/50'
                  }`}>
                    {p.status}
                  </span>
                </div>

                <h3 className="text-lg font-black uppercase text-white mb-4">
                  {p.title}
                </h3>

                <ul className="space-y-2.5 text-xs text-white/70 font-mono">
                  {p.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className={p.status === 'COMPLETED' ? 'text-emerald-400 font-bold' : 'text-[#f5ba31]'}>
                        {p.status === 'COMPLETED' ? '✓' : '✦'}
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-white/40">
                <span>Milestone {idx + 1}/4</span>
                <span>{p.status === 'COMPLETED' ? '100% Cleared' : p.status === 'IN PROGRESS' ? 'Active Target' : 'Target Locked'}</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
