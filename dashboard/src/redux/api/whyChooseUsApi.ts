import type { ApiResponse } from "../../types/axios";

import type { PaginationQuery } from "../../types/category.types";
import type { CreateWhyChooseUsRequest, UpdateWhyChooseUsRequest, WhyChooseUs, WhyChooseUsPaginatedResponse } from "../../types/WhyChooseUs.types";
import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

const WHY_CHOOSE_US_URL = "/why-choose-us";

export const whyChooseUsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // ✅ CREATE
    createWhyChooseUs: builder.mutation<
      ApiResponse<WhyChooseUs>,
      CreateWhyChooseUsRequest
    >({
      query: (data) => ({
        url: `${WHY_CHOOSE_US_URL}/create`,
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.why_choose_us],
    }),

    // ✅ GET ALL (PAGINATION)
    getAllWhyChooseUs: builder.query<
    WhyChooseUsPaginatedResponse,
      PaginationQuery
    >({
      query: (params) => ({
        url: WHY_CHOOSE_US_URL,
        method: "GET",
        params: params ,
      }),
      providesTags: [tagTypes.why_choose_us],
    }),

    // ✅ GET SINGLE
    getSingleWhyChooseUs: builder.query<
      ApiResponse<WhyChooseUs>,
      string
    >({
      query: (id) => ({
        url: `${WHY_CHOOSE_US_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.why_choose_us],
    }),

    // ✅ UPDATE
    updateWhyChooseUs: builder.mutation<
      ApiResponse<WhyChooseUs>,
      UpdateWhyChooseUsRequest
    >({
      query: ({ id, data }) => ({
        url: `${WHY_CHOOSE_US_URL}/${id}`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: [tagTypes.why_choose_us],
    }),

    // ✅ DELETE (SOFT DELETE)
    deleteWhyChooseUs: builder.mutation<ApiResponse<void>, string>({
      query: (id) => ({
        url: `${WHY_CHOOSE_US_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.why_choose_us],
    }),
  }),
});

export const {
  useCreateWhyChooseUsMutation,
  useGetAllWhyChooseUsQuery,
  useGetSingleWhyChooseUsQuery,
  useUpdateWhyChooseUsMutation,
  useDeleteWhyChooseUsMutation,
} = whyChooseUsApi;
