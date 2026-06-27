import type { ApiResponse } from "../../types/axios";
import type {
  Service,

  ServicesPaginatedResponse,

  UpdateServiceRequest,
} from "../../types/service.types";
import type { PaginationQuery } from "../../types/category.types";
import { baseApi } from "./baseApi";
import { tagTypes } from "../tag-types";

const SERVICES_URL = "/services";

export const servicesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // ✅ CREATE
     createService: builder.mutation<ApiResponse<Service>, FormData>({
      query: (formData) => ({
        url: `${SERVICES_URL}/create`,
        method: "POST",
        data: formData,
        contentType: true, // tells backend it's multipart/form-data
      }),
      invalidatesTags: [tagTypes.services],
    }),

    // ✅ GET ALL (PAGINATION) backend problem for seacrch
    getAllServices: builder.query<ServicesPaginatedResponse, PaginationQuery>({
      query: (params) => ({
        url: SERVICES_URL,
        method: "GET",
        params: params ,
      }),
      providesTags: [tagTypes.services],
    }),

    // ✅ GET SINGLE
    getSingleService: builder.query<ApiResponse<Service>, string>({
      query: (id) => ({
        url: `${SERVICES_URL}/id/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.services],
    }),

    // ✅ UPDATE
    updateService: builder.mutation<ApiResponse<Service>, UpdateServiceRequest>(
      {
        query: ({ id, data }) => ({
          url: `${SERVICES_URL}/${id}`,
          method: "PATCH",
          data,
          contentType: true,
        }),
        invalidatesTags: [tagTypes.services],
      },
    ),

    // ✅ DELETE (SOFT DELETE)
    deleteService: builder.mutation<ApiResponse<void>, string>({
      query: (id) => ({
        url: `${SERVICES_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.services],
    }),
  }),
});

export const {
  useCreateServiceMutation,
  useGetAllServicesQuery,
  useGetSingleServiceQuery,
  useUpdateServiceMutation,
  useDeleteServiceMutation,
} = servicesApi;
