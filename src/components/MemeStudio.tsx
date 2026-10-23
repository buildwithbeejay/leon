import React, { useState, useRef } from 'react';
import { Sparkles, Download, ArrowLeft, ArrowRight, Image as ImageIcon, Check, RefreshCw } from 'lucide-react';
import confetti from 'canvas-confetti';

export const MemeStudio: React.FC = () => {
  const [activeMemeIndex, setActiveMemeIndex] = useState(0);
  const [selectedTemplate, setSelectedTemplate] = useState('/assets/aistudio/IMG_2491.JPG_9bdd6538.jpeg');
  const [topText, setTopText] = useState('FROM THE CROWD');
  const [bottomText, setBottomText] = useState('TO THE CENTER STAGE');
  const [fontSize, setFontSize] = useState(28);
  const [copiedMeme, setCopiedMeme] = useState(false);

  const memes = [
    "/assets/aistudio/IMG_2491.JPG_9bdd6538.jpeg", // Arcade DEX Swap
    "/assets/aistudio/IMG_2488.JPG_c503fa0a.jpeg", // Solana SOL Orb
    "/assets/aistudio/IMG_2489.JPG_b9e81e03.jpeg", // King Leon
    "/assets/aistudio/IMG_2492.JPG_78a780e0.jpeg", // Flying Hero Cape
    "/assets/aistudio/IMG_2441.JPG_0c6ec739.jpeg", // Sunset Skyline
    "/assets/aistudio/IMG_2440.JPG_9c20416b.jpeg", // Zen Leon Waterfall
    "/assets/aistudio/IMG_2433_1c47d950.PNG",       // Keynote Stage
  ];

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const handleDownloadMeme = () => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = selectedTemplate;
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);

      // Meme Impact font styling
      ctx.fillStyle = '#FFFFFF';
      ctx.strokeStyle = '#000000';
      ctx.lineWidth = Math.max(4, Math.floor(canvas.width / 120));
      ctx.textAlign = 'center';
      ctx.font = `bold ${Math.floor(fontSize * (canvas.width / 500))}px Impact, Arial Black, sans-serif`;

      // Draw Top Text
      if (topText.trim()) {
        ctx.strokeText(topText.toUpperCase(), canvas.width / 2, canvas.height * 0.12);
        ctx.fillText(topText.toUpperCase(), canvas.width / 2, canvas.height * 0.12);
      }

      // Draw Bottom Text
      if (bottomText.trim()) {
        ctx.strokeText(bottomText.toUpperCase(), canvas.width / 2, canvas.height * 0.92);
        ctx.fillText(bottomText.toUpperCase(), canvas.width / 2, canvas.height * 0.92);
      }

      // Download
      const link = document.createElement('a');
      link.download = `paco-meme-${Date.now()}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();

      setCopiedMeme(true);
      try {
        confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });
      } catch {}
      setTimeout(() => setCopiedMeme(false), 2500);
    };
  };

  return (
    <section id="gallery" className="py-20 bg-[#130b09] border-b border-white/10 text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#8bdbf2]/10 border border-[#8bdbf2]/30 text-xs font-mono text-[#8bdbf2] uppercase tracking-wider mb-2">
            <ImageIcon className="w-3.5 h-3.5" />
            <span>Official Vault & Generator</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white">
            Meme Gallery & Studio
          </h2>
          <p className="text-sm sm:text-base text-white/70 mt-2 font-mono">
            Browse high-altitude Paco community memes or forge your own custom propaganda for the herd!
          </p>
        </div>

        {/* Carousel Showcase */}
        <div className="mb-16">
          <div className="relative">
            {/* Slider track */}
            <div className="flex items-center gap-4 overflow-x-auto pb-6 scrollbar-none snap-x">
              {memes.map((m, idx) => (
                <div
                  key={idx}
                  onClick={() => {
                    setActiveMemeIndex(idx);
                    setSelectedTemplate(m);
                  }}
                  className={`snap-center shrink-0 w-64 sm:w-80 rounded-2xl overflow-hidden border-2 cursor-pointer transition-all duration-300 ${
                    selectedTemplate === m
                      ? 'border-[#8bdbf2] shadow-xl shadow-[#8bdbf2]/20 scale-105'
                      : 'border-white/10 opacity-70 hover:opacity-100 hover:border-white/30'
                  }`}
                >
                  <div className="aspect-square bg-black">
                    <img src={m} alt={`Paco Meme ${idx + 1}`} className="w-full h-full object-cover" />
                  </div>
                </div>
              ))}
            </div>

            {/* Slider Nav Buttons */}
            <div className="flex justify-center items-center gap-3 mt-4">
              <button
                onClick={() => {
                  const newIdx = activeMemeIndex > 0 ? activeMemeIndex - 1 : memes.length - 1;
                  setActiveMemeIndex(newIdx);
                  setSelectedTemplate(memes[newIdx]);
                }}
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white border border-white/10 transition-colors"
                aria-label="Previous meme"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>

              <span className="text-xs font-mono text-white/50">
                Template {activeMemeIndex + 1} of {memes.length}
              </span>

              <button
                onClick={() => {
                  const newIdx = (activeMemeIndex + 1) % memes.length;
                  setActiveMemeIndex(newIdx);
                  setSelectedTemplate(memes[newIdx]);
                }}
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white border border-white/10 transition-colors"
                aria-label="Next meme"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Interactive Meme Forge Generator */}
        <div className="bg-[#1c120e]/80 backdrop-blur-xl p-6 sm:p-10 rounded-3xl border border-[#8bdbf2]/20 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Live Meme Preview Canvas Box */}
            <div className="lg:col-span-6 flex flex-col items-center">
              <div className="relative aspect-square w-full max-w-sm rounded-2xl overflow-hidden border-2 border-white/20 shadow-2xl bg-black select-none">
                <img
                  src={selectedTemplate}
                  alt="Meme Template"
                  className="w-full h-full object-cover"
                />

                {/* Top Text Overlay */}
                {topText && (
                  <div className="absolute top-4 inset-x-2 text-center pointer-events-none">
                    <span 
                      className="font-black tracking-wide text-white uppercase break-words block leading-tight"
                      style={{
                        fontSize: `${fontSize}px`,
                        fontFamily: 'Impact, "Sofia Sans Condensed", sans-serif',
                        textShadow: '2px 2px 0 #000, -2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000, 0 4px 8px rgba(0,0,0,0.8)'
                      }}
                    >
                      {topText}
                    </span>
                  </div>
                )}

                {/* Bottom Text Overlay */}
                {bottomText && (
                  <div className="absolute bottom-4 inset-x-2 text-center pointer-events-none">
                    <span 
                      className="font-black tracking-wide text-white uppercase break-words block leading-tight"
                      style={{
                        fontSize: `${fontSize}px`,
                        fontFamily: 'Impact, "Sofia Sans Condensed", sans-serif',
                        textShadow: '2px 2px 0 #000, -2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000, 0 4px 8px rgba(0,0,0,0.8)'
                      }}
                    >
                      {bottomText}
                    </span>
                  </div>
                )}
              </div>

              <div className="mt-4 flex gap-3">
                <button
                  onClick={handleDownloadMeme}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#8bdbf2] to-[#2094f3] text-[#130b09] font-black text-xs uppercase tracking-wider flex items-center gap-2 hover:brightness-110 active:scale-95 transition-all shadow-lg shadow-[#8bdbf2]/20"
                >
                  <Download className="w-4 h-4" />
                  {copiedMeme ? 'Meme Generated & Saved!' : 'Download Custom Meme'}
                </button>
              </div>
            </div>

            {/* Customizer Controls */}
            <div className="lg:col-span-6 space-y-4">
              <div className="flex items-center gap-2 text-[#f5ba31] font-mono text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-4 h-4" />
                <span>Meme Customizer Controls</span>
              </div>

              <div>
                <label className="text-xs font-mono uppercase text-white/60 block mb-1">Top Caption Text</label>
                <input
                  type="text"
                  value={topText}
                  onChange={(e) => setTopText(e.target.value)}
                  placeholder="TOP TEXT..."
                  className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white font-mono text-sm uppercase focus:outline-none focus:border-[#8bdbf2]"
                />
              </div>

              <div>
                <label className="text-xs font-mono uppercase text-white/60 block mb-1">Bottom Caption Text</label>
                <input
                  type="text"
                  value={bottomText}
                  onChange={(e) => setBottomText(e.target.value)}
                  placeholder="BOTTOM TEXT..."
                  className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white font-mono text-sm uppercase focus:outline-none focus:border-[#8bdbf2]"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-mono text-white/60 mb-1">
                  <span>Font Size</span>
                  <span>{fontSize}px</span>
                </div>
                <input
                  type="range"
                  min="18"
                  max="44"
                  value={fontSize}
                  onChange={(e) => setFontSize(Number(e.target.value))}
                  className="w-full accent-[#8bdbf2]"
                />
              </div>

              {/* Quick Preset Ideas */}
              <div>
                <span className="text-xs font-mono uppercase text-white/60 block mb-2">Preset $LEON Captions:</span>
                <div className="flex flex-wrap gap-2">
                  {[
                    { top: 'FROM THE CROWD', btm: 'TO THE CENTER STAGE' },
                    { top: 'BUY & HOLD $LEON', btm: '100% UNSTOPPABLE' },
                    { top: 'SOLANA SPEED', btm: 'DIAMOND CONVICTION' },
                    { top: 'SOLANA IN HAND', btm: 'LEON TO THE MOON' },
                  ].map((preset, i) => (
                    <button
                      key={i}
                      onClick={() => {
                        setTopText(preset.top);
                        setBottomText(preset.btm);
                      }}
                      className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-[11px] font-mono text-white/80 transition-colors"
                    >
                      "{preset.top}..."
                    </button>
                  ))}
                </div>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
