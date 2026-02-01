import { DASHBOARD_ROUTES } from "@/types/auth";

// ============================================================================
// AUTHENTICATION NAVIGATION UTILITIES
// ============================================================================

export function getDashboardRoute(userRole: string): string | null {
  return DASHBOARD_ROUTES[userRole as keyof typeof DASHBOARD_ROUTES] || null;
}

export function shouldRedirectToDashboard(
  isLoading: boolean, 
  user: any, 
  isProfileCompleted: boolean
): boolean {
  return !isLoading && user !== null && isProfileCompleted;
}

export function getRedirectRoute(
  user: any, 
  isProfileCompleted: boolean
): string {
  if (!user) {
    return "/signin";
  }
  
  if (!isProfileCompleted) {
    return "/choose-role";
  }
  
  return getDashboardRoute(user.role) || "/";
}
