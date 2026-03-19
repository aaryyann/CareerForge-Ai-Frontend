"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useNavigate, Link } from "react-router-dom"
import {
  ArrowLeft,
  ArrowRight,
  User,
  Building2,
  Check,
  Briefcase,
  Phone,
  MapPin,
  Globe,
  LinkedinIcon,
} from "lucide-react"
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

const STEPS = [
  { id: 1, label: "About You", icon: User },
  { id: 2, label: "Company", icon: Building2 },
]

export default function RecruiterRegister() {
  const navigate = useNavigate()
  const { completeProfile } = useAuth()
  const [step, setStep] = useState(1)
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
    companyLinkedinIconUrl: "",
  })

  const update = (field: string, value: string) =>
    setFormData(prev => ({ ...prev, [field]: value }))

  const canProceedStep1 = formData.fullName.trim() && formData.position.trim()
  const canSubmit = canProceedStep1 && formData.companyName.trim()

  const handleNext = () => {
    if (!formData.fullName.trim()) {
      toast.error("Full name is required")
      return
    }
    if (!formData.position.trim()) {
      toast.error("Position is required")
      return
    }
    setStep(2)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.companyName.trim()) {
      toast.error("Company name is required")
      return
    }

    try {
      setIsSubmitting(true)
      await completeProfile("recruiter", {
        fullName: formData.fullName.trim(),
        position: formData.position.trim(),
        phone: formData.phone || undefined,
        jobLocation: formData.jobLocation || undefined,
        companyName: formData.companyName.trim(),
        companyWebsite: formData.companyWebsite || undefined,
        companyIndustry: formData.companyIndustry || undefined,
        companySize: formData.companySize || undefined,
        companyHqLocation: formData.companyHqLocation || undefined,
        companyDescription: formData.companyDescription || undefined,
        companyLinkedinIconUrl: formData.companyLinkedinIconUrl || undefined,
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

      <div className="flex min-h-screen items-center justify-center px-4 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-lg"
        >
          <Card className="card-premium">
            <CardHeader className="pb-4">
              <CardTitle className="text-2xl md:text-3xl font-bold text-center">
                Complete Your <span className="hero-text">Recruiter</span> Profile
              </CardTitle>
              <CardDescription className="text-center text-sm md:text-base">
                Find top talent with AI-powered insights
              </CardDescription>

              {/* Step indicator */}
              <div className="flex items-center justify-center gap-0 mt-6 px-4">
                {STEPS.map((s, i) => (
                  <div key={s.id} className="flex items-center">
                    <button
                      type="button"
                      onClick={() => s.id < step && setStep(s.id)}
                      className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                        step === s.id
                          ? "bg-primary text-primary-foreground"
                          : step > s.id
                          ? "bg-green-500/15 text-green-500 cursor-pointer"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {step > s.id ? (
                        <Check className="h-3.5 w-3.5" />
                      ) : (
                        <s.icon className="h-3.5 w-3.5" />
                      )}
                      {s.label}
                    </button>
                    {i < STEPS.length - 1 && (
                      <div className={`w-10 h-px mx-1.5 ${
                        step > s.id ? "bg-green-500/40" : "bg-border/40"
                      }`} />
                    )}
                  </div>
                ))}
              </div>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmit}>
                <AnimatePresence mode="wait">
                  {step === 1 && (
                    <motion.div
                      key="step1"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.25 }}
                      className="space-y-5"
                    >
                      {/* fullName → recruiter_profiles.full_name */}
                      <div className="space-y-1.5">
                        <Label htmlFor="fullName" className="text-sm">
                          Full Name <span className="text-red-400">*</span>
                        </Label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="fullName"
                            className="input-premium pl-10"
                            placeholder="Your full name"
                            value={formData.fullName}
                            onChange={e => update("fullName", e.target.value)}
                          />
                        </div>
                      </div>

                      {/* position → recruiter_profiles.position */}
                      <div className="space-y-1.5">
                        <Label htmlFor="position" className="text-sm">
                          Position / Title <span className="text-red-400">*</span>
                        </Label>
                        <div className="relative">
                          <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="position"
                            className="input-premium pl-10"
                            placeholder="e.g. Talent Acquisition Lead"
                            value={formData.position}
                            onChange={e => update("position", e.target.value)}
                          />
                        </div>
                      </div>

                      {/* phone → recruiter_profiles.phone */}
                      <div className="space-y-1.5">
                        <Label htmlFor="phone" className="text-sm">Phone</Label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="phone"
                            type="tel"
                            className="input-premium pl-10"
                            placeholder="+91 98765 43210"
                            value={formData.phone}
                            onChange={e => update("phone", e.target.value)}
                          />
                        </div>
                      </div>

                      {/* jobLocation → recruiter_profiles.job_location */}
                      <div className="space-y-1.5">
                        <Label className="text-sm">Hiring Location</Label>
                        <Select value={formData.jobLocation} onValueChange={v => update("jobLocation", v)}>
                          <SelectTrigger className="input-premium">
                            <div className="flex items-center gap-2">
                              <MapPin className="h-4 w-4 text-muted-foreground shrink-0" />
                              <SelectValue placeholder="Where are you hiring?" />
                            </div>
                          </SelectTrigger>
                          <SelectContent>
                            {indianCities.map(city => (
                              <SelectItem key={city} value={city}>{city}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <Button
                        type="button"
                        className="w-full btn-hero h-11"
                        onClick={handleNext}
                        disabled={!canProceedStep1}
                      >
                        Continue
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Button>
                    </motion.div>
                  )}

                  {step === 2 && (
                    <motion.div
                      key="step2"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.25 }}
                      className="space-y-5"
                    >
                      {/* companyName → companies.name */}
                      <div className="space-y-1.5">
                        <Label htmlFor="companyName" className="text-sm">
                          Company Name <span className="text-red-400">*</span>
                        </Label>
                        <div className="relative">
                          <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="companyName"
                            className="input-premium pl-10"
                            placeholder="e.g. Acme Corp"
                            value={formData.companyName}
                            onChange={e => update("companyName", e.target.value)}
                          />
                        </div>
                      </div>

                      {/* companyIndustry → companies.industry | companySize → companies.company_size */}
                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1.5">
                          <Label className="text-sm">Industry</Label>
                          <Select value={formData.companyIndustry} onValueChange={v => update("companyIndustry", v)}>
                            <SelectTrigger className="input-premium text-sm">
                              <SelectValue placeholder="Select" />
                            </SelectTrigger>
                            <SelectContent>
                              {industries.map(ind => (
                                <SelectItem key={ind} value={ind}>{ind}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-1.5">
                          <Label className="text-sm">Company Size</Label>
                          <Select value={formData.companySize} onValueChange={v => update("companySize", v)}>
                            <SelectTrigger className="input-premium text-sm">
                              <SelectValue placeholder="Select" />
                            </SelectTrigger>
                            <SelectContent>
                              {companySizes.map(opt => (
                                <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      {/* companyHqLocation → companies.hq_location */}
                      <div className="space-y-1.5">
                        <Label className="text-sm">HQ Location</Label>
                        <Select value={formData.companyHqLocation} onValueChange={v => update("companyHqLocation", v)}>
                          <SelectTrigger className="input-premium">
                            <div className="flex items-center gap-2">
                              <MapPin className="h-4 w-4 text-muted-foreground shrink-0" />
                              <SelectValue placeholder="Company headquarters" />
                            </div>
                          </SelectTrigger>
                          <SelectContent>
                            {indianCities.map(city => (
                              <SelectItem key={city} value={city}>{city}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      {/* companyWebsite → companies.website | companyLinkedinIconUrl → companies.linkedin_url */}
                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1.5">
                          <Label htmlFor="companyWebsite" className="text-sm">Website</Label>
                          <div className="relative">
                            <Globe className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                              id="companyWebsite"
                              className="input-premium pl-10 text-sm"
                              placeholder="https://company.com"
                              value={formData.companyWebsite}
                              onChange={e => update("companyWebsite", e.target.value)}
                            />
                          </div>
                        </div>
                        <div className="space-y-1.5">
                          <Label htmlFor="companyLinkedinIconUrl" className="text-sm">LinkedIn</Label>
                          <div className="relative">
                            <LinkedinIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                              id="companyLinkedinIconUrl"
                              className="input-premium pl-10 text-sm"
                              placeholder="linkedin.com/company/..."
                              value={formData.companyLinkedinIconUrl}
                              onChange={e => update("companyLinkedinIconUrl", e.target.value)}
                            />
                          </div>
                        </div>
                      </div>

                      {/* companyDescription → companies.description */}
                      <div className="space-y-1.5">
                        <Label htmlFor="companyDescription" className="text-sm">About the Company</Label>
                        <Textarea
                          id="companyDescription"
                          className="input-premium min-h-[5rem] text-sm"
                          placeholder="Brief description — culture, what you're hiring for..."
                          value={formData.companyDescription}
                          onChange={e => update("companyDescription", e.target.value)}
                        />
                      </div>

                      <div className="flex gap-3">
                        <Button
                          type="button"
                          variant="outline"
                          className="h-11 px-4"
                          onClick={() => setStep(1)}
                        >
                          <ArrowLeft className="h-4 w-4" />
                        </Button>
                        <Button
                          type="submit"
                          className="flex-1 btn-hero h-11"
                          disabled={isSubmitting || !canSubmit}
                        >
                          {isSubmitting ? "Setting up..." : "Complete Profile"}
                        </Button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </form>

              <div className="mt-5 text-center">
                <Link
                  to="/choose-role"
                  className="inline-flex items-center text-xs text-muted-foreground hover:text-foreground transition-colors"
                >
                  <ArrowLeft className="h-3 w-3 mr-1.5" />
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
