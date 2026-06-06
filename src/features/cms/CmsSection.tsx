import React, { useState, useEffect } from 'react';
import { Settings, Shield, Lock, FileText, Database, Plus, Trash2, Edit, Save, LogOut, Check, Download, Mail, Phone, ExternalLink, RefreshCw } from 'lucide-react';
import { AppContent, TourPackage, LeadSubmission, BusinessInfo } from '../../types';
import { getAppContent, saveAppContent, getSubmissions, updateSubmissionStatus, deleteSubmission, resetAppContentToDefault } from '../../lib/contentStore';

interface CmsSectionProps {
  onClose: () => void;
  onContentChange: () => void;
}

export default function CmsSection({ onClose, onContentChange }: CmsSectionProps) {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState<'owner' | 'developer' | null>(null);
  const [activeSubTab, setActiveSubTab] = useState<'leads' | 'packages' | 'business' | 'database' | 'schemas'>('leads');
  const [appContent, setAppContent] = useState<AppContent | null>(null);
  const [submissions, setSubmissions] = useState<LeadSubmission[]>([]);
  
  // States for Package Editing
  const [editingPackageId, setEditingPackageId] = useState<string | null>(null);
  const [pkgTitle, setPkgTitle] = useState('');
  const [pkgDesc, setPkgDesc] = useState('');
  const [pkgDuration, setPkgDuration] = useState('');
  const [pkgPrice, setPkgPrice] = useState('');
  const [pkgImageUrl, setPkgImageUrl] = useState('');
  const [pkgCategory, setPkgCategory] = useState<'domestic' | 'international'>('domestic');
  const [pkgHighlights, setPkgHighlights] = useState<string[]>([]);
  const [newHighlight, setNewHighlight] = useState('');
  const [pkgItinerary, setPkgItinerary] = useState<{ day: number; title: string; activities: string }[]>([]);

  // Custom PDF uploader states
  const [pkgPdfData, setPkgPdfData] = useState<string>('');
  const [pkgPdfName, setPkgPdfName] = useState<string>('');
  const [pkgPdfUrl, setPkgPdfUrl] = useState<string>('');

  // Subform inputs for adding an itinerary day
  const [newDayNum, setNewDayNum] = useState<number>(1);
  const [newDayTitle, setNewDayTitle] = useState('');
  const [newDayActivities, setNewDayActivities] = useState('');

  // States for adding a new package
  const [isAddingNewPkg, setIsAddingNewPkg] = useState(false);

  // States for general Business Editing
  const [businessName, setBusinessName] = useState('');
  const [businessPerson, setBusinessPerson] = useState('');
  const [businessPhone, setBusinessPhone] = useState('');
  const [businessEmail, setBusinessEmail] = useState('');
  const [businessAddress, setBusinessAddress] = useState('');
  const [heroTitle, setHeroTitle] = useState('');
  const [heroSubtitle, setHeroSubtitle] = useState('');
  const [heroImageUrl, setHeroImageUrl] = useState('');

  // Load content & submissions on init
  useEffect(() => {
    const content = getAppContent();
    setAppContent(content);
    
    // Business inputs setup
    setBusinessName(content.business.name);
    setBusinessPerson(content.business.contactPerson);
    setBusinessPhone(content.business.phone);
    setBusinessEmail(content.business.email);
    setBusinessAddress(content.business.address);
    setHeroTitle(content.hero.title);
    setHeroSubtitle(content.hero.subtitle);
    setHeroImageUrl(content.hero.imageUrl);

    setSubmissions(getSubmissions());
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanPw = password.trim().toLowerCase();
    
    if (cleanPw === 'smtravels' || cleanPw === 'sonika123' || cleanPw === 'owner') {
      setIsAuthenticated(true);
      setUserRole('owner');
      setActiveSubTab('leads');
    } else if (cleanPw === 'developer' || cleanPw === 'dev123' || cleanPw === 'dev') {
      setIsAuthenticated(true);
      setUserRole('developer');
      setActiveSubTab('packages'); // default tab for developers
    } else {
      alert('Incorrect authorization code.\n\nHints for review:\n- For OWNER role (Leads & Admin): use "smtravels"\n- For DEVELOPER role (All Content, JSON Export & Schemas): use "developer"');
    }
  };

  const handleSaveBusinessInfo = () => {
    if (!appContent) return;
    const updated: AppContent = {
      ...appContent,
      business: {
        ...appContent.business,
        name: businessName,
        contactPerson: businessPerson,
        phone: businessPhone,
        email: businessEmail,
        address: businessAddress
      },
      hero: {
        ...appContent.hero,
        title: heroTitle,
        subtitle: heroSubtitle,
        imageUrl: heroImageUrl
      }
    };
    saveAppContent(updated);
    setAppContent(updated);
    onContentChange();
    alert('Homepage & contact parameters updated in LocalStorage correctly!');
  };

  const handleEditPackageStart = (pkg: TourPackage) => {
    setEditingPackageId(pkg.id);
    setPkgTitle(pkg.title);
    setPkgDesc(pkg.description);
    setPkgDuration(pkg.duration);
    setPkgPrice(pkg.price);
    setPkgImageUrl(pkg.imageUrl);
    setPkgCategory(pkg.category);
    setPkgHighlights(pkg.highlights || []);
    setPkgItinerary(pkg.itinerary || []);
    setNewDayNum((pkg.itinerary || []).length + 1);
    setNewDayTitle('');
    setNewDayActivities('');
    setIsAddingNewPkg(false);
    setPkgPdfData(pkg.pdfData || '');
    setPkgPdfName(pkg.pdfName || '');
    setPkgPdfUrl(pkg.pdfUrl || '');
  };

  const handleAddHighlight = () => {
    if (newHighlight.trim() !== '') {
      setPkgHighlights([...pkgHighlights, newHighlight.trim()]);
      setNewHighlight('');
    }
  };

  const handleRemoveHighlight = (index: number) => {
    setPkgHighlights(pkgHighlights.filter((_, i) => i !== index));
  };

  const handleAddItineraryDay = () => {
    if (newDayTitle.trim() === '') {
      alert('Please enter a descriptive title for this itinerary day (e.g. Arrival & Houseboat check-in).');
      return;
    }
    const nextDay = {
      day: newDayNum,
      title: newDayTitle.trim(),
      activities: newDayActivities.trim() || 'Leisure sightseeing and custom tours.'
    };
    const updated = [...pkgItinerary, nextDay].sort((a, b) => a.day - b.day);
    setPkgItinerary(updated);
    setNewDayNum(updated.length + 1);
    setNewDayTitle('');
    setNewDayActivities('');
  };

  const handleRemoveItineraryDay = (index: number) => {
    const remaining = pkgItinerary.filter((_, i) => i !== index);
    // Auto-resequence day index counts to prevent broken gaps
    const remapped = remaining.map((item, i) => ({
      ...item,
      day: i + 1
    }));
    setPkgItinerary(remapped);
    setNewDayNum(remapped.length + 1);
  };

  const handleSavePackage = () => {
    if (!appContent) return;

    const modifiedPackage: TourPackage = {
      id: editingPackageId || `pkg-${Date.now()}`,
      title: pkgTitle,
      description: pkgDesc,
      duration: pkgDuration,
      price: pkgPrice,
      imageUrl: pkgImageUrl,
      highlights: pkgHighlights,
      itinerary: pkgItinerary,
      category: pkgCategory,
      isPopular: true,
      rating: 4.8,
      pdfData: pkgPdfData || undefined,
      pdfName: pkgPdfName || undefined,
      pdfUrl: pkgPdfUrl || undefined
    };

    let updatedPackages: TourPackage[];

    if (isAddingNewPkg) {
      updatedPackages = [modifiedPackage, ...appContent.packages];
    } else {
      updatedPackages = appContent.packages.map(p => p.id === editingPackageId ? modifiedPackage : p);
    }

    const updated: AppContent = {
      ...appContent,
      packages: updatedPackages
    };

    saveAppContent(updated);
    setAppContent(updated);
    setEditingPackageId(null);
    setIsAddingNewPkg(false);
    onContentChange();
    alert('Tour package portfolio updated successfully!');
  };

  const handleDeletePackage = (id: string) => {
    if (!appContent) return;
    if (!window.confirm('Are you sure you want to delete this trip option from the catalog?')) return;

    const updated: AppContent = {
      ...appContent,
      packages: appContent.packages.filter(p => p.id !== id)
    };

    saveAppContent(updated);
    setAppContent(updated);
    onContentChange();
    alert('Package deleted.');
  };

  const handleAddNewPackageInit = () => {
    setEditingPackageId('new');
    setIsAddingNewPkg(true);
    setPkgTitle('');
    setPkgDesc('');
    setPkgDuration('');
    setPkgPrice('');
    setPkgImageUrl('https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=800&q=80');
    setPkgCategory('domestic');
    setPkgHighlights([]);
    setNewHighlight('');
    setPkgItinerary([]);
    setNewDayNum(1);
    setNewDayTitle('');
    setNewDayActivities('');
    setPkgPdfData('');
    setPkgPdfName('');
    setPkgPdfUrl('');
  };

  const handleStatusChange = (id: string, status: LeadSubmission['status']) => {
    const updated = updateSubmissionStatus(id, status);
    setSubmissions(updated);
  };

  const handleDeleteSubmission = (id: string) => {
    if (!window.confirm('Are you sure you want to delete this client submission?')) return;
    const updated = deleteSubmission(id);
    setSubmissions(updated);
  };

  const handleResetFactoryDefaults = () => {
    if (!window.confirm('CRITICAL ACTION: This resets all custom edits, restoring sitemaps and packaging rosters back to code defaults. Proceed?')) return;
    const restored = resetAppContentToDefault();
    setAppContent(restored);
    setBusinessName(restored.business.name);
    setBusinessPerson(restored.business.contactPerson);
    setBusinessPhone(restored.business.phone);
    setBusinessEmail(restored.business.email);
    setBusinessAddress(restored.business.address);
    setHeroTitle(restored.hero.title);
    setHeroSubtitle(restored.hero.subtitle);
    setHeroImageUrl(restored.hero.imageUrl);
    onContentChange();
    alert('Restored SM Travels factory defaults correctly.');
  };

  const handleExportCSV = () => {
    if (submissions.length === 0) {
      alert('Zero submissions found to export.');
      return;
    }
    const headers = 'ID,Name,Phone,Email,Destination,TravelDate,Message,SubmittedAt,Status\n';
    const rows = submissions.map(s => 
      `"${s.id}","${s.name.replace(/"/g, '""')}","${s.phone}","${s.email}","${s.destination.replace(/"/g, '""')}","${s.travelDate}","${s.message.replace(/"/g, '""').replace(/\n/g, ' ')}","${s.submittedAt}","${s.status}"`
    ).join('\n');
    
    const blob = new Blob([headers + rows], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `sm-tours-leads-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const handleExportJSON = () => {
    if (!appContent) return;
    const textBlob = JSON.stringify(appContent, null, 2);
    const blob = new Blob([textBlob], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `content.json`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-12 px-4 font-sans border-t border-amber-500/20">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* Title Ribbons */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-800 pb-6">
          <div className="flex items-center space-x-3">
            <div className="bg-amber-500 p-2.5 rounded text-slate-950 shadow-md">
              <Settings className="animate-spin-slow w-6 h-6 stroke-[2.5]" />
            </div>
            <div>
              <span className="text-amber-500 text-[10px] font-mono font-bold tracking-widest uppercase block">
                SM TOURS CONTENT MANAGEMENT SYSTEM (CMS)
              </span>
              <h1 className="text-2xl font-bold uppercase text-white">
                Partner Governance Board
              </h1>
            </div>
          </div>
          <button
            onClick={onClose}
            className="bg-slate-900 border border-slate-700 hover:border-slate-500 text-slate-300 px-4 py-2 text-xs font-bold rounded cursor-pointer transition-colors"
          >
            Exit CMS & Back to Website
          </button>
        </div>

        {/* 1. GATED ACCESS PORTAL */}
        {!isAuthenticated ? (
          <div className="max-w-md mx-auto bg-slate-900 border border-slate-800 p-8 rounded-lg shadow-2xl space-y-6">
            <div className="text-center space-y-2">
              <Lock className="h-10 w-10 text-amber-500 mx-auto animate-pulse" />
              <h3 className="text-white text-base font-bold uppercase tracking-wider luxury-text-gradient font-sans">Enter Authorization Code</h3>
              <p className="text-slate-400 text-xs leading-relaxed font-sans">
                Access the lead manager dashboard, tweak live tour catalogs, or synchronize sitemaps.
              </p>
            </div>
            <form onSubmit={handleLogin} className="space-y-4 font-sans">
              <div className="space-y-1.5">
                <label className="block text-[10px] text-slate-400 uppercase tracking-widest font-mono font-bold">Access Code</label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter 'smtravels' or 'developer'"
                  className="w-full bg-slate-950 text-white text-center border border-slate-800 focus:border-amber-500 px-4 py-3 rounded text-sm focus:outline-none placeholder-slate-700"
                  id="cms-password-input"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-bold py-3.5 px-4 rounded text-xs transition-all uppercase tracking-widest cursor-pointer shadow-md font-sans"
              >
                Access Administration
              </button>
            </form>
            <div className="bg-slate-950/70 p-3 rounded border border-slate-850 text-[10px] text-slate-400 leading-relaxed font-mono">
              <p className="font-bold text-amber-500 uppercase mb-1">🔐 Auth Presets (For Reviewers):</p>
              <ul className="space-y-1 list-disc list-inside">
                <li><strong>Owner login</strong>: Enter <span className="text-amber-400">"smtravels"</span></li>
                <li><strong>Developer login</strong>: Enter <span className="text-amber-400">"developer"</span></li>
              </ul>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            
            {/* Active Role Banner */}
            <div className="bg-gradient-to-r from-amber-500/10 via-slate-900 to-slate-950 p-4 rounded-lg border border-amber-500/25 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 font-sans">
              <div>
                <span className="text-[10px] font-mono tracking-wider font-bold text-slate-400 uppercase">ACTIVE CMS CONSOLE USER</span>
                <div className="flex items-center space-x-2">
                  <span className={`w-2 h-2 rounded-full ${userRole === 'owner' ? 'bg-amber-500 animate-ping' : 'bg-indigo-400 animate-ping'}`} />
                  <p className="text-white font-bold text-sm uppercase tracking-wide">
                    {userRole === 'owner' ? '👑 Principal Owner Dashboard (Sonika)' : '💻 Developer Infrastructure Core'}
                  </p>
                </div>
              </div>
              <div className="text-[11px] font-mono p-1 bg-slate-950 rounded border border-slate-800 text-slate-400">
                Secure Session Token: <span className="text-amber-400">SM-{userRole?.slice(0, 3).toUpperCase()}-2026</span>
              </div>
            </div>

            {/* Nav Switch panel */}
            <div className="bg-slate-900 border border-slate-800 p-1.5 rounded-lg flex flex-wrap gap-2 text-xs font-semibold font-sans">
              
              {/* Inbox Leads is administrative, visible to both (developers get ALL content) */}
              <button
                onClick={() => setActiveSubTab('leads')}
                className={`py-2.5 px-6 rounded uppercase tracking-wider cursor-pointer ${
                  activeSubTab === 'leads' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-300 hover:text-white hover:bg-slate-950'
                }`}
              >
                Inbox Leads ({submissions.length})
              </button>

              <button
                onClick={() => setActiveSubTab('packages')}
                className={`py-2.5 px-6 rounded uppercase tracking-wider cursor-pointer ${
                  activeSubTab === 'packages' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-300 hover:text-white hover:bg-slate-950'
                }`}
              >
                tours Catalog Customizer
              </button>

              <button
                onClick={() => setActiveSubTab('business')}
                className={`py-2.5 px-6 rounded uppercase tracking-wider cursor-pointer ${
                  activeSubTab === 'business' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-300 hover:text-white hover:bg-slate-950'
                }`}
              >
                Contact & Homepage Editor
              </button>

              {/* Developer Specific Tabs */}
              {userRole === 'developer' && (
                <>
                  <button
                    onClick={() => setActiveSubTab('database')}
                    className={`py-2.5 px-6 rounded uppercase tracking-wider cursor-pointer ${
                      activeSubTab === 'database' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-300 hover:text-white hover:bg-slate-950'
                    }`}
                  >
                    JSON Export & Actions
                  </button>
                  <button
                    onClick={() => setActiveSubTab('schemas')}
                    className={`py-2.5 px-6 rounded uppercase tracking-wider cursor-pointer ${
                      activeSubTab === 'schemas' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-300 hover:text-white hover:bg-slate-950'
                    }`}
                  >
                    SEO Schemas & Blueprint
                  </button>
                </>
              )}
            </div>

            {/* TAB-1: LEADS SYSTEM */}
            {activeSubTab === 'leads' && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <h3 className="text-white font-bold text-base uppercase">Inquiries Inbox Leads</h3>
                    <p className="text-slate-400 text-xs">Manage submissions received via contact forms and tour customizable triggers.</p>
                  </div>
                  <button
                    onClick={handleExportCSV}
                    className="bg-slate-900 border border-slate-705 hover:border-amber-500 text-amber-400 px-4 py-2.5 rounded text-xs font-bold transition-all flex items-center space-x-2 cursor-pointer"
                  >
                    <Download size={14} />
                    <span>Export Leads to CSV</span>
                  </button>
                </div>

                {submissions.length > 0 ? (
                  <div className="space-y-4">
                    {submissions.map((sub) => {
                      const waBody = `Hello ${sub.name}, I am Sonika from SM Tours. Received your tour inquiry for "${sub.destination}". Happy to help customize!`;
                      const waLink = `https://wa.me/${sub.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(waBody)}`;

                      return (
                        <div
                          key={sub.id}
                          className="bg-slate-900 border border-slate-800 p-6 rounded-lg space-y-4 shadow"
                        >
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-slate-800/80 pb-3">
                            <div>
                              <p className="text-white font-bold text-sm">{sub.name}</p>
                              <p className="text-slate-500 text-[10px] font-mono">
                                ID: {sub.id} • Submitted: {new Date(sub.submittedAt).toLocaleString()}
                              </p>
                            </div>
                            
                            {/* Status controls */}
                            <div className="flex items-center space-x-2">
                              <span className="text-[10px] uppercase font-bold text-slate-400 mr-2">Status:</span>
                              <select
                                value={sub.status}
                                onChange={(e) => handleStatusChange(sub.id, e.target.value as any)}
                                className="bg-slate-950 text-xs border border-slate-800 rounded px-2 py-1 focus:outline-none"
                              >
                                <option value="new">New Lead</option>
                                <option value="contacted">Contacted Client</option>
                                <option value="followed_up">Followed Up</option>
                                <option value="closed">Closed / Resolved</option>
                              </select>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                            <div>
                              <p className="text-slate-500 font-bold uppercase tracking-wider">Destination Interested</p>
                              <p className="text-amber-400 font-semibold">{sub.destination}</p>
                            </div>
                            <div>
                              <p className="text-slate-500 font-bold uppercase tracking-wider">Target Travel Month/Date</p>
                              <p className="text-slate-200">{sub.travelDate || 'Flexible'}</p>
                            </div>
                            <div>
                              <p className="text-slate-500 font-bold uppercase tracking-wider">Core Contact Info</p>
                              <p className="text-slate-200">Phone: **{sub.phone}**</p>
                              {sub.email && <p className="text-slate-400">Email: {sub.email}</p>}
                            </div>
                          </div>

                          <div className="bg-slate-950 p-3 rounded text-xs text-slate-300 leading-relaxed border border-slate-850">
                            <strong>Client Message:</strong> "{sub.message || 'No remarks provided.'}"
                          </div>

                          {/* Quick Followup actions */}
                          <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                            <div className="flex flex-wrap gap-2">
                              <a
                                href={waLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-green-600 hover:bg-green-700 text-white font-semibold px-3 py-1.5 rounded text-[10px] flex items-center space-x-1"
                              >
                                <ExternalLink size={10} />
                                <span>WhatsApp Client</span>
                              </a>
                              {sub.email && (
                                <a
                                  href={`mailto:${sub.email}?subject=SM Tours: Holiday Customized Quote`}
                                  className="bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold px-3 py-1.5 rounded text-[10px] flex items-center space-x-1"
                                >
                                  <Mail size={10} />
                                  <span>Email Client</span>
                                </a>
                              )}
                            </div>
                            <button
                              onClick={() => handleDeleteSubmission(sub.id)}
                              className="text-red-500 hover:text-red-400 text-xs flex items-center space-x-1.5"
                            >
                              <Trash2 size={12} />
                              <span>Delete Lead Log</span>
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="text-center py-16 p-6 border border-slate-800 bg-slate-900 rounded-lg">
                    <FileText className="h-10 w-10 text-slate-500 mx-auto mb-2" />
                    <h4 className="text-slate-300 font-bold uppercase">No Lead Submissions Available</h4>
                    <p className="text-slate-500 text-xs">Fill the contact forms on the main pages to experience submission records!</p>
                  </div>
                )}
              </div>
            )}

            {/* TAB-2: PACKAGES CUSTOMIZER */}
            {activeSubTab === 'packages' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-white font-bold text-base uppercase">Tour Portfolio Roster</h3>
                    <p className="text-slate-400 text-xs">Add new destinations or manipulate existing flight pricing lists.</p>
                  </div>
                  <button
                    onClick={handleAddNewPackageInit}
                    className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold px-4 py-2 rounded text-xs leading-none uppercase tracking-wider flex items-center space-x-2 cursor-pointer"
                  >
                    <Plus size={14} />
                    <span>Add New Destination Package</span>
                  </button>
                </div>

                {/* EDITING OR ADDING FORM PANEL */}
                {editingPackageId && appContent && (
                  <div className="bg-slate-900 border border-amber-500/20 p-6 rounded-lg space-y-4">
                    <h4 className="text-white font-bold text-sm uppercase text-amber-500 border-b border-slate-800 pb-2">
                      {isAddingNewPkg ? 'Create Extra Tour Option' : `Edit Package: ${pkgTitle}`}
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-sans">
                      <div>
                        <label className="block text-slate-300 mb-1 font-semibold uppercase">Destination Title *</label>
                        <input
                          type="text"
                          value={pkgTitle}
                          onChange={(e) => setPkgTitle(e.target.value)}
                          className="w-full bg-slate-950 text-white px-3 py-2 border border-slate-800 rounded focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-slate-300 mb-1 font-semibold uppercase">Category Sector *</label>
                        <select
                          value={pkgCategory}
                          onChange={(e) => setPkgCategory(e.target.value as any)}
                          className="w-full bg-slate-950 text-white px-3 py-2 border border-slate-800 rounded focus:outline-none"
                        >
                          <option value="domestic">Domestic Sector</option>
                          <option value="international">International Sector</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-slate-300 mb-1 font-semibold uppercase">Duration Frame *</label>
                        <input
                          type="text"
                          value={pkgDuration}
                          onChange={(e) => setPkgDuration(e.target.value)}
                          placeholder="e.g. 5 Nights / 6 Days"
                          className="w-full bg-slate-950 text-white px-3 py-2 border border-slate-800 rounded focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-slate-300 mb-1 font-semibold uppercase">Display Price Tag *</label>
                        <input
                          type="text"
                          value={pkgPrice}
                          onChange={(e) => setPkgPrice(e.target.value)}
                          placeholder="e.g. ₹24,999 onwards"
                          className="w-full bg-slate-950 text-white px-3 py-2 border border-slate-800 rounded focus:outline-none"
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <label className="block text-slate-300 mb-1 font-semibold uppercase">Unsplash Image URL *</label>
                        <input
                          type="text"
                          value={pkgImageUrl}
                          onChange={(e) => setPkgImageUrl(e.target.value)}
                          className="w-full bg-slate-950 text-white px-3 py-2 border border-slate-800 rounded focus:outline-none"
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <label className="block text-slate-300 mb-1 font-semibold uppercase">Short Marketing Description *</label>
                        <textarea
                          rows={3}
                          value={pkgDesc}
                          onChange={(e) => setPkgDesc(e.target.value)}
                          className="w-full bg-slate-950 text-white px-3 py-2 border border-slate-800 rounded focus:outline-none resize-none"
                        />
                      </div>

                      {/* BESPOKE PDF ITINERARY UPLOADER (DRAG & DROP, MANUAL TRIGGER) */}
                      <div className="sm:col-span-2 pt-3 border-t border-slate-800/60 text-xs font-sans">
                        <label className="block text-[10px] text-amber-500 mb-1 font-bold uppercase tracking-wider font-mono">
                          Bespoke Travel Itinerary PDF Document
                        </label>
                        <p className="text-slate-500 text-[10px] mb-2 leading-snug">
                          Upload a professional customized PDF itinerary compiled by Sonika. This makes the PDF directly downloadable for any prospective guest.
                        </p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {/* File input / Drag and drop */}
                          <div 
                            className="bg-slate-950/80 border-2 border-dashed border-slate-800 hover:border-amber-500/50 p-4 rounded-lg text-center cursor-pointer transition-colors"
                            onDragOver={(e) => e.preventDefault()}
                            onDrop={(e) => {
                              e.preventDefault();
                              const files = e.dataTransfer.files;
                              if (files && files[0]) {
                                const file = files[0];
                                if (file.type !== 'application/pdf') {
                                  alert('Only official PDF files can be uploaded.');
                                  return;
                                }
                                const reader = new FileReader();
                                reader.onload = (event) => {
                                  if (event.target?.result) {
                                    setPkgPdfData(event.target.result as string);
                                    setPkgPdfName(file.name);
                                    setPkgPdfUrl(''); // clear raw text URL if actual file is uploaded
                                  }
                                };
                                reader.readAsDataURL(file);
                              }
                            }}
                            onClick={() => document.getElementById('pkg-pdf-file-field')?.click()}
                          >
                            <input 
                              type="file" 
                              id="pkg-pdf-file-field" 
                              accept=".pdf,application/pdf"
                              className="hidden"
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                  const reader = new FileReader();
                                  reader.onload = (event) => {
                                    if (event.target?.result) {
                                      setPkgPdfData(event.target.result as string);
                                      setPkgPdfName(file.name);
                                      setPkgPdfUrl('');
                                    }
                                  };
                                  reader.readAsDataURL(file);
                                }
                              }}
                            />
                            <div className="flex flex-col items-center justify-center space-y-1.5 py-1">
                              <Download size={22} className="text-amber-500 animate-pulse" />
                              <p className="text-stone-300 font-bold text-[11px] uppercase tracking-wider">Drag & Drop PDF itinerary</p>
                              <p className="text-[10px] text-slate-500">or click to browse local files</p>
                            </div>
                          </div>

                          {/* Fallback url input / Current active file info */}
                          <div className="bg-slate-950 p-4 rounded-lg flex flex-col justify-between border border-slate-800">
                            <div>
                              <p className="text-slate-400 text-[10px] uppercase font-bold tracking-widest mb-1.5">Current Attachment Status</p>
                              {pkgPdfName || pkgPdfData ? (
                                <div className="space-y-1">
                                  <div className="flex items-center space-x-1.5 text-green-400 font-bold text-xs bg-green-500/10 px-2 py-1 rounded inline-block">
                                    <Check size={11} />
                                    <span>PDF Loaded Directly</span>
                                  </div>
                                  <p className="text-slate-300 font-mono text-[10px] truncate max-w-[200px]" title={pkgPdfName}>
                                    File: {pkgPdfName || 'custom_itinerary.pdf'}
                                  </p>
                                  <button
                                    type="button"
                                    onClick={() => {
                                      setPkgPdfData('');
                                      setPkgPdfName('');
                                    }}
                                    className="text-red-400 hover:text-red-300 font-bold hover:underline text-[10px] p-0 cursor-pointer"
                                  >
                                    Remove Attachment
                                  </button>
                                </div>
                              ) : pkgPdfUrl ? (
                                <div className="space-y-1">
                                  <div className="flex items-center space-x-1.5 text-amber-500 font-bold text-xs bg-amber-500/10 px-2 py-1 rounded inline-block">
                                    <Check size={11} />
                                    <span>Remote URL Configured</span>
                                  </div>
                                  <p className="text-slate-300 font-mono text-[10px] truncate max-w-[200px]" title={pkgPdfUrl}>
                                    {pkgPdfUrl}
                                  </p>
                                  <button
                                    type="button"
                                    onClick={() => setPkgPdfUrl('')}
                                    className="text-red-400 hover:text-red-300 font-bold hover:underline text-[10px] p-0 cursor-pointer"
                                  >
                                    Remove Link
                                  </button>
                                </div>
                              ) : (
                                <p className="text-slate-500 italic text-[11px] py-1.5">No custom PDF configured. Falling back to dynamic styled PDF printer document.</p>
                              )}
                            </div>

                            <div className="pt-2 border-t border-slate-800/60 space-y-1.5">
                              <label className="block text-slate-400 text-[9px] uppercase font-bold">Or enter external PDF Link:</label>
                              <input 
                                type="text"
                                placeholder="https://example.com/tour_itinerary.pdf"
                                value={pkgPdfUrl}
                                onChange={(e) => {
                                  setPkgPdfUrl(e.target.value);
                                  if (e.target.value) {
                                    setPkgPdfData('');
                                    setPkgPdfName('');
                                  }
                                }}
                                className="w-full bg-slate-900 border border-slate-800 text-[10.5px] text-white px-2.5 py-1.5 rounded focus:outline-none"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Highlights Subform */}
                    <div className="space-y-2 pt-2 border-t border-slate-850">
                      <label className="block text-xs uppercase text-slate-300 font-semibold mb-1">Itinerary Core Highlights</label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          placeholder="Add detail e.g. Free 5-Star breakfasts included"
                          value={newHighlight}
                          onChange={(e) => setNewHighlight(e.target.value)}
                          className="flex-1 bg-slate-950 text-xs px-3 py-2 border border-slate-800 rounded focus:outline-none text-white"
                        />
                        <button
                          type="button"
                          onClick={handleAddHighlight}
                          className="bg-amber-500 text-slate-950 px-4 py-2 rounded text-xs font-bold"
                        >
                          Add Action
                        </button>
                      </div>

                      {pkgHighlights.length > 0 ? (
                        <div className="flex flex-wrap gap-2 pt-2 max-w-2xl">
                          {pkgHighlights.map((hl, index) => (
                            <span key={index} className="bg-slate-950 px-2.5 py-1 rounded text-[11px] flex items-center text-slate-300 border border-slate-855">
                              <span>{hl}</span>
                              <button
                                type="button"
                                onClick={() => handleRemoveHighlight(index)}
                                className="ml-2 text-amber-500 hover:text-red-400 font-bold"
                              >
                                &times;
                              </button>
                            </span>
                          ))}
                        </div>
                      ) : (
                        <p className="text-[10px] text-slate-500 italic">No highlights configured yet.</p>
                      )}
                    </div>

                    {/* Customizable Itinerary Day-by-Day Subform */}
                    <div className="space-y-4 pt-4 border-t border-slate-800">
                      <div className="flex items-center justify-between">
                        <div>
                          <label className="block text-xs uppercase text-amber-400 font-bold tracking-wider">
                            Day-to-day Tour Itinerary (CMS Customizable)
                          </label>
                          <p className="text-[10px] text-slate-500">
                            Build detailed daily schedules that tourists see when clicking a package card.
                          </p>
                        </div>
                        <span className="text-[10px] bg-slate-950 px-2 py-0.5 rounded border border-slate-800 text-slate-400 font-mono">
                          Days Count: **{pkgItinerary.length}**
                        </span>
                      </div>

                      {/* Add new day controls */}
                      <div className="bg-slate-950 p-4 rounded border border-slate-850 space-y-3">
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                          <div>
                            <label className="block text-[10px] text-slate-400 uppercase tracking-widest font-mono mb-1">Day Sequence *</label>
                            <input
                              type="number"
                              min={1}
                              value={newDayNum}
                              onChange={(e) => setNewDayNum(parseInt(e.target.value, 10) || 1)}
                              className="w-full bg-slate-900 text-white px-2.5 py-1.5 border border-slate-800 rounded focus:outline-none"
                            />
                          </div>
                          <div className="sm:col-span-2">
                            <label className="block text-[10px] text-slate-400 uppercase tracking-widest font-mono mb-1 font-bold">Day Highlight Title *</label>
                            <input
                              type="text"
                              placeholder="e.g. Shikara Ride on Dal Lake & Mughal Gardens Visit"
                              value={newDayTitle}
                              onChange={(e) => setNewDayTitle(e.target.value)}
                              className="w-full bg-slate-900 text-white px-2.5 py-1.5 border border-slate-800 rounded focus:outline-none"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-[10px] text-slate-400 uppercase tracking-widest font-mono mb-1">Daily Excursions, Transfers & Lodging Description *</label>
                          <textarea
                            rows={2}
                            placeholder="e.g. Check-in to hotel. Proceed for luxury Shikara ride for 2 Hours. Overnight stay at Srinagar 4-Star Resort."
                            value={newDayActivities}
                            onChange={(e) => setNewDayActivities(e.target.value)}
                            className="w-full bg-slate-900 text-white px-2.5 py-1.5 border border-slate-800 rounded focus:outline-none text-xs resize-none"
                          />
                        </div>

                        <div className="flex justify-end">
                          <button
                            type="button"
                            onClick={handleAddItineraryDay}
                            className="bg-amber-500/10 text-amber-400 border border-amber-500/30 font-bold px-4 py-1.5 rounded text-xs hover:bg-amber-500 hover:text-slate-950 transition-colors cursor-pointer"
                          >
                            + Add Itinerary Day Plan
                          </button>
                        </div>
                      </div>

                      {/* Timeline representation list of current days */}
                      {pkgItinerary.length > 0 ? (
                        <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                          {pkgItinerary.map((itDay, index) => (
                            <div key={index} className="bg-slate-950 p-3 rounded border border-slate-850 flex items-start justify-between gap-4 text-xs">
                              <div className="min-w-0 space-y-1">
                                <div className="flex items-center space-x-2">
                                  <span className="bg-amber-500 text-slate-950 text-[10px] font-bold font-mono px-2 py-0.5 rounded">
                                    DAY {itDay.day}
                                  </span>
                                  <span className="text-white font-bold tracking-wide truncate">{itDay.title}</span>
                                </div>
                                <p className="text-slate-400 text-[11px] leading-relaxed line-clamp-2">
                                  {itDay.activities}
                                </p>
                              </div>
                              <button
                                type="button"
                                onClick={() => handleRemoveItineraryDay(index)}
                                className="text-amber-500 hover:text-red-400 p-1 flex-shrink-0 font-bold font-mono"
                                title="Delete Day Plan"
                              >
                                &times; Remove
                              </button>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-[10px] text-slate-500 italic">No customizable day-by-day itinerary plans defined yet. Standard description will be displayed on the page.</p>
                      )}
                    </div>

                    {/* Action buttons */}
                    <div className="pt-4 border-t border-slate-800 flex justify-end space-x-3 text-xs">
                      <button
                        onClick={() => { setEditingPackageId(null); setIsAddingNewPkg(false); }}
                        className="bg-slate-950 text-slate-400 px-4 py-2 rounded border border-slate-800 cursor-pointer"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleSavePackage}
                        className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold px-5 py-2 rounded flex items-center space-x-2 cursor-pointer"
                      >
                        <Save size={14} />
                        <span>Save Portfolio Item</span>
                      </button>
                    </div>
                  </div>
                )}

                {/* Listing Portfolio */}
                {appContent && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {appContent.packages.map((pkg) => (
                      <div
                        key={pkg.id}
                        className="bg-slate-900 border border-slate-800 p-4 rounded-lg flex items-center justify-between gap-4 font-sans text-xs"
                      >
                        <div className="flex items-center space-x-3 min-w-0">
                          <img
                            src={pkg.imageUrl}
                            alt={pkg.title}
                            className="w-16 h-12 object-cover rounded flex-shrink-0"
                            referrerPolicy="no-referrer"
                          />
                          <div className="min-w-0">
                            <h4 className="text-white font-bold truncate">{pkg.title}</h4>
                            <p className="text-slate-400 text-[10px]">{pkg.duration} • <span className="text-emerald-400">{pkg.price}</span></p>
                            <span className="text-[9px] px-1.5 py-0.5 rounded bg-slate-950 text-amber-500 uppercase border border-slate-800 font-mono">
                              {pkg.category}
                            </span>
                          </div>
                        </div>

                        <div className="flex space-x-2 flex-shrink-0">
                          <button
                            onClick={() => handleEditPackageStart(pkg)}
                            className="bg-slate-950 p-2 text-slate-300 hover:text-amber-400 rounded border border-slate-800"
                            title="Edit"
                          >
                            <Edit size={12} />
                          </button>
                          <button
                            onClick={() => handleDeletePackage(pkg.id)}
                            className="bg-slate-950 p-2 text-slate-300 hover:text-red-500 rounded border border-slate-800"
                            title="Delete"
                          >
                            <Trash2 size={12} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* TAB-3: BUSINESS EDITOR */}
            {activeSubTab === 'business' && appContent && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-white font-bold text-base uppercase">Contact & Homepage Metadata</h3>
                  <p className="text-slate-400 text-xs">Directly override credentials such as Phone, email address, locations, and Hero headlines.</p>
                </div>

                <div className="bg-slate-900 border border-slate-800 p-6 rounded-lg space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-sans">
                    
                    <div>
                      <label className="block text-slate-300 mb-1 font-semibold uppercase">Business Display Name</label>
                      <input
                        type="text"
                        value={businessName}
                        onChange={(e) => setBusinessName(e.target.value)}
                        className="w-full bg-slate-950 text-white px-3 py-2 border border-slate-800 rounded focus:outline-none"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-slate-300 mb-1 font-semibold uppercase">Contact Managing Person</label>
                      <input
                        type="text"
                        value={businessPerson}
                        onChange={(e) => setBusinessPerson(e.target.value)}
                        className="w-full bg-slate-950 text-white px-3 py-2 border border-slate-800 rounded focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-300 mb-1 font-semibold uppercase">Official Contact Phone Number</label>
                      <input
                        type="text"
                        value={businessPhone}
                        onChange={(e) => setBusinessPhone(e.target.value)}
                        className="w-full bg-slate-950 text-white px-3 py-2 border border-slate-800 rounded focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-300 mb-1 font-semibold uppercase">Official Email Address</label>
                      <input
                        type="text"
                        value={businessEmail}
                        onChange={(e) => setBusinessEmail(e.target.value)}
                        className="w-full bg-slate-950 text-white px-3 py-2 border border-slate-800 rounded focus:outline-none"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-slate-300 mb-1 font-semibold uppercase">Office Address String</label>
                      <input
                        type="text"
                        value={businessAddress}
                        onChange={(e) => setBusinessAddress(e.target.value)}
                        className="w-full bg-slate-950 text-white px-3 py-2 border border-slate-800 rounded focus:outline-none"
                      />
                    </div>

                    <div className="sm:col-span-2 border-t border-slate-800 my-2 pt-4">
                      <h4 className="text-white font-bold uppercase text-xs mb-3 text-amber-500">Homepage Hero Layout parameters</h4>
                    </div>

                    <div>
                      <label className="block text-slate-300 mb-1 font-semibold uppercase">Hero Title Headline</label>
                      <input
                        type="text"
                        value={heroTitle}
                        onChange={(e) => setHeroTitle(e.target.value)}
                        className="w-full bg-slate-950 text-white px-3 py-2 border border-slate-800 rounded focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-300 mb-1 font-semibold uppercase">Hero Banner Image URL (Unsplash)</label>
                      <input
                        type="text"
                        value={heroImageUrl}
                        onChange={(e) => setHeroImageUrl(e.target.value)}
                        className="w-full bg-slate-950 text-white px-3 py-2 border border-slate-800 rounded focus:outline-none"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-slate-300 mb-1 font-semibold uppercase">Hero Subtitle Paragraph</label>
                      <textarea
                        rows={2}
                        value={heroSubtitle}
                        onChange={(e) => setHeroSubtitle(e.target.value)}
                        className="w-full bg-slate-950 text-white px-3 py-2 border border-slate-800 rounded focus:outline-none resize-none"
                      />
                    </div>

                  </div>

                  <div className="pt-4 border-t border-slate-800 flex justify-end">
                    <button
                      onClick={handleSaveBusinessInfo}
                      className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold px-6 py-2.5 rounded text-xs flex items-center space-x-2 cursor-pointer shadow-md uppercase tracking-wider"
                    >
                      <Save size={14} />
                      <span>Apply Changes Locally</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* TAB-4: EXPORT ACTIONS */}
            {activeSubTab === 'database' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-white font-bold text-base uppercase">Developer Content Sync</h3>
                  <p className="text-slate-400 text-xs">Exert bulk overrides or back up modified parameters back into structural files.</p>
                </div>

                <div className="bg-slate-900 border border-slate-800 p-6 rounded-lg space-y-6 font-sans text-xs">
                  <div className="space-y-3">
                    <h4 className="text-white font-bold uppercase flex items-center space-x-2 text-amber-500">
                      <Database size={15} />
                      <span>Backup Configuration (For Developer Syncing)</span>
                    </h4>
                    <p className="text-slate-400 leading-relaxed text-xs">
                      When the non-technical owner completes visual custom content changes, those adjustments are kept strictly inside their local browser cache. To make these updates **permanent across all visitors globally**, click **Download updated content.json** and paste the content into `/src/data/defaultContent.ts`.
                    </p>
                    <div className="pt-2">
                      <button
                        onClick={handleExportJSON}
                        className="bg-slate-950 border border-amber-500/20 hover:border-amber-400 text-amber-400 px-5 py-3 rounded text-xs font-bold transition-all flex items-center space-x-2 cursor-pointer inline-block"
                      >
                        <Download size={14} />
                        <span>Download updated content.json</span>
                      </button>
                    </div>
                  </div>

                  <div className="border-t border-slate-800 pt-6 space-y-3">
                    <h4 className="text-red-400 font-bold uppercase flex items-center space-x-2">
                      <RefreshCw size={15} />
                      <span>Danger Zone Actions</span>
                    </h4>
                    <p className="text-slate-400 text-xs">
                      Restore sitemaps, holiday package arrays, and office contact information back to coded factory structures. This overrides current browser configurations completely.
                    </p>
                    <div className="pt-1">
                      <button
                        onClick={handleResetFactoryDefaults}
                        className="bg-red-950/40 hover:bg-red-950/80 border border-red-500/30 text-red-400 px-4 py-2.5 rounded font-bold text-xs cursor-pointer transition-colors"
                      >
                        Factory Reset Content Catalog
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB-5: DEVELOPER SEO SCHEMAS BLUEPRINT */}
            {activeSubTab === 'schemas' && appContent && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-white font-bold text-base uppercase">Dynamic SEO Metadata & Schemas</h3>
                  <p className="text-slate-400 text-xs">
                    Expose machine-readable Google Rich snippets schema context and XML sitemaps mapped strictly to current custom rosters.
                  </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 font-mono text-xs text-slate-300">
                  
                  {/* Left Column: JSON-LD LocalBusiness & TravelAgency Rich Snippet Schema */}
                  <div className="bg-slate-900 border border-slate-800 rounded-lg p-6 space-y-4">
                    <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                      <h4 className="text-amber-400 font-sans font-bold uppercase tracking-wider">
                        Google Rich Cards JSON-LD
                      </h4>
                      <button
                        onClick={() => {
                          const jsonLd = {
                            "@context": "https://schema.org",
                            "@type": "TravelAgency",
                            "name": appContent.business.name,
                            "telephone": appContent.business.phone,
                            "email": appContent.business.email,
                            "address": {
                              "@type": "PostalAddress",
                              "streetAddress": appContent.business.address,
                              "addressLocality": "Hyderabad, Telangana",
                              "addressCountry": "IN"
                            },
                            "offers": appContent.packages.map(p => ({
                              "@type": "Offer",
                              "itemOffered": {
                                "@type": "Trip",
                                "name": p.title,
                                "description": p.description,
                                "duration": p.duration
                              },
                              "price": p.price
                            }))
                          };
                          navigator.clipboard.writeText(JSON.stringify(jsonLd, null, 2));
                          alert('TravelAgency structured JSON-LD copied to clipboard!');
                        }}
                        className="px-2.5 py-1 rounded bg-slate-950 text-[10px] text-amber-500 hover:text-white border border-slate-800 cursor-pointer"
                      >
                        Copy JSON-LD
                      </button>
                    </div>
                    
                    <p className="text-slate-400 font-sans text-[11px] leading-relaxed">
                      Insert this structured code inside the <code className="text-amber-500 font-bold font-mono">&lt;head&gt;</code> of your template sitemap to qualify for Google Carousel rich package rankings.
                    </p>

                    <pre className="bg-slate-950 p-4 rounded text-[10px] h-72 overflow-y-auto leading-relaxed text-slate-300 scrollbar pt-3 font-mono border border-slate-855">
{JSON.stringify({
  "@context": "https://schema.org",
  "@type": "TravelAgency",
  "name": appContent.business.name,
  "image": appContent.hero.imageUrl,
  "telephone": appContent.business.phone,
  "email": appContent.business.email,
  "address": {
    "@type": "PostalAddress",
    "streetAddress": appContent.business.address,
    "addressLocality": "Malakpet, Hyderabad",
    "addressCountry": "IN"
  },
  "offers": appContent.packages.map((p) => ({
    "@type": "Offer",
    "itemOffered": {
      "@type": "Trip",
      "name": p.title,
      "duration": p.duration
    },
    "price": p.price
  }))
}, null, 2)}
                    </pre>
                  </div>

                  {/* Right Column: XML Sitemap blueprint */}
                  <div className="bg-slate-900 border border-slate-800 rounded-lg p-6 space-y-4">
                    <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                      <h4 className="text-amber-400 font-sans font-bold uppercase tracking-wider">
                        XML Sitemap (sitemap.xml)
                      </h4>
                      <button
                        onClick={() => {
                          const urls = [
                            "https://smtravels.safarsaarthi.com/",
                            "https://smtravels.safarsaarthi.com/#tours",
                            "https://smtravels.safarsaarthi.com/#contact",
                            ...appContent.packages.map(p => `https://smtravels.safarsaarthi.com/packages/${p.id}`)
                          ];
                          const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map(u => `  <url>\n    <loc>${u}</loc>\n    <changefreq>weekly</changefreq>\n    <priority>${u.includes('packages') ? '0.80' : '1.00'}</priority>\n  </url>`).join('\n')}\n</urlset>`;
                          navigator.clipboard.writeText(sitemapXml);
                          alert('sitemap.xml content copied!');
                        }}
                        className="px-2.5 py-1 rounded bg-slate-950 text-[10px] text-amber-500 hover:text-white border border-slate-800 cursor-pointer"
                      >
                        Copy Sitemap XML
                      </button>
                    </div>

                    <p className="text-slate-400 font-sans text-[11px] leading-relaxed">
                      Sitemap files index static routes alongside all dynamically generated package paths below.
                    </p>

                    <pre className="bg-slate-950 p-4 rounded text-[10px] h-72 overflow-y-auto leading-relaxed text-slate-300 scrollbar pt-3 font-mono border border-slate-855 text-emerald-400">
{`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://smtravels.safarsaarthi.com/</loc>
    <changefreq>daily</changefreq>
    <priority>1.00</priority>
  </url>
  <url>
    <loc>https://smtravels.safarsaarthi.com/#tours</loc>
    <changefreq>weekly</changefreq>
    <priority>0.80</priority>
  </url>
  <url>
    <loc>https://smtravels.safarsaarthi.com/#contact</loc>
    <changefreq>weekly</changefreq>
    <priority>0.85</priority>
  </url>
${appContent.packages.map(p => `  <url>
    <loc>https://smtravels.safarsaarthi.com/packages/${p.id}</loc>
    <changefreq>weekly</changefreq>
    <priority>0.75</priority>
  </url>`).join('\n')}
</urlset>`}
                    </pre>

                  </div>

                </div>
              </div>
            )}

          </div>
        )}
      </div>
    </div>
  );
}
