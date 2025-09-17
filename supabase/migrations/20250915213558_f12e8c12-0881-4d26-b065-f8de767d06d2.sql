-- Create user role enum
CREATE TYPE public.user_role AS ENUM ('jobseeker', 'recruiter', 'mentor');

-- Create profiles table that extends auth.users
CREATE TABLE public.profiles (
  id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  first_name TEXT,
  last_name TEXT,
  bio TEXT,
  role user_role NOT NULL,
  profile_picture TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for profiles
CREATE POLICY "Users can view their own profile" 
ON public.profiles 
FOR SELECT 
USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" 
ON public.profiles 
FOR UPDATE 
USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile" 
ON public.profiles 
FOR INSERT 
WITH CHECK (auth.uid() = id);

-- Create function to automatically create profile on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, first_name, last_name, role)
  VALUES (
    NEW.id,
    NEW.raw_user_meta_data->>'first_name',
    NEW.raw_user_meta_data->>'last_name',
    (NEW.raw_user_meta_data->>'role')::user_role
  );
  RETURN NEW;
END;
$$;

-- Create trigger for new user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create function to get user role (security definer to bypass RLS)
CREATE OR REPLACE FUNCTION public.get_user_role(user_id UUID)
RETURNS user_role
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT role FROM public.profiles WHERE id = user_id;
$$;

-- Update existing tables to reference profiles instead of a separate users table
-- Add RLS policies to existing tables based on user roles

-- RLS for resumes (job seekers only)
ALTER TABLE public.resumes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Job seekers can manage their own resumes"
ON public.resumes
FOR ALL
USING (
  user_id = auth.uid() AND 
  public.get_user_role(auth.uid()) = 'jobseeker'
);

-- RLS for job_matches (job seekers only)
ALTER TABLE public.job_matches ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Job seekers can view their own job matches"
ON public.job_matches
FOR SELECT
USING (
  user_id = auth.uid() AND 
  public.get_user_role(auth.uid()) = 'jobseeker'
);

-- RLS for roadmaps (job seekers only)
ALTER TABLE public.roadmaps ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Job seekers can manage their own roadmaps"
ON public.roadmaps
FOR ALL
USING (
  user_id = auth.uid() AND 
  public.get_user_role(auth.uid()) = 'jobseeker'
);

-- RLS for mentors (mentors and job seekers can view)
ALTER TABLE public.mentors ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Everyone can view mentors"
ON public.mentors
FOR SELECT
USING (true);

CREATE POLICY "Mentors can update their own profile"
ON public.mentors
FOR UPDATE
USING (id = auth.uid() AND public.get_user_role(auth.uid()) = 'mentor');

-- RLS for mentor_matches 
ALTER TABLE public.mentor_matches ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own mentor matches"
ON public.mentor_matches
FOR SELECT
USING (
  mentee_id = auth.uid() OR 
  (mentor_id = auth.uid() AND public.get_user_role(auth.uid()) = 'mentor')
);

-- RLS for ai_chat_history
ALTER TABLE public.ai_chat_history ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their own chat history"
ON public.ai_chat_history
FOR ALL
USING (user_id = auth.uid());

-- RLS for recommendation_history
ALTER TABLE public.recommendation_history ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own recommendations"
ON public.recommendation_history
FOR SELECT
USING (user_id = auth.uid());

-- RLS for analytics (recruiters and admins only for now)
ALTER TABLE public.analytics ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Recruiters can view analytics"
ON public.analytics
FOR SELECT
USING (public.get_user_role(auth.uid()) = 'recruiter');