import type { ApiResponse } from "../../types/axios";
import type {
  PricingFeature,
  CreatePricingFeatureRequest,
  UpdatePricingFeatureRequest,
  PricingFeaturesPaginatedResponse,
} from "../../types/pricingFeature.types";
import type { PaginationQuery } from "../../types/category.types";
import { baseApi } from "./baseApi";
import { tagTypes } from "../tag-types";

const PRICING_FEATURE_URL = "/pricing-features";

export const pricingFeatureApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // ✅ CREATE
    createPricingFeature: builder.mutation<
      ApiResponse<PricingFeature>,
      CreatePricingFeatureRequest
    >({
      query: (data) => ({
        url: `${PRICING_FEATURE_URL}/create`,
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.pricing_features],
    }),

    // ✅ GET ALL (PAGINATION)
    getAllPricingFeatures: builder.query<
     PricingFeaturesPaginatedResponse,
      PaginationQuery
    >({
      query: (params) => ({
        url: PRICING_FEATURE_URL,
        method: "GET",
        params: params ,
      }),
      providesTags: [tagTypes.pricing_features],
    }),

    // ✅ GET SINGLE
    getSinglePricingFeature: builder.query<ApiResponse<PricingFeature>, string>(
      {
        query: (id) => ({
          url: `${PRICING_FEATURE_URL}/${id}`,
          method: "GET",
        }),
        providesTags: [tagTypes.pricing_features],
      },
    ),

    // ✅ UPDATE
    updatePricingFeature: builder.mutation<
      ApiResponse<PricingFeature>,
      UpdatePricingFeatureRequest
    >({
      query: ({ id, data }) => ({
        url: `${PRICING_FEATURE_URL}/${id}`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: [tagTypes.pricing_features],
    }),

    // ✅ DELETE (SOFT DELETE)
    deletePricingFeature: builder.mutation<ApiResponse<void>, string>({
      query: (id) => ({
        url: `${PRICING_FEATURE_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.pricing_features],
    }),
  }),
});

export const {
  useCreatePricingFeatureMutation,
  useGetAllPricingFeaturesQuery,
  useGetSinglePricingFeatureQuery,
  useUpdatePricingFeatureMutation,
  useDeletePricingFeatureMutation,
} = pricingFeatureApi;
