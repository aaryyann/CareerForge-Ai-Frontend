import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuthHook";
import type { UserRole, RoleBasedRouteConfig } from "@/types/auth";

// ============================================================================
// AUTHENTICATION GUARD COMPONENT
// ============================================================================

interface AuthGuardProps extends RoleBasedRouteConfig {
  children: ReactNode;
}

export function AuthGuard({ 
  children, 
  allowedRoles, 
  redirectTo = "/", 
  requireProfile = true 
}: AuthGuardProps) {
  const { user, isLoading, hasAnyRole, isProfileCompleted } = useAuth();

  // Show loading spinner while checking authentication
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Redirect to sign in if not authenticated
  if (!user) {
    return <Navigate to="/signin" replace />;
  }

  // Redirect to choose role if profile is required but not completed
  if (requireProfile && !isProfileCompleted()) {
    return <Navigate to="/choose-role" replace />;
  }

  // Redirect if user doesn't have required role
  if (!hasAnyRole(allowedRoles)) {
    return <Navigate to={redirectTo} replace />;
  }

  // Render the protected content
  return <>{children}</>;
}
