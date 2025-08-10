
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";
import Index from "./pages/Index";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import UploadResume from "./pages/UploadResume";
import MentorMatch from "./pages/MentorMatch";
import RoleSuggest from "./pages/RoleSuggest";
import Roadmap from "./pages/Roadmap";
import Analytics from "./pages/Analytics";
import VoiceInput from "./pages/VoiceInput";
import AIChat from "./pages/AIChat";
import ModelBenchmarks from "./pages/ModelBenchmarks";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="dark" storageKey="careerforge-ui-theme">
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/upload-resume" element={<UploadResume />} />
            <Route path="/mentor-match" element={<MentorMatch />} />
            <Route path="/role-suggest" element={<RoleSuggest />} />
            <Route path="/roadmap" element={<Roadmap />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/voice-input" element={<VoiceInput />} />
            <Route path="/ai-chat" element={<AIChat />} />
            <Route path="/model-benchmarks" element={<ModelBenchmarks />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
