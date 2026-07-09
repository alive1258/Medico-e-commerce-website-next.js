// src/pages/OrderTracking/OrderTrackingHistory.tsx
import React, { useState } from "react";
import Swal from "sweetalert2";
import {
  Package,
  Search,
  Calendar,
  Filter,
  RefreshCw,
  Eye,
} from "lucide-react";
import { Link } from "react-router";
import { format } from "date-fns";
import { useDebounce } from "../../utils/useDebounce";
import {
  useGetOrderTrackingHistoryQuery,
  OrderStatusEnum,
  type IOrderTracking,
} from "../../redux/api/orderTrackingApi";
import type { ApiError } from "../../types/authType";
import Pagination from "../../utils/Pagination";

const LIMIT = 10;

const STATUS_COLORS: Record<OrderStatusEnum, string> = {
  [OrderStatusEnum.PENDING]: "bg-yellow-500/20 text-yellow-400",
  [OrderStatusEnum.CONFIRMED]: "bg-blue-500/20 text-blue-400",
  [OrderStatusEnum.PROCESSING]: "bg-purple-500/20 text-purple-400",
  [OrderStatusEnum.SHIPPED]: "bg-indigo-500/20 text-indigo-400",
  [OrderStatusEnum.OUT_FOR_DELIVERY]: "bg-orange-500/20 text-orange-400",
  [OrderStatusEnum.DELIVERED]: "bg-green-500/20 text-green-400",
  [OrderStatusEnum.CANCELLED]: "bg-red-500/20 text-red-400",
  [OrderStatusEnum.RETURNED]: "bg-pink-500/20 text-pink-400",
  [OrderStatusEnum.REFUNDED]: "bg-gray-500/20 text-gray-400",
};

const STATUS_BADGE_STYLES: Record<OrderStatusEnum, string> = {
  [OrderStatusEnum.PENDING]: "border-yellow-500/30",
  [OrderStatusEnum.CONFIRMED]: "border-blue-500/30",
  [OrderStatusEnum.PROCESSING]: "border-purple-500/30",
  [OrderStatusEnum.SHIPPED]: "border-indigo-500/30",
  [OrderStatusEnum.OUT_FOR_DELIVERY]: "border-orange-500/30",
  [OrderStatusEnum.DELIVERED]: "border-green-500/30",
  [OrderStatusEnum.CANCELLED]: "border-red-500/30",
  [OrderStatusEnum.RETURNED]: "border-pink-500/30",
  [OrderStatusEnum.REFUNDED]: "border-gray-500/30",
};

