import React from 'react';
import { Phone, MessageSquare } from 'lucide-react';
import { BusinessInfo } from '../types';

interface FloatingCTAProps {
  business: BusinessInfo;
  onInquiryClick: () => void;
}

export default function FloatingCTA({ business, onInquiryClick }: FloatingCTAProps) {
  const whatsappUrl = `https://wa.me/${business.whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(business.defaultWhatsappMessage)}`;

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 md:bottom-8 md:right-8 z-55 flex flex-row md:flex-col items-center md:items-end justify-end space-y-0 md:space-y-3 space-x-2 sm:space-x-2.5 md:space-x-0 pointer-events-none p-1 sm:p-0">
      
      {/* Quick Quote Floating Pill (Triggering the Inquiry Dialog) */}
      <button
        onClick={onInquiryClick}
        className="pointer-events-auto bg-slate-900 border border-amber-400 hover:border-amber-300 text-amber-400 px-3.5 py-2.5 sm:px-4 sm:py-3 rounded-full shadow-lg hover:bg-slate-800 transition-all text-[11px] sm:text-xs font-bold flex items-center space-x-1.5 sm:space-x-2 animate-bounce cursor-pointer"
        style={{ animationDuration: '3s' }}
        id="floating-quote-button"
      >
        <MessageSquare size={13} className="text-amber-500 flex-shrink-0" />
        <span className="hidden xs:inline">Get Custom Quote</span>
        <span className="xs:hidden">Quote</span>
      </button>

      {/* Floating WhatsApp Quick Link */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="pointer-events-auto hover:scale-110 duration-250 flex items-center justify-center cursor-pointer transition-all group relative active:scale-95"
        title="Chat on WhatsApp"
        id="floating-whatsapp-button"
      >
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/5/5e/WhatsApp_icon.png"
          alt="WhatsApp"
          className="h-11 w-11 sm:h-13 sm:w-13 drop-shadow-[0_4px_10px_rgba(0,0,0,0.15)] object-contain select-none"
          referrerPolicy="no-referrer"
        />
        <span className="absolute right-0 bottom-14 md:bottom-auto md:right-14 bg-slate-900 border border-slate-700 text-white text-[10px] py-1 px-2.5 rounded shadow-xl whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none font-sans font-medium z-10">
          Whatsapp Sonika
        </span>
      </a>

      {/* Floating Call Now Button (Visible primarily on mobile or all) */}
      <a
        href={`tel:${business.phone}`}
        className="pointer-events-auto bg-amber-500 hover:bg-amber-600 text-slate-950 p-2.5 sm:p-3.5 rounded-full shadow-lg hover:scale-105 duration-250 flex items-center justify-center cursor-pointer transition-all border border-white/25 group relative"
        title="Call Now Quick Action"
        id="floating-call-now-button"
      >
        <Phone size={20} className="sm:w-6 sm:h-6 stroke-[2.5]" />
        <span className="absolute right-0 bottom-14 md:bottom-auto md:right-14 bg-slate-900 border border-slate-700 text-white text-[10px] py-1 px-2.5 rounded shadow-xl whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none font-sans font-medium">
          Call Sonika Now
        </span>
      </a>

    </div>
  );
}
