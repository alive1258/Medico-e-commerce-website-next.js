
import type { ApiResponse } from "../../types/axios";
import type {
  
  CreateServiceVideoRequest,
  ServiceVideo,
  ServiceVideosPaginatedResponse,
  UpdateServiceVideoRequest,
} from "../../types/serviceVideo.types";
import type { PaginationQuery } from "../../types/category.types";
import { baseApi } from "./baseApi";
import { tagTypes } from "../tag-types";

const SERVICE_VIDEOS_URL = "/service-videos";

export const serviceVideosApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    //  CREATE SERVICE VIDEO
    createServiceVideo: builder.mutation<
      ApiResponse<ServiceVideo>,
      FormData | CreateServiceVideoRequest
    >({
      query: (data) => ({
        url: `${SERVICE_VIDEOS_URL}/create`,
        method: "POST",
        data,
        contentType:true,
      }),
      invalidatesTags: [tagTypes.service_videos],
    }),
    
    //  GET ALL SERVICE VIDEOS (PAGINATION)
    getAllServiceVideos: builder.query<
    ServiceVideosPaginatedResponse,
      PaginationQuery | PaginationQuery
    >({
      query: (params) => ({
        url: SERVICE_VIDEOS_URL,
        method: "GET",
        params,
      }),
      providesTags: [tagTypes.service_videos],
    }),

    //  GET SINGLE SERVICE VIDEO
    getSingleServiceVideo: builder.query<ApiResponse<ServiceVideo>, string>({
      query: (id) => ({
        url: `${SERVICE_VIDEOS_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.service_videos],
    }),

    //  UPDATE SERVICE VIDEO
    updateServiceVideo: builder.mutation<
      ApiResponse<ServiceVideo>,
      UpdateServiceVideoRequest
    >({
      query: ({ id, data }) => ({
        url: `${SERVICE_VIDEOS_URL}/${id}`,
        method: "PATCH",
        data,
        contentType: true,
        // contentType: data instanceof FormData,
      }),
      invalidatesTags: [tagTypes.service_videos],
    }),

    //  DELETE SERVICE VIDEO (SOFT DELETE)
    deleteServiceVideo: builder.mutation<ApiResponse<void>, string>({
      query: (id) => ({
        url: `${SERVICE_VIDEOS_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.service_videos],
    }),
  }),
});

export const {
  useCreateServiceVideoMutation,
  useGetAllServiceVideosQuery,
  useGetSingleServiceVideoQuery,
  useUpdateServiceVideoMutation,
  useDeleteServiceVideoMutation,
} = serviceVideosApi;
