export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.4"
  }
  public: {
    Tables: {
      ai_chat_history: {
        Row: {
          created_at: string
          id: string
          message: string
          sender: Database["public"]["Enums"]["sender_type"]
          thread_id: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          message: string
          sender: Database["public"]["Enums"]["sender_type"]
          thread_id?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          message?: string
          sender?: Database["public"]["Enums"]["sender_type"]
          thread_id?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ai_chat_history_user_id_users_id_fk"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      analytics: {
        Row: {
          event_type: string
          id: string
          metadata: Json | null
          recorded_at: string
          user_id: string | null
        }
        Insert: {
          event_type: string
          id?: string
          metadata?: Json | null
          recorded_at?: string
          user_id?: string | null
        }
        Update: {
          event_type?: string
          id?: string
          metadata?: Json | null
          recorded_at?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "analytics_user_id_users_id_fk"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      job_matches: {
        Row: {
          explanation: Json | null
          id: string
          job_description: string | null
          job_title: string
          match_score: number
          matched_at: string
          matched_skills: string[] | null
          missing_skills: string[] | null
          user_id: string | null
        }
        Insert: {
          explanation?: Json | null
          id?: string
          job_description?: string | null
          job_title: string
          match_score: number
          matched_at?: string
          matched_skills?: string[] | null
          missing_skills?: string[] | null
          user_id?: string | null
        }
        Update: {
          explanation?: Json | null
          id?: string
          job_description?: string | null
          job_title?: string
          match_score?: number
          matched_at?: string
          matched_skills?: string[] | null
          missing_skills?: string[] | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "job_matches_user_id_users_id_fk"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      mentor_matches: {
        Row: {
          id: string
          match_score: number
          matched_at: string
          mentee_id: string | null
          mentor_id: string | null
        }
        Insert: {
          id?: string
          match_score: number
          matched_at?: string
          mentee_id?: string | null
          mentor_id?: string | null
        }
        Update: {
          id?: string
          match_score?: number
          matched_at?: string
          mentee_id?: string | null
          mentor_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "mentor_matches_mentee_id_users_id_fk"
            columns: ["mentee_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "mentor_matches_mentor_id_mentors_id_fk"
            columns: ["mentor_id"]
            isOneToOne: false
            referencedRelation: "mentors"
            referencedColumns: ["id"]
          },
        ]
      }
      mentors: {
        Row: {
          availability: Json | null
          bio: string | null
          expertise: string[] | null
          id: string
          name: string
          profile_picture: string | null
        }
        Insert: {
          availability?: Json | null
          bio?: string | null
          expertise?: string[] | null
          id?: string
          name: string
          profile_picture?: string | null
        }
        Update: {
          availability?: Json | null
          bio?: string | null
          expertise?: string[] | null
          id?: string
          name?: string
          profile_picture?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          bio: string | null
          created_at: string
          first_name: string | null
          id: string
          last_name: string | null
          profile_picture: string | null
          role: Database["public"]["Enums"]["user_role"]
          updated_at: string
        }
        Insert: {
          bio?: string | null
          created_at?: string
          first_name?: string | null
          id: string
          last_name?: string | null
          profile_picture?: string | null
          role: Database["public"]["Enums"]["user_role"]
          updated_at?: string
        }
        Update: {
          bio?: string | null
          created_at?: string
          first_name?: string | null
          id?: string
          last_name?: string | null
          profile_picture?: string | null
          role?: Database["public"]["Enums"]["user_role"]
          updated_at?: string
        }
        Relationships: []
      }
      recommendation_history: {
        Row: {
          data: Json
          id: string
          recommended_at: string
          type: Database["public"]["Enums"]["recommendation_type"]
          user_id: string | null
        }
        Insert: {
          data: Json
          id?: string
          recommended_at?: string
          type: Database["public"]["Enums"]["recommendation_type"]
          user_id?: string | null
        }
        Update: {
          data?: Json
          id?: string
          recommended_at?: string
          type?: Database["public"]["Enums"]["recommendation_type"]
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "recommendation_history_user_id_users_id_fk"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      resumes: {
        Row: {
          file_url: string
          id: string
          parsed_education: Json | null
          parsed_experience: Json | null
          parsed_skills: string[] | null
          source: Database["public"]["Enums"]["resume_source"]
          uploaded_at: string
          user_id: string | null
          version: number | null
        }
        Insert: {
          file_url: string
          id?: string
          parsed_education?: Json | null
          parsed_experience?: Json | null
          parsed_skills?: string[] | null
          source?: Database["public"]["Enums"]["resume_source"]
          uploaded_at?: string
          user_id?: string | null
          version?: number | null
        }
        Update: {
          file_url?: string
          id?: string
          parsed_education?: Json | null
          parsed_experience?: Json | null
          parsed_skills?: string[] | null
          source?: Database["public"]["Enums"]["resume_source"]
          uploaded_at?: string
          user_id?: string | null
          version?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "resumes_user_id_users_id_fk"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      roadmaps: {
        Row: {
          created_at: string
          goal: string
          id: string
          progress: number | null
          roadmap_data: Json
          user_id: string | null
        }
        Insert: {
          created_at?: string
          goal: string
          id?: string
          progress?: number | null
          roadmap_data: Json
          user_id?: string | null
        }
        Update: {
          created_at?: string
          goal?: string
          id?: string
          progress?: number | null
          roadmap_data?: Json
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "roadmaps_user_id_users_id_fk"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          bio: string | null
          created_at: string
          email: string
          first_name: string | null
          id: string
          is_profile_completed: boolean
          last_name: string | null
          profile_picture: string | null
          social_provider: string | null
          updated_at: string
        }
        Insert: {
          bio?: string | null
          created_at?: string
          email: string
          first_name?: string | null
          id?: string
          is_profile_completed?: boolean
          last_name?: string | null
          profile_picture?: string | null
          social_provider?: string | null
          updated_at?: string
        }
        Update: {
          bio?: string | null
          created_at?: string
          email?: string
          first_name?: string | null
          id?: string
          is_profile_completed?: boolean
          last_name?: string | null
          profile_picture?: string | null
          social_provider?: string | null
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_user_role: {
        Args: { user_id: string }
        Returns: Database["public"]["Enums"]["user_role"]
      }
    }
    Enums: {
      recommendation_type: "job" | "mentor" | "roadmap"
      resume_source: "upload" | "voice"
      sender_type: "user" | "ai"
      user_role: "jobseeker" | "recruiter" | "mentor"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      recommendation_type: ["job", "mentor", "roadmap"],
      resume_source: ["upload", "voice"],
      sender_type: ["user", "ai"],
      user_role: ["jobseeker", "recruiter", "mentor"],
    },
  },
} as const
