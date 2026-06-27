import React, { useState } from "react";
import Swal from "sweetalert2";
import { useSignOutMutation } from "../../redux/api/authApi";
import { useNavigate } from "react-router";
import { ChevronDown, ChevronUp, User as UserIcon } from "lucide-react";
import type { ApiError } from "../../types/authType";

export interface User {
  name?: string;
  role?: string;
  email?: string;
}

export interface ProfileProps {
  user: User;
}

const Profile: React.FC<ProfileProps> = ({ user }) => {
  const navigate = useNavigate();
  const [activeModal, setActiveModal] = useState(false);
  const [signOut] = useSignOutMutation();

  const handleProfileModal = () => setActiveModal((prev) => !prev);

  const handleLogout = async () => {
    try {
      const result = await Swal.fire({
        title: "Confirm Sign Out",
        text: "Are you sure you want to sign out?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, Sign Out",
        cancelButtonText: "Cancel",
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
      });

      if (!result.isConfirmed) return;

      const response = await signOut().unwrap();
      if (response?.success) {
        navigate("/sign-in");
        Swal.fire("Signed Out", "You have successfully signed out.", "success");
      } else {
        Swal.fire(
          "Sign Out Failed",
          response?.message || "Please try again.",
          "error",
        );
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

  return (
    <div className="relative w-full min-w-45">
      <div
        onClick={handleProfileModal}
        className="flex items-center justify-between gap-2 cursor-pointer group"
      >
        <div className="flex items-center gap-2">
          <UserIcon className="w-9 h-9 text-white/80 rounded-full p-1 border border-white/30 bg-gray-900" />

          <div>
            <h6 className="text-[15px] font-semibold text-primary-muted">
              {user?.name}
            </h6>
            <span className="text-[13px] text-primary-muted">{user?.role=="super_admin" && "Super Admin"}</span>
          </div>
        </div>
        {activeModal ? (
          <ChevronUp className="text-[19px] text-white/70" />
        ) : (
          <ChevronDown className="text-[19px] text-white/70" />
        )}
      </div>

      <ul
        className={`absolute right-0 top-13.75 w-full bg-gray-900 rounded-md p-2 shadow-lg transition-transform duration-200 z-50${
          activeModal
            ? "scale-100 opacity-100"
            : "scale-95 opacity-0 pointer-events-none"
        }`}
      >
        <li className="p-2 text-[14px] text-white cursor-pointer hover:bg-[#0d0d13]">
          Profile
        </li>
        <li className="p-2 text-[14px] text-white cursor-pointer hover:bg-[#0d0d13]">
          Settings
        </li>
        <li
          onClick={handleLogout}
          className="p-2 text-[14px] text-white cursor-pointer hover:bg-[#0d0d13]"
        >
          Logout
        </li>
      </ul>
    </div>
  );
};

export default Profile;
