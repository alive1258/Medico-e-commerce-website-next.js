// src/pages/OrderItems/AddOrderItem.tsx
import React from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { Plus } from "lucide-react";
import {
  useCreateOrderItemMutation,
  type ICreateOrderItem,
} from "../../redux/api/orderItemApi";
import GradientButton from "../../components/ui/buttons/GradientButton";
import Swal from "sweetalert2";
import type { ApiError } from "../../types/authType";
import PageHeader from "../../components/common/PageHeader";
import Input from "../../components/ui/forms/Input";

/* =======================
   Types
======================= */
type AddOrderItemFormValues = ICreateOrderItem;

/* =======================
   Component
======================= */
const AddOrderItem: React.FC = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<AddOrderItemFormValues>({
    defaultValues: {
      product_variant_id: "",
      product_name: "",
      sku: "",
      quantity: 1,
      unit_price: 0,
      total_price: 0,
    },
  });

  const [createOrderItem, { isLoading }] = useCreateOrderItemMutation();

  // Watch quantity and unit_price to auto-calculate total_price
  const quantity = watch("quantity");
  const unitPrice = watch("unit_price");
  const calculatedTotal = (quantity || 0) * (unitPrice || 0);

  /* =======================
     Submit Handler
  ======================= */
  const onSubmit: SubmitHandler<AddOrderItemFormValues> = async (data) => {
    try {
      const response = await createOrderItem({
        ...data,
        quantity: Number(data.quantity),
        unit_price: Number(data.unit_price),
        total_price: Number(data.total_price),
      }).unwrap();

      if (response?.success) {
        toast.success("Order item added successfully");
        reset();
        navigate(-1);
      } else {
        toast.error(response?.message || "Failed to add order item");
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

  /* =======================
     Render
  ======================= */
  return (
    <div className="rounded-lg border bg-black-base border-gray-base overflow-hidden p-6 mb-6">
      <PageHeader
        title="Add Order Item"
        breadcrumbs={[
          { title: "Dashboard", link: "/" },
          { title: "Order Items", link: "/order-items" },
          { title: "Add Order Item" },
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
            <p className="text-xs text-gray-500 mt-1">
              The variant being ordered
            </p>
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
            onClick={() => navigate(-1)}
            className="px-4 py-2 rounded-md text-sm border border-gray-base"
          >
            Cancel
          </button>
          <GradientButton
            type="submit"
            text={isLoading ? "Saving..." : "Submit"}
            icon={Plus}
            disabled={isLoading}
          />
        </div>
      </form>
    </div>
  );
};

export default AddOrderItem;
