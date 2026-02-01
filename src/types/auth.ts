// ============================================================================
// AUTHENTICATION TYPES
// ============================================================================

export type UserRole = "jobseeker" | "recruiter" | "mentor";

// ============================================================================
// USER & PROFILE INTERFACES
// ============================================================================

export interface UserProfile {
  id: string;
  fullName?: string;
  bio?: string;
  profilePicture?: string;
  expertise?: string[];
  companyName?: string;
  yearOfExperience?: string;
  preferredRoles?: string[];
  yearOfMentoring?: string;
  availability?: string;
  jobTitle?: string;
  companySize?: string;
  industry?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface User {
  id: string;
  email: string;
  role: UserRole;
  isProfileCompleted: boolean;
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
  role?: UserRole;
}

export interface ProfileCompletionData {
  fullName?: string;
  bio?: string;
  preferredRoles?: string[];
  yearOfExperience?: string;
  companyName?: string;
  jobTitle?: string;
  companySize?: string;
  industry?: string;
  expertise?: string;
  yearOfMentoring?: string;
}

// ============================================================================
// API RESPONSES
// ============================================================================

export interface AuthResponse {
  user: User;
  token: string;
  refreshToken: string;
}

export interface JWTPayload {
  userId: string;
  email: string;
  role: UserRole;
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

export interface DashboardRoutes {
  jobseeker: string;
  recruiter: string;
  mentor: string;
}

export const DASHBOARD_ROUTES: DashboardRoutes = {
  jobseeker: "/dashboard",
  recruiter: "/recruiter-dashboard", 
  mentor: "/mentor-dashboard"
} as const;