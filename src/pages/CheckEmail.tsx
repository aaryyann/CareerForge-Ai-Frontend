"use client"

import { motion } from "framer-motion"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { Mail, ArrowLeft, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Navbar } from "@/components/layout"
import { useState, useEffect } from "react"
import { toast } from "sonner"

export default function CheckEmail() {
  const location = useLocation()
  const navigate = useNavigate()
  const email = (location.state as { email?: string })?.email ?? ""
  const [isResending, setIsResending] = useState(false)

  // Poll verification status every 5 seconds
  useEffect(() => {
    if (!email) return

    const interval = setInterval(async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/api/v1/auth/verification-status?email=${encodeURIComponent(email)}`
        )
        const data = await res.json()
        if (data.isVerified) {
          clearInterval(interval)
          toast.success("Email verified! Please sign in to continue.")
          navigate("/signin")
        }
      } catch {
        // silently ignore polling errors
      }
    }, 5000)

    return () => clearInterval(interval)
  }, [email, navigate])

  const handleResend = async () => {
    if (!email) {
      toast.error("No email address found. Please sign up again.")
      return
    }

    try {
      setIsResending(true)
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/auth/resend-verification`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      })
      const data = await res.json()

      if (data.isSuccess) {
        toast.success("Verification email resent!")
      } else {
        toast.error(data.message || "Failed to resend email")
      }
    } catch {
      toast.error("Something went wrong")
    } finally {
      setIsResending(false)
    }
  }

  return (
    <div className="min-h-screen bg-hero-gradient">
      <Navbar />

      <div className="flex min-h-screen items-center justify-center px-6 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <Card className="card-premium">
            <CardHeader className="text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", delay: 0.2 }}
                className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center"
              >
                <Mail className="h-8 w-8 text-primary" />
              </motion.div>
              <CardTitle className="text-3xl font-bold">
                Check Your <span className="hero-text">Email</span>
              </CardTitle>
              <CardDescription className="text-lg">
                We've sent a verification link to
              </CardDescription>
              {email && (
                <p className="text-sm font-medium text-primary mt-1">{email}</p>
              )}
            </CardHeader>

            <CardContent className="space-y-6">
              <div className="rounded-lg bg-muted/50 p-4 text-sm text-muted-foreground space-y-2">
                <p>Click the link in the email to verify your account.</p>
                <p>The link expires in 24 hours.</p>
              </div>

              <Button
                variant="outline"
                className="w-full h-12"
                onClick={handleResend}
                disabled={isResending}
              >
                <RefreshCw className={`h-4 w-4 mr-2 ${isResending ? "animate-spin" : ""}`} />
                {isResending ? "Resending..." : "Resend Verification Email"}
              </Button>

              <div className="text-center space-y-4">
                <p className="text-sm text-muted-foreground">
                  Already verified?{" "}
                  <Link to="/signin" className="text-primary hover:underline">
                    Sign in here
                  </Link>
                </p>

                <Link
                  to="/"
                  className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Home
                </Link>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
