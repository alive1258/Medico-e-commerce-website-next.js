// src/redux/api/addressApi.ts
import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

const ADDRESSES_URL = "/addresses";

// ==========================================
// TYPE DEFINITIONS
// ==========================================

export interface IAddress {
  id: string;
  user_id: string;
  full_name?: string;
  phone: string;
  email?: string;
  division?: string;
  district?: string;
  area?: string;
  city?: string;
  state?: string;
  zip?: string;
  country?: string;
  address: string;
  is_default: boolean;
  user?: {
    id: string;
    name: string;
    email: string;
  };
  created_at: string;
  updated_at: string;
}

export interface IMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface ILinks {
  first: string;
  last: string;
  current: string;
  next: string;
  previous: string;
}

// Global API Wrapper Type Definition matching your backend structure
export interface IApiResponse<T> {
  apiVersion?: string;
  success: boolean;
  message: string;
  status?: number;
  meta?: IMeta;
  links?: ILinks;
  data: T;
}

// ==========================================
// API ENDPOINTS
// ==========================================

export const addressApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // ===== CREATE ADDRESS =====
    createAddress: build.mutation<IApiResponse<IAddress>, Partial<IAddress>>({
      query: (data) => ({
        url: `${ADDRESSES_URL}/create`,
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.addresses],
    }),

    // ===== GET ALL ADDRESSES =====
    getAllAddresses: build.query<
      IApiResponse<IAddress[]>,
      Record<string, unknown> | undefined
    >({
      query: (arg) => ({
        url: ADDRESSES_URL,
        method: "GET",
        params: arg,
      }),
      providesTags: [tagTypes.addresses],
    }),

    // ===== GET SINGLE ADDRESS =====
    getSingleAddress: build.query<IApiResponse<IAddress>, string>({
      query: (id) => ({
        url: `${ADDRESSES_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.addresses],
    }),

    // ===== UPDATE ADDRESS =====
    updateAddress: build.mutation<
      IApiResponse<IAddress>,
      { id: string; data: Partial<IAddress> }
    >({
      query: ({ id, data }) => ({
        url: `${ADDRESSES_URL}/${id}`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: [tagTypes.addresses],
    }),

    // ===== DELETE ADDRESS =====
    deleteAddress: build.mutation<IApiResponse<IAddress>, string>({
      query: (id) => ({
        url: `${ADDRESSES_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.addresses],
    }),
  }),
});

export const {
  useCreateAddressMutation,
  useGetAllAddressesQuery,
  useGetSingleAddressQuery,
  useUpdateAddressMutation,
  useDeleteAddressMutation,
} = addressApi;
