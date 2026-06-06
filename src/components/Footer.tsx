import React from 'react';
import { Mail, Phone, MapPin, Compass, Shield, Award, CheckCircle2, Settings } from 'lucide-react';
import { BusinessInfo } from '../types';

interface FooterProps {
  business: BusinessInfo;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  openCms: () => void;
}

export default function Footer({ business, activeTab, setActiveTab, openCms }: FooterProps) {
  
  const handleNavClick = (id: string) => {
    setActiveTab(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-white text-stone-700 border-t border-amber-500/15 pt-16 pb-8 shadow-[0_-10px_40px_rgba(217,119,6,0.03)]/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-10">
        
        {/* Company Pitch Card */}
        <div className="space-y-4">
          <div className="flex items-center">
            <div className="bg-amber-500 p-2 rounded-full mr-2 shadow-md">
              <Compass className="text-slate-950 h-5 w-5" />
            </div>
            <span className="text-lg font-bold tracking-wider text-stone-900 uppercase font-sans">
              SM Tours & Travels
            </span>
          </div>
          <p className="text-sm text-stone-600 leading-relaxed font-sans">
            A premium, reliable boutique travel advisor based in Hyderabad. We deliver tailor-made luxury packages, guaranteed optimal corporate flight tariffs, and stress-free visa documentation processing.
          </p>
          <div className="space-y-2 pt-2">
            <div className="flex items-center text-xs text-stone-600">
              <Shield size={14} className="text-amber-600 mr-2 flex-shrink-0" />
              <span>Moosarambagh, Malakpet, Hyderabad</span>
            </div>
            <div className="flex items-center text-xs text-stone-600">
              <Award size={14} className="text-amber-600 mr-2 flex-shrink-0" />
              <span>100% Guaranteed Customer Travel Commitment</span>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-stone-900 text-sm font-bold uppercase tracking-wider mb-5 border-b border-stone-100 pb-2">
            Explore Destinations
          </h3>
          <ul className="space-y-2.5 text-sm font-semibold text-stone-600">
            <li>
              <button onClick={() => handleNavClick('home')} className="hover:text-amber-700 transition-colors cursor-pointer text-left block w-full">
                Home Portfolio
              </button>
            </li>
            <li>
              <button onClick={() => handleNavClick('packages')} className="hover:text-amber-700 transition-colors cursor-pointer text-left block w-full">
                Domestic & Global Tour Packages
              </button>
            </li>
            <li>
              <button onClick={() => handleNavClick('services')} className="hover:text-amber-700 transition-colors cursor-pointer text-left block w-full">
                Corporate Ticketing & Visas
              </button>
            </li>
            <li>
              <button onClick={() => handleNavClick('about')} className="hover:text-amber-700 transition-colors cursor-pointer text-left block w-full">
                About Mission & Vision
              </button>
            </li>
            <li>
              <button onClick={() => handleNavClick('contact')} className="hover:text-amber-700 transition-colors cursor-pointer text-left block w-full">
                Consult with Sonika
              </button>
            </li>
          </ul>
        </div>

        {/* Specialized Travel Services */}
        <div>
          <h3 className="text-stone-900 text-sm font-bold uppercase tracking-wider mb-5 border-b border-stone-100 pb-2">
            Our Elite Services
          </h3>
          <ul className="space-y-2 text-sm text-stone-600 font-semibold">
            <li className="flex items-center space-x-2">
              <CheckCircle2 size={13} className="text-amber-600" />
              <span>Domestic & International Flights</span>
            </li>
            <li className="flex items-center space-x-2">
              <CheckCircle2 size={13} className="text-amber-600" />
              <span>Tailor-made Honeymoon Packages</span>
            </li>
            <li className="flex items-center space-x-2">
              <CheckCircle2 size={13} className="text-amber-600" />
              <span>Premium Group Sightseeing Tours</span>
            </li>
            <li className="flex items-center space-x-2">
              <CheckCircle2 size={13} className="text-amber-600" />
              <span>Consulate Tourist Visa Logistics</span>
            </li>
            <li className="flex items-center space-x-2">
              <CheckCircle2 size={13} className="text-amber-600" />
              <span>Verified Star-Hotel Bookings</span>
            </li>
            <li className="flex items-center space-x-2">
              <CheckCircle2 size={13} className="text-amber-600" />
              <span>Fast-track Passport Applications</span>
            </li>
          </ul>
        </div>

        {/* Directly Contact Us */}
        <div>
          <h3 className="text-stone-900 text-sm font-bold uppercase tracking-wider mb-5 border-b border-stone-100 pb-2">
            Central Office Contact
          </h3>
          <div className="space-y-4 text-sm font-sans text-stone-600 font-medium">
            <div className="flex items-start space-x-3">
              <MapPin size={18} className="text-amber-600 mt-0.5 flex-shrink-0" />
              <p className="leading-relaxed">
                SM Tours & Travels<br />
                Moosarambagh, Malakpet,<br />
                Hyderabad, Telangana 500036
              </p>
            </div>
            
            <div className="space-y-2 pt-1 border-t border-stone-100">
              <p className="text-stone-500 text-xs font-semibold">Proprietor / Travel Expert:</p>
              <div className="flex items-center space-x-2 text-stone-950 font-bold text-xs">
                <span>Sonika</span>
                <span className="text-amber-600">•</span>
                <span>+91 8977820246</span>
              </div>
            </div>

            <div className="space-y-2 pt-2">
              <a href={`tel:${business.phone}`} className="flex items-center space-x-2 text-stone-700 hover:text-amber-700 transition-colors font-semibold">
                <Phone size={14} className="text-amber-600" />
                <span>{business.phone}</span>
              </a>
              <a href={`mailto:${business.email}`} className="flex items-center space-x-2 text-stone-700 hover:text-amber-700 transition-colors break-words font-semibold">
                <Mail size={14} className="text-amber-600 shadow-sm" />
                <span className="text-xs">{business.email}</span>
              </a>
            </div>
          </div>
        </div>

      </div>

      {/* Partners Logos section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-8 border-t border-stone-150 flex flex-wrap justify-between items-center text-xs text-stone-500 font-semibold">
        <div className="flex flex-wrap gap-x-6 gap-y-2 mb-4 md:mb-0">
          <span>Inspiration & standards:</span>
          <span className="text-stone-800 tracking-wider">MAKEMYTRIP COOPERATION</span>
          <span className="text-stone-800 tracking-wider">THOMAS COOK COUPLING</span>
          <span className="text-stone-800 tracking-wider">SOTC TRUSTED</span>
          <span className="text-stone-800 tracking-wider">THRILLOPHILIA INSPIRED</span>
        </div>
        <div>
          <button 
            onClick={openCms}
            className="flex items-center space-x-1.5 text-stone-700 hover:text-amber-800 bg-stone-50 hover:bg-stone-100 border border-stone-200 px-3.5 py-2 rounded-md transition-all cursor-pointer shadow-sm text-xs font-bold"
          >
            <Settings size={12} className="text-amber-600 animate-spin-slow" />
            <span>Owner Dashboard & Content Editor</span>
          </button>
        </div>
      </div>

      {/* Copyright, legal disclosures, terms */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 pt-6 border-t border-stone-100 text-center text-xs text-stone-400 font-mono font-medium">
        <p>&copy; {new Date().getFullYear()} SM Tours & Travels. All Rights Reserved. Designed for Luxury & Seamless Scalability.</p>
        <p className="mt-1">Hyderabad, Telangana. Authorized domestic flight agency and visa processing partner.</p>
      </div>
    </footer>
  );
}
