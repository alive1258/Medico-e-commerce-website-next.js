// components/admin/teams/AddTeams.tsx
import React, { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { Plus } from "lucide-react";
import { useCreateTeamMutation } from "../../redux/api/teamsApi";
import type { ApiError } from "../../types/authType";
import PageHeader from "../../components/common/PageHeader";
import Input from "../../components/ui/forms/Input";
import GradientButton from "../../components/ui/buttons/GradientButton";


interface AddTeamFormValues {
  name: string;
  designation: string;
  image?: FileList;
  linkedin_url?: string;
  portfolio_url?: string;
  facebook_url?: string;
}

const AddTeams: React.FC = () => {
  const navigate = useNavigate();
  const [createTeam, { isLoading }] = useCreateTeamMutation();
  const [, setPreviewImage] = useState<string | null>(null);

  const { register, handleSubmit, reset, formState: { errors } } =
    useForm<AddTeamFormValues>({
      defaultValues: {
        name: "",
        designation: "",
        linkedin_url: "",
        portfolio_url: "",
        facebook_url: "",
      },
    });

  const onSubmit: SubmitHandler<AddTeamFormValues> = async (formData) => {
    try {
      const payload = new FormData();

      payload.append("name", formData.name);
      payload.append("designation", formData.designation);

      if (formData.image?.[0]) payload.append("image", formData.image[0]);
      if (formData.linkedin_url) payload.append("linkedin_url", formData.linkedin_url);
      if (formData.portfolio_url) payload.append("portfolio_url", formData.portfolio_url);
      if (formData.facebook_url) payload.append("facebook_url", formData.facebook_url);

      await createTeam(payload).unwrap();

      toast.success("Team member created successfully!");
      reset();
      setPreviewImage(null);
      navigate("/teams");
    } catch (err) {
      const error = err as ApiError;
      Swal.fire({
        title: "Submission Failed",
        text: Array.isArray(error.data?.message)
          ? error.data.message.join(", ")
          : error.data?.message || "Something went wrong",
        icon: "error",
      });
    }
  };

  return (
    <div className="rounded-lg border bg-black-base border-gray-base overflow-hidden p-6 mb-6">
      <PageHeader
        title="Add Team Member"
        breadcrumbs={[
          { title: "Dashboard", link: "/" },
          { title: "Teams", link: "/teams" },
          { title: "Add Team Member" },
        ]}
      />

      <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Name */}
          <Input
            label="Full Name"
            text="name"
            placeholder="John Doe"
            register={register("name", { required: "Name is required" })}
            errors={errors}
          />

          {/* Designation */}
          <Input
            label="Designation"
            text="designation"
            placeholder="Senior Software Engineer"
            register={register("designation", { required: "Designation is required" })}
            errors={errors}
          />

          {/* Image Upload + Preview */}
                 <div className="col-span-full border-2 border-dashed rounded-lg p-4 hover:border-blue-400">
            <label className="block mb-2 font-semibold text-sm">Album Thumbnail</label>
            <input
              type="file"
              accept="image/*"
              {...register("image")}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
          </div>

    

          {/* LinkedIn URL */}
          <Input
            label="LinkedIn URL"
            text="linkedin_url"
            placeholder="https://linkedin.com/in/johndoe"
            register={register("linkedin_url")}
            errors={errors}
          />

          {/* Portfolio URL */}
          <Input
            label="Portfolio URL"
            text="portfolio_url"
            placeholder="https://johndoe.dev"
            register={register("portfolio_url")}
            errors={errors}
          />

          {/* Facebook URL */}
          <Input
            label="Facebook URL"
            text="facebook_url"
            placeholder="https://facebook.com/johndoe"
            register={register("facebook_url")}
            errors={errors}
          />

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

export default AddTeams;