// src/redux/api/prescriptionApi.ts
import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

const PRESCRIPTIONS_URL = "/prescriptions";

// ==========================================
// TYPE DEFINITIONS
// ==========================================

export enum PrescriptionStatus {
  PENDING = "PENDING",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
}

export interface ICreatePrescription {
  image_url: string;
  admin_note?: string;
  status?: PrescriptionStatus;
}

export interface IUpdatePrescription {
  image_url?: string;
  admin_note?: string;
  status?: PrescriptionStatus;
}

export interface IPrescription {
  id: string;
  user_id: string;
  image_url: string;
  status: PrescriptionStatus;
  admin_note?: string;
  created_at: string;
  updated_at: string;
  user?: {
    id: string;
    name?: string;
    email: string;
  };
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
// QUERY PARAMS INTERFACE
// ==========================================

export interface IPrescriptionFilterParams {
  page?: number;
  limit?: number;
  search?: string;
  status?: PrescriptionStatus;
  user_id?: string;
  from_date?: string;
  to_date?: string;
}

// ==========================================
// API ENDPOINTS
// ==========================================

export const prescriptionApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // ===== CREATE PRESCRIPTION =====
    createPrescription: build.mutation<
      IApiResponse<IPrescription>,
      ICreatePrescription
    >({
      query: (data) => ({
        url: PRESCRIPTIONS_URL,
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.prescriptions],
    }),

    // ===== GET ALL PRESCRIPTIONS =====
    getAllPrescriptions: build.query<
      IApiResponse<IPrescription[]>,
      IPrescriptionFilterParams | undefined
    >({
      query: (params) => ({
        url: PRESCRIPTIONS_URL,
        method: "GET",
        params,
      }),
      providesTags: [tagTypes.prescriptions],
    }),

    // ===== GET SINGLE PRESCRIPTION =====
    getSinglePrescription: build.query<IApiResponse<IPrescription>, string>({
      query: (id) => ({
        url: `${PRESCRIPTIONS_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.prescriptions],
    }),

    // ===== UPDATE PRESCRIPTION =====
    updatePrescription: build.mutation<
      IApiResponse<IPrescription>,
      { id: string; data: IUpdatePrescription }
    >({
      query: ({ id, data }) => ({
        url: `${PRESCRIPTIONS_URL}/${id}`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: [tagTypes.prescriptions],
    }),

    // ===== APPROVE PRESCRIPTION =====
    approvePrescription: build.mutation<IApiResponse<IPrescription>, string>({
      query: (id) => ({
        url: `${PRESCRIPTIONS_URL}/${id}/approve`,
        method: "PATCH",
      }),
      invalidatesTags: [tagTypes.prescriptions],
    }),

    // ===== REJECT PRESCRIPTION =====
    rejectPrescription: build.mutation<
      IApiResponse<IPrescription>,
      { id: string; admin_note?: string }
    >({
      query: ({ id, admin_note }) => ({
        url: `${PRESCRIPTIONS_URL}/${id}/reject`,
        method: "PATCH",
        data: { admin_note },
      }),
      invalidatesTags: [tagTypes.prescriptions],
    }),

    // ===== DELETE PRESCRIPTION =====
    deletePrescription: build.mutation<IApiResponse<IPrescription>, string>({
      query: (id) => ({
        url: `${PRESCRIPTIONS_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.prescriptions],
    }),
  }),
});

export const {
  useCreatePrescriptionMutation,
  useGetAllPrescriptionsQuery,
  useGetSinglePrescriptionQuery,
  useUpdatePrescriptionMutation,
  useApprovePrescriptionMutation,
  useRejectPrescriptionMutation,
  useDeletePrescriptionMutation,
} = prescriptionApi;
