// types/whoWeAreFeature.types.ts

// Minimal WhoWeAre reference
export interface WhoWeAreRef {
  id: string;
  title?: string;
}

// Single WhoWeAreFeature item
export interface WhoWeAreFeature {
  id: string;
  who_we_are_id: string;
  title: string;
  description: string;

  created_at: string;
  updated_at: string;
  deleted_at?: string | null;

  // Optional nested relation (if API returns it)
  whoWeAre?: WhoWeAreRef;
}

// Create request payload
export interface CreateWhoWeAreFeatureRequest {
  who_we_are_id: string;
  title: string;
  description: string;
}

// Update request payload
export interface UpdateWhoWeAreFeatureRequest {
  id: string;
  data: Partial<{
    who_we_are_id: string;
    title: string;
    description: string;
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
    totalPages: number;
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
    totalPages: number;
  };
  success: boolean;
  message: string;
  status?: number;
  links?: Record<string, string>;
}

// Convenience type
export type WhoWeAreFeaturePaginatedResponse =
  PaginatedResponse<WhoWeAreFeature[]>;