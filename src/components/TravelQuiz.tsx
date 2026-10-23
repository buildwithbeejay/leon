import React, { useState } from 'react';
import { Compass, Sparkles, ArrowRight, RotateCcw, CheckCircle2 } from 'lucide-react';
import { VIBE_QUIZ, DESTINATIONS } from '../data/travelData';
import { Destination } from '../types';
import { soundEffects } from '../utils/audio';

interface TravelQuizProps {
  onSelectDestination: (dest: Destination) => void;
}

export const TravelQuiz: React.FC<TravelQuizProps> = ({ onSelectDestination }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [resultDestination, setResultDestination] = useState<Destination | null>(null);

  const handleSelectOption = (matchDestinationId: string) => {
    soundEffects.playPop();
    const nextAnswers = [...answers, matchDestinationId];
    setAnswers(nextAnswers);

    if (currentStep < VIBE_QUIZ.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Calculate most frequent destination
      const tally: Record<string, number> = {};
      nextAnswers.forEach((id) => {
        tally[id] = (tally[id] || 0) + 1;
      });

      let highestCount = 0;
      let winningId = 'machu-picchu';
      Object.entries(tally).forEach(([id, count]) => {
        if (count > highestCount) {
          highestCount = count;
          winningId = id;
        }
      });

      const matchedDest = DESTINATIONS.find((d) => d.id === winningId) || DESTINATIONS[0];
      setResultDestination(matchedDest);
      soundEffects.playSuccess();
    }
  };

  const handleReset = () => {
    soundEffects.playPop();
    setCurrentStep(0);
    setAnswers([]);
    setResultDestination(null);
  };

  return (
    <section className="py-20 bg-[#FAF8F5] border-b border-[#EAE3D6]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Card Frame */}
        <div className="bg-white rounded-3xl border border-[#E0D8CB] p-6 sm:p-10 shadow-sm relative overflow-hidden">
          
          {/* Header */}
          <div className="text-center max-w-xl mx-auto mb-8">
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#C85A32] mb-1.5">
              <Sparkles className="w-4 h-4" />
              <span>Paco’s Expedition Matcher</span>
            </div>
            <h2 className="font-editorial text-2xl sm:text-3xl lg:text-4xl font-bold text-[#2B2723]">
              Where Should Paco Take You?
            </h2>
            <p className="text-xs sm:text-sm text-[#665D52] mt-1.5">
              Answer 3 quick sensory questions to discover your ideal alpaca-approved travel sanctuary.
            </p>
          </div>

          {!resultDestination ? (
            <div className="space-y-6">
              {/* Progress Indicator */}
              <div className="flex items-center justify-between text-xs text-[#8C8276] pb-2 border-b border-[#F0EBE1]">
                <span>Question {currentStep + 1} of {VIBE_QUIZ.length}</span>
                <span className="font-semibold text-[#E8734A]">
                  Step {currentStep + 1}
                </span>
              </div>

              {/* Question */}
              <h3 className="font-editorial text-xl sm:text-2xl font-bold text-[#2B2723] text-center py-2">
                {VIBE_QUIZ[currentStep].question}
              </h3>

              {/* Options */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {VIBE_QUIZ[currentStep].options.map((option, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSelectOption(option.match)}
                    className="text-left p-4 rounded-2xl bg-[#FAF8F5] border border-[#E2D9CC] hover:border-[#E8734A] hover:bg-white transition-all text-xs sm:text-sm font-medium text-[#332F2A] flex items-center justify-between group active:scale-[0.99] shadow-2xs"
                  >
                    <span>{option.text}</span>
                    <ArrowRight className="w-4 h-4 text-[#C85A32] opacity-0 group-hover:opacity-100 transition-opacity shrink-0 ml-2" />
                  </button>
                ))}
              </div>
            </div>
          ) : (
            /* Result Showcase */
            <div className="space-y-6 animate-fade-in">
              <div className="p-4 bg-[#EBF5EE] border border-[#B7E0C2] rounded-2xl text-center text-xs text-[#206637] font-semibold">
                ✨ Paco has calculated your optimal wanderlust rhythm!
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                <div className="md:col-span-5 relative aspect-4/3 rounded-2xl overflow-hidden border border-[#DED5C7] polaroid-shadow">
                  <img
                    src={resultDestination.heroImage}
                    alt={resultDestination.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 left-3 bg-[#FAF8F5]/90 backdrop-blur-xs px-2.5 py-1 rounded text-xs font-semibold text-[#2B2723]">
                    {resultDestination.flag} {resultDestination.country}
                  </div>
                </div>

                <div className="md:col-span-7 space-y-3">
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#C85A32] block">
                    Your Tailored Sanctuary:
                  </span>
                  <h3 className="font-editorial text-2xl sm:text-3xl font-bold text-[#2B2723]">
                    {resultDestination.name}
                  </h3>
                  <p className="text-xs text-[#736B5F] italic font-medium">
                    {resultDestination.tagline}
                  </p>
                  <p className="text-xs text-[#4A433A] leading-relaxed">
                    {resultDestination.diarySnippet}
                  </p>

                  <div className="pt-2 flex flex-wrap items-center gap-3">
                    <button
                      onClick={() => onSelectDestination(resultDestination)}
                      className="px-5 py-2.5 bg-[#E8734A] text-white text-xs font-semibold rounded-xl hover:bg-[#D55F37] flex items-center gap-1.5 shadow-sm transition-all"
                    >
                      <Compass className="w-3.5 h-3.5" />
                      View Full Expedition Diary
                    </button>

                    <button
                      onClick={handleReset}
                      className="px-4 py-2.5 bg-white text-[#575046] text-xs font-semibold rounded-xl border border-[#DED5C7] hover:bg-[#FAF8F5] flex items-center gap-1.5"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      Take Quiz Again
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>

      </div>
    </section>
  );
};
