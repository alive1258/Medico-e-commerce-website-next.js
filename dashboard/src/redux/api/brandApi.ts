// src/redux/api/brandApi.ts
import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

const BRANDS_URL = "/brands";

// ==========================================
// TYPE DEFINITIONS
// ==========================================

export interface IBrand {
  id: string;
  name: string;
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

export const brandApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // ===== CREATE BRAND =====
    createBrand: build.mutation<IApiResponse<IBrand>, { name: string }>({
      query: (data) => ({
        url: BRANDS_URL,
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.brands],
    }),

    // ===== GET ALL BRANDS =====
    getAllBrands: build.query<
      IApiResponse<IBrand[]>,
      Record<string, unknown> | undefined
    >({
      query: (arg) => ({
        url: BRANDS_URL,
        method: "GET",
        params: arg,
      }),
      providesTags: [tagTypes.brands],
    }),

    // ===== GET SINGLE BRAND =====
    getSingleBrand: build.query<IApiResponse<IBrand>, string>({
      query: (id) => ({
        url: `${BRANDS_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.brands],
    }),

    // ===== UPDATE BRAND =====
    updateBrand: build.mutation<
      IApiResponse<IBrand>,
      { id: string; data: { name: string } }
    >({
      query: ({ id, data }) => ({
        url: `${BRANDS_URL}/${id}`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: [tagTypes.brands],
    }),

    // ===== DELETE BRAND =====
    deleteBrand: build.mutation<IApiResponse<IBrand>, string>({
      query: (id) => ({
        url: `${BRANDS_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.brands],
    }),
  }),
});

export const {
  useCreateBrandMutation,
  useGetAllBrandsQuery,
  useGetSingleBrandQuery,
  useUpdateBrandMutation,
  useDeleteBrandMutation,
} = brandApi;
