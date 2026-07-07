// src/pages/audit-logs/AllAuditLogs.tsx
import React, { useState } from "react";
import { format } from "date-fns";
import { Eye, RefreshCw, Filter, Trash2 } from "lucide-react";
import Swal from "sweetalert2";
import { Link } from "react-router";
import { useDebounce } from "../../utils/useDebounce";
import {
  useGetAllAuditLogsQuery,
  useCleanupAuditLogsMutation,
  AuditAction,
  AuditEntityType,
} from "../../redux/api/auditLogApi";
import type { ApiError } from "../../types/authType";
import Pagination from "../../utils/Pagination";
import type { IAuditLog } from "../../redux/api/auditLogApi";

const LIMIT = 10;

// Action color mapping
const ACTION_COLORS: Record<AuditAction, string> = {
  [AuditAction.CREATE]: "bg-green-500/20 text-green-400",
  [AuditAction.UPDATE]: "bg-blue-500/20 text-blue-400",
  [AuditAction.DELETE]: "bg-red-500/20 text-red-400",
  [AuditAction.SOFT_DELETE]: "bg-orange-500/20 text-orange-400",
  [AuditAction.RESTORE]: "bg-purple-500/20 text-purple-400",
  [AuditAction.LOGIN]: "bg-cyan-500/20 text-cyan-400",
  [AuditAction.LOGOUT]: "bg-gray-500/20 text-gray-400",
  [AuditAction.REGISTER]: "bg-emerald-500/20 text-emerald-400",
  [AuditAction.APPROVE]: "bg-green-500/20 text-green-400",
  [AuditAction.REJECT]: "bg-red-500/20 text-red-400",
  [AuditAction.ACTIVE]: "bg-green-500/20 text-green-400",
  [AuditAction.INACTIVE]: "bg-gray-500/20 text-gray-400",
  [AuditAction.EXPORT]: "bg-indigo-500/20 text-indigo-400",
  [AuditAction.IMPORT]: "bg-yellow-500/20 text-yellow-400",
  [AuditAction.BULK_OPERATION]: "bg-pink-500/20 text-pink-400",
};

