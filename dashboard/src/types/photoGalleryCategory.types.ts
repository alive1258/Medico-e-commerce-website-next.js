// types/photoGalleryCategory.types.ts

// ✅ Photo Gallery Category Interface
export interface PhotoGalleryCategory {
  id: string;
  title: string;
  slug: string;
  event_place?: string; // optional, like your Create DTO
  description: string;
  image?: string; // stored image URL
  is_active?: boolean;

  created_at: string | Date;
  updated_at: string | Date;

  addedBy?: {
    id: string;
    name?: string;
    role?: string;
  };
}

// ✅ Request to create a photo gallery category
export interface CreatePhotoGalleryCategoryRequest {
  title: string;
  slug: string;
  event_place?: string;
  description: string;
  thumbnail?: string;
  is_active?: boolean;
}

// ✅ Request to update a photo gallery category
// ✅ Request to update a photo gallery category
export interface UpdatePhotoGalleryCategoryRequest {
  // Either id or slug should be used as identifier
  id?: string;
  slug?: string;

  data: FormData | Partial<{
    title: string;
    slug: string;
    event_place?: string;
    description: string;
    thumbnail?: string;
    is_active?: boolean;
  }>;
}

// ✅ Pagination query type
export interface PaginationQuery {
  page?: number;
  limit?: number;
  search?: string;
  id?: string;
}

// ✅ Generic paginated response
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

// ✅ Photo gallery category paginated response
export type PhotoGalleryCategoriesPaginatedResponse = PaginatedResponse<PhotoGalleryCategory[]>;