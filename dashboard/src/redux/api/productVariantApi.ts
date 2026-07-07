// src/redux/api/productVariantApi.ts
import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

const PRODUCT_VARIANTS_URL = "/product-variants";

// ==========================================
// TYPE DEFINITIONS
// ==========================================

export interface IProductVariant {
  id: string;
  product_id: string;
  strength: string;
  pack_size: string;
  sku: string;
  price: number;
  discount_price?: number;
  stock: number;
  weight?: number;
  expiry_date?: string;
  is_active: boolean;
  product?: {
    id: string;
    name: string;
    slug: string;
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

export const productVariantApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // ===== CREATE PRODUCT VARIANT =====
    createProductVariant: build.mutation<
      IApiResponse<IProductVariant>,
      Partial<IProductVariant>
    >({
      query: (data) => ({
        url: `${PRODUCT_VARIANTS_URL}`,
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.variants],
    }),

    // ===== GET ALL PRODUCT VARIANTS =====
    getAllProductVariants: build.query<
      IApiResponse<IProductVariant[]>,
      Record<string, unknown> | undefined
    >({
      query: (arg) => ({
        url: PRODUCT_VARIANTS_URL,
        method: "GET",
        params: arg,
      }),
      providesTags: [tagTypes.variants],
    }),

    // ===== GET SINGLE PRODUCT VARIANT =====
    getSingleProductVariant: build.query<IApiResponse<IProductVariant>, string>(
      {
        query: (id) => ({
          url: `${PRODUCT_VARIANTS_URL}/${id}`,
          method: "GET",
        }),
        providesTags: [tagTypes.variants],
      },
    ),

    // ===== UPDATE PRODUCT VARIANT =====
    updateProductVariant: build.mutation<
      IApiResponse<IProductVariant>,
      { id: string; data: Partial<IProductVariant> }
    >({
      query: ({ id, data }) => ({
        url: `${PRODUCT_VARIANTS_URL}/${id}`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: [tagTypes.variants],
    }),

    // ===== DELETE PRODUCT VARIANT =====
    deleteProductVariant: build.mutation<IApiResponse<IProductVariant>, string>(
      {
        query: (id) => ({
          url: `${PRODUCT_VARIANTS_URL}/${id}`,
          method: "DELETE",
        }),
        invalidatesTags: [tagTypes.variants],
      },
    ),
  }),
});

export const {
  useCreateProductVariantMutation,
  useGetAllProductVariantsQuery,
  useGetSingleProductVariantQuery,
  useUpdateProductVariantMutation,
  useDeleteProductVariantMutation,
} = productVariantApi;
