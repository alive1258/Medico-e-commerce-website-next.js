// types/whyChooseUs.types.ts

// Single Why Choose Us item type
export interface WhyChooseUs {
  id: string;
  headline: string;       
  service_id: string;      
  is_active: boolean;      
  added_by: string;       
  created_at: string;      
  updated_at: string;      
  deleted_at?: string | null;
}

// Request payloads
export interface CreateWhyChooseUsRequest {
  headline: string;       
  service_id: string;     
}

export interface UpdateWhyChooseUsRequest {
  id: string;
  data: Partial<{
    headline: string;      // updated text
    service_id: string;    // updated service
    is_active: boolean;    // update status
  }>;
}

// Pagination query
export interface PaginationQuery {
  page?: number;
  limit?: number;
  search?: string;
  id?: string;
}

// Standard API response
export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number; // plural
  };
  status?: number;
  apiVersion?: string;
}

// Generic paginated response
export interface PaginatedResponse<T> {
  data: T;
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number; // plural
  };
  success: boolean;
  message: string;
  status?: number;
  links?: Record<string, string>;
}

// Convenience type for paginated Why Choose Us items
export type WhyChooseUsPaginatedResponse = PaginatedResponse<WhyChooseUs[]>;
