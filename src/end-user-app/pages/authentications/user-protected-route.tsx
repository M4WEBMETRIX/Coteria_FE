import { Navigate, Outlet } from "react-router-dom";

import AppLayout from "@/end-user-app/layout/app-layout";

const isAuthenticated = () => {
  return true;
  //   return !!localStorage.getItem('token')
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
