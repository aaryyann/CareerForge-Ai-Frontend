
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";
import { AuthProvider } from "@/hooks/useAuth";
import { AuthGuard } from "@/components/shared/AuthGuard";
import { AuthRedirect } from "@/components/shared/AuthRedirect";
import Index from "./pages/Index";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import ChooseRole from "./pages/ChooseRole";
import JobSeekerRegister from "./pages/register/JobSeeker";
import MentorRegister from "./pages/register/Mentor";
import RecruiterRegister from "./pages/register/Recruiter";
import Dashboard from "./pages/jobseeker/Dashboard";
import RecruiterDashboard from "./pages/recruiter/RecruiterDashboard";
import MentorDashboard from "./pages/mentor/MentorDashboard";
import UploadResume from "./pages/jobseeker/UploadResume";
import MentorMatch from "./pages/jobseeker/MentorMatch";
import RoleSuggest from "./pages/jobseeker/RoleSuggest";
import Roadmap from "./pages/jobseeker/Roadmap";
import Analytics from "./pages/recruiter/Analytics";
import VoiceInput from "./pages/shared/VoiceInput";
import AIChat from "./pages/shared/AIChat";
import ModelBenchmarks from "./pages/shared/ModelBenchmarks";
import NotFound from "./pages/NotFound";
// import Profile from "./pages/jobseeker/Profile";
import JobPostings from "./pages/recruiter/JobPostings";
import CandidateSearch from "./pages/recruiter/CandidateSearch";
import Applications from "./pages/recruiter/Applications";
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
              <Route path="/redirect" element={<AuthRedirect />} />
              <Route path="/register/jobseeker" element={<JobSeekerRegister />} />
              <Route path="/register/mentor" element={<MentorRegister />} />
              <Route path="/register/recruiter" element={<RecruiterRegister />} />

              <Route path="/dashboard" element={
                <AuthGuard allowedRoles={["jobseeker"]}>
                  <Dashboard />
                </AuthGuard>
              } />
              {/* <Route path="/profile" element={
                <AuthGuard allowedRoles={["jobseeker"]}>
                  <Profile />
                </AuthGuard>
              } /> */}
              <Route path="/upload-resume" element={
                <AuthGuard allowedRoles={["jobseeker"]}>
                  <UploadResume />
                </AuthGuard>
              } />
              <Route path="/mentor-match" element={
                <AuthGuard allowedRoles={["jobseeker"]}>
                  <MentorMatch />
                </AuthGuard>
              } />
              <Route path="/role-suggest" element={
                <AuthGuard allowedRoles={["jobseeker"]}>
                  <RoleSuggest />
                </AuthGuard>
              } />
              <Route path="/roadmap" element={
                <AuthGuard allowedRoles={["jobseeker"]}>
                  <Roadmap />
                </AuthGuard>
              } />

              <Route path="/recruiter-dashboard" element={
                <AuthGuard allowedRoles={["recruiter"]}>
                  <RecruiterDashboard />
                </AuthGuard>
              } />
              <Route path="/job-postings" element={
                <AuthGuard allowedRoles={["recruiter"]}>
                  <JobPostings />
                </AuthGuard>
              } />
              <Route path="/candidate-search" element={
                <AuthGuard allowedRoles={["recruiter"]}>
                  <CandidateSearch />
                </AuthGuard>
              } />
              <Route path="/applications" element={
                <AuthGuard allowedRoles={["recruiter"]}>
                  <Applications />
                </AuthGuard>
              } />
              <Route path="/analytics" element={
                <AuthGuard allowedRoles={["recruiter"]}>
                  <Analytics />
                </AuthGuard>
              } />

              <Route path="/mentor-dashboard" element={
                <AuthGuard allowedRoles={["mentor"]}>
                  <MentorDashboard />
                </AuthGuard>
              } />
              <Route path="/mentee-matches" element={
                <AuthGuard allowedRoles={["mentor"]}>
                  <MenteeMatches />
                </AuthGuard>
              } />
              <Route path="/sessions" element={
                <AuthGuard allowedRoles={["mentor"]}>
                  <Sessions />
                </AuthGuard>
              } />

              <Route path="/voice-input" element={
                <AuthGuard allowedRoles={["jobseeker", "mentor"]}>
                  <VoiceInput />
                </AuthGuard>
              } />
              <Route path="/ai-chat" element={
                <AuthGuard allowedRoles={["jobseeker", "mentor"]}>
                  <AIChat />
                </AuthGuard>
              } />
              <Route path="/model-benchmarks" element={
                <AuthGuard allowedRoles={["jobseeker", "recruiter", "mentor"]}>
                  <ModelBenchmarks />
                </AuthGuard>
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
