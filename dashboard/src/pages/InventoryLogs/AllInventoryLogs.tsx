// src/pages/InventoryLogs/AllInventoryLogs.tsx
import React, { useState } from "react";
import Swal from "sweetalert2";
import {
  Plus,
  Eye,
  Trash2,
  Package,
  TrendingUp,
  TrendingDown,
  RefreshCw,
  AlertCircle,
} from "lucide-react";
import { Link } from "react-router";
import { format } from "date-fns";
import { useDebounce } from "../../utils/useDebounce";
import {
  useGetAllInventoryLogsQuery,
  useDeleteInventoryLogMutation,
  InventoryLogType,
} from "../../redux/api/inventoryLogApi";
import type { ApiError } from "../../types/authType";
import Pagination from "../../utils/Pagination";
import type { IInventoryLog } from "../../redux/api/inventoryLogApi";

const LIMIT = 10;

const TYPE_COLORS: Record<InventoryLogType, string> = {
  [InventoryLogType.PURCHASE]: "bg-green-500/20 text-green-400",
  [InventoryLogType.SALE]: "bg-red-500/20 text-red-400",
  [InventoryLogType.RETURN]: "bg-yellow-500/20 text-yellow-400",
  [InventoryLogType.ADJUSTMENT]: "bg-blue-500/20 text-blue-400",
};

const TYPE_ICONS: Record<InventoryLogType, React.ReactNode> = {
  [InventoryLogType.PURCHASE]: <TrendingUp size={14} />,
  [InventoryLogType.SALE]: <TrendingDown size={14} />,
  [InventoryLogType.RETURN]: <RefreshCw size={14} />,
  [InventoryLogType.ADJUSTMENT]: <AlertCircle size={14} />,
};

