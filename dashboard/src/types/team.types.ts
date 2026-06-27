// types/team.types.ts

/* =======================
   Main Team Type
======================= */
export interface Team {
  id: string;

  name: string; // Team member full name
  designation: string; // Job title or role
  image?: string; // Profile image URL

  linkedin_url?: string;
  portfolio_url?: string;
  facebook_url?: string;

  created_at: string | Date;
  updated_at: string | Date;

  addedBy?: {
    id: string;
    name?: string;
    role?: string;
  };
}

/* =======================
   Create Request
======================= */
export interface CreateTeamRequest {
  name: string;
  designation: string;
  image?: string;

  linkedin_url?: string;
  portfolio_url?: string;
  facebook_url?: string;
}

/* =======================
   Update Request
======================= */
export interface UpdateTeamRequest {
  id: string;
  data:
    | FormData
    | Partial<{
        name: string;
        designation: string;
        image?: string;
        linkedin_url?: string;
        portfolio_url?: string;
        facebook_url?: string;
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
   Team Paginated Response
======================= */
export type TeamPaginatedResponse = PaginatedResponse<Team[]>;