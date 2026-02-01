
"use client"

import { useState, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Upload, FileText, CheckCircle, X, Loader2 } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Navbar } from "@/components/Navbar"
import { Footer } from "@/components/Footer"

export default function UploadResume() {
  const [dragActive, setDragActive] = useState(false)
  const [files, setFiles] = useState<File[]>([])
  const [uploading, setUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [analysisResults, setAnalysisResults] = useState<any>(null)

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
    if (files.length === 0) return

    setUploading(true)
    setUploadProgress(0)

    // Simulate upload progress
    const progressInterval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 90) {
          clearInterval(progressInterval)
          return 90
        }
        return prev + 10
      })
    }, 200)

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 3000))
    
    setUploadProgress(100)
    setUploading(false)
    
    // Mock analysis results
    setAnalysisResults({
      skillsExtracted: ["React.js", "Node.js", "Python", "AWS", "TypeScript"],
      experienceLevel: "Senior",
      industryMatch: "Technology",
      improvementAreas: ["Leadership skills", "Data visualization", "Mobile development"],
      strengthAreas: ["Full-stack development", "Problem solving", "Team collaboration"]
    })
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-20 pb-12">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
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

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Upload Section */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="card-premium">
                <CardHeader>
                  <CardTitle>Resume Upload</CardTitle>
                  <CardDescription>
                    Support for PDF, DOC, and DOCX files up to 5MB
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Drag & Drop Area */}
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

                  {/* File List */}
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
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </motion.div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Upload Progress */}
                  {uploading && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="space-y-3"
                    >
                      <div className="flex items-center justify-between text-sm">
                        <span>Uploading and analyzing...</span>
                        <span>{uploadProgress}%</span>
                      </div>
                      <Progress value={uploadProgress} className="h-2" />
                    </motion.div>
                  )}

                  {/* Upload Button */}
                  <Button
                    onClick={uploadFiles}
                    disabled={files.length === 0 || uploading}
                    className="w-full btn-hero"
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
                </CardContent>
              </Card>
            </motion.div>

            {/* Results Section */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="card-premium">
                <CardHeader>
                  <CardTitle>Analysis Results</CardTitle>
                  <CardDescription>
                    AI-powered insights from your resume
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {!analysisResults ? (
                    <div className="text-center py-12">
                      <FileText className="mx-auto h-16 w-16 text-muted-foreground/50 mb-4" />
                      <div className="text-lg font-medium text-muted-foreground mb-2">
                        Upload your resume to see insights
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Our AI will analyze your skills, experience, and career potential
                      </div>
                    </div>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="space-y-6"
                    >
                      {/* Skills Extracted */}
                      <div>
                        <div className="flex items-center space-x-2 mb-3">
                          <CheckCircle className="h-5 w-5 text-emerald-500" />
                          <h3 className="font-semibold">Skills Extracted</h3>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {analysisResults.skillsExtracted.map((skill: string, index: number) => (
                            <span
                              key={index}
                              className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm border border-primary/20"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Experience Level */}
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium">Experience Level</span>
                          <span className="text-primary font-semibold">
                            {analysisResults.experienceLevel}
                          </span>
                        </div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium">Industry Match</span>
                          <span className="text-accent font-semibold">
                            {analysisResults.industryMatch}
                          </span>
                        </div>
                      </div>

                      {/* Strength Areas */}
                      <div>
                        <h3 className="font-semibold mb-3 text-emerald-500">Strength Areas</h3>
                        <ul className="space-y-2">
                          {analysisResults.strengthAreas.map((area: string, index: number) => (
                            <li key={index} className="flex items-center space-x-2">
                              <CheckCircle className="h-4 w-4 text-emerald-500" />
                              <span className="text-sm">{area}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Improvement Areas */}
                      <div>
                        <h3 className="font-semibold mb-3 text-amber-500">Growth Opportunities</h3>
                        <ul className="space-y-2">
                          {analysisResults.improvementAreas.map((area: string, index: number) => (
                            <li key={index} className="flex items-center space-x-2">
                              <div className="h-4 w-4 rounded-full border-2 border-amber-500" />
                              <span className="text-sm">{area}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <Button className="w-full btn-hero">
                        Generate Career Roadmap
                      </Button>
                    </motion.div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  )
}
