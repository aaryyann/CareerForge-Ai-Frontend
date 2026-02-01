
"use client"

import { motion } from "framer-motion"
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { TrendingUp, Users, Target, Award, Calendar, Download } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Navbar } from "@/components/Navbar"
import { Footer } from "@/components/Footer"

const skillProgressData = [
  { skill: "React", current: 85, target: 95, growth: 15 },
  { skill: "TypeScript", current: 70, target: 90, growth: 25 },
  { skill: "Node.js", current: 60, target: 80, growth: 20 },
  { skill: "System Design", current: 45, target: 75, growth: 30 },
  { skill: "AWS", current: 35, target: 70, growth: 35 },
]

const careerGrowthData = [
  { month: "Jan", applications: 12, interviews: 3, offers: 1, mentorSessions: 4 },
  { month: "Feb", applications: 18, interviews: 5, offers: 2, mentorSessions: 6 },
  { month: "Mar", applications: 15, interviews: 7, offers: 3, mentorSessions: 8 },
  { month: "Apr", applications: 22, interviews: 9, offers: 4, mentorSessions: 10 },
  { month: "May", applications: 28, interviews: 12, offers: 5, mentorSessions: 12 },
  { month: "Jun", applications: 25, interviews: 15, offers: 7, mentorSessions: 14 },
]

const industryMatchData = [
  { name: "Technology", value: 45, color: "#10b981" },
  { name: "Finance", value: 25, color: "#f59e0b" },
  { name: "Healthcare", value: 15, color: "#ef4444" },
  { name: "Education", value: 10, color: "#8b5cf6" },
  { name: "Other", value: 5, color: "#6b7280" },
]

const monthlyEngagementData = [
  { month: "Jan", profileViews: 45, mentorConnections: 3, skillAssessments: 2 },
  { month: "Feb", profileViews: 62, mentorConnections: 5, skillAssessments: 4 },
  { month: "Mar", profileViews: 78, mentorConnections: 7, skillAssessments: 3 },
  { month: "Apr", profileViews: 95, mentorConnections: 9, skillAssessments: 5 },
  { month: "May", profileViews: 118, mentorConnections: 12, skillAssessments: 7 },
  { month: "Jun", profileViews: 142, mentorConnections: 15, skillAssessments: 8 },
]

const stats = [
  {
    name: "Career Score",
    value: "87",
    change: "+12",
    changeType: "positive",
    icon: Award,
  },
  {
    name: "Profile Views",
    value: "2,847",
    change: "+18%",
    changeType: "positive",
    icon: TrendingUp,
  },
  {
    name: "Mentor Connections",
    value: "24",
    change: "+6",
    changeType: "positive",
    icon: Users,
  },
  {
    name: "Skill Matches",
    value: "156",
    change: "+23",
    changeType: "positive",
    icon: Target,
  },
]

