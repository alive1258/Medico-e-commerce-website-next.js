// src/redux/api/bannerApi.ts
import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

const BANNERS_URL = "/banners";

// ==========================================
// TYPE DEFINITIONS
// ==========================================

export interface IBanner {
  id: string;
  title: string;
  image_url: string;
  redirect_url?: string;
  position: number;
  is_active: boolean;
  added_by: string;
  addedBy?: {
    id: string;
    name: string;
    email: string;
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

// Filter DTO
export interface IBannerFilter {
  page?: number;
  limit?: number;
  search?: string;
  is_active?: boolean;
  sort_by?: string;
  sort_order?: "ASC" | "DESC";
}

// ==========================================
// API ENDPOINTS
// ==========================================

export const bannerApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // ===== CREATE BANNER =====
    createBanner: build.mutation<IApiResponse<IBanner>, Partial<IBanner>>({
      query: (data) => ({
        url: BANNERS_URL,
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.banners],
    }),

    // ===== GET ALL BANNERS =====
    getAllBanners: build.query<IApiResponse<IBanner[]>, IBannerFilter | void>({
      query: (params) => ({
        url: BANNERS_URL,
        method: "GET",
        params,
      }),
      providesTags: [tagTypes.banners],
    }),

    // ===== GET SINGLE BANNER =====
    getSingleBanner: build.query<IApiResponse<IBanner>, string>({
      query: (id) => ({
        url: `${BANNERS_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.banners],
    }),

    // ===== UPDATE BANNER =====
    updateBanner: build.mutation<
      IApiResponse<IBanner>,
      { id: string; data: Partial<IBanner> }
    >({
      query: ({ id, data }) => ({
        url: `${BANNERS_URL}/${id}`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: [tagTypes.banners],
    }),

    // ===== DELETE BANNER =====
    deleteBanner: build.mutation<IApiResponse<IBanner>, string>({
      query: (id) => ({
        url: `${BANNERS_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.banners],
    }),
  }),
});

export const {
  useCreateBannerMutation,
  useGetAllBannersQuery,
  useGetSingleBannerQuery,
  useUpdateBannerMutation,
  useDeleteBannerMutation,
} = bannerApi;
