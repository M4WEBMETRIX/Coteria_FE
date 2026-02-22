import { Navigate, Outlet } from "react-router-dom";

import AppLayout from "@/end-user-app/layout/app-layout";

const isAuthenticated = () => {
  return !!localStorage.getItem("userAccessToken");
};

const UserProtectedRoute = () => {
  if (!isAuthenticated()) {
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
