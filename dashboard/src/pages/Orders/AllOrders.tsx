// src/pages/Orders/AllOrders.tsx
import React, { useState } from "react";
import Swal from "sweetalert2";
import {
  Plus,
  Eye,
  Trash2,
  Package,
  Search,
  RefreshCw,
  Filter,
  Edit,
  DollarSign,
  Truck,
  CheckCircle,
  XCircle,
  Clock,
} from "lucide-react";
import { Link } from "react-router";
import { format } from "date-fns";
import { useDebounce } from "../../utils/useDebounce";
import {
  useGetAllOrdersQuery,
  useDeleteOrderMutation,
  type IOrder,
} from "../../redux/api/orderApi";
import type { ApiError } from "../../types/authType";
import Pagination from "../../utils/Pagination";

const LIMIT = 10;

const ORDER_STATUS_COLORS: Record<string, string> = {
  pending: "bg-yellow-500/20 text-yellow-400",
  confirmed: "bg-blue-500/20 text-blue-400",
  processing: "bg-purple-500/20 text-purple-400",
  shipped: "bg-indigo-500/20 text-indigo-400",
  out_for_delivery: "bg-orange-500/20 text-orange-400",
  delivered: "bg-green-500/20 text-green-400",
  cancelled: "bg-red-500/20 text-red-400",
  returned: "bg-pink-500/20 text-pink-400",
  refunded: "bg-gray-500/20 text-gray-400",
};

const PAYMENT_STATUS_COLORS: Record<string, string> = {
  pending: "bg-yellow-500/20 text-yellow-400",
  paid: "bg-green-500/20 text-green-400",
  failed: "bg-red-500/20 text-red-400",
  refunded: "bg-gray-500/20 text-gray-400",
};

