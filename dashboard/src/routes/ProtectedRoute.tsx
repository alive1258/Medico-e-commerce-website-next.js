import { useEffect, useState, type ReactNode } from "react";
import { Navigate } from "react-router";
import { useVerifyMutation } from "../redux/api/authApi";
import LoadingScreen from "./LoadingScreen";

type ProtectedRouteProps = {
  children: ReactNode;
  allowedRoles?: string[];
};

const ProtectedRoute = ({ children, allowedRoles }: ProtectedRouteProps) => {
  const [verify] = useVerifyMutation();
  const [userData, setUserData] = useState<{ verified: boolean; role: string } | null>(null);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      try {
        const res = await verify().unwrap();
        const user = res.data?.data;

        if (res.success && user?.verified) {
          setUserData(user);
        } else {
          setUserData(null);
        }
      } catch (error) {
        console.error(error);
        setUserData(null);
      } finally {
        setIsChecking(false);
      }
    };

    checkUser();
  }, [verify]);

  if (isChecking) return <LoadingScreen />;

  if (!userData) return <Navigate to="/login" replace />;

  const userRole = userData.role?.toLowerCase() ?? "";
  const isAllowed = allowedRoles?.some((role) => role.toLowerCase() === userRole) ?? true;

  if (!isAllowed) return <Navigate to="/login" replace />;

  return <>{children}</>;
};

export default ProtectedRoute;