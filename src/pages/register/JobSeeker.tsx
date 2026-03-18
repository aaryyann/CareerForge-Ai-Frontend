"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useNavigate, Link } from "react-router-dom"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Navbar } from "@/components/layout"
import { useAuth } from "@/hooks/useAuth"
import { toast } from "sonner"
import { indianCities } from "@/constants/locations"

const experienceLevels = [
  { value: "entry", label: "Entry Level (0-1 years)" },
  { value: "junior", label: "Junior (1-3 years)" },
  { value: "mid", label: "Mid Level (3-5 years)" },
  { value: "senior", label: "Senior (5-10 years)" },
  { value: "lead", label: "Lead / Staff (10+ years)" },
]

const workTypes = [
  { value: "remote", label: "Remote" },
  { value: "hybrid", label: "Hybrid" },
  { value: "onsite", label: "On-site" },
]

export default function JobSeekerRegister() {
  const navigate = useNavigate()
  const { completeProfile, user } = useAuth()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    fullName: "",
    bio: "",
    yearOfExp: "",
    currentTitle: "",
    experienceLevel: "",
    rolePreference: "",
    linkedinUrl: "",
    githubUrl: "",
    phone: "",
    claimedLocation: "",
    workTypePref: "" as "" | "remote" | "hybrid" | "onsite",
    salaryExpMin: "",
    salaryExpMax: "",
    willingToRelocate: false,
  })

  const update = (field: string, value: string | boolean) =>
    setFormData(prev => ({ ...prev, [field]: value }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.fullName.trim()) {
      toast.error("Full name is required")
      return
    }

    try {
      setIsSubmitting(true)
      await completeProfile("job_seeker", {
        fullName: formData.fullName.trim(),
        bio: formData.bio || undefined,
        yearOfExp: formData.yearOfExp ? Number(formData.yearOfExp) : undefined,
        currentTitle: formData.currentTitle || undefined,
        experienceLevel: formData.experienceLevel || undefined,
        rolePreference: formData.rolePreference || undefined,
        linkedinUrl: formData.linkedinUrl || undefined,
        githubUrl: formData.githubUrl || undefined,
        phone: formData.phone || undefined,
        claimedLocation: formData.claimedLocation || undefined,
        workTypePref: formData.workTypePref || undefined,
        salaryExpMin: formData.salaryExpMin || undefined,
        salaryExpMax: formData.salaryExpMax || undefined,
        willingToRelocate: formData.willingToRelocate,
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
                Complete Your <span className="hero-text">Job Seeker</span> Profile
              </CardTitle>
              <CardDescription className="text-lg">
                Tell us about yourself to find the perfect career opportunities
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

                {/* Bio */}
                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    className="input-premium min-h-[100px]"
                    placeholder="Tell us about yourself, your career goals, and what you're looking for..."
                    value={formData.bio}
                    onChange={e => update("bio", e.target.value)}
                  />
                </div>

                {/* Current Title + Experience Level */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="currentTitle">Current Title</Label>
                    <Input
                      id="currentTitle"
                      className="input-premium"
                      placeholder="e.g. Software Engineer"
                      value={formData.currentTitle}
                      onChange={e => update("currentTitle", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Experience Level</Label>
                    <Select value={formData.experienceLevel} onValueChange={v => update("experienceLevel", v)}>
                      <SelectTrigger className="input-premium">
                        <SelectValue placeholder="Select level" />
                      </SelectTrigger>
                      <SelectContent>
                        {experienceLevels.map(opt => (
                          <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Years of Exp + Role Preference */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="yearOfExp">Years of Experience</Label>
                    <Input
                      id="yearOfExp"
                      type="number"
                      min="0"
                      max="50"
                      className="input-premium"
                      placeholder="e.g. 3"
                      value={formData.yearOfExp}
                      onChange={e => update("yearOfExp", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="rolePreference">Preferred Role</Label>
                    <Input
                      id="rolePreference"
                      className="input-premium"
                      placeholder="e.g. Frontend Developer"
                      value={formData.rolePreference}
                      onChange={e => update("rolePreference", e.target.value)}
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
                    <Select value={formData.claimedLocation} onValueChange={v => update("claimedLocation", v)}>
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

                {/* LinkedIn + GitHub */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                  <div className="space-y-2">
                    <Label htmlFor="githubUrl">GitHub URL</Label>
                    <Input
                      id="githubUrl"
                      className="input-premium"
                      placeholder="https://github.com/..."
                      value={formData.githubUrl}
                      onChange={e => update("githubUrl", e.target.value)}
                    />
                  </div>
                </div>

                {/* Work Preference */}
                <div className="space-y-2">
                  <Label>Work Type Preference</Label>
                  <Select value={formData.workTypePref} onValueChange={v => update("workTypePref", v)}>
                    <SelectTrigger className="input-premium">
                      <SelectValue placeholder="Select work type" />
                    </SelectTrigger>
                    <SelectContent>
                      {workTypes.map(opt => (
                        <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Salary Expectation */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="salaryExpMin">Min Salary Expectation</Label>
                    <Input
                      id="salaryExpMin"
                      type="number"
                      min="0"
                      className="input-premium"
                      placeholder="e.g. 600000"
                      value={formData.salaryExpMin}
                      onChange={e => update("salaryExpMin", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="salaryExpMax">Max Salary Expectation</Label>
                    <Input
                      id="salaryExpMax"
                      type="number"
                      min="0"
                      className="input-premium"
                      placeholder="e.g. 1200000"
                      value={formData.salaryExpMax}
                      onChange={e => update("salaryExpMax", e.target.value)}
                    />
                  </div>
                </div>

                {/* Willing to Relocate */}
                <div className="flex items-center justify-between p-4 bg-secondary/20 rounded-lg border border-border/30">
                  <Label htmlFor="willingToRelocate" className="cursor-pointer">
                    Willing to Relocate
                  </Label>
                  <Switch
                    id="willingToRelocate"
                    checked={formData.willingToRelocate}
                    onCheckedChange={v => update("willingToRelocate", v)}
                  />
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
