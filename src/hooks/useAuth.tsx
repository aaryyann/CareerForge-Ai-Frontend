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
  AuthContextType,
} from "@/types/auth";

// ============================================================================
// AUTHENTICATION HOOK
// ============================================================================

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

// ============================================================================
// API HELPER
// ============================================================================

const API_URL = import.meta.env.VITE_API_URL;

async function apiRequest(url: string, options: RequestInit = {}) {
  const response = await fetch(`${API_URL}${url}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    credentials: "include",
  });

  const data = await response.json().catch(() => ({ message: "Request failed" }));

  if (!response.ok) {
    const error: any = new Error(data.message || "Request failed");
    error.code = data.code;
    error.statusCode = response.status;
    throw error;
  }

  return data;
}

// ============================================================================
// PROFILE ENDPOINT MAP
// ============================================================================

const PROFILE_ENDPOINTS: Record<UserRole, string> = {
  job_seeker: "/api/v1/auth/job-seeker/profile",
  recruiter: "/api/v1/auth/recruiter/profile",
  mentor: "/api/v1/auth/mentor/profile",
};

// ============================================================================
// AUTHENTICATION PROVIDER
// ============================================================================

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // ============================================================================
  // UTILITY FUNCTIONS
  // ============================================================================

  const hasRole = useCallback(
    (role: UserRole): boolean => user?.role === role,
    [user?.role]
  );

  const hasAnyRole = useCallback(
    (roles: UserRole[]): boolean => (user ? roles.includes(user.role) : false),
    [user]
  );

  const isProfileCompleted = useCallback((): boolean => {
    if (!user) return false;
    return user.profile !== null && user.profile !== undefined;
  }, [user]);

  // ============================================================================
  // AUTH METHODS
  // ============================================================================

  const checkAuth = useCallback(async () => {
    try {
      const result = await apiRequest("/api/v1/auth/me");
      setUser(result.data);
    } catch {
      setUser(null);
    }
  }, []);

  const signIn = async (credentials: LoginCredentials): Promise<void> => {
    await apiRequest("/api/v1/auth/signin", {
      method: "POST",
      body: JSON.stringify(credentials),
    });

    // Fetch complete user data after login
    const result = await apiRequest("/api/v1/auth/me");
    setUser(result.data);
  };

  const signUp = async (credentials: RegisterCredentials): Promise<void> => {
    // Signup no longer sets a session cookie — user must verify email first
    await apiRequest("/api/v1/auth/signup", {
      method: "POST",
      body: JSON.stringify(credentials),
    });
  };

  const signOut = async (): Promise<void> => {
    try {
      await apiRequest("/api/v1/auth/signout", { method: "POST" });
    } catch {
      // Ignore signout errors
    } finally {
      setUser(null);
    }
  };

  const refreshToken = async (): Promise<void> => {
    const result = await apiRequest("/api/auth/refresh", { method: "POST" });
    setUser(result.data);
  };

  const completeProfile = async (
    role: UserRole,
    profileData: ProfileCompletionData
  ): Promise<void> => {
    await apiRequest(PROFILE_ENDPOINTS[role], {
      method: "POST",
      body: JSON.stringify(profileData),
    });

    // Refresh user data after profile completion
    const result = await apiRequest("/api/v1/auth/me");
    setUser(result.data);
  };

  const resendVerification = async (email: string): Promise<void> => {
    await apiRequest("/api/v1/auth/resend-verification", {
      method: "POST",
      body: JSON.stringify({ email }),
    });
  };

  // ============================================================================
  // INIT
  // ============================================================================

  useEffect(() => {
    const init = async () => {
      setIsLoading(true);
      await checkAuth();
      setIsLoading(false);
    };
    init();
  }, [checkAuth]);

  // ============================================================================
  // CONTEXT VALUE
  // ============================================================================

  const contextValue: AuthContextType = {
    user,
    isLoading,
    signIn,
    signUp,
    signOut,
    refreshToken,
    completeProfile,
    resendVerification,
    hasRole,
    hasAnyRole,
    isProfileCompleted,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}
