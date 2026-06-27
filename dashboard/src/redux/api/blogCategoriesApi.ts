import type { ApiResponse } from "../../types/axios";
import type {
  BlogCategoriesPaginatedResponse,
  BlogCategory,
  CreateBlogCategoryRequest,
  UpdateBlogCategoryRequest,
} from "../../types/blogCategory.types";
import type { PaginationQuery } from "../../types/category.types";

import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

const BLOG_CATEGORIES_URL = "/blog-categories";

export const blogCategoriesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // ✅ CREATE BLOG CATEGORY
    createBlogCategory: builder.mutation<
      ApiResponse<BlogCategory>,
      CreateBlogCategoryRequest
    >({
      query: (data) => ({
        url: `${BLOG_CATEGORIES_URL}/create`,
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.blog_categories],
    }),

    // ✅ GET ALL BLOG CATEGORIES
    getAllBlogCategories: builder.query<
      BlogCategoriesPaginatedResponse,
      PaginationQuery
    >({
      query: (params) => ({
        url: BLOG_CATEGORIES_URL,
        method: "GET",
        params,
      }),
      providesTags: [tagTypes.blog_categories],
    }),

    // ✅ GET SINGLE BLOG CATEGORY
    getSingleBlogCategory: builder.query<ApiResponse<BlogCategory>, string>({
      query: (id) => ({
        url: `${BLOG_CATEGORIES_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.blog_categories],
    }),

    // ✅ UPDATE BLOG CATEGORY
    updateBlogCategory: builder.mutation<
      ApiResponse<BlogCategory>,
      UpdateBlogCategoryRequest
    >({
      query: ({ id, data }) => ({
        url: `${BLOG_CATEGORIES_URL}/${id}`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: [tagTypes.blog_categories],
    }),

    // ✅ DELETE BLOG CATEGORY
    deleteBlogCategory: builder.mutation<ApiResponse<void>, string>({
      query: (id) => ({
        url: `${BLOG_CATEGORIES_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.blog_categories],
    }),
  }),
});

export const {
  useCreateBlogCategoryMutation,
  useGetAllBlogCategoriesQuery,
  useGetSingleBlogCategoryQuery,
  useUpdateBlogCategoryMutation,
  useDeleteBlogCategoryMutation,
} = blogCategoriesApi;
