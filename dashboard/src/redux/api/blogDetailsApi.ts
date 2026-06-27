import type { ApiResponse } from "../../types/axios";
import type { PaginationQuery } from "../../types/blog.types";
import { baseApi } from "./baseApi";
import { tagTypes } from "../tag-types";
import type { BlogDetail, BlogDetailPaginatedResponse, UpdateBlogDetailRequest } from "../../types/blogDetail.types";


const BLOG_DETAILS_URL = "/blog-details";

export const blogDetailsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // ✅ CREATE
    createBlogDetails: builder.mutation<ApiResponse<BlogDetail>, FormData>({
      query: (formData) => ({
        url: `${BLOG_DETAILS_URL}/create`,
        method: "POST",
        data: formData,
        contentType: true,
      }),
      invalidatesTags: [tagTypes.blog_details],
    }),

    // ✅ GET ALL (PAGINATION)
    getAllBlogDetails: builder.query<BlogDetailPaginatedResponse, PaginationQuery>({
      query: (params) => ({
        url: BLOG_DETAILS_URL,
        method: "GET",
        params,
      }),
      providesTags: [tagTypes.blog_details],
    }),

    // ✅ GET SINGLE
    getSingleBlogDetails: builder.query<ApiResponse<BlogDetail>, string>({
      query: (id) => ({
        url: `${BLOG_DETAILS_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.blog_details],
    }),

    // ✅ UPDATE
    updateBlogDetails: builder.mutation<ApiResponse<BlogDetail>, UpdateBlogDetailRequest>({
      query: ({ id, data }) => ({
        url: `${BLOG_DETAILS_URL}/${id}`,
        method: "PATCH",
        data,
        contentType: true,
      }),
      invalidatesTags: [tagTypes.blog_details],
    }),

    // ✅ DELETE
    deleteBlogDetails: builder.mutation<ApiResponse<void>, string>({
      query: (id) => ({
        url: `${BLOG_DETAILS_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.blog_details],
    }),
  }),
});

export const {
  useCreateBlogDetailsMutation,
  useGetAllBlogDetailsQuery,
  useGetSingleBlogDetailsQuery,
  useUpdateBlogDetailsMutation,
  useDeleteBlogDetailsMutation,
} = blogDetailsApi;