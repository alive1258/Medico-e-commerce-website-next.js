// src/pages/OrderTracking/BulkUpdateStatus.tsx
import React, { useState } from "react";
import { useForm, type SubmitHandler, useFieldArray } from "react-hook-form";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { Plus, Trash2, Save, X } from "lucide-react";
import Swal from "sweetalert2";
import {
  useBulkUpdateOrderStatusMutation,
  OrderStatusEnum,
  type IBulkOrderStatusUpdate,
} from "../../redux/api/orderTrackingApi";
import type { ApiError } from "../../types/authType";
import PageHeader from "../../components/common/PageHeader";
import GradientButton from "../../components/ui/buttons/GradientButton";
import Input from "../../components/ui/forms/Input";

interface BulkUpdateForm extends Omit<IBulkOrderStatusUpdate, "order_ids"> {
  order_ids: { value: string }[];
}

const BulkUpdateStatus: React.FC = () => {
  const navigate = useNavigate();
  const [bulkUpdate, { isLoading }] = useBulkUpdateOrderStatusMutation();

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm<BulkUpdateForm>({
    defaultValues: {
      order_ids: [{ value: "" }],
      status: OrderStatusEnum.PENDING,
      note: "",
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "order_ids",
  });

  const watchedStatus = watch("status");

  const onSubmit: SubmitHandler<BulkUpdateForm> = async (data) => {
    try {
      const orderIds = data.order_ids.map((item) => item.value).filter(Boolean);

      if (orderIds.length === 0) {
        toast.error("Please add at least one valid order ID");
        return;
      }

      const result = await Swal.fire({
        title: "Confirm Bulk Update",
        text: `Update ${orderIds.length} order(s) to ${data.status}?`,
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Yes, Update",
      });

      if (!result.isConfirmed) return;

      const response = await bulkUpdate({
        order_ids: orderIds,
        status: data.status,
        note: data.note,
      }).unwrap();

      if (response?.success) {
        toast.success(`Successfully updated ${orderIds.length} order(s)`);
        navigate("/order-tracking");
      } else {
        toast.error(response?.message || "Failed to update orders");
      }
    } catch (err: unknown) {
      const error = err as ApiError;
      Swal.fire(
        "Error!",
        error.data?.message || "Something went wrong.",
        "error",
      );
    }
  };

  return (
    <div className="rounded-lg border bg-black-base border-gray-base overflow-hidden p-6 mb-6">
      <PageHeader
        title="Bulk Update Order Status"
        breadcrumbs={[
          { title: "Dashboard", link: "/" },
          { title: "Order Tracking", link: "/order-tracking" },
          { title: "Bulk Update" },
        ]}
      />

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Order IDs */}
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">
            Order IDs *
          </label>
          <div className="space-y-2">
            {fields.map((field, index) => (
              <div key={field.id} className="flex gap-2 items-center">
                <Input
                  label=""
                  type="text"
                  text={`order_ids.${index}.value`}
                  placeholder="Enter Order ID (UUID)"
                  register={register(`order_ids.${index}.value` as const, {
                    required: "Order ID is required",
                    pattern: {
                      value:
                        /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i,
                      message: "Invalid UUID format",
                    },
                  })}
                  errors={errors}
                  containerClassName="flex-1"
                />
                <button
                  type="button"
                  onClick={() => remove(index)}
                  className="p-2 rounded-md bg-red-500/20 text-red-500 hover:bg-red-500/30 transition disabled:opacity-50"
                  disabled={fields.length === 1}
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={() => append({ value: "" })}
            className="mt-2 flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300"
          >
            <Plus size={16} /> Add Another Order
          </button>
          {errors.order_ids && (
            <p className="text-red-500 text-xs mt-1">
              {errors.order_ids.message}
            </p>
          )}
        </div>

        {/* Status */}
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
            <p className="text-red-500 text-xs mt-1">{errors.status.message}</p>
          )}
        </div>

        {/* Note */}
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">
            Note
          </label>
          <textarea
            {...register("note")}
            rows={3}
            placeholder="Add note about this bulk status update..."
            className="w-full px-3 py-2 rounded-md border border-gray-base bg-black-base focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          />
        </div>

        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={() => navigate("/order-tracking")}
            className="px-4 py-2 rounded-md text-sm border border-gray-base hover:bg-gray-800 transition"
          >
            Cancel
          </button>
          <GradientButton
            type="submit"
            text={isLoading ? "Updating..." : "Bulk Update"}
            icon={Save}
            disabled={isLoading}
          />
        </div>
      </form>
    </div>
  );
};

export default BulkUpdateStatus;
