import { Navigate, Outlet } from "react-router-dom";

import AppLayout from "@/end-user-app/layout/app-layout";

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

  if (!isAuthenticated()) {
    return <Navigate to={isDonor ? "/user/login" : "/auth/login"} replace />;
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
