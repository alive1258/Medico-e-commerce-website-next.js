// src/pages/CouponUsages/AllCouponUsages.tsx
import React, { useState } from "react";
import { format } from "date-fns";
import { Eye, Ticket } from "lucide-react";
import { Link } from "react-router";
import { useDebounce } from "../../utils/useDebounce";
import { useGetAllCouponUsagesQuery } from "../../redux/api/couponUsageApi";
import type { ApiError } from "../../types/authType";
import Pagination from "../../utils/Pagination";
import type { ICouponUsage } from "../../redux/api/couponUsageApi";

const LIMIT = 10;

const AllCouponUsages: React.FC = () => {
  const [searchValue, setSearchValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [filterCouponId, setFilterCouponId] = useState("");
  const [filterUserId, setFilterUserId] = useState("");
  const debouncedSearch = useDebounce(searchValue, 500);

  const { data, error, isLoading, refetch, isFetching } =
    useGetAllCouponUsagesQuery({
      search: debouncedSearch,
      page: currentPage,
      limit: LIMIT,
      coupon_id: filterCouponId || undefined,
      user_id: filterUserId || undefined,
    });

  const usages: ICouponUsage[] = data?.data || [];
  const totalPages = data?.meta?.totalPages ?? 1;
  const totalItems = data?.meta?.total ?? 0;

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
            Failed to load coupon usages
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
            <h1 className="text-xl font-semibold">Coupon Usages</h1>
            <p className="text-sm text-gray-400">
              Track all coupon usage history
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
              <input
                type="text"
                placeholder="Coupon ID"
                value={filterCouponId}
                onChange={(e) => setFilterCouponId(e.target.value)}
                className="w-full sm:w-40 px-3 py-2 rounded-md border border-gray-base bg-black-base focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              />
              <input
                type="text"
                placeholder="User ID"
                value={filterUserId}
                onChange={(e) => setFilterUserId(e.target.value)}
                className="w-full sm:w-40 px-3 py-2 rounded-md border border-gray-base bg-black-base focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              />
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
                Coupon
              </th>
              <th className="py-1 px-4 sm:py-1.5 sm:px-5 text-left border-l border-b border-gray-base font-semibold text-sm">
                User
              </th>
              <th className="py-1 px-4 sm:py-1.5 sm:px-5 text-left border-l border-b border-gray-base font-semibold text-sm">
                Order
              </th>
              <th className="py-1 px-4 sm:py-1.5 sm:px-5 text-left border-l border-b border-gray-base font-semibold text-sm">
                Discount
              </th>
              <th className="py-1 px-4 sm:py-1.5 sm:px-5 text-left border-l border-b border-gray-base font-semibold text-sm">
                Used At
              </th>
              <th className="py-1 px-4 sm:py-1.5 sm:px-5 text-left border-l border-b border-gray-base font-semibold text-sm">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {usages.length > 0 ? (
              usages.map((usage, index) => (
                <tr
                  key={usage.id}
                  className={`${index % 2 !== 0 ? "bg-black-solid hover:bg-black-base" : ""}`}
                >
                  <td className="py-1 px-4 sm:py-1.5 sm:px-5 border-b border-gray-base">
                    {(currentPage - 1) * LIMIT + index + 1}
                  </td>
                  <td className="py-1 px-4 sm:py-1.5 sm:px-5 border-l border-b border-gray-base">
                    <div>
                      <div className="flex items-center gap-1">
                        <Ticket size={14} className="text-blue-400" />
                        <span className="font-mono font-medium text-blue-400">
                          {usage.coupon?.code || "N/A"}
                        </span>
                      </div>
                      <div className="text-xs text-gray-500">
                        {usage.coupon?.discount_type} (
                        {usage.coupon?.discount_value}%)
                      </div>
                    </div>
                  </td>
                  <td className="py-1 px-4 sm:py-1.5 sm:px-5 border-l border-b border-gray-base">
                    <div>
                      <div className="font-medium">
                        {usage.user?.name || "Unknown"}
                      </div>
                      <div className="text-xs text-gray-500">
                        {usage.user?.email || ""}
                      </div>
                    </div>
                  </td>
                  <td className="py-1 px-4 sm:py-1.5 sm:px-5 border-l border-b border-gray-base">
                    <div>
                      <div className="text-sm">
                        {usage.order?.order_number || "N/A"}
                      </div>
                      <div className="text-xs text-gray-500">
                        ${usage.order_total?.toFixed(2)}
                      </div>
                    </div>
                  </td>
                  <td className="py-1 px-4 sm:py-1.5 sm:px-5 border-l border-b border-gray-base">
                    <div className="text-green-400 font-bold">
                      -${usage.discount_amount.toFixed(2)}
                    </div>
                  </td>
                  <td className="py-1 px-4 sm:py-1.5 sm:px-5 border-l border-b border-gray-base">
                    <div className="text-xs">
                      <div>
                        {format(new Date(usage.used_at), "MMM d, yyyy")}
                      </div>
                      <div className="text-gray-500">
                        {format(new Date(usage.used_at), "h:mm a")}
                      </div>
                    </div>
                  </td>
                  <td className="py-1 px-4 sm:py-1.5 sm:px-4 border-l border-b border-gray-base">
                    <Link to={`/coupon-usage/${usage.id}`}>
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
                    <Ticket size={48} className="text-gray-400 mx-auto mb-3" />
                    <span className="text-gray-500 text-sm font-medium">
                      No Coupon Usages Found
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

export default AllCouponUsages;
