import { apiClient } from './client';

const ML_API_URL = import.meta.env.VITE_ML_API_URL || 'http://localhost:8000';

export interface RoadmapResource {
  title: string;
  url: string;
  type: 'course' | 'documentation' | 'video' | 'book' | 'tutorial' | 'project';
}

export interface RoadmapMilestone {
  id: string;
  roadmapId: string;
  title: string;
  description: string;
  orderIndex: number;
  actionItems: string[];
  resources: RoadmapResource[];
  status: 'pending' | 'in_progress' | 'completed';
  estimatedWeeks: number;
  completedAt: string | null;
}

export interface Roadmap {
  id: string;
  jobSeekerId: string;
  target: string;
  goal: string;
  targetTimeline: string;
  currentMilestone: number;
  totalMilestones: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  milestones?: RoadmapMilestone[];
}

export interface GenerateRoadmapResponse {
  success: boolean;
  roadmap_id: string;
  target: string;
  goal: string;
  target_timeline: string;
  skill_gaps: string[];
  total_milestones: number;
  current_milestone: number;
  milestones: Array<{
    title: string;
    description: string;
    order_index: number;
    action_items: string[];
    resources: RoadmapResource[];
    estimated_weeks: number;
  }>;
}

export interface UserResume {
  id: string;
  fileName: string;
  fileType: string;
  status: string;
  isPrimary: boolean;
  createdAt: string;
}

interface BackendResponse<T> {
  isSuccess: boolean;
  message: string;
  data: T;
}

export const roadmapMlApi = {
  generate: async (userId: string, targetRole: string): Promise<GenerateRoadmapResponse> => {
    const response = await fetch(`${ML_API_URL}/api/v1/roadmap/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user_id: userId, target_role: targetRole }),
    });

    if (!response.ok) {
      const err = await response.json().catch(() => ({ detail: 'Generation failed' }));
      throw new Error(err.detail || 'Roadmap generation failed');
    }

    return response.json();
  },
};

export const roadmapApi = {
  getAll: () =>
    apiClient.get<BackendResponse<Roadmap[]>>('/api/v1/roadmap'),

  getById: (id: string) =>
    apiClient.get<BackendResponse<Roadmap & { milestones: RoadmapMilestone[] }>>(
      `/api/v1/roadmap/${id}`,
    ),

  updateMilestoneStatus: (milestoneId: string, status: 'pending' | 'in_progress' | 'completed') =>
    apiClient.patch<BackendResponse<null>>(
      `/api/v1/roadmap/milestone/${milestoneId}`,
      { status },
    ),
};

export const resumeListApi = {
  getAll: () =>
    apiClient.get<BackendResponse<UserResume[]>>('/api/v1/resume'),

  setPrimary: (id: string) =>
    apiClient.patch<BackendResponse<null>>(`/api/v1/resume/${id}/primary`),
};
