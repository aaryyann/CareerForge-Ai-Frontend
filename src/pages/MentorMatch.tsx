
"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Star, MapPin, MessageCircle, Heart, Filter } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Navbar } from "@/components/Navbar"
import { Footer } from "@/components/Footer"

const mentors = [
  {
    id: 1,
    name: "Sarah Chen",
    title: "Senior Software Engineer",
    company: "Google",
    location: "San Francisco, CA",
    rating: 4.9,
    sessions: 127,
    avatar: "/placeholder.svg",
    skills: ["React", "Node.js", "System Design", "Leadership"],
    bio: "10+ years in tech, specializing in frontend architecture and team leadership. Passionate about mentoring junior developers.",
    pricePerSession: 150,
    availability: "Available this week",
  },
  {
    id: 2,
    name: "Marcus Johnson",
    title: "Product Manager",
    company: "Microsoft",
    location: "Seattle, WA",
    rating: 4.8,
    sessions: 89,
    avatar: "/placeholder.svg",
    skills: ["Product Strategy", "Agile", "Analytics", "Growth"],
    bio: "Product leader with experience launching products used by millions. Expert in product-market fit and growth strategies.",
    pricePerSession: 200,
    availability: "Available next week",
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    title: "Data Scientist",
    company: "Netflix",
    location: "Los Angeles, CA",
    rating: 4.9,
    sessions: 156,
    avatar: "/placeholder.svg",
    skills: ["Python", "Machine Learning", "Statistics", "SQL"],
    bio: "Data science expert with a track record of building ML models that drive business decisions. Former academic researcher.",
    pricePerSession: 175,
    availability: "Available today",
  },
  {
    id: 4,
    name: "David Park",
    title: "DevOps Engineer",
    company: "Amazon",
    location: "Remote",
    rating: 4.7,
    sessions: 203,
    avatar: "/placeholder.svg",
    skills: ["AWS", "Kubernetes", "CI/CD", "Infrastructure"],
    bio: "Cloud infrastructure specialist with expertise in scaling systems for high-traffic applications. Love teaching DevOps best practices.",
    pricePerSession: 180,
    availability: "Available this week",
  },
  {
    id: 5,
    name: "Lisa Thompson",
    title: "UX Design Director",
    company: "Airbnb",
    location: "San Francisco, CA",
    rating: 5.0,
    sessions: 94,
    avatar: "/placeholder.svg",
    skills: ["UX Design", "Design Systems", "User Research", "Figma"],
    bio: "Design leader with 12+ years creating user-centered products. Expert in design systems and cross-functional collaboration.",
    pricePerSession: 220,
    availability: "Booked until next month",
  },
  {
    id: 6,
    name: "James Wilson",
    title: "Engineering Manager",
    company: "Stripe",
    location: "New York, NY",
    rating: 4.8,
    sessions: 142,
    avatar: "/placeholder.svg",
    skills: ["Engineering Management", "Team Building", "Architecture", "Scaling"],
    bio: "Engineering manager passionate about building high-performing teams. Experience scaling engineering organizations from startup to IPO.",
    pricePerSession: 190,
    availability: "Available this week",
  },
]

export default function MentorMatch() {
  const [filter, setFilter] = useState("all")
  const [sortBy, setSortBy] = useState("rating")
  const [favorites, setFavorites] = useState<number[]>([])

  const toggleFavorite = (mentorId: number) => {
    setFavorites(prev => 
      prev.includes(mentorId) 
        ? prev.filter(id => id !== mentorId)
        : [...prev, mentorId]
    )
  }

  const filteredMentors = mentors.filter(mentor => {
    if (filter === "all") return true
    if (filter === "available") return mentor.availability.includes("Available")
    if (filter === "favorites") return favorites.includes(mentor.id)
    return true
  })

  const sortedMentors = [...filteredMentors].sort((a, b) => {
    if (sortBy === "rating") return b.rating - a.rating
    if (sortBy === "sessions") return b.sessions - a.sessions
    if (sortBy === "price") return a.pricePerSession - b.pricePerSession
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
              Find Your Perfect <span className="hero-text">Mentor</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-muted-foreground text-lg"
            >
              Connect with industry experts who can guide your career journey
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
              <span className="text-sm font-medium">Filter:</span>
            </div>
            <div className="flex flex-wrap gap-4">
              <Select value={filter} onValueChange={setFilter}>
                <SelectTrigger className="w-[180px] input-premium">
                  <SelectValue placeholder="Filter mentors" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Mentors</SelectItem>
                  <SelectItem value="available">Available Now</SelectItem>
                  <SelectItem value="favorites">Favorites</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[180px] input-premium">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                  <SelectItem value="sessions">Most Sessions</SelectItem>
                  <SelectItem value="price">Lowest Price</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </motion.div>

          {/* Mentor Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedMentors.map((mentor, index) => (
              <motion.div
                key={mentor.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                className="group"
              >
                <Card className="card-premium h-full">
                  <CardContent className="p-6">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={mentor.avatar} alt={mentor.name} />
                          <AvatarFallback>
                            {mentor.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-semibold text-lg">{mentor.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            {mentor.title} at {mentor.company}
                          </p>
                        </div>
                      </div>
                      
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleFavorite(mentor.id)}
                        className={`${
                          favorites.includes(mentor.id) 
                            ? "text-rose-500 hover:text-rose-600" 
                            : "text-muted-foreground hover:text-rose-500"
                        }`}
                      >
                        <Heart 
                          className={`h-5 w-5 ${
                            favorites.includes(mentor.id) ? "fill-current" : ""
                          }`} 
                        />
                      </Button>
                    </div>

                    {/* Stats */}
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 text-amber-500 fill-current" />
                        <span className="text-sm font-medium">{mentor.rating}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <MessageCircle className="h-4 w-4 text-primary" />
                        <span className="text-sm text-muted-foreground">
                          {mentor.sessions} sessions
                        </span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">
                          {mentor.location}
                        </span>
                      </div>
                    </div>

                    {/* Bio */}
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                      {mentor.bio}
                    </p>

                    {/* Skills */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {mentor.skills.slice(0, 3).map((skill) => (
                        <Badge
                          key={skill}
                          variant="secondary"
                          className="bg-primary/10 text-primary border-primary/20"
                        >
                          {skill}
                        </Badge>
                      ))}
                      {mentor.skills.length > 3 && (
                        <Badge variant="outline" className="text-muted-foreground">
                          +{mentor.skills.length - 3} more
                        </Badge>
                      )}
                    </div>

                    {/* Availability & Price */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="text-sm">
                        <span className="text-muted-foreground">From </span>
                        <span className="font-semibold text-emerald-500">
                          ${mentor.pricePerSession}/session
                        </span>
                      </div>
                      <div className="text-xs">
                        <span className={`px-2 py-1 rounded-full ${
                          mentor.availability.includes("Available")
                            ? "bg-emerald-500/10 text-emerald-500"
                            : "bg-amber-500/10 text-amber-500"
                        }`}>
                          {mentor.availability}
                        </span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex space-x-3">
                      <Button 
                        size="sm" 
                        className="btn-hero flex-1"
                        disabled={!mentor.availability.includes("Available")}
                      >
                        Connect
                      </Button>
                      <Button variant="outline" size="sm" className="btn-ghost-premium">
                        View Profile
                      </Button>
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
              Load More Mentors
            </Button>
          </motion.div>
        </div>
      </main>
      
      <Footer />
    </div>
  )
}
