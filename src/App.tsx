import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import FloatingCTA from './components/FloatingCTA';
import LeadInquiryModal from './components/LeadInquiryModal';

// Features
import HomeSection from './features/home/HomeSection';
import PackagesSection from './features/packages/PackagesSection';
import ServicesSection from './features/services/ServicesSection';
import AboutSection from './features/about/AboutSection';
import ContactSection from './features/contact/ContactSection';
import CmsSection from './features/cms/CmsSection';

// Types & Helpers
import { AppContent, TourPackage } from './types';
import { getAppContent } from './lib/contentStore';
import { injectStructuredSchema, updatePageMeta } from './lib/seo';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [appContent, setAppContent] = useState<AppContent>(getAppContent());
  const [selectedInquiryPkg, setSelectedInquiryPkg] = useState<TourPackage | null>(null);
  const [isInquiryModalOpen, setIsInquiryModalOpen] = useState(false);

  // Load content state on lifecycle and configure SEO metadata + JSON-LD schema
  useEffect(() => {
    // Inject Structured SEO schema on load
    injectStructuredSchema(appContent.business, window.location.origin);
    
    // Set dynamic page metadata corresponding to target active tab!
    let title = 'SM Tours & Travels | Premium Luxury Tour Agency Hyderabad';
    let desc = 'SM Tours & Travels specializes in customized domestic flight tickets, international flights, honeymoon tour packages, hotel reservations, and expedited visa/passport processing.';
    
    if (activeTab === 'packages') {
      title = 'Tour Packages Catalog | SM Tours & Travels';
      desc = 'Browse kashmir delight, kerala backwaters, andaman adventures, dubai explorers, bali honeymoons, and europe highlighting packages crafted by Sonika.';
    } else if (activeTab === 'services') {
      title = 'Our Services | Flight Bookings & Visa Assistance Hyderabad';
      desc = 'Secure pre-aligned group operator airline tickets, verified premium hotel blocks, tatkaal passport services, and consulate tourist visa formatting with 98% successes.';
    } else if (activeTab === 'about') {
      title = 'About Our Mission & Vision | SM Tours & Travels';
      desc = 'Founded in Hyderabad, learn how Sonika leads our boutique travel desk to ensure absolute transparency, emergency concierge support, and beautiful memories.';
    } else if (activeTab === 'contact') {
      title = 'Connect with Sonika | Inquiries & Consultation Malakpet';
      desc = 'Contact SM Tours & Travels in Moosarambagh, Malakpet, Hyderabad. Call +91 8977820246 or submit our live inquiry intake for instant pricing quotes.';
    } else if (activeTab === 'cms') {
      title = 'Partner Portal | Cms Content Manager';
      desc = 'Secure administrative dashboard to coordinate client bookings and edit package highlights.';
    }

    updatePageMeta(title, desc);
  }, [activeTab, appContent]);

  // Handle live content reloading when visual updates are applied in the CMS panel
  const handleContentReload = () => {
    setAppContent(getAppContent());
  };

  const handleSelectPackageForInquiry = (pkg: TourPackage) => {
    setSelectedInquiryPkg(pkg);
    setIsInquiryModalOpen(true);
  };

  const handleOpenGeneralInquiry = () => {
    setSelectedInquiryPkg(null);
    setIsInquiryModalOpen(true);
  };

  const handleOpenCmsTab = () => {
    setActiveTab('cms');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-screen flex flex-col justify-between bg-stone-50 text-stone-800 select-none">
      
      {/* 1. SEAMLESS NAVIGATION HEADER (Unless in Admin Gate) */}
      <Header
        business={appContent.business}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        openCms={handleOpenCmsTab}
      />

      {/* 2. CHOSEN ROUTE OUTLAY */}
      <main className="flex-grow w-full">
        {activeTab === 'home' && (
          <HomeSection
            content={appContent}
            onExplorePackages={() => {
              setActiveTab('packages');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onSelectPackage={handleSelectPackageForInquiry}
            setActiveTab={setActiveTab}
          />
        )}

        {activeTab === 'packages' && (
          <PackagesSection
            content={appContent}
            onSelectPackage={handleSelectPackageForInquiry}
          />
        )}

        {activeTab === 'services' && (
          <ServicesSection
            onQuoteRequest={(serviceTitle) => {
              // Open modal with dummy description preconfigured
              setSelectedInquiryPkg({
                id: 'srv-quote',
                title: serviceTitle,
                description: `Bespoke assistance request for: ${serviceTitle}`,
                price: 'Custom quote',
                duration: 'On Demand Assistance',
                highlights: [],
                imageUrl: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=800&q=80',
                category: 'domestic',
                isPopular: false,
                rating: 5.0
              });
              setIsInquiryModalOpen(true);
            }}
          />
        )}

        {activeTab === 'about' && (
          <AboutSection
            profile={appContent.profile}
            business={appContent.business}
            setActiveTab={setActiveTab}
          />
        )}

        {activeTab === 'contact' && (
          <ContactSection
            business={appContent.business}
          />
        )}

        {activeTab === 'cms' && (
          <CmsSection
            onClose={() => {
              setActiveTab('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onContentChange={handleContentReload}
          />
        )}
      </main>

      {/* 3. PREMIUM FOOTER DISCLOSURES (Hidden in full-screen Admin page) */}
      {activeTab !== 'cms' && (
        <Footer
          business={appContent.business}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          openCms={handleOpenCmsTab}
        />
      )}

      {/* 4. INSTANT CONTACT AND INQUIRY FLAGGING */}
      {activeTab !== 'cms' && (
        <FloatingCTA
          business={appContent.business}
          onInquiryClick={handleOpenGeneralInquiry}
        />
      )}

      {/* 5. USER INQUIRY REGISTRATION MODAL */}
      <LeadInquiryModal
        business={appContent.business}
        isOpen={isInquiryModalOpen}
        onClose={() => setIsInquiryModalOpen(false)}
        selectedPackage={selectedInquiryPkg}
        allPackages={appContent.packages}
      />

    </div>
  );
}
