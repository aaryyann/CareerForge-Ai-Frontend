"use client"

import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Plus, Search, Edit2, Trash2, Eye, MapPin, Briefcase,
  DollarSign, Users, Clock, Pause, Play, X, Loader2,
  ArrowLeft, ArrowRight, Check, FileText, IndianRupee,
  CalendarDays, Building2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog, DialogContent, DialogDescription, DialogFooter,
  DialogHeader, DialogTitle,
} from "@/components/ui/dialog"
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select"
import { Navbar } from "@/components/layout"
import { jobsApi } from "@/api"
import type { Job, CreateJobPayload, JobType, WorkType } from "@/api"
import { indianCities } from "@/constants/locations"
import { toast } from "sonner"

const jobTypeOptions: { value: JobType; label: string }[] = [
  { value: "full_time", label: "Full Time" },
  { value: "part_time", label: "Part Time" },
  { value: "contract", label: "Contract" },
  { value: "internship", label: "Internship" },
]

const workTypeOptions: { value: WorkType; label: string }[] = [
  { value: "remote", label: "Remote" },
  { value: "hybrid", label: "Hybrid" },
  { value: "onsite", label: "On-site" },
]

const FORM_STEPS = [
  { id: 1, label: "Role", icon: Briefcase },
  { id: 2, label: "Details", icon: FileText },
  { id: 3, label: "Compensation", icon: IndianRupee },
]

const emptyForm: CreateJobPayload = {
  jobTitle: "",
  jobDescription: "",
  jobRequirement: "",
  minExperience: 0,
  maxExperience: undefined,
  minSalary: "",
  maxSalary: "",
  jobLocation: "",
  jobType: undefined,
  workType: undefined,
  openSlots: 1,
  skills: [],
}

function formatJobType(t: string | null) {
  if (!t) return ""
  return t.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())
}

function formatSalary(min: string | null, max: string | null) {
  if (!min && !max) return null
  const fmt = (v: string) => {
    const n = Number(v)
    if (n >= 100000) return `${(n / 100000).toFixed(n % 100000 === 0 ? 0 : 1)}L`
    if (n >= 1000) return `${(n / 1000).toFixed(0)}K`
    return v
  }
  if (min && max) return `₹${fmt(min)} - ₹${fmt(max)}`
  if (min) return `₹${fmt(min)}+`
  return `Up to ₹${fmt(max!)}`
}

function timeAgo(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime()
  const mins = Math.floor(diff / 60000)
  if (mins < 60) return `${mins}m ago`
  const hrs = Math.floor(mins / 60)
  if (hrs < 24) return `${hrs}h ago`
  const days = Math.floor(hrs / 24)
  if (days < 30) return `${days}d ago`
  return `${Math.floor(days / 30)}mo ago`
}

