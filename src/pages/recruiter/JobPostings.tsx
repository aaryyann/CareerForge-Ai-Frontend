"use client"

import { useState, useEffect, useCallback } from "react"
import { motion } from "framer-motion"
import {
  Plus, Search, Edit2, Trash2, Eye, MapPin, Briefcase,
  DollarSign, Users, Clock, Pause, Play, X, Loader2,
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
      return
    }
    if (!form.jobDescription?.trim()) {
      toast.error("Job description is required")
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

  const filteredJobs = jobs

  const activeCount = jobs.filter(j => j.isActive).length
  const pausedCount = jobs.filter(j => !j.isActive).length
  const totalApps = jobs.reduce((sum, j) => sum + (j.applicationCount || 0), 0)

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-6 py-8 pt-20">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Job Postings</h1>
            <p className="text-muted-foreground mt-2">
              Manage your job listings and track applications
            </p>
          </div>
          <Button className="btn-hero" onClick={openCreate}>
            <Plus className="h-4 w-4 mr-2" />
            Post New Job
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card className="card-premium">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Jobs</p>
                  <p className="text-2xl font-bold">{jobs.length}</p>
                </div>
                <Briefcase className="h-8 w-8 text-primary/50" />
              </div>
            </CardContent>
          </Card>
          <Card className="card-premium">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Active</p>
                  <p className="text-2xl font-bold text-green-500">{activeCount}</p>
                </div>
                <Play className="h-8 w-8 text-green-500/50" />
              </div>
            </CardContent>
          </Card>
          <Card className="card-premium">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Paused</p>
                  <p className="text-2xl font-bold text-yellow-500">{pausedCount}</p>
                </div>
                <Pause className="h-8 w-8 text-yellow-500/50" />
              </div>
            </CardContent>
          </Card>
          <Card className="card-premium">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Applications</p>
                  <p className="text-2xl font-bold text-blue-500">{totalApps}</p>
                </div>
                <Users className="h-8 w-8 text-blue-500/50" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex gap-4 mb-6">
          <div className="relative flex-1">
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
            <TabsTrigger value="all">All Jobs ({jobs.length})</TabsTrigger>
            <TabsTrigger value="active">Active ({activeCount})</TabsTrigger>
            <TabsTrigger value="paused">Paused ({pausedCount})</TabsTrigger>
          </TabsList>

          {["all", "active", "paused"].map((tab) => (
            <TabsContent key={tab} value={tab} className="space-y-4">
              {loading ? (
                <div className="flex justify-center py-12">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
              ) : filteredJobs.length === 0 ? (
                <Card className="card-premium">
                  <CardContent className="py-12 text-center">
                    <Briefcase className="h-12 w-12 mx-auto text-muted-foreground/40 mb-4" />
                    <h3 className="text-lg font-semibold mb-2">No jobs found</h3>
                    <p className="text-muted-foreground mb-4">
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
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Card className="card-premium hover:border-primary/30 transition-colors">
                      <CardHeader className="pb-3">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <CardTitle className="text-xl">{job.jobTitle}</CardTitle>
                            <CardDescription className="text-base mt-1 flex flex-wrap items-center gap-2">
                              {job.companyName && <span>{job.companyName}</span>}
                              {job.jobLocation && (
                                <span className="flex items-center gap-1">
                                  <MapPin className="h-3.5 w-3.5" />
                                  {job.jobLocation}
                                </span>
                              )}
                              {job.jobType && (
                                <Badge variant="outline" className="text-xs">
                                  {formatJobType(job.jobType)}
                                </Badge>
                              )}
                              {job.workType && (
                                <Badge variant="outline" className="text-xs">
                                  {formatJobType(job.workType)}
                                </Badge>
                              )}
                            </CardDescription>
                          </div>
                          <Badge
                            variant={job.isActive ? "default" : "secondary"}
                            className={
                              job.isActive
                                ? "bg-green-500/10 text-green-500 border-green-500/20"
                                : "bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
                            }
                          >
                            {job.isActive ? "Active" : "Paused"}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="flex flex-wrap justify-between items-center">
                          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Users className="h-3.5 w-3.5" />
                              {job.applicationCount || 0} applications
                            </span>
                            {formatSalary(job.minSalary, job.maxSalary) && (
                              <span className="flex items-center gap-1">
                                <DollarSign className="h-3.5 w-3.5" />
                                {formatSalary(job.minSalary, job.maxSalary)}
                              </span>
                            )}
                            {(job.minExperience != null || job.maxExperience != null) && (
                              <span className="flex items-center gap-1">
                                <Briefcase className="h-3.5 w-3.5" />
                                {job.minExperience ?? 0}
                                {job.maxExperience != null ? `-${job.maxExperience}` : "+"} yrs
                              </span>
                            )}
                            <span className="flex items-center gap-1">
                              <Clock className="h-3.5 w-3.5" />
                              {timeAgo(job.createdAt)}
                            </span>
                          </div>
                          <div className="flex gap-2 mt-2 sm:mt-0">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => openView(job)}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => openEdit(job)}
                            >
                              <Edit2 className="h-4 w-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleToggle(job)}
                            >
                              {job.isActive ? (
                                <Pause className="h-4 w-4" />
                              ) : (
                                <Play className="h-4 w-4" />
                              )}
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="text-destructive hover:text-destructive"
                              onClick={() => setDeleteId(job.id)}
                            >
                              <Trash2 className="h-4 w-4" />
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

      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl">
              {editingJob ? "Edit Job Posting" : "Post New Job"}
            </DialogTitle>
            <DialogDescription>
              {editingJob
                ? "Update your job listing details"
                : "Fill in the details to create a new job posting"}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-5 py-4">
            <div className="space-y-2">
              <Label htmlFor="modal-title">Job Title *</Label>
              <Input
                id="modal-title"
                placeholder="e.g. Senior Software Engineer"
                value={form.jobTitle}
                onChange={e => updateForm("jobTitle", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="modal-desc">Job Description *</Label>
              <Textarea
                id="modal-desc"
                className="min-h-[120px]"
                placeholder="Describe the role, responsibilities, and what makes it exciting..."
                value={form.jobDescription}
                onChange={e => updateForm("jobDescription", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="modal-req">Requirements</Label>
              <Textarea
                id="modal-req"
                className="min-h-[80px]"
                placeholder="List the key qualifications and requirements..."
                value={form.jobRequirement}
                onChange={e => updateForm("jobRequirement", e.target.value)}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Job Type</Label>
                <Select
                  value={form.jobType || ""}
                  onValueChange={v => updateForm("jobType", v || undefined)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    {jobTypeOptions.map(opt => (
                      <SelectItem key={opt.value} value={opt.value}>
                        {opt.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Work Type</Label>
                <Select
                  value={form.workType || ""}
                  onValueChange={v => updateForm("workType", v || undefined)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select work type" />
                  </SelectTrigger>
                  <SelectContent>
                    {workTypeOptions.map(opt => (
                      <SelectItem key={opt.value} value={opt.value}>
                        {opt.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Location</Label>
              <Select
                value={form.jobLocation || ""}
                onValueChange={v => updateForm("jobLocation", v || undefined)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select location" />
                </SelectTrigger>
                <SelectContent>
                  {indianCities.map(city => (
                    <SelectItem key={city} value={city}>{city}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="modal-minexp">Min Experience (years)</Label>
                <Input
                  id="modal-minexp"
                  type="number"
                  min="0"
                  value={form.minExperience ?? ""}
                  onChange={e =>
                    updateForm("minExperience", e.target.value ? Number(e.target.value) : 0)
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="modal-maxexp">Max Experience (years)</Label>
                <Input
                  id="modal-maxexp"
                  type="number"
                  min="0"
                  value={form.maxExperience ?? ""}
                  onChange={e =>
                    updateForm(
                      "maxExperience",
                      e.target.value ? Number(e.target.value) : undefined,
                    )
                  }
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="modal-minsal">Min Salary (₹/year)</Label>
                <Input
                  id="modal-minsal"
                  type="number"
                  min="0"
                  placeholder="e.g. 600000"
                  value={form.minSalary ?? ""}
                  onChange={e => updateForm("minSalary", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="modal-maxsal">Max Salary (₹/year)</Label>
                <Input
                  id="modal-maxsal"
                  type="number"
                  min="0"
                  placeholder="e.g. 1500000"
                  value={form.maxSalary ?? ""}
                  onChange={e => updateForm("maxSalary", e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="modal-slots">Open Slots</Label>
              <Input
                id="modal-slots"
                type="number"
                min="1"
                value={form.openSlots ?? 1}
                onChange={e => updateForm("openSlots", Number(e.target.value) || 1)}
              />
            </div>

            <div className="space-y-2">
              <Label>Required Skills</Label>
              <div className="flex gap-2">
                <Input
                  placeholder="Type a skill and press Add"
                  value={skillInput}
                  onChange={e => setSkillInput(e.target.value)}
                  onKeyDown={e => {
                    if (e.key === "Enter") {
                      e.preventDefault()
                      addSkill()
                    }
                  }}
                />
                <Button type="button" variant="outline" onClick={addSkill}>
                  Add
                </Button>
              </div>
              {form.skills && form.skills.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {form.skills.map(skill => (
                    <Badge
                      key={skill}
                      variant="secondary"
                      className="cursor-pointer hover:bg-destructive/20"
                      onClick={() => removeSkill(skill)}
                    >
                      {skill}
                      <X className="h-3 w-3 ml-1" />
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmit} disabled={submitting} className="btn-hero">
              {submitting ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Saving...
                </>
              ) : editingJob ? (
                "Update Job"
              ) : (
                "Post Job"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={viewOpen} onOpenChange={setViewOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          {viewLoading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : viewJob ? (
            <>
              <DialogHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <DialogTitle className="text-2xl">{viewJob.jobTitle}</DialogTitle>
                    <DialogDescription className="text-base mt-1">
                      {viewJob.companyName || "Your Company"}
                    </DialogDescription>
                  </div>
                  <Badge
                    variant={viewJob.isActive ? "default" : "secondary"}
                    className={
                      viewJob.isActive
                        ? "bg-green-500/10 text-green-500 border-green-500/20"
                        : "bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
                    }
                  >
                    {viewJob.isActive ? "Active" : "Paused"}
                  </Badge>
                </div>
              </DialogHeader>

              <div className="space-y-5 py-4">
                <div className="flex flex-wrap gap-3">
                  {viewJob.jobType && (
                    <Badge variant="outline">
                      <Briefcase className="h-3.5 w-3.5 mr-1" />
                      {formatJobType(viewJob.jobType)}
                    </Badge>
                  )}
                  {viewJob.workType && (
                    <Badge variant="outline">
                      {formatJobType(viewJob.workType)}
                    </Badge>
                  )}
                  {viewJob.jobLocation && (
                    <Badge variant="outline">
                      <MapPin className="h-3.5 w-3.5 mr-1" />
                      {viewJob.jobLocation}
                    </Badge>
                  )}
                  {formatSalary(viewJob.minSalary, viewJob.maxSalary) && (
                    <Badge variant="outline">
                      <DollarSign className="h-3.5 w-3.5 mr-1" />
                      {formatSalary(viewJob.minSalary, viewJob.maxSalary)}
                    </Badge>
                  )}
                  {(viewJob.minExperience != null || viewJob.maxExperience != null) && (
                    <Badge variant="outline">
                      {viewJob.minExperience ?? 0}
                      {viewJob.maxExperience != null ? `-${viewJob.maxExperience}` : "+"} yrs exp
                    </Badge>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="bg-secondary/20 rounded-lg p-3">
                    <p className="text-muted-foreground">Applications</p>
                    <p className="text-lg font-semibold">{viewJob.applicationCount || 0}</p>
                  </div>
                  <div className="bg-secondary/20 rounded-lg p-3">
                    <p className="text-muted-foreground">Open Slots</p>
                    <p className="text-lg font-semibold">{viewJob.openSlots || 1}</p>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Description</h4>
                  <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                    {viewJob.jobDescription}
                  </p>
                </div>

                {viewJob.jobRequirement && (
                  <div>
                    <h4 className="font-semibold mb-2">Requirements</h4>
                    <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                      {viewJob.jobRequirement}
                    </p>
                  </div>
                )}

                {viewJob.skills && viewJob.skills.length > 0 && (
                  <div>
                    <h4 className="font-semibold mb-2">Required Skills</h4>
                    <div className="flex flex-wrap gap-2">
                      {viewJob.skills.map(skill => (
                        <Badge key={skill} variant="secondary">{skill}</Badge>
                      ))}
                    </div>
                  </div>
                )}

                <p className="text-xs text-muted-foreground">
                  Posted {timeAgo(viewJob.createdAt)}
                </p>
              </div>
            </>
          ) : null}
        </DialogContent>
      </Dialog>

      <AlertDialog open={!!deleteId} onOpenChange={(open) => !open && setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Job Posting?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete this job posting and remove all associated skill
              requirements. Applications from candidates will not be affected. This action cannot
              be undone.
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
