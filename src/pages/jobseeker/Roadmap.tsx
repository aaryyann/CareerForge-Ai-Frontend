
"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { CheckCircle, Circle, Clock, Target, TrendingUp, BookOpen } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Navbar } from "@/components/Navbar"
import { Footer } from "@/components/Footer"

const roadmapData = {
  current: {
    title: "Senior Frontend Developer",
    progress: 75,
    timeRemaining: "3-6 months",
    nextMilestone: "System Design Mastery"
  },
  milestones: [
    {
      id: 1,
      title: "Frontend Fundamentals",
      description: "Master HTML, CSS, and JavaScript basics",
      status: "completed",
      completedDate: "2023-03-15",
      skills: ["HTML5", "CSS3", "JavaScript ES6+"],
      resources: ["MDN Web Docs", "freeCodeCamp", "JavaScript.info"],
      estimatedTime: "2-3 months"
    },
    {
      id: 2,
      title: "React Ecosystem",
      description: "Learn React, hooks, state management, and routing",
      status: "completed",
      completedDate: "2023-07-20",
      skills: ["React", "Redux", "React Router", "Hooks"],
      resources: ["React Documentation", "Redux Toolkit", "React Router Guide"],
      estimatedTime: "3-4 months"
    },
    {
      id: 3,
      title: "Modern Development Tools",
      description: "Master build tools, version control, and testing",
      status: "completed",
      completedDate: "2023-11-10",
      skills: ["Webpack", "Vite", "Git", "Jest", "Cypress"],
      resources: ["Webpack Guide", "Jest Documentation", "Cypress.io"],
      estimatedTime: "2-3 months"
    },
    {
      id: 4,
      title: "TypeScript & Advanced React",
      description: "Advanced React patterns and TypeScript integration",
      status: "in-progress",
      progress: 60,
      skills: ["TypeScript", "Advanced React Patterns", "Performance Optimization"],
      resources: ["TypeScript Handbook", "React Performance", "Advanced React Patterns"],
      estimatedTime: "2-3 months"
    },
    {
      id: 5,
      title: "System Design Fundamentals",
      description: "Learn to design scalable frontend architectures",
      status: "upcoming",
      skills: ["Architecture Patterns", "Scalability", "Performance", "Security"],
      resources: ["System Design Interview", "Frontend Architecture", "Web Performance"],
      estimatedTime: "3-4 months"
    },
    {
      id: 6,
      title: "Leadership & Mentoring",
      description: "Develop leadership skills and start mentoring others",
      status: "upcoming",
      skills: ["Team Leadership", "Code Reviews", "Mentoring", "Technical Communication"],
      resources: ["Engineering Leadership", "Code Review Best Practices", "Technical Writing"],
      estimatedTime: "Ongoing"
    }
  ],
  alternativePaths: [
    {
      title: "Full-Stack Developer",
      description: "Expand into backend development",
      duration: "6-12 months",
      skills: ["Node.js", "Databases", "API Design", "DevOps"],
    },
    {
      title: "Frontend Architect",
      description: "Specialize in large-scale frontend architecture",
      duration: "8-12 months",
      skills: ["Micro-frontends", "Design Systems", "Performance", "Team Leadership"],
    },
    {
      title: "Product Manager",
      description: "Transition to product management role",
      duration: "6-9 months",
      skills: ["Product Strategy", "User Research", "Analytics", "Stakeholder Management"],
    }
  ]
}

