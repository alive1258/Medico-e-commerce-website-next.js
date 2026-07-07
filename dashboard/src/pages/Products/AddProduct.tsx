// src/pages/products/AddProduct.tsx
import React from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { Plus } from "lucide-react";
import { useCreateProductMutation } from "../../redux/api/productApi";
import GradientButton from "../../components/ui/buttons/GradientButton";
import Swal from "sweetalert2";
import type { ApiError } from "../../types/authType";
import PageHeader from "../../components/common/PageHeader";
import Input from "../../components/ui/forms/Input";

interface AddProductFormValues {
  name: string;
  slug: string;
  category_id: string;
  generic_id: string;
  brand_id: string;
  manufacturer: string;
  is_prescription_required: boolean;
  is_active: boolean;
  meta_title?: string;
  meta_keywords?: string;
  meta_description?: string;
}

const AddProduct: React.FC = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AddProductFormValues>({
    defaultValues: {
      name: "",
      slug: "",
      category_id: "",
      generic_id: "",
      brand_id: "",
      manufacturer: "",
      is_prescription_required: false,
      is_active: true,
    },
  });

  const [createProduct, { isLoading }] = useCreateProductMutation();

  const onSubmit: SubmitHandler<AddProductFormValues> = async (data) => {
    try {
      const response = await createProduct(data).unwrap();

      if (response?.success) {
        toast.success("Product added successfully");
        reset();
        navigate(-1);
      } else {
        toast.error(response?.message || "Failed to add product");
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

  return (
    <div className="rounded-lg border bg-black-base border-gray-base overflow-hidden p-6 mb-6">
      <PageHeader
        title="Add New Product"
        breadcrumbs={[
          { title: "Dashboard", link: "/" },
          { title: "Products", link: "/products" },
          { title: "Add Product" },
        ]}
      />

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Product Name */}
          <div>
            <Input
              label="Product Name *"
              type="text"
              text="name"
              placeholder="Enter product name"
              register={register("name", {
                required: "Product name is required",
                minLength: {
                  value: 2,
                  message: "Minimum 2 characters required",
                },
              })}
              errors={errors}
            />
          </div>

          {/* Slug */}
          <div>
            <Input
              label="Slug (Optional)"
              type="text"
              text="slug"
              placeholder="auto-generated from name"
              register={register("slug")}
              errors={errors}
            />
            <p className="text-xs text-gray-500 mt-1">
              Leave empty to auto-generate from name
            </p>
          </div>

          {/* Category ID */}
          <div>
            <Input
              label="Category ID *"
              type="text"
              text="category_id"
              placeholder="Enter category UUID"
              register={register("category_id", {
                required: "Category ID is required",
              })}
              errors={errors}
            />
          </div>

          {/* Generic ID */}
          <div>
            <Input
              label="Generic ID *"
              type="text"
              text="generic_id"
              placeholder="Enter generic UUID"
              register={register("generic_id", {
                required: "Generic ID is required",
              })}
              errors={errors}
            />
          </div>

          {/* Brand ID */}
          <div>
            <Input
              label="Brand ID *"
              type="text"
              text="brand_id"
              placeholder="Enter brand UUID"
              register={register("brand_id", {
                required: "Brand ID is required",
              })}
              errors={errors}
            />
          </div>

          {/* Manufacturer */}
          <div>
            <Input
              label="Manufacturer"
              type="text"
              text="manufacturer"
              placeholder="Enter manufacturer name"
              register={register("manufacturer")}
              errors={errors}
            />
          </div>

          {/* Prescription Required */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="is_prescription_required"
              {...register("is_prescription_required")}
              className="w-4 h-4"
            />
            <label htmlFor="is_prescription_required" className="text-sm">
              Prescription Required
            </label>
          </div>

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

          {/* Meta Title */}
          <div>
            <Input
              label="Meta Title"
              type="text"
              text="meta_title"
              placeholder="Enter meta title"
              register={register("meta_title")}
              errors={errors}
            />
          </div>

          {/* Meta Keywords */}
          <div>
            <Input
              label="Meta Keywords"
              type="text"
              text="meta_keywords"
              placeholder="Enter meta keywords"
              register={register("meta_keywords")}
              errors={errors}
            />
          </div>

          {/* Meta Description */}
          <div className="col-span-2">
            <Input
              label="Meta Description"
              type="text"
              text="meta_description"
              placeholder="Enter meta description"
              register={register("meta_description")}
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

export default AddProduct;
