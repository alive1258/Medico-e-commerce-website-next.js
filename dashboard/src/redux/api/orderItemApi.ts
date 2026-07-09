// src/redux/api/orderItemApi.ts
import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

const ORDER_ITEMS_URL = "/order-items";

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
  order_id?: string;
  created_at?: string;
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

export interface ICreateOrderItem {
  product_variant_id: string;
  product_name: string;
  sku: string;
  quantity: number;
  unit_price: number;
  total_price: number;
}

export interface IUpdateOrderItem extends Partial<ICreateOrderItem> {}

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

export interface IGetOrderItemsParams {
  page?: number;
  limit?: number;
  search?: string;
  order_id?: string;
  product_variant_id?: string;
}

// ==========================================
// API ENDPOINTS
// ==========================================

export const orderItemApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // ===== GET ALL ORDER ITEMS =====
    getAllOrderItems: build.query<
      IApiResponse<IOrderItem[]>,
      IGetOrderItemsParams | undefined
    >({
      query: (params) => ({
        url: ORDER_ITEMS_URL,
        method: "GET",
        params,
      }),
      providesTags: [tagTypes.orderItems],
    }),

    // ===== GET SINGLE ORDER ITEM =====
    getSingleOrderItem: build.query<IApiResponse<IOrderItem>, string>({
      query: (id) => ({
        url: `${ORDER_ITEMS_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.orderItems],
    }),

    // ===== CREATE ORDER ITEM =====
    createOrderItem: build.mutation<IApiResponse<IOrderItem>, ICreateOrderItem>(
      {
        query: (data) => ({
          url: ORDER_ITEMS_URL,
          method: "POST",
          data,
        }),
        invalidatesTags: [tagTypes.orderItems, tagTypes.orders],
      },
    ),

    // ===== UPDATE ORDER ITEM =====
    updateOrderItem: build.mutation<
      IApiResponse<IOrderItem>,
      { id: string; data: IUpdateOrderItem }
    >({
      query: ({ id, data }) => ({
        url: `${ORDER_ITEMS_URL}/${id}`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: [tagTypes.orderItems, tagTypes.orders],
    }),

    // ===== DELETE ORDER ITEM =====
    deleteOrderItem: build.mutation<IApiResponse<IOrderItem>, string>({
      query: (id) => ({
        url: `${ORDER_ITEMS_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.orderItems, tagTypes.orders],
    }),
  }),
});

export const {
  useGetAllOrderItemsQuery,
  useGetSingleOrderItemQuery,
  useCreateOrderItemMutation,
  useUpdateOrderItemMutation,
  useDeleteOrderItemMutation,
} = orderItemApi;
