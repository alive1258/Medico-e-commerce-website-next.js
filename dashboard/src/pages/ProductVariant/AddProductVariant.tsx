import React from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { Plus } from "lucide-react";
import { useCreateProductVariantMutation } from "../../redux/api/productVariantApi";
import GradientButton from "../../components/ui/buttons/GradientButton";
import Swal from "sweetalert2";
import type { ApiError } from "../../types/authType";
import PageHeader from "../../components/common/PageHeader";
import Input from "../../components/ui/forms/Input";

/* =======================
   Types
======================= */
interface AddProductVariantFormValues {
  product_id: string;
  strength: string;
  pack_size: string;
  sku: string;
  price: number;
  discount_price?: number;
  stock: number;
  weight?: number;
  expiry_date?: string;
  is_active: boolean;
}

/* =======================
   Component
======================= */
const AddProductVariant: React.FC = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AddProductVariantFormValues>({
    defaultValues: {
      product_id: "",
      strength: "",
      pack_size: "",
      sku: "",
      price: 0,
      discount_price: 0,
      stock: 0,
      weight: 0,
      expiry_date: "",
      is_active: true,
    },
  });

  const [createVariant, { isLoading }] = useCreateProductVariantMutation();

  /* =======================
     Submit Handler
  ======================= */
  const onSubmit: SubmitHandler<AddProductVariantFormValues> = async (data) => {
    try {
      // Convert string numbers to actual numbers
      const formData = {
        ...data,
        price: Number(data.price),
        discount_price: data.discount_price
          ? Number(data.discount_price)
          : undefined,
        stock: Number(data.stock),
        weight: data.weight ? Number(data.weight) : undefined,
        expiry_date: data.expiry_date || undefined,
      };

      const response = await createVariant(formData).unwrap();

      if (response?.success) {
        toast.success("Product variant added successfully");
        reset();
        navigate(-1);
      } else {
        toast.error(response?.message || "Failed to add product variant");
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
        title="Add New Product Variant"
        breadcrumbs={[
          { title: "Dashboard", link: "/" },
          { title: "Product Variants", link: "/product-variants" },
          { title: "Add Variant" },
        ]}
      />

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Product ID */}
          <div>
            <Input
              label="Product ID *"
              type="text"
              text="product_id"
              placeholder="Enter product UUID"
              register={register("product_id", {
                required: "Product ID is required",
              })}
              errors={errors}
            />
          </div>

          {/* Strength */}
          <div>
            <Input
              label="Strength *"
              type="text"
              text="strength"
              placeholder="e.g., 500mg"
              register={register("strength", {
                required: "Strength is required",
              })}
              errors={errors}
            />
          </div>

          {/* Pack Size */}
          <div>
            <Input
              label="Pack Size *"
              type="text"
              text="pack_size"
              placeholder="e.g., 10 Tablets"
              register={register("pack_size", {
                required: "Pack size is required",
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
              placeholder="e.g., NAPA-500-10TAB"
              register={register("sku", {
                required: "SKU is required",
              })}
              errors={errors}
            />
          </div>

          {/* Price */}
          <div>
            <Input
              label="Price *"
              type="number"
              text="price"
              placeholder="0.00"
              register={register("price", {
                required: "Price is required",
                min: {
                  value: 0,
                  message: "Price must be greater than or equal to 0",
                },
                valueAsNumber: true,
              })}
              errors={errors}
            />
          </div>

          {/* Discount Price */}
          <div>
            <Input
              label="Discount Price"
              type="number"
              text="discount_price"
              placeholder="0.00"
              register={register("discount_price", {
                min: {
                  value: 0,
                  message: "Discount price must be greater than or equal to 0",
                },
                valueAsNumber: true,
              })}
              errors={errors}
            />
          </div>

          {/* Stock */}
          <div>
            <Input
              label="Stock *"
              type="number"
              text="stock"
              placeholder="0"
              register={register("stock", {
                required: "Stock is required",
                min: {
                  value: 0,
                  message: "Stock must be greater than or equal to 0",
                },
                valueAsNumber: true,
              })}
              errors={errors}
            />
          </div>

          {/* Weight */}
          <div>
            <Input
              label="Weight (kg)"
              type="number"
              text="weight"
              placeholder="0.00"
              register={register("weight", {
                min: {
                  value: 0,
                  message: "Weight must be greater than or equal to 0",
                },
                valueAsNumber: true,
              })}
              errors={errors}
            />
          </div>

          {/* Expiry Date */}
          <div>
            <Input
              label="Expiry Date"
              text="expiry_date"
              placeholder="Select expiry date"
              register={register("expiry_date")}
              errors={errors}
            />
          </div>

          {/* Is Active */}
          <div className="flex items-center gap-2 mt-2">
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

export default AddProductVariant;
