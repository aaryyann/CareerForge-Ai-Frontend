import { useState } from "react"
import { motion } from "framer-motion"
import { Edit2, Upload, MapPin, Briefcase, Mail, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false)

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-6 py-8 max-w-4xl">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">My Profile</h1>
          <Button
            onClick={() => setIsEditing(!isEditing)}
            variant={isEditing ? "outline" : "default"}
          >
            <Edit2 className="h-4 w-4 mr-2" />
            {isEditing ? "Cancel" : "Edit Profile"}
          </Button>
        </div>

        <div className="grid gap-6">
          {/* Profile Header */}
          <Card className="card-premium">
            <CardHeader>
              <div className="flex items-center gap-6">
                <div className="relative">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src="/placeholder.svg" alt="Profile" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  {isEditing && (
                    <Button size="sm" className="absolute -bottom-2 -right-2 rounded-full h-8 w-8 p-0">
                      <Upload className="h-4 w-4" />
                    </Button>
                  )}
                </div>
                <div className="flex-1">
                  {isEditing ? (
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <Input placeholder="First Name" defaultValue="John" />
                        <Input placeholder="Last Name" defaultValue="Doe" />
                      </div>
                      <Input placeholder="Professional Title" defaultValue="Senior React Developer" />
                    </div>
                  ) : (
                    <div>
                      <h2 className="text-2xl font-bold">John Doe</h2>
                      <p className="text-lg text-muted-foreground">Senior React Developer</p>
                    </div>
                  )}
                </div>
              </div>
            </CardHeader>
          </Card>

          {/* Contact Information */}
          <Card className="card-premium">
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {isEditing ? (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" defaultValue="john@example.com" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone</Label>
                      <Input id="phone" defaultValue="+1 (555) 123-4567" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input id="location" defaultValue="San Francisco, CA" />
                  </div>
                </>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span>john@example.com</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span>+1 (555) 123-4567</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span>San Francisco, CA</span>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* About */}
          <Card className="card-premium">
            <CardHeader>
              <CardTitle>About</CardTitle>
            </CardHeader>
            <CardContent>
              {isEditing ? (
                <Textarea
                  placeholder="Tell us about yourself..."
                  defaultValue="Passionate React developer with 5+ years of experience building modern web applications. I specialize in creating responsive, user-friendly interfaces and have a strong background in TypeScript, Node.js, and cloud technologies."
                  rows={4}
                />
              ) : (
                <p className="text-muted-foreground">
                  Passionate React developer with 5+ years of experience building modern web applications. I specialize in creating responsive, user-friendly interfaces and have a strong background in TypeScript, Node.js, and cloud technologies.
                </p>
              )}
            </CardContent>
          </Card>

          {/* Skills */}
          <Card className="card-premium">
            <CardHeader>
              <CardTitle>Skills</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {["React", "TypeScript", "Node.js", "JavaScript", "CSS", "HTML", "Git", "AWS"].map((skill) => (
                  <Badge key={skill} variant="secondary">{skill}</Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {isEditing && (
            <div className="flex gap-4">
              <Button className="btn-hero">Save Changes</Button>
              <Button variant="outline" onClick={() => setIsEditing(false)}>Cancel</Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}