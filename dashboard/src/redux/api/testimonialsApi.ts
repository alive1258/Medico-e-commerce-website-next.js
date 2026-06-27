import type { ApiResponse } from "../../types/axios";
import type { PaginationQuery } from "../../types/category.types";
import { baseApi } from "./baseApi";
import { tagTypes } from "../tag-types";
import type { Testimonial, TestimonialPaginatedResponse, UpdateTestimonialRequest } from "../../types/testimonial.types";


const TESTIMONIAL_URL = "/testimonials"

export const testimonialsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // ✅ CREATE
     createTestimonial: builder.mutation<ApiResponse<Testimonial>, FormData>({
      query: (formData) => ({
        url: `${TESTIMONIAL_URL}/create`,
        method: "POST",
        data: formData,
        contentType: true, 
      }),
      invalidatesTags: [tagTypes.testimonials],
    }),

    // ✅ GET ALL (PAGINATION) backend problem for seacrch
    getAllTestimonial: builder.query<TestimonialPaginatedResponse, PaginationQuery>({
      query: (params) => ({
        url: TESTIMONIAL_URL,
        method: "GET",
        params: params ,
      }),
      providesTags: [tagTypes.testimonials],
    }),

    // ✅ GET SINGLE
    getSingleTestimonial: builder.query<ApiResponse<Testimonial>, string>({
      query: (id) => ({
        url: `${TESTIMONIAL_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.testimonials],
    }),

    // ✅ UPDATE
    updateTestimonial: builder.mutation<ApiResponse<Testimonial>, UpdateTestimonialRequest>(
      {
        query: ({ id, data }) => ({
          url: `${TESTIMONIAL_URL}/${id}`,
          method: "PATCH",
          data,
          contentType: true,
        }),
        invalidatesTags: [tagTypes.testimonials],
      },
    ),

    // ✅ DELETE (SOFT DELETE)
    deleteTestimonial: builder.mutation<ApiResponse<void>, string>({
      query: (id) => ({
        url: `${TESTIMONIAL_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.testimonials],
    }),
  }),
});

export const {
useCreateTestimonialMutation,
useGetAllTestimonialQuery,
useGetSingleTestimonialQuery,
useUpdateTestimonialMutation,
useDeleteTestimonialMutation,
} = testimonialsApi;
