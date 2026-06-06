import React, { useState } from 'react';
import { Compass, Calendar, ShieldCheck, Milestone, Star, BadgeCheck, Users, HelpCircle, ArrowRight, Play, CheckCircle2 } from 'lucide-react';
import { AppContent, TourPackage } from '../../types';
import TravelFinderWizard from '../../components/TravelFinderWizard';
import ItineraryModal from '../../components/ItineraryModal';

interface HomeSectionProps {
  content: AppContent;
  onExplorePackages: () => void;
  onSelectPackage: (pkg: TourPackage) => void;
  setActiveTab: (tab: string) => void;
}

export default function HomeSection({ content, onExplorePackages, onSelectPackage, setActiveTab }: HomeSectionProps) {
  const [selectedItineraryPkg, setSelectedItineraryPkg] = useState<TourPackage | null>(null);
  const [expandedFaqId, setExpandedFaqId] = useState<string | null>(null);
  const popularPackages = content.packages.filter(p => p.isPopular);

  return (
    <div className="w-full bg-stone-50 text-stone-800 font-sans">
      
      {/* 1. LUXURIOUS HERO SECTION */}
      <section className="relative h-[85vh] flex items-center justify-center overflow-hidden">
        {/* Ambient Dark Overlay for high image contrast */}
        <div className="absolute inset-0 bg-stone-950/40 z-10" />
        <img
          src={content.hero.imageUrl}
          alt="Luxury Landscape Destination"
          className="absolute inset-0 w-full h-full object-cover select-none scale-102 transition-transform duration-[10s] animate-pulse-slow"
          referrerPolicy="no-referrer"
        />

        {/* Content Box */}
        <div className="relative max-w-5xl mx-auto px-4 text-center z-20 space-y-6">
          <div className="inline-flex items-center space-x-2 bg-amber-500/20 backdrop-blur-sm border border-amber-400/40 px-3.5 py-1.5 rounded-full mb-2">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
            <span className="text-white text-[11px] font-bold tracking-widest uppercase font-mono">
              PREMIUM LUXURY HOLIDAY PLANNER IN HYDERABAD
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white font-serif uppercase drop-shadow">
            {content.hero.title}
          </h1>
          
          <p className="text-base md:text-lg text-stone-100 font-sans max-w-2xl mx-auto leading-relaxed font-semibold drop-shadow">
            {content.hero.subtitle}
          </p>

          <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onExplorePackages}
              className="w-full sm:w-auto bg-amber-500 hover:bg-gradient-to-r hover:from-amber-500 hover:to-amber-600 text-slate-950 font-sans font-bold text-sm px-8 py-4 rounded-md shadow-lg hover:shadow-xl hover:scale-[1.01] transition-all cursor-pointer flex items-center justify-center space-x-2 uppercase tracking-wider"
            >
              <span>Explore Tour Packages</span>
              <ArrowRight size={16} />
            </button>
            
            <button
              onClick={() => {
                setActiveTab('contact');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="w-full sm:w-auto bg-stone-900/90 hover:bg-stone-900 text-amber-400 border border-amber-400/30 font-sans font-bold text-sm px-8 py-4 rounded-md transition-all cursor-pointer flex items-center justify-center space-x-2 uppercase tracking-wider shadow-md"
            >
              <span>Speak with Sonika</span>
            </button>
          </div>
        </div>
      </section>

      {/* Quick Search Horizontal Ribbon */}
      <section className="bg-white py-6 px-6 border border-stone-200/80 shadow-[0_12px_45px_rgba(0,0,0,0.035)] relative -mt-8 z-30 max-w-6xl mx-auto rounded-xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm font-sans">
          
          <div className="bg-stone-50 border border-stone-200 p-3.5 rounded-lg flex items-center space-x-3 shadow-inner">
            <Compass className="text-amber-600 w-5 h-5 flex-shrink-0" />
            <div>
              <p className="text-stone-505 text-[9px] font-extrabold uppercase tracking-widest font-mono">Destinations Offered</p>
              <p className="text-stone-900 font-bold text-xs">Domestic & Global Packages</p>
            </div>
          </div>
          
          <div className="bg-stone-50 border border-stone-200 p-3.5 rounded-lg flex items-center space-x-3 shadow-inner">
            <Calendar className="text-amber-600 w-5 h-5 flex-shrink-0" />
            <div>
              <p className="text-stone-505 text-[9px] font-extrabold uppercase tracking-widest font-mono">Assistance Focus</p>
              <p className="text-stone-900 font-bold text-xs">Custom Curation & Visas</p>
            </div>
          </div>
          
          <div className="bg-stone-50 border border-stone-200 p-3.5 rounded-lg flex items-center space-x-3 shadow-inner">
            <ShieldCheck className="text-amber-600 w-5 h-5 flex-shrink-0" />
            <div>
              <p className="text-stone-505 text-[9px] font-extrabold uppercase tracking-widest font-mono">Agency Trust</p>
              <p className="text-stone-900 font-bold text-xs">Verified & Local Office Desk</p>
            </div>
          </div>

          <div className="flex items-center justify-center">
            <button
              onClick={() => {
                setActiveTab('packages');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="w-full bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold py-4 rounded-lg text-xs transition-all cursor-pointer uppercase tracking-wider transition-all shadow-md hover:shadow-lg"
            >
              Browse 12 Handpicked Tours
            </button>
          </div>
        </div>
      </section>


      {/* 2. POPULAR DESTINATIONS GRID */}
      <section className="py-20 px-4 max-w-7xl mx-auto">
        <div className="text-center space-y-3 mb-12">
          <span className="text-amber-800 font-bold font-mono text-xs tracking-widest uppercase block bg-amber-50 px-3 py-1 rounded border border-amber-200/50 inline-block">
            FEATURED HOLIDAYS
          </span>
          <h2 className="text-2xl md:text-4xl font-extrabold uppercase font-serif text-stone-900">
            Spotlight Tour Packages
          </h2>
          <p className="text-stone-600 text-xs md:text-sm max-w-xl mx-auto leading-relaxed font-semibold">
            Our highly requested, handpicked seasonal escapes starting with smooth flight scheduling and pristine star stays. Click any itinerary option to learn more.
          </p>
        </div>

        {/* Popular tours list grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 w-full">
          {popularPackages.slice(0, 3).map((pkg) => (
            <div
              key={pkg.id}
              className="bg-white rounded-xl overflow-hidden border border-stone-200/80 hover:border-amber-500/40 shadow-[0_4px_25px_rgba(0,0,0,0.015)] hover:shadow-[0_15px_45px_rgba(217,119,6,0.08)] transition-all duration-300 group flex flex-col justify-between cursor-pointer"
              onClick={() => setSelectedItineraryPkg(pkg)}
              title="Click to view full Day-by-Day itinerary"
            >
              {/* Image Container with Badge */}
              <div className="relative h-56 overflow-hidden">
                <img
                  src={pkg.imageUrl}
                  alt={pkg.title}
                  className="w-full h-full object-cover group-hover:scale-105 duration-500"
                  referrerPolicy="no-referrer"
                />
                <span className="absolute top-4 left-4 bg-white/95 backdrop-blur border border-amber-500/10 text-amber-800 text-[9px] font-mono tracking-widest uppercase py-1 px-2.5 rounded font-bold shadow-sm">
                  {pkg.category === 'domestic' ? 'Domestic Luxury' : 'International Elite'}
                </span>
                
                {/* Float Duration Badge */}
                <div className="absolute bottom-4 right-4 bg-amber-500 text-slate-950 text-xs font-bold py-1 px-3 rounded shadow">
                  {pkg.duration}
                </div>
              </div>

              {/* Package Meta Info */}
              <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-xs font-mono">
                    <div className="flex items-center space-x-1 text-amber-700 font-bold">
                      <Star size={13} className="fill-current text-amber-500 animate-pulse" />
                      <span>{pkg.rating.toFixed(1)} Rating</span>
                    </div>
                    <span className="text-emerald-705 font-extrabold text-sm">{pkg.price}</span>
                  </div>

                  <h3 className="text-stone-900 text-base font-extrabold group-hover:text-amber-800 duration-200 truncate font-serif uppercase tracking-wide mt-3">
                    {pkg.title}
                  </h3>

                  <p className="text-stone-600 text-xs leading-relaxed line-clamp-2 mt-1.5 font-semibold">
                    {pkg.description}
                  </p>

                  {/* Highlights List preview (Top 2) */}
                  <ul className="space-y-1.5 pt-3 border-t border-stone-100 mt-4">
                    {pkg.highlights.slice(0, 2).map((hl, index) => (
                      <li key={index} className="flex items-center text-[11px] text-stone-700 font-semibold">
                        <CheckCircle2 size={12} className="text-amber-600 mr-2 flex-shrink-0" />
                        <span className="truncate">{hl}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Handpicked Dual CTA layout (Itinerary and Custom Quote) */}
                <div className="grid grid-cols-2 gap-3 pt-2 font-sans">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedItineraryPkg(pkg);
                    }}
                    className="w-full bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold py-2.5 rounded-lg text-[11px] transition-all border border-stone-200 cursor-pointer shadow-sm flex items-center justify-center space-x-1 uppercase tracking-widest font-mono text-center"
                  >
                    <Milestone size={12} className="text-amber-600" />
                    <span>Itinerary</span>
                  </button>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectPackage(pkg);
                    }}
                    className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-bold py-2.5 rounded-lg text-[11px] transition-all cursor-pointer shadow hover:shadow-md uppercase tracking-wider text-center"
                  >
                    Get Quote
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center pt-8">
          <button
            onClick={onExplorePackages}
            className="inline-flex items-center space-x-2 text-amber-800 hover:text-amber-700 cursor-pointer font-bold text-sm tracking-widest uppercase transition-all border-b border-amber-800/20 hover:border-amber-700 pb-1"
          >
            <span>View All Handpicked Packages</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </section>

      {/* 2.5 DYNAMIC DECISION FINDER ADVISOR */}
      <section className="py-20 bg-stone-100 border-y border-stone-200/60 shadow-inner">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center space-y-3 mb-12">
            <span className="text-amber-800 font-bold font-mono text-xs tracking-widest uppercase block bg-amber-50 px-3 py-1 rounded border border-amber-200/50 inline-block">
              INTELLIGENT DECISION PORTAL
            </span>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold uppercase font-serif text-stone-900 leading-tight">
              Not Sure Where to Vacation Next?
            </h2>
            <p className="text-stone-650 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed font-semibold">
              Answer 5 prompt questions regarding your companion count, terrain landscapes, and trip atmosphere, and Sonika's curated system will reveal your perfect tours instantly!
            </p>
          </div>

          <TravelFinderWizard 
            content={content}
            onSelectPackage={onSelectPackage}
            onViewItinerary={(pkg) => setSelectedItineraryPkg(pkg)}
          />
        </div>
      </section>


      {/* 3. BUSINESS SERVICES CORE */}
      <section className="bg-white py-20 border-y border-stone-200/60 shadow-[0_4px_30px_rgba(0,0,0,0.01)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center space-y-3 mb-16">
            <span className="text-amber-800 font-bold font-mono text-xs tracking-widest uppercase block bg-amber-50 px-3 py-1 rounded border border-amber-200/50 inline-block">
              OUR SCOPE OF ASSISTANCE
            </span>
            <h2 className="text-2xl md:text-3xl font-extrabold uppercase text-stone-900 font-serif">
              Exclusive Travel Services
            </h2>
            <p className="text-stone-600 text-sm max-w-xl mx-auto font-medium">
              We manage the entire lifecycle of global travel so you can concentrate solely on the exploration.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 font-sans">
            
            {/* Service card 1 */}
            <div className="bg-stone-50 p-6 rounded-xl border border-stone-200 hover:border-amber-500/25 transition-all text-center space-y-3 shadow-sm">
              <div className="mx-auto w-12 h-12 bg-amber-500/10 rounded-full border border-amber-500/20 flex items-center justify-center text-amber-600">
                <Compass className="h-6 w-6" />
              </div>
              <h3 className="text-stone-900 font-bold text-sm uppercase tracking-wide">Tour Packages Curation</h3>
              <p className="text-stone-600 text-xs leading-relaxed font-semibold">
                Tailor-made domestic and international itineraries packed with transfers, guides, and boutique luxury stays.
              </p>
            </div>

            {/* Service card 2 */}
            <div className="bg-stone-50 p-6 rounded-xl border border-stone-200 hover:border-amber-500/25 transition-all text-center space-y-3 shadow-sm">
              <div className="mx-auto w-12 h-12 bg-amber-500/10 rounded-full border border-amber-500/20 flex items-center justify-center text-amber-600">
                <Milestone className="h-6 w-6" />
              </div>
              <h3 className="text-stone-900 font-bold text-sm uppercase tracking-wide">Flight Tickets Pricing</h3>
              <p className="text-stone-600 text-xs leading-relaxed font-semibold">
                Guaranteed competitive operator tariffs on global major airline networks with convenient visual slotting.
              </p>
            </div>

            {/* Service card 3 */}
            <div className="bg-stone-50 p-6 rounded-xl border border-stone-200 hover:border-amber-500/25 transition-all text-center space-y-3 shadow-sm">
              <div className="mx-auto w-12 h-12 bg-amber-500/10 rounded-full border border-amber-500/20 flex items-center justify-center text-amber-600">
                <BadgeCheck className="h-6 w-6" />
              </div>
              <h3 className="text-stone-900 font-bold text-sm uppercase tracking-wide">Visa & Passports Logistics</h3>
              <p className="text-stone-600 text-xs leading-relaxed font-semibold">
                Expedited application submission, document formatting, and direct tracking with foreign consulates.
              </p>
            </div>

            {/* Service card 4 */}
            <div className="bg-stone-50 p-6 rounded-xl border border-stone-200 hover:border-amber-500/25 transition-all text-center space-y-3 shadow-sm">
              <div className="mx-auto w-12 h-12 bg-amber-500/10 rounded-full border border-amber-500/20 flex items-center justify-center text-amber-600">
                <Users className="h-6 w-6" />
              </div>
              <h3 className="text-stone-900 font-bold text-sm uppercase tracking-wide">Group Tour Operations</h3>
              <p className="text-stone-600 text-xs leading-relaxed font-semibold">
                Specialized family assemblies, student expeditions, and corporate incentive programs managed by Sonika.
              </p>
            </div>

          </div>

          <div className="text-center pt-8">
            <button
              onClick={() => {
                setActiveTab('services');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="bg-stone-900 hover:bg-stone-800 text-amber-400 font-bold text-xs px-6 py-3 rounded-lg tracking-wider uppercase transition-all cursor-pointer shadow-md"
            >
              Analyze All Services Offered
            </button>
          </div>
        </div>
      </section>


      {/* 4. WHY CHOOSE US - ELITE ADVANTAGES */}
      <section className="py-20 px-4 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Text panel */}
          <div className="space-y-6">
            <span className="text-amber-800 font-mono text-xs font-bold tracking-widest uppercase block bg-amber-50 px-3 py-1 rounded border border-amber-200/50 inline-block">
              SM TOURS RELIABILITY MATRIX
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold uppercase font-serif text-stone-900">
              Why Discerning Travelers Choose Us
            </h2>
            <p className="text-stone-600 text-sm leading-relaxed font-medium">
              We distinguish ourselves through pricing transparency, rigorous local partner validation, and 24/7 dedicated support backed by flight ticketing authority.
            </p>

            <div className="space-y-4 font-sans text-sm">
              
              <div className="flex items-start space-x-3 bg-white p-5 rounded-xl border border-stone-200 shadow-[0_4px_15px_rgba(0,0,0,0.015)]">
                <div className="bg-amber-500 text-slate-950 rounded-full p-2 flex-shrink-0">
                  <Star size={13} className="fill-current" />
                </div>
                <div>
                  <h4 className="text-stone-900 font-extrabold font-sans text-xs uppercase mb-1">Tailored Concierge Support</h4>
                  <p className="text-stone-600 text-xs font-medium">Enjoy directly dialing our founder Sonika for modifications or real-time travel troubleshooting globally.</p>
                </div>
              </div>

              <div className="flex items-start space-x-3 bg-white p-5 rounded-xl border border-stone-200 shadow-[0_4px_15px_rgba(0,0,0,0.015)]">
                <div className="bg-amber-500 text-slate-950 rounded-full p-2 flex-shrink-0">
                  <Star size={13} className="fill-current" />
                </div>
                <div>
                  <h4 className="text-stone-900 font-extrabold font-sans text-xs uppercase mb-1 font-bold">Honest Transparent Fare Engines</h4>
                  <p className="text-stone-600 text-xs font-medium">No hidden transaction markups or forced travel insurance clauses. What we quote matches our partners' prices.</p>
                </div>
              </div>

              <div className="flex items-start space-x-3 bg-white p-5 rounded-xl border border-stone-200 shadow-[0_4px_15px_rgba(0,0,0,0.015)]">
                <div className="bg-amber-500 text-slate-950 rounded-full p-2 flex-shrink-0">
                  <Star size={13} className="fill-current" />
                </div>
                <div>
                  <h4 className="text-stone-900 font-extrabold font-sans text-xs uppercase mb-1 font-bold">Complex Global Visa Mastery</h4>
                  <p className="text-stone-600 text-xs font-medium">We keep high approval velocities by pre-scrutinizing bank logs and consulate submission parameters meticulously.</p>
                </div>
              </div>

            </div>
          </div>

          {/* Luxury Promotional Image Layer */}
          <div className="relative hidden lg:block">
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950/20 via-transparent to-transparent z-10 rounded-xl" />
            <img
              src="https://images.unsplash.com/photo-1527631746610-bca00a040d60?auto=format&fit=crop&w=800&q=80"
              alt="Premium Traveler looking over ocean"
              className="rounded-xl shadow-xl border border-stone-200 object-cover w-full h-[450px]"
              referrerPolicy="no-referrer"
            />
            {/* Float Stat Badge */}
            <div className="absolute top-6 right-6 bg-white/95 border border-amber-500/10 backdrop-blur px-5 py-4 rounded-xl shadow-xl z-20 text-center font-sans">
              <p className="text-3xl font-extrabold text-amber-700 font-mono">100%</p>
              <p className="text-[10px] text-stone-600 uppercase tracking-widest font-bold mt-1">Stress Free Guarantee</p>
            </div>
          </div>

        </div>
      </section>


      {/* 5. GORGEOUS TESTIMONIAL CAROUSEL */}
      <section className="bg-white py-20 border-y border-stone-200/60 shadow-inner">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center space-y-3 mb-16">
            <span className="text-amber-800 font-bold font-mono text-xs tracking-widest uppercase block bg-amber-50 px-3 py-1 rounded border border-amber-200/50 inline-block">
              REVIEWS FROM HYDERABAD
            </span>
            <h2 className="text-2xl md:text-3xl font-extrabold uppercase text-stone-900 font-serif">
              Vouched by Travelers
            </h2>
            <p className="text-stone-600 text-xs md:text-sm max-w-xl mx-auto font-medium">
              Read real verified stories from corporate partners and honeymooners who returned completely satisfied.
            </p>
          </div>

          {/* List layout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {content.testimonials.map((test, index) => (
              <div
                key={test.id}
                className={`bg-stone-50 p-6 rounded-xl border border-stone-200 flex flex-col justify-between font-sans space-y-4 shadow-sm ${
                  index >= 2 ? 'hidden sm:flex' : 'flex'
                }`}
              >
                <div className="space-y-3">
                  {/* Rating block */}
                  <div className="flex items-center space-x-1 text-amber-500">
                    {[...Array(test.rating)].map((_, i) => (
                      <Star key={i} size={12} className="fill-current text-amber-500" />
                    ))}
                  </div>
                  <p className="text-stone-700 text-xs leading-relaxed italic font-medium">
                    "{test.comment}"
                  </p>
                </div>
                
                {/* User Info card section */}
                <div className="flex items-center space-x-3 pt-4 border-t border-stone-200/60">
                  <img
                    src={test.avatarUrl}
                    alt={test.name}
                    className="w-10 h-10 rounded-full object-cover border border-amber-500/20"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <h4 className="text-stone-900 text-xs font-bold leading-none">{test.name}</h4>
                    <span className="text-[10px] text-stone-500">{test.location}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* 6. DETAILED FAQs */}
      <section className="py-20 px-4 max-w-5xl mx-auto">
        <div className="text-center space-y-3 mb-16">
          <span className="text-amber-800 font-bold font-mono text-xs tracking-widest uppercase block bg-amber-50 px-3 py-1 rounded border border-amber-200/50 inline-block">
            FAQ CONCIERGE DESK
          </span>
          <h2 className="text-2xl md:text-3xl font-extrabold uppercase text-stone-900 font-serif">
            Frequently Answered Questions
          </h2>
          <p className="text-stone-600 text-xs md:text-sm font-semibold">
            Everything you should know before initiating flight bookings or package inquiries starting with us.
          </p>
        </div>

        {/* FAQ list */}
        <div className="space-y-4 font-sans">
          {content.faqs.map((faq) => {
            const isExpanded = expandedFaqId === faq.id;
            return (
              <div
                key={faq.id}
                className="bg-white border border-stone-200/80 p-5 rounded-lg shadow-sm cursor-pointer transition-all hover:bg-stone-50/50"
                onClick={() => setExpandedFaqId(isExpanded ? null : faq.id)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-start space-x-3">
                    <HelpCircle size={18} className="text-amber-600 mt-0.5 flex-shrink-0" />
                    <h4 className="text-stone-900 text-xs sm:text-sm font-bold uppercase tracking-wide">
                      {faq.question}
                    </h4>
                  </div>
                  <span className="text-amber-600 text-[10px] sm:text-xs font-bold font-mono ml-4 select-none">
                    {isExpanded ? 'Collapse' : 'Expand'}
                  </span>
                </div>
                {isExpanded && (
                  <p className="text-stone-600 text-xs leading-relaxed pl-7 pt-3 font-semibold border-t border-stone-100 mt-3">
                    {faq.answer}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </section>


      {/* 7. CONTACT ACTION HIGHLIGHT */}
      <section className="bg-gradient-to-r from-amber-500/10 to-transparent py-16 px-4 border-t border-stone-200 text-center">
        <div className="max-w-4xl mx-auto space-y-4">
          <h3 className="text-xl md:text-2xl font-extrabold text-stone-900 uppercase tracking-wide font-serif">
            Ready to design your customized adventure?
          </h3>
          <p className="text-stone-700 text-xs md:text-sm max-w-lg mx-auto leading-relaxed font-semibold">
            Dial Sonika directly at <span className="text-amber-800 font-bold">+91 8977820246</span> or schedule a dedicated consultation session in Moosarambagh, Malakpet today.
          </p>
          <div className="pt-4 flex justify-center items-center space-x-4">
            <button
              onClick={() => {
                setActiveTab('contact');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold px-8 py-3 rounded-lg text-xs uppercase tracking-wider transition-all cursor-pointer shadow-md"
            >
              Inquire Now
            </button>
          </div>
        </div>
      </section>

      {/* 8. POPULAR TOUR ITINERARY ON-DEMAND OVERLAY MODAL */}
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
  );
}
