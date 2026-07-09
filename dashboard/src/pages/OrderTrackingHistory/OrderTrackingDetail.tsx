// src/pages/OrderTracking/OrderTrackingDetail.tsx
import React, { useState } from "react";
import { useParams, Link, useNavigate } from "react-router";
import { format } from "date-fns";
import {
  ArrowLeft,
  RefreshCw,
  Package,
  Clock,
  User,
  Calendar,
  MessageSquare,
} from "lucide-react";
import Swal from "sweetalert2";
import { useForm, type SubmitHandler } from "react-hook-form";
import {
  useGetOrderTrackingDetailQuery,
  useUpdateOrderStatusMutation,
  OrderStatusEnum,
  type IOrderStatusUpdate,
} from "../../redux/api/orderTrackingApi";
import type { ApiError } from "../../types/authType";
import PageHeader from "../../components/common/PageHeader";
import GradientButton from "../../components/ui/buttons/GradientButton";
import Input from "../../components/ui/forms/Input";
import { toast } from "react-toastify";

const STATUS_COLORS: Record<OrderStatusEnum, string> = {
  [OrderStatusEnum.PENDING]: "bg-yellow-500/20 text-yellow-400",
  [OrderStatusEnum.CONFIRMED]: "bg-blue-500/20 text-blue-400",
  [OrderStatusEnum.PROCESSING]: "bg-purple-500/20 text-purple-400",
  [OrderStatusEnum.SHIPPED]: "bg-indigo-500/20 text-indigo-400",
  [OrderStatusEnum.OUT_FOR_DELIVERY]: "bg-orange-500/20 text-orange-400",
  [OrderStatusEnum.DELIVERED]: "bg-green-500/20 text-green-400",
  [OrderStatusEnum.CANCELLED]: "bg-red-500/20 text-red-400",
  [OrderStatusEnum.RETURNED]: "bg-pink-500/20 text-pink-400",
  [OrderStatusEnum.REFUNDED]: "bg-gray-500/20 text-gray-400",
};

const STATUS_ICONS: Record<OrderStatusEnum, React.ReactNode> = {
  [OrderStatusEnum.PENDING]: <Clock size={16} />,
  [OrderStatusEnum.CONFIRMED]: <Clock size={16} />,
  [OrderStatusEnum.PROCESSING]: <Clock size={16} />,
  [OrderStatusEnum.SHIPPED]: <Package size={16} />,
  [OrderStatusEnum.OUT_FOR_DELIVERY]: <Package size={16} />,
  [OrderStatusEnum.DELIVERED]: <Package size={16} />,
  [OrderStatusEnum.CANCELLED]: <Clock size={16} />,
  [OrderStatusEnum.RETURNED]: <Clock size={16} />,
  [OrderStatusEnum.REFUNDED]: <Clock size={16} />,
};

interface UpdateStatusForm {
  status: OrderStatusEnum;
  note: string;
}

