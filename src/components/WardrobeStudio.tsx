import React, { useState, useRef } from 'react';
import { Shirt, Camera, Sparkles, RefreshCw, Download, Check, MapPin } from 'lucide-react';
import { WardrobeOptions } from '../types';
import { soundEffects } from '../utils/audio';
import { pacoImages } from '../assets/images';

export const WardrobeStudio: React.FC = () => {
  const [options, setOptions] = useState<WardrobeOptions>({
    hat: 'chullo',
    glasses: 'sunglasses',
    accessory: 'scarf',
    background: 'alps'
  });

  const [caption, setCaption] = useState('Paco exploring the high peaks!');
  const [isFlashing, setIsFlashing] = useState(false);
  const [snapshotTaken, setSnapshotTaken] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);

  const backgroundImages: Record<WardrobeOptions['background'], { label: string; src: string; location: string }> = {
    alps: { label: 'Swiss Alps', src: pacoImages.hero, location: 'Lauterbrunnen, Switzerland' },
    machu: { label: 'Machu Picchu', src: pacoImages.machuPicchu, location: 'Cusco, Peru' },
    kyoto: { label: 'Kyoto Temples', src: pacoImages.kyoto, location: 'Kyoto, Japan' },
    amalfi: { label: 'Amalfi Coast', src: pacoImages.amalfi, location: 'Positano, Italy' },
    paris: { label: 'Parisian Bistro', src: pacoImages.paris, location: 'Montmartre, France' },
  };

  const handleTakeSnapshot = () => {
    soundEffects.playCameraClick();
    setIsFlashing(true);
    setTimeout(() => {
      setIsFlashing(false);
      setSnapshotTaken(true);
      soundEffects.playSuccess();
    }, 250);
  };

  const handleRandomize = () => {
    soundEffects.playPop();
    const hats: WardrobeOptions['hat'][] = ['none', 'chullo', 'beret', 'safari', 'beanie', 'straw'];
    const glasses: WardrobeOptions['glasses'][] = ['none', 'aviators', 'sunglasses', 'glasses'];
    const accessories: WardrobeOptions['accessory'][] = ['none', 'scarf', 'poncho', 'backpack', 'camera', 'baguette'];
    const backgrounds: WardrobeOptions['background'][] = ['alps', 'machu', 'kyoto', 'amalfi', 'paris'];

    setOptions({
      hat: hats[Math.floor(Math.random() * hats.length)],
      glasses: glasses[Math.floor(Math.random() * glasses.length)],
      accessory: accessories[Math.floor(Math.random() * accessories.length)],
      background: backgrounds[Math.floor(Math.random() * backgrounds.length)],
    });
  };

  const handleCopyLink = () => {
    soundEffects.playPop();
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2500);
  };

  return (
    <section id="wardrobe" className="py-20 bg-[#FAF8F5] border-b border-[#EAE3D6] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#C85A32] mb-2">
            <Shirt className="w-4 h-4" />
            <span>Interactive Travel Wardrobe</span>
          </div>
          <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-bold text-[#2B2723]">
            Dress Paco For His Next Journey
          </h2>
          <p className="text-base text-[#665D52] mt-2">
            Style Paco with travel gear, pick an iconic expedition backdrop, write your custom field caption, and snap a souvenir polaroid!
          </p>
        </div>

        {/* Studio Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center max-w-5xl mx-auto">
          
          {/* Left Column: Interactive Avatar & Polaroid Preview */}
          <div className="lg:col-span-7 flex flex-col items-center">
            
            {/* The Polaroid Card */}
            <div className="relative bg-white p-4 sm:p-5 pb-8 sm:pb-10 rounded-2xl polaroid-shadow border border-[#E0D8CB] w-full max-w-md transition-all duration-300">
              
              {/* Camera Flash Overlay */}
              {isFlashing && (
                <div className="absolute inset-0 bg-white z-30 rounded-2xl animate-ping opacity-90" />
              )}

              {/* Viewport Frame */}
              <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-[#E8E2D5] border border-[#DDD4C4] flex items-center justify-center">
                
                {/* Background Image */}
                <img
                  src={backgroundImages[options.background].src}
                  alt={backgroundImages[options.background].label}
                  className="absolute inset-0 w-full h-full object-cover filter brightness-95"
                />
                
                {/* Subtle vignette */}
                <div className="absolute inset-0 bg-radial from-transparent via-black/10 to-black/35" />

                {/* Location Badge */}
                <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-xs text-white px-2.5 py-1 rounded-md text-[11px] font-medium flex items-center gap-1.5 z-10">
                  <MapPin className="w-3 h-3 text-[#F4C056]" />
                  <span>{backgroundImages[options.background].location}</span>
                </div>

                {/* Stylized Paco Alpaca Mascot Canvas */}
                <div className="relative z-10 w-64 h-64 flex items-center justify-center">
                  
                  {/* Alpaca Vector Mascot Illustration */}
                  <svg viewBox="0 0 200 240" className="w-full h-full drop-shadow-xl select-none">
                    <defs>
                      <filter id="fleece-texture" x="-10%" y="-10%" width="120%" height="120%">
                        <feTurbulence type="fractalNoise" baseFrequency="0.04" result="noise" />
                        <feDiffuseLighting in="noise" lightingColor="#fff" surfaceScale="2" result="light">
                          <feDistantLight azimuth="45" elevation="60" />
                        </feDiffuseLighting>
                        <feBlend mode="multiply" in="SourceGraphic" in2="light" />
                      </filter>
                    </defs>

                    {/* Alpaca Body / Legs */}
                    <ellipse cx="100" cy="190" rx="45" ry="32" fill="#FDFBF7" stroke="#E6DFD5" strokeWidth="3" />
                    
                    {/* Legs */}
                    <rect x="70" y="195" width="12" height="35" rx="6" fill="#F5EFEB" stroke="#DDD5C7" strokeWidth="2" />
                    <rect x="118" y="195" width="12" height="35" rx="6" fill="#F5EFEB" stroke="#DDD5C7" strokeWidth="2" />

                    {/* Fluffy Tail */}
                    <circle cx="56" cy="180" r="12" fill="#FAF8F5" stroke="#E6DFD5" strokeWidth="2" />

                    {/* Fluffy Neck */}
                    <rect x="84" y="95" width="32" height="75" rx="16" fill="#FDFBF7" stroke="#E6DFD5" strokeWidth="3" />

                    {/* Alpaca Head */}
                    <circle cx="100" cy="85" r="30" fill="#FAF8F5" stroke="#E6DFD5" strokeWidth="3" />

                    {/* Ears */}
                    <polygon points="78,70 70,38 86,58" fill="#FDFBF7" stroke="#E6DFD5" strokeWidth="2.5" />
                    <polygon points="76,66 73,44 83,58" fill="#F5D0C5" />
                    <polygon points="122,70 130,38 114,58" fill="#FDFBF7" stroke="#E6DFD5" strokeWidth="2.5" />
                    <polygon points="124,66 127,44 117,58" fill="#F5D0C5" />

                    {/* Fluffy Forehead Cloud */}
                    <ellipse cx="100" cy="62" rx="20" ry="12" fill="#FFFFFF" stroke="#E6DFD5" strokeWidth="2" />
                    <circle cx="88" cy="62" r="9" fill="#FFFFFF" />
                    <circle cx="112" cy="62" r="9" fill="#FFFFFF" />

                    {/* Cheeks */}
                    <circle cx="82" cy="94" r="5" fill="#F9A8A8" opacity="0.6" />
                    <circle cx="118" cy="94" r="5" fill="#F9A8A8" opacity="0.6" />

                    {/* Snout / Muzzle */}
                    <ellipse cx="100" cy="96" rx="13" ry="10" fill="#FFFFFF" stroke="#DDD5C7" strokeWidth="1.5" />
                    <ellipse cx="100" cy="92" rx="4" ry="2.5" fill="#5A4E44" />
                    <path d="M100 94.5 L100 99 M96 99 Q100 102 104 99" stroke="#5A4E44" strokeWidth="2" strokeLinecap="round" fill="none" />

                    {/* Eyes */}
                    {options.glasses === 'none' && (
                      <>
                        <ellipse cx="88" cy="84" rx="4" ry="5.5" fill="#2B2723" />
                        <circle cx="86.5" cy="82" r="1.8" fill="#FFFFFF" />
                        <ellipse cx="112" cy="84" rx="4" ry="5.5" fill="#2B2723" />
                        <circle cx="110.5" cy="82" r="1.8" fill="#FFFFFF" />
                      </>
                    )}

                    {/* GLASSES OVERLAY */}
                    {options.glasses === 'sunglasses' && (
                      <g transform="translate(0, 0)">
                        <circle cx="87" cy="84" r="10" fill="#222" stroke="#D4AF37" strokeWidth="2" />
                        <circle cx="113" cy="84" r="10" fill="#222" stroke="#D4AF37" strokeWidth="2" />
                        <line x1="97" y1="84" x2="103" y2="84" stroke="#D4AF37" strokeWidth="2" />
                        {/* Lens Glare */}
                        <path d="M82 80 L88 76" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" opacity="0.8" />
                        <path d="M108 80 L114 76" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" opacity="0.8" />
                      </g>
                    )}

                    {options.glasses === 'aviators' && (
                      <g>
                        <path d="M76 77 Q87 75 97 78 Q97 94 87 95 Q76 93 76 77 Z" fill="#3A3A3A" stroke="#C5A059" strokeWidth="2" opacity="0.9" />
                        <path d="M103 78 Q113 75 124 77 Q124 93 113 95 Q103 94 103 78 Z" fill="#3A3A3A" stroke="#C5A059" strokeWidth="2" opacity="0.9" />
                        <line x1="97" y1="78" x2="103" y2="78" stroke="#C5A059" strokeWidth="2.5" />
                        <line x1="82" y1="74" x2="118" y2="74" stroke="#C5A059" strokeWidth="1.5" />
                      </g>
                    )}

                    {options.glasses === 'glasses' && (
                      <g>
                        <circle cx="87" cy="84" r="9" fill="none" stroke="#8C5338" strokeWidth="2.5" />
                        <circle cx="113" cy="84" r="9" fill="none" stroke="#8C5338" strokeWidth="2.5" />
                        <line x1="96" y1="84" x2="104" y2="84" stroke="#8C5338" strokeWidth="2" />
                      </g>
                    )}

                    {/* ACCESSORIES OVERLAY */}
                    {options.accessory === 'scarf' && (
                      <g>
                        {/* Cozy striped knitted scarf */}
                        <path d="M80 120 Q100 128 120 120 Q122 135 100 138 Q78 135 80 120 Z" fill="#D94B34" stroke="#2B2723" strokeWidth="1.5" />
                        <line x1="88" y1="122" x2="90" y2="134" stroke="#F4C056" strokeWidth="3" />
                        <line x1="98" y1="124" x2="100" y2="136" stroke="#4C8077" strokeWidth="3" />
                        <line x1="108" y1="122" x2="110" y2="134" stroke="#F4C056" strokeWidth="3" />
                        {/* Hanging tassel */}
                        <path d="M110 130 L118 165 L106 165 Z" fill="#D94B34" stroke="#2B2723" strokeWidth="1.5" />
                        <line x1="107" y1="145" x2="116" y2="145" stroke="#F4C056" strokeWidth="2" />
                        <line x1="107" y1="155" x2="116" y2="155" stroke="#4C8077" strokeWidth="2" />
                      </g>
                    )}

                    {options.accessory === 'poncho' && (
                      <g>
                        {/* Traditional Peruvian Poncho */}
                        <polygon points="65,130 135,130 145,190 55,190" fill="#C8452D" stroke="#2B2723" strokeWidth="2" />
                        <line x1="60" y1="145" x2="140" y2="145" stroke="#E9BA45" strokeWidth="4" />
                        <line x1="58" y1="160" x2="142" y2="160" stroke="#3D7B70" strokeWidth="4" />
                        <line x1="56" y1="175" x2="144" y2="175" stroke="#E9BA45" strokeWidth="4" />
                        {/* Fringe */}
                        <line x1="60" y1="190" x2="60" y2="196" stroke="#E9BA45" strokeWidth="2" />
                        <line x1="80" y1="190" x2="80" y2="196" stroke="#E9BA45" strokeWidth="2" />
                        <line x1="100" y1="190" x2="100" y2="196" stroke="#E9BA45" strokeWidth="2" />
                        <line x1="120" y1="190" x2="120" y2="196" stroke="#E9BA45" strokeWidth="2" />
                        <line x1="140" y1="190" x2="140" y2="196" stroke="#E9BA45" strokeWidth="2" />
                      </g>
                    )}

                    {options.accessory === 'backpack' && (
                      <g>
                        <rect x="62" y="145" width="22" height="35" rx="5" fill="#465842" stroke="#2B2723" strokeWidth="2" />
                        <rect x="66" y="160" width="14" height="15" rx="3" fill="#354532" />
                        <line x1="73" y1="145" x2="73" y2="175" stroke="#C5A059" strokeWidth="1.5" />
                      </g>
                    )}

                    {options.accessory === 'camera' && (
                      <g>
                        <path d="M85 110 L125 155" stroke="#2B2723" strokeWidth="2" fill="none" />
                        <rect x="110" y="148" width="26" height="18" rx="3" fill="#3A3835" stroke="#2B2723" strokeWidth="1.5" />
                        <circle cx="123" cy="157" r="5" fill="#5C5852" stroke="#D4AF37" strokeWidth="1.5" />
                        <circle cx="123" cy="157" r="2.5" fill="#207398" />
                      </g>
                    )}

                    {options.accessory === 'baguette' && (
                      <g transform="rotate(-30 120 160)">
                        <rect x="110" y="140" width="14" height="42" rx="7" fill="#D29952" stroke="#875720" strokeWidth="2" />
                        <line x1="113" y1="148" x2="121" y2="148" stroke="#875720" strokeWidth="1.5" />
                        <line x1="113" y1="156" x2="121" y2="156" stroke="#875720" strokeWidth="1.5" />
                        <line x1="113" y1="164" x2="121" y2="164" stroke="#875720" strokeWidth="1.5" />
                      </g>
                    )}

                    {/* HATS OVERLAY */}
                    {options.hat === 'chullo' && (
                      <g>
                        {/* Andean Chullo with ear flaps */}
                        <path d="M72 70 Q100 36 128 70 Q124 74 100 72 Q76 74 72 70 Z" fill="#C8452D" stroke="#2B2723" strokeWidth="2" />
                        <line x1="75" y1="64" x2="125" y2="64" stroke="#F4C056" strokeWidth="3" />
                        <line x1="77" y1="56" x2="123" y2="56" stroke="#3D7B70" strokeWidth="3" />
                        <circle cx="100" cy="38" r="7" fill="#F4C056" />
                        {/* Earflaps */}
                        <polygon points="73,69 66,92 78,82" fill="#C8452D" stroke="#2B2723" strokeWidth="1.5" />
                        <polygon points="127,69 134,92 122,82" fill="#C8452D" stroke="#2B2723" strokeWidth="1.5" />
                        {/* Hanging braids */}
                        <line x1="68" y1="92" x2="68" y2="110" stroke="#F4C056" strokeWidth="2" />
                        <line x1="132" y1="92" x2="132" y2="110" stroke="#F4C056" strokeWidth="2" />
                      </g>
                    )}

                    {options.hat === 'beret' && (
                      <g transform="rotate(-8 100 50)">
                        <ellipse cx="100" cy="52" rx="34" ry="14" fill="#1C2D42" stroke="#101B28" strokeWidth="2" />
                        <path d="M99 38 L99 33" stroke="#1C2D42" strokeWidth="3" strokeLinecap="round" />
                      </g>
                    )}

                    {options.hat === 'safari' && (
                      <g>
                        <ellipse cx="100" cy="62" rx="42" ry="12" fill="#C4B487" stroke="#7A6F4E" strokeWidth="2" />
                        <path d="M76 62 Q100 35 124 62 Z" fill="#D9CBA5" stroke="#7A6F4E" strokeWidth="2" />
                        <rect x="76" y="58" width="48" height="5" fill="#5F6B43" />
                      </g>
                    )}

                    {options.hat === 'beanie' && (
                      <g>
                        <path d="M74 68 Q100 30 126 68 Z" fill="#E67E22" stroke="#2B2723" strokeWidth="2" />
                        <rect x="72" y="62" width="56" height="9" rx="3" fill="#D35400" stroke="#2B2723" strokeWidth="1.5" />
                        <circle cx="100" cy="30" r="7" fill="#FAF8F5" />
                      </g>
                    )}

                    {options.hat === 'straw' && (
                      <g>
                        <ellipse cx="100" cy="64" rx="44" ry="12" fill="#E8D197" stroke="#9A834B" strokeWidth="2" />
                        <ellipse cx="100" cy="56" rx="24" ry="14" fill="#D8C082" stroke="#9A834B" strokeWidth="2" />
                        <rect x="76" y="58" width="48" height="4" fill="#C0392B" />
                      </g>
                    )}

                  </svg>

                </div>

              </div>

              {/* Polaroid Caption */}
              <div className="mt-4 px-1">
                <input
                  type="text"
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  placeholder="Type a field caption..."
                  className="font-editorial italic text-base sm:text-lg text-[#2B2723] w-full text-center border-b border-dashed border-[#DED5C7] pb-1 focus:outline-none focus:border-[#E8734A] bg-transparent"
                />
                <div className="flex items-center justify-between text-[11px] text-[#8C8276] mt-2 px-1">
                  <span>EXPEDITION POSTCARD #{Math.floor(Math.random() * 800 + 100)}</span>
                  <span>{new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                </div>
              </div>

            </div>

            {/* Polaroid Action Buttons */}
            <div className="flex items-center gap-3 mt-4">
              <button
                onClick={handleTakeSnapshot}
                className="px-5 py-2.5 rounded-xl bg-[#E8734A] text-white font-semibold text-xs flex items-center gap-2 hover:bg-[#D55F37] shadow-sm transition-all active:scale-95"
              >
                <Camera className="w-4 h-4" />
                Snap Polaroid
              </button>

              <button
                onClick={handleRandomize}
                className="px-4 py-2.5 rounded-xl bg-white text-[#2B2723] font-semibold text-xs border border-[#DED5C7] hover:bg-[#F2ECE1] transition-colors flex items-center gap-1.5 shadow-xs"
              >
                <RefreshCw className="w-3.5 h-3.5 text-[#736B5F]" />
                Surprise Style
              </button>
            </div>

            {snapshotTaken && (
              <div className="mt-4 p-3 bg-[#EBF5EE] border border-[#B7E0C2] rounded-xl text-xs text-[#206637] flex items-center justify-between gap-4 max-w-md w-full animate-fade-in">
                <span>Polaroid captured in Paco’s Travel Album!</span>
                <button
                  onClick={handleCopyLink}
                  className="font-semibold underline hover:text-[#144725] shrink-0"
                >
                  {copySuccess ? 'Copied to Clipboard!' : 'Share Souvenir'}
                </button>
              </div>
            )}

          </div>

          {/* Right Column: Wardrobe Controls */}
          <div className="lg:col-span-5 bg-white p-6 sm:p-7 rounded-3xl border border-[#E0D8CB] shadow-xs space-y-6">
            
            {/* Background Picker */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-[#736B5F] block mb-2">
                1. Scenic Destination Backdrop
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(
                  [
                    { id: 'alps', label: 'Swiss Alps' },
                    { id: 'machu', label: 'Machu Picchu' },
                    { id: 'kyoto', label: 'Kyoto Cherry' },
                    { id: 'amalfi', label: 'Amalfi Coast' },
                    { id: 'paris', label: 'Paris Cafe' },
                  ] as const
                ).map((bg) => (
                  <button
                    key={bg.id}
                    onClick={() => {
                      soundEffects.playPop();
                      setOptions((prev) => ({ ...prev, background: bg.id }));
                    }}
                    className={`py-2 px-2.5 rounded-xl text-xs font-medium border text-center transition-all ${
                      options.background === bg.id
                        ? 'bg-[#2B2723] text-white border-[#2B2723] shadow-xs'
                        : 'bg-[#FAF8F5] text-[#4A433A] border-[#E2D9CC] hover:bg-white'
                    }`}
                  >
                    {bg.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Hat Picker */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-[#736B5F] block mb-2">
                2. Alpaca Headwear
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(
                  [
                    { id: 'chullo', label: 'Andean Chullo' },
                    { id: 'beret', label: 'Parisian Beret' },
                    { id: 'safari', label: 'Safari Explorer' },
                    { id: 'beanie', label: 'Orange Beanie' },
                    { id: 'straw', label: 'Straw Sun Hat' },
                    { id: 'none', label: 'Au Naturel' },
                  ] as const
                ).map((hat) => (
                  <button
                    key={hat.id}
                    onClick={() => {
                      soundEffects.playPop();
                      setOptions((prev) => ({ ...prev, hat: hat.id }));
                    }}
                    className={`py-2 px-2.5 rounded-xl text-xs font-medium border text-center transition-all ${
                      options.hat === hat.id
                        ? 'bg-[#E8734A] text-white border-[#E8734A] shadow-xs'
                        : 'bg-[#FAF8F5] text-[#4A433A] border-[#E2D9CC] hover:bg-white'
                    }`}
                  >
                    {hat.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Eyewear Picker */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-[#736B5F] block mb-2">
                3. Eyewear
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {(
                  [
                    { id: 'sunglasses', label: 'Round Shades' },
                    { id: 'aviators', label: 'Aviators' },
                    { id: 'glasses', label: 'Reader Specs' },
                    { id: 'none', label: 'None' },
                  ] as const
                ).map((eye) => (
                  <button
                    key={eye.id}
                    onClick={() => {
                      soundEffects.playPop();
                      setOptions((prev) => ({ ...prev, glasses: eye.id }));
                    }}
                    className={`py-2 px-2 text-xs font-medium border text-center transition-all ${
                      options.glasses === eye.id
                        ? 'bg-[#E8734A] text-white border-[#E8734A] shadow-xs'
                        : 'bg-[#FAF8F5] text-[#4A433A] border-[#E2D9CC] hover:bg-white'
                    }`}
                  >
                    {eye.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Accessories Picker */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-[#736B5F] block mb-2">
                4. Travel Accessory
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(
                  [
                    { id: 'scarf', label: 'Knitted Scarf' },
                    { id: 'poncho', label: 'Inca Poncho' },
                    { id: 'backpack', label: 'Mini Daypack' },
                    { id: 'camera', label: '35mm Camera' },
                    { id: 'baguette', label: 'Fresh Baguette' },
                    { id: 'none', label: 'None' },
                  ] as const
                ).map((acc) => (
                  <button
                    key={acc.id}
                    onClick={() => {
                      soundEffects.playPop();
                      setOptions((prev) => ({ ...prev, accessory: acc.id }));
                    }}
                    className={`py-2 px-2.5 rounded-xl text-xs font-medium border text-center transition-all ${
                      options.accessory === acc.id
                        ? 'bg-[#E8734A] text-white border-[#E8734A] shadow-xs'
                        : 'bg-[#FAF8F5] text-[#4A433A] border-[#E2D9CC] hover:bg-white'
                    }`}
                  >
                    {acc.label}
                  </button>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
