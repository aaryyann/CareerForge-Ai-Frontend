import { createContext, useContext, useState, useEffect, ReactNode } from "react"
import { supabase } from "@/integrations/supabase/client"
import { User as SupabaseUser } from "@supabase/supabase-js"
import type { Database } from "@/integrations/supabase/types"

type UserRole = Database["public"]["Enums"]["user_role"]

interface Profile {
  id: string
  first_name: string | null
  last_name: string | null
  bio: string | null
  role: UserRole
  profile_picture: string | null
  created_at: string
  updated_at: string
}

interface User {
  id: string
  email: string
  profile: Profile | null
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  signUp: (email: string, password: string, userData: { first_name: string; last_name: string; role: UserRole; bio?: string }) => Promise<void>
  signIn: (email: string, password: string) => Promise<void>
  signInWithOAuth: (provider: 'google' | 'github') => Promise<void>
  signOut: () => Promise<void>
  updateProfile: (updates: Partial<Profile>) => Promise<void>
  completeProfile: (profileData: { first_name: string; last_name: string; role: UserRole; bio?: string }) => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Check for existing session on mount
  useEffect(() => {
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (session?.user) {
        await fetchUserProfile(session.user)
      }
      setIsLoading(false)
    }

    getSession()

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        await fetchUserProfile(session.user)
      } else {
        setUser(null)
      }
      setIsLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [])

  const fetchUserProfile = async (supabaseUser: SupabaseUser) => {
    try {
      const { data: profile, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', supabaseUser.id)
        .single()

      if (error) {
        console.error('Error fetching profile:', error)
        return
      }

      setUser({
        id: supabaseUser.id,
        email: supabaseUser.email || '',
        profile
      })
    } catch (error) {
      console.error('Error fetching user profile:', error)
    }
  }

  const signUp = async (email: string, password: string, userData: { first_name: string; last_name: string; role: UserRole; bio?: string }) => {
    setIsLoading(true)
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            first_name: userData.first_name,
            last_name: userData.last_name,
            role: userData.role,
            bio: userData.bio || null
          }
        }
      })

      if (error) throw error

      // Profile will be created automatically by the database trigger
    } catch (error) {
      console.error('Error signing up:', error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const signIn = async (email: string, password: string) => {
    setIsLoading(true)
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      })

      if (error) throw error
    } catch (error) {
      console.error('Error signing in:', error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const signInWithOAuth = async (provider: 'google' | 'github') => {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}/choose-role`
        }
      })

      if (error) throw error
    } catch (error) {
      console.error(`Error signing in with ${provider}:`, error)
      throw error
    }
  }

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut()
      if (error) throw error
      setUser(null)
    } catch (error) {
      console.error('Error signing out:', error)
      throw error
    }
  }

  const updateProfile = async (updates: Partial<Profile>) => {
    if (!user) return

    try {
      const { data, error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', user.id)
        .select()
        .single()

      if (error) throw error

      setUser({
        ...user,
        profile: data
      })
    } catch (error) {
      console.error('Error updating profile:', error)
      throw error
    }
  }

  const completeProfile = async (profileData: { first_name: string; last_name: string; role: UserRole; bio?: string }) => {
    if (!user) throw new Error("User must be logged in to complete profile")

    try {
      const { data, error } = await supabase
        .from('profiles')
        .update({
          first_name: profileData.first_name,
          last_name: profileData.last_name,
          role: profileData.role,
          bio: profileData.bio || null
        })
        .eq('id', user.id)
        .select()
        .single()

      if (error) throw error

      setUser({
        ...user,
        profile: data
      })
    } catch (error) {
      console.error('Error completing profile:', error)
      throw error
    }
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, signUp, signIn, signInWithOAuth, signOut, updateProfile, completeProfile }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}