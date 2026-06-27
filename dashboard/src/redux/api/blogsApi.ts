import type { ApiResponse } from "../../types/axios";
import type { PaginationQuery } from "../../types/category.types";
import { baseApi } from "./baseApi";
import { tagTypes } from "../tag-types";
import type { Blog, BlogPaginatedResponse, UpdateBlogRequest } from "../../types/blog.types";

const BLOG_URL = "/blogs";

export const blogApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createBlog: builder.mutation<ApiResponse<Blog>, FormData>({
      query: (formData) => ({
        url: `${BLOG_URL}/create`,
        method: "POST",
        data: formData,
        contentType: true,
      }),
      invalidatesTags: [tagTypes.blogs],
    }),

    getAllBlogs: builder.query<BlogPaginatedResponse, PaginationQuery>({
      query: (params) => ({
        url: BLOG_URL,
        method: "GET",
        params,
      }),
      providesTags: [tagTypes.blogs],
    }),

     getBlogById: builder.query<ApiResponse<Blog>, string>({
      query: (id) => ({
        url: `${BLOG_URL}/id/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.blogs],
    }),

    getSingleBlog: builder.query<ApiResponse<Blog>, string>({
      query: (slug) => ({
       url: `${BLOG_URL}/slug/${slug}`,
        method: "GET",
      }),
      providesTags: [tagTypes.blogs],
    }),

    updateBlog: builder.mutation<ApiResponse<Blog>, UpdateBlogRequest>({
      query: ({ id, data }) => ({
        url: `${BLOG_URL}/${id}`,
        method: "PATCH",
        data,
        contentType: true,
      }),
      invalidatesTags: [tagTypes.blogs],
    }),

    deleteBlog: builder.mutation<ApiResponse<void>, string>({
      query: (id) => ({
        url: `${BLOG_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.blogs],
    }),
  }),
});

export const {
  useCreateBlogMutation,
  useGetAllBlogsQuery,
  useGetSingleBlogQuery,
  useGetBlogByIdQuery,
  useUpdateBlogMutation,
  useDeleteBlogMutation,
} = blogApi;