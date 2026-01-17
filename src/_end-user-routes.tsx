import { Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";

const ProtectedRoute = lazy(() => import("./pages/authentications/protect-route"));
const NotFoundPage = lazy(() => import("./pages/not-found-page"));
import Logo from "@/assets/icons/coterie.svg";
import UserHome from "./end-user-app/pages/home";
import UserSignIn from "./end-user-app/pages/authentications/sign-in";
import UbuntuLayout from "./end-user-app/constants/ubuntu-style-wrapper";
import UserSignUp from "./end-user-app/pages/authentications/sign-up";
import UserForgotPassword from "./end-user-app/pages/authentications/forgot-password";

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
        <Route element={<ProtectedRoute />}>
          <Route path="dashboard" element={<>User dashboard here</>} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
};

export default EndUserRoutes;
