import { createContext, useContext, useState, useEffect, ReactNode } from "react"

interface User {
    id: string
    name: string
    email: string
    bio?: string
    avatar?: string
}

interface AuthContextType {
    user: User | null
    isLoading: boolean
    login: (email: string, password: string) => Promise<void>
    logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null)
    const [isLoading, setIsLoading] = useState(true)

    // Simulate auth check on mount
    useEffect(() => {
        // For demo purposes, simulate a logged-in user
        // In a real app, this would check for existing session/token
        setTimeout(() => {
            setUser({
                id: "1",
                name: "Alex Johnson",
                email: "alex.johnson@example.com",
                bio: "Full-stack developer passionate about AI and career growth. Always learning, always building.",
                avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
            })
            setIsLoading(false)
        }, 1000)
    }, [])

    const login = async (email: string, password: string) => {
        setIsLoading(true)
        // Simulate login API call
        await new Promise(resolve => setTimeout(resolve, 1000))
        setUser({
            id: "1",
            name: "Alex Johnson",
            email: email,
            bio: "Full-stack developer passionate about AI and career growth. Always learning, always building."
        })
        setIsLoading(false)
    }

    const logout = () => {
        setUser(null)
    }

    return (
        <AuthContext.Provider value={{ user, isLoading, login, logout }}>
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