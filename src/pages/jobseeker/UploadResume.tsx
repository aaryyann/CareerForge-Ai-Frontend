
"use client"

import { useState, useCallback, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Upload, FileText, CheckCircle, X, Loader2, AlertCircle,
  Code, Database, Cloud, Wrench, Brain, Users, Layers, Tag,
  Shield, Target, Sparkles, TrendingUp, BarChart3, Award
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Navbar } from "@/components/layout"
import { Footer } from "@/components/layout"
import { useAuth } from "@/hooks/useAuth"
import { resumeApi, type ParsedResumeData, type ResumeSkill } from "@/api"

const CATEGORY_CONFIG: Record<string, { label: string; color: string; icon: React.ElementType }> = {
  programming_language: { label: "Languages", color: "text-blue-400 bg-blue-500/10 border-blue-500/20", icon: Code },
  framework: { label: "Frameworks", color: "text-purple-400 bg-purple-500/10 border-purple-500/20", icon: Layers },
  database: { label: "Databases", color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20", icon: Database },
  cloud: { label: "Cloud & DevOps", color: "text-sky-400 bg-sky-500/10 border-sky-500/20", icon: Cloud },
  tool: { label: "Tools", color: "text-orange-400 bg-orange-500/10 border-orange-500/20", icon: Wrench },
  data_science: { label: "Data Science & AI", color: "text-pink-400 bg-pink-500/10 border-pink-500/20", icon: Brain },
  soft_skill: { label: "Soft Skills", color: "text-teal-400 bg-teal-500/10 border-teal-500/20", icon: Users },
  domain: { label: "Domains", color: "text-indigo-400 bg-indigo-500/10 border-indigo-500/20", icon: Tag },
  other: { label: "Other", color: "text-gray-400 bg-gray-500/10 border-gray-500/20", icon: Tag },
}

// Score breakdown display labels + icons
const SCORE_FACTOR_CONFIG: Record<string, { label: string; icon: React.ElementType; color: string }> = {
  structure: { label: "Structure", icon: Layers, color: "text-blue-400" },
  skill: { label: "Skills", icon: Code, color: "text-purple-400" },
  experience: { label: "Experience", icon: TrendingUp, color: "text-emerald-400" },
  content: { label: "Content Quality", icon: FileText, color: "text-orange-400" },
  keyword: { label: "Keywords", icon: Target, color: "text-pink-400" },
  format: { label: "ATS Format", icon: Shield, color: "text-sky-400" },
  completeness: { label: "Completeness", icon: CheckCircle, color: "text-teal-400" },
  embedding_quality: { label: "Profile Strength", icon: Award, color: "text-amber-400" },
  topic_coherence: { label: "Topic Focus", icon: Brain, color: "text-indigo-400" },
}

// Upload pipeline steps
const PIPELINE_STEPS = [
  { id: "upload", label: "Uploading File", icon: Upload },
  { id: "parse", label: "Extracting Text", icon: FileText },
  { id: "analyze", label: "AI Analysis", icon: Brain },
  { id: "score", label: "Computing ATS Score", icon: BarChart3 },
  { id: "done", label: "Complete", icon: CheckCircle },
]

function groupSkillsByCategory(skills: ResumeSkill[]): Record<string, ResumeSkill[]> {
  return skills.reduce((acc, skill) => {
    const cat = skill.category || "other"
    if (!acc[cat]) acc[cat] = []
    acc[cat].push(skill)
    return acc
  }, {} as Record<string, ResumeSkill[]>)
}

function getScoreColor(score: number): string {
  if (score >= 80) return "text-green-400"
  if (score >= 60) return "text-amber-400"
  return "text-red-400"
}

function getScoreRingColor(score: number): string {
  if (score >= 80) return "stroke-green-400"
  if (score >= 60) return "stroke-amber-400"
  return "stroke-red-400"
}

function getScoreLabel(score: number): string {
  if (score >= 90) return "Excellent"
  if (score >= 80) return "Very Good"
  if (score >= 70) return "Good"
  if (score >= 60) return "Fair"
  return "Needs Work"
}

// Circular score ring component
function ScoreRing({ score, size = 120 }: { score: number; size?: number }) {
  const radius = (size - 12) / 2
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (score / 100) * circumference

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2} cy={size / 2} r={radius}
          fill="none" strokeWidth="8"
          className="stroke-muted/20"
        />
        <motion.circle
          cx={size / 2} cy={size / 2} r={radius}
          fill="none" strokeWidth="8" strokeLinecap="round"
          className={getScoreRingColor(score)}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.5, ease: "easeOut", delay: 0.3 }}
          style={{ strokeDasharray: circumference }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <motion.span
          className={`text-3xl font-bold ${getScoreColor(score)}`}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, type: "spring" }}
        >
          {score}
        </motion.span>
        <span className="text-xs text-muted-foreground">/ 100</span>
      </div>
    </div>
  )
}

