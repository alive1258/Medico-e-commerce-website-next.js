import type { ApiResponse } from "../../types/axios";
import type { PaginationQuery } from "../../types/category.types";
import { baseApi } from "./baseApi";
import { tagTypes } from "../tag-types";
import type { PhotoGalleryAlbum, PhotoGalleryAlbumsPaginatedResponse, UpdatePhotoGalleryAlbumRequest } from "../../types/photoGalleryAlbum.types";


const PHOTO_GALLERY_ALBUMS_URL = "/photo-gallery-album";

export const photoGalleryAlbumsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // ✅ CREATE
    createPhotoGalleryAlbum: builder.mutation<
      ApiResponse<PhotoGalleryAlbum>,
      FormData
    >({
      query: (formData) => ({
        url: `${PHOTO_GALLERY_ALBUMS_URL}/create`,
        method: "POST",
        data: formData,
        contentType: true,
      }),
      invalidatesTags: [tagTypes.photo_gallery_album],
    }),

    // ✅ GET ALL (with pagination/search)
    getAllPhotoGalleryAlbums: builder.query<
      PhotoGalleryAlbumsPaginatedResponse,
      PaginationQuery
    >({
      query: (params) => ({
        url: PHOTO_GALLERY_ALBUMS_URL,
        method: "GET",
        params,
      }),
      providesTags: [tagTypes.photo_gallery_album],
    }),

    // ✅ GET SINGLE
    getSinglePhotoGalleryAlbum: builder.query<
      ApiResponse<PhotoGalleryAlbum>,
      string
    >({
      query: (id) => ({
        url: `${PHOTO_GALLERY_ALBUMS_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.photo_gallery_album],
    }),

    // ✅ UPDATE
    updatePhotoGalleryAlbum: builder.mutation<
      ApiResponse<PhotoGalleryAlbum>,
      UpdatePhotoGalleryAlbumRequest
    >({
      query: ({ id, data }) => ({
        url: `${PHOTO_GALLERY_ALBUMS_URL}/${id}`,
        method: "PATCH",
        data,
        contentType: true,
      }),
      invalidatesTags: [tagTypes.photo_gallery_album],
    }),

    // ✅ DELETE
    deletePhotoGalleryAlbum: builder.mutation<ApiResponse<void>, string>({
      query: (id) => ({
        url: `${PHOTO_GALLERY_ALBUMS_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.photo_gallery_album],
    }),
  }),
});

export const {
  useCreatePhotoGalleryAlbumMutation,
  useGetAllPhotoGalleryAlbumsQuery,
  useGetSinglePhotoGalleryAlbumQuery,
  useUpdatePhotoGalleryAlbumMutation,
  useDeletePhotoGalleryAlbumMutation,
} = photoGalleryAlbumsApi;