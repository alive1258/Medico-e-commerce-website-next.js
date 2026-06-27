/* eslint-disable react-hooks/set-state-in-effect */
import React, { useEffect, useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { ImageIcon, Save } from "lucide-react";
import {
  useGetSingleHeroeQuery,
  useUpdateHeroeMutation,
} from "../../../redux/api/heroesApi";
import type { Hero } from "../../../types/hero.types";
import PageHeader from "../../../components/common/PageHeader";
import type { ApiError } from "../../../types/authType";
import Input from "../../../components/ui/forms/Input";
import Textarea from "../../../components/ui/forms/Textarea";
import GradientButton from "../../../components/ui/buttons/GradientButton";

interface EditHeroFormValues {
  title: string;
  description: string;
  company: string;
  score: number;
  rating: number;
  campaigns?: number;
  revenue?: number;
  image?: FileList;
  videoUrl?: string;
}

const EditHeroSection: React.FC = () => {
  const { id } = useParams<"id">();
  const navigate = useNavigate();

  const { data: heroData, isLoading: isFetching } = useGetSingleHeroeQuery(
    id as string,
    { skip: !id },
  );

  const [updateHero, { isLoading }] = useUpdateHeroeMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EditHeroFormValues>({
    defaultValues: {
      title: "",
      description: "",
      company: "",
      score: 0,
      rating: 0,
      campaigns: 0,
      revenue: 0,
    },
  });

  // Populate form
  useEffect(() => {
    if (heroData?.data) {
      const h: Hero = heroData.data;

      reset({
        title: h.title,
        description: h.description,
        company: h.company,
        score: h.score,
        rating: h.rating,
        campaigns: h.campaigns,
        revenue: h.revenue,
        videoUrl: h.videoUrl,
      });
    }
  }, [heroData, reset]);

  // Image preview
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  useEffect(() => {
    if (heroData?.data?.image) {
      setPreviewImage(
        `${import.meta.env.VITE_PUBLIC_IMAGE_PATH}${heroData.data.image}?v=${new Date().getTime()}`,
      );
    } else {
      setPreviewImage(null);
    }
  }, [heroData]);

  const onSubmit: SubmitHandler<EditHeroFormValues> = async (formData) => {
    if (!id) return;

    try {
      const payload = new FormData();

      payload.append("title", formData.title);
      payload.append("description", formData.description);
      payload.append("company", formData.company);
      payload.append("score", String(formData.score));
      payload.append("rating", String(formData.rating));

      if (formData.campaigns !== undefined)
        payload.append("campaigns", String(formData.campaigns));

      if (formData.revenue !== undefined)
        payload.append("revenue", String(formData.revenue));

      if (formData.videoUrl) payload.append("videoUrl", formData.videoUrl);

      if (formData.image?.[0]) payload.append("image", formData.image[0]);

      await updateHero({ id, data: payload }).unwrap();

      toast.success("Hero updated successfully!");
      navigate(-1);
    } catch (err) {
      const error = err as ApiError;

      Swal.fire({
        title: "Update Failed",
        text: Array.isArray(error.data?.message)
          ? error.data.message.join(", ")
          : error.data?.message || "Something went wrong",
        icon: "error",
      });
    }
  };

  if (isFetching) return <p className="text-center mt-10">Loading hero...</p>;

  return (
    <div className="border bg-black-base border-gray-base rounded-lg overflow-hidden p-6 mb-6">
      <PageHeader
        title="Edit Hero"
        breadcrumbs={[
          { title: "Dashboard", link: "/" },
          { title: "Heroes", link: "/home-hero" },
          { title: "Edit Hero" },
        ]}
      />

      <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="Hero Title"
            text="title"
            register={register("title", {
              required: "Title is required",
            })}
            errors={errors}
          />

          <Input
            label="Company"
            text="company"
            register={register("company", {
              required: "Company is required",
            })}
            errors={errors}
          />

          <Input
            label="Score"
            text="score"
            type="number"
            register={register("score", {
              valueAsNumber: true,
              min: 0,
            })}
            errors={errors}
          />

          <Input
            label="Rating (0-5)"
            text="rating"
            type="number"
            register={register("rating", {
              valueAsNumber: true,
              min: 0,
              max: 5,
            })}
            errors={errors}
          />

          <Input
            label="Campaigns"
            text="campaigns"
            type="number"
            register={register("campaigns", {
              valueAsNumber: true,
            })}
            errors={errors}
          />

          <Input
            label="Revenue"
            text="revenue"
            type="number"
            register={register("revenue", {
              valueAsNumber: true,
            })}
            errors={errors}
          />

          <Input
            label="Video URL"
            text="videoUrl"
            register={register("videoUrl")}
            errors={errors}
          />

          {/* Image Upload + Preview */}
          <div className="col-span-full">
            <label className="block mb-2 font-semibold text-sm">
              Hero Image
            </label>

            <div className="w-48 h-48 border-2 border-dashed rounded-lg overflow-hidden flex items-center justify-center mb-2 relative border-gray-600 hover:border-blue-500 bg-gray-900">
              {/* ✅ Show image if exists */}
              {previewImage ? (
                <img
                  src={previewImage}
                  alt="Hero"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="flex flex-col items-center justify-center text-gray-400">
                  <ImageIcon size={40} />
                  <p className="text-xs mt-2">Upload Image</p>
                </div>
              )}

              {/* File Input */}
              <input
                type="file"
                accept="image/*"
                className="absolute inset-0 opacity-0 cursor-pointer"
                {...register("image", {
                  onChange: (e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const url = URL.createObjectURL(file);
                      setPreviewImage(url);
                    }
                  },
                })}
              />
            </div>
          </div>

          <div className="col-span-full">
            <Textarea<EditHeroFormValues>
              label="Description"
              text="description"
              register={register("description", {
                required: "Description is required",
              })}
              errors={errors}
            />
          </div>
        </div>

        <div className="flex justify-end gap-4 mt-6">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="px-4 py-2 border border-gray-base rounded-md"
          >
            Cancel
          </button>

          <GradientButton
            type="submit"
            text={isLoading ? "Updating..." : "Update Hero"}
            icon={Save}
            disabled={isLoading}
          />
        </div>
      </form>
    </div>
  );
};

export default EditHeroSection;
