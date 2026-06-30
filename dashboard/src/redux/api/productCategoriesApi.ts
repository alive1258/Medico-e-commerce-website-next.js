import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

const PRODUCT_CATEGORY_URL = "/product-categories";

// ==========================================
// TYPE DEFINITIONS
// ==========================================

export interface IProductCategory {
  id: string;
  name: string;
  image: string;
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

export const productCategoryApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createProductCategory: build.mutation<
      IApiResponse<IProductCategory>,
      Partial<IProductCategory>
    >({
      query: (data) => ({
        url: `${PRODUCT_CATEGORY_URL}`,
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.product_categories],
    }),

    getAllProductCategories: build.query<
      IApiResponse<IProductCategory[]>,
      Record<string, unknown> | undefined
    >({
      query: (arg) => ({
        url: PRODUCT_CATEGORY_URL,
        method: "GET",
        params: arg,
      }),
      providesTags: [tagTypes.product_categories],
    }),

    getSingleProductCategory: build.query<
      IApiResponse<IProductCategory>,
      string
    >({
      query: (id) => ({
        url: `${PRODUCT_CATEGORY_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.product_categories],
    }),

    updateProductCategory: build.mutation<
      IApiResponse<IProductCategory>,
      { id: string; data: Partial<IProductCategory> }
    >({
      query: ({ id, data }) => ({
        url: `${PRODUCT_CATEGORY_URL}/${id}`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: [tagTypes.product_categories],
    }),

    deleteProductCategory: build.mutation<
      IApiResponse<IProductCategory>,
      string
    >({
      query: (id) => ({
        url: `${PRODUCT_CATEGORY_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.product_categories],
    }),
  }),
});

export const {
  useCreateProductCategoryMutation,
  useGetAllProductCategoriesQuery,
  useGetSingleProductCategoryQuery,
  useUpdateProductCategoryMutation,
  useDeleteProductCategoryMutation,
} = productCategoryApi;
