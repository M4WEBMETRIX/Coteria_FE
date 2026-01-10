import { Navigate, Outlet } from "react-router-dom";
import DashboardLayout from "@/components/layout/dashboard-layout";
import GetStartedPage from "@/components/dashboard/get-started";

const isAuthenticated = () => {
  return true;
  //   return !!localStorage.getItem('token')
};

const isSetupCompleted = () => {
  return false;
};

const ProtectedRoute = () => {
  if (!isAuthenticated()) {
    return <Navigate to="/auth/login" replace />;
  }

  if (!isSetupCompleted()) {
    return <GetStartedPage />;
  }

  return (
    <>
      <DashboardLayout>
        <Outlet />
      </DashboardLayout>
    </>
  );
};

export default ProtectedRoute;
