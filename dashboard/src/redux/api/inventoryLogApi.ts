// src/redux/api/inventoryLogApi.ts
import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

const INVENTORY_LOGS_URL = "/inventory-logs";

// ==========================================
// TYPE DEFINITIONS
// ==========================================

export enum InventoryLogType {
  PURCHASE = "PURCHASE",
  SALE = "SALE",
  RETURN = "RETURN",
  ADJUSTMENT = "ADJUSTMENT",
}

export interface IInventoryLog {
  id: string;
  product_variant_id: string;
  type: InventoryLogType;
  quantity: number;
  reference_id: string;
  remarks?: string;
  productVariant?: {
    id: string;
    strength: string;
    pack_size: string;
    sku: string;
    price: number;
    discount_price?: number;
    product?: {
      id: string;
      name: string;
      slug: string;
    };
  };
  created_at: string;
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
// API ENDPOINTS
// ==========================================

export const inventoryLogApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // ===== CREATE INVENTORY LOG =====
    createInventoryLog: build.mutation<
      IApiResponse<IInventoryLog>,
      {
        product_variant_id: string;
        type: InventoryLogType;
        quantity: number;
        reference_id: string;
        remarks?: string;
      }
    >({
      query: (data) => ({
        url: INVENTORY_LOGS_URL,
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.inventoryLogs, tagTypes.variants],
    }),

    // ===== GET ALL INVENTORY LOGS =====
    getAllInventoryLogs: build.query<
      IApiResponse<IInventoryLog[]>,
      Record<string, unknown> | undefined
    >({
      query: (params) => ({
        url: INVENTORY_LOGS_URL,
        method: "GET",
        params,
      }),
      providesTags: [tagTypes.inventoryLogs],
    }),

    // ===== GET SINGLE INVENTORY LOG =====
    getSingleInventoryLog: build.query<IApiResponse<IInventoryLog>, string>({
      query: (id) => ({
        url: `${INVENTORY_LOGS_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.inventoryLogs],
    }),

    // ===== UPDATE INVENTORY LOG =====
    updateInventoryLog: build.mutation<
      IApiResponse<IInventoryLog>,
      { id: string; data: Partial<IInventoryLog> }
    >({
      query: ({ id, data }) => ({
        url: `${INVENTORY_LOGS_URL}/${id}`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: [tagTypes.inventoryLogs, tagTypes.variants],
    }),

    // ===== DELETE INVENTORY LOG =====
    deleteInventoryLog: build.mutation<IApiResponse<IInventoryLog>, string>({
      query: (id) => ({
        url: `${INVENTORY_LOGS_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.inventoryLogs, tagTypes.variants],
    }),
  }),
});

export const {
  useCreateInventoryLogMutation,
  useGetAllInventoryLogsQuery,
  useGetSingleInventoryLogQuery,
  useUpdateInventoryLogMutation,
  useDeleteInventoryLogMutation,
} = inventoryLogApi;
