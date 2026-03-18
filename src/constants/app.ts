// ============================================================================
// APP CONSTANTS
// ============================================================================

export const APP_NAME = 'CareerForge AI';

export const STORAGE_KEYS = {
  THEME: 'careerforge-ui-theme',
  AUTH_TOKEN: 'careerforge-auth-token',
} as const;

export const API_ENDPOINTS = {
  AUTH: {
    SIGN_IN: '/api/v1/auth/signin',
    SIGN_UP: '/api/v1/auth/signup',
    SIGN_OUT: '/api/v1/auth/signout',
    ME: '/api/v1/auth/me',
    REFRESH: '/api/auth/refresh',
  },
  PROFILE: {
    JOBSEEKER: '/api/v1/auth/job-seeker/profile',
    RECRUITER: '/api/v1/auth/recruiter/profile',
    MENTOR: '/api/v1/auth/mentor/profile',
  },
} as const;

export const USER_ROLES = {
  JOBSEEKER: 'jobseeker',
  RECRUITER: 'recruiter',
  MENTOR: 'mentor',
} as const;

export const EXPERIENCE_OPTIONS = [
  '0-1 years',
  '1-3 years',
  '3-5 years',
  '5-10 years',
  '10+ years',
] as const;

export const EXPERTISE_AREAS = [
  'Software Engineering',
  'Product Management',
  'UI/UX Design',
  'Data Science',
  'Marketing',
  'Sales',
  'Finance',
  'HR & Recruiting',
  'Entrepreneurship',
  'Leadership',
] as const;

export const COMPANY_SIZES = [
  '1-10 employees',
  '11-50 employees',
  '51-200 employees',
  '201-500 employees',
  '501-1000 employees',
  '1000+ employees',
] as const;

export const INDUSTRIES = [
  'Technology',
  'Finance',
  'Healthcare',
  'Education',
  'Retail',
  'Manufacturing',
  'Consulting',
  'Media & Entertainment',
  'Real Estate',
  'Other',
] as const;
