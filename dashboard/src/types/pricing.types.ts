// types/pricing.types.ts

// Billing cycle options
export type BillingCycle = "monthly" | "yearly";

// Pricing Category type (minimal)
export interface PricingCategory {
  id: string;
  title: string;
}

// Single Pricing item type
export interface Pricing {
  id: string;
  service_id: string;
  pricing_category_id: string;
  price: number;
  discount?: number;
  billing_cycle: BillingCycle;
  is_active: boolean;
  added_by: string;
  created_at: string;
  updated_at: string;
  deleted_at?: string | null;

  // Optional nested category for API convenience
  pricingCategory?: PricingCategory;
}

// Create request payload
export interface CreatePricingRequest {
  service_id: string;
  pricing_category_id: string;
  price: number;
  discount?: number;
  billing_cycle: BillingCycle;
}

// Update request payload
export interface UpdatePricingRequest {
  id: string;
  data: Partial<{
    service_id: string;
    pricing_category_id: string;
    price: number;
    discount?: number;
    billing_cycle: BillingCycle;
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

// Convenience type for paginated Pricing items
export type PricingPaginatedResponse = PaginatedResponse<Pricing[]>;
