import { useState } from "react"
import { motion } from "framer-motion"
import { Search, Filter, MapPin, Briefcase, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const mockCandidates = [
  {
    id: 1,
    name: "John Doe",
    title: "Senior React Developer",
    location: "San Francisco, CA",
    experience: "5+ years",
    skills: ["React", "TypeScript", "Node.js"],
    rating: 4.8,
    image: "/placeholder.svg"
  },
  {
    id: 2,
    name: "Jane Smith",
    title: "Product Manager",
    location: "New York, NY",
    experience: "7+ years",
    skills: ["Product Strategy", "Agile", "Analytics"],
    rating: 4.9,
    image: "/placeholder.svg"
  }
]

export default function CandidateSearch() {
  const [searchTerm, setSearchTerm] = useState("")

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Candidate Search</h1>
          <p className="text-muted-foreground mt-2">Find the perfect candidates for your open positions</p>
        </div>

        <div className="flex gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search candidates by skills, title, or location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            Advanced Filters
          </Button>
        </div>

        <div className="grid gap-6">
          {mockCandidates.map((candidate, index) => (
            <motion.div
              key={candidate.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="card-premium">
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src={candidate.image} alt={candidate.name} />
                      <AvatarFallback>{candidate.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-xl">{candidate.name}</CardTitle>
                          <CardDescription className="text-base mt-1 flex items-center gap-4">
                            <span className="flex items-center gap-1">
                              <Briefcase className="h-4 w-4" />
                              {candidate.title}
                            </span>
                            <span className="flex items-center gap-1">
                              <MapPin className="h-4 w-4" />
                              {candidate.location}
                            </span>
                          </CardDescription>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 text-yellow-500 fill-current" />
                          <span className="font-semibold">{candidate.rating}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center">
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">Experience: {candidate.experience}</p>
                      <div className="flex gap-2">
                        {candidate.skills.map((skill) => (
                          <Badge key={skill} variant="secondary">{skill}</Badge>
                        ))}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">View Profile</Button>
                      <Button size="sm" className="btn-hero">Contact</Button>
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