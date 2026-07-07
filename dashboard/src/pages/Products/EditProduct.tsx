// src/pages/products/EditProduct.tsx
import React, { useEffect } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";
import { Save } from "lucide-react";
import Swal from "sweetalert2";
import GradientButton from "../../components/ui/buttons/GradientButton";
import PageHeader from "../../components/common/PageHeader";
import Input from "../../components/ui/forms/Input";
import type { ApiError } from "../../types/authType";
import {
  useGetSingleProductQuery,
  useUpdateProductMutation,
} from "../../redux/api/productApi";

interface EditProductFormValues {
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

const EditProduct: React.FC = () => {
  const { id } = useParams<"id">();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EditProductFormValues>({
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

  const { data, isLoading: isFetching } = useGetSingleProductQuery(
    id as string,
    {
      skip: !id,
    },
  );

  const [updateProduct, { isLoading }] = useUpdateProductMutation();

  useEffect(() => {
    if (data?.data) {
      const product = data.data;
      reset({
        name: product.name,
        slug: product.slug,
        category_id: product.category_id,
        generic_id: product.generic_id,
        brand_id: product.brand_id,
        manufacturer: product.manufacturer || "",
        is_prescription_required: product.is_prescription_required,
        is_active: product.is_active,
        meta_title: product.meta_title || "",
        meta_keywords: product.meta_keywords || "",
        meta_description: product.meta_description || "",
      });
    }
  }, [data, reset]);

  const onSubmit: SubmitHandler<EditProductFormValues> = async (formData) => {
    if (!id) {
      Swal.fire("Error!", "Invalid product ID", "error");
      return;
    }
    try {
      const response = await updateProduct({
        id,
        data: formData,
      }).unwrap();

      if (response?.success) {
        toast.success("Product updated successfully");
        navigate(-1);
      } else {
        toast.error(response?.message || "Failed to update product");
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

  if (isFetching) {
    return <p className="text-center mt-10">Loading product...</p>;
  }

  return (
    <div
      className={`border bg-black-base border-gray-base rounded-lg overflow-hidden p-6 mb-6`}
    >
      <PageHeader
        title="Edit Product"
        breadcrumbs={[
          { title: "Dashboard", link: "/" },
          { title: "Products", link: "/products" },
          { title: "Edit Product" },
        ]}
      />
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <fieldset disabled={isFetching || isLoading} className="space-y-5">
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
                label="Slug"
                type="text"
                text="slug"
                placeholder="Enter slug"
                register={register("slug")}
                errors={errors}
              />
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
        </fieldset>
        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className={`px-4 py-2 rounded-md text-sm border border-gray-base`}
          >
            Cancel
          </button>

          <GradientButton
            type="submit"
            text={isLoading ? "Updating..." : "Update"}
            icon={Save}
            disabled={isLoading}
          />
        </div>
      </form>
    </div>
  );
};

export default EditProduct;
