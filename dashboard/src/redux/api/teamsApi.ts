import type { ApiResponse } from "../../types/axios";
import type { PaginationQuery } from "../../types/category.types";
import { baseApi } from "./baseApi";
import { tagTypes } from "../tag-types";
import type { Team, TeamPaginatedResponse, UpdateTeamRequest } from "../../types/team.types";

const TEAM_URL = "/teams";

export const teamsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // ✅ CREATE
    createTeam: builder.mutation<ApiResponse<Team>, FormData>({
      query: (formData) => ({
        url: `${TEAM_URL}/create`,
        method: "POST",
        data: formData,
        contentType: true,
      }),
      invalidatesTags: [tagTypes.testimonials], 
    }),

    // ✅ GET ALL (PAGINATION)
    getAllTeams: builder.query<TeamPaginatedResponse, PaginationQuery>({
      query: (params) => ({
        url: TEAM_URL,
        method: "GET",
        params,
      }),
      providesTags: [tagTypes.testimonials],
    }),

    // ✅ GET SINGLE
    getSingleTeam: builder.query<ApiResponse<Team>, string>({
      query: (id) => ({
        url: `${TEAM_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.testimonials],
    }),

    // ✅ UPDATE
    updateTeam: builder.mutation<ApiResponse<Team>, UpdateTeamRequest>({
      query: ({ id, data }) => ({
        url: `${TEAM_URL}/${id}`,
        method: "PATCH",
        data,
        contentType: true,
      }),
      invalidatesTags: [tagTypes.testimonials],
    }),

    // ✅ DELETE (SOFT DELETE)
    deleteTeam: builder.mutation<ApiResponse<void>, string>({
      query: (id) => ({
        url: `${TEAM_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.testimonials],
    }),
  }),
});

export const {
  useCreateTeamMutation,
  useGetAllTeamsQuery,
  useGetSingleTeamQuery,
  useUpdateTeamMutation,
  useDeleteTeamMutation,
} = teamsApi;