
"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Send, Bot, User, Paperclip, MoreVertical, Trash2, Download } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider } from "@/components/ui/sidebar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Navbar } from "@/components/Navbar"

interface Message {
  id: number
  type: "user" | "ai"
  content: string
  timestamp: Date
}

interface ChatSession {
  id: number
  title: string
  lastMessage: string
  timestamp: Date
  messageCount: number
}

const mockSessions: ChatSession[] = [
  {
    id: 1,
    title: "Frontend to Full-Stack Transition",
    lastMessage: "What backend technologies should I learn?",
    timestamp: new Date(2024, 0, 15),
    messageCount: 12
  },
  {
    id: 2,
    title: "System Design Interview Prep",
    lastMessage: "How do I approach system design questions?",
    timestamp: new Date(2024, 0, 14),
    messageCount: 8
  },
  {
    id: 3,
    title: "Career Roadmap Planning",
    lastMessage: "Create a 2-year career plan for me",
    timestamp: new Date(2024, 0, 12),
    messageCount: 15
  }
]

const mockMessages: Message[] = [
  {
    id: 1,
    type: "ai",
    content: "Hello! I'm your AI career assistant. I can help you with career planning, skill development, interview preparation, and more. What would you like to discuss today?",
    timestamp: new Date()
  },
  {
    id: 2,
    type: "user", 
    content: "I'm a frontend developer with 3 years of experience. I want to transition to full-stack development but I'm not sure where to start.",
    timestamp: new Date()
  },
  {
    id: 3,
    type: "ai",
    content: "Great question! Transitioning from frontend to full-stack is a common and valuable career move. Based on your frontend experience, here's a strategic roadmap:\n\n**Phase 1: Backend Fundamentals (2-3 months)**\n- Learn Node.js - leverages your existing JavaScript knowledge\n- Master Express.js framework\n- Understand REST API principles\n\n**Phase 2: Database Skills (1-2 months)**\n- Start with MongoDB (NoSQL) or PostgreSQL (SQL)\n- Learn database design principles\n- Practice CRUD operations\n\n**Phase 3: Full-Stack Integration (2-3 months)**\n- Build end-to-end projects\n- Learn authentication/authorization\n- Deploy applications (Heroku, AWS, Vercel)\n\nWould you like me to elaborate on any of these phases or help you create a detailed learning schedule?",
    timestamp: new Date()
  }
]