// Pipeline step indicator during upload
function PipelineIndicator({ currentStep, progress }: { currentStep: number; progress: number }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        {PIPELINE_STEPS.map((step, i) => {
          const Icon = step.icon
          const isActive = i === currentStep
          const isDone = i < currentStep

          return (
            <div key={step.id} className="flex flex-col items-center gap-2 flex-1">
              <motion.div
                className={`h-10 w-10 rounded-full flex items-center justify-center border-2 transition-colors duration-300 ${
                  isDone
                    ? "bg-green-500/20 border-green-500 text-green-400"
                    : isActive
                      ? "bg-primary/20 border-primary text-primary animate-pulse"
                      : "bg-muted/10 border-border/30 text-muted-foreground/40"
                }`}
                initial={false}
                animate={isActive ? { scale: [1, 1.1, 1] } : { scale: 1 }}
                transition={isActive ? { repeat: Infinity, duration: 1.5 } : {}}
              >
                {isDone ? (
                  <CheckCircle className="h-5 w-5" />
                ) : isActive ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <Icon className="h-5 w-5" />
                )}
              </motion.div>
              <span className={`text-xs text-center ${
                isDone ? "text-green-400" : isActive ? "text-primary font-medium" : "text-muted-foreground/40"
              }`}>
                {step.label}
              </span>
            </div>
          )
        })}
      </div>

      <div className="space-y-2">
        <Progress value={progress} className="h-2" />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>{PIPELINE_STEPS[currentStep]?.label || "Processing"}...</span>
          <span>{progress}%</span>
        </div>
      </div>
    </div>
  )
}

// Factor score bar component
function FactorBar({ name, score }: { name: string; score: number }) {
  const config = SCORE_FACTOR_CONFIG[name]
  if (!config) return null
  const Icon = config.icon
  const pct = Math.round(score * 100)

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Icon className={`h-3.5 w-3.5 ${config.color}`} />
          <span className="text-sm">{config.label}</span>
        </div>
        <span className={`text-sm font-medium ${
          pct >= 80 ? "text-green-400" : pct >= 50 ? "text-amber-400" : "text-red-400"
        }`}>
          {pct}%
        </span>
      </div>
      <div className="h-2 bg-muted/20 rounded-full overflow-hidden">
        <motion.div
          className={`h-full rounded-full ${
            pct >= 80 ? "bg-green-500" : pct >= 50 ? "bg-amber-500" : "bg-red-500"
          }`}
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        />
      </div>
    </div>
  )
}

