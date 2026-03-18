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
import { Navbar } from "@/components/layout"
import { useAuth } from "@/hooks/useAuth"
import { toast } from "sonner"
import { indianCities } from "@/constants/locations"

const companySizes = [
  { value: "1-10", label: "1-10 employees" },
  { value: "11-50", label: "11-50 employees" },
  { value: "51-200", label: "51-200 employees" },
  { value: "201-500", label: "201-500 employees" },
  { value: "501-1000", label: "501-1000 employees" },
  { value: "1001-5000", label: "1001-5000 employees" },
  { value: "5000+", label: "5000+ employees" },
]

const industries = [
  "Technology",
  "Finance & Banking",
  "Healthcare",
  "Education",
  "E-commerce",
  "Consulting",
  "Manufacturing",
  "Media & Entertainment",
  "Real Estate",
  "Telecommunications",
  "Automotive",
  "Logistics & Supply Chain",
  "Government",
  "Non-profit",
  "Other",
]

export default function RecruiterRegister() {
  const navigate = useNavigate()
  const { completeProfile, user } = useAuth()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    fullName: "",
    position: "",
    phone: "",
    jobLocation: "",
    companyName: "",
    companyWebsite: "",
    companyIndustry: "",
    companySize: "",
    companyHqLocation: "",
    companyDescription: "",
    companyLinkedinUrl: "",
  })

  const update = (field: string, value: string) =>
    setFormData(prev => ({ ...prev, [field]: value }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.fullName.trim()) {
      toast.error("Full name is required")
      return
    }
    if (!formData.position.trim()) {
      toast.error("Position is required")
      return
    }

    try {
      setIsSubmitting(true)
      await completeProfile("recruiter", {
        fullName: formData.fullName.trim(),
        position: formData.position.trim(),
        phone: formData.phone || undefined,
        jobLocation: formData.jobLocation || undefined,
        companyName: formData.companyName || undefined,
        companyWebsite: formData.companyWebsite || undefined,
        companyIndustry: formData.companyIndustry || undefined,
        companySize: formData.companySize || undefined,
        companyHqLocation: formData.companyHqLocation || undefined,
        companyDescription: formData.companyDescription || undefined,
        companyLinkedinUrl: formData.companyLinkedinUrl || undefined,
      } as any)

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
                Complete Your <span className="hero-text">Recruiter</span> Profile
              </CardTitle>
              <CardDescription className="text-lg">
                Find top talent and build amazing teams with AI-powered insights
              </CardDescription>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="text-center p-4 bg-primary/10 rounded-lg">
                  <p className="text-sm text-muted-foreground">
                    Welcome, {user?.email}! Fields marked with * are required.
                  </p>
                </div>

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

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="position">Position *</Label>
                    <Input
                      id="position"
                      className="input-premium"
                      placeholder="e.g. Talent Acquisition Lead"
                      value={formData.position}
                      onChange={e => update("position", e.target.value)}
                      required
                    />
                  </div>
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
                </div>

                <div className="space-y-2">
                  <Label>Location</Label>
                  <Select value={formData.jobLocation} onValueChange={v => update("jobLocation", v)}>
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

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-border/40" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-card px-3 text-muted-foreground">Company Details</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="companyName">Company Name</Label>
                    <Input
                      id="companyName"
                      className="input-premium"
                      placeholder="e.g. Acme Corp"
                      value={formData.companyName}
                      onChange={e => update("companyName", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="companyWebsite">Company Website</Label>
                    <Input
                      id="companyWebsite"
                      className="input-premium"
                      placeholder="https://company.com"
                      value={formData.companyWebsite}
                      onChange={e => update("companyWebsite", e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Industry</Label>
                    <Select value={formData.companyIndustry} onValueChange={v => update("companyIndustry", v)}>
                      <SelectTrigger className="input-premium">
                        <SelectValue placeholder="Select industry" />
                      </SelectTrigger>
                      <SelectContent>
                        {industries.map(ind => (
                          <SelectItem key={ind} value={ind}>{ind}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Company Size</Label>
                    <Select value={formData.companySize} onValueChange={v => update("companySize", v)}>
                      <SelectTrigger className="input-premium">
                        <SelectValue placeholder="Select size" />
                      </SelectTrigger>
                      <SelectContent>
                        {companySizes.map(opt => (
                          <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>HQ Location</Label>
                    <Select value={formData.companyHqLocation} onValueChange={v => update("companyHqLocation", v)}>
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
                  <div className="space-y-2">
                    <Label htmlFor="companyLinkedinUrl">Company LinkedIn</Label>
                    <Input
                      id="companyLinkedinUrl"
                      className="input-premium"
                      placeholder="https://linkedin.com/company/..."
                      value={formData.companyLinkedinUrl}
                      onChange={e => update("companyLinkedinUrl", e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="companyDescription">Company Description</Label>
                  <Textarea
                    id="companyDescription"
                    className="input-premium min-h-[100px]"
                    placeholder="Brief description of the company, culture, and what you're hiring for..."
                    value={formData.companyDescription}
                    onChange={e => update("companyDescription", e.target.value)}
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
