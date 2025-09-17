"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useNavigate, Link } from "react-router-dom"
import { Upload, ArrowLeft, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Navbar } from "@/components/Navbar"
import { useAuth } from "@/hooks/useAuth"
import { toast } from "sonner"

const experienceOptions = [
  "0-1 years", "1-3 years", "3-5 years", "5-10 years", "10+ years"
]

const roleOptions = [
  "Software Engineer", "Product Manager", "Designer", "Data Scientist", 
  "Marketing Manager", "Sales Representative", "HR Manager", "Other"
]

export default function JobSeekerRegister() {
  const navigate = useNavigate()
  const { completeProfile, user } = useAuth()
  const [selectedRoles, setSelectedRoles] = useState<string[]>([])
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    bio: "",
    experience: "",
    resume: null as File | null
  })

  const handleRoleToggle = (role: string) => {
    setSelectedRoles(prev => 
      prev.includes(role) 
        ? prev.filter(r => r !== role)
        : [...prev, role]
    )
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setFormData(prev => ({ ...prev, resume: file }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.firstName || !formData.lastName || !formData.bio) {
      toast.error("Please fill in all required fields")
      return
    }

    try {
      await completeProfile({
        first_name: formData.firstName,
        last_name: formData.lastName,
        role: "jobseeker",
        bio: formData.bio
      })
      
      toast.success("Profile completed successfully!")
      navigate("/jobseeker/profile")
    } catch (error: any) {
      toast.error(error.message || "Failed to complete profile")
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
                Complete Your <span className="hero-text">Job Seeker</span> Profile
              </CardTitle>
              <CardDescription className="text-lg">
                Tell us about yourself to find the perfect career opportunities
              </CardDescription>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Welcome Message */}
                <div className="text-center p-4 bg-primary/10 rounded-lg">
                  <p className="text-sm text-muted-foreground">
                    Welcome, {user?.email}! Let's complete your job seeker profile.
                  </p>
                </div>

                {/* Personal Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      className="input-premium"
                      value={formData.firstName}
                      onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      className="input-premium"
                      value={formData.lastName}
                      onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
                      required
                    />
                  </div>
                </div>

                {/* Bio */}
                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    className="input-premium min-h-[100px]"
                    placeholder="Tell us about yourself, your career goals, and what you're looking for..."
                    value={formData.bio}
                    onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
                    required
                  />
                </div>

                {/* Resume Upload */}
                <div className="space-y-2">
                  <Label>Upload Resume</Label>
                  <div className="border-2 border-dashed border-border/50 rounded-lg p-6 text-center hover:border-primary/50 transition-colors">
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={handleFileUpload}
                      className="hidden"
                      id="resume-upload"
                    />
                    <label htmlFor="resume-upload" className="cursor-pointer">
                      {formData.resume ? (
                        <div className="flex items-center justify-center space-x-2 text-emerald-400">
                          <CheckCircle className="h-5 w-5" />
                          <span>{formData.resume.name}</span>
                        </div>
                      ) : (
                        <div className="space-y-2">
                          <Upload className="h-8 w-8 mx-auto text-muted-foreground" />
                          <p className="text-sm text-muted-foreground">
                            Click to upload or drag and drop your resume
                          </p>
                          <p className="text-xs text-muted-foreground">PDF, DOC, or DOCX (max 5MB)</p>
                        </div>
                      )}
                    </label>
                  </div>
                </div>

                {/* Experience Level */}
                <div className="space-y-2">
                  <Label>Years of Experience</Label>
                  <Select value={formData.experience} onValueChange={(value) => setFormData(prev => ({ ...prev, experience: value }))}>
                    <SelectTrigger className="input-premium">
                      <SelectValue placeholder="Select your experience level" />
                    </SelectTrigger>
                    <SelectContent>
                      {experienceOptions.map((option) => (
                        <SelectItem key={option} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Preferred Roles */}
                <div className="space-y-3">
                  <Label>Preferred Roles (Select all that apply)</Label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {roleOptions.map((role) => (
                      <motion.button
                        key={role}
                        type="button"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleRoleToggle(role)}
                        className={`p-3 rounded-lg border text-sm font-medium transition-all ${
                          selectedRoles.includes(role)
                            ? "bg-primary/20 border-primary text-primary"
                            : "bg-secondary border-border hover:border-primary/50"
                        }`}
                      >
                        {role}
                      </motion.button>
                    ))}
                  </div>
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