import type { ApiResponse } from "../../types/districtsType";
import type { Division, DivisionQueryParams } from "../../types/divisionsType";
import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

const DIVISIONS_URL = "/divisions";

export const divisionsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllDivisions: builder.query<
      ApiResponse<Division[]>,
      DivisionQueryParams | void
    >({
      query: (params) => ({
        url: DIVISIONS_URL,
        method: "GET",
        params,
      }),
      providesTags: [tagTypes.divisions],
    }),
  }),
});

export const { useGetAllDivisionsQuery } = divisionsApi;
