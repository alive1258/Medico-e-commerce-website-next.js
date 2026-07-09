// src/redux/api/orderTrackingApi.ts
import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

const ORDER_TRACKING_URL = "/order-tracking";

// ==========================================
// TYPE DEFINITIONS
// ==========================================

export enum OrderStatusEnum {
  PENDING = "pending",
  CONFIRMED = "confirmed",
  PROCESSING = "processing",
  SHIPPED = "shipped",
  OUT_FOR_DELIVERY = "out_for_delivery",
  DELIVERED = "delivered",
  CANCELLED = "cancelled",
  RETURNED = "returned",
  REFUNDED = "refunded",
}

export interface IOrderTracking {
  id: string;
  order_id: string;
  status: OrderStatusEnum;
  note?: string;
  metadata?: any;
  changed_by?: string;
  user?: {
    id: string;
    name: string;
    email: string;
  };
  created_at: string;
}

export interface IOrderStatusUpdate {
  status: OrderStatusEnum;
  note?: string;
  metadata?: Record<string, any>;
}

export interface IBulkOrderStatusUpdate {
  order_ids: string[];
  status: OrderStatusEnum;
  note?: string;
  metadata?: Record<string, any>;
}

export interface IOrderTrackingDetail {
  order_id: string;
  current_status: OrderStatusEnum;
  tracking_history: IOrderTracking[];
}

export interface IOrderStatusStat {
  status: OrderStatusEnum;
  count: number;
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
// QUERY PARAMS INTERFACE
// ==========================================

export interface IOrderTrackingFilter {
  page?: number;
  limit?: number;
  order_id?: string;
  status?: OrderStatusEnum;
  start_date?: string;
  end_date?: string;
}

// ==========================================
// API ENDPOINTS
// ==========================================

export const orderTrackingApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // ===== UPDATE ORDER STATUS =====
    updateOrderStatus: build.mutation<
      IApiResponse<IOrderTracking>,
      { orderId: string; data: IOrderStatusUpdate }
    >({
      query: ({ orderId, data }) => ({
        url: `${ORDER_TRACKING_URL}/${orderId}/status`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: [tagTypes.orderTracking, tagTypes.orders],
    }),

    // ===== BULK UPDATE ORDER STATUS =====
    bulkUpdateOrderStatus: build.mutation<
      IApiResponse<IOrderTracking[]>,
      IBulkOrderStatusUpdate
    >({
      query: (data) => ({
        url: `${ORDER_TRACKING_URL}/bulk-status`,
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.orderTracking, tagTypes.orders],
    }),

    // ===== GET ORDER TRACKING DETAIL =====
    getOrderTrackingDetail: build.query<
      IApiResponse<IOrderTrackingDetail>,
      string
    >({
      query: (orderId) => ({
        url: `${ORDER_TRACKING_URL}/${orderId}`,
        method: "GET",
      }),
      providesTags: [tagTypes.orderTracking],
    }),

    // ===== GET ORDER TRACKING HISTORY =====
    getOrderTrackingHistory: build.query<
      IApiResponse<IOrderTracking[]>,
      IOrderTrackingFilter | undefined
    >({
      query: (params) => ({
        url: ORDER_TRACKING_URL,
        method: "GET",
        params,
      }),
      providesTags: [tagTypes.orderTracking],
    }),

    // ===== GET ORDER STATUS TIMELINE =====
    getOrderStatusTimeline: build.query<IApiResponse<IOrderTracking[]>, string>(
      {
        query: (orderId) => ({
          url: `${ORDER_TRACKING_URL}/${orderId}/timeline`,
          method: "GET",
        }),
        providesTags: [tagTypes.orderTracking],
      },
    ),

    // ===== GET ORDER STATUS STATISTICS =====
    getOrderStatusStats: build.query<IApiResponse<IOrderStatusStat[]>, void>({
      query: () => ({
        url: `${ORDER_TRACKING_URL}/stats/status`,
        method: "GET",
      }),
      providesTags: [tagTypes.orderTracking],
    }),
  }),
});

export const {
  useUpdateOrderStatusMutation,
  useBulkUpdateOrderStatusMutation,
  useGetOrderTrackingDetailQuery,
  useGetOrderTrackingHistoryQuery,
  useGetOrderStatusTimelineQuery,
  useGetOrderStatusStatsQuery,
} = orderTrackingApi;
