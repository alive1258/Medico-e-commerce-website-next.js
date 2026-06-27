import type { ApiResponse } from "../../types/axios";
import type { PaginationQuery } from "../../types/category.types"; 
import type {
  CreateSubscriptionRequest,
  Subscription,
  SubscriptionsPaginatedResponse,
  UpdateSubscriptionRequest,
} from "../../types/subscription.types";
import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

const SUBSCRIPTIONS_URL = "/subscriptions";

export const subscriptionsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // ✅ CREATE SUBSCRIPTION
    createSubscription: builder.mutation<
      ApiResponse<Subscription>,
      CreateSubscriptionRequest
    >({
      query: (data) => ({
        url: `${SUBSCRIPTIONS_URL}/create`,
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.subscriptions],
    }),

    // ✅ GET ALL SUBSCRIPTIONS (PAGINATION + FILTER)
    getAllSubscriptions: builder.query<
      SubscriptionsPaginatedResponse,
      PaginationQuery & { status?: string }
    >({
      query: (params) => ({
        url: SUBSCRIPTIONS_URL,
        method: "GET",
        params,
      }),
      providesTags: [tagTypes.subscriptions],
    }),

    // ✅ GET MY SUBSCRIPTIONS
    getMySubscriptions: builder.query<
      ApiResponse<Subscription[]>,
      string | void
    >({
      query: () => ({
        url: `${SUBSCRIPTIONS_URL}/my-service`,
        method: "GET",
      }),
      providesTags: [tagTypes.subscriptions],
    }),

    // ✅ GET SINGLE SUBSCRIPTION
    getSingleSubscription: builder.query<ApiResponse<Subscription>, string>({
      query: (id) => ({
        url: `${SUBSCRIPTIONS_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.subscriptions],
    }),

    // ✅ UPDATE SUBSCRIPTION
    updateSubscription: builder.mutation<
      ApiResponse<Subscription>,
      UpdateSubscriptionRequest
    >({
      query: ({ id, data }) => ({
        url: `${SUBSCRIPTIONS_URL}/${id}`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: [tagTypes.subscriptions],
    }),

    // ✅ CANCEL / DELETE SUBSCRIPTION
    deleteSubscription: builder.mutation<ApiResponse<void>, string>({
      query: (id) => ({
        url: `${SUBSCRIPTIONS_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.subscriptions],
    }),
  }),
});

export const {
  useCreateSubscriptionMutation,
  useGetAllSubscriptionsQuery,
  useGetMySubscriptionsQuery,
  useGetSingleSubscriptionQuery,
  useUpdateSubscriptionMutation,
  useDeleteSubscriptionMutation,
} = subscriptionsApi;
