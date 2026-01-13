import { Navigate, Outlet } from "react-router-dom";
import DashboardLayout from "@/components/layout/dashboard-layout";
// import GetStartedPage from "@/components/dashboard/get-started";
// import { useQueryState } from "nuqs";

const isAuthenticated = () => {
  return true;
  //   return !!localStorage.getItem('token')
};

const ProtectedRoute = () => {
  // const [isSetupCompleted] = useQueryState("isSetupCompleted", {
  //   defaultValue: "false",
  // });

  // useEffect(() => {
  //   setIsSetupCompleted("true");
  // }, []);

  if (!isAuthenticated()) {
    return <Navigate to="/auth/login" replace />;
  }

  // if (isSetupCompleted == "false") {
  //   return <GetStartedPage />;
  // }

  return (
    <>
      <DashboardLayout>
        <Outlet />
      </DashboardLayout>
    </>
  );
};

export default ProtectedRoute;
