
"use client"

import { motion } from "framer-motion"
import {
  ArrowRight, Upload, Users, Map, Target, MessageCircle, BarChart3,
  Sparkles, Rocket, Mic,
  UserPlus, ClipboardList, LayoutDashboard, Briefcase, Search,
  FileText, CalendarCheck, TrendingUp, Bot
} from "lucide-react"
import { Link, Navigate } from "react-router-dom"
import { Navbar } from "@/components/layout"
import { Footer } from "@/components/layout"
import { useAuthNavigation } from "@/hooks/useAuthNavigation"

const howItWorks = [
  {
    number: "01",
    title: "Create Your Account",
    description: "Sign up with your email and get started in seconds.",
    icon: UserPlus,
  },
  {
    number: "02",
    title: "Choose Your Role",
    description: "Select Job Seeker, Mentor, or Recruiter — each gets a tailored experience.",
    icon: ClipboardList,
  },
  {
    number: "03",
    title: "Complete Your Profile",
    description: "Add your bio, upload your resume, select expertise areas, or set up your company info.",
    icon: FileText,
  },
  {
    number: "04",
    title: "Access Your Dashboard",
    description: "Get a personalized dashboard with AI-powered tools, matches, and insights built for your role.",
    icon: LayoutDashboard,
  },
]

const jobSeekerFeatures = [
  { icon: Upload, title: "Resume Upload & AI Analysis", description: "Upload your resume and get instant skill extraction, gap analysis, and improvement suggestions." },
  { icon: Users, title: "Mentor Matching", description: "Get matched with industry mentors based on your goals, skills, and career aspirations." },
  { icon: Target, title: "Role Suggestions", description: "Discover AI-curated job opportunities with match percentages, salary ranges, and skill gap insights." },
  { icon: Map, title: "Career Roadmap", description: "Follow a personalized learning path with milestones, timelines, and resources for your target role." },
]

const mentorFeatures = [
  { icon: Users, title: "Mentee Matching", description: "Browse and connect with mentees whose goals align with your expertise and experience." },
  { icon: CalendarCheck, title: "Session Management", description: "Schedule, manage, and track mentoring sessions — upcoming, today, and completed." },
  { icon: TrendingUp, title: "Mentee Progress Tracking", description: "Monitor your mentees' growth with progress indicators and completion milestones." },
]

const recruiterFeatures = [
  { icon: Briefcase, title: "Job Postings", description: "Create, manage, and track job listings. Pause, resume, or close postings anytime." },
  { icon: Search, title: "Candidate Search", description: "Find candidates by skills, title, and location. View profiles, ratings, and experience." },
  { icon: FileText, title: "Application Management", description: "Review applications with tabs for pending, interview, approved, and rejected candidates." },
  { icon: BarChart3, title: "Hiring Analytics", description: "Track total candidates, active jobs, hiring trends, response rates, and match quality." },
]

const sharedFeatures = [
  { icon: MessageCircle, title: "AI Chat Assistant", description: "Get instant, context-aware career guidance through a conversational AI interface with chat history." },
  { icon: Mic, title: "Voice Career Assistant", description: "Speak naturally about your career questions and get personalized AI-powered responses." },
  { icon: Bot, title: "Model Benchmarks", description: "View AI model performance metrics, accuracy stats, and comparison with other career platforms." },
]


const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1 },
  }),
}

