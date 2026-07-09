// src/pages/OrderItems/OrderItemDetails.tsx
import React from "react";
import { useParams, Link, useNavigate } from "react-router";
import { format } from "date-fns";
import { ArrowLeft, Edit, Trash2, Package } from "lucide-react";
import Swal from "sweetalert2";
import {
  useGetSingleOrderItemQuery,
  useDeleteOrderItemMutation,
} from "../../redux/api/orderItemApi";
import type { ApiError } from "../../types/authType";
import PageHeader from "../../components/common/PageHeader";

const OrderItemDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data, isLoading, error, refetch } = useGetSingleOrderItemQuery(id!, {
    skip: !id,
  });

  const [deleteOrderItem] = useDeleteOrderItemMutation();

  const orderItem = data?.data;

  const handleDelete = async () => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: `Delete order item "${orderItem?.product_name}"?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
      });

      if (!result.isConfirmed) return;

      await deleteOrderItem(id!).unwrap();

      await Swal.fire({
        icon: "success",
        title: "Deleted!",
        text: "Order item has been deleted.",
        timer: 1500,
        showConfirmButton: false,
      });

      navigate("/order-items");
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
      <div className="rounded-lg border border-gray-base p-6 space-y-4">
        <div className="h-8 w-48 animate-pulse rounded bg-neutral-800" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="space-y-2">
              <div className="h-4 w-24 animate-pulse rounded bg-neutral-800" />
              <div className="h-8 w-full animate-pulse rounded bg-neutral-800" />
            </div>
          ))}
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
            Failed to load order item
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

  if (!orderItem) {
    return (
      <div className="flex h-[70vh] flex-col items-center justify-center text-center">
        <Package size={48} className="text-gray-400 mb-3" />
        <h2 className="text-lg font-semibold text-gray-400 mb-2">
          Order item not found
        </h2>
        <Link to="/order-items">
          <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md text-white">
            Back to Order Items
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div className="rounded-lg border bg-black-base border-gray-base overflow-hidden p-6 mb-6">
      <PageHeader
        title="Order Item Details"
        breadcrumbs={[
          { title: "Dashboard", link: "/" },
          { title: "Order Items", link: "/order-items" },
          { title: orderItem.product_name },
        ]}
      />

      <div className="space-y-6">
        {/* Header Actions */}
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => navigate("/order-items")}
            className="flex items-center gap-2 px-4 py-2 rounded-md border border-gray-base hover:bg-gray-800 transition"
          >
            <ArrowLeft size={16} /> Back
          </button>
          <Link to={`/edit-order-item/${id}`}>
            <button className="flex items-center gap-2 px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white transition">
              <Edit size={16} /> Edit
            </button>
          </Link>
          <button
            onClick={handleDelete}
            className="flex items-center gap-2 px-4 py-2 rounded-md bg-red-600 hover:bg-red-700 text-white transition"
          >
            <Trash2 size={16} /> Delete
          </button>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-black-solid p-6 rounded-lg border border-gray-base">
          <div>
            <h3 className="text-sm font-medium text-gray-400 mb-1">ID</h3>
            <p className="font-mono text-sm">{orderItem.id}</p>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-400 mb-1">
              Product Name
            </h3>
            <p className="font-semibold">{orderItem.product_name}</p>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-400 mb-1">
              Product Variant ID
            </h3>
            <p className="font-mono text-sm">{orderItem.product_variant_id}</p>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-400 mb-1">SKU</h3>
            <p className="font-mono text-sm">{orderItem.sku}</p>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-400 mb-1">Quantity</h3>
            <p className="text-xl font-bold">{orderItem.quantity}</p>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-400 mb-1">
              Unit Price
            </h3>
            <p className="text-xl font-bold text-green-400">
              ${Number(orderItem.unit_price).toFixed(2)}
            </p>
          </div>

          <div className="md:col-span-2">
            <h3 className="text-sm font-medium text-gray-400 mb-1">
              Total Price
            </h3>
            <p className="text-2xl font-bold text-blue-400">
              ${Number(orderItem.total_price).toFixed(2)}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              {orderItem.quantity} × ${Number(orderItem.unit_price).toFixed(2)}
            </p>
          </div>

          {orderItem.order_id && (
            <div className="md:col-span-2">
              <h3 className="text-sm font-medium text-gray-400 mb-1">
                Order ID
              </h3>
              <Link to={`/order/${orderItem.order_id}`}>
                <p className="font-mono text-sm text-blue-400 hover:underline">
                  {orderItem.order_id}
                </p>
              </Link>
            </div>
          )}

          {orderItem.created_at && (
            <div>
              <h3 className="text-sm font-medium text-gray-400 mb-1">
                Created At
              </h3>
              <p className="text-sm">
                {format(new Date(orderItem.created_at), "MMMM d, yyyy h:mm a")}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderItemDetails;
