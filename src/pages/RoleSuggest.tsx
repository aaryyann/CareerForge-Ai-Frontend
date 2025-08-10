
"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Target, TrendingUp, Building, MapPin, Clock, DollarSign, Filter } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Navbar } from "@/components/Navbar"
import { Footer } from "@/components/Footer"

const rolesSuggestions = [
  {
    id: 1,
    title: "Senior Frontend Developer",
    company: "Meta",
    location: "Menlo Park, CA",
    type: "Full-time",
    salary: "$180k - $250k",
    matchPercentage: 95,
    postedTime: "2 days ago",
    skills: ["React", "TypeScript", "GraphQL", "Next.js"],
    requiredSkills: ["React", "JavaScript", "HTML/CSS", "Git"],
    missingSkills: ["GraphQL"],
    description: "Join our team building the next generation of social experiences. Lead frontend development for core product features used by billions.",
    benefits: ["Stock options", "Remote work", "Health insurance", "Learning budget"]
  },
  {
    id: 2,
    title: "Full Stack Engineer",
    company: "Stripe",
    location: "San Francisco, CA",
    type: "Full-time",
    salary: "$170k - $220k",
    matchPercentage: 88,
    postedTime: "1 week ago",
    skills: ["React", "Node.js", "Python", "AWS"],
    requiredSkills: ["React", "Node.js", "Python", "SQL"],
    missingSkills: ["Ruby", "Kubernetes"],
    description: "Build and scale the financial infrastructure that powers millions of businesses worldwide.",
    benefits: ["Equity", "Flexible PTO", "Health coverage", "Office meals"]
  },
  {
    id: 3,
    title: "Product Manager",
    company: "Google",
    location: "Mountain View, CA",
    type: "Full-time",
    salary: "$160k - $200k",
    matchPercentage: 82,
    postedTime: "3 days ago",
    skills: ["Product Strategy", "Analytics", "User Research", "Agile"],
    requiredSkills: ["Product Management", "Analytics", "Communication"],
    missingSkills: ["B2B Experience", "Enterprise Sales"],
    description: "Lead product development for Google Cloud products, working with engineering teams to deliver solutions for enterprise customers.",
    benefits: ["Stock grants", "Remote friendly", "Health benefits", "Career development"]
  },
  {
    id: 4,
    title: "DevOps Engineer",
    company: "Netflix",
    location: "Los Gatos, CA",
    type: "Full-time",
    salary: "$150k - $200k",
    matchPercentage: 76,
    postedTime: "5 days ago",
    skills: ["AWS", "Docker", "Kubernetes", "Terraform"],
    requiredSkills: ["AWS", "Docker", "CI/CD", "Linux"],
    missingSkills: ["Terraform", "Monitoring"],
    description: "Scale the infrastructure that delivers entertainment to 200+ million subscribers worldwide.",
    benefits: ["Netflix subscription", "Stock options", "Unlimited PTO", "Top-tier health insurance"]
  },
  {
    id: 5,
    title: "Data Scientist",
    company: "Uber",
    location: "Remote",
    type: "Full-time",
    salary: "$140k - $180k",
    matchPercentage: 73,
    postedTime: "1 day ago",
    skills: ["Python", "Machine Learning", "SQL", "Statistics"],
    requiredSkills: ["Python", "SQL", "Statistics", "Machine Learning"],
    missingSkills: ["Deep Learning", "Spark"],
    description: "Use data science to optimize our marketplace and improve rider and driver experiences across the globe.",
    benefits: ["Remote work", "Stock options", "Learning stipend", "Health coverage"]
  },
  {
    id: 6,
    title: "UX Designer",
    company: "Airbnb",
    location: "San Francisco, CA",
    type: "Contract",
    salary: "$120k - $150k",
    matchPercentage: 69,
    postedTime: "4 days ago",
    skills: ["Figma", "User Research", "Prototyping", "Design Systems"],
    requiredSkills: ["Figma", "User Research", "Prototyping"],
    missingSkills: ["Motion Design", "Service Design"],
    description: "Design experiences that help people belong anywhere, working on host and guest-facing products.",
    benefits: ["Design tools budget", "Flexible schedule", "Travel credits", "Health benefits"]
  }
]

