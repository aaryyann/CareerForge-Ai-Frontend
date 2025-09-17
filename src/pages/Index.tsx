
"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ArrowRight, Sparkles, Zap, Users, Target, BarChart3, MessageCircle } from "lucide-react"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Navbar } from "@/components/Navbar"
import { Footer } from "@/components/Footer"

const features = [
  {
    name: "AI-Powered Matching",
    description: "Advanced algorithms connect you with mentors and opportunities perfectly aligned with your career goals.",
    icon: Sparkles,
  },
  {
    name: "Lightning Fast Analysis",
    description: "Upload your resume and get instant insights, skill assessments, and personalized recommendations.",
    icon: Zap,
  },
  {
    name: "Expert Mentors",
    description: "Connect with industry leaders and experienced professionals who can guide your career journey.",
    icon: Users,
  },
  {
    name: "Targeted Opportunities",
    description: "Discover job roles and career paths that match your skills, interests, and aspirations.",
    icon: Target,
  },
  {
    name: "Progress Analytics",
    description: "Track your career development with detailed analytics and personalized growth insights.",
    icon: BarChart3,
  },
  {
    name: "24/7 AI Assistant",
    description: "Get instant answers to career questions with our advanced AI chat and voice interface.",
    icon: MessageCircle,
  },
]

const testimonials = [
  {
    body: "CareerForge AI completely transformed my career trajectory. The mentor matching was spot-on, and the personalized roadmap helped me land my dream job in tech.",
    author: {
      name: "Sarah Chen",
      handle: "sarah_chen",
      title: "Senior Software Engineer at Google"
    },
  },
  {
    body: "The AI-powered resume analysis gave me insights I never would have discovered on my own. Within weeks, I was getting interviews at top companies.",
    author: {
      name: "Marcus Johnson",
      handle: "mjohnson_dev",
      title: "Product Manager at Microsoft"
    },
  },
  {
    body: "As a career changer, I was lost. CareerForge AI's personalized roadmap and mentor connections made my transition from marketing to data science seamless.",
    author: {
      name: "Emily Rodriguez",
      handle: "emily_data",
      title: "Data Scientist at Netflix"
    },
  },
]

export default function Index() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-muted min-h-screen flex items-center">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 pt-20">
          <div className="mx-auto max-w-4xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="hero-text mb-6">
                Accelerate Your Career
                <br />
                with AI Intelligence
              </h1>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed"
            >
              Transform your professional journey with AI-powered mentorship matching,
              personalized career roadmaps, and intelligent opportunity discovery.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <Link to="/signup">
                <Button size="lg" className="btn-hero group">
                  Start Your Journey
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/dashboard">
                <Button size="lg" variant="outline" className="btn-ghost-premium">
                  View Demo
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Floating elements */}
        <motion.div
          className="absolute top-20 left-10 w-20 h-20 bg-emerald-500/20 rounded-full blur-xl"
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-20 right-20 w-32 h-32 bg-amber-500/20 rounded-full blur-xl"
          animate={{ y: [0, 20, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-background">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-5xl font-bold tracking-tight mb-6"
            >
              Everything you need to
              <span className="hero-text"> excel in your career</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-lg text-muted-foreground"
            >
              Comprehensive AI-powered tools designed to accelerate your professional growth
              and connect you with opportunities that matter.
            </motion.p>
          </div>

          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="card-feature group"
                >
                  <dt className="flex items-center gap-x-3 text-xl font-semibold leading-7">
                    <feature.icon className="h-8 w-8 text-primary group-hover:text-accent transition-colors" />
                    {feature.name}
                  </dt>
                  <dd className="mt-4 text-base leading-7 text-muted-foreground">
                    {feature.description}
                  </dd>
                </motion.div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-muted/20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-5xl font-bold tracking-tight mb-16"
            >
              Trusted by professionals
              <span className="hero-text"> worldwide</span>
            </motion.h2>
          </div>

          <div className="mx-auto max-w-4xl">
            <motion.div
              key={currentTestimonial}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-center"
            >
              <blockquote className="text-xl md:text-2xl font-medium leading-8 text-foreground mb-8">
                "{testimonials[currentTestimonial].body}"
              </blockquote>
              <figcaption className="mt-6">
                <div className="font-semibold text-lg">
                  {testimonials[currentTestimonial].author.name}
                </div>
                <div className="text-muted-foreground">
                  {testimonials[currentTestimonial].author.title}
                </div>
              </figcaption>
            </motion.div>

            <div className="flex justify-center mt-12 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${index === currentTestimonial ? "bg-primary" : "bg-muted-foreground/30"
                    }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-muted/20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-5xl font-bold tracking-tight mb-6"
            >
              Ready to transform
              <span className="hero-text"> your career?</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-xl text-muted-foreground mb-8"
            >
              Join thousands of professionals who have accelerated their careers with CareerForge AI.
              Start your journey today.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link to="/signup">
                <Button size="lg" className="btn-hero animate-pulse-glow">
                  Get Started Free
                </Button>
              </Link>
              <Link to="/signin">
                <Button size="lg" variant="outline" className="btn-ghost-premium">
                  Sign In
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
