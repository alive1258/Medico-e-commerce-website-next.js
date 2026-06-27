import type { ApiResponse } from "../../types/axios";
import type { PaginationQuery } from "../../types/category.types";
import { baseApi } from "./baseApi";
import { tagTypes } from "../tag-types";
import type { PhotoGalleryCategoriesPaginatedResponse, PhotoGalleryCategory, UpdatePhotoGalleryCategoryRequest } from "../../types/photoGalleryCategory.types";


const PHOTO_GALLERY_CATEGORIES_URL = "/photo-gallery-categories";

export const photoGalleryCategoriesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // ✅ CREATE
    createPhotoGalleryCategory: builder.mutation<
      ApiResponse<PhotoGalleryCategory>,
      FormData
    >({
      query: (formData) => ({
        url: `${PHOTO_GALLERY_CATEGORIES_URL}/create`,
        method: "POST",
        data: formData,
        contentType: true, 
      }),
      invalidatesTags: [tagTypes.photo_gallery_categories],
    }),

    // ✅ GET ALL (with pagination/search)
    getAllPhotoGalleryCategories: builder.query<
      PhotoGalleryCategoriesPaginatedResponse,
      PaginationQuery
    >({
      query: (params) => ({
        url: PHOTO_GALLERY_CATEGORIES_URL,
        method: "GET",
        params,
      }),
      providesTags: [tagTypes.photo_gallery_categories],
    }),

    // ✅ GET SINGLE
    getSinglePhotoGalleryCategory: builder.query<
      ApiResponse<PhotoGalleryCategory>,
      string
    >({
      query: (id) => ({
        url: `${PHOTO_GALLERY_CATEGORIES_URL}/id/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.photo_gallery_categories],
    }),

    // ✅ UPDATE
    updatePhotoGalleryCategory: builder.mutation<
      ApiResponse<PhotoGalleryCategory>,
      UpdatePhotoGalleryCategoryRequest
    >({
      query: ({ id, data }) => ({
        url: `${PHOTO_GALLERY_CATEGORIES_URL}/${id}`,
        method: "PATCH",
        data,
        contentType: true,
      }),
      invalidatesTags: [tagTypes.photo_gallery_categories],
    }),

    // ✅ DELETE (soft delete)
    deletePhotoGalleryCategory: builder.mutation<ApiResponse<void>, string>({
      query: (id) => ({
        url: `${PHOTO_GALLERY_CATEGORIES_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.photo_gallery_categories],
    }),
  }),
});

export const {
  useCreatePhotoGalleryCategoryMutation,
  useGetAllPhotoGalleryCategoriesQuery,
  useGetSinglePhotoGalleryCategoryQuery,
  useUpdatePhotoGalleryCategoryMutation,
  useDeletePhotoGalleryCategoryMutation,
} = photoGalleryCategoriesApi;