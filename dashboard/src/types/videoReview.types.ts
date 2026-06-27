// types/videoReview.types.ts

/* =======================
   Main VideoReview Type
======================= */
export interface VideoReview {
  id: string;

  name: string; // badge/tag
  company_name: string;
  degination: string; // (keeping your backend spelling)

  description: string;

  company_logo?: string;
  video_url?: string;

  created_at: string | Date;
  updated_at: string | Date;

  addedBy?: {
    id: string;
    name?: string;
    role?: string;
  };
}

/* =======================
   Create Request
======================= */
export interface CreateVideoReviewRequest {
  name: string;
  company_name: string;
  degination: string;
  description: string;
  company_logo?: string;
  video_url?: string;
}

/* =======================
   Update Request
======================= */
export interface UpdateVideoReviewRequest {
  id: string;
  data:
    | FormData
    | Partial<{
        name: string;
        company_name: string;
        degination: string;
        description: string;
        company_logo?: string;
        video_url?: string;
      }>;
}

/* =======================
   Pagination Query
======================= */
export interface PaginationQuery {
  page?: number;
  limit?: number;
  search?: string;
  id?: string;
}

/* =======================
   Generic Paginated Response
======================= */
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

/* =======================
   VideoReview Paginated Response
======================= */
export type VideoReviewPaginatedResponse = PaginatedResponse<VideoReview[]>;