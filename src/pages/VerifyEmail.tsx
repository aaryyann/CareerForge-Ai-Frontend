"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { useNavigate, useSearchParams } from "react-router-dom"
import { CheckCircle, XCircle, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Navbar } from "@/components/layout"

type VerifyState = "loading" | "success" | "error"

export default function VerifyEmail() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const [state, setState] = useState<VerifyState>("loading")
  const [message, setMessage] = useState("")

  useEffect(() => {
    const token = searchParams.get("token")

    if (!token) {
      setState("error")
      setMessage("Missing verification token")
      return
    }

    const verify = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/api/v1/auth/verify-email?token=${token}`,
          { credentials: "include" }
        )
        const data = await res.json()

        if (data.isSuccess) {
          setState("success")
          setMessage("Your email has been verified!")
        } else {
          setState("error")
          setMessage(data.message || "Verification failed")
        }
      } catch {
        setState("error")
        setMessage("Something went wrong. Please try again.")
      }
    }

    verify()
  }, [searchParams])

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
                className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center"
              >
                {state === "loading" && (
                  <div className="bg-muted rounded-full p-4">
                    <Loader2 className="h-8 w-8 text-primary animate-spin" />
                  </div>
                )}
                {state === "success" && (
                  <div className="bg-green-500/10 rounded-full p-4">
                    <CheckCircle className="h-8 w-8 text-green-500" />
                  </div>
                )}
                {state === "error" && (
                  <div className="bg-red-500/10 rounded-full p-4">
                    <XCircle className="h-8 w-8 text-red-500" />
                  </div>
                )}
              </motion.div>

              <CardTitle className="text-3xl font-bold">
                {state === "loading" && "Verifying..."}
                {state === "success" && (
                  <>Email <span className="hero-text">Verified</span></>
                )}
                {state === "error" && "Verification Failed"}
              </CardTitle>

              <CardDescription className="text-lg">
                {message}
              </CardDescription>
            </CardHeader>

            <CardContent className="text-center">
              {state === "success" && (
                <Button
                  className="w-full h-12 text-base font-semibold"
                  onClick={() => navigate("/choose-role")}
                >
                  Continue
                </Button>
              )}

              {state === "error" && (
                <div className="space-y-3">
                  <Button
                    variant="outline"
                    className="w-full h-12"
                    onClick={() => navigate("/signup")}
                  >
                    Back to Sign Up
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
