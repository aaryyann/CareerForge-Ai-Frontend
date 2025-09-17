"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useNavigate, Link } from "react-router-dom"
import { Upload, ArrowLeft, CheckCircle, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Navbar } from "@/components/Navbar"
import { useAuth } from "@/hooks/useAuth"
import { toast } from "@/hooks/use-toast"

const expertiseAreas = [
  "Software Engineering", "Product Management", "UI/UX Design", "Data Science",
  "Marketing", "Sales", "Finance", "HR & Recruiting", "Entrepreneurship", "Leadership"
]

const availabilityOptions = [
  "Part-time (5-10 hours/week)",
  "Full-time (20+ hours/week)", 
  "Weekends only",
  "Flexible schedule"
]

export default function MentorRegister() {
  const navigate = useNavigate()
  const { completeProfile, user } = useAuth()
  const [selectedExpertise, setSelectedExpertise] = useState<string[]>([])
  const [formData, setFormData] = useState({
    fullName: "",
    mentoringExperience: "",
    availability: "",
    profilePicture: null as File | null,
    bio: ""
  })


  const handleExpertiseToggle = (area: string) => {
    setSelectedExpertise(prev => 
      prev.includes(area) 
        ? prev.filter(a => a !== area)
        : [...prev, area]
    )
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setFormData(prev => ({ ...prev, profilePicture: file }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.fullName || !formData.bio || !formData.mentoringExperience) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      })
      return
    }

    try {
      const [firstName, ...lastNameParts] = formData.fullName.split(' ')
      await completeProfile({
        first_name: firstName,
        last_name: lastNameParts.join(' ') || '',
        role: "mentor",
        bio: formData.bio
      })
      
      toast({
        title: "Success",
        description: "Profile completed successfully!"
      })
      navigate("/mentor/sessions")
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to complete profile",
        variant: "destructive"
      })
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
                Complete Your <span className="hero-text">Mentor</span> Profile
              </CardTitle>
              <CardDescription className="text-lg">
                Share your expertise and help others accelerate their careers
              </CardDescription>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Welcome Message */}
                <div className="text-center p-4 bg-primary/10 rounded-lg">
                  <p className="text-sm text-muted-foreground">
                    Welcome, {user?.email}! Let's complete your mentor profile.
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

                {/* Bio */}
                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    className="input-premium min-h-[100px]"
                    placeholder="Tell us about your background, expertise, and what you can help mentees with..."
                    value={formData.bio}
                    onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
                    required
                  />
                </div>

                {/* Profile Picture Upload */}
                <div className="space-y-2">
                  <Label>Profile Picture</Label>
                  <div className="border-2 border-dashed border-border/50 rounded-lg p-6 text-center hover:border-primary/50 transition-colors">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                      id="profile-upload"
                    />
                    <label htmlFor="profile-upload" className="cursor-pointer">
                      {formData.profilePicture ? (
                        <div className="flex items-center justify-center space-x-2 text-emerald-400">
                          <CheckCircle className="h-5 w-5" />
                          <span>{formData.profilePicture.name}</span>
                        </div>
                      ) : (
                        <div className="space-y-2">
                          <User className="h-8 w-8 mx-auto text-muted-foreground" />
                          <p className="text-sm text-muted-foreground">
                            Click to upload your profile picture
                          </p>
                          <p className="text-xs text-muted-foreground">JPG, PNG, or GIF (max 2MB)</p>
                        </div>
                      )}
                    </label>
                  </div>
                </div>

                {/* Expertise Areas */}
                <div className="space-y-3">
                  <Label>Expertise Areas (Select all that apply)</Label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {expertiseAreas.map((area) => (
                      <motion.button
                        key={area}
                        type="button"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleExpertiseToggle(area)}
                        className={`p-3 rounded-lg border text-sm font-medium transition-all ${
                          selectedExpertise.includes(area)
                            ? "bg-primary/20 border-primary text-primary"
                            : "bg-secondary border-border hover:border-primary/50"
                        }`}
                      >
                        {area}
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Mentoring Experience */}
                <div className="space-y-2">
                  <Label htmlFor="mentoringExperience">Years of Mentoring Experience</Label>
                  <Input
                    id="mentoringExperience"
                    type="number"
                    min="0"
                    className="input-premium"
                    placeholder="e.g. 3"
                    value={formData.mentoringExperience}
                    onChange={(e) => setFormData(prev => ({ ...prev, mentoringExperience: e.target.value }))}
                    required
                  />
                </div>

                {/* Availability */}
                <div className="space-y-2">
                  <Label>Availability</Label>
                  <Select value={formData.availability} onValueChange={(value) => setFormData(prev => ({ ...prev, availability: value }))}>
                    <SelectTrigger className="input-premium">
                      <SelectValue placeholder="Select your availability" />
                    </SelectTrigger>
                    <SelectContent>
                      {availabilityOptions.map((option) => (
                        <SelectItem key={option} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
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