// types/subscription.types.ts

/* =========================================
   ENUM / UNION TYPES
========================================= */

export type BillingCycle = "monthly" | "yearly";

export type SubscriptionStatus =
  | "ACTIVE"
  | "PENDING"
  | "EXPIRED"
  | "CANCELLED";

/* =========================================
   RELATED SUMMARY TYPES
========================================= */

// Service short info
export interface ServiceSummary {
  id: string;
  name: string;
}

// User short info
export interface AddedByUserSummary {
  id: string;
  name: string;
  mobile: string;
  email: string;
}

// Pricing short info
export interface PricingSummary {
  id: string;
  price: string;
}

/* =========================================
   MAIN SUBSCRIPTION TYPE
========================================= */

export interface Subscription {
  id: string;
  transaction_id: string;

  billing_cycle: BillingCycle;

  added_by: string;
  added_by_user?: AddedByUserSummary;

  service_id: string;
  service?: ServiceSummary;

  payment_id: string | null;

  pricing_id: string;
  pricing?: PricingSummary;

  /** Final charged price (after discount if any) */
  price: string;

  status: SubscriptionStatus;

  started_at: string;
  expired_at: string;

  created_at: string;
}

/* =========================================
   REQUEST DTOs
========================================= */

// Create
export interface CreateSubscriptionRequest {
  service_id: string;
  pricing_id: string;
  billing_cycle: BillingCycle;
}

// Update
export interface UpdateSubscriptionRequest {
  id: string;
  data: Partial<{
    service_id: string;
    pricing_id: string;
    billing_cycle: BillingCycle;
    status: SubscriptionStatus;
  }>;
}

/* =========================================
   PAGINATION + RESPONSES
========================================= */

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

/* Convenience alias */
export type SubscriptionsPaginatedResponse = PaginatedResponse<Subscription[]>;
