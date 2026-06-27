import type { ApiResponse } from "../../types/axios";
import type {
  AssignedPricingFeature,
  AssignedPricingFeaturePaginatedResponse,
  CreateAssignedPricingFeatureRequest,
  UpdateAssignedPricingFeatureRequest,
} from "../../types/assigenPricingFeature.types";
import type { PaginationQuery } from "../../types/category.types";
import { baseApi } from "./baseApi";
import { tagTypes } from "../tag-types";

const ASSIGEN_PRICING_FEATURE_URL = "/assigen-pricing-features";

export const assigenPricingFeatureApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // ✅ CREATE
    createAssigenPricingFeature: builder.mutation<
      ApiResponse<AssignedPricingFeature>,
      CreateAssignedPricingFeatureRequest
    >({
      query: (data) => ({
        url: `${ASSIGEN_PRICING_FEATURE_URL}/create`,
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.assigen_pricing_features],
    }),

    // ✅ GET ALL (PAGINATION)
    getAllAssigenPricingFeatures: builder.query<
      AssignedPricingFeaturePaginatedResponse,
      PaginationQuery
    >({
      query: (params) => ({
        url: ASSIGEN_PRICING_FEATURE_URL,
        method: "GET",
        params: params ,
      }),
      providesTags: [tagTypes.assigen_pricing_features],
    }),

    // ✅ GET SINGLE
    getSingleAssigenPricingFeature: builder.query<
      ApiResponse<AssignedPricingFeature>,
      string
    >({
      query: (id) => ({
        url: `${ASSIGEN_PRICING_FEATURE_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.assigen_pricing_features],
    }),

    // ✅ UPDATE
    updateAssigenPricingFeature: builder.mutation<
      ApiResponse<UpdateAssignedPricingFeatureRequest>,
      UpdateAssignedPricingFeatureRequest
    >({
      query: ({ id, data }) => ({
        url: `${ASSIGEN_PRICING_FEATURE_URL}/${id}`,
        method: "PATCH",
         data,
      }),
      invalidatesTags: [tagTypes.assigen_pricing_features],
    }),

    // ✅ DELETE
    deleteAssigenPricingFeature: builder.mutation<ApiResponse<void>, string>({
      query: (id) => ({
        url: `${ASSIGEN_PRICING_FEATURE_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.assigen_pricing_features],
    }),
  }),
});

export const {
  useCreateAssigenPricingFeatureMutation,
  useGetAllAssigenPricingFeaturesQuery,
  useGetSingleAssigenPricingFeatureQuery,
  useUpdateAssigenPricingFeatureMutation,
  useDeleteAssigenPricingFeatureMutation,
} = assigenPricingFeatureApi;
