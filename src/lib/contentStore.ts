import { AppContent, LeadSubmission, TourPackage, Testimonial, FAQ } from '../types';
import { defaultContent } from '../data/defaultContent';

const CONTENT_KEY = 'sm_tours_content_v1';
const SUBMISSIONS_KEY = 'sm_tours_submissions_v1';

// Initial load helper
export function getAppContent(): AppContent {
  try {
    const saved = localStorage.getItem(CONTENT_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      // Ensure structures are complete
      return {
        ...defaultContent,
        ...parsed,
        business: { ...defaultContent.business, ...parsed.business },
        hero: { ...defaultContent.hero, ...parsed.hero },
        profile: { ...defaultContent.profile, ...parsed.profile },
        packages: parsed.packages || defaultContent.packages,
        testimonials: parsed.testimonials || defaultContent.testimonials,
        faqs: parsed.faqs || defaultContent.faqs,
      };
    }
  } catch (error) {
    console.error('Error reading content from localStorage:', error);
  }
  
  // Save default to local storage on first run
  saveAppContent(defaultContent);
  return defaultContent;
}

export function saveAppContent(content: AppContent): void {
  try {
    localStorage.setItem(CONTENT_KEY, JSON.stringify(content));
  } catch (error) {
    console.error('Error saving content to localStorage:', error);
  }
}

export function resetAppContentToDefault(): AppContent {
  saveAppContent(defaultContent);
  return defaultContent;
}

// Submissions helpers
export function getSubmissions(): LeadSubmission[] {
  try {
    const saved = localStorage.getItem(SUBMISSIONS_KEY);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (error) {
    console.error('Error reading submissions from localStorage:', error);
  }
  return [];
}

export function saveSubmissions(submissions: LeadSubmission[]): void {
  try {
    localStorage.setItem(SUBMISSIONS_KEY, JSON.stringify(submissions));
  } catch (error) {
    console.error('Error saving submissions to localStorage:', error);
  }
}

export function addSubmission(submission: Omit<LeadSubmission, 'id' | 'submittedAt' | 'status'>): LeadSubmission {
  const submissions = getSubmissions();
  
  const newSubmission: LeadSubmission = {
    ...submission,
    id: `lead-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    submittedAt: new Date().toISOString(),
    status: 'new'
  };
  
  submissions.unshift(newSubmission); // Add to beginning
  saveSubmissions(submissions);
  return newSubmission;
}

export function updateSubmissionStatus(id: string, status: LeadSubmission['status']): LeadSubmission[] {
  const submissions = getSubmissions();
  const updated = submissions.map(sub => {
    if (sub.id === id) {
      return { ...sub, status };
    }
    return sub;
  });
  saveSubmissions(updated);
  return updated;
}

export function deleteSubmission(id: string): LeadSubmission[] {
  const submissions = getSubmissions();
  const filtered = submissions.filter(sub => sub.id !== id);
  saveSubmissions(filtered);
  return filtered;
}
