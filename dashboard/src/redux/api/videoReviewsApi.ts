import type { ApiResponse } from "../../types/axios";
import type { PaginationQuery } from "../../types/category.types";
import { baseApi } from "./baseApi";
import { tagTypes } from "../tag-types";
import type { UpdateVideoReviewRequest, VideoReview, VideoReviewPaginatedResponse } from "../../types/videoReview.types";

const VIDEO_REVIEWS_URL = "/video-reviews";

export const videoReviewsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // ✅ CREATE
     createVideoReview: builder.mutation<ApiResponse<VideoReview>, FormData>({
      query: (formData) => ({
        url: `${VIDEO_REVIEWS_URL}/create`,
        method: "POST",
        data: formData,
        contentType: true, 
      }),
      invalidatesTags: [tagTypes.video_reviews],
    }),

    // ✅ GET ALL (PAGINATION) backend problem for seacrch VideoReviews
    getAllVideoReviews: builder.query<VideoReviewPaginatedResponse, PaginationQuery>({
      query: (params) => ({
        url: VIDEO_REVIEWS_URL,
        method: "GET",
        params: params ,
      }),
      providesTags: [tagTypes.video_reviews],
    }),

    // ✅ GET SINGLE
    getSingleVideoReview: builder.query<ApiResponse<VideoReview>, string>({
      query: (id) => ({
        url: `${VIDEO_REVIEWS_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.video_reviews],
    }),

    // ✅ UPDATE
    updateVideoReview: builder.mutation<ApiResponse<VideoReview>, UpdateVideoReviewRequest>(
      {
        query: ({ id, data }) => ({
          url: `${VIDEO_REVIEWS_URL}/${id}`,
          method: "PATCH",
          data,
          contentType: true,
        }),
        invalidatesTags: [tagTypes.video_reviews],
      },
    ),

    // ✅ DELETE (SOFT DELETE)
    deleteVideoReview: builder.mutation<ApiResponse<void>, string>({
      query: (id) => ({
        url: `${VIDEO_REVIEWS_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.video_reviews],
    }),
  }),
});

export const {
useCreateVideoReviewMutation,
useGetAllVideoReviewsQuery,
useGetSingleVideoReviewQuery,
useUpdateVideoReviewMutation,
useDeleteVideoReviewMutation,
} = videoReviewsApi;
