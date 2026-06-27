// Short service reference
export interface ServiceSummary {
  id: string;
  name: string;
}

// User reference
export interface AddedBySummary {
  id: string;
  name?: string;
  email?: string;
  role?: string;
}

export interface ServiceVideo {
  id: string;
  service_id: string;

  title: string;
  description: string;

  thumbnail?: string | null;
  video_url?: string | null;

  is_active: boolean;

  service?: ServiceSummary;
  addedBy?: AddedBySummary;

  created_at: string | Date;
  updated_at: string | Date;
  deleted_at?: string | Date | null;
}

// Create request
export interface CreateServiceVideoRequest {
  service_id: string;
  title: string;
  description: string;
  thumbnail?: string;
  video_url?: string;
}

export interface UpdateServiceVideoRequest {
  id: string;
  data: FormData | Partial<{
    service_id: string;
    title: string;
    description: string;
    thumbnail?: string;
    video_url?: string;
    is_active: boolean;
  }>;
}

export interface PaginationQuery {
  page?: number;
  limit?: number;
  search?: string;
  id?: string;
}

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

export type ServiceVideosPaginatedResponse = PaginatedResponse<ServiceVideo[]>;
