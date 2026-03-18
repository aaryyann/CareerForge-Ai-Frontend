
"use client"

import { useState, useCallback, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom"
import {
  User as UserIcon,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  GraduationCap,
  Linkedin,
  Github,
  Globe,
  Edit3,
  Save,
  X,
  Shield,
  Clock,
  Calendar,
  Star,
  ChevronLeft,
  CheckCircle,
  BadgeCheck,
  Camera,
  Loader2,
  FileText,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Navbar, Footer } from "@/components/layout"
import { useAuth } from "@/hooks/useAuth"
import { profileApi, avatarApi, resumeListApi } from "@/api"
import type { UserResume } from "@/api/roadmap"
import { indianCities } from "@/constants/locations"
import type { UserRole } from "@/types/auth"

// ============================================================================
// CONSTANTS
// ============================================================================

const ROLE_LABELS: Record<UserRole, string> = {
  job_seeker: "Job Seeker",
  recruiter: "Recruiter",
  mentor: "Mentor",
}

const ROLE_COLORS: Record<UserRole, string> = {
  job_seeker: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  recruiter: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  mentor: "bg-purple-500/10 text-purple-400 border-purple-500/20",
}

const EXPERIENCE_LEVELS = [
  { value: "entry", label: "Entry Level" },
  { value: "junior", label: "Junior" },
  { value: "mid", label: "Mid Level" },
  { value: "senior", label: "Senior" },
  { value: "lead", label: "Lead / Principal" },
]

const WORK_TYPES = [
  { value: "remote", label: "Remote" },
  { value: "hybrid", label: "Hybrid" },
  { value: "onsite", label: "On-site" },
]

const EXPERTISE_OPTIONS = [
  "Software Engineering",
  "Product Management",
  "UI/UX Design",
  "Data Science",
  "Machine Learning",
  "Cloud & DevOps",
  "Cybersecurity",
  "Marketing",
  "Sales",
  "Finance",
  "HR & Recruiting",
  "Entrepreneurship",
  "Leadership",
]

// ============================================================================
// HELPER COMPONENTS
// ============================================================================

function InfoRow({ icon: Icon, label, value, link }: {
  icon: React.ElementType
  label: string
  value?: string | number | null
  link?: boolean
}) {
  if (!value) return null
  return (
    <div className="flex items-start gap-3 py-2">
      <Icon className="h-4 w-4 text-muted-foreground mt-1 shrink-0" />
      <div className="min-w-0">
        <div className="text-xs text-muted-foreground">{label}</div>
        {link ? (
          <a
            href={String(value).startsWith("http") ? String(value) : `https://${value}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-primary hover:underline break-all"
          >
            {value}
          </a>
        ) : (
          <div className="text-sm font-medium">{value}</div>
        )}
      </div>
    </div>
  )
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export default function Profile() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const avatarInputRef = useRef<HTMLInputElement>(null)
  const [editing, setEditing] = useState(false)
  const [saving, setSaving] = useState(false)
  const [uploadingAvatar, setUploadingAvatar] = useState(false)
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null)
  const [form, setForm] = useState<Record<string, any>>({})
  const [resumes, setResumes] = useState<UserResume[]>([])
  const [settingPrimary, setSettingPrimary] = useState<string | null>(null)

  useEffect(() => {
    if (user?.role === "job_seeker") {
      resumeListApi.getAll()
        .then(res => setResumes(res.data))
        .catch(() => {})
    }
  }, [user?.role])

  const handleSetPrimary = async (resumeId: string) => {
    setSettingPrimary(resumeId)
    try {
      await resumeListApi.setPrimary(resumeId)
      setResumes(prev => prev.map(r => ({ ...r, isPrimary: r.id === resumeId })))
    } catch { /* silent */ }
    finally { setSettingPrimary(null) }
  }

  if (!user) return null

  const p = user.profile
  const role = user.role

  // --- Enter edit mode ---
  const startEditing = useCallback(() => {
    const initial: Record<string, any> = { fullName: p?.fullName || "" }

    if (role === "job_seeker") {
      Object.assign(initial, {
        bio: p?.bio || "",
        currentTitle: p?.currentTitle || "",
        yearOfExp: p?.yearOfExp ?? "",
        experienceLevel: p?.experienceLevel || "",
        rolePreference: p?.rolePreference || "",
        linkedinUrl: p?.linkedinUrl || "",
        githubUrl: p?.githubUrl || "",
        phone: p?.phone || "",
        claimedLocation: p?.claimedLocation || "",
        workTypePref: p?.workTypePref || "",
      })
    } else if (role === "mentor") {
      Object.assign(initial, {
        title: p?.title || "",
        company: p?.company || "",
        yearsOfExp: p?.yearsOfExp ?? "",
        phone: p?.phone || "",
        linkedinUrl: p?.linkedinUrl || "",
        expertiseAreas: p?.expertiseAreas || [],
        claimedLocation: p?.claimedLocation || "",
      })
    } else if (role === "recruiter") {
      Object.assign(initial, {
        position: p?.position || "",
        phone: p?.phone || "",
        jobLocation: p?.jobLocation || "",
      })
    }

    setForm(initial)
    setEditing(true)
  }, [p, role])

  // --- Save ---
  const saveProfile = async () => {
    setSaving(true)
    try {
      const data = { ...form }
      if (data.yearOfExp !== "" && data.yearOfExp !== undefined) data.yearOfExp = Number(data.yearOfExp)
      if (data.yearsOfExp !== "" && data.yearsOfExp !== undefined) data.yearsOfExp = Number(data.yearsOfExp)
      await profileApi.updateProfile(role, data)
      // Refresh user data
      window.location.reload()
    } catch {
      // silent fail — toast can be added later
    } finally {
      setSaving(false)
    }
  }

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Instant preview
    setAvatarPreview(URL.createObjectURL(file))
    setUploadingAvatar(true)

    try {
      const { avatarUrl } = await avatarApi.upload(file)
      setAvatarPreview(avatarUrl)
    } catch {
      setAvatarPreview(null)
    } finally {
      setUploadingAvatar(false)
    }
  }

  const updateField = (key: string, value: any) => {
    setForm(prev => ({ ...prev, [key]: value }))
  }

  const toggleExpertise = (area: string) => {
    setForm(prev => {
      const current: string[] = prev.expertiseAreas || []
      return {
        ...prev,
        expertiseAreas: current.includes(area)
          ? current.filter((a: string) => a !== area)
          : [...current, area],
      }
    })
  }

  // --- Dashboard link per role ---
  const dashboardPath =
    role === "job_seeker" ? "/dashboard"
    : role === "recruiter" ? "/recruiter-dashboard"
    : "/mentor-dashboard"

  // --- Stagger delay helper ---
  const d = (i: number) => ({ delay: 0.05 * i })

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-20 pb-12">
        <div className="mx-auto max-w-5xl px-6 lg:px-8">

          {/* Back button */}
          <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="mb-6">
            <Button variant="ghost" size="sm" onClick={() => navigate(dashboardPath)} className="text-muted-foreground">
              <ChevronLeft className="h-4 w-4 mr-1" /> Back to Dashboard
            </Button>
          </motion.div>

          {/* ============================================================= */}
          {/* HERO HEADER CARD                                               */}
          {/* ============================================================= */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={d(0)}>
            <Card className="card-premium overflow-hidden mb-8">
              {/* Gradient banner */}
              <div className="h-32 bg-gradient-to-r from-primary/20 via-accent/10 to-primary/5 relative">
                <div className="absolute -bottom-14 left-8">
                  <div
                    className="relative group cursor-pointer"
                    onClick={() => avatarInputRef.current?.click()}
                  >
                    <Avatar className="h-28 w-28 ring-4 ring-background shadow-xl">
                      <AvatarImage src={avatarPreview || user.avatarUrl || undefined} />
                      <AvatarFallback className="bg-gradient-to-br from-primary/20 to-accent/20 text-primary text-3xl font-bold">
                        {p?.fullName
                          ? p.fullName.split(" ").map(n => n[0]).join("").toUpperCase()
                          : <UserIcon className="h-10 w-10" />}
                      </AvatarFallback>
                    </Avatar>
                    {/* Camera overlay */}
                    <div className="absolute inset-0 rounded-full bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      {uploadingAvatar ? (
                        <Loader2 className="h-6 w-6 text-white animate-spin" />
                      ) : (
                        <Camera className="h-6 w-6 text-white" />
                      )}
                    </div>
                    <input
                      ref={avatarInputRef}
                      type="file"
                      accept="image/png,image/jpeg,image/webp,image/gif"
                      className="hidden"
                      onChange={handleAvatarChange}
                    />
                  </div>
                </div>
                {/* Edit / Save buttons — top right */}
                <div className="absolute top-4 right-4 flex gap-2">
                  {editing ? (
                    <>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="rounded-xl bg-background/50 backdrop-blur-sm"
                        onClick={() => setEditing(false)}
                        disabled={saving}
                      >
                        <X className="h-4 w-4 mr-1" /> Cancel
                      </Button>
                      <Button
                        size="sm"
                        className="rounded-xl btn-hero"
                        onClick={saveProfile}
                        disabled={saving}
                      >
                        <Save className="h-4 w-4 mr-1" /> {saving ? "Saving..." : "Save"}
                      </Button>
                    </>
                  ) : (
                    <Button
                      size="sm"
                      variant="outline"
                      className="rounded-xl bg-background/50 backdrop-blur-sm border-border/50"
                      onClick={startEditing}
                    >
                      <Edit3 className="h-4 w-4 mr-1" /> Edit Profile
                    </Button>
                  )}
                </div>
              </div>

              <CardContent className="pt-20 pb-6 px-8">
                <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
                  <div>
                    {editing ? (
                      <input
                        className="text-2xl font-bold bg-transparent border-b border-primary/50 outline-none pb-1 w-full max-w-xs"
                        value={form.fullName}
                        onChange={e => updateField("fullName", e.target.value)}
                        placeholder="Full Name"
                      />
                    ) : (
                      <h1 className="text-2xl font-bold">{p?.fullName || user.email}</h1>
                    )}
                    <div className="flex items-center gap-3 mt-2 flex-wrap">
                      <Badge variant="outline" className={ROLE_COLORS[role]}>
                        {ROLE_LABELS[role]}
                      </Badge>
                      {user.isEmailVerified && (
                        <Badge variant="outline" className="bg-green-500/10 text-green-400 border-green-500/20">
                          <BadgeCheck className="h-3 w-3 mr-1" /> Verified
                        </Badge>
                      )}
                      {p?.currentTitle && !editing && (
                        <span className="text-sm text-muted-foreground">{p.currentTitle}</span>
                      )}
                      {p?.title && !editing && role === "mentor" && (
                        <span className="text-sm text-muted-foreground">
                          {p.title}{p.company ? ` at ${p.company}` : ""}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    Joined {new Date(user.createdAt).toLocaleDateString("en-IN", { month: "long", year: "numeric" })}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* ============================================================= */}
          {/* CONTENT GRID                                                   */}
          {/* ============================================================= */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

            {/* --------- LEFT COLUMN: Contact & Links (1/3) --------- */}
            <div className="space-y-6">

              {/* Contact Info */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={d(1)}>
                <Card className="card-premium">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Contact</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-1">
                    {editing ? (
                      <div className="space-y-3">
                        {(role === "job_seeker" || role === "mentor") && (
                          <div>
                            <label className="text-xs text-muted-foreground">Phone</label>
                            <input
                              className="input-premium w-full mt-1 px-3 py-2 rounded-lg text-sm"
                              value={form.phone}
                              onChange={e => updateField("phone", e.target.value)}
                              placeholder="+91 9876543210"
                            />
                          </div>
                        )}
                        {role === "recruiter" && (
                          <div>
                            <label className="text-xs text-muted-foreground">Phone</label>
                            <input
                              className="input-premium w-full mt-1 px-3 py-2 rounded-lg text-sm"
                              value={form.phone}
                              onChange={e => updateField("phone", e.target.value)}
                              placeholder="+91 9876543210"
                            />
                          </div>
                        )}
                      </div>
                    ) : (
                      <>
                        <InfoRow icon={Mail} label="Email" value={user.email} />
                        <InfoRow icon={Phone} label="Phone" value={p?.phone} />
                        <InfoRow icon={MapPin} label="Location" value={p?.claimedLocation || p?.jobLocation} />
                      </>
                    )}
                  </CardContent>
                </Card>
              </motion.div>

              {/* Location (edit mode) */}
              {editing && (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={d(2)}>
                  <Card className="card-premium">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Location</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <select
                        className="input-premium w-full px-3 py-2 rounded-lg text-sm"
                        value={role === "recruiter" ? form.jobLocation : form.claimedLocation}
                        onChange={e => updateField(role === "recruiter" ? "jobLocation" : "claimedLocation", e.target.value)}
                      >
                        <option value="">Select city</option>
                        {indianCities.map(c => <option key={c} value={c}>{c}</option>)}
                      </select>
                    </CardContent>
                  </Card>
                </motion.div>
              )}

              {/* Links */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={d(2)}>
                <Card className="card-premium">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Links</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {editing ? (
                      <div className="space-y-3">
                        {(role === "job_seeker" || role === "mentor") && (
                          <>
                            <div>
                              <label className="text-xs text-muted-foreground">LinkedIn</label>
                              <input
                                className="input-premium w-full mt-1 px-3 py-2 rounded-lg text-sm"
                                value={form.linkedinUrl}
                                onChange={e => updateField("linkedinUrl", e.target.value)}
                                placeholder="https://linkedin.com/in/username"
                              />
                            </div>
                            {role === "job_seeker" && (
                              <div>
                                <label className="text-xs text-muted-foreground">GitHub</label>
                                <input
                                  className="input-premium w-full mt-1 px-3 py-2 rounded-lg text-sm"
                                  value={form.githubUrl}
                                  onChange={e => updateField("githubUrl", e.target.value)}
                                  placeholder="https://github.com/username"
                                />
                              </div>
                            )}
                          </>
                        )}
                      </div>
                    ) : (
                      <div className="space-y-1">
                        <InfoRow icon={Linkedin} label="LinkedIn" value={p?.linkedinUrl} link />
                        <InfoRow icon={Github} label="GitHub" value={p?.githubUrl} link />
                        {!p?.linkedinUrl && !p?.githubUrl && (
                          <p className="text-xs text-muted-foreground py-2">No links added yet</p>
                        )}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>

              {/* Account Info */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={d(3)}>
                <Card className="card-premium">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Account</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-1">
                    <InfoRow icon={Shield} label="Status" value={user.isActive ? "Active" : "Inactive"} />
                    <InfoRow
                      icon={CheckCircle}
                      label="Email Verified"
                      value={user.isEmailVerified ? "Yes" : "No"}
                    />
                    <InfoRow
                      icon={Clock}
                      label="Last Updated"
                      value={p?.updatedAt ? new Date(p.updatedAt).toLocaleDateString("en-IN") : undefined}
                    />
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* --------- RIGHT COLUMN: Role-specific details (2/3) --------- */}
            <div className="lg:col-span-2 space-y-6">

              {/* ======================== JOB SEEKER ======================== */}
              {role === "job_seeker" && (
                <>
                  {/* Bio */}
                  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={d(1)}>
                    <Card className="card-premium">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base">About</CardTitle>
                      </CardHeader>
                      <CardContent>
                        {editing ? (
                          <textarea
                            className="input-premium w-full px-3 py-2 rounded-lg text-sm min-h-[100px] resize-none"
                            value={form.bio}
                            onChange={e => updateField("bio", e.target.value)}
                            placeholder="Tell us about yourself..."
                          />
                        ) : (
                          <p className="text-sm leading-relaxed text-foreground/80">
                            {p?.bio || <span className="text-muted-foreground italic">No bio added yet</span>}
                          </p>
                        )}
                      </CardContent>
                    </Card>
                  </motion.div>

                  {/* Professional Details */}
                  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={d(2)}>
                    <Card className="card-premium">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base">Professional Details</CardTitle>
                      </CardHeader>
                      <CardContent>
                        {editing ? (
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                              <label className="text-xs text-muted-foreground">Current Title</label>
                              <input
                                className="input-premium w-full mt-1 px-3 py-2 rounded-lg text-sm"
                                value={form.currentTitle}
                                onChange={e => updateField("currentTitle", e.target.value)}
                                placeholder="Software Engineer"
                              />
                            </div>
                            <div>
                              <label className="text-xs text-muted-foreground">Years of Experience</label>
                              <input
                                type="number"
                                className="input-premium w-full mt-1 px-3 py-2 rounded-lg text-sm"
                                value={form.yearOfExp}
                                onChange={e => updateField("yearOfExp", e.target.value)}
                                placeholder="3"
                                min="0"
                              />
                            </div>
                            <div>
                              <label className="text-xs text-muted-foreground">Experience Level</label>
                              <select
                                className="input-premium w-full mt-1 px-3 py-2 rounded-lg text-sm"
                                value={form.experienceLevel}
                                onChange={e => updateField("experienceLevel", e.target.value)}
                              >
                                <option value="">Select level</option>
                                {EXPERIENCE_LEVELS.map(l => <option key={l.value} value={l.value}>{l.label}</option>)}
                              </select>
                            </div>
                            <div>
                              <label className="text-xs text-muted-foreground">Preferred Role</label>
                              <input
                                className="input-premium w-full mt-1 px-3 py-2 rounded-lg text-sm"
                                value={form.rolePreference}
                                onChange={e => updateField("rolePreference", e.target.value)}
                                placeholder="Full-Stack Developer"
                              />
                            </div>
                          </div>
                        ) : (
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-1">
                            <InfoRow icon={Briefcase} label="Current Title" value={p?.currentTitle} />
                            <InfoRow icon={Clock} label="Experience" value={p?.yearOfExp != null ? `${p.yearOfExp} years` : undefined} />
                            <InfoRow icon={Star} label="Level" value={
                              EXPERIENCE_LEVELS.find(l => l.value === p?.experienceLevel)?.label
                            } />
                            <InfoRow icon={GraduationCap} label="Preferred Role" value={p?.rolePreference} />
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </motion.div>

                  {/* Work Preferences */}
                  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={d(3)}>
                    <Card className="card-premium">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base">Work Preferences</CardTitle>
                      </CardHeader>
                      <CardContent>
                        {editing ? (
                          <div>
                            <label className="text-xs text-muted-foreground mb-2 block">Work Type</label>
                            <div className="flex gap-3 flex-wrap">
                              {WORK_TYPES.map(w => (
                                <button
                                  key={w.value}
                                  type="button"
                                  onClick={() => updateField("workTypePref", w.value)}
                                  className={`px-4 py-2 rounded-lg text-sm border transition-all ${
                                    form.workTypePref === w.value
                                      ? "border-primary bg-primary/10 text-primary"
                                      : "border-border/30 text-muted-foreground hover:border-primary/40"
                                  }`}
                                >
                                  {w.label}
                                </button>
                              ))}
                            </div>
                          </div>
                        ) : (
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-1">
                            <InfoRow icon={Globe} label="Work Type" value={
                              WORK_TYPES.find(w => w.value === p?.workTypePref)?.label
                            } />
                            <InfoRow icon={MapPin} label="Location" value={p?.claimedLocation} />
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </motion.div>
                </>
              )}

              {/* ======================== MENTOR ======================== */}
              {role === "mentor" && (
                <>
                  {/* Professional Info */}
                  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={d(1)}>
                    <Card className="card-premium">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base">Professional Info</CardTitle>
                      </CardHeader>
                      <CardContent>
                        {editing ? (
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                              <label className="text-xs text-muted-foreground">Title</label>
                              <input
                                className="input-premium w-full mt-1 px-3 py-2 rounded-lg text-sm"
                                value={form.title}
                                onChange={e => updateField("title", e.target.value)}
                                placeholder="Senior Engineer"
                              />
                            </div>
                            <div>
                              <label className="text-xs text-muted-foreground">Company</label>
                              <input
                                className="input-premium w-full mt-1 px-3 py-2 rounded-lg text-sm"
                                value={form.company}
                                onChange={e => updateField("company", e.target.value)}
                                placeholder="Google"
                              />
                            </div>
                            <div>
                              <label className="text-xs text-muted-foreground">Years of Experience</label>
                              <input
                                type="number"
                                className="input-premium w-full mt-1 px-3 py-2 rounded-lg text-sm"
                                value={form.yearsOfExp}
                                onChange={e => updateField("yearsOfExp", e.target.value)}
                                min="0"
                              />
                            </div>
                          </div>
                        ) : (
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-1">
                            <InfoRow icon={Briefcase} label="Title" value={p?.title} />
                            <InfoRow icon={Globe} label="Company" value={p?.company} />
                            <InfoRow icon={Clock} label="Experience" value={p?.yearsOfExp != null ? `${p.yearsOfExp} years` : undefined} />
                            <InfoRow icon={MapPin} label="Location" value={p?.claimedLocation} />
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </motion.div>

                  {/* Expertise Areas */}
                  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={d(2)}>
                    <Card className="card-premium">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base">Expertise Areas</CardTitle>
                      </CardHeader>
                      <CardContent>
                        {editing ? (
                          <div className="flex flex-wrap gap-2">
                            {EXPERTISE_OPTIONS.map(area => (
                              <button
                                key={area}
                                type="button"
                                onClick={() => toggleExpertise(area)}
                                className={`px-3 py-1.5 rounded-full text-sm border transition-all ${
                                  (form.expertiseAreas || []).includes(area)
                                    ? "border-purple-500 bg-purple-500/10 text-purple-400"
                                    : "border-border/30 text-muted-foreground hover:border-purple-500/40"
                                }`}
                              >
                                {area}
                              </button>
                            ))}
                          </div>
                        ) : (
                          <div className="flex flex-wrap gap-2">
                            {p?.expertiseAreas?.length ? (
                              p.expertiseAreas.map((area, i) => (
                                <Badge key={i} variant="outline" className="bg-purple-500/10 text-purple-400 border-purple-500/20">
                                  {area}
                                </Badge>
                              ))
                            ) : (
                              <p className="text-xs text-muted-foreground italic">No expertise areas added</p>
                            )}
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </motion.div>
                </>
              )}

              {/* ======================== RECRUITER ======================== */}
              {role === "recruiter" && (
                <>
                  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={d(1)}>
                    <Card className="card-premium">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base">Work Info</CardTitle>
                      </CardHeader>
                      <CardContent>
                        {editing ? (
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                              <label className="text-xs text-muted-foreground">Position</label>
                              <input
                                className="input-premium w-full mt-1 px-3 py-2 rounded-lg text-sm"
                                value={form.position}
                                onChange={e => updateField("position", e.target.value)}
                                placeholder="HR Manager"
                              />
                            </div>
                          </div>
                        ) : (
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-1">
                            <InfoRow icon={Briefcase} label="Position" value={p?.position} />
                            <InfoRow icon={MapPin} label="Job Location" value={p?.jobLocation} />
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </motion.div>
                </>
              )}

              {/* ======================== PRIMARY RESUME (job_seeker only, view mode) ======================== */}
              {role === "job_seeker" && !editing && (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={d(4)}>
                  <Card className="card-premium">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base flex items-center gap-2">
                        <FileText className="h-4 w-4 text-primary" />
                        Primary Resume
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      {resumes.length === 0 ? (
                        <div className="text-center py-4">
                          <p className="text-sm text-muted-foreground mb-3">No resumes uploaded yet</p>
                          <Button size="sm" variant="outline" onClick={() => navigate("/upload-resume")}>
                            Upload Resume
                          </Button>
                        </div>
                      ) : (
                        <div className="space-y-2">
                          {resumes.filter(r => r.status === "completed").map(r => (
                            <div
                              key={r.id}
                              className={`flex items-center justify-between p-3 rounded-lg border transition-all ${
                                r.isPrimary
                                  ? "border-primary/50 bg-primary/5"
                                  : "border-border/30 hover:border-primary/30"
                              }`}
                            >
                              <div className="flex items-center gap-3 min-w-0">
                                <FileText className={`h-4 w-4 shrink-0 ${r.isPrimary ? "text-primary" : "text-muted-foreground"}`} />
                                <div className="min-w-0">
                                  <p className="text-sm font-medium truncate">{r.fileName}</p>
                                  <p className="text-xs text-muted-foreground">
                                    {new Date(r.createdAt).toLocaleDateString("en-IN")}
                                  </p>
                                </div>
                              </div>
                              {r.isPrimary ? (
                                <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20 shrink-0">
                                  Primary
                                </Badge>
                              ) : (
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  className="text-xs shrink-0"
                                  disabled={settingPrimary === r.id}
                                  onClick={() => handleSetPrimary(r.id)}
                                >
                                  {settingPrimary === r.id ? (
                                    <Loader2 className="h-3 w-3 animate-spin" />
                                  ) : (
                                    "Set Primary"
                                  )}
                                </Button>
                              )}
                            </div>
                          ))}
                          <p className="text-xs text-muted-foreground mt-2">
                            Your career roadmap will be generated based on the primary resume.
                          </p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              )}

              {/* ======================== PROFILE COMPLETION TIPS (all roles, view mode) ======================== */}
              {!editing && (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={d(4)}>
                  <Card className="card-premium border-primary/10">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base flex items-center gap-2">
                        <Star className="h-4 w-4 text-primary" />
                        Profile Strength
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      {(() => {
                        const checks: { label: string; done: boolean }[] = [
                          { label: "Full name added", done: !!p?.fullName },
                          { label: "Email verified", done: user.isEmailVerified },
                        ]

                        if (role === "job_seeker") {
                          checks.push(
                            { label: "Bio written", done: !!p?.bio },
                            { label: "Current title set", done: !!p?.currentTitle },
                            { label: "Experience level selected", done: !!p?.experienceLevel },
                            { label: "LinkedIn added", done: !!p?.linkedinUrl },
                            { label: "Work type preference set", done: !!p?.workTypePref },
                          )
                        } else if (role === "mentor") {
                          checks.push(
                            { label: "Title added", done: !!p?.title },
                            { label: "Company added", done: !!p?.company },
                            { label: "Expertise areas selected", done: !!(p?.expertiseAreas?.length) },
                            { label: "LinkedIn added", done: !!p?.linkedinUrl },
                          )
                        } else {
                          checks.push(
                            { label: "Position added", done: !!p?.position },
                            { label: "Job location set", done: !!p?.jobLocation },
                          )
                        }

                        const completed = checks.filter(c => c.done).length
                        const pct = Math.round((completed / checks.length) * 100)

                        return (
                          <div className="space-y-4">
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-muted-foreground">{completed}/{checks.length} completed</span>
                              <span className="font-semibold text-primary">{pct}%</span>
                            </div>
                            <div className="w-full h-2 bg-muted/30 rounded-full overflow-hidden">
                              <motion.div
                                className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
                                initial={{ width: 0 }}
                                animate={{ width: `${pct}%` }}
                                transition={{ duration: 0.8, delay: 0.3 }}
                              />
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                              {checks.map((c, i) => (
                                <div key={i} className="flex items-center gap-2 text-sm">
                                  {c.done ? (
                                    <CheckCircle className="h-4 w-4 text-green-500 shrink-0" />
                                  ) : (
                                    <div className="h-4 w-4 rounded-full border-2 border-muted-foreground/30 shrink-0" />
                                  )}
                                  <span className={c.done ? "text-foreground" : "text-muted-foreground"}>{c.label}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )
                      })()}
                    </CardContent>
                  </Card>
                </motion.div>
              )}

            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
