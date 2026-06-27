/* =======================
   Main Portfolio Type
======================= */
export interface Portfolio {
  id: string;
  title: string;
  portfolio_category_id: string;
  slug: string;
  meta_title: string;
  meta_keywords: string;
  meta_description: string;
  description: string;
  company_name?: string;
  image?: string;
  created_at: string | Date;
  updated_at: string | Date;

  // Optional relation (if backend populates)
  portfolio_category?: {
    id: string;
    name?: string;
  };
  category?: {
    id: string;
    name?: string;
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
export interface CreatePortfolioRequest {
  title: string;
  portfolio_category_id: string;
  description: string;

  company_name?: string;
  image?: string;
}

/* =======================
   Update Request
======================= */
export interface UpdatePortfolioRequest {
  id: string;
  data:
    | FormData
    | Partial<{
        title: string;
        portfolio_category_id: string;
        description: string;
        company_name?: string;
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
   Portfolio Paginated Response
======================= */
export type PortfolioPaginatedResponse =
  PaginatedResponse<Portfolio[]>;
