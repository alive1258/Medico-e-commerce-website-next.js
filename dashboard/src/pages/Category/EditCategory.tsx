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
  useGetSingleCategorieQuery,
  useUpdateCategorieMutation,
} from "../../redux/api/categoriesApi";

interface EditCategoryFormValues {
  name: string;
}

interface ApiResponse {
  success: boolean;
  message?: string;
}

const EditCategory: React.FC = () => {
  const { id } = useParams<"id">();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EditCategoryFormValues>({
    defaultValues: {
      name: "",
    },
  });

  const { data, isLoading: isFetching } = useGetSingleCategorieQuery(
    id as string,
    {
      skip: !id,
    },
  );

  const [updateCategory, { isLoading }] = useUpdateCategorieMutation();

  useEffect(() => {
    if (data?.data) {
      reset({
        name: data.data.name,
      });
    }
  }, [data, reset]);

  const onSubmit: SubmitHandler<EditCategoryFormValues> = async (formData) => {
    if (!id) {
      Swal.fire("Error!", "Invalid category ID", "error");
      return;
    }
    try {
      const response = (await updateCategory({
        id,
        data: formData,
      }).unwrap()) as ApiResponse;

      if (response?.success) {
        toast.success("Category updated successfully");
        navigate(-1);
      } else {
        toast.error(response?.message || "Failed to update category");
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
    return <p className="text-center mt-10">Loading category...</p>;
  }

  return (
    <div
      className={`border bg-black-base border-gray-base rounded-lg  overflow-hidden p-6 mb-6`}
    >
      <PageHeader
        title="Edit Category"
        breadcrumbs={[
          { title: "Dashboard", link: "/" },
          { title: "Categories", link: "/categories" },
          { title: "Edit Category" },
        ]}
      />
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <fieldset disabled={isFetching || isLoading} className="space-y-5">
          <Input
            label="Category Name"
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

export default EditCategory;
