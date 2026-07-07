// src/pages/Coupons/AddCoupon.tsx
import React from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { Plus } from "lucide-react";
import {
  useCreateCouponMutation,
  DiscountType,
} from "../../redux/api/couponApi";
import GradientButton from "../../components/ui/buttons/GradientButton";
import Swal from "sweetalert2";
import type { ApiError } from "../../types/authType";
import PageHeader from "../../components/common/PageHeader";
import Input from "../../components/ui/forms/Input";

/* =======================
   Types
======================= */
interface AddCouponFormValues {
  code: string;
  discount_type: DiscountType;
  discount_value: number;
  minimum_order_amount?: number;
  maximum_discount_amount?: number;
  start_date?: string;
  end_date?: string;
  usage_limit: number;
  per_user_limit: number;
  is_active: boolean;
  description?: string;
  applicable_products?: string[];
  applicable_categories?: string[];
  excluded_products?: string[];
  excluded_categories?: string[];
  is_first_order_only: boolean;
  is_combinable: boolean;
}

/* =======================
   Component
======================= */
const AddCoupon: React.FC = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<AddCouponFormValues>({
    defaultValues: {
      code: "",
      discount_type: DiscountType.PERCENTAGE,
      discount_value: 10,
      usage_limit: 100,
      per_user_limit: 1,
      is_active: true,
      is_first_order_only: false,
      is_combinable: false,
    },
  });

  const [createCoupon, { isLoading }] = useCreateCouponMutation();

  // eslint-disable-next-line react-hooks/incompatible-library
  const discountType = watch("discount_type");

  /* =======================
     Submit Handler
  ======================= */
  const onSubmit: SubmitHandler<AddCouponFormValues> = async (data) => {
    try {
      const response = await createCoupon({
        ...data,
        code: data.code.toUpperCase(),
      }).unwrap();

      if (response?.success) {
        toast.success("Coupon added successfully");
        reset();
        navigate(-1);
      } else {
        toast.error(response?.message || "Failed to add coupon");
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
        title="Add New Coupon"
        breadcrumbs={[
          { title: "Dashboard", link: "/" },
          { title: "Coupons", link: "/coupons" },
          { title: "Add Coupon" },
        ]}
      />

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Coupon Code */}
          <div>
            <Input
              label="Coupon Code *"
              type="text"
              text="code"
              placeholder="e.g., SUMMER2024"
              register={register("code", {
                required: "Coupon code is required",
                minLength: {
                  value: 3,
                  message: "Minimum 3 characters required",
                },
                maxLength: {
                  value: 50,
                  message: "Maximum 50 characters allowed",
                },
              })}
              errors={errors}
            />
            <p className="text-xs text-gray-500 mt-1">
              Code will be automatically converted to uppercase
            </p>
          </div>

          {/* Discount Type */}
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">
              Discount Type *
            </label>
            <select
              {...register("discount_type", {
                required: "Discount type is required",
              })}
              className="w-full px-3 py-2 rounded-md border border-gray-base bg-black-base focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value={DiscountType.PERCENTAGE}>Percentage</option>
              <option value={DiscountType.FIXED}>Fixed Amount</option>
            </select>
            {errors.discount_type && (
              <p className="text-red-500 text-xs mt-1">
                {errors.discount_type.message}
              </p>
            )}
          </div>

          {/* Discount Value */}
          <div>
            <Input
              label={`Discount Value * (${discountType === DiscountType.PERCENTAGE ? "%" : "$"})`}
              type="number"
              text="discount_value"
              placeholder={
                discountType === DiscountType.PERCENTAGE ? "10" : "5.00"
              }
              register={register("discount_value", {
                required: "Discount value is required",
                min: {
                  value: 0.01,
                  message: "Discount value must be greater than 0",
                },
                valueAsNumber: true,
                validate: (value) => {
                  if (discountType === DiscountType.PERCENTAGE && value > 100) {
                    return "Percentage discount cannot exceed 100%";
                  }
                  return true;
                },
              })}
              errors={errors}
            />
          </div>

          {/* Minimum Order Amount */}
          <div>
            <Input
              label="Minimum Order Amount"
              type="number"
              text="minimum_order_amount"
              placeholder="50.00"
              register={register("minimum_order_amount", {
                min: {
                  value: 0,
                  message: "Minimum amount must be 0 or greater",
                },
                valueAsNumber: true,
              })}
              errors={errors}
            />
            <p className="text-xs text-gray-500 mt-1">
              Leave empty for no minimum requirement
            </p>
          </div>

          {/* Maximum Discount Amount */}
          {discountType === DiscountType.PERCENTAGE && (
            <div>
              <Input
                label="Maximum Discount Amount"
                type="number"
                text="maximum_discount_amount"
                placeholder="20.00"
                register={register("maximum_discount_amount", {
                  min: {
                    value: 0,
                    message: "Maximum amount must be 0 or greater",
                  },
                  valueAsNumber: true,
                })}
                errors={errors}
              />
              <p className="text-xs text-gray-500 mt-1">
                Maximum discount amount for percentage coupons
              </p>
            </div>
          )}

          {/* Start Date */}
          <div>
            <Input
              label="Start Date"
              text="start_date"
              placeholder="Select start date"
              register={register("start_date")}
              errors={errors}
            />
          </div>

          {/* End Date */}
          <div>
            <Input
              label="End Date"
              text="end_date"
              placeholder="Select end date"
              register={register("end_date")}
              errors={errors}
            />
          </div>

          {/* Usage Limit */}
          <div>
            <Input
              label="Usage Limit"
              type="number"
              text="usage_limit"
              placeholder="100"
              register={register("usage_limit", {
                required: "Usage limit is required",
                min: {
                  value: 1,
                  message: "Usage limit must be at least 1",
                },
                valueAsNumber: true,
              })}
              errors={errors}
            />
          </div>

          {/* Per User Limit */}
          <div>
            <Input
              label="Per User Limit"
              type="number"
              text="per_user_limit"
              placeholder="1"
              register={register("per_user_limit", {
                required: "Per user limit is required",
                min: {
                  value: 1,
                  message: "Per user limit must be at least 1",
                },
                valueAsNumber: true,
              })}
              errors={errors}
            />
            <p className="text-xs text-gray-500 mt-1">Maximum uses per user</p>
          </div>

          {/* Description */}
          <div className="col-span-2">
            <Input
              label="Description"
              type="text"
              text="description"
              placeholder="e.g., Get 20% off on all medicines"
              register={register("description")}
              errors={errors}
            />
          </div>

          {/* Additional Options */}
          <div className="col-span-2">
            <div className="bg-black-solid p-4 rounded-lg border border-gray-base space-y-3">
              <p className="text-sm font-medium text-gray-400">
                Additional Options
              </p>

              <div className="flex flex-wrap gap-6">
                {/* Is Active */}
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="is_active"
                    {...register("is_active")}
                    className="w-4 h-4"
                  />
                  <label htmlFor="is_active" className="text-sm">
                    Active
                  </label>
                </div>

                {/* Is First Order Only */}
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="is_first_order_only"
                    {...register("is_first_order_only")}
                    className="w-4 h-4"
                  />
                  <label htmlFor="is_first_order_only" className="text-sm">
                    First Order Only
                  </label>
                </div>

                {/* Is Combinable */}
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="is_combinable"
                    {...register("is_combinable")}
                    className="w-4 h-4"
                  />
                  <label htmlFor="is_combinable" className="text-sm">
                    Combinable with Other Offers
                  </label>
                </div>
              </div>
            </div>
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

export default AddCoupon;
