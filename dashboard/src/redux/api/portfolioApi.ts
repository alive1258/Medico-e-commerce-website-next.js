import type { ApiResponse } from "../../types/axios";
import type { PaginationQuery } from "../../types/category.types";
import { baseApi } from "./baseApi";
import { tagTypes } from "../tag-types";
import type { Portfolio, PortfolioPaginatedResponse, UpdatePortfolioRequest } from "../../types/portfolio.types";


const PORTFOLIO_URL = "/portfolio";

export const portfolioApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // ✅ CREATE
    createPortfolio: builder.mutation<ApiResponse<Portfolio>, FormData>({
      query: (formData) => ({
        url: `${PORTFOLIO_URL}/create`,
        method: "POST",
        data: formData,
        contentType: true,
      }),
      invalidatesTags: [tagTypes.portfolio],
    }),

    // ✅ GET ALL (PAGINATION)
    getAllPortfolios: builder.query<
      PortfolioPaginatedResponse,
      PaginationQuery
    >({
      query: (params) => ({
        url: PORTFOLIO_URL,
        method: "GET",
        params,
      }),
      providesTags: [tagTypes.portfolio],
    }),

    // ✅ GET SINGLE
    getSinglePortfolio: builder.query<ApiResponse<Portfolio>, string>({
      query: (id) => ({
        url: `${PORTFOLIO_URL}/id/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.portfolio],
    }),

        getSinglePortfolioBySlug: builder.query<ApiResponse<Portfolio>, string>({
          query: (slug) => ({
           url: `${PORTFOLIO_URL}/slug/${slug}`,
            method: "GET",
          }),
          providesTags: [tagTypes.portfolio],
        }),

    // ✅ UPDATE
    updatePortfolio: builder.mutation<
      ApiResponse<Portfolio>,
      UpdatePortfolioRequest
    >({
      query: ({ id, data }) => ({
        url: `${PORTFOLIO_URL}/${id}`,
        method: "PATCH",
        data,
        contentType: true,
      }),
      invalidatesTags: [tagTypes.portfolio],
    }),

    // ✅ DELETE
    deletePortfolio: builder.mutation<ApiResponse<void>, string>({
      query: (id) => ({
        url: `${PORTFOLIO_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.portfolio],
    }),
  }),
});

export const {
  useCreatePortfolioMutation,
  useGetAllPortfoliosQuery,
  useGetSinglePortfolioQuery,
  useGetSinglePortfolioBySlugQuery,
  useUpdatePortfolioMutation,
  useDeletePortfolioMutation,
} = portfolioApi;