
import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { Eye, EyeOff, Loader, Lock, Mail, LogIn } from "lucide-react";

import { useLoginMutation } from "../../redux/api/authApi";
import { storeOTPData } from "../../redux/features/otpSlice";
import CommonModal from "../../components/ui/modals/CommonModal";
import VerifyOtp from "../Otp/VerifyOtp";
import { storeUser } from "../../redux/features/auth/authSlice";
import { Link } from "react-router";

type LoginFormValues = {
  email: string;
  password: string;
};

const Login = () => {
  const dispatch = useDispatch();
  const [otpModalOpen, setOtpModalOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [credential, setCredential] = useState<LoginFormValues | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LoginFormValues>();

  const [login, { isLoading }] = useLoginMutation();

const onSubmit: SubmitHandler<LoginFormValues> = async (data) => {
  try {
    const res = await login({
      email: data.email.trim(),
      password: data.password.trim(),
    }).unwrap();

    reset();
    dispatch(storeOTPData(res.data));
    dispatch(storeUser(res.data));
    setCredential(data);
    setOtpModalOpen(true);

    toast.success("OTP sent to your email");
  } catch (error: any) {
    const message =
      error?.error?.message ||
      error?.data?.message ||
      error?.message ||
      "Login failed";

    toast.error(message);
  }
};


  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-linear-to-br from-gray-900 via-[#0D0E12] to-gray-950 px-4 relative overflow-hidden">
        {/* Background graphics */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-linear-to-r from-blue-500/10 to-purple-500/10 blur-3xl animate-pulse" />
          <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-linear-to-r from-purple-500/10 to-pink-500/10 blur-3xl animate-pulse delay-1000" />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-size-[50px_50px] mask-[radial-gradient(ellipse_at_center,black_30%,transparent_70%)]" />
        </div>

        <div className="relative z-10 w-full max-w-md">
          <div className="bg-linear-to-br from-gray-900/70 to-gray-900/30 backdrop-blur-xl border border-gray-700/50 rounded-2xl shadow-2xl shadow-black/50 overflow-hidden">
            <div className="h-1.5 bg-linear-to-r from-cyan-500 to-blue-600" />

            <div className="p-8">
              {/* Header */}
              <div className="text-center mb-10">
                <div className="inline-flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-linear-to-br from-cyan-500 to-blue-600 shadow-lg">
                  <Lock className="w-8 h-8 text-white" />
                </div>
                <h1 className="text-2xl font-bold text-white mb-2">
                  Welcome Back
                </h1>
                <p className="text-gray-400">
                  Sign in to continue to your account
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Email */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                    <Mail size={16} /> Email Address
                  </label>
                  <input
                    type="email"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Invalid email address",
                      },
                    })}
                    className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                    placeholder="you@example.com"
                    disabled={isLoading}
                  />
                  {errors.email && (
                    <p className="text-sm text-red-400">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                {/* Password */}
                <div className="space-y-2 relative">
                  <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                    <Lock size={16} /> Password
                  </label>
                  <input
                    type={showPassword ? "text" : "password"}
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 6,
                        message: "Minimum 6 characters",
                      },
                    })}
                    className="w-full px-4 py-3 pr-12 bg-gray-900/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                    placeholder="Enter your password"
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 mt-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                  >
                    {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
                  </button>
                  {errors.password && (
                    <p className="text-sm text-red-400">
                      {errors.password.message}
                    </p>
                  )}
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 px-6 bg-linear-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold rounded-lg shadow-lg"
                >
                  <div className="flex items-center justify-center gap-3">
                    {isLoading ? (
                      <Loader className="w-5 h-5 animate-spin" />
                    ) : (
                      <>
                        <LogIn className="w-5 h-5" />
                        <span>Sign In</span>
                      </>
                    )}
                  </div>
                </button>
              </form>
               {/* Footer */}
            <div className="mt-8 pt-6 border-t border-gray-800 text-center text-sm">
              <span className="text-gray-500">Don't have have an account?</span>
              <Link to="/sign-up" className="ml-2 text-blue-400 hover:text-blue-300 transition-colors font-medium">
                Sign Up Now →
              </Link>
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

export default Login;
