// types/businessWeCover.types.ts

// Single BusinessWeCover type
export interface BusinessWeCover {
  id: string;
  name: string;
  service_id: string;
  is_active: boolean;         // snake_case
  added_by: string;           // snake_case
  created_at: string;         // snake_case
  updated_at: string;         // snake_case
  deleted_at?: string | null; // snake_case, optional
}

// Request payloads
export interface CreateBusinessWeCoverRequest {
  name: string;
  service_id: string;
}

export interface UpdateBusinessWeCoverRequest {
  id: string;
  data: Partial<{
    name: string;
    service_id: string;
    is_active: boolean;
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

// Convenience type for paginated business we cover
export type BusinessWeCoverPaginatedResponse = PaginatedResponse<BusinessWeCover[]>;
