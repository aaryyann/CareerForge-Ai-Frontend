import { apiClient } from "./client";

export type JobType = "full_time" | "part_time" | "contract" | "internship";
export type WorkType = "remote" | "hybrid" | "onsite";

export interface Job {
  id: string;
  recruiterId: string;
  companyId: string | null;
  jobTitle: string;
  jobDescription: string;
  jobRequirement: string | null;
  minExperience: number | null;
  maxExperience: number | null;
  minSalary: string | null;
  maxSalary: string | null;
  jobLocation: string | null;
  jobType: JobType | null;
  workType: WorkType | null;
  isActive: boolean | null;
  openSlots: number | null;
  createdAt: string;
  updatedAt: string;
  expiresAt: string | null;
  companyName?: string | null;
  applicationCount?: number;
  skills?: string[];
}

export interface CreateJobPayload {
  jobTitle: string;
  jobDescription: string;
  jobRequirement?: string;
  minExperience?: number;
  maxExperience?: number;
  minSalary?: string;
  maxSalary?: string;
  jobLocation?: string;
  jobType?: JobType;
  workType?: WorkType;
  openSlots?: number;
  skills?: string[];
}

export type UpdateJobPayload = Partial<CreateJobPayload>;

interface ApiResponse<T> {
  isSuccess: boolean;
  message: string;
  data: T;
}

export const jobsApi = {
  create: (data: CreateJobPayload) =>
    apiClient.post<ApiResponse<Job>>("/api/v1/jobs", data),

  getAll: (params?: { search?: string; status?: string }) =>
    apiClient.get<ApiResponse<Job[]>>("/api/v1/jobs", {
      params: params as Record<string, string>,
    }),

  getById: (id: string) =>
    apiClient.get<ApiResponse<Job>>(`/api/v1/jobs/${id}`),

  update: (id: string, data: UpdateJobPayload) =>
    apiClient.put<ApiResponse<void>>(`/api/v1/jobs/${id}`, data),

  toggleActive: (id: string) =>
    apiClient.patch<ApiResponse<{ isActive: boolean }>>(
      `/api/v1/jobs/${id}/toggle`,
    ),

  delete: (id: string) =>
    apiClient.delete<ApiResponse<void>>(`/api/v1/jobs/${id}`),
};
