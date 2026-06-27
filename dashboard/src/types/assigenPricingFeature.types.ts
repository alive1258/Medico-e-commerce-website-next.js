// types/assigenPricingFeature.types.ts

/* -------------------------------------------------------------------------- */
/*                              CORE ENTITY TYPE                               */
/* -------------------------------------------------------------------------- */

export interface AssignedPricingFeature {
  id: string;
  pricing_id: string;
  pricing_features_id: string;
  created_at: string;
  updated_at: string;
  deleted_at?: string | null;
  added_by: string;

  // who added
  addedBy?: {
    id: string;
    name: string;
    mobile: string;
    email: string;
  };

  // pricing relation
  pricing?: {
    id: string;
    service_id: string;
    pricing_category_id: string;

    pricingCategory?: {
      id: string;
      title: string;
    };

    service?: {
      id: string;
      name: string;
    };
  };

  // feature relation
  pricing_feature?: {
    id: string;
    title: string;
  };
}

/* -------------------------------------------------------------------------- */
/*                               REQUEST TYPES                                */
/* -------------------------------------------------------------------------- */

export interface CreateAssignedPricingFeatureRequest {
  pricing_id: string;
  pricing_features_id: string;
}

export interface UpdateAssignedPricingFeatureRequest {
  id: string;
  data: Partial<{
    pricing_id: string;
    pricing_features_id: string;
  }>;
}

/* -------------------------------------------------------------------------- */
/*                               QUERY PARAMS                                 */
/* -------------------------------------------------------------------------- */

export interface PaginationQuery {
  page?: number;
  limit?: number;
  search?: string;
  id?: string;
}

/* -------------------------------------------------------------------------- */
/*                             STANDARD RESPONSES                             */
/* -------------------------------------------------------------------------- */

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

/* -------------------------------------------------------------------------- */
/*                        GENERIC PAGINATED RESPONSE                          */
/* -------------------------------------------------------------------------- */

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

/* -------------------------------------------------------------------------- */
/*                    ASSIGNED PRICING FEATURE PAGINATION                     */
/* -------------------------------------------------------------------------- */

export type AssignedPricingFeaturePaginatedResponse =
  PaginatedResponse<AssignedPricingFeature[]>;
