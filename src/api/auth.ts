// ============================================================================
// AUTH API ENDPOINTS
// ============================================================================

import { apiClient } from './client';
import type {
  User,
  UserRole,
  LoginCredentials,
  RegisterCredentials,
  ProfileCompletionData,
} from '@/types/auth';

interface AuthResponse {
  data: User;
}

// ============================================================================
// AUTHENTICATION
// ============================================================================

export const authApi = {
  signIn: (credentials: LoginCredentials) =>
    apiClient.post<AuthResponse>('/api/v1/auth/signin', credentials),

  signUp: (credentials: RegisterCredentials) =>
    apiClient.post<AuthResponse>('/api/v1/auth/signup', credentials),

  signOut: () =>
    apiClient.post<void>('/api/v1/auth/signout'),

  getMe: () =>
    apiClient.get<AuthResponse>('/api/v1/auth/me'),

  refreshToken: () =>
    apiClient.post<AuthResponse>('/api/auth/refresh'),
};

// ============================================================================
// PROFILE COMPLETION
// ============================================================================

const PROFILE_ENDPOINTS: Record<UserRole, string> = {
  job_seeker: '/api/v1/auth/job-seeker/profile',
  recruiter: '/api/v1/auth/recruiter/profile',
  mentor: '/api/v1/auth/mentor/profile',
};

export const profileApi = {
  completeProfile: (role: UserRole, data: ProfileCompletionData) =>
    apiClient.post<AuthResponse>(PROFILE_ENDPOINTS[role], data),

  updateProfile: (role: UserRole, data: Partial<ProfileCompletionData>) =>
    apiClient.patch<AuthResponse>(PROFILE_ENDPOINTS[role], data),

  getProfile: (role: UserRole) =>
    apiClient.get<AuthResponse>(PROFILE_ENDPOINTS[role]),
};

// ============================================================================
// AVATAR UPLOAD
// ============================================================================

const API_BASE_URL = import.meta.env.VITE_API_URL || '';

export const avatarApi = {
  upload: async (file: File): Promise<{ avatarUrl: string }> => {
    const response = await fetch(`${API_BASE_URL}/api/v1/auth/avatar`, {
      method: 'POST',
      headers: { 'Content-Type': file.type },
      credentials: 'include',
      body: file,
    });

    if (!response.ok) {
      const err = await response.json().catch(() => ({ message: 'Upload failed' }));
      throw new Error(err.message || 'Avatar upload failed');
    }

    const data = await response.json();
    return { avatarUrl: data.data.avatarUrl };
  },
};
