import { useAuth } from "@/hooks/useAuth"
import type { UserRole } from "@/types/auth"

// ============================================================================
// NAVIGATION CONFIGURATION
// ============================================================================

interface NavigationItem {
  name: string
  href: string
  roles: UserRole[]
}

// Define navigation items for each role
const navigationItems: NavigationItem[] = [
  // Job Seeker routes
  { name: "Dashboard", href: "/dashboard", roles: ["job_seeker"] },
  { name: "Upload Resume", href: "/upload-resume", roles: ["job_seeker"] },
  { name: "Mentor Match", href: "/mentor-match", roles: ["job_seeker"] },
  { name: "Role Suggest", href: "/role-suggest", roles: ["job_seeker"] },
  { name: "Roadmap", href: "/roadmap", roles: ["job_seeker"] },
  
  // Recruiter routes
  { name: "Dashboard", href: "/recruiter-dashboard", roles: ["recruiter"] },
  { name: "Job Postings", href: "/job-postings", roles: ["recruiter"] },
  { name: "Candidate Search", href: "/candidate-search", roles: ["recruiter"] },
  { name: "Applications", href: "/applications", roles: ["recruiter"] },
  { name: "Analytics", href: "/analytics", roles: ["recruiter"] },
  
  // Mentor routes
  { name: "Dashboard", href: "/mentor-dashboard", roles: ["mentor"] },
  { name: "Mentee Matches", href: "/mentee-matches", roles: ["mentor"] },
  { name: "Sessions", href: "/sessions", roles: ["mentor"] },
  
  // Common routes (shared across multiple roles)
  { name: "Profile", href: "/profile", roles: ["job_seeker", "recruiter", "mentor"] },
  { name: "AI Chat", href: "/ai-chat", roles: ["job_seeker", "mentor"] },
  { name: "Model Benchmarks", href: "/model-benchmarks", roles: ["job_seeker", "recruiter", "mentor"] },
  { name: "Voice Input", href: "/voice-input", roles: ["job_seeker", "mentor"] },
]

// ============================================================================
// NAVIGATION HOOKS AND UTILITIES
// ============================================================================

export function useNavigation() {
  const { user } = useAuth()
  
  if (!user) {
    return []
  }

  return navigationItems.filter(item => 
    item.roles.includes(user.role)
  )
}

export function getRoleDisplayName(role: UserRole): string {
  switch (role) {
    case "job_seeker":
      return "Job Seeker"
    case "recruiter":
      return "Recruiter"
    case "mentor":
      return "Mentor"
    default:
      return role
  }
}

export function getDashboardRoute(role: UserRole): string {
  switch (role) {
    case "job_seeker":
      return "/dashboard"
    case "recruiter":
      return "/recruiter-dashboard"
    case "mentor":
      return "/mentor-dashboard"
    default:
      return "/dashboard"
  }
}
