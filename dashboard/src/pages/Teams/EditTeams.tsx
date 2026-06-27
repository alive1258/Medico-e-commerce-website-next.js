// components/admin/teams/EditTeams.tsx
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { Save } from "lucide-react";
import { useGetSingleTeamQuery, useUpdateTeamMutation } from "../../redux/api/teamsApi";
import type { Team } from "../../types/team.types";
import type { ApiError } from "../../types/authType";
import PageHeader from "../../components/common/PageHeader";
import Input from "../../components/ui/forms/Input";
import GradientButton from "../../components/ui/buttons/GradientButton";

interface EditTeamFormValues {
  name: string;
  designation: string;
  image?: FileList;
  linkedin_url?: string;
  portfolio_url?: string;
  facebook_url?: string;
}

const EditTeams: React.FC = () => {
  const { id } = useParams<"id">();
  const navigate = useNavigate();

  const { data, isLoading: isFetching } = useGetSingleTeamQuery(id as string, { skip: !id });
  const [updateTeam, { isLoading }] = useUpdateTeamMutation();

  const { register, handleSubmit, reset, formState: { errors } } = useForm<EditTeamFormValues>({
    defaultValues: {
      name: "",
      designation: "",
      linkedin_url: "",
      portfolio_url: "",
      facebook_url: "",
    },
  });

  /* ================= Prefill Form ================= */
  useEffect(() => {
    if (data?.data) {
      const t: Team = data.data;
      reset({
        name: t.name,
        designation: t.designation,
        linkedin_url: t.linkedin_url || "",
        portfolio_url: t.portfolio_url || "",
        facebook_url: t.facebook_url || "",
      });
    }
  }, [data]);

  /* ================= Image Preview ================= */
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  useEffect(() => {
    if (data?.data?.image) {
      setPreviewImage(`${import.meta.env.VITE_PUBLIC_IMAGE_PATH}${data.data.image}?v=${new Date().getTime()}`);
    } else {
      setPreviewImage(null);
    }
  }, [data]);

  /* ================= Submit Handler ================= */
  const onSubmit: SubmitHandler<EditTeamFormValues> = async (formData) => {
    if (!id) return;

    try {
      const payload = new FormData();
      payload.append("name", formData.name);
      payload.append("designation", formData.designation);

      if (formData.linkedin_url) payload.append("linkedin_url", formData.linkedin_url);
      if (formData.portfolio_url) payload.append("portfolio_url", formData.portfolio_url);
      if (formData.facebook_url) payload.append("facebook_url", formData.facebook_url);
      if (formData.image?.[0]) payload.append("image", formData.image[0]);

      await updateTeam({ id, data: payload }).unwrap();

      toast.success("Team member updated successfully!");
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

  if (isFetching) return <p className="text-center mt-10">Loading data...</p>;

  return (
    <div className="border bg-black-base border-gray-base rounded-lg overflow-hidden p-6 mb-6">
      <PageHeader
        title="Edit Team Member"
        breadcrumbs={[
          { title: "Dashboard", link: "/" },
          { title: "Teams", link: "/teams" },
          { title: "Edit" },
        ]}
      />

      <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Name */}
          <Input
            label="Full Name"
            text="name"
            register={register("name", { required: "Name is required" })}
            errors={errors}
          />

          {/* Designation */}
          <Input
            label="Designation"
            text="designation"
            register={register("designation", { required: "Designation is required" })}
            errors={errors}
          />

          {/* LinkedIn */}
          <Input
            label="LinkedIn URL"
            text="linkedin_url"
            register={register("linkedin_url")}
            errors={errors}
          />

          {/* Portfolio */}
          <Input
            label="Portfolio URL"
            text="portfolio_url"
            register={register("portfolio_url")}
            errors={errors}
          />

          {/* Facebook */}
          <Input
            label="Facebook URL"
            text="facebook_url"
            register={register("facebook_url")}
            errors={errors}
          />

          {/* Image Upload + Preview */}
          <div className="col-span-full">
            <label className="block mb-2 font-semibold text-sm">Profile Image</label>
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
                    if (file) setPreviewImage(URL.createObjectURL(file));
                  },
                })}
              />
            </div>
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

export default EditTeams;