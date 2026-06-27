// redux/api/portfolioCategoriesApi.ts
import type { ApiResponse } from "../../types/axios";
import type { PaginationQuery } from "../../types/category.types";
import type {
  CreatePortfolioCategoryRequest,
  PortfolioCategoriesPaginatedResponse,
  PortfolioCategory,
  UpdatePortfolioCategoryRequest,
} from "../../types/portfolioCategory.types";
import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

const PORTFOLIO_CATEGORIES_URL = "/portfolio-categories";

export const portfolioCategoriesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // ✅ CREATE PORTFOLIO CATEGORY
    createPortfolioCategory: builder.mutation<
      ApiResponse<PortfolioCategory>,
      CreatePortfolioCategoryRequest | FormData
    >({
      query: (formData) => ({
        url: `${PORTFOLIO_CATEGORIES_URL}/create`,
        method: "POST",
        data:formData,
       contentType: true,
      }),
      invalidatesTags: [tagTypes.portfolio_categories],
    }),

    // ✅ GET ALL PORTFOLIO CATEGORIES (with pagination/search)
    getAllPortfolioCategories: builder.query<
      PortfolioCategoriesPaginatedResponse,
      PaginationQuery
    >({
      query: (params) => ({
        url: PORTFOLIO_CATEGORIES_URL,
        method: "GET",
        params,
      }),
      providesTags: [tagTypes.portfolio_categories],
    }),

    // ✅ GET SINGLE PORTFOLIO CATEGORY
    getSinglePortfolioCategory: builder.query<
      ApiResponse<PortfolioCategory>,
      string // slug
    >({
      query: (slug) => ({
        url: `${PORTFOLIO_CATEGORIES_URL}/${slug}`,
        method: "GET",
      }),
      providesTags: [tagTypes.portfolio_categories],
    }),

    // ✅ UPDATE PORTFOLIO CATEGORY
    updatePortfolioCategory: builder.mutation<
      ApiResponse<PortfolioCategory>,
      UpdatePortfolioCategoryRequest
    >({
      query: ({ id, data }) => ({
        url: `${PORTFOLIO_CATEGORIES_URL}/${id}`,
        method: "PATCH",
        data,
         contentType: true,
      }),
      invalidatesTags: [tagTypes.portfolio_categories],
    }),

    // ✅ DELETE PORTFOLIO CATEGORY
    deletePortfolioCategory: builder.mutation<ApiResponse<void>, string>({
      query: (id) => ({
        url: `${PORTFOLIO_CATEGORIES_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.portfolio_categories],
    }),
  }),
});

// ✅ Export hooks for usage in components
export const {
  useCreatePortfolioCategoryMutation,
  useGetAllPortfolioCategoriesQuery,
  useGetSinglePortfolioCategoryQuery,
  useUpdatePortfolioCategoryMutation,
  useDeletePortfolioCategoryMutation,
} = portfolioCategoriesApi;