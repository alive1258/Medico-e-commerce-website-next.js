// src/pages/Banners/AddBanner.tsx
import React from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { Plus } from "lucide-react";
import { useCreateBannerMutation } from "../../redux/api/bannerApi";
import GradientButton from "../../components/ui/buttons/GradientButton";
import Swal from "sweetalert2";
import type { ApiError } from "../../types/authType";
import PageHeader from "../../components/common/PageHeader";
import Input from "../../components/ui/forms/Input";

/* =======================
   Types
======================= */
interface AddBannerFormValues {
  title: string;
  image_url: string;
  redirect_url?: string;
  position: number;
  is_active?: boolean;
}

/* =======================
   Component
======================= */
const AddBanner: React.FC = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    watch,
  } = useForm<AddBannerFormValues>({
    defaultValues: {
      title: "",
      image_url: "",
      redirect_url: "",
      position: 1,
      is_active: true,
    },
  });

  const [createBanner, { isLoading }] = useCreateBannerMutation();

  /* =======================
     Submit Handler
  ======================= */
  const onSubmit: SubmitHandler<AddBannerFormValues> = async (data) => {
    try {
      const response = await createBanner({
        ...data,
        position: Number(data.position),
      }).unwrap();

      if (response?.success) {
        toast.success("Banner added successfully");
        reset();
        navigate(-1);
      } else {
        toast.error(response?.message || "Failed to add banner");
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
        title="Add New Banner"
        breadcrumbs={[
          { title: "Dashboard", link: "/" },
          { title: "Banners", link: "/banners" },
          { title: "Add Banner" },
        ]}
      />

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
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
            {watch("image_url") && (
              <div className="mt-2">
                <p className="text-xs text-gray-500 mb-1">Preview:</p>
                <div className="w-48 h-24 rounded overflow-hidden border border-gray-base">
                  <img
                    src={watch("image_url")}
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

export default AddBanner;
