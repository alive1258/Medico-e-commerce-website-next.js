import type { ApiResponse } from "../../types/axios";
import type { PaginationQuery } from "../../types/category.types";
import { baseApi } from "./baseApi";
import { tagTypes } from "../tag-types";
import type { UpdateHeroRequest } from "../../types/hero.types";
import type { WhoWeAre, WhoWeArePaginatedResponse } from "../../types/whoWeAre.types";

const WHO_WE_ARE_URL = "/who-we-are";

export const whoWeAreApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // ✅ CREATE
     createWhoWeAre: builder.mutation<ApiResponse<WhoWeAre>, FormData>({
      query: (formData) => ({
        url: `${WHO_WE_ARE_URL}/create`,
        method: "POST",
        data: formData,
        contentType: true, 
      }),
      invalidatesTags: [tagTypes.who_we_are],
    }),

    // ✅ GET ALL (PAGINATION) backend problem for seacrch
    getAllWhoWeAre: builder.query<WhoWeArePaginatedResponse, PaginationQuery>({
      query: (params) => ({
        url: WHO_WE_ARE_URL,
        method: "GET",
        params: params ,
      }),
      providesTags: [tagTypes.who_we_are],
    }),

    // ✅ GET SINGLE
    getSingleWhoWeAre: builder.query<ApiResponse<WhoWeAre>, string>({
      query: (id) => ({
        url: `${WHO_WE_ARE_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.who_we_are],
    }),

    // ✅ UPDATE
    updateWhoWeAre: builder.mutation<ApiResponse<WhoWeAre>, UpdateHeroRequest>(
      {
        query: ({ id, data }) => ({
          url: `${WHO_WE_ARE_URL}/${id}`,
          method: "PATCH",
          data,
          contentType: true,
        }),
        invalidatesTags: [tagTypes.who_we_are],
      },
    ),

    // ✅ DELETE (SOFT DELETE)
    deleteWhoWeAre: builder.mutation<ApiResponse<void>, string>({
      query: (id) => ({
        url: `${WHO_WE_ARE_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.who_we_are],
    }),
  }),
});

export const {
useCreateWhoWeAreMutation,
useGetAllWhoWeAreQuery,
useGetSingleWhoWeAreQuery,
useUpdateWhoWeAreMutation,
useDeleteWhoWeAreMutation,
} = whoWeAreApi;
