import { createApi } from "@reduxjs/toolkit/query/react";
import { tagTypesList } from "../tag-types";
import { axiosBaseQuery } from "../../helpers/asiosBaseQuery";

export const baseApi = createApi({
    reducerPath: "baseApi",
    baseQuery: axiosBaseQuery({ baseUrl: `${import.meta.env.VITE_PUBLIC_API_URL}` }),
    // credentials: "include", 
    endpoints: () => ({}),

    tagTypes: tagTypesList,
});
