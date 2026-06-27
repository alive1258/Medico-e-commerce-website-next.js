import type { ApiResponse } from "../../types/axios";
import type {
  BusinessWeCover,
  BusinessWeCoverPaginatedResponse,
  CreateBusinessWeCoverRequest,
  UpdateBusinessWeCoverRequest,
} from "../../types/businessWeCover.types";
import type { PaginationQuery } from "../../types/category.types";
import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

const BUSINESS_WE_COVER_URL = "/business-we-cover";

export const businessWeCoverApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // ✅ CREATE
    createBusinessWeCover: builder.mutation<
      ApiResponse<BusinessWeCover>,
      CreateBusinessWeCoverRequest
    >({
      query: (data) => ({
        url: `${BUSINESS_WE_COVER_URL}/create`,
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.business_we_cover],
    }),

    // ✅ GET ALL (PAGINATION)
    getAllBusinessWeCover: builder.query<
      BusinessWeCoverPaginatedResponse,
      PaginationQuery
    >({
      query: (params) => ({
        url: BUSINESS_WE_COVER_URL,
        method: "GET",
        params: params ,
      }),
      providesTags: [tagTypes.business_we_cover],
    }),

    // ✅ GET SINGLE
    getSingleBusinessWeCover: builder.query<
      ApiResponse<BusinessWeCover>,
      string
    >({
      query: (id) => ({
        url: `${BUSINESS_WE_COVER_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.business_we_cover],
    }),

    // ✅ UPDATE
    updateBusinessWeCover: builder.mutation<
      ApiResponse<BusinessWeCover>,
      UpdateBusinessWeCoverRequest
    >({
      query: ({ id, data }) => ({
        url: `${BUSINESS_WE_COVER_URL}/${id}`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: [tagTypes.business_we_cover],
    }),

    // ✅ DELETE (SOFT DELETE)
    deleteBusinessWeCover: builder.mutation<ApiResponse<void>, string>({
      query: (id) => ({
        url: `${BUSINESS_WE_COVER_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.business_we_cover],
    }),
  }),
});

export const {
  useCreateBusinessWeCoverMutation,
  useGetAllBusinessWeCoverQuery,
  useGetSingleBusinessWeCoverQuery,
  useUpdateBusinessWeCoverMutation,
  useDeleteBusinessWeCoverMutation,
} = businessWeCoverApi;