export default function Analytics() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-20 pb-12">
        <div className="w-full px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8 flex items-center justify-between">
            <div>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-4xl font-bold mb-4"
              >
                Career <span className="hero-text">Analytics</span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-muted-foreground text-lg"
              >
                Track your progress and optimize your career development
              </motion.p>
            </div>
            <div className="flex items-center space-x-3">
              <Select defaultValue="6months">
                <SelectTrigger className="w-[180px] input-premium">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1month">Last Month</SelectItem>
                  <SelectItem value="3months">Last 3 Months</SelectItem>
                  <SelectItem value="6months">Last 6 Months</SelectItem>
                  <SelectItem value="1year">Last Year</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" className="btn-secondary-premium">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
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

          <Tabs defaultValue="overview" className="space-y-8">
            <TabsList className="grid w-full grid-cols-4 bg-muted/20">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="skills">Skills</TabsTrigger>
              <TabsTrigger value="engagement">Engagement</TabsTrigger>
              <TabsTrigger value="matches">Matches</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              {/* Career Growth Chart */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Card className="card-premium">
                  <CardHeader>
                    <CardTitle>Career Activity Overview</CardTitle>
                    <CardDescription>
                      Track your job applications, interviews, and mentor sessions
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={careerGrowthData}>
                          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                          <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                          <YAxis stroke="hsl(var(--muted-foreground))" />
                          <Tooltip 
                            contentStyle={{
                              backgroundColor: "hsl(var(--card))",
                              border: "1px solid hsl(var(--border))",
                              borderRadius: "8px"
                            }}
                          />
                          <Legend />
                          <Line type="monotone" dataKey="applications" stroke="#10b981" strokeWidth={2} name="Applications" />
                          <Line type="monotone" dataKey="interviews" stroke="#f59e0b" strokeWidth={2} name="Interviews" />
                          <Line type="monotone" dataKey="offers" stroke="#ef4444" strokeWidth={2} name="Offers" />
                          <Line type="monotone" dataKey="mentorSessions" stroke="#8b5cf6" strokeWidth={2} name="Mentor Sessions" />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Industry Match Distribution */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Card className="card-premium">
                  <CardHeader>
                    <CardTitle>Industry Match Distribution</CardTitle>
                    <CardDescription>
                      Where your skills align best across different industries
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={industryMatchData}
                            cx="50%"
                            cy="50%"
                            outerRadius={100}
                            fill="#8884d8"
                            dataKey="value"
                            label={(entry) => `${entry.name}: ${entry.value}%`}
                          >
                            {industryMatchData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip 
                            contentStyle={{
                              backgroundColor: "hsl(var(--card))",
                              border: "1px solid hsl(var(--border))",
                              borderRadius: "8px"
                            }}
                          />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>

            <TabsContent value="skills" className="space-y-6">
              {/* Skill Progress */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Card className="card-premium">
                  <CardHeader>
                    <CardTitle>Skill Development Progress</CardTitle>
                    <CardDescription>
                      Current skill levels vs. target goals
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={skillProgressData} layout="horizontal">
                          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                          <XAxis type="number" domain={[0, 100]} stroke="hsl(var(--muted-foreground))" />
                          <YAxis dataKey="skill" type="category" stroke="hsl(var(--muted-foreground))" />
                          <Tooltip 
                            contentStyle={{
                              backgroundColor: "hsl(var(--card))",
                              border: "1px solid hsl(var(--border))",
                              borderRadius: "8px"
                            }}
                          />
                          <Legend />
                          <Bar dataKey="current" fill="#10b981" name="Current Level" />
                          <Bar dataKey="target" fill="#f59e0b" name="Target Level" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Skill Growth Recommendations */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Card className="card-premium">
                  <CardHeader>
                    <CardTitle>Growth Opportunities</CardTitle>
                    <CardDescription>
                      Skills with highest growth potential impact
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {skillProgressData.map((skill, index) => (
                        <div key={skill.skill} className="flex items-center justify-between p-4 rounded-lg bg-muted/20 border border-border/30">
                          <div>
                            <div className="font-medium">{skill.skill}</div>
                            <div className="text-sm text-muted-foreground">
                              Current: {skill.current}% • Target: {skill.target}%
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-lg font-semibold text-amber-500">
                              +{skill.growth}%
                            </div>
                            <div className="text-xs text-muted-foreground">Growth Potential</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>

            <TabsContent value="engagement" className="space-y-6">
              {/* Monthly Engagement */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Card className="card-premium">
                  <CardHeader>
                    <CardTitle>Platform Engagement</CardTitle>
                    <CardDescription>
                      Your activity and engagement metrics over time
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={monthlyEngagementData}>
                          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                          <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                          <YAxis stroke="hsl(var(--muted-foreground))" />
                          <Tooltip 
                            contentStyle={{
                              backgroundColor: "hsl(var(--card))",
                              border: "1px solid hsl(var(--border))",
                              borderRadius: "8px"
                            }}
                          />
                          <Legend />
                          <Bar dataKey="profileViews" fill="#10b981" name="Profile Views" />
                          <Bar dataKey="mentorConnections" fill="#f59e0b" name="Mentor Connections" />
                          <Bar dataKey="skillAssessments" fill="#8b5cf6" name="Skill Assessments" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>

            <TabsContent value="matches" className="space-y-6">
              {/* Match Quality Over Time */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Card className="card-premium">
                  <CardHeader>
                    <CardTitle>Match Quality Trends</CardTitle>
                    <CardDescription>
                      How well job and mentor matches align with your profile
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="text-center p-6 rounded-lg bg-emerald-500/5 border border-emerald-500/20">
                        <div className="text-3xl font-bold text-emerald-500 mb-2">92%</div>
                        <div className="font-medium">Job Match Accuracy</div>
                        <div className="text-sm text-muted-foreground">+5% from last month</div>
                      </div>
                      <div className="text-center p-6 rounded-lg bg-amber-500/5 border border-amber-500/20">
                        <div className="text-3xl font-bold text-amber-500 mb-2">87%</div>
                        <div className="font-medium">Mentor Match Quality</div>
                        <div className="text-sm text-muted-foreground">+3% from last month</div>
                      </div>
                      <div className="text-center p-6 rounded-lg bg-rose-500/5 border border-rose-500/20">
                        <div className="text-3xl font-bold text-rose-500 mb-2">156</div>
                        <div className="font-medium">Total Matches</div>
                        <div className="text-sm text-muted-foreground">+23 from last month</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Recent Successful Matches */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Card className="card-premium">
                  <CardHeader>
                    <CardTitle>Recent Successful Matches</CardTitle>
                    <CardDescription>
                      Matches that led to positive outcomes
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 rounded-lg bg-emerald-500/5 border border-emerald-500/20">
                        <div>
                          <div className="font-medium">Senior Frontend Developer - Stripe</div>
                          <div className="text-sm text-muted-foreground">95% match • Applied 3 days ago</div>
                        </div>
                        <div className="text-emerald-500 font-semibold">Interview Scheduled</div>
                      </div>
                      <div className="flex items-center justify-between p-4 rounded-lg bg-amber-500/5 border border-amber-500/20">
                        <div>
                          <div className="font-medium">Mentor: Sarah Chen - Google</div>
                          <div className="text-sm text-muted-foreground">92% match • Connected 1 week ago</div>
                        </div>
                        <div className="text-amber-500 font-semibold">Session Completed</div>
                      </div>
                      <div className="flex items-center justify-between p-4 rounded-lg bg-primary/5 border border-primary/20">
                        <div>
                          <div className="font-medium">Full Stack Engineer - Meta</div>
                          <div className="text-sm text-muted-foreground">88% match • Applied 2 weeks ago</div>
                        </div>
                        <div className="text-primary font-semibold">Offer Received</div>
                      </div>
                    </div>
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
