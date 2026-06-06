import React, { useState, useEffect } from 'react';
import { X, Calendar, MapPin, Phone, Mail, User, Send, MessageSquare, CheckCircle } from 'lucide-react';
import { BusinessInfo, TourPackage } from '../types';
import { addSubmission } from '../lib/contentStore';

interface LeadInquiryModalProps {
  business: BusinessInfo;
  isOpen: boolean;
  onClose: () => void;
  selectedPackage: TourPackage | null;
  allPackages: TourPackage[];
}

export default function LeadInquiryModal({ business, isOpen, onClose, selectedPackage, allPackages }: LeadInquiryModalProps) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [destination, setDestination] = useState('');
  const [travelDate, setTravelDate] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [whatsappShareUrl, setWhatsappShareUrl] = useState('');

  const [validationError, setValidationError] = useState<string | null>(null);

  // Update destination field when selected package changes
  useEffect(() => {
    if (selectedPackage) {
      setDestination(selectedPackage.title);
      setMessage(`Hi, I'm interested in the "${selectedPackage.title}" tour package (${selectedPackage.duration}) priced at ${selectedPackage.price}. Please share customized options.`);
    } else {
      setDestination('');
      setMessage('');
    }
    // Reset submission state when modal reopens
    if (isOpen) {
      setIsSubmitted(false);
      setValidationError(null);
    }
  }, [selectedPackage, isOpen]);

  if (!isOpen) return null;

  const validateForm = (): boolean => {
    // 1. Phone number clean & validate (Indian Standard: 10 digits starting with 6-9, optional +91/91 etc)
    const cleanPhone = phone.replace(/[^0-9]/g, '');
    let isPhoneValid = false;
    if (cleanPhone.length === 10) {
      isPhoneValid = /^[6-9]\d{9}$/.test(cleanPhone);
    } else if (cleanPhone.length === 12 && cleanPhone.startsWith('91')) {
      isPhoneValid = /^[6-9]\d{9}$/.test(cleanPhone.substring(2));
    }
    
    if (!isPhoneValid) {
      setValidationError('Please enter a valid Indian mobile number (e.g., 10 digits starting with 6, 7, 8, or 9, optionally prefixed by +91).');
      return false;
    }

    // 2. Email formatting check (standard patterns)
    if (email) {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!emailRegex.test(email.trim())) {
        setValidationError('Please provide a valid email format (e.g., mail@domain.com).');
        return false;
      }
    }

    // 3. Travel Date checks
    if (travelDate) {
      const selected = new Date(travelDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (selected < today) {
        setValidationError('The selected travel date has already expired! Please choose today or a future date.');
        return false;
      }

      if (selected.getFullYear() >= 2029) {
        setValidationError('Dates in 2029 or later are beyond our booking scope! SM Tours & Travels arranges packages up to December 31, 2028. Please select a dynamic date before 2029.');
        return false;
      }
    }

    setValidationError(null);
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !destination) {
      setValidationError('Please fill out Name, Phone, and Destination Interested In.');
      return;
    }

    if (!validateForm()) {
      return;
    }

    // Save lead submission to local database (localStorage contentStore)
    addSubmission({
      name,
      phone,
      email,
      destination,
      travelDate,
      message
    });

    // Create custom WhatsApp message pre-filled with their details!
    const customMessage = `Hello SM Tours & Travels, I just submitted an inquiry on your website:
*Name*: ${name}
*Phone*: ${phone}
*Email*: ${email || 'Not provided'}
*Destination*: ${destination}
*Travel Date*: ${travelDate || 'Flexible'}
*Requirements*: ${message || 'Standard quote request'}`;

    const waUrl = `https://wa.me/${business.whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(customMessage)}`;
    setWhatsappShareUrl(waUrl);
    setIsSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm" onClick={onClose} id="modal-backdrop" />
      
      {/* Modal Box */}
      <div className="relative bg-slate-900 border border-amber-500/30 rounded-xl shadow-2xl w-full max-w-lg overflow-hidden transform transition-all duration-300 pointer-events-auto">
        
        {/* Decorative Luxury Top Header */}
        <div className="bg-gradient-to-r from-amber-500/20 to-slate-950 px-6 py-4 border-b border-amber-500/20 flex justify-between items-center">
          <div className="flex flex-col">
            <span className="text-amber-400 text-xs font-semibold tracking-widest uppercase font-mono">
              Inquiry Booking Service
            </span>
            <h3 className="text-white text-base font-bold font-sans">
              {selectedPackage ? 'Customize Your Tour Package' : 'Plan Your Personal Itinerary'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            id="modal-close-button"
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Content */}
        {!isSubmitted ? (
          <form onSubmit={handleSubmit} className="p-6 space-y-4 font-sans text-sm">
            {validationError && (
              <div className="bg-red-950/40 border border-red-500/30 text-red-200 p-3 rounded text-xs leading-relaxed font-medium">
                ⚠️ {validationError}
              </div>
            )}

            {selectedPackage && (
              <div className="bg-slate-950/70 p-3 rounded-lg border border-amber-500/10 flex items-center space-x-3">
                <img
                  src={selectedPackage.imageUrl}
                  alt={selectedPackage.title}
                  className="w-16 h-12 object-cover rounded-md flex-shrink-0"
                  referrerPolicy="no-referrer"
                />
                <div className="min-w-0">
                  <h4 className="text-amber-400 font-semibold truncate text-xs">{selectedPackage.title}</h4>
                  <p className="text-slate-400 text-[11px] font-medium">{selectedPackage.duration} • <span className="text-emerald-400 font-semibold">{selectedPackage.price}</span></p>
                </div>
              </div>
            )}

            {/* Form Fields Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-300 tracking-wider mb-1.5 flex items-center">
                  <User size={12} className="text-amber-500 mr-1.5" /> Name *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Ramesh Reddy"
                  className="w-full bg-slate-950 text-white border border-slate-800 focus:border-amber-500/60 rounded px-3 py-2 text-xs focus:outline-none"
                  id="inquiry-name"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-slate-300 tracking-wider mb-1.5 flex items-center">
                  <Phone size={12} className="text-amber-500 mr-1.5" /> Phone Number *
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="e.g. +91 9876543210"
                  className="w-full bg-slate-950 text-white border border-slate-800 focus:border-amber-500/60 rounded px-3 py-2 text-xs focus:outline-none"
                  id="inquiry-phone"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold uppercase text-slate-300 tracking-wider mb-1.5 flex items-center">
                  <Mail size={12} className="text-amber-500 mr-1.5" /> Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. customer@example.com"
                  className="w-full bg-slate-950 text-white border border-slate-800 focus:border-amber-500/60 rounded px-3 py-2 text-xs focus:outline-none"
                  id="inquiry-email"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-slate-300 tracking-wider mb-1.5 flex items-center">
                  <MapPin size={12} className="text-amber-500 mr-1.5" /> Destination Interested In *
                </label>
                <select
                  required
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="w-full bg-slate-950 text-white border border-slate-800 focus:border-amber-500/60 rounded px-3 py-2 text-xs focus:outline-none"
                  id="inquiry-destination"
                >
                  <option value="">-- Choose Destination --</option>
                  <option value="Flight Tickets Booking Only">Flight Tickets Booking Only</option>
                  <option value="Passport/Visa Consultation">Passport / Visa Consultation</option>
                  <option value="Hotel Bookings Only">Hotel Bookings Only</option>
                  {allPackages.map(pkg => (
                    <option key={pkg.id} value={pkg.title}>{pkg.title} ({pkg.duration})</option>
                  ))}
                  <option value="Other Custom Domestic Destination">Other Custom Domestic Trip</option>
                  <option value="Other Custom International Destination">Other Custom International Trip</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-slate-300 tracking-wider mb-1.5 flex items-center">
                  <Calendar size={12} className="text-amber-500 mr-1.5" /> Proposed Travel Date
                </label>
                <input
                  type="date"
                  value={travelDate}
                  onChange={(e) => setTravelDate(e.target.value)}
                  className="w-full bg-slate-950 text-white border border-slate-800 focus:border-amber-500/60 rounded px-3 py-2 text-xs focus:outline-none"
                  id="inquiry-date"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold uppercase text-slate-300 tracking-wider mb-1.5">
                  Message & Specific Customizations
                </label>
                <textarea
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Please specify passenger count, budget limitations, preferred star-hotel ratings, flight transfers, etc..."
                  className="w-full bg-slate-950 text-white border border-slate-800 focus:border-amber-500/60 rounded px-3 py-2 text-xs focus:outline-none resize-none"
                  id="inquiry-message"
                />
              </div>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 py-2.5 rounded font-bold transition-all shadow-md flex items-center justify-center space-x-2 cursor-pointer"
                id="inquiry-submit"
              >
                <Send size={14} />
                <span>Submit Lead Inquiry</span>
              </button>
            </div>
          </form>
        ) : (
          <div className="p-8 text-center space-y-6 font-sans">
            <div className="mx-auto bg-emerald-500/10 text-emerald-400 p-4 rounded-full w-16 h-16 flex items-center justify-center border border-emerald-500/20 animate-pulse">
              <CheckCircle size={36} />
            </div>

            <div className="space-y-2">
              <h4 className="text-white text-lg font-bold">Inquiry Successfully Lodged!</h4>
              <p className="text-slate-400 text-xs max-w-sm mx-auto leading-relaxed">
                Thank you **{name}**. Your lead details have been registered into the secure locally managed SM Tours dashboard for follow-up.
              </p>
            </div>

            <div className="border-t border-slate-800/80 pt-6 space-y-3">
              <p className="text-slate-300 text-xs font-medium">Want instant response? Launch directly in WhatsApp:</p>
              
              <a
                href={whatsappShareUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-[#25D366] hover:bg-[#20ba5a] text-white py-3 px-4 rounded font-bold transition-all flex items-center justify-center space-x-2.5 cursor-pointer shadow-md"
              >
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/5/5e/WhatsApp_icon.png"
                  alt="WhatsApp"
                  className="w-5 h-5 object-contain flex-shrink-0 select-none"
                  referrerPolicy="no-referrer"
                />
                <span>Chat Instantly with Sonika</span>
              </a>
              
              <p className="text-[10px] text-slate-500">
                This will pre-fill your inquiry message to **+91 8977820246** so you don't have to retype details.
              </p>
            </div>

            <div className="pt-2">
              <button
                onClick={onClose}
                className="text-slate-400 hover:text-white transition-colors underline text-xs font-semibold cursor-pointer"
              >
                Close and Go Back
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
