"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useNavigate, Link } from "react-router-dom"
import { Building, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Navbar } from "@/components/Navbar"
import { useAuth } from "@/hooks/useAuthHook"
import { toast } from "sonner"

const jobTitles = [
  "HR Manager", "Talent Acquisition Specialist", "Recruiter", "Head of People",
  "Recruitment Manager", "HR Director", "Talent Partner", "Other"
]

const industries = [
  "Technology", "Finance", "Healthcare", "Manufacturing", "Retail",
  "Consulting", "Education", "Government", "Non-profit", "Other"
]

const companyTiers = [
  "1-10 employees", "11-50 employees", "51-200 employees", 
  "201-1000 employees", "1000+ employees"
]

export default function RecruiterRegister() {
  const navigate = useNavigate()
  const { completeProfile, user } = useAuth()
  const [formData, setFormData] = useState({
    fullName: "",
    companyName: "",
    jobTitle: "",
    industry: "",
    rolesHiring: "",
    companySize: ""
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.fullName || !formData.companyName || !formData.jobTitle) {
      toast.error("Please fill in all required fields")
      return
    }

    try {
      await completeProfile("recruiter", {
        fullName: formData.fullName,
        companyName: formData.companyName,
        bio: `${formData.jobTitle} at ${formData.companyName}`,
        companySize: formData.companySize,
        industry: formData.industry,
        jobTitle: formData.jobTitle
      })
      
      toast.success("Profile completed successfully!")
      navigate("/redirect")
    } catch (error: unknown) {
      toast.error((error as Error).message || "Failed to complete profile")
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
          className="w-full max-w-2xl"
        >
          <Card className="card-premium">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl font-bold">
                Complete Your <span className="hero-text">Recruiter</span> Profile
              </CardTitle>
              <CardDescription className="text-lg">
                Find top talent and build amazing teams with AI-powered insights
              </CardDescription>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Welcome Message */}
                <div className="text-center p-4 bg-primary/10 rounded-lg">
                  <p className="text-sm text-muted-foreground">
                    Welcome, {user?.email}! Let's complete your recruiter profile.
                  </p>
                </div>

                {/* Personal Information */}
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input
                    id="fullName"
                    className="input-premium"
                    value={formData.fullName}
                    onChange={(e) => setFormData(prev => ({ ...prev, fullName: e.target.value }))}
                    required
                  />
                </div>

                {/* Company Information */}
                <div className="space-y-4 p-4 bg-secondary/20 rounded-lg border border-border/30">
                  <div className="flex items-center space-x-2 mb-2">
                    <Building className="h-5 w-5 text-accent" />
                    <h3 className="text-lg font-semibold">Company Information</h3>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="companyName">Company Name</Label>
                      <Input
                        id="companyName"
                        className="input-premium"
                        value={formData.companyName}
                        onChange={(e) => setFormData(prev => ({ ...prev, companyName: e.target.value }))}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Job Title</Label>
                      <Select value={formData.jobTitle} onValueChange={(value) => setFormData(prev => ({ ...prev, jobTitle: value }))}>
                        <SelectTrigger className="input-premium">
                          <SelectValue placeholder="Select your job title" />
                        </SelectTrigger>
                        <SelectContent>
                          {jobTitles.map((title) => (
                            <SelectItem key={title} value={title}>
                              {title}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Industry</Label>
                      <Select value={formData.industry} onValueChange={(value) => setFormData(prev => ({ ...prev, industry: value }))}>
                        <SelectTrigger className="input-premium">
                          <SelectValue placeholder="Select industry" />
                        </SelectTrigger>
                        <SelectContent>
                          {industries.map((industry) => (
                            <SelectItem key={industry} value={industry}>
                              {industry}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Company Size</Label>
                      <Select value={formData.companySize} onValueChange={(value) => setFormData(prev => ({ ...prev, companySize: value }))}>
                        <SelectTrigger className="input-premium">
                          <SelectValue placeholder="Select company size" />
                        </SelectTrigger>
                        <SelectContent>
                          {companyTiers.map((tier) => (
                            <SelectItem key={tier} value={tier}>
                              {tier}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                {/* Hiring Information */}
                <div className="space-y-2">
                  <Label htmlFor="rolesHiring">Number of Roles Currently Hiring For</Label>
                  <Input
                    id="rolesHiring"
                    type="number"
                    min="0"
                    className="input-premium"
                    placeholder="e.g. 5"
                    value={formData.rolesHiring}
                    onChange={(e) => setFormData(prev => ({ ...prev, rolesHiring: e.target.value }))}
                    required
                  />
                  <p className="text-xs text-muted-foreground">
                    This helps us understand your recruitment volume and personalize your experience
                  </p>
                </div>

                <Button type="submit" className="w-full btn-hero">
                  Complete Profile
                </Button>
              </form>

              <div className="mt-6 text-center">
                <Link 
                  to="/choose-role" 
                  className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Role Selection
                </Link>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}