export default function AIChat() {
  const [messages, setMessages] = useState<Message[]>(mockMessages)
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [currentSession, setCurrentSession] = useState<ChatSession>(mockSessions[0])
  const [sessions, setSessions] = useState<ChatSession[]>(mockSessions)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const sendMessage = async () => {
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: messages.length + 1,
      type: "user",
      content: inputValue,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue("")
    setIsTyping(true)

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: messages.length + 2,
        type: "ai",
        content: generateAIResponse(inputValue),
        timestamp: new Date()
      }
      setMessages(prev => [...prev, aiResponse])
      setIsTyping(false)
    }, 1500)
  }

  const generateAIResponse = (userInput: string) => {
    const responses = [
      "That's a great question! Let me provide you with some detailed guidance on that topic...",
      "Based on your background and goals, I'd recommend the following approach...",
      "I understand your concern. Here's how you can tackle this challenge effectively...",
      "Let me break this down into actionable steps for you...",
      "That's an excellent career move! Here's my recommendation..."
    ]
    return responses[Math.floor(Math.random() * responses.length)]
  }

  const startNewChat = () => {
    const newSession: ChatSession = {
      id: sessions.length + 1,
      title: "New Chat",
      lastMessage: "New conversation started",
      timestamp: new Date(),
      messageCount: 0
    }
    setSessions(prev => [newSession, ...prev])
    setCurrentSession(newSession)
    setMessages([{
      id: 1,
      type: "ai",
      content: "Hello! I'm ready to help with your career questions. What would you like to discuss?",
      timestamp: new Date()
    }])
  }

  const deleteSession = (sessionId: number) => {
    setSessions(prev => prev.filter(s => s.id !== sessionId))
    if (currentSession.id === sessionId) {
      startNewChat()
    }
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen bg-background flex w-full">
        <Navbar />
        
        {/* Chat Sidebar */}
        <Sidebar className="border-r border-border mt-16">
          <SidebarContent>
            <div className="p-4">
              <Button onClick={startNewChat} className="w-full btn-hero">
                New Chat
              </Button>
            </div>
            
            <SidebarGroup>
              <SidebarGroupLabel>Recent Chats</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {sessions.map((session) => (
                    <SidebarMenuItem key={session.id}>
                      <SidebarMenuButton 
                        onClick={() => setCurrentSession(session)}
                        className={`w-full justify-start ${
                          currentSession.id === session.id ? "bg-accent" : ""
                        }`}
                      >
                        <div className="flex-1 min-w-0">
                          <div className="truncate font-medium text-sm">
                            {session.title}
                          </div>
                          <div className="truncate text-xs text-muted-foreground">
                            {session.lastMessage}
                          </div>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-6 w-6 opacity-0 group-hover:opacity-100">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <DropdownMenuItem onClick={() => deleteSession(session.id)}>
                              <Trash2 className="h-4 w-4 mr-2" />
                              Delete
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Download className="h-4 w-4 mr-2" />
                              Export
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>

        {/* Main Chat Area */}
        <main className="flex-1 flex flex-col mt-16">
          {/* Chat Header */}
          <div className="border-b border-border p-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-xl font-semibold">{currentSession.title}</h1>
                <p className="text-sm text-muted-foreground">
                  AI Career Assistant • Always here to help
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm" className="btn-secondary-premium">
                  <Download className="h-4 w-4 mr-2" />
                  Export Chat
                </Button>
              </div>
            </div>
          </div>

          {/* Messages Area */}
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4 max-w-4xl mx-auto">
              <AnimatePresence>
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className={`flex items-start space-x-3 ${
                      message.type === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    {message.type === "ai" && (
                      <Avatar className="h-8 w-8 bg-primary">
                        <AvatarFallback>
                          <Bot className="h-4 w-4 text-primary-foreground" />
                        </AvatarFallback>
                      </Avatar>
                    )}
                    
                    <Card className={`max-w-[70%] ${
                      message.type === "user" 
                        ? "bg-primary text-primary-foreground" 
                        : "card-premium"
                    }`}>
                      <CardContent className="p-4">
                        <div className="prose prose-sm max-w-none">
                          <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed">
                            {message.content}
                          </pre>
                        </div>
                        <div className={`text-xs mt-2 ${
                          message.type === "user" 
                            ? "text-primary-foreground/70" 
                            : "text-muted-foreground"
                        }`}>
                          {message.timestamp.toLocaleTimeString([], { 
                            hour: '2-digit', 
                            minute: '2-digit' 
                          })}
                        </div>
                      </CardContent>
                    </Card>

                    {message.type === "user" && (
                      <Avatar className="h-8 w-8">
                        <AvatarFallback>
                          <User className="h-4 w-4" />
                        </AvatarFallback>
                      </Avatar>
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>
              
              {/* Typing Indicator */}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-start space-x-3"
                >
                  <Avatar className="h-8 w-8 bg-primary">
                    <AvatarFallback>
                      <Bot className="h-4 w-4 text-primary-foreground" />
                    </AvatarFallback>
                  </Avatar>
                  <Card className="card-premium">
                    <CardContent className="p-4">
                      <div className="flex space-x-1">
                        {[...Array(3)].map((_, i) => (
                          <motion.div
                            key={i}
                            className="w-2 h-2 bg-primary rounded-full"
                            animate={{
                              scale: [1, 1.2, 1],
                              opacity: [0.5, 1, 0.5]
                            }}
                            transition={{
                              duration: 0.8,
                              repeat: Infinity,
                              delay: i * 0.2
                            }}
                          />
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
              
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>

          {/* Input Area */}
          <div className="border-t border-border p-4">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-end space-x-3">
                <div className="flex-1 relative">
                  <Input
                    ref={inputRef}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                    placeholder="Ask about your career, skills, interviews, or get personalized advice..."
                    className="input-premium pr-12 py-3 min-h-[48px] resize-none"
                    disabled={isTyping}
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8"
                  >
                    <Paperclip className="h-4 w-4" />
                  </Button>
                </div>
                <Button
                  onClick={sendMessage}
                  disabled={!inputValue.trim() || isTyping}
                  className="btn-hero"
                  size="icon"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
              <div className="text-xs text-muted-foreground mt-2 text-center">
                AI can make mistakes. Always verify important career decisions with professional mentors.
              </div>
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  )
}
