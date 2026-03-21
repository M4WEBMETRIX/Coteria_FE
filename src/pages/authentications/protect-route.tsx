import { Navigate, Outlet } from "react-router-dom";
import DashboardLayout from "@/components/layout/dashboard-layout";
import { useEffect } from "react";
import {
  getOrgUserFromLocalStorage,
  setOrgUserToLocalStorage,
} from "@/end-user-app/services/local-storage";
import { useGetOrganisationProfile } from "@/services/generics/hooks";
// import GetStartedPage from "@/components/dashboard/get-started";
// import { useQueryState } from "nuqs";

const isAuthenticated = () => {
  return !!localStorage.getItem("accessToken");
};

export const isEmailVerified = () => {
  const orgUser = getOrgUserFromLocalStorage();
  return orgUser?.currentUser?.emailVerified;
};

const ProtectedRoute = () => {
  const getSubdomain = () => {
    const host = window.location.hostname;
    const parts = host.split(".");
    return parts.length > 2 ? parts[0] : null;
  };

  const subdomain = getSubdomain();

  const isDonor = subdomain?.includes("donor");

  const { data: userData, isLoading } = useGetOrganisationProfile();

  useEffect(() => {
    if (userData?.data) {
      setOrgUserToLocalStorage(userData.data);
    }
  }, [userData]);

  if (!isAuthenticated()) {
    return <Navigate to={isDonor ? "/user/login" : "/auth/login"} replace />;
  }

  if (isLoading) {
    return null; // or loading spinner
  }

  if (!userData?.data?.currentUser?.emailVerified) {
    return <Navigate to="/auth/check-email" replace />;
  }

  // if (!isAuthenticated() || !isEmailVerified()) {
  //   return <Navigate to="/auth/login" replace />;
  // }
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
