import { useState } from "react"
import { motion } from "framer-motion"
import { Calendar, Clock, Video, MessageSquare, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const mockSessions = [
  {
    id: 1,
    mentee: "Alex Johnson",
    title: "React Best Practices",
    date: "2024-01-20",
    time: "2:00 PM",
    duration: "60 min",
    type: "video",
    status: "upcoming"
  },
  {
    id: 2,
    mentee: "Sarah Wilson",
    title: "Career Planning Discussion",
    date: "2024-01-18",
    time: "10:00 AM",
    duration: "45 min",
    type: "video",
    status: "completed"
  }
]

export default function Sessions() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-6 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Mentoring Sessions</h1>
            <p className="text-muted-foreground mt-2">Manage your mentoring sessions and schedule</p>
          </div>
          <Button className="btn-hero">
            <Plus className="h-4 w-4 mr-2" />
            Schedule Session
          </Button>
        </div>

        <Tabs defaultValue="upcoming" className="space-y-6">
          <TabsList>
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="today">Today</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming" className="space-y-4">
            {mockSessions.map((session, index) => (
              <motion.div
                key={session.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="card-premium">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-xl">{session.title}</CardTitle>
                        <CardDescription className="text-base mt-1">
                          with {session.mentee}
                        </CardDescription>
                      </div>
                      <Badge variant={session.status === 'upcoming' ? 'default' : 'secondary'}>
                        {session.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center">
                      <div className="flex gap-6 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {session.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {session.time} ({session.duration})
                        </span>
                        <span className="flex items-center gap-1">
                          <Video className="h-4 w-4" />
                          Video Call
                        </span>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <MessageSquare className="h-4 w-4 mr-2" />
                          Message
                        </Button>
                        <Button size="sm" className="btn-hero">
                          <Video className="h-4 w-4 mr-2" />
                          Join Call
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