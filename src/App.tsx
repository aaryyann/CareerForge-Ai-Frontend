
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";
import { AuthProvider } from "@/hooks/useAuth";
import { RoleBasedRoute } from "@/components/RoleBasedRoute";
import Index from "./pages/Index";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import ChooseRole from "./pages/ChooseRole";
import JobSeekerRegister from "./pages/register/JobSeeker";
import MentorRegister from "./pages/register/Mentor";
import RecruiterRegister from "./pages/register/Recruiter";
import Dashboard from "./pages/Dashboard";
import RecruiterDashboard from "./pages/RecruiterDashboard";
import MentorDashboard from "./pages/MentorDashboard";
import UploadResume from "./pages/UploadResume";
import MentorMatch from "./pages/MentorMatch";
import RoleSuggest from "./pages/RoleSuggest";
import Roadmap from "./pages/Roadmap";
import Analytics from "./pages/Analytics";
import VoiceInput from "./pages/VoiceInput";
import AIChat from "./pages/AIChat";
import ModelBenchmarks from "./pages/ModelBenchmarks";
import NotFound from "./pages/NotFound";
// Job Seeker Routes
import JobMatches from "./pages/jobseeker/JobMatches";
import Profile from "./pages/jobseeker/Profile";
// Recruiter Routes
import JobPostings from "./pages/recruiter/JobPostings";
import CandidateSearch from "./pages/recruiter/CandidateSearch";
import Applications from "./pages/recruiter/Applications";
// Mentor Routes
import MenteeMatches from "./pages/mentor/MenteeMatches";
import Sessions from "./pages/mentor/Sessions";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="dark" storageKey="careerforge-ui-theme">
      <AuthProvider>
        <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/choose-role" element={<ChooseRole />} />
              <Route path="/register/jobseeker" element={<JobSeekerRegister />} />
              <Route path="/register/mentor" element={<MentorRegister />} />
              <Route path="/register/recruiter" element={<RecruiterRegister />} />
              
              {/* Job Seeker Routes */}
              <Route path="/dashboard" element={
                <RoleBasedRoute allowedRoles={["jobseeker"]}>
                  <Dashboard />
                </RoleBasedRoute>
              } />
              <Route path="/job-matches" element={
                <RoleBasedRoute allowedRoles={["jobseeker"]}>
                  <JobMatches />
                </RoleBasedRoute>
              } />
              <Route path="/profile" element={
                <RoleBasedRoute allowedRoles={["jobseeker"]}>
                  <Profile />
                </RoleBasedRoute>
              } />
              <Route path="/upload-resume" element={
                <RoleBasedRoute allowedRoles={["jobseeker"]}>
                  <UploadResume />
                </RoleBasedRoute>
              } />
              <Route path="/mentor-match" element={
                <RoleBasedRoute allowedRoles={["jobseeker"]}>
                  <MentorMatch />
                </RoleBasedRoute>
              } />
              <Route path="/role-suggest" element={
                <RoleBasedRoute allowedRoles={["jobseeker"]}>
                  <RoleSuggest />
                </RoleBasedRoute>
              } />
              <Route path="/roadmap" element={
                <RoleBasedRoute allowedRoles={["jobseeker"]}>
                  <Roadmap />
                </RoleBasedRoute>
              } />
              
              {/* Recruiter Routes */}
              <Route path="/recruiter-dashboard" element={
                <RoleBasedRoute allowedRoles={["recruiter"]}>
                  <RecruiterDashboard />
                </RoleBasedRoute>
              } />
              <Route path="/job-postings" element={
                <RoleBasedRoute allowedRoles={["recruiter"]}>
                  <JobPostings />
                </RoleBasedRoute>
              } />
              <Route path="/candidate-search" element={
                <RoleBasedRoute allowedRoles={["recruiter"]}>
                  <CandidateSearch />
                </RoleBasedRoute>
              } />
              <Route path="/applications" element={
                <RoleBasedRoute allowedRoles={["recruiter"]}>
                  <Applications />
                </RoleBasedRoute>
              } />
              <Route path="/analytics" element={
                <RoleBasedRoute allowedRoles={["recruiter"]}>
                  <Analytics />
                </RoleBasedRoute>
              } />
              
              {/* Mentor Routes */}
              <Route path="/mentor-dashboard" element={
                <RoleBasedRoute allowedRoles={["mentor"]}>
                  <MentorDashboard />
                </RoleBasedRoute>
              } />
              <Route path="/mentee-matches" element={
                <RoleBasedRoute allowedRoles={["mentor"]}>
                  <MenteeMatches />
                </RoleBasedRoute>
              } />
              <Route path="/sessions" element={
                <RoleBasedRoute allowedRoles={["mentor"]}>
                  <Sessions />
                </RoleBasedRoute>
              } />
              
              {/* Shared Routes */}
              <Route path="/voice-input" element={
                <RoleBasedRoute allowedRoles={["jobseeker", "mentor"]}>
                  <VoiceInput />
                </RoleBasedRoute>
              } />
              <Route path="/ai-chat" element={
                <RoleBasedRoute allowedRoles={["jobseeker", "mentor"]}>
                  <AIChat />
                </RoleBasedRoute>
              } />
              <Route path="/model-benchmarks" element={
                <RoleBasedRoute allowedRoles={["jobseeker", "recruiter", "mentor"]}>
                  <ModelBenchmarks />
                </RoleBasedRoute>
              } />
              
              <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
