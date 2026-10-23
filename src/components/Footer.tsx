import React, { useState } from 'react';
import { Heart, Instagram, Mail, ArrowRight, Check, Compass } from 'lucide-react';
import { soundEffects } from '../utils/audio';

export const Footer: React.FC = () => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim()) return;
    soundEffects.playStamp();
    setSubscribed(true);
    setTimeout(() => {
      setSubscribed(false);
      setNewsletterEmail('');
    }, 4000);
  };

  return (
    <footer className="bg-[#2B2723] text-[#F5EFEB] pt-16 pb-12 border-t border-[#3E3832]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-[#3E3832]">
          
          {/* Brand Col */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#FAF8F5]/10 border border-[#FAF8F5]/20 flex items-center justify-center text-xl">
                🦙
              </div>
              <div>
                <span className="font-editorial text-xl font-bold tracking-tight text-white block leading-none">
                  PACO THE ALPACA
                </span>
                <span className="text-[10px] tracking-widest uppercase font-mono text-[#D4AF37] mt-0.5 block">
                  The Fluffy Globetrotter
                </span>
              </div>
            </div>

            <p className="text-xs text-[#B8AEA0] max-w-sm leading-relaxed">
              Inspiring slow travel, curious wanderlust, and gentle living since our first journey across the Peruvian Andes. Exploring history, culture, and pastries worldwide.
            </p>

            <div className="pt-2 flex items-center gap-3 text-xs">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
              >
                <Instagram className="w-3.5 h-3.5 text-[#F4C056]" />
                @its.alpacapaco
              </a>
              <span className="text-[#8C8276]">·</span>
              <span className="text-[#B8AEA0]">#PacoTheAlpaca</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-3 space-y-3">
            <span className="text-xs font-mono font-bold tracking-wider uppercase text-[#D4AF37] block">
              Navigation
            </span>
            <ul className="space-y-2 text-xs text-[#B8AEA0]">
              <li>
                <a href="#expeditions" className="hover:text-white transition-colors">
                  Interactive World Map
                </a>
              </li>
              <li>
                <a href="#stories" className="hover:text-white transition-colors">
                  Field Diaries & Chronicles
                </a>
              </li>
              <li>
                <a href="#shop" className="hover:text-white transition-colors">
                  2026 Calendar & Plush Shop
                </a>
              </li>
              <li>
                <a href="#wardrobe" className="hover:text-white transition-colors">
                  Dress Paco Studio
                </a>
              </li>
              <li>
                <a href="#postcards" className="hover:text-white transition-colors">
                  Digital Postcard Maker
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-white transition-colors">
                  The Origin Story
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter / Postcard Club */}
          <div className="lg:col-span-4 space-y-3">
            <span className="text-xs font-mono font-bold tracking-wider uppercase text-[#D4AF37] block">
              Paco’s Travel Dispatch
            </span>
            <p className="text-xs text-[#B8AEA0] leading-relaxed">
              Subscribe to receive one handwritten digital postcard each month from Paco’s latest coordinates, plus first access to limited calendar drops.
            </p>

            <form onSubmit={handleSubscribe} className="space-y-2 pt-1">
              <div className="flex gap-2">
                <input
                  type="email"
                  required
                  placeholder="Enter your email..."
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="flex-1 px-3 py-2 text-xs rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-1 focus:ring-[#E8734A]"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#E8734A] text-white text-xs font-semibold rounded-xl hover:bg-[#D55F37] transition-colors shrink-0"
                >
                  Join
                </button>
              </div>
              {subscribed && (
                <p className="text-[11px] text-[#58D68D] font-medium flex items-center gap-1">
                  <Check className="w-3 h-3" />
                  Welcome to the travel family! Check your inbox soon.
                </p>
              )}
            </form>
          </div>

        </div>

        {/* Bottom Disclaimer & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#8C8276]">
          <div className="flex items-center gap-1 text-center sm:text-left">
            <span>Crafted with</span>
            <Heart className="w-3 h-3 text-[#E8734A] inline fill-current" />
            <span>for dreamers & wanderers everywhere · pacothealpaca.com</span>
          </div>

          <div className="flex items-center gap-4">
            <span>© {new Date().getFullYear()} Paco the Alpaca. All rights reserved.</span>
            <span>·</span>
            <span>Highland Ethical Guarantee</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
