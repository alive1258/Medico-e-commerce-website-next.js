export interface District {
  id: string | number;
  name: string;
  division_id?: string | number;
  division?: { 
    id: number; 
    name: string 
  };
  created_at?: string;
  updated_at?: string;
}

// Global wrapper for your API responses
export interface ApiResponse<T> {
  success: boolean;
  status: number;
  message: string;
  apiVersion: string;
  data: T; // This can be an array or a single object
}

// Proper Query Params for searching and filtering
export interface DistrictsQueryParams {
  page?: number;
  limit?: number;
  search?: string;
  division_id?: string | number;
}