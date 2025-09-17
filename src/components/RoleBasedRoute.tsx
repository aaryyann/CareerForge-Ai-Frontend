import { ReactNode } from "react"
import { Navigate } from "react-router-dom"
import { useAuth } from "@/hooks/useAuth"
import type { Database } from "@/integrations/supabase/types"

type UserRole = Database["public"]["Enums"]["user_role"]

interface RoleBasedRouteProps {
  children: ReactNode
  allowedRoles: UserRole[]
  redirectTo?: string
}

export function RoleBasedRoute({ children, allowedRoles, redirectTo = "/" }: RoleBasedRouteProps) {
  const { user, isLoading } = useAuth()

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!user) {
    return <Navigate to="/signin" replace />
  }

  if (!user.profile) {
    return <Navigate to="/choose-role" replace />
  }

  if (!allowedRoles.includes(user.profile.role)) {
    return <Navigate to={redirectTo} replace />
  }

  return <>{children}</>
}