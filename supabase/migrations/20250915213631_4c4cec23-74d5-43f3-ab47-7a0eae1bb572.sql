-- Enable RLS on the existing users table
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for users table (though we'll be using profiles table going forward)
CREATE POLICY "Users can view their own user record"
ON public.users 
FOR SELECT 
USING (id = auth.uid());

CREATE POLICY "Users can update their own user record"
ON public.users 
FOR UPDATE 
USING (id = auth.uid());