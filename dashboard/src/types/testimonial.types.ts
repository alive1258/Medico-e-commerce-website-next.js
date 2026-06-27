// types/testimonial.types.ts

/* =======================
   Main Testimonial Type
======================= */
export interface Testimonial {
  id: string;

  name: string; // Client name
  designation: string; // Job title
  description: string; // Testimonial message
  rating: number; // 0–5

  image?: string; // Client image
  service_id?: string; // Related service UUID
  reviewGenerated?: number;
  performance?: number;

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
export interface CreateTestimonialRequest {
  name: string;
  designation: string;
  description: string;
  rating: number;

  image?: string;
  service_id?: string;
  reviewGenerated?: number;
  performance?: number;
}

/* =======================
   Update Request
======================= */
export interface UpdateTestimonialRequest {
  id: string;
  data:
    | FormData
    | Partial<{
        name: string;
        designation: string;
        description: string;
        rating: number;
        image?: string;
        service_id?: string;
        reviewGenerated?: number;
        performance?: number;
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
   Testimonial Paginated Response
======================= */
export type TestimonialPaginatedResponse = PaginatedResponse<Testimonial[]>;