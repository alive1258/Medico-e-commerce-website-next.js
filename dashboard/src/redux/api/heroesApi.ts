import type { ApiResponse } from "../../types/axios";
import type { PaginationQuery } from "../../types/category.types";
import { baseApi } from "./baseApi";
import { tagTypes } from "../tag-types";
import type { Hero, HeroesPaginatedResponse, UpdateHeroRequest } from "../../types/hero.types";

const HEROS_URL = "/heroes";

export const heroesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // ✅ CREATE
     createHeroe: builder.mutation<ApiResponse<Hero>, FormData>({
      query: (formData) => ({
        url: `${HEROS_URL}/create`,
        method: "POST",
        data: formData,
        contentType: true, // tells backend it's multipart/form-data
      }),
      invalidatesTags: [tagTypes.heroes],
    }),

    // ✅ GET ALL (PAGINATION) backend problem for seacrch
    getAllHeroes: builder.query<HeroesPaginatedResponse, PaginationQuery>({
      query: (params) => ({
        url: HEROS_URL,
        method: "GET",
        params: params ,
      }),
      providesTags: [tagTypes.heroes],
    }),

    // ✅ GET SINGLE
    getSingleHeroe: builder.query<ApiResponse<Hero>, string>({
      query: (id) => ({
        url: `${HEROS_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.heroes],
    }),

    // ✅ UPDATE
    updateHeroe: builder.mutation<ApiResponse<Hero>, UpdateHeroRequest>(
      {
        query: ({ id, data }) => ({
          url: `${HEROS_URL}/${id}`,
          method: "PATCH",
          data,
          contentType: true,
        }),
        invalidatesTags: [tagTypes.heroes],
      },
    ),

    // ✅ DELETE (SOFT DELETE)
    deleteHeroe: builder.mutation<ApiResponse<void>, string>({
      query: (id) => ({
        url: `${HEROS_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.heroes],
    }),
  }),
});

export const {
useCreateHeroeMutation,
useGetAllHeroesQuery,
useGetSingleHeroeQuery,
useUpdateHeroeMutation,
useDeleteHeroeMutation,
} = heroesApi;
