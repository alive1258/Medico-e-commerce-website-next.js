// src/pages/Generics/EditGeneric.tsx
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
  useGetSingleGenericQuery,
  useUpdateGenericMutation,
} from "../../redux/api/genericApi";

interface EditGenericFormValues {
  name: string;
  description?: string;
}

const EditGeneric: React.FC = () => {
  const { id } = useParams<"id">();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EditGenericFormValues>({
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const { data, isLoading: isFetching } = useGetSingleGenericQuery(
    id as string,
    {
      skip: !id,
    },
  );

  const [updateGeneric, { isLoading }] = useUpdateGenericMutation();

  useEffect(() => {
    if (data?.data) {
      reset({
        name: data.data.name,
        description: data.data.description || "",
      });
    }
  }, [data, reset]);

  const onSubmit: SubmitHandler<EditGenericFormValues> = async (formData) => {
    if (!id) {
      Swal.fire("Error!", "Invalid generic ID", "error");
      return;
    }
    try {
      const response = await updateGeneric({
        id,
        data: formData,
      }).unwrap();

      if (response?.success) {
        toast.success("Generic updated successfully");
        navigate(-1);
      } else {
        toast.error(response?.message || "Failed to update generic");
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
          <p className="mt-4 text-gray-400">Loading generic...</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`border bg-black-base border-gray-base rounded-lg overflow-hidden p-6 mb-6`}
    >
      <PageHeader
        title="Edit Generic"
        breadcrumbs={[
          { title: "Dashboard", link: "/" },
          { title: "Generics", link: "/generics" },
          { title: "Edit Generic" },
        ]}
      />
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <fieldset disabled={isFetching || isLoading} className="space-y-5">
          <div>
            <Input
              label="Generic Name *"
              type="text"
              text="name"
              placeholder="Enter generic name"
              register={register("name", {
                required: "Generic name is required",
                minLength: {
                  value: 2,
                  message: "Minimum 2 characters required",
                },
                maxLength: {
                  value: 255,
                  message: "Maximum 255 characters allowed",
                },
              })}
              errors={errors}
            />
          </div>

          <div>
            <Input
              label="Description (Optional)"
              type="text"
              text="description"
              placeholder="Enter description"
              register={register("description", {
                maxLength: {
                  value: 1000,
                  message: "Maximum 1000 characters allowed",
                },
              })}
              errors={errors}
            />
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

export default EditGeneric;
