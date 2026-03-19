
"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom"
import {
  FileText, Users, Target, TrendingUp, CheckCircle, Upload,
  MapPin, Briefcase, ArrowRight, Clock, Sparkles, BarChart3,
  Brain, Code, Award, ExternalLink, ChevronRight
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Navbar } from "@/components/layout"
import { Footer } from "@/components/layout"
import { useAuth } from "@/hooks/useAuth"
import { resumeListApi, roadmapApi } from "@/api"
import type { UserResume, Roadmap } from "@/api/roadmap"

// Greeting based on time of day
function getGreeting(): string {
  const hour = new Date().getHours()
  if (hour < 12) return "Good morning"
  if (hour < 17) return "Good afternoon"
  return "Good evening"
}

// Profile completeness calculator
function calcProfileCompletion(profile: any): { percent: number; missing: string[] } {
  if (!profile) return { percent: 0, missing: ["Complete your profile"] }
  const fields: [string, string][] = [
    ["fullName", "Full Name"],
    ["bio", "Professional Bio"],
    ["currentTitle", "Current Title"],
    ["experienceLevel", "Experience Level"],
    ["rolePreference", "Role Preference"],
    ["phone", "Phone Number"],
    ["claimedLocation", "Location"],
    ["linkedinUrl", "LinkedIn URL"],
    ["githubUrl", "GitHub URL"],
    ["workTypePref", "Work Type Preference"],
  ]
  const filled = fields.filter(([key]) => {
    const val = profile[key]
    return val && String(val).trim().length > 0
  })
  const missing = fields
    .filter(([key]) => {
      const val = profile[key]
      return !val || String(val).trim().length === 0
    })
    .map(([, label]) => label)
  return {
    percent: Math.round((filled.length / fields.length) * 100),
    missing,
  }
}

// Quick action config
const quickActions = [
  {
    label: "Upload Resume",
    desc: "AI-powered analysis",
    icon: Upload,
    path: "/upload-resume",
    color: "text-blue-400 bg-blue-500/10 border-blue-500/20",
  },
  {
    label: "Find Mentors",
    desc: "Get career guidance",
    icon: Users,
    path: "/mentor-match",
    color: "text-purple-400 bg-purple-500/10 border-purple-500/20",
  },
  {
    label: "Explore Roles",
    desc: "AI role suggestions",
    icon: Target,
    path: "/role-suggest",
    color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
  },
  {
    label: "Career Roadmap",
    desc: "Personalized learning path",
    icon: MapPin,
    path: "/roadmap",
    color: "text-amber-400 bg-amber-500/10 border-amber-500/20",
  },
]