const AllAuditLogs: React.FC = () => {
  const [searchValue, setSearchValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedAction, setSelectedAction] = useState<AuditAction | "">("");
  const [selectedEntity, setSelectedEntity] = useState<AuditEntityType | "">(
    "",
  );
  const [showFilters, setShowFilters] = useState(false);
  const debouncedSearch = useDebounce(searchValue, 500);

  const { data, error, isLoading, refetch, isFetching } =
    useGetAllAuditLogsQuery({
      search: debouncedSearch,
      page: currentPage,
      limit: LIMIT,
      action: selectedAction || undefined,
      entity_name: selectedEntity || undefined,
      sort_by: "created_at",
      sort_order: "DESC",
    });

  const [cleanupLogs] = useCleanupAuditLogsMutation();

  const auditLogs: IAuditLog[] = data?.data || [];
  const totalPages = data?.meta?.totalPages ?? 1;
  const totalItems = data?.meta?.total ?? 0;

  const handleCleanup = async () => {
    const result = await Swal.fire({
      title: "Cleanup Old Logs",
      text: "Enter number of days to keep (logs older than this will be deleted)",
      input: "number",
      inputValue: 90,
      inputAttributes: {
        min: "1",
        step: "1",
      },
      showCancelButton: true,
      confirmButtonText: "Cleanup",
    });

    if (result.isConfirmed && result.value) {
      try {
        const days = parseInt(result.value);
        const response = await cleanupLogs(days).unwrap();

        await Swal.fire({
          icon: "success",
          title: "Cleanup Complete",
          text: `Deleted ${response.data?.deletedCount || 0} logs`,
        });

        refetch();
      } catch (err) {
        const error = err as ApiError;
        Swal.fire({
          icon: "error",
          title: "Error!",
          text: error?.data?.message || "Cleanup failed",
        });
      }
    }
  };

  if (isLoading) {
    return (
      <div className="rounded-lg border border-gray-base p-6 space-y-3">
        {[...Array(LIMIT)].map((_, i) => (
          <div
            key={i}
            className="h-12 w-full animate-pulse rounded-md bg-neutral-800"
          />
        ))}
      </div>
    );
  }

  if (error) {
    const err = error as ApiError;
    return (
      <div className="flex h-[70vh] flex-col items-center justify-center text-center">
        <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-8 max-w-md">
          <h2 className="text-lg font-semibold text-red-400 mb-2">
            Failed to load audit logs
          </h2>
          <p className="text-sm text-gray-400 mb-4">
            {err.data?.message || "Server error. Please try again."}
          </p>
          <button
            onClick={() => refetch()}
            className="px-4 py-2 bg-red-500 hover:bg-red-600 rounded-md text-white"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-gray-base bg-black-base overflow-hidden">
      <div className="overflow-x-auto">
        {/* HEADER */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 p-4 border-b border-gray-base">
          <div>
            <h1 className="text-xl font-semibold">Audit Logs</h1>
            <p className="text-sm text-gray-400">Track all system activities</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
            <div className="relative flex-1 sm:flex-none">
              <input
                type="text"
                placeholder="Search logs..."
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                className="w-full sm:w-64 px-3 py-2 rounded-md border border-gray-base bg-black-base focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2 rounded-md border border-gray-base hover:bg-gray-800 transition"
            >
              <Filter size={16} />
              Filters
            </button>
            <button
              onClick={handleCleanup}
              className="flex items-center gap-2 px-4 py-2 rounded-md bg-red-600 hover:bg-red-700 text-white transition"
            >
              <Trash2 size={16} />
              Cleanup
            </button>
            <button
              onClick={() => refetch()}
              className="flex items-center gap-2 px-4 py-2 rounded-md border border-gray-base hover:bg-gray-800 transition"
            >
              <RefreshCw size={16} />
              Refresh
            </button>
          </div>
        </div>

        {/* FILTERS */}
        {showFilters && (
          <div className="p-4 border-b border-gray-base bg-black-solid">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  Action
                </label>
                <select
                  value={selectedAction}
                  onChange={(e) =>
                    setSelectedAction(e.target.value as AuditAction | "")
                  }
                  className="w-full px-3 py-2 rounded-md border border-gray-base bg-black-base focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">All Actions</option>
                  {Object.values(AuditAction).map((action) => (
                    <option key={action} value={action}>
                      {action}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  Entity
                </label>
                <select
                  value={selectedEntity}
                  onChange={(e) =>
                    setSelectedEntity(e.target.value as AuditEntityType | "")
                  }
                  className="w-full px-3 py-2 rounded-md border border-gray-base bg-black-base focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">All Entities</option>
                  {Object.values(AuditEntityType).map((entity) => (
                    <option key={entity} value={entity}>
                      {entity}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex items-end">
                <button
                  onClick={() => {
                    setSelectedAction("");
                    setSelectedEntity("");
                  }}
                  className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-md text-sm transition"
                >
                  Clear Filters
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TABLE */}
        <table className="w-full min-w-160 sm:min-w-full">
          <thead>
            <tr className="bg-black-solid">
              <th className="py-1 px-4 sm:py-2.5 sm:px-5 text-left border-b border-gray-base font-semibold text-sm">
                #
              </th>
              <th className="py-1 px-4 sm:py-1.5 sm:px-5 text-left border-l border-b border-gray-base font-semibold text-sm">
                User
              </th>
              <th className="py-1 px-4 sm:py-1.5 sm:px-5 text-left border-l border-b border-gray-base font-semibold text-sm">
                Action
              </th>
              <th className="py-1 px-4 sm:py-1.5 sm:px-5 text-left border-l border-b border-gray-base font-semibold text-sm">
                Entity
              </th>
              <th className="py-1 px-4 sm:py-1.5 sm:px-5 text-left border-l border-b border-gray-base font-semibold text-sm">
                Changes
              </th>
              <th className="py-1 px-4 sm:py-1.5 sm:px-5 text-left border-l border-b border-gray-base font-semibold text-sm">
                Time
              </th>
              <th className="py-1 px-4 sm:py-1.5 sm:px-5 text-left border-l border-b border-gray-base font-semibold text-sm">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {auditLogs.length > 0 ? (
              auditLogs.map((log, index) => (
                <tr
                  key={log.id}
                  className={`${index % 2 !== 0 ? "bg-black-solid hover:bg-black-base" : ""}`}
                >
                  <td className="py-1 px-4 sm:py-1.5 sm:px-5 border-b border-gray-base">
                    {(currentPage - 1) * LIMIT + index + 1}
                  </td>
                  <td className="py-1 px-4 sm:py-1.5 sm:px-5 border-l border-b border-gray-base">
                    <div>
                      <div className="font-medium">
                        {log.user?.name || "System"}
                      </div>
                      <div className="text-xs text-gray-500">
                        {log.user?.email || ""}
                      </div>
                    </div>
                  </td>
                  <td className="py-1 px-4 sm:py-1.5 sm:px-5 border-l border-b border-gray-base">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${ACTION_COLORS[log.action] || "bg-gray-500/20 text-gray-400"}`}
                    >
                      {log.action}
                    </span>
                  </td>
                  <td className="py-1 px-4 sm:py-1.5 sm:px-5 border-l border-b border-gray-base">
                    <span className="text-xs font-mono">{log.entity_name}</span>
                    {log.entity_id && (
                      <div className="text-xs text-gray-500 truncate max-w-[100px]">
                        ID: {log.entity_id.substring(0, 8)}...
                      </div>
                    )}
                  </td>
                  <td className="py-1 px-4 sm:py-1.5 sm:px-5 border-l border-b border-gray-base">
                    {log.changes && log.changes.length > 0 ? (
                      <div className="max-w-[200px]">
                        {log.changes.slice(0, 2).map((change, i) => (
                          <div key={i} className="text-xs truncate">
                            <span className="font-medium">{change.field}</span>:{" "}
                            {JSON.stringify(change.new_value)}
                          </div>
                        ))}
                        {log.changes.length > 2 && (
                          <div className="text-xs text-gray-500">
                            +{log.changes.length - 2} more
                          </div>
                        )}
                      </div>
                    ) : (
                      <span className="text-xs text-gray-500">No changes</span>
                    )}
                  </td>
                  <td className="py-1 px-4 sm:py-1.5 sm:px-5 border-l border-b border-gray-base">
                    <div className="text-xs">
                      <div>
                        {format(new Date(log.created_at), "MMM d, yyyy")}
                      </div>
                      <div className="text-gray-500">
                        {format(new Date(log.created_at), "h:mm a")}
                      </div>
                    </div>
                  </td>
                  <td className="py-1 px-4 sm:py-1.5 sm:px-4 border-l border-b border-gray-base">
                    <Link to={`/audit-log/${log.id}`}>
                      <button
                        className="p-2 cursor-pointer rounded-md hover:bg-gray-800"
                        title="View Details"
                      >
                        <Eye size={16} />
                      </button>
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="py-8 text-center">
                  <div className="inline-block bg-black-solid px-6 py-4 rounded-2xl">
                    <p className="text-gray-400 text-5xl mb-3">📋</p>
                    <span className="text-gray-500 text-sm font-medium">
                      No Audit Logs Found
                    </span>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
        {/* PAGINATION */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => setCurrentPage(page)}
          totalResults={totalItems}
          limit={LIMIT}
          isFetching={isFetching}
        />
      </div>
    </div>
  );
};

export default AllAuditLogs;