const OrderTrackingHistory: React.FC = () => {
  const [searchValue, setSearchValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [filterStatus, setFilterStatus] = useState<OrderStatusEnum | "">("");
  const [filterOrderId, setFilterOrderId] = useState("");
  const [dateRange, setDateRange] = useState({ start: "", end: "" });
  const debouncedSearch = useDebounce(searchValue, 500);

  const { data, error, isLoading, refetch, isFetching } =
    useGetOrderTrackingHistoryQuery({
      search: debouncedSearch,
      page: currentPage,
      limit: LIMIT,
      status: filterStatus || undefined,
      order_id: filterOrderId || undefined,
      start_date: dateRange.start || undefined,
      end_date: dateRange.end || undefined,
    });

  const trackingHistory: IOrderTracking[] = data?.data || [];
  const totalPages = data?.meta?.totalPages ?? 1;
  const totalItems = data?.meta?.total ?? 0;

  const getStatusBadge = (status: OrderStatusEnum) => {
    return (
      <span
        className={`px-3 py-1 rounded-full text-xs font-medium border ${STATUS_COLORS[status]} ${STATUS_BADGE_STYLES[status]}`}
      >
        {status.replace(/_/g, " ").toUpperCase()}
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
            Failed to load tracking history
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
            <h1 className="text-xl font-semibold">Order Tracking History</h1>
            <p className="text-sm text-gray-400">
              Track all order status changes
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
            <div className="flex flex-wrap gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  className="pl-9 w-full sm:w-40 px-3 py-2 rounded-md border border-gray-base bg-black-base focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <select
                value={filterStatus}
                onChange={(e) =>
                  setFilterStatus(e.target.value as OrderStatusEnum | "")
                }
                className="px-3 py-2 rounded-md border border-gray-base bg-black-base focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Status</option>
                {Object.values(OrderStatusEnum).map((status) => (
                  <option key={status} value={status}>
                    {status.replace(/_/g, " ").toUpperCase()}
                  </option>
                ))}
              </select>
              <input
                type="text"
                placeholder="Order ID"
                value={filterOrderId}
                onChange={(e) => setFilterOrderId(e.target.value)}
                className="w-full sm:w-40 px-3 py-2 rounded-md border border-gray-base bg-black-base focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              />
              <input
                type="date"
                placeholder="Start Date"
                value={dateRange.start}
                onChange={(e) =>
                  setDateRange({ ...dateRange, start: e.target.value })
                }
                className="px-3 py-2 rounded-md border border-gray-base bg-black-base focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              />
              <input
                type="date"
                placeholder="End Date"
                value={dateRange.end}
                onChange={(e) =>
                  setDateRange({ ...dateRange, end: e.target.value })
                }
                className="px-3 py-2 rounded-md border border-gray-base bg-black-base focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              />
              <button
                onClick={() => refetch()}
                className="p-2 rounded-md border border-gray-base hover:bg-gray-800 transition"
                title="Refresh"
              >
                <RefreshCw size={18} />
              </button>
            </div>
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
                Order ID
              </th>
              <th className="py-1 px-4 sm:py-1.5 sm:px-5 text-left border-l border-b border-gray-base font-semibold text-sm">
                Status
              </th>
              <th className="py-1 px-4 sm:py-1.5 sm:px-5 text-left border-l border-b border-gray-base font-semibold text-sm">
                Note
              </th>
              <th className="py-1 px-4 sm:py-1.5 sm:px-5 text-left border-l border-b border-gray-base font-semibold text-sm">
                Changed By
              </th>
              <th className="py-1 px-4 sm:py-1.5 sm:px-5 text-left border-l border-b border-gray-base font-semibold text-sm">
                Date & Time
              </th>
              <th className="py-1 px-4 sm:py-1.5 sm:px-5 text-left border-l border-b border-gray-base font-semibold text-sm">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {trackingHistory.length > 0 ? (
              trackingHistory.map((track, index) => (
                <tr
                  key={track.id}
                  className={`${index % 2 !== 0 ? "bg-black-solid hover:bg-black-base" : ""}`}
                >
                  <td className="py-1 px-4 sm:py-1.5 sm:px-5 border-b border-gray-base">
                    {(currentPage - 1) * LIMIT + index + 1}
                  </td>
                  <td className="py-1 px-4 sm:py-1.5 sm:px-5 border-l border-b border-gray-base">
                    <Link to={`/orders/${track.order_id}`}>
                      <span className="font-mono text-xs text-blue-400 hover:underline">
                        {track.order_id.slice(0, 8)}...
                      </span>
                    </Link>
                  </td>
                  <td className="py-1 px-4 sm:py-1.5 sm:px-5 border-l border-b border-gray-base">
                    {getStatusBadge(track.status)}
                  </td>
                  <td className="py-1 px-4 sm:py-1.5 sm:px-5 border-l border-b border-gray-base">
                    <div className="max-w-[200px] truncate text-sm text-gray-300">
                      {track.note || "—"}
                    </div>
                  </td>
                  <td className="py-1 px-4 sm:py-1.5 sm:px-5 border-l border-b border-gray-base">
                    <div>
                      <div className="font-medium text-sm">
                        {track.user?.name || "System"}
                      </div>
                      <div className="text-xs text-gray-500">
                        {track.user?.email || ""}
                      </div>
                    </div>
                  </td>
                  <td className="py-1 px-4 sm:py-1.5 sm:px-5 border-l border-b border-gray-base">
                    <div className="text-xs">
                      <div>
                        {format(new Date(track.created_at), "MMM d, yyyy")}
                      </div>
                      <div className="text-gray-500">
                        {format(new Date(track.created_at), "h:mm a")}
                      </div>
                    </div>
                  </td>
                  <td className="py-1 px-4 sm:py-1.5 sm:px-4 border-l border-b border-gray-base">
                    <Link to={`/order-tracking/${track.order_id}`}>
                      <button
                        className="p-2 cursor-pointer rounded-md hover:bg-gray-800"
                        title="View Tracking"
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
                    <Package size={48} className="text-gray-400 mx-auto mb-3" />
                    <span className="text-gray-500 text-sm font-medium">
                      No Tracking History Found
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

export default OrderTrackingHistory;
