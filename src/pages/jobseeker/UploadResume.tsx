
"use client"

import { useState, useCallback, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Upload, FileText, CheckCircle, X, Loader2, AlertCircle, Star, Code, Database, Cloud, Wrench, Brain, Users, Layers, Tag } from "lucide-react"
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

function groupSkillsByCategory(skills: ResumeSkill[]): Record<string, ResumeSkill[]> {
  return skills.reduce((acc, skill) => {
    const cat = skill.category || "other"
    if (!acc[cat]) acc[cat] = []
    acc[cat].push(skill)
    return acc
  }, {} as Record<string, ResumeSkill[]>)
}

export default function UploadResume() {
  const { user } = useAuth()
  const [dragActive, setDragActive] = useState(false)
  const [files, setFiles] = useState<File[]>([])
  const [uploading, setUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
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
    setError(null)
    setAnalysisResults(null)

    try {
      const result = await resumeApi.upload(
        files[0],
        user.id,
        (progress) => setUploadProgress(progress),
      )

      setUploadProgress(100)
      setAnalysisResults(result.parsed_data)
    } catch (err: any) {
      setError(err.message || "Failed to upload resume. Please try again.")
    } finally {
      setUploading(false)
    }
  }

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

          {/* Upload Section — full width */}
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

                  {/* Right: File list + progress + upload btn */}
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

                    {uploading && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-3"
                      >
                        <div className="flex items-center justify-between text-sm">
                          <span>
                            {uploadProgress < 50
                              ? "Uploading resume..."
                              : uploadProgress < 100
                                ? "AI is analyzing your resume..."
                                : "Analysis complete!"}
                          </span>
                          <span>{uploadProgress}%</span>
                        </div>
                        <Progress value={uploadProgress} className="h-2" />
                      </motion.div>
                    )}

                    <Button
                      onClick={uploadFiles}
                      disabled={files.length === 0 || uploading}
                      className="w-full btn-hero mt-auto"
                    >
                      {uploading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Analyzing Resume...
                        </>
                      ) : (
                        `Upload ${files.length} ${files.length === 1 ? 'File' : 'Files'}`
                      )}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Results Section — full width */}
          {analysisResults && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="space-y-6"
            >
              {/* Top row: Score + Experience + Industry */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {analysisResults.feedback && (
                  <Card className="card-premium">
                    <CardContent className="flex items-center gap-4 p-6">
                      <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center">
                        <Star className="h-7 w-7 text-primary" />
                      </div>
                      <div>
                        <div className="text-3xl font-bold text-primary">
                          {analysisResults.feedback.overall_score}
                        </div>
                        <div className="text-sm text-muted-foreground">Resume Score</div>
                      </div>
                    </CardContent>
                  </Card>
                )}
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
              </div>

              {/* Skills by Category — full width */}
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
                      {analysisResults.metadata.strength_areas.map((area, index) => (
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
                      {analysisResults.metadata.improvement_areas.map((area, index) => (
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
                        <AlertCircle className="h-4 w-4" />
                        AI Suggestions
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {analysisResults.feedback.suggestions.map((tip, index) => (
                          <li key={index} className="flex items-start space-x-2">
                            <AlertCircle className="h-3.5 w-3.5 text-amber-500 mt-0.5 shrink-0" />
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
