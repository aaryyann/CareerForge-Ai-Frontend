"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Users, Calendar, MessageCircle, Star, Clock, TrendingUp } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Navbar } from "@/components/Navbar"

export default function MentorDashboard() {
  const [stats] = useState({
    totalMentees: 18,
    sessionsThisMonth: 24,
    avgRating: 4.8,
    hoursThisMonth: 36
  })

  const upcomingSessions = [
    { mentee: "Sarah Johnson", topic: "Career Transition", time: "2:00 PM", date: "Today" },
    { mentee: "Mike Chen", topic: "Technical Interview Prep", time: "10:00 AM", date: "Tomorrow" },
    { mentee: "Emily Davis", topic: "Leadership Skills", time: "3:30 PM", date: "Dec 20" },
    { mentee: "Alex Rodriguez", topic: "Salary Negotiation", time: "1:00 PM", date: "Dec 21" }
  ]

  const mentees = [
    { name: "Sarah Johnson", progress: 75, goal: "Career Change", lastSession: "2 days ago" },
    { name: "Mike Chen", progress: 60, goal: "Technical Skills", lastSession: "1 week ago" },
    { name: "Emily Davis", progress: 90, goal: "Leadership", lastSession: "3 days ago" },
    { name: "Alex Rodriguez", progress: 45, goal: "Negotiation", lastSession: "5 days ago" }
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
            <h1 className="text-4xl font-bold hero-text mb-2">Mentor Dashboard</h1>
            <p className="text-muted-foreground text-lg">Guide and inspire the next generation of professionals</p>
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
                <CardTitle className="text-sm font-medium text-muted-foreground">Total Mentees</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold">{stats.totalMentees}</span>
                  <Users className="h-5 w-5 text-primary" />
                </div>
              </CardContent>
            </Card>

            <Card className="card-premium">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Sessions This Month</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold">{stats.sessionsThisMonth}</span>
                  <Calendar className="h-5 w-5 text-primary" />
                </div>
              </CardContent>
            </Card>

            <Card className="card-premium">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Average Rating</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold">{stats.avgRating}</span>
                  <Star className="h-5 w-5 text-amber-500" />
                </div>
              </CardContent>
            </Card>

            <Card className="card-premium">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Hours This Month</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold">{stats.hoursThisMonth}h</span>
                  <Clock className="h-5 w-5 text-emerald-500" />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Upcoming Sessions */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card className="card-premium">
                <CardHeader>
                  <CardTitle>Upcoming Sessions</CardTitle>
                  <CardDescription>Your scheduled mentoring sessions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {upcomingSessions.map((session, index) => (
                      <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-secondary/50">
                        <div className="flex-1">
                          <h4 className="font-medium">{session.mentee}</h4>
                          <p className="text-sm text-muted-foreground">{session.topic}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium">{session.time}</p>
                          <p className="text-xs text-muted-foreground">{session.date}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Button className="w-full mt-4 btn-hero">
                    <Calendar className="h-4 w-4 mr-2" />
                    View Full Calendar
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            {/* Mentee Progress */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Card className="card-premium">
                <CardHeader>
                  <CardTitle>Mentee Progress</CardTitle>
                  <CardDescription>Track your mentees' development</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {mentees.map((mentee, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <div>
                            <h4 className="font-medium">{mentee.name}</h4>
                            <p className="text-sm text-muted-foreground">{mentee.goal}</p>
                          </div>
                          <Badge variant="outline" className="text-xs">
                            {mentee.lastSession}
                          </Badge>
                        </div>
                        <div className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span>Progress</span>
                            <span>{mentee.progress}%</span>
                          </div>
                          <Progress value={mentee.progress} className="h-2" />
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
                <CardDescription>Common mentoring tasks</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <Button variant="outline" className="h-20 flex flex-col gap-2">
                    <Calendar className="h-6 w-6" />
                    Schedule Session
                  </Button>
                  <Button variant="outline" className="h-20 flex flex-col gap-2">
                    <MessageCircle className="h-6 w-6" />
                    Send Message
                  </Button>
                  <Button variant="outline" className="h-20 flex flex-col gap-2">
                    <Users className="h-6 w-6" />
                    Find New Mentees
                  </Button>
                  <Button variant="outline" className="h-20 flex flex-col gap-2">
                    <TrendingUp className="h-6 w-6" />
                    View Analytics
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