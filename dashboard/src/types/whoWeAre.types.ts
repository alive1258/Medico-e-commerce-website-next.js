// types/whoWeAre.types.ts

// Main WhoWeAre interface
export interface WhoWeAre {
  id: string;
  title: string;
  description: string;
  image?: string;
  video_url?: string;
  created_at: string | Date;
  updated_at: string | Date;
  addedBy?: {
    id: string;
    name?: string;
    role?: string;
  };
}

// Request to create WhoWeAre entry
export interface CreateWhoWeAreRequest {
  title: string;
  description: string;
  image?: string;
  video_url?: string;
}

// Request to update WhoWeAre entry
export interface UpdateWhoWeAreRequest {
  id: string;
  data:
    | FormData
    | Partial<{
        title: string;
        description: string;
        image?: string;
        video_url?: string;
      }>;
}

// Pagination query
export interface PaginationQuery {
  page?: number;
  limit?: number;
  search?: string;
  id?: string;
}

// Generic paginated response
export interface PaginatedResponse<T> {
  data: T;
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
  success: boolean;
  message: string;
  status?: number;
  links?: Record<string, string>;
}

// WhoWeAre paginated response
export type WhoWeArePaginatedResponse = PaginatedResponse<WhoWeAre[]>;