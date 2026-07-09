// src/pages/OrderItems/AllOrderItems.tsx
import React, { useState } from "react";
import Swal from "sweetalert2";
import { Plus, Eye, Trash2, Package, Edit, Search, Filter } from "lucide-react";
import { Link } from "react-router";
import { format } from "date-fns";
import { useDebounce } from "../../utils/useDebounce";
import {
  useGetAllOrderItemsQuery,
  useDeleteOrderItemMutation,
} from "../../redux/api/orderItemApi";
import type { IOrderItem, ApiError } from "../../redux/api/orderItemApi";
import Pagination from "../../utils/Pagination";

const LIMIT = 10;

const AllOrderItems: React.FC = () => {
  const [searchValue, setSearchValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [filterOrderId, setFilterOrderId] = useState("");
  const [filterVariantId, setFilterVariantId] = useState("");
  const debouncedSearch = useDebounce(searchValue, 500);

  const { data, error, isLoading, refetch, isFetching } =
    useGetAllOrderItemsQuery({
      search: debouncedSearch,
      page: currentPage,
      limit: LIMIT,
      order_id: filterOrderId || undefined,
      product_variant_id: filterVariantId || undefined,
    });

  const [deleteOrderItem] = useDeleteOrderItemMutation();

  const orderItems: IOrderItem[] = data?.data || [];
  const totalPages = data?.meta?.totalPages ?? 1;
  const totalItems = data?.meta?.total ?? 0;

  const handleDeleteOrderItem = async (item: IOrderItem) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: `Delete order item for "${item.product_name}"?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
      });

      if (!result.isConfirmed) return;

      await deleteOrderItem(item.id).unwrap();

      await Swal.fire({
        icon: "success",
        title: "Deleted!",
        text: "Order item has been deleted.",
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
            Failed to load order items
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
            <h1 className="text-xl font-semibold">Order Items</h1>
            <p className="text-sm text-gray-400">
              Manage all order items across orders
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
            <div className="flex flex-wrap gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                <input
                  type="text"
                  placeholder="Search items..."
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  className="pl-9 w-full sm:w-40 px-3 py-2 rounded-md border border-gray-base bg-black-base focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <input
                type="text"
                placeholder="Order ID"
                value={filterOrderId}
                onChange={(e) => setFilterOrderId(e.target.value)}
                className="w-full sm:w-40 px-3 py-2 rounded-md border border-gray-base bg-black-base focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              />
              <input
                type="text"
                placeholder="Variant ID"
                value={filterVariantId}
                onChange={(e) => setFilterVariantId(e.target.value)}
                className="w-full sm:w-40 px-3 py-2 rounded-md border border-gray-base bg-black-base focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              />
            </div>
            <Link to="/add-order-item">
              <button className="flex items-center justify-center gap-2 px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white transition">
                <Plus size={16} /> Add Order Item
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
                SKU
              </th>
              <th className="py-1 px-4 sm:py-1.5 sm:px-5 text-left border-l border-b border-gray-base font-semibold text-sm">
                Quantity
              </th>
              <th className="py-1 px-4 sm:py-1.5 sm:px-5 text-left border-l border-b border-gray-base font-semibold text-sm">
                Unit Price
              </th>
              <th className="py-1 px-4 sm:py-1.5 sm:px-5 text-left border-l border-b border-gray-base font-semibold text-sm">
                Total Price
              </th>
              <th className="py-1 px-4 sm:py-1.5 sm:px-5 text-left border-l border-b border-gray-base font-semibold text-sm">
                Created At
              </th>
              <th className="py-1 px-4 sm:py-1.5 sm:px-5 text-left border-l border-b border-gray-base font-semibold text-sm">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {orderItems.length > 0 ? (
              orderItems.map((item, index) => (
                <tr
                  key={item.id}
                  className={`${index % 2 !== 0 ? "bg-black-solid hover:bg-black-base" : ""}`}
                >
                  <td className="py-1 px-4 sm:py-1.5 sm:px-5 border-b border-gray-base">
                    {(currentPage - 1) * LIMIT + index + 1}
                  </td>
                  <td className="py-1 px-4 sm:py-1.5 sm:px-5 border-l border-b border-gray-base">
                    <div>
                      <div className="font-medium">{item.product_name}</div>
                      <div className="text-xs text-gray-500">
                        Variant: {item.product_variant_id.slice(0, 8)}...
                      </div>
                    </div>
                  </td>
                  <td className="py-1 px-4 sm:py-1.5 sm:px-5 border-l border-b border-gray-base">
                    <span className="font-mono text-xs">{item.sku}</span>
                  </td>
                  <td className="py-1 px-4 sm:py-1.5 sm:px-5 border-l border-b border-gray-base font-bold text-center">
                    {item.quantity}
                  </td>
                  <td className="py-1 px-4 sm:py-1.5 sm:px-5 border-l border-b border-gray-base">
                    ${Number(item.unit_price).toFixed(2)}
                  </td>
                  <td className="py-1 px-4 sm:py-1.5 sm:px-5 border-l border-b border-gray-base font-semibold">
                    ${Number(item.total_price).toFixed(2)}
                  </td>
                  <td className="py-1 px-4 sm:py-1.5 sm:px-5 border-l border-b border-gray-base">
                    <div className="text-xs">
                      {item.created_at && (
                        <>
                          <div>
                            {format(new Date(item.created_at), "MMM d, yyyy")}
                          </div>
                          <div className="text-gray-500">
                            {format(new Date(item.created_at), "h:mm a")}
                          </div>
                        </>
                      )}
                    </div>
                  </td>
                  <td className="py-1 px-4 sm:py-1.5 sm:px-4 border-l border-b border-gray-base">
                    <div className="flex gap-2">
                      <Link to={`/order-item/${item.id}`}>
                        <button
                          className="p-2 cursor-pointer rounded-md hover:bg-gray-800"
                          title="View Details"
                        >
                          <Eye size={16} />
                        </button>
                      </Link>
                      <Link to={`/edit-order-item/${item.id}`}>
                        <button
                          className="p-2 cursor-pointer rounded-md hover:bg-gray-800"
                          title="Edit"
                        >
                          <Edit size={16} />
                        </button>
                      </Link>
                      <button
                        onClick={() => handleDeleteOrderItem(item)}
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
                      No Order Items Found
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

export default AllOrderItems;
