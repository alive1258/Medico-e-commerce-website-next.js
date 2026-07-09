// src/pages/Orders/EditOrder.tsx
import React, { useEffect } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";
import { Save } from "lucide-react";
import Swal from "sweetalert2";
import {
  useGetSingleOrderQuery,
  useUpdateOrderMutation,
  type IUpdateOrder,
} from "../../redux/api/orderApi";
import type { ApiError } from "../../types/authType";
import PageHeader from "../../components/common/PageHeader";
import GradientButton from "../../components/ui/buttons/GradientButton";
import Input from "../../components/ui/forms/Input";

interface EditOrderForm extends IUpdateOrder {
  payment_status: string;
  order_status: string;
}

const EditOrder: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm<EditOrderForm>({
    defaultValues: {
      order_status: "",
      payment_status: "",
      notes: "",
      discount: 0,
      delivery_charge: 0,
    },
  });

  const { data: orderData, isLoading: isLoadingOrder } = useGetSingleOrderQuery(
    id!,
    { skip: !id },
  );

  const [updateOrder, { isLoading: isUpdating }] = useUpdateOrderMutation();

  useEffect(() => {
    if (orderData?.data) {
      const order = orderData.data;
      reset({
        order_status: order.order_status,
        payment_status: order.payment_status,
        notes: order.notes || "",
        discount: Number(order.discount),
        delivery_charge: Number(order.delivery_charge),
      });
    }
  }, [orderData, reset]);

  const onSubmit: SubmitHandler<EditOrderForm> = async (data) => {
    try {
      const response = await updateOrder({
        id: id!,
        data: {
          order_status: data.order_status,
          payment_status: data.payment_status,
          notes: data.notes,
          discount: Number(data.discount),
          delivery_charge: Number(data.delivery_charge),
        },
      }).unwrap();

      if (response?.success) {
        toast.success("Order updated successfully");
        navigate(`/orders/${id}`);
      } else {
        toast.error(response?.message || "Failed to update order");
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

  if (isLoadingOrder) {
    return (
      <div className="rounded-lg border border-gray-base p-6">
        <div className="space-y-4">
          <div className="h-8 w-48 animate-pulse rounded bg-neutral-800" />
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="h-12 w-full animate-pulse rounded bg-neutral-800"
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-lg border bg-black-base border-gray-base overflow-hidden p-6 mb-6">
      <PageHeader
        title={`Edit Order #${orderData?.data?.order_number || ""}`}
        breadcrumbs={[
          { title: "Dashboard", link: "/" },
          { title: "Orders", link: "/orders" },
          { title: `#${orderData?.data?.order_number || ""}` },
          { title: "Edit" },
        ]}
      />

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Order Status */}
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">
              Order Status
            </label>
            <select
              {...register("order_status")}
              className="w-full px-3 py-2 rounded-md border border-gray-base bg-black-base focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="processing">Processing</option>
              <option value="shipped">Shipped</option>
              <option value="out_for_delivery">Out for Delivery</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
              <option value="returned">Returned</option>
              <option value="refunded">Refunded</option>
            </select>
          </div>

          {/* Payment Status */}
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">
              Payment Status
            </label>
            <select
              {...register("payment_status")}
              className="w-full px-3 py-2 rounded-md border border-gray-base bg-black-base focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="pending">Pending</option>
              <option value="paid">Paid</option>
              <option value="failed">Failed</option>
              <option value="refunded">Refunded</option>
            </select>
          </div>

          {/* Discount */}
          <Input
            label="Discount ($)"
            type="number"
            text="discount"
            placeholder="0.00"
            register={register("discount", {
              min: { value: 0, message: "Min 0" },
              valueAsNumber: true,
            })}
            errors={errors}
          />

          {/* Delivery Charge */}
          <Input
            label="Delivery Charge ($)"
            type="number"
            text="delivery_charge"
            placeholder="0.00"
            register={register("delivery_charge", {
              min: { value: 0, message: "Min 0" },
              valueAsNumber: true,
            })}
            errors={errors}
          />

          {/* Notes */}
          <div className="md:col-span-2">
            <Input
              label="Notes"
              type="text"
              text="notes"
              placeholder="Order notes"
              register={register("notes")}
              errors={errors}
            />
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={() => navigate(`/orders/${id}`)}
            className="px-4 py-2 rounded-md text-sm border border-gray-base"
          >
            Cancel
          </button>
          <GradientButton
            type="submit"
            text={isUpdating ? "Updating..." : "Update Order"}
            icon={Save}
            disabled={isUpdating || !isDirty}
          />
        </div>
      </form>
    </div>
  );
};

export default EditOrder;
