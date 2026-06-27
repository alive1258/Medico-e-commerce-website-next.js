// types/portfolioCategory.types.ts

export interface PortfolioCategory {
  id: string;
  name: string;
  slug: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

// ✅ matches CreatePortfolioCategoryDto
export interface CreatePortfolioCategoryRequest {
  name: string;
}

export interface UpdatePortfolioCategoryRequest {
  id: string;
  data: Partial<CreatePortfolioCategoryRequest>;
}

export interface PaginationQuery {
  page?: number;
  limit?: number;
  search?: string;
  id?: string;
}

// ✅ Generic API Response
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

// ✅ Generic Paginated Response
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

// ✅ Specific alias
export type PortfolioCategoriesPaginatedResponse =
  PaginatedResponse<PortfolioCategory[]>;