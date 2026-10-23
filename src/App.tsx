import confetti from "canvas-confetti";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import {
  Check,
  ChevronLeft,
  ChevronRight,
  Copy,
  Download,
  ExternalLink,
  Maximize2,
  Menu,
  Send,
  Volume2,
  VolumeX,
  X,
} from "lucide-react";
import { useState } from "react";
import { soundEffects } from "./utils/audio";

// Verified Contract Address for $LEON on Solana
const CONTRACT_ADDRESS = "";

// User provided Hero Image
const HERO_IMAGE = "/assets/aistudio/IMG_2433_1c47d950.PNG";

// User provided $LEON Rooftop Sunset Artwork for How To Buy section
const HOW_TO_BUY_BG = "/assets/aistudio/IMG_2441.JPG_0c6ec739.jpeg";

// User provided Zen Leon Waterfall Artwork for Story section
const STORY_ARTWORK = "/assets/aistudio/IMG_2440.JPG_9c20416b.jpeg";

// Official $LEON Onboarding Steps Artwork
const STEP_1_IMG = "/assets/aistudio/IMG_2489.JPG_b9e81e03.jpeg"; // King Leon with Sword & Flag
const STEP_2_IMG = "/assets/aistudio/IMG_2488.JPG_c503fa0a.jpeg"; // Leon with Glowing Solana Orb
const STEP_3_IMG = "/assets/aistudio/IMG_2492.JPG_78a780e0.jpeg"; // Flying Leon toward Solana DEX
const STEP_4_IMG = "/assets/aistudio/IMG_2491.JPG_9bdd6538.jpeg"; // Arcade Swap Machine (Buy & Hold $LEON)

// Reusable scroll fade-up animation variants
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: "easeOut" },
  },
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
};

