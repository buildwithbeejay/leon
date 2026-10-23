import React from 'react';
import { Compass, ShoppingBag, Shirt, MapPin, Sparkles, ArrowRight, Heart } from 'lucide-react';
import { pacoImages } from '../assets/images';
import { soundEffects } from '../utils/audio';

interface HeroProps {
  onExploreClick: () => void;
  onShopClick: () => void;
  onWardrobeClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onExploreClick,
  onShopClick,
  onWardrobeClick,
}) => {
  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:pt-14 lg:pb-24 border-b border-[#EAE3D6] bg-gradient-to-b from-[#FAF8F5] via-[#F7F2EA] to-[#FAF8F5]">
      {/* Decorative subtle vintage map contour lines in background */}
      <div 
        aria-hidden="true" 
        className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#2b2723_1px,transparent_1px)] [background-size:24px_24px]"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Editorial Headline & Copy */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Live Status Ticker */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white border border-[#E2D9CC] text-xs text-[#575046] shadow-xs">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="font-semibold text-[#2B2723]">Live Expedition:</span>
              <span className="truncate">Watching sunrise over Lauterbrunnen 🏔️ · Next stop: Kyoto 🍵</span>
            </div>

            {/* Main Title */}
            <div>
              <p className="font-editorial italic text-lg sm:text-xl text-[#C85A32] font-semibold mb-2 flex items-center gap-2">
                <span>¡Hola! I’m Paco the Alpaca</span>
                <span className="inline-block animate-bounce">🦙</span>
              </p>
              <h1 className="font-editorial text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#2B2723] leading-[1.12]">
                The World’s Fluffiest <br className="hidden sm:inline" />
                <span className="underline decoration-[#E8734A] decoration-wavy decoration-from-font underline-offset-8">
                  Globetrotter
                </span>
              </h1>
            </div>

            {/* Description */}
            <p className="text-base sm:text-lg text-[#5F574E] max-w-2xl leading-relaxed">
              From the misty heights of Machu Picchu to the sunlit lemon groves of Positano and historic tea gardens in Kyoto. Welcome to my travel journal, interactive world map, and cozy travel shop—built for slow travelers, dreamers, and wanderers of all sizes.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href="#expeditions"
                onClick={() => {
                  soundEffects.playPop();
                  onExploreClick();
                }}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#E8734A] text-white font-semibold text-sm hover:bg-[#D55F37] shadow-sm hover:shadow-md transition-all active:scale-[0.98]"
              >
                <Compass className="w-4 h-4" />
                Explore World Expeditions
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="#shop"
                onClick={() => {
                  soundEffects.playPop();
                  onShopClick();
                }}
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-white text-[#2B2723] font-semibold text-sm border border-[#DED5C7] hover:bg-[#F5EFEB] transition-all shadow-xs"
              >
                <ShoppingBag className="w-4 h-4 text-[#C85A32]" />
                Paco’s Picks Shop
              </a>

              <a
                href="#wardrobe"
                onClick={() => {
                  soundEffects.playPop();
                  onWardrobeClick();
                }}
                className="inline-flex items-center gap-2 px-4 py-3.5 rounded-xl text-sm font-semibold text-[#665D52] hover:text-[#2B2723] hover:bg-black/5 transition-colors"
              >
                <Shirt className="w-4 h-4 text-[#8C8276]" />
                Dress Paco
              </a>
            </div>

            {/* Editorial Stats - Clean Unboxed Layout with Typographic Separators */}
            <div className="pt-6 border-t border-[#EAE3D6] grid grid-cols-2 sm:grid-cols-4 gap-4 text-[#2B2723]">
              <div>
                <div className="text-2xl font-bold font-editorial text-[#2B2723]">38+</div>
                <div className="text-xs text-[#736B5F] mt-0.5">Countries Explored</div>
              </div>
              <div>
                <div className="text-2xl font-bold font-editorial text-[#2B2723]">14.2k</div>
                <div className="text-xs text-[#736B5F] mt-0.5">Postcards Sent</div>
              </div>
              <div>
                <div className="text-2xl font-bold font-editorial text-[#2B2723]">100%</div>
                <div className="text-xs text-[#736B5F] mt-0.5">Highland Cotton</div>
              </div>
              <div>
                <div className="text-2xl font-bold font-editorial text-[#2B2723]">0%</div>
                <div className="text-xs text-[#736B5F] mt-0.5">Rushing Around</div>
              </div>
            </div>

          </div>

          {/* Right Column: Hero Polaroid Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Main Polaroid Frame */}
              <div className="bg-white p-3.5 sm:p-4 pb-6 sm:pb-8 rounded-2xl polaroid-shadow border border-[#E2D9CC] transform rotate-1 hover:rotate-0 transition-transform duration-300">
                <div className="relative aspect-4/3 sm:aspect-16/10 rounded-xl overflow-hidden bg-[#EFEAE1]">
                  <img
                    src={pacoImages.hero}
                    alt="Paco the Alpaca overlooking the Swiss Alps at sunrise"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                    loading="eager"
                  />
                  <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-xs text-white px-2.5 py-1 rounded-md text-xs font-medium flex items-center gap-1.5">
                    <MapPin className="w-3 h-3 text-[#F4C056]" />
                    Lauterbrunnen, Swiss Alps
                  </div>
                </div>

                {/* Handwritten Style Caption */}
                <div className="mt-4 px-2 flex items-center justify-between">
                  <div>
                    <p className="font-editorial italic text-base sm:text-lg text-[#2B2723] font-medium">
                      “Alpine sunrise, backpack packed, zero plans.”
                    </p>
                    <p className="text-xs text-[#8C8276] mt-0.5">
                      Paco’s Expedition Log · Altitude 1,608m
                    </p>
                  </div>
                  <div className="w-10 h-10 rounded-full border border-dashed border-[#C85A32] flex items-center justify-center text-[10px] text-[#C85A32] font-mono rotate-12 shrink-0">
                    PASSED
                  </div>
                </div>
              </div>

              {/* Floating Mini Stamp Accent */}
              <div className="absolute -bottom-4 -left-4 bg-[#FAF8F5] p-3 rounded-xl border border-[#DED5C7] shadow-md max-w-[210px] hidden sm:flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#E8734A]/10 text-[#E8734A] flex items-center justify-center shrink-0">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div className="text-xs">
                  <span className="font-semibold block text-[#2B2723]">Alpaca Wisdom #42</span>
                  <span className="text-[#736B5F] text-[11px] leading-tight block">Never skip an alpine bakery when the bell rings.</span>
                </div>
              </div>

              {/* Floating Instagram Tag */}
              <div className="absolute -top-3 -right-3 bg-white/95 backdrop-blur-xs px-3 py-1.5 rounded-lg border border-[#E2D9CC] shadow-sm flex items-center gap-2 text-xs text-[#575046]">
                <span className="text-rose-500 font-bold">♥</span>
                <span>Join <strong>85k+</strong> travelers on IG</span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