const OrderTrackingDetail: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const navigate = useNavigate();
  const [isUpdating, setIsUpdating] = useState(false);

  const {
    data: trackingData,
    isLoading,
    error,
    refetch,
  } = useGetOrderTrackingDetailQuery(orderId!, { skip: !orderId });

  const [updateOrderStatus] = useUpdateOrderStatusMutation();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm<UpdateStatusForm>({
    defaultValues: {
      status: OrderStatusEnum.PENDING,
      note: "",
    },
  });

  const trackingDetail = trackingData?.data;
  const currentStatus = trackingDetail?.current_status;

  // Reset form with current status when data loads
  React.useEffect(() => {
    if (currentStatus) {
      reset({
        status: currentStatus,
        note: "",
      });
    }
  }, [currentStatus, reset]);

  const onSubmit: SubmitHandler<UpdateStatusForm> = async (data) => {
    try {
      setIsUpdating(true);
      const response = await updateOrderStatus({
        orderId: orderId!,
        data: {
          status: data.status,
          note: data.note || undefined,
        },
      }).unwrap();

      if (response?.success) {
        toast.success(`Order status updated to ${data.status}`);
        refetch();
        reset({ status: data.status, note: "" });
      }
    } catch (err: unknown) {
      const error = err as ApiError;
      Swal.fire(
        "Error!",
        error.data?.message || "Failed to update status",
        "error",
      );
    } finally {
      setIsUpdating(false);
    }
  };

  const getStatusBadge = (status: OrderStatusEnum) => {
    return (
      <span
        className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium ${STATUS_COLORS[status]}`}
      >
        {STATUS_ICONS[status]}
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
            <div className="space-y-3">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="h-16 w-full animate-pulse rounded bg-neutral-800"
                />
              ))}
            </div>
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
            Failed to load tracking detail
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

  if (!trackingDetail) {
    return (
      <div className="flex h-[70vh] flex-col items-center justify-center text-center">
        <Package size={48} className="text-gray-400 mb-3" />
        <h2 className="text-lg font-semibold text-gray-400 mb-2">
          No tracking information found
        </h2>
        <Link to="/order-tracking">
          <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md text-white">
            Back to Tracking
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div className="rounded-lg border bg-black-base border-gray-base overflow-hidden p-6 mb-6">
      <PageHeader
        title="Order Tracking Detail"
        breadcrumbs={[
          { title: "Dashboard", link: "/" },
          { title: "Order Tracking", link: "/order-tracking" },
          { title: `Order ${orderId?.slice(0, 8)}...` },
        ]}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - History */}
        <div className="lg:col-span-2 space-y-6">
          {/* Current Status */}
          <div className="bg-black-solid p-6 rounded-lg border border-gray-base">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Current Status</h2>
              <button
                onClick={() => refetch()}
                className="p-2 rounded-md hover:bg-gray-800 transition"
              >
                <RefreshCw size={18} />
              </button>
            </div>
            <div className="flex items-center gap-4">
              {getStatusBadge(trackingDetail.current_status)}
              <span className="text-sm text-gray-500">
                Last updated:{" "}
                {format(
                  new Date(
                    trackingDetail.tracking_history[0]?.created_at ||
                      new Date(),
                  ),
                  "MMM d, yyyy h:mm a",
                )}
              </span>
            </div>
          </div>

          {/* Status Timeline */}
          <div className="bg-black-solid p-6 rounded-lg border border-gray-base">
            <h2 className="text-lg font-semibold mb-4">Status Timeline</h2>
            <div className="space-y-4">
              {trackingDetail.tracking_history.length > 0 ? (
                trackingDetail.tracking_history.map((track, index) => (
                  <div
                    key={track.id}
                    className="relative pl-8 pb-6 border-l border-gray-700 last:pb-0"
                  >
                    <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-blue-500 border-2 border-black-base" />
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-3 mb-1">
                          {getStatusBadge(track.status)}
                          {track.note && (
                            <span className="text-sm text-gray-400">
                              {track.note}
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span className="flex items-center gap-1">
                            <User size={14} />
                            {track.user?.name || "System"}
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar size={14} />
                            {format(
                              new Date(track.created_at),
                              "MMM d, yyyy h:mm a",
                            )}
                          </span>
                        </div>
                      </div>
                      {index === 0 && (
                        <span className="text-xs bg-blue-500/20 text-blue-400 px-2 py-1 rounded">
                          Current
                        </span>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-center py-4">
                  No tracking history available
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Right Column - Update Status */}
        <div className="bg-black-solid p-6 rounded-lg border border-gray-base h-fit">
          <h2 className="text-lg font-semibold mb-4">Update Status</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">
                New Status *
              </label>
              <select
                {...register("status", {
                  required: "Status is required",
                })}
                className="w-full px-3 py-2 rounded-md border border-gray-base bg-black-base focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {Object.values(OrderStatusEnum).map((status) => (
                  <option key={status} value={status}>
                    {status.replace(/_/g, " ").toUpperCase()}
                  </option>
                ))}
              </select>
              {errors.status && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.status.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">
                Note
              </label>
              <textarea
                {...register("note")}
                rows={3}
                placeholder="Add optional note about this status change..."
                className="w-full px-3 py-2 rounded-md border border-gray-base bg-black-base focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              />
            </div>

            <GradientButton
              type="submit"
              text={isUpdating ? "Updating..." : "Update Status"}
              disabled={isUpdating || !watch("status")}
              fullWidth
            />

            <button
              type="button"
              onClick={() => navigate("/order-tracking")}
              className="w-full px-4 py-2 rounded-md text-sm border border-gray-base hover:bg-gray-800 transition"
            >
              Back to Tracking
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default OrderTrackingDetail;
