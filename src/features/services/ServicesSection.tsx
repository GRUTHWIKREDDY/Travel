import React from 'react';
import { Plane, Compass, Building, ShieldCheck, BadgeCheck, FileText, CheckCircle2, Award } from 'lucide-react';

interface ServicesSectionProps {
  onQuoteRequest: (serviceName: string) => void;
}

export default function ServicesSection({ onQuoteRequest }: ServicesSectionProps) {
  
  const coreServices = [
    {
      id: "srv-dom-flights",
      title: "Domestic Flight Tickets Assistance",
      icon: <Plane className="h-6 w-6 text-amber-700" />,
      description: "Fast schedules and premium tariff configurations across prominent Indian aviation operators (IndiGo, Air India, Akasa, Vistara). Ideal for families, corporate professionals, or event coordinators.",
      highlights: [
        "Guaranteed cheapest group operator rates available offline",
        "Instant baggage addition and boarding card configurations",
        "Prompt modifications and on-call refund assistance",
        "Complimentary airport premium lounge voucher eligibility"
      ]
    },
    {
      id: "srv-int-flights",
      title: "International Flight Bookings",
      icon: <Plane className="h-6 w-6 text-amber-700 rotate-45" />,
      description: "Cost-friendly multi-city sector mappings, long-haul combinations, and convenient transit configurations (Emirates, Singapore Airlines, Qatar, Gulf Air, Etihad) tailored for absolute comfort.",
      highlights: [
        "Direct codeshare pricing alignments across global sectors",
        "Student extra-baggage allowances pre-approved",
        "Transparent transit and airport terminal layover warnings",
        "Full assistance in global airline point logs redemption"
      ]
    },
    {
      id: "srv-tour-pkg",
      title: "Bespoke Luxury Tour Packages",
      icon: <Compass className="h-6 w-6 text-amber-700" />,
      description: "Personally drafted honeymoon flows, historical heritage runs, or high-octane family adventure stays completely packed with AC vehicles, expert guides, and pre-vetted rooms.",
      highlights: [
        "Fully customizable itinerary speeds (add days or layovers)",
        "Strict background checks on physical private AC vehicles",
        "Personalized couple candlelight dinner setups pre-rendered",
        "24/7 dedicated support directly from Sonika's office"
      ]
    },
    {
      id: "srv-hotels",
      title: "Handpicked Premium Hotels Reservations",
      icon: <Building className="h-6 w-6 text-amber-700" />,
      description: "Secure reliable rooms in top global resorts, heritage palaces, or commercial corporate hotels. We utilize direct B2B associations to score complimentary breakfasts and late checkout buffers.",
      highlights: [
        "Pre-verified properties (strict zero-safety cancellation flags)",
        "Early check-in approvals pre-negotiated by our agency",
        "Special honeymoon pool-villa upgrades at reduced costs",
        "Direct support for group block corporate assemblies"
      ]
    },
    {
      id: "srv-passports",
      title: "Express Passport Services & Processing",
      icon: <FileText className="h-6 w-6 text-amber-700" />,
      description: "Avoid complex passport queues. We offer seamless slots mapping, document validations, verification certifications, and fast-track application support for new credentials or renewals.",
      highlights: [
        "Rapid online application filing with zero document typos",
        "Expedited Tatkaal applications slots mapping guidance",
        "Thorough documentation scrubbing to prevent rejections",
        "Complete counseling for minor's passport applications"
      ]
    },
    {
      id: "srv-visas",
      title: "Tourist Visa Consulting & Processing",
      icon: <BadgeCheck className="h-6 w-6 text-amber-700" />,
      description: "Our core specialty is tourist visa formatting. We prepare robust cover letters, mock flight bookings, verified hotel voucher pairings, and handle physical submission files for Schengen, US, UK, UAE, or Bali visas.",
      highlights: [
        "98.5% Visa Approval Velocities on premium Southeast Asia tours",
        "Personalized itinerary cover letters matching travel rules",
        "Direct file submission and biometric queue appointment planning",
        "Comprehensive scanning of bank credentials and proof files"
      ]
    }
  ];

  return (
    <div className="w-full bg-stone-50 py-16 text-stone-800 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Intro Tag */}
        <div className="text-center space-y-4 mb-16">
          <span className="text-amber-800 font-bold font-mono text-xs tracking-widest uppercase block bg-amber-50 px-3 py-1 rounded border border-amber-200/50 inline-block">
            CONCIERGE CAPABILITIES
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold uppercase text-stone-900 font-serif">
            Our Premium Travel Services
          </h1>
          <p className="text-stone-600 text-xs md:text-sm max-w-xl mx-auto leading-relaxed font-semibold">
            From the initial online reservation mappings to complex overseas passport submissions, SM Tours & Travels manages everything flawlessly.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {coreServices.map((srv) => (
            <div
              key={srv.id}
              className="bg-white border border-stone-200/80 p-6 rounded-xl shadow-sm flex flex-col justify-between hover:border-amber-500/30 hover:shadow-[0_12px_40px_rgba(217,119,6,0.06)] transition-all duration-300 relative group"
              id={`service-card-${srv.id}`}
            >
              <div className="space-y-4">
                {/* Header Icon & Title */}
                <div className="flex items-center space-x-3.5">
                  <div className="bg-amber-500/10 border border-amber-500/20 p-3 rounded-lg">
                    {srv.icon}
                  </div>
                  <h3 className="text-stone-900 text-sm font-extrabold uppercase tracking-wide group-hover:text-amber-850 duration-200">
                    {srv.title}
                  </h3>
                </div>

                <p className="text-stone-600 text-xs leading-relaxed font-semibold">
                  {srv.description}
                </p>

                {/* Highlights */}
                <ul className="space-y-1.5 pt-3 border-t border-stone-100">
                  {srv.highlights.map((hl, i) => (
                    <li key={i} className="flex items-start text-[11px] text-stone-700 font-semibold">
                      <CheckCircle2 size={12} className="text-amber-600 mr-2 mt-0.5 flex-shrink-0" />
                      <span>{hl}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Card Action */}
              <div className="pt-6">
                <button
                  type="button"
                  onClick={() => onQuoteRequest(srv.title)}
                  className="w-full bg-stone-100 hover:bg-stone-900 hover:text-white text-stone-700 text-xs font-bold py-2.5 rounded-lg border border-stone-200 hover:border-transparent transition-all cursor-pointer uppercase tracking-wider"
                >
                  Retrieve Service Quote
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Rejection Defense / Trust block */}
        <div className="bg-white border border-stone-200 p-8 rounded-xl grid grid-cols-1 md:grid-cols-2 gap-8 items-center max-w-5xl mx-auto shadow-sm">
          <div className="space-y-4">
            <span className="text-amber-800 font-mono text-[10px] uppercase font-bold tracking-widest bg-amber-50 border border-amber-200 px-3 py-1 rounded inline-block">
              OUR VISA REJECTION PREVENTION CONCIERGE
            </span>
            <h3 className="text-stone-900 text-lg font-bold uppercase font-serif">
              Tourist Visa Approvals Guided by Experts
            </h3>
            <p className="text-stone-600 text-xs leading-relaxed font-semibold">
              Visa rejections usually happen due to poor covers, mismatched travel vouchers, or incomplete bank file alignments. Under Sonika's management, every international folder is scrubbed against exact consulate rules. We provide genuine reservations and customized covers to guarantee the highest speed of visa issuance.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4 font-mono text-center">
            <div className="bg-stone-50 p-4 rounded-xl border border-stone-200">
              <p className="text-3xl font-extrabold text-amber-700">98%</p>
              <p className="text-[9px] text-stone-550 uppercase tracking-widest font-bold mt-1">Visa Success Rate</p>
            </div>
            <div className="bg-stone-50 p-4 rounded-xl border border-stone-200">
              <p className="text-3xl font-extrabold text-amber-700">12K+</p>
              <p className="text-[9px] text-stone-550 uppercase tracking-widest font-bold mt-1">Happy Voyagers</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