export default function UploadResume() {
  const { user } = useAuth()
  const [dragActive, setDragActive] = useState(false)
  const [files, setFiles] = useState<File[]>([])
  const [uploading, setUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [pipelineStep, setPipelineStep] = useState(0)
  const [analysisResults, setAnalysisResults] = useState<ParsedResumeData | null>(null)
  const [error, setError] = useState<string | null>(null)

  const groupedSkills = useMemo(() => {
    if (!analysisResults?.skills) return {}
    return groupSkillsByCategory(analysisResults.skills)
  }, [analysisResults?.skills])

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const newFiles = Array.from(e.dataTransfer.files).filter(
        file => file.type === 'application/pdf' || file.type.includes('document')
      )
      setFiles(prev => [...prev, ...newFiles])
    }
  }, [])

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files).filter(
        file => file.type === 'application/pdf' || file.type.includes('document')
      )
      setFiles(prev => [...prev, ...newFiles])
    }
  }

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index))
  }

  const uploadFiles = async () => {
    if (files.length === 0 || !user) return

    setUploading(true)
    setUploadProgress(0)
    setPipelineStep(0)
    setError(null)
    setAnalysisResults(null)

    try {
      const result = await resumeApi.upload(
        files[0],
        user.id,
        (progress) => {
          setUploadProgress(progress)
          // Map progress to pipeline steps
          if (progress < 30) setPipelineStep(0)       // Uploading
          else if (progress < 50) setPipelineStep(1)   // Extracting
          else if (progress < 80) setPipelineStep(2)   // AI Analysis
          else if (progress < 100) setPipelineStep(3)  // Scoring
          else setPipelineStep(4)                       // Done
        },
      )

      setUploadProgress(100)
      setPipelineStep(4)
      setAnalysisResults(result.parsed_data)
    } catch (err: any) {
      setError(err.message || "Failed to upload resume. Please try again.")
    } finally {
      setUploading(false)
    }
  }

  const sectionScores = analysisResults?.feedback?.section_scores || {}

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-20 pb-12">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8 text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl font-bold mb-4"
            >
              Upload Your <span className="hero-text">Resume</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-muted-foreground text-lg"
            >
              Get AI-powered insights and personalized career recommendations
            </motion.p>
          </div>

          {/* Upload Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-8"
          >
            <Card className="card-premium">
              <CardHeader>
                <CardTitle>Resume Upload</CardTitle>
                <CardDescription>
                  Support for PDF, DOC, and DOCX files up to 5MB
                </CardDescription>
              </CardHeader>
              <CardContent>
                {/* Uploading state — show pipeline */}
                {uploading ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="py-6"
                  >
                    <PipelineIndicator currentStep={pipelineStep} progress={uploadProgress} />

                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                      className="mt-6 text-center"
                    >
                      <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                        <Sparkles className="h-4 w-4 text-primary animate-pulse" />
                        <span>
                          {pipelineStep === 0 && "Securely uploading your resume..."}
                          {pipelineStep === 1 && "Extracting text and embedded links from your document..."}
                          {pipelineStep === 2 && "Gemini AI is analyzing your skills, experience, and projects..."}
                          {pipelineStep === 3 && "Computing your ATS score across 9 evaluation factors..."}
                          {pipelineStep === 4 && "All done! Preparing your results..."}
                        </span>
                      </div>
                    </motion.div>
                  </motion.div>
                ) : (
                  /* Normal state — drag & drop + file list */
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Left: Drag & Drop */}
                    <div className="space-y-4">
                      {error && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="flex items-center gap-2 p-3 bg-destructive/10 text-destructive rounded-lg border border-destructive/20 text-sm"
                        >
                          <AlertCircle className="h-4 w-4 shrink-0" />
                          <span>{error}</span>
                          <Button variant="ghost" size="sm" className="ml-auto p-0 h-auto" onClick={() => setError(null)}>
                            <X className="h-3 w-3" />
                          </Button>
                        </motion.div>
                      )}

                      <div
                        className={`border-2 border-dashed rounded-lg p-8 text-center transition-all duration-300 ${
                          dragActive
                            ? "border-primary bg-primary/5"
                            : "border-border hover:border-primary/50"
                        }`}
                        onDragEnter={handleDrag}
                        onDragLeave={handleDrag}
                        onDragOver={handleDrag}
                        onDrop={handleDrop}
                      >
                        <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                        <div className="text-lg font-medium mb-2">
                          Drag and drop your resume here
                        </div>
                        <div className="text-sm text-muted-foreground mb-4">
                          or click to browse files
                        </div>
                        <input
                          type="file"
                          multiple
                          accept=".pdf,.doc,.docx"
                          onChange={handleFileInput}
                          className="hidden"
                          id="file-upload"
                        />
                        <label htmlFor="file-upload">
                          <Button variant="outline" className="btn-secondary-premium" asChild>
                            <span>Browse Files</span>
                          </Button>
                        </label>
                      </div>
                    </div>

                    {/* Right: File list + upload btn */}
                    <div className="flex flex-col justify-between space-y-4">
                      <AnimatePresence>
                        {files.length > 0 && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="space-y-3"
                          >
                            {files.map((file, index) => (
                              <motion.div
                                key={index}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="flex items-center justify-between p-3 bg-muted/20 rounded-lg border border-border/30"
                              >
                                <div className="flex items-center space-x-3">
                                  <FileText className="h-5 w-5 text-primary" />
                                  <div>
                                    <div className="text-sm font-medium">{file.name}</div>
                                    <div className="text-xs text-muted-foreground">
                                      {(file.size / 1024 / 1024).toFixed(2)} MB
                                    </div>
                                  </div>
                                </div>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => removeFile(index)}
                                  className="text-muted-foreground hover:text-destructive"
                                  disabled={uploading}
                                >
                                  <X className="h-4 w-4" />
                                </Button>
                              </motion.div>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>

                      <Button
                        onClick={uploadFiles}
                        disabled={files.length === 0 || uploading}
                        className="w-full btn-hero mt-auto"
                      >
                        <Sparkles className="mr-2 h-4 w-4" />
                        Analyze Resume
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* Results Section */}
          {analysisResults && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="space-y-6"
            >
              {/* ATS Score Card — Hero */}
              {analysisResults.feedback && (
                <Card className="card-premium overflow-hidden">
                  <CardContent className="p-0">
                    <div className="grid grid-cols-1 lg:grid-cols-3">
                      {/* Left: Score ring + label */}
                      <div className="flex flex-col items-center justify-center p-8 border-b lg:border-b-0 lg:border-r border-border/20">
                        <ScoreRing score={analysisResults.feedback.overall_score} size={140} />
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 1 }}
                          className="mt-3 text-center"
                        >
                          <div className={`text-lg font-semibold ${getScoreColor(analysisResults.feedback.overall_score)}`}>
                            {getScoreLabel(analysisResults.feedback.overall_score)}
                          </div>
                          <div className="text-xs text-muted-foreground mt-1">ATS Resume Score</div>
                        </motion.div>
                      </div>

                      {/* Right: Factor breakdown */}
                      <div className="lg:col-span-2 p-6">
                        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4 flex items-center gap-2">
                          <BarChart3 className="h-4 w-4" />
                          Score Breakdown
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3">
                          {Object.entries(sectionScores).map(([key, val]) => (
                            <FactorBar key={key} name={key} score={val as number} />
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Quick Stats row */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="card-premium">
                  <CardContent className="flex items-center gap-4 p-6">
                    <div className="h-14 w-14 rounded-full bg-emerald-500/10 flex items-center justify-center">
                      <Layers className="h-7 w-7 text-emerald-400" />
                    </div>
                    <div>
                      <div className="text-xl font-bold">
                        {analysisResults.metadata.experience_level}
                      </div>
                      <div className="text-sm text-muted-foreground">Experience Level</div>
                    </div>
                  </CardContent>
                </Card>
                <Card className="card-premium">
                  <CardContent className="flex items-center gap-4 p-6">
                    <div className="h-14 w-14 rounded-full bg-sky-500/10 flex items-center justify-center">
                      <Tag className="h-7 w-7 text-sky-400" />
                    </div>
                    <div>
                      <div className="text-xl font-bold">
                        {analysisResults.metadata.industry_match}
                      </div>
                      <div className="text-sm text-muted-foreground">Industry Match</div>
                    </div>
                  </CardContent>
                </Card>
                <Card className="card-premium">
                  <CardContent className="flex items-center gap-4 p-6">
                    <div className="h-14 w-14 rounded-full bg-purple-500/10 flex items-center justify-center">
                      <Code className="h-7 w-7 text-purple-400" />
                    </div>
                    <div>
                      <div className="text-xl font-bold">
                        {analysisResults.skills.length}
                      </div>
                      <div className="text-sm text-muted-foreground">Skills Detected</div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Skills by Category */}
              <Card className="card-premium">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    Skills Extracted
                    <span className="text-sm font-normal text-muted-foreground ml-2">
                      ({analysisResults.skills.length} total)
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {Object.entries(groupedSkills).map(([category, skills]) => {
                      const cfg = CATEGORY_CONFIG[category] || CATEGORY_CONFIG.other
                      const Icon = cfg.icon
                      return (
                        <div key={category} className="space-y-3">
                          <div className="flex items-center gap-2">
                            <Icon className={`h-4 w-4 ${cfg.color.split(' ')[0]}`} />
                            <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                              {cfg.label}
                            </h4>
                            <span className="text-xs text-muted-foreground">({skills.length})</span>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {skills.map((skill, i) => (
                              <span
                                key={i}
                                className={`px-3 py-1 rounded-full text-sm border ${cfg.color}`}
                              >
                                {skill.name}
                              </span>
                            ))}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>

              {/* Strengths + Growth + Suggestions row */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Strength Areas */}
                <Card className="card-premium">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base text-green-500 flex items-center gap-2">
                      <CheckCircle className="h-4 w-4" />
                      Strength Areas
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {(analysisResults.metadata.strength_areas || []).map((area, index) => (
                        <li key={index} className="flex items-center space-x-2">
                          <CheckCircle className="h-3.5 w-3.5 text-green-500 shrink-0" />
                          <span className="text-sm">{area}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                {/* Growth Opportunities */}
                <Card className="card-premium">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base text-cyan-500 flex items-center gap-2">
                      <div className="h-4 w-4 rounded-full border-2 border-cyan-500" />
                      Growth Opportunities
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {(analysisResults.metadata.improvement_areas || []).map((area, index) => (
                        <li key={index} className="flex items-center space-x-2">
                          <div className="h-3.5 w-3.5 rounded-full border-2 border-cyan-500 shrink-0" />
                          <span className="text-sm">{area}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                {/* AI Suggestions */}
                {analysisResults.feedback?.suggestions?.length > 0 && (
                  <Card className="card-premium">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base text-amber-500 flex items-center gap-2">
                        <Sparkles className="h-4 w-4" />
                        AI Suggestions
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {analysisResults.feedback.suggestions.map((tip, index) => (
                          <li key={index} className="flex items-start space-x-2">
                            <Sparkles className="h-3.5 w-3.5 text-amber-500 mt-0.5 shrink-0" />
                            <span className="text-sm">{tip}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                )}
              </div>

              {/* CTA */}
              <div className="flex justify-center">
                <Button className="btn-hero px-12">
                  Generate Career Roadmap
                </Button>
              </div>
            </motion.div>
          )}

          {/* Placeholder when no results */}
          {!analysisResults && !uploading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <Card className="card-premium">
                <CardContent className="text-center py-16">
                  <FileText className="mx-auto h-16 w-16 text-muted-foreground/50 mb-4" />
                  <div className="text-lg font-medium text-muted-foreground mb-2">
                    Upload your resume to see insights
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Our AI will analyze your skills, experience, and career potential
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
