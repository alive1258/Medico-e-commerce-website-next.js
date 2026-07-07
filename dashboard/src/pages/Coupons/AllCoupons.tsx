// src/pages/Coupons/AllCoupons.tsx
import React, { useState } from "react";
import Swal from "sweetalert2";
import { Plus, Edit, Trash2, Ticket, Copy, Eye } from "lucide-react";
import { Link } from "react-router";
import { useDebounce } from "../../utils/useDebounce";
import {
  useGetAllCouponsQuery,
  useDeleteCouponMutation,
  useUpdateCouponMutation,
  DiscountType,
} from "../../redux/api/couponApi";
import type { ApiError } from "../../types/authType";
import Pagination from "../../utils/Pagination";
import type { ICoupon } from "../../redux/api/couponApi";

const LIMIT = 10;

const AllCoupons: React.FC = () => {
  const [searchValue, setSearchValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [filterActive, setFilterActive] = useState<boolean | undefined>(
    undefined,
  );
  const [filterType, setFilterType] = useState<DiscountType | "">("");
  const debouncedSearch = useDebounce(searchValue, 500);

  const { data, error, isLoading, refetch, isFetching } = useGetAllCouponsQuery(
    {
      search: debouncedSearch,
      page: currentPage,
      limit: LIMIT,
      is_active: filterActive,
      discount_type: filterType || undefined,
    },
  );

  const [deleteCoupon] = useDeleteCouponMutation();
  const [updateCoupon] = useUpdateCouponMutation();

  const coupons: ICoupon[] = data?.data || [];
  const totalPages = data?.meta?.totalPages ?? 1;
  const totalItems = data?.meta?.total ?? 0;

  const handleToggleStatus = async (coupon: ICoupon) => {
    try {
      await updateCoupon({
        id: coupon.id,
        data: { is_active: !coupon.is_active },
      }).unwrap();

      Swal.fire({
        icon: "success",
        title: "Updated!",
        text: `Coupon ${coupon.is_active ? "deactivated" : "activated"} successfully`,
        timer: 1500,
        showConfirmButton: false,
      });

      refetch();
    } catch (err) {
      const error = err as ApiError;
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: error?.data?.message || "Failed to update status",
      });
    }
  };

  const handleDeleteCoupon = async (coupon: ICoupon) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: `Delete coupon "${coupon.code}"?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
      });

      if (!result.isConfirmed) return;

      await deleteCoupon(coupon.id).unwrap();

      await Swal.fire({
        icon: "success",
        title: "Deleted!",
        text: `Coupon "${coupon.code}" has been deleted.`,
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

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    Swal.fire({
      icon: "success",
      title: "Copied!",
      text: `Coupon code "${code}" copied to clipboard`,
      timer: 1500,
      showConfirmButton: false,
    });
  };

  const getDiscountLabel = (coupon: ICoupon) => {
    if (coupon.discount_type === DiscountType.PERCENTAGE) {
      return `${coupon.discount_value}% OFF`;
    }
    return `$${coupon.discount_value} OFF`;
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
            Failed to load coupons
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
            <h1 className="text-xl font-semibold">Coupons</h1>
            <p className="text-sm text-gray-400">Manage all coupons</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
            <div className="flex flex-wrap gap-2">
              <input
                type="text"
                placeholder="Search coupons..."
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                className="w-full sm:w-40 px-3 py-2 rounded-md border border-gray-base bg-black-base focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <select
                value={
                  filterActive === undefined
                    ? ""
                    : filterActive
                      ? "active"
                      : "inactive"
                }
                onChange={(e) => {
                  const val = e.target.value;
                  setFilterActive(val === "" ? undefined : val === "active");
                }}
                className="px-3 py-2 rounded-md border border-gray-base bg-black-base focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
              <select
                value={filterType}
                onChange={(e) =>
                  setFilterType(e.target.value as DiscountType | "")
                }
                className="px-3 py-2 rounded-md border border-gray-base bg-black-base focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Types</option>
                <option value={DiscountType.PERCENTAGE}>Percentage</option>
                <option value={DiscountType.FIXED}>Fixed</option>
              </select>
            </div>
            <Link to="/add-coupon">
              <button className="flex items-center justify-center gap-2 px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white transition">
                <Plus size={16} /> Add New
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
                Code
              </th>
              <th className="py-1 px-4 sm:py-1.5 sm:px-5 text-left border-l border-b border-gray-base font-semibold text-sm">
                Discount
              </th>
              <th className="py-1 px-4 sm:py-1.5 sm:px-5 text-left border-l border-b border-gray-base font-semibold text-sm">
                Min Order
              </th>
              <th className="py-1 px-4 sm:py-1.5 sm:px-5 text-left border-l border-b border-gray-base font-semibold text-sm">
                Uses
              </th>
              <th className="py-1 px-4 sm:py-1.5 sm:px-5 text-left border-l border-b border-gray-base font-semibold text-sm">
                Status
              </th>
              <th className="py-1 px-4 sm:py-1.5 sm:px-5 text-left border-l border-b border-gray-base font-semibold text-sm">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {coupons.length > 0 ? (
              coupons.map((coupon, index) => (
                <tr
                  key={coupon.id}
                  className={`${index % 2 !== 0 ? "bg-black-solid hover:bg-black-base" : ""}`}
                >
                  <td className="py-1 px-4 sm:py-1.5 sm:px-5 border-b border-gray-base">
                    {(currentPage - 1) * LIMIT + index + 1}
                  </td>
                  <td className="py-1 px-4 sm:py-1.5 sm:px-5 border-l border-b border-gray-base">
                    <div className="flex items-center gap-2">
                      <Ticket size={16} className="text-blue-400" />
                      <span className="font-mono font-bold text-blue-400">
                        {coupon.code}
                      </span>
                      <button
                        onClick={() => copyCode(coupon.code)}
                        className="p-1 hover:bg-gray-700 rounded"
                        title="Copy code"
                      >
                        <Copy size={14} />
                      </button>
                    </div>
                  </td>
                  <td className="py-1 px-4 sm:py-1.5 sm:px-5 border-l border-b border-gray-base">
                    <div>
                      <span className="font-medium text-green-400">
                        {getDiscountLabel(coupon)}
                      </span>
                      <div className="text-xs text-gray-500">
                        {coupon.discount_type}
                      </div>
                    </div>
                  </td>
                  <td className="py-1 px-4 sm:py-1.5 sm:px-5 border-l border-b border-gray-base">
                    {coupon.minimum_order_amount ? (
                      <span className="text-sm">
                        ${coupon.minimum_order_amount}
                      </span>
                    ) : (
                      <span className="text-gray-500 text-sm">—</span>
                    )}
                  </td>
                  <td className="py-1 px-4 sm:py-1.5 sm:px-5 border-l border-b border-gray-base">
                    <div className="text-sm">
                      <span className="font-medium">{coupon.used_count}</span>
                      {coupon.usage_limit && (
                        <span className="text-gray-500">
                          {" "}
                          / {coupon.usage_limit}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="py-1 px-4 sm:py-1.5 sm:px-5 border-l border-b border-gray-base">
                    <div className="flex flex-col gap-1">
                      <button
                        onClick={() => handleToggleStatus(coupon)}
                        className={`px-2 py-1 rounded text-xs font-medium transition ${
                          coupon.is_active && !coupon.is_expired
                            ? "bg-green-500/20 text-green-400 hover:bg-green-500/30"
                            : "bg-gray-500/20 text-gray-400 hover:bg-gray-500/30"
                        }`}
                      >
                        {coupon.is_active && !coupon.is_expired
                          ? "Active"
                          : "Inactive"}
                      </button>
                      {coupon.is_expired && (
                        <span className="text-xs text-red-400">Expired</span>
                      )}
                    </div>
                  </td>
                  <td className="py-1 px-4 sm:py-1.5 sm:px-4 border-l border-b border-gray-base">
                    <div className="flex gap-2">
                      <Link to={`/coupon/${coupon.id}`}>
                        <button
                          className="p-2 cursor-pointer rounded-md hover:bg-gray-800"
                          title="View Details"
                        >
                          <Eye size={16} />
                        </button>
                      </Link>
                      <Link to={`/edit-coupon/${coupon.id}`}>
                        <button
                          className="p-2 cursor-pointer rounded-md hover:bg-gray-800"
                          title="Edit Coupon"
                        >
                          <Edit size={16} />
                        </button>
                      </Link>
                      <button
                        onClick={() => handleDeleteCoupon(coupon)}
                        className="flex cursor-pointer gap-2 w-fit p-2 text-red-500 hover:text-red-600 rounded text-sm"
                        title="Delete Coupon"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="py-8 text-center">
                  <div className="inline-block bg-black-solid px-6 py-4 rounded-2xl">
                    <Ticket size={48} className="text-gray-400 mx-auto mb-3" />
                    <span className="text-gray-500 text-sm font-medium">
                      No Coupons Found
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

export default AllCoupons;
