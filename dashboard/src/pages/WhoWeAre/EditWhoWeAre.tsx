/* eslint-disable react-hooks/set-state-in-effect */
import React, { useEffect, useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { Save } from "lucide-react";
import { useGetSingleWhoWeAreQuery, useUpdateWhoWeAreMutation } from "../../redux/api/whoWeAreApi";
import type { WhoWeAre } from "../../types/whoWeAre.types";
import type { ApiError } from "../../types/authType";
import PageHeader from "../../components/common/PageHeader";
import Input from "../../components/ui/forms/Input";
import Textarea from "../../components/ui/forms/Textarea";
import GradientButton from "../../components/ui/buttons/GradientButton";


interface EditWhoWeAreFormValues {
  title: string;
  description: string;
  image?: FileList;
  videoUrl?: string;
}

const EditWhoWeAre: React.FC = () => {
  const { id } = useParams<"id">();
  const navigate = useNavigate();

  const { data, isLoading: isFetching } =
    useGetSingleWhoWeAreQuery(id as string, { skip: !id });

  const [updateWhoWeAre, { isLoading }] = useUpdateWhoWeAreMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EditWhoWeAreFormValues>({
    defaultValues: {
      title: "",
      description: "",
      videoUrl: "",
    },
  });

  // Populate form
  useEffect(() => {
    if (data?.data) {
      const w: WhoWeAre = data.data;

      reset({
        title: w.title,
        description: w.description,
        videoUrl: w.video_url,
      });
    }
  }, [data, reset]);

  // Image preview
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  useEffect(() => {
    if (data?.data?.image) {
      setPreviewImage(
        `${import.meta.env.VITE_PUBLIC_IMAGE_PATH}${data.data.image}?v=${new Date().getTime()}`
      );
    } else {
      setPreviewImage(null);
    }
  }, [data]);

  const onSubmit: SubmitHandler<EditWhoWeAreFormValues> = async (formData) => {
    if (!id) return;

    try {
      const payload = new FormData();

      payload.append("title", formData.title);
      payload.append("description", formData.description);

      if (formData.videoUrl) {
        payload.append("video_url", formData.videoUrl); 
      }

      if (formData.image?.[0]) {
        payload.append("image", formData.image[0]);
      }

      await updateWhoWeAre({ id, data: payload }).unwrap();

      toast.success("Who We Are updated successfully!");
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

  if (isFetching)
    return <p className="text-center mt-10">Loading data...</p>;

  return (
    <div className="border bg-black-base border-gray-base rounded-lg overflow-hidden p-6 mb-6">
      <PageHeader
        title="Edit Who We Are"
        breadcrumbs={[
          { title: "Dashboard", link: "/" },
          { title: "Who We Are", link: "/who-we-are" },
          { title: "Edit" },
        ]}
      />

      <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Title */}
          <Input
            label="Title"
            text="title"
            register={register("title", {
              required: "Title is required",
            })}
            errors={errors}
          />

          {/* Video URL */}
          <Input
            label="Video URL"
            text="videoUrl"
            register={register("videoUrl")}
            errors={errors}
          />

          {/* Image Upload + Preview */}
          <div className="col-span-full">
            <label className="block mb-2 font-semibold text-sm">
              Image
            </label>

            <div className="w-48 h-48 border-2 border-dashed rounded-lg overflow-hidden flex items-center justify-center mb-2 relative border-gray-600 hover:border-blue-500 bg-gray-900">
              <img
                src={previewImage || "/images/default-image.png"}
                alt="Preview"
                className="w-full h-full object-cover"
              />

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

          {/* Description */}
          <div className="col-span-full">
            <Textarea<EditWhoWeAreFormValues>
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
            className="px-4 py-2 border border-gray-base rounded-md"
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

export default EditWhoWeAre;