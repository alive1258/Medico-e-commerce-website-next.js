import React from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { Plus } from "lucide-react";
import { useCreateCategoriesMutation } from "../../redux/api/categoriesApi";
import GradientButton from "../../components/ui/buttons/GradientButton";
import Swal from "sweetalert2";
import type { ApiError } from "../../types/authType";
import PageHeader from "../../components/common/PageHeader";
import Input from "../../components/ui/forms/Input";

/* =======================
   Types
======================= */
interface AddCategoryFormValues {
  name: string;
}

interface ApiResponse {
  success: boolean;
  message?: string;
}

/* =======================
   Component
======================= */
const AddCategory: React.FC = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AddCategoryFormValues>({
    defaultValues: {
      name: "",
    },
  });

  const [createCategory, { isLoading }] = useCreateCategoriesMutation();


  /* =======================
     Submit Handler
  ======================= */
  const onSubmit: SubmitHandler<AddCategoryFormValues> = async (data) => {
    try {
      const response = (await createCategory(data).unwrap()) as ApiResponse;

      if (response?.success) {
        toast.success("Category added successfully");
        reset();
        navigate(-1);
      } else {
        toast.error(response?.message || "Failed to add category");
      }
    } catch (err: unknown) {
      const error = err as ApiError; // Type assertion

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
    <div
      className={`rounded-lg border bg-black-base border-gray-base overflow-hidden p-6 mb-6`}
    >
      {/* Header */}
      <PageHeader
        title="Add New Category"
        breadcrumbs={[
          { title: "Dashboard", link: "/" },
          { title: "Categories", link: "/categories" },
          { title: "Add Category" },
        ]}
      />

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Category Name */}
        <div>
          <Input
            label="Category Name"
            type="text"
            text="name"
            placeholder="Enter category name"
            register={register("name", {
              required: "Category name is required",
              minLength: {
                value: 2,
                message: "Minimum 2 characters required",
              },
            })}
            errors={errors}
          />
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3">
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

export default AddCategory;
