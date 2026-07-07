// src/pages/Coupons/CouponDetails.tsx
import React from "react";
import { useParams, useNavigate } from "react-router";
import { format } from "date-fns";
import {
  ArrowLeft,
  Ticket,
  Calendar,
  Users,
  DollarSign,
  Tag,
  Copy,
  Edit,
  Trash2,
} from "lucide-react";
import Swal from "sweetalert2";
import {
  useGetSingleCouponQuery,
  useGetCouponStatsQuery,
  useDeleteCouponMutation,
} from "../../redux/api/couponApi";
import type { ApiError } from "../../types/authType";

const CouponDetails: React.FC = () => {
  const { id } = useParams<"id">();
  const navigate = useNavigate();

  const { data, isLoading, error, refetch } = useGetSingleCouponQuery(
    id as string,
    {
      skip: !id,
    },
  );

  const { data: statsData, isLoading: statsLoading } = useGetCouponStatsQuery(
    id as string,
    {
      skip: !id,
    },
  );

  const [deleteCoupon] = useDeleteCouponMutation();

  const coupon = data?.data;
  const stats = statsData?.data;

  const handleDeleteCoupon = async () => {
    if (!coupon) return;

    const result = await Swal.fire({
      title: "Are you sure?",
      text: `Delete coupon "${coupon.code}"?`,
      icon: "error",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await deleteCoupon(coupon.id).unwrap();
        Swal.fire({
          icon: "success",
          title: "Deleted!",
          text: `Coupon "${coupon.code}" has been deleted.`,
          timer: 1500,
          showConfirmButton: false,
        });
        navigate(-1);
      } catch (err) {
        const error = err as ApiError;
        Swal.fire({
          icon: "error",
          title: "Error!",
          text: error?.data?.message || "Delete failed",
        });
      }
    }
  };

  const copyCode = () => {
    if (coupon) {
      navigator.clipboard.writeText(coupon.code);
      Swal.fire({
        icon: "success",
        title: "Copied!",
        text: `Coupon code "${coupon.code}" copied to clipboard`,
        timer: 1500,
        showConfirmButton: false,
      });
    }
  };

  const getDiscountLabel = () => {
    if (!coupon) return "";
    if (coupon.discount_type === "percentage") {
      return `${coupon.discount_value}% OFF`;
    }
    return `$${coupon.discount_value} OFF`;
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[70vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-400">Loading coupon...</p>
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
            Failed to load coupon
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

  if (!coupon) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-400">Coupon not found</p>
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-gray-base bg-black-base overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-gray-base">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="p-2 rounded-md hover:bg-gray-800 transition"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-xl font-semibold">Coupon Details</h1>
            <div className="flex items-center gap-2 mt-1">
              <span className="font-mono text-lg font-bold text-blue-400">
                {coupon.code}
              </span>
              <button
                onClick={copyCode}
                className="p-1 hover:bg-gray-700 rounded transition"
                title="Copy code"
              >
                <Copy size={16} />
              </button>
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <Link to={`/edit-coupon/${coupon.id}`}>
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md text-sm transition">
              <Edit size={16} />
              Edit
            </button>
          </Link>
          <button
            onClick={handleDeleteCoupon}
            className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 rounded-md text-sm transition"
          >
            <Trash2 size={16} />
            Delete
          </button>
        </div>
      </div>

      <div className="p-6">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-black-solid p-4 rounded-lg border border-gray-base text-center">
            <p className="text-sm text-gray-400">Discount</p>
            <p className="text-2xl font-bold text-green-400">
              {getDiscountLabel()}
            </p>
            <p className="text-xs text-gray-500 capitalize">
              {coupon.discount_type}
            </p>
          </div>
          <div className="bg-black-solid p-4 rounded-lg border border-gray-base text-center">
            <p className="text-sm text-gray-400">Used</p>
            <p className="text-2xl font-bold text-blue-400">
              {coupon.used_count} / {coupon.usage_limit}
            </p>
            <p className="text-xs text-gray-500">Total Usage</p>
          </div>
          <div className="bg-black-solid p-4 rounded-lg border border-gray-base text-center">
            <p className="text-sm text-gray-400">Status</p>
            <p
              className={`text-2xl font-bold ${coupon.is_active && !coupon.is_expired ? "text-green-400" : "text-red-400"}`}
            >
              {coupon.is_active && !coupon.is_expired ? "Active" : "Inactive"}
            </p>
            {coupon.is_expired && (
              <p className="text-xs text-red-400">Expired</p>
            )}
          </div>
          <div className="bg-black-solid p-4 rounded-lg border border-gray-base text-center">
            <p className="text-sm text-gray-400">Per User</p>
            <p className="text-2xl font-bold text-purple-400">
              {coupon.per_user_limit}
            </p>
            <p className="text-xs text-gray-500">Max per user</p>
          </div>
        </div>

        {/* Coupon Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-black-solid p-4 rounded-lg border border-gray-base">
            <h3 className="text-sm font-medium text-gray-400 mb-3 flex items-center gap-2">
              <Tag size={16} />
              Coupon Information
            </h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-400">Code</span>
                <span className="font-mono font-bold">{coupon.code}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Type</span>
                <span className="capitalize">{coupon.discount_type}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Value</span>
                <span className="font-medium">{getDiscountLabel()}</span>
              </div>
              {coupon.minimum_order_amount && (
                <div className="flex justify-between">
                  <span className="text-gray-400">Min Order</span>
                  <span>${coupon.minimum_order_amount}</span>
                </div>
              )}
              {coupon.maximum_discount_amount && (
                <div className="flex justify-between">
                  <span className="text-gray-400">Max Discount</span>
                  <span>${coupon.maximum_discount_amount}</span>
                </div>
              )}
              {coupon.description && (
                <div className="flex justify-between">
                  <span className="text-gray-400">Description</span>
                  <span className="text-sm">{coupon.description}</span>
                </div>
              )}
            </div>
          </div>

          <div className="bg-black-solid p-4 rounded-lg border border-gray-base">
            <h3 className="text-sm font-medium text-gray-400 mb-3 flex items-center gap-2">
              <Calendar size={16} />
              Date & Restrictions
            </h3>
            <div className="space-y-2">
              {coupon.start_date && (
                <div className="flex justify-between">
                  <span className="text-gray-400">Start Date</span>
                  <span>{format(new Date(coupon.start_date), "PPpp")}</span>
                </div>
              )}
              {coupon.end_date && (
                <div className="flex justify-between">
                  <span className="text-gray-400">End Date</span>
                  <span>{format(new Date(coupon.end_date), "PPpp")}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-gray-400">First Order Only</span>
                <span>{coupon.is_first_order_only ? "Yes" : "No"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Combinable</span>
                <span>{coupon.is_combinable ? "Yes" : "No"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Created</span>
                <span>{format(new Date(coupon.created_at), "PP")}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Usage Stats */}
        {stats && (
          <div className="bg-black-solid p-4 rounded-lg border border-gray-base">
            <h3 className="text-sm font-medium text-gray-400 mb-3 flex items-center gap-2">
              <Users size={16} />
              Usage Statistics
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="text-center">
                <p className="text-sm text-gray-400">Total Uses</p>
                <p className="text-xl font-bold text-blue-400">
                  {stats.total_uses}
                </p>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-400">Unique Users</p>
                <p className="text-xl font-bold text-purple-400">
                  {stats.unique_users}
                </p>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-400">Total Discount</p>
                <p className="text-xl font-bold text-green-400">
                  ${stats.total_discount_amount.toFixed(2)}
                </p>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-400">Average Discount</p>
                <p className="text-xl font-bold text-yellow-400">
                  ${stats.average_discount.toFixed(2)}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CouponDetails;
