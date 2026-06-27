import { useState, useEffect, useMemo } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import {
  Eye,
  EyeOff,
  UserPlus,
  User2,
  AlignEndVertical,
  PhoneCall,
  MapMinusIcon,
  ArrowRight,
} from "lucide-react";
import { Link } from "react-router";
import CommonModal from "../../components/ui/modals/CommonModal";
import VerifyOtp from "../Otp/VerifyOtp";
import { storeOTPData } from "../../redux/features/otpSlice";
import { toast } from "react-toastify";
import { useGetAllDivisionsQuery } from "../../redux/api/divisionsApi";
import { useGetAllDistrictsQuery } from "../../redux/api/districtsApi";
import { useGetAllUpzelasQuery } from "../../redux/api/upzelasApi";
import type { ApiError } from "../../types/authType";
import { useCreateUserMutation } from "../../redux/api/usersApi";
import { useDispatch } from "react-redux";
import SelectSearch from "../../components/ui/forms/SelectSearch";

type SignUpFormValues = {
  name: string;
  mobile: string;
  email: string;
  password: string;
  confirmPassword: string;
  division_id: string | number;
  district_id: string | number;
  upazila_id: string | number;
  address: string;
};

const SignUp = () => {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState<SignUpFormValues | null>(null);
  const [otpModalOpen, setOtpModalOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [createUser, { isLoading }] = useCreateUserMutation();
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { data: divisionRes, isLoading: isDivLoading } =
    useGetAllDivisionsQuery();
  const { data: districtRes } = useGetAllDistrictsQuery();
  const { data: upzelaRes } = useGetAllUpzelasQuery();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm<SignUpFormValues>({
    defaultValues: {
      division_id: "",
      district_id: "",
      upazila_id: "",
      // agreeToTerms: false,
    },
  });

  // eslint-disable-next-line react-hooks/incompatible-library
  const password = watch("password");
  const selectedDivisionId = watch("division_id");
  const selectedDistrictId = watch("district_id");
  // const agreeToTermsValue = watch("agreeToTerms");

  const filteredDistricts = useMemo(() => {
    const districts = districtRes?.data || districtRes || [];
    if (!selectedDivisionId || !Array.isArray(districts)) return [];

    return districts.filter(
      (dist: any) =>
        String(dist.division_id || dist.division?.id) ===
        String(selectedDivisionId),
    );
  }, [districtRes, selectedDivisionId]);

  // 3. Filter Upazilas based on selected District
  const filteredUpazilas = useMemo(() => {
    const upazilas = upzelaRes?.data || upzelaRes || [];
    if (!selectedDistrictId || !Array.isArray(upazilas)) return [];

    return upazilas.filter(
      (upz: any) =>
        String(upz.district_id || upz.district?.id) ===
        String(selectedDistrictId),
    );
  }, [upzelaRes, selectedDistrictId]);

  // 4. Cascade Reset: Clear children when parent changes
  useEffect(() => {
    setValue("district_id", "");
    setValue("upazila_id", "");
  }, [selectedDivisionId, setValue]);

  useEffect(() => {
    setValue("upazila_id", "");
  }, [selectedDistrictId, setValue]);

  const onSubmit: SubmitHandler<SignUpFormValues> = async (data) => {
    // if (!data.agreeToTerms) {
    //   toast.error("You must agree to the terms.");
    //   return;
    // }

    try {
      const payload = {
        name: data.name,
        mobile: data.mobile,
        email: data.email,
        password: data.password,
        division_id: Number(data.division_id),
        district_id: Number(data.district_id),
        upazila_id: Number(data.upazila_id),
        address: data.address || "",
      };

      const res = await createUser(payload).unwrap();
      if (res?.success) {
        dispatch(storeOTPData(res.data));
        setCredential(data);
        setOtpModalOpen(true);
        reset();

        toast.success(res.message || "Account created successfully!");
      }
    } catch (err: unknown) {
      const error = err as ApiError;
      const message =
        error?.data?.message || error?.message || "Something went wrong.";
      toast.error(message);
    }
  };

  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-linear-to-br from-gray-900 via-[#0D0E12] to-gray-950 px-4 py-12 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-linear-to-r from-cyan-500/10 to-blue-500/10 blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-linear-to-r from-blue-500/10 to-purple-500/10 blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-size-[50px_50px] mask-[radial-gradient(ellipse_at_center,black_30%,transparent_70%)]"></div>
        </div>

        <div className="relative z-10 w-full max-w-2xl">
          <div className="bg-linear-to-br from-gray-900/70 to-gray-900/30 backdrop-blur-xl border border-gray-700/50 rounded-2xl shadow-2xl overflow-hidden">
            <div className="h-1.5 bg-linear-to-r from-cyan-500 to-blue-600"></div>

            <div className="p-8">
              {/* Header */}
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-linear-to-br from-cyan-500 to-blue-600 shadow-lg">
                  <UserPlus className="w-8 h-8 text-white" />
                </div>
                <h1 className="text-2xl font-bold text-white mb-2">
                  Create Account
                </h1>
                <p className="text-gray-400">Join us and start your journey</p>
              </div>

              <div className=" rounded-3xl shadow-2xl border border-gray-800/50 p-8 md:p-10">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="group">
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Full Name *
                      </label>
                      <div className="relative">
                        <User2 className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                        <input
                          {...register("name", {
                            required: "Name is required",
                          })}
                          placeholder="John Doe"
                          className="w-full pl-12 pr-4 py-2.5 bg-gray-900/20 border border-gray-700/50 rounded-xl text-white focus:ring-2 focus:ring-blue-500/30 outline-none transition-all"
                        />
                      </div>
                      {errors.name && (
                        <p className="text-red-400 text-xs mt-1">
                          {errors.name.message}
                        </p>
                      )}
                    </div>

                    <div className="group">
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Email Address *
                      </label>
                      <div className="relative">
                        <AlignEndVertical className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                        <input
                          {...register("email", {
                            required: "Email is required",
                            pattern: {
                              value: /^\S+@\S+$/i,
                              message: "Invalid email",
                            },
                          })}
                          type="email"
                          placeholder="john@example.com"
                          className="w-full pl-12 pr-4 py-3 bg-gray-900/50 border border-gray-700/50 rounded-xl text-white focus:ring-2 focus:ring-blue-500/30 outline-none transition-all"
                        />
                      </div>
                      {errors.email && (
                        <p className="text-red-400 text-xs mt-1">
                          {errors.email.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="group">
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Mobile Number *
                    </label>
                    <div className="relative">
                      <PhoneCall className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                      <input
                        {...register("mobile", {
                          required: "Mobile number is required",
                          minLength: {
                            value: 11,
                            message: "Enter a valid 11 digit number",
                          },
                        })}
                        placeholder="017XXXXXXXX"
                        className="w-full pl-12 pr-4 py-3 bg-gray-900/50 border border-gray-700/50 rounded-xl text-white focus:ring-2 focus:ring-blue-500/30 outline-none transition-all"
                      />
                    </div>
                    {errors.mobile && (
                      <p className="text-red-400 text-xs mt-1">
                        {errors.mobile.message}
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="relative">
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Password *
                      </label>
                      <div className="relative">
                        <input
                          type={showPassword ? "text" : "password"}
                          {...register("password", {
                            required: "Password required",
                            minLength: { value: 8, message: "Min 8 chars" },
                          })}
                          className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700/50 rounded-xl text-white outline-none focus:ring-2 focus:ring-blue-500/30"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-blue-400"
                        >
                          {showPassword ? (
                            <Eye size={18} />
                          ) : (
                            <EyeOff size={18} />
                          )}
                        </button>
                      </div>
                      {errors.password && (
                        <p className="text-red-400 text-xs mt-1">
                          {errors.password.message}
                        </p>
                      )}
                    </div>

                    <div className="relative">
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Confirm Password *
                      </label>
                      <div className="relative">
                        <input
                          type={showConfirmPassword ? "text" : "password"}
                          {...register("confirmPassword", {
                            validate: (val) =>
                              val === password || "Passwords do not match",
                          })}
                          className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700/50 rounded-xl text-white outline-none focus:ring-2 focus:ring-blue-500/30"
                        />
                        <button
                          type="button"
                          onClick={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                          }
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-blue-400"
                        >
                          {showConfirmPassword ? (
                            <Eye size={18} />
                          ) : (
                            <EyeOff size={18} />
                          )}
                        </button>
                      </div>
                      {errors.confirmPassword && (
                        <p className="text-red-400 text-xs mt-1">
                          {errors.confirmPassword.message}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* CASCADING DROPDOWNS */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <SelectSearch
                      label="Division"
                      name="division_id"
                      options={divisionRes?.data || []}
                      setValue={setValue}
                      errors={errors}
                      value={selectedDivisionId}
                      placeholder={
                        isDivLoading ? "Loading..." : "Select Division"
                      }
                    />

                    <SelectSearch
                      label="District"
                      name="district_id"
                      options={filteredDistricts}
                      setValue={setValue}
                      errors={errors}
                      value={selectedDistrictId}
                      disabled={!selectedDivisionId}
                      placeholder={
                        !selectedDivisionId
                          ? "Select Division First"
                          : "Select District"
                      }
                    />

                    <SelectSearch
                      label="Upazila"
                      name="upazila_id"
                      options={filteredUpazilas}
                      setValue={setValue}
                      errors={errors}
                      value={watch("upazila_id")}
                      disabled={!selectedDistrictId}
                      placeholder={
                        !selectedDistrictId
                          ? "Select District First"
                          : "Select Upazila"
                      }
                    />
                  </div>

                  <div className="group">
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Detailed Address
                    </label>
                    <div className="relative">
                      <MapMinusIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                      <input
                        {...register("address")}
                        placeholder="House, Road, Area..."
                        className="w-full pl-12 pr-4 py-3 bg-gray-900/50 border border-gray-700/50 rounded-xl text-white outline-none focus:ring-2 focus:ring-blue-500/30"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-4 bg-linear-to-r from-blue-600 to-cyan-500 text-white font-bold rounded-xl shadow-xl hover:shadow-blue-500/40 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {isLoading ? (
                      <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                    ) : (
                      <>
                        Create Account <ArrowRight size={14} />
                      </>
                    )}
                  </button>
                  {/* Already have an account link */}
                  <div className="mt-8 pt-6 border-t border-gray-800 text-center text-sm">
                    <span className="text-gray-500">
                      Already have an account?
                    </span>
                    <Link
                      to="/login"
                      className="ml-2 text-blue-400 hover:text-blue-300 transition-colors font-medium"
                    >
                      Sign In Now →
                    </Link>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* OTP MODAL */}
      <CommonModal active={otpModalOpen} setActive={setOtpModalOpen}>
        <VerifyOtp
          credential={credential}
          onSuccess={() => setOtpModalOpen(false)}
        />
      </CommonModal>
    </>
  );
};

export default SignUp;
