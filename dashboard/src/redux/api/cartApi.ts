// src/redux/api/cartApi.ts
import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

const CARTS_URL = "/carts";

// ==========================================
// TYPE DEFINITIONS
// ==========================================

export interface ICart {
  id: string;
  user_id: string;
  user?: {
    id: string;
    name?: string;
    email?: string;
  };
  created_at: string;
  updated_at: string;
}

export interface ICartItem {
  id: string;
  cart_id: string;
  product_variant_id: string;
  quantity: number;
  price: number;
  total: number;
  product_variant?: {
    id: string;
    strength: string;
    pack_size: string;
    sku: string;
    price: number;
    discount_price?: number;
    product?: {
      id: string;
      name: string;
      slug: string;
      thumbnail?: string;
    };
  };
  created_at: string;
  updated_at: string;
}

export interface ICartWithItems extends ICart {
  cartItems: ICartItem[];
  subtotal: number;
  discount: number;
  total: number;
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

export const cartApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // ===== CREATE CART =====
    createCart: build.mutation<IApiResponse<ICart>, { user_id: string }>({
      query: (data) => ({
        url: CARTS_URL,
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.carts],
    }),

    // ===== GET ALL CARTS =====
    getAllCarts: build.query<
      IApiResponse<ICart[]>,
      Record<string, unknown> | undefined
    >({
      query: (arg) => ({
        url: CARTS_URL,
        method: "GET",
        params: arg,
      }),
      providesTags: [tagTypes.carts],
    }),

    // ===== GET SINGLE CART =====
    getSingleCart: build.query<IApiResponse<ICartWithItems>, string>({
      query: (id) => ({
        url: `${CARTS_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.carts],
    }),

    // ===== GET CART BY USER =====
    getCartByUser: build.query<IApiResponse<ICartWithItems>, string>({
      query: (userId) => ({
        url: `${CARTS_URL}/user/${userId}`,
        method: "GET",
      }),
      providesTags: [tagTypes.carts],
    }),

    // ===== UPDATE CART =====
    updateCart: build.mutation<
      IApiResponse<ICart>,
      { id: string; data: Partial<ICart> }
    >({
      query: ({ id, data }) => ({
        url: `${CARTS_URL}/${id}`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: [tagTypes.carts],
    }),

    // ===== DELETE CART =====
    deleteCart: build.mutation<IApiResponse<ICart>, string>({
      query: (id) => ({
        url: `${CARTS_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.carts],
    }),

    // ===== CLEAR CART =====
    clearCart: build.mutation<IApiResponse<ICart>, string>({
      query: (id) => ({
        url: `${CARTS_URL}/${id}/clear`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.carts],
    }),
  }),
});

export const {
  useCreateCartMutation,
  useGetAllCartsQuery,
  useGetSingleCartQuery,
  useGetCartByUserQuery,
  useUpdateCartMutation,
  useDeleteCartMutation,
  useClearCartMutation,
} = cartApi;
