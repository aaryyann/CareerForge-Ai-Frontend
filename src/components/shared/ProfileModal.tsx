import { useState } from "react"
import { User as UserIcon, X, Edit, LogOut } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { useAuth } from "@/hooks/useAuthHook"
import type { User } from "@/types/auth"

interface ProfileModalProps {
  isOpen: boolean
  onClose: () => void
  user: User
}

export function ProfileModal({ isOpen, onClose, user }: ProfileModalProps) {
  const { signOut } = useAuth()
  console.log(user)
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Enhanced Backdrop with Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed inset-0 z-50 bg-background/60 backdrop-blur-md"
            onClick={onClose}
          />
          
          {/* Enhanced Modal with Premium Styling */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ 
              duration: 0.4, 
              ease: [0.25, 0.46, 0.45, 0.94],
              type: "spring",
              stiffness: 400,
              damping: 25
            }}
            className="fixed left-1/2 top-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2 p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-card via-card to-card/80 border border-border/30 backdrop-blur-xl shadow-2xl glow-effect animate-glow">
              {/* Animated Background Pattern */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-50" />
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary/10 rounded-full blur-3xl animate-pulse" />
              <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-accent/10 rounded-full blur-3xl animate-pulse" />
              
              <div className="relative p-8 text-center">
                {/* Enhanced Close Button */}
                <motion.div
                  initial={{ opacity: 0, rotate: -90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  transition={{ delay: 0.2, duration: 0.3 }}
                  className="absolute right-4 top-4"
                >
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={onClose}
                    className="h-8 w-8 rounded-full hover:bg-accent/50 hover:scale-110 transition-all duration-200 group"
                  >
                    <X className="h-4 w-4 group-hover:rotate-90 transition-transform duration-200" />
                  </Button>
                </motion.div>

                {/* Enhanced Profile Image with Float Animation */}
                <motion.div
                  initial={{ scale: 0.5, opacity: 0, y: 30 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  transition={{ 
                    delay: 0.1, 
                    duration: 0.5, 
                    type: "spring",
                    stiffness: 300,
                    damping: 20
                  }}
                  className="mx-auto mb-6 animate-float"
                >
                  <div className="relative">
                    <Avatar className="h-28 w-28 ring-4 ring-primary/30 ring-offset-4 ring-offset-background hover:ring-primary/50 transition-all duration-300 hover:scale-105">
                      <AvatarImage src={user.profile?.profilePicture || undefined} alt={user.profile?.fullName || 'Profile'} className="object-cover" />
                      <AvatarFallback className="bg-gradient-to-br from-primary/20 to-accent/20 text-primary text-2xl font-bold border border-primary/20">
                        {user.profile?.fullName ? user.profile.fullName.split(' ').map(n => n[0]).join('').toUpperCase() : <UserIcon className="h-10 w-10" />}
                      </AvatarFallback>
                    </Avatar>
                    {/* Glow Effect Behind Avatar */}
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary/20 to-accent/20 blur-xl -z-10 animate-pulse-glow" />
                  </div>
                </motion.div>

                {/* Enhanced User Info with Staggered Animation */}
                <motion.div
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ 
                    delay: 0.3, 
                    duration: 0.4,
                    ease: "easeOut"
                  }}
                  className="space-y-4"
                >
                  {/* Enhanced Name with Gradient */}
                  <motion.h3 
                    className="text-3xl font-bold tracking-tight hero-text hover:scale-105 transition-transform duration-200 cursor-default"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    {user.profile?.fullName || user.email}
                  </motion.h3>
                  
                  {/* Enhanced Email */}
                  <motion.p 
                    className="text-muted-foreground text-sm font-medium"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.3 }}
                  >
                    {user.email}
                  </motion.p>

                  {/* Enhanced Bio */}
                  {user.profile?.bio && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5, duration: 0.3 }}
                      className="bg-muted/30 rounded-lg p-4 border border-border/20 backdrop-blur-sm"
                    >
                      <p className="text-foreground/90 text-sm leading-relaxed max-w-xs mx-auto">
                        {user.profile.bio}
                      </p>
                    </motion.div>
                  )}
                </motion.div>

                {/* Enhanced Action Buttons with Hover Effects */}
                <motion.div
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ 
                    delay: 0.6, 
                    duration: 0.4,
                    ease: "easeOut"
                  }}
                  className="mt-8 flex gap-3 justify-center"
                >
                  <motion.div
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  >
                    <Button
                      variant="outline"
                      size="sm"
                      className="rounded-xl border-border/50 hover:bg-accent/50 hover:border-primary/30 transition-all duration-200 backdrop-blur-sm group"
                    >
                      <Edit className="h-4 w-4 mr-2 group-hover:rotate-12 transition-transform duration-200" />
                      Edit Profile
                    </Button>
                  </motion.div>
                  
                  <motion.div
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  >
                    <Button
                      variant="ghost"
                      size="sm"
                      className="rounded-xl text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-all duration-200 group"
                      onClick={() => signOut()}
                    >
                      <LogOut className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform duration-200" />
                      Sign Out
                    </Button>
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}