// src/pages/Brands/EditBrand.tsx
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
  useGetSingleBrandQuery,
  useUpdateBrandMutation,
} from "../../redux/api/brandApi";

interface EditBrandFormValues {
  name: string;
}

const EditBrand: React.FC = () => {
  const { id } = useParams<"id">();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EditBrandFormValues>({
    defaultValues: {
      name: "",
    },
  });

  const { data, isLoading: isFetching } = useGetSingleBrandQuery(id as string, {
    skip: !id,
  });

  const [updateBrand, { isLoading }] = useUpdateBrandMutation();

  useEffect(() => {
    if (data?.data) {
      reset({
        name: data.data.name,
      });
    }
  }, [data, reset]);

  const onSubmit: SubmitHandler<EditBrandFormValues> = async (formData) => {
    if (!id) {
      Swal.fire("Error!", "Invalid brand ID", "error");
      return;
    }
    try {
      const response = await updateBrand({
        id,
        data: formData,
      }).unwrap();

      if (response?.success) {
        toast.success("Brand updated successfully");
        navigate(-1);
      } else {
        toast.error(response?.message || "Failed to update brand");
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
    return (
      <div className="flex justify-center items-center h-[70vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-400">Loading brand...</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`border bg-black-base border-gray-base rounded-lg overflow-hidden p-6 mb-6`}
    >
      <PageHeader
        title="Edit Brand"
        breadcrumbs={[
          { title: "Dashboard", link: "/" },
          { title: "Brands", link: "/brands" },
          { title: "Edit Brand" },
        ]}
      />
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <fieldset disabled={isFetching || isLoading} className="space-y-5">
          <div>
            <Input
              label="Brand Name *"
              type="text"
              text="name"
              placeholder="Enter brand name"
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
              Update the brand name as needed
            </p>
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

export default EditBrand;
