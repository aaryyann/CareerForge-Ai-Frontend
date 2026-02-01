import { Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuthHook";
import { DASHBOARD_ROUTES } from "@/types/auth";

// ============================================================================
// AUTHENTICATION REDIRECT COMPONENT
// ============================================================================

export function AuthRedirect() {
  const { user, isLoading, isProfileCompleted } = useAuth();

  console.log('AuthRedirect state:', { user, isLoading, isProfileCompleted: isProfileCompleted() });

  // Show loading spinner while checking authentication
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }
  console.log('AuthRedirect proceeding with user:', user);

  // Redirect to sign in if not authenticated
  if (!user) {
    console.log('No user, redirecting to signin');
    return <Navigate to="/signin" replace />;
  }

  // Redirect to choose role if profile is not completed
  if (!isProfileCompleted()) {
    console.log('Profile not completed, redirecting to choose-role');
    return <Navigate to="/choose-role" replace />;
  }

  // Redirect to appropriate dashboard based on user role
  const dashboardRoute = DASHBOARD_ROUTES[user.role];

  console.log('Profile completed, redirecting to:', dashboardRoute);
  return <Navigate to={dashboardRoute} replace />;
}
