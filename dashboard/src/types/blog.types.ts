/* =======================
   Main Blog Type
======================= */
export interface Blog {
  id: string;
  title: string;
  slug: string;
  blog_category_id: string;
  description: string;
  key_features?: string;
  rating?: number;
  image?: string;
  meta_keywords?: string;
  meta_title?: string;
  meta_description?: string;
  created_at: string | Date;
  updated_at: string | Date;

  // Optional relation
  blog_category?: {
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
export interface CreateBlogRequest {
  title: string;
  slug: string; // ✅ IMPORTANT (added)
  blog_category_id: string;
  description: string;

  key_features?: string;
  rating?: number;

  image?: string;
}

/* =======================
   Update Request
======================= */
export interface UpdateBlogRequest {
  id?: string;
  slug?: string; 
  data:
    | FormData
    | Partial<{
        title: string;
        slug: string;
        blog_category_id: string;
        description: string;
        key_features?: string;
        rating?: number;
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
  slug?: string; // ✅ optional filter by slug
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
   Blog Paginated Response
======================= */
export type BlogPaginatedResponse =
  PaginatedResponse<Blog[]>;