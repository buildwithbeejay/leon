import React, { useState } from 'react';
import { ShoppingBag, Volume2, VolumeX, Menu, X, Compass, BookOpen, Shirt, Mail, Heart, Sparkles } from 'lucide-react';
import { Currency } from '../types';
import { soundEffects } from '../utils/audio';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  currency: Currency;
  onCurrencyChange: (c: Currency) => void;
  onOpenFluffClub: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  onOpenCart,
  currency,
  onCurrencyChange,
  onOpenFluffClub
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [soundOn, setSoundOn] = useState(soundEffects.isSoundEnabled());

  const handleToggleSound = () => {
    const newState = soundEffects.toggleSound();
    setSoundOn(newState);
    if (newState) soundEffects.playPop();
  };

  const navLinks = [
    { label: 'World Expeditions', href: '#expeditions', icon: Compass },
    { label: 'Travel Diaries', href: '#stories', icon: BookOpen },
    { label: "Paco's Picks", href: '#shop', icon: ShoppingBag },
    { label: 'Dress Paco', href: '#wardrobe', icon: Shirt },
    { label: 'Postcard Studio', href: '#postcards', icon: Mail },
    { label: 'About Paco', href: '#about', icon: Heart },
  ];

  const handleNavClick = () => {
    soundEffects.playPop();
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FAF8F5]/95 backdrop-blur-md border-b border-[#EBE4D8] transition-all duration-200">
      {/* Top Banner Alert */}
      <div className="bg-[#2B2723] text-[#FAF8F5] py-2 px-4 text-center text-xs tracking-wider flex items-center justify-center gap-2">
        <span className="inline-block w-2 h-2 rounded-full bg-[#E8734A] animate-pulse"></span>
        <span>The Official 2026 Paco World Travel Calendar is now available! Worldwide shipping.</span>
        <a 
          href="#shop" 
          onClick={handleNavClick}
          className="underline font-semibold hover:text-[#F4C056] transition-colors ml-1"
        >
          Explore Paco’s Picks →
        </a>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <a 
            href="#" 
            onClick={handleNavClick}
            className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E8734A]"
          >
            <div className="w-11 h-11 rounded-2xl bg-[#E8734A]/10 border border-[#E8734A]/20 flex items-center justify-center text-2xl group-hover:scale-105 transition-transform duration-200 shadow-sm">
              🦙
            </div>
            <div>
              <span className="font-editorial text-xl sm:text-2xl font-bold tracking-tight text-[#2B2723] block leading-none group-hover:text-[#E8734A] transition-colors">
                PACO THE ALPACA
              </span>
              <span className="text-[11px] tracking-widest uppercase font-medium text-[#8C8276] mt-1 block">
                The Fluffy Globetrotter
              </span>
            </div>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={handleNavClick}
                className="text-sm font-medium text-[#575046] hover:text-[#2B2723] hover:underline underline-offset-8 decoration-2 decoration-[#E8734A] transition-colors py-1"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Controls: Audio, Currency, Passport, Cart */}
          <div className="flex items-center gap-3">
            {/* Audio Toggle */}
            <button
              onClick={handleToggleSound}
              title={soundOn ? 'Sound Effects Enabled' : 'Muted'}
              className="p-2 text-[#736B5F] hover:text-[#2B2723] hover:bg-[#EFEAE1] rounded-full transition-colors"
              aria-label="Toggle Sound"
            >
              {soundOn ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>

            {/* Currency Switcher */}
            <div className="hidden sm:flex items-center border border-[#E0D8CB] rounded-lg p-0.5 bg-[#F5EFEB] text-xs">
              {(['USD', 'EUR', 'GBP'] as Currency[]).map((c) => (
                <button
                  key={c}
                  onClick={() => {
                    soundEffects.playPop();
                    onCurrencyChange(c);
                  }}
                  className={`px-2 py-1 rounded-md font-semibold transition-all ${
                    currency === c
                      ? 'bg-white text-[#2B2723] shadow-xs'
                      : 'text-[#736B5F] hover:text-[#2B2723]'
                  }`}
                >
                  {c === 'USD' ? '$ USD' : c === 'EUR' ? '€ EUR' : '£ GBP'}
                </button>
              ))}
            </div>

            {/* Get Passport / Fluff Club */}
            <button
              onClick={() => {
                soundEffects.playPop();
                onOpenFluffClub();
              }}
              className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-[#FAF0E6] text-[#A64A26] border border-[#E9D1C3] hover:bg-[#F7E5D6] transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#E8734A]" />
              Explorer Passport
            </button>

            {/* Cart Button */}
            <button
              onClick={() => {
                soundEffects.playPop();
                onOpenCart();
              }}
              className="relative p-2.5 rounded-full bg-[#E8734A] text-white hover:bg-[#D55F37] transition-transform active:scale-95 shadow-sm"
              aria-label="View Shopping Cart"
            >
              <ShoppingBag className="w-4 h-4" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#2B2723] text-white text-[11px] font-bold rounded-full flex items-center justify-center border-2 border-[#FAF8F5] animate-scale-in">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => {
                soundEffects.playPop();
                setMobileMenuOpen(!mobileMenuOpen);
              }}
              className="lg:hidden p-2 text-[#575046] hover:text-[#2B2723] rounded-lg"
              aria-label="Open menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#FAF8F5] border-b border-[#E0D8CB] px-4 pt-3 pb-6 space-y-3">
          <div className="flex justify-between items-center pb-2 border-b border-[#EFEAE1]">
            <span className="text-xs uppercase tracking-wider font-semibold text-[#8C8276]">Currency</span>
            <div className="flex gap-1">
              {(['USD', 'EUR', 'GBP'] as Currency[]).map((c) => (
                <button
                  key={c}
                  onClick={() => {
                    soundEffects.playPop();
                    onCurrencyChange(c);
                  }}
                  className={`px-2.5 py-1 text-xs rounded-md font-medium ${
                    currency === c ? 'bg-[#2B2723] text-white' : 'bg-[#EFEAE1] text-[#575046]'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={handleNavClick}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-base font-medium text-[#2B2723] hover:bg-[#F2ECE1] transition-colors"
                >
                  <Icon className="w-4 h-4 text-[#E8734A]" />
                  {link.label}
                </a>
              );
            })}
          </div>

          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenFluffClub();
            }}
            className="w-full mt-3 py-2.5 px-4 rounded-lg bg-[#E8734A] text-white font-medium text-sm flex items-center justify-center gap-2 shadow-xs"
          >
            <Sparkles className="w-4 h-4" />
            Join the Fluff Club & Get Passport
          </button>
        </div>
      )}
    </header>
  );
};
