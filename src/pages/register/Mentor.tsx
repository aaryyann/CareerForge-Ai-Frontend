"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useNavigate, Link } from "react-router-dom"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Navbar } from "@/components/layout"
import { useAuth } from "@/hooks/useAuth"
import { toast } from "sonner"
import { indianCities } from "@/constants/locations"

const expertiseOptions = [
  "Software Engineering", "Product Management", "UI/UX Design", "Data Science",
  "Machine Learning", "Cloud & DevOps", "Cybersecurity", "Marketing",
  "Sales", "Finance", "HR & Recruiting", "Entrepreneurship", "Leadership",
]

export default function MentorRegister() {
  const navigate = useNavigate()
  const { completeProfile, user } = useAuth()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [selectedExpertise, setSelectedExpertise] = useState<string[]>([])
  const [formData, setFormData] = useState({
    fullName: "",
    title: "",
    company: "",
    yearsOfExp: "",
    phone: "",
    location: "",
    linkedinUrl: "",
    pricePerSession: "",
  })

  const update = (field: string, value: string) =>
    setFormData(prev => ({ ...prev, [field]: value }))

  const handleExpertiseToggle = (area: string) => {
    setSelectedExpertise(prev =>
      prev.includes(area)
        ? prev.filter(a => a !== area)
        : [...prev, area]
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.fullName.trim()) {
      toast.error("Full name is required")
      return
    }
    if (selectedExpertise.length === 0) {
      toast.error("Please select at least one expertise area")
      return
    }
    if (!formData.yearsOfExp) {
      toast.error("Years of experience is required")
      return
    }

    try {
      setIsSubmitting(true)
      await completeProfile("mentor", {
        fullName: formData.fullName.trim(),
        title: formData.title || undefined,
        company: formData.company || undefined,
        yearsOfExp: Number(formData.yearsOfExp),
        expertiseAreas: selectedExpertise,
        phone: formData.phone || undefined,
        linkedinUrl: formData.linkedinUrl || undefined,
        pricePerSession: formData.pricePerSession || undefined,
      })

      toast.success("Profile completed successfully!")
      navigate("/redirect")
    } catch (error: unknown) {
      toast.error((error as Error).message || "Failed to complete profile")
    } finally {
      setIsSubmitting(false)
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
                <div className="text-center p-4 bg-primary/10 rounded-lg">
                  <p className="text-sm text-muted-foreground">
                    Welcome, {user?.email}! Fields marked with * are required.
                  </p>
                </div>

                {/* Full Name */}
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name *</Label>
                  <Input
                    id="fullName"
                    className="input-premium"
                    placeholder="John Doe"
                    value={formData.fullName}
                    onChange={e => update("fullName", e.target.value)}
                    required
                  />
                </div>

                {/* Title + Company */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      className="input-premium"
                      placeholder="e.g. Senior Engineer"
                      value={formData.title}
                      onChange={e => update("title", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="company">Company</Label>
                    <Input
                      id="company"
                      className="input-premium"
                      placeholder="e.g. Google"
                      value={formData.company}
                      onChange={e => update("company", e.target.value)}
                    />
                  </div>
                </div>

                {/* Years of Exp + Price per Session */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="yearsOfExp">Years of Experience *</Label>
                    <Input
                      id="yearsOfExp"
                      type="number"
                      min="0"
                      max="50"
                      className="input-premium"
                      placeholder="e.g. 5"
                      value={formData.yearsOfExp}
                      onChange={e => update("yearsOfExp", e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="pricePerSession">Price per Session</Label>
                    <Input
                      id="pricePerSession"
                      type="number"
                      min="0"
                      className="input-premium"
                      placeholder="e.g. 500"
                      value={formData.pricePerSession}
                      onChange={e => update("pricePerSession", e.target.value)}
                    />
                  </div>
                </div>

                {/* Phone + Location */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      type="tel"
                      className="input-premium"
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={e => update("phone", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Location</Label>
                    <Select value={formData.location} onValueChange={v => update("location", v)}>
                      <SelectTrigger className="input-premium">
                        <SelectValue placeholder="Select city" />
                      </SelectTrigger>
                      <SelectContent>
                        {indianCities.map(city => (
                          <SelectItem key={city} value={city}>{city}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* LinkedIn */}
                <div className="space-y-2">
                  <Label htmlFor="linkedinUrl">LinkedIn URL</Label>
                  <Input
                    id="linkedinUrl"
                    className="input-premium"
                    placeholder="https://linkedin.com/in/..."
                    value={formData.linkedinUrl}
                    onChange={e => update("linkedinUrl", e.target.value)}
                  />
                </div>

                {/* Expertise Areas */}
                <div className="space-y-3">
                  <Label>Expertise Areas * (Select all that apply)</Label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {expertiseOptions.map(area => (
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

                <Button type="submit" className="w-full btn-hero" disabled={isSubmitting}>
                  {isSubmitting ? "Saving..." : "Complete Profile"}
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
