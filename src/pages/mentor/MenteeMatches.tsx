import { useState } from "react"
import { motion } from "framer-motion"
import { MessageCircle, Calendar, Users, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const mockMentees = [
  {
    id: 1,
    name: "Alex Johnson",
    title: "Junior Developer",
    experience: "1 year",
    goals: ["React Development", "Career Growth"],
    matchScore: 95,
    status: "active",
    image: "/placeholder.svg"
  },
  {
    id: 2,
    name: "Sarah Wilson",
    title: "Product Intern",
    experience: "6 months",
    goals: ["Product Management", "Leadership Skills"],
    matchScore: 88,
    status: "pending",
    image: "/placeholder.svg"
  }
]

export default function MenteeMatches() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Mentee Matches</h1>
          <p className="text-muted-foreground mt-2">Connect with mentees who match your expertise</p>
        </div>

        <Tabs defaultValue="matches" className="space-y-6">
          <TabsList>
            <TabsTrigger value="matches">New Matches</TabsTrigger>
            <TabsTrigger value="active">Active Mentees</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
          </TabsList>

          <TabsContent value="matches" className="space-y-6">
            {mockMentees.map((mentee, index) => (
              <motion.div
                key={mentee.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="card-premium">
                  <CardHeader>
                    <div className="flex items-start gap-4">
                      <Avatar className="h-16 w-16">
                        <AvatarImage src={mentee.image} alt={mentee.name} />
                        <AvatarFallback>{mentee.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle className="text-xl">{mentee.name}</CardTitle>
                            <CardDescription className="text-base mt-1">
                              {mentee.title} • {mentee.experience} experience
                            </CardDescription>
                          </div>
                          <div className="text-right">
                            <div className="flex items-center gap-1 mb-2">
                              <Star className="h-4 w-4 text-yellow-500 fill-current" />
                              <span className="font-semibold">{mentee.matchScore}% match</span>
                            </div>
                            <Badge variant={mentee.status === 'active' ? 'default' : 'secondary'}>
                              {mentee.status}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm font-medium mb-2">Goals:</p>
                        <div className="flex gap-2">
                          {mentee.goals.map((goal) => (
                            <Badge key={goal} variant="outline">{goal}</Badge>
                          ))}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <MessageCircle className="h-4 w-4 mr-2" />
                          Message
                        </Button>
                        <Button size="sm" className="btn-hero">
                          <Calendar className="h-4 w-4 mr-2" />
                          Schedule Session
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}