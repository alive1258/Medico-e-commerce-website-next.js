// src/pages/CouponUsages/CouponUsageDetails.tsx
import React from "react";
import { useParams, useNavigate, Link } from "react-router";
import { format } from "date-fns";
import {
  ArrowLeft,
  Ticket,
  User,
  ShoppingBag,
  DollarSign,
  Calendar,
  Copy,
} from "lucide-react";
import Swal from "sweetalert2";
import {
  useGetSingleCouponUsageQuery,
  useGetCouponUsageStatsQuery,
} from "../../redux/api/couponUsageApi";
import type { ApiError } from "../../types/authType";

const CouponUsageDetails: React.FC = () => {
  const { id } = useParams<"id">();
  const navigate = useNavigate();

  const { data, isLoading, error, refetch } = useGetSingleCouponUsageQuery(
    id as string,
    {
      skip: !id,
    },
  );

  const { data: statsData } = useGetCouponUsageStatsQuery(
    data?.data?.coupon_id || "",
    {
      skip: !data?.data?.coupon_id,
    },
  );

  const usage = data?.data;
  const stats = statsData?.data;

  const copyText = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    Swal.fire({
      icon: "success",
      title: "Copied!",
      text: `${label} copied to clipboard`,
      timer: 1500,
      showConfirmButton: false,
    });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[70vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-400">Loading coupon usage...</p>
        </div>
      </div>
    );
  }

  if (error) {
    const err = error as ApiError;
    return (
      <div className="flex h-[70vh] flex-col items-center justify-center text-center">
        <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-8 max-w-md">
          <h2 className="text-lg font-semibold text-red-400 mb-2">
            Failed to load coupon usage
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

  if (!usage) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-400">Coupon usage not found</p>
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-gray-base bg-black-base overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-4 p-6 border-b border-gray-base">
        <button
          onClick={() => navigate(-1)}
          className="p-2 rounded-md hover:bg-gray-800 transition"
        >
          <ArrowLeft size={20} />
        </button>
        <div>
          <h1 className="text-xl font-semibold">Coupon Usage Details</h1>
          <p className="text-sm text-gray-400">ID: {usage.id}</p>
        </div>
      </div>

      <div className="p-6">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-black-solid p-4 rounded-lg border border-gray-base text-center">
            <p className="text-sm text-gray-400">Discount Amount</p>
            <p className="text-2xl font-bold text-green-400">
              -${usage.discount_amount.toFixed(2)}
            </p>
          </div>
          <div className="bg-black-solid p-4 rounded-lg border border-gray-base text-center">
            <p className="text-sm text-gray-400">Order Total</p>
            <p className="text-2xl font-bold text-blue-400">
              ${usage.order_total.toFixed(2)}
            </p>
          </div>
          <div className="bg-black-solid p-4 rounded-lg border border-gray-base text-center">
            <p className="text-sm text-gray-400">Savings</p>
            <p className="text-2xl font-bold text-purple-400">
              {usage.order_total > 0
                ? Math.round((usage.discount_amount / usage.order_total) * 100)
                : 0}
              %
            </p>
          </div>
          <div className="bg-black-solid p-4 rounded-lg border border-gray-base text-center">
            <p className="text-sm text-gray-400">Used At</p>
            <p className="text-lg font-medium">
              {format(new Date(usage.used_at), "PP")}
            </p>
            <p className="text-xs text-gray-500">
              {format(new Date(usage.used_at), "p")}
            </p>
          </div>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Coupon Info */}
          <div className="bg-black-solid p-4 rounded-lg border border-gray-base">
            <h3 className="text-sm font-medium text-gray-400 mb-3 flex items-center gap-2">
              <Ticket size={16} />
              Coupon Information
            </h3>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Code</span>
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-blue-400">
                    {usage.coupon?.code || "N/A"}
                  </span>
                  {usage.coupon?.code && (
                    <button
                      onClick={() =>
                        copyText(usage.coupon!.code, "Coupon code")
                      }
                      className="p-1 hover:bg-gray-700 rounded transition"
                    >
                      <Copy size={14} />
                    </button>
                  )}
                </div>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Type</span>
                <span className="capitalize">
                  {usage.coupon?.discount_type || "N/A"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Value</span>
                <span>
                  {usage.coupon?.discount_type === "percentage"
                    ? `${usage.coupon?.discount_value}%`
                    : `$${usage.coupon?.discount_value}`}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Coupon ID</span>
                <span className="font-mono text-xs">{usage.coupon_id}</span>
              </div>
            </div>
          </div>

          {/* User Info */}
          <div className="bg-black-solid p-4 rounded-lg border border-gray-base">
            <h3 className="text-sm font-medium text-gray-400 mb-3 flex items-center gap-2">
              <User size={16} />
              User Information
            </h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-400">Name</span>
                <span className="font-medium">
                  {usage.user?.name || "Unknown"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Email</span>
                <span>{usage.user?.email || "N/A"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">User ID</span>
                <span className="font-mono text-xs">{usage.user_id}</span>
              </div>
            </div>
          </div>

          {/* Order Info */}
          <div className="bg-black-solid p-4 rounded-lg border border-gray-base md:col-span-2">
            <h3 className="text-sm font-medium text-gray-400 mb-3 flex items-center gap-2">
              <ShoppingBag size={16} />
              Order Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <p className="text-sm text-gray-400">Order ID</p>
                <Link
                  to={`/order/${usage.order_id}`}
                  className="text-blue-400 hover:underline font-mono text-sm"
                >
                  {usage.order?.order_number || usage.order_id}
                </Link>
              </div>
              <div>
                <p className="text-sm text-gray-400">Order Total</p>
                <p className="font-bold">${usage.order_total.toFixed(2)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Discount Applied</p>
                <p className="font-bold text-green-400">
                  -${usage.discount_amount.toFixed(2)}
                </p>
              </div>
            </div>
          </div>

          {/* Metadata */}
          {usage.metadata && Object.keys(usage.metadata).length > 0 && (
            <div className="bg-black-solid p-4 rounded-lg border border-gray-base md:col-span-2">
              <h3 className="text-sm font-medium text-gray-400 mb-3 flex items-center gap-2">
                <DollarSign size={16} />
                Metadata
              </h3>
              <pre className="text-xs bg-black-base p-3 rounded overflow-auto max-h-50">
                {JSON.stringify(usage.metadata, null, 2)}
              </pre>
            </div>
          )}

          {/* Stats */}
          {stats && (
            <div className="bg-black-solid p-4 rounded-lg border border-gray-base md:col-span-2">
              <h3 className="text-sm font-medium text-gray-400 mb-3 flex items-center gap-2">
                <Calendar size={16} />
                Coupon Usage Statistics
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <p className="text-sm text-gray-400">Total Uses</p>
                  <p className="text-xl font-bold text-blue-400">
                    {stats.total_uses}
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-400">Total Users</p>
                  <p className="text-xl font-bold text-purple-400">
                    {stats.total_users}
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-400">Total Discount</p>
                  <p className="text-xl font-bold text-green-400">
                    ${stats.total_discount.toFixed(2)}
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-400">Avg Discount</p>
                  <p className="text-xl font-bold text-yellow-400">
                    ${stats.average_discount.toFixed(2)}
                  </p>
                </div>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-4">
                <div className="text-center bg-black-base p-2 rounded">
                  <p className="text-sm text-gray-400">Last 7 Days</p>
                  <p className="text-lg font-bold">{stats.last_7_days}</p>
                </div>
                <div className="text-center bg-black-base p-2 rounded">
                  <p className="text-sm text-gray-400">Last 30 Days</p>
                  <p className="text-lg font-bold">{stats.last_30_days}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CouponUsageDetails;