export default function JobPostings() {
  const [jobs, setJobs] = useState<Job[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("all")

  const [modalOpen, setModalOpen] = useState(false)
  const [editingJob, setEditingJob] = useState<Job | null>(null)
  const [form, setForm] = useState<CreateJobPayload>({ ...emptyForm })
  const [formStep, setFormStep] = useState(1)
  const [skillInput, setSkillInput] = useState("")
  const [submitting, setSubmitting] = useState(false)

  const [viewJob, setViewJob] = useState<Job | null>(null)
  const [viewOpen, setViewOpen] = useState(false)
  const [viewLoading, setViewLoading] = useState(false)

  const [deleteId, setDeleteId] = useState<string | null>(null)

  const fetchJobs = useCallback(async () => {
    try {
      setLoading(true)
      const params: Record<string, string> = {}
      if (searchTerm) params.search = searchTerm
      if (activeTab !== "all") params.status = activeTab
      const res = await jobsApi.getAll(params)
      setJobs(res.data)
    } catch {
      toast.error("Failed to load jobs")
    } finally {
      setLoading(false)
    }
  }, [searchTerm, activeTab])

  useEffect(() => {
    fetchJobs()
  }, [fetchJobs])

  const openCreate = () => {
    setEditingJob(null)
    setForm({ ...emptyForm })
    setSkillInput("")
    setFormStep(1)
    setModalOpen(true)
  }

  const openEdit = async (job: Job) => {
    try {
      const res = await jobsApi.getById(job.id)
      const j = res.data
      setEditingJob(j)
      setForm({
        jobTitle: j.jobTitle,
        jobDescription: j.jobDescription,
        jobRequirement: j.jobRequirement || "",
        minExperience: j.minExperience ?? 0,
        maxExperience: j.maxExperience ?? undefined,
        minSalary: j.minSalary || "",
        maxSalary: j.maxSalary || "",
        jobLocation: j.jobLocation || "",
        jobType: j.jobType ?? undefined,
        workType: j.workType ?? undefined,
        openSlots: j.openSlots ?? 1,
        skills: j.skills || [],
      })
      setSkillInput("")
      setFormStep(1)
      setModalOpen(true)
    } catch {
      toast.error("Failed to load job details")
    }
  }

  const openView = async (job: Job) => {
    try {
      setViewLoading(true)
      setViewOpen(true)
      const res = await jobsApi.getById(job.id)
      setViewJob(res.data)
    } catch {
      toast.error("Failed to load job details")
      setViewOpen(false)
    } finally {
      setViewLoading(false)
    }
  }

  const handleSubmit = async () => {
    if (!form.jobTitle?.trim()) {
      toast.error("Job title is required")
      setFormStep(1)
      return
    }
    if (!form.jobDescription?.trim()) {
      toast.error("Job description is required")
      setFormStep(2)
      return
    }

    try {
      setSubmitting(true)
      if (editingJob) {
        await jobsApi.update(editingJob.id, form)
        toast.success("Job updated successfully")
      } else {
        await jobsApi.create(form)
        toast.success("Job posted successfully")
      }
      setModalOpen(false)
      fetchJobs()
    } catch (err: unknown) {
      toast.error((err as Error).message || "Failed to save job")
    } finally {
      setSubmitting(false)
    }
  }

  const handleToggle = async (job: Job) => {
    try {
      await jobsApi.toggleActive(job.id)
      toast.success(job.isActive ? "Job paused" : "Job activated")
      fetchJobs()
    } catch {
      toast.error("Failed to update job status")
    }
  }

  const handleDelete = async () => {
    if (!deleteId) return
    try {
      await jobsApi.delete(deleteId)
      toast.success("Job deleted")
      setDeleteId(null)
      fetchJobs()
    } catch {
      toast.error("Failed to delete job")
    }
  }

  const addSkill = () => {
    const s = skillInput.trim()
    if (!s) return
    if (form.skills?.includes(s)) {
      toast.error("Skill already added")
      return
    }
    setForm(prev => ({ ...prev, skills: [...(prev.skills || []), s] }))
    setSkillInput("")
  }

  const removeSkill = (skill: string) => {
    setForm(prev => ({
      ...prev,
      skills: (prev.skills || []).filter(s => s !== skill),
    }))
  }

  const updateForm = (field: string, value: unknown) => {
    setForm(prev => ({ ...prev, [field]: value }))
  }

  const handleNextStep = () => {
    if (formStep === 1 && !form.jobTitle?.trim()) {
      toast.error("Job title is required")
      return
    }
    if (formStep === 2 && !form.jobDescription?.trim()) {
      toast.error("Job description is required")
      return
    }
    setFormStep(prev => Math.min(prev + 1, 3))
  }

  const filteredJobs = jobs

  const activeCount = jobs.filter(j => j.isActive).length
  const pausedCount = jobs.filter(j => !j.isActive).length
  const totalApps = jobs.reduce((sum, j) => sum + (j.applicationCount || 0), 0)

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="mx-auto w-[92%] max-w-6xl py-8 pt-24">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Job Postings</h1>
            <p className="text-muted-foreground text-sm mt-1">
              Manage your job listings and track applications
            </p>
          </div>
          <Button className="btn-hero" onClick={openCreate}>
            <Plus className="h-4 w-4 mr-2" />
            Post New Job
          </Button>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-8">
          {[
            { label: "Total Jobs", value: jobs.length, icon: Briefcase, color: "text-primary/50" },
            { label: "Active", value: activeCount, icon: Play, color: "text-green-500/50" },
            { label: "Paused", value: pausedCount, icon: Pause, color: "text-yellow-500/50" },
            { label: "Applications", value: totalApps, icon: Users, color: "text-blue-500/50" },
          ].map((stat) => (
            <Card key={stat.label} className="card-premium">
              <CardContent className="p-4 md:p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs md:text-sm text-muted-foreground">{stat.label}</p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                  </div>
                  <stat.icon className={`h-7 w-7 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mb-6">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search job postings..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList>
            <TabsTrigger value="all">All ({jobs.length})</TabsTrigger>
            <TabsTrigger value="active">Active ({activeCount})</TabsTrigger>
            <TabsTrigger value="paused">Paused ({pausedCount})</TabsTrigger>
          </TabsList>

          {["all", "active", "paused"].map((tab) => (
            <TabsContent key={tab} value={tab} className="space-y-3">
              {loading ? (
                <div className="flex justify-center py-12">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
              ) : filteredJobs.length === 0 ? (
                <Card className="card-premium">
                  <CardContent className="py-12 text-center">
                    <Briefcase className="h-12 w-12 mx-auto text-muted-foreground/40 mb-4" />
                    <h3 className="text-lg font-semibold mb-2">No jobs found</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      {searchTerm
                        ? "Try a different search term"
                        : "Post your first job to start finding candidates"}
                    </p>
                    {!searchTerm && (
                      <Button onClick={openCreate} className="btn-hero">
                        <Plus className="h-4 w-4 mr-2" />
                        Post New Job
                      </Button>
                    )}
                  </CardContent>
                </Card>
              ) : (
                filteredJobs.map((job, index) => (
                  <motion.div
                    key={job.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.03 }}
                  >
                    <Card className="card-premium hover:border-primary/30 transition-colors">
                      <CardContent className="p-4 md:p-5">
                        <div className="flex justify-between items-start gap-3">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                              <h3 className="text-base font-semibold truncate">{job.jobTitle}</h3>
                              <Badge
                                variant={job.isActive ? "default" : "secondary"}
                                className={`text-[0.65rem] px-1.5 py-0 ${
                                  job.isActive
                                    ? "bg-green-500/10 text-green-500 border-green-500/20"
                                    : "bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
                                }`}
                              >
                                {job.isActive ? "Active" : "Paused"}
                              </Badge>
                            </div>
                            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1.5 text-xs text-muted-foreground">
                              {job.companyName && (
                                <span className="flex items-center gap-1">
                                  <Building2 className="h-3 w-3" />
                                  {job.companyName}
                                </span>
                              )}
                              {job.jobLocation && (
                                <span className="flex items-center gap-1">
                                  <MapPin className="h-3 w-3" />
                                  {job.jobLocation}
                                </span>
                              )}
                              {job.jobType && (
                                <Badge variant="outline" className="text-[0.6rem] px-1.5 py-0 h-4">
                                  {formatJobType(job.jobType)}
                                </Badge>
                              )}
                              {job.workType && (
                                <Badge variant="outline" className="text-[0.6rem] px-1.5 py-0 h-4">
                                  {formatJobType(job.workType)}
                                </Badge>
                              )}
                            </div>
                            <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-xs text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <Users className="h-3 w-3" />
                                {job.applicationCount || 0} apps
                              </span>
                              {formatSalary(job.minSalary, job.maxSalary) && (
                                <span className="flex items-center gap-1">
                                  <IndianRupee className="h-3 w-3" />
                                  {formatSalary(job.minSalary, job.maxSalary)}
                                </span>
                              )}
                              {(job.minExperience != null || job.maxExperience != null) && (
                                <span className="flex items-center gap-1">
                                  <Briefcase className="h-3 w-3" />
                                  {job.minExperience ?? 0}
                                  {job.maxExperience != null ? `-${job.maxExperience}` : "+"} yrs
                                </span>
                              )}
                              <span className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {timeAgo(job.createdAt)}
                              </span>
                            </div>
                          </div>
                          <div className="flex gap-1.5 shrink-0">
                            <Button size="sm" variant="ghost" className="h-8 w-8 p-0" onClick={() => openView(job)}>
                              <Eye className="h-3.5 w-3.5" />
                            </Button>
                            <Button size="sm" variant="ghost" className="h-8 w-8 p-0" onClick={() => openEdit(job)}>
                              <Edit2 className="h-3.5 w-3.5" />
                            </Button>
                            <Button size="sm" variant="ghost" className="h-8 w-8 p-0" onClick={() => handleToggle(job)}>
                              {job.isActive ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                              onClick={() => setDeleteId(job.id)}
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))
              )}
            </TabsContent>
          ))}
        </Tabs>
      </div>

      {/* Create/Edit Modal — 3-step wizard */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader className="pb-2">
            <DialogTitle className="text-xl">
              {editingJob ? "Edit Job Posting" : "Post New Job"}
            </DialogTitle>
            <DialogDescription className="text-sm">
              {editingJob ? "Update your job listing" : "Create a new job posting"}
            </DialogDescription>

            {/* Step indicator */}
            <div className="flex items-center justify-center gap-0 mt-4 px-2">
              {FORM_STEPS.map((s, i) => (
                <div key={s.id} className="flex items-center">
                  <button
                    type="button"
                    onClick={() => s.id < formStep && setFormStep(s.id)}
                    className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[0.7rem] font-medium transition-all ${
                      formStep === s.id
                        ? "bg-primary text-primary-foreground"
                        : formStep > s.id
                        ? "bg-green-500/15 text-green-500 cursor-pointer"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {formStep > s.id ? (
                      <Check className="h-3 w-3" />
                    ) : (
                      <s.icon className="h-3 w-3" />
                    )}
                    {s.label}
                  </button>
                  {i < FORM_STEPS.length - 1 && (
                    <div className={`w-6 h-px mx-1 ${
                      formStep > s.id ? "bg-green-500/40" : "bg-border/40"
                    }`} />
                  )}
                </div>
              ))}
            </div>
          </DialogHeader>

          <AnimatePresence mode="wait">
            {/* Step 1: Role Details */}
            {formStep === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -15 }}
                transition={{ duration: 0.2 }}
                className="space-y-4 py-2"
              >
                <div className="space-y-1.5">
                  <Label className="text-sm">Job Title <span className="text-red-400">*</span></Label>
                  <Input
                    placeholder="e.g. Senior Software Engineer"
                    value={form.jobTitle}
                    onChange={e => updateForm("jobTitle", e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <Label className="text-sm">Job Type</Label>
                    <Select value={form.jobType || ""} onValueChange={v => updateForm("jobType", v || undefined)}>
                      <SelectTrigger className="text-sm">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        {jobTypeOptions.map(opt => (
                          <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-sm">Work Type</Label>
                    <Select value={form.workType || ""} onValueChange={v => updateForm("workType", v || undefined)}>
                      <SelectTrigger className="text-sm">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        {workTypeOptions.map(opt => (
                          <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label className="text-sm">Location</Label>
                  <Select value={form.jobLocation || ""} onValueChange={v => updateForm("jobLocation", v || undefined)}>
                    <SelectTrigger>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                        <SelectValue placeholder="Select location" />
                      </div>
                    </SelectTrigger>
                    <SelectContent>
                      {indianCities.map(city => (
                        <SelectItem key={city} value={city}>{city}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-1.5">
                  <Label className="text-sm">Open Slots</Label>
                  <Input
                    type="number"
                    min="1"
                    value={form.openSlots ?? 1}
                    onChange={e => updateForm("openSlots", Number(e.target.value) || 1)}
                  />
                </div>

                <Button className="w-full btn-hero h-10" onClick={handleNextStep} disabled={!form.jobTitle?.trim()}>
                  Continue <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </motion.div>
            )}

            {/* Step 2: Description & Skills */}
            {formStep === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 15 }}
                transition={{ duration: 0.2 }}
                className="space-y-4 py-2"
              >
                <div className="space-y-1.5">
                  <Label className="text-sm">Job Description <span className="text-red-400">*</span></Label>
                  <Textarea
                    className="min-h-[6rem] text-sm"
                    placeholder="Describe the role, responsibilities, and what makes it exciting..."
                    value={form.jobDescription}
                    onChange={e => updateForm("jobDescription", e.target.value)}
                  />
                </div>

                <div className="space-y-1.5">
                  <Label className="text-sm">Requirements</Label>
                  <Textarea
                    className="min-h-[4.5rem] text-sm"
                    placeholder="List the key qualifications and requirements..."
                    value={form.jobRequirement}
                    onChange={e => updateForm("jobRequirement", e.target.value)}
                  />
                </div>

                <div className="space-y-1.5">
                  <Label className="text-sm">Required Skills</Label>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Type a skill and press Enter"
                      className="text-sm"
                      value={skillInput}
                      onChange={e => setSkillInput(e.target.value)}
                      onKeyDown={e => {
                        if (e.key === "Enter") {
                          e.preventDefault()
                          addSkill()
                        }
                      }}
                    />
                    <Button type="button" variant="outline" size="sm" className="shrink-0 h-auto" onClick={addSkill}>
                      Add
                    </Button>
                  </div>
                  {form.skills && form.skills.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {form.skills.map(skill => (
                        <Badge
                          key={skill}
                          variant="secondary"
                          className="cursor-pointer hover:bg-destructive/20 text-xs"
                          onClick={() => removeSkill(skill)}
                        >
                          {skill}
                          <X className="h-2.5 w-2.5 ml-1" />
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex gap-3">
                  <Button variant="outline" className="h-10 px-4" onClick={() => setFormStep(1)}>
                    <ArrowLeft className="h-4 w-4" />
                  </Button>
                  <Button className="flex-1 btn-hero h-10" onClick={handleNextStep} disabled={!form.jobDescription?.trim()}>
                    Continue <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              </motion.div>
            )}

            {/* Step 3: Compensation & Experience */}
            {formStep === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 15 }}
                transition={{ duration: 0.2 }}
                className="space-y-4 py-2"
              >
                <div className="space-y-1.5">
                  <Label className="text-sm">Experience (years)</Label>
                  <div className="grid grid-cols-2 gap-3">
                    <Input
                      type="number"
                      min="0"
                      placeholder="Min"
                      value={form.minExperience ?? ""}
                      onChange={e => updateForm("minExperience", e.target.value ? Number(e.target.value) : 0)}
                    />
                    <Input
                      type="number"
                      min="0"
                      placeholder="Max"
                      value={form.maxExperience ?? ""}
                      onChange={e => updateForm("maxExperience", e.target.value ? Number(e.target.value) : undefined)}
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label className="text-sm">Salary Range (₹ per year)</Label>
                  <div className="grid grid-cols-2 gap-3">
                    <Input
                      type="number"
                      min="0"
                      placeholder="e.g. 600000"
                      value={form.minSalary ?? ""}
                      onChange={e => updateForm("minSalary", e.target.value)}
                    />
                    <Input
                      type="number"
                      min="0"
                      placeholder="e.g. 1500000"
                      value={form.maxSalary ?? ""}
                      onChange={e => updateForm("maxSalary", e.target.value)}
                    />
                  </div>
                  {(form.minSalary || form.maxSalary) && (
                    <p className="text-xs text-muted-foreground mt-1">
                      Displays as: {formatSalary(form.minSalary || null, form.maxSalary || null) || "—"}
                    </p>
                  )}
                </div>

                <div className="flex gap-3 pt-2">
                  <Button variant="outline" className="h-10 px-4" onClick={() => setFormStep(2)}>
                    <ArrowLeft className="h-4 w-4" />
                  </Button>
                  <Button
                    className="flex-1 btn-hero h-10"
                    onClick={handleSubmit}
                    disabled={submitting}
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Saving...
                      </>
                    ) : editingJob ? "Update Job" : "Post Job"}
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </DialogContent>
      </Dialog>

      {/* View Job Dialog */}
      <Dialog open={viewOpen} onOpenChange={setViewOpen}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          {viewLoading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : viewJob ? (
            <>
              <DialogHeader>
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <DialogTitle className="text-xl">{viewJob.jobTitle}</DialogTitle>
                    <DialogDescription className="text-sm mt-1">
                      {viewJob.companyName || "Your Company"}
                    </DialogDescription>
                  </div>
                  <Badge
                    variant={viewJob.isActive ? "default" : "secondary"}
                    className={`shrink-0 text-xs ${
                      viewJob.isActive
                        ? "bg-green-500/10 text-green-500 border-green-500/20"
                        : "bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
                    }`}
                  >
                    {viewJob.isActive ? "Active" : "Paused"}
                  </Badge>
                </div>
              </DialogHeader>

              <div className="space-y-4 py-2">
                <div className="flex flex-wrap gap-2">
                  {viewJob.jobType && (
                    <Badge variant="outline" className="text-xs">
                      <Briefcase className="h-3 w-3 mr-1" />
                      {formatJobType(viewJob.jobType)}
                    </Badge>
                  )}
                  {viewJob.workType && (
                    <Badge variant="outline" className="text-xs">
                      {formatJobType(viewJob.workType)}
                    </Badge>
                  )}
                  {viewJob.jobLocation && (
                    <Badge variant="outline" className="text-xs">
                      <MapPin className="h-3 w-3 mr-1" />
                      {viewJob.jobLocation}
                    </Badge>
                  )}
                  {formatSalary(viewJob.minSalary, viewJob.maxSalary) && (
                    <Badge variant="outline" className="text-xs">
                      <IndianRupee className="h-3 w-3 mr-1" />
                      {formatSalary(viewJob.minSalary, viewJob.maxSalary)}
                    </Badge>
                  )}
                  {(viewJob.minExperience != null || viewJob.maxExperience != null) && (
                    <Badge variant="outline" className="text-xs">
                      {viewJob.minExperience ?? 0}
                      {viewJob.maxExperience != null ? `-${viewJob.maxExperience}` : "+"} yrs
                    </Badge>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-secondary/20 rounded-lg p-3">
                    <p className="text-xs text-muted-foreground">Applications</p>
                    <p className="text-lg font-semibold">{viewJob.applicationCount || 0}</p>
                  </div>
                  <div className="bg-secondary/20 rounded-lg p-3">
                    <p className="text-xs text-muted-foreground">Open Slots</p>
                    <p className="text-lg font-semibold">{viewJob.openSlots || 1}</p>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-semibold mb-1.5">Description</h4>
                  <p className="text-xs text-muted-foreground whitespace-pre-wrap leading-relaxed">
                    {viewJob.jobDescription}
                  </p>
                </div>

                {viewJob.jobRequirement && (
                  <div>
                    <h4 className="text-sm font-semibold mb-1.5">Requirements</h4>
                    <p className="text-xs text-muted-foreground whitespace-pre-wrap leading-relaxed">
                      {viewJob.jobRequirement}
                    </p>
                  </div>
                )}

                {viewJob.skills && viewJob.skills.length > 0 && (
                  <div>
                    <h4 className="text-sm font-semibold mb-1.5">Required Skills</h4>
                    <div className="flex flex-wrap gap-1.5">
                      {viewJob.skills.map(skill => (
                        <Badge key={skill} variant="secondary" className="text-xs">{skill}</Badge>
                      ))}
                    </div>
                  </div>
                )}

                <p className="text-[0.65rem] text-muted-foreground">
                  Posted {timeAgo(viewJob.createdAt)}
                </p>
              </div>
            </>
          ) : null}
        </DialogContent>
      </Dialog>

      {/* Delete confirmation */}
      <AlertDialog open={!!deleteId} onOpenChange={(open) => !open && setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Job Posting?</AlertDialogTitle>
            <AlertDialogDescription className="text-sm">
              This will permanently delete this job posting and remove all associated skill
              requirements. Applications will not be affected.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
