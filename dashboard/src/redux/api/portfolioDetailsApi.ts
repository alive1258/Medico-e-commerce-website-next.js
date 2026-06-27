import type { ApiResponse } from "../../types/axios";
import type { PaginationQuery } from "../../types/category.types";
import { baseApi } from "./baseApi";
import { tagTypes } from "../tag-types";
import type { PortfolioDetail, PortfolioDetailPaginatedResponse, UpdatePortfolioDetailRequest } from "../../types/portfolioDetail.types";

const PORTFOLIO_DETAILS_URL = "/portfolio-details";

export const portfolioDetailsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // ✅ CREATE
    createPortfolioDetails: builder.mutation<ApiResponse<PortfolioDetail>, FormData>({
      query: (formData) => ({
        url: `${PORTFOLIO_DETAILS_URL}/create`,
        method: "POST",
        data: formData,
        contentType: true,
      }),
      invalidatesTags: [tagTypes.portfolio_details],
    }),

    // ✅ GET ALL (PAGINATION)
    getAllPortfolioDetails: builder.query<PortfolioDetailPaginatedResponse, PaginationQuery>({
      query: (params) => ({
        url: PORTFOLIO_DETAILS_URL,
        method: "GET",
        params,
      }),
      providesTags: [tagTypes.portfolio_details],
    }),

    // ✅ GET SINGLE
    getSinglePortfolioDetails: builder.query<ApiResponse<PortfolioDetail>, string>({
      query: (id) => ({
        url: `${PORTFOLIO_DETAILS_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.portfolio_details],
    }),

    // ✅ UPDATE
    updatePortfolioDetails: builder.mutation<ApiResponse<PortfolioDetail>, UpdatePortfolioDetailRequest>({
      query: ({ id, data }) => ({
        url: `${PORTFOLIO_DETAILS_URL}/${id}`,
        method: "PATCH",
        data,
        contentType: true,
      }),
      invalidatesTags: [tagTypes.portfolio_details],
    }),

    // ✅ DELETE
    deletePortfolioDetails: builder.mutation<ApiResponse<void>, string>({
      query: (id) => ({
        url: `${PORTFOLIO_DETAILS_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.portfolio_details],
    }),
  }),
});

export const {
  useCreatePortfolioDetailsMutation,
  useGetAllPortfolioDetailsQuery,
  useGetSinglePortfolioDetailsQuery,
  useUpdatePortfolioDetailsMutation,
  useDeletePortfolioDetailsMutation,
} = portfolioDetailsApi;