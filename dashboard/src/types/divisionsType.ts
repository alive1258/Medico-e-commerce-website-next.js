export interface Division {
  id: string;
  name: string;
  created_at?: string;
  updated_at?: string;
}

export interface DivisionQueryParams {
  page?: number;
  limit?: number;
  search?: string;
}

