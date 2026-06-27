// types/category.types.ts
export interface Category {
  id: string;
  name: string;
  slug: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateCategoryRequest {
  name: string;
}

export interface UpdateCategoryRequest {
  id: string;
  data: Partial<CreateCategoryRequest>;
}

export interface PaginationQuery {
  page?: number;
  limit?: number;
  search?: string;
 id?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  // Make sure meta is not just optional, but has the exact fields
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number; 
  };
  status?: number;
  apiVersion?: string;
}


// types/category.types.ts
export interface PaginatedResponse<T> {
  data: T;
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number; // ✅ plural
  };
  success: boolean;
  message: string;
  status?: number;
  links?: Record<string, string>;
}

export type CategoriesPaginatedResponse = PaginatedResponse<Category[]>;




