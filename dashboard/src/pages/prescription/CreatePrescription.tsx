// src/pages/Prescriptions/CreatePrescription.tsx
import React, { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { Upload, FileText, X } from "lucide-react";
import Swal from "sweetalert2";
import {
  useCreatePrescriptionMutation,
  type ICreatePrescription,
} from "../../redux/api/prescriptionApi";
import type { ApiError } from "../../types/authType";
import PageHeader from "../../components/common/PageHeader";
import GradientButton from "../../components/ui/buttons/GradientButton";
import Input from "../../components/ui/forms/Input";

interface CreatePrescriptionForm extends ICreatePrescription {
  // We'll handle image URL as a separate field
}

const CreatePrescription: React.FC = () => {
  const navigate = useNavigate();
  const [createPrescription, { isLoading }] = useCreatePrescriptionMutation();
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<CreatePrescriptionForm>({
    defaultValues: {
      image_url: "",
      admin_note: "",
    },
  });

  const imageUrl = watch("image_url");

  // Handle image URL preview
  const handleImageUrlChange = (url: string) => {
    setValue("image_url", url);
    if (url && (url.startsWith("http") || url.startsWith("data:"))) {
      setImagePreview(url);
    } else {
      setImagePreview(null);
    }
  };

  const onSubmit: SubmitHandler<CreatePrescriptionForm> = async (data) => {
    try {
      const response = await createPrescription({
        image_url: data.image_url,
        admin_note: data.admin_note,
      }).unwrap();

      if (response?.success) {
        toast.success("Prescription uploaded successfully");
        navigate("/prescriptions");
      } else {
        toast.error(response?.message || "Failed to upload prescription");
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

  return (
    <div className="rounded-lg border bg-black-base border-gray-base overflow-hidden p-6 mb-6">
      <PageHeader
        title="Upload Prescription"
        breadcrumbs={[
          { title: "Dashboard", link: "/" },
          { title: "Prescriptions", link: "/prescriptions" },
          { title: "Upload Prescription" },
        ]}
      />

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div className="space-y-4">
          {/* Image URL */}
          <div>
            <Input
              label="Prescription Image URL *"
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
            <p className="text-xs text-gray-500 mt-1">
              Enter the URL of the uploaded prescription image
            </p>
          </div>

          {/* Image Preview */}
          {imagePreview && (
            <div className="relative bg-black-solid p-4 rounded-lg border border-gray-base">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-400">
                  Preview
                </span>
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
              placeholder="Optional note for admin reference"
              register={register("admin_note")}
              errors={errors}
            />
            <p className="text-xs text-gray-500 mt-1">
              Add any additional information for the admin
            </p>
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={() => navigate("/prescriptions")}
            className="px-4 py-2 rounded-md text-sm border border-gray-base"
          >
            Cancel
          </button>
          <GradientButton
            type="submit"
            text={isLoading ? "Uploading..." : "Upload Prescription"}
            icon={Upload}
            disabled={isLoading}
          />
        </div>
      </form>
    </div>
  );
};

export default CreatePrescription;
