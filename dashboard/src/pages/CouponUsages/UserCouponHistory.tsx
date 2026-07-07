// src/pages/CouponUsages/UserCouponHistory.tsx
import React, { useState } from "react";
import { useParams, Link } from "react-router";
import { format } from "date-fns";
import { ArrowLeft, Ticket, Calendar, User } from "lucide-react";
import { useDebounce } from "../../utils/useDebounce";
import { useGetUserCouponUsageHistoryQuery } from "../../redux/api/couponUsageApi";
import type { ApiError } from "../../types/authType";
import Pagination from "../../utils/Pagination";
import type { ICouponUsage } from "../../redux/api/couponUsageApi";

const LIMIT = 10;

const UserCouponHistory: React.FC = () => {
  const { userId } = useParams<"userId">();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const debouncedSearch = useDebounce(searchValue, 500);

  const { data, error, isLoading, refetch, isFetching } =
    useGetUserCouponUsageHistoryQuery({
      userId: userId as string,
      params: {
        search: debouncedSearch,
        page: currentPage,
        limit: LIMIT,
      },
    });

  const usages: ICouponUsage[] = data?.data || [];
  const totalPages = data?.meta?.totalPages ?? 1;
  const totalItems = data?.meta?.total ?? 0;

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[70vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-400">Loading coupon history...</p>
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
            Failed to load coupon history
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

  const totalDiscount = usages.reduce((sum, u) => sum + u.discount_amount, 0);

  return (
    <div className="rounded-lg border border-gray-base bg-black-base overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-4 p-6 border-b border-gray-base">
        <Link to="/coupon-usages">
          <button className="p-2 rounded-md hover:bg-gray-800 transition">
            <ArrowLeft size={20} />
          </button>
        </Link>
        <div>
          <h1 className="text-xl font-semibold flex items-center gap-2">
            <User size={20} className="text-blue-400" />
            User Coupon History
          </h1>
          <p className="text-sm text-gray-400">User ID: {userId}</p>
        </div>
      </div>

      <div className="p-6">
        {/* Stats Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-black-solid p-4 rounded-lg border border-gray-base text-center">
            <p className="text-sm text-gray-400">Total Coupons Used</p>
            <p className="text-2xl font-bold text-blue-400">{usages.length}</p>
          </div>
          <div className="bg-black-solid p-4 rounded-lg border border-gray-base text-center">
            <p className="text-sm text-gray-400">Total Discount</p>
            <p className="text-2xl font-bold text-green-400">
              ${totalDiscount.toFixed(2)}
            </p>
          </div>
          <div className="bg-black-solid p-4 rounded-lg border border-gray-base text-center">
            <p className="text-sm text-gray-400">Average Discount</p>
            <p className="text-2xl font-bold text-purple-400">
              $
              {usages.length > 0
                ? (totalDiscount / usages.length).toFixed(2)
                : "0.00"}
            </p>
          </div>
        </div>

        {/* Search */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search by coupon code..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="w-full sm:w-64 px-3 py-2 rounded-md border border-gray-base bg-black-base focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-black-solid">
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-400">
                  #
                </th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-400">
                  Coupon
                </th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-400">
                  Order
                </th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-400">
                  Discount
                </th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-400">
                  Order Total
                </th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-400">
                  Used At
                </th>
              </tr>
            </thead>
            <tbody>
              {usages.length > 0 ? (
                usages.map((usage, index) => (
                  <tr
                    key={usage.id}
                    className="border-t border-gray-base hover:bg-black-solid"
                  >
                    <td className="px-4 py-3 text-sm">
                      {(currentPage - 1) * LIMIT + index + 1}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <Ticket size={14} className="text-blue-400" />
                        <span className="font-mono font-medium text-blue-400">
                          {usage.coupon?.code || "N/A"}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <Link
                        to={`/order/${usage.order_id}`}
                        className="text-blue-400 hover:underline"
                      >
                        {usage.order?.order_number || usage.order_id}
                      </Link>
                    </td>
                    <td className="px-4 py-3 text-sm text-green-400 font-bold">
                      -${usage.discount_amount.toFixed(2)}
                    </td>
                    <td className="px-4 py-3 text-sm">
                      ${usage.order_total.toFixed(2)}
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <div className="flex items-center gap-1 text-gray-400">
                        <Calendar size={14} />
                        {format(new Date(usage.used_at), "PPp")}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="py-8 text-center">
                    <div className="inline-block bg-black-solid px-6 py-4 rounded-2xl">
                      <Ticket
                        size={48}
                        className="text-gray-400 mx-auto mb-3"
                      />
                      <span className="text-gray-500 text-sm font-medium">
                        No coupon usage found for this user
                      </span>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
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

export default UserCouponHistory;