export default function App() {
  const [copied, setCopied] = useState(false);
  const [soundOn, setSoundOn] = useState(soundEffects.isSoundEnabled());
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [selectedMeme, setSelectedMeme] = useState<string | null>(null);

  // How to Buy 4 Steps with Official Artwork
  const steps = [
    {
      num: "01",
      title: "Create a Wallet",
      desc: "Download Phantom or Solflare wallet from the App Store, Google Play, or as a browser extension. Keep your secret recovery phrase secure and never share it.",
      img: STEP_1_IMG,
      actionText: "Get Phantom Wallet",
      actionUrl: "https://phantom.app/",
    },
    {
      num: "02",
      title: "Get Some SOL",
      desc: "Fund your wallet with Solana (SOL). You can buy SOL directly inside Phantom via MoonPay, or transfer from exchanges like Binance, Coinbase, or Kraken.",
      img: STEP_2_IMG,
      actionText: "Buy SOL via Phantom",
      actionUrl: "https://solana.com/",
    },
    {
      num: "03",
      title: "Go to Raydium",
      desc: "Open Raydium (raydium.io) or Jupiter (jup.ag) in your browser. Connect your Solana wallet and make sure you're connected to Solana Mainnet.",
      img: STEP_3_IMG,
      actionText: "Open Raydium DEX",
      actionUrl: "https://raydium.io/swap/",
    },
    {
      num: "04",
      title: "Swap for $LEON",
      desc: "Paste the $LEON contract address into the token field, select the amount of SOL to swap, set slippage to 0.5%–1%, and confirm the transaction in your wallet.",
      img: STEP_4_IMG,
      actionText: "Swap on Raydium",
      actionUrl: "https://raydium.io/swap/",
    },
  ];

  // Official $LEON Artworks & Community Vault
  const memes = [
    STEP_4_IMG,
    STEP_3_IMG,
    STEP_2_IMG,
    STEP_1_IMG,
    STORY_ARTWORK,
    HOW_TO_BUY_BG,
    HERO_IMAGE,
  ];

  const handleCopyCA = () => {
    soundEffects.playStamp();
    navigator.clipboard.writeText(CONTRACT_ADDRESS);
    setCopied(true);
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 },
      });
    } catch {
      // Ignored
    }
    setTimeout(() => setCopied(false), 2500);
  };

  const handleToggleSound = () => {
    const next = soundEffects.toggleSound();
    setSoundOn(next);
    if (next) soundEffects.playPop();
  };

  const scrollTo = (id: string) => {
    soundEffects.playPop();
    setMobileMenuOpen(false);
    const elem = document.getElementById(id);
    if (elem) {
      elem.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-[#0b0604] text-[#F3EFEA] font-sans selection:bg-[#14f195] selection:text-[#0b0604] overflow-x-hidden">
      {/* NAVBAR: RESPONSIVE FOR MOBILE, TABLET & DESKTOP */}
      <motion.header
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="fixed top-0 inset-x-0 z-50 bg-[#0b0604]/90 backdrop-blur-md border-b border-[#14f195]/20"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 sm:h-16 flex items-center justify-between">
          {/* Brand Logo */}
          <a href="#" className="flex items-center gap-2.5 group shrink-0">
            <motion.div
              whileHover={{ rotate: 10, scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="relative w-8 h-8 sm:w-9 sm:h-9 rounded-full overflow-hidden border border-[#14f195]/50 bg-black"
            >
              <img
                src={HERO_IMAGE}
                alt="$LEON"
                className="w-full h-full object-cover object-[69%_28%]"
              />
            </motion.div>
            <span className="font-extrabold text-lg sm:text-xl tracking-wider uppercase font-mono text-white group-hover:text-[#14f195] transition-colors">
              $LEON
            </span>
          </a>

          {/* Navigation Links (Tablet & Desktop) */}
          <nav className="hidden md:flex items-center gap-5 lg:gap-8 text-xs font-bold uppercase tracking-wider text-white/80">
            <button
              onClick={() => scrollTo("story")}
              className="hover:text-[#14f195] transition-colors cursor-pointer py-1"
            >
              About
            </button>
            <button
              onClick={() => scrollTo("how-to-buy")}
              className="hover:text-[#14f195] transition-colors cursor-pointer py-1"
            >
              How To Buy
            </button>
            <button
              onClick={() => scrollTo("tokenomics")}
              className="hover:text-[#14f195] transition-colors cursor-pointer py-1"
            >
              Tokenomics
            </button>
            <button
              onClick={() => scrollTo("memes")}
              className="hover:text-[#14f195] transition-colors cursor-pointer py-1"
            >
              Memes
            </button>
            <button
              onClick={() => scrollTo("community")}
              className="hover:text-[#14f195] transition-colors cursor-pointer py-1"
            >
              Community
            </button>
          </nav>

          {/* Header Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Audio Toggle */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={handleToggleSound}
              title={soundOn ? "Sound On" : "Muted"}
              className="p-1.5 sm:p-2 text-white/70 hover:text-white rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
            >
              {soundOn ? (
                <Volume2 className="w-4 h-4 text-[#14f195]" />
              ) : (
                <VolumeX className="w-4 h-4" />
              )}
            </motion.button>

            {/* Quick Copy CA Button (Tablet & Desktop) */}
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleCopyCA}
              className="hidden sm:inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 border border-white/20 text-white font-mono text-xs font-semibold transition-colors cursor-pointer"
            >
              {copied ? (
                <Check className="w-3.5 h-3.5 text-[#14f195]" />
              ) : (
                <Copy className="w-3.5 h-3.5" />
              )}
              <span>{copied ? "Copied" : "Copy CA"}</span>
            </motion.button>

            {/* Buy Button */}
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="https://raydium.io/swap/"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => soundEffects.playPop()}
              className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg bg-[#14f195] hover:bg-[#34f5a5] text-[#0b0604] font-black text-xs uppercase tracking-wider transition-colors shadow-md flex items-center gap-1 cursor-pointer"
            >
              <span>Buy $LEON</span>
              <ExternalLink className="w-3 h-3" />
            </motion.a>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-1.5 text-white/80 hover:text-white rounded-lg hover:bg-white/10 focus:outline-none"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6 text-[#14f195]" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Nav Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="md:hidden bg-[#130b09]/95 backdrop-blur-xl border-b border-[#14f195]/20 px-5 py-4 space-y-2.5 font-mono text-sm overflow-hidden shadow-2xl"
            >
              <button
                onClick={() => scrollTo("story")}
                className="block w-full text-left py-2 px-2 rounded-lg text-white/90 hover:text-[#14f195] hover:bg-white/5 active:text-[#14f195]"
              >
                About $LEON
              </button>
              <button
                onClick={() => scrollTo("how-to-buy")}
                className="block w-full text-left py-2 px-2 rounded-lg text-white/90 hover:text-[#14f195] hover:bg-white/5 active:text-[#14f195]"
              >
                How To Buy
              </button>
              <button
                onClick={() => scrollTo("tokenomics")}
                className="block w-full text-left py-2 px-2 rounded-lg text-white/90 hover:text-[#14f195] hover:bg-white/5 active:text-[#14f195]"
              >
                Tokenomics
              </button>
              <button
                onClick={() => scrollTo("memes")}
                className="block w-full text-left py-2 px-2 rounded-lg text-white/90 hover:text-[#14f195] hover:bg-white/5 active:text-[#14f195]"
              >
                Meme Gallery
              </button>
              <button
                onClick={() => scrollTo("community")}
                className="block w-full text-left py-2 px-2 rounded-lg text-white/90 hover:text-[#14f195] hover:bg-white/5 active:text-[#14f195]"
              >
                Community
              </button>

              <div className="pt-2 border-t border-white/10 space-y-2">
                <button
                  onClick={handleCopyCA}
                  className="w-full py-2.5 px-3 rounded-xl bg-white/10 hover:bg-white/15 text-center text-xs font-bold text-[#14f195] flex items-center justify-center gap-2 min-h-[44px]"
                >
                  {copied ? (
                    <Check className="w-3.5 h-3.5" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                  <span>
                    {copied
                      ? "CA Copied to Clipboard!"
                      : "Copy Contract Address"}
                  </span>
                </button>
                <a
                  href="https://raydium.io/swap/"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => soundEffects.playPop()}
                  className="w-full py-2.5 px-3 rounded-xl bg-[#14f195] hover:bg-[#34f5a5] text-[#0b0604] font-black text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 min-h-[44px]"
                >
                  <span>Buy on Raydium</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* 1. HERO SECTION: DESKTOP FULL-SCREEN SPACE & MOBILE COMPACTED RESPONSIVE */}
      <section
        id="hero"
        className="relative w-full pt-16 sm:pt-20 md:pt-24 lg:pt-0 pb-8 sm:pb-12 md:pb-16 lg:pb-14 lg:min-h-screen lg:flex lg:flex-col lg:justify-end lg:items-center overflow-hidden bg-[#0b0604]"
      >
        {/* DESKTOP BACKGROUND: Takes up the entire desktop space edge-to-edge */}
        <div className="hidden lg:block absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <img
            src={HERO_IMAGE}
            alt="$LEON Keynote on Solana"
            className="w-full h-full object-cover object-center"
          />
          {/* Desktop cinematic gradient for text legibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0b0604] via-[#0b0604]/55 to-black/20" />
        </div>

        {/* MOBILE & TABLET AMBIENT BACKDROP */}
        <div className="lg:hidden absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <img
            src={HERO_IMAGE}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-cover blur-3xl opacity-25 scale-110"
          />
          <div className="absolute inset-0 bg-[#08071a]/70" />
        </div>

        {/* MOBILE & TABLET COMPACTED KEYNOTE ARTWORK (Zero Zoom, Takes up natural space without box) */}
        <div className="lg:hidden relative z-1 w-full max-w-7xl mx-auto overflow-hidden aspect-[2560/1040]">
          <img
            src={HERO_IMAGE}
            alt="$LEON Keynote on Solana"
            className="w-full h-full object-cover sm:object-contain object-center drop-shadow-[0_15px_40px_rgba(0,0,0,0.9)]"
          />
          {/* Seamless gradient blend into section content */}
          <div className="absolute inset-x-0 bottom-0 h-16 sm:h-24 md:h-36 bg-gradient-to-t from-[#0b0604] via-[#0b0604]/75 to-transparent pointer-events-none" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 w-full max-w-4xl mx-auto px-3.5 sm:px-6 -mt-8 sm:-mt-14 md:-mt-20 lg:mt-0 flex flex-col items-center space-y-3 sm:space-y-4 md:space-y-5">
          {/* Live Solana Badge & Full Artwork Trigger */}
          <motion.div
            variants={fadeInUp}
            className="flex items-center justify-center gap-2"
          >
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#14f195]/20 border border-[#14f195]/40 text-[#14f195] font-mono text-[10px] sm:text-xs font-bold uppercase tracking-wider backdrop-blur-md shadow-lg">
              <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#14f195] animate-pulse"></span>
              Coming soon on Solana Mainnet
            </span>

            {/* <button
              type="button"
              onClick={() => {
                soundEffects.playPop();
                setSelectedMeme(HERO_IMAGE);
              }}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/70 hover:bg-black/90 border border-white/20 text-white/80 hover:text-[#14f195] font-mono text-[10px] sm:text-[11px] backdrop-blur-md transition-all cursor-pointer shadow"
              title="Open full resolution keynote image"
            >
              <Maximize2 className="w-3 h-3 text-[#14f195]" />
              <span>Full Artwork</span>
            </button> */}
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={fadeInUp}
            className="text-3xl xs:text-4xl sm:text-6xl md:text-7xl font-black uppercase font-display text-white tracking-tight drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)] text-center"
          >
            $LEON <span className="text-[#14f195]">ON SOLANA</span>
          </motion.h1>

          <motion.p
            variants={fadeInUp}
            className="text-sm sm:text-lg md:text-xl text-white/95 max-w-2xl mx-auto font-medium drop-shadow-md px-2 text-center leading-relaxed"
          >
            Solana's finest chameleon
            <div>Taking the stage as the premier gecko meme</div>
            on Solana.
          </motion.p>

          {/* Action Buttons: Stacked on Mobile, Inline on Tablet/Desktop */}
          <motion.div
            variants={fadeInUp}
            className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-2.5 sm:gap-4 pt-2 sm:pt-4 w-full max-w-xs xs:max-w-sm sm:max-w-none mx-auto"
          >
            {/* Primary Buy CTA */}
            <motion.a
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.96 }}
              href="https://raydium.io/swap/"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => soundEffects.playPop()}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#14f195] hover:bg-[#34f5a5] text-[#0b0604] font-black text-xs uppercase tracking-wider shadow-lg flex items-center justify-center gap-1.5 transition-colors cursor-pointer min-h-[44px]"
            >
              <span>Buy on Raydium</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </motion.a>

            {/* Secondary Link Row on Mobile */}
            <div className="flex items-center justify-center gap-2 w-full sm:w-auto">
              <motion.a
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.96 }}
                href="https://dexscreener.com/"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => soundEffects.playPop()}
                className="flex-1 sm:flex-initial px-4 py-3 rounded-xl bg-black/75 hover:bg-black/90 backdrop-blur-md border border-white/20 text-white font-bold text-xs uppercase tracking-wider text-center transition-colors cursor-pointer min-h-[44px] flex items-center justify-center"
              >
                DexScreener
              </motion.a>

              <motion.a
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                href=""
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-xl bg-black/75 hover:bg-black/90 backdrop-blur-md border border-white/20 text-white hover:text-[#14f195] transition-colors cursor-pointer min-h-[44px] min-w-[44px] flex items-center justify-center"
                title="Telegram"
              >
                <Send className="w-4 h-4" />
              </motion.a>

              <motion.a
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                href="https://x.com/leonofsolana"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-xl bg-black/75 hover:bg-black/90 backdrop-blur-md border border-white/20 text-white hover:text-[#14f195] transition-colors cursor-pointer min-h-[44px] min-w-[44px] flex items-center justify-center"
                title="Twitter / X"
              >
                <span className="font-bold text-sm font-mono">𝕏</span>
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. THE STORY SECTION: ZEN LEON AT SOLANA FALLS */}
      <section
        id="story"
        className="relative py-16 sm:py-24 border-t border-white/10 overflow-hidden"
      >
        {/* Section Image Background: Official Zen Leon Artwork */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <img
            src={STORY_ARTWORK}
            alt="Zen Leon at Waterfall"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0b0604]/90 via-[#0b0604]/80 to-[#0b0604]/90 backdrop-blur-[2px]" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            variants={fadeInUp}
            className="text-center max-w-2xl mx-auto mb-8 sm:mb-12 space-y-2"
          >
            <span className="text-[11px] sm:text-xs font-mono uppercase tracking-widest text-[#14f195] font-bold">
              THE KEYNOTE & THE LEGEND
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold uppercase font-display text-white drop-shadow-md">
              From The Crowd to The Center Stage
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-stretch">
            {/* Left Div: Story Narrative */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="space-y-3 sm:space-y-4 text-xs sm:text-sm md:text-base text-white/90 leading-relaxed font-normal bg-black/75 backdrop-blur-md p-6 sm:p-8 rounded-2xl border border-white/10 shadow-xl flex flex-col justify-center"
            >
              <p>
                In the crowded arena of crypto, most tokens whisper from the
                shadows. Leon stepped straight onto the keynote stage in front
                of the world to deliver pure decentralization.
              </p>
              <p>
                Backed by lightning-fast Solana throughput, $LEON represents the
                new wave of meme culture: fearless, transparent, and built for
                the community.
              </p>
              <p>
                No hidden developer wallets, no surprise taxes. Just Leon, the
                mic, and an unstoppable crowd taking the Solana ecosystem by
                storm.
              </p>
            </motion.div>

            {/* Right Div: Core Principles */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
              className="p-6 sm:p-8 rounded-2xl bg-black/75 backdrop-blur-md border border-[#14f195]/30 space-y-3 sm:space-y-4 font-mono text-xs shadow-xl flex flex-col justify-center"
            >
              <div className="text-[#14f195] font-bold uppercase text-xs sm:text-sm tracking-wider border-b border-white/10 pb-2.5">
                Core Principles
              </div>

              <div className="space-y-3.5 pt-1">
                <div className="flex items-start gap-2.5 sm:gap-3">
                  <span className="text-lg sm:text-xl shrink-0">🦎</span>
                  <div>
                    <strong className="text-white block text-xs sm:text-sm">
                      Keynote Presence
                    </strong>
                    <span className="text-white/70 text-[11px] sm:text-xs">
                      Always in the spotlight. Built for viral Solana virality.
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 sm:gap-3">
                  <span className="text-lg sm:text-xl shrink-0">⚡</span>
                  <div>
                    <strong className="text-white block text-xs sm:text-sm">
                      Solana Speed
                    </strong>
                    <span className="text-white/70 text-[11px] sm:text-xs">
                      Sub-second finality with near-zero transaction costs.
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 sm:gap-3">
                  <span className="text-lg sm:text-xl shrink-0">💎</span>
                  <div>
                    <strong className="text-white block text-xs sm:text-sm">
                      Diamond Conviction
                    </strong>
                    <span className="text-white/70 text-[11px] sm:text-xs">
                      Zero dev dump threat. 100% liquidity burned permanently.
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. HOW TO BUY SECTION: $LEON SUNSET ROOFTOP BACKGROUND */}
      <section
        id="how-to-buy"
        className="relative py-16 sm:py-24 border-t border-white/10 overflow-hidden"
      >
        {/* Section Image Background: Official $LEON Sunset Rooftop Artwork */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <img
            src={HOW_TO_BUY_BG}
            alt="$LEON Sunset Rooftop Artwork"
            className="w-full h-full object-cover object-[center_35%] sm:object-center"
          />
          {/* Subtle cinematic gradient so text and card stand out with high contrast while showcasing the art */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#0b0604]/80 via-[#0b0604]/60 to-[#0b0604]/85" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            variants={fadeInUp}
            className="text-center max-w-2xl mx-auto mb-8 sm:mb-12 space-y-1.5 sm:space-y-2"
          >
            <span className="text-[11px] sm:text-xs font-mono uppercase tracking-widest text-[#14f195] font-bold">
              SIMPLE ONBOARDING
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold uppercase font-display text-white drop-shadow-md">
              How to Buy $LEON
            </h2>
            <p className="text-xs sm:text-sm text-white/80">
              Get your $LEON in 4 easy steps using any Solana wallet.
            </p>
          </motion.div>

          {/* Step Selector Tabs: 2x2 Grid on Mobile, 4 Columns on Tablet/Desktop */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            variants={fadeInUp}
            className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-6 sm:mb-8 max-w-3xl mx-auto"
          >
            {steps.map((step, idx) => (
              <motion.button
                key={idx}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => {
                  soundEffects.playPop();
                  setActiveStep(idx);
                }}
                className={`p-2.5 sm:p-3 rounded-xl sm:rounded-2xl text-center border transition-all backdrop-blur-md cursor-pointer ${
                  activeStep === idx
                    ? "bg-[#14f195] text-[#0b0604] border-[#14f195] shadow-lg font-bold"
                    : "bg-black/50 text-white/80 hover:bg-black/70 hover:text-white border-white/15"
                }`}
              >
                <div
                  className={`text-[10px] sm:text-xs font-mono font-bold ${activeStep === idx ? "text-[#0b0604]/80" : "text-[#14f195]"}`}
                >
                  STEP {step.num}
                </div>
                <div className="text-xs sm:text-sm font-extrabold uppercase font-display truncate">
                  {step.title}
                </div>
              </motion.button>
            ))}
          </motion.div>

          {/* Active Step Showcase Card with Animated Switcher */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            variants={fadeInUp}
            className="bg-black/75 backdrop-blur-lg border border-[#14f195]/30 rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 shadow-2xl"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 items-center"
              >
                {/* Step Image */}
                <div className="md:col-span-6 flex justify-center">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    onClick={() => {
                      soundEffects.playPop();
                      setSelectedMeme(steps[activeStep].img);
                    }}
                    className="group relative w-full max-w-xs sm:max-w-sm aspect-square rounded-xl sm:rounded-2xl overflow-hidden border border-[#14f195]/40 bg-black/60 shadow-xl cursor-pointer"
                    title="Click to view full HD artwork"
                  >
                    <img
                      src={steps[activeStep].img}
                      alt={steps[activeStep].title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-full bg-black/85 text-[#14f195] font-mono text-[11px] sm:text-xs font-bold border border-[#14f195]/30">
                      STEP {steps[activeStep].num}
                    </span>
                    <div className="absolute bottom-2.5 right-2.5 px-2 py-1 rounded-lg bg-black/80 text-white/90 text-[10px] font-mono flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm border border-white/20">
                      <Maximize2 className="w-3 h-3 text-[#14f195]" />
                      <span>View HD</span>
                    </div>
                  </motion.div>
                </div>

                {/* Step Details & Link */}
                <div className="md:col-span-6 space-y-3 sm:space-y-4 text-center md:text-left">
                  <span className="text-[11px] sm:text-xs font-mono text-[#14f195] uppercase font-bold">
                    STEP {steps[activeStep].num} OF 04
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black uppercase font-display text-white">
                    {steps[activeStep].title}
                  </h3>
                  <p className="text-xs sm:text-sm text-white/85 leading-relaxed font-normal">
                    {steps[activeStep].desc}
                  </p>

                  <div className="pt-2 flex justify-center md:justify-start">
                    <motion.a
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.96 }}
                      href={steps[activeStep].actionUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => soundEffects.playPop()}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#14f195] hover:bg-[#34f5a5] text-[#0b0604] font-bold text-xs uppercase tracking-wider transition-colors shadow-md cursor-pointer"
                    >
                      <span>{steps[activeStep].actionText}</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </motion.a>
                  </div>

                  {/* Prev / Next controls */}
                  <div className="flex items-center justify-between pt-4 border-t border-white/10 text-xs sm:text-sm font-mono">
                    <button
                      onClick={() => {
                        soundEffects.playPop();
                        setActiveStep((prev) => Math.max(0, prev - 1));
                      }}
                      disabled={activeStep === 0}
                      className="flex items-center gap-1 text-white/70 hover:text-white disabled:opacity-30 cursor-pointer p-1"
                    >
                      <ChevronLeft className="w-4 h-4" /> Previous
                    </button>

                    <span className="text-white/40">{activeStep + 1} / 4</span>

                    <button
                      onClick={() => {
                        soundEffects.playPop();
                        setActiveStep((prev) => Math.min(3, prev + 1));
                      }}
                      disabled={activeStep === 3}
                      className="flex items-center gap-1 text-[#14f195] hover:text-white disabled:opacity-30 font-bold cursor-pointer p-1"
                    >
                      Next <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* 4. TOKENOMICS SECTION: ANDES ROCK BEDROCK IMAGE BACKGROUND */}
      <section
        id="tokenomics"
        className="relative py-16 sm:py-24 border-t border-white/10 overflow-hidden"
      >
        {/* Section Image Background */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <img
            src="/img/tokenomics/BGRocks.png"
            alt="Rock Bedrock"
            className="w-full h-full object-cover object-center"
          />
          <img
            src="/img/tokenomics/Rocks.png"
            alt="Rocks"
            className="absolute top-0 inset-x-0 w-full h-32 object-cover object-top opacity-50"
          />
          <div className="absolute inset-0 bg-[#0b0604]/80 backdrop-blur-[1px]"></div>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            variants={fadeInUp}
            className="text-center max-w-2xl mx-auto mb-8 sm:mb-12 space-y-1.5 sm:space-y-2"
          >
            <span className="text-[11px] sm:text-xs font-mono uppercase tracking-widest text-[#14f195] font-bold">
              TOKENOMICS
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold uppercase font-display text-white drop-shadow-md">
              $LEON Tokenomics
            </h2>
            <p className="text-xs sm:text-sm text-white/80">
              Simple, transparent, and built for decentralization.
            </p>
          </motion.div>

          {/* 4 Clean Metric Cards: 2 Columns on Mobile, 4 Columns on Tablet/Desktop */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            variants={staggerContainer}
            className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-4 mb-6 sm:mb-8"
          >
            {[
              {
                label: "Total Supply",
                val: "1,000,000,000",
                sub: "1 Billion Fixed",
                color: "text-white",
              },
              {
                label: "Buy / Sell Tax",
                val: "0% / 0%",
                sub: "Zero Hidden Fees",
                color: "text-[#14f195]",
              },
              {
                label: "Liquidity",
                val: "100% BURNED",
                sub: "Locked Forever",
                color: "text-[#ff8b43]",
              },
              {
                label: "Mint Authority",
                val: "REVOKED",
                sub: "Immutable SPL",
                color: "text-[#ffe066]",
              },
            ].map((metric, idx) => (
              <motion.div
                key={idx}
                variants={fadeInUp}
                whileHover={{ y: -5, scale: 1.02 }}
                transition={{ duration: 0.2 }}
                className="p-3.5 sm:p-5 rounded-xl sm:rounded-2xl bg-black/65 backdrop-blur-md border border-white/15 text-center space-y-1 shadow-lg"
              >
                <span className="text-[10px] sm:text-xs font-mono text-[#14f195] block">
                  {metric.label}
                </span>
                <span
                  className={`text-base sm:text-xl md:text-2xl font-black font-mono block ${metric.color}`}
                >
                  {metric.val}
                </span>
                <span className="text-[9px] sm:text-[10px] text-white/50 font-mono">
                  {metric.sub}
                </span>
              </motion.div>
            ))}
          </motion.div>

          {/* Clean Distribution Note */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="p-3 sm:p-4 rounded-xl bg-black/60 backdrop-blur-md border border-white/15 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs font-mono text-white/80 shadow-md text-center sm:text-left"
          >
            <span className="text-[#14f195]">
              ✓ Verified on Solana Blockchain
            </span>
            <span>Ownership Renounced · Community Owned</span>
          </motion.div>
        </div>
      </section>

      {/* 5. MEMES GALLERY: CLOUDSCAPE & SUMMIT SKY IMAGE BACKGROUND */}
      <section
        id="memes"
        className="relative py-16 sm:py-24 border-t border-white/10 overflow-hidden"
      >
        {/* Section Image Background */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <img
            src="/img/born/Clouds.png"
            alt="Clouds"
            className="w-full h-full object-cover object-top opacity-30 mix-blend-screen"
          />
          <img
            src="/img/born/Ground.png"
            alt="Ground"
            className="absolute bottom-0 inset-x-0 w-full h-40 object-cover object-bottom opacity-40"
          />
          <div className="absolute inset-0 bg-[#0b0604]/85 backdrop-blur-[1px]"></div>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            variants={fadeInUp}
            className="text-center max-w-2xl mx-auto mb-8 sm:mb-12 space-y-1.5 sm:space-y-2"
          >
            <span className="text-[11px] sm:text-xs font-mono uppercase tracking-widest text-[#14f195] font-bold">
              COMMUNITY VAULT
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold uppercase font-display text-white drop-shadow-md">
              Meme Gallery
            </h2>
            <p className="text-xs sm:text-sm text-white/80">
              Click any meme to view full size and download.
            </p>
          </motion.div>

          {/* 2 Columns on Mobile, 3 Columns on Tablet/Desktop */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            variants={staggerContainer}
            className="grid grid-cols-2 md:grid-cols-3 gap-2.5 sm:gap-4"
          >
            {memes.map((m, idx) => (
              <motion.div
                key={idx}
                variants={fadeInUp}
                whileHover={{ scale: 1.03, y: -3 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  soundEffects.playPop();
                  setSelectedMeme(m);
                }}
                className="group aspect-square rounded-xl sm:rounded-2xl overflow-hidden bg-black/60 backdrop-blur-sm border border-white/15 hover:border-[#14f195]/60 cursor-pointer shadow-lg transition-colors"
              >
                <img
                  src={m}
                  alt={`Meme ${idx + 1}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 6. JOIN THE COMMUNITY SECTION: SUNSET MOUNTAIN HORIZON IMAGE BACKGROUND */}
      <section
        id="community"
        className="relative py-20 sm:py-28 border-t border-white/10 text-center overflow-hidden"
      >
        {/* Section Image Background */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <img
            src="/img/join/Land.png"
            alt="Sunset Horizon"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#080403] via-black/70 to-black/60 backdrop-blur-[1px]"></div>
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          variants={staggerContainer}
          className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 space-y-5 sm:space-y-6"
        >
          <motion.div variants={fadeInUp} className="space-y-2">
            <span className="text-[11px] sm:text-xs font-mono uppercase tracking-widest text-[#14f195] font-bold">
              TAKE THE STAGE
            </span>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-black uppercase font-display text-white drop-shadow-lg">
              Join The $LEON Community
            </h2>
            <p className="text-xs sm:text-sm md:text-base text-white/90 max-w-xl mx-auto drop-shadow-md">
              Every legend begins with taking the stage. Connect with fellow
              holders across our official channels.
            </p>
          </motion.div>

          {/* Social Links: Stacked on Mobile, Inline on Tablet/Desktop */}
          <motion.div
            variants={fadeInUp}
            className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-2.5 sm:gap-4 pt-2 w-full max-w-sm sm:max-w-none mx-auto"
          >
            <motion.a
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.96 }}
              href=""
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => soundEffects.playPop()}
              className="w-full sm:w-auto px-6 py-3 sm:py-3.5 rounded-xl bg-[#229ed9] hover:bg-[#1f8fc4] text-white font-mono font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl transition-colors cursor-pointer"
            >
              <Send className="w-4 h-4" />
              <span>Join Telegram</span>
            </motion.a>

            <motion.a
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.96 }}
              href="https://x.com/leonofsolana"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => soundEffects.playPop()}
              className="w-full sm:w-auto px-6 py-3 sm:py-3.5 rounded-xl bg-black/80 hover:bg-black border border-white/25 text-white font-mono font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl backdrop-blur-md transition-colors cursor-pointer"
            >
              <span className="font-bold text-sm">𝕏</span>
              <span>Follow on Twitter</span>
            </motion.a>

            <motion.a
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.96 }}
              href="https://raydium.io/swap/"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => soundEffects.playPop()}
              className="w-full sm:w-auto px-6 py-3 sm:py-3.5 rounded-xl bg-[#14f195] hover:bg-[#34f5a5] text-[#0b0604] font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl transition-colors cursor-pointer"
            >
              <span>Buy $LEON Now</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </motion.a>
          </motion.div>
        </motion.div>
      </section>

      {/* FOOTER: RESPONSIVE FOR MOBILE & TABLET */}
      <footer className="relative border-t border-white/10 bg-[#080403] text-white/60 py-8 sm:py-10 z-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-center sm:text-left">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full overflow-hidden border border-[#14f195]/40 bg-black">
              <img
                src={HERO_IMAGE}
                alt="$LEON"
                className="w-full h-full object-cover object-[69%_28%]"
              />
            </div>
            <span className="text-white font-bold">$LEON ON SOLANA</span>
          </div>

          <div className="flex items-center gap-3 sm:gap-4">
            <a
              href=""
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white py-1"
            >
              Telegram
            </a>
            <span>·</span>
            <a
              href="https://x.com/leonofsolana"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white py-1"
            >
              Twitter/X
            </a>
            <span>·</span>
            <button
              onClick={handleCopyCA}
              className="hover:text-white cursor-pointer py-1"
            >
              Copy CA
            </button>
          </div>

          <div className="text-white/40 text-[11px]">
            © 2026 $LEON. All rights reserved.
          </div>
        </div>
      </footer>

      {/* LIGHTBOX MODAL: RESPONSIVE MOBILE SIZING & KEYNOTE ZOOM */}
      <AnimatePresence>
        {selectedMeme && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-black/92 backdrop-blur-md flex items-center justify-center p-3 sm:p-5 cursor-pointer"
            onClick={() => setSelectedMeme(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 15 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative max-w-2xl w-[94vw] sm:w-full bg-[#180e0a] p-3 sm:p-5 rounded-2xl border border-white/20 space-y-3 shadow-2xl max-h-[90vh] flex flex-col justify-between"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative rounded-xl overflow-hidden bg-black/80 flex items-center justify-center min-h-[220px]">
                <img
                  src={selectedMeme}
                  alt={
                    selectedMeme === HERO_IMAGE
                      ? "$LEON Keynote Presentation"
                      : "Meme Preview"
                  }
                  className="w-full h-auto rounded-xl max-h-[68vh] object-contain mx-auto"
                />
              </div>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 pt-1">
                <span className="text-xs font-mono text-white/70 truncate">
                  {selectedMeme === HERO_IMAGE
                    ? "Official Keynote Presentation ($LEON on Solana)"
                    : selectedMeme === HOW_TO_BUY_BG
                      ? "Official $LEON Sunset Rooftop Artwork"
                      : selectedMeme === STORY_ARTWORK
                        ? "Zen Leon at Solana Falls Artwork"
                        : selectedMeme === STEP_1_IMG
                          ? "Step 01 Artwork: Create a Wallet ($LEON King)"
                          : selectedMeme === STEP_2_IMG
                            ? "Step 02 Artwork: Get Some SOL (Solana Orb)"
                            : selectedMeme === STEP_3_IMG
                              ? "Step 03 Artwork: Go to Raydium (Space Flight)"
                              : selectedMeme === STEP_4_IMG
                                ? "Step 04 Artwork: Swap for $LEON (Arcade DEX)"
                                : "Official Community Meme"}
                </span>
                <div className="flex items-center gap-2 shrink-0">
                  <motion.a
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    href={selectedMeme}
                    download={
                      selectedMeme === HERO_IMAGE
                        ? "leon-solana-keynote.png"
                        : selectedMeme === HOW_TO_BUY_BG
                          ? "leon-sunset-rooftop.jpeg"
                          : selectedMeme === STORY_ARTWORK
                            ? "zen-leon-solana-falls.jpeg"
                            : selectedMeme === STEP_1_IMG
                              ? "leon-step-1-wallet.jpeg"
                              : selectedMeme === STEP_2_IMG
                                ? "leon-step-2-sol.jpeg"
                                : selectedMeme === STEP_3_IMG
                                  ? "leon-step-3-raydium.jpeg"
                                  : selectedMeme === STEP_4_IMG
                                    ? "leon-step-4-swap.jpeg"
                                    : "leon-meme.jpg"
                    }
                    className="flex-1 sm:flex-initial px-3.5 py-2 rounded-lg bg-[#14f195] text-[#0b0604] font-bold font-mono text-xs flex items-center justify-center gap-1.5 cursor-pointer min-h-[38px]"
                  >
                    <Download className="w-3.5 h-3.5" /> Download HD
                  </motion.a>
                  <button
                    onClick={() => setSelectedMeme(null)}
                    className="px-3.5 py-2 rounded-lg bg-white/10 text-white font-mono text-xs hover:bg-white/20 cursor-pointer min-h-[38px]"
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