export default function Index() {
  const { shouldRedirectToDashboard, getDashboardRoute } = useAuthNavigation()

  if (shouldRedirectToDashboard()) {
    const dashboardRoute = getDashboardRoute()
    if (dashboardRoute) {
      return <Navigate to={dashboardRoute} replace />
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* ───── Hero ───── */}
      <section className="relative overflow-hidden min-h-screen flex items-center">
        <motion.div
          className="clay-blob absolute -top-24 -left-24 w-72 h-72 opacity-40"
          animate={{ y: [0, -18, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="clay-blob absolute bottom-10 right-10 w-56 h-56 opacity-30"
          animate={{ y: [0, 14, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="clay-blob absolute top-1/3 right-1/4 w-40 h-40 opacity-20"
          animate={{ y: [0, -10, 0], x: [0, 8, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="relative z-10 w-full px-6 lg:px-8 pt-24 pb-12">
          <div className="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-[1fr_1.9fr] gap-12 items-center">
            {/* Left — Text content */}
            <div>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="inline-block mb-5"
              >
                <div className="clay-sm px-5 py-2 inline-flex items-center gap-2 text-sm font-medium text-primary">
                  <Rocket className="h-4 w-4" />
                  Currently in Development — Early Access Coming Soon
                </div>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 leading-tight"
              >
                Your Career,{" "}
                <span className="hero-text">Supercharged&nbsp;by&nbsp;AI</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.15 }}
                className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed"
              >
                Whether you're a job seeker, mentor, or recruiter — get a
                personalized AI-powered dashboard with intelligent matching,
                career roadmaps, and real-time insights.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <Link to="/signup">
                  <button className="clay-primary px-8 py-4 font-semibold text-lg inline-flex items-center gap-2 group">
                    Get Started Free
                    <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </Link>
                <a href="#how-it-works">
                  <button className="clay px-8 py-4 font-semibold text-lg text-foreground">
                    See How It Works
                  </button>
                </a>
              </motion.div>
            </div>

            {/* Right — Hero image */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <img
                src="/hero.png"
                alt="CareerForge AI Dashboard Preview"
                className="w-full scale-150 drop-shadow-2xl"
                style={{ mixBlendMode: "lighten" }}
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ───── How It Works (4 steps — actual flow) ───── */}
      <section id="how-it-works" className="py-16 bg-muted/20">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
              How It <span className="hero-text">Works</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto">
              From sign-up to your personalized dashboard in four steps
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {howItWorks.map((step, i) => (
              <motion.div
                key={step.number}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="clay p-8 text-center relative"
              >
                <div className="clay-icon w-16 h-16 mx-auto mb-5 flex items-center justify-center">
                  <step.icon className="h-7 w-7 text-primary" />
                </div>
                <span className="text-xs font-bold text-primary/60 uppercase tracking-widest">Step {step.number}</span>
                <h3 className="text-lg font-bold mt-1 mb-3">{step.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ───── Job Seeker Features ───── */}
      <section className="py-16 bg-background">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <div className="clay-sm inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-primary mb-4">
              <Target className="h-4 w-4" /> For Job Seekers
            </div>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
              Land Your <span className="hero-text">Dream Role</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto">
              AI-powered tools to analyze your resume, match you with mentors, discover roles, and build a career roadmap
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {jobSeekerFeatures.map((f, i) => (
              <motion.div
                key={f.title}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="clay p-8 flex gap-5"
              >
                <div className="clay-icon w-14 h-14 flex-shrink-0 flex items-center justify-center">
                  <f.icon className="h-7 w-7 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-2">{f.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{f.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ───── Mentor Features ───── */}
      <section className="py-16 bg-muted/20">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <div className="clay-sm inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-primary mb-4">
              <Users className="h-4 w-4" /> For Mentors
            </div>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
              Guide the Next <span className="hero-text">Generation</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto">
              Connect with mentees, manage sessions, and track their growth — all from one dashboard
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {mentorFeatures.map((f, i) => (
              <motion.div
                key={f.title}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="clay p-8 text-center"
              >
                <div className="clay-icon w-14 h-14 mx-auto flex items-center justify-center mb-5">
                  <f.icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-lg font-bold mb-2">{f.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{f.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ───── Recruiter Features ───── */}
      <section className="py-16 bg-background">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <div className="clay-sm inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-primary mb-4">
              <Briefcase className="h-4 w-4" /> For Recruiters
            </div>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
              Hire <span className="hero-text">Smarter</span>, Faster
            </h2>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto">
              Post jobs, search candidates, manage applications, and track hiring analytics with AI assistance
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {recruiterFeatures.map((f, i) => (
              <motion.div
                key={f.title}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="clay p-8 flex gap-5"
              >
                <div className="clay-icon w-14 h-14 flex-shrink-0 flex items-center justify-center">
                  <f.icon className="h-7 w-7 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-2">{f.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{f.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ───── Shared AI Features ───── */}
      <section className="py-16 bg-muted/20">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <div className="clay-sm inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-primary mb-4">
              <Sparkles className="h-4 w-4" /> For Everyone
            </div>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
              AI-Powered <span className="hero-text">Tools</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto">
              Every role gets access to intelligent career assistance
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {sharedFeatures.map((f, i) => (
              <motion.div
                key={f.title}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="clay p-8 text-center"
              >
                <div className="clay-icon w-14 h-14 mx-auto flex items-center justify-center mb-5">
                  <f.icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-lg font-bold mb-2">{f.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{f.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
