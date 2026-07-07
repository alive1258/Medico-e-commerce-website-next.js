/* eslint-disable @typescript-eslint/no-explicit-any */
// src/redux/api/couponUsageApi.ts
import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

const COUPON_USAGES_URL = "/coupon-usages";

// ==========================================
// TYPE DEFINITIONS
// ==========================================

export interface ICouponUsage {
  id: string;
  coupon_id: string;
  user_id: string;
  order_id: string;
  discount_amount: number;
  order_total: number;
  metadata?: any;
  used_at: string;
  coupon?: {
    id: string;
    code: string;
    discount_type: string;
    discount_value: number;
  };
  user?: {
    id: string;
    name: string;
    email: string;
  };
  order?: {
    id: string;
    order_number: string;
    total: number;
  };
}

export interface ICouponUsageStats {
  total_uses: number;
  total_users: number;
  total_discount: number;
  average_discount: number;
  last_7_days: number;
  last_30_days: number;
  daily_usage: {
    date: string;
    count: number;
    total_discount: number;
  }[];
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

export const couponUsageApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // ===== GET ALL COUPON USAGES (Admin only) =====
    getAllCouponUsages: build.query<
      IApiResponse<ICouponUsage[]>,
      Record<string, unknown> | undefined
    >({
      query: (params) => ({
        url: COUPON_USAGES_URL,
        method: "GET",
        params,
      }),
      providesTags: [tagTypes.couponUsages],
    }),

    // ===== GET USER COUPON USAGE HISTORY =====
    getUserCouponUsageHistory: build.query<
      IApiResponse<ICouponUsage[]>,
      { userId: string; params?: Record<string, unknown> }
    >({
      query: ({ userId, params }) => ({
        url: `${COUPON_USAGES_URL}/user/${userId}`,
        method: "GET",
        params,
      }),
      providesTags: [tagTypes.couponUsages],
    }),

    // ===== GET COUPON USAGE STATS (Admin only) =====
    getCouponUsageStats: build.query<IApiResponse<ICouponUsageStats>, string>({
      query: (couponId) => ({
        url: `${COUPON_USAGES_URL}/stats/coupon/${couponId}`,
        method: "GET",
      }),
      providesTags: [tagTypes.couponUsages],
    }),

    // ===== GET COUPON USAGE BY ORDER =====
    getCouponUsageByOrder: build.query<IApiResponse<ICouponUsage>, string>({
      query: (orderId) => ({
        url: `${COUPON_USAGES_URL}/order/${orderId}`,
        method: "GET",
      }),
      providesTags: [tagTypes.couponUsages],
    }),

    // ===== GET SINGLE COUPON USAGE =====
    getSingleCouponUsage: build.query<IApiResponse<ICouponUsage>, string>({
      query: (id) => ({
        url: `${COUPON_USAGES_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.couponUsages],
    }),
  }),
});

export const {
  useGetAllCouponUsagesQuery,
  useGetUserCouponUsageHistoryQuery,
  useGetCouponUsageStatsQuery,
  useGetCouponUsageByOrderQuery,
  useGetSingleCouponUsageQuery,
} = couponUsageApi;
