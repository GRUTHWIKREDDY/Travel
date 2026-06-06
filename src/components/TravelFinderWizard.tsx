import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Compass, Map, Globe, Calendar, Users, 
  Palmtree, Mountain, Landmark, Sparkles, 
  ArrowLeft, ArrowRight, HelpCircle, CheckCircle, 
  Hourglass, RefreshCw, Star, Info
} from 'lucide-react';
import { AppContent, TourPackage } from '../types';

interface TravelFinderWizardProps {
  content: AppContent;
  onSelectPackage: (pkg: TourPackage) => void;
  onViewItinerary: (pkg: TourPackage) => void;
}

type Step = 'start' | 'category' | 'terrain' | 'vibe' | 'companions' | 'duration' | 'results';

interface QuizAnswers {
  category: 'all' | 'domestic' | 'international';
  terrain: 'all' | 'beach' | 'mountain' | 'heritage';
  vibe: 'all' | 'relaxing' | 'adventure' | 'family' | 'luxury';
  companions: '1' | '2' | '3' | 'large';
  duration: 'any' | 'short' | 'medium' | 'long';
}

const initialAnswers: QuizAnswers = {
  category: 'all',
  terrain: 'all',
  vibe: 'all',
  companions: '2',
  duration: 'any'
};

export default function TravelFinderWizard({ content, onSelectPackage, onViewItinerary }: TravelFinderWizardProps) {
  const [currentStep, setCurrentStep] = useState<Step>('start');
  const [answers, setAnswers] = useState<QuizAnswers>(initialAnswers);
  const [results, setResults] = useState<TourPackage[]>([]);

  // Scoring engine mapping
  const calculateRecommendations = (currAnswers: QuizAnswers) => {
    const scores = content.packages.map((pkg) => {
      let score = 0;

      // 1. Regional Category score (domestic / international)
      if (currAnswers.category !== 'all') {
        if (pkg.category === currAnswers.category) {
          score += 6;
        } else {
          score -= 3; // soft penalty
        }
      } else {
        score += 2; // neutral
      }

      // 2. Terrain check
      const titleLower = pkg.title.toLowerCase();
      const descLower = pkg.description.toLowerCase();
      const highlightsLower = pkg.highlights.join(' ').toLowerCase();
      const textToSearch = `${titleLower} ${descLower} ${highlightsLower}`;

      if (currAnswers.terrain === 'beach') {
        const isBeach = textToSearch.includes('beach') || 
                        textToSearch.includes('backwater') || 
                        textToSearch.includes('alleppey') ||
                        textToSearch.includes('houseboat') ||
                        textToSearch.includes('marari') ||
                        textToSearch.includes('coral') || 
                        textToSearch.includes('lagoon') || 
                        textToSearch.includes('island') ||
                        textToSearch.includes('maldives') || 
                        textToSearch.includes('phuket') ||
                        textToSearch.includes('goa') ||
                        textToSearch.includes('andaman');
        if (isBeach) score += 6;
      } else if (currAnswers.terrain === 'mountain') {
        const isMountain = textToSearch.includes('mountain') || 
                           textToSearch.includes('meadow') || 
                           textToSearch.includes('snow') || 
                           textToSearch.includes('pass') || 
                           textToSearch.includes('gondola') || 
                           textToSearch.includes('mist') || 
                           textToSearch.includes('tea') || 
                           textToSearch.includes('munnar') ||
                           textToSearch.includes('valley') ||
                           textToSearch.includes('kashmir') || 
                           textToSearch.includes('ladakh') ||
                           textToSearch.includes('leh') ||
                           textToSearch.includes('swiss') ||
                           textToSearch.includes('alpine') ||
                           textToSearch.includes('titlis');
        if (isMountain) score += 6;
      } else if (currAnswers.terrain === 'heritage') {
        const isHeritage = textToSearch.includes('fort') || 
                           textToSearch.includes('palace') || 
                           textToSearch.includes('heritage') || 
                           textToSearch.includes('monastery') || 
                           textToSearch.includes('temple') || 
                           textToSearch.includes('dune') || 
                           textToSearch.includes('safari') || 
                           textToSearch.includes('museum') || 
                           textToSearch.includes('historical') ||
                           textToSearch.includes('rajasthan') ||
                           textToSearch.includes('dubai') ||
                           textToSearch.includes('rome') ||
                           textToSearch.includes('colosseum') ||
                           textToSearch.includes('singapore') ||
                           textToSearch.includes('london') ||
                           textToSearch.includes('paris');
        if (isHeritage) score += 6;
      } else {
        // all terrains
        score += 2;
      }

      // 3. Vibe check
      if (currAnswers.vibe === 'relaxing') {
        const isRelaxing = textToSearch.includes('honeymoon') || 
                           textToSearch.includes('leisure') || 
                           textToSearch.includes('houseboat') || 
                           textToSearch.includes('villa') || 
                           textToSearch.includes('massage') || 
                           textToSearch.includes('relax') || 
                           textToSearch.includes('spa') || 
                           textToSearch.includes('resort') ||
                           textToSearch.includes('tranquil');
        if (isRelaxing) score += 5;
      } else if (currAnswers.vibe === 'adventure') {
        const isAdventure = textToSearch.includes('gondola') || 
                            textToSearch.includes('cable car') || 
                            textToSearch.includes('watersports') || 
                            textToSearch.includes('snorkeling') || 
                            textToSearch.includes('safari') || 
                            textToSearch.includes('adventure') || 
                            textToSearch.includes('ride') || 
                            textToSearch.includes('hike') || 
                            textToSearch.includes('thrill');
        if (isAdventure) score += 5;
      } else if (currAnswers.vibe === 'family') {
        const isFamily = textToSearch.includes('family') || 
                         textToSearch.includes('universal') || 
                         textToSearch.includes('gardens') || 
                         textToSearch.includes('kids') || 
                         textToSearch.includes('parks') || 
                         textToSearch.includes('group') || 
                         textToSearch.includes('scenic') || 
                         textToSearch.includes('fort');
        if (isFamily) score += 5;
      } else if (currAnswers.vibe === 'luxury') {
        const isLuxury = textToSearch.includes('luxury') || 
                         textToSearch.includes('private') || 
                         textToSearch.includes('premium') || 
                         textToSearch.includes('all-inclusive') || 
                         textToSearch.includes('bungalow') || 
                         textToSearch.includes('vip') || 
                         textToSearch.includes('resort');
        if (isLuxury) score += 5;
      }

      // 4. Duration Check
      // Extract number array from duration e.g. "5 Nights / 6 Days" -> matches 6 Days
      const durationDaysMatch = pkg.duration.match(/(\d+)\s*Days/);
      const durationDays = durationDaysMatch ? parseInt(durationDaysMatch[1], 10) : 0;
      if (currAnswers.duration !== 'any' && durationDays > 0) {
        if (currAnswers.duration === 'short' && durationDays <= 5) {
          score += 4;
        } else if (currAnswers.duration === 'medium' && durationDays > 5 && durationDays <= 7) {
          score += 4;
        } else if (currAnswers.duration === 'long' && durationDays > 7) {
          score += 4;
        } else {
          score -= 1; // gentle negative offset
        }
      }

      return { pkg, score };
    });

    const sorted = [...scores].sort((a, b) => b.score - a.score);
    // Take Top 3 packages
    return sorted.slice(0, 3).map(item => item.pkg);
  };

  const setAnswerField = <K extends keyof QuizAnswers>(field: K, value: QuizAnswers[K]) => {
    const updatedAnswers = { ...answers, [field]: value };
    setAnswers(updatedAnswers);
  };

  const handleNextStep = (next: Step) => {
    setCurrentStep(next);
  };

  const triggerSearch = () => {
    const matched = calculateRecommendations(answers);
    setResults(matched);
    setCurrentStep('results');
  };

  const handleReset = () => {
    setAnswers(initialAnswers);
    setCurrentStep('start');
    setResults([]);
  };

  const getProgressPercent = () => {
    switch (currentStep) {
      case 'start': return 0;
      case 'category': return 20;
      case 'terrain': return 40;
      case 'vibe': return 60;
      case 'companions': return 80;
      case 'duration': return 95;
      case 'results': return 100;
      default: return 0;
    }
  };

  return (
    <div className="w-full bg-white border border-stone-200 rounded-2xl overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.02)] p-4 sm:p-8 md:p-10" id="travel-finder-assistant">
      
      {/* Upper Status Line */}
      <div className="flex items-center justify-between border-b border-stone-150 pb-4 mb-6">
        <div className="flex items-center space-x-2.5">
          <div className="bg-amber-100 p-2 sm:p-2.5 rounded-full text-amber-800">
            <Sparkles size={16} className="animate-pulse" />
          </div>
          <div className="text-left">
            <h3 className="text-stone-900 font-bold text-xs sm:text-sm uppercase tracking-wide font-sans">
              Dynamic Escape Matcher
            </h3>
            <p className="text-stone-500 text-[10px] sm:text-xs font-semibold">
              Find your ideal luxury gateway in 5 steps.
            </p>
          </div>
        </div>
        
        {currentStep !== 'start' && currentStep !== 'results' && (
          <button 
            onClick={handleReset}
            className="flex items-center space-x-1.5 text-stone-500 hover:text-amber-800 text-[10px] uppercase tracking-widest font-mono font-bold transition-colors cursor-pointer bg-stone-100 hover:bg-amber-50 rounded-md px-2.5 py-1.5 border border-stone-200"
          >
            <RefreshCw size={11} />
            <span>Reset Quiz</span>
          </button>
        )}
      </div>

      {/* Progress Bar indicator */}
      {currentStep !== 'start' && currentStep !== 'results' && (
        <div className="w-full h-1.5 bg-stone-100 rounded-full mb-8 overflow-hidden relative">
          <motion.div 
            className="h-full bg-amber-500"
            initial={{ width: '0%' }}
            animate={{ width: `${getProgressPercent()}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      )}

      <AnimatePresence mode="wait">
        
        {/* Step 1: Landing Start Screen */}
        {currentStep === 'start' && (
          <motion.div 
            key="start"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="text-center py-6 sm:py-10 space-y-6 max-w-xl mx-auto"
          >
            <div className="mx-auto bg-amber-50 text-amber-600 h-16 w-16 rounded-full border border-amber-200 flex items-center justify-center shadow-sm">
              <Compass size={32} className="animate-spin-slow stroke-[1.8]" />
            </div>
            
            <div className="space-y-2">
              <h4 className="text-xl sm:text-2xl font-extrabold text-stone-900 font-serif uppercase tracking-wide">
                Unsure Where to Vacation Next?
              </h4>
              <p className="text-stone-605 text-xs sm:text-sm leading-relaxed font-medium px-2">
                Sonika's personal travel curation algorithm matches your mood, preferred sights, travel duration, and company to recommend the highest-ranked tour packages in our catalog instantly.
              </p>
            </div>

            <button
              onClick={() => handleNextStep('category')}
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-bold px-8 py-3.5 sm:py-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-[1.01] uppercase tracking-wider text-xs cursor-pointer"
              id="start-finder-button"
            >
              <span>Begin Vacation Matcher</span>
              <ArrowRight size={14} />
            </button>
          </motion.div>
        )}

        {/* Step 2: Regional Segment */}
        {currentStep === 'category' && (
          <motion.div 
            key="category"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="text-center space-y-2">
              <span className="text-amber-800 font-mono text-[10px] font-bold tracking-widest uppercase">STEPS 1 OF 5</span>
              <h4 className="text-base sm:text-lg font-bold uppercase tracking-wide text-stone-900">Select Travel Zone Scope</h4>
              <p className="text-stone-500 text-xs font-semibold">Do you want to stay in India or journey across borders globally?</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <button 
                onClick={() => {
                  setAnswerField('category', 'domestic');
                  handleNextStep('terrain');
                }}
                className={`flex flex-col items-center justify-between text-center p-6 border-2 rounded-xl transition-all duration-200 group cursor-pointer ${
                  answers.category === 'domestic' 
                    ? 'border-amber-500 bg-amber-50/20 shadow-md' 
                    : 'border-stone-200 bg-white hover:border-amber-500/40 hover:bg-stone-50'
                }`}
              >
                <div className="bg-amber-100 text-amber-800 p-3 rounded-full mb-4">
                  <Map size={24} />
                </div>
                <div className="space-y-1">
                  <span className="block text-stone-900 font-extrabold text-xs uppercase tracking-wide">Domestic Escapes</span>
                  <p className="text-[10px] text-stone-500 font-semibold leading-relaxed">Kerala, Kashmir mountains, Ladakh passes, Royal Rajasthan, Andaman islands.</p>
                </div>
              </button>

              <button 
                onClick={() => {
                  setAnswerField('category', 'international');
                  handleNextStep('terrain');
                }}
                className={`flex flex-col items-center justify-between text-center p-6 border-2 rounded-xl transition-all duration-200 group cursor-pointer ${
                  answers.category === 'international' 
                    ? 'border-amber-500 bg-amber-50/20 shadow-md' 
                    : 'border-stone-200 bg-white hover:border-amber-500/40 hover:bg-stone-50'
                }`}
              >
                <div className="bg-amber-100 text-amber-800 p-3 rounded-full mb-4">
                  <Globe size={24} />
                </div>
                <div className="space-y-1">
                  <span className="block text-stone-900 font-extrabold text-xs uppercase tracking-wide">International Global</span>
                  <p className="text-[10px] text-stone-500 font-semibold leading-relaxed">Luxury Maldives, Bali lagoons, Dubai futuristic skylines, iconic Paris & Swiss Alps.</p>
                </div>
              </button>

              <button 
                onClick={() => {
                  setAnswerField('category', 'all');
                  handleNextStep('terrain');
                }}
                className={`flex flex-col items-center justify-between text-center p-6 border-2 rounded-xl transition-all duration-200 group cursor-pointer ${
                  answers.category === 'all' 
                    ? 'border-amber-500 bg-amber-50/20 shadow-md' 
                    : 'border-stone-200 bg-white hover:border-amber-500/40 hover:bg-stone-50'
                }`}
              >
                <div className="bg-amber-100 text-amber-800 p-3 rounded-full mb-4">
                  <Sparkles size={24} />
                </div>
                <div className="space-y-1">
                  <span className="block text-stone-900 font-extrabold text-xs uppercase tracking-wide">Surprise Me / Indifferent</span>
                  <p className="text-[10px] text-stone-500 font-semibold leading-relaxed">Show me the top high-scoring deals from both categories combined.</p>
                </div>
              </button>
            </div>

            <div className="flex justify-start pt-4">
              <button 
                onClick={() => handleNextStep('start')}
                className="flex items-center space-x-1.5 text-stone-600 hover:text-stone-900 text-xs font-bold uppercase tracking-wider border border-stone-200 bg-white hover:bg-stone-50 px-4 py-2.5 rounded-lg cursor-pointer transition-colors"
              >
                <ArrowLeft size={13} />
                <span>Back</span>
              </button>
            </div>
          </motion.div>
        )}

        {/* Step 3: Terrains */}
        {currentStep === 'terrain' && (
          <motion.div 
            key="terrain"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="text-center space-y-2">
              <span className="text-amber-800 font-mono text-[10px] font-bold tracking-widest uppercase">STEPS 2 OF 5</span>
              <h4 className="text-base sm:text-lg font-bold uppercase tracking-wide text-stone-900">Choose Your Favorite Terrain Landscape</h4>
              <p className="text-stone-500 text-xs font-semibold">Which geographic vistas represent your dream getaway setting?</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
              <button 
                onClick={() => {
                  setAnswerField('terrain', 'beach');
                  handleNextStep('vibe');
                }}
                className={`flex flex-col items-center justify-between text-center p-5 border-2 rounded-xl transition-all duration-205 cursor-pointer ${
                  answers.terrain === 'beach' 
                    ? 'border-amber-500 bg-amber-50/20 shadow-md' 
                    : 'border-stone-200 bg-white hover:border-amber-500/40 hover:bg-stone-50'
                }`}
              >
                <Palmtree size={28} className="text-amber-600 mb-3" />
                <span className="text-stone-900 font-extrabold text-[11px] uppercase tracking-wider mb-1 block">Beaches & Islands</span>
                <p className="text-[9px] text-stone-505 font-medium leading-relaxed">Pristine white sands, coral snorkeling, boat rides.</p>
              </button>

              <button 
                onClick={() => {
                  setAnswerField('terrain', 'mountain');
                  handleNextStep('vibe');
                }}
                className={`flex flex-col items-center justify-between text-center p-5 border-2 rounded-xl transition-all duration-205 cursor-pointer ${
                  answers.terrain === 'mountain' 
                    ? 'border-amber-500 bg-amber-50/20 shadow-md' 
                    : 'border-stone-200 bg-white hover:border-amber-500/40 hover:bg-stone-50'
                }`}
              >
                <Mountain size={28} className="text-amber-600 mb-3" />
                <span className="text-stone-900 font-extrabold text-[11px] uppercase tracking-wider mb-1 block">Snow Peaks & Valleys</span>
                <p className="text-[9px] text-stone-505 font-medium leading-relaxed">Alpine views, mist trails, rivers, pine forests.</p>
              </button>

              <button 
                onClick={() => {
                  setAnswerField('terrain', 'heritage');
                  handleNextStep('vibe');
                }}
                className={`flex flex-col items-center justify-between text-center p-5 border-2 rounded-xl transition-all duration-205 cursor-pointer ${
                  answers.terrain === 'heritage' 
                    ? 'border-amber-500 bg-amber-50/20 shadow-md' 
                    : 'border-stone-200 bg-white hover:border-amber-500/40 hover:bg-stone-50'
                }`}
              >
                <Landmark size={28} className="text-amber-600 mb-3" />
                <span className="text-stone-900 font-extrabold text-[11px] uppercase tracking-wider mb-1 block">Historic & Dunes</span>
                <p className="text-[9px] text-stone-505 font-medium leading-relaxed">Colonial architecture, desert sand dunes, ancient palaces.</p>
              </button>

              <button 
                onClick={() => {
                  setAnswerField('terrain', 'all');
                  handleNextStep('vibe');
                }}
                className={`flex flex-col items-center justify-between text-center p-5 border-2 rounded-xl transition-all duration-205 cursor-pointer ${
                  answers.terrain === 'all' 
                    ? 'border-amber-500 bg-amber-50/20 shadow-md' 
                    : 'border-stone-200 bg-white hover:border-amber-500/40 hover:bg-stone-50'
                }`}
              >
                <Compass size={28} className="text-amber-600 mb-3" />
                <span className="text-stone-900 font-extrabold text-[11px] uppercase tracking-wider mb-1 block">Mixed Terrain Vibe</span>
                <p className="text-[9px] text-stone-505 font-medium leading-relaxed">I love combining scenic skylines, mountains, and water together!</p>
              </button>
            </div>

            <div className="flex justify-start">
              <button 
                onClick={() => handleNextStep('category')}
                className="flex items-center space-x-1.5 text-stone-600 hover:text-stone-900 text-xs font-bold uppercase tracking-wider border border-stone-200 bg-white hover:bg-stone-50 px-4 py-2.5 rounded-lg cursor-pointer transition-colors"
              >
                <ArrowLeft size={13} />
                <span>Back</span>
              </button>
            </div>
          </motion.div>
        )}

        {/* Step 4: Vibes */}
        {currentStep === 'vibe' && (
          <motion.div 
            key="vibe"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="text-center space-y-2">
              <span className="text-amber-800 font-mono text-[10px] font-bold tracking-widest uppercase">STEPS 3 OF 5</span>
              <h4 className="text-base sm:text-lg font-bold uppercase tracking-wide text-stone-900">Define the Trip Atmosphere (Vibe)</h4>
              <p className="text-stone-500 text-xs font-semibold">How do you prefer to spend your days in the outer world?</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
              {[
                { id: 'relaxing', title: 'Leisure & Romantic', desc: 'Slow-paced, spa massages, private houseboats, peaceful lakes' },
                { id: 'adventure', title: 'Adrenaline & Sights', desc: 'Snow cable cars, speedboats, watersports, dune excursions' },
                { id: 'family', title: 'Family & Theme Parks', desc: 'Sprawling gardens, theme park ticket reserves, kid attractions' },
                { id: 'luxury', title: 'Private & Premium', desc: 'Top tier bungalows, floating chef dinners, AC vehicles' },
                { id: 'all', title: 'General Overview', desc: 'Balanced integration of relaxation, sightseeing, and dining' }
              ].map((item) => (
                <button 
                  key={item.id}
                  onClick={() => {
                    setAnswerField('vibe', item.id as any);
                    handleNextStep('companions');
                  }}
                  className={`flex flex-col items-center justify-between text-center p-4 border-2 rounded-xl transition-all duration-200 cursor-pointer ${
                    answers.vibe === item.id 
                      ? 'border-amber-500 bg-amber-50/20 shadow-md' 
                      : 'border-stone-200 bg-white hover:border-amber-500/40 hover:bg-stone-50'
                  }`}
                >
                  <span className="h-2 w-2 rounded-full mb-2 bg-amber-500" />
                  <span className="text-stone-900 font-extrabold text-[10px] sm:text-[11px] uppercase tracking-wider mb-2 block leading-snug">
                    {item.title}
                  </span>
                  <p className="text-[9px] text-stone-500 leading-normal font-semibold">
                    {item.desc}
                  </p>
                </button>
              ))}
            </div>

            <div className="flex justify-start">
              <button 
                onClick={() => handleNextStep('terrain')}
                className="flex items-center space-x-1.5 text-stone-600 hover:text-stone-900 text-xs font-bold uppercase tracking-wider border border-stone-200 bg-white hover:bg-stone-50 px-4 py-2.5 rounded-lg cursor-pointer transition-colors"
              >
                <ArrowLeft size={13} />
                <span>Back</span>
              </button>
            </div>
          </motion.div>
        )}

        {/* Step 5: Companions */}
        {currentStep === 'companions' && (
          <motion.div 
            key="companions"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="text-center space-y-2">
              <span className="text-amber-800 font-mono text-[10px] font-bold tracking-widest uppercase">STEPS 4 OF 5</span>
              <h4 className="text-base sm:text-lg font-bold uppercase tracking-wide text-stone-900">Total Travelers Joining</h4>
              <p className="text-stone-500 text-xs font-semibold">This helps customize default rooms, transfers, and private vehicles.</p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl mx-auto">
              {[
                { id: '1', title: 'Solo Traveler', icon: Users, qty: '1 Adult' },
                { id: '2', title: 'Couple / Honeymoon', icon: Users, qty: '2 Adults' },
                { id: '3', title: 'Family Curation', icon: Users, qty: '3 - 5 Members' },
                { id: 'large', title: 'Corporate/Assembly', icon: Users, qty: '5+ Members' }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setAnswerField('companions', item.id as any);
                    handleNextStep('duration');
                  }}
                  className={`flex flex-col items-center justify-center p-6 border-2 rounded-xl transition-all duration-200 cursor-pointer text-center ${
                    answers.companions === item.id 
                      ? 'border-amber-500 bg-amber-50/20 shadow-md' 
                      : 'border-stone-200 bg-white hover:border-amber-500/40 hover:bg-stone-50'
                  }`}
                >
                  <item.icon size={24} className="text-amber-600 mb-2" />
                  <span className="text-stone-900 font-extrabold text-[11px] uppercase tracking-wide block mb-1">
                    {item.title}
                  </span>
                  <p className="text-[10px] text-stone-500 font-semibold">{item.qty}</p>
                </button>
              ))}
            </div>

            <div className="flex justify-start">
              <button 
                onClick={() => handleNextStep('vibe')}
                className="flex items-center space-x-1.5 text-stone-600 hover:text-stone-900 text-xs font-bold uppercase tracking-wider border border-stone-200 bg-white hover:bg-stone-50 px-4 py-2.5 rounded-lg cursor-pointer transition-colors"
              >
                <ArrowLeft size={13} />
                <span>Back</span>
              </button>
            </div>
          </motion.div>
        )}

        {/* Step 6: Duration Input */}
        {currentStep === 'duration' && (
          <motion.div 
            key="duration"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="text-center space-y-2">
              <span className="text-amber-800 font-mono text-[10px] font-bold tracking-widest uppercase">STEPS 5 OF 5</span>
              <h4 className="text-base sm:text-lg font-bold uppercase tracking-wide text-stone-900">Preferred Travel Duration</h4>
              <p className="text-stone-500 text-xs font-semibold">How many days can you allocate to this majestic holiday?</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 max-w-2xl mx-auto">
              {[
                { id: 'short', title: 'Quick Escape', tag: 'Under 5 Days', desc: 'Ideal for short weekends or brief city explorers (Goa/Andaman)' },
                { id: 'medium', title: 'Classic Vacation', tag: '5 to 7 Days', desc: 'Fits standard Kashmir, Kerala, Ladakh & Bali honeymoon loops perfectly' },
                { id: 'long', title: 'Premium Sojourn', tag: '8+ Days / Immersive', desc: 'Perfect for extended Western Europe tours or deep island retreats' },
                { id: 'any', title: 'No Restriction', tag: 'Flexible Duration', desc: 'Show me all vacations matching other preferences regardless of length' }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setAnswerField('duration', item.id as any);
                    // This is the final step, trigger calculation!
                    const updatedAnswers = { ...answers, duration: item.id as any };
                    const matched = calculateRecommendations(updatedAnswers);
                    setResults(matched);
                    setCurrentStep('results');
                  }}
                  className={`flex flex-col items-center justify-between p-5 border-2 rounded-xl transition-all duration-200 cursor-pointer text-center ${
                    answers.duration === item.id 
                      ? 'border-amber-500 bg-amber-50/20 shadow-md' 
                      : 'border-stone-200 bg-white hover:border-amber-500/40 hover:bg-stone-50'
                  }`}
                >
                  <Hourglass size={20} className="text-amber-600 mb-2" />
                  <div className="space-y-1">
                    <span className="text-stone-900 font-extrabold text-[11px] uppercase tracking-wide block">{item.title}</span>
                    <span className="text-[10px] text-amber-700 font-mono font-bold uppercase">{item.tag}</span>
                  </div>
                  <p className="text-[9px] text-stone-500 mt-2 font-semibold">{item.desc}</p>
                </button>
              ))}
            </div>

            <div className="flex justify-start">
              <button 
                onClick={() => handleNextStep('companions')}
                className="flex items-center space-x-1.5 text-stone-600 hover:text-stone-900 text-xs font-bold uppercase tracking-wider border border-stone-200 bg-white hover:bg-stone-50 px-4 py-2.5 rounded-lg cursor-pointer transition-colors"
              >
                <ArrowLeft size={13} />
                <span>Back</span>
              </button>
            </div>
          </motion.div>
        )}

        {/* Step 7: Results Reveal Page */}
        {currentStep === 'results' && (
          <motion.div 
            key="results"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="space-y-8"
          >
            <div className="text-center space-y-2">
              <div className="bg-emerald-50 text-emerald-600 h-12 w-12 rounded-full border border-emerald-200 flex items-center justify-center mx-auto mb-2 shadow-sm">
                <CheckCircle size={22} />
              </div>
              <h4 className="text-xl font-extrabold text-stone-900 uppercase font-serif tracking-tight">Your Handpicked Travel Matches!</h4>
              <p className="text-stone-600 text-xs sm:text-sm max-w-lg mx-auto leading-relaxed font-semibold">
                Based on your criteria, our premium tour manager algorithm matched these top 3 vacation routes perfectly. Analyze details or view full day-by-day itineraries.
              </p>
            </div>

            {/* Results Grid Layout - Styled responsively */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {results.map((pkg) => (
                <div 
                  key={pkg.id}
                  className="bg-stone-50 border border-stone-200 rounded-xl overflow-hidden shadow-sm flex flex-col justify-between hover:border-amber-500/25 transition-all duration-200"
                >
                  <div className="relative h-44 w-full">
                    <img 
                      src={pkg.imageUrl} 
                      alt={pkg.title} 
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent" />
                    
                    <span className="absolute top-3 left-3 bg-white/95 text-stone-900 font-mono text-[8px] font-bold tracking-widest uppercase px-2 py-0.5 rounded border border-amber-500/10">
                      {pkg.category === 'domestic' ? 'Domestic Escape' : 'International Deluxe'}
                    </span>
                    
                    <div className="absolute bottom-3 left-4 right-4">
                      <p className="text-[9px] text-amber-400 font-mono font-bold uppercase tracking-wider">{pkg.duration}</p>
                      <h5 className="text-white text-xs sm:text-sm font-bold uppercase tracking-wide truncate mt-0.5">{pkg.title}</h5>
                    </div>
                  </div>

                  <div className="p-4 space-y-4 flex-1 flex flex-col justify-between">
                    <div className="space-y-2 text-xs">
                      <div className="flex items-center justify-between text-[11px] font-mono">
                        <span className="flex items-center text-amber-700 font-bold bg-amber-50/70 p-1.5 rounded leading-none border border-amber-200/10">
                          ★ {pkg.rating.toFixed(1)} / 5
                        </span>
                        <span className="text-emerald-700 font-extrabold text-xs">{pkg.price}</span>
                      </div>
                      <p className="text-stone-605 text-[11px] leading-relaxed font-semibold line-clamp-3">
                        {pkg.description}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-stone-200 grid grid-cols-2 gap-2 text-[10px]">
                      <button
                        onClick={() => onViewItinerary(pkg)}
                        className="bg-white hover:bg-stone-100 border border-stone-250 text-stone-800 font-bold py-2 px-1 rounded transition-colors cursor-pointer uppercase tracking-wider font-mono text-center flex items-center justify-center space-x-1"
                        id={`wizard-itinerary-${pkg.id}`}
                      >
                        <Compass size={10} className="text-amber-600" />
                        <span>Itinerary</span>
                      </button>
                      <button
                        onClick={() => onSelectPackage(pkg)}
                        className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold py-2 px-1 rounded transition-colors cursor-pointer uppercase tracking-wider text-center"
                        id={`wizard-book-${pkg.id}`}
                      >
                        Book Trip
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom Actions */}
            <div className="border-t border-stone-200 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center space-x-2.5 text-xs text-stone-600 font-semibold bg-stone-50 p-3 rounded-lg border border-stone-150 p-3.5 flex-1 max-w-xl text-left bg-gradient-to-r from-amber-500/5 to-transparent">
                <Info size={16} className="text-amber-600 flex-shrink-0" />
                <span className="leading-relaxed">
                  Have unique parameters like strict diets, specific elderly accessibility needs, or corporate group sizes? We customize all packages. Connect with Sonika to tailor.
                </span>
              </div>
              
              <button 
                onClick={handleReset}
                className="w-full sm:w-auto bg-stone-900 hover:bg-stone-800 text-amber-400 font-bold px-6 py-3 rounded-lg text-xs uppercase tracking-wider transition-all cursor-pointer shadow-md inline-flex items-center justify-center space-x-2 whitespace-nowrap"
              >
                <RefreshCw size={12} className="animate-spin-slow text-amber-500" />
                <span>Retake Questionnaires</span>
              </button>
            </div>
          </motion.div>
        )}

      </AnimatePresence>

    </div>
  );
}
