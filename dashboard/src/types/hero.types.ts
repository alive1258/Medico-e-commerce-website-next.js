// types/hero.types.ts

export interface Hero {
  id: string;
  title: string;
  description: string;
  company: string;
  score: number;
  rating: number;

  image?: string;
  videoUrl?: string;

  campaigns?: number;
  revenue?: number;

  created_at: string | Date;
  updated_at: string | Date;

  addedBy?: {
    id: string;
    name?: string;
    role?: string;
  };
}

// Request to create hero
export interface CreateHeroRequest {
  title: string;
  description: string;
  company: string;
  score: number;
  rating: number;
  image?: string;
  videoUrl?: string;
  campaigns?: number;
  revenue?: number;
}

// Request to update hero
export interface UpdateHeroRequest {
  id: string;
  data:
    | FormData
    | Partial<{
        title: string;
        description: string;
        company: string;
        score: number;
        rating: number;
        image?: string;
        videoUrl?: string;
        campaigns?: number;
        revenue?: number;
      }>;
}

// Pagination
export interface PaginationQuery {
  page?: number;
  limit?: number;
  search?: string;
  id?: string;
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

// Hero paginated response
export type HeroesPaginatedResponse = PaginatedResponse<Hero[]>;