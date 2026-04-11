import { Navigate, Outlet } from "react-router-dom";

import AppLayout from "@/end-user-app/layout/app-layout";
import { useGetEndUserProfile } from "@/services/generics/user-generics/user-hooks";
import { useEffect } from "react";
import { setEndUserToLocalStorage } from "@/end-user-app/services/local-storage";

const isAuthenticated = () => {
  return !!localStorage.getItem("userAccessToken");
};

const UserProtectedRoute = () => {
  const getSubdomain = () => {
    const host = window.location.hostname;
    const parts = host.split(".");
    return parts.length > 2 ? parts[0] : null;
  };

  const subdomain = getSubdomain();

  const isDonor = subdomain?.includes("donor");

  const { data: userData, isLoading } = useGetEndUserProfile();

  useEffect(() => {
    if (userData?.data) {
      setEndUserToLocalStorage(userData.data);
    }
  }, [userData]);

  if (!isAuthenticated()) {
    return <Navigate to={isDonor ? "/user/login" : "/auth/login"} replace />;
  }

  if (isLoading) {
    return null;
  }

  if (!userData?.data?.emailVerified) {
    return <Navigate to="/user/login" replace />;
  }

  return (
    <>
      <AppLayout>
        <Outlet />
      </AppLayout>
    </>
  );
};

export default UserProtectedRoute;
