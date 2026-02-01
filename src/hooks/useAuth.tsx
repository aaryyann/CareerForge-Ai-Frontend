import {
  useContext,
  useState,
  useEffect,
  ReactNode,
  useCallback,
} from "react";
import { AuthContext } from "@/contexts/AuthContext";
import type { 
  User, 
  UserRole,
  LoginCredentials, 
  RegisterCredentials,
  ProfileCompletionData,
  AuthContextType
} from "@/types/auth";

// ============================================================================
// AUTHENTICATION PROVIDER
// ============================================================================

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // ============================================================================
  // UTILITY FUNCTIONS
  // ============================================================================

  const hasRole = useCallback((role: UserRole): boolean => {
    return user?.role === role;
  }, [user?.role]);

  const hasAnyRole = useCallback((roles: UserRole[]): boolean => {
    return user ? roles.includes(user.role) : false;
  }, [user]);

  const isProfileCompleted = useCallback((): boolean => {
    if (!user) return false;
    
    // Check multiple indicators of profile completion
    const hasProfileData = user.profile !== null && user.profile !== undefined;
    const hasProfileCompletedFlag = user.isProfileCompleted === true;
    const hasRole = user.role && user.role.length > 0;
    
    const completed = hasProfileCompletedFlag || (hasProfileData && hasRole);
    
    console.log('isProfileCompleted check:', { 
      user, 
      hasProfileData, 
      hasProfileCompletedFlag, 
      hasRole, 
      completed 
    });
    
    return completed;
  }, [user]);

  // ============================================================================
  // API CALLS
  // ============================================================================

  const makeAuthenticatedRequest = async (url: string, options: RequestInit = {}) => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}${url}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      credentials: 'include',
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Request failed' }));
      throw new Error(error.message || 'Request failed');
    }

    return response.json();
  };

  // ============================================================================
  // AUTHENTICATION METHODS
  // ============================================================================

  const checkAuth = useCallback(async (): Promise<void> => {
    try {
      const userData = await makeAuthenticatedRequest('/api/v1/auth/me');
      setUser(userData.data);
    } catch (error) {
      console.error('Auth check failed:', error);
      // Try to refresh token
      try {
        const userData = await makeAuthenticatedRequest('/api/auth/refresh', {
          method: 'POST',
        });
        setUser(userData.data);
      } catch (refreshError) {
        console.error('Token refresh failed:', refreshError);
        setUser(null);
      }
    }
  }, []);

  const signIn = async (credentials: LoginCredentials): Promise<void> => {
    try {
      // First, sign in to get authentication token
      await makeAuthenticatedRequest('/api/v1/auth/signin', {
        method: 'POST',
        body: JSON.stringify(credentials),
      });
      
      console.log('Sign in successful, now fetching complete user data...');
      
      // Then fetch complete user data from /me endpoint
      const userData = await makeAuthenticatedRequest('/api/v1/auth/me');
      console.log('Complete user data fetched:', userData);
      setUser(userData?.data);
    } catch (error) {
      console.error('Sign in failed:', error);
      throw error;
    }
  };

  const signUp = async (credentials: RegisterCredentials): Promise<void> => {
    try {
      // First, sign up to get authentication token
      await makeAuthenticatedRequest('/api/v1/auth/signup', {
        method: 'POST',
        body: JSON.stringify(credentials),
      });
      
      console.log('Sign up successful, now fetching complete user data...');
      
      // Then fetch complete user data from /me endpoint
      const userData = await makeAuthenticatedRequest('/api/v1/auth/me');
      console.log('Complete user data fetched:', userData);
      setUser(userData?.data);
    } catch (error) {
      console.error('Sign up failed:', error);
      throw error;
    }
  };

  const signOut = async (): Promise<void> => {
    try {
      await makeAuthenticatedRequest('/api/v1/auth/signout', {
        method: 'POST',
      });
    } catch (error) {
      console.error('Sign out failed:', error);
    } finally {
      setUser(null);
    }
  };

  const refreshToken = async (): Promise<void> => {
    try {
      const userData = await makeAuthenticatedRequest('/api/auth/refresh', {
        method: 'POST',
      });
      setUser(userData);
    } catch (error) {
      console.error('Token refresh failed:', error);
      setUser(null);
      throw error;
    }
  };

  const completeProfile = async (role: UserRole, profileData: ProfileCompletionData): Promise<void> => {
    try {
      const endpoint = getProfileEndpoint(role);
      await makeAuthenticatedRequest(endpoint, {
        method: 'POST',
        body: JSON.stringify(profileData),
      });
      
      console.log('Profile completed, now fetching updated user data...');
      
      // Fetch the updated complete user data from /me endpoint
      const userData = await makeAuthenticatedRequest('/api/v1/auth/me');
      console.log('Updated user data fetched:', userData);
      setUser(userData.data);
    } catch (error) {
      console.error('Complete profile failed:', error);
      throw error;
    }
  };

  const getProfileEndpoint = (role: UserRole): string => {
    const endpoints = {
      jobseeker: '/api/v1/auth/job-seeker/profile',
      recruiter: '/api/v1/auth/recruiter/profile',
      mentor: '/api/v1/auth/mentor/profile',
    };
    return endpoints[role];
  };

  // ============================================================================
  // EFFECTS
  // ============================================================================

  useEffect(() => {
    const initializeAuth = async () => {
      setIsLoading(true);
      await checkAuth();
      setIsLoading(false);
    };

    initializeAuth();
  }, [checkAuth]);

  // ============================================================================
  // CONTEXT VALUE
  // ============================================================================

  const contextValue: AuthContextType = {
    // State
    user,
    isLoading,
    
    // Actions
    signIn,
    signUp,
    signOut,
    refreshToken,
    completeProfile,
    
    // Utilities
    hasRole,
    hasAnyRole,
    isProfileCompleted,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
}
