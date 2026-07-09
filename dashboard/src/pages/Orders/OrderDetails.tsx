// src/pages/Orders/OrderDetails.tsx
import React from "react";
import { useParams, Link, useNavigate } from "react-router";
import { format } from "date-fns";
import {
  ArrowLeft,
  Edit,
  Trash2,
  Package,
  DollarSign,
  Truck,
  Clock,
  User,
  MapPin,
  CreditCard,
  RefreshCw,
} from "lucide-react";
import Swal from "sweetalert2";
import {
  useGetSingleOrderQuery,
  useDeleteOrderMutation,
  type IOrder,
} from "../../redux/api/orderApi";
import type { ApiError } from "../../types/authType";
import PageHeader from "../../components/common/PageHeader";

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

const OrderDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data, isLoading, error, refetch } = useGetSingleOrderQuery(id!, {
    skip: !id,
  });

  const [deleteOrder] = useDeleteOrderMutation();

  const order = data?.data;

  const handleDelete = async () => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: `Delete order #${order?.order_number}?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
      });

      if (!result.isConfirmed) return;

      await deleteOrder(id!).unwrap();

      await Swal.fire({
        icon: "success",
        title: "Deleted!",
        text: "Order has been deleted.",
        timer: 1500,
        showConfirmButton: false,
      });

      navigate("/orders");
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
        className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium ${colorMap[status] || "bg-gray-500/20 text-gray-400"}`}
      >
        {status.replace(/_/g, " ").toUpperCase()}
      </span>
    );
  };

  if (isLoading) {
    return (
      <div className="rounded-lg border border-gray-base p-6 space-y-4">
        <div className="h-8 w-48 animate-pulse rounded bg-neutral-800" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            <div className="h-32 w-full animate-pulse rounded bg-neutral-800" />
            <div className="h-64 w-full animate-pulse rounded bg-neutral-800" />
          </div>
          <div className="h-64 w-full animate-pulse rounded bg-neutral-800" />
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
            Failed to load order
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

  if (!order) {
    return (
      <div className="flex h-[70vh] flex-col items-center justify-center text-center">
        <Package size={48} className="text-gray-400 mb-3" />
        <h2 className="text-lg font-semibold text-gray-400 mb-2">
          Order not found
        </h2>
        <Link to="/orders">
          <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md text-white">
            Back to Orders
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div className="rounded-lg border bg-black-base border-gray-base overflow-hidden p-6 mb-6">
      <PageHeader
        title={`Order #${order.order_number}`}
        breadcrumbs={[
          { title: "Dashboard", link: "/" },
          { title: "Orders", link: "/orders" },
          { title: `#${order.order_number}` },
        ]}
      />

      <div className="space-y-6">
        {/* Header Actions */}
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => navigate("/orders")}
            className="flex items-center gap-2 px-4 py-2 rounded-md border border-gray-base hover:bg-gray-800 transition"
          >
            <ArrowLeft size={16} /> Back
          </button>
          <Link to={`/edit-order/${id}`}>
            <button className="flex items-center gap-2 px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white transition">
              <Edit size={16} /> Edit
            </button>
          </Link>
          <Link to={`/order-tracking/${id}`}>
            <button className="flex items-center gap-2 px-4 py-2 rounded-md bg-purple-600 hover:bg-purple-700 text-white transition">
              <RefreshCw size={16} /> Track
            </button>
          </Link>
          <button
            onClick={handleDelete}
            className="flex items-center gap-2 px-4 py-2 rounded-md bg-red-600 hover:bg-red-700 text-white transition"
          >
            <Trash2 size={16} /> Delete
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Order Status */}
            <div className="bg-black-solid p-6 rounded-lg border border-gray-base">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-400 mb-2">
                    Order Status
                  </h3>
                  {getStatusBadge(order.order_status, ORDER_STATUS_COLORS)}
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-400 mb-2">
                    Payment Status
                  </h3>
                  {getStatusBadge(order.payment_status, PAYMENT_STATUS_COLORS)}
                </div>
              </div>
            </div>

            {/* Order Items */}
            <div className="bg-black-solid p-6 rounded-lg border border-gray-base">
              <h3 className="text-lg font-semibold mb-4">Order Items</h3>
              <div className="space-y-3">
                {order.items && order.items.length > 0 ? (
                  order.items.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 border-b border-gray-700 last:border-0"
                    >
                      <div>
                        <div className="font-medium">{item.product_name}</div>
                        <div className="text-sm text-gray-400">
                          SKU: {item.sku} | Qty: {item.quantity}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">
                          ${Number(item.unit_price).toFixed(2)}
                        </div>
                        <div className="text-sm text-gray-400">
                          Total: ${Number(item.total_price).toFixed(2)}
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500">No items found</p>
                )}
              </div>

              {/* Order Totals */}
              <div className="mt-4 pt-4 border-t border-gray-700 space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-400">Subtotal</span>
                  <span>${Number(order.subtotal).toFixed(2)}</span>
                </div>
                {Number(order.discount) > 0 && (
                  <div className="flex justify-between text-green-400">
                    <span>Discount</span>
                    <span>-${Number(order.discount).toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-gray-400">Delivery Charge</span>
                  <span>${Number(order.delivery_charge).toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-lg font-bold pt-2 border-t border-gray-700">
                  <span>Total</span>
                  <span>${Number(order.total_amount).toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Customer Info */}
            <div className="bg-black-solid p-6 rounded-lg border border-gray-base">
              <h4 className="font-medium flex items-center gap-2 mb-3">
                <User size={18} /> Customer
              </h4>
              <div className="space-y-2 text-sm">
                <div>
                  <span className="text-gray-400">Name:</span>
                  <span className="ml-2">{order.user?.name || "N/A"}</span>
                </div>
                <div>
                  <span className="text-gray-400">Email:</span>
                  <span className="ml-2">{order.user?.email || "N/A"}</span>
                </div>
                {order.address && (
                  <>
                    <div className="pt-2 border-t border-gray-700">
                      <div className="flex items-center gap-2">
                        <MapPin size={16} className="text-gray-400" />
                        <span className="text-gray-400">Shipping Address</span>
                      </div>
                      <p className="mt-1 text-gray-300">
                        {order.address.address_line}
                      </p>
                      {order.address.phone && (
                        <p className="text-sm text-gray-400">
                          Phone: {order.address.phone}
                        </p>
                      )}
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Order Info */}
            <div className="bg-black-solid p-6 rounded-lg border border-gray-base">
              <h4 className="font-medium flex items-center gap-2 mb-3">
                <Clock size={18} /> Order Info
              </h4>
              <div className="space-y-2 text-sm">
                <div>
                  <span className="text-gray-400">Order ID:</span>
                  <span className="ml-2 font-mono text-xs">{order.id}</span>
                </div>
                <div>
                  <span className="text-gray-400">Payment Method:</span>
                  <span className="ml-2">{order.payment_method}</span>
                </div>
                <div>
                  <span className="text-gray-400">Placed At:</span>
                  <span className="ml-2">
                    {format(
                      new Date(order.placed_at || order.created_at),
                      "MMM d, yyyy h:mm a",
                    )}
                  </span>
                </div>
                {order.notes && (
                  <div className="pt-2 border-t border-gray-700">
                    <span className="text-gray-400">Notes:</span>
                    <p className="mt-1 text-gray-300">{order.notes}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
