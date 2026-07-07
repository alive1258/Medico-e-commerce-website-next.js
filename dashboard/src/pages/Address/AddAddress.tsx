// src/pages/addresses/AddAddress.tsx
import React from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { Plus } from "lucide-react";
import { useCreateAddressMutation } from "../../redux/api/addressApi";
import GradientButton from "../../components/ui/buttons/GradientButton";
import Swal from "sweetalert2";
import type { ApiError } from "../../types/authType";
import PageHeader from "../../components/common/PageHeader";
import Input from "../../components/ui/forms/Input";

/* =======================
   Types
======================= */
interface AddAddressFormValues {
  user_id: string;
  full_name?: string;
  phone: string;
  email?: string;
  division?: string;
  district?: string;
  area?: string;
  city?: string;
  state?: string;
  zip?: string;
  country?: string;
  address: string;
  is_default?: boolean;
}

/* =======================
   Component
======================= */
const AddAddress: React.FC = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AddAddressFormValues>({
    defaultValues: {
      user_id: "",
      full_name: "",
      phone: "",
      email: "",
      division: "",
      district: "",
      area: "",
      city: "",
      state: "",
      zip: "",
      country: "Bangladesh",
      address: "",
      is_default: false,
    },
  });

  const [createAddress, { isLoading }] = useCreateAddressMutation();

  /* =======================
     Submit Handler
  ======================= */
  const onSubmit: SubmitHandler<AddAddressFormValues> = async (data) => {
    try {
      const response = await createAddress(data).unwrap();

      if (response?.success) {
        toast.success("Address added successfully");
        reset();
        navigate(-1);
      } else {
        toast.error(response?.message || "Failed to add address");
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
        title="Add New Address"
        breadcrumbs={[
          { title: "Dashboard", link: "/" },
          { title: "Addresses", link: "/addresses" },
          { title: "Add Address" },
        ]}
      />

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* User ID */}
          <div>
            <Input
              label="User ID *"
              type="text"
              text="user_id"
              placeholder="Enter user UUID"
              register={register("user_id", {
                required: "User ID is required",
              })}
              errors={errors}
            />
          </div>

          {/* Full Name */}
          <div>
            <Input
              label="Full Name"
              type="text"
              text="full_name"
              placeholder="Enter full name"
              register={register("full_name")}
              errors={errors}
            />
          </div>

          {/* Phone */}
          <div>
            <Input
              label="Phone *"
              type="text"
              text="phone"
              placeholder="Enter phone number"
              register={register("phone", {
                required: "Phone number is required",
              })}
              errors={errors}
            />
          </div>

          {/* Email */}
          <div>
            <Input
              label="Email"
              text="email"
              placeholder="Enter email address"
              register={register("email")}
              errors={errors}
            />
          </div>

          {/* Division */}
          <div>
            <Input
              label="Division"
              type="text"
              text="division"
              placeholder="Enter division"
              register={register("division")}
              errors={errors}
            />
          </div>

          {/* District */}
          <div>
            <Input
              label="District"
              type="text"
              text="district"
              placeholder="Enter district"
              register={register("district")}
              errors={errors}
            />
          </div>

          {/* Area */}
          <div>
            <Input
              label="Area"
              type="text"
              text="area"
              placeholder="Enter area"
              register={register("area")}
              errors={errors}
            />
          </div>

          {/* City */}
          <div>
            <Input
              label="City"
              type="text"
              text="city"
              placeholder="Enter city"
              register={register("city")}
              errors={errors}
            />
          </div>

          {/* State */}
          <div>
            <Input
              label="State"
              type="text"
              text="state"
              placeholder="Enter state"
              register={register("state")}
              errors={errors}
            />
          </div>

          {/* Zip Code */}
          <div>
            <Input
              label="Zip Code"
              type="text"
              text="zip"
              placeholder="Enter zip code"
              register={register("zip")}
              errors={errors}
            />
          </div>

          {/* Country */}
          <div>
            <Input
              label="Country"
              type="text"
              text="country"
              placeholder="Enter country"
              register={register("country")}
              errors={errors}
            />
          </div>

          {/* Address */}
          <div className="col-span-2">
            <Input
              label="Address *"
              type="text"
              text="address"
              placeholder="Enter full address"
              register={register("address", {
                required: "Address is required",
              })}
              errors={errors}
            />
          </div>

          {/* Is Default */}
          <div className="flex items-center gap-2 mt-2">
            <input
              type="checkbox"
              id="is_default"
              {...register("is_default")}
              className="w-4 h-4"
            />
            <label htmlFor="is_default" className="text-sm">
              Set as Default Address
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

export default AddAddress;
