// types/videoGalleryCategory.types.ts

export interface VideoGalleryCategory {
  id: string;
  badge_name: string;
  slug: string;
  author_name?: string;
  title: string;
  description: string;
  thumbnail?: string;
  video_url?: string;
  created_at: string | Date;
  updated_at: string | Date;

  addedBy?: {
    id: string;
    name?: string;
    role?: string;
  };
}

// Request to create a video gallery category
export interface CreateVideoGalleryCategoryRequest {
  badge_name: string;
  slug: string;
  author_name?: string;
  title: string;
  description: string;
  thumbnail?: string;
  video_url?: string;
}

// Request to update a video gallery category
export interface UpdateVideoGalleryCategoryRequest {
  id: string;
  // allow FormData (for files) or partial object update
  data: FormData | Partial<{
    badge_name: string;
    slug: string;
    author_name?: string;
    title: string;
    description: string;
    thumbnail?: string;
    video_url?: string;
  }>;
}

// Pagination query type
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

// Video gallery category paginated response
export type VideoGalleryCategoriesPaginatedResponse = PaginatedResponse<VideoGalleryCategory[]>;