const AllOrders: React.FC = () => {
  const [searchValue, setSearchValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [filterStatus, setFilterStatus] = useState("");
  const [filterPaymentStatus, setFilterPaymentStatus] = useState("");
  const [dateRange, setDateRange] = useState({ start: "", end: "" });
  const debouncedSearch = useDebounce(searchValue, 500);

  const { data, error, isLoading, refetch, isFetching } = useGetAllOrdersQuery({
    search: debouncedSearch,
    page: currentPage,
    limit: LIMIT,
    order_status: filterStatus || undefined,
    payment_status: filterPaymentStatus || undefined,
    start_date: dateRange.start || undefined,
    end_date: dateRange.end || undefined,
  });

  const [deleteOrder] = useDeleteOrderMutation();

  const orders: IOrder[] = data?.data || [];
  const totalPages = data?.meta?.totalPages ?? 1;
  const totalItems = data?.meta?.total ?? 0;

  const handleDeleteOrder = async (order: IOrder) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: `Delete order #${order.order_number}?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
      });

      if (!result.isConfirmed) return;

      await deleteOrder(order.id).unwrap();

      await Swal.fire({
        icon: "success",
        title: "Deleted!",
        text: "Order has been deleted.",
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

  const getStatusBadge = (status: string, colorMap: Record<string, string>) => {
    return (
      <span
        className={`px-3 py-1 rounded-full text-xs font-medium ${colorMap[status] || "bg-gray-500/20 text-gray-400"}`}
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
            Failed to load orders
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
            <h1 className="text-xl font-semibold">Orders</h1>
            <p className="text-sm text-gray-400">Manage all customer orders</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
            <div className="flex flex-wrap gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                <input
                  type="text"
                  placeholder="Search orders..."
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  className="pl-9 w-full sm:w-40 px-3 py-2 rounded-md border border-gray-base bg-black-base focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-3 py-2 rounded-md border border-gray-base bg-black-base focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Status</option>
                <option value="pending">Pending</option>
                <option value="confirmed">Confirmed</option>
                <option value="processing">Processing</option>
                <option value="shipped">Shipped</option>
                <option value="out_for_delivery">Out for Delivery</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
                <option value="returned">Returned</option>
                <option value="refunded">Refunded</option>
              </select>
              <select
                value={filterPaymentStatus}
                onChange={(e) => setFilterPaymentStatus(e.target.value)}
                className="px-3 py-2 rounded-md border border-gray-base bg-black-base focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Payment</option>
                <option value="pending">Pending</option>
                <option value="paid">Paid</option>
                <option value="failed">Failed</option>
                <option value="refunded">Refunded</option>
              </select>
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
            <Link to="/add-order">
              <button className="flex items-center justify-center gap-2 px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white transition">
                <Plus size={16} /> Create Order
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
                Order #
              </th>
              <th className="py-1 px-4 sm:py-1.5 sm:px-5 text-left border-l border-b border-gray-base font-semibold text-sm">
                Customer
              </th>
              <th className="py-1 px-4 sm:py-1.5 sm:px-5 text-left border-l border-b border-gray-base font-semibold text-sm">
                Payment
              </th>
              <th className="py-1 px-4 sm:py-1.5 sm:px-5 text-left border-l border-b border-gray-base font-semibold text-sm">
                Status
              </th>
              <th className="py-1 px-4 sm:py-1.5 sm:px-5 text-left border-l border-b border-gray-base font-semibold text-sm">
                Total
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
            {orders.length > 0 ? (
              orders.map((order, index) => (
                <tr
                  key={order.id}
                  className={`${index % 2 !== 0 ? "bg-black-solid hover:bg-black-base" : ""}`}
                >
                  <td className="py-1 px-4 sm:py-1.5 sm:px-5 border-b border-gray-base">
                    {(currentPage - 1) * LIMIT + index + 1}
                  </td>
                  <td className="py-1 px-4 sm:py-1.5 sm:px-5 border-l border-b border-gray-base">
                    <Link to={`/orders/${order.id}`}>
                      <span className="font-mono text-sm text-blue-400 hover:underline">
                        #{order.order_number}
                      </span>
                    </Link>
                  </td>
                  <td className="py-1 px-4 sm:py-1.5 sm:px-5 border-l border-b border-gray-base">
                    <div>
                      <div className="font-medium">
                        {order.user?.name || "N/A"}
                      </div>
                      <div className="text-xs text-gray-500">
                        {order.user?.email || ""}
                      </div>
                    </div>
                  </td>
                  <td className="py-1 px-4 sm:py-1.5 sm:px-5 border-l border-b border-gray-base">
                    <div className="space-y-1">
                      <div>
                        {getStatusBadge(
                          order.payment_status,
                          PAYMENT_STATUS_COLORS,
                        )}
                      </div>
                      <div className="text-xs text-gray-500">
                        {order.payment_method}
                      </div>
                    </div>
                  </td>
                  <td className="py-1 px-4 sm:py-1.5 sm:px-5 border-l border-b border-gray-base">
                    {getStatusBadge(order.order_status, ORDER_STATUS_COLORS)}
                  </td>
                  <td className="py-1 px-4 sm:py-1.5 sm:px-5 border-l border-b border-gray-base font-bold">
                    ${Number(order.total_amount).toFixed(2)}
                  </td>
                  <td className="py-1 px-4 sm:py-1.5 sm:px-5 border-l border-b border-gray-base">
                    <div className="text-xs">
                      <div>
                        {format(new Date(order.created_at), "MMM d, yyyy")}
                      </div>
                      <div className="text-gray-500">
                        {format(new Date(order.created_at), "h:mm a")}
                      </div>
                    </div>
                  </td>
                  <td className="py-1 px-4 sm:py-1.5 sm:px-4 border-l border-b border-gray-base">
                    <div className="flex gap-2">
                      <Link to={`/orders/${order.id}`}>
                        <button
                          className="p-2 cursor-pointer rounded-md hover:bg-gray-800"
                          title="View Details"
                        >
                          <Eye size={16} />
                        </button>
                      </Link>
                      <Link to={`/edit-order/${order.id}`}>
                        <button
                          className="p-2 cursor-pointer rounded-md hover:bg-gray-800"
                          title="Edit"
                        >
                          <Edit size={16} />
                        </button>
                      </Link>
                      <button
                        onClick={() => handleDeleteOrder(order)}
                        className="flex cursor-pointer gap-2 w-fit p-2 text-red-500 hover:text-red-600 rounded text-sm"
                        title="Delete"
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
                      No Orders Found
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

export default AllOrders;
