import React, { useState } from 'react';
import { X, Sparkles, Check, Download, Stamp, ShieldCheck } from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundEffects } from '../utils/audio';

interface PassportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PassportModal: React.FC<PassportModalProps> = ({ isOpen, onClose }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [homeBase, setHomeBase] = useState('');
  const [isGenerated, setIsGenerated] = useState(false);
  const [passportNumber, setPassportNumber] = useState('');
  const [stamps, setStamps] = useState<string[]>(['🇵🇪 CUSCO · SACRED VALLEY']);

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    soundEffects.playStamp();
    const randomNum = `ALP-${Math.floor(1000 + Math.random() * 9000)}-${name.slice(0, 3).toUpperCase()}`;
    setPassportNumber(randomNum);
    setIsGenerated(true);

    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch {
      // Ignored
    }
  };

  const handleAddStamp = (newStamp: string) => {
    soundEffects.playStamp();
    if (!stamps.includes(newStamp)) {
      setStamps([...stamps, newStamp]);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in">
      <div 
        className="bg-[#FAF8F5] w-full max-w-lg rounded-3xl border border-[#DED5C7] shadow-2xl overflow-hidden relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-[#EAE3D6] flex items-center justify-between bg-white">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#E8734A]" />
            <h3 className="font-editorial text-xl font-bold text-[#2B2723]">
              {isGenerated ? 'Official Explorer Passport' : 'Join Paco’s Fluff Club'}
            </h3>
          </div>
          <button
            onClick={() => {
              soundEffects.playPop();
              onClose();
            }}
            className="w-8 h-8 rounded-full bg-[#FAF8F5] hover:bg-[#EFEAE1] flex items-center justify-center text-[#2B2723]"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          {!isGenerated ? (
            <form onSubmit={handleGenerate} className="space-y-4">
              <div className="text-center space-y-2 mb-4">
                <div className="w-14 h-14 rounded-2xl bg-[#FAF0E6] text-2xl flex items-center justify-center mx-auto shadow-xs border border-[#EAD5C7]">
                  🦙
                </div>
                <h4 className="font-editorial text-2xl font-bold text-[#2B2723]">
                  Claim Your Free Digital Passport
                </h4>
                <p className="text-xs text-[#665D52] leading-relaxed max-w-xs mx-auto">
                  Receive Paco’s monthly travel letters, secret shop discounts, and an official digital passport to collect visa stamps!
                </p>
              </div>

              <div>
                <label className="text-xs font-bold text-[#575046] block mb-1">Explorer Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Maya Chen"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-white border border-[#DED5C7] focus:outline-none focus:ring-1 focus:ring-[#E8734A]"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-[#575046] block mb-1">Home Base (City / Country)</label>
                <input
                  type="text"
                  placeholder="e.g. Barcelona, Spain"
                  value={homeBase}
                  onChange={(e) => setHomeBase(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-white border border-[#DED5C7] focus:outline-none focus:ring-1 focus:ring-[#E8734A]"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-[#575046] block mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="wanderer@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-white border border-[#DED5C7] focus:outline-none focus:ring-1 focus:ring-[#E8734A]"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 bg-[#E8734A] text-white font-semibold text-xs rounded-xl hover:bg-[#D55F37] shadow-sm transition-all flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-4 h-4" />
                  Issue My Official Passport
                </button>
              </div>

              <p className="text-[10px] text-center text-[#8C8276]">
                Zero spam. Only cozy stories & postcards from the road. Unsubscribe anytime.
              </p>
            </form>
          ) : (
            /* PASSPORT CARD VISUAL */
            <div className="space-y-6 animate-fade-in">
              <div className="bg-[#1C2833] text-[#F4E8D1] p-6 rounded-2xl border-2 border-[#D4AF37] shadow-xl relative overflow-hidden">
                {/* Gold Crest */}
                <div className="flex justify-between items-start pb-4 border-b border-[#D4AF37]/30">
                  <div>
                    <span className="text-[10px] tracking-widest uppercase font-mono text-[#D4AF37] block">
                      REPUBLIC OF WANDERLUST
                    </span>
                    <h4 className="font-editorial text-lg font-bold text-white tracking-wider">
                      PACO EXPEDITION PASSPORT
                    </h4>
                  </div>
                  <div className="w-10 h-10 rounded-full border border-[#D4AF37] flex items-center justify-center text-lg">
                    🦙
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 pt-4 text-xs font-mono">
                  <div className="col-span-1">
                    <div className="w-20 h-24 rounded-lg bg-[#2C3E50] border border-[#D4AF37]/40 flex flex-col items-center justify-center text-center p-1">
                      <span className="text-3xl">🦙</span>
                      <span className="text-[8px] text-[#D4AF37] mt-1 font-bold">VERIFIED FLUFF</span>
                    </div>
                  </div>

                  <div className="col-span-2 space-y-2 text-[#EAE2D5]">
                    <div>
                      <span className="text-[9px] text-[#85929E] block">PASSPORT NO.</span>
                      <span className="font-bold text-[#F4C056]">{passportNumber}</span>
                    </div>
                    <div>
                      <span className="text-[9px] text-[#85929E] block">SURNAME / GIVEN NAME</span>
                      <span className="font-bold text-white">{name.toUpperCase()}</span>
                    </div>
                    <div>
                      <span className="text-[9px] text-[#85929E] block">HOME HARBOR</span>
                      <span>{homeBase || 'WORLD CITIZEN'}</span>
                    </div>
                    <div>
                      <span className="text-[9px] text-[#85929E] block">EXPIRY DATE</span>
                      <span className="text-[#58D68D]">NEVER (LIFETIME WANDERLUST)</span>
                    </div>
                  </div>
                </div>

                {/* Stamped Visas */}
                <div className="mt-4 pt-3 border-t border-[#D4AF37]/30">
                  <span className="text-[9px] text-[#D4AF37] block font-mono mb-2">OFFICIAL VISA STAMPS:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {stamps.map((s, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 rounded bg-[#2C3E50] text-[#F4C056] text-[9px] font-mono border border-[#D4AF37]/40"
                      >
                        ✓ {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Add more stamps */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-[#2B2723] block">
                  Stamp your passport right now:
                </span>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => handleAddStamp('🇯🇵 KYOTO · SAKURA TEMPLE')}
                    className="px-3 py-1.5 rounded-lg bg-white border border-[#DED5C7] text-xs font-medium hover:bg-[#FAF8F5] flex items-center gap-1"
                  >
                    <Stamp className="w-3.5 h-3.5 text-[#E8734A]" />
                    Stamp Kyoto 🌸
                  </button>
                  <button
                    onClick={() => handleAddStamp('🇮🇹 POSITANO · AMALFI LEMON')}
                    className="px-3 py-1.5 rounded-lg bg-white border border-[#DED5C7] text-xs font-medium hover:bg-[#FAF8F5] flex items-center gap-1"
                  >
                    <Stamp className="w-3.5 h-3.5 text-[#E8734A]" />
                    Stamp Amalfi 🍋
                  </button>
                  <button
                    onClick={() => handleAddStamp('🇫🇷 PARIS · CROISSANT BOULEVARD')}
                    className="px-3 py-1.5 rounded-lg bg-white border border-[#DED5C7] text-xs font-medium hover:bg-[#FAF8F5] flex items-center gap-1"
                  >
                    <Stamp className="w-3.5 h-3.5 text-[#E8734A]" />
                    Stamp Paris 🥐
                  </button>
                </div>
              </div>

              <div className="pt-2 flex justify-between items-center">
                <span className="text-xs text-[#206637] font-semibold flex items-center gap-1">
                  <Check className="w-4 h-4" />
                  Passport Active & Stored!
                </span>
                <button
                  onClick={() => {
                    soundEffects.playPop();
                    onClose();
                  }}
                  className="px-4 py-2 bg-[#2B2723] text-white text-xs font-semibold rounded-xl hover:bg-[#403B35]"
                >
                  Start Exploring
                </button>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
