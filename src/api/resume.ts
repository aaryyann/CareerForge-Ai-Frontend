// ============================================================================
// RESUME API ENDPOINTS (ML Service)
// ============================================================================

const ML_API_URL = import.meta.env.VITE_ML_API_URL || "http://localhost:8000";

export interface ResumeSkill {
  name: string;
  category: string;
  skill_type: string;
  source: string;
}

export interface ResumeFeedback {
  overall_score: number;
  section_scores: Record<string, number>;
  suggestions: string[];
  keyword_analysis: {
    strong_keywords: string[];
    missing_keywords: string[];
    industry_alignment: string;
  };
  formatting_issues: string[];
}

export interface ResumeMetadata {
  full_name: string;
  email: string;
  phone: string;
  linkedin_url: string;
  github_url: string;
  portfolio_url: string;
  location: string;
  experience_level: string;
  total_years_of_experience: number;
  current_title: string;
  industry_match: string;
  strength_areas: string[];
  improvement_areas: string[];
}

export interface ParsedResumeData {
  metadata: ResumeMetadata;
  skills: ResumeSkill[];
  education: Record<string, unknown>[];
  experience: Record<string, unknown>[];
  projects: Record<string, unknown>[];
  certifications: Record<string, unknown>[];
  feedback: ResumeFeedback;
}

export interface ResumeUploadResponse {
  success: boolean;
  resume_id: string;
  file_url: string;
  parsed_data: ParsedResumeData;
}

export const resumeApi = {
  upload: async (
    file: File,
    userId: string,
    onProgress?: (progress: number) => void
  ): Promise<ResumeUploadResponse> => {
    return new Promise((resolve, reject) => {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("user_id", userId);

      const xhr = new XMLHttpRequest();
      xhr.open("POST", `${ML_API_URL}/api/v1/resume/upload`);
      xhr.withCredentials = false; // ML service doesn't need cookies

      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable && onProgress) {
          // Upload is 50% of the work, parsing is the other 50%
          const percent = Math.round((event.loaded / event.total) * 50);
          onProgress(percent);
        }
      };

      xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          try {
            const data = JSON.parse(xhr.responseText);
            onProgress?.(100);
            resolve(data);
          } catch {
            reject(new Error("Invalid response from server"));
          }
        } else {
          try {
            const err = JSON.parse(xhr.responseText);
            reject(new Error(err.detail || "Upload failed"));
          } catch {
            reject(new Error(`Upload failed with status ${xhr.status}`));
          }
        }
      };

      xhr.onerror = () => reject(new Error("Network error during upload"));
      xhr.ontimeout = () => reject(new Error("Upload timed out"));
      xhr.timeout = 120000; // 2 min timeout for large files + AI parsing

      // Start showing "parsing" progress after upload completes
      xhr.upload.onload = () => {
        onProgress?.(50);
        // Simulate parsing progress while waiting for Gemini
        let parseProgress = 50;
        const interval = setInterval(() => {
          parseProgress = Math.min(parseProgress + 5, 90);
          onProgress?.(parseProgress);
        }, 1000);

        const origOnload = xhr.onload;
        xhr.onload = (e) => {
          clearInterval(interval);
          origOnload?.call(xhr, e);
        };
      };

      xhr.send(formData);
    });
  },
};
