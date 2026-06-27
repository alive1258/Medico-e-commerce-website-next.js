import type { ApiResponse } from "../../types/axios";
import type {
  Pricing,
  CreatePricingRequest,
  UpdatePricingRequest,
  PricingPaginatedResponse,
} from "../../types/pricing.types";
import type { PaginationQuery } from "../../types/category.types";
import { baseApi } from "./baseApi";
import { tagTypes } from "../tag-types";

const PRICINGS_URL = "/pricings";

export const pricingsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // ✅ CREATE
    createPricing: builder.mutation<ApiResponse<Pricing>, CreatePricingRequest>({
      query: (data) => ({
        url: `${PRICINGS_URL}/create`,
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.pricings],
    }),

    // ✅ GET ALL (PAGINATION)
    getAllPricings: builder.query<PricingPaginatedResponse, PaginationQuery>({
      query: (params) => ({
        url: PRICINGS_URL,
        method: "GET",
         params: params ,
      }),
      providesTags: [tagTypes.pricings],
    }),

    // ✅ GET SINGLE
    getSinglePricing: builder.query<ApiResponse<Pricing>, string>({
      query: (id) => ({
        url: `${PRICINGS_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.pricings],
    }),

    // ✅ UPDATE
    updatePricing: builder.mutation<ApiResponse<Pricing>, UpdatePricingRequest>({
      query: ({ id, data }) => ({
        url: `${PRICINGS_URL}/${id}`,
        method: "PATCH",
         data,
      }),
      invalidatesTags: [tagTypes.pricings],
    }),

    // ✅ DELETE (SOFT DELETE)
    deletePricing: builder.mutation<ApiResponse<void>, string>({
      query: (id) => ({
        url: `${PRICINGS_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.pricings],
    }),
  }),
});

export const {
  useCreatePricingMutation,
  useGetAllPricingsQuery,
  useGetSinglePricingQuery,
  useUpdatePricingMutation,
  useDeletePricingMutation,
} = pricingsApi;
