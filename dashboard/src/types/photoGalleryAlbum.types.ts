// types/photoGalleryAlbum.types.ts

// 🔹 SINGLE PHOTO GALLERY ALBUM
export interface PhotoGalleryAlbum {
  id: string;

  // 🔗 Relation to category
  photo_gallery_id: string;
  photoGallery?: {
    id: string;
    title: string;
    badge_name?: string;
    description?: string;
    thumbnail?: string;
  };

  title: string;
  image?: string; // Thumbnail URL
  is_active?: boolean;

  created_at: string | Date;
  updated_at: string | Date;

  addedBy?: {
    id: string;
    name?: string;
    role?: string;
  };
}

// ✅ CREATE REQUEST
export interface CreatePhotoGalleryAlbumRequest {
  photo_gallery_id: string;
  title: string;
  image?: string;
  is_active?: boolean;
}

// ✅ UPDATE REQUEST
export interface UpdatePhotoGalleryAlbumRequest {
  id: string;
  data: FormData | Partial<{
    photo_gallery_id: string;
    title: string;
    image?: string;
    is_active?: boolean;
  }>;
}

// ✅ PAGINATION QUERY
export interface PaginationQuery {
  page?: number;
  limit?: number;
  search?: string;
  id?: string;
}

// ✅ GENERIC PAGINATED RESPONSE
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

// ✅ PHOTO GALLERY ALBUM PAGINATED RESPONSE
export type PhotoGalleryAlbumsPaginatedResponse =
  PaginatedResponse<PhotoGalleryAlbum[]>;