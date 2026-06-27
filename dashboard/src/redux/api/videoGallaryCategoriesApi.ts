import type { ApiResponse } from "../../types/axios";
import type { PaginationQuery } from "../../types/category.types";
import { baseApi } from "./baseApi";
import { tagTypes } from "../tag-types";
import type { UpdateVideoGalleryCategoryRequest, VideoGalleryCategoriesPaginatedResponse, VideoGalleryCategory } from "../../types/videoGalleryCategory.types";

const VIDEO_GALLERY_CATEGORIES_URL = "/video-gallary-categories";

export const videoGalleryCategoriesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // ✅ CREATE
    createVideoGalleryCategory: builder.mutation<
      ApiResponse<VideoGalleryCategory>,
      FormData
    >({
      query: (formData) => ({
        url: `${VIDEO_GALLERY_CATEGORIES_URL}/create`,
        method: "POST",
        data: formData,
        contentType: true, // multipart/form-data
      }),
      invalidatesTags: [tagTypes.video_gallery_categories],
    }),

    // ✅ GET ALL (with pagination/search)
    getAllVideoGalleryCategories: builder.query<
      VideoGalleryCategoriesPaginatedResponse,
      PaginationQuery
    >({
      query: (params) => ({
        url: VIDEO_GALLERY_CATEGORIES_URL,
        method: "GET",
        params,
      }),
      providesTags: [tagTypes.video_gallery_categories],
    }),

    // ✅ GET SINGLE
    getSingleVideoGalleryCategory: builder.query<
      ApiResponse<VideoGalleryCategory>,
      string
    >({
      query: (slug) => ({
        url: `${VIDEO_GALLERY_CATEGORIES_URL}/${slug}`,
        method: "GET",
      }),
      providesTags: [tagTypes.video_gallery_categories],
    }),

    // ✅ UPDATE
    updateVideoGalleryCategory: builder.mutation<
      ApiResponse<VideoGalleryCategory>,
      UpdateVideoGalleryCategoryRequest
    >({
      query: ({ id, data }) => ({
        url: `${VIDEO_GALLERY_CATEGORIES_URL}/${id}`,
        method: "PATCH",
        data,
        contentType: true,
      }),
      invalidatesTags: [tagTypes.video_gallery_categories],
    }),

    // ✅ DELETE (soft delete)
    deleteVideoGalleryCategory: builder.mutation<ApiResponse<void>, string>({
      query: (id) => ({
        url: `${VIDEO_GALLERY_CATEGORIES_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.video_gallery_categories],
    }),
  }),
});

export const {
  useCreateVideoGalleryCategoryMutation,
  useGetAllVideoGalleryCategoriesQuery,
  useGetSingleVideoGalleryCategoryQuery,
  useUpdateVideoGalleryCategoryMutation,
  useDeleteVideoGalleryCategoryMutation,
} = videoGalleryCategoriesApi;