// ============================================================================
// ROUTE CONSTANTS
// ============================================================================

import type { UserRole } from '@/types/auth';

export const ROUTES = {
  // Public routes
  HOME: '/',
  SIGN_IN: '/signin',
  SIGN_UP: '/signup',
  CHOOSE_ROLE: '/choose-role',
  REDIRECT: '/redirect',

  // Registration routes
  REGISTER: {
    JOBSEEKER: '/register/jobseeker',
    MENTOR: '/register/mentor',
    RECRUITER: '/register/recruiter',
  },

  // Job Seeker routes
  JOBSEEKER: {
    DASHBOARD: '/dashboard',
    UPLOAD_RESUME: '/upload-resume',
    MENTOR_MATCH: '/mentor-match',
    ROLE_SUGGEST: '/role-suggest',
    ROADMAP: '/roadmap',
  },

  // Recruiter routes
  RECRUITER: {
    DASHBOARD: '/recruiter-dashboard',
    JOB_POSTINGS: '/job-postings',
    CANDIDATE_SEARCH: '/candidate-search',
    APPLICATIONS: '/applications',
    ANALYTICS: '/analytics',
  },

  // Mentor routes
  MENTOR: {
    DASHBOARD: '/mentor-dashboard',
    MENTEE_MATCHES: '/mentee-matches',
    SESSIONS: '/sessions',
  },

  // Shared routes
  SHARED: {
    VOICE_INPUT: '/voice-input',
    AI_CHAT: '/ai-chat',
    MODEL_BENCHMARKS: '/model-benchmarks',
  },
} as const;

// Dashboard routes by role
export const DASHBOARD_ROUTES: Record<UserRole, string> = {
  job_seeker: ROUTES.JOBSEEKER.DASHBOARD,
  recruiter: ROUTES.RECRUITER.DASHBOARD,
  mentor: ROUTES.MENTOR.DASHBOARD,
};