const AllInventoryLogs: React.FC = () => {
  const [searchValue, setSearchValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [filterType, setFilterType] = useState<InventoryLogType | "">("");
  const [filterVariant, setFilterVariant] = useState("");
  const debouncedSearch = useDebounce(searchValue, 500);

  const { data, error, isLoading, refetch, isFetching } =
    useGetAllInventoryLogsQuery({
      search: debouncedSearch,
      page: currentPage,
      limit: LIMIT,
      type: filterType || undefined,
      product_variant_id: filterVariant || undefined,
    });

  const [deleteLog] = useDeleteInventoryLogMutation();

  const logs: IInventoryLog[] = data?.data || [];
  const totalPages = data?.meta?.totalPages ?? 1;
  const totalItems = data?.meta?.total ?? 0;

  const handleDeleteLog = async (log: IInventoryLog) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: `Delete this inventory log?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
      });

      if (!result.isConfirmed) return;

      await deleteLog(log.id).unwrap();

      await Swal.fire({
        icon: "success",
        title: "Deleted!",
        text: "Inventory log has been deleted.",
        timer: 1500,
        showConfirmButton: false,
      });

      refetch();
    } catch (err: unknown) {
      const error = err as ApiError;
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: error?.data?.message || "Delete failed",
      });
    }
  };

  const getQuantityDisplay = (log: IInventoryLog) => {
    const isPositive =
      log.type === InventoryLogType.PURCHASE ||
      log.type === InventoryLogType.RETURN;
    return (
      <span className={isPositive ? "text-green-400" : "text-red-400"}>
        {isPositive ? "+" : "-"}
        {log.quantity}
      </span>
    );
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
            Failed to load inventory logs
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
            <h1 className="text-xl font-semibold">Inventory Logs</h1>
            <p className="text-sm text-gray-400">
              Track all inventory movements
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
            <div className="flex flex-wrap gap-2">
              <input
                type="text"
                placeholder="Search..."
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                className="w-full sm:w-40 px-3 py-2 rounded-md border border-gray-base bg-black-base focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <select
                value={filterType}
                onChange={(e) =>
                  setFilterType(e.target.value as InventoryLogType | "")
                }
                className="px-3 py-2 rounded-md border border-gray-base bg-black-base focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Types</option>
                {Object.values(InventoryLogType).map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
              <input
                type="text"
                placeholder="Variant ID"
                value={filterVariant}
                onChange={(e) => setFilterVariant(e.target.value)}
                className="w-full sm:w-40 px-3 py-2 rounded-md border border-gray-base bg-black-base focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              />
            </div>
            <Link to="/add-inventory-log">
              <button className="flex items-center justify-center gap-2 px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white transition">
                <Plus size={16} /> Add Log
              </button>
            </Link>
          </div>
        </div>

        {/* TABLE */}
        <table className="w-full min-w-160 sm:min-w-full">
          <thead>
            <tr className="bg-black-solid">
              <th className="py-1 px-4 sm:py-2.5 sm:px-5 text-left border-b border-gray-base font-semibold text-sm">
                #
              </th>
              <th className="py-1 px-4 sm:py-1.5 sm:px-5 text-left border-l border-b border-gray-base font-semibold text-sm">
                Product
              </th>
              <th className="py-1 px-4 sm:py-1.5 sm:px-5 text-left border-l border-b border-gray-base font-semibold text-sm">
                Type
              </th>
              <th className="py-1 px-4 sm:py-1.5 sm:px-5 text-left border-l border-b border-gray-base font-semibold text-sm">
                Quantity
              </th>
              <th className="py-1 px-4 sm:py-1.5 sm:px-5 text-left border-l border-b border-gray-base font-semibold text-sm">
                Reference
              </th>
              <th className="py-1 px-4 sm:py-1.5 sm:px-5 text-left border-l border-b border-gray-base font-semibold text-sm">
                Remarks
              </th>
              <th className="py-1 px-4 sm:py-1.5 sm:px-5 text-left border-l border-b border-gray-base font-semibold text-sm">
                Date
              </th>
              <th className="py-1 px-4 sm:py-1.5 sm:px-5 text-left border-l border-b border-gray-base font-semibold text-sm">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {logs.length > 0 ? (
              logs.map((log, index) => (
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
                        {log.productVariant?.product?.name || "Unknown"}
                      </div>
                      <div className="text-xs text-gray-500">
                        {log.productVariant?.strength || ""}
                        {log.productVariant?.pack_size
                          ? `, ${log.productVariant.pack_size}`
                          : ""}
                      </div>
                      <div className="text-xs text-gray-500 font-mono">
                        SKU: {log.productVariant?.sku || "N/A"}
                      </div>
                    </div>
                  </td>
                  <td className="py-1 px-4 sm:py-1.5 sm:px-5 border-l border-b border-gray-base">
                    <span
                      className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${TYPE_COLORS[log.type]}`}
                    >
                      {TYPE_ICONS[log.type]}
                      {log.type}
                    </span>
                  </td>
                  <td className="py-1 px-4 sm:py-1.5 sm:px-5 border-l border-b border-gray-base font-bold">
                    {getQuantityDisplay(log)}
                  </td>
                  <td className="py-1 px-4 sm:py-1.5 sm:px-5 border-l border-b border-gray-base">
                    <span className="font-mono text-xs">
                      {log.reference_id}
                    </span>
                  </td>
                  <td className="py-1 px-4 sm:py-1.5 sm:px-5 border-l border-b border-gray-base">
                    <div className="max-w-[150px] truncate text-sm text-gray-300">
                      {log.remarks || "—"}
                    </div>
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
                    <div className="flex gap-2">
                      <Link to={`/inventory-log/${log.id}`}>
                        <button
                          className="p-2 cursor-pointer rounded-md hover:bg-gray-800"
                          title="View Details"
                        >
                          <Eye size={16} />
                        </button>
                      </Link>
                      <button
                        onClick={() => handleDeleteLog(log)}
                        className="flex cursor-pointer gap-2 w-fit p-2 text-red-500 hover:text-red-600 rounded text-sm"
                        title="Delete Log"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={8} className="py-8 text-center">
                  <div className="inline-block bg-black-solid px-6 py-4 rounded-2xl">
                    <Package size={48} className="text-gray-400 mx-auto mb-3" />
                    <span className="text-gray-500 text-sm font-medium">
                      No Inventory Logs Found
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

export default AllInventoryLogs;
