import React from 'react';
import { ShieldCheck, Compass, HeartHandshake, Eye, Award } from 'lucide-react';
import { CompanyProfile, BusinessInfo } from '../../types';

interface AboutSectionProps {
  profile: CompanyProfile;
  business: BusinessInfo;
  setActiveTab: (tab: string) => void;
}

export default function AboutSection({ profile, business, setActiveTab }: AboutSectionProps) {
  return (
    <div className="w-full bg-stone-50 py-16 text-stone-800 font-sans">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Title */}
        <div className="text-center space-y-4 mb-16">
          <span className="text-amber-800 font-bold font-mono text-xs tracking-widest uppercase block bg-amber-50 px-3 py-1 rounded border border-amber-200/50 inline-block">
            OUR HISTORIC IDENTITY
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold uppercase text-stone-900 font-serif">
            About SM Tours & Travels
          </h1>
          <p className="text-stone-600 text-xs md:text-sm max-w-xl mx-auto font-semibold">
            Get to know the passionate travel curation agency operating inside Hyderabad, Telangana.
          </p>
        </div>

        {/* Brand visual showcase + History */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <img
              src="https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=800&q=80"
              alt="Beautiful Tropical Beach with chairs"
              className="rounded-xl shadow-md border border-stone-200 object-cover w-full h-[380px]"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="space-y-5">
            <h2 className="text-stone-900 text-xl font-extrabold uppercase tracking-wide border-b border-amber-500/20 pb-2 font-serif">
              Our Journey & Origin
            </h2>
            <p className="text-stone-700 text-xs md:text-sm leading-relaxed font-semibold">
              {profile.history}
            </p>
            <div className="bg-white border border-stone-200 p-4 rounded-xl flex items-center space-x-3.5 shadow-sm">
              <Award className="text-amber-600 w-10 h-10 flex-shrink-0" />
              <div>
                <h4 className="text-stone-900 font-bold text-xs uppercase">Led by Sonika</h4>
                <p className="text-stone-600 text-[11px] leading-relaxed font-semibold">
                  Every tour plan is curated, formatted, and authorized by our dedicated proprietor to eliminate errors.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Mission, Vision, Commitments Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          
          {/* Mission */}
          <div className="bg-white border border-stone-200 p-6 rounded-xl space-y-3 shadow-sm">
            <div className="bg-amber-500/10 w-9 h-9 rounded-full flex items-center justify-center text-amber-700">
              <HeartHandshake size={18} />
            </div>
            <h3 className="text-stone-900 font-bold text-sm uppercase tracking-wide font-serif">Our Mission</h3>
            <p className="text-stone-600 text-xs leading-relaxed font-semibold">
              {profile.mission}
            </p>
          </div>

          {/* Vision */}
          <div className="bg-white border border-stone-200 p-6 rounded-xl space-y-3 shadow-sm">
            <div className="bg-amber-500/10 w-9 h-9 rounded-full flex items-center justify-center text-amber-700">
              <Eye size={18} />
            </div>
            <h3 className="text-stone-900 font-bold text-sm uppercase tracking-wide font-serif">Our Vision</h3>
            <p className="text-stone-600 text-xs leading-relaxed font-semibold">
              {profile.vision}
            </p>
          </div>

          {/* Commitment */}
          <div className="bg-white border border-stone-200 p-6 rounded-xl space-y-3 shadow-sm">
            <div className="bg-amber-500/10 w-9 h-9 rounded-full flex items-center justify-center text-amber-700">
              <ShieldCheck size={18} />
            </div>
            <h3 className="text-stone-900 font-bold text-sm uppercase tracking-wide font-serif">Our Commitment</h3>
            <p className="text-stone-600 text-xs leading-relaxed font-semibold">
              {profile.commitment}
            </p>
          </div>

        </div>

        {/* Leadership Bio with Contact Action */}
        <div className="bg-white border border-stone-200 p-8 rounded-xl max-w-4xl mx-auto space-y-6 shadow-sm">
          <div className="text-center space-y-1 bg-stone-50 border border-stone-100 p-4 rounded-lg">
            <h3 className="text-stone-900 font-bold text-base uppercase">Bespoke Guidance Team</h3>
            <p className="text-amber-800 text-xs font-bold uppercase tracking-widest font-mono">Senior Executive Counsel</p>
          </div>

          <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6 justify-center">
            <img
              src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80"
              alt="Sonika - SM Tours Proprietor"
              className="w-16 h-16 rounded-full object-cover border-2 border-amber-600"
              referrerPolicy="no-referrer"
            />
            <div className="text-center sm:text-left space-y-2">
              <p className="text-stone-700 text-xs max-w-md italic font-semibold">
                "Travel isn't merely about checking items on a checklist. It is an exploration of the soul. At SM Tours & Travels, we configure each itinerary with the precise care we would apply to our private family expeditions."
              </p>
              <div className="text-xs font-sans">
                <span className="text-stone-900 font-extrabold uppercase">Sonika</span>
                <span className="text-stone-500 font-medium"> — Founder & Lead Curator, SM Tours</span>
              </div>
            </div>
          </div>

          <div className="text-center pt-2">
            <button
              onClick={() => {
                setActiveTab('contact');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-bold px-6 py-2.5 rounded-lg uppercase tracking-wider transition-colors cursor-pointer shadow"
            >
              Consult Directly with Sonika
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
