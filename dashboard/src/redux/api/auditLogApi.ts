/* eslint-disable @typescript-eslint/no-explicit-any */
// src/redux/api/auditLogApi.ts
import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

const AUDIT_LOGS_URL = "/audit-logs";

// ==========================================
// TYPE DEFINITIONS
// ==========================================

export enum AuditAction {
  CREATE = "CREATE",
  UPDATE = "UPDATE",
  DELETE = "DELETE",
  SOFT_DELETE = "SOFT_DELETE",
  RESTORE = "RESTORE",
  LOGIN = "LOGIN",
  LOGOUT = "LOGOUT",
  REGISTER = "REGISTER",
  APPROVE = "APPROVE",
  REJECT = "REJECT",
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
  EXPORT = "EXPORT",
  IMPORT = "IMPORT",
  BULK_OPERATION = "BULK_OPERATION",
}

export enum AuditEntityType {
  USER = "USER",
  PRODUCT = "PRODUCT",
  CATEGORY = "CATEGORY",
  ORDER = "ORDER",
  PAYMENT = "PAYMENT",
  REVIEW = "REVIEW",
  COUPON = "COUPON",
  COUPON_USAGE = "COUPON_USAGE",
  PRESCRIPTION = "PRESCRIPTION",
  BANNER = "BANNER",
  SLIDER = "SLIDER",
  ADDRESS = "ADDRESS",
  CART = "CART",
  WISHLIST = "WISHLIST",
  SETTINGS = "SETTINGS",
}

export interface IAuditLog {
  id: string;
  user_id?: string;
  action: AuditAction;
  entity_name: AuditEntityType;
  entity_id?: string;
  old_data?: any;
  new_data?: any;
  changes?: {
    field: string;
    old_value: any;
    new_value: any;
  }[];
  ip_address?: string;
  user_agent?: string;
  metadata?: any;
  user?: {
    id: string;
    name: string;
    email: string;
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

// Filter DTO
export interface IAuditLogFilter {
  page?: number;
  limit?: number;
  search?: string;
  sort_by?: string;
  sort_order?: "ASC" | "DESC";
  user_id?: string;
  action?: AuditAction;
  entity_name?: AuditEntityType;
  entity_id?: string;
  from_date?: string;
  to_date?: string;
}

// Stats Response
export interface IAuditLogStats {
  totalLogs: number;
  actions: {
    [key: string]: number;
  };
  entities: {
    [key: string]: number;
  };
  dailyActivity: {
    date: string;
    count: number;
  }[];
}

// ==========================================
// API ENDPOINTS
// ==========================================

export const auditLogApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // ===== GET ALL AUDIT LOGS =====
    getAllAuditLogs: build.query<
      IApiResponse<IAuditLog[]>,
      IAuditLogFilter | void
    >({
      query: (params) => ({
        url: AUDIT_LOGS_URL,
        method: "GET",
        params,
      }),
      providesTags: [tagTypes.auditLogs],
    }),

    // ===== GET USER AUDIT LOGS =====
    getUserAuditLogs: build.query<
      IApiResponse<IAuditLog[]>,
      { userId: string; params?: IAuditLogFilter }
    >({
      query: ({ userId, params }) => ({
        url: `${AUDIT_LOGS_URL}/user/${userId}`,
        method: "GET",
        params,
      }),
      providesTags: [tagTypes.auditLogs],
    }),

    // ===== GET ENTITY AUDIT LOGS =====
    getEntityAuditLogs: build.query<
      IApiResponse<IAuditLog[]>,
      {
        entityName: AuditEntityType;
        entityId: string;
        params?: IAuditLogFilter;
      }
    >({
      query: ({ entityName, entityId, params }) => ({
        url: `${AUDIT_LOGS_URL}/entity/${entityName}/${entityId}`,
        method: "GET",
        params,
      }),
      providesTags: [tagTypes.auditLogs],
    }),

    // ===== GET AUDIT LOG STATS =====
    getAuditLogStats: build.query<IApiResponse<IAuditLogStats>, void>({
      query: () => ({
        url: `${AUDIT_LOGS_URL}/stats`,
        method: "GET",
      }),
      providesTags: [tagTypes.auditLogs],
    }),

    // ===== GET SINGLE AUDIT LOG =====
    getSingleAuditLog: build.query<IApiResponse<IAuditLog>, string>({
      query: (id) => ({
        url: `${AUDIT_LOGS_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.auditLogs],
    }),

    // ===== CREATE AUDIT LOG =====
    createAuditLog: build.mutation<IApiResponse<IAuditLog>, Partial<IAuditLog>>(
      {
        query: (data) => ({
          url: AUDIT_LOGS_URL,
          method: "POST",
          data,
        }),
        invalidatesTags: [tagTypes.auditLogs],
      },
    ),

    // ===== CLEANUP OLD AUDIT LOGS =====
    cleanupAuditLogs: build.mutation<
      IApiResponse<{ deletedCount: number }>,
      number
    >({
      query: (days) => ({
        url: `${AUDIT_LOGS_URL}/cleanup/${days}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.auditLogs],
    }),
  }),
});

export const {
  useGetAllAuditLogsQuery,
  useGetUserAuditLogsQuery,
  useGetEntityAuditLogsQuery,
  useGetAuditLogStatsQuery,
  useGetSingleAuditLogQuery,
  useCreateAuditLogMutation,
  useCleanupAuditLogsMutation,
} = auditLogApi;
