// src/pages/Generics/AddGeneric.tsx
import React from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { Plus } from "lucide-react";
import { useCreateGenericMutation } from "../../redux/api/genericApi";
import GradientButton from "../../components/ui/buttons/GradientButton";
import Swal from "sweetalert2";
import type { ApiError } from "../../types/authType";
import PageHeader from "../../components/common/PageHeader";
import Input from "../../components/ui/forms/Input";

/* =======================
   Types
======================= */
interface AddGenericFormValues {
  name: string;
  description?: string;
}

/* =======================
   Component
======================= */
const AddGeneric: React.FC = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AddGenericFormValues>({
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const [createGeneric, { isLoading }] = useCreateGenericMutation();

  /* =======================
     Submit Handler
  ======================= */
  const onSubmit: SubmitHandler<AddGenericFormValues> = async (data) => {
    try {
      const response = await createGeneric(data).unwrap();

      if (response?.success) {
        toast.success("Generic added successfully");
        reset();
        navigate(-1);
      } else {
        toast.error(response?.message || "Failed to add generic");
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
        title="Add New Generic"
        breadcrumbs={[
          { title: "Dashboard", link: "/" },
          { title: "Generics", link: "/generics" },
          { title: "Add Generic" },
        ]}
      />

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div>
          <Input
            label="Generic Name *"
            type="text"
            text="name"
            placeholder="Enter generic name (e.g., Paracetamol, Amoxicillin)"
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
          <p className="text-xs text-gray-500 mt-1">
            Enter the generic medicine name
          </p>
        </div>

        <div>
          <Input
            label="Description (Optional)"
            type="text"
            text="description"
            placeholder="Enter description (e.g., Paracetamol is used to treat pain and reduce fever)"
            register={register("description", {
              maxLength: {
                value: 1000,
                message: "Maximum 1000 characters allowed",
              },
            })}
            errors={errors}
          />
          <p className="text-xs text-gray-500 mt-1">
            Provide additional information about the generic medicine
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

export default AddGeneric;
