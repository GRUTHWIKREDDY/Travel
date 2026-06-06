import React, { useState } from 'react';
import { Search, Compass, Shield, Calendar, Star, BadgeCheck, CheckCircle2, ChevronRight, Filter, Milestone } from 'lucide-react';
import { AppContent, TourPackage } from '../../types';
import ItineraryModal from '../../components/ItineraryModal';

interface PackagesSectionProps {
  content: AppContent;
  onSelectPackage: (pkg: TourPackage) => void;
}

export default function PackagesSection({ content, onSelectPackage }: PackagesSectionProps) {
  const [filterCategory, setFilterCategory] = useState<'all' | 'domestic' | 'international'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [priceSort, setPriceSort] = useState<'none' | 'low-high' | 'high-low'>('none');
  const [selectedHighlightPkg, setSelectedHighlightPkg] = useState<string | null>(null);
  
  // State for itinerary timeline viewer modal
  const [selectedItineraryPkg, setSelectedItineraryPkg] = useState<TourPackage | null>(null);

  // Helper to parse price numerical value for robust sorting
  const parsePriceNum = (priceStr: string) => {
    // e.g. "₹24,999 onwards" or "₹1,85,000 onwards"
    const parsed = parseInt(priceStr.replace(/[^0-9]/g, ''), 10);
    return isNaN(parsed) ? 0 : parsed;
  };

  // Filter packages list based on queries
  const filteredPackages = content.packages
    .filter((pkg) => {
      const matchesCategory = filterCategory === 'all' || pkg.category === filterCategory;
      const matchesSearch = pkg.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            pkg.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            pkg.highlights.some(h => h.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    })
    .sort((a, b) => {
      if (priceSort === 'low-high') {
        return parsePriceNum(a.price) - parsePriceNum(b.price);
      } else if (priceSort === 'high-low') {
        return parsePriceNum(b.price) - parsePriceNum(a.price);
      }
      return 0; // standard sorting
    });

  return (
    <div className="w-full bg-stone-50 py-16 text-stone-800 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Page Top Intro */}
        <div className="text-center space-y-4 mb-12 animate-fade-in">
          <span className="text-amber-700 font-mono text-xs font-bold tracking-widest uppercase block bg-amber-50 px-3 py-1 rounded border border-amber-200/50 inline-block">
            LUXURY ESCAPES PORTFOLIO
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold uppercase text-stone-900 font-serif tracking-tight">
            Tailor-Made Tour Packages
          </h1>
          <p className="text-stone-600 text-xs md:text-sm max-w-2xl mx-auto leading-relaxed font-semibold">
            From the mystical tea mist of Munnar, Kerala to the luxury overwater lagoons of the Maldives, optimize your life journeys with SM Tours & Travels. Click any package card to inspect details and its customized day-to-day itinerary!
          </p>
        </div>

        {/* 1. INTERACTIVE FILTERING CONTROLS */}
        <div className="bg-white border border-stone-200 p-4 sm:p-6 rounded-xl mb-10 space-y-4 shadow-[0_4px_25px_rgba(0,0,0,0.015)] font-sans">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            
            {/* Horizontal Segmented Category switcher */}
            <div className="flex bg-stone-100 p-1 rounded-lg border border-stone-200/60 gap-1 overflow-x-auto w-full lg:w-auto">
              <button
                onClick={() => setFilterCategory('all')}
                className={`flex-1 lg:flex-none text-center py-2 px-3 sm:px-5 rounded-md text-[11px] sm:text-xs uppercase tracking-wider transition-colors font-bold cursor-pointer whitespace-nowrap ${
                  filterCategory === 'all'
                    ? 'bg-amber-500 text-slate-950 shadow-sm'
                    : 'text-stone-600 hover:text-stone-900 hover:bg-stone-200/40'
                }`}
              >
                All Packages
              </button>
              
              <button
                onClick={() => setFilterCategory('domestic')}
                className={`flex-1 lg:flex-none text-center py-2 px-3 sm:px-5 rounded-md text-[11px] sm:text-xs uppercase tracking-wider transition-colors font-bold cursor-pointer whitespace-nowrap ${
                  filterCategory === 'domestic'
                    ? 'bg-amber-500 text-slate-950 shadow-sm'
                    : 'text-stone-600 hover:text-stone-900 hover:bg-stone-200/40'
                }`}
              >
                Domestic Handpicks
              </button>

              <button
                onClick={() => setFilterCategory('international')}
                className={`flex-1 lg:flex-none text-center py-2 px-3 sm:px-5 rounded-md text-[11px] sm:text-xs uppercase tracking-wider transition-colors font-bold cursor-pointer whitespace-nowrap ${
                  filterCategory === 'international'
                    ? 'bg-amber-500 text-slate-950 shadow-sm'
                    : 'text-stone-600 hover:text-stone-900 hover:bg-stone-200/40'
                }`}
              >
                International Global
              </button>
            </div>

            {/* Sorter and Search row */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto">
              {/* Price Sorter */}
              <div className="flex items-center justify-between sm:justify-start space-x-3 bg-stone-100 px-4 py-2 rounded-lg border border-stone-200 flex-1 sm:flex-none">
                <div className="flex items-center space-x-2">
                  <Filter size={14} className="text-amber-700 font-bold" />
                  <span className="text-stone-600 text-[10px] uppercase font-extrabold tracking-wider font-mono">Sort Prices:</span>
                </div>
                <select
                  value={priceSort}
                  onChange={(e) => setPriceSort(e.target.value as any)}
                  className="bg-transparent text-stone-800 text-xs font-bold uppercase tracking-wider focus:outline-none cursor-pointer"
                  id="price-sort-select"
                >
                  <option value="none" className="bg-white text-stone-700">Standard</option>
                  <option value="low-high" className="bg-white text-stone-700">Low to High</option>
                  <option value="high-low" className="bg-white text-stone-700">High to Low</option>
                </select>
              </div>

              {/* Custom search bar */}
              <div className="relative w-full sm:max-w-xs flex-1">
                <Search className="absolute left-3.5 top-2.5 text-stone-500 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search destinations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-stone-100 text-stone-800 placeholder-stone-500 pl-10 pr-4 py-2 px-3 text-xs border border-stone-250 rounded-lg focus:border-amber-500 focus:bg-white focus:outline-none transition-all"
                  id="package-search-input"
                />
              </div>
            </div>

          </div>

          {/* Quick Filter Info Tag */}
          <div className="text-right text-xs text-stone-500 font-mono font-semibold">
            We discovered <span className="text-amber-800 font-bold">{filteredPackages.length}</span> premium vacation layouts
          </div>
        </div>

        {/* 2. THE RICH PACKAGES GRID LIST */}
        {filteredPackages.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {filteredPackages.map((pkg) => {
              const isOpen = selectedHighlightPkg === pkg.id;
              return (
                <div
                  key={pkg.id}
                  onClick={() => setSelectedItineraryPkg(pkg)}
                  className="bg-white border border-stone-200/80 hover:border-amber-500/40 rounded-xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.015)] hover:shadow-[0_15px_40px_rgba(217,119,6,0.08)] transition-all duration-300 group flex flex-col justify-between cursor-pointer transform hover:-translate-y-1.5"
                  id={`pkg-card-${pkg.id}`}
                  title="Click to view full Day-by-Day itinerary"
                >
                  <div className="relative">
                    {/* Destination Image backdrop */}
                    <div className="h-56 overflow-hidden relative">
                      <img
                        src={pkg.imageUrl}
                        alt={pkg.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 grayscale-[15%] group-hover:grayscale-0"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-stone-900/90 via-stone-900/20 to-transparent" />
                    </div>

                    {/* Category Label */}
                    <span className="absolute top-4 left-4 bg-white/95 backdrop-blur border border-amber-500/10 text-amber-800 px-3 py-1 rounded text-[9px] uppercase tracking-widest font-mono font-bold shadow-sm">
                      {pkg.category === 'domestic' ? 'Domestic Escape' : 'International Deluxe'}
                    </span>

                    {/* Duration Display */}
                    <span className="absolute bottom-4 right-4 bg-amber-500 text-slate-950 text-xs font-bold py-1.5 px-3.5 rounded font-mono shadow-md">
                      {pkg.duration}
                    </span>
                  </div>

                  {/* Core Card Details Container */}
                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-xs font-sans">
                        <div className="flex items-center text-amber-700 font-bold bg-amber-50/70 px-2 py-0.5 rounded border border-amber-200/20">
                          <Star size={12} className="fill-current text-amber-500 mr-1" />
                          <span>{pkg.rating.toFixed(1)} Guest Rating</span>
                        </div>
                        <span className="text-emerald-700 font-extrabold text-sm tracking-wider">{pkg.price}</span>
                      </div>

                      <h3 className="text-stone-900 text-base font-extrabold group-hover:text-amber-800 duration-200 uppercase tracking-wide font-serif">
                        {pkg.title}
                      </h3>

                      <p className="text-stone-600 text-xs leading-relaxed font-semibold line-clamp-2">
                        {pkg.description}
                      </p>
                    </div>

                    {/* Show toggleable custom highlights panel */}
                    <div 
                      className="pt-4 border-t border-stone-100"
                      onClick={(e) => {
                        // Prevent opening itinerary modal when toggling highlights
                        e.stopPropagation();
                      }}
                    >
                      <button
                        onClick={() => setSelectedHighlightPkg(isOpen ? null : pkg.id)}
                        className="text-amber-700 hover:text-amber-600 font-bold text-xs flex items-center mb-3 cursor-pointer select-none"
                      >
                        <span>{isOpen ? 'Fold Highlights' : 'Reveal Core Highlights'}</span>
                        <ChevronRight size={13} className={`ml-1 transform transition-transform ${isOpen ? 'rotate-90' : ''}`} />
                      </button>

                      {isOpen ? (
                        <ul className="space-y-2 py-1.5">
                          {pkg.highlights.map((h, i) => (
                            <li key={i} className="flex items-start text-xs text-stone-700 font-medium">
                              <CheckCircle2 size={12} className="text-amber-600 mr-2 mt-0.5 flex-shrink-0" />
                              <span>{h}</span>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <div className="text-[10px] text-stone-500 italic pb-1 uppercase tracking-wider font-mono font-bold">
                          ⚡ Consists of star luxury stays & private vehicles
                        </div>
                      )}
                    </div>

                    {/* Beautiful, dual CTA buttons */}
                    <div className="grid grid-cols-2 gap-3 pt-2 font-sans">
                      <button
                        onClick={(e) => {
                          e.stopPropagation(); // Prevent clicking card itself
                          setSelectedItineraryPkg(pkg);
                        }}
                        className="w-full bg-stone-100 hover:bg-stone-200/80 text-stone-800 font-bold py-2.5 px-2 rounded-lg text-[11px] transition-all border border-stone-200 cursor-pointer shadow-sm flex items-center justify-center space-x-1 uppercase tracking-widest font-mono"
                      >
                        <Milestone size={12} className="text-amber-600" />
                        <span>Itinerary</span>
                      </button>

                      <button
                        onClick={(e) => {
                          e.stopPropagation(); // Prevent clicking card itself
                          onSelectPackage(pkg);
                        }}
                        className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-bold py-2.5 px-2 rounded-lg text-[11px] transition-all cursor-pointer shadow hover:shadow-md uppercase tracking-wider text-center"
                      >
                        Book Trip
                      </button>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center bg-white border border-stone-200 py-16 px-4 rounded-xl space-y-4 font-sans shadow-sm">
            <Compass className="h-12 w-12 text-stone-400 mx-auto animate-spin-slow" />
            <div className="space-y-1">
              <h3 className="text-stone-800 text-base font-bold uppercase">No Escape Matches Your Filter</h3>
              <p className="text-stone-500 text-xs max-w-md mx-auto leading-relaxed font-medium">
                We design personalized bespoke tours across all Indian and international sectors. Connect with Sonika to custom build your preferred route.
              </p>
            </div>
            <button
              onClick={() => {
                setSearchQuery('');
                setFilterCategory('all');
                setPriceSort('none');
              }}
              className="bg-amber-500 hover:bg-amber-600 text-slate-950 px-5 py-2.5 rounded-md text-xs font-bold transition-all cursor-pointer shadow"
            >
              Clear Live Filters
            </button>
          </div>
        )}

        {/* 3. TIMELINE VIEW MODAL OVERLAY */}
        {selectedItineraryPkg && (
          <ItineraryModal 
            pkg={selectedItineraryPkg}
            onClose={() => setSelectedItineraryPkg(null)}
            onPlanTrip={(pkg) => {
              setSelectedItineraryPkg(null);
              onSelectPackage(pkg);
            }}
          />
        )}

      </div>
    </div>
  );
}
