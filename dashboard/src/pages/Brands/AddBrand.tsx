// src/pages/Brands/AddBrand.tsx
import React from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { Plus } from "lucide-react";
import { useCreateBrandMutation } from "../../redux/api/brandApi";
import GradientButton from "../../components/ui/buttons/GradientButton";
import Swal from "sweetalert2";
import type { ApiError } from "../../types/authType";
import PageHeader from "../../components/common/PageHeader";
import Input from "../../components/ui/forms/Input";

/* =======================
   Types
======================= */
interface AddBrandFormValues {
  name: string;
}

/* =======================
   Component
======================= */
const AddBrand: React.FC = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AddBrandFormValues>({
    defaultValues: {
      name: "",
    },
  });

  const [createBrand, { isLoading }] = useCreateBrandMutation();

  /* =======================
     Submit Handler
  ======================= */
  const onSubmit: SubmitHandler<AddBrandFormValues> = async (data) => {
    try {
      const response = await createBrand(data).unwrap();

      if (response?.success) {
        toast.success("Brand added successfully");
        reset();
        navigate(-1);
      } else {
        toast.error(response?.message || "Failed to add brand");
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
        title="Add New Brand"
        breadcrumbs={[
          { title: "Dashboard", link: "/" },
          { title: "Brands", link: "/brands" },
          { title: "Add Brand" },
        ]}
      />

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div>
          <Input
            label="Brand Name *"
            type="text"
            text="name"
            placeholder="Enter brand name (e.g., Square, Beximco)"
            register={register("name", {
              required: "Brand name is required",
              minLength: {
                value: 2,
                message: "Minimum 2 characters required",
              },
              maxLength: {
                value: 100,
                message: "Maximum 100 characters allowed",
              },
            })}
            errors={errors}
          />
          <p className="text-xs text-gray-500 mt-1">
            Enter the brand name as it should appear
          </p>
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

export default AddBrand;