export default function RoleSuggest() {
  const [sortBy, setSortBy] = useState("match")
  const [filterBy, setFilterBy] = useState("all")
  const [locationFilter, setLocationFilter] = useState("all")

  const filteredRoles = rolesSuggestions.filter(role => {
    if (filterBy === "remote" && !role.location.toLowerCase().includes("remote")) return false
    if (filterBy === "fulltime" && role.type !== "Full-time") return false
    if (filterBy === "contract" && role.type !== "Contract") return false
    if (locationFilter !== "all" && !role.location.includes(locationFilter)) return false
    return true
  })

  const sortedRoles = [...filteredRoles].sort((a, b) => {
    if (sortBy === "match") return b.matchPercentage - a.matchPercentage
    if (sortBy === "recent") return new Date(b.postedTime).getTime() - new Date(a.postedTime).getTime()
    if (sortBy === "salary") return parseInt(b.salary.split("$")[1]) - parseInt(a.salary.split("$")[1])
    return 0
  })

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
              Suggested <span className="hero-text">Roles</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-muted-foreground text-lg"
            >
              AI-curated job opportunities matched to your skills and career goals
            </motion.p>
          </div>

          {/* Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 mb-8"
          >
            <div className="flex items-center space-x-2">
              <Filter className="h-5 w-5 text-muted-foreground" />
              <span className="text-sm font-medium">Filter & Sort:</span>
            </div>
            <div className="flex flex-wrap gap-4">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[180px] input-premium">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="match">Best Match</SelectItem>
                  <SelectItem value="recent">Most Recent</SelectItem>
                  <SelectItem value="salary">Highest Salary</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={filterBy} onValueChange={setFilterBy}>
                <SelectTrigger className="w-[180px] input-premium">
                  <SelectValue placeholder="Job Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="fulltime">Full-time</SelectItem>
                  <SelectItem value="contract">Contract</SelectItem>
                  <SelectItem value="remote">Remote Only</SelectItem>
                </SelectContent>
              </Select>

              <Select value={locationFilter} onValueChange={setLocationFilter}>
                <SelectTrigger className="w-[180px] input-premium">
                  <SelectValue placeholder="Location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Locations</SelectItem>
                  <SelectItem value="San Francisco">San Francisco</SelectItem>
                  <SelectItem value="Remote">Remote</SelectItem>
                  <SelectItem value="New York">New York</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </motion.div>

          {/* Role Cards */}
          <div className="space-y-6">
            {sortedRoles.map((role, index) => (
              <motion.div
                key={role.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
              >
                <Card className="card-premium group hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                      {/* Main Info */}
                      <div className="lg:col-span-2 space-y-4">
                        <div>
                          <div className="flex items-start justify-between mb-2">
                            <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
                              {role.title}
                            </h3>
                            <div className="flex items-center space-x-2">
                              <Target className="h-4 w-4 text-primary" />
                              <span className="text-sm font-medium text-primary">
                                {role.matchPercentage}% Match
                              </span>
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-3">
                            <div className="flex items-center space-x-1">
                              <Building className="h-4 w-4" />
                              <span>{role.company}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <MapPin className="h-4 w-4" />
                              <span>{role.location}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Clock className="h-4 w-4" />
                              <span>{role.postedTime}</span>
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-4 mb-4">
                            <Badge variant="secondary" className="bg-emerald-500/10 text-emerald-500">
                              {role.type}
                            </Badge>
                            <div className="flex items-center space-x-1 text-lg font-semibold text-emerald-500">
                              <DollarSign className="h-4 w-4" />
                              <span>{role.salary}</span>
                            </div>
                          </div>
                        </div>

                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {role.description}
                        </p>

                        <div className="flex flex-wrap gap-2">
                          {role.benefits.slice(0, 3).map((benefit) => (
                            <Badge key={benefit} variant="outline" className="text-xs">
                              {benefit}
                            </Badge>
                          ))}
                          {role.benefits.length > 3 && (
                            <Badge variant="outline" className="text-xs text-muted-foreground">
                              +{role.benefits.length - 3} more
                            </Badge>
                          )}
                        </div>
                      </div>

                      {/* Skills Match */}
                      <div className="space-y-4">
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-medium">Skill Match</h4>
                            <span className="text-primary font-semibold">
                              {role.matchPercentage}%
                            </span>
                          </div>
                          <Progress value={role.matchPercentage} className="h-2" />
                        </div>

                        <div>
                          <h4 className="font-medium mb-2">Your Skills</h4>
                          <div className="flex flex-wrap gap-2">
                            {role.requiredSkills.map((skill) => (
                              <Badge
                                key={skill}
                                className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
                              >
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        {role.missingSkills.length > 0 && (
                          <div>
                            <h4 className="font-medium mb-2 text-amber-500">Skills to Develop</h4>
                            <div className="flex flex-wrap gap-2">
                              {role.missingSkills.map((skill) => (
                                <Badge
                                  key={skill}
                                  variant="outline"
                                  className="border-amber-500/50 text-amber-500"
                                >
                                  {skill}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Actions */}
                      <div className="flex flex-col space-y-3">
                        <Button className="btn-hero">
                          Apply Now
                        </Button>
                        <Button variant="outline" className="btn-secondary-premium">
                          Save for Later
                        </Button>
                        <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                          View Company Profile
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Load More */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-center mt-12"
          >
            <Button variant="outline" size="lg" className="btn-secondary-premium">
              Load More Opportunities
            </Button>
          </motion.div>
        </div>
      </main>
      
      <Footer />
    </div>
  )
}
