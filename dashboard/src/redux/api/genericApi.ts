// src/redux/api/genericApi.ts
import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

const GENERICS_URL = "/generics";

// ==========================================
// TYPE DEFINITIONS
// ==========================================

export interface IGeneric {
  id: string;
  name: string;
  description?: string;
  addedBy?: {
    id: string;
    name?: string;
    email?: string;
    role?: string;
  };
  created_at: string;
  updated_at: string;
}

export interface IMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface ILinks {
  first: string;
  last: string;
  current: string;
  next: string;
  previous: string;
}

// Global API Wrapper Type Definition matching your backend structure
export interface IApiResponse<T> {
  apiVersion?: string;
  success: boolean;
  message: string;
  status?: number;
  meta?: IMeta;
  links?: ILinks;
  data: T;
}

// ==========================================
// API ENDPOINTS
// ==========================================

export const genericApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // ===== CREATE GENERIC =====
    createGeneric: build.mutation<
      IApiResponse<IGeneric>,
      { name: string; description?: string }
    >({
      query: (data) => ({
        url: GENERICS_URL,
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.generics],
    }),

    // ===== GET ALL GENERICS =====
    getAllGenerics: build.query<
      IApiResponse<IGeneric[]>,
      Record<string, unknown> | undefined
    >({
      query: (arg) => ({
        url: GENERICS_URL,
        method: "GET",
        params: arg,
      }),
      providesTags: [tagTypes.generics],
    }),

    // ===== GET SINGLE GENERIC =====
    getSingleGeneric: build.query<IApiResponse<IGeneric>, string>({
      query: (id) => ({
        url: `${GENERICS_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.generics],
    }),

    // ===== UPDATE GENERIC =====
    updateGeneric: build.mutation<
      IApiResponse<IGeneric>,
      { id: string; data: { name: string; description?: string } }
    >({
      query: ({ id, data }) => ({
        url: `${GENERICS_URL}/${id}`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: [tagTypes.generics],
    }),

    // ===== DELETE GENERIC =====
    deleteGeneric: build.mutation<IApiResponse<IGeneric>, string>({
      query: (id) => ({
        url: `${GENERICS_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.generics],
    }),
  }),
});

export const {
  useCreateGenericMutation,
  useGetAllGenericsQuery,
  useGetSingleGenericQuery,
  useUpdateGenericMutation,
  useDeleteGenericMutation,
} = genericApi;
