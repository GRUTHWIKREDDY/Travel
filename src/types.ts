export interface BusinessInfo {
  name: string;
  contactPerson: string;
  phone: string;
  email: string;
  address: string;
  googleMapsEmbedUrl: string;
  whatsappNumber: string;
  defaultWhatsappMessage: string;
}

export interface ItineraryDay {
  day: number;
  title: string;
  activities: string;
}

export interface TourPackage {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  duration: string;
  price: string; // Price is a string placeholder e.g. "₹24,999 onwards"
  highlights: string[];
  category: 'domestic' | 'international';
  isPopular: boolean;
  rating: number;
  itinerary?: ItineraryDay[];
  pdfUrl?: string;
  pdfName?: string;
  pdfData?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  rating: number;
  comment: string;
  avatarUrl: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
}

export interface HeroContent {
  title: string;
  subtitle: string;
  imageUrl: string;
}

export interface CompanyProfile {
  history: string;
  mission: string;
  vision: string;
  commitment: string;
}

export interface LeadSubmission {
  id: string;
  name: string;
  phone: string;
  email: string;
  destination: string;
  travelDate: string;
  message: string;
  submittedAt: string;
  status: 'new' | 'contacted' | 'followed_up' | 'closed';
}

export interface AppContent {
  business: BusinessInfo;
  hero: HeroContent;
  profile: CompanyProfile;
  packages: TourPackage[];
  testimonials: Testimonial[];
  faqs: FAQ[];
}
