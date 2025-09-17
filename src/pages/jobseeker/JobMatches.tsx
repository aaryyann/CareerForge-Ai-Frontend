import { useState } from "react"
import { motion } from "framer-motion"
import { MapPin, Briefcase, Heart, ExternalLink, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

const mockMatches = [
  {
    id: 1,
    title: "Senior React Developer",
    company: "TechCorp Inc.",
    location: "San Francisco, CA",
    salary: "$120k - $160k",
    matchScore: 95,
    type: "Full-time",
    skills: ["React", "TypeScript", "Node.js"],
    posted: "2 days ago"
  },
  {
    id: 2,
    title: "Frontend Engineer",
    company: "StartupXYZ",
    location: "Remote",
    salary: "$100k - $140k",
    matchScore: 88,
    type: "Full-time",
    skills: ["React", "JavaScript", "CSS"],
    posted: "1 week ago"
  }
]

export default function JobMatches() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-6 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Job Matches</h1>
            <p className="text-muted-foreground mt-2">Personalized job recommendations based on your profile</p>
          </div>
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            Filter Jobs
          </Button>
        </div>

        <div className="grid gap-6">
          {mockMatches.map((job, index) => (
            <motion.div
              key={job.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="card-premium">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl">{job.title}</CardTitle>
                      <CardDescription className="text-base mt-1 flex items-center gap-4">
                        <span>{job.company}</span>
                        <span className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {job.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Briefcase className="h-4 w-4" />
                          {job.type}
                        </span>
                      </CardDescription>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-semibold text-emerald-400 mb-2">{job.matchScore}% Match</div>
                      <Progress value={job.matchScore} className="w-20 h-2" />
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-semibold">{job.salary}</span>
                      <span className="text-sm text-muted-foreground">Posted {job.posted}</span>
                    </div>
                    <div className="flex gap-2">
                      {job.skills.map((skill) => (
                        <Badge key={skill} variant="secondary">{skill}</Badge>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Heart className="h-4 w-4 mr-2" />
                        Save Job
                      </Button>
                      <Button size="sm" className="btn-hero">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Apply Now
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}