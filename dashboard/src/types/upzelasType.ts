export interface Upzela { // Using singular 'Upzela' for the object
  id: string | number;
  name: string;
  district_id?: string | number;
  district?: {
    id: number;
    name: string;
  };
  created_at?: string;
  updated_at?: string;
}

export interface UpzelasQueryParams {
  page?: number;
  limit?: number;
  search?: string;
  district_id?: string | number; // Added for filtering
}

// Ensure your ApiResponse is accessible here
export interface ApiResponse<T> {
  success: boolean;
  status: number;
  message: string;
  apiVersion: string;
  data: T;
}