// src/pages/OrderItems/EditOrderItem.tsx
import React, { useEffect } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";
import { Save } from "lucide-react";
import {
  useGetSingleOrderItemQuery,
  useUpdateOrderItemMutation,
  type IUpdateOrderItem,
} from "../../redux/api/orderItemApi";
import GradientButton from "../../components/ui/buttons/GradientButton";
import Swal from "sweetalert2";
import type { ApiError } from "../../types/authType";
import PageHeader from "../../components/common/PageHeader";
import Input from "../../components/ui/forms/Input";

/* =======================
   Types
======================= */
type EditOrderItemFormValues = IUpdateOrderItem;

/* =======================
   Component
======================= */
const EditOrderItem: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isDirty },
  } = useForm<EditOrderItemFormValues>({
    defaultValues: {
      product_variant_id: "",
      product_name: "",
      sku: "",
      quantity: 0,
      unit_price: 0,
      total_price: 0,
    },
  });

  const { data: orderItemData, isLoading: isLoadingOrderItem } =
    useGetSingleOrderItemQuery(id!, {
      skip: !id,
    });

  const [updateOrderItem, { isLoading: isUpdating }] =
    useUpdateOrderItemMutation();

  // Watch quantity and unit_price to auto-calculate total_price
  const quantity = watch("quantity");
  const unitPrice = watch("unit_price");
  const calculatedTotal = (quantity || 0) * (unitPrice || 0);

  // Populate form when data is loaded
  useEffect(() => {
    if (orderItemData?.data) {
      const item = orderItemData.data;
      reset({
        product_variant_id: item.product_variant_id,
        product_name: item.product_name,
        sku: item.sku,
        quantity: Number(item.quantity),
        unit_price: Number(item.unit_price),
        total_price: Number(item.total_price),
      });
    }
  }, [orderItemData, reset]);

  /* =======================
     Submit Handler
  ======================= */
  const onSubmit: SubmitHandler<EditOrderItemFormValues> = async (data) => {
    try {
      const response = await updateOrderItem({
        id: id!,
        data: {
          ...data,
          quantity: Number(data.quantity),
          unit_price: Number(data.unit_price),
          total_price: Number(data.total_price),
        },
      }).unwrap();

      if (response?.success) {
        toast.success("Order item updated successfully");
        navigate("/order-items");
      } else {
        toast.error(response?.message || "Failed to update order item");
      }
    } catch (err: unknown) {
      const error = err as ApiError;
      Swal.fire(
        "Error!",
        error.data?.message || error.message || "Something went wrong.",
        "error",
      );
    }
  };

  if (isLoadingOrderItem) {
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
        title="Edit Order Item"
        breadcrumbs={[
          { title: "Dashboard", link: "/" },
          { title: "Order Items", link: "/order-items" },
          { title: "Edit Order Item" },
        ]}
      />

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Product Variant ID */}
          <div>
            <Input
              label="Product Variant ID *"
              type="text"
              text="product_variant_id"
              placeholder="Enter product variant UUID"
              register={register("product_variant_id", {
                required: "Product variant ID is required",
              })}
              errors={errors}
            />
          </div>

          {/* Product Name */}
          <div>
            <Input
              label="Product Name *"
              type="text"
              text="product_name"
              placeholder="Enter product name"
              register={register("product_name", {
                required: "Product name is required",
              })}
              errors={errors}
            />
          </div>

          {/* SKU */}
          <div>
            <Input
              label="SKU *"
              type="text"
              text="sku"
              placeholder="Enter SKU"
              register={register("sku", {
                required: "SKU is required",
              })}
              errors={errors}
            />
          </div>

          {/* Quantity */}
          <div>
            <Input
              label="Quantity *"
              type="number"
              text="quantity"
              placeholder="Enter quantity"
              register={register("quantity", {
                required: "Quantity is required",
                min: {
                  value: 1,
                  message: "Quantity must be at least 1",
                },
                valueAsNumber: true,
              })}
              errors={errors}
            />
          </div>

          {/* Unit Price */}
          <div>
            <Input
              label="Unit Price ($) *"
              type="number"
              text="unit_price"
              placeholder="Enter unit price"
              register={register("unit_price", {
                required: "Unit price is required",
                min: {
                  value: 0,
                  message: "Unit price must be 0 or greater",
                },
                valueAsNumber: true,
              })}
              errors={errors}
            />
          </div>

          {/* Total Price (Auto-calculated) */}
          <div>
            <Input
              label="Total Price ($) *"
              type="number"
              text="total_price"
              placeholder="Total will auto-calculate"
              register={register("total_price", {
                required: "Total price is required",
                valueAsNumber: true,
                validate: (value) => {
                  if (value !== calculatedTotal) {
                    return "Total price should equal quantity × unit price";
                  }
                  return true;
                },
              })}
              errors={errors}
              value={calculatedTotal}
              readOnly
            />
            <p className="text-xs text-gray-500 mt-1">
              Auto-calculated: {quantity} × ${unitPrice} = $
              {calculatedTotal.toFixed(2)}
            </p>
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={() => navigate("/order-items")}
            className="px-4 py-2 rounded-md text-sm border border-gray-base"
          >
            Cancel
          </button>
          <GradientButton
            type="submit"
            text={isUpdating ? "Updating..." : "Update"}
            icon={Save}
            disabled={isUpdating || !isDirty}
          />
        </div>
      </form>
    </div>
  );
};

export default EditOrderItem;
