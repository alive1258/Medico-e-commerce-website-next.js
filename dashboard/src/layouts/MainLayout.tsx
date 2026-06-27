import React, { useEffect } from "react";
import Sidebar from "../components/common/Sidebar";
import Header from "../components/common/Header";
import { Outlet } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../redux/store";
import { useGetMyProfileQuery } from "../redux/api/authApi";
import { storeUser } from "../redux/features/auth/authSlice";

const MainLayout: React.FC = () => {
  const dispatch = useDispatch();
  const userData = useSelector((state: RootState) => state.auth.user);
const { data: myInfo } = useGetMyProfileQuery();
const user = myInfo?.data?.user; 

  useEffect(() => {
    if (user && !userData) {
      dispatch(storeUser({ email: user?.email, role: user?.role }));
    }
  }, [user, userData, dispatch]);

  return (
    <div
      className={`font-geist min-h-screen text-sm transition-colors duration-300 bg-black-solid text-neutral-400`}
    >
      <div className="flex min-h-screen">
        <Sidebar />
        <div className="flex-1 min-w-0 flex flex-col">
          <div
            className={`sticky top-0 z-20 backdrop-blur bg-black-solid `}
          >
            <Header user={user} />
          </div>
          <main className="flex-1 p-5">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};

export default React.memo(MainLayout);
