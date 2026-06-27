import type { ApiResponse } from "../../types/axios";
import type {
  CategoriesPaginatedResponse,
  Category,
  CreateCategoryRequest,
  PaginationQuery,
  UpdateCategoryRequest,
} from "../../types/category.types";
import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

const CATEGORIES_URL = "/categories";

export const categoriesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    //   CREATE CATEGORY
    createCategories: builder.mutation<
      ApiResponse<Category>,
      CreateCategoryRequest
    >({
      query: (data) => ({
        url: `${CATEGORIES_URL}/create`,
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.categories],
    }),

    //  GET ALL CATEGORIES (WITH PAGINATION)
    getAllCategories: builder.query<
      CategoriesPaginatedResponse,
      PaginationQuery
    >({
      query: (params) => ({
        url: CATEGORIES_URL,
        method: "GET",
        params,
      }),
      providesTags: [tagTypes.categories],
    }),

    //  GET SINGLE CATEGORY
    getSingleCategorie: builder.query<ApiResponse<Category>, string>({
      query: (id) => ({
        url: `${CATEGORIES_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.categories],
    }),

    //  UPDATE CATEGORY
    updateCategorie: builder.mutation<
      ApiResponse<Category>,
      UpdateCategoryRequest
    >({
      query: ({ id, data }) => ({
        url: `${CATEGORIES_URL}/${id}`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: [tagTypes.categories],
    }),

    // DELETE CATEGORY
    deleteCategorie: builder.mutation<ApiResponse<void>, string>({
      query: (id) => ({
        url: `${CATEGORIES_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.categories],
    }),
  }),
});

export const {
  useCreateCategoriesMutation,
  useGetAllCategoriesQuery,
  useGetSingleCategorieQuery,
  useUpdateCategorieMutation,
  useDeleteCategorieMutation,
} = categoriesApi;
