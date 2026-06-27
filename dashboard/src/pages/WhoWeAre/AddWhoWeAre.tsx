// components/admin/whoWeAre/AddWhoWeAre.tsx
import React from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { Plus } from "lucide-react";
import { useCreateWhoWeAreMutation } from "../../redux/api/whoWeAreApi";
import type { ApiError } from "../../types/authType";
import PageHeader from "../../components/common/PageHeader";
import Input from "../../components/ui/forms/Input";
import Textarea from "../../components/ui/forms/Textarea";
import GradientButton from "../../components/ui/buttons/GradientButton";


interface AddWhoWeAreFormValues {
  title: string;
  description: string;
  image?: FileList;
  videoUrl?: string;
}

const AddWhoWeAre: React.FC = () => {
  const navigate = useNavigate();
  const [createWhoWeAre, { isLoading }] = useCreateWhoWeAreMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AddWhoWeAreFormValues>({
    defaultValues: {
      title: "",
      description: "",
      videoUrl: "",
    },
  });

  const onSubmit: SubmitHandler<AddWhoWeAreFormValues> = async (formData) => {
    try {
      const payload = new FormData();

      payload.append("title", formData.title);
      payload.append("description", formData.description);

      if (formData.videoUrl) {
        payload.append("video_url", formData.videoUrl); // ✅ match backend DTO
      }

      if (formData.image?.[0]) {
        payload.append("image", formData.image[0]);
      }

      await createWhoWeAre(payload).unwrap();

      toast.success("Who We Are created successfully!");
      reset();
      navigate("/who-we-are");
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
        title="Create Who We Are"
        breadcrumbs={[
          { title: "Dashboard", link: "/" },
          { title: "Who We Are", link: "/who-we-are" },
          { title: "Add Who We Are" },
        ]}
      />

      <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Title */}
          <Input
            label="Title"
            text="title"
            placeholder="We are a digital agency..."
            register={register("title", {
              required: "Title is required",
            })}
            errors={errors}
          />

          {/* Video URL */}
          <Input
            label="Video URL"
            text="videoUrl"
            placeholder="https://youtube.com/..."
            register={register("videoUrl")}
            errors={errors}
          />

          {/* Image Upload */}
          <div className="col-span-full border-2 border-dashed rounded-lg p-4 hover:border-blue-400">
            <label className="block mb-2 font-semibold text-sm">
              Image
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
            <Textarea<AddWhoWeAreFormValues>
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
            text={isLoading ? "Creating..." : "Create"}
            icon={Plus}
            disabled={isLoading}
          />
        </div>
      </form>
    </div>
  );
};

export default AddWhoWeAre;