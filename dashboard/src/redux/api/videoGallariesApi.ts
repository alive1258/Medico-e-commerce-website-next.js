import type { ApiResponse } from "../../types/axios";
import type { PaginationQuery } from "../../types/category.types";
import { baseApi } from "./baseApi";
import { tagTypes } from "../tag-types";
import type { UpdateVideoGalleryRequest, VideoGallery, VideoGalleryPaginatedResponse } from "../../types/videoGallery.types";

const VIDEO_GALLERY_URL = "/video-gallaries";

export const videoGalleryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // ✅ CREATE
    createVideoGallery: builder.mutation<
      ApiResponse<VideoGallery>,
      FormData
    >({
      query: (formData) => ({
        url: `${VIDEO_GALLERY_URL}/create`,
        method: "POST",
        data: formData,
        contentType: true,
      }),
      invalidatesTags: [tagTypes.video_gallery],
    }),

    // ✅ GET ALL
    getAllVideoGalleries: builder.query<
      VideoGalleryPaginatedResponse,
      PaginationQuery
    >({
      query: (params) => ({
        url: VIDEO_GALLERY_URL,
        method: "GET",
        params,
      }),
      providesTags: [tagTypes.video_gallery],
    }),

    // ✅ GET SINGLE
    getSingleVideoGallery: builder.query<
      ApiResponse<VideoGallery>,
      string
    >({
      query: (id) => ({
        url: `${VIDEO_GALLERY_URL}/id/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.video_gallery],
    }),

    // ✅ UPDATE
    updateVideoGallery: builder.mutation<
      ApiResponse<VideoGallery>,
      UpdateVideoGalleryRequest
    >({
      query: ({ id, data }) => ({
        url: `${VIDEO_GALLERY_URL}/${id}`,
        method: "PATCH",
        data,
        contentType: true,
      }),
      invalidatesTags: [tagTypes.video_gallery],
    }),

    // ✅ DELETE
    deleteVideoGallery: builder.mutation<ApiResponse<void>, string>({
      query: (id) => ({
        url: `${VIDEO_GALLERY_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.video_gallery],
    }),
  }),
});

export const {
  useCreateVideoGalleryMutation,
  useGetAllVideoGalleriesQuery,
  useGetSingleVideoGalleryQuery,
  useUpdateVideoGalleryMutation,
  useDeleteVideoGalleryMutation,
} = videoGalleryApi;