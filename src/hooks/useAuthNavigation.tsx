import { useAuth } from "@/hooks/useAuthHook";
import { getDashboardRoute, shouldRedirectToDashboard, getRedirectRoute } from "@/utils/authNavigation";

// ============================================================================
// AUTHENTICATION NAVIGATION HOOK
// ============================================================================

export function useAuthNavigation() {
  const { user, isLoading, isProfileCompleted } = useAuth();

  return {
    getDashboardRoute: () => getDashboardRoute(user?.role || ""),
    shouldRedirectToDashboard: () => shouldRedirectToDashboard(isLoading, user, isProfileCompleted()),
    getRedirectRoute: () => getRedirectRoute(user, isProfileCompleted()),
    isAuthenticated: user !== null,
    isProfileCompleted: isProfileCompleted(),
    isLoading,
  };
}
