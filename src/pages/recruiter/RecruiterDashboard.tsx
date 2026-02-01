"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Users, TrendingUp, Star, Calendar, FileText, Plus } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Navbar } from "@/components/Navbar"

export default function RecruiterDashboard() {
  const [stats] = useState({
    totalCandidates: 1284,
    activeJobs: 23,
    hiredThisMonth: 12,
    responseRate: 87
  })

  const recentApplications = [
    { name: "Sarah Johnson", role: "Senior Developer", score: 95, status: "Interview Scheduled" },
    { name: "Mike Chen", role: "Product Manager", score: 88, status: "Under Review" },
    { name: "Emily Davis", role: "UX Designer", score: 92, status: "Shortlisted" },
    { name: "Alex Rodriguez", role: "Data Scientist", score: 90, status: "Offer Extended" }
  ]

  const activeJobs = [
    { title: "Senior Full Stack Developer", applications: 45, posted: "2 days ago", status: "Active" },
    { title: "Product Marketing Manager", applications: 32, posted: "1 week ago", status: "Active" },
    { title: "Lead UX Designer", applications: 28, posted: "3 days ago", status: "Active" },
    { title: "DevOps Engineer", applications: 19, posted: "5 days ago", status: "Active" }
  ]

  return (
    <div className="min-h-screen bg-hero-gradient">
      <Navbar />
      
      <div className="px-6 py-24">
        <div className="w-full">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <h1 className="text-4xl font-bold hero-text mb-2">Recruiter Dashboard</h1>
            <p className="text-muted-foreground text-lg">Manage your hiring pipeline and find the best talent</p>
          </motion.div>

          {/* Stats Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
          >
            <Card className="card-premium">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Total Candidates</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold">{stats.totalCandidates.toLocaleString()}</span>
                  <Users className="h-5 w-5 text-primary" />
                </div>
              </CardContent>
            </Card>

            <Card className="card-premium">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Active Jobs</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold">{stats.activeJobs}</span>
                  <FileText className="h-5 w-5 text-primary" />
                </div>
              </CardContent>
            </Card>

            <Card className="card-premium">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Hired This Month</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold">{stats.hiredThisMonth}</span>
                  <TrendingUp className="h-5 w-5 text-emerald-500" />
                </div>
              </CardContent>
            </Card>

            <Card className="card-premium">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Response Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold">{stats.responseRate}%</span>
                  <Star className="h-5 w-5 text-amber-500" />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Recent Applications */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card className="card-premium">
                <CardHeader>
                  <CardTitle>Recent Applications</CardTitle>
                  <CardDescription>Latest candidate applications across all positions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentApplications.map((application, index) => (
                      <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-secondary/50">
                        <div className="flex-1">
                          <h4 className="font-medium">{application.name}</h4>
                          <p className="text-sm text-muted-foreground">{application.role}</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="text-right">
                            <div className="text-sm font-medium">Score: {application.score}%</div>
                            <Badge variant="secondary" className="text-xs">
                              {application.status}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Active Job Postings */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Card className="card-premium">
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Active Job Postings</CardTitle>
                    <CardDescription>Current open positions and their performance</CardDescription>
                  </div>
                  <Button size="sm" className="btn-hero">
                    <Plus className="h-4 w-4 mr-2" />
                    New Job
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {activeJobs.map((job, index) => (
                      <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-secondary/50">
                        <div className="flex-1">
                          <h4 className="font-medium">{job.title}</h4>
                          <p className="text-sm text-muted-foreground">Posted {job.posted}</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="text-right">
                            <div className="text-sm font-medium">{job.applications} applications</div>
                            <Badge variant="secondary" className="text-xs">
                              {job.status}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-8"
          >
            <Card className="card-premium">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Common tasks and shortcuts</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Button variant="outline" className="h-20 flex flex-col gap-2">
                    <Plus className="h-6 w-6" />
                    Post New Job
                  </Button>
                  <Button variant="outline" className="h-20 flex flex-col gap-2">
                    <Users className="h-6 w-6" />
                    Browse Candidates
                  </Button>
                  <Button variant="outline" className="h-20 flex flex-col gap-2">
                    <Calendar className="h-6 w-6" />
                    Schedule Interviews
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  )
}