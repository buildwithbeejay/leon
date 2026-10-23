import React, { useState, useEffect } from 'react';
import { MapPin, Compass, Star, Utensils, Mountain, Calendar, Check, Bookmark, X, ArrowUpRight, Share2 } from 'lucide-react';
import { Destination } from '../types';
import { soundEffects } from '../utils/audio';

interface WorldExpeditionMapProps {
  destinations: Destination[];
  onSelectStoryByLocation?: (locationName: string) => void;
}

export const WorldExpeditionMap: React.FC<WorldExpeditionMapProps> = ({
  destinations,
  onSelectStoryByLocation
}) => {
  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null);
  const [activeFilter, setActiveFilter] = useState<'all' | 'americas' | 'europe' | 'asia'>('all');
  const [bucketList, setBucketList] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('paco_bucket_list');
      return saved ? JSON.parse(saved) : ['machu-picchu'];
    } catch {
      return ['machu-picchu'];
    }
  });

  const [checkedPackItems, setCheckedPackItems] = useState<Record<string, boolean>>({});

  useEffect(() => {
    try {
      localStorage.setItem('paco_bucket_list', JSON.stringify(bucketList));
    } catch {
      // Ignored
    }
  }, [bucketList]);

  const toggleBucketList = (id: string) => {
    soundEffects.playStamp();
    setBucketList((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const filteredDestinations = destinations.filter((dest) => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'americas') return dest.country === 'Peru';
    if (activeFilter === 'europe') return ['Italy', 'France', 'Switzerland'].includes(dest.country);
    if (activeFilter === 'asia') return dest.country === 'Japan';
    return true;
  });

  // Calculate pin coordinates on visual 2D projection map (SVG 1000 x 500)
  const getMapCoordinates = (lat: number, lng: number) => {
    // Equirectangular projection mapping to 1000x520
    const x = ((lng + 180) * (1000 / 360));
    const y = (((-1 * lat) + 90) * (520 / 180));
    return { x, y };
  };

  return (
    <section id="expeditions" className="py-20 bg-[#FAF8F5] border-b border-[#EAE3D6] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#C85A32] mb-2">
              <Compass className="w-4 h-4" />
              <span>Interactive Field Map</span>
            </div>
            <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-bold text-[#2B2723]">
              Paco’s World Expeditions
            </h2>
            <p className="text-base text-[#665D52] mt-2 max-w-2xl">
              Tap any pin across the continents to inspect Paco’s field notes, fluffiness ratings, local snacks, and secret alpaca advice.
            </p>
          </div>

          {/* Region Filter Buttons */}
          <div className="flex items-center gap-1 p-1 bg-[#EFEAE1] rounded-xl self-start md:self-auto border border-[#E0D8CB]">
            {(
              [
                { id: 'all', label: 'All Continents' },
                { id: 'americas', label: 'Americas' },
                { id: 'europe', label: 'Europe' },
                { id: 'asia', label: 'Asia' },
              ] as const
            ).map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  soundEffects.playPop();
                  setActiveFilter(tab.id);
                }}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                  activeFilter === tab.id
                    ? 'bg-white text-[#2B2723] shadow-xs'
                    : 'text-[#665D52] hover:text-[#2B2723]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Visual Map Canvas Card */}
        <div className="relative w-full rounded-2xl bg-[#EFEAE1]/70 border border-[#DED5C7] overflow-hidden p-4 sm:p-8 shadow-xs mb-10">
          
          {/* Compass Rose Accent */}
          <div className="absolute top-4 right-4 hidden sm:flex flex-col items-center opacity-40 pointer-events-none">
            <span className="text-[10px] font-mono font-bold">N</span>
            <div className="w-8 h-8 rounded-full border border-dashed border-[#2B2723] flex items-center justify-center text-xs">
              ✦
            </div>
            <span className="text-[10px] font-mono font-bold">S</span>
          </div>

          {/* Stylized Minimal World SVG Map */}
          <div className="relative w-full aspect-[2/1] min-h-[300px] flex items-center justify-center">
            
            {/* World Continents Vector Representation */}
            <svg
              viewBox="0 0 1000 520"
              className="w-full h-full text-[#D4CBBF] fill-current select-none"
              aria-label="Interactive world map"
            >
              {/* Latitude & Longitude grid lines */}
              <g stroke="#E3DBD0" strokeWidth="0.8" strokeDasharray="3 3">
                <line x1="0" y1="130" x2="1000" y2="130" />
                <line x1="0" y1="260" x2="1000" y2="260" />
                <line x1="0" y1="390" x2="1000" y2="390" />
                <line x1="250" y1="0" x2="250" y2="520" />
                <line x1="500" y1="0" x2="500" y2="520" />
                <line x1="750" y1="0" x2="750" y2="520" />
              </g>

              {/* Simplified world silhouette paths */}
              {/* North America */}
              <path d="M120 90 Q180 70 260 80 Q290 120 280 180 Q220 230 190 260 Q170 240 140 180 Q100 130 120 90 Z" />
              {/* South America */}
              <path d="M220 280 Q290 280 320 330 Q330 400 290 460 Q260 490 250 440 Q210 360 220 280 Z" />
              {/* Europe */}
              <path d="M470 90 Q540 80 570 120 Q560 180 500 200 Q460 170 470 90 Z" />
              {/* Africa */}
              <path d="M460 210 Q560 210 570 290 Q560 380 510 430 Q470 380 440 290 Q440 230 460 210 Z" />
              {/* Asia */}
              <path d="M580 80 Q760 70 850 140 Q840 250 750 280 Q650 270 590 210 Q580 140 580 80 Z" />
              {/* Australia */}
              <path d="M780 340 Q860 330 880 380 Q860 440 800 440 Q760 410 780 340 Z" />
              {/* Japan Island Arc */}
              <path d="M860 160 Q880 180 870 210 Q855 220 860 160 Z" />
              {/* UK / Iceland */}
              <circle cx="440" cy="120" r="12" />
              <circle cx="410" cy="70" r="10" />
            </svg>

            {/* Clickable Destination Pins overlaying on map */}
            {filteredDestinations.map((dest) => {
              const { x, y } = getMapCoordinates(dest.lat, dest.lng);
              const isSelected = selectedDestination?.id === dest.id;
              const isSaved = bucketList.includes(dest.id);

              return (
                <div
                  key={dest.id}
                  style={{
                    left: `${(x / 1000) * 100}%`,
                    top: `${(y / 520) * 100}%`,
                  }}
                  className="absolute transform -translate-x-1/2 -translate-y-full cursor-pointer group z-10"
                  onClick={() => {
                    soundEffects.playPop();
                    setSelectedDestination(dest);
                  }}
                >
                  {/* Pin container */}
                  <div className="relative flex flex-col items-center">
                    
                    {/* Hover label tooltip */}
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none absolute -top-8 whitespace-nowrap bg-[#2B2723] text-white text-[11px] font-semibold px-2 py-0.5 rounded shadow-md flex items-center gap-1 z-30">
                      <span>{dest.flag}</span>
                      <span>{dest.name}</span>
                    </div>

                    {/* Animated Pulsing Ring */}
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-transform ${
                      isSelected ? 'scale-125' : 'group-hover:scale-110'
                    }`}>
                      <span className="animate-ping absolute inline-flex h-6 w-6 rounded-full bg-[#E8734A] opacity-40"></span>
                      <div className={`w-7 h-7 rounded-full flex items-center justify-center shadow-md border-2 ${
                        isSelected 
                          ? 'bg-[#2B2723] text-white border-white scale-110' 
                          : isSaved 
                          ? 'bg-[#E8734A] text-white border-white' 
                          : 'bg-white text-[#E8734A] border-[#E8734A]'
                      }`}>
                        <span className="text-xs">🦙</span>
                      </div>
                    </div>

                    {/* Pin tail */}
                    <div className="w-1.5 h-1.5 bg-[#2B2723] rotate-45 -mt-1 shadow-xs" />
                  </div>
                </div>
              );
            })}

          </div>

          <div className="mt-4 pt-4 border-t border-[#DED5C7]/60 flex flex-wrap items-center justify-between gap-4 text-xs text-[#736B5F]">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-[#E8734A] inline-block"></span>
                <span>Paco’s Expedition Stop</span>
              </span>
              <span className="flex items-center gap-1.5">
                <Bookmark className="w-3 h-3 text-[#E8734A]" />
                <span>Saved to your Bucket List ({bucketList.length})</span>
              </span>
            </div>
            <span className="font-mono text-[11px]">Projections updated for 2026 Season</span>
          </div>

        </div>

        {/* Destination Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDestinations.map((dest) => {
            const isSaved = bucketList.includes(dest.id);

            return (
              <div
                key={dest.id}
                onClick={() => {
                  soundEffects.playPop();
                  setSelectedDestination(dest);
                }}
                className="bg-white rounded-2xl border border-[#E0D8CB] overflow-hidden hover:border-[#C85A32] hover:shadow-lg transition-all duration-300 flex flex-col cursor-pointer group"
              >
                {/* Image Header */}
                <div className="relative aspect-16/10 overflow-hidden bg-[#EFEAE1]">
                  <img
                    src={dest.thumbnail}
                    alt={`${dest.name} with Paco`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute top-3 left-3 bg-[#FAF8F5]/90 backdrop-blur-xs px-2.5 py-1 rounded-md text-xs font-semibold text-[#2B2723] flex items-center gap-1.5 shadow-xs">
                    <span>{dest.flag}</span>
                    <span>{dest.country}</span>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleBucketList(dest.id);
                    }}
                    title={isSaved ? 'Remove from Bucket List' : 'Save to Bucket List'}
                    className={`absolute top-3 right-3 p-2 rounded-full transition-transform active:scale-90 ${
                      isSaved
                        ? 'bg-[#E8734A] text-white shadow-md'
                        : 'bg-white/80 hover:bg-white text-[#736B5F]'
                    }`}
                  >
                    <Bookmark className="w-4 h-4" />
                  </button>

                  <div className="absolute bottom-3 left-3 right-3 bg-black/60 backdrop-blur-xs text-white px-2.5 py-1 rounded-md text-[11px] flex items-center justify-between">
                    <span className="truncate">{dest.coordinatesLabel}</span>
                    <span className="font-semibold">{dest.elevation}</span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-editorial text-xl font-bold text-[#2B2723] group-hover:text-[#E8734A] transition-colors">
                      {dest.name}
                    </h3>
                    <p className="text-xs text-[#8C8276] mt-0.5 font-medium">{dest.tagline}</p>
                    <p className="text-sm text-[#575046] mt-3 line-clamp-2 leading-relaxed">
                      {dest.diarySnippet}
                    </p>
                  </div>

                  <div className="mt-5 pt-4 border-t border-[#F0EBE1] flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1 text-[#C85A32] font-semibold">
                      <Star className="w-3.5 h-3.5 fill-current" />
                      <span>Fluff Score: {dest.fluffRating}/5</span>
                    </div>

                    <span className="font-medium text-[#2B2723] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                      Inspect Notes <ArrowUpRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Detail Slide-Over Modal */}
      {selectedDestination && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-fade-in">
          <div 
            className="bg-[#FAF8F5] w-full max-w-3xl rounded-3xl border border-[#DED5C7] shadow-2xl overflow-hidden relative max-h-[90vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header Image */}
            <div className="relative aspect-16/9 sm:aspect-21/9 bg-[#2B2723] shrink-0">
              <img
                src={selectedDestination.heroImage}
                alt={selectedDestination.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              <button
                onClick={() => {
                  soundEffects.playPop();
                  setSelectedDestination(null);
                }}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/80 transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="absolute bottom-4 left-6 right-6 text-white">
                <div className="flex items-center gap-2 text-xs font-semibold text-[#F4C056] uppercase tracking-wider mb-1">
                  <span>{selectedDestination.flag}</span>
                  <span>{selectedDestination.country}</span>
                  <span>·</span>
                  <span>{selectedDestination.coordinatesLabel}</span>
                </div>
                <h3 className="font-editorial text-2xl sm:text-3xl font-bold">
                  {selectedDestination.name}
                </h3>
              </div>
            </div>

            {/* Modal Scrollable Body */}
            <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
              
              {/* Quick Specs Pill Row */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-[#F2ECE1] p-3.5 rounded-xl text-xs text-[#2B2723]">
                <div>
                  <span className="text-[#8C8276] block text-[11px]">Best Season</span>
                  <span className="font-semibold">{selectedDestination.season}</span>
                </div>
                <div>
                  <span className="text-[#8C8276] block text-[11px]">Elevation</span>
                  <span className="font-semibold">{selectedDestination.elevation}</span>
                </div>
                <div>
                  <span className="text-[#8C8276] block text-[11px]">Fluff Rating</span>
                  <span className="font-semibold text-[#C85A32]">★★★★★ {selectedDestination.fluffRating}.0</span>
                </div>
                <div>
                  <span className="text-[#8C8276] block text-[11px]">Favorite Snack</span>
                  <span className="font-semibold truncate block" title={selectedDestination.favoriteSnack}>
                    {selectedDestination.favoriteSnack}
                  </span>
                </div>
              </div>

              {/* Paco’s Field Journal */}
              <div>
                <h4 className="font-editorial text-lg font-bold text-[#2B2723] mb-2 flex items-center gap-2">
                  <span>Paco’s Field Journal</span>
                  <span className="text-xs font-sans font-normal text-[#8C8276]">· Dispatch #048</span>
                </h4>
                <div className="text-sm text-[#4A433A] leading-relaxed whitespace-pre-line bg-white p-5 rounded-2xl border border-[#E2D9CC] shadow-xs">
                  {selectedDestination.fullDiary}
                </div>
              </div>

              {/* Paco’s Alpaca Tip Callout */}
              <div className="bg-[#FAF0E6] border-l-4 border-[#E8734A] p-4 rounded-r-xl">
                <h5 className="text-xs font-bold uppercase tracking-wider text-[#A64A26] mb-1">
                  🦙 Paco’s Secret Alpaca Advice
                </h5>
                <p className="text-sm text-[#574B40] leading-snug">
                  {selectedDestination.pacoTip}
                </p>
              </div>

              {/* Packing Essentials Checklist */}
              <div>
                <h4 className="font-editorial text-lg font-bold text-[#2B2723] mb-2">
                  Paco’s Packing Essentials
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {selectedDestination.packingList.map((item, idx) => {
                    const isChecked = checkedPackItems[`${selectedDestination.id}-${idx}`];
                    return (
                      <button
                        key={idx}
                        onClick={() => {
                          soundEffects.playPop();
                          setCheckedPackItems((prev) => ({
                            ...prev,
                            [`${selectedDestination.id}-${idx}`]: !isChecked,
                          }));
                        }}
                        className={`text-left p-3 rounded-xl border text-xs font-medium flex items-center gap-2.5 transition-colors ${
                          isChecked
                            ? 'bg-[#EBF5EE] border-[#B7E0C2] text-[#206637] line-through'
                            : 'bg-white border-[#E0D8CB] text-[#4A433A] hover:bg-[#FAF8F5]'
                        }`}
                      >
                        <div className={`w-4 h-4 rounded flex items-center justify-center border shrink-0 ${
                          isChecked ? 'bg-[#206637] border-[#206637] text-white' : 'border-[#B8AFA2]'
                        }`}>
                          {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>
                        <span>{item}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Footer Actions */}
              <div className="pt-4 border-t border-[#EAE3D6] flex flex-wrap items-center justify-between gap-3">
                <button
                  onClick={() => toggleBucketList(selectedDestination.id)}
                  className={`px-4 py-2.5 rounded-xl font-semibold text-xs flex items-center gap-2 transition-all ${
                    bucketList.includes(selectedDestination.id)
                      ? 'bg-[#E8734A] text-white'
                      : 'bg-white border border-[#DED5C7] text-[#2B2723] hover:bg-[#F2ECE1]'
                  }`}
                >
                  <Bookmark className="w-4 h-4" />
                  {bucketList.includes(selectedDestination.id) ? 'Saved in Bucket List' : 'Save to Bucket List'}
                </button>

                <button
                  onClick={() => {
                    soundEffects.playPop();
                    setSelectedDestination(null);
                  }}
                  className="px-5 py-2.5 rounded-xl bg-[#2B2723] text-white font-semibold text-xs hover:bg-[#403B35] transition-colors"
                >
                  Back to World Map
                </button>
              </div>

            </div>

          </div>
        </div>
      )}

    </section>
  );
};
