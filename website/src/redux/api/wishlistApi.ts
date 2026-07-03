// src/redux/api/wishlistApi.ts
import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

const WISHLIST_URL = "/wishlists";

export interface IWishlistItem {
  id: string;
  user_id: string;
  product_id: string;
  product: {
    id: string;
    name: string;
    price: number;
    images?: string[];
    slug?: string;
  };
  created_at: string;
  updated_at: string;
}

export interface ICreateWishlistDto {
  product_id: string;
}

export interface IUpdateWishlistDto {
  product_id?: string;
}

export interface IApiResponse<T> {
  apiVersion: string;
  success: boolean;
  message: string;
  status: number;
  data: T;
  meta?: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export const wishlistApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // Get My Wishlist
    getMyWishlist: build.query<IApiResponse<IWishlistItem[]>, void>({
      query: () => ({
        url: `${WISHLIST_URL}/my-wishlist`,
        method: "GET",
      }),
      providesTags: [tagTypes.wishlists],
    }),

    // Get All Wishlists (Admin)
    getAllWishlists: build.query<
      IApiResponse<IWishlistItem[]>,
      { page?: number; limit?: number } | void
    >({
      query: (params) => ({
        url: WISHLIST_URL,
        method: "GET",
        params: params || {},
      }),
      providesTags: [tagTypes.wishlists],
    }),

    // Get Single Wishlist Item
    getWishlistById: build.query<IApiResponse<IWishlistItem>, string>({
      query: (id) => ({
        url: `${WISHLIST_URL}/${id}`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: tagTypes.wishlists, id }],
    }),

    // Add to Wishlist
    addToWishlist: build.mutation<
      IApiResponse<IWishlistItem>,
      ICreateWishlistDto
    >({
      query: (data) => ({
        url: `${WISHLIST_URL}/create`,
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.wishlists],
    }),

    // Update Wishlist
    updateWishlist: build.mutation<
      IApiResponse<IWishlistItem>,
      { id: string; data: IUpdateWishlistDto }
    >({
      query: ({ id, data }) => ({
        url: `${WISHLIST_URL}/${id}`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: tagTypes.wishlists, id },
        tagTypes.wishlists,
      ],
    }),

    // Remove from Wishlist
    removeFromWishlist: build.mutation<IApiResponse<void>, string>({
      query: (id) => ({
        url: `${WISHLIST_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.wishlists],
    }),
  }),
});

// Export hooks
export const {
  useGetMyWishlistQuery,
  useGetAllWishlistsQuery,
  useGetWishlistByIdQuery,
  useAddToWishlistMutation,
  useUpdateWishlistMutation,
  useRemoveFromWishlistMutation,
} = wishlistApi;
