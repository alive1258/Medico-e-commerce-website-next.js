



// import React, { useEffect, useState } from "react";
// import { useDispatch } from "react-redux";
// import { toast } from "react-toastify";
// import { useResendOTPMutation } from "../../redux/api/authApi";
// import { storeOTPData } from "../../redux/features/otpSlice";
// import { Loader } from "lucide-react";



// const ResendOTP = ({ email, added_by, otpData }) => {
//   const dispatch = useDispatch();
//   const [OTPTime, setOTPTime] = useState(59);
//   const [count, setCount] = useState(false);

//   const [resendOTPVerification, { isLoading }] = useResendOTPMutation();

//   useEffect(() => {
//     //get expiresAt from redux
//     const expiresAt = otpData?.expire_at;

//     // get current date
//     const currentDate = new Date();
//     // converts the expiresAt into date
//     const expirationDate = new Date(expiresAt);

//     // calculate the difference time in millisecond
//     const differenceInMilliseconds =
//       Number(expirationDate) - Number(currentDate);

//     // convert time in second
//     const differenceInSeconds = Math.floor(differenceInMilliseconds / 1000);

//     // set the time in useState
//     setOTPTime(differenceInSeconds);
//   }, [otpData]);

//   useEffect(() => {
//     if (OTPTime <= 0) return;

//     const availableTime = setInterval(() => setOTPTime(OTPTime - 1), 1000);

//     return () => clearInterval(availableTime);
//   }, [OTPTime]);

//   // handle resend otp function
//   const handleResendOTP = async () => {
//     const data = {
//       userId: added_by,
//       email,
//     };
//     try {
//       const res = await resendOTPVerification(data).unwrap();

//       if (res?.success) {
//         dispatch(storeOTPData(res.data));
//         // start count
//         setCount(!count);
//         //set time count
//         setOTPTime(59);
//         toast.success(res?.message || "OTP Re-sended successfully!", {
//           position: toast.TOP_RIGHT,
//         });
//       }
//       if (!res?.success) {
//         toast.error(res?.message || "Something Went wrong!", {
//           position: toast.TOP_RIGHT,
//         });
//       }
//     } catch (error) {
//       console.log(error);
//       toast.error(error?.message ?? "Something Went wrong!", {
//         position: toast.TOP_RIGHT,
//       });
//     }
//   };

//   return (
//     <div className="flex justify-between  mt-5 items-center text-center">
//       <input
//         readOnly
//         className="input_style w-16 text-center text-white font-semibold"
//         type="text"
//         value={OTPTime > 0 ? OTPTime : 0}
//       />

//       <button
//         disabled={OTPTime > 0 || isLoading}
//         onClick={handleResendOTP}
//         className={`py-1 px-4 h-12 text-sm rounded w-40 font-semibold transition duration-300 text-white
//     ${
//       OTPTime > 0 || isLoading
//         ? "input_style bg-[#3b48fa42] border-[1px] border-blue-800 cursor-not-allowed"
//         : "input_style bg-blue-500 hover:bg-blue-600 cursor-pointer "
//     }`}
//         type="submit"
//       >
//         {isLoading ? <Loader height={"h-[12px]"} /> : <span>Resend OTP</span>}
//       </button>
//     </div>
//   );
// };

// export default ResendOTP;



const ResendOtp = () => {
  return (
    <div>ResendOtp</div>
  )
}

export default ResendOtp
