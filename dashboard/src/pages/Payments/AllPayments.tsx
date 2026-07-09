// src/pages/Payments/AllPayments.tsx
import React, { useState } from "react";
import Swal from "sweetalert2";
import {
  Eye,
  Trash2,
  Search,
  RefreshCw,
  DollarSign,
  CreditCard,
  CheckCircle,
  XCircle,
  Clock,
  AlertCircle,
  Package,
} from "lucide-react";
import { Link } from "react-router";
import { format } from "date-fns";
import { useDebounce } from "../../utils/useDebounce";
import {
  useGetAllPaymentsQuery,
  useDeletePaymentMutation,
  PaymentStatus,
  PaymentMethod,
  type IPayment,
} from "../../redux/api/paymentApi";
import type { ApiError } from "../../types/authType";
import Pagination from "../../utils/Pagination";

const LIMIT = 10;

const PAYMENT_STATUS_COLORS: Record<PaymentStatus, string> = {
  [PaymentStatus.PENDING]: "bg-yellow-500/20 text-yellow-400",
  [PaymentStatus.PAID]: "bg-green-500/20 text-green-400",
  [PaymentStatus.FAILED]: "bg-red-500/20 text-red-400",
  [PaymentStatus.REFUNDED]: "bg-purple-500/20 text-purple-400",
  [PaymentStatus.CANCELLED]: "bg-gray-500/20 text-gray-400",
};

const PAYMENT_STATUS_ICONS: Record<PaymentStatus, React.ReactNode> = {
  [PaymentStatus.PENDING]: <Clock size={14} />,
  [PaymentStatus.PAID]: <CheckCircle size={14} />,
  [PaymentStatus.FAILED]: <XCircle size={14} />,
  [PaymentStatus.REFUNDED]: <RefreshCw size={14} />,
  [PaymentStatus.CANCELLED]: <AlertCircle size={14} />,
};

const PAYMENT_METHOD_COLORS: Record<PaymentMethod, string> = {
  [PaymentMethod.COD]: "bg-blue-500/20 text-blue-400",
  [PaymentMethod.BKASH]: "bg-pink-500/20 text-pink-400",
  [PaymentMethod.NAGAD]: "bg-orange-500/20 text-orange-400",
  [PaymentMethod.ROCKET]: "bg-purple-500/20 text-purple-400",
  [PaymentMethod.SSLCOMMERZ]: "bg-green-500/20 text-green-400",
};

