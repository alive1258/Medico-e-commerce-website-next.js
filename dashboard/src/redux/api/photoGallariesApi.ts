import type { ApiResponse } from "../../types/axios";
import type { PaginationQuery } from "../../types/category.types";
import { baseApi } from "./baseApi";
import { tagTypes } from "../tag-types";
import type { PhotoGallery, PhotoGalleryPaginatedResponse, UpdatePhotoGalleryRequest } from "../../types/photoGallery.types";


const PHOTO_GALLERY_URL = "/photo-gallaries";

export const photoGalleryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // ✅ CREATE
    createPhotoGallery: builder.mutation<
      ApiResponse<PhotoGallery>,
      FormData
    >({
      query: (formData) => ({
        url: `${PHOTO_GALLERY_URL}/create`,
        method: "POST",
        data: formData,
        contentType: true,
      }),
      invalidatesTags: [tagTypes.photo_gallaries],
    }),

    // ✅ GET ALL
    getAllPhotoGalleries: builder.query<
      PhotoGalleryPaginatedResponse,
      PaginationQuery
    >({
      query: (params) => ({
        url: PHOTO_GALLERY_URL,
        method: "GET",
        params,
      }),
      providesTags: [tagTypes.photo_gallaries],
    }),

    // ✅ GET SINGLE
    getSinglePhotoGallery: builder.query<
      ApiResponse<PhotoGallery>,
      string
    >({
      query: (slug) => ({
        url: `${PHOTO_GALLERY_URL}/${slug}`,
        method: "GET",
      }),
      providesTags: [tagTypes.photo_gallaries],
    }),

    // ✅ UPDATE
    updatePhotoGallery: builder.mutation<
      ApiResponse<PhotoGallery>,
      UpdatePhotoGalleryRequest
    >({
      query: ({ id, data }) => ({
        url: `${PHOTO_GALLERY_URL}/${id}`,
        method: "PATCH",
        data,
        contentType: true,
      }),
      invalidatesTags: [tagTypes.photo_gallaries],
    }),

    // ✅ DELETE
    deletePhotoGallery: builder.mutation<
      ApiResponse<void>,
      string
    >({
      query: (id) => ({
        url: `${PHOTO_GALLERY_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.photo_gallaries],
    }),
  }),
});

export const {
  useCreatePhotoGalleryMutation,
  useGetAllPhotoGalleriesQuery,
  useGetSinglePhotoGalleryQuery,
  useUpdatePhotoGalleryMutation,
  useDeletePhotoGalleryMutation,
} = photoGalleryApi;