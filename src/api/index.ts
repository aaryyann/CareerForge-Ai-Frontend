// ============================================================================
// API EXPORTS
// ============================================================================

export { apiClient, ApiError } from './client';
export { authApi, profileApi, avatarApi } from './auth';
export { resumeApi } from './resume';
export { roadmapApi, roadmapMlApi, resumeListApi } from './roadmap';
export { jobsApi } from './jobs';
export type { ResumeUploadResponse, ParsedResumeData, ResumeSkill, ResumeFeedback } from './resume';
export type { Roadmap, RoadmapMilestone, RoadmapResource, GenerateRoadmapResponse, UserResume } from './roadmap';
export type { Job, CreateJobPayload, UpdateJobPayload, JobType, WorkType } from './jobs';
