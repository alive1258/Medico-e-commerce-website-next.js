// src/pages/Banners/EditBanner.tsx
import React, { useEffect, useState } from "react";
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
  useGetSingleBannerQuery,
  useUpdateBannerMutation,
} from "../../redux/api/bannerApi";

interface EditBannerFormValues {
  title: string;
  image_url: string;
  redirect_url?: string;
  position: number;
  is_active?: boolean;
}

const EditBanner: React.FC = () => {
  const { id } = useParams<"id">();
  const navigate = useNavigate();
  const [imagePreview, setImagePreview] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<EditBannerFormValues>({
    defaultValues: {
      title: "",
      image_url: "",
      redirect_url: "",
      position: 1,
      is_active: true,
    },
  });

  const { data, isLoading: isFetching } = useGetSingleBannerQuery(
    id as string,
    {
      skip: !id,
    },
  );

  const [updateBanner, { isLoading }] = useUpdateBannerMutation();

  useEffect(() => {
    if (data?.data) {
      const banner = data.data;
      setImagePreview(banner.image_url);
      reset({
        title: banner.title,
        image_url: banner.image_url,
        redirect_url: banner.redirect_url || "",
        position: banner.position,
        is_active: banner.is_active,
      });
    }
  }, [data, reset]);

  // Update preview when image_url changes
  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "image_url") {
        setImagePreview((value.image_url as string) || "");
      }
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  const onSubmit: SubmitHandler<EditBannerFormValues> = async (formData) => {
    if (!id) {
      Swal.fire("Error!", "Invalid banner ID", "error");
      return;
    }
    try {
      const response = await updateBanner({
        id,
        data: {
          ...formData,
          position: Number(formData.position),
        },
      }).unwrap();

      if (response?.success) {
        toast.success("Banner updated successfully");
        navigate(-1);
      } else {
        toast.error(response?.message || "Failed to update banner");
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
          <p className="mt-4 text-gray-400">Loading banner...</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`border bg-black-base border-gray-base rounded-lg overflow-hidden p-6 mb-6`}
    >
      <PageHeader
        title="Edit Banner"
        breadcrumbs={[
          { title: "Dashboard", link: "/" },
          { title: "Banners", link: "/banners" },
          { title: "Edit Banner" },
        ]}
      />
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <fieldset disabled={isFetching || isLoading} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Title */}
            <div>
              <Input
                label="Title *"
                type="text"
                text="title"
                placeholder="Enter banner title"
                register={register("title", {
                  required: "Title is required",
                  minLength: {
                    value: 3,
                    message: "Minimum 3 characters required",
                  },
                })}
                errors={errors}
              />
            </div>

            {/* Position */}
            <div>
              <Input
                label="Position *"
                type="number"
                text="position"
                placeholder="1"
                register={register("position", {
                  required: "Position is required",
                  min: {
                    value: 1,
                    message: "Position must be at least 1",
                  },
                  valueAsNumber: true,
                })}
                errors={errors}
              />
              <p className="text-xs text-gray-500 mt-1">
                Lower number = higher priority
              </p>
            </div>

            {/* Image URL */}
            <div className="col-span-2">
              <Input
                label="Image URL *"
                type="text"
                text="image_url"
                placeholder="https://example.com/uploads/banner.jpg"
                register={register("image_url", {
                  required: "Image URL is required",
                  pattern: {
                    value: /^https?:\/\/.+/,
                    message: "Please enter a valid URL",
                  },
                })}
                errors={errors}
              />
              {imagePreview && (
                <div className="mt-2">
                  <p className="text-xs text-gray-500 mb-1">Preview:</p>
                  <div className="w-48 h-24 rounded overflow-hidden border border-gray-base">
                    <img
                      src={imagePreview}
                      alt="Banner preview"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          "/placeholder-image.jpg";
                      }}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Redirect URL */}
            <div className="col-span-2">
              <Input
                label="Redirect URL (Optional)"
                type="text"
                text="redirect_url"
                placeholder="https://example.com/products/summer-sale"
                register={register("redirect_url")}
                errors={errors}
              />
              <p className="text-xs text-gray-500 mt-1">
                Where users will be redirected when clicking the banner
              </p>
            </div>

            {/* Is Active */}
            <div className="flex items-center gap-2 mt-2">
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

export default EditBanner;
