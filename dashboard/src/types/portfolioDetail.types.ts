/* =======================
   Main Portfolio Detail Type
======================= */
export interface PortfolioDetail {
  id: string;

  title: string;
  portfolio_id: string; // links to Portfolio
  description: string;

  key_features?: string;
  image?: string;

  created_at: string | Date;
  updated_at: string | Date;

  // Optional relations (if backend populates)
  portfolio?: {
    id: string;
    title?: string;
  };

  addedBy?: {
    id: string;
    name?: string;
    role?: string;
  };
}

/* =======================
   Create Request
======================= */
export interface CreatePortfolioDetailRequest {
  title: string;
  portfolio_id: string;
  description: string;

  key_features?: string;
  image?: string;
}

/* =======================
   Update Request
======================= */
export interface UpdatePortfolioDetailRequest {
  id: string;
  data:
    | FormData
    | Partial<{
        title: string;
        portfolio_id: string;
        description: string;
        key_features?: string;
        image?: string;
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
   Portfolio Detail Paginated Response
======================= */
export type PortfolioDetailPaginatedResponse =
  PaginatedResponse<PortfolioDetail[]>;