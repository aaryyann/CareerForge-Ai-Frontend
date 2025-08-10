
"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { Trophy, Zap, Brain, Target, TrendingUp, Award } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Navbar } from "@/components/Navbar"
import { Footer } from "@/components/Footer"

const modelPerformanceData = [
  {
    model: "CareerForge Pro",
    accuracy: 94,
    speed: 98,
    satisfaction: 96,
    version: "v2.1",
    isOurs: true
  },
  {
    model: "LinkedIn AI",
    accuracy: 87,
    speed: 85,
    satisfaction: 82,
    version: "v1.8",
    isOurs: false
  },
  {
    model: "Indeed Assistant",
    accuracy: 79,
    speed: 91,
    satisfaction: 78,
    version: "v1.5",
    isOurs: false
  },
  {
    model: "Glassdoor AI",
    accuracy: 72,
    speed: 88,
    satisfaction: 75,
    version: "v1.2",
    isOurs: false
  }
]

const timeSeriesData = [
  { month: "Jan", careerforge: 89, competitor_a: 82, competitor_b: 75 },
  { month: "Feb", careerforge: 91, competitor_a: 83, competitor_b: 77 },
  { month: "Mar", careerforge: 92, competitor_a: 85, competitor_b: 78 },
  { month: "Apr", careerforge: 93, competitor_a: 86, competitor_b: 79 },
  { month: "May", careerforge: 94, competitor_a: 87, competitor_b: 80 },
  { month: "Jun", careerforge: 96, competitor_a: 87, competitor_b: 79 }
]

const benchmarkCategories = [
  {
    name: "Resume Analysis",
    description: "Accuracy in extracting skills and experience",
    score: 96,
    improvement: "+4%",
    icon: Brain
  },
  {
    name: "Job Matching",
    description: "Quality of job recommendations",
    score: 94,
    improvement: "+7%",
    icon: Target
  },
  {
    name: "Mentor Pairing",
    description: "Success rate of mentor connections",
    score: 92,
    improvement: "+5%",
    icon: Trophy
  },
  {
    name: "Response Speed",
    description: "Average response time (milliseconds)",
    score: 98,
    improvement: "+12%",
    icon: Zap
  }
]

const technicalSpecs = [
  {
    category: "Model Architecture",
    specs: [
      { name: "Parameters", value: "175B+", description: "Large language model with extensive training" },
      { name: "Training Data", value: "2.1TB", description: "Career-specific datasets and general knowledge" },
      { name: "Update Frequency", value: "Weekly", description: "Continuous learning from user interactions" },
      { name: "Latency", value: "<200ms", description: "Average response time for career queries" }
    ]
  },
  {
    category: "Performance Metrics",
    specs: [
      { name: "Accuracy", value: "94.2%", description: "Overall recommendation accuracy" },
      { name: "User Satisfaction", value: "4.8/5", description: "Average user rating" },
      { name: "Success Rate", value: "87%", description: "Users achieving career goals" },
      { name: "Uptime", value: "99.9%", description: "Service availability" }
    ]
  }
]

