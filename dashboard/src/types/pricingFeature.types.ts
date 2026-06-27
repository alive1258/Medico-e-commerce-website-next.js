// types/pricingFeature.types.ts

// Single Pricing Feature type
export interface PricingFeature {
  id: string;
  title: string;
  isActive: boolean;        // camelCase
  addedBy: string;          // camelCase
  createdAt: string;        // camelCase
  updatedAt: string;        // camelCase
  deletedAt?: string | null; // camelCase
}

// Request payloads
export interface CreatePricingFeatureRequest {
  title: string;
}

export interface UpdatePricingFeatureRequest {
  id: string;
  data: Partial<{
    title: string;
    isActive: boolean;
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

// Convenience type for paginated pricing features
export type PricingFeaturesPaginatedResponse = PaginatedResponse<PricingFeature[]>;
