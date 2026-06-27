// types/service.types.ts

export interface Service {
  id: string;
  name: string;
  slug: string;
  category?: { id: string; name: string };
  description: string;
  key_features?: string;
  used_by_companies?: number;
  landing_page?: string;
  rating?: string | number;
  districts?: string;
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

// Request to create a service
export interface CreateServiceRequest {
  name: string;
  description: string;
  key_features?: string;
  landing_page?: string;
  districts?: string;
  image?: string;
  video_url?: string;
}

// Request to update a service
export interface UpdateServiceRequest {
  id: string;
  // Allow both FormData (for files) or partial object
  data: FormData | Partial<{
    name: string;
    category_id: string;
    description: string;
    key_features?: string;
    landing_page?: string;
    districts?: string;
    image?: string;
    video_url?: string;
    rating?: number;
    used_by_companies?: number;
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
    totalPages: number; // plural like categories
  };
  success: boolean;
  message: string;
  status?: number;
  links?: Record<string, string>;
}

// Service-specific paginated response
export type ServicesPaginatedResponse = PaginatedResponse<Service[]>;
