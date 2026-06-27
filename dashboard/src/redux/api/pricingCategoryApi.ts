import type { ApiResponse } from "../../types/axios";
import type {
  PricingCategory,
  CreatePricingCategoryRequest,
  UpdatePricingCategoryRequest,
  PricingCategoriesPaginatedResponse,
} from "../../types/pricingCategory.types";
import type { PaginationQuery } from "../../types/category.types";
import { baseApi } from "./baseApi";
import { tagTypes } from "../tag-types";

const PRICING_CATEGORY_URL = "/pricing-category";

export const pricingCategoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    //  CREATE
    createPricingCategory: builder.mutation<
      ApiResponse<PricingCategory>,
      CreatePricingCategoryRequest
    >({
      query: (data) => ({
        url: `${PRICING_CATEGORY_URL}/create`,
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.pricing_category],
    }),

    //  GET ALL (WITH PAGINATION)
    getAllPricingCategories: builder.query<
     PricingCategoriesPaginatedResponse,
      PaginationQuery
    >({
      query: (params) => ({
        url: PRICING_CATEGORY_URL,
        method: "GET",
        params: params ,
      }),
      providesTags: [tagTypes.pricing_category],
    }),

    //  GET SINGLE
    getSinglePricingCategory: builder.query<
      ApiResponse<PricingCategory>,
      string
    >({
      query: (id) => ({ 
      url: `${PRICING_CATEGORY_URL}/${id}`,
      method: "GET",
     }),
      providesTags: [tagTypes.pricing_category],
    }),

    //  UPDATE

    updatePricingCategory: builder.mutation<
      ApiResponse<PricingCategory>,
      UpdatePricingCategoryRequest
    >({
      query: ({ id, data }) => ({
        url: `${PRICING_CATEGORY_URL}/${id}`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: [tagTypes.pricing_category],
    }),

    //  DELETE (SOFT DELETE)
    deletePricingCategory: builder.mutation<ApiResponse<void>, string>({
      query: (id) => ({
        url: `${PRICING_CATEGORY_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.pricing_category],
    }),
  }),
});

export const {
  useCreatePricingCategoryMutation,
  useGetAllPricingCategoriesQuery,
  useGetSinglePricingCategoryQuery,
  useUpdatePricingCategoryMutation,
  useDeletePricingCategoryMutation,
} = pricingCategoryApi;
