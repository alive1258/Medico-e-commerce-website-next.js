// src/pages/InventoryLogs/AddInventoryLog.tsx
import React from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { Plus } from "lucide-react";
import {
  useCreateInventoryLogMutation,
  InventoryLogType,
} from "../../redux/api/inventoryLogApi";
import GradientButton from "../../components/ui/buttons/GradientButton";
import Swal from "sweetalert2";
import type { ApiError } from "../../types/authType";
import PageHeader from "../../components/common/PageHeader";
import Input from "../../components/ui/forms/Input";

/* =======================
   Types
======================= */
interface AddInventoryLogFormValues {
  product_variant_id: string;
  type: InventoryLogType;
  quantity: number;
  reference_id: string;
  remarks?: string;
}

/* =======================
   Component
======================= */
const AddInventoryLog: React.FC = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<AddInventoryLogFormValues>({
    defaultValues: {
      product_variant_id: "",
      type: InventoryLogType.PURCHASE,
      quantity: 0,
      reference_id: "",
      remarks: "",
    },
  });

  const [createLog, { isLoading }] = useCreateInventoryLogMutation();
  const logType = watch("type");

  /* =======================
     Submit Handler
  ======================= */
  const onSubmit: SubmitHandler<AddInventoryLogFormValues> = async (data) => {
    try {
      const response = await createLog({
        ...data,
        quantity: Number(data.quantity),
      }).unwrap();

      if (response?.success) {
        toast.success("Inventory log added successfully");
        reset();
        navigate(-1);
      } else {
        toast.error(response?.message || "Failed to add inventory log");
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
        title="Add Inventory Log"
        breadcrumbs={[
          { title: "Dashboard", link: "/" },
          { title: "Inventory Logs", link: "/inventory-logs" },
          { title: "Add Log" },
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
              The variant whose inventory is being tracked
            </p>
          </div>

          {/* Type */}
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">
              Log Type *
            </label>
            <select
              {...register("type", {
                required: "Log type is required",
              })}
              className="w-full px-3 py-2 rounded-md border border-gray-base bg-black-base focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {Object.values(InventoryLogType).map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
            {errors.type && (
              <p className="text-red-500 text-xs mt-1">{errors.type.message}</p>
            )}
            <p className="text-xs text-gray-500 mt-1">
              {logType === InventoryLogType.PURCHASE &&
                "Stock added to inventory"}
              {logType === InventoryLogType.SALE && "Stock removed due to sale"}
              {logType === InventoryLogType.RETURN &&
                "Stock returned to inventory"}
              {logType === InventoryLogType.ADJUSTMENT &&
                "Manual inventory adjustment"}
            </p>
          </div>

          {/* Quantity */}
          <div>
            <Input
              label={`Quantity * (${logType === InventoryLogType.PURCHASE || logType === InventoryLogType.RETURN ? "Positive" : "Negative"})`}
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
            <p className="text-xs text-gray-500 mt-1">
              {logType === InventoryLogType.PURCHASE ||
              logType === InventoryLogType.RETURN
                ? "Enter positive number (stock added)"
                : "Enter positive number (stock removed)"}
            </p>
          </div>

          {/* Reference ID */}
          <div>
            <Input
              label="Reference ID *"
              type="text"
              text="reference_id"
              placeholder="Enter reference UUID (Order, Purchase, etc.)"
              register={register("reference_id", {
                required: "Reference ID is required",
              })}
              errors={errors}
            />
            <p className="text-xs text-gray-500 mt-1">
              Order ID, Purchase ID, Return ID, etc.
            </p>
          </div>

          {/* Remarks */}
          <div className="col-span-2">
            <Input
              label="Remarks"
              type="text"
              text="remarks"
              placeholder="e.g., Order placed successfully"
              register={register("remarks")}
              errors={errors}
            />
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

export default AddInventoryLog;
