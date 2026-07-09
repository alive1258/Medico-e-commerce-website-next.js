// src/redux/api/orderApi.ts
import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

const ORDERS_URL = "/orders";

// ==========================================
// TYPE DEFINITIONS
// ==========================================

export enum PaymentMethod {
  COD = "COD",
  BKASH = "BKASH",
  NAGAD = "NAGAD",
  SSLCOMMERZ = "SSLCOMMERZ",
}

export interface IOrderItem {
  product_variant_id: string;
  product_name: string;
  sku: string;
  quantity: number;
  unit_price: number;
  total_price: number;
}

export interface IShippingAddress {
  address_line: string;
  phone?: string;
  email?: string;
}

export interface ICreateOrder {
  notes?: string;
  payment_method: PaymentMethod;
  items: IOrderItem[];
  shipping_address?: IShippingAddress;
}

export interface IUpdateOrder {
  order_status?: string;
  payment_status?: string;
  notes?: string;
  delivery_charge?: number;
  discount?: number;
}

export interface IOrder {
  id: string;
  order_number: string;
  user_id: string;
  address_id: string;
  subtotal: number;
  discount: number;
  delivery_charge: number;
  total_amount: number;
  payment_status: string;
  order_status: string;
  payment_method: string;
  notes?: string;
  placed_at: string;
  created_at: string;
  updated_at: string;
  items?: IOrderItem[];
  user?: {
    id: string;
    name: string;
    email: string;
  };
  address?: {
    id: string;
    address_line: string;
    city?: string;
    state?: string;
    country?: string;
    phone?: string;
  };
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

export interface IOrderFilterParams {
  page?: number;
  limit?: number;
  search?: string;
  order_status?: string;
  payment_status?: string;
  start_date?: string;
  end_date?: string;
  user_id?: string;
}

// ==========================================
// API ENDPOINTS
// ==========================================

export const orderApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // ===== CREATE ORDER =====
    createOrder: build.mutation<IApiResponse<IOrder>, ICreateOrder>({
      query: (data) => ({
        url: ORDERS_URL,
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.orders, tagTypes.orderItems],
    }),

    // ===== GET ALL ORDERS =====
    getAllOrders: build.query<
      IApiResponse<IOrder[]>,
      IOrderFilterParams | undefined
    >({
      query: (params) => ({
        url: ORDERS_URL,
        method: "GET",
        params,
      }),
      providesTags: [tagTypes.orders],
    }),

    // ===== GET SINGLE ORDER =====
    getSingleOrder: build.query<IApiResponse<IOrder>, string>({
      query: (id) => ({
        url: `${ORDERS_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.orders],
    }),

    // ===== UPDATE ORDER =====
    updateOrder: build.mutation<
      IApiResponse<IOrder>,
      { id: string; data: IUpdateOrder }
    >({
      query: ({ id, data }) => ({
        url: `${ORDERS_URL}/${id}`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: [tagTypes.orders, tagTypes.orderItems],
    }),

    // ===== DELETE ORDER =====
    deleteOrder: build.mutation<IApiResponse<IOrder>, string>({
      query: (id) => ({
        url: `${ORDERS_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.orders],
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useGetAllOrdersQuery,
  useGetSingleOrderQuery,
  useUpdateOrderMutation,
  useDeleteOrderMutation,
} = orderApi;
