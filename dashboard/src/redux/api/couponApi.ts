// src/redux/api/couponApi.ts
import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

const COUPONS_URL = "/coupons";

// ==========================================
// TYPE DEFINITIONS
// ==========================================

export enum DiscountType {
  PERCENTAGE = "percentage",
  FIXED = "fixed",
}

export interface ICoupon {
  id: string;
  code: string;
  discount_type: DiscountType;
  discount_value: number;
  minimum_order_amount?: number;
  maximum_discount_amount?: number;
  start_date?: string;
  end_date?: string;
  usage_limit: number;
  used_count: number;
  per_user_limit: number;
  is_active: boolean;
  description?: string;
  applicable_products?: string[];
  applicable_categories?: string[];
  excluded_products?: string[];
  excluded_categories?: string[];
  is_first_order_only: boolean;
  is_combinable: boolean;
  added_by: string;
  addedBy?: {
    id: string;
    name?: string;
    email?: string;
    role?: string;
  };
  created_at: string;
  updated_at: string;
  remaining_uses?: number;
  is_expired?: boolean;
  is_valid?: boolean;
}

export interface ICouponUsage {
  id: string;
  coupon_id: string;
  user_id: string;
  order_id: string;
  discount_amount: number;
  order_total: number;
  used_at: string;
  coupon?: ICoupon;
  order?: any;
}

export interface ICouponStats {
  total_uses: number;
  unique_users: number;
  total_discount_amount: number;
  average_discount: number;
  usage_by_date: {
    date: string;
    count: number;
    total_discount: number;
  }[];
}

export interface ICouponValidation {
  valid: boolean;
  coupon?: ICoupon;
  message?: string;
  discount_amount?: number;
  final_total?: number;
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

export const couponApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // ===== CREATE COUPON =====
    createCoupon: build.mutation<IApiResponse<ICoupon>, Partial<ICoupon>>({
      query: (data) => ({
        url: COUPONS_URL,
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.coupons],
    }),

    // ===== GET ALL COUPONS =====
    getAllCoupons: build.query<
      IApiResponse<ICoupon[]>,
      Record<string, unknown> | undefined
    >({
      query: (params) => ({
        url: COUPONS_URL,
        method: "GET",
        params,
      }),
      providesTags: [tagTypes.coupons],
    }),

    // ===== GET ACTIVE COUPONS =====
    getActiveCoupons: build.query<
      IApiResponse<ICoupon[]>,
      Record<string, unknown> | undefined
    >({
      query: (params) => ({
        url: `${COUPONS_URL}/active`,
        method: "GET",
        params,
      }),
      providesTags: [tagTypes.coupons],
    }),

    // ===== GET SINGLE COUPON =====
    getSingleCoupon: build.query<IApiResponse<ICoupon>, string>({
      query: (id) => ({
        url: `${COUPONS_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.coupons],
    }),

    // ===== GET COUPON BY CODE =====
    getCouponByCode: build.query<IApiResponse<ICoupon>, string>({
      query: (code) => ({
        url: `${COUPONS_URL}/code/${code}`,
        method: "GET",
      }),
      providesTags: [tagTypes.coupons],
    }),

    // ===== UPDATE COUPON =====
    updateCoupon: build.mutation<
      IApiResponse<ICoupon>,
      { id: string; data: Partial<ICoupon> }
    >({
      query: ({ id, data }) => ({
        url: `${COUPONS_URL}/${id}`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: [tagTypes.coupons],
    }),

    // ===== DELETE COUPON =====
    deleteCoupon: build.mutation<IApiResponse<ICoupon>, string>({
      query: (id) => ({
        url: `${COUPONS_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.coupons],
    }),

    // ===== VALIDATE COUPON =====
    validateCoupon: build.mutation<
      IApiResponse<ICouponValidation>,
      {
        code: string;
        order_total: number;
        user_id?: string;
        product_ids?: string[];
        is_first_order?: boolean;
      }
    >({
      query: (data) => ({
        url: `${COUPONS_URL}/validate`,
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.coupons],
    }),

    // ===== APPLY COUPON =====
    applyCoupon: build.mutation<
      IApiResponse<{
        success: boolean;
        message: string;
        coupon_usage?: ICouponUsage;
      }>,
      { code: string; order_id: string; order_total: number }
    >({
      query: (data) => ({
        url: `${COUPONS_URL}/apply`,
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.coupons, tagTypes.orders],
    }),

    // ===== GET COUPON STATS =====
    getCouponStats: build.query<IApiResponse<ICouponStats>, string>({
      query: (id) => ({
        url: `${COUPONS_URL}/${id}/stats`,
        method: "GET",
      }),
      providesTags: [tagTypes.coupons],
    }),

    // ===== GET USER COUPON HISTORY =====
    getUserCouponHistory: build.query<
      IApiResponse<ICouponUsage[]>,
      { userId: string; params?: Record<string, unknown> }
    >({
      query: ({ userId, params }) => ({
        url: `${COUPONS_URL}/user/${userId}/history`,
        method: "GET",
        params,
      }),
      providesTags: [tagTypes.coupons],
    }),
  }),
});

export const {
  useCreateCouponMutation,
  useGetAllCouponsQuery,
  useGetActiveCouponsQuery,
  useGetSingleCouponQuery,
  useGetCouponByCodeQuery,
  useUpdateCouponMutation,
  useDeleteCouponMutation,
  useValidateCouponMutation,
  useApplyCouponMutation,
  useGetCouponStatsQuery,
  useGetUserCouponHistoryQuery,
} = couponApi;
