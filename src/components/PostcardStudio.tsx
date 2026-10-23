import React, { useState } from 'react';
import { Mail, RefreshCw, Stamp, Send, Sparkles, Check, ArrowRight, RotateCw } from 'lucide-react';
import confetti from 'canvas-confetti';
import { pacoImages } from '../assets/images';
import { soundEffects } from '../utils/audio';

export const PostcardStudio: React.FC = () => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<'machu' | 'kyoto' | 'amalfi' | 'paris' | 'alps'>('amalfi');
  const [selectedStamp, setSelectedStamp] = useState<'peru' | 'japan' | 'italy' | 'france'>('italy');
  
  const [recipient, setRecipient] = useState('Best Friend');
  const [sender, setSender] = useState('Wanderer');
  const [message, setMessage] = useState(
    'Greetings from the Amalfi Coast! Paco found a lemon tree twice his height and is refusing to leave the balcony until sunset. Sending you sea breeze and warm hugs!'
  );

  const [sentSuccess, setSentSuccess] = useState(false);

  const photos = {
    machu: { label: 'Machu Picchu Terraces', src: pacoImages.machuPicchu, location: 'Cusco, Peru' },
    kyoto: { label: 'Kyoto Cherry Garden', src: pacoImages.kyoto, location: 'Kyoto, Japan' },
    amalfi: { label: 'Amalfi Lemon Balcony', src: pacoImages.amalfi, location: 'Positano, Italy' },
    paris: { label: 'Parisian Cafe Table', src: pacoImages.paris, location: 'Paris, France' },
    alps: { label: 'Swiss Alpine Valley', src: pacoImages.hero, location: 'Lauterbrunnen, Switzerland' },
  };

  const stamps = {
    peru: { name: 'Peru Inca 50c', color: '#C8452D', icon: '🦙' },
    japan: { name: 'Kyoto Sakura 80¥', color: '#D9738E', icon: '🌸' },
    italy: { name: 'Amalfi Lemon €1.20', color: '#D4A017', icon: '🍋' },
    france: { name: 'Parisian Fleur €1.50', color: '#2B4A6F', icon: '🥐' },
  };

  const handleSendPostcard = () => {
    soundEffects.playStamp();
    setSentSuccess(true);
    try {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.7 }
      });
    } catch {
      // Ignored
    }
    setTimeout(() => setSentSuccess(false), 4000);
  };

  return (
    <section id="postcards" className="py-20 bg-[#FAF8F5] border-b border-[#EAE3D6] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#C85A32] mb-2">
            <Mail className="w-4 h-4" />
            <span>Paco’s Mail Room</span>
          </div>
          <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-bold text-[#2B2723]">
            Digital Postcard Studio
          </h2>
          <p className="text-base text-[#665D52] mt-2">
            Compose and stamp a vintage travel postcard from Paco’s worldwide adventures. Flip the card to write your personal dispatch!
          </p>
        </div>

        {/* Studio Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center max-w-5xl mx-auto">
          
          {/* Left Column: Interactive 3D Flipping Postcard */}
          <div className="lg:col-span-7 flex flex-col items-center">
            
            {/* Postcard Container with 3D perspective */}
            <div className="relative w-full aspect-[3/2] max-w-lg cursor-pointer perspective-1000" onClick={() => {
              soundEffects.playPop();
              setIsFlipped(!isFlipped);
            }}>
              <div 
                className={`w-full h-full duration-500 rounded-2xl polaroid-shadow border border-[#DED5C7] transition-all transform-style-3d relative ${
                  isFlipped ? 'rotate-y-180' : ''
                }`}
                style={{
                  transformStyle: 'preserve-3d',
                  transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
                  transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)'
                }}
              >
                {/* FRONT: PHOTOGRAPHY */}
                <div 
                  className="absolute inset-0 w-full h-full rounded-2xl overflow-hidden bg-white p-3 backface-hidden"
                  style={{ backfaceVisibility: 'hidden' }}
                >
                  <div className="relative w-full h-full rounded-xl overflow-hidden bg-[#EAE3D6]">
                    <img
                      src={photos[selectedPhoto].src}
                      alt={photos[selectedPhoto].label}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    
                    <div className="absolute bottom-4 left-4 right-4 text-white flex justify-between items-end">
                      <div>
                        <span className="text-[11px] font-semibold text-[#F4C056] uppercase tracking-wider block">
                          Paco the Alpaca Expedition Series
                        </span>
                        <h4 className="font-editorial text-xl font-bold leading-tight">
                          {photos[selectedPhoto].location}
                        </h4>
                      </div>
                      <div className="text-[11px] bg-white/20 backdrop-blur-xs px-2 py-1 rounded">
                        Tap to flip card ↺
                      </div>
                    </div>
                  </div>
                </div>

                {/* BACK: WRITING & STAMP */}
                <div 
                  className="absolute inset-0 w-full h-full rounded-2xl overflow-hidden bg-[#FDFBF7] p-5 sm:p-6 backface-hidden border border-[#E0D8CB]"
                  style={{
                    backfaceVisibility: 'hidden',
                    transform: 'rotateY(180deg)'
                  }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="w-full h-full grid grid-cols-12 gap-4">
                    
                    {/* Left: Message Side */}
                    <div className="col-span-7 flex flex-col justify-between border-r border-[#EAE3D6] pr-4">
                      <div>
                        <p className="font-editorial italic text-sm text-[#8C8276]">
                          Dear {recipient || 'Traveler'},
                        </p>
                        <p className="font-editorial text-xs sm:text-sm text-[#332F2A] mt-2 leading-relaxed italic">
                          “{message}”
                        </p>
                      </div>

                      <div className="pt-2">
                        <p className="font-editorial italic text-xs text-[#2B2723] font-semibold">
                          Warm fluffy hugs, <br />
                          {sender || 'Explorer'} & Paco 🦙
                        </p>
                        <span className="text-[9px] text-[#A89F91] uppercase tracking-wider mt-1 block">
                          Dispatched via Alpaca Air Post
                        </span>
                      </div>
                    </div>

                    {/* Right: Stamp & Address */}
                    <div className="col-span-5 flex flex-col justify-between pl-2">
                      {/* Stamp & Postmark */}
                      <div className="flex justify-end relative">
                        {/* Cancellation circular postmark */}
                        <div className="absolute -left-6 top-1 w-14 h-14 rounded-full border border-dashed border-[#A89F91] flex flex-col items-center justify-center text-[8px] font-mono text-[#8C8276] rotate-12 pointer-events-none select-none">
                          <span>POSTED</span>
                          <span>{new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                          <span>AIR MAIL</span>
                        </div>

                        {/* Stamp */}
                        <div 
                          className="w-14 h-16 rounded-md p-1 border-2 border-dashed flex flex-col items-center justify-between text-center shadow-xs"
                          style={{
                            borderColor: stamps[selectedStamp].color,
                            backgroundColor: `${stamps[selectedStamp].color}10`
                          }}
                        >
                          <span className="text-base leading-none mt-1">{stamps[selectedStamp].icon}</span>
                          <span 
                            className="text-[8px] font-bold font-mono tracking-tighter"
                            style={{ color: stamps[selectedStamp].color }}
                          >
                            {stamps[selectedStamp].name}
                          </span>
                        </div>
                      </div>

                      {/* Recipient Lines */}
                      <div className="space-y-3 pb-2 text-[11px] text-[#736B5F]">
                        <div className="border-b border-[#DED5C7] pb-1 font-editorial italic truncate">
                          To: {recipient || 'Someone Special'}
                        </div>
                        <div className="border-b border-[#DED5C7] pb-1 font-editorial italic">
                          Anywhere in the world
                        </div>
                        <div className="border-b border-[#DED5C7] pb-1 font-editorial italic">
                          Earth, The Universe
                        </div>
                      </div>
                    </div>

                  </div>
                </div>

              </div>
            </div>

            {/* Flip hint & controls */}
            <div className="flex items-center gap-3 mt-5">
              <button
                onClick={() => {
                  soundEffects.playPop();
                  setIsFlipped(!isFlipped);
                }}
                className="px-4 py-2.5 rounded-xl bg-white border border-[#DED5C7] text-xs font-semibold text-[#2B2723] hover:bg-[#F2ECE1] transition-colors flex items-center gap-1.5 shadow-xs"
              >
                <RotateCw className="w-3.5 h-3.5 text-[#E8734A]" />
                {isFlipped ? 'View Travel Photo' : 'Flip to Message Side'}
              </button>

              <button
                onClick={handleSendPostcard}
                className="px-5 py-2.5 rounded-xl bg-[#E8734A] text-white text-xs font-semibold hover:bg-[#D55F37] flex items-center gap-1.5 shadow-sm active:scale-95 transition-all"
              >
                <Send className="w-3.5 h-3.5" />
                Stamp & Send Postcard
              </button>
            </div>

            {sentSuccess && (
              <div className="mt-4 p-3 bg-[#EBF5EE] border border-[#B7E0C2] rounded-xl text-xs text-[#206637] flex items-center gap-2 animate-fade-in max-w-sm">
                <Check className="w-4 h-4 shrink-0" />
                <span>Postcard officially dispatched! Virtual dove in transit.</span>
              </div>
            )}

          </div>

          {/* Right Column: Customization Controls */}
          <div className="lg:col-span-5 bg-white p-6 sm:p-7 rounded-3xl border border-[#E0D8CB] shadow-xs space-y-5">
            
            {/* Photo Choice */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-[#736B5F] block mb-2">
                1. Select Paco Travel Photo
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {(Object.keys(photos) as Array<keyof typeof photos>).map((key) => (
                  <button
                    key={key}
                    onClick={() => {
                      soundEffects.playPop();
                      setSelectedPhoto(key);
                      setIsFlipped(false);
                    }}
                    className={`p-2 rounded-xl text-xs font-medium border text-left truncate transition-all ${
                      selectedPhoto === key
                        ? 'bg-[#2B2723] text-white border-[#2B2723] shadow-xs'
                        : 'bg-[#FAF8F5] text-[#4A433A] border-[#E2D9CC] hover:bg-white'
                    }`}
                  >
                    {photos[key].label.split(' ')[0]}
                  </button>
                ))}
              </div>
            </div>

            {/* Stamp Choice */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-[#736B5F] block mb-2">
                2. Select Postage Stamp
              </label>
              <div className="grid grid-cols-2 gap-2">
                {(Object.keys(stamps) as Array<keyof typeof stamps>).map((stKey) => (
                  <button
                    key={stKey}
                    onClick={() => {
                      soundEffects.playPop();
                      setSelectedStamp(stKey);
                    }}
                    className={`p-2 rounded-xl text-xs font-medium border flex items-center gap-2 transition-all ${
                      selectedStamp === stKey
                        ? 'bg-[#E8734A] text-white border-[#E8734A] shadow-xs'
                        : 'bg-[#FAF8F5] text-[#4A433A] border-[#E2D9CC] hover:bg-white'
                    }`}
                  >
                    <span>{stamps[stKey].icon}</span>
                    <span className="truncate">{stamps[stKey].name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Inputs */}
            <div className="space-y-3">
              <div>
                <label className="text-xs font-bold text-[#575046] block mb-1">Recipient Name</label>
                <input
                  type="text"
                  value={recipient}
                  onChange={(e) => setRecipient(e.target.value)}
                  placeholder="e.g. Grandma, Alex, Bestie..."
                  className="w-full px-3 py-2 text-xs rounded-xl bg-[#FAF8F5] border border-[#DED5C7] focus:outline-none focus:ring-1 focus:ring-[#E8734A]"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-[#575046] block mb-1">Your Name</label>
                <input
                  type="text"
                  value={sender}
                  onChange={(e) => setSender(e.target.value)}
                  placeholder="Your Name..."
                  className="w-full px-3 py-2 text-xs rounded-xl bg-[#FAF8F5] border border-[#DED5C7] focus:outline-none focus:ring-1 focus:ring-[#E8734A]"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-[#575046] block mb-1">Postcard Message</label>
                <textarea
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  maxLength={160}
                  className="w-full px-3 py-2 text-xs rounded-xl bg-[#FAF8F5] border border-[#DED5C7] focus:outline-none focus:ring-1 focus:ring-[#E8734A]"
                />
                <span className="text-[10px] text-[#8C8276] text-right block mt-0.5">
                  {message.length} / 160 characters
                </span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
