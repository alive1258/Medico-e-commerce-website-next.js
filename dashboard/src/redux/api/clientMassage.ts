// redux/api/sendMessageApi.ts
import { baseApi } from "./baseApi";
import { tagTypes } from "../tag-types";
import type {

  SendMessagePaginatedResponse,
  SendMessageSingleResponse,
} from "../../types/sendMessageTypes";
import type { PaginationQuery } from "../../types/category.types";

const SEND_MESSAGE_URL = "/send-message";

export const sendMessageApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // ✅ GET ALL
    getAllSendMessages: builder.query<
      SendMessagePaginatedResponse,
      PaginationQuery
    >({
      query: (params) => ({
        url: SEND_MESSAGE_URL,
        method: "GET",
        params,
      }),
      providesTags: [tagTypes.sendMessages],
    }),
  getSingleSendMessage: builder.query<SendMessageSingleResponse, string>({
      query: (id) => ({
        url: `/send-message/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.sendMessages],
    }),

    // ✅ DELETE
    deleteSendMessage: builder.mutation<void, string>({
      query: (id) => ({
        url: `${SEND_MESSAGE_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.sendMessages],
    }),

    // ✅ REPLY MESSAGE
    replySendMessage: builder.mutation<
      { message: string },
      { id: string; subject: string; message: string }
    >({
      query: ({ id, subject, message }) => ({
        url: `${SEND_MESSAGE_URL}/reply/${id}`,
        method: "POST",
        data: { subject, message }, // axios baseApi uses data
      }),
      invalidatesTags: [tagTypes.sendMessages],
    }),
  }),
});

export const {
  useGetAllSendMessagesQuery,
  useGetSingleSendMessageQuery,
  useDeleteSendMessageMutation,
  useReplySendMessageMutation,
} = sendMessageApi;
