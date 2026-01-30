import { Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";

const UserProtectedRoute = lazy(
  () => import("./end-user-app/pages/authentications/user-protected-route")
);
const NotFoundPage = lazy(() => import("./pages/not-found-page"));
const UserHome = lazy(() => import("./end-user-app/pages/home"));
const UserSignIn = lazy(() => import("./end-user-app/pages/authentications/sign-in"));
const UbuntuLayout = lazy(() => import("./end-user-app/constants/ubuntu-style-wrapper"));
const UserSignUp = lazy(() => import("./end-user-app/pages/authentications/sign-up"));
const UserForgotPassword = lazy(
  () => import("./end-user-app/pages/authentications/forgot-password")
);
const DashboardIndex = lazy(() => import("./end-user-app/pages/dashboard"));

import Logo from "@/assets/icons/coterie.svg";

const EndUserRoutes = () => {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center">
          <div className="relative flex flex-col items-center gap-4">
            <div className="h-48 w-48 animate-spin rounded-full border-4 border-[#12AA5B] border-t-transparent" />{" "}
            <img
              src={Logo}
              alt="Coterie"
              className="absolute top-1/2 left-1/2 h-auto w-30 -translate-x-1/2 -translate-y-1/2 transform animate-pulse"
            />
          </div>
        </div>
      }
    >
      <Routes>
        <Route element={<UbuntuLayout />}>
          <Route path="/" element={<UserHome />} />
          <Route path="signup" element={<UserSignUp />} />
          <Route path="login" element={<UserSignIn />} />
          <Route path="forgot-password" element={<UserForgotPassword />} />
        </Route>

        {/* Protected routes */}
        <Route element={<UserProtectedRoute />}>
          <Route path="dashboard" element={<DashboardIndex />} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
};

export default EndUserRoutes;
