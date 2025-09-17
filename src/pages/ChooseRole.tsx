"use client"

import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom"
import { Users, Target, UserCheck } from "lucide-react"
import { Navbar } from "@/components/Navbar"
import { Card } from "@/components/ui/card"

const roles = [
  {
    id: "jobseeker",
    title: "Job Seeker",
    description: "Find your dream career with AI-powered matching and personalized roadmaps",
    icon: Target,
    gradient: "from-emerald-500 to-emerald-600",
    route: "/register/jobseeker"
  },
  {
    id: "mentor",
    title: "Mentor", 
    description: "Share your expertise and guide the next generation of professionals",
    icon: Users,
    gradient: "from-primary to-rose-600",
    route: "/register/mentor"
  },
  {
    id: "recruiter",
    title: "Recruiter",
    description: "Discover top talent and build amazing teams with AI insights",
    icon: UserCheck,
    gradient: "from-accent to-amber-600",
    route: "/register/recruiter"
  }
]

export default function ChooseRole() {
  const navigate = useNavigate()

  const handleRoleSelect = (route: string) => {
    navigate(route)
  }

  return (
    <div className="min-h-screen bg-hero-gradient">
      <Navbar />
      
      <div className="flex min-h-screen items-center justify-center px-6 py-24">
        <div className="w-full max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
              Select Your <span className="hero-text">Role</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Tell us who you are so we can personalize your experience and connect you with the right opportunities.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {roles.map((role, index) => (
              <motion.div
                key={role.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ 
                  scale: 1.05,
                  y: -10,
                }}
                whileTap={{ scale: 0.98 }}
                className="cursor-pointer"
                onClick={() => handleRoleSelect(role.route)}
              >
                <Card className="card-premium group h-full p-8 text-center hover:shadow-2xl hover:shadow-primary/20 transition-all duration-500 relative overflow-hidden">
                  {/* Gradient overlay on hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${role.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                  
                  <div className="relative z-10">
                    <motion.div
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                      className={`w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br ${role.gradient} p-4 group-hover:shadow-lg group-hover:shadow-primary/30 transition-all duration-300`}
                    >
                      <role.icon className="w-full h-full text-primary-foreground" />
                    </motion.div>
                    
                    <h3 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors">
                      {role.title}
                    </h3>
                    
                    <p className="text-muted-foreground leading-relaxed">
                      {role.description}
                    </p>
                  </div>

                  {/* Animated border on hover */}
                  <div className="absolute inset-0 rounded-xl border-2 border-transparent group-hover:border-primary/30 transition-all duration-300" />
                  
                  {/* Glow effect */}
                  <motion.div 
                    className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background: `linear-gradient(135deg, transparent 0%, rgba(244, 63, 94, 0.1) 50%, transparent 100%)`,
                      filter: 'blur(20px)'
                    }}
                  />
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-center mt-12"
          >
            <p className="text-sm text-muted-foreground">
              Not sure which role fits you best? Don't worry - you can always change this later in your profile settings.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  )
}