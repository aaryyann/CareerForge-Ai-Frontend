
"use client"

import { motion } from "framer-motion"
import { BarChart3, Users, Target, TrendingUp, Star, CheckCircle } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Navbar } from "@/components/Navbar"
import { Footer } from "@/components/Footer"

const stats = [
  {
    name: "Profile Completion",
    value: "85%",
    change: "+12%",
    changeType: "positive",
    icon: CheckCircle,
  },
  {
    name: "Mentor Matches",
    value: "24",
    change: "+3",
    changeType: "positive",
    icon: Users,
  },
  {
    name: "Skills Matched",
    value: "92%",
    change: "+5%",
    changeType: "positive",
    icon: Target,
  },
  {
    name: "Career Score",
    value: "4.8",
    change: "+0.3",
    changeType: "positive",
    icon: Star,
  },
]

const recentActivity = [
  {
    id: 1,
    type: "mentor_match",
    title: "New mentor match found",
    description: "Sarah Chen from Google wants to connect",
    time: "2 hours ago",
    icon: Users,
  },
  {
    id: 2,
    type: "skill_update",
    title: "Skill assessment completed",
    description: "React.js proficiency updated to Expert level",
    time: "1 day ago",
    icon: TrendingUp,
  },
  {
    id: 3,
    type: "roadmap_progress",
    title: "Roadmap milestone achieved",
    description: "Full-stack development path: 60% complete",
    time: "2 days ago",
    icon: Target,
  },
]

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-20 pb-12">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl font-bold"
            >
              Welcome back, <span className="hero-text">Alex</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-muted-foreground mt-2"
            >
              Here's what's happening with your career development
            </motion.p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="card-premium">
                  <CardContent className="p-6">
                    <div className="flex items-center">
                      <stat.icon className="h-8 w-8 text-primary" />
                      <div className="ml-4 flex-1">
                        <p className="text-sm font-medium text-muted-foreground">
                          {stat.name}
                        </p>
                        <div className="flex items-baseline">
                          <p className="text-2xl font-semibold">{stat.value}</p>
                          <p className={`ml-2 text-sm font-medium ${
                            stat.changeType === 'positive' 
                              ? 'text-emerald-500' 
                              : 'text-rose-500'
                          }`}>
                            {stat.change}
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            {/* Profile Completion */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-2"
            >
              <Card className="card-premium">
                <CardHeader>
                  <CardTitle>Complete Your Profile</CardTitle>
                  <CardDescription>
                    Boost your visibility to mentors and opportunities
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span>Overall Progress</span>
                      <span className="text-muted-foreground">85%</span>
                    </div>
                    <Progress value={85} className="h-3" />
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 rounded-lg bg-muted/20 border border-border/30">
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="h-5 w-5 text-emerald-500" />
                        <span className="text-sm">Professional Summary</span>
                      </div>
                      <span className="text-xs text-emerald-500 font-medium">Complete</span>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 rounded-lg bg-muted/20 border border-border/30">
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="h-5 w-5 text-emerald-500" />
                        <span className="text-sm">Skills & Experience</span>
                      </div>
                      <span className="text-xs text-emerald-500 font-medium">Complete</span>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 rounded-lg bg-amber-500/10 border border-amber-500/30">
                      <div className="flex items-center space-x-3">
                        <div className="h-5 w-5 rounded-full border-2 border-amber-500"></div>
                        <span className="text-sm">Career Preferences</span>
                      </div>
                      <span className="text-xs text-amber-500 font-medium">15% left</span>
                    </div>
                  </div>
                  
                  <Button className="w-full btn-hero">
                    Complete Profile
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            {/* Recent Activity */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="card-premium">
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Your latest career updates</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {recentActivity.map((activity) => (
                    <div
                      key={activity.id}
                      className="flex items-start space-x-3 p-3 rounded-lg hover:bg-muted/20 transition-colors"
                    >
                      <activity.icon className="h-5 w-5 text-primary mt-0.5" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium">{activity.title}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {activity.description}
                        </p>
                        <p className="text-xs text-muted-foreground mt-2">
                          {activity.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="card-premium">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Jump into your career development</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <Button variant="outline" className="btn-secondary-premium h-auto py-4 flex flex-col space-y-2">
                    <Users className="h-6 w-6" />
                    <span>Find Mentors</span>
                  </Button>
                  <Button variant="outline" className="btn-secondary-premium h-auto py-4 flex flex-col space-y-2">
                    <Target className="h-6 w-6" />
                    <span>Explore Roles</span>
                  </Button>
                  <Button variant="outline" className="btn-secondary-premium h-auto py-4 flex flex-col space-y-2">
                    <BarChart3 className="h-6 w-6" />
                    <span>View Analytics</span>
                  </Button>
                  <Button variant="outline" className="btn-secondary-premium h-auto py-4 flex flex-col space-y-2">
                    <TrendingUp className="h-6 w-6" />
                    <span>Update Skills</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </main>
      
      <Footer />
    </div>
  )
}
