import React from 'react';
import { X, Calendar, Compass, ArrowRight, Star, Heart, CheckCircle, FileText, Download } from 'lucide-react';
import { TourPackage } from '../types';

interface ItineraryModalProps {
  pkg: TourPackage | null;
  onClose: () => void;
  onPlanTrip: (pkg: TourPackage) => void;
}

export default function ItineraryModal({ pkg, onClose, onPlanTrip }: ItineraryModalProps) {
  if (!pkg) return null;

  // Custom high-quality client-side PDF exporter that generates a luxury printable itinerary
  const handleDownloadItineraryPdf = () => {
    // 1. If admin uploaded a specific PDF file, download it directly
    if (pkg.pdfData) {
      try {
        const link = document.createElement('a');
        link.href = pkg.pdfData;
        link.download = pkg.pdfName || `${pkg.title.replace(/\s+/g, '_')}_bespoke_itinerary.pdf`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        return;
      } catch (err) {
        console.error('Failed to download binary base64 PDF representation', err);
      }
    } else if (pkg.pdfUrl) {
      window.open(pkg.pdfUrl, '_blank');
      return;
    }

    // 2. Fallback: Beautiful structured PDF print output
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      const year = new Date().getFullYear();
      const itineraryHtml = `
        <html>
          <head>
            <title>${pkg.title} - SM Tours & Travels</title>
            <style>
              @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,600;1,400&display=swap');
              body {
                font-family: 'Outfit', sans-serif;
                color: #292524;
                line-height: 1.65;
                padding: 40px;
                max-width: 850px;
                margin: 0 auto;
                background-color: #fff;
              }
              .header {
                text-align: center;
                border-bottom: 2px solid #d97706;
                padding-bottom: 20px;
                margin-bottom: 30px;
              }
              .logo {
                font-family: 'Playfair Display', serif;
                font-size: 32px;
                font-weight: bold;
                color: #451a03;
                text-transform: uppercase;
                letter-spacing: 2px;
                margin: 0;
              }
              .tagline {
                font-size: 11px;
                text-transform: uppercase;
                color: #b45309;
                letter-spacing: 4px;
                margin-top: 6px;
                font-weight: 700;
              }
              .title {
                font-family: 'Playfair Display', serif;
                font-size: 24px;
                color: #1c1917;
                margin: 20px 0 10px;
                text-transform: uppercase;
                text-align: center;
                letter-spacing: 0.5px;
              }
              .meta-grid {
                display: flex;
                background: #fdfbf7;
                border: 1px solid #fed7aa;
                padding: 15px;
                border-radius: 8px;
                margin: 25px 0;
              }
              .meta-col {
                flex: 1;
                text-align: center;
              }
              .meta-col:not(:last-child) {
                border-right: 1px solid #fed7aa;
              }
              .meta-lbl {
                font-size: 9px;
                color: #78716c;
                text-transform: uppercase;
                letter-spacing: 1.5px;
                font-weight: 600;
              }
              .meta-val {
                font-weight: 700;
                color: #9a3412;
                font-size: 14px;
                margin-top: 3px;
              }
              .highlights {
                background-color: #fafaf9;
                border-left: 4px solid #d97706;
                padding: 18px;
                margin: 25px 0;
                border-radius: 0 8px 8px 0;
              }
              .highlights-title {
                font-weight: 700;
                color: #451a03;
                margin-bottom: 12px;
                font-size: 13px;
                text-transform: uppercase;
                letter-spacing: 1px;
              }
              .highlights-list {
                padding-left: 20px;
                margin: 0;
              }
              .highlights-list li {
                font-size: 12px;
                color: #44403c;
                margin-bottom: 6px;
              }
              .section-heading {
                font-family: 'Playfair Display', serif;
                font-size: 18px;
                font-weight: bold;
                margin: 30px 0 15px;
                color: #451a03;
                text-transform: uppercase;
                letter-spacing: 1px;
                border-left: 3px solid #b45309;
                padding-left: 10px;
              }
              .day-card {
                border: 1px solid #e7dcd3;
                border-radius: 8px;
                padding: 18px;
                margin-bottom: 18px;
                background: #fff;
                page-break-inside: avoid;
              }
              .day-header {
                font-weight: 750;
                color: #9a3412;
                font-size: 13px;
                border-bottom: 1px solid #f5ebe0;
                padding-bottom: 6px;
                margin-bottom: 10px;
                text-transform: uppercase;
                letter-spacing: 0.5px;
              }
              .day-content {
                font-size: 12.5px;
                color: #44403c;
                line-height: 1.6;
              }
              .legal-disclaimers {
                font-size: 10px;
                color: #78716c;
                font-style: italic;
                margin-top: 30px;
                line-height: 1.5;
                text-align: center;
              }
              .footer {
                text-align: center;
                margin-top: 50px;
                border-top: 1px solid #e7e5e4;
                padding-top: 20px;
                font-size: 11px;
                color: #78716c;
              }
              .no-print {
                display: flex;
                justify-content: space-between;
                align-items: center;
                background-color: #f5f5f4;
                padding: 12px 24px;
                border-radius: 8px;
                margin-bottom: 30px;
              }
              @media print {
                .no-print { display: none !important; }
                body { padding: 0px; }
              }
            </style>
          </head>
          <body>
            <div class="no-print">
              <span style="font-size: 12px; color: #44403c; font-weight: 600;">📁 Your Bespoke Tour PDF is compiled successfully!</span>
              <button onclick="window.print()" style="background-color: #d97706; color: white; padding: 8px 16px; border: none; border-radius: 5px; font-weight: bold; cursor: pointer; font-size: 12px; font-family: 'Outfit', sans-serif;">
                💾 Save as PDF / Print Itinerary
              </button>
            </div>

            <div class="header">
              <h1 class="logo">SM Tours & Travels</h1>
              <div class="tagline">Safar Saarthi Travel Companion</div>
              <p style="font-size: 12px; margin: 8px 0 0; color: #44403c;">
                Proprietor: Sonika | Phone: +91 8977820246 | Email: sonika@safarsaarthi.com <br/>
                Office Address: Moosarambagh, Malakpet, Hyderabad, Telangana 500036
              </p>
            </div>

            <h2 class="title">${pkg.title}</h2>
            <p style="color: #44403c; font-size: 13.5px; text-align: center; max-width: 700px; margin: 0 auto 20px;">
              ${pkg.description}
            </p>

            <div class="meta-grid">
              <div class="meta-col">
                <div class="meta-lbl">Tariff Plan</div>
                <div class="meta-val">${pkg.price}</div>
              </div>
              <div class="meta-col">
                <div class="meta-lbl">Excursion Duration</div>
                <div class="meta-val">${pkg.duration}</div>
              </div>
              <div class="meta-col">
                <div class="meta-lbl">Vetted Guest Rating</div>
                <div class="meta-val">★ ${pkg.rating.toFixed(1)} / 5.0</div>
              </div>
            </div>

            <div class="highlights">
              <div class="highlights-title">Custom-Included Luxuries</div>
              <ul class="highlights-list">
                ${pkg.highlights.map(h => `<li>${h}</li>`).join('')}
              </ul>
            </div>

            <h3 class="section-heading">Detailed Day-to-Day Itinerary Schedule</h3>
            
            ${(pkg.itinerary || []).map(day => `
              <div class="day-card">
                <div class="day-header">Day ${day.day} • ${day.title}</div>
                <div class="day-content">${day.activities}</div>
              </div>
            `).join('')}

            <p class="legal-disclaimers">
              * Important Disclosure: Pricing, flight arrangements, hotel configurations, and transfer itineraries are completely customizable by SM Tours and may subject to seasonal availability.
            </p>

            <div class="footer">
              <p>Crafted exclusively in Hyderabad, Telangana (Safar Saarthi Digital Desk)</p>
              <p>© ${year} SM Tours & Travels. All Rights Reserved.</p>
            </div>

            <script>
              window.onload = function() {
                setTimeout(function() {
                  window.print();
                }, 500);
              };
            </script>
          </body>
        </html>
      `;
      printWindow.document.write(itineraryHtml);
      printWindow.document.close();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/40 backdrop-blur-sm animate-fade-in font-sans">
      <div 
        className="relative bg-white border border-amber-500/10 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col shadow-2xl animate-scale-up"
        id={`itinerary-modal-${pkg.id}`}
      >
        {/* Top Banner and Cover Image */}
        <div className="relative h-48 md:h-56 w-full flex-shrink-0">
          <img 
            src={pkg.imageUrl} 
            alt={pkg.title} 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-stone-900 via-stone-900/40 to-transparent h-32" />
          
          {/* Close button */}
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 bg-white/90 text-stone-700 hover:text-stone-950 hover:bg-white duration-200 border border-stone-200/65 p-2 rounded-full cursor-pointer shadow-md"
            aria-label="Close dialog"
          >
            <X size={15} />
          </button>

          {/* Heading overlay */}
          <div className="absolute bottom-4 left-6 right-6 space-y-1.5">
            <span className="text-[10px] font-mono tracking-widest text-amber-300 uppercase font-bold bg-stone-950/70 px-2.5 py-1 rounded border border-amber-400/20 inline-block">
              {pkg.category === 'domestic' ? 'Domestic Handpick' : 'International Deluxe'}
            </span>
            <h2 className="text-white text-xl md:text-2xl font-bold uppercase tracking-wide font-serif">
              {pkg.title}
            </h2>
          </div>
        </div>

        {/* Modal Scrollable Core Content */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 scrollbar bg-stone-50">
          
          {/* Package Overview Statistics Rows */}
          <div className="grid grid-cols-3 gap-2 bg-white p-4 rounded-lg border border-stone-200 shadow-sm text-center">
            <div>
              <p className="text-[9px] text-stone-500 uppercase tracking-widest font-bold font-mono">Pricing Plan</p>
              <p className="text-amber-800 text-xs md:text-sm font-extrabold mt-0.5 tracking-wide">{pkg.price}</p>
            </div>
            <div className="border-x border-stone-150">
              <p className="text-[9px] text-stone-500 uppercase tracking-widest font-bold font-mono">Duration</p>
              <p className="text-stone-900 text-xs md:text-sm font-extrabold mt-0.5">{pkg.duration}</p>
            </div>
            <div>
              <p className="text-[9px] text-stone-500 uppercase tracking-widest font-bold font-mono">Satisfaction</p>
              <p className="text-amber-700 text-xs md:text-sm font-extrabold mt-0.5 flex items-center justify-center">
                <Star size={12} className="fill-current text-amber-500 mr-1" />
                <span>{pkg.rating.toFixed(1)} / 5</span>
              </p>
            </div>
          </div>

          {/* PDF Instant Download Badge */}
          <div className="bg-amber-50 border border-amber-500/10 p-3.5 rounded-lg flex flex-col sm:flex-row items-center justify-between gap-3 shadow-inner">
            <div className="flex items-start space-x-2.5">
              <div className="bg-amber-500 p-2 rounded-md text-slate-950 flex-shrink-0">
                <FileText size={16} />
              </div>
              <div className="text-left">
                <h4 className="text-stone-900 font-bold text-xs uppercase tracking-wide">
                  {pkg.pdfData || pkg.pdfUrl ? 'Bespoke Itinerary Attached' : 'Save Itinerary Offline'}
                </h4>
                <p className="text-stone-500 text-[11px] leading-snug">
                  {pkg.pdfData || pkg.pdfUrl 
                    ? 'Download the custom detailed PDF compiled by Sonika.' 
                    : 'Download this itinerary in fully styled print-ready PDF format.'}
                </p>
              </div>
            </div>
            <button
              onClick={handleDownloadItineraryPdf}
              className="bg-stone-900 hover:bg-stone-800 text-white font-bold text-xs px-4 py-2.5 rounded-md flex items-center space-x-1.5 transition-all shadow-md cursor-pointer uppercase tracking-wider flex-shrink-0"
            >
              <Download size={13} />
              <span>{pkg.pdfData || pkg.pdfUrl ? 'Download PDF' : 'Save as PDF'}</span>
            </button>
          </div>

          {/* Descriptive Intro block */}
          <div className="space-y-2 bg-white p-4 rounded-lg border border-stone-200 shadow-sm">
            <h3 className="text-xs uppercase text-amber-800 tracking-wider font-bold font-mono">Introduction & Overview</h3>
            <p className="text-stone-700 text-xs leading-relaxed font-medium">
              {pkg.description}
            </p>
          </div>

          {/* Core Highlights Array */}
          <div className="bg-amber-50/20 border border-amber-200/40 p-4 rounded-lg space-y-2">
            <p className="text-[10px] uppercase font-bold text-amber-800 tracking-wider font-mono">Bespoke Perks Included:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {pkg.highlights.map((item, idx) => (
                <div key={idx} className="flex items-center space-x-2 text-[11px] text-stone-700 font-semibold">
                  <CheckCircle size={11} className="text-amber-600 flex-shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Day-to-Day Timeline Block */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2 border-b border-stone-200 pb-2">
              <Compass size={14} className="text-amber-600" />
              <h3 className="text-xs uppercase text-stone-900 font-bold tracking-widest font-mono">
                Comprehensive Handpicked Itinerary
              </h3>
            </div>

            {pkg.itinerary && pkg.itinerary.length > 0 ? (
              <div className="relative border-l-2 border-amber-300/30 ml-3.5 pl-6 space-y-6 pt-1">
                {pkg.itinerary.map((dayItem, i) => (
                  <div key={i} className="relative space-y-1.5 text-xs">
                    
                    {/* Pulsing Day circular badge on the timeline line */}
                    <span className="absolute -left-[33px] top-0.5 bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 text-[10px] font-bold font-mono h-5 py-0.5 w-5 rounded-full flex items-center justify-center shadow-md">
                      {dayItem.day}
                    </span>

                    <h4 className="text-stone-900 font-bold uppercase text-[11.5px] tracking-wide pt-0.5 font-sans">
                      Day {dayItem.day}: {dayItem.title}
                    </h4>
                    <p className="text-stone-600 leading-relaxed text-[11px] bg-white p-3.5 rounded border border-stone-200 shadow-sm font-medium">
                      {dayItem.activities}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-amber-50/10 p-5 rounded text-center border border-amber-500/5 text-stone-500 text-xs">
                Our packages feature standard custom tours, star accommodation rooms, airport pickups, and guided transfers. Talk to Sonika about the exact hour-by-hour options.
              </div>
            )}
          </div>

          {/* Fine print caveat warning */}
          <p className="text-[10px] text-stone-500 italic leading-relaxed text-center font-sans">
            * Standard pricing, sitemaps, flights, transfer bookings, and sightseeing options are fully subject to change according to real-time custom seasons.
          </p>

        </div>

        {/* Action Panel Footer */}
        <div className="p-4 bg-white border-t border-stone-250/20 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-xs w-full flex-shrink-0 shadow-[0_-4px_20px_rgba(0,0,0,0.015)]">
          <div className="text-center sm:text-left">
            <p className="text-amber-800 text-[10px] uppercase font-bold font-mono tracking-wider">Plan custom trip with Sonika</p>
            <p className="text-stone-900 font-bold text-xs mt-0.5">Need specific adjustments on this itinerary?</p>
          </div>
          <div className="flex justify-center sm:justify-end space-x-3">
            <button 
              onClick={onClose}
              className="px-4.5 py-2.5 rounded text-stone-600 hover:text-stone-900 hover:bg-stone-50 transition-colors border border-stone-200 bg-white text-center font-bold font-sans cursor-pointer"
            >
              Back to Catalog
            </button>
            <button
              onClick={() => onPlanTrip(pkg)}
              className="bg-amber-500 hover:bg-gradient-to-r hover:from-amber-500 hover:to-amber-600 text-slate-950 font-bold px-5 py-2.5 rounded transition-all flex items-center space-x-1 cursor-pointer justify-center shadow-sm"
            >
              <span>Consult Booking</span>
              <ArrowRight size={13} />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
