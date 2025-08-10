
"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Mic, MicOff, Play, Pause, RotateCcw, Send, Volume2 } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Navbar } from "@/components/Navbar"
import { Footer } from "@/components/Footer"

const quickPrompts = [
  "Help me prepare for a software engineer interview",
  "What skills should I focus on for product management?",
  "Review my career goals and suggest next steps",
  "How can I transition from frontend to full-stack development?",
  "What are the latest trends in my industry?",
]

export default function VoiceInput() {
  const [isListening, setIsListening] = useState(false)
  const [transcript, setTranscript] = useState("")
  const [isPlaying, setIsPlaying] = useState(false)
  const [audioLevel, setAudioLevel] = useState(0)
  const [response, setResponse] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)

  // Simulate audio levels when listening
  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isListening) {
      interval = setInterval(() => {
        setAudioLevel(Math.random() * 100)
      }, 100)
    }
    return () => clearInterval(interval)
  }, [isListening])

  const toggleListening = () => {
    setIsListening(!isListening)
    if (!isListening) {
      // Simulate voice input after 3 seconds
      setTimeout(() => {
        setIsListening(false)
        setTranscript("I'm a frontend developer with 3 years of experience in React and JavaScript. I want to transition to full-stack development but I'm not sure what backend technologies I should learn first. Can you help me create a learning roadmap?")
      }, 3000)
    } else {
      setTranscript("")
    }
  }

  const processVoiceInput = async () => {
    if (!transcript) return
    
    setIsProcessing(true)
    
    // Simulate AI processing
    setTimeout(() => {
      setResponse(`Based on your frontend background, I'd recommend this learning path for full-stack development:

1. **Start with Node.js** - Since you know JavaScript, this is the most natural backend choice
2. **Learn Express.js** - Popular web framework for Node.js
3. **Master databases** - Start with MongoDB or PostgreSQL
4. **API development** - RESTful APIs and GraphQL
5. **DevOps basics** - Docker, AWS/Heroku deployment

**Suggested Timeline:**
- Weeks 1-4: Node.js fundamentals
- Weeks 5-8: Express.js and API development  
- Weeks 9-12: Database integration
- Weeks 13-16: Build a full-stack project

Would you like me to create a detailed roadmap with specific resources for each step?`)
      setIsProcessing(false)
    }, 2000)
  }

  const clearAll = () => {
    setTranscript("")
    setResponse("")
    setIsListening(false)
    setIsProcessing(false)
  }

  const useQuickPrompt = (prompt: string) => {
    setTranscript(prompt)
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-20 pb-12">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8 text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl font-bold mb-4"
            >
              <span className="hero-text">Voice</span> Career Assistant
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-muted-foreground text-lg"
            >
              Speak naturally about your career goals and get personalized AI guidance
            </motion.p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Voice Input Section */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="card-premium">
                <CardHeader>
                  <CardTitle>Voice Input</CardTitle>
                  <CardDescription>
                    Tap the microphone to start speaking
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Microphone Button */}
                  <div className="flex flex-col items-center space-y-4">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={toggleListening}
                      className={`relative w-32 h-32 rounded-full flex items-center justify-center transition-all duration-300 ${
                        isListening 
                          ? "bg-rose-500 animate-pulse-glow shadow-lg shadow-rose-500/50" 
                          : "bg-primary hover:bg-primary/80 shadow-lg shadow-primary/25"
                      }`}
                    >
                      {isListening ? (
                        <MicOff className="h-12 w-12 text-white" />
                      ) : (
                        <Mic className="h-12 w-12 text-white" />
                      )}
                      
                      {/* Audio Level Visualization */}
                      {isListening && (
                        <motion.div
                          className="absolute inset-0 rounded-full border-4 border-white/30"
                          animate={{
                            scale: [1, 1 + audioLevel / 200, 1],
                          }}
                          transition={{ duration: 0.1, ease: "easeOut" }}
                        />
                      )}
                    </motion.button>
                    
                    <div className="text-center">
                      <div className="font-medium">
                        {isListening ? "Listening..." : "Tap to speak"}
                      </div>
                      <div className="text-sm text-muted-foreground mt-1">
                        {isListening 
                          ? "Speak clearly about your career question" 
                          : "Ask about skills, roadmaps, or career advice"
                        }
                      </div>
                    </div>
                  </div>

                  {/* Audio Level Bars */}
                  {isListening && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex justify-center space-x-1"
                    >
                      {[...Array(10)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="w-2 bg-primary rounded-full"
                          animate={{
                            height: [20, Math.random() * 40 + 20, 20],
                          }}
                          transition={{
                            duration: 0.5,
                            repeat: Infinity,
                            delay: i * 0.1,
                          }}
                        />
                      ))}
                    </motion.div>
                  )}

                  {/* Transcript */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium">Transcript</h3>
                      {transcript && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={clearAll}
                          className="text-muted-foreground hover:text-foreground"
                        >
                          <RotateCcw className="h-4 w-4 mr-1" />
                          Clear
                        </Button>
                      )}
                    </div>
                    <Textarea
                      value={transcript}
                      onChange={(e) => setTranscript(e.target.value)}
                      placeholder="Your speech will appear here, or type directly..."
                      className="input-premium min-h-[120px] resize-none"
                    />
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-3">
                    <Button
                      onClick={processVoiceInput}
                      disabled={!transcript || isProcessing}
                      className="flex-1 btn-hero"
                    >
                      {isProcessing ? (
                        <>
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            className="h-4 w-4 mr-2 border-2 border-white border-t-transparent rounded-full"
                          />
                          Processing...
                        </>
                      ) : (
                        <>
                          <Send className="h-4 w-4 mr-2" />
                          Get AI Response
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Response Section */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="card-premium">
                <CardHeader>
                  <CardTitle>AI Response</CardTitle>
                  <CardDescription>
                    Personalized career guidance based on your input
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {!response ? (
                    <div className="text-center py-12">
                      <Volume2 className="mx-auto h-16 w-16 text-muted-foreground/50 mb-4" />
                      <div className="text-lg font-medium text-muted-foreground mb-2">
                        Speak or type your career question
                      </div>
                      <div className="text-sm text-muted-foreground">
                        I'll provide personalized guidance and actionable advice
                      </div>
                    </div>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="space-y-4"
                    >
                      <div className="prose prose-sm max-w-none text-foreground">
                        <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed">
                          {response}
                        </pre>
                      </div>
                      
                      <div className="flex items-center justify-between pt-4 border-t border-border">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setIsPlaying(!isPlaying)}
                          className="text-muted-foreground hover:text-foreground"
                        >
                          {isPlaying ? (
                            <>
                              <Pause className="h-4 w-4 mr-1" />
                              Pause
                            </>
                          ) : (
                            <>
                              <Play className="h-4 w-4 mr-1" />
                              Read Aloud
                            </>
                          )}
                        </Button>
                        <Button size="sm" className="btn-hero">
                          Create Roadmap
                        </Button>
                      </div>
                    </motion.div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Quick Prompts */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-8"
          >
            <Card className="card-premium">
              <CardHeader>
                <CardTitle>Quick Prompts</CardTitle>
                <CardDescription>
                  Common career questions to get you started
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-3">
                  {quickPrompts.map((prompt, index) => (
                    <motion.button
                      key={index}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => useQuickPrompt(prompt)}
                      className="text-left p-3 rounded-lg bg-muted/20 hover:bg-muted/40 border border-border/30 hover:border-border/50 transition-all duration-200"
                    >
                      <div className="text-sm">{prompt}</div>
                    </motion.button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </main>
      
      <Footer />
    </div>
  )
}
