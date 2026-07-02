// src/redux/api/orderApi.ts
import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

const ORDER_URL = "/orders";

// ==========================================
// TYPE DEFINITIONS
// ==========================================

export interface IOrderItem {
  id: string;
  product_variant_id: string;
  product_name: string;
  sku: string;
  quantity: number;
  unit_price: number;
  total_price: number;
  created_at: string;
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
  notes?: string;
  items: IOrderItem[];
  placed_at: string;
  created_at: string;
  updated_at: string;
}

export interface ICreateOrderItemDto {
  product_variant_id: string;
  product_name: string;
  sku: string;
  quantity: number;
  unit_price: number;
  total_price: number;
}

export interface ICreateOrderDto {
  address_id: string;
  payment_method: string;
  delivery_charge: number;
  coupon_code?: string;
  notes?: string;
  items: ICreateOrderItemDto[];
}

export interface IUpdateOrderDto {
  order_status?: string;
  payment_status?: string;
  notes?: string;
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
  apiVersion: string;
  success: boolean;
  message: string;
  status: number;
  meta?: IMeta;
  links?: ILinks;
  data: T;
}

// ==========================================
// API ENDPOINTS
// ==========================================

export const orderApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // Create Order
    createOrder: build.mutation<IApiResponse<IOrder>, ICreateOrderDto>({
      query: (data) => ({
        url: ORDER_URL,
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.orders],
    }),

    // Get All Orders (Admin sees all, User sees own)
    getAllOrders: build.query<
      IApiResponse<IOrder[]>,
      { page?: number; limit?: number; order_status?: string } | void
    >({
      query: (params) => ({
        url: ORDER_URL,
        method: "GET",
        params: params || {},
      }),
      providesTags: [tagTypes.orders],
    }),

    // Get Single Order by ID
    getOrderById: build.query<IApiResponse<IOrder>, string>({
      query: (id) => ({
        url: `${ORDER_URL}/${id}`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: tagTypes.orders, id }],
    }),

    // Get User's Orders
    getUserOrders: build.query<
      IApiResponse<IOrder[]>,
      { page?: number; limit?: number; order_status?: string } | void
    >({
      query: (params) => ({
        url: `${ORDER_URL}/user`,
        method: "GET",
        params: params || {},
      }),
      providesTags: [tagTypes.orders],
    }),

    // Update Order
    updateOrder: build.mutation<
      IApiResponse<IOrder>,
      { id: string; data: IUpdateOrderDto }
    >({
      query: ({ id, data }) => ({
        url: `${ORDER_URL}/${id}`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: tagTypes.orders, id },
        tagTypes.orders,
      ],
    }),

    // Cancel Order
    cancelOrder: build.mutation<IApiResponse<IOrder>, string>({
      query: (id) => ({
        url: `${ORDER_URL}/${id}/cancel`,
        method: "PUT",
      }),
      invalidatesTags: (result, error, id) => [
        { type: tagTypes.orders, id },
        tagTypes.orders,
      ],
    }),

    // Delete Order (Admin only)
    deleteOrder: build.mutation<IApiResponse<void>, string>({
      query: (id) => ({
        url: `${ORDER_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.orders],
    }),
  }),
});

// Export hooks
export const {
  useCreateOrderMutation,
  useGetAllOrdersQuery,
  useGetOrderByIdQuery,
  useGetUserOrdersQuery,
  useUpdateOrderMutation,
  useCancelOrderMutation,
  useDeleteOrderMutation,
} = orderApi;
