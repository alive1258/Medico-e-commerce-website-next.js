// types/photoGallery.types.ts

// ------------------------------
// 🔹 CATEGORY TYPE
// ------------------------------
export interface PhotoGalleryCategory {
  id: string;
  title: string;
  description?: string;
  image?: string; // thumbnail image for category
}

// ------------------------------
// 🔹 PHOTO GALLERY TYPE
// ------------------------------
export interface PhotoGallery {
  id: string;
  title: string;
  description: string;
  image?: string; // thumbnail image
  photo_gallery_category_id: string;
  photo_gallery_category: string;

  // 🔗 relation
  photoGalleryCategory?: PhotoGalleryCategory;

  is_active?: boolean;
  created_at: string | Date;
  updated_at: string | Date;

  addedBy?: {
    id: string;
    name?: string;
    role?: string;
  };
}

// ------------------------------
// ✅ CREATE REQUEST
// ------------------------------
export interface CreatePhotoGalleryRequest {
  photo_gallery_category_id: string;
  title: string;
  description: string;
  image?: string;
  is_active?: boolean;
}

// ------------------------------
// ✅ UPDATE REQUEST
// ------------------------------
export interface UpdatePhotoGalleryRequest {
  id: string;
  data:
    | FormData
    | Partial<{
        photo_gallery_category_id: string;
        title: string;
        description: string;
        image?: string;
        is_active?: boolean;
      }>;
}

// ------------------------------
// ✅ PAGINATION QUERY
// ------------------------------
export interface PaginationQuery {
  page?: number;
  limit?: number;
  search?: string;
  id?: string;
}

// ------------------------------
// ✅ GENERIC PAGINATED RESPONSE
// ------------------------------
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

// ------------------------------
// ✅ PHOTO GALLERY PAGINATED RESPONSE
// ------------------------------
export type PhotoGalleryPaginatedResponse =
  PaginatedResponse<PhotoGallery[]>;