export default function Roadmap() {
  const [activeTab, setActiveTab] = useState("current")

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "text-emerald-500"
      case "in-progress": return "text-amber-500"
      case "upcoming": return "text-muted-foreground"
      default: return "text-muted-foreground"
    }
  }

  const getStatusIcon = (status: string, progress?: number) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-6 w-6 text-emerald-500 fill-current" />
      case "in-progress":
        return (
          <div className="relative h-6 w-6">
            <Circle className="h-6 w-6 text-amber-500" />
            <div className="absolute inset-1 rounded-full bg-amber-500" style={{ 
              clipPath: `polygon(0 0, ${progress || 0}% 0, ${progress || 0}% 100%, 0 100%)` 
            }} />
          </div>
        )
      default:
        return <Circle className="h-6 w-6 text-muted-foreground" />
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-20 pb-12">
        <div className="w-full px-6 lg:px-8">
          {/* Header */}
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

          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
            <TabsList className="grid w-full grid-cols-3 bg-muted/20">
              <TabsTrigger value="current">Current Path</TabsTrigger>
              <TabsTrigger value="milestones">Milestones</TabsTrigger>
              <TabsTrigger value="alternatives">Alternative Paths</TabsTrigger>
            </TabsList>

            <TabsContent value="current" className="space-y-6">
              {/* Current Progress */}
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
                          <span>Path to {roadmapData.current.title}</span>
                        </CardTitle>
                        <CardDescription>
                          {roadmapData.current.timeRemaining} remaining to reach your goal
                        </CardDescription>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-primary">
                          {roadmapData.current.progress}%
                        </div>
                        <div className="text-sm text-muted-foreground">Complete</div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Progress value={roadmapData.current.progress} className="h-3" />
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Next milestone:</span>
                      <span className="font-medium text-amber-500">
                        {roadmapData.current.nextMilestone}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Recent Achievements */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Card className="card-premium">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <TrendingUp className="h-6 w-6 text-emerald-500" />
                      <span>Recent Achievements</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {roadmapData.milestones
                        .filter(m => m.status === "completed")
                        .slice(-3)
                        .map((milestone) => (
                        <div key={milestone.id} className="flex items-center space-x-3 p-3 rounded-lg bg-emerald-500/5 border border-emerald-500/20">
                          <CheckCircle className="h-5 w-5 text-emerald-500 fill-current" />
                          <div className="flex-1">
                            <div className="font-medium">{milestone.title}</div>
                            <div className="text-sm text-muted-foreground">
                              Completed on {new Date(milestone.completedDate!).toLocaleDateString()}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>

            <TabsContent value="milestones" className="space-y-6">
              {/* Timeline */}
              <div className="space-y-8">
                {roadmapData.milestones.map((milestone, index) => (
                  <motion.div
                    key={milestone.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="relative"
                  >
                    {/* Timeline line */}
                    {index < roadmapData.milestones.length - 1 && (
                      <div className="absolute left-3 top-12 bottom-0 w-0.5 bg-border" />
                    )}
                    
                    <div className="flex items-start space-x-4">
                      <div className="relative z-10 bg-background p-1">
                        {getStatusIcon(milestone.status, milestone.progress)}
                      </div>
                      
                      <Card className={`flex-1 card-premium ${
                        milestone.status === "completed" 
                          ? "border-emerald-500/30 bg-emerald-500/5" 
                          : milestone.status === "in-progress"
                          ? "border-amber-500/30 bg-amber-500/5"
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
                                milestone.status === "in-progress" ? "secondary" : "outline"
                              }
                              className={
                                milestone.status === "completed" 
                                  ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
                                  : milestone.status === "in-progress"
                                  ? "bg-amber-500/10 text-amber-500 border-amber-500/20"
                                  : ""
                              }
                            >
                              {milestone.status === "completed" ? "Completed" :
                               milestone.status === "in-progress" ? "In Progress" : "Upcoming"}
                            </Badge>
                          </div>
                          <CardDescription>{milestone.description}</CardDescription>
                        </CardHeader>
                        
                        <CardContent className="space-y-4">
                          {milestone.status === "in-progress" && milestone.progress && (
                            <div className="space-y-2">
                              <div className="flex justify-between text-sm">
                                <span>Progress</span>
                                <span className="text-amber-500 font-medium">
                                  {milestone.progress}%
                                </span>
                              </div>
                              <Progress value={milestone.progress} className="h-2" />
                            </div>
                          )}
                          
                          <div>
                            <h4 className="font-medium mb-2">Skills to Learn</h4>
                            <div className="flex flex-wrap gap-2">
                              {milestone.skills.map((skill) => (
                                <Badge key={skill} variant="outline" className="text-xs">
                                  {skill}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          
                          <div>
                            <h4 className="font-medium mb-2 flex items-center space-x-2">
                              <BookOpen className="h-4 w-4" />
                              <span>Recommended Resources</span>
                            </h4>
                            <ul className="text-sm text-muted-foreground space-y-1">
                              {milestone.resources.map((resource, i) => (
                                <li key={i} className="flex items-center space-x-2">
                                  <Circle className="h-1.5 w-1.5 fill-current" />
                                  <span>{resource}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                          
                          <div className="flex items-center justify-between pt-2">
                            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                              <Clock className="h-4 w-4" />
                              <span>Est. Time: {milestone.estimatedTime}</span>
                            </div>
                            
                            {milestone.status === "upcoming" && (
                              <Button size="sm" className="btn-hero">
                                Start Learning
                              </Button>
                            )}
                            
                            {milestone.status === "in-progress" && (
                              <Button size="sm" variant="outline" className="btn-secondary-premium">
                                Continue
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
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {roadmapData.alternativePaths.map((path, index) => (
                  <motion.div
                    key={path.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="card-premium h-full group">
                      <CardHeader>
                        <CardTitle className="group-hover:text-primary transition-colors">
                          {path.title}
                        </CardTitle>
                        <CardDescription>{path.description}</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                          <Clock className="h-4 w-4" />
                          <span>Duration: {path.duration}</span>
                        </div>
                        
                        <div>
                          <h4 className="font-medium mb-2">Key Skills</h4>
                          <div className="flex flex-wrap gap-2">
                            {path.skills.map((skill) => (
                              <Badge key={skill} variant="outline" className="text-xs">
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        
                        <Button className="w-full btn-hero">
                          Switch to This Path
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  )
}
