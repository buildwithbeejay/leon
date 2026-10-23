import React from 'react';
import { Heart, Instagram, Compass, Sparkles, ShieldCheck, Globe2, ArrowRight } from 'lucide-react';
import { soundEffects } from '../utils/audio';
import { pacoImages } from '../assets/images';

interface AboutSectionProps {
  onOpenFluffClub: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onOpenFluffClub }) => {
  const instagramMoments = [
    { image: pacoImages.hero, caption: 'Watching morning fog burn off over the Swiss Alps #PacoTheAlpaca', likes: '3.4k' },
    { image: pacoImages.machuPicchu, caption: 'Reunited with the Andean herd at 2,400m altitude! 🇵🇪', likes: '4.8k' },
    { image: pacoImages.kyoto, caption: 'Matcha bowls & cherry blossoms in Arashiyama 🌸', likes: '2.9k' },
    { image: pacoImages.amalfi, caption: 'When life gives you Amalfi, order lemon granita 🍋', likes: '5.1k' },
  ];

  return (
    <section id="about" className="py-20 bg-[#FAF8F5] border-b border-[#EAE3D6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Origin Story */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
          
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#C85A32]">
              <Heart className="w-4 h-4" />
              <span>The Origin Story</span>
            </div>

            <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-bold text-[#2B2723] leading-tight">
              A Tiny Highland Traveler With a Giant Heart
            </h2>

            <p className="text-base text-[#575046] leading-relaxed">
              Paco’s journey began in a cobblestone artisan alley in Cusco, Peru. Handcrafted from highland organic cotton by master Quechua weavers, he was tucked into a solo traveler’s daypack on a whim during a high-altitude trek across the Sacred Valley.
            </p>

            <p className="text-sm text-[#575046] leading-relaxed">
              What started as a lighthearted travel photo series quickly blossomed into a worldwide community of wanderers, solo explorers, and dreamers. Today, Paco has traveled across 38+ countries, inspiring people everywhere to travel slower, stay endlessly curious, and never take themselves too seriously.
            </p>

            {/* Three Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-white border border-[#E0D8CB] space-y-1">
                <span className="text-base font-bold text-[#2B2723] block">Slow Travel</span>
                <span className="text-xs text-[#736B5F]">Less rushing between landmarks, more lingering at cafes.</span>
              </div>
              <div className="p-4 rounded-2xl bg-white border border-[#E0D8CB] space-y-1">
                <span className="text-base font-bold text-[#2B2723] block">Highland Roots</span>
                <span className="text-xs text-[#736B5F]">5% of all proceeds support Peruvian artisan weavers.</span>
              </div>
              <div className="p-4 rounded-2xl bg-white border border-[#E0D8CB] space-y-1">
                <span className="text-base font-bold text-[#2B2723] block">Universal Wonder</span>
                <span className="text-xs text-[#736B5F]">Finding magic in both ancient temples and warm pastries.</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => {
                  soundEffects.playPop();
                  onOpenFluffClub();
                }}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#2B2723] text-white font-semibold text-xs hover:bg-[#403B35] transition-all shadow-xs"
              >
                <Sparkles className="w-4 h-4 text-[#F4C056]" />
                Join the Fluff Club & Claim Digital Passport
              </button>
            </div>
          </div>

          <div className="lg:col-span-6 relative">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="rounded-2xl overflow-hidden aspect-4/5 border border-[#DED5C7] polaroid-shadow">
                  <img src={pacoImages.paris} alt="Paco in Paris" className="w-full h-full object-cover" />
                </div>
                <div className="p-4 rounded-2xl bg-[#FAF0E6] border border-[#EAD5C7] text-xs text-[#A64A26]">
                  <span className="font-bold block mb-1">“Travel is not about distance.”</span>
                  <span>“It is about how wide your eyes open to the beauty right in front of you.” — Paco 🦙</span>
                </div>
              </div>

              <div className="space-y-4 pt-8">
                <div className="rounded-2xl overflow-hidden aspect-4/5 border border-[#DED5C7] polaroid-shadow">
                  <img src={pacoImages.machuPicchu} alt="Paco in Machu Picchu" className="w-full h-full object-cover" />
                </div>
                <div className="p-4 rounded-2xl bg-white border border-[#DED5C7] text-xs text-[#575046]">
                  <span className="font-bold text-[#2B2723] block mb-0.5">38 Countries & Counting</span>
                  <span className="text-[#8C8276]">Always carry-on size. Never checked baggage.</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Community Instagram Feed (@its.alpacapaco) */}
        <div className="pt-16 border-t border-[#EAE3D6]">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#C85A32] mb-1">
                <Instagram className="w-4 h-4" />
                <span>Community & Global Family</span>
              </div>
              <h3 className="font-editorial text-2xl sm:text-3xl font-bold text-[#2B2723]">
                Wandering with Paco: @its.alpacapaco
              </h3>
            </div>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#2B2723] hover:text-[#E8734A] transition-colors"
            >
              Follow @its.alpacapaco on Instagram <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {instagramMoments.map((moment, idx) => (
              <div
                key={idx}
                className="bg-white p-3 rounded-2xl border border-[#E0D8CB] hover:border-[#C85A32] transition-all hover:shadow-md group"
              >
                <div className="relative aspect-square rounded-xl overflow-hidden bg-[#FAF8F5] mb-2.5">
                  <img
                    src={moment.image}
                    alt={moment.caption}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  <div className="absolute bottom-2 left-2 bg-black/60 backdrop-blur-xs text-white text-[10px] font-semibold px-2 py-0.5 rounded flex items-center gap-1">
                    <span>♥</span> {moment.likes}
                  </div>
                </div>
                <p className="text-[11px] text-[#575046] line-clamp-2 leading-tight">
                  {moment.caption}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
