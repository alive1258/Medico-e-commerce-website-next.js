// src/redux/api/paymentApi.ts
import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

const PAYMENTS_URL = "/payments";

// ==========================================
// TYPE DEFINITIONS
// ==========================================

export enum PaymentMethod {
  COD = "COD",
  BKASH = "BKASH",
  NAGAD = "NAGAD",
  ROCKET = "ROCKET",
  SSLCOMMERZ = "SSLCOMMERZ",
}

export enum PaymentStatus {
  PENDING = "pending",
  PAID = "paid",
  FAILED = "failed",
  REFUNDED = "refunded",
  CANCELLED = "cancelled",
}

export interface ICreatePayment {
  order_id: string;
  method: PaymentMethod;
  amount: number;
  transaction_id?: string;
}

export interface IUpdatePayment {
  status?: PaymentStatus;
  transaction_id?: string;
  failure_reason?: string;
}

export interface IPayment {
  id: string;
  order_id: string;
  method: PaymentMethod;
  amount: number;
  status: PaymentStatus;
  transaction_id?: string;
  val_id?: string;
  session_key?: string;
  paid_at?: string;
  failure_reason?: string;
  gateway_response?: string;
  callback_ip?: string;
  created_at: string;
  updated_at: string;
  order?: {
    id: string;
    order_number: string;
    total_amount: number;
    user?: {
      id: string;
      name: string;
      email: string;
    };
  };
}

export interface ISSLCommerzInitResponse {
  payment_url: string;
  payment_id: string;
  tran_id: string;
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

export interface IPaymentFilterParams {
  page?: number;
  limit?: number;
  order_id?: string;
  method?: PaymentMethod;
  status?: PaymentStatus;
  transaction_id?: string;
}

// ==========================================
// API ENDPOINTS
// ==========================================

export const paymentApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // ===== CREATE PAYMENT =====
    createPayment: build.mutation<
      IApiResponse<IPayment | ISSLCommerzInitResponse>,
      ICreatePayment
    >({
      query: (data) => ({
        url: PAYMENTS_URL,
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.payments, tagTypes.orders],
    }),

    // ===== GET ALL PAYMENTS =====
    getAllPayments: build.query<
      IApiResponse<IPayment[]>,
      IPaymentFilterParams | undefined
    >({
      query: (params) => ({
        url: PAYMENTS_URL,
        method: "GET",
        params,
      }),
      providesTags: [tagTypes.payments],
    }),

    // ===== GET SINGLE PAYMENT =====
    getSinglePayment: build.query<IApiResponse<IPayment>, string>({
      query: (id) => ({
        url: `${PAYMENTS_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.payments],
    }),

    // ===== UPDATE PAYMENT =====
    updatePayment: build.mutation<
      IApiResponse<IPayment>,
      { id: string; data: IUpdatePayment }
    >({
      query: ({ id, data }) => ({
        url: `${PAYMENTS_URL}/${id}`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: [tagTypes.payments, tagTypes.orders],
    }),

    // ===== DELETE PAYMENT =====
    deletePayment: build.mutation<IApiResponse<IPayment>, string>({
      query: (id) => ({
        url: `${PAYMENTS_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.payments],
    }),
  }),
});

export const {
  useCreatePaymentMutation,
  useGetAllPaymentsQuery,
  useGetSinglePaymentQuery,
  useUpdatePaymentMutation,
  useDeletePaymentMutation,
} = paymentApi;