export default function Dashboard() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [resumes, setResumes] = useState<UserResume[]>([])
  const [roadmaps, setRoadmaps] = useState<Roadmap[]>([])
  const [loading, setLoading] = useState(true)

  const profile = user?.profile
  const firstName = (profile?.fullName || user?.email || "").split(" ")[0].split("@")[0]
  const { percent: profilePercent, missing: profileMissing } = calcProfileCompletion(profile)

  const primaryResume = resumes.find((r) => r.isPrimary)
  const totalResumes = resumes.length
  const activeRoadmap = roadmaps.find((r) => r.isActive)

  useEffect(() => {
    async function load() {
      try {
        const [resumeRes, roadmapRes] = await Promise.all([
          resumeListApi.getAll().catch(() => ({ data: [] })),
          roadmapApi.getAll().catch(() => ({ data: [] })),
        ])
        setResumes((resumeRes as any)?.data || [])
        setRoadmaps((roadmapRes as any)?.data || [])
      } catch {
        // silent fail — dashboard still renders
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-24 pb-16">
        <div className="mx-auto w-[92%] max-w-6xl">
          {/* Header */}
          <div className="mb-10">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl md:text-4xl font-bold leading-tight"
            >
              {getGreeting()}, <span className="hero-text">{firstName}</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-muted-foreground mt-2 flex items-center gap-2 text-sm md:text-base"
            >
              {profile?.currentTitle && (
                <>
                  <Briefcase className="h-4 w-4" />
                  <span>{profile.currentTitle}</span>
                  <span className="text-border">|</span>
                </>
              )}
              {profile?.claimedLocation && (
                <>
                  <MapPin className="h-4 w-4" />
                  <span>{profile.claimedLocation}</span>
                </>
              )}
              {!profile?.currentTitle && !profile?.claimedLocation && (
                <span>Here's your career development overview</span>
              )}
            </motion.p>
          </div>

          {/* Top Stats Row */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-10">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}>
              <Card className="card-premium hover:border-primary/30 transition-colors h-full">
                <CardContent className="p-4 md:p-5 flex flex-col min-h-[8.5rem]">
                  <div className="flex items-center justify-between mb-3">
                    <div className="h-9 w-9 md:h-10 md:w-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
                      <CheckCircle className="h-4 w-4 md:h-5 md:w-5 text-blue-400" />
                    </div>
                    <span className={`text-[0.65rem] md:text-xs font-medium px-2 py-0.5 rounded-full ${
                      profilePercent === 100 ? "bg-green-500/10 text-green-400" : "bg-amber-500/10 text-amber-400"
                    }`}>
                      {profilePercent === 100 ? "Done" : `${100 - profilePercent}% left`}
                    </span>
                  </div>
                  <div className="mt-auto">
                    <div className="text-2xl font-bold leading-none">{profilePercent}%</div>
                    <div className="text-xs md:text-sm text-muted-foreground mt-1">Profile Complete</div>
                    <Progress value={profilePercent} className="h-1 mt-2.5" />
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
              <Card className="card-premium hover:border-primary/30 transition-colors cursor-pointer h-full" onClick={() => navigate("/upload-resume")}>
                <CardContent className="p-4 md:p-5 flex flex-col min-h-[8.5rem]">
                  <div className="flex items-center justify-between mb-3">
                    <div className="h-9 w-9 md:h-10 md:w-10 rounded-xl bg-purple-500/10 flex items-center justify-center">
                      <FileText className="h-4 w-4 md:h-5 md:w-5 text-purple-400" />
                    </div>
                    {primaryResume && (
                      <span className="text-[0.65rem] md:text-xs font-medium px-2 py-0.5 rounded-full bg-green-500/10 text-green-400">
                        Primary Set
                      </span>
                    )}
                  </div>
                  <div className="mt-auto">
                    <div className="text-2xl font-bold leading-none">{totalResumes}</div>
                    <div className="text-xs md:text-sm text-muted-foreground mt-1">
                      {totalResumes === 0 ? "No Resumes — Upload Now" : `Resume${totalResumes > 1 ? "s" : ""} Uploaded`}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
              <Card className="card-premium hover:border-primary/30 transition-colors cursor-pointer h-full" onClick={() => navigate("/roadmap")}>
                <CardContent className="p-4 md:p-5 flex flex-col min-h-[8.5rem]">
                  <div className="flex items-center justify-between mb-3">
                    <div className="h-9 w-9 md:h-10 md:w-10 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                      <MapPin className="h-4 w-4 md:h-5 md:w-5 text-emerald-400" />
                    </div>
                  </div>
                  <div className="mt-auto">
                    <div className="text-2xl font-bold leading-none">{roadmaps.length}</div>
                    <div className="text-xs md:text-sm text-muted-foreground mt-1">
                      {roadmaps.length === 0 ? "No Roadmaps Yet" : `Career Roadmap${roadmaps.length > 1 ? "s" : ""}`}
                    </div>
                    {activeRoadmap && (
                      <div className="mt-1.5 text-[0.7rem] text-emerald-400 truncate">
                        Active: {activeRoadmap.target}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
              <Card className="card-premium hover:border-primary/30 transition-colors cursor-pointer h-full" onClick={() => navigate("/ai-chat")}>
                <CardContent className="p-4 md:p-5 flex flex-col min-h-[8.5rem]">
                  <div className="flex items-center justify-between mb-3">
                    <div className="h-9 w-9 md:h-10 md:w-10 rounded-xl bg-amber-500/10 flex items-center justify-center">
                      <Brain className="h-4 w-4 md:h-5 md:w-5 text-amber-400" />
                    </div>
                  </div>
                  <div className="mt-auto">
                    <div className="text-2xl font-bold leading-none flex items-center gap-2">
                      AI Chat
                      <Sparkles className="h-4 w-4 text-amber-400" />
                    </div>
                    <div className="text-xs md:text-sm text-muted-foreground mt-1">Career guidance assistant</div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_20rem] gap-6 mb-10">
            {/* Left: Getting Started / Resume CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="lg:col-span-2 space-y-6"
            >
              {/* Resume Status or CTA */}
              {totalResumes === 0 ? (
                <Card className="card-premium border-dashed border-2 border-primary/20">
                  <CardContent className="p-8 text-center">
                    <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                      <Upload className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Upload Your Resume</h3>
                    <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                      Get your ATS score, AI-powered skill extraction, and personalized career suggestions
                    </p>
                    <Button className="btn-hero px-8" onClick={() => navigate("/upload-resume")}>
                      <Upload className="mr-2 h-4 w-4" />
                      Upload Resume
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <Card className="card-premium">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center gap-2">
                        <FileText className="h-5 w-5 text-primary" />
                        Your Resumes
                      </CardTitle>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-primary"
                        onClick={() => navigate("/upload-resume")}
                      >
                        Upload New <ArrowRight className="ml-1 h-4 w-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {resumes.slice(0, 3).map((resume) => (
                      <div
                        key={resume.id}
                        className={`flex items-center justify-between p-3 rounded-lg border transition-colors ${
                          resume.isPrimary
                            ? "bg-primary/5 border-primary/20"
                            : "bg-muted/10 border-border/30 hover:bg-muted/20"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`h-9 w-9 rounded-lg flex items-center justify-center ${
                            resume.isPrimary ? "bg-primary/10" : "bg-muted/20"
                          }`}>
                            <FileText className={`h-4 w-4 ${resume.isPrimary ? "text-primary" : "text-muted-foreground"}`} />
                          </div>
                          <div>
                            <div className="text-sm font-medium flex items-center gap-2">
                              {resume.fileName}
                              {resume.isPrimary && (
                                <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-primary/10 text-primary uppercase">
                                  Primary
                                </span>
                              )}
                            </div>
                            <div className="text-xs text-muted-foreground flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {new Date(resume.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                            </div>
                          </div>
                        </div>
                        <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                          resume.status === "completed"
                            ? "bg-green-500/10 text-green-400"
                            : resume.status === "processing"
                              ? "bg-amber-500/10 text-amber-400"
                              : "bg-muted/20 text-muted-foreground"
                        }`}>
                          {resume.status === "completed" ? "Analyzed" : resume.status === "processing" ? "Processing" : resume.status}
                        </span>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              )}

              {/* Active Roadmap Progress */}
              {activeRoadmap && (
                <Card className="card-premium">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center gap-2">
                        <MapPin className="h-5 w-5 text-emerald-400" />
                        Active Roadmap
                      </CardTitle>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-emerald-400"
                        onClick={() => navigate(`/roadmap`)}
                      >
                        View Details <ArrowRight className="ml-1 h-4 w-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-4">
                      <h3 className="text-lg font-semibold">{activeRoadmap.target}</h3>
                      <p className="text-sm text-muted-foreground mt-1">{activeRoadmap.goal}</p>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progress</span>
                        <span className="text-muted-foreground">
                          {activeRoadmap.currentMilestone} / {activeRoadmap.totalMilestones} milestones
                        </span>
                      </div>
                      <Progress
                        value={(activeRoadmap.currentMilestone / Math.max(activeRoadmap.totalMilestones, 1)) * 100}
                        className="h-2.5"
                      />
                    </div>
                    {activeRoadmap.targetTimeline && (
                      <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        Target: {activeRoadmap.targetTimeline}
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}

              {/* Profile Completion (only if < 100%) */}
              {profilePercent < 100 && (
                <Card className="card-premium">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center gap-2">
                        <CheckCircle className="h-5 w-5 text-blue-400" />
                        Complete Your Profile
                      </CardTitle>
                      <span className="text-sm text-muted-foreground">{profilePercent}%</span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Progress value={profilePercent} className="h-2 mb-4" />
                    <div className="space-y-2">
                      {profileMissing.slice(0, 4).map((field) => (
                        <div
                          key={field}
                          className="flex items-center justify-between p-2.5 rounded-lg bg-muted/10 border border-border/20"
                        >
                          <div className="flex items-center gap-2">
                            <div className="h-4 w-4 rounded-full border-2 border-amber-500/50" />
                            <span className="text-sm">{field}</span>
                          </div>
                          <span className="text-xs text-amber-400">Missing</span>
                        </div>
                      ))}
                      {profileMissing.length > 4 && (
                        <p className="text-xs text-muted-foreground text-center">
                          +{profileMissing.length - 4} more fields
                        </p>
                      )}
                    </div>
                    <Button
                      className="w-full mt-4 btn-hero"
                      onClick={() => navigate("/profile")}
                    >
                      Complete Profile
                    </Button>
                  </CardContent>
                </Card>
              )}
            </motion.div>

            {/* Right Sidebar: Quick Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="space-y-6"
            >
              <Card className="card-premium">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">Quick Actions</CardTitle>
                  <CardDescription>Jump into your career tools</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  {quickActions.map((action) => {
                    const Icon = action.icon
                    return (
                      <button
                        key={action.path}
                        onClick={() => navigate(action.path)}
                        className="w-full flex items-center gap-3 p-3 rounded-lg border border-border/20 hover:bg-muted/20 hover:border-primary/20 transition-all group text-left"
                      >
                        <div className={`h-10 w-10 rounded-xl flex items-center justify-center border ${action.color}`}>
                          <Icon className="h-5 w-5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-medium group-hover:text-primary transition-colors">
                            {action.label}
                          </div>
                          <div className="text-xs text-muted-foreground">{action.desc}</div>
                        </div>
                        <ChevronRight className="h-4 w-4 text-muted-foreground/40 group-hover:text-primary transition-colors" />
                      </button>
                    )
                  })}
                </CardContent>
              </Card>

              {/* Profile Links */}
              {(profile?.linkedinUrl || profile?.githubUrl) && (
                <Card className="card-premium">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base">Your Links</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {profile?.linkedinUrl && (
                      <a
                        href={profile.linkedinUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 p-2.5 rounded-lg border border-border/20 hover:bg-muted/20 transition-colors group"
                      >
                        <div className="h-8 w-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
                          <ExternalLink className="h-4 w-4 text-blue-400" />
                        </div>
                        <span className="text-sm group-hover:text-primary transition-colors">LinkedIn</span>
                      </a>
                    )}
                    {profile?.githubUrl && (
                      <a
                        href={profile.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 p-2.5 rounded-lg border border-border/20 hover:bg-muted/20 transition-colors group"
                      >
                        <div className="h-8 w-8 rounded-lg bg-gray-500/10 flex items-center justify-center">
                          <Code className="h-4 w-4 text-gray-400" />
                        </div>
                        <span className="text-sm group-hover:text-primary transition-colors">GitHub</span>
                      </a>
                    )}
                  </CardContent>
                </Card>
              )}
            </motion.div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
