import React, { useState } from 'react';
import { Phone, Mail, MapPin, Menu, X, Compass, Shield, Settings } from 'lucide-react';
import { BusinessInfo } from '../types';

interface HeaderProps {
  business: BusinessInfo;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  openCms: () => void;
}

export default function Header({ business, activeTab, setActiveTab, openCms }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'packages', label: 'Tour Packages' },
    { id: 'services', label: 'Our Services' },
    { id: 'about', label: 'About Us' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleNavClick = (id: string) => {
    setActiveTab(id);
    setIsOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="relative w-full z-40 transition-all duration-300">
      {/* Top Bar for Luxury Utility Information */}
      <div className="bg-stone-100 text-stone-700 text-xs py-2 w-full border-b border-stone-200 hidden sm:block">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center font-sans">
          <div className="flex items-center space-x-6">
            <a href={`tel:${business.phone}`} className="flex items-center space-x-1 hover:text-amber-700 transition-colors">
              <Phone size={13} className="text-amber-600 animate-pulse" />
              <span>{business.phone}</span>
            </a>
            <a href={`mailto:${business.email}`} className="flex items-center space-x-1 hover:text-amber-700 transition-colors">
              <Mail size={13} className="text-amber-600" />
              <span>{business.email}</span>
            </a>
            <div className="flex items-center space-x-1">
              <MapPin size={13} className="text-amber-600" />
              <span>Moosarambagh, Malakpet, Hyderabad</span>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <span className="flex items-center text-amber-700 font-bold bg-amber-50 px-2 py-0.5 rounded border border-amber-200/50">
              <Shield size={12} className="mr-1 text-amber-600" /> Verified Agency
            </span>
            <button 
              onClick={openCms} 
              className="flex items-center space-x-1 text-stone-700 hover:text-amber-700 cursor-pointer bg-white px-2.5 py-0.5 rounded border border-stone-200 text-[10px] shadow-sm hover:shadow"
            >
              <Settings size={10} className="text-amber-600 animate-spin-slow" />
              <span>CMS Portal</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Luxury Navbar */}
      <nav className="bg-white/95 backdrop-blur-md border-b border-amber-500/10 sticky top-0 w-full shadow-[0_4px_25px_rgba(217,119,6,0.04)]">
        <div className="max-w-7xl mx-auto px-3 sm:px-6">
          <div className="flex items-center justify-between h-20">
            {/* Logo Brand with Compass */}
            <div className="flex-shrink-0 flex items-center cursor-pointer select-none" onClick={() => handleNavClick('home')}>
              <div className="bg-amber-500 p-1.5 sm:p-2 md:p-2.5 rounded-full mr-1.5 sm:mr-3 shadow-md border border-amber-400 flex items-center justify-center">
                <Compass className="text-slate-950 h-3.5 sm:h-4.5 md:h-5 w-3.5 sm:w-4.5 md:w-5 stroke-[2.5] animate-spin-slow" />
              </div>
              <div className="flex flex-col">
                <span className="text-[11px] sm:text-base md:text-lg font-bold tracking-tight sm:tracking-wider text-stone-900 font-sans uppercase leading-tight">
                  SM Tours <span className="text-amber-600">&</span> Travels
                </span>
                <span className="text-[7.5px] sm:text-[9px] md:text-[10px] tracking-widest text-amber-705 font-mono font-bold uppercase mt-0.5">
                  Safar Saarthi Travel Companion
                </span>
              </div>
            </div>

            {/* Desktop Navigation links */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`text-sm font-semibold tracking-wide transition-all duration-200 cursor-pointer relative py-2 ${
                    activeTab === item.id
                      ? 'text-amber-700 font-bold'
                      : 'text-stone-600 hover:text-amber-700'
                  }`}
                >
                  {item.label}
                  {activeTab === item.id && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-amber-500 rounded-full animate-pulse" />
                  )}
                </button>
              ))}
            </div>

            {/* Right side desktop action CTA button */}
            <div className="hidden md:flex items-center space-x-4">
              <a
                href={`tel:${business.phone}`}
                className="bg-transparent hover:bg-amber-50/50 text-amber-700 hover:text-amber-800 font-sans text-xs px-4 py-2 border border-amber-500/30 hover:border-amber-500 rounded-md transition-all font-semibold flex items-center space-x-2 shadow-sm"
              >
                <Phone size={14} />
                <span>Call +91-8977820246</span>
              </a>
              <button
                onClick={() => handleNavClick('contact')}
                className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-sans font-bold text-xs px-5 py-2.5 rounded-md shadow-md hover:shadow-lg transition-all cursor-pointer"
              >
                Book Consultation
              </button>
            </div>

            {/* Mobile menu toggle button */}
            <div className="md:hidden flex items-center space-x-2">
              <button
                onClick={openCms}
                className="p-2 text-amber-700 hover:text-amber-800 bg-stone-100 rounded border border-stone-200 shadow-sm"
                title="CMS Management Dashboard"
              >
                <Settings size={16} />
              </button>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 rounded-md text-stone-600 hover:text-stone-900 focus:outline-none"
              >
                {isOpen ? <X size={24} className="text-amber-600" /> : <Menu size={24} className="text-amber-600" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu drawer */}
        {isOpen && (
          <div className="md:hidden bg-stone-50 border-b border-amber-500/10 duration-300">
            <div className="px-4 pt-4 pb-6 space-y-3 shadow-inner">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`block w-full text-left px-3 py-3 rounded-md text-base font-semibold transition-all ${
                    activeTab === item.id
                      ? 'bg-amber-500/10 text-amber-700 border-l-2 border-amber-500 pl-4 font-bold'
                      : 'text-stone-700 hover:bg-stone-100 hover:text-stone-900'
                  }`}
                >
                  {item.label}
                </button>
              ))}
              <div className="pt-4 border-t border-stone-200 flex flex-col space-y-3">
                <a
                  href={`tel:${business.phone}`}
                  className="w-full text-center bg-stone-100 border border-amber-500/25 text-amber-700 py-3 rounded-md text-sm font-semibold flex items-center justify-center space-x-2 shadow-sm"
                >
                  <Phone size={15} />
                  <span>Call {business.phone}</span>
                </a>
                <button
                  onClick={() => handleNavClick('contact')}
                  className="w-full text-center bg-amber-500 text-slate-950 py-3 rounded-md text-sm font-bold flex items-center justify-center cursor-pointer shadow-sm"
                >
                  Plan Custom Trip
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
