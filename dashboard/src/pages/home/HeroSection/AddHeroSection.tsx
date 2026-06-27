import React from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { Plus } from "lucide-react";
import { useCreateHeroeMutation } from "../../../redux/api/heroesApi";
import type { ApiError } from "../../../types/authType";
import PageHeader from "../../../components/common/PageHeader";
import Input from "../../../components/ui/forms/Input";
import Textarea from "../../../components/ui/forms/Textarea";
import GradientButton from "../../../components/ui/buttons/GradientButton";


interface AddHeroFormValues {
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

const AddHeroSection: React.FC = () => {
  const navigate = useNavigate();
  const [createHero, { isLoading }] = useCreateHeroeMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AddHeroFormValues>({
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

  const onSubmit: SubmitHandler<AddHeroFormValues> = async (formData) => {
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

      if (formData.videoUrl)
        payload.append("videoUrl", formData.videoUrl);

      if (formData.image?.[0]) {
        payload.append("image", formData.image[0]);
      }

      await createHero(payload).unwrap();

      toast.success("Hero created successfully!");
      reset();
      navigate("/home-hero");
    } catch (err) {
      const error = err as ApiError;

      Swal.fire({
        title: "Submission Failed",
        text:
          (Array.isArray(error.data?.message)
            ? error.data?.message.join(", ")
            : error.data?.message) || "Something went wrong",
        icon: "error",
      });
    }
  };

  return (
    <div className="rounded-lg border bg-black-base border-gray-base overflow-hidden p-6 mb-6">
      <PageHeader
        title="Create Hero Section"
        breadcrumbs={[
          { title: "Dashboard", link: "/" },
          { title: "Heroes", link: "/home-hero" },
          { title: "Add Hero" },
        ]}
      />

      <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          <Input
            label="Hero Title"
            text="title"
            placeholder="Powerful Digital Solutions"
            register={register("title", {
              required: "Title is required",
            })}
            errors={errors}
          />

          <Input
            label="Company Name"
            text="company"
            placeholder="Tech Corp"
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
              required: "Score is required",
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
              required: "Rating is required",
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

          {/* Image Upload */}
          <div className="col-span-full border-2 border-dashed rounded-lg p-4 hover:border-blue-400">
            <label className="block mb-2 font-semibold text-sm">
              Hero Image
            </label>
            <input
              type="file"
              accept="image/*"
              {...register("image")}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
          </div>

          {/* Description */}
          <div className="col-span-full">
            <Textarea<AddHeroFormValues>
              label="Description"
              text="description"
              register={register("description", {
                required: "Description is required",
              })}
              errors={errors}
            />
          </div>
        </div>

        {/* ACTIONS */}
        <div className="flex justify-end gap-4 mt-6">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="px-4 py-2 rounded-md text-sm border border-gray-base"
          >
            Cancel
          </button>

          <GradientButton
            type="submit"
            text={isLoading ? "Creating..." : "Create Hero"}
            icon={Plus}
            disabled={isLoading}
          />
        </div>
      </form>
    </div>
  );
};

export default AddHeroSection;