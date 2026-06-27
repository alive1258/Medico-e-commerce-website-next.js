import type { ApiResponse } from "../../types/axios";
import type { PaginationQuery } from "../../types/category.types";
import { baseApi } from "./baseApi";
import { tagTypes } from "../tag-types";
import type { CreateWhoWeAreFeatureRequest, UpdateWhoWeAreFeatureRequest, WhoWeAreFeature, WhoWeAreFeaturePaginatedResponse } from "../../types/whoWeAreFeature.types";

const WHO_WE_ARE_FEATURES_URL = "/who-we-are-features";

export const whoWeAreFeaturesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // ✅ CREATE
    createWhoWeAreFeature: builder.mutation<ApiResponse<WhoWeAreFeature>, CreateWhoWeAreFeatureRequest>({
      query: (data) => ({
        url: `${WHO_WE_ARE_FEATURES_URL}/create`,
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.who_we_are_features],
    }),

    // ✅ GET ALL (PAGINATION)
    getAllWhoWeAreFeatures: builder.query<WhoWeAreFeaturePaginatedResponse, PaginationQuery>({
      query: (params) => ({
        url: WHO_WE_ARE_FEATURES_URL,
        method: "GET",
         params: params ,
      }),
      providesTags: [tagTypes.who_we_are_features],
    }),

    // ✅ GET SINGLE
    getSingleWhoWeAreFeature: builder.query<ApiResponse<WhoWeAreFeature>, string>({
      query: (id) => ({
        url: `${WHO_WE_ARE_FEATURES_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.who_we_are_features],
    }),

    // ✅ UPDATE
    updateWhoWeAreFeature: builder.mutation<ApiResponse<WhoWeAreFeature>, UpdateWhoWeAreFeatureRequest>({
      query: ({ id, data }) => ({
        url: `${WHO_WE_ARE_FEATURES_URL}/${id}`,
        method: "PATCH",
         data,
      }),
      invalidatesTags: [tagTypes.who_we_are_features],
    }),

    // ✅ DELETE (SOFT DELETE)
    deleteWhoWeAreFeature: builder.mutation<ApiResponse<void>, string>({
      query: (id) => ({
        url: `${WHO_WE_ARE_FEATURES_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.who_we_are_features],
    }),
  }),
});

export const {
  useCreateWhoWeAreFeatureMutation,
  useGetAllWhoWeAreFeaturesQuery,
  useGetSingleWhoWeAreFeatureQuery,
  useUpdateWhoWeAreFeatureMutation,
  useDeleteWhoWeAreFeatureMutation,
} = whoWeAreFeaturesApi;
