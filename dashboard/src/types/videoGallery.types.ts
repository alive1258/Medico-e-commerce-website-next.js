// types/videoGallery.types.ts

export interface VideoGalleryCategory {
  id: string;
  title: string;
  badge_name?: string;
  description?: string;
  thumbnail?: string;
}

export interface VideoGallery {
  id: string;
  badge_name: string;
  title: string;
  description: string;
  thumbnail?: string;
  video_url?: string;

  // 🔗 relation
  video_gallary_category_id: string;
  videoGallaryCategory?: VideoGalleryCategory; // <-- change from string to object

  created_at: string | Date;
  updated_at: string | Date;

  addedBy?: {
    id: string;
    name?: string;
    role?: string;
  };
}

// ✅ CREATE REQUEST
export interface CreateVideoGalleryRequest {
  badge_name: string;
  video_gallary_category_id: string;
  title: string;
  description: string;
  thumbnail?: string;
  video_url?: string;
}

// ✅ UPDATE REQUEST
export interface UpdateVideoGalleryRequest {
  id: string;
  data: FormData | Partial<{
    badge_name: string;
    video_gallary_category_id: string;
    title: string;
    description: string;
    thumbnail?: string;
    video_url?: string;
  }>;
}

// ✅ PAGINATION QUERY
export interface PaginationQuery {
  page?: number;
  limit?: number;
  search?: string;
  id?: string;
}

// ✅ GENERIC PAGINATED RESPONSE
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

// ✅ VIDEO GALLERY PAGINATED RESPONSE
export type VideoGalleryPaginatedResponse =
  PaginatedResponse<VideoGallery[]>;