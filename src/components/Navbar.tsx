
"use client"

import { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { Menu, X, Sun, Moon, User } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { useTheme } from "@/components/ThemeProvider"
import { useAuth } from "@/hooks/useAuth"
import { ProfileModal } from "@/components/ProfileModal"
import { useRoleBasedNavigation } from "@/components/RoleBasedNavigation"

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [profileModalOpen, setProfileModalOpen] = useState(false)
  const { theme, setTheme } = useTheme()
  const { user, isLoading, signOut } = useAuth()
  const location = useLocation()
  const navigation = useRoleBasedNavigation()

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border/20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-14 justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="text-xl font-bold hero-text tracking-tight"
            >
              CareerForge AI
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:gap-x-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="group relative"
              >
                <motion.div
                  whileHover={{ y: -1 }}
                  className={`px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                    location.pathname === item.href
                      ? "text-primary bg-primary/10"
                      : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                  }`}
                >
                  {item.name}
                </motion.div>
              </Link>
            ))}
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-3">
            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="hover:bg-accent rounded-lg h-9 w-9 p-0"
            >
              <motion.div
                whileHover={{ rotate: 180 }}
                transition={{ duration: 0.3 }}
              >
                {theme === "dark" ? (
                  <Sun className="h-4 w-4" />
                ) : (
                  <Moon className="h-4 w-4" />
                )}
              </motion.div>
            </Button>

            {/* Enhanced Auth Section - Desktop */}
            <div className="hidden md:flex md:items-center md:gap-2">
              {user ? (
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setProfileModalOpen(true)}
                    className="hover:bg-accent rounded-xl px-4 py-2 text-sm font-medium flex items-center gap-2 hover:shadow-lg hover:shadow-primary/20 transition-all duration-200 group"
                  >
                    <User className="h-4 w-4 group-hover:scale-110 transition-transform duration-200" />
                    Profile
                  </Button>
                </motion.div>
              ) : (
                <>
                  <motion.div
                    whileHover={{ scale: 1.05, y: -1 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  >
                    <Link to="/signin">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        className="hover:bg-accent rounded-xl px-4 py-2 text-sm font-medium transition-all duration-200"
                      >
                        Sign In
                      </Button>
                    </Link>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.05, y: -1 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  >
                    <Link to="/signup">
                      <Button 
                        size="sm"
                        className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl px-4 py-2 text-sm font-medium shadow-sm hover:shadow-lg hover:shadow-primary/30 transition-all duration-200"
                      >
                        Get Started
                      </Button>
                    </Link>
                  </motion.div>
                </>
              )}
            </div>

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden hover:bg-accent rounded-lg h-9 w-9 p-0"
            >
              <motion.div
                animate={{ rotate: mobileMenuOpen ? 90 : 0 }}
                transition={{ duration: 0.2 }}
              >
                {mobileMenuOpen ? (
                  <X className="h-4 w-4" />
                ) : (
                  <Menu className="h-4 w-4" />
                )}
              </motion.div>
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-background/95 backdrop-blur-md border-b border-border/20"
          >
            <div className="px-4 py-4 space-y-2">
              {navigation.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link
                    to={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      location.pathname === item.href
                        ? "text-primary bg-primary/10"
                        : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                    }`}
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}
              
              <div className="pt-4 mt-4 border-t border-border/20 space-y-2">
                {user ? (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setProfileModalOpen(true)
                      setMobileMenuOpen(false)
                    }}
                    className="w-full justify-start hover:bg-accent rounded-lg flex items-center gap-2"
                  >
                    <User className="h-4 w-4" />
                    Profile
                  </Button>
                ) : (
                  <>
                    <Link to="/signin" onClick={() => setMobileMenuOpen(false)}>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        className="w-full justify-start hover:bg-accent rounded-lg"
                      >
                        Sign In
                      </Button>
                    </Link>
                    <Link to="/signup" onClick={() => setMobileMenuOpen(false)}>
                      <Button 
                        size="sm"
                        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg shadow-sm"
                      >
                        Get Started
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Profile Modal */}
      {user && (
        <ProfileModal
          isOpen={profileModalOpen}
          onClose={() => setProfileModalOpen(false)}
          user={user}
        />
      )}
    </nav>
  )
}
