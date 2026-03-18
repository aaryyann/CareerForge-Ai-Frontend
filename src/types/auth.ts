// ============================================================================
// AUTHENTICATION TYPES
// ============================================================================

export type UserRole = "job_seeker" | "recruiter" | "mentor";

// ============================================================================
// USER & PROFILE INTERFACES
// ============================================================================

export interface UserProfile {
  id: string;
  fullName?: string;
  bio?: string;
  rolePreference?: string;
  yearOfExp?: number;
  currentTitle?: string;
  experienceLevel?: string;
  linkedinUrl?: string;
  githubUrl?: string;
  phone?: string;
  claimedLocation?: string;
  workTypePref?: string;
  expertiseAreas?: string[];
  position?: string;
  jobLocation?: string;
  title?: string;
  company?: string;
  yearsOfExp?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface User {
  id: string;
  email: string;
  role: UserRole;
  isEmailVerified: boolean;
  isActive: boolean;
  avatarUrl: string | null;
  profile: UserProfile | null;
  createdAt: string;
  updatedAt: string;
}

// ============================================================================
// AUTHENTICATION CREDENTIALS
// ============================================================================

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  email: string;
  password: string;
  confirmPassword: string;
}

export interface ProfileCompletionData {
  // Common
  fullName: string;
  phone?: string;
  linkedinUrl?: string;

  // Job Seeker
  bio?: string;
  yearOfExp?: number;
  currentTitle?: string;
  experienceLevel?: string;
  rolePreference?: string;
  githubUrl?: string;
  claimedLocation?: string;
  workTypePref?: "remote" | "hybrid" | "onsite";
  salaryExpMin?: string;
  salaryExpMax?: string;
  willingToRelocate?: boolean;

  // Mentor
  title?: string;
  company?: string;
  yearsOfExp?: number;
  expertiseAreas?: string[];
  pricePerSession?: string;

  // Recruiter
  position?: string;
  jobLocation?: string;
}

// ============================================================================
// API RESPONSES
// ============================================================================

export interface AuthResponse {
  isSuccess: boolean;
  message: string;
  data?: any;
  code?: string;
}

export interface JWTPayload {
  userId: string;
  email: string;
  iat: number;
  exp: number;
}

// ============================================================================
// AUTHENTICATION CONTEXT
// ============================================================================

export interface AuthContextType {
  // State
  user: User | null;
  isLoading: boolean;

  // Actions
  signIn: (credentials: LoginCredentials) => Promise<void>;
  signUp: (credentials: RegisterCredentials) => Promise<void>;
  signOut: () => Promise<void>;
  refreshToken: () => Promise<void>;
  completeProfile: (role: UserRole, profileData: ProfileCompletionData) => Promise<void>;
  resendVerification: (email: string) => Promise<void>;

  // Utilities
  hasRole: (role: UserRole) => boolean;
  hasAnyRole: (roles: UserRole[]) => boolean;
  isProfileCompleted: () => boolean;
}

// ============================================================================
// ROUTING UTILITIES
// ============================================================================

export interface RoleBasedRouteConfig {
  allowedRoles: UserRole[];
  redirectTo?: string;
  requireProfile?: boolean;
}
