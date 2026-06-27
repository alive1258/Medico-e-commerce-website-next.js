/* =======================
   Main Blog Detail Type
======================= */
export interface BlogDetail {
  id: string;

  title: string;
  blog_id: string; // links to Blog
  description: string;

  key_features?: string;
  image?: string;

  created_at: string | Date;
  updated_at: string | Date;

  // Optional relations (if backend populates)
  blog?: {
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
export interface CreateBlogDetailRequest {
  title: string;
  blog_id: string;
  description: string;

  key_features?: string;
  image?: string;
}

/* =======================
   Update Request
======================= */
export interface UpdateBlogDetailRequest {
  id: string;
  data:
    | FormData
    | Partial<{
        title: string;
        blog_id: string;
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
   Blog Detail Paginated Response
======================= */
export type BlogDetailPaginatedResponse =
  PaginatedResponse<BlogDetail[]>;