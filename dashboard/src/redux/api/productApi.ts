/* eslint-disable @typescript-eslint/no-explicit-any */
// src/redux/api/productApi.ts
import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

const PRODUCTS_URL = "/products";

// ==========================================
// TYPE DEFINITIONS
// ==========================================

export interface IProduct {
  id: string;
  name: string;
  slug: string;
  thumbnail?: string;
  is_prescription_required: boolean;
  is_active: boolean;
  manufacturer?: string;
  meta_title?: string;
  meta_keywords?: string;
  meta_description?: string;
  category_id: string;
  generic_id: string;
  brand_id: string;
  added_by: string;
  category?: {
    id: string;
    name: string;
    slug: string;
  };
  generic?: {
    id: string;
    name: string;
  };
  brand?: {
    id: string;
    name: string;
  };
  addedBy?: {
    id: string;
    name?: string;
    email?: string;
    role?: string;
  };
  created_at: string;
  updated_at: string;
}

export interface IProductVariant {
  id: string;
  strength: string;
  pack_size: string;
  sku: string;
  price: number;
  discount_price: number;
  stock: number;
  weight: number;
  expiry_date: string;
  is_active: boolean;
}

export interface IProductWithVariants extends IProduct {
  variants: IProductVariant[];
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

export const productApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // ===== CREATE PRODUCT =====
    createProduct: build.mutation<IApiResponse<IProduct>, Partial<IProduct>>({
      query: (data) => ({
        url: `${PRODUCTS_URL}`,
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.products],
    }),

    // ===== GET ALL PRODUCTS =====
    getAllProducts: build.query<
      IApiResponse<IProduct[]>,
      Record<string, unknown> | undefined
    >({
      query: (arg) => ({
        url: PRODUCTS_URL,
        method: "GET",
        params: arg,
      }),
      providesTags: [tagTypes.products],
    }),

    // ===== GET PRODUCTS BY CATEGORY =====
    getProductsByCategory: build.query<
      IApiResponse<IProduct[]>,
      { categoryId: string; params?: Record<string, unknown> }
    >({
      query: ({ categoryId, params }) => ({
        url: `${PRODUCTS_URL}/category/${categoryId}`,
        method: "GET",
        params: params,
      }),
      providesTags: [tagTypes.products],
    }),

    // ===== GET PRODUCTS BY CATEGORY NAME =====
    getProductsByCategoryName: build.query<
      IApiResponse<IProduct[]>,
      { name: string; params?: Record<string, unknown> }
    >({
      query: ({ name, params }) => ({
        url: `${PRODUCTS_URL}/category-name/${name}`,
        method: "GET",
        params: params,
      }),
      providesTags: [tagTypes.products],
    }),

    // ===== GET SINGLE PRODUCT BY SLUG =====
    getProductBySlug: build.query<IApiResponse<IProductWithVariants>, string>({
      query: (slug) => ({
        url: `${PRODUCTS_URL}/slug/${slug}`,
        method: "GET",
      }),
      providesTags: [tagTypes.products],
    }),

    // ===== GET SINGLE PRODUCT BY ID =====
    getSingleProduct: build.query<IApiResponse<IProductWithVariants>, string>({
      query: (id) => ({
        url: `${PRODUCTS_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.products],
    }),

    // ===== UPDATE PRODUCT =====
    updateProduct: build.mutation<
      IApiResponse<IProduct>,
      { id: string; data: Partial<IProduct> }
    >({
      query: ({ id, data }) => ({
        url: `${PRODUCTS_URL}/${id}`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: [tagTypes.products],
    }),

    // ===== DELETE PRODUCT =====
    deleteProduct: build.mutation<IApiResponse<IProduct>, string>({
      query: (id) => ({
        url: `${PRODUCTS_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.products],
    }),

    // ===== SEARCH PRODUCTS =====
    searchProducts: build.query<
      IApiResponse<IProduct[]>,
      Record<string, unknown>
    >({
      query: (params) => ({
        url: `${PRODUCTS_URL}/search`,
        method: "GET",
        params,
      }),
      providesTags: [tagTypes.products],
    }),

    // ===== GET FILTER OPTIONS =====
    getFilterOptions: build.query<IApiResponse<any>, void>({
      query: () => ({
        url: `${PRODUCTS_URL}/filters`,
        method: "GET",
      }),
      providesTags: [tagTypes.products],
    }),

    // ===== AUTOCOMPLETE =====
    getAutocomplete: build.query<
      IApiResponse<string[]>,
      { search: string; limit?: number }
    >({
      query: ({ search, limit = 10 }) => ({
        url: `${PRODUCTS_URL}/autocomplete`,
        method: "GET",
        params: { search, limit },
      }),
      providesTags: [tagTypes.products],
    }),

    // ===== GET SIMILAR PRODUCTS =====
    getSimilarProducts: build.query<
      IApiResponse<IProduct[]>,
      { id: string; limit?: number }
    >({
      query: ({ id, limit = 10 }) => ({
        url: `${PRODUCTS_URL}/${id}/similar`,
        method: "GET",
        params: { limit },
      }),
      providesTags: [tagTypes.products],
    }),
  }),
});

export const {
  useCreateProductMutation,
  useGetAllProductsQuery,
  useGetProductsByCategoryQuery,
  useGetProductsByCategoryNameQuery,
  useGetProductBySlugQuery,
  useGetSingleProductQuery,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useSearchProductsQuery,
  useGetFilterOptionsQuery,
  useGetAutocompleteQuery,
  useGetSimilarProductsQuery,
} = productApi;