const AllPayments: React.FC = () => {
  const [searchValue, setSearchValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [filterStatus, setFilterStatus] = useState<PaymentStatus | "">("");
  const [filterMethod, setFilterMethod] = useState<PaymentMethod | "">("");
  const [filterOrderId, setFilterOrderId] = useState("");
  const debouncedSearch = useDebounce(searchValue, 500);

  const { data, error, isLoading, refetch, isFetching } =
    useGetAllPaymentsQuery({
      search: debouncedSearch,
      page: currentPage,
      limit: LIMIT,
      status: filterStatus || undefined,
      method: filterMethod || undefined,
      order_id: filterOrderId || undefined,
    });

  const [deletePayment] = useDeletePaymentMutation();

  const payments: IPayment[] = data?.data || [];
  const totalPages = data?.meta?.totalPages ?? 1;
  const totalItems = data?.meta?.total ?? 0;

  const handleDeletePayment = async (payment: IPayment) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: `Delete payment of $${payment.amount} for order #${payment.order?.order_number || payment.order_id}?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
      });

      if (!result.isConfirmed) return;

      await deletePayment(payment.id).unwrap();

      await Swal.fire({
        icon: "success",
        title: "Deleted!",
        text: "Payment has been deleted.",
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

  const getStatusBadge = (status: PaymentStatus) => {
    return (
      <span
        className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${PAYMENT_STATUS_COLORS[status]}`}
      >
        {PAYMENT_STATUS_ICONS[status]}
        {status.toUpperCase()}
      </span>
    );
  };

  const getMethodBadge = (method: PaymentMethod) => {
    return (
      <span
        className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${PAYMENT_METHOD_COLORS[method]}`}
      >
        <CreditCard size={14} />
        {method}
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
            Failed to load payments
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
            <h1 className="text-xl font-semibold">Payments</h1>
            <p className="text-sm text-gray-400">
              Manage all payment transactions
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
            <div className="flex flex-wrap gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                <input
                  type="text"
                  placeholder="Search payments..."
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  className="pl-9 w-full sm:w-40 px-3 py-2 rounded-md border border-gray-base bg-black-base focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <select
                value={filterStatus}
                onChange={(e) =>
                  setFilterStatus(e.target.value as PaymentStatus | "")
                }
                className="px-3 py-2 rounded-md border border-gray-base bg-black-base focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Status</option>
                {Object.values(PaymentStatus).map((status) => (
                  <option key={status} value={status}>
                    {status.toUpperCase()}
                  </option>
                ))}
              </select>
              <select
                value={filterMethod}
                onChange={(e) =>
                  setFilterMethod(e.target.value as PaymentMethod | "")
                }
                className="px-3 py-2 rounded-md border border-gray-base bg-black-base focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Methods</option>
                {Object.values(PaymentMethod).map((method) => (
                  <option key={method} value={method}>
                    {method}
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

        {/* SUMMARY CARDS */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 border-b border-gray-base">
          {Object.values(PaymentStatus).map((status) => {
            const count = payments.filter((p) => p.status === status).length;
            const total = payments
              .filter((p) => p.status === status)
              .reduce((sum, p) => sum + Number(p.amount), 0);
            return (
              <div
                key={status}
                className="bg-black-solid p-3 rounded-lg border border-gray-base"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-400">
                    {status.toUpperCase()}
                  </span>
                  <span className="text-xs font-bold">{count}</span>
                </div>
                <div className="text-sm font-semibold">${total.toFixed(2)}</div>
              </div>
            );
          })}
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
                Method
              </th>
              <th className="py-1 px-4 sm:py-1.5 sm:px-5 text-left border-l border-b border-gray-base font-semibold text-sm">
                Amount
              </th>
              <th className="py-1 px-4 sm:py-1.5 sm:px-5 text-left border-l border-b border-gray-base font-semibold text-sm">
                Status
              </th>
              <th className="py-1 px-4 sm:py-1.5 sm:px-5 text-left border-l border-b border-gray-base font-semibold text-sm">
                Transaction
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
            {payments.length > 0 ? (
              payments.map((payment, index) => (
                <tr
                  key={payment.id}
                  className={`${index % 2 !== 0 ? "bg-black-solid hover:bg-black-base" : ""}`}
                >
                  <td className="py-1 px-4 sm:py-1.5 sm:px-5 border-b border-gray-base">
                    {(currentPage - 1) * LIMIT + index + 1}
                  </td>
                  <td className="py-1 px-4 sm:py-1.5 sm:px-5 border-l border-b border-gray-base">
                    <Link to={`/orders/${payment.order_id}`}>
                      <span className="font-mono text-sm text-blue-400 hover:underline">
                        #
                        {payment.order?.order_number ||
                          payment.order_id.slice(0, 8)}
                      </span>
                    </Link>
                  </td>
                  <td className="py-1 px-4 sm:py-1.5 sm:px-5 border-l border-b border-gray-base">
                    {getMethodBadge(payment.method)}
                  </td>
                  <td className="py-1 px-4 sm:py-1.5 sm:px-5 border-l border-b border-gray-base font-bold">
                    ${Number(payment.amount).toFixed(2)}
                  </td>
                  <td className="py-1 px-4 sm:py-1.5 sm:px-5 border-l border-b border-gray-base">
                    {getStatusBadge(payment.status)}
                  </td>
                  <td className="py-1 px-4 sm:py-1.5 sm:px-5 border-l border-b border-gray-base">
                    <div className="text-xs">
                      {payment.transaction_id ? (
                        <span className="font-mono text-gray-300">
                          {payment.transaction_id.slice(0, 12)}...
                        </span>
                      ) : (
                        <span className="text-gray-500">—</span>
                      )}
                    </div>
                  </td>
                  <td className="py-1 px-4 sm:py-1.5 sm:px-5 border-l border-b border-gray-base">
                    <div className="text-xs">
                      <div>
                        {format(new Date(payment.created_at), "MMM d, yyyy")}
                      </div>
                      <div className="text-gray-500">
                        {format(new Date(payment.created_at), "h:mm a")}
                      </div>
                    </div>
                  </td>
                  <td className="py-1 px-4 sm:py-1.5 sm:px-4 border-l border-b border-gray-base">
                    <div className="flex gap-2">
                      <Link to={`/payments/${payment.id}`}>
                        <button
                          className="p-2 cursor-pointer rounded-md hover:bg-gray-800"
                          title="View Details"
                        >
                          <Eye size={16} />
                        </button>
                      </Link>
                      <button
                        onClick={() => handleDeletePayment(payment)}
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
                    <DollarSign
                      size={48}
                      className="text-gray-400 mx-auto mb-3"
                    />
                    <span className="text-gray-500 text-sm font-medium">
                      No Payments Found
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

export default AllPayments;