export default function ModelBenchmarks() {
  const [selectedMetric, setSelectedMetric] = useState("accuracy")

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
              className="text-4xl font-bold mb-4"
            >
              AI Model <span className="hero-text">Benchmarks</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-muted-foreground text-lg"
            >
              Performance metrics and comparisons of our AI career assistant
            </motion.p>
          </div>

          {/* Performance Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {benchmarkCategories.map((category, index) => (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="card-premium">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-3 mb-4">
                      <category.icon className="h-8 w-8 text-primary" />
                      <div>
                        <h3 className="font-semibold">{category.name}</h3>
                        <p className="text-xs text-muted-foreground">
                          {category.description}
                        </p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold text-primary">
                          {category.score}%
                        </span>
                        <Badge variant="secondary" className="bg-emerald-500/10 text-emerald-500">
                          {category.improvement}
                        </Badge>
                      </div>
                      <Progress value={category.score} className="h-2" />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <Tabs defaultValue="comparison" className="space-y-8">
            <TabsList className="grid w-full grid-cols-3 bg-muted/20">
              <TabsTrigger value="comparison">Model Comparison</TabsTrigger>
              <TabsTrigger value="performance">Performance Trends</TabsTrigger>
              <TabsTrigger value="technical">Technical Specs</TabsTrigger>
            </TabsList>

            <TabsContent value="comparison" className="space-y-6">
              {/* Model Comparison Chart */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Card className="card-premium">
                  <CardHeader>
                    <CardTitle>Model Performance Comparison</CardTitle>
                    <CardDescription>
                      How CareerForge AI compares to other career assistance platforms
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={modelPerformanceData}>
                          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                          <XAxis 
                            dataKey="model" 
                            stroke="hsl(var(--muted-foreground))"
                            angle={-45}
                            textAnchor="end"
                            height={80}
                          />
                          <YAxis stroke="hsl(var(--muted-foreground))" />
                          <Tooltip 
                            contentStyle={{
                              backgroundColor: "hsl(var(--card))",
                              border: "1px solid hsl(var(--border))",
                              borderRadius: "8px"
                            }}
                          />
                          <Legend />
                          <Bar dataKey="accuracy" fill="#10b981" name="Accuracy %" />
                          <Bar dataKey="speed" fill="#f59e0b" name="Speed %" />
                          <Bar dataKey="satisfaction" fill="#ef4444" name="User Satisfaction %" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Detailed Comparison Table */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Card className="card-premium">
                  <CardHeader>
                    <CardTitle>Detailed Model Comparison</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {modelPerformanceData.map((model, index) => (
                        <div 
                          key={model.model}
                          className={`p-4 rounded-lg border ${
                            model.isOurs 
                              ? "bg-primary/5 border-primary/20" 
                              : "bg-muted/20 border-border/30"
                          }`}
                        >
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center space-x-3">
                              <h3 className="font-semibold">{model.model}</h3>
                              {model.isOurs && (
                                <Badge className="bg-primary text-primary-foreground">
                                  Our Model
                                </Badge>
                              )}
                              <Badge variant="outline">{model.version}</Badge>
                            </div>
                            {model.isOurs && (
                              <Award className="h-6 w-6 text-primary" />
                            )}
                          </div>
                          <div className="grid grid-cols-3 gap-6">
                            <div>
                              <div className="text-sm text-muted-foreground">Accuracy</div>
                              <div className="text-xl font-semibold text-emerald-500">
                                {model.accuracy}%
                              </div>
                            </div>
                            <div>
                              <div className="text-sm text-muted-foreground">Speed</div>
                              <div className="text-xl font-semibold text-amber-500">
                                {model.speed}%
                              </div>
                            </div>
                            <div>
                              <div className="text-sm text-muted-foreground">User Satisfaction</div>
                              <div className="text-xl font-semibold text-rose-500">
                                {model.satisfaction}%
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>

            <TabsContent value="performance" className="space-y-6">
              {/* Performance Trends */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Card className="card-premium">
                  <CardHeader>
                    <CardTitle>Performance Trends Over Time</CardTitle>
                    <CardDescription>
                      6-month accuracy trends comparison
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={timeSeriesData}>
                          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                          <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                          <YAxis stroke="hsl(var(--muted-foreground))" domain={[70, 100]} />
                          <Tooltip 
                            contentStyle={{
                              backgroundColor: "hsl(var(--card))",
                              border: "1px solid hsl(var(--border))",
                              borderRadius: "8px"
                            }}
                          />
                          <Legend />
                          <Line 
                            type="monotone" 
                            dataKey="careerforge" 
                            stroke="#10b981" 
                            strokeWidth={3}
                            name="CareerForge AI" 
                          />
                          <Line 
                            type="monotone" 
                            dataKey="competitor_a" 
                            stroke="#f59e0b" 
                            strokeWidth={2}
                            name="Competitor A" 
                          />
                          <Line 
                            type="monotone" 
                            dataKey="competitor_b" 
                            stroke="#ef4444" 
                            strokeWidth={2}
                            name="Competitor B" 
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Performance Insights */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Card className="card-premium">
                  <CardHeader>
                    <CardTitle>Key Performance Insights</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div className="flex items-start space-x-3">
                          <TrendingUp className="h-5 w-5 text-emerald-500 mt-0.5" />
                          <div>
                            <h4 className="font-medium">Consistent Improvement</h4>
                            <p className="text-sm text-muted-foreground">
                              Our model shows steady month-over-month improvement with a 7% 
                              accuracy increase over 6 months.
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start space-x-3">
                          <Target className="h-5 w-5 text-primary mt-0.5" />
                          <div>
                            <h4 className="font-medium">Leading Accuracy</h4>
                            <p className="text-sm text-muted-foreground">
                              CareerForge AI maintains the highest accuracy rate among 
                              all career assistance platforms.
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div className="flex items-start space-x-3">
                          <Zap className="h-5 w-5 text-amber-500 mt-0.5" />
                          <div>
                            <h4 className="font-medium">Superior Speed</h4>
                            <p className="text-sm text-muted-foreground">
                              98% speed score with average response times under 200ms 
                              for all career queries.
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start space-x-3">
                          <Award className="h-5 w-5 text-rose-500 mt-0.5" />
                          <div>
                            <h4 className="font-medium">User Satisfaction</h4>
                            <p className="text-sm text-muted-foreground">
                              96% user satisfaction rate with continuous positive 
                              feedback and high retention.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>

            <TabsContent value="technical" className="space-y-6">
              {/* Technical Specifications */}
              {technicalSpecs.map((section, index) => (
                <motion.div
                  key={section.category}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="card-premium">
                    <CardHeader>
                      <CardTitle>{section.category}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {section.specs.map((spec) => (
                          <div key={spec.name} className="space-y-2">
                            <div className="flex items-center justify-between">
                              <h4 className="font-medium">{spec.name}</h4>
                              <span className="text-lg font-semibold text-primary">
                                {spec.value}
                              </span>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              {spec.description}
                            </p>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  )
}
