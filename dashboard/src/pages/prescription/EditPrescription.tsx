// src/pages/Prescriptions/EditPrescription.tsx
import React, { useEffect, useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";
import { Save, X, FileText } from "lucide-react";
import Swal from "sweetalert2";
import {
  useGetSinglePrescriptionQuery,
  useUpdatePrescriptionMutation,
  PrescriptionStatus,
  type IUpdatePrescription,
} from "../../redux/api/prescriptionApi";
import type { ApiError } from "../../types/authType";
import PageHeader from "../../components/common/PageHeader";
import GradientButton from "../../components/ui/buttons/GradientButton";
import Input from "../../components/ui/forms/Input";

interface EditPrescriptionForm extends IUpdatePrescription {
  status: PrescriptionStatus;
  admin_note: string;
}

const EditPrescription: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors, isDirty },
  } = useForm<EditPrescriptionForm>({
    defaultValues: {
      status: PrescriptionStatus.PENDING,
      image_url: "",
      admin_note: "",
    },
  });

  const { data: prescriptionData, isLoading: isLoadingPrescription } =
    useGetSinglePrescriptionQuery(id!, { skip: !id });

  const [updatePrescription, { isLoading: isUpdating }] =
    useUpdatePrescriptionMutation();

  const imageUrl = watch("image_url");

  useEffect(() => {
    if (prescriptionData?.data) {
      const prescription = prescriptionData.data;
      reset({
        status: prescription.status,
        image_url: prescription.image_url,
        admin_note: prescription.admin_note || "",
      });
      if (prescription.image_url) {
        setImagePreview(prescription.image_url);
      }
    }
  }, [prescriptionData, reset]);

  // Handle image URL preview
  const handleImageUrlChange = (url: string) => {
    setValue("image_url", url);
    if (url && (url.startsWith("http") || url.startsWith("data:"))) {
      setImagePreview(url);
    } else {
      setImagePreview(null);
    }
  };

  const onSubmit: SubmitHandler<EditPrescriptionForm> = async (data) => {
    try {
      const response = await updatePrescription({
        id: id!,
        data: {
          image_url: data.image_url,
          status: data.status,
          admin_note: data.admin_note,
        },
      }).unwrap();

      if (response?.success) {
        toast.success("Prescription updated successfully");
        navigate(`/prescriptions/${id}`);
      } else {
        toast.error(response?.message || "Failed to update prescription");
      }
    } catch (err: unknown) {
      const error = err as ApiError;
      Swal.fire(
        "Error!",
        error.data?.message || "Something went wrong.",
        "error",
      );
    }
  };

  if (isLoadingPrescription) {
    return (
      <div className="rounded-lg border border-gray-base p-6">
        <div className="space-y-4">
          <div className="h-8 w-48 animate-pulse rounded bg-neutral-800" />
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="h-12 w-full animate-pulse rounded bg-neutral-800"
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-lg border bg-black-base border-gray-base overflow-hidden p-6 mb-6">
      <PageHeader
        title="Edit Prescription"
        breadcrumbs={[
          { title: "Dashboard", link: "/" },
          { title: "Prescriptions", link: "/prescriptions" },
          {
            title: `Prescription #${id?.slice(0, 8)}`,
            link: `/prescriptions/${id}`,
          },
          { title: "Edit" },
        ]}
      />

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Status */}
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">
              Status *
            </label>
            <select
              {...register("status", {
                required: "Status is required",
              })}
              className="w-full px-3 py-2 rounded-md border border-gray-base bg-black-base focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {Object.values(PrescriptionStatus).map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
            {errors.status && (
              <p className="text-red-500 text-xs mt-1">
                {errors.status.message}
              </p>
            )}
          </div>

          {/* Image URL */}
          <div>
            <Input
              label="Image URL *"
              type="text"
              text="image_url"
              placeholder="https://example.com/uploads/prescription.jpg"
              register={register("image_url", {
                required: "Image URL is required",
                pattern: {
                  value:
                    /^https?:\/\/.+\.(jpg|jpeg|png|gif|webp|svg|bmp|tiff|heic)/i,
                  message: "Please enter a valid image URL",
                },
              })}
              errors={errors}
              onChange={(e) => handleImageUrlChange(e.target.value)}
            />
          </div>
        </div>

        {/* Image Preview */}
        {imagePreview && (
          <div className="bg-black-solid p-4 rounded-lg border border-gray-base">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-400">Preview</span>
              <button
                type="button"
                onClick={() => {
                  setImagePreview(null);
                  setValue("image_url", "");
                }}
                className="p-1 rounded-md hover:bg-gray-800"
              >
                <X size={16} className="text-gray-400" />
              </button>
            </div>
            <img
              src={imagePreview}
              alt="Prescription preview"
              className="max-h-64 w-auto mx-auto rounded-lg border border-gray-base object-contain"
              onError={() => {
                setImagePreview(null);
                toast.error("Failed to load image preview");
              }}
            />
          </div>
        )}

        {/* Admin Note */}
        <div>
          <Input
            label="Admin Note"
            type="text"
            text="admin_note"
            placeholder="Enter admin note"
            register={register("admin_note")}
            errors={errors}
          />
          <p className="text-xs text-gray-500 mt-1">
            Add or update the admin note for this prescription
          </p>
        </div>

        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={() => navigate(`/prescriptions/${id}`)}
            className="px-4 py-2 rounded-md text-sm border border-gray-base"
          >
            Cancel
          </button>
          <GradientButton
            type="submit"
            text={isUpdating ? "Updating..." : "Update Prescription"}
            icon={Save}
            disabled={isUpdating || !isDirty}
          />
        </div>
      </form>
    </div>
  );
};

export default EditPrescription;
