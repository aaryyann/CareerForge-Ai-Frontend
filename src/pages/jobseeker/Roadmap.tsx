
"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { CheckCircle, Circle, Clock, Target, TrendingUp, BookOpen, Loader2, Sparkles, ExternalLink, Play, RotateCcw } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Navbar } from "@/components/layout"
import { Footer } from "@/components/layout"
import { useAuth } from "@/hooks/useAuth"
import { roadmapApi, roadmapMlApi } from "@/api"
import type { Roadmap as RoadmapType, RoadmapMilestone } from "@/api"

export default function Roadmap() {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState("current")
  const [roadmap, setRoadmap] = useState<RoadmapType | null>(null)
  const [milestones, setMilestones] = useState<RoadmapMilestone[]>([])
  const [loading, setLoading] = useState(true)
  const [generating, setGenerating] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [targetRole, setTargetRole] = useState("")
  const [updatingMilestone, setUpdatingMilestone] = useState<string | null>(null)

  const fetchRoadmap = async () => {
    try {
      setLoading(true)
      setError(null)
      const res = await roadmapApi.getAll()
      const activeRoadmap = res.data?.find((r: RoadmapType) => r.isActive)
      if (activeRoadmap) {
        const detail = await roadmapApi.getById(activeRoadmap.id)
        setRoadmap(detail.data)
        setMilestones(detail.data.milestones || [])
      }
    } catch (err: any) {
      setError(err.message || "Failed to load roadmap")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchRoadmap()
  }, [])

  useEffect(() => {
    if (user?.profile?.rolePreference && !targetRole) {
      setTargetRole(user.profile.rolePreference)
    }
  }, [user])

  const handleGenerate = async () => {
    if (!user || !targetRole.trim()) return
    try {
      setGenerating(true)
      setError(null)
      await roadmapMlApi.generate(user.id, targetRole.trim())
      await fetchRoadmap()
      setActiveTab("current")
    } catch (err: any) {
      setError(err.message || "Failed to generate roadmap")
    } finally {
      setGenerating(false)
    }
  }

  const handleMilestoneAction = async (milestoneId: string, newStatus: "in_progress" | "completed") => {
    try {
      setUpdatingMilestone(milestoneId)
      await roadmapApi.updateMilestoneStatus(milestoneId, newStatus)
      await fetchRoadmap()
    } catch (err: any) {
      setError(err.message || "Failed to update milestone")
    } finally {
      setUpdatingMilestone(null)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "text-green-500"
      case "in_progress": return "text-cyan-500"
      case "pending": return "text-muted-foreground"
      default: return "text-muted-foreground"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-6 w-6 text-green-500 fill-current" />
      case "in_progress":
        return (
          <div className="relative h-6 w-6">
            <Circle className="h-6 w-6 text-cyan-500" />
            <div className="absolute inset-1.5 rounded-full bg-cyan-500 animate-pulse" />
          </div>
        )
      default:
        return <Circle className="h-6 w-6 text-muted-foreground" />
    }
  }

  const progressPercent = roadmap
    ? Math.round((roadmap.currentMilestone / roadmap.totalMilestones) * 100)
    : 0

  const nextMilestone = milestones.find(m => m.status === "pending" || m.status === "in_progress")

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="pt-20 pb-12 flex items-center justify-center min-h-[60vh]">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </main>
        <Footer />
      </div>
    )
  }

  if (!roadmap && !generating) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="pt-20 pb-12">
          <div className="w-full px-6 lg:px-8 max-w-2xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card className="card-premium">
                <CardHeader className="text-center">
                  <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                    <Sparkles className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-2xl">Generate Your Career Roadmap</CardTitle>
                  <CardDescription className="text-base">
                    Our AI will analyze your resume and create a personalized learning path to help you reach your career goals.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Target Role</label>
                    <Input
                      placeholder="e.g. Senior Frontend Developer"
                      value={targetRole}
                      onChange={(e) => setTargetRole(e.target.value)}
                    />
                    <p className="text-xs text-muted-foreground">
                      Make sure you have set a primary resume on your Profile page.
                    </p>
                  </div>
                  {error && (
                    <div className="text-sm text-red-500 bg-red-500/10 border border-red-500/20 rounded-lg p-3">
                      {error}
                    </div>
                  )}
                  <Button
                    className="w-full btn-hero"
                    onClick={handleGenerate}
                    disabled={!targetRole.trim()}
                  >
                    <Sparkles className="h-4 w-4 mr-2" />
                    Generate Roadmap
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  if (generating) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="pt-20 pb-12 flex flex-col items-center justify-center min-h-[60vh] space-y-4">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
          <h2 className="text-xl font-semibold">AI is analyzing your resume...</h2>
          <p className="text-muted-foreground">This may take a minute. We're creating a personalized roadmap just for you.</p>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-20 pb-12">
        <div className="w-full px-6 lg:px-8">
          <div className="mb-8">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl font-bold mb-4"
            >
              Your Career <span className="hero-text">Roadmap</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-muted-foreground text-lg"
            >
              AI-generated learning path tailored to your career goals
            </motion.p>
          </div>

          {error && (
            <div className="mb-6 text-sm text-red-500 bg-red-500/10 border border-red-500/20 rounded-lg p-3">
              {error}
            </div>
          )}

          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
            <TabsList className="grid w-full grid-cols-3 bg-muted/20">
              <TabsTrigger value="current">Current Path</TabsTrigger>
              <TabsTrigger value="milestones">Milestones</TabsTrigger>
              <TabsTrigger value="alternatives">New Roadmap</TabsTrigger>
            </TabsList>

            <TabsContent value="current" className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Card className="card-premium">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="flex items-center space-x-2">
                          <Target className="h-6 w-6 text-primary" />
                          <span>Path to {roadmap.target}</span>
                        </CardTitle>
                        <CardDescription>
                          {roadmap.targetTimeline} — {roadmap.goal}
                        </CardDescription>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-primary">
                          {progressPercent}%
                        </div>
                        <div className="text-sm text-muted-foreground">Complete</div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Progress value={progressPercent} className="h-3" />
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">
                        {roadmap.currentMilestone} of {roadmap.totalMilestones} milestones completed
                      </span>
                      {nextMilestone && (
                        <span className="font-medium text-cyan-500">
                          Next: {nextMilestone.title}
                        </span>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Card className="card-premium">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <TrendingUp className="h-6 w-6 text-green-500" />
                      <span>Completed Milestones</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {milestones
                        .filter(m => m.status === "completed")
                        .map((milestone) => (
                        <div key={milestone.id} className="flex items-center space-x-3 p-3 rounded-lg bg-green-500/5 border border-green-500/20">
                          <CheckCircle className="h-5 w-5 text-green-500 fill-current" />
                          <div className="flex-1">
                            <div className="font-medium">{milestone.title}</div>
                            {milestone.completedAt && (
                              <div className="text-sm text-muted-foreground">
                                Completed on {new Date(milestone.completedAt).toLocaleDateString()}
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                      {milestones.filter(m => m.status === "completed").length === 0 && (
                        <p className="text-muted-foreground text-sm">No milestones completed yet. Start your journey!</p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>

            <TabsContent value="milestones" className="space-y-6">
              <div className="space-y-8">
                {milestones.map((milestone, index) => (
                  <motion.div
                    key={milestone.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="relative"
                  >
                    {index < milestones.length - 1 && (
                      <div className="absolute left-3 top-12 bottom-0 w-0.5 bg-border" />
                    )}

                    <div className="flex items-start space-x-4">
                      <div className="relative z-10 bg-background p-1">
                        {getStatusIcon(milestone.status)}
                      </div>

                      <Card className={`flex-1 card-premium ${
                        milestone.status === "completed"
                          ? "border-green-500/30 bg-green-500/5"
                          : milestone.status === "in_progress"
                          ? "border-cyan-500/30 bg-cyan-500/5"
                          : ""
                      }`}>
                        <CardHeader className="pb-3">
                          <div className="flex items-center justify-between">
                            <CardTitle className={getStatusColor(milestone.status)}>
                              {milestone.title}
                            </CardTitle>
                            <Badge
                              variant={
                                milestone.status === "completed" ? "default" :
                                milestone.status === "in_progress" ? "secondary" : "outline"
                              }
                              className={
                                milestone.status === "completed"
                                  ? "bg-green-500/10 text-green-500 border-green-500/20"
                                  : milestone.status === "in_progress"
                                  ? "bg-cyan-500/10 text-cyan-500 border-cyan-500/20"
                                  : ""
                              }
                            >
                              {milestone.status === "completed" ? "Completed" :
                               milestone.status === "in_progress" ? "In Progress" : "Pending"}
                            </Badge>
                          </div>
                          <CardDescription>{milestone.description}</CardDescription>
                        </CardHeader>

                        <CardContent className="space-y-4">
                          {milestone.actionItems && milestone.actionItems.length > 0 && (
                            <div>
                              <h4 className="font-medium mb-2">Action Items</h4>
                              <ul className="text-sm text-muted-foreground space-y-1">
                                {milestone.actionItems.map((item, i) => (
                                  <li key={i} className="flex items-start space-x-2">
                                    <Circle className="h-1.5 w-1.5 fill-current mt-1.5 shrink-0" />
                                    <span>{item}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {milestone.resources && milestone.resources.length > 0 && (
                            <div>
                              <h4 className="font-medium mb-2 flex items-center space-x-2">
                                <BookOpen className="h-4 w-4" />
                                <span>Resources</span>
                              </h4>
                              <ul className="text-sm space-y-1">
                                {milestone.resources.map((resource, i) => (
                                  <li key={i}>
                                    <a
                                      href={resource.url}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="flex items-center space-x-2 text-cyan-500 hover:text-cyan-400 transition-colors"
                                    >
                                      <ExternalLink className="h-3 w-3 shrink-0" />
                                      <span>{resource.title}</span>
                                      <Badge variant="outline" className="text-[10px] px-1.5 py-0">
                                        {resource.type}
                                      </Badge>
                                    </a>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}

                          <div className="flex items-center justify-between pt-2">
                            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                              <Clock className="h-4 w-4" />
                              <span>Est. {milestone.estimatedWeeks} weeks</span>
                            </div>

                            {milestone.status === "pending" && (
                              <Button
                                size="sm"
                                className="btn-hero"
                                onClick={() => handleMilestoneAction(milestone.id, "in_progress")}
                                disabled={updatingMilestone === milestone.id}
                              >
                                {updatingMilestone === milestone.id ? (
                                  <Loader2 className="h-4 w-4 animate-spin" />
                                ) : (
                                  <>
                                    <Play className="h-3 w-3 mr-1" />
                                    Start
                                  </>
                                )}
                              </Button>
                            )}

                            {milestone.status === "in_progress" && (
                              <Button
                                size="sm"
                                variant="outline"
                                className="btn-secondary-premium"
                                onClick={() => handleMilestoneAction(milestone.id, "completed")}
                                disabled={updatingMilestone === milestone.id}
                              >
                                {updatingMilestone === milestone.id ? (
                                  <Loader2 className="h-4 w-4 animate-spin" />
                                ) : (
                                  <>
                                    <CheckCircle className="h-3 w-3 mr-1" />
                                    Complete
                                  </>
                                )}
                              </Button>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="alternatives" className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Card className="card-premium max-w-xl mx-auto">
                  <CardHeader className="text-center">
                    <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <RotateCcw className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle>Generate a New Roadmap</CardTitle>
                    <CardDescription>
                      Enter a different target role to generate a fresh roadmap. This will replace your current active roadmap.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Target Role</label>
                      <Input
                        placeholder="e.g. Backend Engineer, Data Scientist"
                        value={targetRole}
                        onChange={(e) => setTargetRole(e.target.value)}
                      />
                    </div>
                    <Button
                      className="w-full btn-hero"
                      onClick={handleGenerate}
                      disabled={!targetRole.trim() || generating}
                    >
                      {generating ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          Generating...
                        </>
                      ) : (
                        <>
                          <Sparkles className="h-4 w-4 mr-2" />
                          Generate New Roadmap
                        </>
                      )}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  )
}
