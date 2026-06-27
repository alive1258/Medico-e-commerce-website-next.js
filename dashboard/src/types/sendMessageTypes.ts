export interface SendMessage {
  id: string;
  name: string;
  email: string;
  phone?: string; // Added based on your console log
  description: string;
  created_at: string;
  updated_at: string;
  deleted_at?: string | null;
}

// ✅ Add this to handle single item responses
export interface SendMessageSingleResponse {
  success: boolean;
  message: string;
  status: number;
  data: SendMessage; // This is the actual SendMessage object
  links?: {
    get: string;
    update: string;
    delete: string;
  };
}

export interface SendMessagePaginatedResponse {
  data: SendMessage[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}