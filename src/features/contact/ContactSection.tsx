import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageSquare, CheckCircle, Clock } from 'lucide-react';
import { BusinessInfo } from '../../types';
import { addSubmission } from '../../lib/contentStore';

interface ContactSectionProps {
  business: BusinessInfo;
}

export default function ContactSection({ business }: ContactSectionProps) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [destination, setDestination] = useState('');
  const [date, setDate] = useState('');
  const [message, setMessage] = useState('');
  const [isDone, setIsDone] = useState(false);
  const [waLink, setWaLink] = useState('');

  const [validationError, setValidationError] = useState<string | null>(null);

  const validateForm = (): boolean => {
    // 1. Phone number clean & validate (Indian standard mobile)
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

    // 2. Email validation formatting
    if (email) {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!emailRegex.test(email.trim())) {
        setValidationError('Please provide a valid email format (e.g., yourname@domain.com).');
        return false;
      }
    }

    // 3. Date boundary checks
    if (date) {
      const selected = new Date(date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (selected < today) {
        setValidationError('The selected travel date has already expired! Please choose today or a future date.');
        return false;
      }

      if (selected.getFullYear() >= 2029) {
        setValidationError('Dates in 2029 or later are beyond our booking scope! SM Tours & Travels books programs up to December 31, 2528. Please select a dynamic date before 2029.');
        return false;
      }
    }

    setValidationError(null);
    return true;
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !destination) {
      setValidationError('Please provide your Name, Phone and Destination Interested In.');
      return;
    }

    if (!validateForm()) {
      return;
    }

    addSubmission({
      name,
      phone,
      email,
      destination,
      travelDate: date,
      message
    });

    const bodyText = `Hello SM Tours & Travels, I just filled a lead inquiry:
*Name*: ${name}
*Phone*: ${phone}
*Email*: ${email || 'None'}
*Destination*: ${destination}
*Travel Date*: ${date || 'Flexible'}
*Message*: ${message || 'No additional remarks'}`;

    const link = `https://wa.me/${business.whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(bodyText)}`;
    setWaLink(link);
    setIsDone(true);
  };

  return (
    <div className="w-full bg-stone-50 py-16 text-stone-800 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Intro */}
        <div className="text-center space-y-4 mb-16">
          <span className="text-amber-800 font-bold font-mono text-xs tracking-widest uppercase block bg-amber-50 px-3 py-1 rounded border border-amber-200/50 inline-block">
            RESERVE A CONSULTATION
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold uppercase text-stone-900 font-serif">
            Connect with SM Tours & Travels
          </h1>
          <p className="text-stone-600 text-xs md:text-sm max-w-xl mx-auto leading-relaxed font-semibold">
            Have queries regarding flights booking, customized honeymoon packages, or passport/visa applications? Connect with Sonika directly.
          </p>
        </div>

        {/* Content Layout Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16 items-start">
          
          {/* Left panel: Info + Map */}
          <div className="space-y-8 font-sans">
            
            <div className="bg-white border border-stone-200 p-6 rounded-xl space-y-5 shadow-sm">
              <h3 className="text-stone-900 text-sm font-extrabold uppercase tracking-wide border-b border-stone-100 pb-2 font-serif">
                Office Information
              </h3>

              <div className="space-y-4">
                
                <div className="flex items-start space-x-3 text-xs">
                  <MapPin size={18} className="text-amber-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="text-stone-900 font-bold mb-1 font-serif uppercase tracking-wider text-[10px]">Office Location Address</h4>
                    <p className="text-stone-600 font-semibold leading-relaxed">{business.address}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3 text-xs">
                  <Phone size={18} className="text-amber-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="text-stone-900 font-bold mb-1 font-serif uppercase tracking-wider text-[10px]">Click to Dial Contacts</h4>
                    <a href={`tel:${business.phone}`} className="text-amber-850 hover:underline font-bold text-xs font-mono">
                      {business.phone}
                    </a>
                    <p className="text-stone-500 font-semibold text-[10px] mt-0.5">Proprietor: Sonika (Calls & WhatsApp Enabled)</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3 text-xs">
                  <Mail size={18} className="text-amber-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="text-stone-900 font-bold mb-1 font-serif uppercase tracking-wider text-[10px]">Direct Email Delivery</h4>
                    <a href={`mailto:${business.email}`} className="text-amber-850 hover:underline font-bold font-mono text-xs">
                      {business.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-3 text-xs">
                  <Clock size={18} className="text-amber-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="text-stone-900 font-bold mb-1 font-serif uppercase tracking-wider text-[10px]">Office Hours Matrix</h4>
                    <p className="text-stone-600 font-semibold">Monday — Saturday: 09:30 AM to 08:00 PM</p>
                    <p className="text-stone-500 font-semibold text-[10px]">Sunday: On-Call Urgent Consultations Only</p>
                  </div>
                </div>

              </div>
            </div>

            {/* Google Maps embed with full relative wrapper */}
            <div className="w-full bg-white border border-stone-200 rounded-xl overflow-hidden h-[260px] relative shadow-sm">
              <iframe
                title="Google Maps Location of Moosarambagh, Malakpet, Hyderabad"
                src={business.googleMapsEmbedUrl}
                className="absolute inset-0 w-full h-full border-0"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

          </div>

          {/* Right panel: Form submissions */}
          <div className="bg-white border border-stone-200 rounded-xl p-8 shadow-sm relative">
            
            {!isDone ? (
              <form onSubmit={handleFormSubmit} className="space-y-4 text-xs font-sans">
                <div className="space-y-1 mb-4">
                  <h3 className="text-stone-900 text-sm font-extrabold uppercase tracking-wide font-serif">
                    Live Inquiry Intake
                  </h3>
                  <p className="text-stone-500 text-[11px] font-semibold">
                    Fill in details below. Sonika receives these leads directly inside her secure CRM panel.
                  </p>
                </div>

                {validationError && (
                  <div className="bg-red-50 border border-red-200 text-red-800 p-3.5 rounded-lg text-xs leading-relaxed font-bold">
                    ⚠️ {validationError}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  
                  <div>
                    <label className="block text-[10px] font-bold text-stone-700 uppercase tracking-wider mb-1 font-mono">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Anand Rao"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-stone-50 border border-stone-200 rounded-lg px-3 py-2.5 text-stone-900 focus:border-amber-500 focus:bg-white focus:outline-none font-medium"
                      id="contact-name"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-stone-700 uppercase tracking-wider mb-1 font-mono">
                      Phone Call Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. +91 9988776655"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-stone-50 border border-stone-200 rounded-lg px-3 py-2.5 text-stone-900 focus:border-amber-500 focus:bg-white focus:outline-none font-medium"
                      id="contact-phone"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-[10px] font-bold text-stone-700 uppercase tracking-wider mb-1 font-mono">
                      Email Address
                    </label>
                    <input
                      type="email"
                      placeholder="e.g. anand.rao@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-stone-50 border border-stone-200 rounded-lg px-3 py-2.5 text-stone-900 focus:border-amber-500 focus:bg-white focus:outline-none font-medium"
                      id="contact-email"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-stone-700 uppercase tracking-wider mb-1 font-mono">
                      Destination Interested In *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Kashmir Tour, Maldives, Schengen Visa"
                      value={destination}
                      onChange={(e) => setDestination(e.target.value)}
                      className="w-full bg-stone-50 border border-stone-200 rounded-lg px-3 py-2.5 text-stone-900 focus:border-amber-500 focus:bg-white focus:outline-none font-medium"
                      id="contact-destination"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-stone-700 uppercase tracking-wider mb-1 font-mono">
                      Proposed Travel Date
                    </label>
                    <input
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full bg-stone-50 border border-stone-200 rounded-lg px-3 py-2.5 text-stone-900 focus:border-amber-500 focus:bg-white focus:outline-none font-medium"
                      id="contact-date"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-[10px] font-bold text-stone-700 uppercase tracking-wider mb-1 font-mono">
                      Remarks, Custom Outlays & Questions
                    </label>
                    <textarea
                      rows={4}
                      placeholder="What is your budget size? Hotel star expectation? Passenger count (Adults/Kids)?"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full bg-stone-50 border border-stone-200 rounded-lg px-3 py-2.5 text-stone-900 focus:border-amber-500 focus:bg-white focus:outline-none resize-none font-medium"
                      id="contact-message"
                    />
                  </div>

                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full bg-amber-500 hover:bg-amber-605 text-slate-950 font-bold py-3.5 rounded-lg transition-colors cursor-pointer flex items-center justify-center space-x-2 shadow-sm font-sans uppercase tracking-wider"
                    id="contact-form-submit"
                  >
                    <Send size={14} />
                    <span>Send Inquiry Lead</span>
                  </button>
                </div>
              </form>
            ) : (
              <div className="p-8 text-center space-y-6">
                <div className="mx-auto bg-emerald-50 text-emerald-600 p-4 rounded-full w-16 h-16 flex items-center justify-center border border-emerald-200">
                  <CheckCircle size={32} />
                </div>

                <div className="space-y-2">
                  <h4 className="text-stone-900 text-base font-bold font-serif uppercase">Inquiry Lodged Correctly!</h4>
                  <p className="text-stone-605 text-xs leading-relaxed max-w-sm mx-auto font-semibold">
                    Hi <span className="text-stone-900 font-extrabold">{name}</span>, we saved your lead info. Our travel expert Sonika will contact you within the next 2 hours.
                  </p>
                </div>

                <div className="border-t border-stone-200 pt-6 space-y-3 font-sans text-xs">
                  <p className="text-stone-700 font-extrabold text-xs">Instantly ping details to WhatsApp:</p>
                  
                  <a
                    href={waLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-[#25D366] hover:bg-[#20ba5a] text-white py-3.5 rounded-lg font-bold transition-all flex items-center justify-center space-x-2.5 cursor-pointer shadow-md"
                  >
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/5/5e/WhatsApp_icon.png"
                      alt="WhatsApp"
                      className="w-5 h-5 object-contain flex-shrink-0 select-none"
                      referrerPolicy="no-referrer"
                    />
                    <span>Ping Sonika on WhatsApp</span>
                  </a>

                  <p className="text-[10px] text-stone-500 font-semibold">
                    This automatically structures your details for quick pricing!
                  </p>
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => {
                      setName('');
                      setPhone('');
                      setEmail('');
                      setDestination('');
                      setDate('');
                      setMessage('');
                      setIsDone(false);
                    }}
                    className="text-amber-800 hover:text-amber-600 font-bold transition-colors underline text-xs cursor-pointer"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
}
